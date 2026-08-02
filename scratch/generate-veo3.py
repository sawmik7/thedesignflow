import os
import time
import sys
from google import genai
from google.genai import types

# 6 fine-tuned, service-related, pure abstract animation prompts for Google Veo 3.1.
# Specifically designed to showcase animations with absolutely NO text or overlay titles.
PROMPTS = {
    "branding": {
        "prompt": (
            "A cinematic, slow-motion rendering of an abstract 3D geometric visual identity system forming in space. "
            "Clean fluid motion, elegant metallic champagne gold and hot orange paths tracing out a premium brand monogram logo "
            "on a sleek pitch-black dark studio background. High-end lighting, extreme details, 8k resolution, photorealistic, "
            "professional brand design agency showreel, no text, no title."
        ),
        "output": "public/Video/branding.mp4"
    },
    "saas": {
        "prompt": (
            "Cinematic abstract animation of premium glassmorphic UI cards and dashboard elements floating in a 3D dark-mode environment. "
            "Glowing blue data lines, elegant cohort graphs rising, and metallic UI dials spinning slowly with buttery-smooth depth-of-field "
            "blur on a dark pitch-black workspace background. Minimalist, premium SaaS aesthetic, 8k, photorealistic, no text, no title."
        ),
        "output": "public/Video/saas.mp4"
    },
    "web": {
        "prompt": (
            "Cinematic, fluid flow of abstract dark web layouts, browser windows, and luminous next-generation digital canvas components "
            "expanding in a dark space. Clean purple and silver neon glowing paths tracing web interface lines with absolute premium "
            "design detailing, responsive grid lines folding and settling. Ultra-premium digital agency aesthetic, 8k, photorealistic, "
            "no text, no title."
        ),
        "output": "public/Video/web.mp4"
    },
    "ai": {
        "prompt": (
            "A highly futuristic, abstract visualization of an autonomous AI agent network. Clean, glowing emerald green and gold "
            "data particles flowing along elegant connected node paths in a dark cybernetic space. Pulsing clusters of intelligence "
            "and intricate thinking node lines forming a beautiful digital brain. High fidelity, premium cinematic lighting, "
            "dark background, 8k, no text, no title."
        ),
        "output": "public/Video/ai.mp4"
    },
    "motion": {
        "prompt": (
            "A stunning cinematic abstract animation of premium motion design and micro-interactions. Sleek amber and warm gold spheres "
            "flowing elegantly along buttery-smooth vector curves, creating elegant trails of glowing particles. Beautiful fluid physics, "
            "ease-in-out momentum, clean interactive curves in dark space, premium design agency motion, no text, no title."
        ),
        "output": "public/Video/motion.mp4"
    },
    "ecommerce": {
        "prompt": (
            "Cinematic abstract animation of premium e-commerce card stacks, sleek product frames, and glowing sales growth graphs. "
            "Warm rose pink and golden neon accents, glassmorphic transaction cards sliding and settling elegantly in a dark studio. "
            "High-end luxury retail presentation, CRO, headless storefront vibe, photorealistic, 8k, no text, no title."
        ),
        "output": "public/Video/ecommerce.mp4"
    }
}

def main():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("❌ Error: GEMINI_API_KEY is not set.")
        sys.exit(1)

    print("🎬 Google Veo 3.1 Premium Video Generator")
    print("=========================================\n")
    
    client = genai.Client()
    
    # We will use the main Veo 3.1 generate preview model
    model_name = "veo-3.1-generate-preview"
    
    # Try listing models to confirm key authentication
    try:
        client.models.list()
        print("✅ Gemini API Key Authenticated Successfully\n")
    except Exception as e:
        print(f"❌ Authentication failed: {e}")
        sys.exit(1)

    for name, item in PROMPTS.items():
        print(f"▶ [1/2] Launching generation for service: '{name}'")
        print(f"  Prompt: {item['prompt']}")
        
        try:
            # Start asynchronous video generation operation
            operation = client.models.generate_videos(
                model=model_name,
                prompt=item['prompt'],
                config=types.GenerateVideosConfig(
                    aspect_ratio="16:9",
                )
            )
            
            print(f"  Operation created: {operation.name}")
            print("  Waiting for video to compile on Google servers...")
            
            start_time = time.time()
            while not operation.done:
                elapsed = time.time() - start_time
                print(f"  [{elapsed:.0f}s elapsed] Rendering frame buffer...")
                time.sleep(15)
                operation = client.operations.get(operation.name)
            
            print("  ✅ Video generated successfully.")
            print(f"  ▶ [2/2] Downloading and saving video to: {item['output']}")
            
            # Access response and retrieve video
            generated_video = operation.response.generated_videos[0]
            
            # Ensure folder exists
            out_dir = os.path.dirname(item['output'])
            if out_dir:
                os.makedirs(out_dir, exist_ok=True)
                
            # Download and save via SDK helper
            generated_video.video.save(item['output'])
            print(f"  ✨ Saved '{name}' video successfully!\n")
            
        except Exception as e:
            print(f"  ❌ Error during generation for '{name}': {e}")
            print("  (Please ensure your account has active GCP Billing enabled on Google AI Studio.)\n")

if __name__ == "__main__":
    main()
