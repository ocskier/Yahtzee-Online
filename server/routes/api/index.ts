const router = require('express').Router();

import { Response, Request } from 'express';

router.route('/').get(function(req: Request, res: Response) {
  res.json({
    msg: 'Succeeded Connection!',
  });
});

module.exports = router;
