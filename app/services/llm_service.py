import os
import requests

def generate_dm_response(prompt: str) -> str:
    """
    Generate a response from the LLM acting as the Dungeon Master (DM) using a hosted API.
    
    This function sends the prompt to the LLM service endpoint and returns the generated response.
    """
    api_url = os.getenv("LLM_API_URL", "http://localhost:8001/generate")
    
    payload = {"prompt": prompt}
    
    try:
        return "This is a test response. "*20 + "\n"*20 + "End of response."
        # Send a POST request to the LLM service with the prompt.
        response = requests.post(api_url, json=payload)
        response.raise_for_status()
        result = response.json()
        return result.get("response", "No response provided by the LLM.")
    except Exception as e:
        print(f"Error calling the LLM service: {e}")
        return "Error generating response from the DM."
