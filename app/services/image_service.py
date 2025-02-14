import os
import requests

def generate_image(prompt: str) -> str:
    """
    Generate an image based on the given prompt using a hosted Stable Diffusion API.

    Args:
        prompt (str): A description of the scene to generate.

    Returns:
        str: URL or path to the generated image.
    """
    # Retrieve the image generation API URL from environment variables or default to a local endpoint.
    api_url = os.getenv("IMAGE_API_URL", "http://localhost:8002/generate")

    payload = {
        "prompt": prompt,
        "style": "dark fantasy",  # default style, adjust as needed
        "resolution": "1024x768"
    }

    try:
        response = requests.post(api_url, json=payload)
        response.raise_for_status()
        result = response.json()
        return result.get("image_url", "No image URL provided by the image service.")
    except Exception as e:
        print(f"Error calling the image generation service: {e}")
        return "Error generating image."

# Example usage (for testing purposes)
if __name__ == "__main__":
    test_prompt = "A mysterious forest at dusk, with looming shadows and a hint of magic."
    image_url = generate_image(test_prompt)
    print("Generated Image URL:", image_url)
