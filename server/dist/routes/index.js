var path = require('path');
var router = require('express').Router();
var authRoutes = require('./auth');
var apiRoutes = require('./api');
// Auth Routes
router.use('/auth', authRoutes);
// API Routes
router.use('/api', apiRoutes);
// If no routes are hit, send the React app
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});
module.exports = router;
export {};
