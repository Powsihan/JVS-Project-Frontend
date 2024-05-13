import Adminlayout from "@/src/layouts/Adminlayout";
import React from "react";
import CommonButton from "@/src/components/CommonButton";
import Image from "next/image";
import avatar from "../../../assets/images/avatar.svg";
import editprof from "../../../assets/images/Editprof.png";
import changepass from "../../../assets/images/Changepass.png";
import "../../../styles/admin.css";

import "./profile.css";

import TextField from "@/src/components/TextField";
import { Button } from "react-bootstrap";

const index = () => {
  return (
    <Adminlayout>
      <div className="container-fluid Profile-Edit-Section">
        <div className="row p-1">
          <div className="col-lg-4 col-md-6 col-sm-12 d-flex flex-column justify-content-center Profile-Edit-Section p-2">
            <div className="d-flex alig-items-center justify-content-center">
              <Image src={avatar} className="avatar" alt="avatar" width={150} />
            </div>
            <hr />
            <div className="text-center Profile-name-section pb-3">
              <h1>Ratheeswaran</h1>
              <h2>Admin</h2>
            </div>
            <div className="ps-3 pe-3">
              <CommonButton text="Edit Profile" width={"100%"} />
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <Image src={editprof} alt="Edit Profile" width={350} />
            </div>
          </div>
          <div className="col-lg-8 col-md-6 col-sm-12">
            <div className="col-sm-12 Profile-Edit-Section">
              <h5 className="custom-border ps-2">Profile Edit</h5>
              <div className="row p-2">
                <div className="col-lg-6 col-sm-12 mb-3">
                  <TextField label={"Name"} placeholder={"Name"} />
                </div>
                <div className="col-lg-6 col-sm-12 mb-3">
                  <TextField label={"Email"} placeholder={"email"} />
                </div>
                <div className="col-lg-6 col-sm-12 mb-3">
                  <TextField label={"Phone No"} placeholder={"phone no"} />
                </div>
                <div className="col-lg-6 col-sm-12 mb-3">
                  <TextField
                    label="Choose Profile Picture"
                    placeholder="Choose Profile Picture"
                    type="file"
                    id="profilePicture"
                  />
                </div>
              </div>
              <hr />
              <div className="d-flex flex-row justify-content-end gap-3 mb-3 pe-2">
                <CommonButton text="Save Changes" />
                <Button variant="secondary">Cancel</Button>
              </div>
            </div>
            <div className="col-lg-12 Profile-Edit-Section mt-2">
              <h5 className="custom-border ps-2">Password Change</h5>

              <div className="row p-2">
                <div className="col-lg-7 d-flex flex-column gap-2">
                  <TextField
                    label={"Current Password"}
                    placeholder={"current password"}
                  />
                  <TextField
                    label={"New Password"}
                    placeholder={"new password"}
                  />
                  <TextField
                    label={"Confirm Password"}
                    placeholder={"confirm password"}
                  />
                </div>
                <div className="col-lg-5 d-flex justify-content-center align-items-center">
                  <Image src={changepass} alt="Password" />
                </div>
              </div>
              <hr />
              <div className="d-flex flex-row justify-content-end gap-3 mb-3 pe-2">
                <CommonButton text="Save Changes" />
                <Button variant="secondary">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Adminlayout>
  );
};

export default index;
