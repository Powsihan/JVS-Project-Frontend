
import Image from "next/image";
import React,{useState} from "react";
import "../styles/navbar.css";
import logo from "../assets/images/Logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import notification from "../assets/icons/bell.svg";
import avatar from "../assets/images/Avatar.png"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    // <div
    //   className="navbar w-100"
    //   style={{ height: "100px", backgroundColor: "lightblue" }}
    // >
    //   <div>
    //     <Image src={logo} alt="" />
    //   </div>
    //   <div>
    //     <div className="Navbar-box">
    //       Home
    //     </div>
    //     <div></div>
    //     <div></div>
    //     <div></div>
    //     <div></div>
    //   </div>
    //   <div></div>
    // </div>
    <nav className="navbar navbar-expand-lg w-100 Navbar-Container">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <MenuIcon />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <a className="navbar-brand mt-2 mt-lg-0" href="#">
            <Image src={logo} alt="" />
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
              <Image src={notification} alt="" width={25}/>
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
              <Image src={avatar} alt=""/>
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
  );
};

export default Navbar;
