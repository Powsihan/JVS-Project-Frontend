import React from "react";
import Navbar from "@/src/layouts/Navbar";
import Footer from "@/src/layouts/Footer";
import Image from "next/image";
import profile from "../../../assets/images/Avatar.png";
import "../../../styles/records.css";
import vehicle from "../../../assets/images/bmw.png";
import InputField from "@/src/components/InputField";
import CommonButton from "@/src/components/CommonButton";
import VisibilityIcon from "@mui/icons-material/Visibility";

const index = () => {
  return (
    <>
      <Navbar />
      <div className="record container-fluid  align-items-center justify-content-center  mb-4">
        <div
          className="container-fluid  p-3 row align-items-center justify-content-center"
          style={{ marginTop: "100px" }}
        >
          <div className="col-4 d-flex gap-4 align-items-center justify-content-center flex-column ">
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
          <div className="col-lg-5 col-md-12 record justify-content-center align-items-center m-0">
            <div className="vehcile justify-content-center align-items-center d-flex p-4">
              <Image
                src={vehicle}
                alt=""
                style={{ width: "400px", height: "200px" }}
              />
            </div>
            <h4>Vehicle information</h4>
            <hr />
            <div className="row">
              <div className="d-flex justify-content-between align-items-center ps-2">
                <h5>Registration No</h5>
                <h6>200tv567</h6>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center ps-2 ">
                <h5>Registration No</h5>
                <h6>200tv567</h6>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center ps-2 ">
                <h5>Registration No</h5>
                <h6>200tv567</h6>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center ps-2 ">
                <h5>Registration No</h5>
                <h6>200tv567</h6>
              </div>
              <hr />
            </div>
          </div>
          <div className="col-lg-3 col-md-6 pt-3">
            <div className=" record p-2 pb-2">
              <h4>Add documents</h4>
              <InputField placeholder="service" />

              <label htmlFor="input-field" className="Text-input-label">
                Description
              </label>
              <textarea
                className="form-control"
                placeholder={"Small description about Vehicle"}
                rows={2}
              />
              <div className="form-group pt-3">
                <input
                  className="form-control"
                  placeholder="Choose proper document"
                  type="file"
                  id="document"
                />
              </div>
              <div className="d-flex gap-2 justify-content-end pb-1 pt-3">
                <CommonButton text={"Update"} width={100} />
              </div>
            </div>

            <div className=" record p-2 mt-2 pt-2">
              <h4>View documents details</h4>
              <hr />
              <div className="d-flex justify-content-between align-items-center  ">
                <h5>Service</h5>
                <VisibilityIcon className="" />
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center  ">
                <h5>Oil</h5>
                <VisibilityIcon className="" />
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default index;
