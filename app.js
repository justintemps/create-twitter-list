const TwitterPinAuth = require('twitter-pin-auth');
const prompt = require('prompt-promise');
const axios = require('axios');

const CREATE_LIST = 'https://api.twitter.com/1.1/lists/create.json';

// Get tokens from Twitter
const twitterPinAuth = new TwitterPinAuth(
  'GSLiSnuT2V3oR5siiKI01baJ5',
  '8OXRV1qIlfzoReFAocRRE1T7SnxCDB6d6CfnLhIYtdewjU8u88',
  false
);

// Authenticate with Twitter
twitterPinAuth
  .requestAuthUrl()
  // Get the auth url from Twitter and print it to the console
  .then(function(url) {
    console.log('Navigate to this url in your browser:');
    console.log(url);
  })
  .then(function() {
    // Prompt the user to enter the pin
    prompt('Enter PIN: ')
      .then(function(pin) {
        prompt.done();
        return pin;
      })
      .then(function(pin) {
        twitterPinAuth
          .authorize(pin)
          .then(function(){
            console.log('Hurray! You\'re properly logged in now.');
            createList();
          })
          .catch(function(err) {
            console.error(err);
          });
      })
      .catch(function(err) {
        console.error(err);
      });
  })
  .catch(function(err) {
    console.error(err);
  });

// Create a new list in Twitter
function createList() {
  axios
    .post(CREATE_LIST, {
      name: 'Brand new list',
      mode: 'public',
      description: 'This is a test.'
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};
