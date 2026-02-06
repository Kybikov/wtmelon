import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

async function sendEmail(emailData: EmailRequest): Promise<boolean> {
  const smtpHost = Deno.env.get('SMTP_HOST') || 'mail.adm.tools';
  const smtpPort = parseInt(Deno.env.get('SMTP_PORT') || '465');
  const smtpUser = Deno.env.get('SMTP_USER') || 'no-reply@wtmelon.store';
  const smtpPassword = Deno.env.get('SMTP_PASSWORD') || '';
  const smtpFrom = Deno.env.get('SMTP_FROM') || 'no-reply@wtmelon.store';

  try {
    const conn = await Deno.connect({
      hostname: smtpHost,
      port: smtpPort,
      transport: "tcp",
    });

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const write = async (data: string) => {
      await conn.write(encoder.encode(data));
    };

    const read = async (): Promise<string> => {
      const buffer = new Uint8Array(1024);
      const n = await conn.read(buffer);
      if (n === null) return "";
      return decoder.decode(buffer.subarray(0, n));
    };

    await read();

    await write(`EHLO ${smtpHost}\r\n`);
    await read();

    const authString = btoa(`\0${smtpUser}\0${smtpPassword}`);
    await write("AUTH PLAIN " + authString + "\r\n");
    await read();

    await write(`MAIL FROM:<${smtpFrom}>\r\n`);
    await read();

    await write(`RCPT TO:<${emailData.to}>\r\n`);
    await read();

    await write("DATA\r\n");
    await read();

    const emailContent = [
      `From: ${smtpFrom}`,
      `To: ${emailData.to}`,
      `Subject: ${emailData.subject}`,
      "MIME-Version: 1.0",
      "Content-Type: text/html; charset=utf-8",
      "",
      emailData.html,
      ".",
    ].join("\r\n");

    await write(emailContent + "\r\n");
    await read();

    await write("QUIT\r\n");
    conn.close();

    return true;
  } catch (error) {
    console.error("SMTP Error:", error);
    throw error;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { to, subject, html, text } = await req.json() as EmailRequest;

    if (!to || !subject || !html) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: to, subject, html" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    await sendEmail({ to, subject, html, text });

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email", details: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
