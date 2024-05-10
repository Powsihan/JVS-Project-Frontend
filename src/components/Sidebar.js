import React from "react";
import logo from "../assets/images/Logo.png";
import Image from "next/image";
import "../styles/sidebar.css";

import dashboard from "../assets/icons/dashboard.svg";
import Vehicle from "../assets/icons/vehicle.svg";
import User from "../assets/icons/user.svg";
import Sales from "../assets/icons/sale.svg";
import Expert from "../assets/icons/expert.svg";
import Communication from "../assets/icons/communication.svg";
import Content from "../assets/icons/content.svg";
import Auction from "../assets/icons/auction.svg";
import Records from "../assets/icons/records.svg";
import Profile from "../assets/icons/profile.svg";
import Logout from "../assets/icons/logout.svg";


import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const data = [
    { name: "Dashboard", image: dashboard},
    { name: "Vehicle", image: Vehicle},
    { name: "User", image: User},
    { name: "Sales & Buy", image: Sales},
    { name: "Expert", image: Expert},
    { name: "Communication", image: Communication},
    { name: "Content", image: Content},
    { name: "Auction", image: Auction},
    { name: "Records", image: Records},
    { name: "Profile", image: Profile},
    { name: "Log Out", image: Logout},
  ];
  return (
    <div
      class="d-flex flex-column flex-shrink-0 p-3 side-bar-body sticky-top mt-2 w-100"
      // style={{ backgroundColor: "orange" }}
    >
      <div className="Sidebar-Logo">
        <div class="w-100 align-items-center align-content-center text-center d-flex justify-content-center">
          <a href="" class="text-decoration-none">
            <Image class="side-bar-logo" src={logo} loading="lazy" />
          </a>
          <div className="d-flex flex-column align-items-center justify-content-center gap-0">
            <h1>JVS</h1>
            <p>Believe & Achieve</p>
          </div>
        </div>
      </div>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto mt-4 gap-2">
        {data.map((item, index) => {
          return (
            <div class="">
              <li class="nav-item">
                <a
                  routerLinkActive="active"
                  class="nav-link"
                  aria-current="page"
                >
                  <div class="d-flex gap-2 align-items-center">
                    <div>
                      <Image
                        src={item.image}
                        className="side-bar-icon"
                        loading="lazy"
                      />
                    </div>
                    <div class="d-none d-lg-block item-lable">{item.name}</div>
                  </div>
                </a>
              </li>
            </div>
          );
        })}
      </ul>
      <div class="w-100"></div>

      <div></div>
    </div>
  );
};

export default Sidebar;
