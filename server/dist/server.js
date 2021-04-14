"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongo');
var dbConnection = require('./db'); // loads our connection to the mongo database
var routes = require('./routes');
var app = express();
var io = require('socket.io');
var tw = require('./sockets/twitterSocket');
var PORT = process.env.PORT || 3001;
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
app.use(session({
    secret: process.env.APP_SECRET || 'this is the default passphrase',
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false,
}));
// If its production environment!
if (process.env.NODE_ENV === 'production') {
    var path_1 = require('path');
    console.log('YOU ARE IN THE PRODUCTION ENV');
    app.use(express.static(path_1.join(__dirname, '../../client/build')));
    app.get('/', function (req, res) {
        res.sendFile(path_1.join(__dirname, './client/build/'));
    });
}
// Add routes, both API and view
app.use(routes);
// Error handler
app.use(function (err, req, res, next) {
    console.log('====== ERROR =======');
    console.error(err.stack);
    res.status(500);
});
// Starting Server
var myServer = app.listen(PORT, function () {
    console.log("\uD83C\uDF0E  ==> API Server now listening on PORT " + PORT + "!");
});
var mySocket = io(myServer);
// Socket scripts
mySocket.sockets.on('connection', function (socket) {
    console.log('User connected');
    socket.on('data', function (data) {
        tw.track(data);
        console.log("Tweeting about " + data + "!");
        tw.on('tweet', function (tweet) {
            console.log(tweet.text);
            socket.emit('tweet', tweet);
            // socket.emit('tweet', tweet);
        });
        socket.on('disconnect', function () {
            console.log('user disconnected');
            tw.untrack(data);
        });
    });
    socket.on('chat', function (text, user) {
        console.log(user.uid + " - " + text);
        delete user.uid;
        socket.emit('chat', text, user);
        socket.broadcast.emit('chat', text, user);
        socket.broadcast.emit('chat', 'Hey!', { uid: '99999999', displayName: 'Dude!' });
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
