"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require('../models');
module.exports = {
    findAll: function (req, res) {
        db.Player.find(req.query)
            .sort({ date: -1 })
            .then(function (dbPlayer) { return res.json(dbPlayer); })
            .catch(function (err) { return res.status(422).json(err); });
    },
    findById: function (req, res) {
        db.Player.findById(req.params.id)
            .then(function (dbPlayer) { return res.json(dbPlayer); })
            .catch(function (err) { return res.status(422).json(err); });
    },
    create: function (req, res) {
        console.log(req.body);
        db.Player.create(req.body)
            .then(function (dbPlayer) { return res.json(dbPlayer); })
            .catch(function (err) { return res.status(422).json(err); });
    },
    update: function (req, res) {
        db.Player.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(function (dbPlayer) { return res.json(dbPlayer); })
            .catch(function (err) { return res.status(422).json(err); });
    },
    remove: function (req, res) {
        db.Player.findById({ _id: req.params.id })
            // .then((dbPlayer: IPlayer) => dbPlayer.remove())
            .then(function (dbPlayer) { return res.json(dbPlayer); })
            .catch(function (err) { return res.status(422).json(err); });
    },
};
