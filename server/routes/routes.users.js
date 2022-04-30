const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controller');

// router.get('/users', userControllers.findAllUsers); // TODO not used
router.post('/users', userControllers.createNewUser);

router.post('/users/login', userControllers.login);

// router.get('/users/:userId', userControllers.findUserDetail); // TODO not used

module.exports = router;
