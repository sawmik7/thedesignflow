const { chromium } = require('@playwright/test');
const path = require('path');

async function run() {
  console.log('Launching browser to check video layout...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173/?no-lenis=true...');
  await page.goto('http://localhost:5173/?no-lenis=true', { waitUntil: 'load' });
  await page.waitForTimeout(4000);

  const debugInfo = await page.evaluate(() => {
    const card = document.querySelector('.div_herovideoinnerholder');
    if (!card) return 'Card not found!';
    const vid = card.querySelector('video');
    const computedCard = window.getComputedStyle(card);
    const computedVid = vid ? window.getComputedStyle(vid) : null;
    const parent = card.parentElement;
    const computedParent = parent ? window.getComputedStyle(parent) : null;
    
    return {
      card: {
        className: card.className,
        display: computedCard.display,
        position: computedCard.position,
        opacity: computedCard.opacity,
        zIndex: computedCard.zIndex,
        width: computedCard.width,
        height: computedCard.height,
        transform: computedCard.transform,
        clipPath: computedCard.clipPath,
        overflow: computedCard.overflow,
        box: card.getBoundingClientRect()
      },
      video: vid ? {
        display: computedVid.display,
        position: computedVid.position,
        opacity: computedVid.opacity,
        width: computedVid.width,
        height: computedVid.height,
        transform: computedVid.transform,
        box: vid.getBoundingClientRect(),
        paused: vid.paused,
        readyState: vid.readyState
      } : 'No video element',
      parent: parent ? {
        className: parent.className,
        display: computedParent.display,
        position: computedParent.position,
        width: computedParent.width,
        height: computedParent.height,
        box: parent.getBoundingClientRect()
      } : 'No parent'
    };
  });

  console.log(JSON.stringify(debugInfo, null, 2));

  // Take a crop screenshot of the video box to see what it is rendering!
  const box = debugInfo.card.box;
  if (box && box.width > 0 && box.height > 0) {
    const outDir = 'C:/Users/surve/.gemini/antigravity/brain/0832f113-8e05-49c2-8420-73e378c2a4c6';
    console.log('Taking screenshot of video container bounding box...');
    await page.screenshot({
      path: path.join(outDir, 'debug_video_card.png'),
      clip: {
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height
      }
    });
  }

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
