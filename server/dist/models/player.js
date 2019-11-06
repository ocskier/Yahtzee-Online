var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var playerSchema = new Schema({});
var Player = mongoose.model('Player', playerSchema);
module.exports = Player;
