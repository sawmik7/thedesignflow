const fs = require('fs');

const contentPath = 'C:\\Users\\surve\\.gemini\\antigravity\\brain\\85b3ca8e-184d-46d1-b51b-bdc111923c6a\\.system_generated\\steps\\21\\content.md';
const data = fs.readFileSync(contentPath, 'utf8');

// Find all HTML blocks that look like Shiki code blocks.
// They contain elements like <span style="--shiki-light:...
// Let's extract the text content of these elements.
const startIndex = data.indexOf('canvasRef');
if (startIndex === -1) {
  console.log("Could not find canvasRef");
  process.exit(1);
}

// Let's print out 15000 characters before and after to inspect the structure
const startSlice = Math.max(0, startIndex - 10000);
const endSlice = Math.min(data.length, startIndex + 30000);

const slice = data.substring(startSlice, endSlice);
fs.writeFileSync('scratch/extracted_raw_html.txt', slice);
console.log("Wrote raw HTML slice to scratch/extracted_raw_html.txt");

// Let's write a simple helper to strip HTML tags from the slice to see the text
function stripTags(html) {
  return html.replace(/<[^>]*>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#39;/g, "'");
}

const textContent = stripTags(slice);
fs.writeFileSync('scratch/extracted_text.txt', textContent);
console.log("Wrote stripped text to scratch/extracted_text.txt");
