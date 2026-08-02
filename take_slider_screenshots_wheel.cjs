const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox', 
      '--disable-dev-shm-usage',
      '--disable-gpu' // Sometimes disabling GPU inside headless Chrome resolves fixed-position compositing blackouts!
    ]
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
  await page.waitForTimeout(4000);

  const outDir = 'C:/Users/surve/.gemini/antigravity/brain/07d01be3-cd50-43e6-9b26-99881b224065';
  
  // Retrieve the offset top of the sticky slider section
  console.log('Locating slider...');
  const sliderOffsetTop = await page.evaluate(() => {
    const el = document.querySelector('section.section_hero_home_sticky');
    return el ? el.getBoundingClientRect().top + window.scrollY : null;
  });

  if (sliderOffsetTop !== null) {
    console.log(`Slider offset top found at: ${sliderOffsetTop}px`);

    // Let's scroll down to the slider start first using mouse wheel
    console.log('Scrolling down to the slider section via mouse wheel...');
    let currentY = 0;
    while (currentY < sliderOffsetTop) {
      const scrollStep = Math.min(300, sliderOffsetTop - currentY);
      await page.mouse.wheel(0, scrollStep);
      currentY += scrollStep;
      await page.waitForTimeout(50);
    }
    
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, 'slide_wheel_start.png') });
    console.log('Captured: slide_wheel_start.png');

    // Scroll through the slider track step-by-step
    // Since MULTIPLIER = SLIDES.length + 1 = 7, the total track scroll distance is 7 * 900 = 6300px
    // Let's scroll in increments of 900px using wheel events, but in small scroll steps of 100px to simulate smooth scrubbing
    for (let slideIdx = 1; slideIdx <= 6; slideIdx++) {
      console.log(`Simulating scroll scrub for Slide index estimate: ${slideIdx}...`);
      
      // Scrub smoothly over 900px scroll distance in 9 steps of 100px
      for (let step = 0; step < 9; step++) {
        await page.mouse.wheel(0, 100);
        await page.waitForTimeout(100); // 100ms between steps to simulate natural user scrub
      }
      
      await page.waitForTimeout(1500); // Allow GSAP to settle and render
      
      // Capture screenshot
      const filename = `slide_wheel_capture_${slideIdx}.png`;
      await page.screenshot({ path: path.join(outDir, filename) });
      console.log(`Captured: ${filename}`);
    }
  } else {
    console.log('ERROR: Slider section element not found!');
  }

  console.log('Closing browser...');
  await browser.close();
  console.log('All slides captured successfully via wheel events!');
}

run().catch(err => {
  console.error('Error running screenshot script:', err);
  process.exit(1);
});
