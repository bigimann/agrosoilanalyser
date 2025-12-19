export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/xml");

  const baseUrl = "https://agrosoilassistant.vercel.app";

  const routes = ["/", "/form", "/admin/login", "/admin/register"];

  const urls = routes
    .map(
      (route) => `
      <url>
        <loc>${baseUrl}${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${route === "/" ? "1.0" : "0.8"}</priority>
      </url>`
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  res.status(200).send(sitemap);
}
