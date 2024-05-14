import "../../app/globals.css";
import CommonButton from "@/src/components/CommonButton";
import Navbar from "@/src/layouts/Navbar";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import Footer from "@/src/components/Footer";

import { IconButton } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import explore from "../../assets/icons/explore.svg";

import facebook from "../../assets/icons/facebook.png";
import call from "../../assets/icons/call.png";
import mail from "../../assets/icons/mail.png";
import Chatbot from "../../assets/icons/Chatbot.png";
import Expert from "../../assets/icons/expert.png";

const index = () => {
  // const [windowSize, setWindowSize] = useState([1920, 720]);

  // useEffect(() => {
  //   const handleWindowResize = () => {
  //     setWindowSize([window.innerWidth, window.innerHeight]);
  //   };

  //   window.addEventListener("resize", handleWindowResize);

  //   return () => {
  //     window.removeEventListener("resize", handleWindowResize);
  //   };
  // }, []);
  return (
    <>
      <Navbar />
      <div
        className="min-vh-100 background-home"
      >
        <div className="container-fluid ">
          <div className="row d-flex flex-row min-vh-100 p-3">
            <div
              className="col-lg-5 col-sm-12 d-flex flex-column justify-content-center p-2 Home-heading"
              // style={{ backgroundColor: "red" }}
            >
              <h1>We are</h1>
              <h2>Qualified & Professional</h2>
              <h3>JAFFNA VEHICLE SPOT (PVT) LTD</h3>
              <div className="mt-5 d-flex flex-column gap-2">
                <h4>Driving dreams, one click away</h4>
                <div className="d-flex justify-content-center">
                  <CommonButton text={"Explore"} image={explore} width={180} />
                </div>
              </div>
              <div className="mt-5">
                <h5>Connect With</h5>
                <div className="d-flex gap-3 ">
                  <Image src={facebook} alt="" />
                  <Image src={mail} alt="" />
                  <Image src={call} alt="" />
                </div>
              </div>
            </div>
            <div
              className="col-lg-2 col-sm-12 d-flex align-items-end justify-content-center"
            >
              <IconButton
                aria-label="down"
                className="dahover"
                href="#"
              >
                <KeyboardDoubleArrowDownIcon sx={{ fontSize: "40px" }} />
              </IconButton>
            </div>
            <div className="col-lg-5 col-sm-12 d-flex align-items-end justify-content-end gap-3">
              <div className="p-3 rounded-5 chat-bot-image">
                <Image src={Expert} alt="" />
              </div>
              <div className="p-3 rounded-5 chat-bot-image">
                <Image src={Chatbot} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default index;
