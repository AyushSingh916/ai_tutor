import React, { useState, useEffect, useRef } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import "./Output.css";

import { useSelector } from "react-redux";

const Output = ({ response}) => {
  const botNum = useSelector(state => state.botNumber);
  const { speak, cancel, voices } = useSpeechSynthesis();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [generatedResponse, setGeneratedResponse] = useState("");
  const idx = useRef(0);
  const intervalId = useRef(null);
  const [selectedVoice, setSelectedVoice] = useState(voices[8]);

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
    // setSelectedVoice(voices[botSelected]);

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

    if (response !== '' || response != null) {
      intervalId.current = setInterval(() => {
        if (idx.current < response.length) {
          setGeneratedResponse(
            (prevResponse) => prevResponse + response.charAt(idx.current)
          );
          idx.current++;
        } else {
          clearInterval(intervalId.current);
        }
      }, 70);
    }

    // Clean up on unmount
    return () => {
      clearInterval(intervalId.current);
      cancel();
      setIsSpeaking(false);
    };
  }, [response]);

  // console.log(botNum);

  useEffect(() => {
    function setBotVoice(botNum) {
      if (botNum == 1) {
        setSelectedVoice(voices[0]);
      }if (botNum == 2) {
        setSelectedVoice(voices[7]);
      }if (botNum == 3) {
        setSelectedVoice(voices[2]);
      }
    }
    setBotVoice(botNum);
  }, [botNum]);

  const handleRepeat = () => {
    if (isSpeaking) {
      cancel();
    }
    setSelectedVoice(voices[botNum - 1]);
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
