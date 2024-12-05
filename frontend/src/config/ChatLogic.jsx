
// export const getSender = (loggeduser, users) => {
//   console.log(users); 

//   return users[0]?._id === loggeduser?._id ? users[1].name : users[0].name;
// };

// export const getSenderFull = (loggeduser, users) => {
//   //console.log(users); // To check users array

//   // For group chats, you can handle it separately or just return a message like "Group Chat"
//   if (users.length > 2) {
//     return "Group Chat";
//   }

//   // For direct chats (2-person chats), return the name of the other user
//   return users[0]._id === loggeduser._id ? users[1] : users[0];
// };

// export const isSameSender = (messages, m, i, userId) => {
//   return (
//     i < messages.length - 1 &&
//     (messages[i + 1].sender._id !== m.sender._id || // next message id is not equal to current sender id
//       messages[i + 1].sender._id === undefined) && // sender will be undefined
//     messages[i].sender._id !== userId //messages is not from logged in user
//   );
// };

// export const isLastmessages = (messages, i, userId) => {
//   return (
//     i === messages.length - 1 && //this is the very last message of punch of messages
//     messages[messages.length - 1]._id !== userId && //this is not loggedIn user
//     messages[messages.length - 1].sender._id
//   );
// };

// export const isSameSenderMargin = (messages, m, i, userId) => {
//   if (
//     i < messages.length - 1 &&
//     (messages[i + 1].sender._id !== m.sender._id || // next message id is not equal to current sender id
//       messages[i + 1].sender._id === undefined) && // sender will be undefined
//     messages[i].sender._id !== userId
//   ) {
//     return 33;
//   } else if (
//     (i < messages.length - 1 &&
//       messages[i + 1].sender._id !== m.sender._id &&
//       messages[i].sender._id !== userId) ||
//     (i === messages.length - 1 && messages[i].sender._id !== userId)
//   ) {
//     return 0;
//   } else {
//     return "auto";
//   }
// };

// export const isSameUser = (messages, m, i) => {
//   return i > 0 && messages[i - 1].sender._id === m.sender._id;
// };


export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastmessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

export const getSender = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};