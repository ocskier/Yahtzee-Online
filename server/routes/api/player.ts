const router = require('express').Router();
const playerController = require('../../controllers/playerController');

router.route('/').post(playerController.create);

module.exports = router;
