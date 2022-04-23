const { Chat } = require('../models/chat.model');

async function getMessagesByCommunity(req, res) {
  try {
    const { communityId } = req.params;
    const messages = await Chat.find({ communityId });
    res.status(201);
    res.send(messages);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error);
  }
}

async function postMessageToCommunity(req, res) {
  try {
    const { userId, communityId, content } = req.body;
    const message = await Chat.create({ userId, communityId, content });
    res.status(200);
    res.send(message);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = { getMessagesByCommunity, postMessageToCommunity };
