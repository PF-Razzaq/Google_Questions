import React, { useState, useEffect } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import { FaHome } from "react-icons/fa";

import axios from "axios";
import "../components/form/form.css";
import { useNavigate } from "react-router-dom";

const ChooseFactory = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("New");
  const [inputValue, setInputValue] = useState("827423");

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="col-12 col-md-6 bg-white mt-4 p-5"
            style={{
              width: "95%",
              borderRadius: "8px",
              textAlign: "start",
            }}
          >
            <div>
              <div
                className="factory-profile-name-container"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderBottom: "1px dotted black",
                  margin: "0 0 20px 0",
                  padding: "15px",
                }}
              >
                <span
                  className="text-center factory-profile-name"
                  style={{
                    marginBottom: "-30px",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Factory Profile
                </span>

                <FaHome
                  style={{ marginLeft: "auto", cursor: "pointer" }}
                  size={32}
                  onClick={() => {
                    if (
                      confirm(
                        "This questionnaire has not been submitted, are you sure to abandon and leave!"
                      ) == true
                    ) {
                      navigate("/");
                    }
                  }}
                />
              </div>
              <p>
                <span style={{ color: "red" }}>*</span> Required
              </p>
              <h2 className="factory-business">Factory Business Information</h2>
              <p
                style={{ marginBottom: "25px", fontSize: "18px" }}
                className="paragraph-ChooseFactory"
              >
                Please provide information as in official documents
              </p>
              <div className="field-sections">
                <span>1. &nbsp;&nbsp;</span>
                <span>Supplier id</span>
                <input
                  //   onChange={handleChange}
                  placeholder="Enter your answer"
                  type="text"
                  name=""
                  value={inputValue}
                  className="mt-3 outline-none w-100"
                  id="name-text"
                  disabled
                />
              </div>
              <div className="field-sections">
                <span>2. &nbsp;&nbsp;</span>
                <span>Factory id</span>
                <select
                  style={{ width: "190px" }}
                  // value={}
                  className="form-select"
                  aria-label="Default select example"
                  name=""
                >
                  <option value="" disabled selected>
                    Choose Options
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseFactory;
