"use strict";
var router = require('express').Router();
var playerController = require('../../controllers/playerController');
router.route('/').post(playerController.create);
module.exports = router;
