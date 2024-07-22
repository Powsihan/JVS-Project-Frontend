import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../../styles/component.css";
import { updatePurchase } from "@/src/redux/action/purchase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";

const NotificationStatusModal = (props) => {
  const dispatch = useDispatch();
  const { show, onHide, currentStatus, onUpdate } = props;

  const handleUpdateStatus = (status) => {
    dispatch(setLoading(true));
    const id = currentStatus && currentStatus._id;

    const updatedStatus = {
      status: status,
    };
    updatePurchase(id, updatedStatus, (res) => {
      dispatch(setLoading(false));
      if (res.status == 200) {
        toast.success(res.data.message);
        onUpdate(id, status);
        onHide();
      } else {
        toast.error("Failed to update status");
      }
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="Update-Status-heading">
          Update Status
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>Are You Sure Want to Update this Request</div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-warning"
          onClick={() => handleUpdateStatus("Pending")}
          className="m-2"
        >
          Pending
        </Button>
        <Button
          variant="outline-success"
          onClick={() => handleUpdateStatus("Approved")}
          className="m-2"
        >
          Approved
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => handleUpdateStatus("Rejected")}
          className="m-2"
        >
          Rejected
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotificationStatusModal;
