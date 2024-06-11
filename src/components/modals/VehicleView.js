import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import InputField from "../InputField";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CircleIcon from "@mui/icons-material/Circle";
import "../../styles/component.css";
import { IconButton } from "@mui/material";
import { getCustomerInfo } from "@/src/redux/action/customer";
import CommonButton from "../CommonButton";
import CustomerView from "./CustomerView";
const VehicleView = (props) => {
  const { show, onHide, vehicleDetails } = props;
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCustomerdata, setSelectedCustomerdata] = useState(null);
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
    const customerId = vehicleDetails && vehicleDetails.customerId;
    if (customerId) {
      getCustomerInfo(customerId, (res) => {
        if (res && res.data) {
          setSelectedCustomerdata(res.data);
        } else {
          toast.error("Error fetching Customer details");
        }
      });
    }
  }, [vehicleDetails]);


  const OpenCustomerViewModal = () => {
    setShowViewModal(true);
  };

  return (
    <div>
      {!showViewModal && (
      <Modal show={show} onHide={onHide} centered backdrop="static" size="xl">
        <Modal.Header className="header-outer d-flex justify-content-between">
          <Modal.Title className="Modal-Title">
            Vehicle Details View
          </Modal.Title>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="fw-bold" style={{ color: "var(--primary-color)" }}>
              {vehicleDetails && vehicleDetails.status}
            </div>
            <IconButton>
              <CircleIcon
                sx={{
                  color: getStatusColor(
                    vehicleDetails && vehicleDetails.status
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
                {vehicleDetails && vehicleDetails.image && (
                  <Carousel
                    showThumbs={true}
                    autoPlay={true}
                    infiniteLoop={true}
                  >
                    {vehicleDetails.image.map((image, index) => (
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
                      disable={true}
                      defaultValue={vehicleDetails && vehicleDetails.registerno}
                    />
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    {" "}
                    <InputField
                      label={"Name"}
                      disable={true}
                      defaultValue={vehicleDetails && vehicleDetails.name}
                    />
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    {" "}
                    <InputField
                      label={"Price (Rs)"}
                      disable={true}
                      defaultValue={vehicleDetails && vehicleDetails.price}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    <InputField
                      label={"Vehicle Type"}
                      disable={true}
                      defaultValue={vehicleDetails && vehicleDetails.type}
                    />
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    <InputField
                      label={"Brand"}
                      disable={true}
                      defaultValue={vehicleDetails && vehicleDetails.brand}
                    />
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    <InputField
                      label={"Model"}
                      disable={true}
                      defaultValue={vehicleDetails && vehicleDetails.model}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    <InputField
                      label={"Color"}
                      disable={true}
                      defaultValue={vehicleDetails && vehicleDetails.color}
                    />
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    {" "}
                    <InputField
                      label={"Vehicle Modal Year"}
                      disable={true}
                      defaultValue={vehicleDetails && vehicleDetails.yom}
                    />
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    {" "}
                    <InputField
                      label={"Ownership"}
                      disable={true}
                      defaultValue={vehicleDetails && vehicleDetails.ownership}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row pb-2">
              <div className="col-lg-2 col-md-4 col-sm-12">
                <InputField
                  label={"Transmission"}
                  disable={true}
                  defaultValue={vehicleDetails && vehicleDetails.transmission}
                />
              </div>
              <div className="col-lg-2 col-md-4 col-sm-12">
                <InputField
                  label={"Gear Box"}
                  disable={true}
                  defaultValue={vehicleDetails && vehicleDetails.gear}
                />
              </div>
              <div className="col-lg-2 col-md-4 col-sm-12">
                <InputField
                  label={"Fuel"}
                  disable={true}
                  defaultValue={vehicleDetails && vehicleDetails.fuel}
                />
              </div>
              <div className="col-lg-2 col-md-4 col-sm-12">
                <InputField
                  label={"Fuel Capacity (L)"}
                  disable={true}
                  defaultValue={vehicleDetails && vehicleDetails.fuelcap}
                />
              </div>
              <div className="col-lg-2 col-md-4 col-sm-12">
                <InputField
                  label={"Mileage (Km)"}
                  disable={true}
                  defaultValue={vehicleDetails && vehicleDetails.mileage}
                />
              </div>
              <div className="col-lg-2 col-md-4 col-sm-12">
                <InputField
                  label={"Power (CC)"}
                  disable={true}
                  defaultValue={vehicleDetails && vehicleDetails.power}
                />
              </div>
            </div>
            <div className="row pb-4">
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="row mb-2">
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    <InputField
                      label={"No Of Doors"}
                      disable={true}
                      defaultValue={vehicleDetails && vehicleDetails.noofdoors}
                    />
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    <InputField
                      label={"No Of Seats"}
                      disable={true}
                      defaultValue={vehicleDetails && vehicleDetails.noofseats}
                    />
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    <InputField
                      label={"District"}
                      disable={true}
                      defaultValue={vehicleDetails && vehicleDetails.district}
                    />
                  </div>
                </div>
                <div className="row">
                  <label
                    htmlFor="features-dropdown"
                    className="Text-input-label"
                  >
                    Features
                  </label>
                  <div className="form-group">
                    <select id="features-dropdown" className="form-control">
                      {vehicleDetails &&
                        vehicleDetails.features &&
                        vehicleDetails.features.map((feature, index) => (
                          <option key={index} value={feature}>
                            {feature}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="input-field" className="Text-input-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    disabled
                    defaultValue={vehicleDetails && vehicleDetails.description}
                    rows={4}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <CommonButton text={"Customer Detail"} width={"100%"} onClick={OpenCustomerViewModal}/>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                {/* <CommonButton text={"Documents"} width={"100%"}/> */}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )}
      <CustomerView
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        customerDetails={selectedCustomerdata}
      />
    </div>
  );
};

export default VehicleView;
