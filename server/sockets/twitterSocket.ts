const config = require('./config');
const Twitter = require('node-tweet-stream');

module.exports = new Twitter(config);

