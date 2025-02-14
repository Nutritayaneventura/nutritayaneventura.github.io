import os
import requests

def generate_dm_response(prompt: str) -> str:
    """
    Generate a response from the LLM acting as the Dungeon Master (DM) using a hosted API.
    
    This function sends the prompt to the LLM service endpoint and returns the generated response.
    """
    # Retrieve the LLM API URL from environment variables or default to a local endpoint.
    api_url = os.getenv("LLM_API_URL", "http://localhost:8001/generate")
    
    payload = {"prompt": prompt}
    
    try:
        response = requests.post(api_url, json=payload)
        response.raise_for_status()
        result = response.json()
        return result.get("response", "No response provided by the LLM.")
    except Exception as e:
        print(f"Error calling the LLM service: {e}")
        return "Error generating response from the DM."

# Example usage (for testing purposes)
if __name__ == "__main__":
    test_prompt = "You are a mysterious dungeon master. Begin the adventure with an intriguing scenario."
    dm_reply = generate_dm_response(test_prompt)
    print("DM Reply:", dm_reply)
