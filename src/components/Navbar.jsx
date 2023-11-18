import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="nav-bar">
      <img
        src="../../public/logo.png"
        alt="AiTutor Logo"
        className="nav-logo"
      />
      <img src="../../public/bot.png" alt="bot logo" className="nav-bot" />
      <button className="settings-button">
        <img src="../../public/setting.png" className="setting-icon" />
      </button>
    </div>
  );
};

export default Navbar;
