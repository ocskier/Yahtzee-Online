"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var router = require('express').Router();
var apiRoutes = require('./api');
// API Routes
router.use('/api', apiRoutes);
// If no routes are hit, send the React app
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});
module.exports = router;
