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
import { usePathname,useRouter } from "next/navigation";
import SignInModal from "../components/modals/SignInModal";
import SignUpModal from "../components/modals/SignUpModal";
import Cookies from "js-cookie";
import { Customerlogout } from "../redux/action/logout";

const Navbar = () => {
  const pathname = usePathname();
  const router =useRouter();
  const routes = [
    { name: "Home", path: "home" },
    { name: "Vehicle", path: "vehicle" },
    { name: "SellVehicles", path: "sell" },
    { name: "Customization", path: "customization" },
    { name: "Auction", path: "auction" },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLoginView, setShowLoginView] = useState(false);
  const [showSignUpView, setShowSignUpView] = useState(false);
  const [customerData, setCustomerData] = useState(null);

  const LoginViewModal = () => {
    setShowLoginView(true);
  };

  const SignUpViewModal = () => {
    setShowSignUpView(true);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const storedCustomerData = Cookies.get("customer");
    if (storedCustomerData) {
      setCustomerData(JSON.parse(storedCustomerData));
    }
  }, []);

  const logout = () => {
    Customerlogout();
  };

  const scrollToContactUs = () => {
    const contactUsSection = document.getElementById("contactus");
    if (contactUsSection) {
      contactUsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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
                <CommonButton text={"Contact"} image={Contact} width={110} onClick={scrollToContactUs}/>
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
                <Image
                  src={
                    customerData && customerData.profilePic
                      ? customerData.profilePic
                      : avatar
                  }
                  alt=""
                  width={50}
                  height={50}
                  className="avatar rounded-circle"
                />
              </a>
              {!customerData ? (
                <ul
                  className={`dropdown-menu dropdown-menu-end dropdown-Menu-custom ${
                    dropdownOpen ? "show" : ""
                  }`}
                  aria-labelledby="navbarDropdownMenuAvatar"
                >
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => SignUpViewModal()}
                    >
                      Sign Up
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => LoginViewModal()}
                    >
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
              ) : (
                <ul
                  className={`dropdown-menu dropdown-menu-end dropdown-Menu-custom ${
                    dropdownOpen ? "show" : ""
                  }`}
                  aria-labelledby="navbarDropdownMenuAvatar"
                >
                  <li>
                    <a className="dropdown-item">Messages</a>
                  </li>
                  <li>
                    <a className="dropdown-item">Notifications</a>
                  </li>
                  <li>
                    <a className="dropdown-item">History</a>
                  </li>
                  <hr />
                  <li>
                    <a className="dropdown-item" onClick={()=>{router.push('/profile')}} >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={logout}>
                      Log out
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
      <SignInModal
        show={showLoginView}
        onHide={() => setShowLoginView(false)}
      />
      <SignUpModal
        show={showSignUpView}
        onHide={() => setShowSignUpView(false)}
      />
    </>
  );
};

export default Navbar;
