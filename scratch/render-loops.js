import { execSync } from "child_process";
import path from "path";
import fs from "fs";

const categories = [
  { dir: "branding-loop", name: "branding" },
  { dir: "saas-loop", name: "saas" },
  { dir: "web-loop", name: "web" },
  { dir: "ai-loop", name: "ai" },
  { dir: "motion-loop", name: "motion" },
  { dir: "ecommerce-loop", name: "ecommerce" }
];

const workspace = "d:\\Backup\\Download Folder\\hasanul-portfolio";
const outDir = path.join(workspace, "public", "Video");

// Create public/Video if not exists
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log("=== HyperFrames Automatic Rendering Suite ===");
console.log(`Target Output Directory: ${outDir}\n`);

for (const cat of categories) {
  const sourceDir = path.join(workspace, cat.dir);
  console.log(`\n--------------------------------------------`);
  console.log(`[Processing] ${cat.name.toUpperCase()} (Source: ${cat.dir})`);
  console.log(`--------------------------------------------`);

  try {
    // 1. Render WEBM (Cinematic Alpha transparent loop)
    const webmOut = path.join(outDir, `${cat.name}.webm`);
    console.log(`Rendering WebM to: ${webmOut}...`);
    const webmCmd = `npx hyperframes render --format webm --output "${webmOut}" --quality standard`;
    execSync(webmCmd, { cwd: sourceDir, stdio: "inherit" });
    console.log(`[Success] Rendered ${cat.name}.webm`);

    // 2. Render MP4 (Cinematic Standard compatibility loop)
    const mp4Out = path.join(outDir, `${cat.name}.mp4`);
    console.log(`Rendering MP4 to: ${mp4Out}...`);
    const mp4Cmd = `npx hyperframes render --format mp4 --output "${mp4Out}" --quality standard`;
    execSync(mp4Cmd, { cwd: sourceDir, stdio: "inherit" });
    console.log(`[Success] Rendered ${cat.name}.mp4`);
  } catch (error) {
    console.error(`[Error] Failed to render ${cat.name}:`, error.message);
  }
}

console.log("\n============================================");
console.log("=== Rendering complete for all categories! ===");
console.log("============================================");
