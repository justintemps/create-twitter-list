const Twitter = require('twitter-node-client').Twitter;
const config = require('./data/twitter_config.json');
const screen_names = require('./data/screen_names.json');

const twitter = new Twitter(config);
const listname = 'List with members';

/*
MUST BE ADDED TO twitter_config.json before this will work
{
       "consumerKey": "XXXXXXXXXXXXXXXXXXXXXXX",
       "consumerSecret": "XXXXXXXXXXXXXXXXXXXX",
       "accessToken": "XXXXXXXXX-XXXXXXXXXXXXX",
       "accessTokenSecret": "XXXXXXXXXXXXXXXXX",
       "callBackUrl": "XXXXXXXXXXXXXXXXXXXXXXX"
}
*/

// Create a new list
function createList() {
  let err, success;
  return new Promise(function(resolve, reject) {
    err = err => {
      reject(new Error(`Failed to create list: ${err}`));
    };

    // return the list id if the request is successful
    success = data => {
      let { id_str: listid, slug: slug } = JSON.parse(data);
      console.log(`${listname} is now a new list on your Twitter account`);
      resolve({ id: listid, slug: slug, name: listname });
    };

    // create the list
    twitter.postList({ name: listname }, err, success);
  });
}

// Populate the list with new names
function populateList(list, members) {
  let count = 0;
  let limit = 100;
  let batch;
  let err = err => {
    console.log('Batch add was unsuccessful');
    console.log(err);
  };

  let success = data => {
    console.log('Batch successfully added');
    count += limit;
    batch = members.slice(count, count + limit).map(obj => obj.screen_name.toLowerCase()).toString();
    twitter.postListMembers(
      {
        name: list.name,
        list_id: list.id,
        slug: list.slug,
        screen_name: batch
      },
      err,
      success
    );
  };

  batch = members.slice(count, count + limit).map(obj => obj.screen_name.toLowerCase()).toString();

  twitter.postListMembers(
    {
      name: list.name,
      list_id: list.id,
      slug: list.slug,
      screen_name: batch
    },
    err,
    success
  );
}



createList()
  .then(list => {
    populateList(list, screen_names);
  })
  .catch(error => {
    console.log(error);
  });
