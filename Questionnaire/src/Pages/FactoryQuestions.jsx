import React, { useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import countryCode from "../Json/CountryCodes.json";
import { FiDownload } from "react-icons/fi";
import "./CompanyInformationForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import factoryJson from "../Json/factoryData.json";
let otherCountry;
let recordId = 0;
const FactoryQuestions = () => {
  const [otherFields, setOtherFields] = useState({});

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
  const [
    IssuedFairLaborAccreditationEvidence,
    setIssuedFairLaborAccreditationEvidence,
  ] = useState();
  const [IssuedFairStoneEvidence, setIssuedFairStoneEvidence] = useState();
  const [IssuedGlobalOrganicEvidence, setIssuedGlobalOrganicEvidence] =
    useState();
  const [IssuedGrunerKnopfEvidence, setIssuedGrunerKnopfEvidence] = useState();
  const [IssuedIGEPEvidence, setIssuedIGEPEvidence] = useState();
  const [IssuedOEKOTEXEvidence, setIssuedOEKOTEXEvidence] = useState();
  const [IssuedSMETAEvidence, setIssuedSMETAEvidence] = useState();
  const [
    IssuedSocialAccountabilityEvidence,
    setIssuedSocialAccountabilityEvidence,
  ] = useState();
  const [IssuedXertifexStandardEvidence, setIssuedXertifexStandardEvidence] =
    useState();
  const [IssuedXertifexPLUSEvidence, setIssuedXertifexPLUSEvidence] =
    useState();
  const [IssuedAMFORIBEPIEvidence, setIssuedAMFORIBEPIEvidence] = useState();
  const [IssuedDINENISOEvidence, setIssuedDINENISOEvidence] = useState();
  const [IssuedGrunerKnopfEvidence2, setIssuedGrunerKnopfEvidence2] =
    useState();
  const [IssuedIGEP2020Evidence, setIssuedIGEP2020Evidence] = useState();
  const [IssuedDINENISO45001Evidence, setIssuedDINENISO45001Evidence] =
    useState();
  const [If33YesSocialAuditReport, setIf33YesSocialAuditReport] = useState();
  const navigate = useNavigate();
  const [factoryData, setFactoryData] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedReview, setIsCheckedReview] = useState(false);
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
      setFactoryData({
        ...factoryData,
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
    e.preventDefault();
    const form = document.getElementById("factoryForm");
    // const submitButtonValue = form.querySelector(
    //   '[name="submitBTN"]:checked'
    // ).value;
    // document.getElementById("submitBTN").style.visibility = "hidden";

    // // value="newFactory"    value="finish"

    // console.log(submitButtonValue);
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Factory/records`,

          { fieldData: factoryData },
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
        document.getElementById("supplierForm").reset();
        toast.success(`${factoryJson.find((f) => f.id === "m1").q}`, {
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qs38b_SignatureUpload/1`,
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
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qs39b_HumanRightsViolations/1`,
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
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qs45b_IssuedFairLaborEvidence/1`,
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
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qs46b_IssuedFairStoneEvidence/1`,
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
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qs51b_IssuedGlobalOrganicTextileEvidence/1`,
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
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qs48b_IssuedGrunerKnopfEvidence/1`,
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
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qs49b_IssuedIGEPEvidence/1`,
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
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qs50b_IssuedOEKOTEXGreenEvidence/1`,
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
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qs51b_IssuedSMETASedexEvidence/1`,
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
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qs52b_IssuedSocialAccountabilitySA8000/1`,
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
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qs53b_IssuedXertifixStandardEvidence/1`,
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
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qs54b_IssuedXertifixPlusEvidence/1`,
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
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qs56b_IssuedDINENISO14001Evidence/1`,
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
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qs57b_IssuedGrunerKnopfEvidence_2/1`,
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
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qs55b_IssuedAMFORIBEPIEvidence/1`,
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
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qs58b_IssuedIGEP2020AuditEvidence/1`,
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
          `https://server.pascalinesoft.com:4443/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qs59b_IssuedDINENISO45001Evidence/1`,
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
    setFactoryData({
      ...factoryData,
      [name]: value,
    });
  };
  console.log("factoryData4", factoryData, options);
  const handleSubmitButton = () => {
    connectToDatabase();
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="form-sections p-5">
            <div className="form-field">
              <form id="supplierForm" onSubmit={connectToDatabase}>
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "1").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "1").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qf1_FactoryName" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question 2 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "2").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "2").q}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                    // pattern="[0-]*"
                    name="Qf2_FactoryBusinessLicenseNumber" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question 3 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "3").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "3").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                    pattern="[0-]*"
                    name="Qf3_FactoryVATNumber" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question 4 */}
                {/* <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "4").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "4").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-]/g, ""); // Remove non-digit characters
                    }}
                    pattern="[0-]*"
                    name="Qs4_SuppVATNumber" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div> */}
                <h4 className="supplier-heading">Factory Address</h4>
                {/* Question  4*/}
                <div className="field-sections">
                  <span>Q.4:&nbsp;&nbsp;</span>
                  <span>
                    {factoryJson.find((f) => f.id === "4a").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qf4a_Building" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                <div className="field-sections">
                  <span>
                    {factoryJson.find((f) => f.id === "4b").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qf4b_Street" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  5*/}
                <div className="field-sections">
                  <span>Q.5:&nbsp;&nbsp;</span>
                  <span>
                    {factoryJson.find((f) => f.id === "5a").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qf5a_Town" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                <div className="field-sections">
                  <span>
                    {factoryJson.find((f) => f.id === "5b").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qf5b_City" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                <div className="field-sections">
                  <span>
                    {factoryJson.find((f) => f.id === "5c").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qf5c_Province" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  6*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "6").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "6").q}</span>
                  <span style={{ color: "red" }}>*</span>

                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qf6_PostCode" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  7*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "7").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "7").q}</span>
                  <span style={{ color: "red" }}>*</span>
                  <select
                    value={factoryData.Qf7_Country}
                    onChange={(e) => {
                      setFactoryData({
                        ...factoryData,
                        Qf7_Country: e.target.value,
                      });
                      setOtherFields({
                        ...otherFields,
                        q7Other: e.target.value,
                      });
                    }}
                    className="form-select"
                    aria-label="Default select example"
                    name="Qf7_Country"
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
                  {otherFields.q7Other === "other" && (
                    <div className="input-group w-25 mt-2">
                      <input
                        onChange={(e) => {
                          setFactoryData({
                            ...factoryData,
                            Qf7_Country: e.target.value,
                          });
                        }}
                        type="text"
                        className="form-control w-25 rounded"
                        placeholder="Enter Custom Option"
                        aria-label="Enter text..."
                        aria-describedby="basic-addon2"
                        required
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-primary ms-2"
                          type="button"
                          onClick={() => {
                            if (
                              factoryData.Qf7_Country.toLowerCase() !== "other"
                            ) {
                              options.push(factoryData.Qf7_Country);
                              setOptions(options);
                              setFactoryData({ ...factoryData });
                            }
                          }}
                        >
                          Add Country
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                {/* Question  8*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "8").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "8").q}</span>

                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qf8_RecommendedHotel" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                  />
                </div>
                <h4 className="supplier-heading">Factory Contact Details</h4>
                {/* Question  9*/}
                <div className="field-sections">
                  <span>Q.9:&nbsp;&nbsp;</span>
                  <select
                    style={{ display: "inline-block" }}
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setFactoryData({
                        ...factoryData,
                        Qf9a_ContactPersonSalary: e.target.value,
                      });
                    }}
                    name="Qf9a_ContactPersonSalary"
                  >
                    <option disabled selected>
                      {factoryJson.find((f) => f.id === "9a").q}
                    </option>
                    <option value="mr">Mr.</option>
                    <option value="ms">Ms.</option>
                  </select>
                </div>
                <div className="field-sections">
                  <span>
                    {factoryJson.find((f) => f.id === "9b").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qf9b_ContactPersonFirstName" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                <div className="field-sections">
                  <span>
                    {factoryJson.find((f) => f.id === "9c").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qf9c_ContactPersonLastName" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  10*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "10").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "10").q}</span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qf10_ContactPersonPosition" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                  />
                </div>
                {/* Question  11*/}
                <div className="field-sections">
                  <span>Q.11:&nbsp;&nbsp;</span>
                  <span>
                    {factoryJson.find((f) => f.id === "11a").q}{" "}
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
                      name="Qf11a_Phone"
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
                    {factoryJson.find((f) => f.id === "11b").q}{" "}
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
                      name="Qf11b_CellPhone"
                      onChange={handleChange}
                      class="form-control ms-1 phoneNumberInput"
                      id="exampleInputEmail2"
                      aria-describedby="emailHelp"
                      required
                    ></input>
                  </div>
                </div>
                {/* Question  12*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "12").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "12").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qf12_Email" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  13*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "13").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "13").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="This value must be a number"
                    type="text"
                    name="Qf13_Website" // Add name attribute
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
                <h3 className="supplier-heading">Factory Location</h3>
                {/* Question  14*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "14").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "14").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="This value must be a number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                    pattern="[0-]*"
                    name="Qf14_CurrentLocationSince" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  15*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "15").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "15").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qf15_NumberFactoryBuildingLevel" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  16*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "16").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "16").q}</span>
                  <span style={{ color: "red" }}>*</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf16_FactoryWarehouseLocated"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf16_FactoryWarehouseLocated === "yes"
                      }
                      onChange={handleChange}
                      required
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf16_FactoryWarehouseLocated"
                      checked={
                        factoryData.Qf16_FactoryWarehouseLocated === "no"
                      }
                      onChange={handleChange}
                      required
                    />
                    No
                  </label>
                </div>
                {/* Question  17*/}
                {factoryData.Qf16_FactoryWarehouseLocated === "yes" && (
                  <div className="field-sections">
                    <span>
                      Q.{factoryJson.find((f) => f.id === "17").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "17").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        name="Qf17_If19YES"
                        type="radio"
                        value="yes"
                        checked={factoryData.Qf17_If19YES === "yes"}
                        onChange={handleChange}
                        required
                      />
                      Yes
                    </label>

                    <label style={{ marginLeft: "1rem" }}>
                      <input
                        type="radio"
                        value="no"
                        name="Qf17_If19YES"
                        checked={factoryData.Qf17_If19YES === "no"}
                        onChange={handleChange}
                        required
                      />
                      No
                    </label>
                  </div>
                )}
                {/* Question  18*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "18").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "18").q}</span>
                  <span style={{ color: "red" }}>*</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf18_DormitoryProvided"
                      type="radio"
                      value="yes"
                      checked={factoryData.Qf18_DormitoryProvided === "yes"}
                      onChange={handleChange}
                      required
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf18_DormitoryProvided"
                      checked={factoryData.Qf18_DormitoryProvided === "no"}
                      onChange={handleChange}
                      required
                    />
                    No
                  </label>
                </div>
                {/* Question  19*/}
                {factoryData.Qf18_DormitoryProvided === "yes" && (
                  <div className="field-sections">
                    <span>
                      Q.{factoryJson.find((f) => f.id === "19").id}:&nbsp;&nbsp;
                    </span>
                    <span>
                      {factoryJson.find((f) => f.id === "19").q}
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
                      name="Qf19_If21YES" // Add name attribute
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                )}
                {/* Question  20*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "20").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "20").q}
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
                    name="Qf20_PropertyTotalSize" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  21*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "21").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "21").q}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qf21_WarehouseTotalSize" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  22*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "22").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "22").q}</span>
                  <span style={{ color: "red" }}>*</span>

                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qf22_ProductionSiteTotalSize" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                <h3 className="supplier-heading">Factory Information</h3>
                {/* Question 23 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "23").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "23").q}</span>
                  <span style={{ color: "red" }}>*</span>
                  <input
                    onChange={handleChange}
                    placeholder="This value must be a number"
                    type="text"
                    name="Qf23_YearOfEstablishment" // Add name attribute
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
                {/* Question  24*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "24").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "24").q}</span>
                  <input
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    type="text"
                    name="Qf24_FactoryMainProduct" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                  />
                </div>
                {/* Question  25*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "25").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "25").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <br />
                  <input
                    onChange={handleChange}
                    placeholder="This value must be a number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                    pattern="[0-9]*"
                    name="Qf25_FactoryAnualCapacity" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    required
                  />
                </div>
                {/* Question  26*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "26").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "26").q} </span>
                  <input
                    onChange={handleChange}
                    placeholder="This value must be a number"
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                    pattern="[0-9]*"
                    name="Qf26_FactoryAnualTurnOver" // Add name attribute
                    className="mt-3 outline-none w-100"
                    id="name-text"
                  />
                </div>
                {/* Question  27*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "27").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "27").q}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <select
                    value={factoryData.Qf27_Ownership}
                    onChange={(e) => {
                      setFactoryData({
                        ...factoryData,
                        Qf27_Ownership: e.target.value,
                      });
                      setOtherFields({
                        ...otherFields,
                        Q27Other: e.target.value,
                      });
                    }}
                    className="form-select"
                    aria-label="Default select example"
                    name="Qf27_Ownership"
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

                  {otherFields.Q27Other === "other" && (
                    <div className="input-group w-25 mt-2">
                      <input
                        onChange={(e) => {
                          setFactoryData({
                            ...factoryData,
                            Qf27_Ownership: e.target.value,
                          });
                        }}
                        type="text"
                        className="form-control w-25 rounded"
                        placeholder="Enter Custom Option"
                        aria-label="Enter text..."
                        aria-describedby="basic-addon2"
                        name="Qf27_Ownership"
                        required
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-primary ms-2"
                          type="button"
                          onClick={() => {
                            if (
                              factoryData.Qf27_Ownership.toLowerCase() !==
                              "other"
                            ) {
                              setOwnerships([factoryData.Qf27_Ownership]);
                              setFactoryData({ ...factoryData });
                            }
                          }}
                        >
                          Add Country
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <h3 className="supplier-heading">Bank Information</h3>
                {/* Question  28*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "28").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "28").q}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <select
                    value={factoryData.Qf28_Subcontracting}
                    onChange={(e) => {
                      setFactoryData({
                        ...factoryData,
                        Qf28_Subcontracting: e.target.value,
                      });
                    }}
                    className="form-select"
                    aria-label="Default select example"
                    name="Qf28_Subcontracting"
                    required
                  >
                    <option disabled selected>
                      Subcontracting{" "}
                    </option>
                    <option value="yes-finish">Yes - Finished Products</option>
                    <option value="yes-component">
                      Yes - Components/Parts of Products
                    </option>
                    <option value="no">No</option>
                  </select>
                </div>
                {/* Question  29*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "29").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "29").q}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <select
                    value={factoryData.Qf29_QualityManagementSystem}
                    onChange={(e) => {
                      setFactoryData({
                        ...factoryData,
                        Qf29_QualityManagementSystem: e.target.value,
                      });
                    }}
                    className="form-select"
                    aria-label="Default select example"
                    name="Qf29_QualityManagementSystem"
                    required
                  >
                    <option disabled selected>
                      Quality Management System{" "}
                    </option>
                    <option value="yes">Yes</option>
                    <option value="certified">Certified</option>
                    <option value="no">No</option>
                    <option value="planned">Planned</option>
                  </select>
                </div>
                {/* Question  30*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "30").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "30").q}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf30_SocialComplainsAudit"
                      type="radio"
                      value="yes"
                      checked={factoryData.Qf30_SocialComplainsAudit === "yes"}
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf30_SocialComplainsAudit"
                      checked={factoryData.Qf30_SocialComplainsAudit === "no"}
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {factoryData.Qf30_SocialComplainsAudit === "yes" && (
                  <>
                    {/* Question 31 */}
                    <div className="field-sections">
                      <span>
                        Q.{factoryJson.find((f) => f.id === "31").id}
                        :&nbsp;&nbsp;
                      </span>
                      <span>{factoryJson.find((f) => f.id === "31").q}</span>
                      <span style={{ color: "red" }}>*</span>
                      <select
                        value={factoryData.Qf31_If33YESAuditType}
                        onChange={(e) => {
                          setFactoryData({
                            ...factoryData,
                            Qf31_If33YESAuditType: e.target.value,
                          });
                          setOtherFields({
                            ...otherFields,
                            Q31Other: e.target.value,
                          });
                        }}
                        className="form-select"
                        aria-label="Default select example"
                        name="Qf31_If33YESAuditType"
                        required
                      >
                        <option disabled selected>
                          Audit Type
                        </option>
                        <option value="private">Western Europe</option>
                        <option value="public">SA8000</option>
                        <option value="state">BSCI / amfori</option>
                        <option value="jointVenture">WRAP</option>
                        <option value="belongsToGroup">FLA </option>
                        <option value="belongsToGroup">ICIT </option>
                        <option value="belongsToGroup">SMETA / SEDEX </option>
                        {ownerships.map((ownership) => (
                          <option key={ownership} value={ownership}>
                            {ownership}
                          </option>
                        ))}
                        <option value="other">Other</option>
                      </select>

                      {otherFields.Q31Other === "other" && (
                        <div className="input-group w-25 mt-2">
                          <input
                            onChange={(e) => {
                              setFactoryData({
                                ...factoryData,
                                Qf31_If33YESAuditType: e.target.value,
                              });
                            }}
                            type="text"
                            className="form-control w-25 rounded"
                            placeholder="Enter Custom Option"
                            aria-label="Enter text..."
                            aria-describedby="basic-addon2"
                            name="Qf31_If33YESAuditType"
                            required
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-primary ms-2"
                              type="button"
                              onClick={() => {
                                if (
                                  factoryData.Qf31_If33YESAuditType.toLowerCase() !==
                                  "other"
                                ) {
                                  setOwnerships([
                                    factoryData.Qf31_If33YESAuditType.toUpperCase(),
                                  ]);
                                  setFactoryData({ ...factoryData });
                                }
                              }}
                            >
                              Add Country
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Question 32 */}
                    <div className="field-sections">
                      <span>
                        Q.{factoryJson.find((f) => f.id === "32").id}
                        :&nbsp;&nbsp;
                      </span>
                      <span>{factoryJson.find((f) => f.id === "32").q}</span>
                      <input
                        name="Qf32_If33YESAuditResult"
                        placeholder="This value must be a number"
                        type="number"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ); // Remove non-digit characters
                        }}
                        pattern="[0-9]*"
                        onChange={handleChange}
                        className="mt-3 outline-none w-100"
                        id="name-text"
                        aria-describedby="emailHelp"
                      ></input>
                    </div>
                    {/* Question  33*/}
                    <div className="field-sections">
                      <span>
                        Q.{factoryJson.find((f) => f.id === "33").id}
                        :&nbsp;&nbsp;
                      </span>
                      <span>{factoryJson.find((f) => f.id === "33").q}</span>
                      <input
                        onChange={handleChange}
                        placeholder="Enter your answer"
                        type="text"
                        name="Qf33_If33YESAuditDate" // Add name attribute
                        className="mt-3 outline-none w-100"
                        id="name-text"
                      />
                    </div>
                    {/* Question  34*/}
                    <div className="field-sections">
                      <span>
                        Q.{factoryJson.find((f) => f.id === "34").id}
                        :&nbsp;&nbsp;
                      </span>
                      <span>{factoryJson.find((f) => f.id === "34").q}</span>
                      <input
                        onChange={handleChange}
                        placeholder="Enter your answer"
                        type="text"
                        name="Qf34_If33YESAuditValidity" // Add name attribute
                        className="mt-3 outline-none w-100"
                        id="name-text"
                      />
                    </div>
                    {/* Question  35*/}
                    <div className="field-sections">
                      <span>
                        Q.{factoryJson.find((f) => f.id === "35").id}
                        :&nbsp;&nbsp;
                      </span>
                      <span>{factoryJson.find((f) => f.id === "35").q}</span>
                      <input
                        onChange={handleChange}
                        placeholder="Enter your answer"
                        type="text"
                        name="Qf35_If33YESAuditingCompany" // Add name attribute
                        className="mt-3 outline-none w-100"
                        id="name-text"
                      />
                    </div>
                    {/* Question  36*/}
                    <div className="field-sections">
                      <span>
                        Q.{factoryJson.find((f) => f.id === "36").id}
                        :&nbsp;&nbsp;
                      </span>
                      <span>
                        {factoryJson.find((f) => f.id === "36").q}
                        <span style={{ color: "red" }}>*</span>
                      </span>
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qf36_If33YesSocialAuditReportUpload"
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
                                setIf33YesSocialAuditReport(e.target.files[0]);
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
                              display: If33YesSocialAuditReport
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {If33YesSocialAuditReport
                              ? `Uploaded file: ${If33YesSocialAuditReport.name}`
                              : "UPLOAD DOCUMENT"}
                          </span>
                        </label>
                        <br />
                      </div>
                    </div>
                  </>
                )}
                {/* Question  37*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "37").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "37").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    name="Qf37_TotalNumberOfEmployees"
                    placeholder="This value must be a number"
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                    pattern="[0-9]*"
                    onChange={handleChange}
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    aria-describedby="emailHelp"
                  ></input>
                </div>
                {/* Question  38*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "38").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "38").q}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    name="Qf38_PersonalStructureAdmin"
                    placeholder="This value must be a number"
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                    pattern="[0-9]*"
                    onChange={handleChange}
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    aria-describedby="emailHelp"
                  ></input>
                </div>
                {/* Question 39 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "39").id}
                    :&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "39").q}</span>
                  <input
                    name="Qf39_PersonalStructureProduction"
                    placeholder="This value must be a number"
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                    pattern="[0-9]*"
                    onChange={handleChange}
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    aria-describedby="emailHelp"
                  ></input>
                </div>
                {/* Question 40 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "40").id}
                    :&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "40").q}</span>
                  <input
                    name="Qf40_PersonalStructureRandD"
                    placeholder="This value must be a number"
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                    pattern="[0-9]*"
                    onChange={handleChange}
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    aria-describedby="emailHelp"
                  ></input>
                </div>
                {/* Question  41*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "41").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "41").q}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    name="Qf41_PersonalStructureQA"
                    placeholder="This value must be a number"
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                    pattern="[0-9]*"
                    onChange={handleChange}
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    aria-describedby="emailHelp"
                  ></input>
                </div>
                {/* Question  42*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "42").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "42").q}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    name="Qf42_PersonalStructureManagement"
                    placeholder="This value must be a number"
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                    pattern="[0-9]*"
                    onChange={handleChange}
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    aria-describedby="emailHelp"
                  ></input>
                </div>
                {/* Question  43*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "43").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "43").q}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    name="Qf43_WorkerStatisticMale"
                    placeholder="This value must be a number"
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                    pattern="[0-9]*"
                    onChange={handleChange}
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    aria-describedby="emailHelp"
                  ></input>
                </div>
                {/* Question  44*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "44").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "44").q}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    name="Qf44_WorkerStatisticFemale"
                    placeholder="This value must be a number"
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                    pattern="[0-9]*"
                    onChange={handleChange}
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    aria-describedby="emailHelp"
                  ></input>
                </div>
                {/* Question  45*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "45").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "45").q}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    name="Qf45_WorkerStatisticLocal"
                    placeholder="This value must be a number"
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                    pattern="[0-9]*"
                    onChange={handleChange}
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    aria-describedby="emailHelp"
                  ></input>
                </div>
                {/* Question  46*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "46").id}:&nbsp;&nbsp;
                  </span>
                  <span>
                    {factoryJson.find((f) => f.id === "46").q}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    name="Qf46_WorkerStatisticMigrant"
                    placeholder="This value must be a number"
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                    }}
                    pattern="[0-9]*"
                    onChange={handleChange}
                    className="mt-3 outline-none w-100"
                    id="name-text"
                    aria-describedby="emailHelp"
                  ></input>
                </div>
                {/* Question  47*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "47").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "47").q}</span>
                  <span style={{ color: "red" }}>*</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf47_WorkInShift"
                      type="radio"
                      value="yes"
                      checked={factoryData.Qf47_WorkInShift === "yes"}
                      onChange={handleChange}
                      required
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf47_WorkInShift"
                      checked={factoryData.Qf47_WorkInShift === "no"}
                      onChange={handleChange}
                      required
                    />
                    No
                  </label>
                </div>
                {/* Question  48*/}
                {factoryData.Qf47_WorkInShift === "yes" && (
                  <div className="field-sections">
                    <span>
                      Q.{factoryJson.find((f) => f.id === "48").id}:&nbsp;&nbsp;
                    </span>
                    <span>
                      {factoryJson.find((f) => f.id === "48").q}
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
                      name="Qf48_If50YESMax" // Add name attribute
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                )}
                {/* Question 49 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "49").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "49").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf49a_IssuedFairLaborAccreditationEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf49a_IssuedFairLaborAccreditationEvidence ===
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
                      name="Qf49a_IssuedFairLaborAccreditationEvidence"
                      checked={
                        factoryData.Qf49a_IssuedFairLaborAccreditationEvidence ===
                        "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {factoryData.Qf49a_IssuedFairLaborAccreditationEvidence ===
                      "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qf49b_IssuedFairLaborAccreditationEvidence"
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
                                setIssuedFairLaborAccreditationEvidence(
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
                              display: IssuedFairLaborAccreditationEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {IssuedFairLaborAccreditationEvidence
                              ? `Uploaded file: ${IssuedFairLaborAccreditationEvidence.name}`
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
                    Q.{factoryJson.find((f) => f.id === "50").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "50").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf50a_IssuedFairStoneEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf50a_IssuedFairStoneEvidence === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf50a_IssuedFairStoneEvidence"
                      checked={
                        factoryData.Qf50a_IssuedFairStoneEvidence === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {factoryData.Qf50a_IssuedFairStoneEvidence === "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qf50b_IssuedFairStoneEvidence"
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
                              display: IssuedFairStoneEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {IssuedFairStoneEvidence
                              ? `Uploaded file: ${IssuedFairStoneEvidence.name}`
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
                    Q.{factoryJson.find((f) => f.id === "51").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "51").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf51a_IssuedGlobalOrganicEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf51a_IssuedGlobalOrganicEvidence === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf51a_IssuedGlobalOrganicEvidence"
                      checked={
                        factoryData.Qf51a_IssuedGlobalOrganicEvidence === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {factoryData.Qf51a_IssuedGlobalOrganicEvidence ===
                      "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qf51b_IssuedGlobalOrganicEvidence"
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
                                setIssuedGlobalOrganicEvidence(
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
                              display: IssuedGlobalOrganicEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {IssuedGlobalOrganicEvidence
                              ? `Uploaded file: ${IssuedGlobalOrganicEvidence.name}`
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
                    Q.{factoryJson.find((f) => f.id === "52").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "52").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf52a_IssuedGrunerKnopfEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf52a_IssuedGrunerKnopfEvidence === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf52a_IssuedGrunerKnopfEvidence"
                      checked={
                        factoryData.Qf52a_IssuedGrunerKnopfEvidence === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {factoryData.Qf52a_IssuedGrunerKnopfEvidence === "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qf52b_IssuedGrunerKnopfEvidence"
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
                              display: IssuedGrunerKnopfEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {IssuedGrunerKnopfEvidence
                              ? `Uploaded file: ${IssuedGrunerKnopfEvidence.name}`
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
                    Q.{factoryJson.find((f) => f.id === "53").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "53").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf53a_IssuedIGEPEvidence"
                      type="radio"
                      value="yes"
                      checked={factoryData.Qf53a_IssuedIGEPEvidence === "yes"}
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf53a_IssuedIGEPEvidence"
                      checked={factoryData.Qf53a_IssuedIGEPEvidence === "no"}
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {factoryData.Qf53a_IssuedIGEPEvidence === "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qf53b_IssuedIGEPEvidence"
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
                              display: IssuedIGEPEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {IssuedIGEPEvidence
                              ? `Uploaded file: ${IssuedIGEPEvidence.name}`
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
                    Q.{factoryJson.find((f) => f.id === "54").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "54").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf54a_IssuedOEKOTEXEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf54a_IssuedOEKOTEXEvidence === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf54a_IssuedOEKOTEXEvidence"
                      checked={factoryData.Qf54a_IssuedOEKOTEXEvidence === "no"}
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {factoryData.Qf54a_IssuedOEKOTEXEvidence === "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qf54b_IssuedOEKOTEXEvidence"
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
                                setIssuedOEKOTEXEvidence(e.target.files[0]);
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
                              display: IssuedOEKOTEXEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {IssuedOEKOTEXEvidence
                              ? `Uploaded file: ${IssuedOEKOTEXEvidence.name}`
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
                    Q.{factoryJson.find((f) => f.id === "55").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "55").q} </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf55a_IssuedSMETAEvidence"
                      type="radio"
                      value="yes"
                      checked={factoryData.Qf55a_IssuedSMETAEvidence === "yes"}
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf55a_IssuedSMETAEvidence"
                      checked={factoryData.Qf55a_IssuedSMETAEvidence === "no"}
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {factoryData.Qf55a_IssuedSMETAEvidence === "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qf55b_IssuedSMETAEvidence"
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
                                setIssuedSMETAEvidence(e.target.files[0]);
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
                              display: IssuedSMETAEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {IssuedSMETAEvidence
                              ? `Uploaded file: ${IssuedSMETAEvidence.name}`
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
                    Q.{factoryJson.find((f) => f.id === "56").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "56").q} </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf56a_IssuedSocialAccountabilityEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf56a_IssuedSocialAccountabilityEvidence ===
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
                      name="Qf56a_IssuedSocialAccountabilityEvidence"
                      checked={
                        factoryData.Qf56a_IssuedSocialAccountabilityEvidence ===
                        "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {factoryData.Qf56a_IssuedSocialAccountabilityEvidence ===
                      "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qf56b_IssuedSocialAccountabilityEvidence"
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
                                setIssuedSocialAccountabilityEvidence(
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
                              display: IssuedSocialAccountabilityEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {IssuedSocialAccountabilityEvidence
                              ? `Uploaded file: ${IssuedSocialAccountabilityEvidence.name}`
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
                    Q.{factoryJson.find((f) => f.id === "57").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "57").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf57a_IssuedXertifexStandardEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf57a_IssuedXertifexStandardEvidence ===
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
                      name="Qf57a_IssuedXertifexStandardEvidence"
                      checked={
                        factoryData.Qf57a_IssuedXertifexStandardEvidence ===
                        "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {factoryData.Qf57a_IssuedXertifexStandardEvidence ===
                      "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qf57b_IssuedXertifexStandardEvidence"
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
                                setIssuedDINENISOEvidence(e.target.files[0]);
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
                              display: IssuedDINENISOEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {IssuedDINENISOEvidence
                              ? `Uploaded file: ${IssuedDINENISOEvidence.name}`
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
                    Q.{factoryJson.find((f) => f.id === "58").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "58").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf58a_IssuedXertifexPLUSEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf58a_IssuedXertifexPLUSEvidence === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf58a_IssuedXertifexPLUSEvidence"
                      checked={
                        factoryData.Qf58a_IssuedXertifexPLUSEvidence === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {factoryData.Qf58a_IssuedXertifexPLUSEvidence === "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qf58b_IssuedXertifexPLUSEvidence"
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
                                setIssuedXertifexPLUSEvidence(
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
                              display: IssuedXertifexPLUSEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {IssuedXertifexPLUSEvidence
                              ? `Uploaded file: ${IssuedXertifexPLUSEvidence.name}`
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
                    Q.{factoryJson.find((f) => f.id === "59").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "59").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf59a_IssuedAMFORIBEPIEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf59a_IssuedAMFORIBEPIEvidence === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf59a_IssuedAMFORIBEPIEvidence"
                      checked={
                        factoryData.Qf59a_IssuedAMFORIBEPIEvidence === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {factoryData.Qf59a_IssuedAMFORIBEPIEvidence === "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qf59b_IssuedAMFORIBEPIEvidence"
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
                              display: IssuedAMFORIBEPIEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {IssuedAMFORIBEPIEvidence
                              ? `Uploaded file: ${IssuedAMFORIBEPIEvidence.name}`
                              : "UPLOAD DOCUMENT"}
                          </span>
                        </label>
                        <br />
                      </div>
                    )}
                  </div>
                </div>
                {/* Question  60*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "60").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "60").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf60a_IssuedDINENISOEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf60a_IssuedDINENISOEvidence === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf60a_IssuedDINENISOEvidence"
                      checked={
                        factoryData.Qf60a_IssuedDINENISOEvidence === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {factoryData.Qf60a_IssuedDINENISOEvidence === "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qf60b_IssuedDINENISOEvidence"
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
                                setIssuedDINENISOEvidence(e.target.files[0]);
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
                              display: IssuedDINENISOEvidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {IssuedDINENISOEvidence
                              ? `Uploaded file: ${IssuedDINENISOEvidence.name}`
                              : "UPLOAD DOCUMENT"}
                          </span>
                        </label>
                        <br />
                      </div>
                    )}
                  </div>
                </div>
                {/* Question  61*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "61").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "61").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf61a_IssuedGrunerKnopfEvidence"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf61a_IssuedGrunerKnopfEvidence === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf61a_IssuedGrunerKnopfEvidence"
                      checked={
                        factoryData.Qf61a_IssuedGrunerKnopfEvidence === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {factoryData.Qf61a_IssuedGrunerKnopfEvidence === "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qf61b_IssuedGrunerKnopfEvidence"
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
                                setIssuedGrunerKnopfEvidence2(
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
                              display: IssuedGrunerKnopfEvidence2
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {IssuedGrunerKnopfEvidence2
                              ? `Uploaded file: ${IssuedGrunerKnopfEvidence2.name}`
                              : "UPLOAD DOCUMENT"}
                          </span>
                        </label>
                        <br />
                      </div>
                    )}
                  </div>
                </div>
                {/* Question  62*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "62").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "62").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf62a_IssuedIGEP2020Evidence"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf62a_IssuedIGEP2020Evidence === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf62a_IssuedIGEP2020Evidence"
                      checked={
                        factoryData.Qf62a_IssuedIGEP2020Evidence === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {factoryData.Qf62a_IssuedIGEP2020Evidence === "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qf62b_IssuedIGEP2020Evidence"
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
                                setIssuedIGEP2020Evidence(e.target.files[0]);
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
                              display: IssuedIGEP2020Evidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {IssuedIGEP2020Evidence
                              ? `Uploaded file: ${IssuedIGEP2020Evidence.name}`
                              : "UPLOAD DOCUMENT"}
                          </span>
                        </label>
                        <br />
                      </div>
                    )}
                  </div>
                </div>
                {/* Question  63*/}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "63").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "63").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf63a_IssuedDINENISO45001Evidence"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf63a_IssuedDINENISO45001Evidence === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf63a_IssuedDINENISO45001Evidence"
                      checked={
                        factoryData.Qf63a_IssuedDINENISO45001Evidence === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>

                  <br />

                  <div>
                    {factoryData.Qf63a_IssuedDINENISO45001Evidence ===
                      "yes" && (
                      <div className="field-sections">
                        <br />
                        <label className="file-input-button-upload">
                          <input
                            name="Qf63b_IssuedDINENISO45001Evidence"
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
                              display: IssuedDINENISO45001Evidence
                                ? "none"
                                : "inline-block",
                            }}
                          />
                          <span className="file-input-button-label">
                            {IssuedDINENISO45001Evidence
                              ? `Uploaded file: ${IssuedDINENISO45001Evidence.name}`
                              : "UPLOAD DOCUMENT"}
                          </span>
                        </label>
                        <br />
                      </div>
                    )}
                  </div>
                </div>
                {/* Question 64 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "64").id} :&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "64").q} </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf64_AgeOfYourWorkerAtHiring"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf64_AgeOfYourWorkerAtHiring === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf64_AgeOfYourWorkerAtHiring"
                      checked={
                        factoryData.Qf64_AgeOfYourWorkerAtHiring === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 65 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "65").id} :&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "65").q} </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf65_AgeOfYourWorkerAtConducting"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf65_AgeOfYourWorkerAtConducting === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf65_AgeOfYourWorkerAtConducting"
                      checked={
                        factoryData.Qf65_AgeOfYourWorkerAtConducting === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 66 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "66").id} :&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "66").q} </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf66_EmployeePersonsUnderAge18"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf66_EmployeePersonsUnderAge18 === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf66_EmployeePersonsUnderAge18"
                      checked={
                        factoryData.Qf66_EmployeePersonsUnderAge18 === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>{" "}
                {/* Question 67 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "67").id} :&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "67").q} </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf67_EmployeePersonsUnderAge15"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf67_EmployeePersonsUnderAge15 === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf67_EmployeePersonsUnderAge15"
                      checked={
                        factoryData.Qf67_EmployeePersonsUnderAge15 === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>{" "}
                {/* Question 68 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "68").id} :&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "68").q} </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf68_Under18Employed"
                      type="radio"
                      value="yes"
                      checked={factoryData.Qf68_Under18Employed === "yes"}
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf68_Under18Employed"
                      checked={factoryData.Qf68_Under18Employed === "no"}
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>{" "}
                {/* Question 69 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "69").id} :&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "69").q} </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf69_Under18PerformWorkUnderWater"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf69_Under18PerformWorkUnderWater === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf69_Under18PerformWorkUnderWater"
                      checked={
                        factoryData.Qf69_Under18PerformWorkUnderWater === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>{" "}
                {/* Question 70 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "70").id} :&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "70").q} </span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf70_Under18PerformWorkAtDengerousHeight"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf70_Under18PerformWorkAtDengerousHeight ===
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
                      name="Qf70_Under18PerformWorkAtDengerousHeight"
                      checked={
                        factoryData.Qf70_Under18PerformWorkAtDengerousHeight ===
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
                    Q.{factoryJson.find((f) => f.id === "71").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "71").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf71_Under18PerformWorkAtDengerousHeight"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf71_Under18PerformWorkAtDengerousHeight ===
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
                      name="Qf71_Under18PerformWorkAtDengerousHeight"
                      checked={
                        factoryData.Qf71_Under18PerformWorkAtDengerousHeight ===
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
                    Q.{factoryJson.find((f) => f.id === "72").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "72").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf72_Under18HandleHeavyLoad"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf72_Under18HandleHeavyLoad === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf72_Under18HandleHeavyLoad"
                      checked={factoryData.Qf72_Under18HandleHeavyLoad === "no"}
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>{" "}
                {/* Question 73 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "73").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "73").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf73_Under18WorkWithHazardousSubstances"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf73_Under18WorkWithHazardousSubstances ===
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
                      name="Qf73_Under18WorkWithHazardousSubstances"
                      checked={
                        factoryData.Qf73_Under18WorkWithHazardousSubstances ===
                        "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>{" "}
                {/* Question 74 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "74").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "74").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf74_Under18WorkAreasHighTemp"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf74_Under18WorkAreasHighTemp === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf74_Under18WorkAreasHighTemp"
                      checked={
                        factoryData.Qf74_Under18WorkAreasHighTemp === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>{" "}
                {/* Question 75 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "75").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "75").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf75_Under18WorkCompanyNightTime"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf75_Under18WorkCompanyNightTime === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf75_Under18WorkCompanyNightTime"
                      checked={
                        factoryData.Qf75_Under18WorkCompanyNightTime === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>{" "}
                {/* Question 76 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "76").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "76").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf76_PredefinedProcedure"
                      type="radio"
                      value="yes"
                      checked={factoryData.Qf76_PredefinedProcedure === "yes"}
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf76_PredefinedProcedure"
                      checked={factoryData.Qf76_PredefinedProcedure === "no"}
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>{" "}
                {/* Question 77 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "77").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "77").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf77_UnderTheAge18InDebtBondage"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf77_UnderTheAge18InDebtBondage === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf77_UnderTheAge18InDebtBondage"
                      checked={
                        factoryData.Qf77_UnderTheAge18InDebtBondage === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>{" "}
                {/* Question 78 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "78").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "78").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf78_WorkPerformedPenaltyTheratened"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf78_WorkPerformedPenaltyTheratened ===
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
                      name="Qf78_WorkPerformedPenaltyTheratened"
                      checked={
                        factoryData.Qf78_WorkPerformedPenaltyTheratened === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>{" "}
                {/* Question 79 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "79").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "79").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf79_RetainTheDocumentsIdentification"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf79_RetainTheDocumentsIdentification ===
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
                      name="Qf79_RetainTheDocumentsIdentification"
                      checked={
                        factoryData.Qf79_RetainTheDocumentsIdentification ===
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
                    Q.{factoryJson.find((f) => f.id === "80").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "80").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf80_RetainOrignalORCopy                 "
                      type="radio"
                      value="yes"
                      checked={factoryData.Qf80_RetainOrignalORCopy === "yes"}
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf80_RetainOrignalORCopy"
                      checked={factoryData.Qf80_RetainOrignalORCopy === "no"}
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 81 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "81").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "81").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf81_ImposePenaltiesOnYourEmployees"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf81_ImposePenaltiesOnYourEmployees ===
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
                      name="Qf81_ImposePenaltiesOnYourEmployees"
                      checked={
                        factoryData.Qf81_ImposePenaltiesOnYourEmployees === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>{" "}
                {/* Question 82 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "82").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "82").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf82_EmployeesSoDeepInDept"
                      type="radio"
                      value="yes"
                      checked={factoryData.Qf82_EmployeesSoDeepInDept === "yes"}
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf82_EmployeesSoDeepInDept"
                      checked={factoryData.Qf82_EmployeesSoDeepInDept === "no"}
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>{" "}
                {/* Question 83 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "83").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "83").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf83_WeeklyWorkingTime60Hour"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf83_WeeklyWorkingTime60Hour === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf83_WeeklyWorkingTime60Hour"
                      checked={
                        factoryData.Qf83_WeeklyWorkingTime60Hour === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>{" "}
                {/* Question 84 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "84").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "84").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf84_EmployeeRequirWorkByState"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf84_EmployeeRequirWorkByState === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf84_EmployeeRequirWorkByState"
                      checked={
                        factoryData.Qf84_EmployeeRequirWorkByState === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>{" "}
                {/* Question 85 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "85").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "85").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf85_PredefinedProcedureSlavelaborexists"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf85_PredefinedProcedureSlavelaborexists ===
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
                      name="Qf85_PredefinedProcedureSlavelaborexists"
                      checked={
                        factoryData.Qf85_PredefinedProcedureSlavelaborexists ===
                        "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 86 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "86").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "86").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf86_DocumentsTheWorkingHours"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf86_DocumentsTheWorkingHours === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf86_DocumentsTheWorkingHours"
                      checked={
                        factoryData.Qf86_DocumentsTheWorkingHours === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>{" "}
                {/* Question 87 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "87").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "87").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf87_HealthAndSafetyPolicy"
                      type="radio"
                      value="yes"
                      checked={factoryData.Qf87_HealthAndSafetyPolicy === "yes"}
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf87_HealthAndSafetyPolicy"
                      checked={factoryData.Qf87_HealthAndSafetyPolicy === "no"}
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>{" "}
                {/* Question 88 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "88").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "88").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf88_ProcedureCaptureAndAccessSecurityRisks"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf88_ProcedureCaptureAndAccessSecurityRisks ===
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
                      name="Qf88_ProcedureCaptureAndAccessSecurityRisks"
                      checked={
                        factoryData.Qf88_ProcedureCaptureAndAccessSecurityRisks ===
                        "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>{" "}
                {/* Question 89 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "89").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "89").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf89_HighAltitudesConfinedSpaces"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qs89_OrganizationHaveProceduresSecurityRisks ===
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
                      name="Qf89_HighAltitudesConfinedSpaces"
                      checked={
                        factoryData.Qf89_HighAltitudesConfinedSpaces === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>{" "}
                {/* Question 90 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "90").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "90").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf90_HazardousAndBiologicalSubstances"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf90_HazardousAndBiologicalSubstances ===
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
                        factoryData.Qs90_OperationHighAltitudesConfinedSpaces ===
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
                    Q.{factoryJson.find((f) => f.id === "91").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "91").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf91_InstructionsUseSpecialEquipments"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf91_InstructionsUseSpecialEquipments ===
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
                      name="Qf91_InstructionsUseSpecialEquipments"
                      checked={
                        factoryData.Qf91_InstructionsUseSpecialEquipments ===
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
                    Q.{factoryJson.find((f) => f.id === "92").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "92").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf92_PersonResponsibleSafteStorageDistribution"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf92_PersonResponsibleSafteStorageDistribution ===
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
                      name="Qf92_PersonResponsibleSafteStorageDistribution"
                      checked={
                        factoryData.Qf92_PersonResponsibleSafteStorageDistribution ===
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
                    Q.{factoryJson.find((f) => f.id === "93").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "93").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf93_EquipmentsEmergenciesChecked"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf93_EquipmentsEmergenciesChecked === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf93_EquipmentsEmergenciesChecked"
                      checked={
                        factoryData.Qf93_EquipmentsEmergenciesChecked === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 94 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "94").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "94").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf94_PersonsSpeciallyTrainedEmergencies"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf94_PersonsSpeciallyTrainedEmergencies ===
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
                      name="Qf94_PersonsSpeciallyTrainedEmergencies"
                      checked={
                        factoryData.Qf94_PersonsSpeciallyTrainedEmergencies ===
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
                    Q.{factoryJson.find((f) => f.id === "95").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "95").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf95_CompanyOffersProvideFeedBack"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf95_CompanyOffersProvideFeedBack === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf95_CompanyOffersProvideFeedBack"
                      checked={
                        factoryData.Qf95_CompanyOffersProvideFeedBack === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 96 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "96").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "96").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf96_EmployeesTrainedSafetyWhenHired"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf96_EmployeesTrainedSafetyWhenHired ===
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
                      name="Qf96_EmployeesTrainedSafetyWhenHired"
                      checked={
                        factoryData.Qf96_EmployeesTrainedSafetyWhenHired ===
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
                    Q.{factoryJson.find((f) => f.id === "97").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "97").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf97_EmployeesOrganizedAUnion"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf97_EmployeesOrganizedAUnion === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf97_EmployeesOrganizedAUnion"
                      checked={
                        factoryData.Qf97_EmployeesOrganizedAUnion === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 98 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "98").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "98").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf98_BonusesNotMemberUnion"
                      type="radio"
                      value="yes"
                      checked={factoryData.Qf98_BonusesNotMemberUnion === "yes"}
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf98_BonusesNotMemberUnion"
                      checked={factoryData.Qf98_BonusesNotMemberUnion === "no"}
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 99 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "99").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "99").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf99_HiredSpecificTaskBasedOn"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf99_HiredSpecificTaskBasedOn === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf99_HiredSpecificTaskBasedOn"
                      checked={
                        factoryData.Qf99_HiredSpecificTaskBasedOn === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 100 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "100").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "100").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf100_UnFairlyPaid"
                      type="radio"
                      value="yes"
                      checked={factoryData.Qf100_UnFairlyPaid === "yes"}
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf100_UnFairlyPaid"
                      checked={factoryData.Qf100_UnFairlyPaid === "no"}
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 101 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "101").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "101").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs101_WorkersUnfairlyPaidSameWork"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qs101_WorkersUnfairlyPaidSameWork === "yes"
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
                        factoryData.Qs101_WorkersUnfairlyPaidSameWork === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 102 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "102").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "102").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf102_PayStatutoryMinimumWage"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf102_PayStatutoryMinimumWage === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf102_PayStatutoryMinimumWage"
                      checked={
                        factoryData.Qf102_PayStatutoryMinimumWage === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 103 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "103").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "103").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf103_PayWageInLineGeneralLevel"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf103_PayWageInLineGeneralLevel === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf103_PayWageInLineGeneralLevel"
                      checked={
                        factoryData.Qf103_PayWageInLineGeneralLevel === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 104 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "104").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "104").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf104_WageReduceBenefitsEmployee"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf104_WageReduceBenefitsEmployee === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf104_WageReduceBenefitsEmployee"
                      checked={
                        factoryData.Qf104_WageReduceBenefitsEmployee === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 105 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "105").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "105").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf105_Last20YearsAcquiredLandPriorAcquisition"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf105_Last20YearsAcquiredLandPriorAcquisition ===
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
                      name="Qf105_Last20YearsAcquiredLandPriorAcquisition"
                      checked={
                        factoryData.Qf105_Last20YearsAcquiredLandPriorAcquisition ===
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
                    Q.{factoryJson.find((f) => f.id === "106").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "106").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf106_ConfirmLandOwnedORHeld"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf106_ConfirmLandOwnedORHeld === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf106_ConfirmLandOwnedORHeld"
                      checked={
                        factoryData.Qf106_ConfirmLandOwnedORHeld === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 107 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "107").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "107").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf107_AcquiredForestLandWaterBodies"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf107_AcquiredForestLandWaterBodies ===
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
                      name="Qf107_AcquiredForestLandWaterBodies"
                      checked={
                        factoryData.Qf107_AcquiredForestLandWaterBodies === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 108 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "108").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "108").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf108_EmploySecurityPersonnel"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf108_EmploySecurityPersonnel === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf108_EmploySecurityPersonnel"
                      checked={
                        factoryData.Qf108_EmploySecurityPersonnel === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 109 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "109").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "109").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf109_SecurityMonitoringEntryAndExitChecks"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf109_SecurityMonitoringEntryAndExitChecks ===
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
                      name="Qf109_SecurityMonitoringEntryAndExitChecks"
                      checked={
                        factoryData.Qf109_SecurityMonitoringEntryAndExitChecks ===
                        "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 110 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "110").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "110").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf110_CompanyDefineCriteriaQf110_CompanyDefineCriteria"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf110_CompanyDefineCriteria === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf110_CompanyDefineCriteria"
                      checked={factoryData.Qf110_CompanyDefineCriteria === "no"}
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>{" "}
                {/* Question 111 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "111").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "111").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf111_LegalProceedingsAgainstCompanyLast5Years"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf111_LegalProceedingsAgainstCompanyLast5Years ===
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
                      name="Qf111_LegalProceedingsAgainstCompanyLast5Years"
                      checked={
                        factoryData.Qf111_LegalProceedingsAgainstCompanyLast5Years ===
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
                    Q.{factoryJson.find((f) => f.id === "112").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "112").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qs112_LegalProceedingsAgainstEnvPollution"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qs112_LegalProceedingsAgainstEnvPollution ===
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
                        factoryData.Qs112_LegalProceedingsAgainstEnvPollution ===
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
                    Q.{factoryJson.find((f) => f.id === "113").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "113").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf113_InstructionsProceedCaseOfViolations"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf113_InstructionsProceedCaseOfViolations ===
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
                      name="Qf113_InstructionsProceedCaseOfViolations"
                      checked={
                        factoryData.Qf113_InstructionsProceedCaseOfViolations ===
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
                    Q.{factoryJson.find((f) => f.id === "114").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "114").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf114_PublishReportGoalsAndProgress"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf114_PublishReportGoalsAndProgress ===
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
                      name="Qf114_PublishReportGoalsAndProgress"
                      checked={
                        factoryData.Qf114_PublishReportGoalsAndProgress === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 115 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "115").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "115").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf115_BusinessGeneratesHazardousWithRadioactiveSubstances"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf115_BusinessGeneratesHazardousWithRadioactiveSubstances ===
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
                      name="Qs115_CompanyPubQf115_BusinessGeneratesHazardousWithRadioactiveSubstanceslishReportOnGoalsProgress"
                      checked={
                        factoryData.Qf115_BusinessGeneratesHazardousWithRadioactiveSubstances ===
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
                    Q.{factoryJson.find((f) => f.id === "116").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "116").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf116_WorkExternalDisposalServiceProvider"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf116_WorkExternalDisposalServiceProvider ===
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
                      name="Qf116_WorkExternalDisposalServiceProvider"
                      checked={
                        factoryData.Qf116_WorkExternalDisposalServiceProvider ===
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
                    Q.{factoryJson.find((f) => f.id === "117").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "117").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf117_ExportHazardousWasteDocumented"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf117_ExportHazardousWasteDocumented ===
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
                      name="Qf117_ExportHazardousWasteDocumented"
                      checked={
                        factoryData.Qf117_ExportHazardousWasteDocumented ===
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
                    Q.{factoryJson.find((f) => f.id === "118").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "118").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf118_ConfirmAccordanceBaselConvention"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf118_ConfirmAccordanceBaselConvention ===
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
                      name="Qf118_ConfirmAccordanceBaselConvention"
                      checked={
                        factoryData.Qf118_ConfirmAccordanceBaselConvention ===
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
                    Q.{factoryJson.find((f) => f.id === "119").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "119").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf119_PersistentOrganicPollutants"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf119_PersistentOrganicPollutants === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf119_PersistentOrganicPollutants"
                      checked={
                        factoryData.Qf119_PersistentOrganicPollutants === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {/* Question 120 */}
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "120").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "120").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf120_ActsAccordanceStockholmConvention"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf120_ActsAccordanceStockholmConvention ===
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
                      name="Qf120_ActsAccordanceStockholmConvention"
                      checked={
                        factoryData.Qf120_ActsAccordanceStockholmConvention ===
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
                    Q.{factoryJson.find((f) => f.id === "121").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "121").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf121_ConfirmNotUseSubstanceListed"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf121_ConfirmNotUseSubstanceListed === "yes"
                      }
                      onChange={handleChange}
                    />
                    Yes
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      value="no"
                      name="Qf121_ConfirmNotUseSubstanceListed"
                      checked={
                        factoryData.Qf121_ConfirmNotUseSubstanceListed === "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "122").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "122").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf122_ListedAnnexIRegulationDoYouUse"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf122_ListedAnnexIRegulationDoYouUse ===
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
                      name="Qf122_ListedAnnexIRegulationDoYouUse"
                      checked={
                        factoryData.Qf122_ListedAnnexIRegulationDoYouUse ===
                        "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "123").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "123").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf123_ProduceMercuryUseMercuryTreatMercuryWaste"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf123_ProduceMercuryUseMercuryTreatMercuryWaste ===
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
                      name="Qf123_ProduceMercuryUseMercuryTreatMercuryWaste"
                      checked={
                        factoryData.Qf123_ProduceMercuryUseMercuryTreatMercuryWaste ===
                        "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                <div className="field-sections">
                  <span>
                    Q.{factoryJson.find((f) => f.id === "124").id}:&nbsp;&nbsp;
                  </span>
                  <span>{factoryJson.find((f) => f.id === "124").q}</span>
                  <br />
                  <br />
                  <label>
                    <input
                      name="Qf124_CompanyAccordanceMinimataConventions"
                      type="radio"
                      value="yes"
                      checked={
                        factoryData.Qf124_CompanyAccordanceMinimataConventions ===
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
                      name="Qf124_CompanyAccordanceMinimataConventions"
                      checked={
                        factoryData.Qf124_CompanyAccordanceMinimataConventions ===
                        "no"
                      }
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
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
                  We hereby declare that the information provided is accurate,
                  up to date and correct and that the documents submitted along
                  with these forms are genuine. We also understand that in the
                  event of our information being found false or incorrect at any
                  stage. We reserve the right to conduct 3rd party audits to
                  access and verify our provided information.
                </label>
                <label>
                  <div className="container">
                    <div className="row" style={{ marginLeft: "-2%" }}>
                      <div className="col-sm">
                        <p>
                          {" "}
                          <input
                            type="checkbox"
                            checked={isCheckedReview}
                            onChange={(e) => {
                              setIsCheckedReview(e.target.checked);
                            }}
                          />{" "}
                          We review all the pre-filled data and confirm there is
                          no change.
                        </p>
                      </div>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {/*{" "} */}
                      <div className="col-sm" style={{ marginLeft: "-5%" }}>
                        <p>
                          Signature (To sign, please type your full name here){" "}
                          <input
                            type="text"
                            style={{ width: "150px" }}
                            required
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </label>
                <div className="container">
                  <div className="row">
                    <div className="col-sm">
                      <button
                        // onClick={(e) => {
                        //   connectToDatabase(e);
                        // }}
                        id="submitBTN"
                        type="submit"
                        disabled={!isChecked && !isCheckedReview}
                        value="finish"
                        className="submit-btn"
                        style={{
                          background:
                            isChecked && isCheckedReview ? "#fec106" : "grey",
                        }}
                      >
                        Submit & Finish
                      </button>
                    </div>
                    <div className="col-sm">
                      <button
                        // onClick={(e) => {
                        //   connectToDatabase(e);
                        // }}       value="newFactory"    value="finish"

                        id="submitBTN"
                        type="submit"
                        value="newFactory"
                        disabled={!isChecked && !isCheckedReview}
                        className="submit-btn"
                        style={{
                          background:
                            isChecked && isCheckedReview ? "#fec106" : "grey",
                        }}
                      >
                        Submit & Enter New Factory Profile
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default FactoryQuestions;
