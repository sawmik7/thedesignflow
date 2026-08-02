// scratch/download-lotties-live.cjs
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const filenames = [
  "time.json",
  "projects.json",
  "standard.json",
  "rating.json",
  "discovery.json",
  "proposal.json",
  "design.json",
  "delivery.json"
];

const workspace = "d:\\Backup\\Download Folder\\hasanul-portfolio";
const destDir = path.join(workspace, "public", "lottie");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function run() {
  console.log('Launching Playwright browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('=== Live Site Lottie Assets Downloader System ===');
  for (const filename of filenames) {
    const destPath = path.join(destDir, filename);
    const liveUrl = `https://thedesignflow.website/lottie/${filename}`;
    console.log(`Fetching ${filename} from ${liveUrl}...`);
    try {
      const response = await page.goto(liveUrl, { waitUntil: 'networkidle', timeout: 15000 });
      if (response && response.status() === 200) {
        const text = await response.text();
        // Validate JSON
        JSON.parse(text);
        fs.writeFileSync(destPath, text);
        console.log(`[Success] Saved high-fidelity local asset from live site: ${filename} (${text.length} bytes)`);
      } else {
        console.error(`[Error] Fetch failed with status ${response ? response.status() : 'unknown'} for ${filename}`);
      }
    } catch (e) {
      console.error(`[Error] Failed to download ${filename} from live site:`, e.message);
    }
  }

  console.log('Closing browser...');
  await browser.close();
  console.log('=== All live high-fidelity Lottie assets synced successfully! ===');
}

run().catch(console.error);
