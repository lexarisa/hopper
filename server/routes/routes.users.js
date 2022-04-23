const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user.controller');

router.get('/users', controllers.index);
router.post('/users', controllers.create);
router.post('/users/login', controllers.login);

module.exports = router;
