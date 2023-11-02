import React, { useState, useEffect } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import axios from "axios";
import logoPicture from "../assets/img/logoPicture.png";
import "../components/form/form.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const EnterSupplierId = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
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
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_NODE_MIDDLEWARE}/supplier/sentotp/`,
        { supplierId: inputValue.trim() }
      );
      if (response.data === "OK") {
        toast.info(`${phase2Json.find((f) => f.id === "m1").text}`);
        localStorage.setItem("optSupplierId", inputValue.trim());
        setTimeout(() => {
          navigate(`/checkotp`);
        }, 3000);
      } else {
        toast.error(`${phase2Json.find((f) => f.id === "m3").text}`);
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error occurred while connecting", error);
      toast.error(`${phase2Json.find((f) => f.id === "m4").text} : ${error}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
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
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              className="mt-1 outline-none w-100 mb-3"
              id="name-text"
              required
            />
            <button
              disabled={inputValue === ""}
              onClick={handleSubmit}
              type="button"
              className="btn btn-warning mb-5"
              style={{ width: "150px" }}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnterSupplierId;
