import cohere
import uuid
import json
co = cohere.Client("yuHIisFoPVgscCXCenlwAdtfyhTMb9wbx1ScOiUv")

# from flask import Flask, request
# app = Flask(__name__)

# @app.route('/receive_data', methods=['POST'])
# def receive_data():
#     data = request.json['data']
#     print(data)
#     return 'Data received'

# if __name__ == '__main__':
#     app.run(port=5000)

print("Conversation is starting , please say quit to end the conversation.\n")

conversation_id = str(uuid.uuid4())

while True:
    message = input("You: ")
    if message == "quit":
        print("Conversation ended. ")
        break
    response = co.chat(message=message, preamble_override='''You are a language learning assistant. Your task is to listen to spoken English and provide corrections
                        or suggestions for improvement. The user will speak a sentence, and you should respond by correcting any grammatical errors, 
                        pronunciation issues, or providing feedback on fluency. If the user's spoken English is correct, you can acknowledge that. Keep the feedback 
                        constructive and encourage the user to try again. Please provide detailed explanations for corrections when necessary.'''
                        ,stream=True, conversation_id=conversation_id, return_chat_history=True)
    
    print("Tutor: ", end="")

    for event in response:
        if event.event_type == "text-generation":
            print(event.text, end="")
    print("")
    print("")

data = response.chat_history
print(json.dumps(data, indent=4))