const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  meetingID: {
    type: String,
    required:true
  },
  token:{
    type: String,
    required:true
  },
  ipAddresses: [String],
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
