const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({

});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
