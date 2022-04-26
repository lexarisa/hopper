const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const messageRouter = require('./routes/routes.messages');
const userRouter = require('./routes/routes.users');
const communityRouter = require('./routes/routes.communityMembers');
const cors = require('cors');
const { Server } = require('socket.io');
const io = new Server(server);
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
app.use(messageRouter);
app.use(userRouter);
app.use(communityRouter);

//move io routes to another file
io.on('connection', (socket) => {
  console.log('connected');
  socket.on('sendMessage', (msg, room) => {
    // if (room === '') {
    //   socket.broadcast.emit('receive-message', msg);

    //   //persist message
    // }
    //socket.to(room) why did i do this?
    socket.to(room).emit('receive-message', msg); //sends everyone except for yourself
    // io.emit('receive-message', msg);
  });
  socket.on('joinRoom', (roomId, callback) => {
    socket.join(roomId);
    callback(`Joined ${roomId}`);
  });
});
const PORT = process.env.PORT || 3002;

server.listen(PORT, async () => {
  try {
    await mongoose.connect('mongodb://localhost/hopper');
    console.log('Successfully connected to the database');
    console.log(`Server running on ${PORT}`);
  } catch (error) {
    console.log('Error trying to connect to the db', error);
  }
});
