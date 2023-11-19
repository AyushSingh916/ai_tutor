import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Navbar from "./components/Navbar";
import Input from "./components/Input";
import Output from "./components/Output";
import Mic from "./components/Mic";
import CohereChat from "./Bot/CohereChat";
import "./App.css";

function App() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [response, setResponse] = useState('');

  const handleSpeechRecognition = async () => {
    // Send the transcript to your server (Cohere) and get the response
    try {
      const serverResponse = await fetch('http://localhost:5000/get_response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: transcript }),
      });

      const responseData = await serverResponse.json();
      setResponse(responseData.response);
    } catch (error) {
      console.error('Error fetching response from server:', error);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <>
      <div className="app">
        <Navbar />
        <div className="InputOutput">
          <Input transcript={transcript} />
          <Output response={response} />
        </div>
        <Mic Speech={SpeechRecognition} onClick={handleSpeechRecognition} />
        <button onClick={handleSpeechRecognition}>Send</button>
        {console.log(response)}
      </div>
    </>
  );
}

export default App;
