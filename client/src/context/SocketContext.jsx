import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

/* ---------------- CREATE CONTEXT ---------------- */
const SocketContext = createContext();

/* ---------------- PROVIDER ---------------- */
export const SocketProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (user && token) {
      // Connect to backend socket server
      const newSocket = io("http://localhost:5000", {
        auth: { token },
      });

      setSocket(newSocket);

      // Add current user to online users list
      newSocket.emit("join", { userId: user._id });

      // Listen for online users update
      newSocket.on("onlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Cleanup on unmount
      return () => {
        newSocket.disconnect();
      };
    }
  }, [user, token]);

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = (toUserId, message) => {
    if (socket) {
      socket.emit("sendMessage", {
        from: user._id,
        to: toUserId,
        content: message,
        createdAt: new Date(),
      });
    }
  };

  /* ---------------- LISTEN TO MESSAGES ---------------- */
  const onMessage = (callback) => {
    if (socket) {
      socket.on("receiveMessage", callback);
    }
  };

  /* ---------------- LISTEN TO ONLINE USERS ---------------- */
  const onOnlineUsers = (callback) => {
    if (socket) {
      socket.on("onlineUsers", callback);
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
        sendMessage,
        onMessage,
        onOnlineUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

/* ---------------- CUSTOM HOOK ---------------- */
export const useSocket = () => useContext(SocketContext);
