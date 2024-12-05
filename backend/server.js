const dotenv = require("dotenv");
const express = require("express");
const { chats } = require("../backend/data/data");
const userRoutes = require("../backend/routes/userRoutes");
const chatRoutes = require("../backend/routes/chatRoutes");
const messageRoutes = require("../backend/routes/messageRoutes");
const cors = require("cors");
const path = require("path");
const { send } = require("@emailjs/browser");

dotenv.config();
const app = express();

app.use(express.json());

let port = 3000;


const connectedDB = require("./config/db");
connectedDB();

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

//-----------------------deployment---------------------------
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "development") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

//------------------------------------------------------------

const server = app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3001",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    // console.log(userData._id)
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room " + room);
  });

  socket.on("typing", (room) =>  socket.in(room).emit("typing"));

  socket.on("stop typing", (room) =>  socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.off("setup",()=>{
    console.log("USER DISCONECCTED");
    socket.leave(userData._id)
    
  })
});
