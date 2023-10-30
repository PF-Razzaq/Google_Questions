import React, { useState, useEffect } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";
import "./CompanyInformationForm.css";
import ClipLoader from "react-spinners/ClipLoader";
import { FaHome } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let otherCountry;
let loadOnce = false;
let submitValue = "";
let recordId = 0;
const FactoryQuestions = () => {
  const [countrycodePhone, setCountrycodePhone] = useState("");
  const [countrycodeCell, setCountrycodeCell] = useState("");
  let [loading, setLoading] = useState(false);
  const [supplierJson, setSupplierJson] = useState();
  const [factoryJson, setFactoryJson] = useState();
  const [countryCode, setCountryCode] = useState();
  const [dateFields, setDatefields] = useState({});

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
  const isLeadFactory = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_NODE_MIDDLEWARE}/isLeadFactory/`
    );

    setSupplierJson(response.data);
  };
  const fetchCpontryCode = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_PUBLIC_URL}/countryCode.json`
    );

    setCountryCode(response.data);
  };
  const [otherFields, setOtherFields] = useState({});
  const [audits, setAudits] = useState([]);
  // window.onload =  (function () {
  //   // if (loadOnce === false) {
  //     fetchSupplierJson();
  //     fetchCpontryCode();
  //     fetchFactoryJson();

  // })();
  useEffect(() => {
    fetchSupplierJson();
    fetchCpontryCode();
    fetchFactoryJson();
  }, []);
  const handleDownload = () => {
    const fileUrl =
      "https://images.pascalinesoft.com/pdf/OnlineQuestionnairePhase1.pdf";

    const link = document.createElement("a");
    link.href = fileUrl;
    link.target = "_blank";
    link.download = "your_file_name.pdf";

    link.click();
  };

  const [
    issuedFairLaborAccreditationEvidence,
    setissuedFairLaborAccreditationEvidence,
  ] = useState();
  const [issuedFairStoneEvidence, setissuedFairStoneEvidence] = useState();
  const [issuedGlobalOrganicEvidence, setissuedGlobalOrganicEvidence] =
    useState();
  const [issuedGrunerKnopfEvidence, setissuedGrunerKnopfEvidence] = useState();
  const [issuedIGEPEvidence, setissuedIGEPEvidence] = useState();
  const [issuedOEKOTEXEvidence, setissuedOEKOTEXEvidence] = useState();
  const [issuedSMETAEvidence, setissuedSMETAEvidence] = useState();
  const [
    issuedSocialAccountabilityEvidence,
    setissuedSocialAccountabilityEvidence,
  ] = useState();
  const [issuedXertifexStandardEvidence, setissuedXertifexStandardEvidence] =
    useState();
  const [issuedXertifexPLUSEvidence, setissuedXertifexPLUSEvidence] =
    useState();
  const [issuedAMFORIBEPIEvidence, setissuedAMFORIBEPIEvidence] = useState();
  const [issuedDINENISOEvidence, setissuedDINENISOEvidence] = useState();
  const [issuedGrunerKnopfEvidence2, setissuedGrunerKnopfEvidence2] =
    useState();
  const [issuedIGEP2020Evidence, setissuedIGEP2020Evidence] = useState();
  const [issuedDINENISO45001Evidence, setissuedDINENISO45001Evidence] =
    useState();
  const [If33YesSocialAuditReport, setIf33YesSocialAuditReport] = useState();
  const navigate = useNavigate();
  const [factoryData, setFactoryData] = useState({
    id_supplier: localStorage.getItem("supplierId")
      ? localStorage.getItem("supplierId")
      : 0,
    is_lead_factory:
      localStorage.getItem("isLeadFactory") === "false" ? "yes" : "",
  });

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

    if (value === "other") {
      setCustomOption("");
    }
  };

  const connectToDatabase = async (e) => {
    e.preventDefault();

    document.documentElement.scrollTop = 0;
    setFactoryData({
      ...factoryData,
      id_supplier: localStorage.getItem("supplierId")
        ? localStorage.getItem("supplierId")
        : 0,
    });

    if (
      Number(factoryData.Qf38_PersonalStructureAdmin) +
        Number(factoryData.Qf39_PersonalStructureProduction) +
        Number(factoryData.Qf40_PersonalStructureRandD) +
        Number(factoryData.Qf41_PersonalStructureQA) +
        Number(factoryData.Qf42_PersonalStructureManagement) !==
      100
    ) {
      toast.error(`${supplierJson.find((f) => f.id === "percent1").q}`);
      return;
    }

    if (
      Number(factoryData.Qf43_WorkerStatisticMale) +
        Number(factoryData.Qf44_WorkerStatisticFemale) !==
      100
    ) {
      toast.error(`${supplierJson.find((f) => f.id === "percent2").q}`);
      return;
    }
    if (
      Number(factoryData.Qf45_WorkerStatisticLocal) +
        Number(factoryData.Qf46_WorkerStatisticMigrant) !==
      100
    ) {
      toast.error(`${supplierJson.find((f) => f.id === "percent3").q}`);
      return;
    }
    setLoading(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_NODE_MIDDLEWARE}`
      );
      submitValue = e.nativeEvent.submitter.attributes.value.value;
      localStorage.setItem("filemakerToken", response.data);

      if (factoryData.is_lead_factory === "yes") {
        // console.log("updateIsLeadFactory5");
        updateIsLeadFactory();
      }
      localStorage.setItem("isLeadFactory", true);
      postDataWithToken();
    } catch (error) {
      setLoading(false);
      console.error("Error occurred while connecting", error);
      toast.error("Unable to connect to Database", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
  const updateIsLeadFactory = async (token) => {
    if (localStorage.getItem("filemakerToken")) {
      try {
        const response = await axios.get(
          `${
            process.env.REACT_APP_FM_URL
          }/fmi/data/v2/databases/Registration/layouts/Factory/script/UpdateNoToLeadFactory?script.param=${localStorage.getItem(
            "supplierId"
          )}`,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`,
            },
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
              Authorization: `Bearer ${localStorage.getItem("filemakerToken")}`,
            },
          }
        );

        const data = response.data;

        recordId = Number(data.response.recordId);

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
        await Qf36_If33YesSocialAuditReportUpload();
        await logout();
        setLoading(false);
        if (submitValue === "finish") {
          toast.success(`${supplierJson.find((f) => f.id === "m1").q}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        } else {
          toast.success(`${supplierJson.find((f) => f.id === "m2").q}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
        setTimeout(() => {
          if (submitValue === "finish") {
            window.location = `${process.env.REACT_APP_PUBLIC_URL}/`;
          } else {
            window.location = `${process.env.REACT_APP_PUBLIC_URL}/factoryquestions`;
          }
        }, 3000);
      } catch (error) {
        setLoading(false);
        toast.error(
          "databse connected but data not submitted.check console for error",
          {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          }
        );
        console.error("Error fetching data:", error);
      }
    }
  };

  const issuedFairLaborEvidenceUpload = async (token) => {
    const upload = new FormData();
    upload.append("upload", issuedFairLaborAccreditationEvidence);
    if (
      localStorage.getItem("filemakerToken") &&
      issuedFairLaborAccreditationEvidence
    ) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qf49b_issuedFairLaborAccreditationEvidence/1`,
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qf50b_issuedFairStoneEvidence/1`,
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
    upload.append("upload", issuedGlobalOrganicEvidence);
    if (localStorage.getItem("filemakerToken") && issuedGlobalOrganicEvidence) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qf51b_IssuedGlobalOrganicEvidence/1`,
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qf52b_issuedGrunerKnopfEvidence/1`,
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qf53b_issuedIGEPEvidence/1`,
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
    upload.append("upload", issuedOEKOTEXEvidence);
    if (localStorage.getItem("filemakerToken") && issuedOEKOTEXEvidence) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qf54b_issuedOEKOTEXEvidence/1`,
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
    upload.append("upload", issuedSMETAEvidence);
    if (localStorage.getItem("filemakerToken") && issuedSMETAEvidence) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qf55b_issuedSMETAEvidence/1`,
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
    upload.append("upload", issuedSocialAccountabilityEvidence);
    if (
      localStorage.getItem("filemakerToken") &&
      issuedSocialAccountabilityEvidence
    ) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qf56b_issuedSocialAccountabilityEvidence/1`,
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
    upload.append("upload", issuedXertifexStandardEvidence);
    if (
      localStorage.getItem("filemakerToken") &&
      issuedXertifexStandardEvidence
    ) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qf57b_issuedXertifexStandardEvidence/1`,
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
    upload.append("upload", issuedXertifexPLUSEvidence);
    if (localStorage.getItem("filemakerToken") && issuedXertifexPLUSEvidence) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qf58b_issuedXertifexPLUSEvidence/1`,
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
    upload.append("upload", issuedAMFORIBEPIEvidence);
    if (localStorage.getItem("filemakerToken") && issuedAMFORIBEPIEvidence) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qf59b_issuedAMFORIBEPIEvidence/1`,
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
    upload.append("upload", issuedGrunerKnopfEvidence2);
    if (localStorage.getItem("filemakerToken") && issuedGrunerKnopfEvidence2) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qf60b_issuedDINENISOEvidence/1`,
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
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qf61b_issuedGrunerKnopfEvidence/1`,
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
    upload.append("upload", issuedIGEP2020Evidence);
    if (localStorage.getItem("filemakerToken") && issuedIGEP2020Evidence) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qf62b_issuedIGEP2020Evidence/1`,
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
  function convertDateFormat(inputDate) {
    const parts = inputDate.split("-");
    const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    return formattedDate;
  }
  const issuedDINENISO45001EvidenceUpload = async (token) => {
    const upload = new FormData();
    upload.append("upload", issuedDINENISO45001Evidence);
    if (localStorage.getItem("filemakerToken") && issuedDINENISO45001Evidence) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qf63b_issuedDINENISO45001Evidence/1`,
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
  const Qf36_If33YesSocialAuditReportUpload = async (token) => {
    const upload = new FormData();
    upload.append("upload", If33YesSocialAuditReport);
    if (localStorage.getItem("filemakerToken") && If33YesSocialAuditReport) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_FM_URL}/fmi/data/v2/databases/Registration/layouts/Factory/records/${recordId}/containers/Qf36_If33YesSocialAuditReportUpload/1`,
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

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  console.log(factoryData);
  return (
    <>
      <ClipLoader
        color="rgb(254, 193, 6)"
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {factoryJson && countryCode && supplierJson && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="form-sections p-5">
              <div className="form-field">
                <form id="factoryForm" onSubmit={connectToDatabase}>
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
                        {factoryJson.find((f) => f.id === "profile").q}
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
                      <div>
                        {showModal && (
                          <div className="modal">
                            <div className="modal-content">
                              <span
                                onClick={closeModal}
                                className="close-button"
                              >
                                &times;
                              </span>
                              <p>This is the modal content.</p>
                              <button onClick={closeModal}>Close</button>
                              <button>Another Button</button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <p>
                    <span style={{ color: "red" }}>*</span> Required
                  </p>
                  <h2>{factoryJson.find((f) => f.id === "heading").q}</h2>
                  <p style={{ marginBottom: "25px", fontSize: "18px" }}>
                    {factoryJson.find((f) => f.id === "heading-below").q}
                  </p>
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "1").id}:&nbsp;&nbsp;
                    </span>
                    <span>
                      {factoryJson.find((f) => f.id === "1").q}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qf1_FactoryName"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question 1b */}
                  <div
                    className="field-sections"
                    style={{
                      color:
                        localStorage.getItem("isLeadFactory") === "false"
                          ? "lightgrey"
                          : "black",
                    }}
                  >
                    <span>{factoryJson.find((f) => f.id === "1b").q} </span>
                    <span style={{ color: "red" }}>*</span>

                    <br />
                    <br />
                    <label>
                      <input
                        name="is_lead_factory"
                        disabled={
                          localStorage.getItem("isLeadFactory") === "false"
                        }
                        type="radio"
                        value="yes"
                        checked={factoryData.is_lead_factory === "yes"}
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label style={{ marginLeft: "1rem" }}>
                      <input
                        type="radio"
                        value="no"
                        disabled={
                          localStorage.getItem("isLeadFactory") === "false"
                        }
                        name="is_lead_factory"
                        checked={factoryData.is_lead_factory === "no"}
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 2 */}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "2").id}:&nbsp;&nbsp;
                    </span>
                    <span>
                      {factoryJson.find((f) => f.id === "2").q}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9-]/g, "");
                      }}
                      name="Qf2_FactoryBusinessLicenseNumber"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                    />
                  </div>
                  {/* Question 3 */}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "3").id}:&nbsp;&nbsp;
                    </span>
                    <span>
                      {factoryJson.find((f) => f.id === "3").q}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9-]/g, "");
                      }}
                      pattern="[0-]*"
                      name="Qf3_FactoryVATNumber"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  <h4 className="supplier-heading">Factory Address</h4>
                  {/* Question  4*/}
                  <div className="field-sections">
                    <span>4.&nbsp;&nbsp;</span>
                    <span>
                      {factoryJson.find((f) => f.id === "4a").q}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qf4a_Building"
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
                      name="Qf4b_Street"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question  5*/}
                  <div className="field-sections">
                    <span>5:&nbsp;&nbsp;</span>
                    <span>
                      {factoryJson.find((f) => f.id === "5a").q}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qf5a_Town"
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
                      name="Qf5b_City"
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
                      name="Qf5c_Province"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question  6*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "6").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "6").q}</span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qf6_PostCode"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                    />
                  </div>
                  {/* Question 7 */}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "7").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "7").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <select
                      style={{ width: "190px" }}
                      value={factoryData.Qf7_Country}
                      onChange={(e) => {
                        if (e.target.value.toLowerCase() !== "other") {
                          setFactoryData({
                            ...factoryData,
                            Qf7_Country: e.target.value,
                          });
                        }
                        setOtherFields({
                          ...otherFields,
                          q7Other: e.target.value,
                        });
                      }}
                      className="form-select"
                      aria-label="Default select example"
                      name="Qf7_Country"
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
                    {otherFields.q7Other === "Other" && (
                      <div className="input-group w-25 mt-2 otherWidth">
                        <input
                          onBlur={(e) => {
                            e.preventDefault();
                            const newCountry =
                              e.target.value.toLocaleLowerCase() !== "other";
                            if (newCountry) {
                              options.unshift(newCountry);
                              setOptions(options);
                              setFactoryData({
                                ...factoryData,
                                Qf7_Country: newCountry,
                              });
                              const selectElement = document.querySelector(
                                'select[name="Qf7_Country"]'
                              );
                              selectElement.value = newCountry;
                              setOtherFields({ ...otherFields, q7Other: "" });
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const newCountry =
                                e.target.value.toLocaleLowerCase() !== "other";
                              if (newCountry) {
                                options.unshift(newCountry);
                                setOptions(options);
                                setFactoryData({
                                  ...factoryData,
                                  Qf7_Country: newCountry,
                                });
                                const selectElement = document.querySelector(
                                  'select[name="Qf7_Country"]'
                                );
                                selectElement.value = newCountry;
                                setOtherFields({ ...otherFields, q7Other: "" });
                              }
                            }
                          }}
                          placeholder="If Other, please specify"
                        />
                      </div>
                    )}
                  </div>
                  {/* Question  8*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "8").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "8").q}</span>

                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qf8_RecommendedHotel"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                    />
                  </div>
                  <h4 className="supplier-heading">Factory Contact Details</h4>
                  {/* Question  9*/}
                  <div className="field-sections">
                    <span>9:&nbsp;&nbsp;</span>
                    <select
                      style={{ display: "inline-block", width: "18%" }}
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
                      {factoryJson.find((f) => f.id === "9b").q}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qf9b_ContactPersonFirstName"
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
                      name="Qf9c_ContactPersonLastName"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question  10*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "10").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "10").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qf10_ContactPersonPosition"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question  11*/}
                  <div className="field-sections">
                    <span>11:&nbsp;&nbsp;</span>
                    <span>
                      {factoryJson.find((f) => f.id === "11a").q}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <div className="form-group d-flex">
                      <select
                        onChange={(e) => {
                          setCountrycodePhone(e.target.value);
                        }}
                        style={{ width: "280px" }}
                        required
                        className="form-control countryCode me-1"
                        id="countrySelect"
                      >
                        <option value="" selected disabled>
                          Choose Options
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
                        name="Qf11a_Phone"
                        type="text"
                        required
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9-]/g,
                            ""
                          );
                        }}
                        pattern="[0-9]*"
                        onChange={(e) => {
                          setFactoryData({
                            ...factoryData,
                            Qf11a_Phone:
                              countrycodePhone + " " + e.target.value,
                          });
                        }}
                        class="form-control ms-1 phoneNumberInput"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
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
                        onChange={(e) => {
                          setCountrycodeCell(e.target.value);
                        }}
                        className="form-control countryCode me-1"
                        id="countrySelect"
                        required
                      >
                        <option value="" selected disabled>
                          Choose Options
                        </option>
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
                        type="text"
                        required
                        style={{ width: "280px" }}
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9-]/g,
                            ""
                          );
                        }}
                        pattern="[0-9]*"
                        name="Qf11b_CellPhone"
                        onChange={(e) => {
                          setFactoryData({
                            ...factoryData,
                            Qf11b_CellPhone:
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
                  {/* Question  12*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "12").id}:&nbsp;&nbsp;
                    </span>
                    <span>
                      {factoryJson.find((f) => f.id === "12").q}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="email"
                      name="Qf12_Email"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question  13*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "13").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "13").q} </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qf13_Website"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                    />
                  </div>
                  <h3 className="supplier-heading">Factory Location</h3>
                  {/* Question  14*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "14").id}:&nbsp;&nbsp;
                    </span>
                    <span>
                      {factoryJson.find((f) => f.id === "14").q}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="This value must be a number"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9-]/g, "");
                      }}
                      name="Qf14_CurrentLocationSince"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      minLength={4}
                      maxLength={4}
                      required
                    />
                  </div>
                  {/* Question  15*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "15").id}:&nbsp;&nbsp;
                    </span>
                    <span>
                      {factoryJson.find((f) => f.id === "15").q}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qf15_NumberFactoryBuildingLevel"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question  16*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "16").id}:&nbsp;&nbsp;
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
                        {factoryJson.find((f) => f.id === "17").id}:&nbsp;&nbsp;
                      </span>
                      <span>{factoryJson.find((f) => f.id === "17").q}</span>
                      <br />
                      <br />
                      <label>
                        <input
                          name="Qf17_If19YES"
                          type="radio"
                          value="yes"
                          checked={factoryData.Qf17_If19YES === "yes"}
                          onChange={handleChange}
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
                      {factoryJson.find((f) => f.id === "18").id}:&nbsp;&nbsp;
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
                        {factoryJson.find((f) => f.id === "19").id}:&nbsp;&nbsp;
                      </span>
                      <span>{factoryJson.find((f) => f.id === "19").q}</span>
                      <input
                        onChange={handleChange}
                        placeholder="This value must be a number"
                        type="text"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9-]/g,
                            ""
                          );
                        }}
                        name="Qf19_If21YES"
                        className="mt-3 outline-none w-100"
                        id="name-text"
                      />
                    </div>
                  )}
                  {/* Question  20*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "20").id}:&nbsp;&nbsp;
                    </span>
                    <span>
                      {factoryJson.find((f) => f.id === "20").q}
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
                      name="Qf20_PropertyTotalSize"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question  21*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "21").id}:&nbsp;&nbsp;
                    </span>
                    <span>
                      {factoryJson.find((f) => f.id === "21").q}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qf21_WarehouseTotalSize"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question  22*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "22").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "22").q}</span>
                    <span style={{ color: "red" }}>*</span>

                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qf22_ProductionSiteTotalSize"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  <h3 className="supplier-heading">Factory Information</h3>
                  {/* Question 23 */}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "23").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "23").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <input
                      onChange={handleChange}
                      placeholder="This value must be a number"
                      type="text"
                      name="Qf23_YearOfEstablishment"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      maxLength={4}
                      minLength={4}
                      required
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9-]/g, "");
                      }}
                    />
                  </div>
                  {/* Question  24*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "24").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "24").q}</span>
                    <input
                      onChange={handleChange}
                      placeholder="Enter your answer"
                      type="text"
                      name="Qf24_FactoryMainProduct"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                    />
                  </div>
                  {/* Question  25*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "25").id}:&nbsp;&nbsp;
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
                        e.target.value = e.target.value.replace(/[^0-9-]/g, "");
                      }}
                      pattern="[0-9]*"
                      name="Qf25_FactoryAnualCapacity"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      required
                    />
                  </div>
                  {/* Question  26*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "26").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "26").q} </span>
                    <input
                      onChange={handleChange}
                      placeholder="This value must be a number"
                      type="text"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9-]/g, "");
                      }}
                      pattern="[0-9]*"
                      name="Qf26_FactoryAnualTurnOver"
                      className="mt-3 outline-none w-100"
                      id="name-text"
                    />
                  </div>
                  {/* Question 27 */}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "27").id}:&nbsp;&nbsp;
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
                      style={{ width: "190px" }}
                      aria-label="Default select example"
                      name="Qf27_Ownership"
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

                    {otherFields.Q27Other === "Other" && (
                      <div className="input-group w-25 mt-2 otherWidth">
                        <input
                          onBlur={(e) => {
                            e.preventDefault();
                            const newOwnership = e.target.value;
                            if (newOwnership) {
                              ownerships.unshift(newOwnership);
                              setOwnerships(ownerships);
                              setFactoryData({
                                ...factoryData,
                                Qf27_Ownership: newOwnership,
                              });
                              const selectElement = document.querySelector(
                                'select[name="Qf27_Ownership"]'
                              );
                              selectElement.value = newOwnership;
                              setOtherFields({
                                ...otherFields,
                                Q27Other: "",
                              });
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const newOwnership = e.target.value;
                              if (newOwnership) {
                                ownerships.unshift(newOwnership);
                                setOwnerships([ownerships]);
                                setFactoryData({
                                  ...factoryData,
                                  Qf27_Ownership: newOwnership,
                                });
                                const selectElement = document.querySelector(
                                  'select[name="Qf27_Ownership"]'
                                );
                                selectElement.value = newOwnership;
                                setOtherFields({
                                  ...otherFields,
                                  Q27Other: "",
                                });
                              }
                            }
                          }}
                          type="text"
                          className="form-control w-25 rounded"
                          placeholder="If Other, please specify"
                          aria-label="Enter text..."
                          aria-describedby="basic-addon2"
                        />
                      </div>
                    )}
                  </div>
                  {/* Question  28*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "28").id}:&nbsp;&nbsp;
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
                      style={{ width: "37%" }}
                      className="form-select"
                      aria-label="Default select example"
                      name="Qf28_Subcontracting"
                    >
                      <option value="" disabled selected>
                        Choose Options{" "}
                      </option>
                      <option value="Yes - Finished Products">
                        Yes - Finished Products
                      </option>
                      <option value="Yes - Components/Parts of Products">
                        Yes - Components/Parts of Products
                      </option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  {/* Question  29*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "29").id}:&nbsp;&nbsp;
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
                      style={{ width: "31%" }}
                      className="form-select"
                      aria-label="Default select example"
                      name="Qf29_QualityManagementSystem"
                    >
                      <option value="" disabled selected>
                        Choose Options{" "}
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="Certified">Certified</option>
                      <option value="No">No</option>
                      <option value="Planned">Planned</option>
                    </select>
                  </div>
                  {/* Question  30*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "30").id}:&nbsp;&nbsp;
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
                        checked={
                          factoryData.Qf30_SocialComplainsAudit === "yes"
                        }
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
                          {factoryJson.find((f) => f.id === "31").id}
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
                        >
                          <option value="" disabled selected>
                            Choose Options
                          </option>
                          <option value="Western Europe">Western Europe</option>
                          <option value="SA8000">SA8000</option>
                          <option value="BSCI">BSCI / amfori</option>
                          <option value="WRAP">WRAP</option>
                          <option value="FLA">FLA</option>
                          <option value="ICIT">ICIT</option>
                          <option value="SMETA/SEDEX">SMETA / SEDEX</option>
                          {audits.map((audit) => (
                            <option key={audit} value={audit}>
                              {audit}
                            </option>
                          ))}
                          <option value="Other">Other</option>
                        </select>

                        {otherFields.Q31Other === "Other" && (
                          <div className="input-group w-25 mt-2 otherWidth">
                            <input
                              onBlur={(e) => {
                                e.preventDefault();
                                const newAudit = e.target.value;
                                if (newAudit) {
                                  audits.unshift(newAudit);
                                  setAudits(audits);
                                  setFactoryData({
                                    ...factoryData,
                                    Qf31_If33YESAuditType: newAudit,
                                  });
                                  const selectElement = document.querySelector(
                                    'select[name="Qf31_If33YESAuditType"]'
                                  );
                                  selectElement.value = newAudit;
                                  setOtherFields({
                                    ...otherFields,
                                    Q31Other: "",
                                  });
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  const newAudit = e.target.value;
                                  if (newAudit) {
                                    audits.unshift(newAudit);
                                    setAudits(audits);
                                    setFactoryData({
                                      ...factoryData,
                                      Qf31_If33YESAuditType: newAudit,
                                    });
                                    const selectElement =
                                      document.querySelector(
                                        'select[name="Qf31_If33YESAuditType"]'
                                      );
                                    selectElement.value = newAudit;
                                    setOtherFields({
                                      ...otherFields,
                                      Q31Other: "",
                                    });
                                  }
                                }
                              }}
                              type="text"
                              className="form-control w-25 rounded"
                              placeholder="If Other, please specify"
                              aria-label="Enter text..."
                              aria-describedby="basic-addon2"
                              name="Qf31_If33YESAuditType"
                              required
                            />
                          </div>
                        )}
                      </div>

                      {/* Question 32 */}
                      <div className="field-sections">
                        <span>
                          {factoryJson.find((f) => f.id === "32").id}
                          :&nbsp;&nbsp;
                        </span>
                        <span>{factoryJson.find((f) => f.id === "32").q}</span>
                        <input
                          name="Qf32_If33YESAuditResult"
                          placeholder="This value must be a number"
                          type="text"
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                          }}
                          pattern="[0-9]*"
                          onChange={handleChange}
                          className="mt-3 outline-none w-100"
                          id="name-text"
                          aria-describedby="emailHelp"
                        ></input>
                      </div>
                      {/* Question 33 */}
                      <div className="field-sections">
                        <span>
                          {factoryJson.find((f) => f.id === "33").id}
                          :&nbsp;&nbsp;
                        </span>
                        <span>{factoryJson.find((f) => f.id === "33").q}</span>
                        <DatePicker
                          className="date-style1"
                          selected={dateFields.Qf33_If33YESAuditDate}
                          dateFormat="dd/MM/yyyy"
                          onChange={(date) => {
                            const formattedDate =
                              moment(date).format("MM/DD/YYYY"); // Adjust the format as needed
                            setFactoryData({
                              ...factoryData,
                              Qf33_If33YESAuditDate: formattedDate,
                            });
                            setDatefields({
                              ...dateFields,
                              Qf33_If33YESAuditDate: date,
                            });
                          }}
                          // onChange={(date) => {
                          //   let parts = date
                          //     .toLocaleDateString(date)
                          //     .replace(/"/g, "")
                          //     .split("/");
                          //   let newDateString =
                          //     parts[1] + "/" + parts[0] + "/" + parts[2];
                          //   setFactoryData({
                          //     ...factoryData,
                          //     Qf33_If33YESAuditDate: newDateString,
                          //   });
                          //   setDatefields({
                          //     ...dateFields,
                          //     Qf33_If33YESAuditDate: date,
                          //   });
                          // }}
                        />
                      </div>

                      {/* Question 34 */}
                      <div className="field-sections">
                        <span>
                          {factoryJson.find((f) => f.id === "34").id}
                          :&nbsp;&nbsp;
                        </span>
                        <span>{factoryJson.find((f) => f.id === "34").q}</span>
                        <DatePicker
                          className="date-style2"
                          dateFormat="dd/MM/yyyy"
                          selected={dateFields.Qf34_If33YESAuditValidity}
                          // onChange={(date) => {
                          //   let parts = date
                          //     .toLocaleDateString(date)
                          //     .replace(/"/g, "")
                          //     .split("/");
                          //   let newDateString =
                          //     parts[1] + "/" + parts[0] + "/" + parts[2];

                          //   setFactoryData({
                          //     ...factoryData,
                          //     Qf34_If33YESAuditValidity: newDateString,
                          //   });
                          //   setDatefields({
                          //     ...dateFields,
                          //     Qf34_If33YESAuditValidity: date,
                          //   });
                          // }}
                          onChange={(date) => {
                            const formattedDate =
                              moment(date).format("MM/DD/YYYY"); // Adjust the format as needed
                            setFactoryData({
                              ...factoryData,
                              Qf34_If33YESAuditValidity: formattedDate,
                            });
                            setDatefields({
                              ...dateFields,
                              Qf34_If33YESAuditValidity: date,
                            });
                          }}
                        />
                      </div>
                      {/* Question  35*/}
                      <div className="field-sections">
                        <span>
                          {factoryJson.find((f) => f.id === "35").id}
                          :&nbsp;&nbsp;
                        </span>
                        <span>{factoryJson.find((f) => f.id === "35").q}</span>
                        <input
                          onChange={handleChange}
                          placeholder="Enter your answer"
                          type="text"
                          name="Qf35_If33YESAuditingCompany"
                          className="mt-3 outline-none w-100"
                          id="name-text"
                        />
                      </div>
                      {/* Question  36*/}
                      <div className="field-sections">
                        <span>
                          {factoryJson.find((f) => f.id === "36").id}
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
                                  setIf33YesSocialAuditReport(
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
                      {factoryJson.find((f) => f.id === "37").id}:&nbsp;&nbsp;
                    </span>
                    <span>
                      {factoryJson.find((f) => f.id === "37").q}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      name="Qf37_TotalNumberOfEmployees"
                      placeholder="This value must be a number"
                      type="text"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9-]/g, "");
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
                      {factoryJson.find((f) => f.id === "38").id}:&nbsp;&nbsp;
                    </span>
                    <span>
                      {factoryJson.find((f) => f.id === "38").q}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      name="Qf38_PersonalStructureAdmin"
                      placeholder="This value must be a number from 0 to 100"
                      type="text"
                      onBlur={() => {
                        if (
                          factoryData.Qf38_PersonalStructureAdmin &&
                          factoryData.Qf39_PersonalStructureProduction &&
                          factoryData.Qf40_PersonalStructureRandD &&
                          factoryData.Qf41_PersonalStructureQA &&
                          factoryData.Qf42_PersonalStructureManagement &&
                          Number(factoryData.Qf38_PersonalStructureAdmin) +
                            Number(
                              factoryData.Qf39_PersonalStructureProduction
                            ) +
                            Number(factoryData.Qf40_PersonalStructureRandD) +
                            Number(factoryData.Qf41_PersonalStructureQA) +
                            Number(
                              factoryData.Qf42_PersonalStructureManagement
                            ) !==
                            100
                        ) {
                          toast.error(
                            `${supplierJson.find((f) => f.id === "percent1").q}`
                          );
                          // factoryData.Qf38_PersonalStructureAdmin = "";
                          // factoryData.Qf39_PersonalStructureProduction = "";
                          // factoryData.Qf40_PersonalStructureRandD = "";
                          // factoryData.Qf41_PersonalStructureQA = "";
                          return;
                        }
                      }}
                      onInput={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        if (value < 0) e.target.value = "";
                        else if (value > 100) e.target.value = "";
                        else e.target.value = value;
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
                      {factoryJson.find((f) => f.id === "39").id}
                      :&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "39").q}</span>
                    <input
                      onBlur={() => {
                        if (
                          factoryData.Qf38_PersonalStructureAdmin &&
                          factoryData.Qf39_PersonalStructureProduction &&
                          factoryData.Qf40_PersonalStructureRandD &&
                          factoryData.Qf41_PersonalStructureQA &&
                          factoryData.Qf42_PersonalStructureManagement &&
                          Number(factoryData.Qf38_PersonalStructureAdmin) +
                            Number(
                              factoryData.Qf39_PersonalStructureProduction
                            ) +
                            Number(factoryData.Qf40_PersonalStructureRandD) +
                            Number(factoryData.Qf41_PersonalStructureQA) +
                            Number(
                              factoryData.Qf42_PersonalStructureManagement
                            ) !==
                            100
                        ) {
                          toast.error(
                            `${supplierJson.find((f) => f.id === "percent1").q}`
                          );
                          // factoryData.Qf38_PersonalStructureAdmin = "";
                          // factoryData.Qf39_PersonalStructureProduction = "";
                          // factoryData.Qf40_PersonalStructureRandD = "";
                          // factoryData.Qf41_PersonalStructureQA = "";
                          return;
                        }
                      }}
                      name="Qf39_PersonalStructureProduction"
                      placeholder="This value must be a number from 0 to 100"
                      type="text"
                      onInput={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        if (value < 0) e.target.value = "";
                        else if (value > 100) e.target.value = "";
                        else e.target.value = value;
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
                      {factoryJson.find((f) => f.id === "40").id}
                      :&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "40").q}</span>
                    <input
                      name="Qf40_PersonalStructureRandD"
                      placeholder="This value must be a number from 0 to 100"
                      type="text"
                      onBlur={() => {
                        if (
                          factoryData.Qf38_PersonalStructureAdmin &&
                          factoryData.Qf39_PersonalStructureProduction &&
                          factoryData.Qf40_PersonalStructureRandD &&
                          factoryData.Qf41_PersonalStructureQA &&
                          factoryData.Qf42_PersonalStructureManagement &&
                          Number(factoryData.Qf38_PersonalStructureAdmin) +
                            Number(
                              factoryData.Qf39_PersonalStructureProduction
                            ) +
                            Number(factoryData.Qf40_PersonalStructureRandD) +
                            Number(factoryData.Qf41_PersonalStructureQA) +
                            Number(
                              factoryData.Qf42_PersonalStructureManagement
                            ) !==
                            100
                        ) {
                          toast.error(
                            `${supplierJson.find((f) => f.id === "percent1").q}`
                          );

                          return;
                        }
                      }}
                      onInput={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        if (value < 0) e.target.value = "";
                        else if (value > 100) e.target.value = "";
                        else e.target.value = value;
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
                      {factoryJson.find((f) => f.id === "41").id}:&nbsp;&nbsp;
                    </span>
                    <span>
                      {factoryJson.find((f) => f.id === "41").q}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      name="Qf41_PersonalStructureQA"
                      placeholder="This value must be a number from 0 to 100"
                      type="text"
                      onInput={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        if (value < 0) e.target.value = "";
                        else if (value > 100) e.target.value = "";
                        else e.target.value = value;
                      }}
                      pattern="[0-9]*"
                      onBlur={() => {
                        if (
                          factoryData.Qf38_PersonalStructureAdmin &&
                          factoryData.Qf39_PersonalStructureProduction &&
                          factoryData.Qf40_PersonalStructureRandD &&
                          factoryData.Qf41_PersonalStructureQA &&
                          factoryData.Qf42_PersonalStructureManagement &&
                          Number(factoryData.Qf38_PersonalStructureAdmin) +
                            Number(
                              factoryData.Qf39_PersonalStructureProduction
                            ) +
                            Number(factoryData.Qf40_PersonalStructureRandD) +
                            Number(factoryData.Qf41_PersonalStructureQA) +
                            Number(
                              factoryData.Qf42_PersonalStructureManagement
                            ) !==
                            100
                        ) {
                          toast.error(
                            `${supplierJson.find((f) => f.id === "percent1").q}`
                          );

                          return;
                        }
                      }}
                      onChange={handleChange}
                      className="mt-3 outline-none w-100"
                      id="name-text"
                      aria-describedby="emailHelp"
                    ></input>
                  </div>
                  {/* Question  42*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "42").id}:&nbsp;&nbsp;
                    </span>
                    <span>
                      {factoryJson.find((f) => f.id === "42").q}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      name="Qf42_PersonalStructureManagement"
                      placeholder="This value must be a number from 0 to 100"
                      type="text"
                      onBlur={() => {
                        if (
                          factoryData.Qf38_PersonalStructureAdmin &&
                          factoryData.Qf39_PersonalStructureProduction &&
                          factoryData.Qf40_PersonalStructureRandD &&
                          factoryData.Qf41_PersonalStructureQA &&
                          factoryData.Qf42_PersonalStructureManagement &&
                          Number(factoryData.Qf38_PersonalStructureAdmin) +
                            Number(
                              factoryData.Qf39_PersonalStructureProduction
                            ) +
                            Number(factoryData.Qf40_PersonalStructureRandD) +
                            Number(factoryData.Qf41_PersonalStructureQA) +
                            Number(
                              factoryData.Qf42_PersonalStructureManagement
                            ) !==
                            100
                        ) {
                          toast.error(
                            `${supplierJson.find((f) => f.id === "percent1").q}`
                          );

                          return;
                        }
                      }}
                      onInput={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        if (value < 0) e.target.value = "";
                        else if (value > 100) e.target.value = "";
                        else e.target.value = value;
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
                      {factoryJson.find((f) => f.id === "43").id}:&nbsp;&nbsp;
                    </span>
                    <span>
                      {factoryJson.find((f) => f.id === "43").q}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      name="Qf43_WorkerStatisticMale"
                      placeholder="This value must be a number from 0 to 100"
                      type="text"
                      onBlur={() => {
                        if (
                          factoryData.Qf43_WorkerStatisticMale &&
                          factoryData.Qf44_WorkerStatisticFemale &&
                          Number(factoryData.Qf43_WorkerStatisticMale) +
                            Number(factoryData.Qf44_WorkerStatisticFemale) !==
                            100
                        ) {
                          toast.error(
                            `${supplierJson.find((f) => f.id === "percent2").q}`
                          );
                          // factoryData.Qf43_WorkerStatisticMale = "";
                          // factoryData.Qf44_WorkerStatisticFemale = "";
                          return;
                        }
                      }}
                      onInput={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        if (value < 0) e.target.value = "";
                        else if (value > 100) e.target.value = "";
                        else e.target.value = value;
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
                      {factoryJson.find((f) => f.id === "44").id}:&nbsp;&nbsp;
                    </span>
                    <span>
                      {factoryJson.find((f) => f.id === "44").q}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      name="Qf44_WorkerStatisticFemale"
                      placeholder="This value must be a number from 0 to 100"
                      type="text"
                      onBlur={() => {
                        if (
                          factoryData.Qf43_WorkerStatisticMale &&
                          factoryData.Qf44_WorkerStatisticFemale &&
                          Number(factoryData.Qf43_WorkerStatisticMale) +
                            Number(factoryData.Qf44_WorkerStatisticFemale) !==
                            100
                        ) {
                          toast.error(
                            `${supplierJson.find((f) => f.id === "percent2").q}`
                          );
                          // factoryData.Qf43_WorkerStatisticMale = "";
                          // factoryData.Qf44_WorkerStatisticFemale = "";
                          return;
                        }
                      }}
                      onInput={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        if (value < 0) e.target.value = "";
                        else if (value > 100) e.target.value = "";
                        else e.target.value = value;
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
                      {factoryJson.find((f) => f.id === "45").id}:&nbsp;&nbsp;
                    </span>
                    <span>
                      {factoryJson.find((f) => f.id === "45").q}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      name="Qf45_WorkerStatisticLocal"
                      onBlur={() => {
                        if (
                          factoryData.Qf45_WorkerStatisticLocal &&
                          factoryData.Qf46_WorkerStatisticMigrant &&
                          Number(factoryData.Qf45_WorkerStatisticLocal) +
                            Number(factoryData.Qf46_WorkerStatisticMigrant) !==
                            100
                        ) {
                          toast.error(
                            `${supplierJson.find((f) => f.id === "percent3").q}`
                          );
                          // factoryData.Qf45_WorkerStatisticLocal = "";
                          // factoryData.Qf46_WorkerStatisticMigrant = "";
                          return;
                        }
                      }}
                      placeholder="This value must be a number from 0 to 100"
                      type="text"
                      onInput={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        if (value < 0) e.target.value = "";
                        else if (value > 100) e.target.value = "";
                        else e.target.value = value;
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
                      {factoryJson.find((f) => f.id === "46").id}:&nbsp;&nbsp;
                    </span>
                    <span>
                      {factoryJson.find((f) => f.id === "46").q}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      onBlur={() => {
                        if (
                          factoryData.Qf45_WorkerStatisticLocal &&
                          factoryData.Qf46_WorkerStatisticMigrant &&
                          Number(factoryData.Qf45_WorkerStatisticLocal) +
                            Number(factoryData.Qf46_WorkerStatisticMigrant) !==
                            100
                        ) {
                          // factoryData.Qf45_WorkerStatisticLocal = "";
                          // factoryData.Qf46_WorkerStatisticMigrant = "";
                          toast.error(
                            `${supplierJson.find((f) => f.id === "percent3").q}`
                          );
                          return;
                        }
                      }}
                      name="Qf46_WorkerStatisticMigrant"
                      placeholder="This value must be a number from 0 to 100"
                      type="text"
                      onInput={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        if (value < 0) e.target.value = "";
                        else if (value > 100) e.target.value = "";
                        else e.target.value = value;
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
                      {factoryJson.find((f) => f.id === "47").id}:&nbsp;&nbsp;
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
                        {factoryJson.find((f) => f.id === "48").id}:&nbsp;&nbsp;
                      </span>
                      <span>
                        {factoryJson.find((f) => f.id === "48").q}
                        <span style={{ color: "red" }}>*</span>
                      </span>
                      <input
                        onChange={handleChange}
                        placeholder="This value must be a number"
                        type="text"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9-]/g,
                            ""
                          );
                        }}
                        pattern="[0-9]*"
                        name="Qf48_If50YESMax"
                        className="mt-3 outline-none w-100"
                        id="name-text"
                        required
                      />
                    </div>
                  )}
                  {/* Question 49 */}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "49").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "49").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf49a_issuedFairLaborAccreditationEvidence"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf49a_issuedFairLaborAccreditationEvidence ===
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
                        name="Qf49a_issuedFairLaborAccreditationEvidence"
                        checked={
                          factoryData.Qf49a_issuedFairLaborAccreditationEvidence ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>

                    <br />

                    <div>
                      {factoryData.Qf49a_issuedFairLaborAccreditationEvidence ===
                        "yes" && (
                        <div className="field-sections">
                          <br />
                          <label className="file-input-button-upload">
                            <input
                              name="Qf49b_issuedFairLaborAccreditationEvidence"
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
                                  setissuedFairLaborAccreditationEvidence(
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
                                display: issuedFairLaborAccreditationEvidence
                                  ? "none"
                                  : "inline-block",
                              }}
                            />
                            <span className="file-input-button-label">
                              {issuedFairLaborAccreditationEvidence
                                ? `Uploaded file: ${issuedFairLaborAccreditationEvidence.name}`
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
                      {factoryJson.find((f) => f.id === "50").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "50").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf50a_issuedFairStoneEvidence"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf50a_issuedFairStoneEvidence === "yes"
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
                        name="Qf50a_issuedFairStoneEvidence"
                        checked={
                          factoryData.Qf50a_issuedFairStoneEvidence === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>

                    <br />

                    <div>
                      {factoryData.Qf50a_issuedFairStoneEvidence === "yes" && (
                        <div className="field-sections">
                          <br />
                          <label className="file-input-button-upload">
                            <input
                              name="Qf50b_issuedFairStoneEvidence"
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
                                  setissuedFairStoneEvidence(e.target.files[0]);
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
                  {/* Question  51*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "51").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "51").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf51a_issuedGlobalOrganicEvidence"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf51a_issuedGlobalOrganicEvidence ===
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
                        name="Qf51a_issuedGlobalOrganicEvidence"
                        checked={
                          factoryData.Qf51a_issuedGlobalOrganicEvidence === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>

                    <br />

                    <div>
                      {factoryData.Qf51a_issuedGlobalOrganicEvidence ===
                        "yes" && (
                        <div className="field-sections">
                          <br />
                          <label className="file-input-button-upload">
                            <input
                              name="Qf51b_issuedGlobalOrganicEvidence"
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
                                  setissuedGlobalOrganicEvidence(
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
                                display: issuedGlobalOrganicEvidence
                                  ? "none"
                                  : "inline-block",
                              }}
                            />
                            <span className="file-input-button-label">
                              {issuedGlobalOrganicEvidence
                                ? `Uploaded file: ${issuedGlobalOrganicEvidence.name}`
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
                      {factoryJson.find((f) => f.id === "52").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "52").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf52a_issuedGrunerKnopfEvidence"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf52a_issuedGrunerKnopfEvidence === "yes"
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
                        name="Qf52a_issuedGrunerKnopfEvidence"
                        checked={
                          factoryData.Qf52a_issuedGrunerKnopfEvidence === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>

                    <br />

                    <div>
                      {factoryData.Qf52a_issuedGrunerKnopfEvidence ===
                        "yes" && (
                        <div className="field-sections">
                          <br />
                          <label className="file-input-button-upload">
                            <input
                              name="Qf52b_issuedGrunerKnopfEvidence"
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
                                  setissuedGrunerKnopfEvidence(
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
                  {/* Question  53*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "53").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "53").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf53a_issuedIGEPEvidence"
                        type="radio"
                        value="yes"
                        checked={factoryData.Qf53a_issuedIGEPEvidence === "yes"}
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label style={{ marginLeft: "1rem" }}>
                      <input
                        required
                        type="radio"
                        value="no"
                        name="Qf53a_issuedIGEPEvidence"
                        checked={factoryData.Qf53a_issuedIGEPEvidence === "no"}
                        onChange={handleChange}
                      />
                      No
                    </label>

                    <br />

                    <div>
                      {factoryData.Qf53a_issuedIGEPEvidence === "yes" && (
                        <div className="field-sections">
                          <br />
                          <label className="file-input-button-upload">
                            <input
                              name="Qf53b_issuedIGEPEvidence"
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
                                  setissuedIGEPEvidence(e.target.files[0]);
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
                  {/* Question  54*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "54").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "54").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf54a_issuedOEKOTEXEvidence"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf54a_issuedOEKOTEXEvidence === "yes"
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
                        name="Qf54a_issuedOEKOTEXEvidence"
                        checked={
                          factoryData.Qf54a_issuedOEKOTEXEvidence === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>

                    <br />

                    <div>
                      {factoryData.Qf54a_issuedOEKOTEXEvidence === "yes" && (
                        <div className="field-sections">
                          <br />
                          <label className="file-input-button-upload">
                            <input
                              name="Qf54b_issuedOEKOTEXEvidence"
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
                                  setissuedOEKOTEXEvidence(e.target.files[0]);
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
                                display: issuedOEKOTEXEvidence
                                  ? "none"
                                  : "inline-block",
                              }}
                            />
                            <span className="file-input-button-label">
                              {issuedOEKOTEXEvidence
                                ? `Uploaded file: ${issuedOEKOTEXEvidence.name}`
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
                      {factoryJson.find((f) => f.id === "55").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "55").q} </span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf55a_issuedSMETAEvidence"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf55a_issuedSMETAEvidence === "yes"
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
                        name="Qf55a_issuedSMETAEvidence"
                        checked={factoryData.Qf55a_issuedSMETAEvidence === "no"}
                        onChange={handleChange}
                      />
                      No
                    </label>

                    <br />

                    <div>
                      {factoryData.Qf55a_issuedSMETAEvidence === "yes" && (
                        <div className="field-sections">
                          <br />
                          <label className="file-input-button-upload">
                            <input
                              name="Qf55b_issuedSMETAEvidence"
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
                                  setissuedSMETAEvidence(e.target.files[0]);
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
                                display: issuedSMETAEvidence
                                  ? "none"
                                  : "inline-block",
                              }}
                            />
                            <span className="file-input-button-label">
                              {issuedSMETAEvidence
                                ? `Uploaded file: ${issuedSMETAEvidence.name}`
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
                      {factoryJson.find((f) => f.id === "56").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "56").q} </span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf56a_issuedSocialAccountabilityEvidence"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf56a_issuedSocialAccountabilityEvidence ===
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
                        name="Qf56a_issuedSocialAccountabilityEvidence"
                        checked={
                          factoryData.Qf56a_issuedSocialAccountabilityEvidence ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>

                    <br />

                    <div>
                      {factoryData.Qf56a_issuedSocialAccountabilityEvidence ===
                        "yes" && (
                        <div className="field-sections">
                          <br />
                          <label className="file-input-button-upload">
                            <input
                              name="Qf56b_issuedSocialAccountabilityEvidence"
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
                                  setissuedSocialAccountabilityEvidence(
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
                                display: issuedSocialAccountabilityEvidence
                                  ? "none"
                                  : "inline-block",
                              }}
                            />
                            <span className="file-input-button-label">
                              {issuedSocialAccountabilityEvidence
                                ? `Uploaded file: ${issuedSocialAccountabilityEvidence.name}`
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
                      {factoryJson.find((f) => f.id === "57").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "57").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf57a_issuedXertifexStandardEvidence"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf57a_issuedXertifexStandardEvidence ===
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
                        name="Qf57a_issuedXertifexStandardEvidence"
                        checked={
                          factoryData.Qf57a_issuedXertifexStandardEvidence ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>

                    <br />

                    <div>
                      {factoryData.Qf57a_issuedXertifexStandardEvidence ===
                        "yes" && (
                        <div className="field-sections">
                          <br />
                          <label className="file-input-button-upload">
                            <input
                              name="Qf57b_issuedXertifexStandardEvidence"
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
                                  setissuedXertifexStandardEvidence(
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
                                display: issuedXertifexStandardEvidence
                                  ? "none"
                                  : "inline-block",
                              }}
                            />
                            <span className="file-input-button-label">
                              {issuedXertifexStandardEvidence
                                ? `Uploaded file: ${issuedXertifexStandardEvidence.name}`
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
                      {factoryJson.find((f) => f.id === "58").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "58").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf58a_issuedXertifexPLUSEvidence"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf58a_issuedXertifexPLUSEvidence === "yes"
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
                        name="Qf58a_issuedXertifexPLUSEvidence"
                        checked={
                          factoryData.Qf58a_issuedXertifexPLUSEvidence === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>

                    <br />

                    <div>
                      {factoryData.Qf58a_issuedXertifexPLUSEvidence ===
                        "yes" && (
                        <div className="field-sections">
                          <br />
                          <label className="file-input-button-upload">
                            <input
                              name="Qf58b_issuedXertifexPLUSEvidence"
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
                                  setissuedXertifexPLUSEvidence(
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
                                display: issuedXertifexPLUSEvidence
                                  ? "none"
                                  : "inline-block",
                              }}
                            />
                            <span className="file-input-button-label">
                              {issuedXertifexPLUSEvidence
                                ? `Uploaded file: ${issuedXertifexPLUSEvidence.name}`
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
                      {factoryJson.find((f) => f.id === "59").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "59").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf59a_issuedAMFORIBEPIEvidence"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf59a_issuedAMFORIBEPIEvidence === "yes"
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
                        name="Qf59a_issuedAMFORIBEPIEvidence"
                        checked={
                          factoryData.Qf59a_issuedAMFORIBEPIEvidence === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>

                    <br />

                    <div>
                      {factoryData.Qf59a_issuedAMFORIBEPIEvidence === "yes" && (
                        <div className="field-sections">
                          <br />
                          <label className="file-input-button-upload">
                            <input
                              name="Qf59b_issuedAMFORIBEPIEvidence"
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
                                  setissuedAMFORIBEPIEvidence(
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
                  {/* Question  60*/}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "60").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "60").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf60a_issuedDINENISOEvidence"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf60a_issuedDINENISOEvidence === "yes"
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
                        name="Qf60a_issuedDINENISOEvidence"
                        checked={
                          factoryData.Qf60a_issuedDINENISOEvidence === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>

                    <br />

                    <div>
                      {factoryData.Qf60a_issuedDINENISOEvidence === "yes" && (
                        <div className="field-sections">
                          <br />
                          <label className="file-input-button-upload">
                            <input
                              name="Qf60b_issuedDINENISOEvidence"
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
                                  setissuedDINENISOEvidence(e.target.files[0]);
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
                                display: issuedDINENISOEvidence
                                  ? "none"
                                  : "inline-block",
                              }}
                            />
                            <span className="file-input-button-label">
                              {issuedDINENISOEvidence
                                ? `Uploaded file: ${issuedDINENISOEvidence.name}`
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
                      {factoryJson.find((f) => f.id === "61").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "61").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf61a_issuedGrunerKnopfEvidence"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf61a_issuedGrunerKnopfEvidence === "yes"
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
                        name="Qf61a_issuedGrunerKnopfEvidence"
                        checked={
                          factoryData.Qf61a_issuedGrunerKnopfEvidence === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>

                    <br />

                    <div>
                      {factoryData.Qf61a_issuedGrunerKnopfEvidence ===
                        "yes" && (
                        <div className="field-sections">
                          <br />
                          <label className="file-input-button-upload">
                            <input
                              name="Qf61b_issuedGrunerKnopfEvidence"
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
                                  setissuedGrunerKnopfEvidence2(
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
                                display: issuedGrunerKnopfEvidence2
                                  ? "none"
                                  : "inline-block",
                              }}
                            />
                            <span className="file-input-button-label">
                              {issuedGrunerKnopfEvidence2
                                ? `Uploaded file: ${issuedGrunerKnopfEvidence2.name}`
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
                      {factoryJson.find((f) => f.id === "62").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "62").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf62a_issuedIGEP2020Evidence"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf62a_issuedIGEP2020Evidence === "yes"
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
                        name="Qf62a_issuedIGEP2020Evidence"
                        checked={
                          factoryData.Qf62a_issuedIGEP2020Evidence === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>

                    <br />

                    <div>
                      {factoryData.Qf62a_issuedIGEP2020Evidence === "yes" && (
                        <div className="field-sections">
                          <br />
                          <label className="file-input-button-upload">
                            <input
                              name="Qf62b_issuedIGEP2020Evidence"
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
                                  setissuedIGEP2020Evidence(e.target.files[0]);
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
                                display: issuedIGEP2020Evidence
                                  ? "none"
                                  : "inline-block",
                              }}
                            />
                            <span className="file-input-button-label">
                              {issuedIGEP2020Evidence
                                ? `Uploaded file: ${issuedIGEP2020Evidence.name}`
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
                      {factoryJson.find((f) => f.id === "63").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "63").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf63a_issuedDINENISO45001Evidence"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf63a_issuedDINENISO45001Evidence ===
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
                        name="Qf63a_issuedDINENISO45001Evidence"
                        checked={
                          factoryData.Qf63a_issuedDINENISO45001Evidence === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>

                    <br />

                    <div>
                      {factoryData.Qf63a_issuedDINENISO45001Evidence ===
                        "yes" && (
                        <div className="field-sections">
                          <br />
                          <label className="file-input-button-upload">
                            <input
                              name="Qf63b_issuedDINENISO45001Evidence"
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
                                  setissuedDINENISO45001Evidence(
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
                  {/* Question 64 */}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "64").id} :&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "64").q} </span>
                    <span style={{ color: "red" }}>*</span>

                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "65").id} :&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "65").q} </span>
                    <span style={{ color: "red" }}>*</span>

                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "66").id} :&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "66").q} </span>
                    <span style={{ color: "red" }}>*</span>

                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "67").id} :&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "67").q} </span>
                    <span style={{ color: "red" }}>*</span>

                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "68").id} :&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "68").q} </span>
                    <span style={{ color: "red" }}>*</span>

                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "69").id} :&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "69").q} </span>
                    <span style={{ color: "red" }}>*</span>

                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf69_Under18PerformWorkUnderWater"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf69_Under18PerformWorkUnderWater ===
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
                      {factoryJson.find((f) => f.id === "70").id} :&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "70").q} </span>
                    <span style={{ color: "red" }}>*</span>

                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "71").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "71").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "72").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "72").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
                        type="radio"
                        value="no"
                        name="Qf72_Under18HandleHeavyLoad"
                        checked={
                          factoryData.Qf72_Under18HandleHeavyLoad === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 73 */}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "73").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "73").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "74").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "74").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "75").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "75").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "76").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "76").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "77").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "77").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "78").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "78").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
                        type="radio"
                        value="no"
                        name="Qf78_WorkPerformedPenaltyTheratened"
                        checked={
                          factoryData.Qf78_WorkPerformedPenaltyTheratened ===
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
                      {factoryJson.find((f) => f.id === "79").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "79").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "80").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "80").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf80_RetainOrignalORCopy"
                        type="radio"
                        value="yes"
                        checked={factoryData.Qf80_RetainOrignalORCopy === "yes"}
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label style={{ marginLeft: "1rem" }}>
                      <input
                        required
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
                      {factoryJson.find((f) => f.id === "81").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "81").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
                        type="radio"
                        value="no"
                        name="Qf81_ImposePenaltiesOnYourEmployees"
                        checked={
                          factoryData.Qf81_ImposePenaltiesOnYourEmployees ===
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
                      {factoryJson.find((f) => f.id === "82").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "82").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf82_EmployeesSoDeepInDept"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf82_EmployeesSoDeepInDept === "yes"
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
                        name="Qf82_EmployeesSoDeepInDept"
                        checked={
                          factoryData.Qf82_EmployeesSoDeepInDept === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 83 */}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "83").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "83").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "84").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "84").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "85").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "85").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "86").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "86").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "87").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "87").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf87_HealthAndSafetyPolicy"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf87_HealthAndSafetyPolicy === "yes"
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
                        name="Qf87_HealthAndSafetyPolicy"
                        checked={
                          factoryData.Qf87_HealthAndSafetyPolicy === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 88 */}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "88").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "88").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "89").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "89").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf89_HighAltitudesConfinedSpaces"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf89_HighAltitudesConfinedSpaces === "yes"
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
                      {factoryJson.find((f) => f.id === "90").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "90").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
                        type="radio"
                        value="no"
                        name="Qf90_HazardousAndBiologicalSubstances"
                        checked={
                          factoryData.Qf90_HazardousAndBiologicalSubstances ===
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
                      {factoryJson.find((f) => f.id === "91").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "91").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "92").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "92").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "93").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "93").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf93_EquipmentsEmergenciesChecked"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf93_EquipmentsEmergenciesChecked ===
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
                      {factoryJson.find((f) => f.id === "94").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "94").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "95").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "95").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf95_CompanyOffersProvideFeedBack"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf95_CompanyOffersProvideFeedBack ===
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
                      {factoryJson.find((f) => f.id === "96").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "96").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "97").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "97").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "98").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "98").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf98_BonusesNotMemberUnion"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf98_BonusesNotMemberUnion === "yes"
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
                        name="Qf98_BonusesNotMemberUnion"
                        checked={
                          factoryData.Qf98_BonusesNotMemberUnion === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 99 */}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "99").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "99").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "100").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "100").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "101").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "101").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf101_StatutoryMinimumWageCountryYouWork"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf101_StatutoryMinimumWageCountryYouWork ===
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
                        name="Qf101_StatutoryMinimumWageCountryYouWork"
                        checked={
                          factoryData.Qf101_StatutoryMinimumWageCountryYouWork ===
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
                      {factoryJson.find((f) => f.id === "102").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "102").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "103").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "103").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "104").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "104").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "105").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "105").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "106").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "106").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "107").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "107").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
                        type="radio"
                        value="no"
                        name="Qf107_AcquiredForestLandWaterBodies"
                        checked={
                          factoryData.Qf107_AcquiredForestLandWaterBodies ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {/* Question 108 */}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "108").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "108").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "109").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "109").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "110").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "110").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf110_CompanyDefineCriteria"
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
                        required
                        type="radio"
                        value="no"
                        name="Qf110_CompanyDefineCriteria"
                        checked={
                          factoryData.Qf110_CompanyDefineCriteria === "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>{" "}
                  {/* Question 111 */}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "111").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "111").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "112").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "112").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf112_InstructionsPrecautionsToAirSoilWater"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf112_InstructionsPrecautionsToAirSoilWater ===
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
                        name="Qf112_InstructionsPrecautionsToAirSoilWater"
                        checked={
                          factoryData.Qf112_InstructionsPrecautionsToAirSoilWater ===
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
                      {factoryJson.find((f) => f.id === "113").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "113").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "114").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "114").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
                        type="radio"
                        value="no"
                        name="Qf114_PublishReportGoalsAndProgress"
                        checked={
                          factoryData.Qf114_PublishReportGoalsAndProgress ===
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
                      {factoryJson.find((f) => f.id === "115").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "115").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
                        type="radio"
                        value="no"
                        name="Qf115_BusinessGeneratesHazardousWithRadioactiveSubstances"
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
                      {factoryJson.find((f) => f.id === "116").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "116").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "117").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "117").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "118").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "118").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "119").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "119").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf119_PersistentOrganicPollutants"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf119_PersistentOrganicPollutants ===
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
                      {factoryJson.find((f) => f.id === "120").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "120").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "121").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "121").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
                        name="Qf121_ConfirmNotUseSubstanceListed"
                        type="radio"
                        value="yes"
                        checked={
                          factoryData.Qf121_ConfirmNotUseSubstanceListed ===
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
                        name="Qf121_ConfirmNotUseSubstanceListed"
                        checked={
                          factoryData.Qf121_ConfirmNotUseSubstanceListed ===
                          "no"
                        }
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                  {factoryData.Qf121_ConfirmNotUseSubstanceListed === "no" && (
                    <div className="field-sections">
                      <span>122.&nbsp;&nbsp;</span>
                      <span>
                        {factoryJson.find((f) => f.id === "122").q}{" "}
                        <span style={{ color: "red" }}>*</span>
                      </span>
                      <input
                        onChange={handleChange}
                        placeholder="Enter your answer"
                        type="text"
                        name="Qf122_ListedAnnexIRegulationDoYouUse"
                        className="mt-3 outline-none w-100"
                        id="name-text"
                      />
                    </div>
                  )}
                  <div className="field-sections">
                    <span>
                      {factoryJson.find((f) => f.id === "123").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "123").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      {factoryJson.find((f) => f.id === "124").id}:&nbsp;&nbsp;
                    </span>
                    <span>{factoryJson.find((f) => f.id === "124").q}</span>
                    <span style={{ color: "red" }}>*</span>
                    <br />
                    <br />
                    <label>
                      <input
                        required
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
                        required
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
                      accurate, up to date and correct and that the documents
                      submitted along with these forms are genuine. We also
                      understand that in the event of our information being
                      found false or incorrect at any stage. We reserve the
                      right to conduct 3rd party audits to access and verify our
                      provided information.
                    </p>
                  </span>
                  <div style={{ display: "flex" }}>
                    <span>
                      <div className="container">
                        <div className="row" style={{ marginLeft: "-2%" }}>
                          <div className="col-sm">
                            <p
                              style={{ display: "flex" }}
                              className="review-checkbox"
                            >
                              {" "}
                              <input
                                className="reviewCheckbox"
                                type="checkbox"
                                checked={isCheckedReview}
                                onChange={(e) => {
                                  setIsCheckedReview(e.target.checked);
                                }}
                              />{" "}
                              <p>
                                We review all the pre-filled data and confirm
                                there is no change.
                              </p>
                            </p>
                          </div>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          {/*{" "} */}
                        </div>
                      </div>
                    </span>
                    <div className="col-sm" style={{ marginLeft: "-5%" }}>
                      <p
                        style={{ display: "flex" }}
                        className="paragraph-signature"
                      >
                        <p>
                          Signature (To sign, please type your full name here){" "}
                          <span style={{ color: "red" }}>*</span>
                        </p>
                        <input
                          type="text"
                          name="Fectory_Signature"
                          onChange={handleChange}
                          style={{ width: "150px", height: "24px" }}
                          required
                        />
                      </p>
                    </div>
                  </div>
                  <div className="container" style={{ padding: "0px" }}>
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
                              isChecked && isCheckedReview
                                ? "rgb(254, 193, 6)"
                                : "lightgrey",
                          }}
                        >
                          Submit & Finish
                        </button>
                      </div>
                      <div className="col-sm submit-factorynew">
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
                            marginLeft: "21px",
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

export default FactoryQuestions;
