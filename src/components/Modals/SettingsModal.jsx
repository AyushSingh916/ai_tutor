import React, { forwardRef } from "react";
import './SettingsModal.css'; // Import the CSS file

const SettingsModal = forwardRef((props, ref) => {
    const handleClick = () => {
        ref.current.close();
    };

    return (
        <dialog className="SettingsModal" ref={ref}>
            <div className="SettingsModal-content">
                <h2>Settings</h2>
                <button onClick={handleClick}>Close</button>
            </div>
        </dialog>
    );
});

export default SettingsModal;