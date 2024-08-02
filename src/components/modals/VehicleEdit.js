import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import InputField from "../InputField";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CircleIcon from "@mui/icons-material/Circle";
import "../../styles/component.css";
import { IconButton } from "@mui/material";
import {
  Brand,
  Districts,
  Features,
  FuelType,
  GearCount,
  OwnershipOptions,
  Status,
  VehicleColors,
  VehicleTransmission,
  Vehicletype,
} from "@/src/data/datas";
import { vehicleEdit } from "@/src/redux/action/vehicle";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";

const VehicleEdit = (props) => {
  const dispatch = useDispatch();
  const { show, onHide, vehicleDetails } = props;
  const [vehicleData, setVehicleData] = useState({
    features: [],
  });
  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "#17B530 ";
      case "Sold":
        return "#F73B3B";
      case "Pending":
        return "#FFBE18";
      default:
        return "#0010a5";
    }
  };

  useEffect(() => {
    if (vehicleDetails) {
      setVehicleData((prevData) => ({
        ...prevData,
        features: vehicleDetails?.features || [],
        ownership:vehicleDetails?.ownership,
      }));
    }
  }, [vehicleDetails]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const updatedVehicleData = {
      ...vehicleData,
    };

    const vehicleID = vehicleDetails?._id;

    const changesMade = Object.keys(updatedVehicleData).some(
      (key) => updatedVehicleData[key] !== vehicleDetails[key]
    );

    if (!changesMade) {
      dispatch(setLoading(false));
      toast.info("No changes made");
    } else {
      vehicleEdit(vehicleID, updatedVehicleData, (res) => {
        dispatch(setLoading(false));
        if (res?.status === 200) {
          toast.success(res?.data?.message);
          onHide();
        } else {
          toast.error(res?.data?.message);
        }
      });
    }
  };

  const generateYears = () => {
    const years = [];
    for (let year = 1950; year <= 2023; year++) {
      years?.push(year);
    }
    return years;
  };

  const years = generateYears();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Modal show={show} onHide={onHide} centered backdrop="static" size="xl">
          <Modal.Header className="header-outer d-flex justify-content-between">
            <Modal.Title className="Modal-Title">
              Vehicle Details Edit
            </Modal.Title>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <div
                className="fw-bold"
                style={{ color: "var(--primary-color)" }}
              >
                {vehicleDetails?.status}
              </div>
              <IconButton>
                <CircleIcon
                  sx={{
                    color: getStatusColor(
                      vehicleDetails?.status
                    ),
                  }}
                />
              </IconButton>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-4 col-md-12 col-sm-12">
                  {vehicleDetails?.image && (
                    <Carousel
                      showThumbs={true}
                      autoPlay={true}
                      infiniteLoop={true}
                    >
                      {vehicleDetails?.image?.map((image, index) => (
                        <div
                          key={index}
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "170px",
                          }}
                        >
                          <img
                            src={image}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "fill",
                            }}
                          />
                        </div>
                      ))}
                    </Carousel>
                  )}
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12">
                  <div className="row pb-3">
                    <div className="col-lg-4 col-md-12 col-sm-12">
                      <InputField
                        label={"Vehicle Register No"}
                        defaultValue={
                         vehicleDetails?.registerno
                        }
                        onChange={(value) => handleChange("registerno", value)}
                      />
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12">
                      <InputField
                        label={"Name"}
                        defaultValue={vehicleDetails?.name}
                        onChange={(value) => handleChange("name", value)}
                      />
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12">
                      <InputField
                        label={"Price (Rs)"}
                        defaultValue={vehicleDetails?.price}
                        onChange={(value) => handleChange("price", value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-4 col-md-12 col-sm-12">
                      <InputField
                        label={"Vehicle Type"}
                        defaultValue={vehicleDetails?.type}
                        onChange={(value) => handleChange("type", value)}
                        select
                        options={Vehicletype}
                      />
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12">
                      <InputField
                        label={"Brand"}
                        defaultValue={vehicleDetails?.brand}
                        onChange={(value) => handleChange("brand", value)}
                        select
                        options={Brand}
                      />
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12">
                      <InputField
                        label={"Model"}
                        defaultValue={vehicleDetails?.model}
                        onChange={(value) => handleChange("model", value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-4 col-md-12 col-sm-12">
                      <InputField
                        label={"Color"}
                        defaultValue={vehicleDetails?.color}
                        onChange={(value) => handleChange("color", value)}
                        select
                        options={VehicleColors}
                      />
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12">
                      <InputField
                        label={"Vehicle Modal Year"}
                        defaultValue={vehicleDetails?.yom}
                        onChange={(value) => handleChange("yom", value)}
                        select
                        options={years}
                      />
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12">
                      <div className="form-group">
                        <label
                          htmlFor="input-field"
                          className="Text-input-label"
                        >
                          OwnerShip
                        </label>
                        <div className="d-flex gap-3">
                          {OwnershipOptions?.map((option, index) => (
                            <div className="form-check" key={index}>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="ownership"
                                id={`ownership-${option}`}
                                value={option}
                                checked={vehicleData?.ownership === option}
                                onChange={(e) =>
                                  handleChange("ownership", e.target.value)
                                }
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
                </div>
              </div>
              <div className="row pb-2">
                <div className="col-lg-2 col-md-4 col-sm-12">
                  <InputField
                    label={"Transmission"}
                    defaultValue={vehicleDetails?.transmission}
                    onChange={(value) => handleChange("transmission", value)}
                    select
                    options={VehicleTransmission}
                  />
                </div>
                <div className="col-lg-2 col-md-4 col-sm-12">
                  <InputField
                    label={"Gear Box"}
                    defaultValue={vehicleDetails?.gear}
                    onChange={(value) => handleChange("gear", value)}
                    select
                    options={GearCount}
                  />
                </div>
                <div className="col-lg-2 col-md-4 col-sm-12">
                  <InputField
                    label={"Fuel"}
                    defaultValue={vehicleDetails?.fuel}
                    onChange={(value) => handleChange("fuel", value)}
                    select
                    options={FuelType}
                  />
                </div>
                <div className="col-lg-2 col-md-4 col-sm-12">
                  <InputField
                    label={"Fuel Capacity (L)"}
                    defaultValue={vehicleDetails?.fuelcap}
                    onChange={(value) => handleChange("fuelcap", value)}
                    type={"Number"}
                  />
                </div>
                <div className="col-lg-2 col-md-4 col-sm-12">
                  <InputField
                    label={"Mileage (Km)"}
                    defaultValue={vehicleDetails?.mileage}
                    onChange={(value) => handleChange("mileage", value)}
                    type={"Number"}
                  />
                </div>
                <div className="col-lg-2 col-md-4 col-sm-12">
                  <InputField
                    label={"Power (CC)"}
                    defaultValue={vehicleDetails?.power}
                    onChange={(value) => handleChange("power", value)}
                    type={"Number"}
                  />
                </div>
              </div>
              <div className="row pb-4">
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="row mb-2">
                    <div className="col-lg-4 col-md-12 col-sm-12">
                      <InputField
                        label={"No Of Doors"}
                        defaultValue={
                          vehicleDetails?.noofdoors
                        }
                        onChange={(value) => handleChange("noofdoors", value)}
                        type={"Number"}
                      />
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12">
                      <InputField
                        label={"No Of Seats"}
                        defaultValue={
                          vehicleDetails?.noofseats
                        }
                        onChange={(value) => handleChange("noofseats", value)}
                        type={"Number"}
                      />
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12">
                      <InputField
                        label={"District"}
                        defaultValue={vehicleDetails?.district}
                        onChange={(value) => handleChange("district", value)}
                        select
                        options={Districts}
                      />
                    </div>
                  </div>
                  <div className="row">
                  <InputField
                        label={"Status"}
                        defaultValue={vehicleDetails?.status}
                        onChange={(value) => handleChange("status", value)}
                        select
                        options={Status}
                      />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="input-field" className="Text-input-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      defaultValue={
                        vehicleDetails?.description
                      }
                      rows={4}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <hr />

              <h3 className="Text-input-label fw-bold">Features</h3>
              <div className="container-fluid">
                <div className="row">
                  {Features?.slice(0, 6).map((option, index) => (
                    <div
                      className="form-check col-lg-2 col-md-4 col-sm-6"
                      key={index}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={option}
                        id={`checkbox-${index}`}
                        checked={vehicleData?.features.includes(option)}
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
                  {Features?.slice(6, 12).map((option, index) => (
                    <div
                      className="form-check col-lg-2 col-md-4 col-sm-6"
                      key={index}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={option}
                        id={`checkbox-${index}`}
                        checked={vehicleData?.features?.includes(option)}
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
                  {Features?.slice(12, 14).map((option, index) => (
                    <div className="form-check col-lg-2 col-md-4 col-sm-6">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={option}
                        checked={vehicleData?.features?.includes(option)}
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
              <hr />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
};

export default VehicleEdit;
