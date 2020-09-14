"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
router.route('/').get(function (req, res) {
    res.json({
        msg: 'Succeeded Connection!',
    });
});
module.exports = router;
