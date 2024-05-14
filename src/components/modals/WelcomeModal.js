import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import TextField from "./TextField";
import "../styles/component.css";
import CommonButton from "./CommonButton";
import welcome from "../assets/images/welcome.png";
import Image from "next/image";


<Modal show={show} onHide={onHide} centered backdrop="static" size="md">
      <Modal.Header closeButton>
        <Modal.Title className="SignIn-Modal-Title">
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      

      {/* welocome image page; */}
      <div className="container-fluid">
          <div className="d-flex flex-column gap-2" >
            <label for="customRange3" class="form-label">Example range</label>
            <input type="range" class="form-range" min="0" max="5" step="0.5" id="customRange3" />
          </div>
          <div className="welcome" style={{color: "var(--primary-color)" ,fontWeight: "bold" }}>
            <label class="form-check-label" for="flexCheckDefault" >
              Welcome
            </label>
            </div>
            <div className="d-flex justify-content-center pe-2  pb-2">
              Join Us at JVS - Where Your Journey Begins!
            </div>
         
          <div className="welcomeimage d-flex align-items-center justify-content-center p-4 pt-4 pb-5">
            <Image src={welcome} alt="Centered Image" />
          </div>  
          <div className="next-button  pt-4 pb-3" style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px', position: 'absolute', bottom: '0', right: '0', width: '100%' }}>
            <CommonButton text={"Next"} />
          </div>
        </div>










{/* create form page */}
        <div className="container-fluid">

          <div className="d-flex flex-column gap-2">
            <label for="customRange3" class="form-label">Example range</label>
            <input type="range" class="form-range" min="0" max="5" step="0.5" id="customRange3" />
          </div>

          <label class="form-check-label" for="flexCheckDefault">
            Welcome
          </label>
          <div className="d-flex  pe-2  pb-3">
            Enter your personal details to create account.
          </div>

          <div class="row">
            <div className="col-6">
              <TextField label={"First Name"} placeholder={"Enter Your First Name"} value={email} type={"text"} />
            </div>
            <div className="col-6">
              <TextField label={"Last Name"} placeholder={"Enter the Last name"} value={password} type={"text"} />
            </div>
          </div>

          <div class="row">
            <div className="col-6">
              <TextField label={"Date Of Birth"} placeholder={"DD-MM-YYYY"} value={email} type={"text"} />
            </div>
            <div className="col-6">
              <TextField label={"Gender"} placeholder={"Enter the Sex"} value={password} type={"dropdownOpen"} />
              <ul class="dropdown-menu">
                <li><button class="dropdown-item" type="button">Male</button></li>
                <li><button class="dropdown-item" type="button">Female</button></li>
                <li><button class="dropdown-item" type="button">Something </button></li>
              </ul>

            </div>

          </div>

          <div class="row">
            <div className="col-6">
              <TextField label={"Email"} placeholder={"Enter Your Email"} value={email} onChange={handleEmailChange} type={"text"} />
            </div>
            <div className="col-6">
              <TextField label={"Password"} placeholder={"Enter the Password"} value={password} onChange={handlePasswordChange} type={"password"} />
            </div>
          </div>

          <div class="row">
            <div className="col-6">
              <TextField label={"Phone number"} placeholder={"Enter Your Phone Number"} value={email} type={"text"} />
            </div>
            <div className="col-6">
              <TextField label={"NIC"} placeholder={"Enter the NIC Number"} value={password} type={"number"} />
            </div>
          </div>

          <div class="row">
            <div className="col-6">
              <TextField label={"Address"} placeholder={"Enter Your Address"} value={email} type={"text"} />
            </div>
            <div className="col-6">
              <TextField label={"City"} placeholder={"Enter the City"} value={password} type={"text"} />
            </div>
          </div>

          <div class="row pt-2 pb-2" >
            <div className="d-flex gap-2 align-items-end justify-content-end">
              <CommonButton text={"Back"} />
              <CommonButton text={"Next"} />
            </div>
          </div>

        </div>










{/* photo upload page */}
        <div className="container-fluid">
          <div className="d-flex flex-column gap-2">
            <label for="customRange3" class="form-label">Example range</label>
            <input type="range" class="form-range" min="0" max="5" step="0.5" id="customRange3" />
          </div>
          <div className="d-flex flex-column gap-2">
            <TextField label={"About Me"} placeholder={"Small description about your self"} value={email} type={"text"} />
          </div>
          <div className="d-flex flex-column gap-2">
            <TextField label={"Upload Your Photo"} placeholder={"Upload a file or rag and drop PNG,JPG,GIF upto 10mb"} value={password} onChange={handlePasswordChange} type={"password"} />
          </div>

          <div class="row pt-2 pb-2" >
            <div className="d-flex gap-2 align-items-end justify-content-end">
              <CommonButton text={"Back"} />
              <CommonButton text={"Finish"} />
            </div>
          </div>
        </div>











{/* finish page */}
        {/* <div className="container-fluid">
          <div className="d-flex flex-column gap-2">
            <label for="customRange3" class="form-label">Example range</label>
            <input type="range" class="form-range" min="0" max="5" step="0.5" id="customRange3" />
          </div>
          <div className="finishimage">
            <Image src={finish} alt="Centered Image" />
          </div>
          <div className="d-flex justify-content-center pe-2 pt-2 " style={{ color: "var(--primary-color)" }}>
            <label class="form-check-label" for="flexCheckDefault" >
              Your Account has been
            </label>
          </div>
          <div className="d-flex justify-content-center pe-2  pb-2" style={{ color: "var(--primary-color)" }}>
            Successfully created!...
          </div>
          <div className="finish pe-2 pt-2 pb-1">
            <CommonButton text={"Start exploring"} width={"100%"} />
          </div>
          <div className="finish pe-2 pt-1 pb-2">
          <CommonButton text={"Go to dashboard"} width={"100%"} />
          </div>
        </div> */}




      </Modal.Body>
    </Modal>