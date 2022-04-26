const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controller');

router.get('/users', userControllers.findAllUsers);
router.get('/users/:userId', userControllers.findUserDetail);
router.post('/users', userControllers.createNewUser);
router.post('/users/login', userControllers.login);

module.exports = router;
