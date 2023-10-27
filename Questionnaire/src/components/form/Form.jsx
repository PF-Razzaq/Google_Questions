import React, { useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import "./form.css";

const Form = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    phoneNumber: "",
    comment: "",
  });

  // For Upload File
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // For Input Value Change

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    if (value === "Yes") {
      setShowFileUpload(true);
      setShowDescriptionInput(false);
    } else if (value === "Other") {
      setShowFileUpload(false);
      setShowDescriptionInput(true);
    } else {
      setShowFileUpload(false);
      setShowDescriptionInput(false);
    }
  };

  const handleButtonClick = () => {
    // Perform your action here when the button is clicked
    // For example, you can submit the form or trigger some other functionality.
  };

  // For Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Spread the existing form data
      [name]: value, // Update only the field being changed
    });
  };

  // For Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Access the form data from formData for further processing
  };

  // For Destructuring all input Values
  const { username, email, address, phoneNumber, comment } = formData; // Destructure the form data

  return (
    <>
      <div className="main-form form-container">
        <div className="dYYAhb M0FGwd KHCwJ"></div>
        <div className="form-section">
          <form action="" onSubmit={handleSubmit}>
            <div className="form-sections p-5">
              <div className="">
                <div
                  className="row"
                  style={{
                    display: "flex",
                    justifyContent: " space-between",
                    width: "158%",
                  }}
                >
                  <div className="col-md-6">
                    <div>
                      <div className="d-flex fs-4 justify-content-between">
                        <label className="radioOption">
                          <input
                            type="radio"
                            name="radioOptions"
                            value="Yes"
                            checked={selectedOption === "Yes"}
                            onChange={handleOptionChange}
                          />
                          Yes
                        </label>
                        <label className="radioOption">
                          <input
                            type="radio"
                            name="radioOptions"
                            value="No"
                            checked={selectedOption === "No"}
                            onChange={handleOptionChange}
                          />
                          No
                        </label>
                        <label className="radioOption">
                          <input
                            type="radio"
                            name="radioOptions"
                            value="Other"
                            checked={selectedOption === "Other"}
                            onChange={handleOptionChange}
                          />
                          Other
                        </label>
                        <button
                          className="btn btn-primary d-flex"
                          onClick={handleButtonClick}
                        >
                          Submit
                        </button>
                      </div>

                      {/* Upload a File Code  */}

                      {showFileUpload && (
                        <div className="mt-3">
                          <label className="file-input-button-upload">
                            <input
                              type="file"
                              style={{ display: "none" }}
                              onChange={handleFileChange}
                            />
                            <HiOutlineUpload
                              style={{
                                margin: "0 5px 3px 0",
                                fontSize: "16px",
                              }}
                            />
                            <span className="file-input-button-label">
                              Add File
                            </span>
                          </label>

                          {/* Display the selected file name */}
                          <p id="selected-file">
                            {selectedFile
                              ? `Selected File: ${selectedFile.name}`
                              : ""}
                          </p>
                        </div>
                      )}

                      {/* Show Description Code */}

                      {showDescriptionInput && (
                        <div className="w-100 mt-3" style={{ width: "770px" }}>
                          <label style={{ marginBottom: "10px" }}>
                            Description:
                          </label>
                          <br />
                          <input
                            type="text"
                            placeholder="Enter Description"
                            className="outline-none w-100"
                            style={{
                              border: "none",
                              borderBottom: "1px dotted black",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-sections p-5">
              <span>
                Name <span style={{ color: "red" }}>*</span>
              </span>
              <br />
              <input
                onChange={handleChange}
                value={username}
                type="text"
                name="username" // Add name attribute
                placeholder="Enter Name"
                className="mt-3 outline-none w-75"
                id="name-text"
              />
            </div>
            <div className="form-sections p-5">
              <span>
                Email <span style={{ color: "red" }}>*</span>
              </span>
              <br />
              <input
                onChange={handleChange}
                value={email}
                type="text"
                name="email" // Add name attribute
                placeholder="Enter Email"
                className="mt-3 outline-none w-75"
                id="name-text"
              />
            </div>
            <div className="form-sections p-5">
              <span>
                Address <span style={{ color: "red" }}>*</span>
              </span>
              <br />
              <input
                onChange={handleChange}
                value={address}
                type="text"
                name="address" // Add name attribute
                placeholder="Enter Your Address"
                className="mt-3 outline-none w-75"
                id="name-text"
              />
            </div>
            <div className="form-sections p-5">
              <span>
                Phone Number <span style={{ color: "red" }}>*</span>
              </span>
              <br />
              <input
                onChange={handleChange}
                value={phoneNumber}
                type="text"
                name="phoneNumber" // Add name attribute
                placeholder="Enter Phone Number"
                className="mt-3 outline-none w-75"
                id="name-text"
              />
            </div>
            <div className="form-sections p-5">
              <span className="">
                Description <span style={{ color: "red" }}>*</span>
              </span>
              <br />
              <input
                onChange={handleChange}
                value={comment}
                type="text"
                name="comment" // Add name attribute
                placeholder="Description"
                className="mt-3 outline-none w-75 border-none"
                id="name-text"
              />
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
