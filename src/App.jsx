import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import Quotes from "./pages/quotes";
import QuoteForm from "./pages/quoteForm";
import UploadDesigns from "./pages/uploadDesign";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/quote" element={<QuoteForm />} />
        <Route path="/upload" element={<UploadDesigns />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
