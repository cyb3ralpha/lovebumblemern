import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

// Backend socket URL
const SOCKET_URL = "http://localhost:5000";

const ChatBox = ({ currentUser, selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  /* ------------------ SOCKET CONNECTION ------------------ */
  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    socketRef.current.emit("join", currentUser._id);

    socketRef.current.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socketRef.current.on("typing", (userId) => {
      if (userId === selectedUser._id) {
        setTyping(true);
        setTimeout(() => setTyping(false), 1500);
      }
    });

    return () => socketRef.current.disconnect();
  }, [currentUser, selectedUser]);

  /* ------------------ FETCH OLD MESSAGES ------------------ */
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/messages/${selectedUser._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };

    if (selectedUser) fetchMessages();
  }, [selectedUser]);

  /* ------------------ AUTO SCROLL ------------------ */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ------------------ SEND MESSAGE ------------------ */
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      sender: currentUser._id,
      receiver: selectedUser._id,
      content: newMessage,
      createdAt: new Date(),
    };

    try {
      setMessages((prev) => [...prev, messageData]);

      socketRef.current.emit("sendMessage", messageData);

      await axios.post(
        "http://localhost:5000/api/messages",
        messageData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setNewMessage("");
    } catch (err) {
      console.error("Message send failed", err);
    }
  };

  /* ------------------ TYPING EVENT ------------------ */
  const handleTyping = () => {
    socketRef.current.emit("typing", selectedUser._id);
  };

  return (
    <div className="chatbox-container">
      {/* Header */}
      <div className="chatbox-header">
        <h3>{selectedUser.name}</h3>
      </div>

      {/* Messages */}
      <div className="chatbox-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === currentUser._id
                ? "message sent"
                : "message received"
            }
          >
            <p>{msg.content}</p>
            <span className="time">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </span>
          </div>
        ))}

        {typing && (
          <div className="typing-indicator">
            {selectedUser.name} is typing...
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <form className="chatbox-input" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleTyping}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
