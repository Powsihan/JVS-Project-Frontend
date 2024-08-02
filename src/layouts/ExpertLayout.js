import React, { useState, useEffect } from "react";
import "../styles/sidebar.css";
import profile from "../assets/images/avatar.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/reducer/loaderSlice";
import ExpertSidebar from "./ExpertSidebar";
import { getEmployeeInfo } from "../redux/action/employee";
const ExpertLayout = ({ children }) => {
  const dispatch = useDispatch();
  const [typingText, setTypingText] = useState("");
  const pathname = usePathname();

  let pageTitle = "Dashboard";
  const getPageName = (path) => {
    const splitPath = path.split("/");
    return splitPath[splitPath.length - 1];
  };

  const [employeeData, setemployeeData] = useState(null);

  useEffect(() => {
    dispatch(setLoading(true));
    getEmployeeInfo((res) => {
      if (res?.status == 200) {
        setemployeeData(res?.data);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, []);

  useEffect(() => {
    switch (getPageName(pathname)) {
      case "vehicle":
        pageTitle = "Vehicle";
        break;
      case "contact":
        pageTitle = "Contact";
        break;
      case "profile":
        pageTitle = "Profile";
        break;
      default:
        pageTitle = "Expert";
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
              <ExpertSidebar></ExpertSidebar>
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
                <Image
                  src={
                    employeeData?.profilePic
                      ? employeeData?.profilePic
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
    </div>
  );
};

export default ExpertLayout;
