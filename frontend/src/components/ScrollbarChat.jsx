import React, { useState } from "react";
import ScrollableFeed from "react-scrollable-feed";
import Lottie from "react-lottie";
import defaultOptions from "react-lottie";
import {
  isLastmessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogic";
import { ChatState } from "../context/ChatProvider";

function ScrollbarChat({ messages, loadingMessages, isTyping, setIsTyping }) {
  const { user } = ChatState();
  const [showsendername, setshowSenderName] = useState(false);

  // console.log("messages ", messages)

  return (
    <ScrollableFeed>
      <div
        className="bg-gray-50 h-[70vh] w-[70vw] rounded-lg p-4 shadow-lg ml-12 sm:ml-0
      overflow-y-auto "
      >
        {loadingMessages ? (
          <div className="text-center text-gray-500">Loading messages...</div>
        ) : messages.length > 0 ? (
          messages.map((m, i) => (
            <div key={i} className="flex flex-col space-y-2">
              {/* Show sender's profile image */}

              {(isSameSender(messages, m, i, user._id) ||
                isLastmessage(messages, i, user._id)) && (
                <div
                  className={`{flex items-center space-x-2 mb-1 ${
                    m.sender._id === user._id ? "self-end" : "self-start"
                  }`}
                >
                  <img
                    src={m.sender.pic}
                    alt={`${m.sender.name}'s avatar`}
                    className="image h-10 w-10 rounded-full border border-gray-200 cursor-pointer translate-y-5"
                    onClick={() => setshowSenderName(!showsendername)}
                  />
                  <p
                    className={`text-sm  w-20 text-center rounded-3xl translate-x-5  text-white bg-blue-400  ${
                      showsendername ? "visible" : "invisible"
                    }`}
                  >
                    {m.sender.name}
                  </p>
                </div>
              )}

              {/* Message content */}
              <span
                className={`leading-loose mt-1 ${
                  m.sender._id === user._id ? "bg-green-500" : "bg-gray-200"
                } rounded-xl max-w-[75%] p-3 text-gray-800 text-sm ${
                  m.sender._id === user._id ? "self-end" : "self-start"
                } ml-${isSameSenderMargin(messages, m, i, user._id)} mt-${
                  isSameUser(messages, m, i, user._id) ? "3" : "10"}
                }`}
              >
                {m.content}
              </span>
              {isTyping ? (
                <Lottie
                  options={defaultOptions}
                  className="w-[70px] h-10 bg-black"
                />
              ) : (
                <></>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet</p>
        )}
      </div>
    </ScrollableFeed>
  );
}

export default ScrollbarChat;
