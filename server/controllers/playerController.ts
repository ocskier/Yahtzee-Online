const db = require('../models');

import { IPlayer } from '../models/player';
import { Request, Response } from 'express';
import { Error } from 'mongoose';

module.exports = {
  findAll: function (req: Request, res: Response) {
    db.Player.find(req.query)
      // .sort({ date: -1 })
      .then((dbPlayers: IPlayer) => res.json(dbPlayers))
      .catch((err: Error) => res.status(422).json(err));
  },
  findById: function (req: Request, res: Response) {
    db.Player.findById(req.params.id)
      .then((dbPlayer: IPlayer) => res.json(dbPlayer))
      .catch((err: Error) => res.status(422).json(err));
  },
  create: function (req: Request, res: Response) {
    console.log(req.body);
    db.Player.create(req.body)
      .then((dbPlayer: IPlayer) => res.json(dbPlayer))
      .catch((err: Error) => res.status(422).json(err));
  },
  update: function (req: Request, res: Response) {
    db.Player.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbPlayer: IPlayer) => res.json(dbPlayer))
      .catch((err: Error) => res.status(422).json(err));
  },
  remove: function (req: Request, res: Response) {
    db.Player.findById({ _id: req.params.id })
      // .then((dbPlayer: IPlayer) => dbPlayer.remove())
      .then((dbPlayer: IPlayer) => res.json(dbPlayer))
      .catch((err: Error) => res.status(422).json(err));
  },
};
