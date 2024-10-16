import React, { useState, useEffect } from "react";
import { MutatingDots } from "react-loader-spinner";
import "../../../styles/admin.css";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { IconButton } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { loginback } from "@/src/utils/ImagesPath";
import ExpertLogin from "@/src/components/sections/ExpertLogin";
const ExpertLoginPage = () => {
  const [done, setDone] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      setDone(true);
    }, 2000);
  }, []);
  return (
    <>
      {!done ? (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center Admin-Login-Intro">
          <div className="d-flex align-items-center justify-content-center">
            <MutatingDots
              visible={true}
              height={100}
              width={100}
              color="#FFFF"
              secondaryColor="#FFF"
              radius={12.5}
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="Login-home-content" id="loginhome">
            <div className="d-flex min-vh-100 flex-column align-items-center justify-content-center gap-5">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <h1>Jaffna Vehicle Spot (PVT) LTD</h1>
                <h4>Believe & Achieve</h4>
              </div>
              <div className="down-arrroww-login">
                <IconButton
                  aria-label="delete"
                  className="down-arrroww-hover"
                  href="#loginhere"
                >
                  <KeyboardDoubleArrowDownIcon
                    sx={{ fontSize: "40px", color: "#FFFF" }}
                  />
                </IconButton>
              </div>
            </div>
          </div>
          <section className="vh-100 admin-login-section" id="loginhere">
            <div className="pt-3">
              <div className="text-center p-3 pt-5 mb-5">
                <h2>Welcome to Login</h2>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-lg-6 d-none d-lg-block ">
                  <Image src={loginback} alt="" loading="lazy"/>
                </div>
                <div className="col-lg-6 d-flex align-items-start justify-content-center ">
                  <ExpertLogin />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default ExpertLoginPage;
