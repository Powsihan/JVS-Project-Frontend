import Adminlayout from '@/src/layouts/Adminlayout';
import React from 'react';
import CommonButton from "@/src/components/CommonButton";
import Image from "next/image";
import avatar from "/Applications/Project02/JVS-Project-Frontend/src/assets/images/Avatar.png";
import editprof from "/Applications/Project02/JVS-Project-Frontend/src/assets/images/Editprof.png";
import changepass from "/Applications/Project02/JVS-Project-Frontend/src/assets/images/Changepass.png";
import "../../../styles/admin.css";

import "./profile.css";

import TextField from "@/src/components/TextField";

const index = () => {
  return (
    <Adminlayout>
      <div className="container-fluid h-100 position-relative">
        <div className="row h-100">
          <div className="col-sm-4 d-flex flex-column justify-content-start align-items-center" style={{ backgroundColor: 'white' }}>
            <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', backgroundColor: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
              <div>
                <Image src={avatar} className="avatar" alt="avatar" style={{ objectFit: 'cover', width: '150px', height: '150px', borderRadius: '50%' }} />
              </div>
            </div>
            <div className="mt-2 text-center">
              <div>Ratheeswaran</div>
              <div>Admin</div>
            </div>
            <div>
              <CommonButton text="Edit Profile" width="150px" onPress={() => console.log("Edit Profile button pressed")} />
            </div>
            <div className="col-sm-8 d-flex justify-content-center align-items-center" style={{ position: 'relative' }}>
              <Image src={editprof} alt="Edit Profile" style={{ width: '227px', height: '227px', zIndex: '1' }} />
            </div>
          </div>
          <div className="col-sm-8">
            <div className="col-sm-12 border-bottom custom-border" style={{ backgroundColor: 'white', height: '50%', padding: '10px' }}>
              <span className="border-start custom-border" style={{ borderLeftWidth: '4px' }}>Profile Edit</span>
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <TextField label={"Name"} placeholder={"Name"} />
                </div>
                <div className="col-sm-6 mb-3">
                  <TextField label={"Email"} placeholder={"email"} />
                </div>
                <div className="col-sm-6 mb-3">
                  <TextField label={"Phone No"} placeholder={"phone no"} />
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="col-sm-6 mb-3">
                    <TextField label="Choose Profile Picture" placeholder="Choose Profile Picture" type="file" id="profilePicture" />
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-6 mb-3">
                      <CommonButton text="Save Changes" width="100%" onPress={() => console.log("Save Changes button pressed")} />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <CommonButton text="Cancel" width="60%" onPress={() => console.log("Cancel button pressed")} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 border-bottom custom-border" style={{ backgroundColor: 'white', height: '50%', padding: '10px' }}>
              <span className="border-start custom-border" style={{ borderLeftWidth: '4px' }}>Password Change</span>
              <div className="row">
                <div className="col-sm-8 mb-3">
                  <TextField label={"Current Password"} placeholder={"current password"} />
                </div>
                <div className="col-sm-8 mb-3">
                  <TextField label={"New Password"} placeholder={"new password"} />

                </div>
                <div className="col-sm-8 mb-3">
                  <TextField label={"Confirm Password"} placeholder={"confirm password"} />
                </div>
                <div className="col-sm-4 d-flex justify-content-center align-items-center">
                  <Image src={changepass} alt="Password" style={{ width: '227px', height: '227px', zIndex: '1' }} />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6 mb-3">
                  <CommonButton text="Save Changes" width="100%" onPress={() => console.log("Save Changes button pressed")} />
                </div>
                <div className="col-sm-6 mb-3">
                  <CommonButton text="Cancel" width="60%" onPress={() => console.log("Cancel button pressed")} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Adminlayout>
  );
};

export default index;
