"use strict";
var config = require('./config');
var Twitter = require('node-tweet-stream');
module.exports = new Twitter(config);
