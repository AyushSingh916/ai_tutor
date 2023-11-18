import "./Input.css";

const Input = ({transcript}) => {

  return (
    <div>
      <input
        type="text"
        placeholder="User Input is generated here..."
        value={transcript}
        className="user-input"
      />
    </div>
  );
};

export default Input;
