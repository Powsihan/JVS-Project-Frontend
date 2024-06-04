import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import InputField from "../InputField";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CircleIcon from "@mui/icons-material/Circle";
import "../../styles/component.css";
import { IconButton } from "@mui/material";
import CommonButton from "../CommonButton";
import { getVehicleInfo } from "@/src/redux/action/vehicle";
import VehicleView from "./VehicleView";
const AuctionView = (props) => {
  const { show, onHide, auctionDetails } = props;
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedVehicledata, setSelectedVehicledata] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "#17B530 ";
      case "Pending":
        return "#FFBE18";
      default:
        return "#F73B3B";
    }
  };


  useEffect(() => {
    const vehicleId = auctionDetails && auctionDetails.vehicleId;
    if (vehicleId) {
      getVehicleInfo(vehicleId, (res) => {
        if (res && res.data) {
          setSelectedVehicledata(res.data);
        } else {
          toast.error("Error fetching Customer details");
        }
      });
    }
  }, [auctionDetails]);

 

  const OpenVehicleViewModal = () => {
    setShowViewModal(true);
  };

  return (
    <div>
      {!showViewModal && (
        <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
          <Modal.Header className="header-outer d-flex justify-content-between">
            <Modal.Title className="Modal-Title">
              Auction Details View
            </Modal.Title>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <div
                className="fw-bold"
                style={{ color: "var(--primary-color)" }}
              >
                {auctionDetails && auctionDetails.status}
              </div>
              <IconButton>
                <CircleIcon
                  sx={{
                    color: getStatusColor(auctionDetails && auctionDetails.status),
                  }}
                />
              </IconButton>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid">
              <div className="row pb-3">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <InputField
                    label={"Auction RefID"}
                    disable={true}
                    defaultValue={auctionDetails && auctionDetails.auctionRefID}
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <InputField
                    label={"Vehicle Register No"}
                    disable={true}
                    defaultValue={selectedVehicledata?.registerno}
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <InputField
                    label={"Start Bidding Price"}
                    disable={true}
                    defaultValue={`Rs ${auctionDetails && auctionDetails.bidstartprice}`}
                  />
                </div>
              </div>
              <div className="row pb-3">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputField
                    label={"Auction Start Date"}
                    disable={true}
                    defaultValue={auctionDetails && auctionDetails.startDate}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputField
                    label={"Auction End Date"}
                    disable={true}
                    defaultValue={auctionDetails && auctionDetails.endDate}
                  />
                </div>
              </div>
              <div className="row pb-3">
                <div className="form-group">
                  <label htmlFor="input-field" className="Text-input-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    disabled
                    defaultValue={auctionDetails && auctionDetails.description}
                    rows={3}
                  />
                </div>
              </div>
              <hr />
              <div className="row pb-3">
                <div className="col-lg-6 col-md-6 col-sm-12">
                fdgdf
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <CommonButton
                    text={"Vehicle Detail"}
                    width={"100%"}
                    onClick={OpenVehicleViewModal}
                  />
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
      <VehicleView
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        vehicleDetails={selectedVehicledata}
      />
    </div>
  );
};

export default AuctionView;
