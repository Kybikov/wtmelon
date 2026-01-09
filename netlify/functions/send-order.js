exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const {
      productName,
      plan,
      duration,
      price,
      currency,
      customerName,
      telegram,
      phone,
      email,
      comment
    } = JSON.parse(event.body);

    if (!customerName || (!telegram && !phone && !email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Missing Telegram credentials');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    const timestamp = new Date().toLocaleString('uk-UA', {
      timeZone: 'Europe/Kiev',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    const orderId = Date.now().toString(36).toUpperCase();

    let message = `🍉 <b>Нове замовлення #${orderId}</b>\n\n`;
    message += `📦 <b>Продукт:</b> ${productName}\n`;
    message += `💎 <b>План:</b> ${plan}\n`;
    message += `⏱ <b>Термін:</b> ${duration}\n`;
    message += `💰 <b>Ціна:</b> ${price} ${currency}\n\n`;
    message += `👤 <b>Клієнт:</b> ${customerName}\n`;

    if (telegram) {
      message += `📱 <b>Telegram:</b> @${telegram.replace('@', '')}\n`;
    }
    if (phone) {
      message += `📞 <b>Телефон:</b> ${phone}\n`;
    }
    if (email) {
      message += `📧 <b>Email:</b> ${email}\n`;
    }
    if (comment) {
      message += `\n💬 <b>Коментар:</b>\n${comment}\n`;
    }

    message += `\n🕐 <b>Час:</b> ${timestamp}`;

    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Telegram API error:', data);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to send message to Telegram' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        orderId,
        message: 'Order sent successfully'
      })
    };

  } catch (error) {
    console.error('Error processing order:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
