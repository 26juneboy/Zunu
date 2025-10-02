import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "antd/dist/reset.css";
import { theme } from "./theme/theme.js";

document.body.style.backgroundColor = theme.backgroundColor;
document.body.style.margin = 0;
document.body.style.fontFamily = theme.fontFamily;

createRoot(document.getElementById("root")).render(<App />);
