import { MongooseDocument } from 'mongoose';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export interface IPlayer extends MongooseDocument {
  uid: string;
  fullName: string;
}

const playerSchema = new Schema({
  uid: {
    type: String,
    unique: true,
    required: true,
  },
  fullName: {
    type: String,
  },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
