import { Server, Socket } from 'socket.io';

export const setupWebSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg: string) => {
      io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}