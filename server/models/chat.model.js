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

async function saveMessage(msg) {
 try {
    const { userId, communityId, content, username, createdAt } = msg;
    
    const newMessage = await Chat.create({
      userId,
      communityId,
      content,
      username,
      createdAt,
    });

    return newMessage;
  } catch (error) {
    console.log(error);
    return null;
  }
}



module.exports = { Chat, saveMessage };
