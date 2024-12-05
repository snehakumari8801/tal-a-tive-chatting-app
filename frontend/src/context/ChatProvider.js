import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router"; // Correctly import useNavigate

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook for v5
  const [user, setUser] = useState("");
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState("");
  const [selectedChat, setSelectedChat] = useState("");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      navigate("/"); // Use navigate.() to navigate
    }
  }, [navigate]); // navigate is part of the dependency array

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
