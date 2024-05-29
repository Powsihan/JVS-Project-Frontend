import "../../app/globals.css";
import CommonButton from "@/src/components/CommonButton";
import Navbar from "@/src/layouts/Navbar";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import Footer from "@/src/layouts/Footer";

import { IconButton } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import explore from "../../assets/icons/explore.svg";

import facebook from "../../assets/icons/facebook.png";
import call from "../../assets/icons/call.png";
import mail from "../../assets/icons/mail.png";
import Chatbot from "../../assets/icons/Chatbot.png";
import Expert from "../../assets/icons/expert.png";
import aboutUs from "../../assets/images/aboutUs.png";

import vector from "../../assets/icons/Vector.svg";
import Ratingitem from "../../assets/icons/RatingItem.svg";
import Ratinghalf from "../../assets/icons/Ratinghalf.svg";
import useraccount from "../../assets/images/User Account.png";
import experience from "../../assets/images/experience.png";
import vehicle from "../../assets/images/vehicle1.png";
import branch from "../../assets/images/Company.png";

import chatmaessage from "../../assets/images/Chat Message.png";

import "../../styles/aboutUs.css";
import { aboutuscontent, aboutuscontent2 } from "@/src/data/content";
const index = () => {
  
  return (
    <>
      <Navbar />
      <div className="min-vh-100 background-home">
        <div className="container-fluid ">
          <div className="row d-flex flex-row min-vh-100 p-3">
            <div className="col-lg-5 col-sm-12 d-flex flex-column justify-content-center p-2 Home-heading">
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
            <div className="col-lg-2 col-sm-12 d-flex align-items-end justify-content-center">
              <IconButton aria-label="down" className="dahover" href="#aboutus">
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
      <div className="container-fluid min-vh-100" id="aboutus">
        <div className="row min-vh-100">
          <div className="col-lg-6 col-md-12 col-sm-12 d-flex align-items-center justify-content-center">
            <Image
              src={aboutUs}
              alt=""
              // style={{ width: "auto", height: "auto" }}
            />
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 d-flex flex-column justify-content-center aboutUs-heading">
            <h1>Who we are</h1>
            <h4>We Have 10 Years Of Experience In This Field</h4>
            <p className=" justify-content-center align-content-center pt-2">
              At JAFFNA Vehicle Spot (PVT) LTD, we are more than just a vehicle
              buying and selling company – we are your trusted automotive
              partner. With Three strategically located branches across Sri
              Lanka, we have established ourselves as a beacon of reliability
              and professionalism in the industry. As we embark on our digital
              journey, our primary goal remains unchanged: to expand our reach,
              broaden our customer base, and reinforce our position as a leading
              name in vehicle sales and services. With a commitment to
              excellence and a passion for customer satisfaction, we strive to
              exceed expectations at every turn. Trust Jaffna Vehicle Spot (PVT)
              LTD to navigate your automotive needs with expertise and integrity
            </p>
          </div>
        </div>
      </div>

      <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center  about-who-we-are">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h2>WHY CHOOSE US</h2>
          <h4>
            Trust us to keep your automobile running smoothly and reliably.
          </h4>
        </div>
        <div className="row pt-5 d-flex">
          {aboutuscontent.map((data, index) => (
            <div className="col-lg-3 col-sm-12 col-md-6 d-flex align-items-center justify-items-center mb-5">
              <div className="row">
                <div className="d-flex pt-2 justify-content-center align-items-center">
                  <Image src={data.image} alt="" />
                </div>
                <div className="justify-content-center align-items-center pt-3 d-flex">
                  <h5>{data.heading}</h5>
                </div>
                <div className="pt-4 d-flex justify-content-center align-items-center ps-5 pe-5">
                  <p>{data.content}</p>
                </div>
                <div className="justify-content-center align-items-center d-flex">
                  <CommonButton text={"Go Visit"} image={vector} width={200} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center ">
        <div
          className="row d-flex align-items-center justify-content-center experience"
          style={{ backgroundColor: "var(--primary-color) " }}
        >
          <div className="justify-content-center align-content-center d-flex pt-5">
            <h1>OUR EXPERIENCES</h1>
          </div>
          <div className="justify-content-center align-content-center d-flex">
            <h5>
              Our dedicated team of skilled technicians and mechanics takes
              pride in delivering top-tier servicing for your beloved vehicle
            </h5>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h6>Rating</h6>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <Image src={Ratingitem} alt="" />
              <Image src={Ratingitem} alt="" />
              <Image src={Ratingitem} alt="" />
              <Image src={Ratinghalf} alt="" />
            </div>
          </div>
          <div className="row mt-5  d-flex">
            <div className=" col-lg-3 col-sm-6 col-md-4 d-flex align-items-center justify-content-center">
              <div className="row">
                <div className="d-flex pt-2 justify-content-center align-items-center">
                  <Image src={useraccount} alt="" />
                </div>
                <div className="d-flex pt-2 justify-content-center align-items-center">
                  <h4>Customer</h4>
                </div>
                <div className="d-flex  justify-content-center align-items-center count">
                  <h2>546</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-md-4 d-flex align-items-center justify-content-center">
              <div className="row">
                <div className="d-flex pt-2 justify-content-center align-items-center">
                  <Image src={vehicle} alt="" />
                </div>
                <div className="d-flex pt-2 justify-content-center align-items-center">
                  <h4>Vehicles</h4>
                </div>
                <div className="d-flex  justify-content-center align-items-center count">
                  <h2>546</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-md-4 d-flex align-items-center justify-content-center">
              <div className="row">
                <div className="d-flex pt-2 justify-content-center align-items-center">
                  <Image src={branch} alt="" />
                </div>
                <div className="d-flex pt-2 justify-content-center align-items-center">
                  <h4>branches</h4>
                </div>
                <div className="d-flex  justify-content-center align-items-center count">
                  <h2>546</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-md-4 d-flex align-items-center justify-content-center">
              <div className="row">
                <div className="d-flex pt-2 justify-content-center align-items-center">
                  <Image src={experience} alt="" />
                </div>
                <div className="d-flex pt-2 justify-content-center align-items-center">
                  <h4>Experiences</h4>
                </div>
                <div className="d-flex  justify-content-center align-items-center count">
                  <h2>546</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center  ">
        <div className="row mt-3  d-flex ">
          <div className="justify-content-center align-content-center d-flex pt-5">
            <h1>OUR EMPLOYEES</h1>
          </div>
          <div className="justify-content-center align-content-center d-flex">
            <h5>Meet with our valuable Employees</h5>
          </div>
        </div>
      </div>

      <div className="container-fluid min-vh-100" id="contactus">
        <div className="row contactUsImage d-lg-block d-none"></div>
        <div className="row d-flex">
          {aboutuscontent2.map((data) => (
            <div className="col-lg-4 col-sm-12 col-md-8 d-flex align-items-center justify-content-center pt-4 p-4">
              <div className="card d-flex align-items-center justify-content-center card-contact">
                <Image src={data.image} alt="" className="mt-1" />
                <div className="row card-body d-flex align-items-center justify-content-center ">
                  <h5 className="card-title ps-3 d-flex align-items-center justify-content-center ">
                    {data.heading}
                  </h5>
                  <p className="card-text d-flex align-items-center justify-content-center ">
                    {data.content}
                  </p>
                  {data.time && (
                    <div className="d-flex justify-content-center align-items-center ps-3">
                      <h6 className="mt-2" style={{ color: "gray" }}>
                        Time : 8 am - 6 pm (Monday-Saturday)
                      </h6>
                    </div>
                  )}
                  {data.contact && (
                    <div className="d-flex  justify-content-center align-items-center  gap-4">
                      <Image src={facebook} alt="" />
                      <Image src={call} alt="" />
                      <Image src={mail} alt="" />
                    </div>
                  )}
                  <div className="pt-3 d-flex align-items-center justify-content-center">
                    <CommonButton
                      text={data.buttonText}
                      image={chatmaessage}
                      width={200}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default index;
