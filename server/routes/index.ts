import { Request, Response } from 'express';

const path = require('path');
const router = require('express').Router();
const authRoutes = require('./auth');
const apiRoutes = require('./api');

// Auth Routes
router.use('/auth', authRoutes);

// API Routes
router.use('/api', apiRoutes);

// If no routes are hit, send the React app
router.use(function(req: Request, res: Response) {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;
