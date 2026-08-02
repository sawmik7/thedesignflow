const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  
  // 1. DESKTOP VIEW
  console.log('--- CAPTURING DESKTOP ---');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const desktopPage = await desktopContext.newPage();

  console.log('Navigating to https://thedesignflow.website/...');
  try {
    await desktopPage.goto('https://thedesignflow.website/', { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    console.log('Desktop navigation timeout/idle proceeding...', e.message);
  }

  await desktopPage.waitForTimeout(3000);
  
  const outDir = 'C:/Users/surve/.gemini/antigravity/brain/07d01be3-cd50-43e6-9b26-99881b224065';
  
  console.log('Capturing Desktop Hero...');
  await desktopPage.screenshot({ path: path.join(outDir, 'live_desktop_hero.png') });

  console.log('Scrolling to slider...');
  const slider = desktopPage.locator('section.section_hero_home_sticky');
  if (await slider.count() > 0) {
    await slider.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(2000);
    await desktopPage.screenshot({ path: path.join(outDir, 'live_desktop_slider_start.png') });

    const box = await slider.boundingBox();
    if (box) {
      // Scroll in steps
      for (let i = 1; i <= 3; i++) {
        await desktopPage.evaluate((y) => window.scrollTo(0, y), box.y + i * 900);
        await desktopPage.waitForTimeout(1500);
        await desktopPage.screenshot({ path: path.join(outDir, `live_desktop_slider_scroll_${i}.png`) });
      }
    }
  } else {
    console.log('Slider section not found in desktop view!');
  }
  await desktopContext.close();

  // 2. MOBILE VIEW
  console.log('--- CAPTURING MOBILE ---');
  const mobileContext = await browser.newContext({
    viewport: { width: 400, height: 840 },
    deviceScaleFactor: 2,
    isMobile: true
  });
  const mobilePage = await mobileContext.newPage();

  console.log('Navigating to https://thedesignflow.website/...');
  try {
    await mobilePage.goto('https://thedesignflow.website/', { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    console.log('Mobile navigation timeout/idle proceeding...', e.message);
  }

  await mobilePage.waitForTimeout(3000);
  
  console.log('Capturing Mobile Hero...');
  await mobilePage.screenshot({ path: path.join(outDir, 'live_mobile_hero.png') });

  console.log('Scrolling to mobile slider...');
  const mobileSlider = mobilePage.locator('section.section_hero_home_sticky');
  if (await mobileSlider.count() > 0) {
    await mobileSlider.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(2000);
    await mobilePage.screenshot({ path: path.join(outDir, 'live_mobile_slider_start.png') });

    const mBox = await mobileSlider.boundingBox();
    if (mBox) {
      for (let i = 1; i <= 3; i++) {
        await mobilePage.evaluate((y) => window.scrollTo(0, y), mBox.y + i * 840);
        await mobilePage.waitForTimeout(1500);
        await mobilePage.screenshot({ path: path.join(outDir, `live_mobile_slider_scroll_${i}.png`) });
      }
    }
  } else {
    console.log('Slider section not found in mobile view!');
  }
  await mobileContext.close();

  console.log('Closing browser...');
  await browser.close();
  console.log('All Done!');
}

run().catch(err => {
  console.error('Error running screenshot script:', err);
  process.exit(1);
});
