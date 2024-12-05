import React, { useState, useEffect } from "react";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";

function GroupChatModal({
  addChatModal,
  setAddChatModal,
  setGroupChats,
  groupChatName,
  setGroupChatName,
  selectedUser,
  setSelectedUser,
  searchUser,
  setSearchUser,
  searchResult,
  setSearchResult,
  groupchats,
}) {
  const { user } = ChatState();
  const [loading, setLoading] = useState(false);

  // Retrieve group chats from localStorage on mount
  useEffect(() => {
    const storedGroupChats = JSON.parse(localStorage.getItem("groupChats"));
    if (storedGroupChats) {
      setGroupChats(storedGroupChats); // Populate the state with data from localStorage
    }
  }, [setGroupChats]);

  // Save group chats to localStorage whenever groupChats change
  useEffect(() => {
    if (groupchats && groupchats.length > 0) {
      localStorage.setItem("groupChats", JSON.stringify(groupchats));
    }
  }, [groupchats]);

  // Handle form submission to create a new group chat
  async function handleSubmit() {
    if (!groupChatName || selectedUser.length === 0) {
      alert("Please enter a group name and select at least one user.");
      return;
    }

    // console.log(JSON.stringify(selectedUser.map((user) => user._id)));
    console.log(
      '"' + JSON.stringify(selectedUser.map((user) => user._id)) + '"'
    );

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUser.map((user) => user._id)), // assuming user objects have an `_id` property
        },
        config
      );
      // Handle success (maybe close the modal and update the chat list)
      setGroupChats(data); // Set new group chats in state
      console.log("create chat ", data);
      setAddChatModal(false); // Close the modal after chat creation
    } catch (error) {
      console.log(error);
      alert("Failed to create chat");
    }
  }

  // Handle search and get results
  async function handleSearch(e) {
    const value = e.target.value;
    setSearchUser(value); // Update search state immediately

    if (!value) {
      setSearchResult([]); // Clear search results if no search value
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/user?search=${searchUser}`,
        config
      );
      setSearchResult(data); // Set the results when the search is successful
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading when done
    }
  }

  // Handle adding users to the group
  async function handleGroup(userToAdd) {
    if (selectedUser.some((user) => user._id === userToAdd._id)) {
      return alert("User already added");
    }

    setSelectedUser([...selectedUser, userToAdd]);
  }

  // Handle removal of users from selected users
  async function handleRemove(userToRemove) {
    setSelectedUser(selectedUser.filter((u) => u._id !== userToRemove._id));
  }

  return (
    <div className="flex flex-col">
      {/* Modal for New Group Chat */}
      <div
        className={`${
          addChatModal ? "block" : "hidden"
        } fixed inset-0  text-black bg-gray-600 bg-opacity-50 flex justify-center items-center z-50`}
        onClick={() => setAddChatModal(false)} // Close on backdrop click
      >
        <div
          className="bg-white p-4 rounded-lg w-96 relative"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          <div className="flex justify-between items-center">
            <p className="font-bold text-xl">Create Chat group</p>
            <button
              className="text-xl font-bold text-gray-500"
              onClick={() => setAddChatModal(false)}
            >
              X
            </button>
          </div>

          {/* Group chat name input */}
          <input
            type="text"
            placeholder="Chat Name"
            className="border-2 h-8 w-full rounded-md pl-3 border-gray-200 outline-none mt-2"
            value={groupChatName}
            onChange={(e) => setGroupChatName(e.target.value)}
          />

          {/* Search for users */}
          <input
            type="text"
            placeholder="Search Users"
            className="border-2 h-8 w-full rounded-md pl-3 border-gray-200 outline-none mt-2"
            value={searchUser}
            onChange={handleSearch}
          />

          {/* Loading state */}
          {loading ? (
            <p className="mt-2">Loading...</p>
          ) : (
            <div className="mt-2">
              {searchResult.slice(0, 4).map((result) => (
                <div
                  key={result._id}
                  className="flex justify-between items-center py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleGroup(result)}
                >
                  <p>{result.name}</p>
                  <button className="text-gray-500">Add</button>
                </div>
              ))}
            </div>
          )}

          {/* Display selected users */}
          <div className="mt-4">
            {selectedUser.map((user) => (
              <div
                key={user._id}
                className="flex justify-between items-center py-2"
              >
                <p>{user.name}</p>
                <button
                  onClick={() => handleRemove(user)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              className="bg-red-500 w-[80px] rounded-md text-white h-8"
              onClick={() => setAddChatModal(false)}
            >
              Close
            </button>
            <button
              className="bg-green-500 w-[100px] rounded-md text-white h-8"
              onClick={handleSubmit}
            >
              Create Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupChatModal;
