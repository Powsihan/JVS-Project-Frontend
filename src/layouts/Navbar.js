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


const Navbar = () => {
  
  const [windowSize, setWindowSize] = useState([1920, 720]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg w-100 Navbar-Container fixed-top"
      >
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

          <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div
              className={`d-flex align-items-center w-100 pe-5 ps-5 ${
                windowSize[0] >= 800 ? "d-flex flex-row" : "d-flex flex-column"
              }`}
            >
              <a
                className="navbar-brand mt-2 mt-lg-0 d-flex align-items-center"
                href="#"
              >
                <Image src={logo} alt="" />
              </a>
              <ul className="navbar-nav me-auto  mb-lg-0 d-flex justify-content-center gap-2 flex-grow-1 w-100">
                <li className="nav-item">
                  <a className="nav-link" href="#home">
                    <div className="Navbar-box">Home</div>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#AboutUS">
                    <div className="Navbar-box">About US</div>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#SellVehicles">
                    <div className="Navbar-box">Sell Your Vehicle</div>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#Customization">
                    <div className="Navbar-box">Customization</div>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#Auction">
                    <div className="Navbar-box">Auction</div>
                  </a>
                </li>
              </ul>
              <div className="d-flex align-items-center">
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
