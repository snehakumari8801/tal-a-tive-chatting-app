import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";

function UpdateGroupChatModal({
  fetchAgain,
  setFetchAgain,
  isOpen,
  setIsOpen,
}) {
  const { selectedChat, setSelectedChat } = ChatState();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editChatname, setEditChatName] = useState(selectedChat?.chatName);
  const [isAdd, setIsAdd] = useState(false);
  const [searchToAdd, setSearchToAdd] = useState("");
  const [searchlist, setSearchList] = useState([]);

  const { user } = ChatState();

  // Handle user removal
  async function handleRemove(user1) {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/chat/groupremove",
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // Handle search input for adding a user
  async function searchHandler(e) {
    setIsAdd(true);
    setSearchToAdd(e.target.value);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/user?search=${e.target.value}`,
        config
      );
      setSearchList(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Handle adding a new user to the group
  async function addHandler(userToAdd) {
    if (selectedChat.users.some((u) => u._id === userToAdd._id)) {
      alert("User already added");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chat/groupadd",
        {
          chatId: selectedChat._id,
          userId: userToAdd._id,
        },
        config
      );

      setSelectedChat({ ...selectedChat, users: data.users });
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // Handle editing the group chat name
  async function editHandler() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: editChatname,
        },
        config
      );

      setSelectedChat({ ...selectedChat, chatName: data.chatName });
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-gray-700 text-white p-6 rounded-lg shadow-lg w-[90%] max-w-md ${
          isOpen ? "block" : "hidden"
        }`}
    >
      <div className="flex justify-between items-center mb-4">
        {edit ? (
          <div className="flex items-center gap-2 w-full">
            <input
              type="text"
              placeholder="Edit chat name"
              value={editChatname}
              onChange={(e) => setEditChatName(e.target.value)}
              className="flex-1 p-2 rounded border border-gray-400 text-black"
            />
            <button
              onClick={editHandler}
              className="bg-gray-500 px-3 py-1 rounded text-white hover:bg-gray-600"
            >
              Update
            </button>
          </div>
        ) : (
          <div className="flex justify-between w-full">
            <h3 className="font-bold text-lg">{selectedChat?.chatName}</h3>
            <button
              onClick={() => setEdit(true)}
              className="bg-yellow-500 px-3 py-1 rounded text-white hover:bg-yellow-600"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      <div>
        {selectedChat?.users?.map((user) => (
          <div
            className="flex justify-between items-center bg-gray-800 p-2 rounded-lg mb-2"
            key={user._id}
          >
            <div className="flex items-center">
              <img
                src={user.pic}
                alt={user.name}
                className="w-8 h-8 rounded-full mr-3"
              />
              <span>{user.name}</span>
            </div>
            <button
              onClick={() => handleRemove(user)}
              disabled={loading}
              className={`text-red-500 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:underline"
              }`}
            >
              {loading ? "Removing..." : "Remove"}
            </button>
          </div>
        ))}
      </div>

      {isAdd && (
        <div>
          <input
            type="text"
            placeholder="Search for users"
            value={searchToAdd}
            onChange={searchHandler}
            className="w-full p-2 rounded border border-gray-400 text-black mb-4"
          />
        </div>
      )}

      {searchlist.slice(0, 4).map((user) => (
        <div
          key={user._id}
          className="flex items-center justify-between bg-gray-800 p-2 rounded-lg cursor-pointer mb-2 hover:bg-gray-700"
          onClick={() => addHandler(user)}
        >
          <span>{user.name}</span>
        </div>
      ))}

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setIsAdd(!isAdd)}
          className="bg-gray-500 px-3 py-2 rounded text-white hover:bg-gray-600"
        >
          {isAdd ? "Cancel" : "Add User"}
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="bg-red-500 px-3 py-2 rounded text-white hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default UpdateGroupChatModal;
