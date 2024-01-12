import React, { forwardRef } from "react";
import "./SettingsModal.css";

import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const SettingsModal = forwardRef((props, ref) => {
  const handleClick = () => {
    ref.current.close();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <dialog className="SettingsModal" ref={ref}>
      <div className="SettingsModal-content">
        <h2>Settings</h2>
        <button onClick={handleClick}>Close</button>
      </div>
      <div className="funct">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </dialog>
  );
});

export default SettingsModal;
