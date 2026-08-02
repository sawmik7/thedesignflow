import fs from "node:fs";
import path from "node:path";

const LOGO_MAPPING = {
  "streaming.svg": "D:\\Logo - PC\\Logo\\julianhetzner - Streaming logo\\Transparent.svg",
  "beazy.svg": "D:\\Logo - PC\\Logo\\hussainmids - Beazy App\\Transparent.svg",
  "ai4testers.svg": "D:\\Logo\\ashpal - Ai4Testers\\Gradient 1.svg",
  "nexushotel.png": "D:\\Logo - PC\\Logo\\cryptoaccount - NEXUS Hotel\\TR 1.png",
  "kompress.png": "D:\\Logo - PC\\Logo\\datarclabs - kompress.me\\Kompress-1.png",
  "gymflow.png": "D:\\Logo - PC\\Logo\\iceez8 - GymFlow\\Transparent (512x512).png",
  "diaryentry.png": "D:\\Logo - PC\\Logo\\laie999 - Diary Entry\\Logo - Transparent.png",
  "masterly.png": "D:\\Logo\\Masterly\\Masterly - 4.png",
};

const DEST_DIR = path.join("public", "images", "clients");

async function main() {
  console.log("📂 Client Logo Copy Utility");
  console.log("==========================\n");

  if (!fs.existsSync(DEST_DIR)) {
    console.log(`Creating destination directory: ${DEST_DIR}`);
    fs.mkdirSync(DEST_DIR, { recursive: true });
  }

  let copiedCount = 0;
  let missingCount = 0;

  for (const [newName, sourcePath] of Object.entries(LOGO_MAPPING)) {
    const destPath = path.join(DEST_DIR, newName);

    if (fs.existsSync(sourcePath)) {
      try {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`✅ Copied: ${newName}`);
        console.log(`   From: ${sourcePath}`);
        console.log(`   To:   ${destPath}\n`);
        copiedCount++;
      } catch (err) {
        console.error(`❌ Failed to copy ${newName}: ${err.message}\n`);
      }
    } else {
      console.warn(`⚠️  Source file not found for ${newName}`);
      console.warn(`   Expected at: ${sourcePath}\n`);
      missingCount++;
    }
  }

  console.log("Summary:");
  console.log(`- Copied: ${copiedCount}`);
  console.log(`- Missing: ${missingCount}`);
}

main().catch(console.error);
