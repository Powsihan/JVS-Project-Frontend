import React, { useState } from "react";
import "../../styles/admin.css";
import "../../styles/component.css";
import Image from "next/image";
import InputField from "../InputField";
import { EmployeeRole } from "@/src/data/datas";
import { FileUploader } from "react-drag-drop-files";
import CommonButton from "../CommonButton";
import { Button } from "react-bootstrap";
import { registerEmployee } from "@/src/redux/action/employee";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import { uploadImage } from "@/src/redux/action/imageUpload";
import { employeeback } from "@/src/utils/ImagesPath";

const AddEmployee = (props) => {
  const dispatch = useDispatch();
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
  const [file, setFile] = useState(null);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profilePic: "",
  });

  const handleChange = (field, value) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFileChange = (files) => {
    setFile(files);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^\d{10}$/;
    return re.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(employeeData.email)) {
      toast.info("Please enter a valid email address.");
      return;
    }
    if (!validatePhoneNumber(employeeData.phoneNumber)) {
      toast.info("Please enter a valid 10-digit phone number.");
      return;
    }
    dispatch(setLoading(true));

    let data = { ...employeeData };
    if (file) {
      const uploadedImageUrl = await dispatch(uploadImage(file));
      if (uploadedImageUrl) {
        console.log(uploadedImageUrl);
        data.profilePic = uploadedImageUrl;
      }
    }

    registerEmployee(data, (res) => {
      dispatch(setLoading(false));
      if (res.status === 200) {
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

  return (
    <div className="container-fluid Add-Vehicle-Section">
      <form onSubmit={handleSubmit}>
        <h1 className="row ps-2 pb-3">Add Employees</h1>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
            <Image src={employeeback} width={500} loading="lazy"/>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-column justify-content-center">
            <div className="row pb-3">
              <div className="col-lg-6 col-md-12 col-sm-12 pb-3">
                <InputField
                  label={"Name"}
                  placeholder={"Enter the Employee Name"}
                  onChange={(value) => handleChange("name", value)}
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <InputField
                  label={"Email"}
                  placeholder={"Enter the Employee Email"}
                  onChange={(value) => handleChange("email", value)}
                />
              </div>
            </div>
            <div className="row pb-3">
              <div className="col-lg-6 col-md-12 col-sm-12 pb-3">
                <InputField
                  label={"PhoneNo"}
                  placeholder={"Enter the PhoneNo"}
                  onChange={(value) => handleChange("phoneNumber", value)}
                  type={"number"}
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <InputField
                  label={"Role"}
                  placeholder={"Select the Employee Role"}
                  onChange={(value) => handleChange("role", value)}
                  select
                  options={EmployeeRole}
                />
              </div>
            </div>
            <div className="row pb-3">
              <label htmlFor="input-field" className="Text-input-label pb-2">
                Upload Profile Image
              </label>
              <div>
                <FileUploader
                  handleChange={(file) => handleFileChange(file)}
                  name="file"
                  types={fileTypes}
                  label={"Upload Main Image"}
                />
              </div>
            </div>
            <hr />
            <div className="d-flex gap-2 justify-content-end pe-2 pb-3">
              <CommonButton
                text={"Register"}
                width={164}
                onClick={handleSubmit}
              />
              <Button
                variant="secondary"
                onClick={props.handleClose}
                style={{ width: 111 }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
