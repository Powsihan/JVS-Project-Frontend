import Adminlayout from '@/src/layouts/Adminlayout';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import "./communication.css";
import MessageInput from './MessageInput'; 



// Mock chat data
const mockChats = [
  {
    name: "Thanu",
    message: "Hey, how's it going?",
    timestamp: "2:45 PM",
  },
  {
    name: "Powsi",
    message: "Can we meet tomorrow?",
    timestamp: "1:30 PM",
  },
  {
    name: "Saintha",
    message: "I'll send the report soon.",
    timestamp: "12:15 PM",
  },
  {
    name: "Saalu",
    message: "Can you send the slides quickly?",
    timestamp: "10:15 PM",
  },
];

// Mock message history for a selected person
const mockMessageHistory = [
  { sender: "Thanu", message: "Hey, how's it going?", timestamp: "2:45 PM" },
  { sender: "Me", message: "I'm good, thanks! How about you?", timestamp: "2:46 PM" },
  { sender: "Thanu", message: "Doing well, working on the project.", timestamp: "2:47 PM" },
  { sender: "Me", message: "Great! Need any help?", timestamp: "2:48 PM" },
  { sender: "Thanu", message: "Not right now, thanks.", timestamp: "2:49 PM" },
];

const Index = () => {
  const [userData, setUserData] = useState(null);
  const [chats, setChats] = useState(mockChats); // Use mock data as initial state
  const [selectedChat, setSelectedChat] = useState(mockMessageHistory); // Selected chat history


  useEffect(() => {
    // Retrieve user data from cookie
    const storedUserData = Cookies.get("token");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleSendMessage = (message) => {
    const newMessage = {
      sender: "Me",
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setSelectedChat((prevChat) => [...prevChat, newMessage]);
  };

  return (
    <Adminlayout>
      <div className="container-fluid Communication-section">
        <div className="row">
          <div className='box-1 col-lg-8 p-4'>
            <h1>Chat with Thanu</h1>
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
              {chats.map((chat, index) => (
                <div className="border-bottom py-2" key={index}>
                  <div className="fw-bold">{chat.name}</div>
                  <div className="mt-1 text-secondary">{chat.message}</div>
                  <div className="text-muted small">{chat.timestamp}</div>
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
