require('dotenv').config()
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')
const fs = require("fs");
const path = require("path");
const connectDB = require('./db'); // Import the database connection
const Room = require('./Room'); // Import the Room model

const app = express();
app.use(cors());
app.use(express.json());

connectDB(); // Establish database connection

const server = http.createServer(app);
const io = socketIo(server);
const crypto = require('crypto');
const { config } = require('dotenv');

const configData = {
    REACT_APP_APIKEY: "8dfbe8d-5798-432b-8fd7-cdcefeecf97b",
    REACT_APP_SECRETAPIKEY: "88bbd820d4334ef856d15f5fe2fdc7cec99dae3cbd941145c15283685cedaa8c"
};

const algorithm = 'aes-256-cbc'; 
const password = 'password'; // Use a strong, unique password
const key = crypto.scryptSync(password, 'salt', 32);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update(JSON.stringify(configData), 'utf8', 'hex');
encrypted += cipher.final('hex');

const encryptedConfig = { iv: iv.toString('hex'), data: encrypted };

fs.writeFileSync('config.enc', JSON.stringify(encryptedConfig));
console.log('Config file encrypted.');

function generateToken() {
  const algorithm = 'aes-256-cbc'; 
  const password = 'password'; // The same password used for encryption
  const encryptedConfig = JSON.parse(fs.readFileSync('config.enc', 'utf8'));

  const key = crypto.scryptSync(password, 'salt', 32);
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(encryptedConfig.iv, 'hex'));

  let decrypted = decipher.update(encryptedConfig.data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  const configData = JSON.parse(decrypted);

  const apikey = `${configData.REACT_APP_APIKEY}`;
  const apiSecret = `${configData.REACT_APP_SECRETAPIKEY}`;

  return jwt.sign({ apiKey: apikey }, apiSecret, { expiresIn: '24h' });
}


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
function generateMeetingId() {
  return uuidv4(); // Generate a unique meeting ID
}

app.get('/get-meeting-credentials', async (req, res) => {
  const token = generateToken();
  const meetingId = generateMeetingId(); // Generate a new meeting ID

  try {
      const room = await Room.create({ meetingID: meetingId, token: token });
      res.json({ token, meetingId: room.meetingID });
  } catch (error) {
      console.error('Error creating room:', error);
      res.status(500).send('Server error');
  }
});



  
const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
