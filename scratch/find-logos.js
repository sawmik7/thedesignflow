import fs from 'fs';
import path from 'path';

const LOGO_DIRS = [
  'd:\\Logo',
  'd:\\Logo - PC\\Logo'
];

function scanDir(dir) {
  if (!fs.existsSync(dir)) {
    console.error(`❌ Dir does not exist: ${dir}`);
    return [];
  }

  const results = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Look inside client folders
      const subFiles = fs.readdirSync(fullPath);
      for (const subFile of subFiles) {
        const subPath = path.join(fullPath, subFile);
        const subStat = fs.statSync(subPath);

        if (subStat.isFile() && (subFile.endsWith('.png') || subFile.endsWith('.svg'))) {
          // Exclude raw mockups, source files, or long assets if desired, but keep simple logo outputs
          const lowerName = subFile.toLowerCase();
          if (
            (lowerName.includes('logo') || lowerName.includes('icon') || lowerName.includes('mark') || lowerName.includes('final') || lowerName.includes('1') || lowerName.includes('transparent')) &&
            !lowerName.includes('screenshot') && !lowerName.includes('mockup') && !lowerName.includes('preview')
          ) {
            results.push({
              client: file,
              fileName: subFile,
              fullPath: subPath,
              sizeBytes: subStat.size
            });
          }
        }
      }
    }
  }

  return results;
}

function main() {
  console.log("🔍 Scanning logo directories...");
  let allLogos = [];

  for (const dir of LOGO_DIRS) {
    console.log(`Scanning: ${dir}...`);
    const logos = scanDir(dir);
    allLogos = allLogos.concat(logos);
    console.log(`Found ${logos.length} potential logos in ${dir}.\n`);
  }

  console.log(`Total potential logos found: ${allLogos.length}`);
  
  // Sort by size (prefer smaller transparent icons over large raw files) and show top 30
  allLogos.sort((a, b) => a.sizeBytes - b.sizeBytes);

  console.log("\nTop 30 potential logos:");
  allLogos.slice(0, 30).forEach((logo, i) => {
    console.log(`${i+1}. [${logo.client}] -> ${logo.fileName} (${(logo.sizeBytes/1024).toFixed(1)} KB)`);
    console.log(`   Path: ${logo.fullPath}`);
  });
}

main();
