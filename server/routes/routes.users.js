const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controller');

router.post('/users', userControllers.createNewUser);
router.post('/users/login', userControllers.login);

module.exports = router;
