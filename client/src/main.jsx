import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Global styles (you can replace with Tailwind/SCSS)
import "./index.css";

// Create root and render App
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
