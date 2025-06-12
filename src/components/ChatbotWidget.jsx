import React, { useState, useEffect, useRef } from 'react';
import './ChatbotWidget.css'; // We will create this CSS file next

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! How can I help you with the dashboard today?',
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const chatboxRef = useRef(null);

  // Effect to scroll to the bottom of the chat on new messages
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    const userMessage = { sender: 'user', text: userInput };
    setMessages((prev) => [...prev, userMessage]);

    // Simple bot logic based on keywords from your app
    let botResponseText =
      'I am not sure how to answer that. I can help with questions about members, the map, events, or donations.';
    const lowerCaseInput = userInput.toLowerCase();

    if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi')) {
      botResponseText = 'Hello there! How can I assist you?';
    } else if (lowerCaseInput.includes('member')) {
      botResponseText =
        'You can view all members or add a new one using the "Members" section in the sidebar.';
    } else if (
      lowerCaseInput.includes('map') ||
      lowerCaseInput.includes('area')
    ) {
      botResponseText =
        'The map on the dashboard displays different committee areas. You can switch between them using the "Committee" list in the sidebar.';
    } else if (lowerCaseInput.includes('event')) {
      botResponseText =
        'You can find information about upcoming events in the "Events" section.';
    } else if (lowerCaseInput.includes('donation')) {
      botResponseText =
        'The total donations are shown on the dashboard. This demo does not have a feature to make a new donation.';
    }

    // Simulate bot typing delay for a more natural feel
    setTimeout(() => {
      const botMessage = { sender: 'bot', text: botResponseText };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);

    setUserInput('');
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-widget">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>HelpBot: Ask Insights</h3>
            <button onClick={toggleChat} className="close-btn">
              ×
            </button>
          </div>
          <div className="chat-messages" ref={chatboxRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
      <button onClick={toggleChat} className="chat-toggle-btn">
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
}

export default ChatbotWidget;
