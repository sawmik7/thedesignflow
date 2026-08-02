const { chromium } = require('@playwright/test');
const path = require('path');

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox', 
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  });
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

  // Wait for loading screen to complete and display: none
  console.log('Waiting for loaders to clear...');
  await page.waitForTimeout(4500);

  const outDir = 'C:/Users/surve/.gemini/antigravity/brain/07d01be3-cd50-43e6-9b26-99881b224065';
  
  // Retrieve the offset top of the sticky slider section
  console.log('Locating slider...');
  const sliderOffsetTop = await page.evaluate(() => {
    const el = document.querySelector('section.section_hero_home_sticky');
    return el ? el.getBoundingClientRect().top + window.scrollY : null;
  });

  if (sliderOffsetTop === null) {
    console.log('ERROR: Slider section element not found!');
    await browser.close();
    return;
  }

  console.log(`Slider offset top found at: ${sliderOffsetTop}px`);

  // Define total scrollable distance for the ScrollTrigger pin
  // Section height is 6300px (7 * 900px), viewport is 900px, so total scroll path is 5400px
  const totalScroll = 5400;
  const numSlides = 6;
  
  for (let i = 0; i < numSlides; i++) {
    // Calculate exact scroll target
    const progress = i / (numSlides - 1);
    const scrollTarget = sliderOffsetTop + progress * totalScroll;
    
    console.log(`Scrolling to slide ${i} (${worksTitle[i]}) at scrollY: ${scrollTarget}px (progress: ${progress.toFixed(2)})...`);
    
    await page.evaluate((targetY) => {
      window.scrollTo(0, targetY);
      // Force ScrollTrigger to update immediately
      if (window.ScrollTrigger) {
        window.ScrollTrigger.update();
      }
    }, scrollTarget);
    
    // Give GSAP time to update and videos to load/render
    await page.waitForTimeout(1500);
    
    // Capture and save screenshot
    const filename = `slide_clean_capture_${i}.png`;
    const filepath = path.join(outDir, filename);
    await page.screenshot({ path: filepath });
    console.log(`Saved screenshot: ${filename}`);
  }

  console.log('Closing browser...');
  await browser.close();
  console.log('All clean slides captured successfully!');
}

const worksTitle = [
  "Branding",
  "SaaS UI",
  "Web Design",
  "AI Automation",
  "Motion Design",
  "E-commerce"
];

run().catch(err => {
  console.error('Error running screenshot script:', err);
  process.exit(1);
});
