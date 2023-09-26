import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import Questionnaire from "./Pages/Questionnaire";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AskNewOrOld from "./Pages/AskNewOrOld";
import CompanyInformationForm from "./Pages/CompanyInformationForm";
import Form from "./components/form/Form";

function App() {
  return (
    <div className="App app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AskNewOrOld />} />
          <Route path="/questions" element={<Questionnaire />} />
          <Route
            path="/CompanyInformation"
            element={<CompanyInformationForm />}
          />
        </Routes>
      </BrowserRouter>
      {/* <Header /> */}
      {/* <Form /> */}
    </div>
  );
}

export default App;
