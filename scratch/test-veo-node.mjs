import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import path from "node:path";

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ Error: GEMINI_API_KEY environment variable is not set.");
    process.exit(1);
  }

  console.log("🎬 Testing Google Veo 3.1 Node.js Video Generation...");
  const ai = new GoogleGenAI({ apiKey });

  const modelName = "veo-3.1-generate-preview";
  const prompt = (
    "A cinematic, slow-motion rendering of an abstract 3D geometric visual identity system forming in space. " +
    "Clean fluid motion, elegant metallic champagne gold and hot orange paths tracing out a premium brand monogram logo " +
    "on a sleek pitch-black dark studio background. High-end lighting, extreme details, 8k resolution, photorealistic."
  );

  console.log(`Model: ${modelName}`);
  console.log(`Prompt: "${prompt}"`);

  try {
    console.log("Initiating video generation operation...");
    let operation = await ai.models.generateVideos({
      model: modelName,
      prompt: prompt,
      config: {
        aspectRatio: "16:9",
      },
    });

    console.log(`Operation initiated: ${operation.name}`);
    console.log("Polling for completion...");

    const startTime = Date.now();
    while (!operation.done) {
      const elapsedSec = Math.round((Date.now() - startTime) / 1000);
      console.log(`[${elapsedSec}s] Waiting for video generation...`);
      await new Promise((resolve) => setTimeout(resolve, 15000));
      operation = await ai.operations.getVideosOperation({ operation });
    }

    if (operation.error) {
      throw new Error(`Operation failed: ${JSON.stringify(operation.error)}`);
    }

    console.log("Video generation complete! Retrieving response...");
    const generatedVideo = operation.response?.generatedVideos?.[0]?.video;
    if (generatedVideo && generatedVideo.uri) {
      console.log(`Video URI: ${generatedVideo.uri}`);
      console.log("Downloading video bytes...");

      const downloadUrl = `${generatedVideo.uri}&key=${apiKey}`;
      const response = await fetch(downloadUrl);
      if (!response.ok) {
        throw new Error(`Failed to download video: ${response.statusText} (${response.status})`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const outputPath = path.join("scratch", "test-branding-node.mp4");
      fs.mkdirSync("scratch", { recursive: true });
      fs.writeFileSync(outputPath, buffer);

      console.log(`✨ Success! Video saved to ${outputPath}`);
    } else {
      throw new Error("No video URI returned in the response.");
    }
  } catch (error) {
    console.error("❌ Error during video generation:", error.message || error);
  }
}

main().catch(console.error);
