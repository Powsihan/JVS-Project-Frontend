"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import "../styles/navbar.css";
import logo from "../assets/images/Logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import notification from "../assets/icons/bell.svg";
import avatar from "../assets/images/Avatar.png";
import CommonButton from "../components/CommonButton";
import Contact from "../assets/icons/Headset.png";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const routes = [
    { name: "Home", path: "home" },
    { name: "AboutUS", path: "about" },
    { name: "SellVehicles", path: "sell" },
    { name: "Customization", path: "customization" },
    { name: "Auction", path: "auction" },
  ];

  return (
    <>
      <nav className="navbar navbar-expand-lg w-100 Navbar-Container fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <MenuIcon />
          </button>

          <div
            className="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="d-sm-flex  align-items-center w-100 pe-5 ps-5">
              <a
                className="navbar-brand mt-2 mt-lg-0 d-flex align-items-center justify-content-center "
                href="#"
              >
                <Image src={logo} alt="" />
              </a>
              <ul className="navbar-nav me-auto  mb-lg-0 d-flex justify-content-center gap-4 flex-grow-1 w-100">
                {routes.map((item, index) => {
                  return (
                    <li className="nav-item" key={index}>
                      <a
                        className={`nav-link ${
                          router.pathname === `/${item.path}`
                            ? "active-field"
                            : ""
                        }`}
                        href={`/${item.path}`}
                      >
                         <div class="">
                    <div class="d-lg-block item-lable">{item.name}</div>
                  </div>
                        {/* <div className="Navbar-box">{item.name}</div> */}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="d-flex align-items-center justify-content-center">
                <CommonButton text={"Contact"} image={Contact} width={110} />
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="dropdown">
              <a
                className="link-secondary me-3"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                aria-expanded="false"
              >
                <Image src={notification} alt="" width={25} />
              </a>
            </div>

            <div className="dropdown">
              <a
                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                href="#"
                id="navbarDropdownMenuAvatar"
                role="button"
                aria-expanded="false"
              >
                <Image src={avatar} alt="" />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    My profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
