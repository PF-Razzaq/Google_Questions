import React, { useState, useEffect } from "react";

import { HiOutlineUpload } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import "./CompanyInformationForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

let otherCountry;
let recordId = 0;
let submitValue = "";
const SupplierQuestions = () => {
  let [loading, setLoading] = useState(false);
  const [supplierJson, setSupplierJson] = useState();
  const [factoryJson, setFactoryJson] = useState();
  const [countryCode, setCountryCode] = useState();

  //

  const fetchFactoryJson = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PUBLIC_URL}/factoryData.json`
      );

      setFactoryJson(response.data);
    } catch (error) {
      console.error("Error occurred while connecting", error);
    }
  };
  const fetchSupplierJson = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_PUBLIC_URL}/supplierData.json`
    );

    setSupplierJson(response.data);
  };

  const fetchCpontryCode = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_PUBLIC_URL}/countryCode.json`
    );

    setCountryCode(response.data);
  };

  //

  const handleDownload = async () => {
    const apiUrl = `${process.env.REACT_APP_PUBLIC_URL}/OnlineQuestionnairePhase1.pdf`;
    const headers = new Headers({});
    try {
      const response = await fetch(apiUrl, { method: "GET", headers });
      if (response.ok) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "supplierDownload.pdf");
        document.body.appendChild(link);
        link.click();
      }
    } catch (error) {
      console.error("Error fetching description:", error);
    }
  };
  useEffect(() => {
    fetchSupplierJson();
    fetchCpontryCode();
    fetchFactoryJson();
  }, []);
  // window.onload = new (function () {
  //   fetchSupplierJson();
  //   fetchCpontryCode();
  //   fetchFactoryJson();
  // })();
  const [file, setFile] = useState();
  const [countrycodePhone, setCountrycodePhone] = useState("");
  const [countrycodeCell, setCountrycodeCell] = useState("");
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
  const [isCheckedReview, setIsCheckedReview] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [customOption, setCustomOption] = useState("");
  const [options, setOptions] = useState([]);
  const [ownerships, setOwnerships] = useState([]);
  const [exports, setExports] = useState([]);
  const [options32, setOptions32] = useState([]);

  const connectToDatabase = async (e) => {
    e.preventDefault();
    setLoading(true);
    document.documentElement.scrollTop = 0;
    const form = document.getElementById("supplierForm");

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_NODE_MIDDLEWARE}/fmi/data/v2/databases/Registration/sessions`
      );
      localStorage.setItem("filemakerToken", response.data);
      submitValue = e.nativeEvent.submitter.attributes.value.value;
      postDataWithToken();
    } catch (error) {
      console.error("Error occurred while connecting", error);
      toast.error(`submission failed : ${error}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
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
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`,
            },
          }
        );

        const data = response.data;
        localStorage.setItem("supplierId", Number(data.response.recordId));

        recordId = Number(data.response.recordId);

        await uploadSignedDocument();
        await uploadDueDilligenceDocument();
        await issuedFairLaborEvidenceUpload();
        await issuedFairStoneEvidenceUpload();
        await issuedGlobalOrganicTextileEvidenceUpload();
        await issuedGrunerKnopfEvidenceUpload();
        await issuedIGEPEvidenceUpload();
        await issuedOEKOTEXGreenEvidenceUpload();
        await issuedSMETASedexEvidenceUpload();
        await issuedSocialAccountabilitySA8000Upload();
        await issuedXertifixStandardEvidenceUpload();
        await issuedXertifixStandardEvidenceUpload();
        await issuedXertifixPlusEvidenceUpload();
        await issuedDINENISO14001EvidenceUpload();
        await issuedGrunerKnopfEvidence1Upload();
        await issuedAMFORIBEPIEvidenceUpload();
        await issuedIGEP2020AuditEvidenceUpload();
        await issuedDINENISO45001EvidenceUpload();
        await logout();
        setLoading(false);
        toast.success(`${supplierJson.find((f) => f.id === "m1").q}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        setTimeout(() => {
          if (submitValue !== "finish") {
            window.location = `${process.env.REACT_APP_PUBLIC_URL}/factoryquestions`;
          } else {
            window.location = `${process.env.REACT_APP_PUBLIC_URL}/supplierquestions`;
          }
        }, 3000);
      } catch (error) {
        toast.error(`submission failed : ${error}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        console.error("Error fetching data:", error);
      }
    }
  };
  const uploadSignedDocument = async (token) => {
    const upload = new FormData();
    upload.append("upload", file);

    if (localStorage.getItem("filemakerToken") && file) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs38b_SignatureUpload/1`,
          upload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const data = response.data;
      } catch (error) {
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs39b_HumanRightsViolations/1`,
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs45b_IssuedFairLaborEvidence/1`,
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs46b_IssuedFairStoneEvidence/1`,
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs47b_IssuedGlobalOrganicTextileEvidence/1`,
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs48b_IssuedGrunerKnopfEvidence/1`,
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs49b_IssuedIGEPEvidence/1`,
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs50b_IssuedOEKOTEXGreenEvidence/1`,
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs51b_IssuedSMETASedexEvidence/1`,
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs52b_IssuedSocialAccountabilitySA8000/1`,
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs53b_IssuedXertifixStandardEvidence/1`,
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs54b_IssuedXertifixPlusEvidence/1`,
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs56b_IssuedDINENISO14001Evidence/1`,
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs57b_IssuedGrunerKnopfEvidence_2/1`,
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs55b_IssuedAMFORIBEPIEvidence/1`,
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
  const logout = async (e) => {
    if (localStorage.getItem("filemakerToken")) {
      try {
        const response = await axios.delete(
          `${
            process.env.REACT_APP_FM_URL
          }/fmi/data/v2/databases/Registration/sessions/${localStorage.getItem(
            "filemakerToken"
          )}`
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs58b_IssuedIGEP2020AuditEvidence/1`,
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Supplier Records/records/${recordId}/containers/Qs59b_IssuedDINENISO45001Evidence/1`,
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

  const handleSubmitButton = () => {
    connectToDatabase();
  };
  return (
    <>
      <ClipLoader
        color="rgb(254, 193, 6)"
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {supplierJson && countryCode && factoryJson && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="form-sections p-5">
              <div className="form-field">
                <form id="supplierForm" onSubmit={connectToDatabase}>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        borderBottom: "1px dotted black",
                        paddingBottom: "15px",
                        marginBottom: "15px",
                      }}
                    >
                      <span
                        className="text-center"
                        style={{
                          marginBottom: "-3.50%",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        {supplierJson.find((f) => f.id === "profile").q}
                      </span>

                      <FaHome
                        onClick={() => {
                          if (
                            confirm(
                              "This questionnaire has not been submitted, are you sure to abandon and leave!"
                            ) == true
                          ) {
                            navigate("/");
                          }
                        }}
                        style={{ marginLeft: "auto" }}
                        size={32}
                      />
                    </div>
                  </div>
                  <p>
                    <span style={{ color: "red" }}>*</span> Required
                  </p>
                  <h2>{supplierJson.find((f) => f.id === "heading").q}</h2>
                  <p style={{ marginBottom: "25px", fontSize: "20px" }}>
                    {supplierJson.find((f) => f.id === "heading-below").q}
                  </p>
                  {/* Question 1 */}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "1").id}.&nbsp;&nbsp;
                    </span>
                    <span>
                      {supplierJson.find((f) => f.id === "1").q}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qs1_SupplierName"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question 2 */}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "2").id}.&nbsp;&nbsp;
                    </span>
                    <span>
                      {supplierJson.find((f) => f.id === "2").q}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9-]/g, "");
                      }}
                      name="Qs2_SuppBusinessLicenseNumber"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question 3 */}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "3").id}.&nbsp;&nbsp;
                    </span>
                    <span>
                      {supplierJson.find((f) => f.id === "3").q}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9-]/g, "");
                      }}
                      pattern="[0-9]*"
                      name="Qs3_SuppExportLicenseNumber"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question 4 */}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "4").id}.&nbsp;&nbsp;
                    </span>
                    <span>
                      {supplierJson.find((f) => f.id === "4").q}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9-]/g, "");
                      }}
                      pattern="[0-9]*"
                      name="Qs4_SuppVATNumber"
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
                      name="Qs5a_Building"
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
                      name="Qs5b_Street"
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
                      name="Qs6a_Town"
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
                      name="Qs6b_City"
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
                      name="Qs6c_Province"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question  7*/}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "7").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "7").q}</span>

                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qs7_PostCode"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                    />
                  </div>
                  {/* Question 8 */}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "8").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "8").q}</span>
                    <select
                      id="Qs8_CountryId"
                      style={{ width: "190px" }}
                      value={supplierData.Qs8_Country}
                      onChange={(e) => {
                        console.log(e.target.value, e);

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
                      <option value="" disabled selected>
                        Choose Options
                      </option>
                      <option value="China">China</option>
                      <option value="Germany">Germany</option>
                      <option value="Hong Kong, China">Hong Kong, China</option>
                      <option value="India">India</option>
                      <option value="Taiwan">Taiwan</option>
                      <option value="Vietnam">Vietnam</option>
                      {options.map((option) => (
                        <option value={option}>{option}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                    {otherFields.q8Other === "Other" && (
                      <div className="otherWidth input-group w-25 mt-2 otherF">
                        <input
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const newCountry = e.target.value.trim();
                              if (newCountry) {
                                options.unshift();
                                const selectElement = document.querySelector(
                                  'select[name="Qs8_Country"]'
                                );
                                selectElement.value = newCountry;
                                setOptions(options);
                                setSupplierData({
                                  ...supplierData,
                                  Qs8_Country: newCountry,
                                });
                                setOtherFields({ ...otherFields, q8Other: "" });
                              }
                            }
                          }}
                          onBlur={(e) => {
                            e.preventDefault();
                            const newCountry = e.target.value.trim();
                            if (newCountry) {
                              options.unshift(newCountry);
                              const selectElement = document.querySelector(
                                'select[name="Qs8_Country"]'
                              );
                              selectElement.value = newCountry;
                              setOptions(options);
                              setSupplierData({
                                ...supplierData,
                                Qs8_Country: newCountry,
                              });
                              setOtherFields({ ...otherFields, q8Other: "" });
                            }
                          }}
                          type="text"
                          className="otherWidth form-control w-25 rounded"
                          placeholder="If Other, please specify"
                          aria-label="Enter text..."
                          aria-describedby="basic-addon2"
                        />
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
                        name="Qs9a_Phone"
                        onChange={(e) => {
                          setCountrycodePhone(e.target.value);
                        }}
                        className="form-control countryCode me-1"
                        id="countrySelect"
                      >
                        <option value="" disabled selected>
                          Choose options
                        </option>
                        {countryCode.map((country) => (
                          <option key={country.code} value={country.dial_code}>
                            {country.dial_code + "    " + " "} &nbsp;
                            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                            {" " + country.name}
                          </option>
                        ))}
                      </select>
                      -
                      <input
                        name="Qs9a_Phone"
                        type="text"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9-]/g,
                            ""
                          );
                        }}
                        onChange={(e) => {
                          setSupplierData({
                            ...supplierData,
                            Qs9a_Phone: countrycodePhone + " " + e.target.value,
                          });
                        }}
                        pattern="[0-9]*"
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
                        onChange={(e) => {
                          setCountrycodeCell(e.target.value);
                        }}
                      >
                        <option value="" disabled selected>
                          Choose options
                        </option>
                        {countryCode.map((country) => (
                          <option key={country.code} value={country.dial_code}>
                            {country.dial_code + "    " + "   "}&nbsp;
                            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                            {" " + country.name}
                          </option>
                        ))}
                      </select>

                      <input
                        type="text"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9-]/g,
                            ""
                          );
                        }}
                        pattern="[0-9]*"
                        name="Qs9b_Cellphone"
                        onChange={(e) => {
                          setSupplierData({
                            ...supplierData,
                            Qs9b_Cellphone:
                              countrycodeCell + " " + e.target.value,
                          });
                        }}
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
                      {supplierJson.find((f) => f.id === "10").id}.&nbsp;&nbsp;
                    </span>
                    <span>
                      {supplierJson.find((f) => f.id === "10").q}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="email"
                      name="Qs10_Email"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question  11*/}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "11").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "11").q}</span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qs11_Website"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                    />
                  </div>
                  <h3 className="supplier-heading">Contact Person</h3>
                  {/* Question  12*/}
                  <div>
                    <span>12.&nbsp;&nbsp;</span>
                    <select
                      style={{ display: "inline-block", width: "190px" }}
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
                      <option value="" disabled selected>
                        Choose Options
                      </option>
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Miss">Miss</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Dr.">Dr.</option>
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
                      name="Qs12b_FirstName"
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
                      style={{ width: "190px" }}
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qs12c_LastName"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question  13*/}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "13").id}.&nbsp;&nbsp;
                    </span>
                    <span>
                      {supplierJson.find((f) => f.id === "13").q}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qs13_ContactPersonPosition"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  <h3 className="supplier-heading">Supplier Information</h3>
                  {/* Question  14*/}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "14").id}.&nbsp;&nbsp;
                    </span>
                    <span>
                      {supplierJson.find((f) => f.id === "14").q}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="This value must be a number"
                      type="text"
                      name="Qs14_YearOfEstablishment"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      maxLength={4}
                      minLength={4}
                      required
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      }}
                    />
                  </div>
                  {/* Question  15*/}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "15").id}.&nbsp;&nbsp;
                    </span>
                    <span>
                      {supplierJson.find((f) => f.id === "15").q}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="This value must be a number"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      }}
                      pattern="[0-9]*"
                      name="Qs15_TotalNoOfEmployees"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question 16 */}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "16").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "16").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <select
                      style={{ width: "190px" }}
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
                    >
                      <option value="" disabled selected>
                        Choose Options
                      </option>
                      <option value="Private">Private</option>
                      <option value="Public">Public</option>
                      <option value="State">State</option>
                      <option value="Joint Venture">Joint Venture</option>
                      <option value="Belongs to Group">
                        Belongs to Group{" "}
                      </option>
                      {ownerships.map((ownership) => (
                        <option key={ownership} value={ownership}>
                          {ownership}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>

                    {otherFields.Q16Other === "Other" && (
                      <div className="otherWidth input-group w-25 mt-2 otherF">
                        <input
                          onBlur={(e) => {
                            e.preventDefault();
                            const newOwnership = e.target.value.trim();
                            if (newOwnership) {
                              ownerships.unshift(newOwnership);
                              const selectElement = document.querySelector(
                                'select[name="Qs16_Ownership"]'
                              );
                              setOtherFields({
                                ...otherFields,
                                Q16Other: "",
                              });
                              selectElement.value = newOwnership;
                              setOwnerships(ownerships);
                              setSupplierData({
                                ...supplierData,
                                Qs16_Ownership: newOwnership,
                              });
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const newOwnership = e.target.value.trim();
                              if (newOwnership) {
                                ownerships.unshift(newOwnership);
                                const selectElement = document.querySelector(
                                  'select[name="Qs16_Ownership"]'
                                );
                                setOtherFields({
                                  ...otherFields,
                                  Q16Other: "",
                                });
                                selectElement.value = newOwnership;
                                setOwnerships(ownerships);
                                setSupplierData({
                                  ...supplierData,
                                  Qs16_Ownership: newOwnership,
                                });
                              }
                            }
                          }}
                          type="text"
                          className="otherWidth form-control w-25 rounded"
                          placeholder="If Other, please specify"
                          aria-label="Enter text..."
                          aria-describedby="basic-addon2"
                        />
                      </div>
                    )}
                  </div>
                  {/* Question  17*/}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "17").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "17").q}</span>
                    <select
                      style={{ width: "220px" }}
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
                      <option value="" disabled selected>
                        Choose Options
                      </option>
                      <option value="Trader">Trader</option>
                      <option value="Manufacturer / Trader">
                        Manufacturer / Trader
                      </option>
                    </select>
                  </div>
                  {/* Question  18*/}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "18").id}.&nbsp;&nbsp;
                    </span>
                    <span>
                      {supplierJson.find((f) => f.id === "18").q}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qs18_MainProducts"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question  19*/}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "19").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "19").q} </span>
                    <input
                      onChange={handleChange}
                      placeholder="This value must be a number"
                      type="text"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9-]/g, "");
                      }}
                      pattern="[0-9]*"
                      name="Qs19_SalesPerYearDomestic"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                    />
                  </div>
                  {/* Question  20*/}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "20").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "20").q}</span>
                    <input
                      onChange={handleChange}
                      placeholder="This value must be a number"
                      type="text"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9-]/g, "");
                      }}
                      pattern="[0-9]*"
                      name="Qs20_SalesPerYearExport"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                    />
                  </div>
                  {/* Question  21*/}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "21").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "21").q}</span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qs21_MainCustomerAndCountry"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                    />
                  </div>
                  {/* Question  22*/}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "22").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "22").q}</span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qs22_MainCustomerProducts"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                    />
                  </div>
                  {/* Question 23 */}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "23").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "23").q}</span>
                    <span style={{ color: "red" }}>*</span>

                    <select
                      style={{ width: "190px" }}
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
                    >
                      <option value="" disabled selected>
                        Choose Options
                      </option>
                      <option value="Western Europe">Western Europe</option>
                      <option value="easternEurope">Eastern Europe</option>
                      <option value="North America">North America</option>
                      <option value="South America">South America</option>
                      <option value="Asia Pacific">Asia Pacific</option>
                      <option value="Africa">Africa</option>
                      <option value="Middle East">Middle East</option>
                      <option value="Worldwide">Worldwide</option>
                      {exports.map((exp) => (
                        <option key={exp} value={exp}>
                          {exp}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>

                    {otherFields.Q23Other === "Other" && (
                      <div className="otherWidth input-group w-25 mt-2 otherF">
                        <input
                          onBlur={(e) => {
                            e.preventDefault();
                            const newExport = e.target.value.trim();
                            if (newExport) {
                              exports.unshift(newExport);

                              setExports(exports);
                              setSupplierData({
                                ...supplierData,
                                Qs23_MainExportMarkets: newExport,
                              });
                              const selectElement = document.querySelector(
                                'select[name="Qs23_MainExportMarkets"]'
                              );
                              selectElement.value = newExport;
                              setOtherFields({
                                ...otherFields,
                                Q23Other: "",
                              });
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const newExport = e.target.value.trim();
                              if (newExport) {
                                exports.unshift(newExport);
                                const selectElement = document.querySelector(
                                  'select[name="Qs23_MainExportMarkets"]'
                                );
                                selectElement.value = newExport;
                                setOtherFields({
                                  ...otherFields,
                                  Q23Other: "",
                                });
                                setExports(exports);
                                setSupplierData({
                                  ...supplierData,
                                  Qs23_MainExportMarkets: newExport,
                                });
                              }
                            }
                          }}
                          type="text"
                          className="otherWidth form-control w-25 rounded"
                          placeholder="If Other, please specify"
                          aria-label="Enter text..."
                          aria-describedby="basic-addon2"
                        />
                      </div>
                    )}
                  </div>
                  {/* Question 24 */}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "24").id}.&nbsp;&nbsp;
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
                      {supplierJson.find((f) => f.id === "25").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "25").q}</span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qs25_TradeFairParticipation"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                    />
                  </div>
                  {/* Question  26*/}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "26").id}.&nbsp;&nbsp;
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
                      {supplierJson.find((f) => f.id === "27").id}.&nbsp;&nbsp;
                    </span>
                    <span>
                      {supplierJson.find((f) => f.id === "27").q}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="This value must be a number"
                      type="text"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9-]/g, "");
                      }}
                      pattern="[0-9]*"
                      name="Qs27_DeliveryLeadTimeInitialOrder"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question  28*/}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "28").id}.&nbsp;&nbsp;
                    </span>
                    <span>
                      {supplierJson.find((f) => f.id === "28").q}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="This value must be a number"
                      type="text"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9-]/g, "");
                      }}
                      pattern="[0-9]*"
                      name="Qs28_DeliveryLeadTimeRepeatOrder"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  <h3 className="supplier-heading">Bank Information</h3>
                  {/* Question  29*/}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "29").id}.&nbsp;&nbsp;
                    </span>
                    <span>
                      {supplierJson.find((f) => f.id === "29").q}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qs29_BeneficiaryName"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question  30*/}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "30").id}.&nbsp;&nbsp;
                    </span>
                    <span>
                      {supplierJson.find((f) => f.id === "30").q}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qs30_BankName"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question  31*/}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "31").id}.&nbsp;&nbsp;
                    </span>
                    <span>
                      {supplierJson.find((f) => f.id === "31").q}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qs31_BankAddress"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question 32 */}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "32").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "32").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <select
                      value={supplierData.Qs32_CountryOfBankAC}
                      style={{ width: "220px" }}
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
                      <option value="" disabled selected>
                        Choose Options
                      </option>
                      <option value="China">China</option>
                      <option value="Germany">Germany</option>
                      <option value="Hong Kong, China">Hong Kong, China</option>
                      <option value="India">India</option>
                      <option value="Taiwan">Taiwan</option>
                      <option value="Vietnam">Vietnam</option>
                      {options32.map((option32) => (
                        <option key={option32} value={option32}>
                          {option32}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>

                    {otherFields.Q32Other === "other" && (
                      <div className="otherWidth input-group w-25 mt-2 otherF">
                        <input
                          style={{ width: "220px" }}
                          onBlur={(e) => {
                            e.preventDefault();
                            const newCountryOfBankAC = e.target.value.trim();
                            if (newCountryOfBankAC) {
                              options32.unshift(newCountryOfBankAC);
                              const selectElement = document.querySelector(
                                'select[name="Qs32_CountryOfBankAC"]'
                              );
                              selectElement.value = newCountryOfBankAC;
                              setOtherFields({
                                ...otherFields,
                                Q32Other: "",
                              });
                              setSupplierData({
                                ...supplierData,
                                Qs32_CountryOfBankAC: newCountryOfBankAC,
                              });
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const newCountryOfBankAC = e.target.value.trim();
                              if (newCountryOfBankAC) {
                                options32.unshift(newCountryOfBankAC);
                                const selectElement = document.querySelector(
                                  'select[name="Qs32_CountryOfBankAC"]'
                                );
                                selectElement.value = newCountryOfBankAC;
                                setOtherFields({
                                  ...otherFields,
                                  Q32Other: "",
                                });
                                setSupplierData({
                                  ...supplierData,
                                  Qs32_CountryOfBankAC: newCountryOfBankAC,
                                });
                              }
                            }
                          }}
                          type="text"
                          className="otherWidth form-control w-25 rounded"
                          placeholder="If Other, please specify"
                          aria-label="Enter text..."
                          aria-describedby="basic-addon2"
                          name="Qs32_CountryOfBankAC"
                        />
                      </div>
                    )}
                  </div>
                  {/* Question  33*/}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "33").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "33").q}</span>
                    <div className="form-group d-flex">
                      <select
                        style={{ width: "380px" }}
                        className="form-control countryCode me-1"
                        id="countrySelect"
                        name="Qs33_BankPhone"
                      >
                        <option value="" disabled selected>
                          Choose options
                        </option>
                        {countryCode.map((country) => (
                          <option key={country.code} value={country.dial_code}>
                            {country.dial_code + "    " + " "} &nbsp;
                            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                            {" " + country.name}
                          </option>
                        ))}
                      </select>
                      -
                      <input
                        style={{ width: "280px" }}
                        name="Qs33_BankPhone"
                        placeholder="This value must be a number"
                        type="text"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9-]/g,
                            ""
                          );
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
                      {supplierJson.find((f) => f.id === "34").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "34").q}</span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qs34_BankRegionalNumber"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                    />
                  </div>
                  {/* Question  35*/}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "35").id}.&nbsp;&nbsp;
                    </span>
                    <span>
                      {supplierJson.find((f) => f.id === "35").q}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qs35_SWIFT"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question  36*/}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "36").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "36").q}</span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qs36_IBAN"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                    />
                  </div>
                  {/* Question  37*/}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "37").id}.&nbsp;&nbsp;
                    </span>
                    <span>
                      {supplierJson.find((f) => f.id === "37").q}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qs37_BeneficiaryBankACNumber"
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

                          {/* <a
                            href="https://images.pascalinesoft.com/pdf/OnlineQuestionnairePhase1.pdf"
                            download
                            style={{ color: "black", textDecoration: "none" }}
                          > */}
                          <button
                            onClick={handleDownload}
                            type="button"
                            className="downloadFile"
                            style={{
                              backgroundColor: "rgb(254, 193, 6)",
                              color: "black",
                            }}
                          >
                            <FiDownload
                              style={{
                                margin: "0 5px 3px 0",
                                fontSize: "16px",
                                backgroundColor: "rgb(254, 193, 6)",
                              }}
                            />
                            DOWNLOAD FILE
                          </button>
                          {/* </a> */}
                          <br />
                          <label
                            className="file-input-button-upload"
                            style={{
                              backgroundColor: "rgb(254, 193, 6)",
                              color: "black",
                            }}
                          >
                            <input
                              type="file"
                              accept="application/pdf,image/jpeg,image/png"
                              style={{
                                display: "none",
                                backgroundColor: "rgb(254, 193, 6)",
                              }}
                              onChange={(e) => {
                                if (
                                  e.target.files[0].type ===
                                    "application/pdf" ||
                                  e.target.files[0].type === "image/png" ||
                                  e.target.files[0].type === "image/jpeg"
                                ) {
                                } else {
                                  toast.error(
                                    `Wrong File Format ${e.target.files[0].type}.Accepted file formats are png pdf and jpeg`,
                                    {
                                      position: toast.POSITION.TOP_CENTER,
                                    }
                                  );
                                  return;
                                }
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
                      {supplierJson.find((f) => f.id === "39").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "39").q}</span>
                    <span style={{ color: "red" }}>*</span>

                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                              required
                              type="file"
                              name="Qs39b_HumanRightsViolations"
                              accept="application/pdf,image/jpeg,image/png"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                if (
                                  e.target.files[0].type ===
                                    "application/pdf" ||
                                  e.target.files[0].type === "image/png" ||
                                  e.target.files[0].type === "image/jpeg"
                                ) {
                                } else {
                                  toast.error(
                                    `Wrong File Format ${e.target.files[0].type}.Accepted file formats are png pdf and jpeg`,
                                    {
                                      position: toast.POSITION.TOP_CENTER,
                                    }
                                  );
                                  return;
                                }
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
                                display: dilligenceFile
                                  ? "none"
                                  : "inline-block",
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
                              {supplierJson.find((f) => f.id === "40").id}
                              :&nbsp;&nbsp;
                            </span>
                            <span>
                              {supplierJson.find((f) => f.id === "40").q}
                            </span>
                            <span style={{ color: "red" }}>*</span>
                            <br />
                            <br />
                            <label>
                              <input
                                required
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
                                required
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
                  <div
                    className="field-sections"
                    style={{ color: "lightgrey" }}
                  >
                    <span>
                      {supplierJson.find((f) => f.id === "41").heading}
                      <br />
                      {supplierJson.find((f) => f.id === "41").id}
                      :&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "41").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <input
                      placeholder="Enter your answer"
                      type="text"
                      disabled
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  <div
                    className="field-sections"
                    style={{ color: "lightgrey" }}
                  >
                    <span>
                      {supplierJson.find((f) => f.id === "42").id}
                      :&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "42").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <input
                      placeholder="Enter your answer"
                      type="text"
                      disabled
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  <div
                    className="field-sections"
                    style={{ color: "lightgrey" }}
                  >
                    <span>
                      {supplierJson.find((f) => f.id === "43").id}
                      :&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "43").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <input
                      placeholder="Enter your answer"
                      type="text"
                      disabled
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  <div
                    className="field-sections"
                    style={{ color: "lightgrey" }}
                  >
                    <span>
                      {supplierJson.find((f) => f.id === "44").id}
                      :&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "44").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <input
                      placeholder="Enter your answer"
                      type="text"
                      disabled
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question 45 */}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "45").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "45").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                              required
                              name="Qs45b_IssuedFairLaborEvidence"
                              type="file"
                              accept="application/pdf,image/jpeg,image/png"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                if (
                                  e.target.files[0].type ===
                                    "application/pdf" ||
                                  e.target.files[0].type === "image/png" ||
                                  e.target.files[0].type === "image/jpeg"
                                ) {
                                } else {
                                  toast.error(
                                    `Wrong File Format ${e.target.files[0].type}.Accepted file formats are png pdf and jpeg`,
                                    {
                                      position: toast.POSITION.TOP_CENTER,
                                    }
                                  );
                                  return;
                                }
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
                      {supplierJson.find((f) => f.id === "46").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "46").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                              required
                              name="Qs46b_IssuedFairStoneEvidence"
                              type="file"
                              accept="application/pdf,image/jpeg,image/png"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                if (
                                  e.target.files[0].type ===
                                    "application/pdf" ||
                                  e.target.files[0].type === "image/png" ||
                                  e.target.files[0].type === "image/jpeg"
                                ) {
                                } else {
                                  toast.error(
                                    `Wrong File Format ${e.target.files[0].type}.Accepted file formats are png pdf and jpeg`,
                                    {
                                      position: toast.POSITION.TOP_CENTER,
                                    }
                                  );
                                  return;
                                }
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
                      {supplierJson.find((f) => f.id === "47").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "47").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                              required
                              name="Qs47b_IssuedGlobalOrganicTextileEvidence"
                              type="file"
                              accept="application/pdf,image/jpeg,image/png"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                if (
                                  e.target.files[0].type ===
                                    "application/pdf" ||
                                  e.target.files[0].type === "image/png" ||
                                  e.target.files[0].type === "image/jpeg"
                                ) {
                                } else {
                                  toast.error(
                                    `Wrong File Format ${e.target.files[0].type}.Accepted file formats are png pdf and jpeg`,
                                    {
                                      position: toast.POSITION.TOP_CENTER,
                                    }
                                  );
                                  return;
                                }
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
                      {supplierJson.find((f) => f.id === "48").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "48").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierData.Qs48a_IssuedGrunerKnopfEvidence ===
                        "yes" && (
                        <div className="field-sections">
                          <br />
                          <label className="file-input-button-upload">
                            <input
                              required
                              name="Qs48b_IssuedGrunerKnopfEvidence"
                              type="file"
                              accept="application/pdf,image/jpeg,image/png"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                if (
                                  e.target.files[0].type ===
                                    "application/pdf" ||
                                  e.target.files[0].type === "image/png" ||
                                  e.target.files[0].type === "image/jpeg"
                                ) {
                                } else {
                                  toast.error(
                                    `Wrong File Format ${e.target.files[0].type}.Accepted file formats are png pdf and jpeg`,
                                    {
                                      position: toast.POSITION.TOP_CENTER,
                                    }
                                  );
                                  return;
                                }
                                const MAX_FILE_SIZE_MB = 10;
                                const fileSizeMB = (
                                  e.target.files[0].size /
                                  1024 /
                                  1024
                                ).toFixed(2);

                                if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                                  setIssuedGrunerKnopfEvidence(
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
                      {supplierJson.find((f) => f.id === "49").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "49").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qs49a_IssuedIGEPEvidence"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs49a_IssuedIGEPEvidence === "yes"
                        }
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label style={{ marginLeft: "1rem" }}>
                      <input
                        required
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
                              required
                              name="Qs49b_IssuedIGEPEvidence"
                              type="file"
                              accept="application/pdf,image/jpeg,image/png"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                if (
                                  e.target.files[0].type ===
                                    "application/pdf" ||
                                  e.target.files[0].type === "image/png" ||
                                  e.target.files[0].type === "image/jpeg"
                                ) {
                                } else {
                                  toast.error(
                                    `Wrong File Format ${e.target.files[0].type}.Accepted file formats are png pdf and jpeg`,
                                    {
                                      position: toast.POSITION.TOP_CENTER,
                                    }
                                  );
                                  return;
                                }
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
                      {supplierJson.find((f) => f.id === "50").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "50").q} </span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qs50a_IssuedOEKOTEXGreenEvidence"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs50a_IssuedOEKOTEXGreenEvidence ===
                          "yes"
                        }
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label style={{ marginLeft: "1rem" }}>
                      <input
                        required
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
                              required
                              name="Qs50b_IssuedOEKOTEXGreenEvidence"
                              type="file"
                              accept="application/pdf,image/jpeg,image/png"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                if (
                                  e.target.files[0].type ===
                                    "application/pdf" ||
                                  e.target.files[0].type === "image/png" ||
                                  e.target.files[0].type === "image/jpeg"
                                ) {
                                } else {
                                  toast.error(
                                    `Wrong File Format ${e.target.files[0].type}.Accepted file formats are png pdf and jpeg`,
                                    {
                                      position: toast.POSITION.TOP_CENTER,
                                    }
                                  );
                                  return;
                                }
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
                      {supplierJson.find((f) => f.id === "51").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "51").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierData.Qs51a_IssuedSMETASedexEvidence ===
                        "yes" && (
                        <div className="field-sections">
                          <br />
                          <label className="file-input-button-upload">
                            <input
                              required
                              name="Qs51b_IssuedSMETASedexEvidence"
                              type="file"
                              accept="application/pdf,image/jpeg,image/png"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                if (
                                  e.target.files[0].type ===
                                    "application/pdf" ||
                                  e.target.files[0].type === "image/png" ||
                                  e.target.files[0].type === "image/jpeg"
                                ) {
                                } else {
                                  toast.error(
                                    `Wrong File Format ${e.target.files[0].type}.Accepted file formats are png pdf and jpeg`,
                                    {
                                      position: toast.POSITION.TOP_CENTER,
                                    }
                                  );
                                  return;
                                }
                                const MAX_FILE_SIZE_MB = 10;
                                const fileSizeMB = (
                                  e.target.files[0].size /
                                  1024 /
                                  1024
                                ).toFixed(2);

                                if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                                  setIssuedSMETASedexEvidence(
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
                      {supplierJson.find((f) => f.id === "52").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "52").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                              required
                              name="Qs52b_IssuedSocialAccountabilitySA8000"
                              type="file"
                              accept="application/pdf,image/jpeg,image/png"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                if (
                                  e.target.files[0].type ===
                                    "application/pdf" ||
                                  e.target.files[0].type === "image/png" ||
                                  e.target.files[0].type === "image/jpeg"
                                ) {
                                } else {
                                  toast.error(
                                    `Wrong File Format ${e.target.files[0].type}.Accepted file formats are png pdf and jpeg`,
                                    {
                                      position: toast.POSITION.TOP_CENTER,
                                    }
                                  );
                                  return;
                                }
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
                      {supplierJson.find((f) => f.id === "53").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "53").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                              required
                              name="Qs53b_IssuedXertifixStandardEvidence"
                              type="file"
                              accept="application/pdf,image/jpeg,image/png"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                if (
                                  e.target.files[0].type ===
                                    "application/pdf" ||
                                  e.target.files[0].type === "image/png" ||
                                  e.target.files[0].type === "image/jpeg"
                                ) {
                                } else {
                                  toast.error(
                                    `Wrong File Format ${e.target.files[0].type}.Accepted file formats are png pdf and jpeg`,
                                    {
                                      position: toast.POSITION.TOP_CENTER,
                                    }
                                  );
                                  return;
                                }
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
                      {supplierJson.find((f) => f.id === "54").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "54").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qs54a_IssuedXertifixPlusEvidence"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs54a_IssuedXertifixPlusEvidence ===
                          "yes"
                        }
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label style={{ marginLeft: "1rem" }}>
                      <input
                        required
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
                              required
                              name="Qs54b_IssuedXertifixPlusEvidence"
                              type="file"
                              accept="application/pdf,image/jpeg,image/png"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                if (
                                  e.target.files[0].type ===
                                    "application/pdf" ||
                                  e.target.files[0].type === "image/png" ||
                                  e.target.files[0].type === "image/jpeg"
                                ) {
                                } else {
                                  toast.error(
                                    `Wrong File Format ${e.target.files[0].type}.Accepted file formats are png pdf and jpeg`,
                                    {
                                      position: toast.POSITION.TOP_CENTER,
                                    }
                                  );
                                  return;
                                }
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
                      {supplierJson.find((f) => f.id === "55").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "55").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierData.Qs55a_IssuedAMFORIBEPIEvidence ===
                        "yes" && (
                        <div className="field-sections">
                          <br />
                          <label className="file-input-button-upload">
                            <input
                              required
                              name="Qs55b_IssuedAMFORIBEPIEvidence"
                              type="file"
                              accept="application/pdf,image/jpeg,image/png"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                if (
                                  e.target.files[0].type ===
                                    "application/pdf" ||
                                  e.target.files[0].type === "image/png" ||
                                  e.target.files[0].type === "image/jpeg"
                                ) {
                                } else {
                                  toast.error(
                                    `Wrong File Format ${e.target.files[0].type}.Accepted file formats are png pdf and jpeg`,
                                    {
                                      position: toast.POSITION.TOP_CENTER,
                                    }
                                  );
                                  return;
                                }
                                const MAX_FILE_SIZE_MB = 10;
                                const fileSizeMB = (
                                  e.target.files[0].size /
                                  1024 /
                                  1024
                                ).toFixed(2);

                                if (fileSizeMB <= MAX_FILE_SIZE_MB) {
                                  setIssuedAMFORIBEPIEvidence(
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
                      {supplierJson.find((f) => f.id === "56").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "56").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qs56a_IssuedDINENISO14001Evidence"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs56a_IssuedDINENISO14001Evidence ===
                          "yes"
                        }
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label style={{ marginLeft: "1rem" }}>
                      <input
                        required
                        type="radio"
                        value="no"
                        name="Qs56a_IssuedDINENISO14001Evidence"
                        checked={
                          supplierData.Qs56a_IssuedDINENISO14001Evidence ===
                          "no"
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
                              required
                              name="Qs56b_IssuedDINENISO14001Evidence"
                              type="file"
                              accept="application/pdf,image/jpeg,image/png"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                if (
                                  e.target.files[0].type ===
                                    "application/pdf" ||
                                  e.target.files[0].type === "image/png" ||
                                  e.target.files[0].type === "image/jpeg"
                                ) {
                                } else {
                                  toast.error(
                                    `Wrong File Format ${e.target.files[0].type}.Accepted file formats are png pdf and jpeg`,
                                    {
                                      position: toast.POSITION.TOP_CENTER,
                                    }
                                  );
                                  return;
                                }
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
                      {supplierJson.find((f) => f.id === "57").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "57").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qs57a_IssuedGrunerKnopfEvidence_2"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs57a_IssuedGrunerKnopfEvidence_2 ===
                          "yes"
                        }
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label style={{ marginLeft: "1rem" }}>
                      <input
                        required
                        type="radio"
                        value="no"
                        name="Qs57a_IssuedGrunerKnopfEvidence_2"
                        checked={
                          supplierData.Qs57a_IssuedGrunerKnopfEvidence_2 ===
                          "no"
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
                              required
                              name="Qs57b_IssuedGrunerKnopfEvidence_2"
                              type="file"
                              accept="application/pdf,image/jpeg,image/png"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                if (
                                  e.target.files[0].type ===
                                    "application/pdf" ||
                                  e.target.files[0].type === "image/png" ||
                                  e.target.files[0].type === "image/jpeg"
                                ) {
                                } else {
                                  toast.error(
                                    `Wrong File Format ${e.target.files[0].type}.Accepted file formats are png pdf and jpeg`,
                                    {
                                      position: toast.POSITION.TOP_CENTER,
                                    }
                                  );
                                  return;
                                }
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
                      {supplierJson.find((f) => f.id === "58").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "58").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qs58a_IssuedIGEP2020AuditEvidence"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs58a_IssuedIGEP2020AuditEvidence ===
                          "yes"
                        }
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label style={{ marginLeft: "1rem" }}>
                      <input
                        required
                        type="radio"
                        value="no"
                        name="Qs58a_IssuedIGEP2020AuditEvidence"
                        checked={
                          supplierData.Qs58a_IssuedIGEP2020AuditEvidence ===
                          "no"
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
                              required
                              name="Qs58b_IssuedIGEP2020AuditEvidence"
                              type="file"
                              accept="application/pdf,image/jpeg,image/png"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                if (
                                  e.target.files[0].type ===
                                    "application/pdf" ||
                                  e.target.files[0].type === "image/png" ||
                                  e.target.files[0].type === "image/jpeg"
                                ) {
                                } else {
                                  toast.error(
                                    `Wrong File Format ${e.target.files[0].type}.Accepted file formats are png pdf and jpeg`,
                                    {
                                      position: toast.POSITION.TOP_CENTER,
                                    }
                                  );
                                  return;
                                }
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
                      {supplierJson.find((f) => f.id === "59").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "59").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qs59a_IssuedDINENISO45001Evidence"
                        type="radio"
                        value="yes"
                        checked={
                          supplierData.Qs59a_IssuedDINENISO45001Evidence ===
                          "yes"
                        }
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label style={{ marginLeft: "1rem" }}>
                      <input
                        required
                        type="radio"
                        value="no"
                        name="Qs59a_IssuedDINENISO45001Evidence"
                        checked={
                          supplierData.Qs59a_IssuedDINENISO45001Evidence ===
                          "no"
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
                              required
                              name="Qs59b_IssuedDINENISO45001Evidence"
                              type="file"
                              accept="application/pdf,image/jpeg,image/png"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                if (
                                  e.target.files[0].type ===
                                    "application/pdf" ||
                                  e.target.files[0].type === "image/png" ||
                                  e.target.files[0].type === "image/jpeg"
                                ) {
                                } else {
                                  toast.error(
                                    `Wrong File Format ${e.target.files[0].type}.Accepted file formats are png pdf and jpeg`,
                                    {
                                      position: toast.POSITION.TOP_CENTER,
                                    }
                                  );
                                  return;
                                }
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
                      {supplierJson.find((f) => f.id === "60").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "60").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "61").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "61").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "62").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "62").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "63").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "63").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                            {supplierJson.find((f) => f.id === "64").id}
                            :&nbsp;&nbsp;
                          </span>
                          <span>
                            {supplierJson.find((f) => f.id === "64").q}{" "}
                            <span style={{ color: "red" }}>*</span>
                          </span>
                          <br />
                          <input
                            required
                            onChange={handleChange}
                            placeholder="Enter your answer"
                            type="text"
                            name="Qs64_TopicControlAudits"
                            className="mt-3 outline-none w-100"
                            id="name-text"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Question 65 */}
                  <div className="field-sections">
                    <span>
                      {supplierJson.find((f) => f.id === "65").id} :&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "65").q} </span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "66").id} :&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "66").q} </span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "67").id} :&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "67").q} </span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "68").id} :&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "68").q} </span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "69").id} :&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "69").q} </span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "70").id} :&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "70").q} </span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "71").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "71").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "72").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "72").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "73").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "73").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "74").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "74").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "75").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "75").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "76").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "76").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "77").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "77").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "78").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "78").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "79").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "79").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "80").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "80").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "81").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "81").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "82").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "82").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "83").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "83").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "84").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "84").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "85").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "85").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "86").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "86").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "87").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "87").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "88").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "88").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "89").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "89").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "90").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "90").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "91").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "91").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "92").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "92").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "93").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "93").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "94").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "94").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "95").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "95").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "96").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "96").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "97").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "97").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "98").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "98").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "99").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "99").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "100").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "100").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "101").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "101").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                    <span>
                      {supplierJson.find((f) => f.id === "102").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "102").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "103").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "103").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "104").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "104").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "105").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "105").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "106").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "106").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "107").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "107").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "108").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "108").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "109").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "109").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                    <span>
                      {supplierJson.find((f) => f.id === "110").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "110").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "111").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "111").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "112").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "112").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "113").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "113").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "114").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "114").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "115").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "115").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "116").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "116").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "117").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "117").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "118").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "118").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "119").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "119").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "120").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "120").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "121").id}.&nbsp;&nbsp;
                    </span>
                    <span>{supplierJson.find((f) => f.id === "121").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {supplierJson.find((f) => f.id === "122").id}.&nbsp;&nbsp;
                    </span>
                    <span>
                      {supplierJson.find((f) => f.id === "122").q}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                            {supplierJson.find((f) => f.id === "123").id}
                            :&nbsp;&nbsp;
                          </span>
                          <span>
                            {supplierJson.find((f) => f.id === "123").q}
                          </span>
                          <span style={{ color: "red" }}>*</span>
                          <input
                            required
                            onChange={handleChange}
                            placeholder="Enter your answer"
                            type="text"
                            name="Qs123_SubstancesListedYESNO"
                            className="mt-3 outline-none w-100"
                            id="name-text"
                          />
                        </div>
                      )}
                    </div>
                    {/* Question 124 */}
                    <div className="field-sections">
                      <span>
                        {" "}
                        {supplierJson.find((f) => f.id === "124").id}
                        .&nbsp;&nbsp;
                      </span>
                      <span>{supplierJson.find((f) => f.id === "124").q}</span>
                      <span style={{ color: "red" }}>*</span>
                      <br />
                      <br />
                      <label>
                        <input
                          required
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
                          required
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
                        {supplierJson.find((f) => f.id === "125").id}
                        :&nbsp;&nbsp;
                      </span>
                      <span>{supplierJson.find((f) => f.id === "125").q}</span>
                      <span style={{ color: "red" }}>*</span>
                      <br />
                      <br />
                      <label>
                        <input
                          required
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
                          required
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
                      <span style={{ display: "flex", padding: "0px" }}>
                        <input
                          style={{
                            width: "35px",
                            height: "29px",
                            marginRight: "10px",
                            marginTop: "-2px",
                          }}
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            setIsChecked(e.target.checked);
                          }}
                        />
                        <p>
                          We hereby declare that the information provided is
                          accurate, up to date and correct and that the
                          documents submitted along with these forms are
                          genuine. We also understand that in the event of our
                          information being found false or incorrect at any
                          stage. We reserve the right to conduct 3rd party
                          audits to access and verify our provided information.
                        </p>
                      </span>

                      <div style={{ display: "flex" }}>
                        <span
                          style={{ display: "flex" }}
                          className="singnature-checkbox"
                        >
                          <p style={{ display: "flex" }}>
                            <input
                              className="reviewCheckbox"
                              type="checkbox"
                              checked={isCheckedReview}
                              onChange={(e) => {
                                setIsCheckedReview(e.target.checked);
                              }}
                              required
                            />
                            <p>
                              We review all the pre-filled data and confirm
                              there is no change.
                            </p>
                          </p>
                        </span>

                        <span
                          style={{ marginLeft: "60px" }}
                          className="singnature-span"
                        >
                          Signature (To sign, please type your full name here)
                          <span style={{ color: "red" }}>*</span>
                          <input
                            name="Supplier_Signature"
                            onChange={handleChange}
                            type="text"
                            style={{ width: "200px", height: "24px" }}
                            required
                          />
                        </span>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="container" style={{ padding: "0px" }}>
                    <div className="row">
                      <div className="col-sm">
                        <button
                          id="submitBTN"
                          // onClick={(e) => {
                          //   connectToDatabase(e);
                          // }}
                          type="submit"
                          disabled={!isChecked && !isCheckedReview}
                          value="finish"
                          className="submit-btn"
                          style={{
                            background:
                              isChecked && isCheckedReview
                                ? "rgb(254, 193, 6)"
                                : "lightgrey",
                          }}
                        >
                          Submit & Finish
                        </button>
                      </div>
                      <div className="col-sm submit-factory">
                        <button
                          id="submitBTN"
                          type="submit"
                          value="newFactory"
                          disabled={!isChecked && !isCheckedReview}
                          className="submit-btn"
                          style={{
                            background:
                              isChecked && isCheckedReview
                                ? "rgb(254, 193, 6)"
                                : "lightgrey",
                            marginLeft: "-53px",
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
      )}
    </>
  );
};

export default SupplierQuestions;
