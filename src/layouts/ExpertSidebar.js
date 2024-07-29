import React from "react";
import logo from "../assets/images/Logo.png";
import Image from "next/image";
import "../styles/sidebar.css";

import dashboard from "../assets/icons/dashboard.svg";
import Vehicle from "../assets/icons/vehicle.svg";
import Communication from "../assets/icons/communication.svg";
import Profile from "../assets/icons/profile.svg";
import Logout from "../assets/icons/logout.svg";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Userlogout } from "../redux/action/user";
import { toast } from "react-toastify";

const ExpertSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    { name: "Dashboard", image: dashboard, path: "expert/dashboard" },
    { name: "Vehicle", image: Vehicle, path: "expert/vehicle" },
    {
      name: "Contact",
      image: Communication,
      path: "expert/contact",
    },
  ];

  const routes2 = [
    { name: "Profile", image: Profile, path: "expert/profile" },
    { name: "Log Out", image: Logout, path: "/expert/login" },
  ];

  

  const logout = () => {
    Userlogout((response) => {
      if (response.status === 200) {
        router.push("/expert/login");
      } else {
        toast.error("Logout failed!");
      }
    });
  };

  return (
    <div class="d-flex flex-column flex-shrink-0 p-3 side-bar-body sticky-top mt-2 w-100">
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
        {routes.map((item, index) => {
          return (
            <div class="">
              <li class="nav-item">
                <Link
                  className={`nav-link ${
                    pathname === `/${item.path}` ? "active-field" : ""
                  }`}
                  href={`/${item.path}`}
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
                </Link>
              </li>
            </div>
          );
        })}
        <hr />
        {routes2.map((item, index) => {
          return (
            <div class="">
              <li class="nav-item">
                <Link
                  className={`nav-link ${
                    pathname === `/${item.path}` ? "active-field" : ""
                  }`}
                  href={`/${item.path}`}
                  onClick={item.name === "Log Out" ? logout : null}
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
                </Link>
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

export default ExpertSidebar;
