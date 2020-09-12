import { Response, Request, NextFunction } from 'express';

const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbConnection = require('./db'); // loads our connection to the mongo database
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
  console.log('loading dev environments');
  require('dotenv').config();
}
require('dotenv').config();

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
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.log('====== ERROR =======');
  console.error(err.stack);
  res.status(500);
});

// Starting Server
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
