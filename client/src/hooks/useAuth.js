import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * useAuth Hook
 * 
 * Usage:
 * const { user, login, logout, register, isAuthenticated, loading } = useAuth();
 */
const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default useAuth;
