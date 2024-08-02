import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import InputField from "../InputField";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CircleIcon from "@mui/icons-material/Circle";
import "../../styles/component.css";
import { IconButton } from "@mui/material";
import PendingIcon from "@mui/icons-material/Pending";
import { getCustomerInfo } from "@/src/redux/action/customer";
import CommonButton from "../CommonButton";
import CustomerView from "./CustomerView";
import { getVehicleInfo } from "@/src/redux/action/vehicle";
import VehicleView from "./VehicleView";
import { toast } from "react-toastify";
const SalesView = (props) => {
  const { show, onHide, salesDetails } = props;
  const [showViewModal, setShowViewModal] = useState(false);
  const [showViewModal2, setShowViewModal2] = useState(false);
  const [selectedCustomerdata, setSelectedCustomerdata] = useState(null);
  const [selectedVehicledata, setSelectedVehicledata] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "Sale":
        return "#17B530 ";
      default:
        return "#0010a5";
    }
  };

  useEffect(() => {
    const customerId = salesDetails && salesDetails.customerId;
    if (customerId) {
      getCustomerInfo(customerId, (res) => {
        if (res?.data) {
          setSelectedCustomerdata(res?.data);
        } else {
          toast.error("Error fetching Customer details");
        }
      });
    }
  }, [salesDetails]);

  useEffect(() => {
    const vehicleId = salesDetails?.vehicleId;
    if (vehicleId) {
      getVehicleInfo(vehicleId, (res) => {
        if (res?.data) {
            setSelectedVehicledata(res?.data);
        } else {
          toast.error("Error fetching Customer details");
        }
      });
    }
  }, [salesDetails]);

  const OpenCustomerViewModal = () => {
    setShowViewModal(true);
  };

  const OpenVehicleViewModal = () => {
    setShowViewModal2(true);
  };



  return (
    <div>
      {!showViewModal && !showViewModal2 && (
        <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
          <Modal.Header className="header-outer d-flex justify-content-between">
            <Modal.Title className="Modal-Title">
              Sales Details View
            </Modal.Title>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <div
                className="fw-bold"
                style={{ color: "var(--primary-color)" }}
              >
                {salesDetails?.status}
              </div>
              <IconButton>
                <CircleIcon
                  sx={{
                    color: getStatusColor(salesDetails?.status),
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
                    label={"Sales RefID"}
                    disable={true}
                    defaultValue={salesDetails?.salesRefID}
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <InputField
                    label={"Date"}
                    disable={true}
                    defaultValue={salesDetails?.creationDate}
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <InputField
                    label={"Price"}
                    disable={true}
                    defaultValue={salesDetails?.price}
                  />
                </div>
              </div>
              <div className="row pb-3">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputField
                    label={"Vehicle Register No"}
                    disable={true}
                    defaultValue={selectedVehicledata?.registerno}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputField
                    label={"Customer Email"}
                    disable={true}
                    defaultValue={selectedCustomerdata?.email}
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
                    defaultValue={salesDetails?.details}
                    rows={3}
                  />
                </div>
              </div>
              <hr />
              <div className="row pb-3">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <CommonButton
                    text={"Customer Detail"}
                    width={"100%"}
                    onClick={OpenCustomerViewModal}
                  />
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
      <CustomerView
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        customerDetails={selectedCustomerdata}
      />
      <VehicleView
        show={showViewModal2}
        onHide={() => setShowViewModal2(false)}
        vehicleDetails={selectedVehicledata}
        hidecustomerdetails
      />
    </div>
  );
};

export default SalesView;
