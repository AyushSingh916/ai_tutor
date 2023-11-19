from flask import Flask, request, jsonify
from flask_cors import CORS
import cohere
import uuid
import json

app = Flask(__name__)
CORS(app, origins="http://localhost:5173", allow_headers=["Content-Type", "Authorization"])


co = cohere.Client("yuHIisFoPVgscCXCenlwAdtfyhTMb9wbx1ScOiUv")

@app.route('/get_response', methods=['POST'])
def get_response():
    data = request.json
    message = data.get('message', '')
    
    if not message:
        return jsonify({'error': 'Message not provided'}), 400

    conversation_id = str(uuid.uuid4())

    response = co.chat(
        message=message,
        preamble_override='''You are a language learning assistant. Your task is to listen to spoken English and provide corrections
                        or suggestions for improvement. The user will speak a sentence, and you should respond by correcting any grammatical errors, 
                        pronunciation issues, or providing feedback on fluency. If the user's spoken English is correct, you can acknowledge that. Keep the feedback 
                        constructive and encourage the user to try again. Please provide detailed explanations for corrections when necessary.''',
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
