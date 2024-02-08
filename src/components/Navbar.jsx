import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import SettingsModal from "./Modals/SettingsModal"; // Import the SettingsModal component
import BotsModal from "./Modals/BotsModal"; // Import the BotsModal component
import "./Navbar.css";

const Navbar = () => {
  const botNumber = useSelector((state) => state.botNumber);

  const settingsDialog = useRef();
  const botsDialog = useRef();
  console.log(botNumber);

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

  return (
    <div className="nav-bar">
      <img
        src="../../public/logo.png"
        alt="AiTutor Logo"
        className="nav-logo"
      />
      <img
        src={`../../public/Bot${botNumber}.png`}
        alt="bot logo"
        className="nav-bot"
        onClick={handleBotsClick}
      />
      <button className="settings-button" onClick={handleSettingsClick}>
        <img src="../../public/setting.png" className="setting-icon" />
      </button>
      <SettingsModal ref={settingsDialog} />
      <BotsModal ref={botsDialog}/>
    </div>
  );
};

export default Navbar;
