var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var gameSchema = new Schema({});
var Game = mongoose.model('Game', gameSchema);
module.exports = Game;
export {};
