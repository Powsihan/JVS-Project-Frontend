import Adminlayout from "@/src/layouts/Adminlayout";
import React, { useEffect, useState } from "react";
import CommonButton from "@/src/components/CommonButton";
import Image from "next/image";
import avatar from "../../../assets/images/avatar.svg";
import editprof from "../../../assets/images/Editprof.png";
import changepass from "../../../assets/images/changepassword.png";
import ProfileEdit from "../../../assets/images/Profileedit.svg";
import "../../../styles/admin.css";
import { Cloudinary } from "cloudinary-core";
import "./profile.css";

import InputField from "@/src/components/InputField";
import { Button } from "react-bootstrap";
import Cookies from "js-cookie";
import { userProfileEdit } from "@/src/redux/action/user";
import { toast, ToastContainer } from "react-toastify";

const index = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [userData, setUserData] = useState({});
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

  const handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
    const userId = userData._id;
    const datapass = {
      password: newPassword,
    };
    if (newPassword !== confirmPassword) {
      toast.error("Password not match");
      return;
    }
   
    userProfileEdit(userId, datapass, (res) => {
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

  const [userUpdatedData, setUserUpdatedData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profilePic: "",
  });

  useEffect(() => {
    const storedUserData = Cookies.get("token");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  // console.log(userData);

  const handleOpen = () => {
    setShowProfile(!showProfile);
  };

  const handleChange = (field, value) => {
    setUserUpdatedData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = userData._id;
    let data = { ...userUpdatedData };
    if (file) {
      const uploadedImageUrl = await handleUpload(file);
      if (uploadedImageUrl) {
        console.log(uploadedImageUrl);
        data.profilePic = uploadedImageUrl;
      }
    }

    userProfileEdit(userId, data, (res) => {
      console.log(res);
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

  const handleUpload = async (file) => {
    if (!file) return false;

    try {
      const cloudinary = new Cloudinary({ cloud_name: "dkvtkwars" });
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "JV-Project");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dkvtkwars/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Upload successful. Public ID:", data.public_id);
        console.log(data);
        return data.secure_url;
      } else {
        console.error("Upload failed.");
        return false;
      }
    } catch (error) {
      console.error("Upload error:", error);
      return false;
    }
  };

  return (
    <Adminlayout>
      <div className="container-fluid Profile-Edit-Section">
        <div className="row p-1">
          <div className="col-lg-4 col-md-6 col-sm-12 d-flex flex-column justify-content-center Profile-Edit-Section p-2">
            <div className="d-flex alig-items-center justify-content-center">
              <Image
                src={
                  userData && userData.profilePic ? userData.profilePic : avatar
                }
                className="avatar rounded-circle"
                alt="avatar"
                width={150}
                height={150}
              />
            </div>
            <hr />
            <div className="text-center Profile-name-section pb-3">
              {userData && <h1>{userData.name}</h1>}
              <h2>Admin</h2>
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
            <div className="col-lg-8 col-md-6 col-sm-12">
              <form onSubmit={handleSubmit}>
                <div className="col-sm-12 Profile-Edit-Section">
                  <h5 className="custom-border ps-2">Profile Edit</h5>
                  <div className="row p-2">
                    <div className="col-lg-6 col-sm-12 mb-3">
                      <InputField
                        label={"Name"}
                        placeholder={"Name"}
                        defaultValue={userData.name}
                        onChange={(value) => handleChange("name", value)}
                      />
                    </div>
                    <div className="col-lg-6 col-sm-12 mb-3">
                      <InputField
                        label={"Email"}
                        placeholder={"email"}
                        defaultValue={userData.email}
                        onChange={(value) => handleChange("email", value)}
                      />
                    </div>
                    <div className="col-lg-6 col-sm-12 mb-3">
                      <InputField
                        label={"Phone No"}
                        placeholder={"phone no"}
                        defaultValue={userData.phoneNumber}
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
                <form onSubmit={handlePasswordChangeSubmit}>
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
                    <CommonButton text="Save Changes" />
                    <Button variant="secondary">Cancel</Button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="col-lg-8 col-md-6 col-sm-12 Profile-Edit-Section d-flex flex-column align-items-center justify-content-center ">
              <h1>Hi {userData && userData.name}</h1>
              <p>Welcome to Profile Section</p>
              <Image src={ProfileEdit} alt="" width={400} />
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </Adminlayout>
  );
};

export default index;
