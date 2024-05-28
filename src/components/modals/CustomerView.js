import React from "react";
import { Modal, Button } from "react-bootstrap";
import InputField from "../InputField";
import Image from "next/image";
import DefaultDp from "../../assets/images/avatar.svg";
const CustomerView = (props) => {
  const { show, onHide, customerDetails } = props;
  return (
    <div>
      <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
        <Modal.Header className="header-outer">
          <Modal.Title className="Modal-Title" >
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
                    <InputField
                      label={"FirstName"}
                      disable={true}
                      defaultValue={customerDetails && customerDetails.fname}
                    />
                  </div>
                  <div className="col-6">
                    <InputField
                      label={"LastName"}
                      disable={true}
                      defaultValue={customerDetails && customerDetails.lname}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <InputField
                  label={"Date of birth"}
                  disable={true}
                  defaultValue={customerDetails && customerDetails.dob}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6">
                <InputField
                  label={"Email address"}
                  disable={true}
                  defaultValue={customerDetails && customerDetails.email}
                />
              </div>
              <div className="col-6">
                <InputField
                  label={"Gender"}
                  disable={true}
                  defaultValue={customerDetails && customerDetails.gender}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6">
                <InputField
                  label={"Address"}
                  disable={true}
                  defaultValue={customerDetails && customerDetails.address}
                />
              </div>
              <div className="col-6">
                <InputField
                  label={"NIC"}
                  disable={true}
                  defaultValue={customerDetails && customerDetails.nic}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6">
                <InputField
                  label={"City"}
                  disable={true}
                  defaultValue={customerDetails && customerDetails.city}
                />
              </div>
              <div className="col-6">
                <InputField
                  label={"Phone Number"}
                  disable={true}
                  defaultValue={customerDetails && customerDetails.phoneNo}
                />
              </div>
            </div>
            <div className="row mb-2">
            <div className="form-group">
              <label htmlFor="input-field" className="Text-input-label">
                Description
              </label>
              <textarea
                className="form-control"
                disabled
                defaultValue={customerDetails && customerDetails.description}
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
