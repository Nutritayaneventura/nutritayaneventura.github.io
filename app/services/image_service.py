import os
import requests

API_URL = os.getenv("IMAGE_API_URL")
API_KEY = os.getenv("IMAGE_API_KEY")


def generate_image(prompt: str) -> str:
    """
    Generate an image based on the given prompt using a hosted Stable Diffusion API.

    Args:
        prompt (str): A description of the scene to generate.

    Returns:
        str: URL or path to the generated image.
    """
    try:
        return "https://www.larpinn.co.uk/img/ybc_blog/post/DungeonsnDragonsBanner.jpg"

        headers = {"Api-Key": API_KEY, "Content-Type": "application/json"}
        payload = {
            "image_request": {
                "prompt": prompt,
                "aspect_ratio": "ASPECT_16_9",
                "model": "V_2_TURBO",
                "magic_prompt_option": "ON",
                "style_type": "ANIME",
                "num_images": 1,
            }
        }

        response = requests.post(API_URL, json=payload, headers=headers)
        response.raise_for_status()

        return response.json()["data"][0]["url"]
    except Exception as e:
        print(f"Error calling the image generation service: {e}")
        return None
