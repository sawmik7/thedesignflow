const { chromium } = require('@playwright/test');

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

  // Wait for loading screen to complete
  await page.waitForTimeout(4500);

  // Get offset top
  const sliderOffsetTop = await page.evaluate(() => {
    const el = document.querySelector('section.section_hero_home_sticky');
    return el ? el.getBoundingClientRect().top + window.scrollY : null;
  });

  if (sliderOffsetTop === null) {
    console.log('ERROR: Slider section not found!');
    await browser.close();
    return;
  }

  console.log(`Slider offset top is: ${sliderOffsetTop}px`);

  const totalScroll = 1260;
  const numSlides = 6;

  // Let's do a few steps of scrolling and log the state of the DOM
  for (let i = 0; i < numSlides; i++) {
    const progress = i / (numSlides - 1);
    const scrollTarget = sliderOffsetTop + progress * totalScroll;
    
    console.log(`\n--- Scrolling to slide ${i} at scrollY: ${scrollTarget}px (progress: ${progress.toFixed(2)}) ---`);
    
    await page.evaluate((targetY) => {
      window.scrollTo(0, targetY);
      if (window.ScrollTrigger) {
        window.ScrollTrigger.update();
      }
    }, scrollTarget);
    
    await page.waitForTimeout(1500);

    const state = await page.evaluate(() => {
      const getDetails = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return 'NOT FOUND';
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          visible: rect.width > 0 && rect.height > 0,
          rect: {
            top: rect.top,
            bottom: rect.bottom,
            left: rect.left,
            right: rect.right,
            width: rect.width,
            height: rect.height
          },
          display: style.display,
          position: style.position,
          opacity: style.opacity,
          transform: style.transform,
          zIndex: style.zIndex
        };
      };

      // Get state of preloader
      const preloader = document.querySelector('div[ref="container"]') || document.querySelector('.fixed.inset-0.z-\\[99999\\]') || document.querySelector('[class*="Preloader"]');
      const preloaderState = preloader ? {
        display: window.getComputedStyle(preloader).display,
        opacity: window.getComputedStyle(preloader).opacity,
        zIndex: window.getComputedStyle(preloader).zIndex
      } : 'NOT FOUND';

      // Check for overlapping fixed/absolute containers
      const bodyChildren = Array.from(document.body.children).map(el => {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        if ((style.position === 'fixed' || style.position === 'absolute') && rect.width > 0 && rect.height > 0) {
          return {
            tag: el.tagName,
            class: el.className,
            zIndex: style.zIndex,
            display: style.display,
            opacity: style.opacity,
            rect: { top: rect.top, bottom: rect.bottom, height: rect.height }
          };
        }
        return null;
      }).filter(Boolean);

      // Detail all cards in the vertical strip
      const cards = Array.from(document.querySelectorAll('.div_herovideoinnerholder')).map((card, idx) => {
        const rect = card.getBoundingClientRect();
        const style = window.getComputedStyle(card);
        const isActive = card.classList.contains('is-active');
        return {
          index: idx,
          isActive,
          rect: { top: rect.top, bottom: rect.bottom, height: rect.height },
          opacity: style.opacity,
          transform: style.transform
        };
      });

      return {
        scrollY: window.scrollY,
        preloader: preloaderState,
        fixedBodyElements: bodyChildren,
        section: getDetails('section.section_hero_home_sticky'),
        pin: getDetails('.div_hero_home_new'),
        strip: getDetails('.div_videowrapper_vertical'),
        activeCard: cards.find(c => c.isActive) || 'NONE',
        cards
      };
    });

    console.log(JSON.stringify(state, null, 2));
  }

  await browser.close();
}

run().catch(console.error);
