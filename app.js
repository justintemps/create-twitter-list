const Twitter = require('twitter-node-client').Twitter;
const config = require('./data/twitter_config.json');

//Callback functions
var error = function(err, response, body) {
  console.log('ERROR [%s]', err);
};
var success = function(data) {
  console.log('Data [%s]', data);
};

const twitter = new Twitter(config);

twitter.getUserTimeline({ screen_name: 'ilo', count: '10'}, error, success);
