import Adminlayout from '@/src/layouts/Adminlayout';
import React, { useEffect, useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import "./communication.css";
import MessageInput from './MessageInput'; 
import socket from '../../../utils/socketService'; // Import socket
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/src/redux/reducer/loaderSlice';
import { toast } from 'react-toastify';
import { getCustomerDetails } from '@/src/redux/action/customer';
import { getUserInfo } from '@/src/redux/action/user';

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
      // Fetch chat history between user and selected receiver
      const fetchChatHistory = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/chats/${userData._id}/User/${selectedReceiver._id}/Customer`);
          setSelectedChat(response.data);
        } catch (error) {
          console.error("Error fetching chat history:", error);
        }
      };

      fetchChatHistory();
    }
  }, [userData, selectedReceiver]);

  useEffect(() => {
    socket.on('message', (message) => {
      setSelectedChat((prevChat) => [...prevChat, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const handleSendMessage = async (message) => {
    if (!selectedReceiver) return;
    const newMessage = {
      senderId: userData._id, 
      senderModel: 'User', 
      receiverId: selectedReceiver._id, 
      receiverModel: 'Customer',
      message,
    };
    try {
      await axios.post('http://localhost:5000/api/chats', newMessage);
      setSelectedChat((prevChat) => [...prevChat, { ...newMessage, sender: "Me", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Adminlayout>
      <div className="container-fluid Communication-section">
        <div className="row">
          <div className='box-1 col-lg-8 p-4'>
            <h1>Chat with {selectedReceiver ? `${selectedReceiver.fname} ${selectedReceiver.lname}` : "Select a receiver"}</h1>
            <div className="d-flex flex-column">
              {selectedChat.map((message, index) => (
                <div className={`d-flex flex-column mb-3 ${message.sender === "Me" ? "align-self-end text-right" : "align-self-start text-left"}`} key={index}>
                  <div className={`p-2 ${message.sender === "Me" ? "bg-primary text-white" : "bg-light text-dark"} rounded`}>
                    <div>{message.message}</div>
                    <div className="text-muted small">{message.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
            <MessageInput onSend={handleSendMessage} />
          </div>
          <div className='box-2 col-lg-4 p-4'>
            <h1>Chats</h1>
            <div className="mb-3 position-relative">
              <form>
                <input
                  className="form-control rounded-pill"
                  type="text"
                  placeholder="Search or start message"
                />
                <div className="search-icon">
                  <SearchIcon />
                </div>
              </form>
            </div>
            <div className="d-flex flex-column">
              {receivers.map((receiver) => (
                <div
                  className="border-bottom py-2"
                  key={receiver._id}
                  onClick={() => setSelectedReceiver(receiver)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="fw-bold">{receiver.fname} {receiver.lname}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Adminlayout>
  );
};

export default Index;
