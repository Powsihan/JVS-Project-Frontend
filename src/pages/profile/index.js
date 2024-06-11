import "../../app/globals.css";
import CommonButton from "@/src/components/CommonButton";
import Navbar from "@/src/layouts/Navbar";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import "../../styles/home.css";
import { Button } from "react-bootstrap";
import InputField from "@/src/components/InputField";
import "./customerprofile.css";
import { Districts } from "@/src/data/datas";
import Cookies from "js-cookie";
import { customerProfileEdit } from "@/src/redux/action/customer";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import { uploadImage } from "@/src/redux/action/imageUpload";
import {
  avatar,
  chnagepassword,
  chnagepassword2,
  danger,
} from "@/src/utils/ImagesPath";
import Footer from "@/src/layouts/Footer";

const index = () => {
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState({});
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  useEffect(() => {
    const storecustomerData = Cookies.get("customer");
    if (storecustomerData) {
      setCustomerData(JSON.parse(storecustomerData));
    }
  }, []);

  const [customerUpdatedData, setCustomerUpdatedData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    profilePic: "",
    dob: "",
    address: "",
    nic: "",
    gender: "",
    phoneNo: "",
    city: "",
    description: "",
  });

  const handleChange = (field, value) => {
    setCustomerUpdatedData((prevCustomerData) => ({
      ...prevCustomerData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const customerId = customerData._id;
    let data = { ...customerUpdatedData };
    if (file) {
      const uploadedImageUrl = await dispatch(uploadImage(file));
      if (uploadedImageUrl) {
        console.log(uploadedImageUrl);
        data.profilePic = uploadedImageUrl;
      }
    }

    customerProfileEdit(customerId, data, (res) => {
      console.log(res);
      dispatch(setLoading(false));
      if (res.status === 201) {
        setFile(null);
        toast.info(res.data.message);
      } else if (res.status === 200) {
        setFile(null);
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleProfileChangeClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCurrentPasswordChange = (value) => {
    setCurrentPassword(value);
  };

  const handleNewPasswordChange = (value) => {
    setNewPassword(value);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
  };

  const handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
    const customerId = customerData._id;
    const datapass = {
      password: newPassword,
    };
    if (newPassword !== confirmPassword) {
      toast.error("Password not match");
      return;
    }

    customerProfileEdit(customerId, datapass, (res) => {
      console.log(res);
      if (res.status === 200) {
        toast.success("Password changed successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Current password is Wrong");
      }
    });
  };
  return (
    <>
      <Navbar />
      <div
        className="container-fluid min-vh-100 p-5 d-flex flex-column gap-5 alig-items-center justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <div className="container-fluid customer-personal-information">
          <form onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-between align-items-center custom-profile-header">
              <div className="col-6 d-flex justify-content-start flex-column pt-1">
                <h2>Personal Information</h2>
                <p>Here You can change your Personal Details.</p>
              </div>
              <div className="col-6 d-flex justify-content-end pe-5 gap-3 profile-button-group">
                <div>
                  <Button
                    variant="secondary"
                    style={{ width: 100, height: "100%" }}
                  >
                    Cancel
                  </Button>
                </div>
                <CommonButton text="Save Changes" width={150} />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 d-flex flex-column align-items-center">
                <Image
                  src={
                    customerData && customerData.profilePic
                      ? customerData.profilePic
                      : avatar
                  }
                  className="avatar rounded-circle"
                  alt="avatar"
                  width={150}
                  height={150}
                />
                <h3>{`${customerData && customerData.fname} ${
                  customerData && customerData.lname
                }`}</h3>
                <CommonButton
                  text="Change Profile"
                  onClick={handleProfileChangeClick}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>

              <div className="col-lg-8 d-flex p-2 pb-3 flex-column ps-5 pe-5">
                <div className="row pb-2">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <InputField
                      label="First Name"
                      placeholder="Enter your first name"
                      defaultValue={customerData && customerData.fname}
                      onChange={(value) => handleChange("fname", value)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <InputField
                      label="Last Name"
                      placeholder="Enter your last name"
                      defaultValue={customerData && customerData.lname}
                      onChange={(value) => handleChange("lname", value)}
                    />
                  </div>
                </div>
                <div className="row pb-2">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <InputField
                      label="Date of Birth"
                      placeholder="DD-MM-YY"
                      type={"date"}
                      defaultValue={customerData && customerData.date}
                      onChange={(value) => handleChange("date", value)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <InputField
                      label="Phone Number"
                      placeholder="Enter your phone number"
                      defaultValue={customerData && customerData.phoneNo}
                      onChange={(value) => handleChange("phoneNo", value)}
                    />
                  </div>
                </div>
                <div className="row pb-2">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <InputField
                      label="Email Address"
                      placeholder="Enter your Email Address"
                      defaultValue={customerData && customerData.email}
                      onChange={(value) => handleChange("email", value)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <InputField
                      label="Address"
                      placeholder="Enter your Address"
                      defaultValue={customerData && customerData.address}
                      onChange={(value) => handleChange("address", value)}
                    />
                  </div>
                </div>
                <div className="row pb-2">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <InputField
                      label="NIC"
                      placeholder="Enter your NIC"
                      defaultValue={customerData && customerData.nic}
                      onChange={(value) => handleChange("nic", value)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <InputField
                      label="City"
                      placeholder="Select the City"
                      defaultValue={customerData.city}
                      onChange={(value) => handleChange("city", value)}
                      select
                      options={Districts}
                    />
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
                      defaultValue={customerData && customerData.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="container-fluid customer-personal-information">
          <form onSubmit={handlePasswordChangeSubmit}>
            <div className="row d-flex justify-content-between align-items-center custom-profile-header">
              <div className="col-6 d-flex justify-content-start flex-column">
                <h2>Change password</h2>
                <p>Here you can change your password.</p>
              </div>
              <div className="col-6 d-flex justify-content-end pe-5 gap-3 profile-button-group">
                <div>
                  <Button
                    variant="secondary"
                    style={{ width: 100, height: "100%" }}
                  >
                    Cancel
                  </Button>
                </div>
                <CommonButton text="Save Changes" width={150} />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 d-flex flex-column gap-3  justify-content-center ps-5">
                <InputField
                  label="Current Password"
                  placeholder="Enter your current password"
                  width={"70%"}
                  type={"password"}
                  value={currentPassword}
                  onChange={(value) => handleCurrentPasswordChange(value)}
                />
                <InputField
                  label="New Password"
                  placeholder="Enter your new password"
                  width={"70%"}
                  type={"password"}
                  value={newPassword}
                  onChange={(value) => handleNewPasswordChange(value)}
                />
                <InputField
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  width={"70%"}
                  type={"password"}
                  value={confirmPassword}
                  onChange={(value) => handleConfirmPasswordChange(value)}
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
      <Footer />
    </>
  );
};

export default index;
