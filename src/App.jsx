import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Quotes from "./pages/quotes";
import QuoteForm from "./pages/quoteForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/quote" element={<QuoteForm />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
