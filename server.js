const express = require('express');
const http = require('http');
const path = require('path');
const twitter = require('twitter');
const client = new twitter({
  consumer_key: '4GPwHfBBPsaREYpU4F1Dz1zOH',
  consumer_secret: 'CxTqIUN1bm2OTj59uEiOZJMU8AweQrERyp4qLLsD3YPGjORZbB',
  access_token_key: '2523818257-rZrY988wal9Xih3pdjZ0GARFtC2skC7PA5iA7KY',
  access_token_secret: 'bkRdxcA4LFQTBPRv9wyFm8cflsw2KIH90VmJBiRkhLFgA'
});


const app = express();

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/cs313'));

app.get('/api/count', (req,res) => {
  let search = req.query.search;
  client.get('search/tweets', {q: search}, function(error, tweets, response) {
    //console.log(tweets);
    word_count = wordCount(tweets);
    //console.log(word_count.slice(0,5));
    console.log("sending response");
    res.send(word_count);
 });
});
app.get('/api/test', (req,res) => {
  res.send("houston we have landed");
})
app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname))
});

const server = http.createServer(app);

server.listen(port,() => {
  console.log('Running...')
});


function twitterGetCounts(query) {
  client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
    //console.log(tweets);
    word_count = wordCount(tweets);
    //console.log(word_count.slice(0,5));
    return JSON.stringify(word_count);
 });
}

/*********************************************
 * DATA HANDLING
 *********************************************/
function wordCount(tweets) {
  var dict = {};
  tweets.statuses.forEach(element => {
      text = element.text;
      text.split(" ").forEach(element => {
         if (element in dict) {
             dict[element]++;
         }
         else {
             dict[element] = 1;
         }
      });

  });
  //Filter out words that are known to show up
 Object.keys(dict).forEach(element => {
     //console.log(element + "(length "+ element.length + ": " + dict[element]);
     if (element.length < 2) {
         delete dict[element];
     }
 });
  // Create items array
 var items = Object.keys(dict).map(function(key) {
     return [key, dict[key]];
 });

 // Sort the array based on the second element
 items.sort(function(first, second) {
     return second[1] - first[1];
 });
 console.log(items.slice(0,5));

 // Convert back into dict for json
 json_words = {};
 items.forEach(element=> {
   json_words[element[0]] = element[1];
 })
 return items.slice(0,5);
}

function getCount() {
  return [
    ['test', 5],
    ['second', 4],
    ['third', 3],
    ['fourth', 2],
    ['fifth', 1]
  ];
}
