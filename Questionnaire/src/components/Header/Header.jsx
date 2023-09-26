import React, { useState } from "react";
import "./header.css";
import { BiFolder } from "react-icons/bi";
import { BsStar } from "react-icons/bs";
import { GrRedo } from "react-icons/gr";
import { GrRevert } from "react-icons/gr";
import { FiMoreVertical } from "react-icons/fi";
import googleLogo from "../Header/googleLogo.png";
import abdul from "../Header/unnamed.jpg";
const Header = () => {
  const [isDivOpen, setIsDivOpen] = useState(false);

  const handleButtonClick = () => {
    // Toggle the state of isDivOpen (true becomes false, and false becomes true)
    setIsDivOpen(!isDivOpen);
  };
  return (
    <>
      <div className="main-div header-top">
        <div className="header d-flex bg-white justify-content-between py-3 row">
          <div className="header-left d-flex col-12 col-sm-5 col-md-4 col-lg-3 col-xl-3 justify-content-between ">
            <div>
              <img src={googleLogo} alt="" style={{ width: "25px" }} />
            </div>
            <div className="contact-info">Contact Information</div>
            <div className="move-to-folder hover-container">
              <BiFolder className="icon move-folder " />
              <div className="hover-texts">move to folder</div>
            </div>
            <div className="start hover-container">
              <BsStar className="icon" />
              <div className="hover-text">Star</div>
            </div>
          </div>
          <div
            className="header-right d-flex col-12 col-sm-5 col-md-4 col-lg-3 col-xl-3 justify-content-between "
            style={{ alignItems: "center" }}
          >
            <div className="hover-container">
              <GrRevert className="icon" />
              <div className="hover-text">Undo</div>
            </div>
            <div className="hover-container">
              <GrRedo className="icon" />
              <div className="hover-text">Redo</div>
            </div>
            <div className="">
              <button className="send-btn">Send</button>
            </div>
            <div className="hover-container">
              <FiMoreVertical className="icon" />
              <div className="hover-text">More</div>
            </div>
            <div className="right-logo hover-container">
              <img
                className="profile"
                src={abdul}
                alt=""
                onClick={handleButtonClick}
              />
              {isDivOpen && (
                <div
                  className="isDivOpen"
                  style={{
                    border: "1px solid #000",
                    padding: "10px",
                    marginTop: "10px",
                  }}
                >
                  {/* Content of the div */}
                  This is the open div content.
                  <button>Button Below</button>
                </div>
              )}

              <div className="hover-texts" style={{ textAlign: "left" }}>
                <p>Google Account</p>
                <p>Name</p>
                <p>Gmail</p>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Header;
