import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import Navbar from "./components/Navbar";
import Input from "./components/Input";
import Output from "./components/Output";
import Mic from "./components/Mic";
import Text from "./components/Text";
import "./App.css";

function App() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <>
      <div className="app">
        <Navbar />
        <div className="InputOutput">
          <Input transcript={transcript}/>
          <Output />
        </div>
        <Mic Speech={SpeechRecognition}/>
        {/* <Text /> */}
      </div>
    </>
  );
}

export default App;
