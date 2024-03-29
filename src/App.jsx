import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Navbar from "./components/Navbar";
import Input from "./components/Input";
import Output from "./components/Output";
import Mic from "./components/Mic";
import Login from "./login/Login";
import "./App.css";

import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from "./config/firebase";

function App() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [response, setResponse] = useState("");
  const [bot, setBot] = useState(1);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in.
        setUser(authUser);
        localStorage.setItem("user", authUser.uid);
      } else {
        // No user is signed in.
        setUser(null);
      }
    });

    // Clean up the subscription when the component unmounts.
    return () => unsubscribe();
  }, []);

  const handleSpeechRecognition = async (query) => {
    // Send the transcript to your server (Cohere) and get the response

    try {
      const serverResponse = await fetch("http://localhost:5000/get_response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: (query === undefined) ? transcript : query }),
      });

      const responseData = await serverResponse.json();
      setResponse(responseData.response);
    } catch (error) {
      console.error("Error fetching response from server:", error);
    }
  };

  const handleSubmit = (inputValue) => {
    // Call handleSpeechRecognition function with input value
    handleSpeechRecognition(inputValue);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <>
      {!user && <Login />}
      {user && (
        <div className="app">
          <Navbar />
          <div className="InputOutput">
            <Input transcript={transcript} handleSubmit={handleSubmit} />
            <Output response={response} />
          </div>
          <Mic
            Speech={SpeechRecognition}
            handleSpeechRecognition={handleSpeechRecognition}
          />
        </div>
      )}
    </>
  );
}

export default App;
