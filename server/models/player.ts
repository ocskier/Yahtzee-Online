import { MongooseDocument } from 'mongoose';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export interface IPlayer extends MongooseDocument {}

const playerSchema = new Schema({});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
