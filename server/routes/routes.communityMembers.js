const express = require('express');
const router = express.Router();
const controllers = require('../controllers/communityMember.controller');

router.post('/communities', controllers.joinCommunity);
router.get('/communities/:userId', controllers.getCommunityMemberships);

module.exports = router;
