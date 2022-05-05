const { Router } = require('express');
const cityController = require('../controllers/city.controller')
const communityController = require('../controllers/communityMember.controller')
const messagesController = require ('../controllers/messages.controller')
const userControllers = require('../controllers/user.controller');

const router = Router();

router.get('/cities', cityController.getCities)
router.get('/cities/:cityName/images', cityController.getCityImages)
router.get('/cities/:cityName/details', cityController.getCityDetails)

router.post('/communities', communityController.joinCommunity);
router.get('/communities/:userId', communityController.getCommunityMemberships);

router.get('/messages/:communityId', messagesController.getMessagesByCommunity);


router.post('/users', userControllers.createNewUser);
router.post('/users/login', userControllers.login);


module.exports = router;