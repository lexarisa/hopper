require('dotenv').config()
const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const messageRouter = require('./routes/routes.messages');
const userRouter = require('./routes/routes.users');
const communityRouter = require('./routes/routes.communityMembers');
const { emitWarning } = require('process');

const { Chat, saveMessage } = require('./models/chat.model')

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});


app.use(cors());
app.use(express.json());
app.use(messageRouter);
app.use(userRouter);
app.use(communityRouter);

//move io routes to another file

const PORT = process.env.PORT || 3002;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/hopper'

server.listen(PORT, async () => {
  try {
    io.on('connection', (socket) => {

      socket.on('sendMessage', async (msg, room) => {
        const newMessage = await saveMessage(msg)
        if (newMessage) {
          socket.to(room).emit('receive-message', msg); //sends everyone except for yourself
        } else {
          // send back to sender error
        }
        // io.emit('receive-message', msg);
      });

      socket.on('joinRoom', async (roomId, callback) => {
        socket.join(roomId);
        console.log('in joinRoom')
        const messages = await Chat.find({roomId});
        console.log('messages', messages)
        if (messages) {
          socket.to(roomId).emit('receive-message', messages);
          return
        } else {
          // send back to sender error
          callback(`No message yet`);
          return
        }
        callback(`Here are your messages ${messages}`);
      });

    });


    await mongoose.connect(DATABASE_URL);
    console.log('Successfully connected to the database');
    console.log(`Server running on ${PORT}`);
  } catch (error) {
    console.log('Error starting up', error);
  }
});
