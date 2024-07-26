import React from "react";
import Navbar from "@/src/layouts/Navbar";
import Image from "next/image";
import vehicle from "../../assets/images/bmw.png";
import Footer from "@/src/layouts/Footer";
import "../../styles/records.css";
import profile from "../../assets/images/Avatar.png";

const index = () => {
  return (
    <>
      <Navbar />
      <div className="record container-fluid align-items-center justify-content-center pb-4 px-4 gap-2">
      <div
        className="container-fluid  p-5 row  gap-5 align-items-center justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <div
          className="col-4 d-flex gap-4 align-items-center justify-content-center flex-column pt-1" >
          <h2>Record Information</h2>
          <div className="d-flex gap-4 align-items-center justify-content-center pt-3">
            <Image
              src={profile}
              alt=""
              style={{ width: "auto", height: "auto" }}
            />
          </div>
            <div className="text-center Profile-name-section pb-3">
              <h2>Saalu</h2>
              
            </div>
        </div>

        <div className=" col justify-content-center align-items-center  pt-1 ">
        <div className="row justify-content-center">
        <div className="col-md-6 pb-4">
        <div className=" cards d-flex justify-content-center align-items-center flex-column pt-1">
          <div className=" justify-content-center align-items-center flex-column">
          <h2>2023 BMW 530 XI</h2>
          <div className="d-flex gap-2 align-items-center justify-content-center pt-3 pb-2">
            <Image
              src={vehicle}
              alt=""
              style={{ width: "150px", height: "80px" }}
            />
          </div>
          </div>
        </div>
        </div>
        <div className="col-md-6 pb-4">
        <div className=" cards  d-flex justify-content-center align-items-center flex-column pt-1">
          <div className=" justify-content-center align-items-center flex-column">
          <h2>2023 BMW 530 XI</h2>
          <div className="d-flex gap-2 align-items-center justify-content-center pt-3 pb-2">
            <Image
              src={vehicle}
              alt=""
              style={{ width: "150px", height: "80px" }}
            />
          </div>
          </div>
        </div>
        </div>
        </div>
        <div className="row justify-content-center">
        <div className="col-md-6 pb-4">
        <div className=" cards d-flex justify-content-center align-items-center flex-column pt-1">
          <div className=" justify-content-center align-items-center flex-column">
          <h2>2023 BMW 530 XI</h2>
          <div className="d-flex gap-2 align-items-center justify-content-center pt-3 pb-2">
            <Image
              src={vehicle}
              alt=""
              style={{ width: "150px", height: "80px" }}
            />
          </div>
          </div>
        </div>
        </div>
        <div className="col-md-6 pb-4">
        <div className=" cards d-flex justify-content-center align-items-center flex-column pt-1">
          <div className=" justify-content-center align-items-center flex-column">
          <h2>2023 BMW 530 XI</h2>
          <div className="d-flex gap-2 align-items-center justify-content-center pt-3 pb-2">
            <Image
              src={vehicle}
              alt=""
              style={{ width: "150px", height: "80px" }}
            />
          </div>
          </div>
        </div>
        </div>
        
        </div>
        </div>
      </div>
      </div>
      <hr/>
      <Footer />
    </>
  );
};

export default index;
