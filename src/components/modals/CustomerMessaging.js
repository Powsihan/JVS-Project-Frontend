import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../../utils/socketService"; // Import socket
import MessageInput from "../MessageInput"; // Reuse the MessageInput component
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import "../../pages/admin/communication/communication.css";
import { getLoginCustomerDetail } from "@/src/redux/action/customer";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import "../../styles/component.css";
import "../../styles/admin.css";

const CustomerMessaging = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState(null);
  const [selectedChat, setSelectedChat] = useState([]);

  useEffect(() => {
    dispatch(setLoading(true));
    getLoginCustomerDetail((res) => {
      if (res.status == 200) {
        setCustomerData(res.data);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, []);

  useEffect(() => {
    if (customerData) {
      const fetchChatHistory = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/chats/${customerData._id}/Customer/663fa1c346cc7616d9a14aae/User`
          );
          setSelectedChat(response.data);
        } catch (error) {
          console.error("Error fetching chat history:", error);
        }
      };

      fetchChatHistory();
    }
  }, [customerData]);

  useEffect(() => {
    socket.on("message", (message) => {
      setSelectedChat((prevChat) => [...prevChat, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const handleSendMessage = async (message) => {
    const newMessage = {
      senderId: customerData._id,
      senderModel: "Customer",
      receiverId: "663fa1c346cc7616d9a14aae",
      receiverModel: "User",
      message,
    };
    try {
      await axios.post("http://localhost:5000/api/chats", newMessage);
      setSelectedChat((prevChat) => [
        ...prevChat,
        {
          ...newMessage,
          sender: "Me",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static">
      <Modal.Header >
        <Modal.Title className="Modal-Title">Chat with Admin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid Communication-section">
          <div className="row">
            <div className="box-1 col-lg-12 p-4">
              <div className="d-flex flex-column">
                {selectedChat.map((message, index) => (
                  <div
                    className={`d-flex flex-column mb-3 ${
                      message.sender === "Me"
                        ? "align-self-end text-right"
                        : "align-self-start text-left"
                    }`}
                    key={index}
                  >
                    <div
                      className={`p-2 ${
                        message.sender === "Me"
                          ? "bg-primary text-white"
                          : "bg-light text-dark"
                      } rounded`}
                    >
                      <div>{message.message}</div>
                      <div className="text-muted small">
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <MessageInput onSend={handleSendMessage} />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerMessaging;
