import "../../app/globals.css";
import CommonButton from "@/src/components/CommonButton";
import Navbar from "@/src/layouts/Navbar";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import { Button } from "react-bootstrap";
import TextField from "@/src/components/TextField";
import avatar from "../../assets/images/avatar.svg";
import cusprof from "../../assets/images/Cusprof.png"
import redd from "../../assets/images/redd.svg";

import "./customerprofile.css"

const index = () => {
    return (
        <>
            {/* <Navbar /> */}

            <div className="container-fluid min-vh-100 p-5 d-flex flex-column gap-5 alig-items-center justify-content-center ">
                <div className="container-fluid customer-personal-information">
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-6 d-flex justify-content-start flex-column ps-5">
                            <h2>Personal Information</h2>
                            <p>Here You can change your Personal Details.</p>
                        </div>
                        <div className="col-6 d-flex justify-content-end pe-5 gap-3">
                            <Button variant="secondary">Cancel</Button>
                            <CommonButton text="Save Changes" />

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 d-flex flex-column align-items-center">
                            <Image src={avatar} className="avatar rounded-circle" alt="avatar" width={150} height={150} />
                            <h3>Thanushika</h3>
                            <CommonButton text="Change Avatar" />
                        </div>

                        <div className="row col-lg-8 d-flex justify-content-center">
                            <div className="col-lg-4">
                                <TextField
                                    label="First Name"
                                    placeholder="Enter your first name"
                                />
                                <TextField
                                    label="Date of Birth"
                                    placeholder="DD-MM-YY"
                                />
                                <TextField
                                    label="Email Address"
                                    placeholder="Enter your Email Address"
                                />
                                <TextField
                                    label="NIC"
                                    placeholder="Enter your NIC"
                                />
                            </div>
                            <div className="col-lg-4">
                                <TextField
                                    label="Last Name"
                                    placeholder="Enter your last name"
                                />
                                <TextField
                                    label="Phone Number"
                                    placeholder="Enter your phone number"
                                />
                                <TextField
                                    label="Address"
                                    placeholder="Enter your Address"
                                />
                                <TextField
                                    label="City"
                                    placeholder="Enter your city"
                                />
                            </div>
                            <div className="col-lg-8">
                                <TextField
                                    label="About"
                                    placeholder="Value"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid customer-change-password">
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-6 d-flex justify-content-start flex-column ps-5">
                            <h2>Change password</h2>
                            <p>Here you can change your password.</p>
                        </div>
                        <div className="col-6 d-flex justify-content-end pe-5 gap-3">
                            <Button variant="secondary">Cancel</Button>
                            <CommonButton text="Save Changes" />
                        </div>
                        <div className="col-lg-4 ps-5">
                            <TextField
                                label="Current Password"
                                placeholder="Enter your current password"
                            />
                            <TextField
                                label="New Password"
                                placeholder="Enter your new password"
                            />
                            <TextField
                                label="Confirm Password"
                                placeholder="Confirm your password"
                            />
                        </div>
                        <div className="col-lg-8 d-flex justify-content-center align-items-center">
                            <Image src={cusprof} alt="imageee" width={300} height={300} />
                        </div>
                    </div>
                </div>

                <div className="container-fluid customer-delete-account" >
    <div className="d-flex justify-content-between align-items-center">
        <div>
            <Image src={redd} alt="reddicon" width={60} height={60} />
        </div>
        <div>
            <button type="button" className="btn btn-danger">Delete Your Account</button>
        </div>
    </div>
</div>


            </div>

        </>
    );
};

export default index;
