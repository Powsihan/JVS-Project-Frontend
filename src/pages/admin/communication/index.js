import Adminlayout from "@/src/layouts/Adminlayout";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./communication.css";
import MessageInput from "../../../components/MessageInput";
import socket from "../../../utils/socketService";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import { toast } from "react-toastify";
import { getCustomerDetails } from "@/src/redux/action/customer";
import { getUserInfo } from "@/src/redux/action/user";

const Index = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState(null);

  useEffect(() => {
    dispatch(setLoading(true));
    getCustomerDetails((res) => {
      if (res && res.data) {
        const customers = Array.isArray(res.data) ? res.data : [];
        if (customers.length === 0) {
          dispatch(setLoading(false));
          toast.info("No Customers data available");
          return;
        }
        setReceivers(customers);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        toast.error("Error fetching Customer details");
      }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(setLoading(true));
    getUserInfo((res) => {
      if (res.status === 200) {
        setUserData(res.data);
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (userData && selectedReceiver) {
      const fetchChatHistory = async () => {
        try {
          const response = await axios.get(
            `${process.env.api_base_url}/chats/${userData._id}/User/${selectedReceiver._id}/Customer`
          );
          setSelectedChat(response.data);
        } catch (error) {
          console.error("Error fetching chat history:", error);
        }
      };

      fetchChatHistory();
    }
  }, [userData, selectedReceiver]);

  useEffect(() => {
    socket.on("message", (message) => {
      setSelectedChat((prevChat) => [...prevChat, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const handleSendMessage = async (message) => {
    if (!selectedReceiver) return;
    const newMessage = {
      senderId: userData._id,
      senderModel: "User",
      receiverId: selectedReceiver._id,
      receiverModel: "Customer",
      message,
    };
    try {
      await axios.post(`${process.env.api_base_url}/chats`, newMessage);
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
    <Adminlayout>
      <div className="container-fluid Communication-section">
        <div className="row">
          <div className="col-lg-8">
            <div className="box-1 p-4">
              <h2>
                Chat with{" "}
                {selectedReceiver
                  ? `${selectedReceiver.fname} ${selectedReceiver.lname}`
                  : "Select a receiver"}
              </h2>
              <div className="message-container">
                {selectedChat.map((message, index) => (
                  <div
                    className={`message ${
                      message.sender === "Me"
                        ? "message-sent"
                        : "message-received"
                    }`}
                    key={index}
                  >
                    <div>{message.message}</div>
                    <div className="timestamp">{message.timestamp}</div>
                  </div>
                ))}
              </div>
              <MessageInput onSend={handleSendMessage} />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="box-2 p-4">
              <h3>Chats</h3>
              <div className="mb-3 position-relative">
                <form>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search or start message"
                  />
                  <div className="search-icon">
                    <SearchIcon />
                  </div>
                </form>
              </div>
              <div className="receiver-list">
                {receivers.map((receiver) => (
                  <div
                    className="receiver-item"
                    key={receiver._id}
                    onClick={() => setSelectedReceiver(receiver)}
                  >
                    <div className="fw-bold">
                      {receiver.fname} {receiver.lname}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Adminlayout>
  );
};

export default Index;
