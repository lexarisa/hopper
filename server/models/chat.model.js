const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
  userId: 'ObjectId',
  communityId: Number,
  content: String,
  date: Date,
  username: String,
  createdAt: Date,
});

const Chat = mongoose.model('messages', chatSchema);

module.exports = { Chat };
