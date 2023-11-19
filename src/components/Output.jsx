import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import "./Output.css";

const Output = ({ response }) => {
  const { speak, cancel } = useSpeechSynthesis();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    speak({ text: response });
    setIsSpeaking(true);
  };

  const handleStop = () => {
    cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    if (response && !isSpeaking) {
      // Start speaking when there is a response and speech is not already in progress
      handleSpeak();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <div className="user-output">
      <p>Bot: {response}</p>
      <div class='output-btns'>
        <button onClick={handleSpeak} disabled={isSpeaking}>
          Repeat
        </button>
        <button onClick={handleStop}>Stop</button>
      </div>
    </div>
  );
};

export default Output;
