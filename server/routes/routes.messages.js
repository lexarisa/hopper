const express = require('express');
const router = express.Router();

const controllers = require('../controllers/chat.controller');

router.get('/messages/:communityId', controllers.getMessagesByCommunity);

module.exports = router;
