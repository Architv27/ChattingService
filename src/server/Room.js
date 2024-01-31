const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  link: {
    type: String,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
    default: 0,
  },
  ipAddresses: [String],
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
