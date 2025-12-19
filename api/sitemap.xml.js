export default async function handler(req, res) {
  const baseUrl = "https://agrosoilassistant.vercel.app";

  // Static routes
  const staticRoutes = ["/", "/form", "/admin/login", "/admin/register"];

  // Example dynamic routes (future-proof)
  // const dynamicRoutes = await fetchFromDB();

  const urls = staticRoutes.map((route) => {
    return `
      <url>
        <loc>${baseUrl}${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${route === "/" ? "1.0" : "0.8"}</priority>
      </url>
    `;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join("")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.status(200).send(sitemap);
}
