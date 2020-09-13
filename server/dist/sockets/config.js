"use strict";
var twitterObj = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.BEARER_TOKEN,
};
module.exports = twitterObj;
