"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Mongo Database
 * - this is where we set up our connection to the mongo database
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var MONGO_URL;
var MONGO_LOCAL_URL = 'mongodb://localhost/yahtzee';
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    MONGO_URL = process.env.MONGODB_URI;
}
else {
    mongoose.connect(MONGO_LOCAL_URL, { useNewUrlParser: true, useUnifiedTopology: true }); // local mongo url
    MONGO_URL = MONGO_LOCAL_URL;
}
// should mongoose.connection be put in the call back of mongoose.connect???
var db = mongoose.connection;
db.on('error', function (err) {
    console.log("There was an error connecting to the database: " + err);
});
db.once('open', function () {
    console.log("You have successfully connected to your mongo database: " + MONGO_URL);
});
module.exports = db;
