import React, { useState, useEffect } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import axios from "axios";
import logoPicture from "../assets/img/logoPicture.png";
import "../components/form/form.css";
import { useNavigate } from "react-router-dom";

const EnterSupplierId = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("New");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim() === "") {
      setIsModalOpen(true);
    } else {
      console.log("Checked");
      // Perform other actions when the input is not empty
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="container text-center " style={{ width: "95%" }}>
            <div
              className="row"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="col-5">
                <hr className="line" />
              </div>
              <div className="col-2">
                <img
                  src={logoPicture}
                  alt="logo"
                  style={{ width: "130px", height: "130px" }}
                />
              </div>
              <div className="col-5">
                <hr className="line" />
              </div>
            </div>
          </div>
          <div
            className="col-12 col-md-6 bg-white mt-1"
            style={{ width: "95%", borderRadius: "8px", textAlign: "start" }}
          >
            <br />
            <p className="fw-bold">Dear Valued Supplier,</p>
            <br />
            <p>XXX is committed to responsible business conduct.</p>
            <br />
            <p>
              Our Social Compliance Commitment (incl. the Act on Corporate Due
              Diligence Obligations in Supply Chains –
              (Lieferkettensorgfaltspflichtengesetz (LkSG)) requires our
              suppliers to submit questionnaires incl. required supporting
              documents.
            </p>
            <br />
            <p>
              Please take a few minutes to provide your latest / up to date
              information.
            </p>
            <p className="fw-bold">
              Please fill in when you are a Trader or Manufacturer / Trader,
              additionally please fill in our Factory Profile for each of your
              producing factory.
            </p>
            <br />
            <p className="fw-bold">Important!</p>
            <p style={{ marginTop: "-15px" }}>
              All information collected in this questionnaire will only be used
              for internal supplier mapping and management and will be treated
              as strictly confidential.
            </p>
            <br />
            <p>Thank you,</p>
            <p className="fw-bold">XXX</p>
            <p
              className=""
              style={{ color: "#4290FE", fontSize: "14px", fontWeight: "bold" }}
            >
              Please enter your Supplier ID
            </p>
            <input
              //   onChange={handleChange}
              placeholder="Enter your answer"
              type="text"
              name=""
              className="mt-1 outline-none w-100 mb-3"
              id="name-text"
              required
            />
            <button
              onClick={handleSubmit}
              type="button"
              className="btn btn-warning mb-5 fw-bold"
              style={{ width: "150px" }}
            >
              SUBMIT
            </button>
            {isModalOpen && (
              <div
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  color: "white",
                  borderRadius: "5px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    border: "1px solid black",
                    zIndex: "999",
                    borderRadius: "5px",
                    color: "#a89f9f",
                    padding: "2px",
                  }}
                >
                  Error
                </div>
                <p style={{ margin: "27px 135px 10px 20px" }}>
                  Supplier ID cannot be found, please ensure you have entered
                  the Supplier ID correctly
                </p>
                <button
                  onClick={closeModal}
                  className="btn btn-primary fw-bold"
                  style={{
                    marginTop: "50px",
                    padding: "5px 40px",
                    fontSize: "14px",
                    border: "5px solid #007ACC",
                    marginLeft: "40rem",
                    marginBottom: "20px",
                  }}
                >
                  OK
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EnterSupplierId;
