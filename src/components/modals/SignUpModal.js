import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import InputField from "../InputField";
import "../../styles/component.css";
import CommonButton from "../CommonButton";
import welcome from "../../assets/images/welcome.png";
import Image from "next/image";
import { Districts, Gender } from "@/src/data/datas";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { registerCustomer } from "@/src/redux/action/customer";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import { usePathname, useRouter } from "next/navigation";
import { uploadImage } from "@/src/redux/action/imageUpload";
import { signUpfinish } from "@/src/utils/ImagesPath";

function SignUpModal(props) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState({
    fname: "",
    lname: "",
    dob: "",
    gender: "",
    email: "",
    password: "",
    phoneNo: "",
    nic: "",
    address: "",
    city: "",
    description: "",
    profilePic: "",
  });

  const [file, setFile] = useState(null);

  const { show, onHide } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(
    new Array(4).fill(false)
  );

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
    setCompletedSteps((prevSteps) =>
      prevSteps.map((step, index) => (index === activeStep ? true : step))
    );
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    let data = { ...customerData };
    if (file) {
      const uploadedImageUrl = await dispatch(uploadImage(file));
      if (uploadedImageUrl) {
        console.log(uploadedImageUrl);
        data.profilePic = uploadedImageUrl;
      }
    }
    registerCustomer(data, (res) => {
      if (res.status === 200) {
        setFile(null);
        dispatch(setLoading(false));
        toast.success(res.data.message);
        handleNext();
        return;
      } else if (res.status === 500) {
        dispatch(setLoading(false));
        toast.error("Invalid User Data");
      } else {
        dispatch(setLoading(false));
        toast.error(res.data.message);
      }
    });
  };

  const handleChange = (field, value) => {
    setCustomerData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const steps = [
    {
      title: "Welcome",
      content: (
        <div className="container-fluid SignUp-Welcome-Container">
          <h1>Welcome</h1>
          <p className="d-flex justify-content-center align-items-center">
            Join Us at JVS - Where Your Journey Begins!
          </p>
          <div className="welcomeimage d-flex align-items-center justify-content-center p-4 pt-4 pb-5">
            <Image src={welcome} alt="Centered Image" />
          </div>
          <div className="d-flex justify-content-end pe-2">
            <CommonButton text={"Next"} width={100} onClick={handleNext} />
          </div>
        </div>
      ),
    },
    {
      title: "Create Account",
      content: (
        <div className="container-fluid SignUp-Welcome-Container">
          <h1>Create Account</h1>
          <p className="d-flex">
            Enter your personal details to create account.
          </p>
          <div class="row pb-2">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputField
                label={"First Name"}
                placeholder={"Enter Your First Name"}
                type={"text"}
                onChange={(value) => handleChange("fname", value)}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputField
                label={"Last Name"}
                placeholder={"Enter the Last name"}
                type={"text"}
                onChange={(value) => handleChange("lname", value)}
              />
            </div>
          </div>

          <div class="row pb-2">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputField
                label={"Date Of Birth"}
                placeholder={"DD-MM-YYYY"}
                type={"date"}
                onChange={(value) => handleChange("dob", value)}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <label htmlFor="input-field" className="Text-input-label">
                  Gender
                </label>
                <select
                  className="form-control"
                  onChange={(e) => handleChange("gender", e.target.value)}
                >
                  <option value="">Select the Gender</option>
                  {Gender.map((data, index) => (
                    <option key={index} value={data}>
                      {data}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div class="row pb-2">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputField
                label={"Email"}
                placeholder={"Enter Your Email"}
                type={"text"}
                onChange={(value) => handleChange("email", value)}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputField
                label={"Password"}
                placeholder={"Enter the Password"}
                type={"password"}
                onChange={(value) => handleChange("password", value)}
              />
            </div>
          </div>

          <div class="row pb-2">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputField
                label={"Phone number"}
                placeholder={"Enter Your Phone Number"}
                type={"text"}
                onChange={(value) => handleChange("phoneNo", value)}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputField
                label={"NIC"}
                placeholder={"Enter the NIC Number"}
                type={"text"}
                onChange={(value) => handleChange("nic", value)}
              />
            </div>
          </div>

          <div class="row pb-4">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputField
                label={"Address"}
                placeholder={"Enter Your Address"}
                type={"text"}
                onChange={(value) => handleChange("address", value)}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <label htmlFor="input-field" className="Text-input-label">
                  City
                </label>
                <select
                  className="form-control"
                  onChange={(e) => handleChange("city", e.target.value)}
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

          <div class="row">
            <div className="d-flex gap-3 align-items-end justify-content-end">
              <CommonButton text={"Back"} width={100} onClick={handleBack} />
              <CommonButton text={"Next"} width={100} onClick={handleNext} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Create Account Cont",
      content: (
        <div className="container-fluid">
          <div className="row pb-3">
            <div className="form-group">
              <label htmlFor="input-field" className="Text-input-label">
                About me
              </label>
              <textarea
                className="form-control"
                placeholder={"Small description about your self"}
                rows={5}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </div>
          <div className="row pb-4">
            <div className="form-group">
              <label htmlFor="input-field" className="Text-input-label">
                Choose Profile Picture
              </label>
              <input
                className="form-control"
                placeholder="Choose Profile Picture"
                type="file"
                id="profilePicture"
                onChange={(e) => {
                  console.log(e);
                  e?.target && setFile(e.target.files[0]);
                }}
              />
            </div>
          </div>

          <div className="row">
            <div className="d-flex gap-2 align-items-end justify-content-end">
              <CommonButton text={"Back"} width={100} onClick={handleBack} />
              <CommonButton text={"Finish"} width={100} type="submit" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Finish",
      content: (
        <div className="container-fluid p-5">
          <div className="d-flex align-items-center justify-content-center ">
            <Image src={signUpfinish} alt="" />
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center Account-created pt-3">
            <h1>Your Account has been Successfully created!...</h1>
            <h3>Now you can start exploring !</h3>
          </div>
          <div className="d-flex flex-column justify-content-center gap-2 ps-5 pe-5">
            <CommonButton
              text={"Start exploring"}
              width={"100%"}
              onClick={() => {
                if (pathname === "/home") {
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                } else {
                  router.push("/home");
                }
                onHide();
              }}
            />
            <Button
              variant="secondary"
              width={"100%"}
              onClick={() => {
                router.push("/profile");
              }}
            >
              Go to Profile
            </Button>
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-center gap-5 pb-4">
            {completedSteps.map((completed, index) =>
              completed ? (
                <CheckCircleIcon
                  key={`step-${index}`}
                  sx={{ color: "var(--primary-color)" }}
                />
              ) : (
                <RadioButtonCheckedIcon
                  key={`step-${index}`}
                  sx={{ color: "#a1a1a1" }}
                />
              )
            )}
          </div>
          <form onSubmit={handleSubmit}>{steps[activeStep].content}</form>
        </Modal.Body>
      </Modal>
      {/* <ToastContainer /> */}
    </>
  );
}

export default SignUpModal;
