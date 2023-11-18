import { useState } from 'react';

import './Mic.css';

const Mic = ({Speech}) => {
    const [micOn, setMic] = useState(false);

    const handleClick = () => {
        if (micOn === false){
            Speech.startListening();
            setMic(true);
        } else{ 
            Speech.stopListening();
            setMic(false);
        }
    }

    return (
        <div className="Mic">
            {!micOn && <h2>Start Speaking</h2>}            
            {micOn && <h2>Stop Speaking</h2>}
            <button onClick={handleClick}>
                <img src='../../public/mic.png'/>
            </button>
        </div>
    );
}

export default Mic;