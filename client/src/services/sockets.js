import io from 'socket.io-client';

const socket = io('http://192.168.1.177:3002', { autoConnect: false });

export function connectToSocket() {
  socket.connect();
}

export function disconnectFromSocket() {
  socket.disconnect();
}
