import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import TextField from "../TextField";
import "../../styles/component.css";
import CommonButton from "../CommonButton";


function SignInModal(props) {
  const { show, onHide } = props;
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const { email, password } = inputValue;

  const handleEmailChange = (value) => {
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      email: value,
    }));
  };

  const handlePasswordChange = (value) => {
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      password: value,
    }));
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" size="md">
      <Modal.Header closeButton>
        <Modal.Title className="SignIn-Modal-Title">
          Sign in to Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <div className="container-fluid">
          <div className="d-flex flex-column gap-2">
            <TextField label={"Email"} placeholder={"Enter Your Email"} value={email} onChange={handleEmailChange} type={"text"}/>
            <TextField label={"Password"} placeholder={"Enter the Password"} value={password} onChange={handlePasswordChange} type={"password"}/>
          </div>
          <div className="form-check pt-2">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault">
              Remember Me
            </label>
          </div>
          <div className="d-flex justify-content-end pe-2 pt-2 pb-2">
            Forget Password?
          </div>
          <CommonButton text={"SignIn"} width={"100%"} />
          <div className="d-flex justify-content-center pe-2 pt-2 pb-2">
            Don't have an account ?<span>Create one</span>
          </div>
        </div>
      </Modal.Body>
    </Modal>

  );
}

export default SignInModal;
