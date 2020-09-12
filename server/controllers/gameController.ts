const db = require('../models');

import { IGame } from '../models/game';
import { Request, Response } from 'express';
import { Error } from 'mongoose';

// Defining methods for the ModelsController
module.exports = {
  findAll: function (req: Request, res: Response) {
    db.Game.find(req.query)
      .sort({ date: -1 })
      .then((dbGame: IGame) => res.json(dbGame))
      .catch((err: Error) => res.status(422).json(err));
  },
  findById: function (req: Request, res: Response) {
    db.Game.findById(req.params.id)
      .then((dbGame: IGame) => res.json(dbGame))
      .catch((err: Error) => res.status(422).json(err));
  },
  create: function (req: Request, res: Response) {
    db.Game.create(req.body)
      .then((dbGame: IGame) => res.json(dbGame))
      .catch((err: Error) => res.status(422).json(err));
  },
  update: function (req: Request, res: Response) {
    db.Game.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbGame: IGame) => res.json(dbGame))
      .catch((err: Error) => res.status(422).json(err));
  },
  remove: function (req: Request, res: Response) {
    db.Game.findById({ _id: req.params.id })
      // .then((dbGame: IGame) => dbGame.remove())
      .then((dbGame: IGame) => res.json(dbGame))
      .catch((err: Error) => res.status(422).json(err));
  },
};
