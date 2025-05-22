import React, { useState } from 'react';

function ChatBox() {
  const [messages, setMessages] = useState([{ sender: "Admin", text: "Welcome!" }]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "You", text: input }]);
      setInput("");
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg mt-6">
      <h2 className="font-semibold mb-2">Private Chat</h2>
      <div className="h-40 overflow-y-scroll border p-2 mb-2">
        {messages.map((msg, i) => (
          <div key={i}><strong>{msg.sender}:</strong> {msg.text}</div>
        ))}
      </div>
      <input
        className="border p-2 w-full mb-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
}

export default ChatBox;