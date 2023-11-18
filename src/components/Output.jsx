import { useState } from "react";

import "./Output.css";

const Output = () => {
  const [outputing, setOutput] = useState(false);
  return (
    <div className="user-output">
      {!outputing && <p>Output is generated here...</p>}
    </div>
  );
};

export default Output;
