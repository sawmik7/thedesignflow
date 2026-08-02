const { chromium } = require('@playwright/test');

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  
  // ── DESKTOP VIEWPORT ────────────────────────────────────────────────────────
  console.log('\n=== TESTING DESKTOP (1440x900) ===');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const desktopPage = await desktopContext.newPage();
  
  console.log('Navigating to https://utopaistudios.com...');
  await desktopPage.goto('https://utopaistudios.com', { waitUntil: 'networkidle', timeout: 30000 });
  
  const desktopStyles = await desktopPage.evaluate(() => {
    function getStyle(selector) {
      const el = document.querySelector(selector);
      if (!el) return `${selector} not found`;
      const computed = window.getComputedStyle(el);
      return {
        selector,
        tag: el.tagName,
        display: computed.display,
        position: computed.position,
        left: computed.left,
        right: computed.right,
        top: computed.top,
        bottom: computed.bottom,
        width: computed.width,
        height: computed.height,
        transform: computed.transform,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
        fontFamily: computed.fontFamily,
        lineHeight: computed.lineHeight,
        letterSpacing: computed.letterSpacing,
        textTransform: computed.textTransform,
        textAlign: computed.textAlign,
        margin: computed.margin,
        padding: computed.padding,
        aspectRatio: computed.aspectRatio
      };
    }
    
    return {
      section: getStyle('.section_hero_home_sticky'),
      pinDiv: getStyle('.div_hero_home_new'),
      headingWrapper: getStyle('.div_headingwrapper'),
      heading: getStyle('.h1_hero_home'),
      videoWrapper: getStyle('.div_videowrapper_vertical'),
      videoCard: getStyle('.div_herovideoinnerholder'),
      rightSide: getStyle('.div_hero_rightside'),
      subtitleWrapper: getStyle('.div_subtitlewrapper'),
      subtitle: getStyle('.p_subtitle_home'),
      buttonHolder: getStyle('.div_hero_buttonholder.mobile'),
      button: getStyle('.button_primary.hero')
    };
  });
  
  console.log('Desktop Styles:', JSON.stringify(desktopStyles, null, 2));
  await desktopContext.close();

  // ── MOBILE VIEWPORT ─────────────────────────────────────────────────────────
  console.log('\n=== TESTING MOBILE (400x840) ===');
  const mobileContext = await browser.newContext({
    viewport: { width: 400, height: 840 },
    isMobile: true
  });
  const mobilePage = await mobileContext.newPage();
  
  console.log('Navigating to https://utopaistudios.com...');
  await mobilePage.goto('https://utopaistudios.com', { waitUntil: 'networkidle', timeout: 30000 });
  
  const mobileStyles = await mobilePage.evaluate(() => {
    function getStyle(selector) {
      const el = document.querySelector(selector);
      if (!el) return `${selector} not found`;
      const computed = window.getComputedStyle(el);
      return {
        selector,
        tag: el.tagName,
        display: computed.display,
        position: computed.position,
        left: computed.left,
        right: computed.right,
        top: computed.top,
        bottom: computed.bottom,
        width: computed.width,
        height: computed.height,
        transform: computed.transform,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
        fontFamily: computed.fontFamily,
        lineHeight: computed.lineHeight,
        letterSpacing: computed.letterSpacing,
        textTransform: computed.textTransform,
        textAlign: computed.textAlign,
        margin: computed.margin,
        padding: computed.padding,
        aspectRatio: computed.aspectRatio
      };
    }
    
    return {
      section: getStyle('.section_hero_home_sticky'),
      pinDiv: getStyle('.div_hero_home_new'),
      headingWrapper: getStyle('.div_headingwrapper'),
      heading: getStyle('.h1_hero_home'),
      videoWrapper: getStyle('.div_videowrapper_vertical'),
      videoCard: getStyle('.div_herovideoinnerholder'),
      rightSide: getStyle('.div_hero_rightside'),
      subtitleWrapper: getStyle('.div_subtitlewrapper'),
      subtitle: getStyle('.p_subtitle_home'),
      buttonHolder: getStyle('.div_hero_buttonholder.mobile'),
      button: getStyle('.button_primary.hero')
    };
  });
  
  console.log('Mobile Styles:', JSON.stringify(mobileStyles, null, 2));
  await mobileContext.close();

  await browser.close();
}

run().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
