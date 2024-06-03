//index.js
const express = require("express");
const app = express();
const PORT = 4000;

//New imports
const http = require("http").Server(app);
const cors = require("cors");
const socketIO = require("socket.io")(http, {
  cors: {
    origin: [
      "chit-chat-orpin.vercel.app",
      "chit-chat-git-main-gupta6s-projects.vercel.app",
      "chit-chat-7y6f53pbp-gupta6s-projects.vercel.app",
    ],
  },
});

const users = [];

app.use(cors()); // use cors middleware for enabling cross browser communication

socketIO.on("connection", (socket) => {
  // the socket.io("connection") function establishes a connection with the React app, then creates a unique ID for each socket and logs the ID to the console whenever a user visits the web page. When we refresh or close the web page, the socket fires the disconnect event showing that a user has disconnected from the socket.
  console.log(`⚡: ${socket.id} user just connected!`);

  //Listens and logs the message to the console
  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
  });

  //Listens when a new user joins the server
  socket.on("newUser", (data) => {
    //Adds the new user to the list of users
    users.push(data);

    //Sends the list of users to the client
    socketIO.emit("newUserResponse", users);
  });

  socket.on("typing", (data) => {
    socketIO.emit("typingResponse", data);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
