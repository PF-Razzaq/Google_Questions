import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AskNewOrOld from "./Pages/AskNewOrOld";
import SupplierQuestions from "./Pages/SupplierQuestions";
import FactoryQuestions from "./Pages/FactoryQuestions";

function App() {
  localStorage.setItem("fromHome", false);
  return (
    <div className="App app-container">
      <ToastContainer />
      <BrowserRouter basename={`${process.env.REACT_APP_PUBLIC_URL}`}>
        <Routes>
          <Route path="/" element={<AskNewOrOld />} />
          <Route path="/SupplierQuestions" element={<SupplierQuestions />} />
          <Route path="/factoryquestions" element={<FactoryQuestions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
