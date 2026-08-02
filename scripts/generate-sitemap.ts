import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { posts } from "../src/data/posts.ts";
import { projects } from "../src/data/projects.ts";
import { slugify } from "../src/utils/slugify.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://thedesignflow.website";

function generateSitemap() {
  const currentDate = new Date().toISOString().split("T")[0];

  const staticUrls = [
    { loc: "", changefreq: "weekly", priority: "1.0", image: "", title: "" },
    { loc: "/studio", changefreq: "monthly", priority: "0.8", image: "", title: "" },
    { loc: "/work", changefreq: "weekly", priority: "0.9", image: "", title: "" },
    { loc: "/blog", changefreq: "weekly", priority: "0.8", image: "", title: "" },
    { loc: "/contact", changefreq: "monthly", priority: "0.7", image: "", title: "" },
  ];

  const blogUrls = posts.map((post) => ({
    loc: `/blog/${post.slug}`,
    changefreq: "monthly",
    priority: "0.6",
    image: post.image,
    title: post.title,
  }));

  const projectUrls = projects.map((project) => ({
    loc: `/work/${project.id}-${slugify(project.title)}`,
    changefreq: "monthly",
    priority: "0.7",
    image: project.image,
    title: project.title,
  }));

  const urls = [...staticUrls, ...blogUrls, ...projectUrls];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  urls.forEach((url) => {
    const isRelativeImage = url.image && !url.image.startsWith("http");
    const absoluteImage = isRelativeImage ? `${BASE_URL}${url.image}` : url.image;

    xml += `  <url>
    <loc>${BASE_URL}${url.loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>`;

    if (url.image) {
      xml += `
    <image:image>
      <image:loc>${escapeXml(absoluteImage)}</image:loc>
      <image:title>${escapeXml(url.title || "")}</image:title>
    </image:image>`;
    }

    xml += `
  </url>\n`;
  });

  xml += `</urlset>\n`;

  const outputPath = path.resolve(__dirname, "../public/sitemap.xml");
  fs.writeFileSync(outputPath, xml, "utf8");
  console.log(`\n✅ Sitemap successfully generated at ${outputPath}\n`);
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return c;
    }
  });
}

generateSitemap();
