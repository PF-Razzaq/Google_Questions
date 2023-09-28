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
        toast.success(`Record Added: Record id is: ${data.response.recordId}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
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
                    pattern="[0-9]*"
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
                    pattern="[0-9]*"
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
                    pattern="[0-9]*"
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
                      pattern="[0-9]*"
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
                      pattern="[0-9]*"
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
                {/* Question  15*/}
                <div className="field-sections">
                  <span>Q.15:&nbsp;&nbsp;</span>
                  <span>
                    Total Number of Employees{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="This value must be a number"
                    type="number"
                    pattern="[0-9]*"
                    name="Qs15_TotalNoOfEmployees" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  16*/}
                <div className="field-sections">
                  <span>Q.16:&nbsp;&nbsp;</span>
                  <span>Ownership</span>
                  <select
                    value={supplierData.Qs16_Ownership}
                    onChange={handleOptionChange}
                    className="form-select"
                    aria-label="Default select example"
                    name="Qs16_Ownership"
                    required
                  >
                    <option disabled selected>
                      Ownership
                    </option>
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                    <option value="state">State</option>
                    <option value="jointVenture">Joint Venture</option>
                    <option value="belongsToGroup">Belongs to Group </option>
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
                        name="Qs16_Ownership"
                        required
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
                {/* Question  17*/}
                <div className="field-sections">
                  <span>Q.8:&nbsp;&nbsp;</span>
                  <span>Business Category</span>
                  <select
                    value={supplierData.Qs17_BusinessCategory}
                    onChange={handleOptionChange}
                    className="form-select"
                    aria-label="Default select example"
                    name="Qs17_BusinessCategory"
                  >
                    <option disabled selected>
                      Business Category
                    </option>
                    <option value="trader">Trader</option>
                    <option value="manufacturerTrader">
                      Manufacturer / Trader
                    </option>
                  </select>
                </div>
                {/* Question  18*/}
                <div className="field-sections">
                  <span>Q.18:&nbsp;&nbsp;</span>
                  <span>
                    Main Products(Please separate by "/" incl. space, e.g.,
                    product 1 / product 2){" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs18_MainProducts" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  19*/}
                <div className="field-sections">
                  <span>Q.19:&nbsp;&nbsp;</span>
                  <span>
                    Sales per Year / Domestic / (Mio USD){" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="This value must be a number"
                    type="number"
                    pattern="[0-9]*"
                    name="Qs19_SalesPerYearDomestic" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  20*/}
                <div className="field-sections">
                  <span>Q.20:&nbsp;&nbsp;</span>
                  <span>
                    Sales per Year / Export / (Mio USD)
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="This value must be a number"
                    type="number"
                    pattern="[0-9]*"
                    name="Qs20_SalesPerYearExport" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  21*/}
                <div className="field-sections">
                  <span>Q.21:&nbsp;&nbsp;</span>
                  <span>
                    Main Customers and Country(Please separate by "/" incl.
                    space, e.g., Company 1 - Country 1 / Company 2 - Country 2)
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs21_MainCustomerAndCountry" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  22*/}
                <div className="field-sections">
                  <span>Q.22:&nbsp;&nbsp;</span>
                  <span>
                    Main Customer Products(Please separate by "/" incl. space,
                    e.g., product 1 / product 2)
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs22_MainCustomerProducts" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  23*/}
                <div className="field-sections">
                  <span>Q.23:&nbsp;&nbsp;</span>
                  <span>Main Export Markets</span>
                  <span style={{ color: "red" }}>*</span>

                  <select
                    value={supplierData.Qs23_MainExportMarkets}
                    onChange={handleOptionChange}
                    className="form-select"
                    aria-label="Default select example"
                    name="Qs23_MainExportMarkets"
                    required
                  >
                    <option disabled selected>
                      Main Export Markets
                    </option>
                    <option value="private">Western Europe</option>
                    <option value="public">Eastern</option>
                    <option value="state">North America</option>
                    <option value="jointVenture">South America</option>
                    <option value="belongsToGroup">Asia Pacific </option>
                    <option value="belongsToGroup">Africa </option>
                    <option value="belongsToGroup">Middle East </option>
                    <option value="belongsToGroup">Worldwide</option>
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
                        name="Qs23_MainExportMarkets"
                        required
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
                {/* Question 24 */}
                <div className="field-sections">
                  <span>Q.24:&nbsp;&nbsp;</span>
                  <span>Trade Fair</span>
                  <span style={{ color: "red" }}>*</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs24_TradeFair"
                      type="radio"
                      value="yes"
                      checked={supplierData.Qs24_TradeFair === "yes"}
                      onChange={handleChange}
                      required
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs24_TradeFair"
                      checked={supplierData.Qs24_TradeFair === "no"}
                      onChange={handleChange}
                      required
                    />
                    No
                  </label>
                </div>
                {/* Question  25*/}
                <div className="field-sections">
                  <span>Q.25:&nbsp;&nbsp;</span>
                  <span>
                    Trade Fair Participation(Please separate by "/" incl. space,
                    e.g., Trade Fair 1 / Trade Fair 2)
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs25_TradeFairParticipation" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
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
                      required
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
                      required
                    />
                    No
                  </label>
                </div>
                {/* Question  27*/}
                <div className="field-sections">
                  <span>Q.27:&nbsp;&nbsp;</span>
                  <span>
                    Delivery lead time for initial order (in working days){" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="This value must be a number"
                    type="number"
                    pattern="[0-9]*"
                    name="Qs27_DeliveryLeadTimeInitialOrder" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  28*/}
                <div className="field-sections">
                  <span>Q.28:&nbsp;&nbsp;</span>
                  <span>
                    Delivery lead time for repeat orders (in working days)
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="This value must be a number"
                    type="number"
                    pattern="[0-9]*"
                    name="Qs28_DeliveryLeadTimeRepeatOrder" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                <h3 className="supplier-heading">Bank Information</h3>
                {/* Question  29*/}
                <div className="field-sections">
                  <span>Q.29:&nbsp;&nbsp;</span>
                  <span>
                    Beneficiary Name<span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs29_BeneficiaryName" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  30*/}
                <div className="field-sections">
                  <span>Q.30:&nbsp;&nbsp;</span>
                  <span>
                    Bank Name<span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs30_BankName" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  31*/}
                <div className="field-sections">
                  <span>Q.31:&nbsp;&nbsp;</span>
                  <span>
                    Bank Address<span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs31_BankAddress" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  32*/}
                <div className="field-sections">
                  <span>Q.32:&nbsp;&nbsp;</span>
                  <span>Country of Bank A/C</span>
                  <span style={{ color: "red" }}>*</span>
                  <select
                    value={supplierData.Qs32_CountryOfBankAC}
                    onChange={handleOptionChange}
                    className="form-select"
                    aria-label="Default select example"
                    name="Qs32_CountryOfBankAC"
                    required
                  >
                    <option disabled selected>
                      Country of Bank Account
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
                        name="Qs32_CountryOfBankAC"
                        aria-describedby="basic-addon2"
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-primary ms-2"
                          type="button"
                          onClick={handleSaveCustomOption}
                        >
                          Add Country Bank Account
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                {/* Question  33*/}
                <div className="field-sections">
                  <span>Q.33:&nbsp;&nbsp;</span>
                  <span>Bank Phone</span>
                  <div className="form-group d-flex">
                    <select
                      className="form-control countryCode me-1"
                      id="countrySelect"
                      name="Qs33_BankPhone"
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
                      name="Qs33_BankPhone"
                      placeholder="This value must be a number"
                      type="number"
                      pattern="[0-9]*"
                      onChange={handleChange}
                      class="form-control ms-1 phoneNumberInput"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    ></input>
                  </div>
                </div>
                {/* Question  34*/}
                <div className="field-sections">
                  <span>Q.34:&nbsp;&nbsp;</span>
                  <span>Bank Regional Number</span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs34_BankRegionalNumber" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                  />
                </div>
                {/* Question  35*/}
                <div className="field-sections">
                  <span>Q.35:&nbsp;&nbsp;</span>
                  <span>
                    SWIFT<span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs35_SWIFT" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  36*/}
                <div className="field-sections">
                  <span>Q.36:&nbsp;&nbsp;</span>
                  <span>IBAN</span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs36_IBAN" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                  />
                </div>
                {/* Question  37*/}
                <div className="field-sections">
                  <span>Q.37:&nbsp;&nbsp;</span>
                  <span>
                    Beneficiary Bank A/C Number
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qs37_BeneficiaryBankACNumber" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
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
                            accept="application/pdf,image/jpeg,image/png"
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
                {/* Question  39  Choose radio button show 40 question*/}
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
                            accept="application/pdf,image/jpeg,image/png"
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
                        <br />
                        {/* Question 40 */}
                        <div className="field-sections">
                          <span>Q.40:&nbsp;&nbsp;</span>
                          <span>
                            Can you confirm that your company fulfils the due
                            diligence obligations contained in § 3 paragraph 1
                            sentence 2 LkSG?
                          </span>
                          <br />
                          <br />
                          <label>
                            <input
                              name="Qs40_ConfirmCompanyFulfilsDueDiligenceObligations"
                              type="radio"
                              value="yes"
                              checked={
                                supplierData.Qs40_ConfirmCompanyFulfilsDueDiligenceObligations ===
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
                              name="Qs40_ConfirmCompanyFulfilsDueDiligenceObligations"
                              checked={
                                supplierData.Qs40_ConfirmCompanyFulfilsDueDiligenceObligations ===
                                "no"
                              }
                              onChange={handleChange}
                            />
                            No
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Question  45*/}
                <div className="field-sections">
                  <span>Q.45:&nbsp;&nbsp;</span>
                  <span>
                    Have you been issued the "Fair Labor Accreditation"
                    evidence?
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs45a_IssuedFairLaborEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs45a_IssuedFairLaborEvidence === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs45a_IssuedFairLaborEvidence"
                      checked={
                        supplierData.Qs45a_IssuedFairLaborEvidence === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {supplierData.Qs45a_IssuedFairLaborEvidence === "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qs45a_IssuedFairLaborEvidence"
                            type="file"
                            accept="application/pdf,image/jpeg,image/png"
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
                        <br />
                      </div>
                    )}
                  </div>
                </div>
                {/* Question  46*/}
                <div className="field-sections">
                  <span>Q.46:&nbsp;&nbsp;</span>
                  <span>Have you been issued the "Fair Stone" evidence?</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs46a_IssuedFairStoneEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs46a_IssuedFairStoneEvidence === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs46a_IssuedFairStoneEvidence"
                      checked={
                        supplierData.Qs46a_IssuedFairStoneEvidenceons === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {supplierData.Qs46a_IssuedFairStoneEvidence === "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qs46b_IssuedFairStoneEvidence"
                            type="file"
                            accept="application/pdf,image/jpeg,image/png"
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
                        <br />
                      </div>
                    )}
                  </div>
                </div>
                {/* Question  47*/}
                <div className="field-sections">
                  <span>Q.47:&nbsp;&nbsp;</span>
                  <span>
                    Have you been issued the "Global Organic Textile Standard"
                    evidence?
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs47a_IssuedGlobalOrganicTextileEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs47a_IssuedGlobalOrganicTextileEvidence ===
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
                      name="Qs47a_IssuedGlobalOrganicTextileEvidence"
                      checked={
                        supplierData.Qs47a_IssuedGlobalOrganicTextileEvidence ===
                        "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {supplierData.Qs47a_IssuedGlobalOrganicTextileEvidence ===
                      "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qs47b_IssuedGlobalOrganicTextileEvidence"
                            type="file"
                            accept="application/pdf,image/jpeg,image/png"
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
                        <br />
                      </div>
                    )}
                  </div>
                </div>
                {/* Question  48*/}
                <div className="field-sections">
                  <span>Q.48:&nbsp;&nbsp;</span>
                  <span>Have you been issued the "Grüner Knopf" evidence?</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs48a_IssuedGrunerKnopfEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs48a_IssuedGrunerKnopfEvidence === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs48a_IssuedGrunerKnopfEvidence"
                      checked={
                        supplierData.Qs48a_IssuedGrunerKnopfEvidence === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {supplierData.Qs48a_IssuedGrunerKnopfEvidence === "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qs48b_IssuedGrunerKnopfEvidence"
                            type="file"
                            accept="application/pdf,image/jpeg,image/png"
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
                        <br />
                      </div>
                    )}
                  </div>
                </div>
                {/* Question  49*/}
                <div className="field-sections">
                  <span>Q.49:&nbsp;&nbsp;</span>
                  <span>Have you been issued the "IGEP" evidence?</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs49a_IssuedIGEPEvidence"
                      type="radio"
                      value="yes"
                      checked={supplierData.Qs49a_IssuedIGEPEvidence === "yes"}
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs49a_IssuedIGEPEvidence"
                      checked={supplierData.Qs49a_IssuedIGEPEvidence === "no"}
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {supplierData.Qs49a_IssuedIGEPEvidence === "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qs49b_IssuedIGEPEvidence"
                            type="file"
                            accept="application/pdf,image/jpeg,image/png"
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
                        <br />
                      </div>
                    )}
                  </div>
                </div>
                {/* Question  50*/}
                <div className="field-sections">
                  <span>Q.50:&nbsp;&nbsp;</span>
                  <span>
                    Have you been issued the "OEKO-TEX® MADE IN GREEN" evidence?
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs50a_IssuedOEKOTEXGreenEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs50a_IssuedOEKOTEXGreenEvidence === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs50a_IssuedOEKOTEXGreenEvidence"
                      checked={
                        supplierData.Qs50a_IssuedOEKOTEXGreenEvidence === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {supplierData.Qs50a_IssuedOEKOTEXGreenEvidence ===
                      "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qs50b_IssuedOEKOTEXGreenEvidence"
                            type="file"
                            accept="application/pdf,image/jpeg,image/png"
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
                        <br />
                      </div>
                    )}
                  </div>
                </div>
                {/* Question  51*/}
                <div className="field-sections">
                  <span>Q.51:&nbsp;&nbsp;</span>
                  <span>
                    Have you been issued the "SMETA (Sedex)" evidence?
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs51a_IssuedSMETASedexEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs51a_IssuedSMETASedexEvidence === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs51a_IssuedSMETASedexEvidence"
                      checked={
                        supplierData.Qs51a_IssuedSMETASedexEvidence === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {supplierData.Qs51a_IssuedSMETASedexEvidence === "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qs51b_IssuedSMETASedexEvidence"
                            type="file"
                            accept="application/pdf,image/jpeg,image/png"
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
                        <br />
                      </div>
                    )}
                  </div>
                </div>
                {/* Question  52*/}
                <div className="field-sections">
                  <span>Q.52:&nbsp;&nbsp;</span>
                  <span>
                    Have you been issued the "Social Accountability
                    International - SA8000" evidence?
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs52a_IssuedSocialAccountabilitySA8000"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs52a_IssuedSocialAccountabilitySA8000 ===
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
                      name="Qs52a_IssuedSocialAccountabilitySA8000"
                      checked={
                        supplierData.Qs52a_IssuedSocialAccountabilitySA8000 ===
                        "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {supplierData.Qs52a_IssuedSocialAccountabilitySA8000 ===
                      "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qs52b_IssuedSocialAccountabilitySA8000"
                            type="file"
                            accept="application/pdf,image/jpeg,image/png"
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
                        <br />
                      </div>
                    )}
                  </div>
                </div>
                {/* Question  53*/}
                <div className="field-sections">
                  <span>Q.53:&nbsp;&nbsp;</span>
                  <span>
                    Have you been issued the "XertifiX Standard" evidence?
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs53a_IssuedXertifixStandardEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs53a_IssuedXertifixStandardEvidence ===
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
                      name="Qs53a_IssuedXertifixStandardEvidence"
                      checked={
                        supplierData.Qs53a_IssuedXertifixStandardEvidence ===
                        "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {supplierData.Qs53a_IssuedXertifixStandardEvidence ===
                      "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qs53_IssuedXertifixStandardEvidence"
                            type="file"
                            accept="application/pdf,image/jpeg,image/png"
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
                        <br />
                      </div>
                    )}
                  </div>
                </div>
                {/* Question  54*/}
                <div className="field-sections">
                  <span>Q.54:&nbsp;&nbsp;</span>
                  <span>
                    Have you been issued the "XertifiX PLUS" evidence?
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs54a_IssuedXertifixPlusEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs54a_IssuedXertifixPlusEvidence === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs54a_IssuedXertifixPlusEvidence"
                      checked={
                        supplierData.Qs54a_IssuedXertifixPlusEvidence === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {supplierData.Qs54a_IssuedXertifixPlusEvidence ===
                      "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qs54b_IssuedXertifixPlusEvidence"
                            type="file"
                            accept="application/pdf,image/jpeg,image/png"
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
                        <br />
                      </div>
                    )}
                  </div>
                </div>
                {/* Question  55*/}
                <div className="field-sections">
                  <span>Q.55:&nbsp;&nbsp;</span>
                  <span>
                    Have you been issued the "AMFORI BEPI (Level 1, 2, 3)"
                    evidence?
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs55a_IssuedAMFORIBEPIEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs55a_IssuedAMFORIBEPIEvidence === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs55a_IssuedAMFORIBEPIEvidence"
                      checked={
                        supplierData.Qs55a_IssuedAMFORIBEPIEvidence === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {supplierData.Qs55a_IssuedAMFORIBEPIEvidence === "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qs55b_IssuedAMFORIBEPIEvidence"
                            type="file"
                            accept="application/pdf,image/jpeg,image/png"
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
                        <br />
                      </div>
                    )}
                  </div>
                </div>
                {/* Question  56*/}
                <div className="field-sections">
                  <span>Q.56:&nbsp;&nbsp;</span>
                  <span>
                    Have you been issued the "DIN EN ISO 14001" evidence?
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs56a_IssuedDINENISO14001Evidence"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs56a_IssuedDINENISO14001Evidence === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs56a_IssuedDINENISO14001Evidence"
                      checked={
                        supplierData.Qs56a_IssuedDINENISO14001Evidence === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {supplierData.Qs56a_IssuedDINENISO14001Evidence ===
                      "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qs56b_IssuedDINENISO14001Evidence"
                            type="file"
                            accept="application/pdf,image/jpeg,image/png"
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
                        <br />
                      </div>
                    )}
                  </div>
                </div>
                {/* Question  57*/}
                <div className="field-sections">
                  <span>Q.57:&nbsp;&nbsp;</span>
                  <span>Have you been issued the "Grüner Knopf" evidence?</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs57a_IssuedGrunerKnopfEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs57a_IssuedGrunerKnopfEvidence === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs57a_IssuedGrunerKnopfEvidence"
                      checked={
                        supplierData.Qs57a_IssuedGrunerKnopfEvidence === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {supplierData.Qs57a_IssuedGrunerKnopfEvidence === "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qs57b_IssuedGrunerKnopfEvidence"
                            type="file"
                            accept="application/pdf,image/jpeg,image/png"
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
                        <br />
                      </div>
                    )}
                  </div>
                </div>
                {/* Question  58*/}
                <div className="field-sections">
                  <span>Q.58:&nbsp;&nbsp;</span>
                  <span>
                    Have you been issued the "IGEP (ISES 2020 Audit)" evidence?
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs58a_IssuedIGEP2020AuditEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs58a_IssuedIGEP2020AuditEvidence === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs58a_IssuedIGEP2020AuditEvidence"
                      checked={
                        supplierData.Qs58a_IssuedIGEP2020AuditEvidence === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {supplierData.Qs58a_IssuedIGEP2020AuditEvidence ===
                      "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qs58b_IssuedIGEP2020AuditEvidence"
                            type="file"
                            accept="application/pdf,image/jpeg,image/png"
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
                        <br />
                      </div>
                    )}
                  </div>
                </div>
                {/* Question  59*/}
                <div className="field-sections">
                  <span>Q.59:&nbsp;&nbsp;</span>
                  <span>
                    Have you been issued the "DIN EN ISO 45001" evidence?
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs59a_IssuedDINENISO45001Evidence"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs59a_IssuedDINENISO45001Evidence === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs59a_IssuedDINENISO45001Evidence"
                      checked={
                        supplierData.Qs59a_IssuedDINENISO45001Evidence === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {supplierData.Qs59a_IssuedDINENISO45001Evidence ===
                      "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qs59b_IssuedDINENISO45001Evidence"
                            type="file"
                            accept="application/pdf,image/jpeg,image/png"
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
                        <br />
                      </div>
                    )}
                  </div>
                </div>
                {/* Question 60 */}
                <div className="field-sections">
                  <span>Q.60:&nbsp;&nbsp;</span>
                  <span>
                    Do you contractually obligate your direct suppliers to
                    comply with national environmental laws?
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs60_ContractuallyObligateDirectSuppliersNational"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs60_ContractuallyObligateDirectSuppliersNational ===
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
                      name="Qs60_ContractuallyObligateDirectSuppliersNational"
                      checked={
                        supplierData.Qs60_ContractuallyObligateDirectSuppliersNational ===
                        "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>{" "}
                {/* Question 61 */}
                <div className="field-sections">
                  <span>Q.61:&nbsp;&nbsp;</span>
                  <span>
                    Do you require your direct suppliers to respect human
                    rights?
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs61_RequireDirectSuppliersHumanRights"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs61_RequireDirectSuppliersHumanRights ===
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
                      name="Qs61_RequireDirectSuppliersHumanRights"
                      checked={
                        supplierData.Qs61_RequireDirectSuppliersHumanRights ===
                        "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 62 */}
                <div className="field-sections">
                  <span>Q.62:&nbsp;&nbsp;</span>
                  <span>
                    Do you carry out an annual or event-related risk analysis in
                    your company?
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs62_CarryOutAnnualEventRiskAnalysis"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs62_CarryOutAnnualEventRiskAnalysis ===
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
                      name="Qs62_CarryOutAnnualEventRiskAnalysis"
                      checked={
                        supplierData.Qs62_CarryOutAnnualEventRiskAnalysis ===
                        "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
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
                  {/* This Question is Dependent on Question 123. */}
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
                        />
                      </div>
                    )}
                  </div>
                  {/* Question 65 */}
                  <div className="field-sections">
                    <span>Q.65:&nbsp;&nbsp;</span>
                    <span>
                      Do you check the age of your workers as part of the hiring
                      process?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs65_CheckAgeWorkerAtHiring"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs65_CheckAgeWorkerAtHiring === "yes"
                        }
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label style={{ marginLeft: "1rem" }}>
                      <input
                        type="radio"
                        value="no"
                        name="Qs65_CheckAgeWorkerAtHiring"
                        checked={
                          supplierData.Qs65_CheckAgeWorkerAtHiring === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 66 */}
                  <div className="field-sections">
                    <span>Q.66:&nbsp;&nbsp;</span>
                    <span>
                      Is the age of your workers also verified when the hiring
                      process is conducted by placement agencies?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs66_AgeWorkersVerifiedHiringConducted"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs66_AgeWorkersVerifiedHiringConducted ===
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
                        name="Qs66_AgeWorkersVerifiedHiringConducted"
                        checked={
                          supplierData.Qs66_AgeWorkersVerifiedHiringConducted ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 67 */}
                  <div className="field-sections">
                    <span>Q.67:&nbsp;&nbsp;</span>
                    <span>Do you employ persons under the age of 18?</span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs67_EmployPersonUnderAge18"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs67_EmployPersonUnderAge18 === "yes"
                        }
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label style={{ marginLeft: "1rem" }}>
                      <input
                        type="radio"
                        value="no"
                        name="Qs67_EmployPersonUnderAge18"
                        checked={
                          supplierData.Qs67_EmployPersonUnderAge18 === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 68 */}
                  <div className="field-sections">
                    <span>Q.68:&nbsp;&nbsp;</span>
                    <span>Do you employ persons under the age of 15?</span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs68_EmployPersonUnderAge15"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs68_EmployPersonUnderAge15 === "yes"
                        }
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label style={{ marginLeft: "1rem" }}>
                      <input
                        type="radio"
                        value="no"
                        name="Qs68_EmployPersonUnderAge15"
                        checked={
                          supplierData.Qs68_EmployPersonUnderAge15 === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 69 */}
                  <div className="field-sections">
                    <span>Q.69:&nbsp;&nbsp;</span>
                    <span>
                      Are there work instructions for which work persons under
                      18 are not allowed to be employed?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs69_WorkInstructionsUnder18NotAllowed"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs69_WorkInstructionsUnder18NotAllowed ===
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
                        name="Qs69_WorkInstructionsUnder18NotAllowed"
                        checked={
                          supplierData.Qs69_WorkInstructionsUnder18NotAllowed ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 70 */}
                  <div className="field-sections">
                    <span>Q.70:&nbsp;&nbsp;</span>
                    <span>
                      Do persons under the age of 18 perform work for you under
                      water or underground?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs70_PersonAge18performUnderWaterUnderGround"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs70_PersonAge18performUnderWaterUnderGround ===
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
                        name="Qs70_PersonAge18performUnderWaterUnderGround"
                        checked={
                          supplierData.Qs70_PersonAge18performUnderWaterUnderGround ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 71 */}
                  <div className="field-sections">
                    <span>Q.71:&nbsp;&nbsp;</span>
                    <span>
                      Do persons under the age of 18 perform work for you at
                      dangerous heights or in confined spaces?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs71_PersonAge18performDangerousHeights"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs71_PersonAge18performDangerousHeights ===
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
                        name="Qs71_PersonAge18performDangerousHeights"
                        checked={
                          supplierData.Qs71_PersonAge18performDangerousHeights ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 72 */}
                  <div className="field-sections">
                    <span>Q.72:&nbsp;&nbsp;</span>
                    <span>
                      Do persons under the age of 18 work with dangerous
                      machinery, equipment or tools?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs72_PersonAge18WorkDangerousMachineryEquipment"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs72_PersonAge18WorkDangerousMachineryEquipment ===
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
                        name="Qs72_PersonAge18WorkDangerousMachineryEquipment"
                        checked={
                          supplierData.Qs72_PersonAge18WorkDangerousMachineryEquipment ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 73 */}
                  <div className="field-sections">
                    <span>Q.73:&nbsp;&nbsp;</span>
                    <span>
                      Do people under 18 handle or transport heavy loads in your
                      business?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs73_PersonAge18HandleHeavyLoads"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs73_PersonAge18HandleHeavyLoads ===
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
                        name="Qs73_PersonAge18HandleHeavyLoads"
                        checked={
                          supplierData.Qs73_PersonAge18HandleHeavyLoads === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 74 */}
                  <div className="field-sections">
                    <span>Q.74:&nbsp;&nbsp;</span>
                    <span>
                      Do persons under the age of 18 work with hazardous
                      substances, agents or processes?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs74_PersonAge18WorkHazardousSubstancesAgents"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs74_PersonAge18WorkHazardousSubstancesAgents ===
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
                        name="Qs74_PersonAge18WorkHazardousSubstancesAgents"
                        checked={
                          supplierData.Qs74_PersonAge18WorkHazardousSubstancesAgents ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 75 */}
                  <div className="field-sections">
                    <span>Q.75:&nbsp;&nbsp;</span>
                    <span>
                      Do persons under the age of 18 work in areas with harmful
                      temperatures, noise levels or vibrations?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs75_PersonAge18WorkAreaHarmfulTempNoise"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs75_PersonAge18WorkAreaHarmfulTempNoise ===
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
                        name="Qs75_PersonAge18WorkAreaHarmfulTempNoise"
                        checked={
                          supplierData.Qs75_PersonAge18WorkAreaHarmfulTempNoise ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 76 */}
                  <div className="field-sections">
                    <span>Q.76:&nbsp;&nbsp;</span>
                    <span>
                      Do persons under the age of 18 work in your company at
                      night time?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs76_PersonAge18WorkInNight"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs76_PersonAge18WorkInNight === "yes"
                        }
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label style={{ marginLeft: "1rem" }}>
                      <input
                        type="radio"
                        value="no"
                        name="Qs76_PersonAge18WorkInNight"
                        checked={
                          supplierData.Qs76_PersonAge18WorkInNight === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 77 */}
                  <div className="field-sections">
                    <span>Q.77:&nbsp;&nbsp;</span>
                    <span>
                      Is there a predefined procedure if you suspect that one of
                      your suppliers is unlawfully employing children?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs77_PredefinedProcedureSuppliersUnlawfullyEmploying"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs77_PredefinedProcedureSuppliersUnlawfullyEmploying ===
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
                        name="Qs77_PredefinedProcedureSuppliersUnlawfullyEmploying"
                        checked={
                          supplierData.Qs77_PredefinedProcedureSuppliersUnlawfullyEmploying ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 78 */}
                  <div className="field-sections">
                    <span>Q.78:&nbsp;&nbsp;</span>
                    <span>
                      Are persons under the age of 18 in your company in debt
                      bondage, serfdom or forced or compulsory labor?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs78_PersonUnderAge18InDeptBondageSerfdomForced"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs78_PersonUnderAge18InDeptBondageSerfdomForced ===
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
                        name="Qs78_PersonUnderAge18InDeptBondageSerfdomForced"
                        checked={
                          supplierData.Qs78_PersonUnderAge18InDeptBondageSerfdomForced ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 79 */}
                  <div className="field-sections">
                    <span>Q.79:&nbsp;&nbsp;</span>
                    <span>
                      Is there any work in your company that is only performed
                      when a penalty is threatened (e.g. withholding wages)?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs79_AnyWorkPerformedPenaltyThreatened"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs79_AnyWorkPerformedPenaltyThreatened ===
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
                        name="Qs79_AnyWorkPerformedPenaltyThreatened"
                        checked={
                          supplierData.Qs79_AnyWorkPerformedPenaltyThreatened ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 80 */}
                  <div className="field-sections">
                    <span>Q.80:&nbsp;&nbsp;</span>
                    <span>
                      Do you retain the identification documents of your
                      employees?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="QsS80_RetainIdentificationDocuments"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.QsS80_RetainIdentificationDocuments ===
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
                        name="QsS80_RetainIdentificationDocuments"
                        checked={
                          supplierData.QsS80_RetainIdentificationDocuments ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 81 */}
                  <div className="field-sections">
                    <span>Q.81:&nbsp;&nbsp;</span>
                    <span>
                      Do you retain originals or copies of identification
                      documents?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs81_RetainOriginalsCopiesDocuments"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs81_RetainOriginalsCopiesDocuments ===
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
                        name="Qs81_RetainOriginalsCopiesDocuments"
                        checked={
                          supplierData.Qs81_RetainOriginalsCopiesDocuments ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 82 */}
                  <div className="field-sections">
                    <span>Q.82:&nbsp;&nbsp;</span>
                    <span>
                      Do you impose penalties on your employees (e.g.
                      withholding of wages, restriction of movement, withholding
                      of identification documents, special work)?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs82_ImposePenaltiesEmployees"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs82_ImposePenaltiesEmployees === "yes"
                        }
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label style={{ marginLeft: "1rem" }}>
                      <input
                        type="radio"
                        value="no"
                        name="Qs82_ImposePenaltiesEmployees"
                        checked={
                          supplierData.Qs82_ImposePenaltiesEmployees === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 83 */}
                  <div className="field-sections">
                    <span>Q.83:&nbsp;&nbsp;</span>
                    <span>
                      Do you have employees who are so deep in debt to you that
                      it takes them several years to pay off with their wages?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs83_HaveEmpSoDeepInDeptSeveralYearsPay"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs83_HaveEmpSoDeepInDeptSeveralYearsPay ===
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
                        name="Qs83_HaveEmpSoDeepInDeptSeveralYearsPay"
                        checked={
                          supplierData.Qs83_HaveEmpSoDeepInDeptSeveralYearsPay ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 84 */}
                  <div className="field-sections">
                    <span>Q.84:&nbsp;&nbsp;</span>
                    <span>
                      Is the weekly working time (including overtime) more than
                      60 hours or more than 10 hours per day?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs84_WeeklyWorkingTimeOvertimeMorethan60Hours"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs84_WeeklyWorkingTimeOvertimeMorethan60Hours ===
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
                        name="Qs84_WeeklyWorkingTimeOvertimeMorethan60Hours"
                        checked={
                          supplierData.Qs84_WeeklyWorkingTimeOvertimeMorethan60Hours ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 86 */}
                  <div className="field-sections">
                    <span>Q.86:&nbsp;&nbsp;</span>
                    <span>
                      Is there a predefined procedure if you suspect that forced
                      or slave labor exists at one of your suppliers?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs86_PredefinedProcedureForcedSlaveLaborExists"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs86_PredefinedProcedureForcedSlaveLaborExists ===
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
                        name="Qs86_PredefinedProcedureForcedSlaveLaborExists"
                        checked={
                          supplierData.Qs86_PredefinedProcedureForcedSlaveLaborExists ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 87 */}
                  <div className="field-sections">
                    <span>Q.87:&nbsp;&nbsp;</span>
                    <span>
                      Does your company document the working hours and
                      wages/remuneration of its employees?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs87_CompanyDocumentWorkingHourseWages"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs87_CompanyDocumentWorkingHourseWages ===
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
                        name="Qs87_CompanyDocumentWorkingHourseWages"
                        checked={
                          supplierData.Qs87_CompanyDocumentWorkingHourseWages ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 88 */}
                  <div className="field-sections">
                    <span>Q.88:&nbsp;&nbsp;</span>
                    <span>
                      Does your company have a health and safety policy that is
                      appropriate for your company?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs88_CompanyHaveHealthAndSafety"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs88_CompanyHaveHealthAndSafety === "yes"
                        }
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label style={{ marginLeft: "1rem" }}>
                      <input
                        type="radio"
                        value="no"
                        name="Qs88_CompanyHaveHealthAndSafety"
                        checked={
                          supplierData.Qs88_CompanyHaveHealthAndSafety === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 89 */}
                  <div className="field-sections">
                    <span>Q.89:&nbsp;&nbsp;</span>
                    <span>
                      Does your organization have procedures in place to capture
                      and assess security risks and to correct identified
                      vulnerabilities?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs89_OrganizationHaveProceduresSecurityRisks"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs89_OrganizationHaveProceduresSecurityRisks ===
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
                        name="Qs89_OrganizationHaveProceduresSecurityRisks"
                        checked={
                          supplierData.Qs89_OrganizationHaveProceduresSecurityRisks ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 90 */}
                  <div className="field-sections">
                    <span>Q.90:&nbsp;&nbsp;</span>
                    <span>
                      Does your operation work at high altitudes, in confined
                      spaces, or involve very high or low temperatures?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs90_OperationHighAltitudesConfinedSpaces"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs90_OperationHighAltitudesConfinedSpaces ===
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
                        name="Qs90_OperationHighAltitudesConfinedSpaces"
                        checked={
                          supplierData.Qs90_OperationHighAltitudesConfinedSpaces ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 91 */}
                  <div className="field-sections">
                    <span>Q.91:&nbsp;&nbsp;</span>
                    <span>
                      Do you work with hazardous chemical and biological
                      substances?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs91_WorkHazardousChemicalBiologicalSubstances"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs91_WorkHazardousChemicalBiologicalSubstances ===
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
                        name="Qs91_WorkHazardousChemicalBiologicalSubstances"
                        checked={
                          supplierData.Qs91_WorkHazardousChemicalBiologicalSubstances ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 92 */}
                  <div className="field-sections">
                    <span>Q.92:&nbsp;&nbsp;</span>
                    <span>
                      Does your company have instructions on the use of special
                      safety equipment (e.g. protective clothing)?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs92_InstructionUseSafetyEquipments"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs92_InstructionUseSafetyEquipments ===
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
                        name="Qs92_InstructionUseSafetyEquipments"
                        checked={
                          supplierData.Qs92_InstructionUseSafetyEquipments ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 93 */}
                  <div className="field-sections">
                    <span>Q.93:&nbsp;&nbsp;</span>
                    <span>
                      Is there a person responsible in your company for the safe
                      storage, distribution and instruction regarding the safe
                      handling of these substances?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs93_PersonalResponsibleSafeStorageDistribution"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs93_PersonalResponsibleSafeStorageDistribution ===
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
                        name="Qs93_PersonalResponsibleSafeStorageDistribution"
                        checked={
                          supplierData.Qs93_PersonalResponsibleSafeStorageDistribution ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 94 */}
                  <div className="field-sections">
                    <span>Q.94:&nbsp;&nbsp;</span>
                    <span>
                      Is there technical equipment for emergencies in your
                      company and is it regularly checked and maintained (e.g.
                      fire extinguishing system)?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs94_TechnicalEquipmentEmergenciesRegularlyChecked"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs94_TechnicalEquipmentEmergenciesRegularlyChecked ===
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
                        name="Qs94_TechnicalEquipmentEmergenciesRegularlyChecked"
                        checked={
                          supplierData.Qs94_TechnicalEquipmentEmergenciesRegularlyChecked ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 95 */}
                  <div className="field-sections">
                    <span>Q.95:&nbsp;&nbsp;</span>
                    <span>
                      Are there persons in your company who are specially
                      trained to act in emergencies (e.g. first aid training)?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs95_PersonsSpeciallyTrainedActEmergencies"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs95_PersonsSpeciallyTrainedActEmergencies ===
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
                        name="Qs95_PersonsSpeciallyTrainedActEmergencies"
                        checked={
                          supplierData.Qs95_PersonsSpeciallyTrainedActEmergencies ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 96 */}
                  <div className="field-sections">
                    <span>Q.96:&nbsp;&nbsp;</span>
                    <span>
                      Does your company offer its employees the opportunity to
                      provide feedback and complaints to management?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs96_OfferOpportunityProvideFeedbackComplaints"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs96_OfferOpportunityProvideFeedbackComplaints ===
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
                        name="Qs96_OfferOpportunityProvideFeedbackComplaints"
                        checked={
                          supplierData.Qs96_OfferOpportunityProvideFeedbackComplaints ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 97 */}
                  <div className="field-sections">
                    <span>Q.97:&nbsp;&nbsp;</span>
                    <span>
                      Are your employees regularly trained on the subject of
                      occupational safety, especially when they are hired?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs97_EmpRegularlyTrainedOccupationalSafetyHired"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs97_EmpRegularlyTrainedOccupationalSafetyHired ===
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
                        name="Qs97_EmpRegularlyTrainedOccupationalSafetyHired"
                        checked={
                          supplierData.Qs97_EmpRegularlyTrainedOccupationalSafetyHired ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 98 */}
                  <div className="field-sections">
                    <span>Q.98:&nbsp;&nbsp;</span>
                    <span>Are your employees organized in a union?</span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs98_EmpOrganizedAUnion"
                        type="radio"
                        value="yes"
                        checked={supplierData.Qs98_EmpOrganizedAUnion === "yes"}
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label style={{ marginLeft: "1rem" }}>
                      <input
                        type="radio"
                        value="no"
                        name="Qs98_EmpOrganizedAUnion"
                        checked={supplierData.Qs98_EmpOrganizedAUnion === "no"}
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 99 */}
                  <div className="field-sections">
                    <span>Q.99:&nbsp;&nbsp;</span>
                    <span>
                      Are there bonuses or other benefits, if employees are not
                      members of a union or leave a union?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs99_BonusesBenefitsNotMembersUnion"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs99_BonusesBenefitsNotMembersUnion ===
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
                        name="Qs99_BonusesBenefitsNotMembersUnion"
                        checked={
                          supplierData.Qs99_BonusesBenefitsNotMembersUnion ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 100 */}
                  <div className="field-sections">
                    <span>Q.100:&nbsp;&nbsp;</span>
                    <span>
                      Are employees hired or assigned to specific tasks based on
                      national or ethnic origin, social origin, health status,
                      disability, sexual orientation, age, gender, political
                      opinion, religion or belief?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs100_EmpHiredBasedOnEthnicSocialHealthETC"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs100_EmpHiredBasedOnEthnicSocialHealthETC ===
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
                        name="Qs100_EmpHiredBasedOnEthnicSocialHealthETC"
                        checked={
                          supplierData.Qs100_EmpHiredBasedOnEthnicSocialHealthETC ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 101 */}
                  <div className="field-sections">
                    <span>Q.101:&nbsp;&nbsp;</span>
                    <span>
                      Are workers unfairly paid differently for the same work
                      for the reasons mentioned above?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs101_WorkersUnfairlyPaidSameWork"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs101_WorkersUnfairlyPaidSameWork ===
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
                        name="Qs101_WorkersUnfairlyPaidSameWork"
                        checked={
                          supplierData.Qs101_WorkersUnfairlyPaidSameWork ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 102 */}
                  <div className="field-sections">
                    <span>Q.102:&nbsp;&nbsp;</span>
                    <span>
                      Is there a statutory minimum wage in the country/countries
                      where you work?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs102_StatutoryMinimumWageInCountry"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs102_StatutoryMinimumWageInCountry ===
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
                        name="Qs102_StatutoryMinimumWageInCountry"
                        checked={
                          supplierData.Qs102_StatutoryMinimumWageInCountry ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 103 */}
                  <div className="field-sections">
                    <span>Q.103:&nbsp;&nbsp;</span>
                    <span>
                      Do you pay the respective statutory minimum wage or more?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs103_PayRespectiveStatutory"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs103_PayRespectiveStatutory === "yes"
                        }
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label style={{ marginLeft: "1rem" }}>
                      <input
                        type="radio"
                        value="no"
                        name="Qs103_PayRespectiveStatutory"
                        checked={
                          supplierData.Qs103_PayRespectiveStatutory === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 104 */}
                  <div className="field-sections">
                    <span>Q.104:&nbsp;&nbsp;</span>
                    <span>
                      Do you pay at least a wage that is in line with the
                      general wage level in your industry?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs104_PayAtleastWageInLineGeneralWage"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs104_PayAtleastWageInLineGeneralWage ===
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
                        name="Qs104_PayAtleastWageInLineGeneralWage"
                        checked={
                          supplierData.Qs104_PayAtleastWageInLineGeneralWage ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 105 */}
                  <div className="field-sections">
                    <span>Q.105:&nbsp;&nbsp;</span>
                    <span>
                      Is the wage reduced for benefits provided by your company
                      to the employee (e.g. for work clothing, meals,
                      accommodation)?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs105_WageReducedBenefitsProvidedCompany"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs105_WageReducedBenefitsProvidedCompany ===
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
                        name="Qs105_WageReducedBenefitsProvidedCompany"
                        checked={
                          supplierData.Qs105_WageReducedBenefitsProvidedCompany ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 106 */}
                  <div className="field-sections">
                    <span>Q.106:&nbsp;&nbsp;</span>
                    <span>
                      Within the last 20 years, has your company acquired land
                      that was occupied immediately prior to acquisition?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs106_Last20YearsCompanyAcquiredLand"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs106_Last20YearsCompanyAcquiredLand ===
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
                        name="Qs106_Last20YearsCompanyAcquiredLand"
                        checked={
                          supplierData.Qs106_Last20YearsCompanyAcquiredLand ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 107 */}
                  <div className="field-sections">
                    <span>Q.107:&nbsp;&nbsp;</span>
                    <span>
                      Can you confirm that the land owned or held by your
                      company has not been misappropriated?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs107_ConfirmLandOwnedOrHeld"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs107_ConfirmLandOwnedOrHeld === "yes"
                        }
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label style={{ marginLeft: "1rem" }}>
                      <input
                        type="radio"
                        value="no"
                        name="Qs107_ConfirmLandOwnedOrHeld"
                        checked={
                          supplierData.Qs107_ConfirmLandOwnedOrHeld === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 108 */}
                  <div className="field-sections">
                    <span>Q.108:&nbsp;&nbsp;</span>
                    <span>
                      Have you acquired any forest land or water bodies in the
                      last 20 years that were not previously used for commercial
                      purposes?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs108_AcquiredForestLandWaterBodiesLast20Years"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs108_AcquiredForestLandWaterBodiesLast20Years ===
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
                        name="Qs108_AcquiredForestLandWaterBodiesLast20Years"
                        checked={
                          supplierData.Qs108_AcquiredForestLandWaterBodiesLast20Years ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 109 */}
                  <div className="field-sections">
                    <span>Q.109:&nbsp;&nbsp;</span>
                    <span>
                      Do you employ security personnel in your company?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs109_EmpSecurityPersonnel"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs109_EmpSecurityPersonnel === "yes"
                        }
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label style={{ marginLeft: "1rem" }}>
                      <input
                        type="radio"
                        value="no"
                        name="Qs109_EmpSecurityPersonnel"
                        checked={
                          supplierData.Qs109_EmpSecurityPersonnel === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 110 */}
                  <div className="field-sections">
                    <span>Q.110:&nbsp;&nbsp;</span>
                    <span>
                      Are security personnel tasked with monitoring their
                      workers beyond entry and exit checks?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs110_SecurityPersonnelTaskedBeyondEntryExitChecks"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs110_SecurityPersonnelTaskedBeyondEntryExitChecks ===
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
                        name="Qs110_SecurityPersonnelTaskedBeyondEntryExitChecks"
                        checked={
                          supplierData.Qs110_SecurityPersonnelTaskedBeyondEntryExitChecks ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 111 */}
                  <div className="field-sections">
                    <span>Q.111:&nbsp;&nbsp;</span>
                    <span>
                      Has your company defined characteristics/criteria against
                      which relevant environmental impacts can be monitored?
                      (e.g. measurement and monitoring of CO₂ emissions; water
                      consumption)
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs111_CompanyDefinedCriteriaAgaintRelevantImpacts"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs111_CompanyDefinedCriteriaAgaintRelevantImpacts ===
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
                        name="Qs111_CompanyDefinedCriteriaAgaintRelevantImpacts"
                        checked={
                          supplierData.Qs111_CompanyDefinedCriteriaAgaintRelevantImpacts ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 112 */}
                  <div className="field-sections">
                    <span>Q.112:&nbsp;&nbsp;</span>
                    <span>
                      Have there been any legal proceedings against your company
                      for environmental pollution or similar in the last 5
                      years?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs112_LegalProceedingsAgainstEnvPollution"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs112_LegalProceedingsAgainstEnvPollution ===
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
                        name="Qs112_LegalProceedingsAgainstEnvPollution"
                        checked={
                          supplierData.Qs112_LegalProceedingsAgainstEnvPollution ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 113 */}
                  <div className="field-sections">
                    <span>Q.113:&nbsp;&nbsp;</span>
                    <span>
                      Are there work instructions and organizational precautions
                      to minimize emissions to air, soil and water?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs113_WorkInstOrgPrecautionsMinimizeEmissionsAirSoilWater"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs113_WorkInstOrgPrecautionsMinimizeEmissionsAirSoilWater ===
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
                        name="Qs113_WorkInstOrgPrecautionsMinimizeEmissionsAirSoilWater"
                        checked={
                          supplierData.Qs113_WorkInstOrgPrecautionsMinimizeEmissionsAirSoilWater ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 114 */}
                  <div className="field-sections">
                    <span>Q.114:&nbsp;&nbsp;</span>
                    <span>
                      Does your company have instructions and procedures on how
                      to proceed in case of violation of environmental
                      regulations?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs114_CompanyHowProceedCaseViolation"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs114_CompanyHowProceedCaseViolation ===
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
                        name="Qs114_CompanyHowProceedCaseViolation"
                        checked={
                          supplierData.Qs114_CompanyHowProceedCaseViolation ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 115 */}
                  <div className="field-sections">
                    <span>Q.115:&nbsp;&nbsp;</span>
                    <span>
                      Does your company publish a report on environmental goals
                      and progress?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs115_CompanyPublishReportOnGoalsProgress"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs115_CompanyPublishReportOnGoalsProgress ===
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
                        name="Qs115_CompanyPublishReportOnGoalsProgress"
                        checked={
                          supplierData.Qs115_CompanyPublishReportOnGoalsProgress ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 116 */}
                  <div className="field-sections">
                    <span>Q.116:&nbsp;&nbsp;</span>
                    <span>
                      Does your business generate hazardous waste or does your
                      company work with radioactive substances?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs116_BusinessGenerateHazardWasteWorkRadioactive"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs116_BusinessGenerateHazardWasteWorkRadioactive ===
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
                        name="Qs116_BusinessGenerateHazardWasteWorkRadioactive"
                        checked={
                          supplierData.Qs116_BusinessGenerateHazardWasteWorkRadioactive ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 117 */}
                  <div className="field-sections">
                    <span>Q.117:&nbsp;&nbsp;</span>
                    <span>
                      Do you work with an external disposal service provider?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs117_WorkWithExternalDisposalServiceProvider"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs117_WorkWithExternalDisposalServiceProvider ===
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
                        name="Qs117_WorkWithExternalDisposalServiceProvider"
                        checked={
                          supplierData.Qs117_WorkWithExternalDisposalServiceProvider ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 118 */}
                  <div className="field-sections">
                    <span>Q.118:&nbsp;&nbsp;</span>
                    <span>
                      Is the export of hazardous waste documented in your
                      company?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs118_ExportHazardousWasteDocumented"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs118_ExportHazardousWasteDocumented ===
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
                        name="Qs118_ExportHazardousWasteDocumented"
                        checked={
                          supplierData.Qs118_ExportHazardousWasteDocumented ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 119 */}
                  <div className="field-sections">
                    <span>Q.119:&nbsp;&nbsp;</span>
                    <span>
                      Can you confirm that your company acts in accordance with
                      the Basel Convention on the Control of Transboundary
                      Movements of Hazardous Wastes and their Disposal?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs119_ConfirmCompActsWithBaselConvention"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs119_ConfirmCompActsWithBaselConvention ===
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
                        name="Qs119_ConfirmCompActsWithBaselConvention"
                        checked={
                          supplierData.Qs119_ConfirmCompActsWithBaselConvention ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 120 */}
                  <div className="field-sections">
                    <span>Q.120:&nbsp;&nbsp;</span>
                    <span>Do you use persistent organic pollutants?</span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs120_UsePersistentOrganicPollutants"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs120_UsePersistentOrganicPollutants ===
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
                        name="Qs120_UsePersistentOrganicPollutants"
                        checked={
                          supplierData.Qs120_UsePersistentOrganicPollutants ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 121 */}
                  <div className="field-sections">
                    <span>Q.121:&nbsp;&nbsp;</span>
                    <span>
                      Can you confirm that your company acts in accordance with
                      the Stockholm Convention on Persistent Organic Pollutants
                      (POPs)?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs121_ConfirmCompActsWithStockholmConvention"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs121_ConfirmCompActsWithStockholmConvention ===
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
                        name="Qs121_ConfirmCompActsWithStockholmConvention"
                        checked={
                          supplierData.Qs121_ConfirmCompActsWithStockholmConvention ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 124 */}
                  <div className="field-sections">
                    <span>Q.124:&nbsp;&nbsp;</span>
                    <span>
                      Do you produce mercury in your company or do you use
                      mercury or products containing mercury or do you treat
                      mercury waste?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs124_ProduceMercuryUseMercuryContainingMercury"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs124_ProduceMercuryUseMercuryContainingMercury ===
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
                        name="Qs124_ProduceMercuryUseMercuryContainingMercury"
                        checked={
                          supplierData.Qs124_ProduceMercuryUseMercuryContainingMercury ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 125 */}
                  <div className="field-sections">
                    <span>Q.125:&nbsp;&nbsp;</span>
                    <span>
                      Can you assure that your company operates in accordance
                      with the Minamata Convention on the Control of Emissions
                      and Releases of the Heavy Metal Mercury?
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qs125_AssureCompOperatesWithMinamataConvention"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs125_AssureCompOperatesWithMinamataConvention ===
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
                        name="Qs125_AssureCompOperatesWithMinamataConvention"
                        checked={
                          supplierData.Qs125_AssureCompOperatesWithMinamataConvention ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                </div>{" "}
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
