import React, { useState, useEffect, useRef } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import "./Output.css";

const Output = ({ response }) => {
  const { speak, cancel, voices } = useSpeechSynthesis();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [generatedResponse, setGeneratedResponse] = useState("");
  const idx = useRef(0);
  const intervalId = useRef(null);
  const [selectedVoice, setSelectedVoice] = useState(voices[1]);

  const dummy = "Hi, I'm a dummy response.";

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
      voice: selectedVoice,
      onEnd: () => {
        setIsSpeaking(false);
        clearInterval(intervalId.current);
      },
    });

    intervalId.current = setInterval(() => {
      if (idx.current < response.length) {
        setGeneratedResponse(
          (prevResponse) => prevResponse + response.charAt(idx.current)
        );
        idx.current++;
      } else {
        clearInterval(intervalId.current);
      }
    }, 70); // Adjust this value to change the speed of text generation

    // Clean up on unmount
    return () => {
      clearInterval(intervalId.current);
      cancel();
      setIsSpeaking(false);
    };
  }, [response]);

  const handleRepeat = () => {
    if (isSpeaking) {
      cancel();
    }
    setIsSpeaking(true);
    speak({
      text: response,
      voice: selectedVoice,
      onEnd: () => {
        setIsSpeaking(false);
      },
    });
  };

  return (
    <div className="user-output">
      <p>Bot: {generatedResponse}</p>
      <div className="output-btns">
        <button onClick={handleRepeat}>Repeat</button>
        <button onClick={handleStop}>Stop</button>
        <select
          onChange={(e) =>
            setSelectedVoice(
              voices.find((voice) => voice.name === e.target.value)
            )
          }
        >
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Output;
