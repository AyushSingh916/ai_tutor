import React, { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit"; // Import the hook

import "./Output.css";

const Output = ({ response }) => {
  const { speak, cancel } = useSpeechSynthesis(); // Initialize the speech synthesis hook

  const handleSpeak = () => {
    speak({ text: response }); // Speak the response when the "Speak" button is clicked
  };

  const handleStop = () => {
    cancel(); // Stop speaking when the "Stop" button is clicked
  };

  return (
    <div className="user-output">
      <p>{response}</p>
      <button onClick={handleSpeak}>Repeat</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};

export default Output;
