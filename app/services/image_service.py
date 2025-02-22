import os
import requests
from app.services.logger import Logger

API_URL = os.getenv("IMAGE_API_URL")
API_KEY = os.getenv("IMAGE_API_KEY")

logger = Logger()


def generate_image(prompt: str) -> str:
    try:
        logger.log(f"Generating image...")
        logger.log(f"Prompt: {prompt}")
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
        logger.log(f"Error calling the image generation service: {e}")
        return None
