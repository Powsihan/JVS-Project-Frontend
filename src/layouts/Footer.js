import React from "react";
import "../styles/layout.css";
import logo from "../assets/images/Logo.png";
import Image from "next/image";
import facebook from "../assets/icons/facebook.png";
import call from "../assets/icons/call.png";
import mail from "../assets/icons/mail.png";
import Link from "next/link";

const Footer = () => (
  <footer className="Footer-Section">
    <div className="container-fluid footer text-center text-md-left h-250">
      <div className="row footer-row align-items-center justify-content-around  ">
        <div className="h-150 align-items-center justify-content-center pt-4">
          <div>
            <Image src={logo} alt="" loading="lazy"/>
          </div>
          <div className="d-flex align-items-center justify-content-center pt-3 pb-0 gap-4 links-footer">
            <Link href="/home">Home</Link>
            <Link href="/vehicle">Vehicles</Link>
            <Link href="/sell">Sell</Link>
            <Link href="#Request">Request</Link>
            <Link href="/auction">Auction</Link>
          </div>
          <div className="pt-4">
            <h6 className="">Contact Us</h6>
            <div className="footer-contact d-flex gap-4 align-items-center justify-content-center pb-2">
              <Image src={facebook} alt="" />
              <Image src={call} alt="" />
              <Image src={mail} alt="" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-7  d-flex justify-content-center">
            <div className="d-flex flex-column justify-content-center align-items-center ps-3"></div>
          </div>
        </div>
      </div>
    </div>
    <hr className="white-line " style={{ color: "white" }} />
    <div
      className="footer-copyright text-center py-1"
      style={{ color: "white" }}
    >
     <h4> ©2024 JAFFNA Vehicle Spot (PVT) LTD  @All Rights Reserved</h4>
    </div>
  </footer>
);

export default Footer;
