const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
  userId: 'ObjectId',
  communityId: String,
  content: String,
  date: Date,
});

const Chat = mongoose.model('messages', chatSchema);

module.exports = { Chat };
