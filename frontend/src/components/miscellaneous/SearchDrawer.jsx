// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ChatState } from "../../context/ChatProvider";
// import { useNavigate } from "react-router";

// function SearchDrawer({
//   isOpenDrawer,
//   setIsOpenDrawer,
//   allUsers,
//   setAllUsers,
//   searchResult1,
//   setSearchResult1,
//   loading,
//   setLoading,
//   setSelectedUser,
//   chats,
//   setChats,
// }) {
//   const [search1, setSearch1] = useState("");
//   const [loadingChat, setLoadingChat] = useState(false);
//   const { user, setSelectedChat } = ChatState();
//   const navigate = useNavigate();

//   function chatHandler(id) {
//     navigate("/chats");
//     setSelectedUser(id);
//   }

//   // Fetch all users initially
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);

//         const config = {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         };

//         const { data } = await axios.get(`/api/user?serach=${search1}`, config);

//         console.log(data)
//         setAllUsers(data); // Set all users in state
//         setSearchResult1(data); // Display all users initially
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [user.token]); // Fetch users once when the component mounts

//   // Filter search results based on user input
//   useEffect(() => {
//     if (search1 === "") {
//       setSearchResult1(allUsers); // Display all users if search is empty
//     } else {
//       const filteredResults = allUsers.filter((user) =>
//         user.name.toLowerCase().includes(search1.toLowerCase())
//       );
//       setSearchResult1(filteredResults); // Display filtered users
//     }
//   }, [search1, allUsers]); // Run whenever search or allUsers changes

//   // Access chat
//   const accessChat = async (userId) => {
//     try {
//       setLoadingChat(true);
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.post(`/api/chat`, { userId }, config);
//       console.log("chat data -----> ", data);
//       if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
//       setSelectedChat(data);
//       setLoadingChat(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div
//       className="flex absolute -mt-[100px] -ml-5  flex-col justify-start p-2 
//        bg-white rounded-lg overflow-y-hidden 
//         shadow-lg  md:w-[350px] w-[200px] transition-all duration-300 ease-in-out
//         overflow-hidden z-20"
//     >
//       {/* Search Input and Close Button */}
//       <div className="flex justify-between items-center mb-4 gap-4">
//         <input
//           type="text"
//           placeholder="Search Users..."
//           value={search1}
//           onChange={(e) => setSearch1(e.target.value)} // Update search state as the user types
//           className="w-full bg-gray-100 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
//         />
       
//         <p
//           onClick={() => setIsOpenDrawer(!isOpenDrawer)}
//           className="text-xl text-gray-700 cursor-pointer hover:text-red-500 transition-all duration-200"
//         >
//           X
//         </p>
//       </div>

//       {/* Search Results */}
//       <div className="overflow-y-hidden max-h-60">
//         {searchResult1.length > 0 ? (
//           searchResult1.map((result) => (
//             <div
//               key={result._id}
//               onClick={() => accessChat(result._id)}
//               className="bg-gray-100 hover:bg-gray-200 mt-2 rounded-md cursor-pointer transition-all duration-200"
//             >
//               <p className="p-3 text-gray-800">{result.name}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-600">No users found</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SearchDrawer;






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

        const { data } = await axios.get(`/api/user`, config);

        setAllUsers(data); // Set all users in state
        setSearchResult1(data); // Display all users initially
      } catch (error) {
        console.log("Error fetching users:", error);
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
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(`/api/chat`, { userId }, config);
      console.log("Accessed chat data:", data);

      // If the chat doesn't exist in the current chats list, add it
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setSelectedChat(data); // Set the accessed chat as the selected chat
      setIsOpenDrawer(false); // Close the search drawer
      navigate("/chats"); // Navigate to the chats page
    } catch (error) {
      console.log("Error accessing chat:", error);
    } finally {
      setLoadingChat(false);
    }
  };

  return (
    <div
      className={`flex absolute -mt-[100px] -ml-5 flex-col justify-start p-2 
       bg-white rounded-lg overflow-y-hidden 
       shadow-lg  md:w-[350px] w-[200px] transition-all duration-300 ease-in-out
       ${isOpenDrawer ? "z-20" : "hidden"}`}
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
          onClick={() => setIsOpenDrawer(false)}
          className="text-xl text-gray-700 cursor-pointer hover:text-red-500 transition-all duration-200"
        >
          X
        </p>
      </div>

      {/* Search Results */}
      <div className="overflow-y-hidden max-h-60">
        {loading || loadingChat ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : searchResult1.length > 0 ? (
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
















































// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ChatState } from "../../context/ChatProvider";
// import { useNavigate } from "react-router";

// function SearchDrawer({
//   isOpenDrawer,
//   setIsOpenDrawer,
//   allUsers,
//   setAllUsers,
//   searchResult1,
//   setSearchResult1,
//   loading,
//   setLoading,
//   setSelectedUser,
//   chats,
//   setChats,
// }) {
//   const [search1, setSearch1] = useState("");
//   const [loadingChat, setLoadingChat] = useState(false);
//   const { user, setSelectedChat } = ChatState();
//   const navigate = useNavigate();

//   // Function to handle user selection and chat initiation
//   const chatHandler = (id) => {
//     navigate("/chats");
//     setSelectedUser(id);
//     localStorage.setItem("selectedUser", id); // Save the selected user in localStorage
//   };

//   // Fetch all users initially
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const config = {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         };

//         const { data } = await axios.get(`/api/user?serach=${search1}`, config);
//         setAllUsers(data); // Set all users in state
//         setSearchResult1(data); // Display all users initially
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [user.token]); // Fetch users once when the component mounts

//   // Filter search results based on user input
//   useEffect(() => {
//     if (search1 === "") {
//       setSearchResult1(allUsers); // Display all users if search is empty
//     } else {
//       const filteredResults = allUsers.filter((user) =>
//         user.name.toLowerCase().includes(search1.toLowerCase())
//       );
//       setSearchResult1(filteredResults); // Display filtered users
//     }
//   }, [search1, allUsers]); // Run whenever search or allUsers changes

//   // Access or create chat
//   const accessChat = async (userId) => {
//     try {
//       setLoadingChat(true);
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.post(`/api/chat`, { userId }, config);
//       if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
//       setSelectedChat(data);
//       localStorage.setItem("selectedChat", JSON.stringify(data)); // Save chat in localStorage
//       setLoadingChat(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Retrieve the selected user and chat from localStorage on page load
//   useEffect(() => {
//     const storedUser = localStorage.getItem("selectedUser");
//     if (storedUser) {
//       setSelectedUser(storedUser); // Set the selected user from localStorage
//     }

//     const storedChat = localStorage.getItem("selectedChat");
//     if (storedChat) {
//       setSelectedChat(JSON.parse(storedChat)); // Set the selected chat from localStorage
//     }
//   }, []);

//   return (
//     <div
//       className="absolute top-16 left-4 flex flex-col p-4 bg-white rounded-lg 
//       shadow-lg w-full max-w-sm transition-transform transform z-50 
//       border border-gray-200 overflow-hidden "
//     >
//       {/* Search Input and Close Button */}
//       <div className="flex justify-between items-center mb-4 gap-4">
//         <input
//           type="text"
//           placeholder="Search Users..."
//           value={search1}
//           onChange={(e) => setSearch1(e.target.value)} // Update search state as the user types
//           className="w-full bg-gray-100 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
//         />
//         <p
//           onClick={() => setIsOpenDrawer(!isOpenDrawer)}
//           className="text-xl text-gray-700 cursor-pointer hover:text-red-500 transition-all duration-200"
//         >
//           X
//         </p>
//       </div>

//       {/* Search Results */}
//       <div className="overflow-y-auto max-h-64">
//         {searchResult1.length > 0 ? (
//           searchResult1.map((result) => (
//             <div
//               key={result._id}
//               onClick={() => accessChat(result._id)}
//               className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 rounded-md mb-2 cursor-pointer transition-all duration-200 p-2"
//             >
//               <p className="text-gray-800 text-sm">{result.name}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-600 text-center">No users found</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SearchDrawer;
