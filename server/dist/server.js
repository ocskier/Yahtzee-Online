var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var dbConnection = require('./db'); // loads our connection to the mongo database
var routes = require('./routes');
var app = express();
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
    app.use(express.static(path_1.join(__dirname, '../client/build')));
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
app.listen(PORT, function () {
    console.log("\uD83C\uDF0E  ==> API Server now listening on PORT " + PORT + "!");
});
export {};
