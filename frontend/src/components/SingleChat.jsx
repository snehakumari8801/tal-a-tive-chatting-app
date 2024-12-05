import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { getSenderFull } from "../config/ChatLogic";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import axios from "axios";
import ScrollbarChat from "./ScrollbarChat";
import animationData from "../../src/typing.json";
import io from "socket.io-client";
import { FaArrowLeft } from "react-icons/fa";

const ENDPOINT = "http://localhost:3000"; // Your backend endpoint
let socket, selectedChatCompare;

function SingleChat({
  fetchAgain,
  setFetchAgain,
  selectedUser,
  setSelectedUser,
}) {
  const { selectedChat, user, setSelectedChat, notification, setNotification } =
    ChatState();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketconnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpenGroup, setIsOpenGroup] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Fetch all messages for the selected chat
  const fetchAllChats = async () => {
    if (!selectedChat) return;
    setLoadingMessages(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      console.log("sent message " , data)
      setLoadingMessages(false);
      socket.emit("join chat", selectedChat._id); // Join the chat room
    } catch (error) {
      console.error("Error fetching messages:", error);
      setLoadingMessages(false);
    }
  };

  // Send message on Enter key press
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage.trim() !== "") {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage(""); // Clear input field after sending
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        socket.emit("new message", data); // Emit message to the server
        setMessages((prevMessages) => [...prevMessages, data]); // Add new message to state
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  // Socket IO setup
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true)); // Typing indicator on
    socket.on("stop typing", () => setIsTyping(false)); // Typing indicator off

    return () => {
      socket.off("connected");
      socket.off("typing");
      socket.off("stop typing");
    };
  }, [user]);

  // Fetch messages whenever the selected chat changes
  useEffect(() => {
    fetchAllChats();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  // Handle new incoming messages
  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    });
  });

  // Handle typing event
  function typingHandler(e) {
    setNewMessage(e.target.value); // Update message state

    if (!socketconnected) return;

    if (!typing) {
      setTyping(true); // Set typing to true when user starts typing
      socket.emit("typing", selectedChat._id); // Emit typing event
    }

    const lastTypingTime = new Date().getTime(); // Record the current time

    // Use a timeout to detect when the user stops typing
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= 3000 && typing) {
        socket.emit("stop typing", selectedChat._id); // Emit stop typing
        setTyping(false); // Reset typing state
      }
    }, 3000); // Stop typing after 3 seconds of inactivity
  }

  return (
    <div className=" ">
      {/* Header Section */}
      <div className="flex justify-between p-2">
        {selectedChat !== null && (
          <button onClick={() => setSelectedChat(null)} className="text-2xl">
            <FaArrowLeft />
          </button>
        )}

        <p className="text-lg font-semibold">
          {selectedChat?.chatName || "Chat"}
        </p>

        {/* Edit Group Info */}
        <div>
          {selectedChat !== null && (
            <button
              className="bg-white text-black p-2 rounded-md font-semibold"
              onClick={() => setIsOpen(!isOpen)}
            >
              Edit Group Info
            </button>
          )}
        </div>

        {/* Modal */}
      </div>

      <div className={` absolute ${isOpen ? "visible" : "invisible"}`}>
        <UpdateGroupChatModal
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>

      {/* Messages Display */}
      {selectedChat !== null && (
        <ScrollbarChat messages={messages} loadingMessages={loadingMessages} 
        isTyping={isTyping} setIsTyping={setIsTyping}/>
      )}

      {/* Input Section */}
      <div>
       

        {selectedChat !== null && (
          <input
            type="text"
            placeholder="Type a message..."
            onChange={typingHandler}
            value={newMessage}
            onKeyDown={sendMessage}
            className="h-10 w-[70vw] rounded-full p-2 mt-2 text-black outline-none ml-12 sm:ml-0"
          />
        )}
      </div>

      {/* Group Info Section */}
      <div className="relative">
        {selectedChat == null && (
          <p className="flex justify-center items-center font-bold text-2xl">
            Start chatting
          </p>
        )}
        {selectedChat && <p>{selectedUser.chatName}</p>}
      </div>
    </div>
  );
}

export default SingleChat;
