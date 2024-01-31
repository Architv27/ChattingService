import io from 'socket.io-client';
// ...
const socket = io('http://localhost:80');
// ...
io.on('connection', (socket) => {
    socket.on('join-room', ({ roomId, userId }) => {
      socket.join(roomId);
      socket.to(roomId).emit('user-joined', userId);
  
      socket.on('disconnect', () => {
        socket.to(roomId).emit('user-left', userId);
      });
  
      // Handling WebRTC signaling data
      socket.on('signal', (data) => {
        socket.to(data.to).emit('signal', {
          from: data.from,
          signal: data.signal,
        });
      });
    });
  });
  