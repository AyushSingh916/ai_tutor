from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

OPENAI_BASE_URL = "http://localhost:1234/v1"
OPENAI_API_KEY = "not-needed"

@app.route("/get_response", methods=["POST"])
def get_response():
    try:
        data = request.json

        # Extract the message from the request data
        message = data.get("message")

        # Send a request to the OpenAI server
        completion = send_openai_request(message)

        # Extract the response from the completion
        response = completion.get("choices")[0].get("message").get("content")

        return jsonify({"response": response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def send_openai_request(message):
    try:
        # Compose the data payload for the OpenAI request
        payload = {
            "model": "local-model",  # this field is currently unused
            "messages": [
                {"role": "system", "content": "You are a virtual therapeutic support companion. Your role is to engage in empathetic conversations with users expressing their feelings and thoughts. When a user shares their emotions or experiences, provide supportive responses, offer reflective listening, and encourage open communication. If the user expresses distress or negative thoughts, respond with empathy and consider suggesting positive coping strategies or recommending professional help if necessary. Ensure your interactions are respectful, non-judgmental, and considerate of the user's emotions. Your goal is to create a safe and supportive space for users to express themselves and promote mental well-being. Please refrain from providing medical advice and encourage users to seek professional help if needed."},
                {"role": "user", "content": message}
            ],
            "temperature": 0.7
        }

        # Send a POST request to the OpenAI server
        response = requests.post(
            f"{OPENAI_BASE_URL}/chat/completions",
            headers={"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json"},
            json=payload
        )

        response.raise_for_status()

        return response.json()

    except requests.exceptions.RequestException as e:
        raise Exception(f"Error sending request to OpenAI: {str(e)}")

if __name__ == "__main__":
    app.run(host="localhost", port=5000)
