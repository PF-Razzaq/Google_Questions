import React, { useState, useEffect } from "react";
import logoPicture from "../assets/img/logoPicture.png";
import "../components/form/form.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { isBefore } from "date-fns";

const CheckOTP = () => {
  const navigate = useNavigate();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(300);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [OTP, setOTP] = useState("");
  const [supplierId, setSupplierId] = useState(
    localStorage.getItem("optSupplierId") || ""
  );
  const [phase2Json, setPhase2Json] = useState();

  const fetchPhase2Json = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PUBLIC_URL}/phase2.json`
      );
      setPhase2Json(response.data);
    } catch (error) {
      console.error("Error occurred while connecting", error);
    }
  };
  useEffect(() => {
    fetchPhase2Json();
  }, []);
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
      if (countdown === 0) {
        setButtonDisabled(true);
      }
    }, 1000);
  };
  useEffect(() => {
    setButtonDisabled(true);
  }, []);
  useEffect(() => {
    if (isButtonDisabled) {
      startCountdown();
    }
  }, [isButtonDisabled]);

  const handleResendOTP = async () => {
    setButtonDisabled(true);
    setCountdown(300);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_NODE_MIDDLEWARE}/supplier/sentotp/`,
        { supplierId: supplierId.trim() }
      );
      if (response.data === "OK") {
        toast.info(`${phase2Json.find((f) => f.id === "m1").text}`);
      }
    } catch (error) {
      console.error("Error occurred while connecting", error);
      toast.error(`${phase2Json.find((f) => f.id === "m4").text}: ${error}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  const handleButtonClick = async () => {
    const isOtpIncorrectOrEmpty = true; // Your condition to check OTP
    setButtonDisabled(false);
    if (isOtpIncorrectOrEmpty) {
      setShowErrorMessage(true);
    } else {
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_NODE_MIDDLEWARE}/supplier/checkotp/`,
        { OTP: OTP, supplierId: supplierId.trim() }
      );
      console.log(response);
      if (response.data === "no") {
        toast.error(`${phase2Json.find((f) => f.id === "m2").text}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500000,
          hideProgressBar: true,
        });
      } else {
        setTimeout(() => {
          localStorage.removeItem("optSupplierId");
          navigate(`/existingusernavigation`);
        }, 3000);
      }
    } catch (error) {
      console.error("Error occurred while connecting", error);
      toast.error(`OTP sent to email failed : ${error}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000000,
      });
    }
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
                <img className="img-fluid" src={logoPicture} alt="logo" />
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
              value={localStorage.getItem("optSupplierId")}
              placeholder="Enter your answer"
              type="text"
              disabled
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
              onChange={(e) => {
                setOTP(e.target.value);
              }}
              placeholder="Enter your answer"
              type="text"
              name=""
              className="mt-1 outline-none w-100"
              id="name-text"
              required
            />
            {/* {showErrorMessage && (
              <span style={{ color: "red" }}>OTP is incorrect or empty</span>
            )} */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                type="button"
                disabled={OTP === "" || !isButtonDisabled}
                onClick={handleButtonClick}
                className={`btn mb-5 mt-4 ${isButtonDisabled ? "" : ""}`}
                style={{
                  width: "150px",
                  background: "#E83C50",
                  color: "white",
                }}
              >
                {isButtonDisabled ? `SUBMIT (${countdown}s)` : "SUBMIT"}
              </button>
              <button
                onClick={handleResendOTP}
                disabled={isButtonDisabled}
                style={{
                  marginLeft: "20px",
                  color: "rgb(66, 144, 254)",
                  fontSize: "14px",
                  fontWeight: "bold",
                  background: "transparent",
                  border: "none",
                  textDecoration: isButtonDisabled ? "none" : "underline",
                  opacity: 1,
                  marginTop: "-15px",
                  transition: "opacity 0.3s ease",
                }}
              >
                <u>Resend OTP</u>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOTP;
