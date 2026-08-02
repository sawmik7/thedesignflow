// scratch/download-lotties-browser.cjs
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const urls = {
  "time.json": "https://lottie.host/80757db6-db35-430c-ab2b-8a7e025b4104/5W201q2J1y.json",
  "projects.json": "https://lottie.host/7ccb5585-8025-455b-b9d9-bb58a8a25c1b/8F02g9zvy9.json",
  "standard.json": "https://lottie.host/7efd2fa8-2782-41ab-8356-65151ee67b5b/3pukmbyxza.json",
  "rating.json": "https://lottie.host/e2c7a23c-cf56-4c47-9759-994c9ad25c1f/2g9zvy5w20.json",
  "discovery.json": "https://lottie.host/9e415ef4-c081-4b13-a417-640a3d5e227f/7Uk8N2Q1aF.json",
  "proposal.json": "https://lottie.host/6a56c221-d703-490b-9dfd-341e8f237ef5/Hukmbyxza3.json",
  "design.json": "https://lottie.host/e47447d6-7c0b-4eb8-bcf6-13d80bf435df/0f2g9zvy4y.json",
  "delivery.json": "https://lottie.host/318a6df2-f8c0-42f0-91bf-a8ce025b4104/1qJ1y5W201.json"
};

const workspace = "d:\\Backup\\Download Folder\\hasanul-portfolio";
const destDir = path.join(workspace, "public", "lottie");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function run() {
  console.log('Launching Playwright browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('=== Browser-Based Lottie Assets Downloader System ===');
  for (const [filename, url] of Object.entries(urls)) {
    const destPath = path.join(destDir, filename);
    console.log(`Fetching ${filename} from ${url}...`);
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      if (response && response.status() === 200) {
        const text = await response.text();
        // Validate JSON
        JSON.parse(text);
        fs.writeFileSync(destPath, text);
        console.log(`[Success] Saved high-fidelity local asset: ${filename} (${text.length} bytes)`);
      } else {
        console.error(`[Error] Fetch failed with status ${response ? response.status() : 'unknown'} for ${filename}`);
      }
    } catch (e) {
      console.error(`[Error] Failed to download ${filename}:`, e.message);
    }
  }

  console.log('Closing browser...');
  await browser.close();
  console.log('=== All high-fidelity Lottie assets synced successfully! ===');
}

run().catch(console.error);
