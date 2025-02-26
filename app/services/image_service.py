import os
import requests
from app.services.logger import Logger

API_URL = os.getenv("IMAGE_API_URL")
API_KEY = os.getenv("IMAGE_API_KEY")

logger = Logger()


def generate_image(prompt: str) -> str:
    try:
        logger.log(f"Generating image...")
        logger.log(f"Image prompt: {prompt}")

        headers = {"Api-Key": API_KEY, "Content-Type": "application/json"}
        payload = {
            "image_request": {
                "prompt": prompt,
                "aspect_ratio": "ASPECT_16_9",
                "model": "V_2",
                "magic_prompt_option": "OFF",
                "style_type": "GENERAL",
                "num_images": 1,
            }
        }

        response = requests.post(API_URL, json=payload, headers=headers)
        response.raise_for_status()

        return response.json()["data"][0]["url"]
    except Exception as e:
        logger.log(f"Error calling the image generation service: {e}")
        return None
