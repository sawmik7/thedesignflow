const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173/...');
  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 15000 });
  } catch (e) {
    console.log('Network idle timeout, proceeding anyway...', e.message);
  }

  // Wait for loading screen to complete
  console.log('Waiting for loaders to clear...');
  await page.waitForTimeout(3000);

  const outDir = 'C:/Users/surve/.gemini/antigravity/brain/07d01be3-cd50-43e6-9b26-99881b224065';
  
  // Retrieve the offset top of the sticky slider section
  console.log('Locating slider...');
  const sliderOffsetTop = await page.evaluate(() => {
    const el = document.querySelector('section.section_hero_home_sticky');
    return el ? el.getBoundingClientRect().top + window.scrollY : null;
  });

  if (sliderOffsetTop !== null) {
    console.log(`Slider offset top found at: ${sliderOffsetTop}px`);

    // Let's scroll through the slider track step-by-step
    // Since MULTIPLIER = SLIDES.length + 1 = 7, the total track scroll distance is 7 * 900 = 6300px
    // Let's take screenshots at offsets: sliderOffsetTop + i * 900px
    for (let i = 0; i <= 6; i++) {
      const scrollY = sliderOffsetTop + i * 900;
      console.log(`Scrolling to y=${scrollY}px (Slide index estimate: ${i})...`);
      
      await page.evaluate((targetY) => {
        window.scrollTo(0, targetY);
      }, scrollY);
      
      await page.waitForTimeout(1500); // Allow scroll transition to finish
      
      // Capture screenshot
      const filename = `slide_capture_${i}.png`;
      await page.screenshot({ path: path.join(outDir, filename) });
      console.log(`Captured: ${filename}`);
    }
  } else {
    console.log('ERROR: Slider section element not found!');
  }

  console.log('Closing browser...');
  await browser.close();
  console.log('All slides captured successfully!');
}

run().catch(err => {
  console.error('Error running screenshot script:', err);
  process.exit(1);
});
