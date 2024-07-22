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
import {
  changeCustomerPassword,
  customerProfileEdit,
  deleteCustomer,
  getLoginCustomerDetail,
} from "@/src/redux/action/customer";
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
import { useRouter } from "next/navigation";
import { Customerlogout } from "@/src/redux/action/logout";
import ConfirmationModal from "@/src/components/modals/ConfirmationModal";
import { IconButton } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState({});
  const [selectedCustomerdata, setSelectedCustomerdata] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    dispatch(setLoading(true));
    getLoginCustomerDetail((res) => {
      if (res.status == 200) {
        setCustomerData(res.data);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, []);

  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

  const [customerUpdatedData, setCustomerUpdatedData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    profilePic: "",
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

  const handlechangePassword = (e) => {
    e.preventDefault();

    const datapass = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    changeCustomerPassword(datapass, (res) => {
      console.log(res);
      if (res.status === 200) {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const openDeleteConfirmationModal = (customerID) => {
    setSelectedCustomerdata(customerID);
    setDeleteConfirmationModal(true);
  };

  const closeDeleteConfirmationModal = () => {
    setDeleteConfirmationModal(false);
  };

  const deleteCustomerData = (userID) => {
    dispatch(setLoading(true));
    deleteCustomer(userID, (res) => {
      if (res.status == 200) {
        dispatch(setLoading(false));
        toast.success(res.data.message);
        closeDeleteConfirmationModal();
        setTimeout(() => {
          router.push("/home");
          Customerlogout();
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      handleProfilePicEdit(selectedFile);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleProfilePicEdit = async (selectedFile) => {
    if (!selectedFile) return;
    dispatch(setLoading(true));
    const customerId = customerData._id;
    let data = {};
    const uploadedImageUrl = await dispatch(uploadImage(selectedFile));
    if (uploadedImageUrl) {
      data.profilePic = uploadedImageUrl;
      customerProfileEdit(customerId, data, (res) => {
        if (res.status === 201 || res.status === 200) {
          setFile(null);
          dispatch(setLoading(false));
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          dispatch(setLoading(false));
          toast.error(res.data.message);
        }
      });
    } else {
      dispatch(setLoading(false));
      toast.error("Image upload failed");
    }
  };

  const handleOpen = () => {
    setShowProfile(!showProfile);
  };
  return (
    <>
      <Navbar />
      <div
        className="container-fluid min-vh-100 p-5 d-flex flex-column gap-5 alig-items-center justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <div className="container-fluid customer-personal-information">
          <div className="row d-flex justify-content-between align-items-center custom-profile-header">
            <div className="col-6 d-flex justify-content-start flex-column pt-1">
              <h2>Personal Information</h2>
              <p>Here You can change your Personal Details.</p>
            </div>
            {showProfile && (
              <div className="col-6 d-flex justify-content-end pe-5 gap-3 profile-button-group">
                <div>
                  <Button
                    variant="secondary"
                    style={{ width: 100, height: "100%" }}
                  >
                    Cancel
                  </Button>
                </div>
                <CommonButton
                  text="Save Changes"
                  width={150}
                  onClick={handleSubmit}
                />
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-lg-4 d-flex flex-column align-items-center">
              {/* <Image
                  src={
                    customerData && customerData.profilePic
                      ? customerData.profilePic
                      : avatar
                  }
                  className="avatar rounded-circle"
                  alt="avatar"
                  width={150}
                  height={150}
                /> */}
              <div className="Profile-setting-image rounded-circle">
                <Image
                  src={
                    customerData && customerData.profilePic
                      ? customerData.profilePic
                      : avatar
                  }
                  layout="fill"
                  objectFit="contain"
                  alt="avatar"
                />
                {showProfile && (
                  <div className="profile-camera-icon">
                    <IconButton
                      onClick={handleCameraClick}
                      sx={{
                        color: "var(--primary-color)",
                        transition: "transform 0.3s",
                        "&:hover": {
                          transform: "scale(1.1)",
                          color: "darkblue",
                        },
                      }}
                    >
                      <CameraAltIcon />
                    </IconButton>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div>
                )}
              </div>
              <h3 className="pb-3">{`${customerData &&
                customerData.fname} ${customerData && customerData.lname}`}</h3>
              <CommonButton
                text={`${!showProfile ? "Edit Profile" : "Close Profile"}`}
                width={248}
                onClick={handleOpen}
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
                    disable={!showProfile}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputField
                    label="Last Name"
                    placeholder="Enter your last name"
                    defaultValue={customerData && customerData.lname}
                    onChange={(value) => handleChange("lname", value)}
                    disable={!showProfile}
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
                    disable={!showProfile}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputField
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    defaultValue={customerData && customerData.phoneNo}
                    onChange={(value) => handleChange("phoneNo", value)}
                    disable={!showProfile}
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
                    disable={!showProfile}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputField
                    label="City"
                    placeholder="Select the City"
                    defaultValue={customerData && customerData.city}
                    onChange={(value) => handleChange("city", value)}
                    select
                    options={Districts}
                    disable={!showProfile}
                  />
                </div>
              </div>

              <div className="row pb-2">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="input-field" className="Text-input-label">
                      Address
                    </label>
                    <textarea
                      className="form-control"
                      placeholder={"Small description about your self"}
                      rows={3}
                      defaultValue={customerData && customerData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      disabled={!showProfile}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="input-field" className="Text-input-label">
                      About me
                    </label>
                    <textarea
                      className="form-control"
                      placeholder={"Small description about your self"}
                      rows={3}
                      defaultValue={customerData && customerData.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                      disabled={!showProfile}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid customer-personal-information">
          <div className="row d-flex justify-content-between align-items-center custom-profile-header">
            <div className="col-6 d-flex justify-content-start flex-column">
              <h2>Change password</h2>
              <p>Here you can change your password.</p>
            </div>
            {showProfile && (
              <div className="col-6 d-flex justify-content-end pe-5 gap-3 profile-button-group">
                <div>
                  <Button
                    variant="secondary"
                    style={{ width: 100, height: "100%" }}
                  >
                    Cancel
                  </Button>
                </div>
                <CommonButton
                  text="Save Changes"
                  width={150}
                  onClick={handlechangePassword}
                />
              </div>
            )}
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
                disable={!showProfile}
              />
              <InputField
                label="New Password"
                placeholder="Enter your new password"
                width={"70%"}
                type={"password"}
                value={newPassword}
                onChange={(value) => handleNewPasswordChange(value)}
                disable={!showProfile}
              />
              <InputField
                label="Confirm Password"
                placeholder="Confirm your password"
                width={"70%"}
                type={"password"}
                value={confirmPassword}
                onChange={(value) => handleConfirmPasswordChange(value)}
                disable={!showProfile}
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
              <button
                type="button"
                className="btn btn-danger"
                onClick={() =>
                  openDeleteConfirmationModal(customerData && customerData._id)
                }
              >
                Delete Your Account
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ConfirmationModal
        show={deleteConfirmationModal}
        message="Are you sure you want to delete Your Account"
        heading="Confirmation Delete !"
        variant="danger"
        onConfirm={() => deleteCustomerData(selectedCustomerdata)}
        onCancel={closeDeleteConfirmationModal}
      />
    </>
  );
};

export default index;
