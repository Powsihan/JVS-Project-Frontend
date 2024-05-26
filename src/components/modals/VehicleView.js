import React from "react";
import { Modal, Button } from "react-bootstrap";
import InputField from "../InputField";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CircleIcon from "@mui/icons-material/Circle";
import "../../styles/component.css";
import { IconButton } from "@mui/material";
import PendingIcon from '@mui/icons-material/Pending';
const VehicleView = (props) => {
  const { show, onHide, vehicleDetails } = props;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return '#17B530 ';
      case 'Sold':
        return '#F73B3B';
      case 'Pending':
        return '#FFBE18';
      default:
        return '#0010a5';
    }
  };

  return (
    <div>
      <Modal show={show} onHide={onHide} centered backdrop="static" size="xl">
        <Modal.Header className="header-outer d-flex justify-content-between">
          <Modal.Title className="Modal-Title">
            Vehicle Details View
          </Modal.Title>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="fw-bold" style={{color:'var(--primary-color)'}}>{vehicleDetails && vehicleDetails.status}</div>
            <IconButton>
              <CircleIcon sx={{color: getStatusColor(vehicleDetails && vehicleDetails.status)}}/>
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
                <div className="row mb-3">
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
                      label={"Price"}
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
                    {" "}
                    <InputField
                      label={"Brand"}
                      disable={true}
                      defaultValue={vehicleDetails && vehicleDetails.brand}
                    />
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    {" "}
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
            <div className="row mb-2">
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
                  label={"Fuel Capacity"}
                  disable={true}
                  defaultValue={vehicleDetails && vehicleDetails.fuelcap}
                />
              </div>
              <div className="col-lg-2 col-md-4 col-sm-12">
                <InputField
                  label={"Mileage"}
                  disable={true}
                  defaultValue={vehicleDetails && vehicleDetails.mileage}
                />
              </div>
              <div className="col-lg-2 col-md-4 col-sm-12">
                <InputField
                  label={"Power"}
                  disable={true}
                  defaultValue={vehicleDetails && vehicleDetails.power}
                />
              </div>
            </div>
            <div className="row">
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
                  />
                </div>
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
    </div>
  );
};

export default VehicleView;
