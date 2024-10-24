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
import { db, auth } from "./config/firebase";
import Groq from "groq-sdk";

// Initialize Groq with API Key from environment variable
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY, // Use Vite's environment variable
  dangerouslyAllowBrowser: true,
});

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
    // Use Groq SDK to get a response for the transcript or query
    try {
      const chatCompletion = await getGroqChatCompletion(query || transcript);
      const messageContent = chatCompletion.choices[0]?.message?.content || "";
      setResponse(messageContent);
    } catch (error) {
      console.error("Error fetching response from Groq:", error);
    }
  };

  // Function to get Groq chat completion
  const getGroqChatCompletion = async (message) => {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama3-8b-8192", // Use appropriate model
    });
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
