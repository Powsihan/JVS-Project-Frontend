import React from "react";
import { Modal, Button } from "react-bootstrap";
import InputField from "../InputField";
import Image from "next/image";
import { avatar } from "@/src/utils/ImagesPath";


const EmployeeView = (props) => {
  const { show, onHide, employeeDetails } = props;
  return (
    <div>
      <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
        <Modal.Header className="header-outer">
          <Modal.Title className="Modal-Title">
            Customer Details View
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <div className="row">
              <div className="col-5">
                <div className="d-flex flex-column align-items-center justify-content-center mb-3">
                  <div className="p-1 rounded-circle bg-dark">
                    <Image
                      src={
                        employeeDetails && employeeDetails.profilePic
                          ? employeeDetails.profilePic
                          : avatar
                      }
                      alt=""
                      width={150}
                      height={150}
                      className="rounded-circle"
                    />
                  </div>
                  <h1 className="Customer-View-Name pt-2">
                    {employeeDetails && employeeDetails.name}
                  </h1>
                  <h1 className="Employee-View-Role">
                    {employeeDetails && employeeDetails.role}
                  </h1>
                </div>
              </div>
              <div className="col-7 ps-1 pe-5">
                <div className="row pb-2">
                    <InputField
                      label={"Name"}
                      disable={true}
                      defaultValue={employeeDetails && employeeDetails.name}
                    />
                </div>
                <div className="row pb-2">
                    <InputField
                      label={"Email"}
                      disable={true}
                      defaultValue={employeeDetails && employeeDetails.email}
                    />
                </div>
                <div className="row pb-2">
                    <InputField
                      label={"PhoneNumber"}
                      disable={true}
                      defaultValue={employeeDetails && employeeDetails.phoneNumber}
                    />
                </div>
                <div className="row pb-2">
                    <InputField
                      label={"Role"}
                      disable={true}
                      defaultValue={employeeDetails && employeeDetails.role}
                    />
                </div>
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

export default EmployeeView;
