import React, { useEffect, useState } from "react";
import CommonButton from "@/src/components/CommonButton";
import Image from "next/image";
import "../../../styles/admin.css";
import "../../admin/profile/profile.css";
import InputField from "@/src/components/InputField";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import { uploadImage } from "@/src/redux/action/imageUpload";
import {
  avatar,
  changepass,
  editprof,
  ProfileEdit,
} from "@/src/utils/ImagesPath";
import ExpertLayout from "@/src/layouts/ExpertLayout";
import {
  changeEmployeePassword,
  employeeProfileEdit,
  getEmployeeInfo,
} from "@/src/redux/action/employee";

const ExpertProfilePage = () => {
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const [employeeData, setemployeeData] = useState({});
  const [file, setFile] = useState(null);

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

    changeEmployeePassword(datapass, (res) => {
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(res?.data?.message);
      }
    });
  };

  const [userUpdatedData, setUserUpdatedData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profilePic: "",
  });

  useEffect(() => {
    dispatch(setLoading(true));
    getEmployeeInfo((res) => {
      if (res?.status == 200) {
        setemployeeData(res?.data);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, []);

  const handleOpen = () => {
    setShowProfile(!showProfile);
  };

  const handleChange = (field, value) => {
    setUserUpdatedData((prevemployeeData) => ({
      ...prevemployeeData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const employeeId = employeeData?._id;
    let data = { ...userUpdatedData };
    if (file) {
      const uploadedImageUrl = await dispatch(uploadImage(file));
      if (uploadedImageUrl) {
        console.log(uploadedImageUrl);
        data.profilePic = uploadedImageUrl;
      }
    }

    employeeProfileEdit(employeeId, data, (res) => {
      if (res?.status === 201) {
        setFile(null);
        dispatch(setLoading(false));
        toast.info(res?.data?.message);
      } else if (res?.status === 200) {
        setFile(null);
        dispatch(setLoading(false));
        toast.success(res?.data?.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(res?.data?.message);
      }
    });
  };

  return (
    <ExpertLayout>
      <div className="container-fluid Profile-Edit-Section">
        <div className="row p-1">
          <div className="col-lg-4 col-md-6 col-sm-12  Profile-Edit-Section p-2 mb-2">
            <div className="d-flex alig-items-center justify-content-center pt-5">
              <Image
                src={
                  employeeData?.profilePic ? employeeData?.profilePic : avatar
                }
                className="avatar rounded-circle"
                alt="avatar"
                width={150}
                height={150}
              />
            </div>
            <hr />
            <div className="text-center Profile-name-section pb-3">
               <h1>{employeeData?.name}</h1>
              <h2>Expert</h2>
            </div>
            <div className="ps-3 pe-3">
              <CommonButton
                text={`${!showProfile ? "Edit Profile" : "Close Profile"}`}
                width={"100%"}
                onClick={handleOpen}
              />
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <Image src={editprof} alt="Edit Profile" width={300} />
            </div>
          </div>
          {showProfile ? (
            <div className="col-lg-8 col-md-6 col-sm-12 mb-2">
              <form onSubmit={handleSubmit}>
                <div className="col-sm-12 Profile-Edit-Section">
                  <h5 className="custom-border ps-2">Profile Edit</h5>
                  <div className="row p-2">
                    <div className="col-lg-6 col-sm-12 mb-3">
                      <InputField
                        label={"Name"}
                        placeholder={"Name"}
                        defaultValue={employeeData?.name}
                        onChange={(value) => handleChange("name", value)}
                      />
                    </div>
                    <div className="col-lg-6 col-sm-12 mb-3">
                      <InputField
                        label={"Email"}
                        placeholder={"email"}
                        defaultValue={employeeData?.email}
                        onChange={(value) => handleChange("email", value)}
                      />
                    </div>
                    <div className="col-lg-6 col-sm-12 mb-3">
                      <InputField
                        label={"Phone No"}
                        placeholder={"phone no"}
                        defaultValue={employeeData?.phoneNumber}
                        onChange={(value) => handleChange("phoneNumber", value)}
                      />
                    </div>
                    {showProfile && (
                      <div className="col-lg-6 col-sm-12 mb-3">
                        <div className="form-group">
                          <label
                            htmlFor="input-field"
                            className="Text-input-label"
                          >
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
                    )}
                  </div>
                  <hr />
                  {showProfile && (
                    <div className="d-flex flex-row justify-content-end gap-3 mb-3 pe-2">
                      <CommonButton text="Save Changes" />
                      <Button variant="secondary">Cancel</Button>
                    </div>
                  )}
                </div>
              </form>

              <div className="col-lg-12 Profile-Edit-Section mt-2">
                <h5 className="custom-border ps-2">Password Change</h5>
                <div className="row p-2">
                  <div className="col-lg-7 d-flex flex-column gap-2">
                    <InputField
                      label={"Current Password"}
                      placeholder={"current password"}
                      type={"password"}
                      value={currentPassword}
                      onChange={(value) => handleCurrentPasswordChange(value)}
                    />
                    <InputField
                      label={"New Password"}
                      placeholder={"new password"}
                      type={"password"}
                      value={newPassword}
                      onChange={(value) => handleNewPasswordChange(value)}
                    />
                    <InputField
                      label={"Confirm Password"}
                      placeholder={"confirm password"}
                      type={"password"}
                      value={confirmPassword}
                      onChange={(value) => handleConfirmPasswordChange(value)}
                    />
                  </div>
                  <div className="col-lg-5 d-flex justify-content-center align-items-center">
                    <Image src={changepass} alt="Password" />
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row justify-content-end gap-3 mb-3 pe-2">
                  <CommonButton
                    text="Save Changes"
                    onClick={handlechangePassword}
                  />
                  <Button variant="secondary">Cancel</Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-lg-8 col-md-6 col-sm-12 mb-2">
              <div className="Profile-Edit-Section d-flex flex-column align-items-center justify-content-center h-100">
                <h1>Hi {employeeData?.name}</h1>
                <p>Welcome to Profile Section</p>
                <Image src={ProfileEdit} alt="" width={400} />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <ToastContainer /> */}
    </ExpertLayout>
  );
};

export default ExpertProfilePage;
