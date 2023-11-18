import { useRef } from "react";
import SettingsModal from "./SettingsModal"; // Import the SettingsModal component
import "./Navbar.css";

const Navbar = () => {
  const dialog = useRef();

  const handleClick = () => {
    dialog.current.showModal();
  };

  return (
    <div className="nav-bar">
      <img src="../../public/logo.png" alt="AiTutor Logo" className="nav-logo" />
      <img src="../../public/bot.png" alt="bot logo" className="nav-bot" />
      <button className="settings-button" onClick={handleClick}>
        <img src="../../public/setting.png" className="setting-icon" />
      </button>
      <SettingsModal ref={dialog} /> {/* Include the SettingsModal component */}
    </div>
  );
};

export default Navbar;
