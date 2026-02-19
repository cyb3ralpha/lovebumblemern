import React, { useEffect, useState, useRef } from "react";
import useSocket from "../hooks/useSocket";
import useAuth from "../hooks/useAuth";
import MessageBubble from "../components/MessageBubble";

const Chat = ({ matchUserId, matchUserName, matchUserPic }) => {
  const { user } = useAuth();
  const { sendMessage, onMessage, onlineUsers } = useSocket();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  /* ---------------- RECEIVE MESSAGES ---------------- */
  useEffect(() => {
    onMessage((msg) => {
      // Only push messages related to this chat
      if (
        (msg.from === matchUserId && msg.to === user._id) ||
        (msg.from === user._id && msg.to === matchUserId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });
  }, [matchUserId]);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---------------- SEND MESSAGE ---------------- */
  const handleSend = () => {
    if (!newMessage.trim()) return;
    sendMessage(matchUserId, newMessage);

    setMessages((prev) => [
      ...prev,
      { from: user._id, to: matchUserId, content: newMessage, createdAt: new Date() },
    ]);
    setNewMessage("");
  };

  /* ---------------- HANDLE ENTER KEY ---------------- */
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  /* ---------------- ONLINE STATUS ---------------- */
  const isOnline = onlineUsers.some((u) => u.userId === matchUserId);

  return (
    <div style={styles.container}>
      {/* Chat Header */}
      <div style={styles.header}>
        <img
          src={matchUserPic || "https://via.placeholder.com/40"}
          alt={matchUserName}
          style={styles.avatar}
        />
        <div>
          <h3 style={styles.name}>{matchUserName}</h3>
          <span style={styles.status}>
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      {/* Chat Messages */}
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            message={msg.content}
            isOwn={msg.from === user._id}
          />
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.sendBtn}>
          Send
        </button>
      </div>
    </div>
  );
};

/* ---------------------- STYLES ---------------------- */
const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #eee",
    borderRadius: "12px",
    height: "80vh",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    borderBottom: "1px solid #eee",
    backgroundColor: "#f8f8f8",
    gap: "10px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  name: {
    margin: 0,
  },
  status: {
    fontSize: "12px",
    color: "#777",
  },
  chatBox: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  inputArea: {
    display: "flex",
    borderTop: "1px solid #eee",
    padding: "10px 15px",
    gap: "10px",
    backgroundColor: "#f8f8f8",
  },
  input: {
    flex: 1,
    padding: "10px 15px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    outline: "none",
  },
  sendBtn: {
    padding: "10px 20px",
    borderRadius: "20px",
    border: "none",
    backgroundColor: "#ff3864",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Chat;
