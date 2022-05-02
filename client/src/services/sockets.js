import io from 'socket.io-client';
import { PORT } from '@ENV'
console.log('POOOORT', PORT)

const socket = io(`http://192.168.1.177:${PORT}`, { autoConnect: false });

export function connectToSocket() {
  socket.connect();
}

export function disconnectFromSocket() {
  socket.disconnect();
}
