const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Serve static files if needed (e.g., HTML, CSS, JS for a client-side app)
// app.use(express.static('path_to_static_files'));

io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on('join-room', (roomId, userId) => {
    console.log(`User ${userId} joined room: ${roomId}`);
    socket.join(roomId);
    socket.to(roomId).broadcast.emit('user-connected', userId);

    socket.on('call-user', ({ signalData, targetUserId }) => {
      console.log(`User ${userId} is calling ${targetUserId}`);
      io.to(targetUserId).emit('call-made', {
        signal: signalData,
        callerId: userId,
      });
    });

    socket.on('disconnect', () => {
      console.log(`User ${userId} disconnected`);
      socket.to(roomId).broadcast.emit('user-disconnected', userId);
    });
  });
});

const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
  console.log(`Signaling server listening on *:${PORT}`);
});
