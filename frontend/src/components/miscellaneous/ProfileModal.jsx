import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { BsPersonCircle } from "react-icons/bs";

function ProfileModal() {
  const { user } = ChatState();
  return (
    <div className="flex justify-center items-center flex-col ">
      <p>{user.name}</p>
      <p>Email:{user.email}</p>
      <div className="h-40 w-40 rounded-full bg-black flex justify-center items-center mt-6">
        {user.pic ? <img src={user.pic} alt="" /> : <BsPersonCircle />}
      </div>
    </div>
  );
}

export default ProfileModal;
