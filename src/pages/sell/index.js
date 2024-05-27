import Navbar from "@/src/layouts/Navbar";
import React, { useState } from "react";
import Image from "next/image";
import sellvh from "../../assets/images/Sellvh.png";
import CommonButton from "@/src/components/CommonButton";
import "./sellvehicle.css";
import InputField from "@/src/components/InputField";
import sellvehicon from "../../assets/images/points_arrow.svg";
import sellvehicle from "../../assets/images/sellvehicle.png";
import sellvehiclebutton from "../../assets/icons/sell-vehicle.svg";
import { Button } from "react-bootstrap";
import { sellvehiclecontent } from "@/src/data/content";
import {
  Brand,
  Districts,
  Features,
  FuelType,
  GearCount,
  OwnershipOptions,
  VehicleColors,
  VehicleTransmission,
  Vehicletype,
} from "@/src/data/datas";
import { FileUploader } from "react-drag-drop-files";
import { Cloudinary } from "cloudinary-core";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import { addVehicle } from "@/src/redux/action/vehicle";
import { toast } from "react-toastify";

const index = () => {
  const dispatch = useDispatch();
  const fileTypes = ["JPG", "PNG", "GIF","JPEG"];
  const [mainImageFile, setMainImageFile] = useState(null);
  const [outsideViewFiles, setOutsideViewFiles] = useState([]);
  const [insideViewFiles, setInsideViewFiles] = useState([]);
  const [vehicleData, setVehicleData] = useState({
    name: "",
    registerno: "",
    type: "",
    brand: "",
    model: "",
    price: "",
    ownership: "",
    transmission: "",
    gear: "",
    color: "",
    yom: "",
    fuel: "",
    fuelcap: "",
    power: "",
    mileage: "",
    noofdoors: "",
    noofseats: "",
    district: "",
    description: "",
    features: "",
    documents: "",
    image: "",
  });

  const scrollToSellVehicle = () => {
    const salesSection = document.getElementById("sales");
    if (salesSection) {
      salesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChange = (field, value) => {
    setVehicleData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFeatureChange = (feature) => {
    setVehicleData((prevData) => {
      const features = prevData.features.includes(feature)
        ? prevData.features.filter((f) => f !== feature)
        : [...prevData.features, feature];
      return { ...prevData, features };
    });
  };

  const generateYears = () => {
    const years = [];
    for (let year = 1950; year <= 2023; year++) {
      years.push(year);
    }
    return years;
  };

  const years = generateYears();


  const handleFileChange = (files, category) => {
    if (category === "main") {
      setMainImageFile(files);
    }else if (category === "outside") {
      setOutsideViewFiles((prevFiles) => [...prevFiles, ...files]); 
    } else if (category === "inside") {
      setInsideViewFiles((prevFiles) => [...prevFiles, ...files]); 
    }
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const imageUrls = [];

    if (mainImageFile) {
      const uploadedImageUrl = await handleUpload(mainImageFile);
      if (uploadedImageUrl) {
        imageUrls.push(uploadedImageUrl);
      }
    }
    if (outsideViewFiles.length > 0) {
      for (const file of outsideViewFiles) {
        const uploadedImageUrl = await handleUpload(file);
        if (uploadedImageUrl) {
          imageUrls.push(uploadedImageUrl);
        }
      }
    }
    if (insideViewFiles.length > 0) {
      for (const file of insideViewFiles) {
        const uploadedImageUrl = await handleUpload(file);
        if (uploadedImageUrl) {
          imageUrls.push(uploadedImageUrl);
        }
      }
    }
   

    const updatedVehicleData = {
      ...vehicleData,
      image: imageUrls,
    };

    addVehicle(updatedVehicleData, (res) => {
      dispatch(setLoading(false));
      if (res.status === 200) {
        toast.success("Vehicle Request Send Successfully..!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    });
  };
  return (
    <>
      <Navbar />

      <div className="container-fluid min-vh-100 d-flex justify-content-start align-items-center sell-vehicle-home ps-5">
        <div className="">
          <h2 className="pb-4">Are you looking to sell your vehicle? </h2>
          {sellvehiclecontent.map((data) => (
            <div className="d-flex flex-row gap-3 mb-3">
              <Image src={sellvehicon} alt="" />
              <h4>{data}</h4>
            </div>
          ))}
          <div className="pt-4">
            <CommonButton
              text="Sell Your Vehicle"
              width={250}
              image={sellvehiclebutton}
              onClick={scrollToSellVehicle}
            />
          </div>
        </div>
        {/* style={{backgroundColor:'pink'}} */}
      </div>

      <div className="container-fluid min-vh-100 p-5" id="sales">
        <div className="Sell-Vehicle-Section container-fluid">
          <form onSubmit={handleSubmit}>
          <h1 className="row header-outer ps-2">Sell Your Vehicle</h1>
          <hr />
          <div className="row pb-2">
            <div className="col-lg-5 col-md-6 col-sm-12 d-flex align-items-center justify-content-center">
              <Image
                src={sellvehicle}
                alt="vehicleee"
                width={250}
                height={250}
              />
            </div>
            <div className="col-lg-7 col-md-6 col-sm-12 pe-3 ps-2">
              <div className="row pb-2">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputField
                    label="Vehicle Register No"
                    placeholder="Enter the register no"
                    onChange={(value) => handleChange("registerno", value)}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputField
                    label="Name"
                    placeholder="Enter the vehicle name"
                    onChange={(value) => handleChange("name", value)}
                  />
                </div>
              </div>
              <div className="row pb-2">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputField
                    label="District"
                    placeholder="Select your district"
                    select
                    options={Districts}
                    onChange={(value) => handleChange("district", value)}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="input-field" className="Text-input-label">
                      OwnerShip
                    </label>
                    <div className="d-flex gap-3">
                      {OwnershipOptions.map((option, index) => (
                        <div className="form-check" key={index}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="ownership"
                            id={`ownership-${option}`}
                            value={option}
                            onChange={(e) => handleChange("ownership", e.target.value)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`ownership-${option}`}
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pb-2">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputField
                    label="Vehicle Type"
                    placeholder="Select Type"
                    select
                    options={Vehicletype}
                    onChange={(value) => handleChange("type", value)}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputField
                    label="Price"
                    placeholder="Enter the price"
                    type={"number"}
                    onChange={(value) => handleChange("price", value)}
                  />
                </div>
              </div>
              <div className="row pb-2">
                <div className="col-lg-6">
                  <InputField
                    label="Brand"
                    placeholder="Enter the brand"
                    select
                    options={Brand}
                    onChange={(value) => handleChange("brand", value)}
                  />
                </div>
                <div className="col-lg-6">
                  <InputField
                    label="Modal"
                    placeholder="Enter the modal"
                    type={"text"}
                    onChange={(value) => handleChange("model", value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row pb-2 ps-2">
            <div className="col-lg-3 col-md-4 col-sm-12 pb-2">
              <InputField
                label="Transmission"
                placeholder="Select the Transmission"
                select
                options={VehicleTransmission}
                onChange={(value) => handleChange("transmission", value)}
              />
            </div>
            <div className="col-lg-2 col-md-4 col-sm-12 pb-2">
              <InputField
                label="Gear Box"
                placeholder="Select the Gear Count"
                onChange={(value) => handleChange("gear", value)}
                select
                options={GearCount}
              />
            </div>
            <div className="col-lg-2 col-md-4 col-sm-12 pb-2">
              <InputField
                label="Color"
                placeholder="Select the Color"
                onChange={(value) => handleChange("color", value)}
                select
                options={VehicleColors}
              />
            </div>
            <div className="col-lg-2 col-md-6 col-sm-12 pb-2">
              <InputField
                label="YOM"
                placeholder="Select the Year"
                onChange={(value) => handleChange("yom", value)}
                select
                options={years}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-2">
              <InputField
                label="Fuel"
                placeholder="Select Fuel"
                onChange={(value) => handleChange("fuel", value)}
                select
                options={FuelType}
              />
            </div>
          </div>
          <div className="row pb-2 ps-2">
            <div className="col-lg-3 col-md-4 col-sm-12 pb-2">
              <InputField
                label="Fuel Capacity (L)"
                placeholder="In L"
                onChange={(value) => handleChange("fuelcap", value)}
                type={"number"}
              />
            </div>
            <div className="col-lg-2 col-md-4 col-sm-12 pb-2">
              <InputField
                label="Power (CC)"
                placeholder="In CC"
                onChange={(value) => handleChange("power", value)}
                type={"number"}
              />
            </div>
            <div className="col-lg-2 col-md-4 col-sm-12 pb-2">
              <InputField
                label="Mileage (Km)"
                placeholder="In Km"
                onChange={(value) => handleChange("mileage", value)}
                type={"number"}
              />
            </div>
            <div className="col-lg-2 col-md-6 col-sm-12 pb-2">
              <InputField
                label="No Of Seats"
                placeholder="Enter No Of Seats"
                onChange={(value) => handleChange("noofseats", value)}
                type={"number"}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-2">
              <InputField
                label="No Of Doors"
                placeholder="Enter No Of Doors"
                onChange={(value) => handleChange("noofdoors", value)}
                type={"number"}
              />
            </div>
          </div>
          <hr />
          <div className="row pb-2 ps-2">
            <div className="form-group">
              <label htmlFor="input-field" className="Text-input-label">
                Description
              </label>
              <textarea
                className="form-control"
                placeholder={"Small description about Vehicle"}
                rows={3}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </div>
          <hr />
          <div className="pb-2 ps-2">
            <h3 className="Text-input-label fw-bold">Features</h3>
            <div className="container-fluid">
              <div className="row">
                {Features.slice(0, 6).map((option, index) => (
                  <div
                    className="form-check col-lg-2 col-md-4 col-sm-6"
                    key={index}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={option}
                      id={`checkbox-${index}`}
                      onChange={() => handleFeatureChange(option)}
                    />
                    <label
                      className="Text-input-label"
                      htmlFor={`checkbox-${index}`}
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              <div className="row">
                {Features.slice(6, 12).map((option, index) => (
                  <div
                    className="form-check col-lg-2 col-md-4 col-sm-6"
                    key={index}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={option}
                      id={`checkbox-${index}`}
                      onChange={() => handleFeatureChange(option)}
                    />
                    <label
                      className="Text-input-label"
                      htmlFor={`checkbox-${index}`}
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              <div className="row">
                {Features.slice(12, 14).map((option, index) => (
                  <div className="form-check col-lg-2 col-md-4 col-sm-6">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={option}
                      id={`checkbox-${index}`}
                    />
                    <label
                      className="Text-input-label"
                      htmlFor={`checkbox-${index}`}
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr />
          <div className="row ps-2">
        <label htmlFor="input-field" className="Text-input-label pb-2">
          Upload Images
        </label>
        <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
          <FileUploader
           handleChange={(file) => handleFileChange(file, "main")}
            name="file"
            types={fileTypes}
            label={"Upload Main Image"}
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
          <FileUploader
            handleChange={(files) => handleFileChange(files, "outside")}
            name="file"
            types={fileTypes}
            label={"Upload OutSide View Images"}
            multiple
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
          <FileUploader
            handleChange={(files) => handleFileChange(files, "inside")}
            name="file"
            types={fileTypes}
            label={"Upload InSide View Images"}
            multiple
          />
        </div>
      </div>
          <hr />
          <div className="d-flex flex-row justify-content-end gap-3 mb-3 pt-4">
            <CommonButton text={"Request To Sell"} width={170} />
            <Button variant="secondary" style={{ width: 111 }}>
              Cancel
            </Button>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default index;
