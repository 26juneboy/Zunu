import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Quotes from "./pages/quotes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/quotes" element={<Quotes />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
