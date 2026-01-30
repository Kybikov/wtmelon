export default async (req) => {
    const url = new URL(req.url);

    // мова або з ?lang=, або fallback
    const raw = (url.searchParams.get("lang") || "en").slice(0, 2);
    const allowed = new Set(["de", "en", "uk", "ru"]);
    const lang = allowed.has(raw) ? raw : "en";

    const apiBase = process.env.API_BASE; // https://api.wtmelon.store

    const r = await fetch(`${apiBase}/rpc/catalog`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lang_in: lang }),
    });

    if (!r.ok) {
        return new Response(JSON.stringify({ error: "upstream_error", status: r.status }), {
            status: 502,
            headers: { "content-type": "application/json" },
        });
    }

    const products = await r.json();

    return new Response(JSON.stringify(products), {
        status: 200,
        headers: {
            "content-type": "application/json",
            "cache-control": "public, max-age=60",
        },
    });
};
