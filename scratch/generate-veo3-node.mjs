import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import path from "node:path";

// 6 fine-tuned, service-related, pure abstract animation prompts for Google Veo 3.1.
// Specifically designed to showcase animations with absolutely NO text or overlay titles.
const PROMPTS = {
  branding: {
    prompt:
      "A cinematic, slow-motion rendering of an abstract 3D geometric visual identity system forming in space. " +
      "Clean fluid motion, elegant metallic champagne gold and hot orange paths tracing out a premium brand monogram logo " +
      "on a sleek pitch-black dark studio background. High-end lighting, extreme details, 8k resolution, photorealistic, no text, no title.",
    output: "public/Video/branding.mp4",
  },
  saas: {
    prompt:
      "Cinematic abstract animation of premium glassmorphic UI cards and dashboard elements floating in a 3D dark-mode environment. " +
      "Glowing blue data lines, elegant cohort graphs rising, and metallic UI dials spinning slowly with buttery-smooth depth-of-field " +
      "blur on a dark pitch-black workspace background. Minimalist, premium SaaS aesthetic, 8k, photorealistic, no text, no title.",
    output: "public/Video/saas.mp4",
  },
  web: {
    prompt:
      "Cinematic, fluid flow of abstract dark web layouts, browser windows, and luminous next-generation digital canvas components " +
      "expanding in a dark space. Clean purple and silver neon glowing paths tracing web interface lines with absolute premium " +
      "design detailing, responsive grid lines folding and settling. Ultra-premium digital agency aesthetic, 8k, photorealistic, no text, no title.",
    output: "public/Video/web.mp4",
  },
  ai: {
    prompt:
      "A highly futuristic, abstract visualization of an autonomous AI agent network. Clean, glowing emerald green and gold " +
      "data particles flowing along elegant connected node paths in a dark cybernetic space. Pulsing clusters of intelligence " +
      "and intricate thinking node lines forming a beautiful digital brain. High fidelity, premium cinematic lighting, " +
      "dark background, 8k, no text, no title.",
    output: "public/Video/ai.mp4",
  },
  motion: {
    prompt:
      "A stunning cinematic abstract animation of premium motion design and micro-interactions. Sleek amber and warm gold spheres " +
      "flowing elegantly along buttery-smooth vector curves, creating elegant trails of glowing particles. Beautiful fluid physics, " +
      "ease-in-out momentum, clean interactive curves in dark space, premium design agency motion, no text, no title.",
    output: "public/Video/motion.mp4",
  },
  ecommerce: {
    prompt:
      "Cinematic abstract animation of premium e-commerce card stacks, sleek product frames, and glowing sales growth graphs. " +
      "Warm rose pink and golden neon accents, glassmorphic transaction cards sliding and settling elegantly in a dark studio. " +
      "High-end luxury retail presentation, CRO, headless storefront vibe, photorealistic, 8k, no text, no title.",
    output: "public/Video/ecommerce.mp4",
  },
};

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ Error: GEMINI_API_KEY environment variable is not set.");
    process.exit(1);
  }

  console.log("🎬 Google Veo 3.1 Node.js Video Generator");
  console.log("=========================================\n");

  const ai = new GoogleGenAI({ apiKey });
  const modelName = "veo-3.1-generate-preview";

  for (const [name, item] of Object.entries(PROMPTS)) {
    console.log(`▶ [1/2] Launching generation for service: '${name}'`);
    console.log(`  Prompt: "${item.prompt}"`);

    try {
      let operation = await ai.models.generateVideos({
        model: modelName,
        prompt: item.prompt,
        config: {
          aspectRatio: "16:9",
        },
      });

      console.log(`  Operation created: ${operation.name}`);
      console.log("  Waiting for video to compile on Google servers...");

      const startTime = Date.now();
      while (!operation.done) {
        const elapsedSec = Math.round((Date.now() - startTime) / 1000);
        console.log(`  [${elapsedSec}s elapsed] Rendering frame buffer...`);
        await new Promise((resolve) => setTimeout(resolve, 15000));
        operation = await ai.operations.getVideosOperation({ operation });
      }

      if (operation.error) {
        throw new Error(`Operation failed: ${JSON.stringify(operation.error)}`);
      }

      console.log("  ✅ Video generated successfully.");
      console.log(`  ▶ [2/2] Downloading and saving video to: ${item.output}`);

      const generatedVideo = operation.response?.generatedVideos?.[0]?.video;
      if (generatedVideo && generatedVideo.uri) {
        const downloadUrl = `${generatedVideo.uri}&key=${apiKey}`;
        const response = await fetch(downloadUrl);
        if (!response.ok) {
          throw new Error(`Failed to download video: ${response.statusText} (${response.status})`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const outDir = path.dirname(item.output);
        if (!fs.existsSync(outDir)) {
          fs.mkdirSync(outDir, { recursive: true });
        }

        fs.writeFileSync(item.output, buffer);
        console.log(`  ✨ Saved '${name}' video successfully!\n`);
      } else {
        throw new Error("No video URI returned in the response.");
      }
    } catch (error) {
      console.error(`  ❌ Error during generation for '${name}':`, error.message || error);
      console.log("  (Please ensure your account has active GCP Billing enabled on Google AI Studio.)\n");
    }
  }
}

main().catch(console.error);
