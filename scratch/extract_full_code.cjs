const fs = require('fs');

const contentPath = 'C:\\Users\\surve\\.gemini\\antigravity\\brain\\85b3ca8e-184d-46d1-b51b-bdc111923c6a\\.system_generated\\steps\\21\\content.md';
const data = fs.readFileSync(contentPath, 'utf8');

// Find all HTML blocks that look like Shiki code blocks.
const startIndex = data.indexOf('canvasRef');
if (startIndex === -1) {
  console.log("Could not find canvasRef");
  process.exit(1);
}

// Let's print out 80000 characters after to make sure we capture everything.
const startSlice = Math.max(0, startIndex - 200);
const endSlice = Math.min(data.length, startIndex + 80000);

const slice = data.substring(startSlice, endSlice);

function stripTags(html) {
  return html.replace(/<[^>]*>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&#x3C;/g, '<').replace(/&#x3E;/g, '>');
}

const textContent = stripTags(slice);
fs.writeFileSync('scratch/extracted_full_hero.txt', textContent);
console.log("Wrote full text to scratch/extracted_full_hero.txt. File length:", textContent.length);
