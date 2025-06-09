import React, { useState } from 'react';

function ChatBox() {
  const [messages, setMessages] = useState([{ sender: "Admin", text: "Welcome to the dashboard!" }]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "You", text: input }]);
      setInput("");
    }
  };

  return (
    <div>
      <div style={{ height: "160px", overflowY: "scroll", border: "1px solid #ccc", padding: "8px", marginBottom: "10px" }}>
        {messages.map((msg, i) => (
          <div key={i}><strong>{msg.sender}:</strong> {msg.text}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message"
        style={{ width: "100%", marginBottom: "8px", padding: "8px" }}
      />
      <button onClick={sendMessage} style={{ backgroundColor: "#007BFF", color: "#fff", padding: "8px 16px", borderRadius: "4px", border: "none" }}>
        Send
      </button>
    </div>
  );
}

export default ChatBox;
