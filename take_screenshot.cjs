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
  
  console.log('Capturing top fold...');
  await page.screenshot({ path: path.join(outDir, 'screenshot_top_fold.png') });

  // Scroll to slider
  console.log('Locating slider section...');
  const slider = page.locator('section.section_hero_home_sticky');
  if (await slider.count() > 0) {
    console.log('Scrolling to slider...');
    await slider.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    const sliderOffsetTop = await page.evaluate(() => {
      const el = document.querySelector('section.section_hero_home_sticky');
      return el ? el.getBoundingClientRect().top + window.scrollY : null;
    });
    
    console.log(`Dynamic slider offset top: ${sliderOffsetTop}px`);
    
    await page.evaluate((targetY) => {
      window.scrollTo(0, targetY);
      if (window.ScrollTrigger) window.ScrollTrigger.update();
    }, sliderOffsetTop);
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(outDir, 'screenshot_slider_initial.png') });

    // Scroll in steps
    const totalScroll = 1260; // 2160 section height - 900 viewport height
    for (let i = 1; i <= 5; i++) {
      const progress = i / 5;
      const scrollTarget = sliderOffsetTop + progress * totalScroll;
      console.log(`Scrolling step ${i} to ${scrollTarget}px (progress: ${progress.toFixed(2)})...`);
      await page.evaluate((targetY) => {
        window.scrollTo(0, targetY);
        if (window.ScrollTrigger) window.ScrollTrigger.update();
      }, scrollTarget);
      await page.waitForTimeout(1500); // Allow GSAP to settle
      await page.screenshot({ path: path.join(outDir, `screenshot_slider_scroll_${i}.png`) });
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
