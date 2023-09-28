import logo from "./logo.svg";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import Questionnaire from "./Pages/Questionnaire";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AskNewOrOld from "./Pages/AskNewOrOld";
import SupplierQuestions from "./Pages/SupplierQuestions";
import RButton from "./components/RButtonDemo";

function App() {
  return (
    <div className="App app-container">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AskNewOrOld />} />
          <Route path="/questions" element={<Questionnaire />} />
          <Route path="/SupplierQuestions" element={<SupplierQuestions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
