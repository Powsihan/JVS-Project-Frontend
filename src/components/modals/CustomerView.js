import React from "react";
import { Modal, Button } from "react-bootstrap";
import TextField from "../TextField";
import Image from "next/image";
import DefaultDp from "../../assets/images/avatar.svg";
const CustomerView = (props) => {
  const { show, onHide, customerDetails } = props;
  return (
    <div>
      <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
        <Modal.Header>
          <Modal.Title className="Modal-Title">
            Customer Details View
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <div className="d-flex flex-column align-items-center justify-content-center mb-3">
              <div className="p-1 rounded-circle bg-dark">
                <Image
                  src={
                    customerDetails && customerDetails.profilePic
                      ? customerDetails.profilePic
                      : DefaultDp
                  }
                  alt=""
                  width={150}
                  height={150}
                  className="rounded-circle"
                />
              </div>
              <h1 className="Customer-View-Name">{`${
                customerDetails && customerDetails.fname
              } ${customerDetails && customerDetails.lname}`}</h1>
            </div>
            <div className="row mb-2">
              <div className="col-6">
                <div className="row">
                  <div className="col-6">
                    <TextField
                      label={"FirstName"}
                      disable={true}
                      value={customerDetails && customerDetails.fname}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      label={"LastName"}
                      disable={true}
                      value={customerDetails && customerDetails.lname}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <TextField
                  label={"Date of birth"}
                  disable={true}
                  value={customerDetails && customerDetails.dob}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6">
                <TextField
                  label={"Email address"}
                  disable={true}
                  value={customerDetails && customerDetails.email}
                />
              </div>
              <div className="col-6">
                <TextField
                  label={"Gender"}
                  disable={true}
                  value={customerDetails && customerDetails.gender}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6">
                <TextField
                  label={"Address"}
                  disable={true}
                  value={customerDetails && customerDetails.address}
                />
              </div>
              <div className="col-6">
                <TextField
                  label={"NIC"}
                  disable={true}
                  value={customerDetails && customerDetails.nic}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6">
                <TextField
                  label={"City"}
                  disable={true}
                  value={customerDetails && customerDetails.city}
                />
              </div>
              <div className="col-6">
                <TextField
                  label={"Phone Number"}
                  disable={true}
                  value={customerDetails && customerDetails.phoneNo}
                />
              </div>
            </div>
          </>
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

export default CustomerView;
