const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { logRoomAndIP } = require('./roomLogger'); // Import the logging function

const app = express();
app.use(bodyParser.json());

const server = http.createServer(app);
const io = socketIo(server);

app.post('/join-room', (req, res) => {
  const roomId = uuidv4();

  // Extracting the user's IP address; depending on your setup, you might need req.headers['x-forwarded-for']
  const ip = req.socket.remoteAddress || req.headers['x-forwarded-for'];

  logRoomAndIP(roomId, ip); // Log the room ID and IP address

  const roomLink = `http://yourfrontenddomain.com/room/${roomId}`;
  res.status(200).json({ roomId: roomId, link: roomLink });
});

const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
