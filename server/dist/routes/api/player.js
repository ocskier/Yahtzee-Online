"use strict";
var router = require('express').Router();
var playerController = require('../../controllers/playerController');
router.route('/').get(playerController.findAll).post(playerController.create);
module.exports = router;
