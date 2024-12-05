// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ChatState } from "../context/ChatProvider";
// import SideDrawer from "../components/miscellaneous/SideDrawer";
// import ChatBox from "../components/miscellaneous/ChatBox";
// import MyChats from "../components/miscellaneous/MyChats";
// function Chatpage() {
//   const { user } = ChatState();

//   // sideDrawer
//   const [search, setSearch] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [isopenProfile, setisOpenProfile] = useState(false);
//   const [isOpenDrawer, setIsOpenDrawer] = useState(false);

//   //My chats
//   const [loggedUser, setLoggedUser] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [addChatModal, setAddChatModal] = useState(false);

//   //Group chats
//   const [groupChatName, setGroupChatName] = useState("");
//   const [selectedUser, setSelectedUser] = useState([]);
//   const [searchUser, setSearchUser] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [groupchats, setGroupChats] = useState([]);

//   //search
//   const [allUsers, setAllUsers] = useState([]); // State to store all users
//   const [searchResult1, setSearchResult1] = useState([]); 
//   const [currentUser, setCurrentUser] = useState("");

//   //chatBox
//   const [fetchAgain, setFetchAgain] = useState(false);

//   return (
//     <div className="w-[100vw] -ml-2 sm:ml-0">
//       {user && (
//         <SideDrawer
//           search={search}
//           setSearch={setSearch}
//           isOpen={isOpen}
//           setIsOpen={setIsOpen}
//           isopenProfile={isopenProfile}
//           setisOpenProfile={setisOpenProfile}
//           isOpenDrawer={isOpenDrawer}
//           setIsOpenDrawer={setIsOpenDrawer}
//           loading={loading}
//           setLoading={setLoading}
//           allUsers={allUsers}
//           setAllUsers={setAllUsers}
//           searchResult1={searchResult1}
//           setSearchResult1={setSearchResult1}
//           currentUser={currentUser}
//           setCurrentUser={setCurrentUser}
//           groupchats={groupchats}
//           setGroupChats={setGroupChats}
//           selectedUser={selectedUser}
//           setSelectedUser={setSelectedUser}
//         />
//       )}
//       <div className="flex flex-col sm:flex-row  bg-gray-600 
//       p-2 sm:m-4 rounded-md 
//        text-white">
//        <div className="sm:visible invisible">
//         {user && (
//           <MyChats
//             fetchAgain={fetchAgain}
//             loggedUser={loggedUser}
//             setLoggedUser={setLoggedUser}
//             loading={loading}
//             setLoading={setLoading}
//             chats={chats}
//             setChats={setChats}
//             addChatModal={addChatModal}
//             setAddChatModal={setAddChatModal}
//             groupChatName={groupChatName}
//             setGroupChatName={setGroupChatName}
//             selectedUser={selectedUser}
//             setSelectedUser={setSelectedUser}
//             searchUser={searchUser}
//             setSearchUser={setSearchUser}
//             searchResult={searchResult}
//             setSearchResult={setSearchResult}
//             groupchats={groupchats}
//             setGroupChats={setGroupChats}
//           />
//         )} 
//         </div>
//         {user && (
//           <ChatBox
//             setFetchAgain={setFetchAgain}
//             selectedUser={selectedUser}
//             setSelectedUser={setSelectedUser}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default Chatpage;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ChatState } from "../context/ChatProvider";
// import SideDrawer from "../components/miscellaneous/SideDrawer";
// import ChatBox from "../components/miscellaneous/ChatBox";
// import MyChats from "../components/miscellaneous/MyChats";
// import { FaSearch } from "react-icons/fa"; // Importing a search icon

// function Chatpage() {
//   const { user } = ChatState();

//   // sideDrawer state
//   const [search, setSearch] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [isopenProfile, setisOpenProfile] = useState(false);
//   const [isOpenDrawer, setIsOpenDrawer] = useState(false);

//   // My chats state
//   const [loggedUser, setLoggedUser] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [addChatModal, setAddChatModal] = useState(false);

//   // Group chats state
//   const [groupChatName, setGroupChatName] = useState("");
//   const [selectedUser, setSelectedUser] = useState([]);
//   const [searchUser, setSearchUser] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [groupchats, setGroupChats] = useState([]);

//   // Search state
//   const [allUsers, setAllUsers] = useState([]); 
//   const [searchResult1, setSearchResult1] = useState([]);
//   const [currentUser, setCurrentUser] = useState("");

//   // chatBox state
//   const [fetchAgain, setFetchAgain] = useState(false);

//   // New state for toggling MyChats visibility on small screens
//   const [showMyChats, setShowMyChats] = useState(false);

//   return (
//     <div className="w-[100vw] -ml-2 sm:ml-0">
//       {user && (
//         <SideDrawer
//           search={search}
//           setSearch={setSearch}
//           isOpen={isOpen}
//           setIsOpen={setIsOpen}
//           isopenProfile={isopenProfile}
//           setisOpenProfile={setisOpenProfile}
//           isOpenDrawer={isOpenDrawer}
//           setIsOpenDrawer={setIsOpenDrawer}
//           loading={loading}
//           setLoading={setLoading}
//           allUsers={allUsers}
//           setAllUsers={setAllUsers}
//           searchResult1={searchResult1}
//           setSearchResult1={setSearchResult1}
//           currentUser={currentUser}
//           setCurrentUser={setCurrentUser}
//           groupchats={groupchats}
//           setGroupChats={setGroupChats}
//           selectedUser={selectedUser}
//           setSelectedUser={setSelectedUser}
//         />
//       )}

//       <div className="flex flex-col sm:flex-row bg-gray-600 p-2 sm:m-4 rounded-md
//        text-white">
        
//         {/* Search Icon for Small Screens */}
//         <div className="sm:hidden flex justify-between items-center">
//           <FaSearch 
//             className="text-white text-2xl cursor-pointer" 
//             onClick={() => setShowMyChats(!showMyChats)} 
//           />
//         </div>

//         {/* MyChats Component for Small Screens */}
//         <div className={`sm:visible ${showMyChats ? 'block' : 'hidden'} sm:block object-cover
       
//         `}>
//           {user && (
//             <MyChats
//               fetchAgain={fetchAgain}
//               loggedUser={loggedUser}
//               setLoggedUser={setLoggedUser}
//               loading={loading}
//               setLoading={setLoading}
//               chats={chats}
//               setChats={setChats}
//               addChatModal={addChatModal}
//               setAddChatModal={setAddChatModal}
//               groupChatName={groupChatName}
//               setGroupChatName={setGroupChatName}
//               selectedUser={selectedUser}
//               setSelectedUser={setSelectedUser}
//               searchUser={searchUser}
//               setSearchUser={setSearchUser}
//               searchResult={searchResult}
//               setSearchResult={setSearchResult}
//               groupchats={groupchats}
//               setGroupChats={setGroupChats}
//             />
//           )}
//         </div>

//         {/* ChatBox Component */}
//         <div>
//         {user && (
//           <ChatBox 
//             setFetchAgain={setFetchAgain} 
//             selectedUser={selectedUser} 
//             setSelectedUser={setSelectedUser} 
//           />
//         )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Chatpage;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import ChatBox from "../components/miscellaneous/ChatBox";
import MyChats from "../components/miscellaneous/MyChats";
import { FaSearch } from "react-icons/fa"; // Importing a search icon

function Chatpage() {
  const { user } = ChatState();

  // sideDrawer state
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isopenProfile, setisOpenProfile] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  console.log(isOpenDrawer)

  // My chats state
  const [loggedUser, setLoggedUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addChatModal, setAddChatModal] = useState(false);

  // Group chats state
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [groupchats, setGroupChats] = useState([]);

  // Search state
  const [allUsers, setAllUsers] = useState([]); 
  const [searchResult1, setSearchResult1] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  // chatBox state
  const [fetchAgain, setFetchAgain] = useState(false);

  // New state for toggling MyChats visibility on small screens
  const [showMyChats, setShowMyChats] = useState(false);

  return (
    <div className="w-full sm:ml-0 relative"> {/* Use w-full for full width */}
      {user && (
        <SideDrawer
          search={search}
          setSearch={setSearch}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isopenProfile={isopenProfile}
          setisOpenProfile={setisOpenProfile}
          isOpenDrawer={isOpenDrawer}
          setIsOpenDrawer={setIsOpenDrawer}
          loading={loading}
          setLoading={setLoading}
          allUsers={allUsers}
          setAllUsers={setAllUsers}
          searchResult1={searchResult1}
          setSearchResult1={setSearchResult1}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          groupchats={groupchats}
          setGroupChats={setGroupChats}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}

      <div className="flex  flex-col sm:flex-row mt-4 sm:mt-4
       bg-gray-500 p-2 sm:m-4 rounded-md text-white">
        
        {/* Search Icon for Small Screens */}
        <div className="sm:hidden flex justify-between items-center">
          <FaSearch 
            className="text-white text-2xl cursor-pointer" 
            onClick={() => setShowMyChats(!showMyChats)} 
          />
        </div>

        {/* MyChats Component for Small Screens */}
        <div className={`sm:w-1/4 w-full sm:block ${showMyChats ? 'block' : 'hidden'} `}>
          {user && (
            <MyChats
              fetchAgain={fetchAgain}
              loggedUser={loggedUser}
              setLoggedUser={setLoggedUser}
              loading={loading}
              setLoading={setLoading}
              chats={chats}
              setChats={setChats}
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
            />
          )}
        </div>

        {/* ChatBox Component */}
        <div className="w-full sm:w-3/4">
          {user && (
            <ChatBox 
              setFetchAgain={setFetchAgain} 
              selectedUser={selectedUser} 
              setSelectedUser={setSelectedUser} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Chatpage;
