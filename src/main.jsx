import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "antd/dist/reset.css"; // Ant Design v5 reset
import { theme } from "./theme/theme.js";

// 👇 set global UI background here
document.body.style.backgroundColor = theme.backgroundColor;
document.body.style.margin = 0;
document.body.style.fontFamily = theme.fontFamily;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
