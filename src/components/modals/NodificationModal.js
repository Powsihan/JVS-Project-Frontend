import React, { useEffect, useState } from "react";
import "../../styles/component.css";
import { getAllPurchases } from "@/src/redux/action/purchase";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import { getVehicleInfo } from "@/src/redux/action/vehicle";
import { getCustomerInfo } from "@/src/redux/action/customer";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { IconButton } from "@mui/material";
import CustomerView from "./CustomerView";
import VehicleView from "./VehicleView";
import NotificationStatusModal from "./NotificationStatusModal";

const NotificationModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [customerData, setCustomerData] = useState({});
  const [vehicleData, setVehicleData] = useState({});

  const [showViewModal, setShowViewModal] = useState(false);
  const [showViewModal2, setShowViewModal2] = useState(false);
  const [selectedCustomerdata, setSelectedCustomerdata] = useState(null);
  const [selectedVehicledata, setSelectedVehicledata] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);

  useEffect(() => {
    dispatch(setLoading(true));
    getAllPurchases(async (res) => {
      if (res && res.data) {
        const notification = res.data;
        const filteredNotifications = res.data.filter(
          (notification) => notification.status === "Requested" || notification.status === "Pending"
        );
        setNotifications(filteredNotifications);
        dispatch(setLoading(false));

        const customerInfoPromises = notification.map(
          (notifi) =>
            new Promise((resolve) => {
              getCustomerInfo(notifi.customerId, (response) =>
                resolve({ customerId: notifi.customerId, data: response.data })
              );
            })
        );

        const vehicleInfoPromises = notification.map(
          (notifi) =>
            new Promise((resolve) => {
              getVehicleInfo(notifi.vehicleId, (response) =>
                resolve({ vehicleId: notifi.vehicleId, data: response.data })
              );
            })
        );

        try {
          const customerInfoResponses = await Promise.all(customerInfoPromises);
          const vehicleInfoResponses = await Promise.all(vehicleInfoPromises);

          const customerDataMap = {};
          const vehicleDataMap = {};

          customerInfoResponses.forEach((response) => {
            if (response.data) {
              customerDataMap[response.customerId] = response.data;
            }
          });

          vehicleInfoResponses.forEach((response) => {
            if (response.data) {
              vehicleDataMap[response.vehicleId] = response.data;
            }
          });

          setCustomerData(customerDataMap);
          setVehicleData(vehicleDataMap);
        } catch (error) {
          console.error("Error fetching customer or vehicle details", error);
          toast.error("Error fetching additional details");
        }
      } else {
        dispatch(setLoading(false));
        toast.error("Error fetching Notification details");
      }
    });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const OpenCustomerViewModal = (data) => {
    setSelectedCustomerdata(data);
    setShowViewModal(true);
  };

  const OpenVehicleViewModal = (data) => {
    setSelectedVehicledata(data);
    setShowViewModal2(true);
  };


  const OpenStatusModal = (status) => {
    setCurrentStatus(status);
    setShowStatusModal(true);
  };


  const handleStatusUpdate = (id, status) => {
    const updatedNotifications = notifications.map((notification) =>
      notification._id === id ? { ...notification, status } : notification
    );
    setNotifications(updatedNotifications);
  };

  return (
    <div>
      {!showViewModal && !showViewModal2 && !showStatusModal && (
        <div>
          {isOpen && <div className="modal-background-dim"></div>}
          <div
            className={`modal-overlay Modal-OverLayer ${isOpen ? "open" : ""}`}
          >
            <div className="modal-content  Modal_content">
              <button
                className="close-button close-button-Modal"
                onClick={onClose}
              >
                &times;
              </button>
              <div className="modal-body  Notification_Modal">
                <h2>Notifications</h2>
                <hr />
                {notifications.map((data, index) => (
                  <div className="Notification-Box p-1 ps-3 pe-3 mb-3">
                    <div
                      key={index}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <h4>No {index + 1}</h4>
                      <div
                        className={`Notification-status-field ps-2 pe-2 ${
                          data.status === "Requested"
                            ? "Requested-Field"
                            : data.status === "Pending"
                            ? "Pending-Field"
                            : "Available-Field"
                        }`}
                        onClick={() => OpenStatusModal(data)}
                      >
                        {data.status}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center pt-2">
                      <h5>Request Date</h5>
                      <h6>{formatDate(data.creationDate)}</h6>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5>Customer Name</h5>
                      <h6>{customerData[data.customerId]?.fname || "N/A"}</h6>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5>Vehicle RegNo</h5>
                      <h6>
                        {vehicleData[data.vehicleId]?.registerno || "N/A"}
                      </h6>
                    </div>
                    <div className="row ">
                      <div className="col-6 d-flex justify-content-center align-items-center">
                        <IconButton
                          onClick={() =>
                            OpenCustomerViewModal(customerData[data.customerId])
                          }
                        >
                          <PersonIcon />
                        </IconButton>
                      </div>
                      <div className="col-6 d-flex justify-content-center align-items-center">
                        <IconButton>
                          <DirectionsCarIcon
                            onClick={() =>
                              OpenVehicleViewModal(vehicleData[data.vehicleId])
                            }
                          />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
      />
      <NotificationStatusModal
        show={showStatusModal}
        onHide={() => setShowStatusModal(false)}
        currentStatus={currentStatus}
        onUpdate={handleStatusUpdate} 
      />
    </div>
  );
};

export default NotificationModal;
