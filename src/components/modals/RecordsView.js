import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import InputField from "../InputField";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../styles/component.css";
import { IconButton } from "@mui/material";
import { getCustomerInfo } from "@/src/redux/action/customer";
import CommonButton from "../CommonButton";
import CustomerView from "./CustomerView";
import { getVehicleInfo } from "@/src/redux/action/vehicle";
import VehicleView from "./VehicleView";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
const RecordsView = (props) => {
  const { show, onHide, recordsDetails } = props;
  const [showViewModal, setShowViewModal] = useState(false);
  const [showViewModal2, setShowViewModal2] = useState(false);
  const [selectedCustomerdata, setSelectedCustomerdata] = useState(null);
  const [selectedVehicledata, setSelectedVehicledata] = useState(null);

  useEffect(() => {
    const customerId = recordsDetails && recordsDetails.customerId;
    if (customerId) {
      getCustomerInfo(customerId, (res) => {
        if (res && res.data) {
          setSelectedCustomerdata(res.data);
        } else {
          toast.error("Error fetching Customer details");
        }
      });
    }
  }, [recordsDetails]);

  useEffect(() => {
    const vehicleId = recordsDetails && recordsDetails.vehicleId;
    if (vehicleId) {
      getVehicleInfo(vehicleId, (res) => {
        if (res && res.data) {
          setSelectedVehicledata(res.data);
        } else {
          toast.error("Error fetching Customer details");
        }
      });
    }
  }, [recordsDetails]);

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
              Records Details View
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid">
              <div className="row pb-3">
                <InputField
                  label={"Sales RefID"}
                  disable={true}
                  defaultValue={recordsDetails && recordsDetails.recordsRefID}
                />
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
                    defaultValue={recordsDetails && recordsDetails.description}
                    rows={3}
                  />
                </div>
              </div>
              <div className="row pb-3 p-3">
                <table table className="table table-striped table-hover">
                  <thead className="top-0 position-sticky z-1">
                    <tr>
                      <th>No</th>
                      <th>Content</th>
                      <th>Date</th>
                      <th>Details</th>
                      <th>Documents</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recordsDetails?.recordhistory &&
                    recordsDetails.recordhistory.length > 0 ? (
                      recordsDetails.recordhistory.map((data, index) => {
                        const creationDate = new Date(
                          data.creationDate
                        ).toLocaleDateString();
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.content}</td>
                            <td>{creationDate}</td>
                            <td>{data.details}</td>
                            <td>
                              <IconButton
                                onClick={() => {
                                  window.open(data.documents[0], "_blank");
                                }}
                              >
                                <FileDownloadIcon />
                              </IconButton>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5">No Records Available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
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

export default RecordsView;
