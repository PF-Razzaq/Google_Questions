import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import Questionnaire from "./Pages/Questionnaire";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AskNewOrOld from "./Pages/AskNewOrOld";
import SupplierQuestions from "./Pages/SupplierQuestions";
import FactoryQuestions from "./Pages/FactoryQuestions";

function App() {
  return (
    <div className="App app-container">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AskNewOrOld />} />
          <Route path="/questions" element={<Questionnaire />} />
          <Route path="/SupplierQuestions" element={<SupplierQuestions />} />
          <Route path="/FactoryQuestions" element={<FactoryQuestions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
