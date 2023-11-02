import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AskNewOrOld from "./Pages/AskNewOrOld";
import SupplierQuestions from "./Pages/SupplierQuestions";
import FactoryQuestions from "./Pages/FactoryQuestions";
import EnterSupplierId from "./Pages/EnterSupplierId";
import ExistingUserNavigation from "./Pages/ExistingUserNavigation";
import CheckOTP from "./Pages/CheckOTP";
import ChooseFactory from "./Pages/ChooseFactory";
function App() {
  return (
    <div className="App app-container">
      <ToastContainer
        autoClose={5000000}
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
      <BrowserRouter basename={`${process.env.REACT_APP_PUBLIC_URL}`}>
        <Routes>
          <Route path="/" element={<AskNewOrOld />} />
          <Route path="/SupplierQuestions" element={<SupplierQuestions />} />
          <Route path="/entersupplierid" element={<EnterSupplierId />} />
          <Route
            path="/existingusernavigation"
            element={<ExistingUserNavigation />}
          />
          <Route path="/checkotp" element={<CheckOTP />} />
          <Route path="/choosefactory" element={<ChooseFactory />} />
          <Route path="/factoryquestions" element={<FactoryQuestions />} />

          {/* <Route
            path="/SupplierQuestions"
            element={
              sessionStorage.getItem("visitedHomepage") == "true" ? (
                <SupplierQuestions />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/entersupplierid"
            element={
              sessionStorage.getItem("visitedHomepage") == "true" ? (
                <EnterSupplierId />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/existingusernavigation"
            element={
              sessionStorage.getItem("visitedHomepage") == "true" ? (
                <ExistingUserNavigation />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/checkotp"
            element={
              sessionStorage.getItem("visitedHomepage") == "true" ? (
                <CheckOTP />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/choosefactory"
            element={
              sessionStorage.getItem("visitedHomepage") == "true" ? (
                <ChooseFactory />
              ) : (
                <Navigate to="/" />
              )
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
