const { chromium } = require('@playwright/test');

async function run() {
  console.log('Launching browser to check network requests...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('response', response => {
    const status = response.status();
    const url = response.url();
    if (status >= 400) {
      console.log(`[HTTP ERROR ${status}] ${url}`);
    }
  });

  console.log('Navigating to http://localhost:5173/?no-lenis=true...');
  try {
    await page.goto('http://localhost:5173/?no-lenis=true', { waitUntil: 'networkidle', timeout: 15000 });
  } catch (e) {
    console.log('Navigation failed:', e.message);
  }

  await page.waitForTimeout(3000);
  console.log('Closing browser...');
  await browser.close();
  console.log('Done!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
