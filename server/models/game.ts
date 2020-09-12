import { MongooseDocument } from 'mongoose';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export interface IGame extends MongooseDocument {}

const gameSchema = new Schema({});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
