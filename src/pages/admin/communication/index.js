import React, { useEffect, useRef, useState } from "react";
import Adminlayout from "@/src/layouts/Adminlayout";
import SearchIcon from "@mui/icons-material/Search";
import "./communication.css";
import MessageInput from "../../../components/MessageInput";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import { toast } from "react-toastify";
import { getCustomerDetails } from "@/src/redux/action/customer";
import { getUserInfo } from "@/src/redux/action/user";
import Image from "next/image";
import { avatar, communication } from "@/src/utils/ImagesPath";
import socket from "@/src/utils/socketService";

const formatTimestamp = (date) => {
  const datePart = new Date(date).toLocaleDateString([], { month: '2-digit', day: '2-digit' });
  const timePart = new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();
  return `${datePart} - ${timePart}`;
};

const Index = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [filteredReceivers, setFilteredReceivers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const messageContainerRef = useRef(null);
  const [unreadMessages, setUnreadMessages] = useState({});


  // Function to scroll chat to the bottom
  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  // Fetch customer details on component mount
  useEffect(() => {
    dispatch(setLoading(true));
    getCustomerDetails((res) => {
      if (res?.data) {
        const customers = Array.isArray(res?.data) ? res?.data : [];
        if (customers?.length === 0) {
          dispatch(setLoading(false));
          toast.info("No Customers data available");
          return;
        }
        setReceivers(customers);
        setFilteredReceivers(customers);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        toast.error("Error fetching Customer details");
      }
    });
  }, [dispatch]);

  // Fetch user info
  useEffect(() => {
    dispatch(setLoading(true));
    getUserInfo((res) => {
      if (res?.status === 200) {
        setUserData(res?.data);
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);

  // Fetch chat history when a receiver is selected
  useEffect(() => {
    if (userData && selectedReceiver) {
      const fetchChatHistory = async () => {
        try {
          const response = await axios.get(
            `${process.env.api_base_url}/chats/${userData._id}/User/${selectedReceiver._id}/Customer`
          );
          setSelectedChat(response?.data);
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
  
      setUnreadMessages((prev) => ({
        ...prev,
        [message.sender]: true, 
      }));
    });
  
    return () => {
      socket.off("message");
    };
  }, []);
  

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

 
  const handleSendMessage = async (message) => {
    if (!selectedReceiver) return;
    const newMessage = {
      senderId: userData?._id,
      senderModel: "User",
      receiverId: selectedReceiver?._id,
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
        },
      ]);
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };


  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredReceivers(
      receivers.filter((receiver) =>
        `${receiver?.fname} ${receiver?.lname}`.toLowerCase().includes(query)
      )
    );
  };

  const handleSelectReceiver = (receiver) => {
    setSelectedReceiver(receiver);
    setUnreadMessages((prev) => ({
      ...prev,
      [receiver._id]: false, 
    }));
  };
  

  return (
    <Adminlayout>
      <div className="container-fluid Communication-section">
        <div className="row">
          <div className="col-lg-8">
            <div className="box-1 p-4">
              {selectedReceiver ? (
                <div>
                  <div className="d-flex align-items-center gap-2 rounded p-1" style={{ backgroundColor: "var(--primary-color)" }}>
                    <Image
                      src={selectedReceiver?.profilePic || avatar}
                      width={50}
                      height={50}
                      alt="Profile Picture"
                      className="rounded-circle"
                    />
                    <h4 className="m-0">
                      {`${selectedReceiver?.fname} ${selectedReceiver?.lname}`}
                    </h4>
                  </div>
                  <div className="message-container message-overflow-container" ref={messageContainerRef}>
                    {selectedChat.map((message, index) => (
                      <div
                        className={`message d-flex ${
                          message?.senderModel === "User" ? "message-sent" : "message-received"
                        }`}
                        key={index}
                      >
                        <div className="sender-info">
                          {message?.senderModel === "User" ? "You" : selectedReceiver?.fname}
                        </div>
                        <div>{message.message}</div>
                        <div className={`timestamp d-flex ${message.senderModel === "User" ? "timestamp-sent" : "timestamp-received"}`}>
                          {formatTimestamp(message?.timestamp)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <MessageInput onSend={handleSendMessage} />
                </div>
              ) : (
                <div>
                  <h4 className="text-center rounded p-2" style={{ backgroundColor: "var(--primary-color)" }}>
                    Welcome to Message Section
                  </h4>
                  <Image src={communication} alt="Communication" loading="lazy" className="w-100 h-100"/>
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="box-2 p-4">
              <h3>Chats</h3>
              <hr />
              <div className="mb-3 position-relative">
                <form>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search Customer"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <div className="search-icon">
                    <SearchIcon />
                  </div>
                </form>
              </div>
              <div className="receiver-list message-overflow-container">
                {filteredReceivers.map((receiver) => (
                 <div className="receiver-item" key={receiver?._id} onClick={() => handleSelectReceiver(receiver)}>
                 <div className="fw-bold">
                   {receiver?.fname} {receiver?.lname}
                   {unreadMessages[receiver?._id] && (
                     <span className="green-dot"></span> // Add a green dot if the chat has unread messages
                   )}
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
