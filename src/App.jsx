import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Navbar from "./components/Navbar";
import Input from "./components/Input";
import Output from "./components/Output";
import Mic from "./components/Mic";
import "./App.css";

function App() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [response, setResponse] = useState("");
  const [bot, setBot] = useState(1);

  const handleSpeechRecognition = async () => {
    // Send the transcript to your server (Cohere) and get the response
    try {
      const serverResponse = await fetch("http://localhost:5000/get_response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: transcript }),
      });

      const responseData = await serverResponse.json();
      setResponse(responseData.response);
    } catch (error) {
      console.error("Error fetching response from server:", error);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleBotsClick = (bot) => {
    console.log(bot);
    if (bot == 1) {
      setBot(9);
    } else if (bot == 2) {
      setBot(8);
    } else {
      setBot(bot);
    }
  };

  return (
    <>
      <div className="app">
        <Navbar handleBotChange={handleBotsClick} />
        <div className="InputOutput">
          <Input transcript={transcript} />
          <Output response={response} botNum={bot} />
        </div>
        <Mic
          Speech={SpeechRecognition}
          handleSpeechRecognition={handleSpeechRecognition}
        />
        {/* <button onClick={handleSpeechRecognition}>Send</button> */}
        {/* {console.log(response)} */}
      </div>
    </>
  );
}

export default App;
