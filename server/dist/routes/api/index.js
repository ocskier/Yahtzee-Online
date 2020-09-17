"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
var gameRoutes = require('./game');
var playerRoutes = require('./player');
router.route('/').get(function (req, res) {
    res.json({
        msg: 'Succeeded Connection!',
    });
});
router.use('/player', playerRoutes);
router.use('/game', gameRoutes);
module.exports = router;
