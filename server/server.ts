import { Response, Request, NextFunction } from 'express';
import { Socket } from 'socket.io';

// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
  console.log('loading dev environments');
  require('dotenv').config();
}
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbConnection = require('./db'); // loads our connection to the mongo database
const routes = require('./routes');
const app = express();
const io = require('socket.io');
const tw = require('./sockets/twitterSocket');

const PORT = process.env.PORT || 3001;

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.APP_SECRET || 'this is the default passphrase',
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false,
  }),
);

// If its production environment!
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  console.log('YOU ARE IN THE PRODUCTION ENV');
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, './client/build/'));
  });
}

// Add routes, both API and view
app.use(routes);

// Error handler
app.use(function(err: Error, req: Request, res: Response, next: NextFunction) {
  console.log('====== ERROR =======');
  console.error(err.stack);
  res.status(500);
});

// Starting Server
const myServer = app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

const mySocket = io(myServer);

// Socket scripts
mySocket.on('connection', function(socket: Socket) {
  console.log('User connected');
  socket.on('data', function(data) {
    tw.track(data);
    console.log(`Tweeting about ${data}!`);
    tw.on('tweet', function(tweet: any) {
      console.log(tweet.text);
      socket.emit('tweet', tweet);
      // socket.emit('tweet', tweet);
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
      tw.untrack(data);
    });
  });
  socket.on('chat', function(text: string, user: any) {
    console.log(`${user.googleId} - ${text}`);
    delete user.googleId;
    socket.emit('chat', text, user);
    socket.broadcast.emit('chat', text, user);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
