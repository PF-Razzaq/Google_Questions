import React, { useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import countryCode from "./CountryCodes.json";
import { FiDownload } from "react-icons/fi";
import "./CompanyInformationForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let otherCountry;
let recordId = 0;
const SupplierQuestions = () => {
  const handleDownload = () => {
    console.log("handleDownload");
    // Replace 'file_url' with the actual URL of the file you want to download.
    const fileUrl =
      "https://images.pascalinesoft.com/pdf/OnlineQuestionnairePhase1.pdf";
    // Create a temporary link element.
    const link = document.createElement("a");
    link.href = fileUrl;
    link.target = "_blank"; // Open the link in a new tab.
    link.download = "your_file_name.pdf"; // Specify the desired file name for the user.

    // Trigger a click event on the link to start the download.
    link.click();

    // Clean up: remove the temporary link.
    // document.body.removeChild(link);
  };
  console.log("countryCode4", countryCode);
  const [file, setFile] = useState();
  const [dilligenceFile, setDilligenceFile] = useState();
  const navigate = useNavigate();
  const [supplierData, setSupplierData] = useState({});

  const [selectedOption, setSelectedOption] = useState("");
  const [customOption, setCustomOption] = useState("");
  const [options, setOptions] = useState([]);

  const handleSaveCustomOption = () => {
    if (customOption.trim() !== "") {
      setOptions([...options, customOption]);
      setSelectedOption(customOption);
      setCustomOption("");
      setSupplierData({ ...supplierData, Qs8_Country: customOption });
    }
  };
  const handleOptionChange = (e) => {
    const value = e.target.value;

    setSelectedOption(value);

    // If the selected option is "other," clear the custom option input
    if (value === "other") {
      setCustomOption("");
    }
  };

  const connectToDatabase = async (e) => {
    document.getElementById("submitBTN").style.visibility = "hidden";
    e.preventDefault();
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
      postDataWithToken();
      toast.success("Customized success message", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Automatically close after 3 seconds
      });
    } catch (error) {
      console.error("Error occurred while connecting", error);
      toast.error("Customized error message", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Automatically close after 3 seconds
      });
    }
  };
  const postDataWithToken = async (token) => {
    if (localStorage.getItem("filemakerToken")) {
      try {
        const response = await axios.post(
          "https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Supplier Records/records",

          { fieldData: supplierData },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`, // Add the Bearer token here
            },
          }
        );

        // Handle the response data as needed
        const data = response.data;
        console.log("postDataWithToken", data.response.recordId);
        // alert("record inserted.files(if any) will also upload shortly");

        recordId = Number(data.response.recordId);
        console.log(
          "postDataWithToken",
          data.response.recordId,
          data,
          recordId
        );
        uploadSignedDocument();
        uploadDueDilligenceDocument();
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    }
  };
  const uploadSignedDocument = async (token) => {
    const upload = new FormData();
    upload.append("upload", file);
    console.log("formData contents:", upload);
    if (localStorage.getItem("filemakerToken")) {
      try {
        const response = await axios.post(
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs38b_SignatureUpload/1`,
          upload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`, // Add the Bearer token here
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Handle the response data as needed
        const data = response.data;
        console.log("postDataWithToken", data);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    }
  };
  const uploadDueDilligenceDocument = async (token) => {
    const upload = new FormData();
    upload.append("upload", dilligenceFile);
    console.log("uploadDueDilligenceDocument contents:", upload);
    if (localStorage.getItem("filemakerToken")) {
      try {
        const response = await axios.post(
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs39b_HumanRightsViolations/1`,
          upload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`, // Add the Bearer token here
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Handle the response data as needed
        const data = response.data;
        console.log("postDataWithToken", data);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    }
  };
  const handleCustomOptionChange = (event) => {
    setCustomOption(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData({
      ...supplierData,
      [name]: value,
    });
  };
  console.log("supplierData3", supplierData);
  const handleSubmitButton = () => {};
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="form-sections p-5">
            <div className="form-field">
              <form onSubmit={connectToDatabase}>
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
                    Supplier Business License Number
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
                    value={supplierData.Qs8_Country}
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
                        placeholder="Enter Custom Option"
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
                          {country.dial_code + "    " + " "} &nbsp; &nbsp;&nbsp;
                          &nbsp;&nbsp; &nbsp;
                          {" " + country.name}
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
                          {country.dial_code + "    " + "   "}&nbsp;
                          &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                          {" " + country.name}
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
                <div>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setSupplierData({
                        ...supplierData,
                        Qs12a_salutation: e.target.value,
                      });
                    }}
                    name="Qs12a_salutation"
                  >
                    <option disabled selected>
                      Salutation
                    </option>
                    <option value="mr">Mr.</option>
                    <option value="ms">Ms.</option>
                  </select>
                </div>
                <div className="field-sections">
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
                    type="text"
                    name="Qs14_YearOfEstablishment" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    maxLength={4}
                    min={4}
                    required
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
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
                      checked={supplierData.Qs26_ShowRoom === "yes"}
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs26_ShowRoom"
                      checked={supplierData.Qs26_ShowRoom === "no"}
                      onChange={handleChange}
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
                      checked={
                        supplierData.Qs38a_HCompanyPCompany === "H Company"
                      }
                      onChange={handleChange}
                    />
                    H Company
                  </label>
                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      name="Qs38a_HCompanyPCompany"
                      value="P Company"
                      checked={
                        supplierData.Qs38a_HCompanyPCompany === "P Company"
                      }
                      onChange={handleChange}
                    />
                    P Company
                  </label>
                  <br />
                  <br />

                  <div>
                    {supplierData.Qs38a_HCompanyPCompany === "H Company" && (
                      <div className="field-sections">
                        <span>
                          Code of Conduct Signature and Upload{" "}
                          <span style={{ color: "red" }}>*</span>
                        </span>
                        <br />
                        <br />

                        <button
                          onClick={handleDownload}
                          className="downloadFile"
                        >
                          <FiDownload
                            style={{
                              margin: "0 5px 3px 0",
                              fontSize: "16px",
                            }}
                          />
                          DOWNLOAD FILE
                        </button>

                        <br />
                        <label className="file-input-button-upload">
                          <input
                            type="file"
                            accept="application/pdf,image/jpeg"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              setFile(e.target.files[0]);
                            }}
                          />
                          <HiOutlineUpload
                            style={{
                              margin: "0 5px 3px 0",
                              fontSize: "16px",
                              display: file ? "none" : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {file
                              ? `Uploaded file: ${file.name}`
                              : "UPLOAD SIGNED FILE"}
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
                      name="Qs39a_HumanRightsViolations"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs39a_HumanRightsViolations === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs39a_HumanRightsViolations"
                      checked={
                        supplierData.Qs39a_HumanRightsViolations === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {supplierData.Qs39a_HumanRightsViolations === "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            type="file"
                            accept="application/pdf,image/jpeg"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              setDilligenceFile(e.target.files[0]);
                            }}
                          />
                          <HiOutlineUpload
                            style={{
                              margin: "0 5px 3px 0",
                              fontSize: "16px",
                              display: dilligenceFile ? "none" : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {dilligenceFile
                              ? `Uploaded file: ${dilligenceFile.name}`
                              : "UPLOAD DOCUMENT"}
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
                      name="Qs63_ConductStandardOnSiteInspections"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs63_ConductStandardOnSiteInspections ===
                        "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>
                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs63_ConductStandardOnSiteInspections"
                      checked={
                        supplierData.Qs63_ConductStandardOnSiteInspections ===
                        "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                  {/* This Question is Dependent on Question 26. */}
                  {/* Question 64 */}
                  <div>
                    {supplierData.Qs63_ConductStandardOnSiteInspections ===
                      "yes" && (
                      <div className="field-sections">
                        <br />
                        <span>Q.64:&nbsp;&nbsp;</span>
                        <span>
                          Do you check the age of your workers as part of the
                          hiring process?{" "}
                          <span style={{ color: "red" }}>*</span>
                        </span>
                        <br />
                        <input
                          onChange={handleChange}
                          placeholder="Enter your answer"
                          type="text"
                          name="Qs64_TopicControlAudits" // Add name attribute
                          className="mt-3 outline-none w-100"
                          id="name-text"
                          required
                        />
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
                      checked={
                        supplierData.Qs85_EmpRequiredByStateYESNO === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs85_EmpRequiredByStateYESNO"
                      checked={
                        supplierData.Qs85_EmpRequiredByStateYESNO === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 123 */}
                <div className="field-sections">
                  <span>Q.122:&nbsp;&nbsp;</span>
                  <span>
                    Can you confirm that you do not use or manufacture
                    substances listed in Annex I of Regulation (EU) 2019/1021?{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs122_NotUseManufactureSubstancesListedAnnexI"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs122_NotUseManufactureSubstancesListedAnnexI ===
                        "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs122_NotUseManufactureSubstancesListedAnnexI"
                      checked={
                        supplierData.Qs122_NotUseManufactureSubstancesListedAnnexI ===
                        "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />
                  <br />
                  {/* This Question is Dependent on Question 84. */}
                  <div>
                    {supplierData.Qs122_NotUseManufactureSubstancesListedAnnexI ===
                      "no" && (
                      <div className="field-sections">
                        <span>Q.123:&nbsp;&nbsp;</span>
                        <span>
                          Which of the substances listed in Annex I of
                          Regulation (EU) 2019/1021 or in Annex A of the
                          Stockholm POP Convention do you use?
                        </span>
                        <input
                          onChange={handleChange}
                          placeholder="Enter your answer"
                          type="text"
                          name="Qs123_SubstancesListedYESNO" // Add name attribute
                          className="mt-3 outline-none w-100"
                          id="name-text"
                          required
                        />
                      </div>
                    )}
                  </div>
                </div>
                <button
                  id="submitBTN"
                  onClick={handleSubmitButton}
                  type="submit"
                  className="submit-btn"
                >
                  Submit
                </button>
              </form>
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierQuestions;
