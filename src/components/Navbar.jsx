import { useState, useRef } from "react";
import SettingsModal from "./Modals/SettingsModal"; // Import the SettingsModal component
import BotsModal from "./Modals/BotsModal"; // Import the BotsModal component
import "./Navbar.css";

const Navbar = () => {
  const [bot, changeBot] = useState("../../public/Bot1.png"); 
  const settingsDialog = useRef();
  const botsDialog = useRef();

  const handleSettingsClick = () => {
    if (settingsDialog.current.hasAttribute("open")) {
      settingsDialog.current.close();
    } else {
      settingsDialog.current.showModal();
    }
  };

  const handleBotsClick = () => {
    if (botsDialog.current.hasAttribute("open")) {
      botsDialog.current.close();
    } else {
      botsDialog.current.showModal();
    }
  };

  const setBot = (BotNumber) => {
    if (BotNumber == 1) {
      changeBot("../../public/Bot1.png");
    } else if (BotNumber == 2) {
      changeBot("../../public/Bot2.png");
    } else if (BotNumber == 3) {
      changeBot("../../public/Bot3.png");
    }
  }

  return (
    <div className="nav-bar">
      <img src="../../public/logo.png" alt="AiTutor Logo" className="nav-logo" />
      <img src={bot} alt="bot logo" className="nav-bot" onClick={handleBotsClick} />
      <button className="settings-button" onClick={handleSettingsClick}>
        <img src="../../public/setting.png" className="setting-icon" />
      </button>
      <SettingsModal ref={settingsDialog} />
      <BotsModal ref={botsDialog} selectBot={setBot}/>
    </div>
  );
};

export default Navbar;
