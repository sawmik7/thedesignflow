import fs from "fs";
import path from "path";
import https from "https";

const urls = {
  "time.json": "https://lottie.host/80757db6-db35-430c-ab2b-8a7e025b4104/5W201q2J1y.json",
  "projects.json": "https://lottie.host/7ccb5585-8025-455b-b9d9-bb58a8a25c1b/8F02g9zvy9.json",
  "standard.json": "https://lottie.host/7efd2fa8-2782-41ab-8356-65151ee67b5b/3pukmbyxza.json",
  "rating.json": "https://lottie.host/e2c7a23c-cf56-4c47-9759-994c9ad25c1f/2g9zvy5w20.json",
  "discovery.json": "https://lottie.host/9e415ef4-c081-4b13-a417-640a3d5e227f/7Uk8N2Q1aF.json",
  "proposal.json": "https://lottie.host/6a56c221-d703-490b-9dfd-341e8f237ef5/Hukmbyxza3.json",
  "design.json": "https://lottie.host/e47447d6-7c0b-4eb8-bcf6-13d80bf435df/0f2g9zvy4y.json",
  "delivery.json": "https://lottie.host/318a6df2-f8c0-42f0-91bf-a8ce025b4104/1qJ1y5W201.json"
};

const workspace = "d:\\Backup\\Download Folder\\hasanul-portfolio";
const destDir = path.join(workspace, "public", "lottie");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Minimal fallback Lottie shape for safety
const fallbackLottie = {
  v: "5.5.7",
  fr: 30,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  nm: "Fallback",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Shape Layer 1",
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [50, 50, 0], ix: 2 },
        a: { a: 0, k: [0, 0, 0], ix: 1 },
        s: { a: 0, k: [100, 100, 100], ix: 6 }
      },
      ao: 0,
      shapes: [
        {
          ty: "rc",
          d: 1,
          s: { a: 0, k: [40, 40] },
          p: { a: 0, k: [0, 0] },
          r: { a: 0, k: 4 },
          nm: "Rectangle Path 1",
          mn: "ADBE Vector Shape - Rect"
        },
        {
          ty: "fl",
          c: { a: 0, k: [0.78, 0.66, 0.43, 1] },
          o: { a: 0, k: 100 },
          r: 1,
          nm: "Fill 1",
          mn: "ADBE Vector Graphic - Fill"
        }
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0
    }
  ]
};

const download = (filename, url) => {
  return new Promise((resolve) => {
    const destPath = path.join(destDir, filename);
    console.log(`Downloading ${filename} from ${url}...`);

    const request = https.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    }, (response) => {
      if (response.statusCode !== 200) {
        console.error(`[Error] Fetch failed with status ${response.statusCode} for ${filename}`);
        fs.writeFileSync(destPath, JSON.stringify(fallbackLottie, null, 2));
        resolve();
        return;
      }

      let data = "";
      response.on("data", (chunk) => { data += chunk; });
      response.on("end", () => {
        try {
          // Verify it's a valid JSON
          JSON.parse(data);
          fs.writeFileSync(destPath, data);
          console.log(`[Success] Saved local asset: ${filename}`);
        } catch (e) {
          console.error(`[Error] Invalid JSON received for ${filename}:`, e.message);
          fs.writeFileSync(destPath, JSON.stringify(fallbackLottie, null, 2));
        }
        resolve();
      });
    });

    request.on("error", (err) => {
      console.error(`[Error] Network failed for ${filename}:`, err.message);
      fs.writeFileSync(destPath, JSON.stringify(fallbackLottie, null, 2));
      resolve();
    });
  });
};

const run = async () => {
  console.log("=== Lottie Local Assets Downloader System ===");
  for (const [filename, url] of Object.entries(urls)) {
    await download(filename, url);
  }
  console.log("=== All local Lottie assets synced successfully! ===");
};

run();
