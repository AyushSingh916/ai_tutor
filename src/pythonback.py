from flask import Flask, request, jsonify
from flask_cors import CORS
import cohere
import uuid
import json
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app, origins="http://localhost:5173", allow_headers=["Content-Type", "Authorization"])

# Retrieve the API key from the environment variables
cohere_api_key = os.getenv("COHERE_API_KEY")

if not cohere_api_key:
    raise ValueError("Cohere API key not found in environment variables")

co = cohere.Client(cohere_api_key)

@app.route('/get_response', methods=['POST'])
def get_response():
    data = request.json
    message = data.get('message', '')
    
    if not message:
        return jsonify({'error': 'Message not provided'}), 400

    conversation_id = str(uuid.uuid4())
    conversation_id = "123459876"

    response = co.chat(
        message=message,
        preamble_override='''Your preamble here.''',
        stream=True,
        conversation_id=conversation_id,
        return_chat_history=True
    )

    tutor_response = ""
    for event in response:
        if event.event_type == "text-generation":
            tutor_response += event.text

    return jsonify({'response': tutor_response, 'conversation_id': conversation_id})

if __name__ == '__main__':
    app.run(port=5000)
