const fs = require('fs');
const path = require('path');

const contentPath = 'C:\\Users\\surve\\.gemini\\antigravity\\brain\\85b3ca8e-184d-46d1-b51b-bdc111923c6a\\.system_generated\\steps\\21\\content.md';
if (!fs.existsSync(contentPath)) {
  console.log("File does not exist:", contentPath);
  process.exit(1);
}

const data = fs.readFileSync(contentPath, 'utf8');

// Find all JSON strings or patterns of code
// Halide Topo Hero might have code embedded in a script block or hidden.
console.log("Total length:", data.length);

const keywords = ["shivendra9795kumar", "halide", "topo", "Component", "canvas", "webgl", "three", "svg", "topo-hero", "topo_hero", "TopoHero"];

for (const keyword of keywords) {
  let index = 0;
  let count = 0;
  while ((index = data.indexOf(keyword, index)) !== -1) {
    count++;
    if (count <= 10) {
      console.log(`Match for "${keyword}" at index ${index}: ${data.substring(index - 50, index + 100).replace(/\n/g, ' ')}`);
    }
    index += keyword.length;
  }
  console.log(`Total occurrences for "${keyword}": ${count}`);
}
