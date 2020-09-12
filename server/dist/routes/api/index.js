var router = require('express').Router();
router.route('/').get(function (req, res) {
    res.json({
        msg: 'Succeeded Connection!',
    });
});
module.exports = router;
export {};
