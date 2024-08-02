import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import InputField from "../InputField";
import "../../styles/component.css";
import CommonButton from "../CommonButton";
import SignUpModal from "./SignUpModal";
import { customerLogin } from "@/src/redux/action/customer";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import Cookies from "js-cookie";

function SignInModal(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { show, onHide } = props;
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignUpClose = () => setShowSignUp(false);
  const handleSignUpShow = () => setShowSignUp(true);

  const switchToSignUp = () => {
    onHide();
    handleSignUpShow();
  };
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    Cookies.remove("token", { path: "/" });
    Cookies.remove("expert", { path: "/" });
    customerLogin(
      {
        username: email,
        password: password,
      },
      (res) => {
        if (res?.status == 200) {
          dispatch(setLoading(false));
          toast.success(res?.data?.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          dispatch(setLoading(false));
          toast.error(res?.data?.message);
        }
        
      }
    );
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered backdrop="static" size="md">
        <Modal.Header closeButton>
          <Modal.Title className="SignIn-Modal-Title">
            Sign in to Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="container-fluid">
              <div className="d-flex flex-column gap-2">
                <InputField
                  label={"Email"}
                  placeholder={"Enter Your Email"}
                  value={email}
                  onChange={handleEmailChange}
                  type={"text"}
                />
                <InputField
                  label={"Password"}
                  placeholder={"Enter the Password"}
                  value={password}
                  onChange={handlePasswordChange}
                  type={"password"}
                />
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
                Don't have an account ?
                <span
                  onClick={switchToSignUp}
                  style={{
                    cursor: "pointer",
                    color: "var(--primary-color)",
                    paddingLeft: "5px",
                    fontWeight: 500,
                  }}
                >
                  Create one
                </span>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <SignUpModal show={showSignUp} onHide={handleSignUpClose} />
    </>
  );
}

export default SignInModal;
