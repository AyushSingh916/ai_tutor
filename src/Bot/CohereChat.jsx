import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const CohereChat = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [conversationId] = useState(uuidv4());

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios({
      url: 'https://api.cohere.ai/v1/generate',
      method: 'POST',
      headers: {
        'Authorization': 'BEARER yuHIisFoPVgscCXCenlwAdtfyhTMb9wbx1ScOiUv',
        'Content-Type': 'application/json'
      },
      data: {
        "model": "command",
        "prompt": message,
        "max_tokens": 300,
        "temperature": 0.9,
        "k": 0,
        "stop_sequences": [],
        "return_likelihoods": "NONE"
      }
    });

    if (response.data.choices && response.data.choices.length > 0) {
      setChatHistory([
        ...chatHistory,
        { user: "You", text: message },
        { user: "Assistant", text: response.data.choices[0].message },
      ]);
    } else {
      console.error("No choices in response data");
    }
  };

  return (
    <div>
      <div>
        {chatHistory.map((chat, index) => (
          <p key={index}>
            <strong>{chat.user}:</strong> {chat.text}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default CohereChat;
