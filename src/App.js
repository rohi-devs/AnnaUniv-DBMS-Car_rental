import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  // Fetch messages when the component mounts
  useEffect(() => {
    async function loadMessages() {
      try {
        const response = await axios.get(
          "https://loyal-renewal-production.up.railway.app/messages"
        );
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
        const response = await axios.post(
          "https://loyal-renewal-production.up.railway.app/messages",
          {
            text: messageText,
          }
        );
        setMessages([...messages, response.data]);
        setMessageText(""); // Reset input
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-black p-4 rounded-lg shadow-lg mb-8">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-gray-700 p-4 rounded-lg flex flex-col"
            >
              <div className="font-semibold">Message ID: {msg.id}</div>
              <div>{msg.text}</div>
              <div className="text-sm text-gray-400">{msg.created_at}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-4 w-full max-w-2xl">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="flex-1 p-4 bg-gray-700 text-white border border-gray-600 rounded-lg"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-gray-700 hover:bg-slate-600 text-white p-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
