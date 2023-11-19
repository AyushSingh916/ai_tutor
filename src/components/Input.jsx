import "./Input.css";

const Input = ({transcript}) => {

  return (
    <div className="user-input">
      <p>You: {transcript}</p>
    </div>
  );
};

export default Input;
