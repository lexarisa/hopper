const path = require ('path');
require('dotenv').config({ path: path.join(__dirname, `./.env.${process.env.MY_ENV}`)})
const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const messageRouter = require('./routes/routes.messages');
const userRouter = require("./routes/routes.users");
const communityRouter = require("./routes/routes.communityMembers");

const { Chat, saveMessage } = require("./models/chat.model");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
app.use(messageRouter);
app.use(userRouter);
app.use(communityRouter);

//move io routes to another file

const PORT = process.env['PORT'];
const DATABASE_URL = process.env['DATABASE_URL'] || "mongodb://localhost/hopper";

server.listen(PORT, async () => {
  try {

  
  
    io.on("connection", (socket) => {
      console.log('CONNECTED')

      socket.on("sendMessage", async (msg, room) => {
        const newMessage = await saveMessage(msg);
        if (newMessage) {
          io.in(room).emit("receive-message", { ok: true, data: [newMessage] }); //sends everyone
        } else {
          // send back to sender error
          socket.emit("receive-message", { ok: false, errors: [newMessage] }); //sends an error to the sender
        }
      });

      socket.on("joinRoom", async (roomId, callback) => {
        console.log('joining', roomId)
        socket.join(roomId);
        const messages = await Chat.find({ communityId: roomId });
        if (messages) {
          const response = {
            ok: true,
            data: messages,
          };
          callback(response);
          return;
        } else {
          // send back to sender error
          callback({ ok: false, errors: "No message yet" });
          return;
        }
      });
    });

    await mongoose.connect(DATABASE_URL);
    console.log("Successfully connected to the database");
    console.log(`Server running on ${PORT}`);
  } catch (error) {
    console.log("Error starting up", error);
  }
});
