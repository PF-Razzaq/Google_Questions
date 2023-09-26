import React, { useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import countryCode from "./CountryCodes.json";
import { FiDownload } from "react-icons/fi";
import "./CompanyInformationForm.css";
import { useNavigate } from "react-router-dom";
const CompanyInformationForm = () => {
  console.log("countryCode4", countryCode);
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState({});
  const [showRoom, setShowRoom] = useState("");
  const [LkSG, setLkSG] = useState("");
  const [inspectionAudits, setInspectionAudits] = useState("");
  const [controlAudits, setControlAudits] = useState("");
  const [companyEmploy, setCompanyEmploy] = useState("");
  const [regulationUI, setRegulationUI] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [customOption, setCustomOption] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const handleShowRoom = (event) => {
    setShowRoom(event.target.value); // Update the selected option in the state
  };
  const handleSaveCustomOption = () => {
    if (customOption.trim() !== "") {
      setOptions([...options, customOption]);
      setSelectedOption(customOption);
      setCustomOption("");
    }
  };
  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);

    // If the selected option is "other," clear the custom option input
    if (value === "other") {
      setCustomOption("");
    }
  };

  const handleCustomOptionChange = (event) => {
    setCustomOption(event.target.value);
  };
  const handleRegulationUI = (event) => {
    setRegulationUI(event.target.value); // Update the selected option in the state
  };
  const handleLKSG = (event) => {
    setLkSG(event.target.value); // Update the selected option in the state
  };

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleInspectionAudits = (event) => {
    setInspectionAudits(event.target.value);
  };
  const handleControlAudits = (event) => {
    setControlAudits(event.target.value);
  };
  const handleCompanyEmploy = (event) => {
    setCompanyEmploy(event.target.value);
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.size <= 10 * 1024 * 1024) {
      setFile(uploadedFile);
    } else {
      alert("Please upload a file that is less than 10MB in size.");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="form-sections p-5">
            <div className="form-field">
              <form action="">
                {/* Question 1 */}
                <div className="field-sections">
                  <span>Q.1:&nbsp;&nbsp;</span>
                  <span>
                    Supplier Name <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs1_SupplierName" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question 2 */}
                <div className="field-sections">
                  <span>Q.2:&nbsp;&nbsp;</span>
                  <span>
                    Supplier Business License Number{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="number"
                    name="Qs2_SuppBusinessLicenseNumber" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question 3 */}
                <div className="field-sections">
                  <span>Q.3:&nbsp;&nbsp;</span>
                  <span>
                    Supplier Export License Number{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="number"
                    name="Qs3_SuppExportLicenseNumber" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question 4 */}
                <div className="field-sections">
                  <span>Q.4:&nbsp;&nbsp;</span>
                  <span>
                    Supplier VAT Number <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="number"
                    name="Qs4_SuppVATNumber" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                <h4 className="supplier-heading">Supplier Address</h4>
                {/* Question  5*/}
                <div className="field-sections">
                  <span>Q.5:&nbsp;&nbsp;</span>
                  <span>
                    Building <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs5a_Building" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                <div className="field-sections">
                  <span>
                    Street <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs5b_Street" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  6*/}
                <div className="field-sections">
                  <span>Q.6:&nbsp;&nbsp;</span>
                  <span>
                    Town <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs6a_Town" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                <div className="field-sections">
                  <span>
                    City <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs6b_City" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                <div className="field-sections">
                  <span>
                    Province <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs6c_Province" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  7*/}
                <div className="field-sections">
                  <span>Q.7:&nbsp;&nbsp;</span>
                  <span>Post Code</span>

                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs7_PostCode" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                  />
                </div>
                {/* Question  8*/}
                <div className="field-sections">
                  <span>Q.8:&nbsp;&nbsp;</span>
                  <span>Country</span>
                  <select
                    value={selectedOption}
                    onChange={handleOptionChange}
                    className="form-select"
                    aria-label="Default select example"
                    name="Qs8_Country"
                  >
                    <option disabled selected>
                      Choose Country
                    </option>
                    <option value="china">China</option>
                    <option value="germany">Germany</option>
                    <option value="hongkong">Hong Kong</option>
                    <option value="india">India</option>
                    <option value="taiwan">Taiwan</option>
                    <option value="vietnam">Vietnam</option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                    <option value="other">Other</option>
                  </select>
                  {selectedOption === "other" && (
                    <div className="input-group w-25 mt-2">
                      <input
                        value={customOption}
                        onChange={handleCustomOptionChange}
                        type="text"
                        className="form-control w-25 rounded"
                        placeholder="Enter your custom option"
                        aria-label="Enter text..."
                        aria-describedby="basic-addon2"
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-primary ms-2"
                          type="button"
                          onClick={handleSaveCustomOption}
                        >
                          Add Country
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <h4 className="supplier-heading">Supplier Contact Details</h4>
                {/* Question  9*/}
                <div className="field-sections">
                  <span>Q.9:&nbsp;&nbsp;</span>
                  <span>
                    Phone <span style={{ color: "red" }}>*</span>
                  </span>
                  <div className="form-group d-flex">
                    <select
                      className="form-control countryCode me-1"
                      id="countrySelect"
                    >
                      {countryCode.map((country) => (
                        <option key={country.code} value={country.dial_code}>
                          {country.dial_code} - {country.name}
                        </option>
                      ))}
                    </select>
                    -
                    <input
                      name="Qs9a_Phone"
                      type="number"
                      onChange={handleChange}
                      class="form-control ms-1 phoneNumberInput"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      required
                    ></input>
                  </div>
                </div>
                <div className="field-sections">
                  <span>
                    Cell Phone <span style={{ color: "red" }}>*</span>
                  </span>
                  <div className="form-group d-flex">
                    <select
                      className="form-control countryCode me-1"
                      id="countrySelect"
                    >
                      {countryCode.map((country) => (
                        <option key={country.code} value={country.dial_code}>
                          {country.dial_code} - {country.name}
                        </option>
                      ))}
                    </select>
                    -
                    <input
                      type="number"
                      name="Qs9b_Cellphone"
                      onChange={handleChange}
                      class="form-control ms-1 phoneNumberInput"
                      id="exampleInputEmail2"
                      aria-describedby="emailHelp"
                      required
                    ></input>
                  </div>
                </div>
                {/* Question  10*/}
                <div className="field-sections">
                  <span>Q.10:&nbsp;&nbsp;</span>
                  <span>
                    Email <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="email"
                    name="Qs10_Email" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  11*/}
                <div className="field-sections">
                  <span>Q.11:&nbsp;&nbsp;</span>
                  <span>Website</span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs11_Website" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                  />
                </div>
                <h3 className="supplier-heading">Contact Person</h3>
                {/* Question  12*/}
                <div className="field-sections">
                  <span>Q.12:&nbsp;&nbsp;</span>
                  <span>
                    First Name <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs12b_FirstName" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                <div className="field-sections">
                  <span>
                    Last Name <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs12c_LastName" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  13*/}
                <div className="field-sections">
                  <span>Q.13:&nbsp;&nbsp;</span>
                  <span>
                    Contact Person Position{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs13_ContactPersonPosition" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                <h3 className="supplier-heading">Supplier Information</h3>
                {/* Question  14*/}
                <div className="field-sections">
                  <span>Q.14:&nbsp;&nbsp;</span>
                  <span>
                    Year of Establishment{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="This value must be a number"
                    type="number"
                    name="Qs14_YearOfEstablishment" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  26*/}
                <div className="field-sections">
                  <span>Q.26:&nbsp;&nbsp;</span>
                  <span>
                    Show Room <span style={{ color: "red" }}>*</span>
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs26_ShowRoom"
                      type="radio"
                      value="yes"
                      checked={showRoom === "yes"}
                      onChange={handleShowRoom}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs26_ShowRoom"
                      checked={showRoom === "no"}
                      onChange={handleShowRoom}
                    />
                    No
                  </label>
                </div>
                <h3 className="supplier-heading">Bank Information</h3>
                {/* Question  38*/}
                <div className="field-sections">
                  <span>Q.38:&nbsp;&nbsp;</span>
                  <span>
                    Select to whom you place orders{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="Qs38a_HCompanyPCompany"
                      value="H Company"
                      checked={selectedCompany === "H Company"}
                      onChange={handleCompanyChange}
                    />
                    H Company
                  </label>
                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      name="Qs38a_HCompanyPCompany"
                      value="P Company"
                      checked={selectedCompany === "P Company"}
                      onChange={handleCompanyChange}
                    />
                    P Company
                  </label>
                  <br />
                  <br />

                  <div>
                    {selectedCompany === "H Company" && (
                      <div className="field-sections">
                        <span>
                          Code of Conduct Signature and Upload{" "}
                          <span style={{ color: "red" }}>*</span>
                        </span>
                        <br />
                        <br />
                        <a href="#" download>
                          <button className="downloadFile">
                            <FiDownload
                              style={{
                                margin: "0 5px 3px 0",
                                fontSize: "16px",
                              }}
                            />
                            DOWNLOAD FILE
                          </button>
                        </a>
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleFileUpload}
                          />
                          <HiOutlineUpload
                            style={{
                              margin: "0 5px 3px 0",
                              fontSize: "16px",
                            }}
                          />
                          <span className="file-input-button-label">
                            UPLOAD SIGNED FILE
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                {/* Question  39*/}
                <div className="field-sections">
                  <span>Q.39:&nbsp;&nbsp;</span>
                  <span>
                    Does the Law on Corporate Due Diligence to Prevent Human
                    Rights Violations in Supply Chains (LkSG) apply to your
                    company according to § 1 LkSG?
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs39_HumanRightsViolations"
                      type="radio"
                      value="yes"
                      checked={LkSG === "yes"}
                      onChange={handleLKSG}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs39_HumanRightsViolations"
                      checked={LkSG === "no"}
                      onChange={handleLKSG}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {LkSG === "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleFileUpload}
                          />
                          <HiOutlineUpload
                            style={{
                              margin: "0 5px 3px 0",
                              fontSize: "16px",
                            }}
                          />
                          <span className="file-input-button-label">
                            UPLOAD DOCUMENT
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                {/* Question 63 */}
                <div className="field-sections">
                  <span>Q.63:&nbsp;&nbsp;</span>
                  <span>
                    Do you conduct standard on-site inspections/audits of direct
                    suppliers?
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name=""
                      type="radio"
                      value="yes"
                      checked={inspectionAudits === "yes"}
                      onChange={handleInspectionAudits}
                    />
                    Yes
                  </label>
                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name=""
                      checked={inspectionAudits === "no"}
                      onChange={handleInspectionAudits}
                    />
                    No
                  </label>
                  {/* This Question is Dependent on Question 26. */}
                  {/* Question 64 */}
                  <div>
                    {inspectionAudits === "yes" && (
                      <div className="field-sections">
                        <br />
                        <span>Q.64:&nbsp;&nbsp;</span>
                        <span>
                          Do you check the age of your workers as part of the
                          hiring process?{" "}
                          <span style={{ color: "red" }}>*</span>
                        </span>
                        <br />
                        <br />
                        <label>
                          <input
                            name="Qs64_TopicControlAudits"
                            type="radio"
                            value="yes"
                            checked={controlAudits === "yes"}
                            onChange={handleControlAudits}
                          />
                          Yes
                        </label>

                        <label style={{ marginLeft: "1rem" }}>
                          <input
                            type="radio"
                            value="no"
                            name="Qs64_TopicControlAudits"
                            checked={controlAudits === "no"}
                            onChange={handleControlAudits}
                          />
                          No
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                {/* Question 85 */}
                <div className="field-sections">
                  <span>Q.85:&nbsp;&nbsp;</span>
                  <span>
                    Does your company employ people who have been required to
                    work by the state (e.g. prisoners, military conscripts)?
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs85_EmpRequiredByStateYESNO"
                      type="radio"
                      value="yes"
                      checked={companyEmploy === "yes"}
                      onChange={handleCompanyEmploy}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name=""
                      checked={companyEmploy === "no"}
                      onChange={handleCompanyEmploy}
                    />
                    No
                  </label>
                </div>
                {/* Question 123 */}
                <div className="field-sections">
                  <span>Q.123:&nbsp;&nbsp;</span>
                  <span>
                    Can you confirm that you do not use or manufacture
                    substances listed in Annex I of Regulation (EU) 2019/1021?{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs123_SubstancesListedYESNO"
                      type="radio"
                      value="yes"
                      checked={regulationUI === "yes"}
                      onChange={handleRegulationUI}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs123_SubstancesListedYESNO"
                      checked={regulationUI === "no"}
                      onChange={handleRegulationUI}
                    />
                    No
                  </label>

                  <br />
                  <br />
                  {/* This Question is Dependent on Question 84. */}
                  <div>
                    {regulationUI === "no" && (
                      <div className="field-sections">
                        <span>Q.19:&nbsp;&nbsp;</span>
                        <span>
                          Which of the substances listed in Annex I of
                          Regulation (EU) 2019/1021 or in Annex A of the
                          Stockholm POP Convention do you use?
                        </span>
                        <input
                          onChange={handleChange}
                          placeholder="Enter your answer"
                          type="text"
                          name="Name" // Add name attribute
                          className="mt-3 outline-none w-100"
                          id="name-text"
                          required
                        />
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>{" "}
            <button
              onClick={() => {
                localStorage.setItem(
                  "companyData",
                  JSON.stringify(companyData)
                );
                navigate("/questions");
              }}
              className="submit-btn"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyInformationForm;
