import React, { useEffect, useRef, useState } from "react";
import axios from "axios"; // Import socket
import MessageInput from "../MessageInput"; // Reuse the MessageInput component
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import "../../pages/admin/communication/communication.css";
import { getLoginCustomerDetail } from "@/src/redux/action/customer";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import "../../styles/component.css";
import "../../styles/admin.css";
import socket from "@/src/utils/socketService";

const formatTimestamp = (date) => {
  const datePart = new Date(date).toLocaleDateString([], {
    month: "2-digit",
    day: "2-digit",
  });
  const timePart = new Date(date)
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();
  return `${datePart} - ${timePart}`;
};

const ExpertMessaging = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState(null);
  const [selectedChat, setSelectedChat] = useState([]);

  const messageContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getLoginCustomerDetail((res) => {
      if (res?.status == 200) {
        setCustomerData(res?.data);
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
            `${process.env.api_base_url}/expertchats/${customerData._id}/Customer/66a711dbf8b4653159d15015/Employee`
          );
          setSelectedChat(response?.data);
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

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  const handleSendMessage = async (message) => {
    const newMessage = {
      senderId: customerData?._id,
      senderModel: "Customer",
      receiverId: "66a711dbf8b4653159d15015",
      receiverModel: "Employee",
      message,
    };
    try {
      await axios.post(`${process.env.api_base_url}/expertchats`, newMessage);
      setSelectedChat((prevChat) => [
        ...prevChat,
        {
          ...newMessage,
          sender: "Me",
        },
      ]);
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title className="Modal-Title">Chat with Expert</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid Communication-section">
          <div className="row">
            <div className="box-1 col-lg-12 p-4">
              <div
                className="d-flex flex-column message-overflow-container"
                ref={messageContainerRef}
              >
                {selectedChat?.map((message, index) => (
                  <div
                    className={`d-flex flex-column mb-3 ${
                      message?.senderModel === "Customer"
                        ? "align-items-end"
                        : "align-items-start"
                    }`}
                    key={index}
                  >
                    <div
                      className={`message ${
                        message?.senderModel === "Customer"
                          ? "message-sent"
                          : "message-received"
                      }`}
                    >
                      <div className="sender-info">
                        {message?.senderModel === "Customer" ? "You" : "Expert"}
                      </div>
                      <div>{message?.message}</div>

                      <div
                        className={`timestamp d-flex ${
                          message?.senderModel === "Customer"
                            ? "timestamp-sent"
                            : "timestamp-received"
                        }`}
                      >
                        {formatTimestamp(message?.timestamp)}
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

export default ExpertMessaging;
