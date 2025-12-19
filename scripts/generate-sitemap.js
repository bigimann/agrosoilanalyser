import fs from "fs";
import path from "path";

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
</urlset>
`;

const publicPath = path.join(process.cwd(), "public", "sitemap.xml");

fs.writeFileSync(publicPath, sitemap, "utf8");

console.log("✅ Sitemap generated");
