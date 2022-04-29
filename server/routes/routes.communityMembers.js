const { Router } = require('express');
const controllers = require('../controllers/communityMember.controller');


const router = Router();
router.post('/communities', controllers.joinCommunity);
router.get('/communities/:userId', controllers.getCommunityMemberships);

module.exports = router;
