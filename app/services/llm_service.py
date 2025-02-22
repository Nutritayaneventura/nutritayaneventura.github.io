import os
import requests

API_URL = os.getenv("LLM_API_URL")


def generate_dm_response(prompt: str) -> str:
    """
    Generate a response from the LLM acting as the Dungeon Master (DM) using a hosted API.

    Args:
        prompt (str): The player's message to the DM.

    Returns:
        str: The DM's response to the player's message.
    """
    payload = {"prompt": prompt}

    try:
        return "This is a sample response. " * 20 + "\n" * 20 + "End of response."

        response = requests.post(API_URL, json=payload)
        response.raise_for_status()
        result = response.json()
        return result["response"]
    except Exception as e:
        print(f"Error calling the LLM service: {e}")
        return None


def generate_image_prompt(dm_response: str) -> str:
    """
    Generate an image prompt based on the DM's response.

    Args:
        dm_response (str): The DM's response to the player's message.

    Returns:
        str: A description of the scene to generate an image.
    """
    prompt = dm_response
    payload = {"prompt": prompt}

    try:
        return "A dark forest with ancient ruins and a dragon in the distance."

        response = requests.post(API_URL, json=payload)
        response.raise_for_status()
        result = response.json()
        return result["response"]
    except Exception as e:
        print(f"Error generating image prompt: {e}")
        return None
