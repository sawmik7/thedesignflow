import os
import time
from google import genai
from google.genai import types

def main():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY is not set.")
        return

    client = genai.Client()
    
    # Let's try the veo-2.0-generate-001 model
    model_name = "veo-2.0-generate-001"
    prompt = (
        "A cinematic, slow-motion rendering of an abstract 3D geometric visual identity system forming in space. "
        "Clean fluid motion, elegant metallic champagne gold and hot orange paths tracing out a premium brand monogram logo "
        "on a sleek pitch-black dark studio background. High-end lighting, extreme details, 8k resolution, photorealistic, "
        "professional brand design agency showreel."
    )
    
    print(f"Starting video generation using {model_name}...")
    print(f"Prompt: {prompt}")
    
    try:
        operation = client.models.generate_videos(
            model=model_name,
            prompt=prompt,
            config=types.GenerateVideosConfig(
                aspect_ratio="16:9",
                # resolution="1080p", # Let's omit or let it default to avoid API conflicts
            )
        )
        
        print(f"Operation created: {operation.name}")
        
        start_time = time.time()
        while not operation.done:
            elapsed = time.time() - start_time
            print(f"[{elapsed:.0f}s] Waiting for video generation to complete...")
            time.sleep(15)
            operation = client.operations.get(operation.name)
            
        print("Video generation finished!")
        
        generated_video = operation.response.generated_videos[0]
        output_file = "scratch/test-branding.mp4"
        os.makedirs("scratch", exist_ok=True)
        
        print("Saving video file...")
        # Save via the SDK's built-in helper
        generated_video.video.save(output_file)
        print(f"Success! Video saved to {output_file}")
        
    except Exception as e:
        print(f"Error during video generation: {e}")

if __name__ == "__main__":
    main()
