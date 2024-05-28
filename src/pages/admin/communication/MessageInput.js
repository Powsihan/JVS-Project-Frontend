import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="message-input-container p-3 d-flex align-items-center" style={{ backgroundColor: "#DBECF9"}}>
      <input
        type="text"
        className="form-control rounded-pill"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        style={{ flex: 1 }}
      />
      <button className="btn btn-primary rounded-pill ms-2" onClick={handleSend}>
        <SendIcon />
      </button>
    </div>
  );
};

export default MessageInput;
