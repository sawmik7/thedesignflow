const { chromium } = require('@playwright/test');

async function run() {
  console.log('Launching browser to diagnose workslider videos...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  // Capture console errors
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.text().includes('video') || msg.text().includes('Video')) {
      console.log(`[Browser Console] ${msg.type().toUpperCase()}: ${msg.text()}`);
    }
  });

  page.on('pageerror', err => {
    console.log(`[Browser PageError] ${err.toString()}`);
  });

  page.on('requestfailed', request => {
    console.log(`[Browser RequestFailed] ${request.url()} failed: ${request.failure().errorText}`);
  });

  console.log('Navigating to local site...');
  try {
    await page.goto('http://localhost:5173/?no-lenis=true', { waitUntil: 'load', timeout: 15000 });
  } catch (e) {
    console.log('Failed to navigate:', e.message);
  }

  await page.waitForTimeout(3000);

  console.log('\n--- Diagnosing video elements in DOM ---');
  const diagnostics = await page.evaluate(() => {
    const videos = Array.from(document.querySelectorAll('video'));
    return videos.map((v, i) => {
      const sources = Array.from(v.querySelectorAll('source')).map(s => ({
        src: s.src,
        type: s.getAttribute('type')
      }));
      return {
        index: i,
        id: v.id,
        currentSrc: v.currentSrc,
        srcAttribute: v.getAttribute('src'),
        sources: sources,
        paused: v.paused,
        ended: v.ended,
        readyState: v.readyState,
        networkState: v.networkState,
        error: v.error ? { code: v.error.code, message: v.error.message } : null,
        clientWidth: v.clientWidth,
        clientHeight: v.clientHeight,
        displayStyle: window.getComputedStyle(v).display,
        visibilityStyle: window.getComputedStyle(v).visibility,
        opacityStyle: window.getComputedStyle(v).opacity,
        parentClass: v.parentElement ? v.parentElement.className : 'none',
        parentDisplay: v.parentElement ? window.getComputedStyle(v.parentElement).display : 'none'
      };
    });
  });

  console.log(JSON.stringify(diagnostics, null, 2));

  console.log('\nClosing browser...');
  await browser.close();
  console.log('Done!');
}

run().catch(err => {
  console.error('Error running diagnostic script:', err);
  process.exit(1);
});
