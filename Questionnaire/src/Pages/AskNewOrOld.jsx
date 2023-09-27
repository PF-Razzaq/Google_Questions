import React, { useState, useEffect } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import axios from "axios";
import "../components/form/form.css";
import { useNavigate } from "react-router-dom";

const AskNewOrOld = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("New");
  console.log("env4", process.env.REACT_APP_BACKEND_URL);
  // useEffect(() => {
  //   const connectToDatabase = async () => {
  //     try {
  //       const response = await axios.post(
  //         `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/sessions`
  //       );
  //       console.log("response21", response);
  //     } catch (error) {
  //       console.error("Error occured while connecting", error);
  //     }
  //   };
  //   connectToDatabase();
  // }, []);
  useEffect(() => {
    const connectToDatabase = async () => {
      try {
        const response = await axios.post(
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/sessions`,
          {},
          {
            auth: {
              username: "apiuser",
              password: "TomJerry88",
            },
          }
        );
        localStorage.setItem("filemakerToken", response.data.response.token);
        console.log("token", response.data.response.token);
        fetchDataWithToken();
      } catch (error) {
        console.error("Error occurred while connecting", error);
      }
    };

    connectToDatabase();
  }, []);

  const fetchDataWithToken = async (token) => {
    if (localStorage.getItem("filemakerToken")) {
      try {
        const response = await axios.get(
          "https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Supplier Records/records",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`, // Add the Bearer token here
            },
          }
        );

        // Handle the response data as needed
        const data = response.data;
        console.log("data43", data.response.data);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="dYYAhb M0FGwd KHCwJ mt-5"></div>

          <div
            className="col-12 col-md-6 bg-white mt-1"
            style={{ width: "770px", borderRadius: "8px" }}
          >
            <h2 className="mt-2">Are you new or Existing User:</h2>
            <div className="form-check " style={{ width: "100px" }}>
              <input
                type="radio"
                className="form-check-input"
                id="New"
                value="New"
                checked={selectedOption === "New"}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="New">
                New
              </label>
            </div>
            <div className="form-check" style={{ width: "100px" }}>
              <input
                type="radio"
                className="form-check-input"
                id="Existing"
                value="Existing"
                checked={selectedOption === "Existing"}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="Existing">
                Existing
              </label>
            </div>
            <button
              onClick={() => {
                localStorage.setItem("userCheck", selectedOption);
                navigate("/CompanyInformation");
              }}
              className="submit-btn"
            >
              Next
            </button>
            <p>Selected Option: {selectedOption}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AskNewOrOld;
