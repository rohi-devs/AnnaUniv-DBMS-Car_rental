import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  // Fetch messages when the component mounts
  useEffect(() => {
    async function loadMessages() {
      try {
        const response = await axios.get("http://localhost:8080/messages");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    loadMessages();
  }, []);

  // Handle sending a new message
  const sendMessage = async () => {
    if (messageText.trim()) {
      try {
        const response = await axios.post("http://localhost:8080/messages", {
          text: messageText,
        });
        setMessages([...messages, response.data]);
        setMessageText(""); // Reset input
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        Chatroom
      </h1>

      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-gray-200 p-4 rounded-lg flex flex-col"
            >
              <div className="font-semibold">Message ID: {msg.id}</div>
              <div>{msg.text}</div>
              <div className="text-sm text-gray-500">{msg.created_at}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-4 w-full max-w-2xl">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="flex-1 p-4 border border-gray-300 rounded-lg"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white p-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
