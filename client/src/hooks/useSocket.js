import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

/**
 * useSocket Hook
 * 
 * Usage:
 * const { socket, onlineUsers, sendMessage, onMessage, onOnlineUsers } = useSocket();
 */
const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return context;
};

export default useSocket;
