import React from "react";
import { ChatState } from "../../context/ChatProvider";
import SingleChat from "../SingleChat";

function ChatBox({ fetchAgain, setFetchAgain, selectedUser, setSelectedUser }) {
  const { selectedChat } = ChatState();
  return (
    <div>
      <SingleChat
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
}

export default ChatBox;
