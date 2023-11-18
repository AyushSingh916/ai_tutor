import React, { forwardRef } from "react";

const SettingsModal = forwardRef((props, ref) => {
    const handleClick = () => {
        ref.current.close();
    };

    return (
        <dialog ref={ref}>
            <h2>Settings</h2>
            <button onClick={handleClick}>Close</button>
        </dialog>
    );
});

export default SettingsModal;
