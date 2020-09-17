"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var playerSchema = new Schema({
    uid: {
        type: String,
        unique: true,
        required: true,
    },
    fullName: {
        type: String,
    },
});
var Player = mongoose.model('Player', playerSchema);
module.exports = Player;
