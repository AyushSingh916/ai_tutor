import React, { forwardRef } from "react";
import "./BotsModal.css"; 

import { useDispatch } from "react-redux";
import { botActions } from "../../store/BotSlice";

const BotsModal = forwardRef((props, ref) => {
  const dispath = useDispatch();

  const handleClose = () => {
    ref.current.close();
  };

  const handleClick = (BotNumber) => () => {
    dispath(botActions.change(BotNumber));
    handleClose();
  };

  return (
    <dialog ref={ref} className="bots-dialog">
      <h2>Bots</h2>
      <p>Select a Bot</p>
      <img src="../../public/Bot1.png" alt="Bot 1" onClick={handleClick(1)}/>
      <button onClick={handleClick(1)}>Michael</button>
      <img src="../../public/Bot2.png" alt="Bot 2" onClick={handleClick(2)} />
      <button onClick={handleClick(2)}>Alexa</button>
      <img src="../../public/Bot3.png" alt="Bot 3" onClick={handleClick(3)} />
      <button onClick={handleClick(3)}>Siri</button>
      <br />
      <button className="close-button" onClick={handleClose}>
        Close
      </button>
    </dialog>
  );
});

export default BotsModal;
