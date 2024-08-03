import React, { useState, useEffect } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import axios from "axios";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import "../styles/component.css";

const theme = {
  background: "#f5f8fb",
  headerBgColor: "var(--primary-color)",
  headerFontColor: "#fff",
  headerFontSize: "16px",
  botBubbleColor: "var(--primary-color)",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const ChatbotAPI = ({ steps }) => {
  const userInput = steps.userInput.value;
  const [response, setResponse] = useState("");

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/aichat", {
          userInput,
        });
        const formattedResponse = formatResponse(res.data.response);
        setResponse(formattedResponse);
      } catch (error) {
        setResponse("Sorry, there was an error. Please try again later.");
      }
    };
    fetchResponse();
  }, [userInput]);

  const formatResponse = (text) => {
    return text
      .split("\n")
      .filter(line => line.trim() !== "")
      .map((line, index) => <li key={index}>{line.trim()}</li>);
  };

  return <div>{response}</div>;
};

// Chatbot steps
const steps = [
  {
    id: "1",
    message:
      "Hello! Welcome to Jaffna Vehicle Spot. How can I assist you today?",
    trigger: "userInput",
  },
  {
    id: "userInput",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message: "Let me check that for you...",
    trigger: "fetchResponse",
  },
  {
    id: "fetchResponse",
    component: <ChatbotAPI />,
    asMessage: true,
    trigger: "1",
  },
];

const Chatbot = ({ showChatbot, setShowChatbot }) => {
  return (
    <div>
      {showChatbot && (
        <ThemeProvider theme={theme}>
          <div className="chatbot-wrapper">
            <ChatBot steps={steps} headerTitle="AI Expert" />
            <div
              className="close-button-chatbot"
              onClick={() => setShowChatbot(false)}
            >
              <IconButton>
                <ClearIcon sx={{ color: "#fff" }} />
              </IconButton>
            </div>
          </div>
        </ThemeProvider>
      )}
    </div>
  );
};

export default Chatbot;
