import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import InputField from "../InputField";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CircleIcon from "@mui/icons-material/Circle";
import "../../styles/component.css";
import "../../styles/auction.css";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommonButton from "../CommonButton";
import { getVehicleInfo } from "@/src/redux/action/vehicle";
import VehicleView from "./VehicleView";
import { getCustomerInfo } from "@/src/redux/action/customer";
import CustomerView from "./CustomerView";
const AuctionView = (props) => {
  const { show, onHide, auctionDetails } = props;
  const [showViewModal, setShowViewModal] = useState(false);
  const [showViewModal2, setShowViewModal2] = useState(false);
  const [selectedVehicledata, setSelectedVehicledata] = useState(null);
  const [selectedCustomerdata, setSelectedCustomerdata] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({});

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

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (auctionDetails && auctionDetails.biddinghistory) {
        const customerIds = auctionDetails.biddinghistory.map(
          (bid) => bid.customerId
        );
        const uniqueCustomerIds = [...new Set(customerIds)];

        uniqueCustomerIds.forEach((customerId) => {
          getCustomerInfo(customerId, (res) => {
            if (res && res.data) {
              setCustomerDetails((prevState) => ({
                ...prevState,
                [customerId]: res.data,
              }));
            } else {
              toast.error("Error fetching customer details");
            }
          });
        });
      }
    };
    fetchCustomerDetails();
  }, [auctionDetails]);

  const OpenVehicleViewModal = () => {
    setShowViewModal(true);
  };
  const OpenCustomerViewModal = (customerId) => {
    const customerData = customerDetails[customerId];
    console.log(customerData, "cusssssssssssssssssssss");
    if (customerData) {
      setSelectedCustomerdata(customerData);
      setShowViewModal2(true);
    }
  };

  const biddingHis = auctionDetails && auctionDetails.biddinghistory;

  return (
    <div>
      {!showViewModal && !showViewModal2 && (
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
                    color: getStatusColor(
                      auctionDetails && auctionDetails.status
                    ),
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
                    defaultValue={`Rs ${
                      auctionDetails && auctionDetails.bidstartprice
                    }`}
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
                <div className="col-lg-6 col-md-6 col-sm-12 ps-3 pe-3 Auction-ViewModal-Bid-List">
                  <label
                    htmlFor="features-dropdown"
                    className="Text-input-label mb-3"
                  >
                    Auction Details
                  </label>
                  {biddingHis && biddingHis.length > 0 ? (
                    biddingHis.map((data, index) => (
                      <div key={index}>
                        <div
                          className="d-flex justify-content-between align-items-center ps-2 pe-2"
                          style={{ marginBottom: "-10px" }}
                        >
                          <h2>
                            {customerDetails[data.customerId]
                              ? customerDetails[data.customerId].fname
                              : data.customerId}
                          </h2>
                          <IconButton
                            aria-label="delete"
                            className="viewbutt"
                            onClick={() =>
                              OpenCustomerViewModal(data.customerId)
                            }
                          >
                            <VisibilityIcon className="" />
                          </IconButton>
                          <h4>{`LKR ${data.biddingprice}`}</h4>
                        </div>
                        <hr style={{ color: "#bdbbbb" }} />
                      </div>
                    ))
                  ) : (
                    <p>No bidding history available</p>
                  )}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 ps-5 pe-2">
                <label
                    htmlFor="features-dropdown"
                    className="Text-input-label mb-3"
                  >
                    Vehicle Details
                  </label>
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
      <CustomerView
        show={showViewModal2}
        onHide={() => setShowViewModal2(false)}
        customerDetails={selectedCustomerdata}
      />
    </div>
  );
};

export default AuctionView;
