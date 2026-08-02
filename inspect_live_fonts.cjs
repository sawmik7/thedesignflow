const { chromium } = require('@playwright/test');

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();

  console.log('Navigating to https://uncommondesign.group/...');
  try {
    await page.goto('https://uncommondesign.group/', { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    console.log('Navigation proceeding...', e.message);
  }

  await page.waitForTimeout(4000);

  const cssDetails = await page.evaluate(() => {
    // 1. Find all font-families
    const fontFamilies = new Set();
    const headingsFont = window.getComputedStyle(document.querySelector('h1')).fontFamily;
    const bodyFont = window.getComputedStyle(document.body).fontFamily;
    
    fontFamilies.add({ element: 'h1', font: headingsFont });
    fontFamilies.add({ element: 'body', font: bodyFont });

    // Try other typical elements
    const button = document.querySelector('button');
    if (button) fontFamilies.add({ element: 'button', font: window.getComputedStyle(button).fontFamily });

    // 2. Fetch specific classes or styles
    const styles = Array.from(document.styleSheets).map(sheet => {
      try {
        return Array.from(sheet.cssRules).map(rule => {
          if (rule.cssText.includes('font-family')) {
            return rule.cssText;
          }
          return null;
        }).filter(Boolean);
      } catch (e) {
        return ['Security restricted sheet: ' + sheet.href];
      }
    }).flat();

    return {
      h1Font: headingsFont,
      bodyFont: bodyFont,
      fontFamilies: Array.from(fontFamilies),
      sampleRules: styles.slice(0, 30) // get first 30 font-family rules
    };
  });

  console.log('FONTS INSPECTION RESULTS:');
  console.log(JSON.stringify(cssDetails, null, 2));

  await browser.close();
}

run().catch(console.error);
