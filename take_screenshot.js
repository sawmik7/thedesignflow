const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
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
  console.log('Waiting for page loaders...');
  await page.waitForTimeout(3000);

  // Take screenshot of top fold
  const outDir = 'C:/Users/surve/.gemini/antigravity/brain/0832f113-8e05-49c2-8420-73e378c2a4c6';
  
  console.log('Capturing top fold...');
  await page.screenshot({ path: path.join(outDir, 'screenshot_top_fold.png') });

  // Scroll to slider
  console.log('Locating slider section...');
  const slider = page.locator('section.section_hero_home_sticky');
  if (await slider.count() > 0) {
    console.log('Scrolling to slider...');
    await slider.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(outDir, 'screenshot_slider_initial.png') });

    // Scroll through the slider steps to capture active slides
    const sliderBox = await slider.boundingBox();
    if (sliderBox) {
      console.log('Slider bounding box:', sliderBox);
      const startY = sliderBox.y;
      
      // Let's scroll down in steps of 900px (viewport height) to trigger each slide
      for (let i = 1; i <= 5; i++) {
        const scrollTarget = startY + i * 900;
        console.log(`Scrolling to y=${scrollTarget}...`);
        await page.evaluate((y) => window.scrollTo(0, y), scrollTarget);
        await page.waitForTimeout(1500); // Allow GSAP to settle
        await page.screenshot({ path: path.join(outDir, `screenshot_slider_scroll_${i}.png`) });
      }
    }
  } else {
    console.log('WARNING: slider section not found on page!');
  }

  console.log('Closing browser...');
  await browser.close();
  console.log('Done!');
}

run().catch(err => {
  console.error('Error running screenshot script:', err);
  process.exit(1);
});
