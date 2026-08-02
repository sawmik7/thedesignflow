import os
from google import genai

def main():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY is not set.")
        return

    client = genai.Client()
    
    print("Listing models...")
    try:
        models = client.models.list()
        veo_models = []
        for model in models:
            if "veo" in model.name.lower():
                veo_models.append(model.name)
        
        print(f"Found {len(veo_models)} Veo models:")
        for name in veo_models:
            print(f"  - {name}")
    except Exception as e:
        print(f"Error listing models: {e}")

if __name__ == "__main__":
    main()
