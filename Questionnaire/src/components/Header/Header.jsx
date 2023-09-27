import React from "react";
import "./header.css";
import { BiFolder } from "react-icons/bi";
import { BsStar } from "react-icons/bs";
import { GrRedo } from "react-icons/gr";
import { GrRevert } from "react-icons/gr";
import { FiMoreVertical } from "react-icons/fi";
import googleLogo from "../Header/googleLogo.png";
import abdul from "../Header/unnamed.jpg";
const Header = () => {
  return (
    <>
      <div className="main-div header-top">
        <div className="header d-flex bg-white justify-content-between py-3 row">
          <div className="header-left d-flex col-12 col-sm-5 col-md-4 col-lg-3 col-xl-3 justify-content-between ">
            <div>
              <img src={googleLogo} alt="" style={{ width: "25px" }} />
            </div>
            <div className="contact-info">Contact Information</div>
            <div className="move-to-folder ">
              <BiFolder className="icon" />
            </div>
            <div className="start">
              <BsStar className="icon" />
            </div>
          </div>
          <div
            className="header-right d-flex col-12 col-sm-5 col-md-4 col-lg-3 col-xl-3 justify-content-between "
            style={{ alignItems: "center" }}
          >
            <div className="">
              <GrRevert className="icon" />
            </div>
            <div className="">
              <GrRedo className="icon" />
            </div>
            <div className="">
              <button className="send-btn">Send</button>
            </div>
            <div className="">
              <FiMoreVertical className="icon" title="more" />
            </div>
            <div className="right-logo">
              <img
                className="profile"
                title="Google Account"
                src={abdul}
                alt=""
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Header;
