const { chromium } = require('@playwright/test');

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173/?no-lenis=true...');
  await page.goto('http://localhost:5173/?no-lenis=true', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4500); // clear loaders

  // Scroll to slide 1 where position is fixed
  await page.evaluate(() => {
    window.scrollTo(0, 3214);
  });
  await page.waitForTimeout(1000);

  const ancestorsInfo = await page.evaluate(() => {
    const el = document.querySelector('.div_hero_home_new');
    if (!el) return 'Pinned element not found';

    const path = [];
    let current = el;
    while (current) {
      const rect = current.getBoundingClientRect();
      const style = window.getComputedStyle(current);
      path.push({
        tag: current.tagName,
        class: current.className,
        id: current.id,
        position: style.position,
        transform: style.transform,
        willChange: style.willChange,
        filter: style.filter,
        perspective: style.perspective,
        rect: {
          top: rect.top,
          bottom: rect.bottom,
          height: rect.height
        }
      });
      current = current.parentElement;
    }
    return path;
  });

  console.log(JSON.stringify(ancestorsInfo, null, 2));
  await browser.close();
}

run().catch(console.error);
