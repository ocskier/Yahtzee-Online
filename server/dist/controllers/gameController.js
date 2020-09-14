"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require('../models');
// Defining methods for the ModelsController
module.exports = {
    findAll: function (req, res) {
        db.Game.find(req.query)
            .sort({ date: -1 })
            .then(function (dbGame) { return res.json(dbGame); })
            .catch(function (err) { return res.status(422).json(err); });
    },
    findById: function (req, res) {
        db.Game.findById(req.params.id)
            .then(function (dbGame) { return res.json(dbGame); })
            .catch(function (err) { return res.status(422).json(err); });
    },
    create: function (req, res) {
        db.Game.create(req.body)
            .then(function (dbGame) { return res.json(dbGame); })
            .catch(function (err) { return res.status(422).json(err); });
    },
    update: function (req, res) {
        db.Game.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(function (dbGame) { return res.json(dbGame); })
            .catch(function (err) { return res.status(422).json(err); });
    },
    remove: function (req, res) {
        db.Game.findById({ _id: req.params.id })
            // .then((dbGame: IGame) => dbGame.remove())
            .then(function (dbGame) { return res.json(dbGame); })
            .catch(function (err) { return res.status(422).json(err); });
    },
};
