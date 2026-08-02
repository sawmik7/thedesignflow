const fs = require('fs');
const path = require('path');

const sectionsDir = 'd:\\Backup\\Download Folder\\hasanul-portfolio\\src\\components\\sections';
if (!fs.existsSync(sectionsDir)) {
  console.log("Directory does not exist:", sectionsDir);
  process.exit(1);
}

const files = fs.readdirSync(sectionsDir);
console.log("Found files:", files);

files.forEach(file => {
  if (path.extname(file) !== '.tsx') return;
  const filePath = path.join(sectionsDir, file);
  const data = fs.readFileSync(filePath, 'utf8');
  
  // Find all max-w-[0-9a-zA-Z]+ occurrences or simple max-w- class names
  const regex = /max-w-\[?[a-zA-Z0-9_-]+\]?/g;
  let match;
  const matches = [];
  while ((match = regex.exec(data)) !== null) {
    matches.push(match[0]);
  }
  
  if (matches.length > 0) {
    console.log(`File: ${file}`);
    console.log("Matches:", [...new Set(matches)]);
  }
});
