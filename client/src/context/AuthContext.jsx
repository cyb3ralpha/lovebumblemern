import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

/* ---------------- CREATE CONTEXT ---------------- */
const AuthContext = createContext();

/* ---------------- PROVIDER ---------------- */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  /* ---------------- SET AUTH HEADER ---------------- */
  const setAuthHeader = (jwt) => {
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  /* ---------------- LOAD USER ON START ---------------- */
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          setAuthHeader(token);

          const { data } = await axios.get(
            "http://localhost:5000/api/auth/me"
          );

          setUser(data.user);
        } catch (error) {
          console.error("Auth error:", error.response?.data?.message);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  /* ---------------- REGISTER ---------------- */
  const register = async (formData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setAuthHeader(data.token);
      setUser(data.user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  /* ---------------- LOGIN ---------------- */
  const login = async (formData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setAuthHeader(data.token);
      setUser(data.user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setAuthHeader(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ---------------- CUSTOM HOOK ---------------- */
export const useAuth = () => useContext(AuthContext);
