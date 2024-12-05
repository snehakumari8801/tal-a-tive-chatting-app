// import React, { useState } from "react";
// import { IoMdNotifications } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import { ChatState } from "../../context/ChatProvider";
// import { BsPersonCircle } from "react-icons/bs";
// import { useNavigate } from "react-router";
// import { getSender } from "../../config/ChatLogic";
// import ProfileModal from "./ProfileModal"; // Assume ProfileModal is a child component
// import SearchDrawer from "./SearchDrawer";

// function SideDrawer({
//   isOpen,
//   setIsOpen,
//   isopenProfile,
//   setisOpenProfile,
//   isOpenDrawer,
//   setIsOpenDrawer,
//   loading,
//   setLoading,
//   searchResult1,
//   setSearchResult1,
//   chats,
//   setChats,
//   setSelectedUser,
// }) {
//   const navigate = useNavigate();
//   const { user, notification, setNotification, setSelectedChat } = ChatState();
//   const [allUsers, setAllUsers] = useState([]);
//   const [isOpenN, setIsOpenN] = useState(false);

//   const logoutHandler = () => {
//     localStorage.removeItem("userInfo");
//     navigate("/");
//   };

//   const handleNotificationClick = (notify) => {
//     setSelectedChat(notify.chat);
//     setNotification(notification.filter((n) => n !== notify));
//     setIsOpenN(false);
//   };

//   return (
//     <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 bg-gradient-to-r
//      from-gray-500 to-indigo-600 shadow-md rounded-lg">
//       {/* Title */}
//       <input
//         type="text"
//         placeholder="search..."
//         onClick={() => setIsOpenDrawer(!isOpenDrawer)}
//       />

//       <h1 className="text-2xl font-bold text-white">Talk-A-Tive</h1>

//       {/* Notifications and Profile */}
//       <div className="relative flex items-center gap-4">
//         {/* Notifications */}
//         <div
//           className="relative cursor-pointer"
//           onClick={() => setIsOpenN(!isOpenN)}
//         >
//           <IoMdNotifications className="text-white text-2xl hover:text-yellow-300 transition-all" />
//           {notification.length > 0 && (
//             <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {notification.length}
//             </span>
//           )}
//         </div>

//         {/* Notification Dropdown */}
//         {isOpenN && (
//           <div
//             className="absolute flex  right-0 top-10 w-64 bg-white shadow-lg rounded-lg z-50"
//             onMouseLeave={() => setIsOpenN(false)}
//           >
//             {notification.length > 0 ? (
//               notification.map((notify) => (
//                 <div
//                   key={notify._id}
//                   onClick={() => handleNotificationClick(notify)}
//                   className="p-3 hover:bg-gray-100 cursor-pointer"
//                 >
//                   {notify.chat.isGroupChat
//                     ? `New message in ${notify.chat.chatName}`
//                     : `New message from ${getSender(user, notify.chat.users)}`}
//                 </div>
//               ))
//             ) : (
//               <div className="p-3 text-center text-gray-500">
//                 No new messages
//               </div>
//             )}
//           </div>
//         )}

//         {/* Profile Dropdown */}
//         <div className=" ml-[220px] sm:ml-0">
//           <div
//             className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2
//             rounded-lg cursor-pointer transition-all"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             <BsPersonCircle className="text-gray-600 text-2xl" />
//             <RiArrowDropDownLine className="text-gray-500 text-2xl" />
//           </div>

//           {/* Dropdown Menu */}
//           <div
//             className={`absolute right-0 top-12 bg-white shadow-md rounded-lg w-40 transition-all duration-300 ${
//               isOpen ? "opacity-100 visible" : "opacity-0 invisible"
//             }`}
//           >
//             <p
//               className="py-2  px-4 text-gray-700 hover:bg-gray-200 cursor-pointer"
//               onClick={() => setisOpenProfile(!isopenProfile)}
//             >
//               My Profile
//             </p>
//             <p
//               className="py-2 px-4 text-gray-700 hover:bg-gray-200 cursor-pointer"
//               onClick={logoutHandler}
//             >
//               Logout
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Profile Modal */}
//       {isopenProfile && (
//         <div className=" inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className=" bg-white w-96 p-6 rounded-lg shadow-lg">
//             <button
//               className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
//               onClick={() => setisOpenProfile(false)}
//             >
//               &times;
//             </button>
//             <ProfileModal />
//           </div>
//         </div>
//       )}

//       {isOpenDrawer && (
//         <div
//           className={`absolute bg-gray-400  mt-40 ${
//             isOpenDrawer ? "visible" : "invisible"
//           } text-black absolute`}
//         >
//           <SearchDrawer
//             isOpenDrawer={isOpenDrawer}
//             setIsOpenDrawer={setIsOpenDrawer}
//             allUsers={allUsers}
//             setAllUsers={setAllUsers}
//             searchResult1={searchResult1}
//             setSearchResult1={setSearchResult1}
//             loading={loading}
//             setLoading={setLoading}
//             setSelectedUser={setSelectedUser}
//             chats={chats}
//             setChats={setChats}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default SideDrawer;

import React, { useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ChatState } from "../../context/ChatProvider";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router";
import { getSender } from "../../config/ChatLogic";
import ProfileModal from "./ProfileModal";
import SearchDrawer from "./SearchDrawer";

function SideDrawer({
  isOpen,
  setIsOpen,
  isopenProfile,
  setisOpenProfile,
  isOpenDrawer,
  setIsOpenDrawer,
  loading,
  setLoading,
  searchResult1,
  setSearchResult1,
  chats,
  setChats,
  setSelectedUser,
}) {
  const navigate = useNavigate();
  const { user, notification, setNotification, setSelectedChat } = ChatState();
  const [allUsers, setAllUsers] = useState([]);
  const [isOpenN, setIsOpenN] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleNotificationClick = (notify) => {
    setSelectedChat(notify.chat);
    setNotification(notification.filter((n) => n !== notify));
    setIsOpenN(false);
  };

  return (
    <div
      className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 
    bg-gradient-to-r from-gray-500 to-indigo-600 shadow-lg "
    >
      {/* Title */}
      <input
        type="text"
        placeholder="Search..."
        onClick={() => setIsOpenDrawer(!isOpenDrawer)}
        className="w-40 sm:w-56 bg-white text-gray-700 rounded-md px-4 py-2 mb-4 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
      <h1 className="text-3xl font-bold text-white mb-4 sm:mb-0">
        Talk-A-Tive
      </h1>

      {/* Notifications and Profile */}
      <div className="relative flex items-center gap-4">
        {/* Notifications */}
        <div
          className="relative cursor-pointer"
          onClick={() => setIsOpenN(!isOpenN)}
        >
          <IoMdNotifications
            className="text-white text-3xl hover:text-yellow-300 
          transition-all"
          />
          {notification.length > 0 && (
            <span
              className="absolute -top-1 -right-2 bg-red-600 text-white text-xs 
            rounded-full h-5 w-5 flex items-center justify-center"
            >
              {notification.length}
            </span>
          )}
        </div>

        {/* Notification Dropdown */}
        {isOpenN && (
          <div
            className="absolute right-0 top-10 w-64 bg-white shadow-md rounded-lg z-50"
            onMouseLeave={() => setIsOpenN(false)}
          >
            {notification.length > 0 ? (
              notification.map((notify) => (
                <div
                  key={notify._id}
                  onClick={() => handleNotificationClick(notify)}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                >
                  {notify.chat.isGroupChat
                    ? `New message in ${notify.chat.chatName}`
                    : `New message from ${getSender(user, notify.chat.users)}`}
                </div>
              ))
            ) : (
              <div className="p-3 text-center text-gray-500">
                No new messages
              </div>
            )}
          </div>
        )}

        {/* Profile Dropdown */}
        <div className="ml-[150px] sm:ml-0">
          <div
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer transition-all"
            onClick={() => setIsOpen(!isOpen)}
          >
            <BsPersonCircle className="text-gray-600 text-2xl" />
            <RiArrowDropDownLine className="text-gray-500 text-2xl" />
          </div>

          {/* Dropdown Menu */}
          <div
            className={`absolute right-0 top-12 bg-white shadow-md rounded-lg w-40 transition-all duration-300 ${
              isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <p
              className="py-2 px-4 text-gray-700 hover:bg-gray-200 cursor-pointer"
              onClick={() => setisOpenProfile(!isopenProfile)}
            >
              My Profile
            </p>
            <p
              className="py-2 px-4 text-gray-700 hover:bg-gray-200 cursor-pointer"
              onClick={logoutHandler}
            >
              Logout
            </p>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {isopenProfile && (
        <div className=" absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
            <button
              className=" top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => setisOpenProfile(false)}
            >
              <p className="text-2xl font-bold">X</p>
            </button>
            <ProfileModal />
          </div>
        </div>
      )}

      {/* Search Drawer */}
      {isOpenDrawer && (
        <div
          className={`absolute bg-gray-400 mt-40 ${
            isOpenDrawer ? "visible" : "invisible"
          } text-black z-50`}
        >
          <SearchDrawer
            isOpenDrawer={isOpenDrawer}
            setIsOpenDrawer={setIsOpenDrawer}
            allUsers={allUsers}
            setAllUsers={setAllUsers}
            searchResult1={searchResult1}
            setSearchResult1={setSearchResult1}
            loading={loading}
            setLoading={setLoading}
            setSelectedUser={setSelectedUser}
            chats={chats}
            setChats={setChats}
          />
        </div>
      )}
    </div>
  );
}

export default SideDrawer;
