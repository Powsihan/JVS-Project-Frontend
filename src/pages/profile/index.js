import "../../app/globals.css";
import CommonButton from "@/src/components/CommonButton";
import Navbar from "@/src/layouts/Navbar";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import { Button } from "react-bootstrap";
import TextField from "@/src/components/TextField";
import avatar from "../../assets/images/avatar.svg";
import chnagepassword from "../../assets/images/changepassword.png";
import chnagepassword2 from "../../assets/images/changepassword2.png";
import danger from "../../assets/images/Danger.svg";

import "./customerprofile.css";
import { Districts } from "@/src/data/datas";

const index = () => {
  return (
    <>
      <Navbar />
      <div
        className="container-fluid min-vh-100 p-5 d-flex flex-column gap-5 alig-items-center justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <div className="container-fluid customer-personal-information">
          <form>
            <div className="row d-flex justify-content-between align-items-center custom-profile-header">
              <div className="col-6 d-flex justify-content-start flex-column pt-1">
                <h2>Personal Information</h2>
                <p>Here You can change your Personal Details.</p>
              </div>
              <div className="col-6 d-flex justify-content-end pe-5 gap-3 profile-button-group">
                <div>
                  <Button variant="secondary">Cancel</Button>
                </div>
                <CommonButton text="Save Changes" width={150} />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 d-flex flex-column align-items-center">
                <Image
                  src={avatar}
                  className="avatar rounded-circle"
                  alt="avatar"
                  width={150}
                  height={150}
                />
                <h3>Thanushika</h3>
                <CommonButton text="Change Profile"/>
              </div>

              <div className="col-lg-8 d-flex p-2 pb-3 flex-column ps-5 pe-5">
                <div className="row pb-2">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <TextField
                      label="First Name"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <TextField
                      label="Last Name"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div className="row pb-2">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <TextField
                      label="Date of Birth"
                      placeholder="DD-MM-YY"
                      type={"date"}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <TextField
                      label="Phone Number"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                <div className="row pb-2">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <TextField
                      label="Email Address"
                      placeholder="Enter your Email Address"
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <TextField
                      label="Address"
                      placeholder="Enter your Address"
                    />
                  </div>
                </div>
                <div className="row pb-2">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <TextField label="NIC" placeholder="Enter your NIC" />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="input-field" className="Text-input-label">
                        City
                      </label>
                      <select
                        className="form-control"
                        // value={selectedCity}
                        // onChange={HandleSelectCity}
                      >
                        <option value="">Select the City</option>
                        {Districts.map((data, index) => (
                          <option key={index} value={data}>
                            {data}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row pb-2">
                  <div className="form-group">
                    <label htmlFor="input-field" className="Text-input-label">
                      About me
                    </label>
                    <textarea
                      className="form-control"
                      placeholder={"Small description about your self"}
                      rows={5}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="container-fluid customer-personal-information">
          <form>
            <div className="row d-flex justify-content-between align-items-center custom-profile-header">
              <div className="col-6 d-flex justify-content-start flex-column">
                <h2>Change password</h2>
                <p>Here you can change your password.</p>
              </div>
              <div className="col-6 d-flex justify-content-end pe-5 gap-3 profile-button-group">
                <div>
                  <Button variant="secondary">Cancel</Button>
                </div>
                <CommonButton text="Save Changes" width={150} />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 d-flex flex-column gap-3  justify-content-center ps-5">
                <TextField
                  label="Current Password"
                  placeholder="Enter your current password"
                  width={"70%"}
                />
                <TextField
                  label="New Password"
                  placeholder="Enter your new password"
                  width={"70%"}
                />
                <TextField
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  width={"70%"}
                />
              </div>
              <div className="col-lg-6 d-flex justify-content-center align-items-center d-lg-block d-md-none d-none">
                <Image
                  src={chnagepassword}
                  alt="imageee"
                  width={300}
                  height={300}
                />
                <Image
                  src={chnagepassword2}
                  alt="imageee"
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </form>
        </div>

        <div className="container-fluid customer-delete-account p-2">
          <div className="d-flex justify-content-between align-items-center ps-3 pe-3">
            <div className="d-flex align-items-center justify-content-center gap-3">
              <div>
                <Image src={danger} />
              </div>
              <h6 className="d-lg-block d-none">
                Are you Sure Want to Delete Your Account ?
              </h6>
            </div>
            <div>
              <button type="button" className="btn btn-danger">
                Delete Your Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
