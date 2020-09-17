const router = require('express').Router();
// const gameRoutes = require('./game');
const playerRoutes = require('./player');

import { Response, Request } from 'express';

router.route('/').get(function (req: Request, res: Response) {
  res.json({
    msg: 'Succeeded Connection!',
  });
});

router.use('/player', playerRoutes);
// router.use('/game', gameRoutes);

module.exports = router;
