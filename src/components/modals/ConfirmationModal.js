import React from "react";
import PropTypes from "prop-types";
import { Modal, Button} from "react-bootstrap";
import "../../styles/component.css"


const ConfirmationModal = ({ show, onConfirm, onCancel,message,heading,variant}) => {
  const headingStyle = {
    color: variant === "success" ? "green" : "",
  };
  return (
    <Modal show={show} onHide={onCancel} size="lg" centered backdrop="static">
      <Modal.Header>
        <Modal.Title className="Confirm-Modaal-Header" style={headingStyle}>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: "white" }}>
        <p className="Confirm-Modaal-body">{message}</p>
      </Modal.Body>
      <Modal.Footer>
      <Button variant={variant}  onClick={onConfirm} style={{width:200}}>
          Confirm
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        
      </Modal.Footer>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmationModal;