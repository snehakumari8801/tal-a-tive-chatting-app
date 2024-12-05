import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import { useNavigate } from "react-router";

function SearchDrawer({
  isOpenDrawer,
  setIsOpenDrawer,
  allUsers,
  setAllUsers,
  searchResult1,
  setSearchResult1,
  loading,
  setLoading,
  setSelectedUser,
  chats,
  setChats,
}) {
  const [search1, setSearch1] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);
  const { user, setSelectedChat } = ChatState();
  const navigate = useNavigate();

  function chatHandler(id) {
    navigate("/chats");
    setSelectedUser(id);
  }

  // Fetch all users initially
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get(`/api/user?serach=${search1}`, config);

        console.log(data)
        setAllUsers(data); // Set all users in state
        setSearchResult1(data); // Display all users initially
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user.token]); // Fetch users once when the component mounts

  // Filter search results based on user input
  useEffect(() => {
    if (search1 === "") {
      setSearchResult1(allUsers); // Display all users if search is empty
    } else {
      const filteredResults = allUsers.filter((user) =>
        user.name.toLowerCase().includes(search1.toLowerCase())
      );
      setSearchResult1(filteredResults); // Display filtered users
    }
  }, [search1, allUsers]); // Run whenever search or allUsers changes

  // Access chat
  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      console.log("chat data -----> ", data);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex absolute -mt-[100px] -ml-5  flex-col justify-start p-2 
       bg-white rounded-lg overflow-y-hidden 
        shadow-lg  md:w-[350px] w-[200px] transition-all duration-300 ease-in-out
        overflow-hidden z-20"
    >
      {/* Search Input and Close Button */}
      <div className="flex justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search Users..."
          value={search1}
          onChange={(e) => setSearch1(e.target.value)} // Update search state as the user types
          className="w-full bg-gray-100 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
        />
       
        <p
          onClick={() => setIsOpenDrawer(!isOpenDrawer)}
          className="text-xl text-gray-700 cursor-pointer hover:text-red-500 transition-all duration-200"
        >
          X
        </p>
      </div>

      {/* Search Results */}
      <div className="overflow-y-hidden max-h-60">
        {searchResult1.length > 0 ? (
          searchResult1.map((result) => (
            <div
              key={result._id}
              onClick={() => accessChat(result._id)}
              className="bg-gray-100 hover:bg-gray-200 mt-2 rounded-md cursor-pointer transition-all duration-200"
            >
              <p className="p-3 text-gray-800">{result.name}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No users found</p>
        )}
      </div>
    </div>
  );
}

export default SearchDrawer;
