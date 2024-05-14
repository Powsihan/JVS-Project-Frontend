"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import "../styles/navbar.css";
import logo from "../assets/images/Logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import notification from "../assets/icons/bell.svg";
import avatar from "../assets/images/avatar.svg";
import CommonButton from "../components/CommonButton";
import Contact from "../assets/icons/Headset.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignUpModal from "../components/SignUpModal";
const Navbar = () => {
  const pathname = usePathname();
  const routes = [
    { name: "Home", path: "home" },
    { name: "AboutUS", path: "about" },
    { name: "SellVehicles", path: "sell" },
    { name: "Customization", path: "customization" },
    { name: "Auction", path: "auction" },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLoginView, setShowLoginView] = useState(false);

  const LoginViewModal = () => {
    setShowLoginView(true);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  
console.log(userData,"Useerdata");
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
                      <Link
                        className={`nav-link navbarlink-hover ${
                          pathname === `/${item.path}` ? "active-nav-field" : ""
                        }`}
                        href={`/${item.path}`}
                      >
                        <div class="">
                          <div class="d-lg-block item-lable">{item.name}</div>
                        </div>
                      </Link>
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
            <a
              className="link-secondary me-3"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              aria-expanded="false"
            >
              <Image src={notification} alt="" width={25} />
            </a>

            <div className="dropdown">
              <a
                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                href="#"
                id="navbarDropdownMenuAvatar"
                role="button"
                aria-expanded="false"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                onClick={toggleDropdown}
              >
                <Image src={avatar} alt="" width={50} />
              </a>
              <ul
                className={`dropdown-menu dropdown-menu-end dropdown-Menu-custom ${
                  dropdownOpen ? "show" : ""
                }`}
                aria-labelledby="navbarDropdownMenuAvatar"
              >
                <li>
                  <a className="dropdown-item">Sign Up</a>
                </li>
                <li>
                  <a className="dropdown-item" onClick={() => LoginViewModal()}>
                    Log In
                  </a>
                </li>
                <hr />
                <li>
                  <a className="dropdown-item" href="#">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <SignUpModal
        show={showLoginView}
        onHide={() => setShowLoginView(false)}
      />
    </>
  );
};

export default Navbar;
