const { Chat } = require('../models/chat.model');

async function getMessagesByCommunity(req, res) {
  try {
    const { communityId } = req.params;
    const messages = await Chat.find({ communityId }).sort({createdAt: 'desc'}).limit(1);
    res.status(200);
    res.send(messages);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error);
  }
}

module.exports = { getMessagesByCommunity};
