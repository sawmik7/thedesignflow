const { chromium } = require('@playwright/test');

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();

  console.log('Navigating to https://thedesignflow.website/...');
  try {
    await page.goto('https://thedesignflow.website/', { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    console.log('Navigation timeout/idle proceeding...', e.message);
  }

  await page.waitForTimeout(4000);

  const state = await page.evaluate(() => {
    // 1. Get Preloader state
    const preloader = document.querySelector('[class*="Preloader"]') || document.querySelector('[class*="preloader"]');
    const preloaderState = preloader ? {
      class: preloader.className,
      display: window.getComputedStyle(preloader).display,
      opacity: window.getComputedStyle(preloader).opacity,
      zIndex: window.getComputedStyle(preloader).zIndex
    } : 'NOT FOUND';

    // 2. Get Hero section state
    const hero = document.querySelector('section.relative.min-h-screen');
    const heroState = hero ? {
      rect: hero.getBoundingClientRect(),
      zIndex: window.getComputedStyle(hero).zIndex,
      display: window.getComputedStyle(hero).display
    } : 'NOT FOUND';

    // 3. Get Slider state
    const slider = document.querySelector('section.section_hero_home_sticky');
    const sliderState = slider ? {
      rect: slider.getBoundingClientRect(),
      heightStyle: slider.style.height,
      display: window.getComputedStyle(slider).display
    } : 'NOT FOUND';

    // 4. Get Pinned section state
    const pin = document.querySelector('.div_hero_home_new');
    const pinState = pin ? {
      rect: pin.getBoundingClientRect(),
      display: window.getComputedStyle(pin).display,
      position: window.getComputedStyle(pin).position,
      zIndex: window.getComputedStyle(pin).zIndex,
      opacity: window.getComputedStyle(pin).opacity
    } : 'NOT FOUND';

    // 5. Get heading states
    const headings = Array.from(document.querySelectorAll('.h1_hero_home')).map((h, i) => {
      const style = window.getComputedStyle(h);
      const rect = h.getBoundingClientRect();
      return {
        index: i,
        text: h.textContent,
        opacity: style.opacity,
        visibility: style.visibility,
        display: style.display,
        rect: { top: rect.top, height: rect.height }
      };
    });

    // 6. Get subtitles
    const subs = Array.from(document.querySelectorAll('.p_subtitle_home')).map((s, i) => {
      const style = window.getComputedStyle(s);
      return {
        index: i,
        text: s.textContent,
        opacity: style.opacity,
        visibility: style.visibility
      };
    });

    // 7. Get cards
    const cards = Array.from(document.querySelectorAll('.div_herovideoinnerholder')).map((c, i) => {
      const style = window.getComputedStyle(c);
      const rect = c.getBoundingClientRect();
      return {
        index: i,
        isActive: c.classList.contains('is-active'),
        opacity: style.opacity,
        rect: { top: rect.top, height: rect.height }
      };
    });

    return {
      preloader: preloaderState,
      hero: heroState,
      slider: sliderState,
      pin: pinState,
      headings,
      subs,
      cards
    };
  });

  console.log('LIVE STATE RESULTS:');
  console.log(JSON.stringify(state, null, 2));

  await browser.close();
}

run().catch(console.error);
