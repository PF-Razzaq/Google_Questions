import React, { useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import countryCode from "../Json/CountryCodes.json";
import { FiDownload } from "react-icons/fi";
import "./CompanyInformationForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supplierJson from "../Json/supplierData.json";
let otherCountry;
let recordId = 0;
const SupplierQuestions = () => {
  console.log("supplierJson", supplierJson);
  //   REACT_APP_FM_URL=https://server.pascalinesoft.com:4443
  // REACT_APP_BUILD_URL=apiuser
  // REACT_APP_PUBLIC_URL=apiuser
  // REACT_APP_USERNAME=apiuser
  // REACT_APP_PASSWORD=TomJerry88
  // REACT_APP_DOWNLOAD_FILE=https://images.pascalinesoft.com/pdf/OnlineQuestionnairePhase1.pdf
  console.log(
    "process.env.REACT_APP_DOWNLOAD_FILE,process.env.REACT_APP_FM_URL,process.env.REACT_APP_USERNAME",
    process.env.REACT_APP_DOWNLOAD_FILE,
    process.env.REACT_APP_FM_URL,
    process.env.REACT_APP_USERNAME
  );
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
  const [otherFields, setOtherFields] = useState({});
  const [dilligenceFile, setDilligenceFile] = useState();
  const [issuedFairLaborEvidence, setIssuedFairLaborEvidence] = useState();
  const [issuedFairStoneEvidence, setIssuedFairStoneEvidence] = useState();
  const [
    issuedGlobalOrganicTextileEvidence,
    setIssuedGlobalOrganicTextileEvidence,
  ] = useState();
  const [issuedGrunerKnopfEvidence, setIssuedGrunerKnopfEvidence] = useState();

  const [issuedIGEPEvidence, setIssuedIGEPEvidence] = useState();
  const [issuedOEKOTEXGreenEvidence, setIssuedOEKOTEXGreenEvidence] =
    useState();
  const [issuedSMETASedexEvidence, setIssuedSMETASedexEvidence] = useState();
  const [
    issuedSocialAccountabilitySA8000,
    setIssuedSocialAccountabilitySA8000,
  ] = useState();
  const [issuedXertifixStandardEvidence, setIssuedXertifixStandardEvidence] =
    useState();
  const [issuedXertifixPlusEvidence, setIssuedXertifixPlusEvidence] =
    useState();
  const [issuedAMFORIBEPIEvidence, setIssuedAMFORIBEPIEvidence] = useState();
  const [issuedDINENISO14001Evidence, setIssuedDINENISO14001Evidence] =
    useState();
  const [issuedGrunerKnopfEvidence1, setIssuedGrunerKnopfEvidence1] =
    useState();
  const [issuedIGEP2020AuditEvidence, setIssuedIGEP2020AuditEvidence] =
    useState();
  const [issuedDINENISO45001Evidence, setIssuedDINENISO45001Evidence] =
    useState();
  const navigate = useNavigate();
  const [supplierData, setSupplierData] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [customOption, setCustomOption] = useState("");
  const [options, setOptions] = useState([]);
  const [ownerships, setOwnerships] = useState([]);
  const [exports, setExports] = useState([]);
  const [options32, setOptions32] = useState([]);

  const handleSaveCustomOption = () => {
    if (customOption.trim() !== "") {
      setOptions([...options, customOption]);
      setSelectedOption(customOption);
      setCustomOption("");
      setSupplierData({
        ...supplierData,
        Qs8_Country: customOption,
      });
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
        `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/sessions`,

        {},
        {
          auth: {
            username: process.env.REACT_APP_USERNAME,
            password: process.env.REACT_APP_PASSWORD,
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Supplier Records/records`,

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
        issuedFairLaborEvidenceUpload();
        issuedFairStoneEvidenceUpload();
        issuedGlobalOrganicTextileEvidenceUpload();
        issuedGrunerKnopfEvidenceUpload();
        issuedIGEPEvidenceUpload();
        issuedOEKOTEXGreenEvidenceUpload();
        issuedSMETASedexEvidenceUpload();
        issuedSocialAccountabilitySA8000Upload();
        issuedXertifixStandardEvidenceUpload();
        issuedXertifixStandardEvidenceUpload();
        issuedXertifixPlusEvidenceUpload();
        issuedDINENISO14001EvidenceUpload();
        issuedGrunerKnopfEvidence1Upload();
        issuedAMFORIBEPIEvidenceUpload();
        issuedIGEP2020AuditEvidenceUpload();
        issuedDINENISO45001EvidenceUpload();
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
    if (localStorage.getItem("filemakerToken") && file) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs38b_SignatureUpload/1`,
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
    if (localStorage.getItem("filemakerToken") && dilligenceFile) {
      try {
        const response = await axios.post(
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs39b_HumanRightsViolations/1`,
          upload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const issuedFairLaborEvidenceUpload = async (token) => {
    const upload = new FormData();
    upload.append("upload", issuedFairLaborEvidence);
    if (localStorage.getItem("filemakerToken") && issuedFairLaborEvidence) {
      try {
        const response = await axios.post(
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs45b_IssuedFairLaborEvidence/1`,
          upload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const issuedFairStoneEvidenceUpload = async (token) => {
    const upload = new FormData();
    upload.append("upload", issuedFairStoneEvidence);
    if (localStorage.getItem("filemakerToken") && issuedFairStoneEvidence) {
      try {
        const response = await axios.post(
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs46b_IssuedFairStoneEvidence/1`,
          upload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const issuedGlobalOrganicTextileEvidenceUpload = async (token) => {
    const upload = new FormData();
    upload.append("upload", issuedGlobalOrganicTextileEvidence);
    if (
      localStorage.getItem("filemakerToken") &&
      issuedGlobalOrganicTextileEvidence
    ) {
      try {
        const response = await axios.post(
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs47b_IssuedGlobalOrganicTextileEvidence/1`,
          upload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const issuedGrunerKnopfEvidenceUpload = async (token) => {
    const upload = new FormData();
    upload.append("upload", issuedGrunerKnopfEvidence);
    if (localStorage.getItem("filemakerToken") && issuedGrunerKnopfEvidence) {
      try {
        const response = await axios.post(
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs48b_IssuedGrunerKnopfEvidence/1`,
          upload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const issuedIGEPEvidenceUpload = async (token) => {
    const upload = new FormData();
    upload.append("upload", issuedIGEPEvidence);
    if (localStorage.getItem("filemakerToken") && issuedIGEPEvidence) {
      try {
        const response = await axios.post(
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs49b_IssuedIGEPEvidence/1`,
          upload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const issuedOEKOTEXGreenEvidenceUpload = async (token) => {
    const upload = new FormData();
    upload.append("upload", issuedOEKOTEXGreenEvidence);
    if (localStorage.getItem("filemakerToken") && issuedOEKOTEXGreenEvidence) {
      try {
        const response = await axios.post(
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs50b_IssuedOEKOTEXGreenEvidence/1`,
          upload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const issuedSMETASedexEvidenceUpload = async (token) => {
    const upload = new FormData();
    upload.append("upload", issuedSMETASedexEvidence);
    if (localStorage.getItem("filemakerToken") && issuedSMETASedexEvidence) {
      try {
        const response = await axios.post(
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs51b_IssuedSMETASedexEvidence/1`,
          upload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const issuedSocialAccountabilitySA8000Upload = async (token) => {
    const upload = new FormData();
    upload.append("upload", issuedSocialAccountabilitySA8000);
    if (
      localStorage.getItem("filemakerToken") &&
      issuedSocialAccountabilitySA8000
    ) {
      try {
        const response = await axios.post(
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs52b_IssuedSocialAccountabilitySA8000/1`,
          upload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const issuedXertifixStandardEvidenceUpload = async (token) => {
    const upload = new FormData();
    upload.append("upload", issuedXertifixStandardEvidence);
    if (
      localStorage.getItem("filemakerToken") &&
      issuedXertifixStandardEvidence
    ) {
      try {
        const response = await axios.post(
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs53b_IssuedXertifixStandardEvidence/1`,
          upload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const issuedXertifixPlusEvidenceUpload = async (token) => {
    const upload = new FormData();
    upload.append("upload", issuedXertifixPlusEvidence);
    if (localStorage.getItem("filemakerToken") && issuedXertifixPlusEvidence) {
      try {
        const response = await axios.post(
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs54b_IssuedXertifixPlusEvidence/1`,
          upload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const issuedDINENISO14001EvidenceUpload = async (token) => {
    const upload = new FormData();
    upload.append("upload", issuedDINENISO14001Evidence);
    if (localStorage.getItem("filemakerToken") && issuedDINENISO14001Evidence) {
      try {
        const response = await axios.post(
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs56b_IssuedDINENISO14001Evidence/1`,
          upload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const issuedGrunerKnopfEvidence1Upload = async (token) => {
    const upload = new FormData();
    upload.append("upload", issuedGrunerKnopfEvidence1);
    if (localStorage.getItem("filemakerToken") && issuedGrunerKnopfEvidence1) {
      try {
        const response = await axios.post(
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs57b_IssuedGrunerKnopfEvidence_2/1`,
          upload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const issuedAMFORIBEPIEvidenceUpload = async (token) => {
    const upload = new FormData();
    upload.append("upload", issuedAMFORIBEPIEvidence);
    if (localStorage.getItem("filemakerToken") && issuedAMFORIBEPIEvidence) {
      try {
        const response = await axios.post(
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs55b_IssuedAMFORIBEPIEvidence/1`,
          upload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const issuedIGEP2020AuditEvidenceUpload = async (token) => {
    const upload = new FormData();
    upload.append("upload", issuedIGEP2020AuditEvidence);
    if (localStorage.getItem("filemakerToken") && issuedIGEP2020AuditEvidence) {
      try {
        const response = await axios.post(
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs58b_IssuedIGEP2020AuditEvidence/1`,
          upload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const issuedDINENISO45001EvidenceUpload = async (token) => {
    const upload = new FormData();
    upload.append("upload", issuedDINENISO45001Evidence);
    if (localStorage.getItem("filemakerToken") && issuedDINENISO45001Evidence) {
      try {
        const response = await axios.post(
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs59b_IssuedDINENISO45001Evidence/1`,
          upload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
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
  console.log("supplierData3", supplierData, options);
  const handleSubmitButton = () => {
    connectToDatabase();
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="form-sections p-5">
            <div className="form-field">
              <form onSubmit={connectToDatabase}>
                {/* Question 1 */}
                <div className="field-sections">
                  <span>
                    Q.{supplierJson.find((f) => f.id === "1").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "1").q}{" "}
                    <span style={{ color: "red" }}>*</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "2").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "2").q}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                    // pattern="[0-9]*"
                    name="Qs2_SuppBusinessLicenseNumber" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question 3 */}
                <div className="field-sections">
                  <span>
                    Q.{supplierJson.find((f) => f.id === "3").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "3").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                    pattern="[0-9]*"
                    name="Qs3_SuppExportLicenseNumber" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question 4 */}
                <div className="field-sections">
                  <span>
                    Q.{supplierJson.find((f) => f.id === "4").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "4").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
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
                    {supplierJson.find((f) => f.id === "5a").q}{" "}
                    <span style={{ color: "red" }}>*</span>
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
                    {supplierJson.find((f) => f.id === "5b").q}{" "}
                    <span style={{ color: "red" }}>*</span>
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
                    {supplierJson.find((f) => f.id === "6a").q}{" "}
                    <span style={{ color: "red" }}>*</span>
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
                    {supplierJson.find((f) => f.id === "6b").q}{" "}
                    <span style={{ color: "red" }}>*</span>
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
                    {supplierJson.find((f) => f.id === "6c").q}{" "}
                    <span style={{ color: "red" }}>*</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "7").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "7").q}</span>

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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "8").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "8").q}</span>
                  <select
                    value={supplierData.Qs8_Country}
                    onChange={(e) => {
                      setSupplierData({
                        ...supplierData,
                        Qs8_Country: e.target.value,
                      });
                      setOtherFields({
                        ...otherFields,
                        q8Other: e.target.value,
                      });
                    }}
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
                      <option value={option}>{option}</option>
                    ))}
                    <option value="other">Other</option>
                  </select>
                  {otherFields.q8Other === "other" && (
                    <div className="input-group w-25 mt-2">
                      <input
                        onChange={(e) => {
                          setSupplierData({
                            ...supplierData,
                            Qs8_Country: e.target.value,
                          });
                        }}
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
                          onClick={() => {
                            if (
                              supplierData.Qs8_Country.toLowerCase() !== "other"
                            ) {
                              options.push(supplierData.Qs8_Country);
                              setOptions(options);
                              setSupplierData({ ...supplierData });
                            }
                          }}
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
                    {supplierJson.find((f) => f.id === "9a").q}{" "}
                    <span style={{ color: "red" }}>*</span>
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
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                      }}
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
                    {supplierJson.find((f) => f.id === "9b").q}{" "}
                    <span style={{ color: "red" }}>*</span>
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
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                      }}
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "10").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "10").q}{" "}
                    <span style={{ color: "red" }}>*</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "11").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "11").q}</span>
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
                  <span>Q.12:&nbsp;&nbsp;</span>
                  <select
                    style={{ display: "inline-block" }}
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
                      {supplierJson.find((f) => f.id === "12a").q}
                    </option>
                    <option value="mr">Mr.</option>
                    <option value="ms">Ms.</option>
                  </select>
                </div>
                <div className="field-sections">
                  <span>
                    {supplierJson.find((f) => f.id === "12b").q}{" "}
                    <span style={{ color: "red" }}>*</span>
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
                    {supplierJson.find((f) => f.id === "12c").q}{" "}
                    <span style={{ color: "red" }}>*</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "13").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "13").q}{" "}
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "14").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "14").q}{" "}
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
                    minLength={4}
                    required
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                  />
                </div>
                {/* Question  15*/}
                <div className="field-sections">
                  <span>
                    Q.{supplierJson.find((f) => f.id === "15").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "15").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="This value must be a number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                    pattern="[0-9]*"
                    name="Qs15_TotalNoOfEmployees" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  16*/}
                <div className="field-sections">
                  <span>
                    Q.{supplierJson.find((f) => f.id === "16").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "16").q}</span>
                  <span style={{ color: "red" }}>*</span>
                  <select
                    value={supplierData.Qs16_Ownership}
                    onChange={(e) => {
                      setSupplierData({
                        ...supplierData,
                        Qs16_Ownership: e.target.value,
                      });
                      setOtherFields({
                        ...otherFields,
                        Q16Other: e.target.value,
                      });
                    }}
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
                    {ownerships.map((ownership) => (
                      <option key={ownership} value={ownership}>
                        {ownership}
                      </option>
                    ))}
                    <option value="other">Other</option>
                  </select>

                  {otherFields.Q16Other === "other" && (
                    <div className="input-group w-25 mt-2">
                      <input
                        onChange={(e) => {
                          setSupplierData({
                            ...supplierData,
                            Qs16_Ownership: e.target.value,
                          });
                        }}
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
                          onClick={() => {
                            if (
                              supplierData.Qs16_Ownership.toLowerCase() !==
                              "other"
                            ) {
                              setOwnerships([supplierData.Qs16_Ownership]);
                              setSupplierData({ ...supplierData });
                            }
                          }}
                        >
                          Add Country
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                {/* Question  17*/}
                <div className="field-sections">
                  <span>
                    Q.{supplierJson.find((f) => f.id === "17").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "17").q}</span>
                  <select
                    value={supplierData.Qs17_BusinessCategory}
                    onChange={(e) => {
                      setSupplierData({
                        ...supplierData,
                        Qs17_BusinessCategory: e.target.value,
                      });
                    }}
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "18").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "18").q}{" "}
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "19").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "19").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="This value must be a number"
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                    pattern="[0-9]*"
                    name="Qs19_SalesPerYearDomestic" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  20*/}
                <div className="field-sections">
                  <span>
                    Q.{supplierJson.find((f) => f.id === "20").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "20").q}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="This value must be a number"
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                    pattern="[0-9]*"
                    name="Qs20_SalesPerYearExport" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  21*/}
                <div className="field-sections">
                  <span>
                    Q.{supplierJson.find((f) => f.id === "21").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "21").q}
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "22").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "22").q}
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "23").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "23").q}</span>
                  <span style={{ color: "red" }}>*</span>

                  <select
                    value={supplierData.Qs23_MainExportMarkets}
                    onChange={(e) => {
                      setSupplierData({
                        ...supplierData,
                        Qs23_MainExportMarkets: e.target.value,
                      });
                      setOtherFields({
                        ...otherFields,
                        Q23Other: e.target.value,
                      });
                    }}
                    className="form-select"
                    aria-label="Default select example"
                    name="Qs23_MainExportMarkets"
                    required
                  >
                    <option disabled selected>
                      Main Export Markets
                    </option>
                    <option value="westernEurope">Western Europe</option>
                    <option value="easternEurope">Eastern Europe</option>
                    <option value="northAmerica">North America</option>
                    <option value="southAmerica">South America</option>
                    <option value="asiaPacific">Asia Pacific</option>
                    <option value="africa">Africa </option>
                    <option value="middleEast">Middle East</option>
                    <option value="worldwide">Worldwide</option>
                    {exports.map((exp) => (
                      <option key={exp} value={exp}>
                        {exp}
                      </option>
                    ))}
                    <option value="other">Other</option>
                  </select>

                  {setOtherFields.Q23Other === "other" && (
                    <div className="input-group w-25 mt-2">
                      <input
                        onChange={(e) => {
                          setSupplierData({
                            ...supplierData,
                            Qs23_MainExportMarkets: e.target.value,
                          });
                        }}
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
                          onClick={() => {
                            if (
                              supplierData.Qs23_MainExportMarkets.toLowerCase() !==
                              "other"
                            ) {
                              setExports([supplierData.Qs23_MainExportMarkets]);
                              setSupplierData({ ...supplierData });
                            }
                          }}
                        >
                          Add Country
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                {/* Question 24 */}
                <div className="field-sections">
                  <span>
                    Q.{supplierJson.find((f) => f.id === "24").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "24").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "25").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "25").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "26").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "26").q}{" "}
                    <span style={{ color: "red" }}>*</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "27").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "27").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="This value must be a number"
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                    pattern="[0-9]*"
                    name="Qs27_DeliveryLeadTimeInitialOrder" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  28*/}
                <div className="field-sections">
                  <span>
                    Q.{supplierJson.find((f) => f.id === "28").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "28").q}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="This value must be a number"
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "29").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "29").q}
                    <span style={{ color: "red" }}>*</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "30").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "30").q}
                    <span style={{ color: "red" }}>*</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "31").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "31").q}
                    <span style={{ color: "red" }}>*</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "32").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "32").q}</span>
                  <span style={{ color: "red" }}>*</span>
                  <select
                    value={supplierData.Qs32_CountryOfBankAC}
                    onChange={(e) => {
                      setSupplierData({
                        ...supplierData,
                        Qs32_CountryOfBankAC: e.target.value,
                      });
                      setOtherFields({
                        ...otherFields,
                        Q32Other: e.target.value,
                      });
                    }}
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
                    {options32.map((option32) => (
                      <option key={option32} value={option32}>
                        {option32}
                      </option>
                    ))}
                    <option value="other">Other</option>
                  </select>

                  {otherFields.Q32Other === "other" && (
                    <div className="input-group w-25 mt-2">
                      <input
                        onChange={(e) => {
                          setSupplierData({
                            ...supplierData,
                            Qs32_CountryOfBankAC: e.target.value,
                          });
                        }}
                        type="text"
                        className="form-control w-25 rounded"
                        placeholder="Enter Custom Option"
                        aria-label="Enter text..."
                        name="Qs32_CountryOfBankAC"
                        aria-describedby="basic-addon2"
                      />

                      <button
                        className="btn btn-primary ms-1"
                        type="button"
                        onClick={() => {
                          if (
                            supplierData.Qs32_CountryOfBankAC.toLowerCase() !==
                            "other"
                          ) {
                            setOptions32([supplierData.Qs32_CountryOfBankAC]);
                            setSupplierData({ ...supplierData });
                          }
                        }}
                      >
                        Add Country Bank Account
                      </button>
                    </div>
                  )}
                </div>
                {/* Question  33*/}
                <div className="field-sections">
                  <span>
                    Q.{supplierJson.find((f) => f.id === "33").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "33").q}</span>
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
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                      }}
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "34").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "34").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "35").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "35").q}
                    <span style={{ color: "red" }}>*</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "36").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "36").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "37").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "37").q}
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
                    {supplierJson.find((f) => f.id === "38a").q}{" "}
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
                          {supplierJson.find((f) => f.id === "38b").q}{" "}
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
                              const MAX_FILE_SIZE_MB = 10;
                              const fileSizeMB = (
                                e.target.files[0].size /
                                1024 /
                                1024
                              ).toFixed(2);

                              if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                                setFile(e.target.files[0]);
                              } else {
                                toast.error(
                                  `File size exceeds ${MAX_FILE_SIZE_MB}MB`,
                                  {
                                    position: toast.POSITION.TOP_CENTER,
                                  }
                                );
                              }
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "39").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "39").q}</span>
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
                            name="Qs39b_HumanRightsViolations"
                            accept="application/pdf,image/jpeg,image/png"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              const MAX_FILE_SIZE_MB = 10;
                              const fileSizeMB = (
                                e.target.files[0].size /
                                1024 /
                                1024
                              ).toFixed(2);

                              if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                                setDilligenceFile(e.target.files[0]);
                              } else {
                                toast.error(
                                  `File size exceeds ${MAX_FILE_SIZE_MB}MB`,
                                  {
                                    position: toast.POSITION.TOP_CENTER,
                                  }
                                );
                              }
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
                          <span>
                            Q.{supplierJson.find((f) => f.id === "40").id}
                            :&nbsp;&nbsp;
                          </span>
                          <span>
                            {supplierJson.find((f) => f.id === "40").q}
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "45").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "45").q}</span>
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
                            name="Qs45b_IssuedFairLaborEvidence"
                            type="file"
                            accept="application/pdf,image/jpeg,image/png"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              const MAX_FILE_SIZE_MB = 10;
                              const fileSizeMB = (
                                e.target.files[0].size /
                                1024 /
                                1024
                              ).toFixed(2);

                              if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                                setIssuedFairLaborEvidence(e.target.files[0]);
                              } else {
                                toast.error(
                                  `File size exceeds ${MAX_FILE_SIZE_MB}MB`,
                                  {
                                    position: toast.POSITION.TOP_CENTER,
                                  }
                                );
                              }
                            }}
                          />
                          <HiOutlineUpload
                            style={{
                              margin: "0 5px 3px 0",
                              fontSize: "16px",
                              display: issuedFairLaborEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {issuedFairLaborEvidence
                              ? `Uploaded file: ${issuedFairLaborEvidence.name}`
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "46").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "46").q}</span>
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
                        supplierData.Qs46a_IssuedFairStoneEvidence === "no"
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
                              const MAX_FILE_SIZE_MB = 10;
                              const fileSizeMB = (
                                e.target.files[0].size /
                                1024 /
                                1024
                              ).toFixed(2);

                              if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                                setIssuedFairStoneEvidence(e.target.files[0]);
                              } else {
                                toast.error(
                                  `File size exceeds ${MAX_FILE_SIZE_MB}MB`,
                                  {
                                    position: toast.POSITION.TOP_CENTER,
                                  }
                                );
                              }
                            }}
                          />
                          <HiOutlineUpload
                            style={{
                              margin: "0 5px 3px 0",
                              fontSize: "16px",
                              display: issuedFairStoneEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {issuedFairStoneEvidence
                              ? `Uploaded file: ${issuedFairStoneEvidence.name}`
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "47").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "47").q}</span>
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
                              const MAX_FILE_SIZE_MB = 10;
                              const fileSizeMB = (
                                e.target.files[0].size /
                                1024 /
                                1024
                              ).toFixed(2);

                              if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                                setIssuedGlobalOrganicTextileEvidence(
                                  e.target.files[0]
                                );
                              } else {
                                toast.error(
                                  `File size exceeds ${MAX_FILE_SIZE_MB}MB`,
                                  {
                                    position: toast.POSITION.TOP_CENTER,
                                  }
                                );
                              }
                            }}
                          />
                          <HiOutlineUpload
                            style={{
                              margin: "0 5px 3px 0",
                              fontSize: "16px",
                              display: issuedGlobalOrganicTextileEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {issuedGlobalOrganicTextileEvidence
                              ? `Uploaded file: ${issuedGlobalOrganicTextileEvidence.name}`
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "48").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "48").q}</span>
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
                              const MAX_FILE_SIZE_MB = 10;
                              const fileSizeMB = (
                                e.target.files[0].size /
                                1024 /
                                1024
                              ).toFixed(2);

                              if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                                setIssuedGrunerKnopfEvidence(e.target.files[0]);
                              } else {
                                toast.error(
                                  `File size exceeds ${MAX_FILE_SIZE_MB}MB`,
                                  {
                                    position: toast.POSITION.TOP_CENTER,
                                  }
                                );
                              }
                            }}
                          />
                          <HiOutlineUpload
                            style={{
                              margin: "0 5px 3px 0",
                              fontSize: "16px",
                              display: issuedGrunerKnopfEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {issuedGrunerKnopfEvidence
                              ? `Uploaded file: ${issuedGrunerKnopfEvidence.name}`
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "49").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "49").q}</span>
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
                              const MAX_FILE_SIZE_MB = 10;
                              const fileSizeMB = (
                                e.target.files[0].size /
                                1024 /
                                1024
                              ).toFixed(2);

                              if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                                setIssuedIGEPEvidence(e.target.files[0]);
                              } else {
                                toast.error(
                                  `File size exceeds ${MAX_FILE_SIZE_MB}MB`,
                                  {
                                    position: toast.POSITION.TOP_CENTER,
                                  }
                                );
                              }
                            }}
                          />
                          <HiOutlineUpload
                            style={{
                              margin: "0 5px 3px 0",
                              fontSize: "16px",
                              display: issuedIGEPEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {issuedIGEPEvidence
                              ? `Uploaded file: ${issuedIGEPEvidence.name}`
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "50").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "50").q} </span>
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
                              const MAX_FILE_SIZE_MB = 10;
                              const fileSizeMB = (
                                e.target.files[0].size /
                                1024 /
                                1024
                              ).toFixed(2);

                              if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                                setIssuedOEKOTEXGreenEvidence(
                                  e.target.files[0]
                                );
                              } else {
                                toast.error(
                                  `File size exceeds ${MAX_FILE_SIZE_MB}MB`,
                                  {
                                    position: toast.POSITION.TOP_CENTER,
                                  }
                                );
                              }
                            }}
                          />
                          <HiOutlineUpload
                            style={{
                              margin: "0 5px 3px 0",
                              fontSize: "16px",
                              display: issuedOEKOTEXGreenEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {issuedOEKOTEXGreenEvidence
                              ? `Uploaded file: ${issuedOEKOTEXGreenEvidence.name}`
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "51").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "51").q}</span>
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
                              const MAX_FILE_SIZE_MB = 10;
                              const fileSizeMB = (
                                e.target.files[0].size /
                                1024 /
                                1024
                              ).toFixed(2);

                              if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                                setIssuedSMETASedexEvidence(e.target.files[0]);
                              } else {
                                toast.error(
                                  `File size exceeds ${MAX_FILE_SIZE_MB}MB`,
                                  {
                                    position: toast.POSITION.TOP_CENTER,
                                  }
                                );
                              }
                            }}
                          />
                          <HiOutlineUpload
                            style={{
                              margin: "0 5px 3px 0",
                              fontSize: "16px",
                              display: issuedSMETASedexEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {issuedSMETASedexEvidence
                              ? `Uploaded file: ${issuedSMETASedexEvidence.name}`
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "52").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "52").q}</span>
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
                              const MAX_FILE_SIZE_MB = 10;
                              const fileSizeMB = (
                                e.target.files[0].size /
                                1024 /
                                1024
                              ).toFixed(2);

                              if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                                setIssuedSocialAccountabilitySA8000(
                                  e.target.files[0]
                                );
                              } else {
                                toast.error(
                                  `File size exceeds ${MAX_FILE_SIZE_MB}MB`,
                                  {
                                    position: toast.POSITION.TOP_CENTER,
                                  }
                                );
                              }
                            }}
                          />
                          <HiOutlineUpload
                            style={{
                              margin: "0 5px 3px 0",
                              fontSize: "16px",
                              display: issuedSocialAccountabilitySA8000
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {issuedSocialAccountabilitySA8000
                              ? `Uploaded file: ${issuedSocialAccountabilitySA8000.name}`
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "53").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "53").q}</span>
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
                            name="Qs53b_IssuedXertifixStandardEvidence"
                            type="file"
                            accept="application/pdf,image/jpeg,image/png"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              const MAX_FILE_SIZE_MB = 10;
                              const fileSizeMB = (
                                e.target.files[0].size /
                                1024 /
                                1024
                              ).toFixed(2);

                              if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                                setIssuedXertifixStandardEvidence(
                                  e.target.files[0]
                                );
                              } else {
                                toast.error(
                                  `File size exceeds ${MAX_FILE_SIZE_MB}MB`,
                                  {
                                    position: toast.POSITION.TOP_CENTER,
                                  }
                                );
                              }
                            }}
                          />
                          <HiOutlineUpload
                            style={{
                              margin: "0 5px 3px 0",
                              fontSize: "16px",
                              display: issuedXertifixStandardEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {issuedXertifixStandardEvidence
                              ? `Uploaded file: ${issuedXertifixStandardEvidence.name}`
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "54").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "54").q}</span>
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
                              const MAX_FILE_SIZE_MB = 10;
                              const fileSizeMB = (
                                e.target.files[0].size /
                                1024 /
                                1024
                              ).toFixed(2);

                              if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                                setIssuedXertifixPlusEvidence(
                                  e.target.files[0]
                                );
                              } else {
                                toast.error(
                                  `File size exceeds ${MAX_FILE_SIZE_MB}MB`,
                                  {
                                    position: toast.POSITION.TOP_CENTER,
                                  }
                                );
                              }
                            }}
                          />
                          <HiOutlineUpload
                            style={{
                              margin: "0 5px 3px 0",
                              fontSize: "16px",
                              display: issuedXertifixPlusEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {issuedXertifixPlusEvidence
                              ? `Uploaded file: ${issuedXertifixPlusEvidence.name}`
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "55").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "55").q}</span>
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
                              const MAX_FILE_SIZE_MB = 10;
                              const fileSizeMB = (
                                e.target.files[0].size /
                                1024 /
                                1024
                              ).toFixed(2);

                              if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                                setIssuedAMFORIBEPIEvidence(e.target.files[0]);
                              } else {
                                toast.error(
                                  `File size exceeds ${MAX_FILE_SIZE_MB}MB`,
                                  {
                                    position: toast.POSITION.TOP_CENTER,
                                  }
                                );
                              }
                            }}
                          />
                          <HiOutlineUpload
                            style={{
                              margin: "0 5px 3px 0",
                              fontSize: "16px",
                              display: issuedAMFORIBEPIEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {issuedAMFORIBEPIEvidence
                              ? `Uploaded file: ${issuedAMFORIBEPIEvidence.name}`
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "56").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "56").q}</span>
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
                              const MAX_FILE_SIZE_MB = 10;
                              const fileSizeMB = (
                                e.target.files[0].size /
                                1024 /
                                1024
                              ).toFixed(2);

                              if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                                setIssuedDINENISO14001Evidence(
                                  e.target.files[0]
                                );
                              } else {
                                toast.error(
                                  `File size exceeds ${MAX_FILE_SIZE_MB}MB`,
                                  {
                                    position: toast.POSITION.TOP_CENTER,
                                  }
                                );
                              }
                            }}
                          />
                          <HiOutlineUpload
                            style={{
                              margin: "0 5px 3px 0",
                              fontSize: "16px",
                              display: issuedDINENISO14001Evidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {issuedDINENISO14001Evidence
                              ? `Uploaded file: ${issuedDINENISO14001Evidence.name}`
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "57").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "57").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs57a_IssuedGrunerKnopfEvidence_2"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs57a_IssuedGrunerKnopfEvidence_2 === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qs57a_IssuedGrunerKnopfEvidence_2"
                      checked={
                        supplierData.Qs57a_IssuedGrunerKnopfEvidence_2 === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {supplierData.Qs57a_IssuedGrunerKnopfEvidence_2 ===
                      "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qs57b_IssuedGrunerKnopfEvidence_2"
                            type="file"
                            accept="application/pdf,image/jpeg,image/png"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              const MAX_FILE_SIZE_MB = 10;
                              const fileSizeMB = (
                                e.target.files[0].size /
                                1024 /
                                1024
                              ).toFixed(2);

                              if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                                setIssuedGrunerKnopfEvidence1(
                                  e.target.files[0]
                                );
                              } else {
                                toast.error(
                                  `File size exceeds ${MAX_FILE_SIZE_MB}MB`,
                                  {
                                    position: toast.POSITION.TOP_CENTER,
                                  }
                                );
                              }
                            }}
                          />
                          <HiOutlineUpload
                            style={{
                              margin: "0 5px 3px 0",
                              fontSize: "16px",
                              display: issuedGrunerKnopfEvidence1
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {issuedGrunerKnopfEvidence1
                              ? `Uploaded file: ${issuedGrunerKnopfEvidence1.name}`
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "58").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "58").q}</span>
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
                              const MAX_FILE_SIZE_MB = 10;
                              const fileSizeMB = (
                                e.target.files[0].size /
                                1024 /
                                1024
                              ).toFixed(2);

                              if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                                setIssuedIGEP2020AuditEvidence(
                                  e.target.files[0]
                                );
                              } else {
                                toast.error(
                                  `File size exceeds ${MAX_FILE_SIZE_MB}MB`,
                                  {
                                    position: toast.POSITION.TOP_CENTER,
                                  }
                                );
                              }
                            }}
                          />
                          <HiOutlineUpload
                            style={{
                              margin: "0 5px 3px 0",
                              fontSize: "16px",
                              display: issuedIGEP2020AuditEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {issuedIGEP2020AuditEvidence
                              ? `Uploaded file: ${issuedIGEP2020AuditEvidence.name}`
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "59").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "59").q}</span>
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
                              const MAX_FILE_SIZE_MB = 10;
                              const fileSizeMB = (
                                e.target.files[0].size /
                                1024 /
                                1024
                              ).toFixed(2);

                              if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                                setIssuedDINENISO45001Evidence(
                                  e.target.files[0]
                                );
                              } else {
                                toast.error(
                                  `File size exceeds ${MAX_FILE_SIZE_MB}MB`,
                                  {
                                    position: toast.POSITION.TOP_CENTER,
                                  }
                                );
                              }
                            }}
                          />
                          <HiOutlineUpload
                            style={{
                              margin: "0 5px 3px 0",
                              fontSize: "16px",
                              display: issuedDINENISO45001Evidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {issuedDINENISO45001Evidence
                              ? `Uploaded file: ${issuedDINENISO45001Evidence.name}`
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "60").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "60").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "61").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "61").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "62").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "62").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "63").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "63").q}</span>
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
                        <span>
                          Q.{supplierJson.find((f) => f.id === "64").id}
                          :&nbsp;&nbsp;
                        </span>
                        <span>
                          {supplierJson.find((f) => f.id === "64").q}{" "}
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
                {/* Question 65 */}
                <div className="field-sections">
                  <span>
                    Q.{supplierJson.find((f) => f.id === "65").id} :&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "65").q} </span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "66").id} :&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "66").q} </span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "67").id} :&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "67").q} </span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "68").id} :&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "68").q} </span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "69").id} :&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "69").q} </span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "70").id} :&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "70").q} </span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "71").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "71").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "72").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "72").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "73").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "73").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs73_PersonAge18HandleHeavyLoads"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs73_PersonAge18HandleHeavyLoads === "yes"
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "74").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "74").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "75").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "75").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "76").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "76").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "77").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "77").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "78").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "78").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "79").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "79").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "80").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "80").q}</span>
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
                </div>
                {/* Question 81 */}
                <div className="field-sections">
                  <span>
                    Q.{supplierJson.find((f) => f.id === "81").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "81").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "82").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "82").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "83").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "83").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "84").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "84").q}</span>
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
                {/* Question 85 */}
                <div className="field-sections">
                  <span>
                    Q.{supplierJson.find((f) => f.id === "85").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "85").q}</span>
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
                {/* Question 86 */}
                <div className="field-sections">
                  <span>
                    Q.{supplierJson.find((f) => f.id === "86").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "86").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "87").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "87").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "88").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "88").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "89").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "89").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "90").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "90").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "91").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "91").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "92").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "92").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "93").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "93").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "94").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "94").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "95").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "95").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "96").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "96").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "97").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "97").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "98").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "98").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "99").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "99").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "100").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "100").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "101").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "101").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs101_WorkersUnfairlyPaidSameWork"
                      type="radio"
                      value="yes"
                      checked={
                        supplierData.Qs101_WorkersUnfairlyPaidSameWork === "yes"
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
                        supplierData.Qs101_WorkersUnfairlyPaidSameWork === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 102 */}
                <div className="field-sections">
                  <span>
                    Q.{supplierJson.find((f) => f.id === "102").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "102").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "103").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "103").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "104").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "104").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "105").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "105").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "106").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "106").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "107").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "107").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "108").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "108").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "109").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "109").q}</span>
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
                      checked={supplierData.Qs109_EmpSecurityPersonnel === "no"}
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 110 */}
                <div className="field-sections">
                  <span>
                    Q.{supplierJson.find((f) => f.id === "110").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "110").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "111").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "111").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "112").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "112").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "113").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "113").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "114").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "114").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "115").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "115").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "116").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "116").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "117").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "117").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "118").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "118").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "119").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "119").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "120").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "120").q}</span>
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
                  <span>
                    Q.{supplierJson.find((f) => f.id === "121").id}:&nbsp;&nbsp;
                  </span>
                  <span>{supplierJson.find((f) => f.id === "121").q}</span>
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
                {/* Question 123 */}
                <div className="field-sections">
                  <span>
                    Q.{supplierJson.find((f) => f.id === "122").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {supplierJson.find((f) => f.id === "122").q}{" "}
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
                        <span>
                          Q.{supplierJson.find((f) => f.id === "123").id}
                          :&nbsp;&nbsp;
                        </span>
                        <span>
                          {supplierJson.find((f) => f.id === "123").q}
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
                    <span>
                      Q.{supplierJson.find((f) => f.id === "125").id}
                      :&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "125").q}</span>
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
                    <br />
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          setIsChecked(e.target.checked);
                        }}
                      />
                      I agree to terms and conditions
                    </label>
                  </div>
                </div>{" "}
                <button
                  // onClick={(e) => {
                  //   connectToDatabase(e);
                  // }}
                  id="submitBTN"
                  type="submit"
                  disabled={!isChecked}
                  className="submit-btn"
                  style={{
                    background: isChecked ? "#fec106" : "grey",
                  }}
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
