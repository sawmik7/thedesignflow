const { chromium } = require('@playwright/test');
const path = require('path');

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173/?no-lenis=true...');
  try {
    await page.goto('http://localhost:5173/?no-lenis=true', { waitUntil: 'networkidle', timeout: 15000 });
  } catch (e) {
    console.log('Network idle timeout, proceeding anyway...', e.message);
  }

  // Wait for loading screen to complete
  console.log('Waiting for page loaders...');
  await page.waitForTimeout(4000);

  const outDir = 'C:/Users/surve/.gemini/antigravity/brain/0832f113-8e05-49c2-8420-73e378c2a4c6';
  
  console.log('Scrolling to about (process) section...');
  const section = page.locator('#about');
  if (await section.count() > 0) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000); // Allow elements to animate in
    console.log('Capturing process section...');
    await page.screenshot({ path: path.join(outDir, 'screenshot_process_section.png') });
  } else {
    console.log('WARNING: #about section not found!');
  }

  console.log('Closing browser...');
  await browser.close();
  console.log('Done!');
}

run().catch(err => {
  console.error('Error running screenshot script:', err);
  process.exit(1);
});
