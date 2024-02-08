import "./Input.css";
import React, { useState } from "react";

const Input = ({ transcript, handleSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    handleSubmit(inputValue);
    setInputValue(""); // Clear input after submitting
  };

  return (
    <div className="user-input">
      {transcript && <p>You: {transcript}</p>}
      {!transcript && (
        <>
          <input
            placeholder="Start Typing here..."
            value={inputValue}
            onChange={handleChange}
          ></input>
          <button className="input-button" onClick={handleClick}>
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default Input;
