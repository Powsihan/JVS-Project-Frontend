import React, { useState, useEffect } from "react";
import "../styles/sidebar.css";
import Sidebar from "./Sidebar";

import profile from "../assets/images/avatar.svg";
import notificationimg from "../assets/icons/notification.svg";
import chat from "../assets/icons/chat.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

import NotificationModal from "../components/modals/NodificationModal";
import CircleIcon from "@mui/icons-material/Circle";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/reducer/loaderSlice";
import { getAllPurchases } from "../redux/action/purchase";
import { getUserInfo } from "../redux/action/user";
const Adminlayout = ({ children }) => {
  const dispatch = useDispatch();
  const [typingText, setTypingText] = useState("");
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState("");

  let pageTitle = "Dashboard";
  const getPageName = (path) => {
    const splitPath = path.split("/");
    return splitPath[splitPath.length - 1];
  };

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    dispatch(setLoading(true));
    getUserInfo((res) => {
      if (res.status == 200) {
        setUserData(res.data);
        dispatch(setLoading(false));
      }
    });
  }, []);


  useEffect(() => {
    switch (getPageName(pathname)) {
      case "dashboard":
        pageTitle = "Dashboard";
        break;
      case "vehicle":
        pageTitle = "Vehicle";
        break;
      case "customer":
        pageTitle = "Customers";
        break;
      case "sales":
        pageTitle = "Sales and Buy";
        break;
      case "employee":
        pageTitle = "Employee";
        break;
      case "communication":
        pageTitle = "Communication";
        break;
      case "contentmanage":
        pageTitle = "Content";
        break;
      case "auction":
        pageTitle = "Auction";
        break;
      case "records":
        pageTitle = "Records";
        break;
      case "profile":
        pageTitle = "Profile";
        break;
      default:
        pageTitle = "Dashboard";
    }

    let textToType = "";
    textToType = `Welcome to  ${pageTitle} Section..!`;

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= textToType.length) {
        setTypingText(textToType.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 50);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    dispatch(setLoading(true));
    getAllPurchases((res) => {
      if (res && res.data) {
        const notifications = Array.isArray(res.data) ? res.data : [];
        const hasRequested = notifications.some(
          (notification) =>
            notification.status === "Requested" ||
            notification.status === "Pending"
        );
        setNotification(hasRequested);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        toast.error("Error fetching Notification details");
      }
    });
  }, []);

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-2 col-md-2 col-sm-2 navbar navbar-expand-sm sticky-top ps-2 pe-2 sidebar">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="offcanvas offcanvas-start w-75"
            id="navbarSupportedContent"
          >
            <div
              class="offcanvas-header"
              style={{ backgroundColor: "#F6F8FF" }}
            >
              <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body" style={{ backgroundColor: "#F6F8FF" }}>
              <Sidebar></Sidebar>
            </div>
          </div>
        </div>
        <div class="col-lg-10 col-md-10 col-sm-10 p-0 min-vh-100 dashboard-body">
          <div className="sticky-top m-0 dashboard-navbar row z-3">
            <div className="col-6 d-flex align-items-center">
              <h1>{typingText}</h1>
            </div>
            <div className="col-6 d-flex align-items-center justify-content-end pe-5">
              <div className="d-flex align-items-center justify-content-center gap-3">
                <Image src={chat} alt="" />
                <div
                  onClick={() => setIsModalOpen(true)}
                  style={{ cursor: "pointer" }}
                  className="d-flex"
                >
                  <Image src={notificationimg} alt="" />
                  {notification && (
                    <div>
                      <CircleIcon
                        sx={{
                          fontSize: "17px",
                          marginLeft: "-13px",
                          marginTop: "-15px",
                          color: "#17B530",
                        }}
                      />
                    </div>
                  )}
                </div>
                <Image
                  src={
                    userData && userData.profilePic
                      ? userData.profilePic
                      : profile
                  }
                  alt=""
                  width={50}
                  height={50}
                  className="rounded-circle "
                />
              </div>
            </div>
          </div>
          <div class="mt-4 p-3">{children}</div>
        </div>
      </div>
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Adminlayout;
