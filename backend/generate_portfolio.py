import json
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
API_KEY = os.getenv("GEMINI_API_KEY")  # Load API key from environment

def generate_portfolio(data):
    if not API_KEY:
        raise ValueError("API key is missing. Set GEMINI_API_KEY in your .env file.")

    prompt = f"""
    Create a professional portfolio for {data['name']}, a {data['profession']}.
    About: {data['about']}
    Skills: {data['skills']}
    Projects: {data['projects']}
    """

    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }

    response = requests.post(f"{API_URL}?key={API_KEY}", headers=headers, json=payload)

    # ✅ Error Handling
    if response.status_code != 200:
        return f"Error: API request failed with status {response.status_code}. Response: {response.text}"

    try:
        response_json = response.json()
        if "candidates" in response_json:
            return response_json["candidates"][0]["content"]["parts"][0]["text"]
        else:
            return "Error: No candidates found in API response."
    except json.JSONDecodeError:
        return "Error: Failed to parse API response."

# ✅ Load user input safely
try:
    with open("user_input.json", "r") as file:
        user_data = json.load(file)
except (FileNotFoundError, json.JSONDecodeError):
    print("Error: Invalid or missing user_input.json file.")
    exit(1)

portfolio_text = generate_portfolio(user_data)

# ✅ Save output safely
with open("portfolio_output.txt", "w", encoding="utf-8") as file:
    file.write(portfolio_text)

print(portfolio_text)
