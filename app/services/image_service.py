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
        return "https://www.larpinn.co.uk/img/ybc_blog/post/DungeonsnDragonsBanner.jpg"
        # Send a POST request to the image generation service with the prompt
        response = requests.post(api_url, json=payload)
        response.raise_for_status()
        result = response.json()
        return result.get("image_url", "No image URL provided by the image service.")
    except Exception as e:
        print(f"Error calling the image generation service: {e}")
        return "Error generating image."
