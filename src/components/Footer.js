import React from "react";
import "../styles/footer.css";
import logo from "../assets/images/Logo.png";
import Image from "next/image";

import facebook from "../assets/icons/facebook.png";
import call from "../assets/icons/call.png";
import mail from "../assets/icons/mail.png";

const Footer = () => (
  <footer
    className="page-footer font-small blue "
    style={{ backgroundColor: " #07326C" }}
  >
    <div className="container-fluid footer text-center text-md-left h-250">
      <div className="row footer-row align-items-center justify-content-around  ">
        <div className="col-2 h-100 align-items-center justify-content-center pt-4">
          <div>
            <Image src={logo} alt="" />
          </div>
        </div>
        <div className="col-10 h-100 align-items-center justify-content-center ">
          <div className="d-flex align-items-center justify-content-center pt-3 pb-0 gap-4 links" >
              <a href="#home">Home</a>
              <a href="#AboutUs">AboutUs</a>
              <a href="#Vehicles">Vehicles</a>
              <a href="#Request">Request</a>
              <a href="#Auction">Auction</a>
              
          </div>
          
            <hr className="white-line " style={{ color: "white" }} />
         
         
          <div className="row">
            <div className="col-7  d-flex justify-content-center" >
              <div className="d-flex flex-column justify-content-center align-items-center ps-3">
                <div className="d-flex gap-4">
                  <Image src={facebook} alt="" />
                  <Image src={call} alt="" />
                  <Image src={mail} alt="" />
                </div>
                <h6 className="mt-2" style={{ color: "white" }}>
                  Contact Us
                </h6>
              </div>
            </div>
            
            <div className="col-5 d-flex justify-content-around flex-column"> 
            <div className="joinwith d-flex justify-content-around align-items-right">
                <h6 style={{ color: "white" }}>Lets join with us</h6>
              </div>
              <div className=" row contacts d-flex justify-content-around align-items-center ">
                
              </div>
              <div className="joinwith d-flex justify-content-around align-items-right">
                <input
                  className="search"
                  placeholder=" Email"
                  style={{ borderRadius: "8px" }}
                />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    <hr className="white-line " style={{ color: "white" }} />
    <div className="footer-copyright text-center py-3"  style={{ color: "white" }}>
    © 2024 JAFFNA Vehicle Spot (PVT) LTD @ All Rights Reserved
     </div>
  </footer>
);

export default Footer;
