import React,{useState,useEffect} from "react";
import { MutatingDots } from "react-loader-spinner";
import "../../../styles/admin.css";
import AdminLogin from "@/src/components/AdminLogin";
import { ToastContainer, toast } from "react-toastify";
const index = () => {
  const [done, setDone] = useState(undefined);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setDone(true);
  //   }, 1000);
  // }, []);
  return (
    <>
     {done ? (
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
          <section className="vh-100">
              <div className="container pt-3">
                <div className="text-center p-3 pt-5 mb-5">
                  <h2 className="heading">Welcome to InfinitraX</h2>
                </div>
                <div className="row d-flex align-items-center justify-content-center h-100">
                  <div className="col-md-8 col-lg-7 col-xl-6">
                    {/* <img
                      src={BackgroundImage}
                      className="img-fluid"
                      alt="mainimage"
                    /> */}
                  </div>
                  <AdminLogin/>
                </div>
              </div>
            </section>
        </div>
      )}
      <ToastContainer/>
    </>
  );
};

export default index;
