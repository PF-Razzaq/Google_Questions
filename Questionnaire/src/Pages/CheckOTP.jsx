import React, { useState, useEffect } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import axios from "axios";
import logoPicture from "../assets/img/logoPicture.png";
import "../components/form/form.css";
import { useNavigate } from "react-router-dom";

const CheckOTP = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("New");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(300);

  const startCountdown = () => {
    setButtonDisabled(true);

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          clearInterval(timer);
          setButtonDisabled(false);
          return 300;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (isButtonDisabled) {
      startCountdown();
    }
  }, [isButtonDisabled]);

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
              style={{
                color: "#4290FE",
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Supplier ID
            </p>
            <input
              //   onChange={handleChange}
              placeholder="Enter your answer"
              type="text"
              name=""
              className="mt-1 outline-none w-100"
              id="name-text"
              required
            />
            <p
              className=""
              style={{
                color: "#4290FE",
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              Enter OTP here
            </p>
            <input
              //   onChange={handleChange}
              placeholder="Enter your answer"
              type="text"
              name=""
              className="mt-1 outline-none w-100"
              id="name-text"
              required
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                onClick={() => {
                  console.log("Checked");
                  setButtonDisabled(true);
                  // Additional logic here, e.g., localStorage
                }}
                type="button"
                className={`btn mb-5 mt-4 fw-bold ${
                  isButtonDisabled ? "disabled" : ""
                }`}
                style={{
                  width: "150px",
                  background: "#E83C50",
                  color: "white",
                }}
              >
                {isButtonDisabled ? `SUBMIT (${countdown}s)` : "SUBMIT"}
              </button>
              <p
                style={{
                  marginLeft: "20px",
                  color: "rgb(66, 144, 254)",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                <u>Resend OTP</u>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOTP;
