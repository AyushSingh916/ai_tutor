import React, { useState, useEffect, useRef } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import "./Output.css";

const Output = ({ response }) => {
  const { speak, cancel } = useSpeechSynthesis();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [generatedResponse, setGeneratedResponse] = useState("");
  const idx = useRef(0);
  const intervalId = useRef(null);

  const handleStop = () => {
    cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    // Clear any existing interval when the component re-renders
    clearInterval(intervalId.current);

    // Reset variables
    idx.current = 0;
    setGeneratedResponse("");

    // Start speech and text generation
    setIsSpeaking(true);
    speak({
      text: response,
      onEnd: () => {
        setIsSpeaking(false);
        clearInterval(intervalId.current);
      },
    });

    intervalId.current = setInterval(() => {
      if (idx.current < response.length) {
        setGeneratedResponse((prevResponse) => prevResponse + response.charAt(idx.current));
        idx.current++;
      } else {
        clearInterval(intervalId.current);
      }
    }, 100); // Adjust this value to change the speed of text generation

    // Clean up on unmount
    return () => {
      clearInterval(intervalId.current);
      cancel();
      setIsSpeaking(false);
    };
  }, [response]);

  return (
    <div className="user-output">
      <p>Bot: {generatedResponse}</p>
      <div className='output-btns'>
        <button onClick={handleStop}>Stop</button>
      </div>
    </div>
  );
};

export default Output;
