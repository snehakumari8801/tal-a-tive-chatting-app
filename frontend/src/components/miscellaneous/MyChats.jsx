import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import { getSender } from "../../config/ChatLogic";
import GroupChatModal from "./GroupChatModal";

function MyChats({
  loggedUser,
  setLoggedUser,
  loading,
  setLoading,
  chats,
  setChats,
  addChatModal,
  setAddChatModal,
  groupChatName,
  setGroupChatName,
  selectedUser,
  setSelectedUser,
  searchUser,
  setSearchUser,
  searchResult,
  setSearchResult,
  groupchats,
  setGroupChats,
  fetchAgain,
}) {
  const { user, selectedChat, setSelectedChat } = ChatState();

  // Fetch chats when component mounts or user token changes
  const fetchChats = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
      console.log("Chats fetched:", data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  const isUserInChat = () => {};

  return (
    <div
      className=" bg-slate-50 m-2 rounded-md overflow-y-auto scrollbar-hidden 
     h-screen"
    >
      <div className="flex  justify-between p-4">
        <p className="text-lg font-bold text-black">My Chats</p>
        <button
          className="bg-blue-900 text-white rounded-md px-4 py-2"
          onClick={() => setAddChatModal(!addChatModal)}
        >
          New Group Chat +
        </button>
      </div>

      <p>{selectedUser.name}</p>

      <GroupChatModal
        addChatModal={addChatModal}
        setAddChatModal={setAddChatModal}
        groupChatName={groupChatName}
        setGroupChatName={setGroupChatName}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        searchUser={searchUser}
        setSearchUser={setSearchUser}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        groupchats={groupchats}
        setGroupChats={setGroupChats}
        loading={loading}
        setLoading={setLoading}
      />

      {/* Display loading message if still fetching */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div
            className="spinner-border animate-spin border-4 border-t-4
           border-gray-500 rounded-full w-10 h-10"
          ></div>
        </div>
      ) : chats ? (
        chats
          .filter((chat) => isUserInChat(chat.users))
          .map((chat) => (
            <div
              key={chat._id}
              className="p-2 mt-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-500">
                  {chat.chatName}
                </p>
                {chat.isChatGroup && (
                  <span className="text-sm text-gray-400">Group Chat</span>
                )}
              </div>
              <p className="text-sm text-gray-600">
                {chat.isChatGroup
                  ? chat.chatName
                  : getSender(loggedUser, chat.users)}
              </p>
            </div>
          ))
      ) : (
        <p className="text-center mt-8">No chats available.</p>
      )}
      <div>
        {chats.map((chat) => (
          <div
            className="bg-gray-500 mt-2 h-10 text-white p-2"
            onClick={() => setSelectedChat(chat)}
          >
            {chat.chatName}
            <span>{chat.isChatGroup}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyChats;
