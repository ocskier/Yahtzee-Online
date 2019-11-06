const db = require('../models');
const jwt = require('jsonwebtoken');

import { IUser } from '../models/user';
import { Request, Response, NextFunction } from 'express';
import { MongoError } from 'mongodb';

interface IReq extends Request {
  user: any;
}

// Defining methods for the userController
module.exports = {
  validateToken: (req: IReq, res: Response, next: NextFunction) => {
    const token = req.body.token;
    //if no token found, return response (without going to the next middelware)
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
      //if can verify the token, set req.user and pass to next middleware
      const decoded = jwt.verify(token, 'my-secret');
      req.user = decoded;
      // console.log(req);
      next();
    } catch (err) {
      //if invalid token
      res.status(400).json({ user: null });
    }
  },
  getUser: async (req: IReq, res: Response) => {
    const user: IUser = await db.User.findById(req.user.id).select(['-password', '-_id']);
    console.log('===== user!!======');
    console.log(user);
    return res.json({ user: user });
  },
  register: (req: Request, res: Response) => {
    const { firstName, lastName, username, password } = req.body;
    // ADD VALIDATION
    db.User.findOne({ username: username }, (err: MongoError, userMatch: IUser) => {
      console.log(err, userMatch);
      if (userMatch) {
        return res.json({
          error: `Sorry, already a user with the username: ${username}`,
        });
      }
      const newUser = new db.User({
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
      });
      newUser.save((err: MongoError, savedUser: IUser) => {
        if (err) return res.json(err);
        return res.json(savedUser);
      });
    });
  },
  logout: (req: IReq, res: Response) => {
    if (req.user) {
      req.session && req.session.destroy((err: any) => console.log(err));
      res.clearCookie('connect.sid'); // clean up!
      return res.json({ msg: 'logging you out' });
    } else {
      return res.json({ msg: 'no user to log out!' });
    }
  },
  auth: function(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    console.log('================');
    next();
  },
  authenticate: (req: Request, res: Response) => {
    console.log('POST to /login');
    db.User.findOne({ username: req.body.username }, (err: MongoError, userMatch: IUser) => {
      console.log(err, userMatch);
      if (err) {
        return res.status(401).send(err);
      }
      if (!userMatch) {
        return res.status(401).send({ message: 'Incorrect username' });
      }
      if (!userMatch.checkPassword(req.body.password)) {
        return res.status(401).send({ message: 'Incorrect password' });
      }
      const userObj = userMatch.toObject();
      console.log(`Deleting ${userObj.password}`);
      delete userObj.password;
      const token = generateAuthToken(userObj._id);
      res.json({ user: userObj, token: token });
    });
  },
};

function generateAuthToken(value: string) {
  console.log(value);
  const token = jwt.sign(
    {
      id: value,
    },
    'my-secret',
    { expiresIn: 60 * 120 },
  ); //get the private key from the config file -> environment variable
  return token;
}
