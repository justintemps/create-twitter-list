const Twitter = require('twitter-node-client').Twitter;
const config = require('./data/twitter_config.json');

const twitter = new Twitter(config);
const listname = 'List with members';

// Create a new list
function createList() {
  let err, success;
  return new Promise(function(resolve, reject) {
    err = (err) => {
      reject(new Error(`Failed to create list: ${err}`));
    };

    // return the list id if the request is successful
    success = data => {
      let { id_str: listid, slug: slug } = JSON.parse(data);
      console.log(`${listname} was successfully added`);
      console.log(`List ID is ${listid}`);
      console.log(`The slug is ${slug}`);
      resolve({ id: listid, slug: slug, name: listname });
    };

    // create the list
    twitter.postList({ name: listname }, err, success);
  });
}

// Populate the list with new names
function populateList(list) {
  console.log(list);
  let err = (err) => {
    console.log(err);
  };

  let success = data => {
    console.log(JSON.stringify(JSON.parse(data), null, 2));
  };

  twitter.postListMembers(
    {
      name: list.name,
      list_id: list.id,
      slug: list.slug,
      screen_name: ['justintemps']
    },
    err,
    success
  );
}

createList()
  .then(list => {
    populateList(list);
  })
  .catch(error => {
    console.log(error);
  });
