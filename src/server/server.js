const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const connectDB = require('./db'); // Import the database connection
const Room = require('./Room'); // Import the Room model

const app = express();
app.use(cors());
app.use(express.json());

connectDB(); // Establish database connection

const server = http.createServer(app);
const io = socketIo(server);

app.post('/join-room', async (req, res) => {
  const roomId = uuidv4();
  const ip = req.socket.remoteAddress || req.headers['x-forwarded-for'];
  
  try {
    // Create a new room or update the existing one
    const room = await Room.findOneAndUpdate({ roomId }, {
      $setOnInsert: { roomId, link: `/room/${roomId}` },
      $addToSet: { ipAddresses: ip }, // Add IP address if not already present
      $inc: { numberOfPeople: 1 }, // Increment number of people
    }, { upsert: true, new: true, setDefaultsOnInsert: true });

    console.log(`Room created/updated: ${room.roomId}, IP: ${ip}`);

    // Optionally, broadcast room creation/update to all connected clients
    io.emit('room-updated', room);

    res.status(200).json({ roomId: room.roomId, link: room.link, numberOfPeople: room.numberOfPeople });
  } catch (error) {
    console.error('Error handling room:', error);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
