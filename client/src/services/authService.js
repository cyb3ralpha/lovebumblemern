import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

/* ---------------- CREATE AXIOS INSTANCE ---------------- */
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

/* ---------------- TOKEN HANDLING ---------------- */
const setToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  }
};

const getToken = () => {
  return localStorage.getItem("token");
};

/* ---------------- REGISTER ---------------- */
const register = async (userData) => {
  const response = await axios.post(`${API_URL}register`, userData);

  if (response.data.token) {
    setToken(response.data.token);
  }

  return response.data;
};

/* ---------------- LOGIN ---------------- */
const login = async (credentials) => {
  const response = await axios.post(`${API_URL}login`, credentials);

  if (response.data.token) {
    setToken(response.data.token);
  }

  return response.data;
};

/* ---------------- LOGOUT ---------------- */
const logout = () => {
  setToken(null);
};

/* ---------------- GET CURRENT USER ---------------- */
const getCurrentUser = async () => {
  const token = getToken();
  if (!token) return null;

  setToken(token);

  const response = await api.get("/users/me");
  return response.data;
};

/* ---------------- CHANGE PASSWORD ---------------- */
const changePassword = async (passwordData) => {
  const response = await api.put("/auth/change-password", passwordData);
  return response.data;
};

/* ---------------- EXPORT ---------------- */
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  changePassword,
  setToken,
  getToken,
  api,
};

export default AuthService;
