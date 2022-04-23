const { Server } = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {
  socket.on('sendMessages', (msg, room) => {
    if (room === '') {
      socket.broadcast.emit('receive-message', msg);

      //persist message
    }
    socket.to(room).emit('receive-message', msg); //sends everyone except for yourself
    // io.emit('receive-message', msg);
  });
  socket.on('joinRoom', (roomId, callback) => {
    socket.join(roomId);
    callback(`Joined ${roomId}`);
  });
});
