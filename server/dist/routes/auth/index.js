var express = require('express');
var router = express.Router();
var userController = require('../../controllers/userController');
// this route is just used to get the user basic info
router.post('/user', userController.validateToken, userController.getUser);
router.post('/login', userController.auth, userController.authenticate);
router.post('/logout', userController.logout);
router.post('/signup', userController.register);
module.exports = router;
