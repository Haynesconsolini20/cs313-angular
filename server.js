const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const request = require('request');
const twitter = require('twitter');
const client = new twitter({
  consumer_key: process.env.CONSUMER,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});
const { Pool }  = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

var Sentiment = require('sentiment');
var sentiment = new Sentiment();
const stop_words = ["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now", "rt", "&amp;"];



const app = express();

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/cs313'));

app.get('/api/count', (req, res) => {
  let search = req.query.search;
  client.get('search/tweets', {
    q: search,
    count: 100
  }, function (error, tweets, response) {
    if (!error) {
      word_count = wordCount(tweets, search);
      console.log("sending response");
      res.send(word_count);
    } else {
      res.send(error);
      throw error;
    }
  });
});

app.get('/api/sentiment', (req, res) => {
  let search = req.query.search;
  console.log("sentiment call beginning");
  client.get('search/tweets', {
    q: search,
    count: 100
  }, function (error, tweets, response) {
    if (!error) {
      //console.log(tweets);
      //console.log(response);
      sentiment_scores = sentimentAnalysis(tweets);
      //console.log(word_count.slice(0,5));
      console.log("sending response");
      res.send(sentiment_scores);
    } else {
      res.send(error);
      throw error;
    }
  });
});
app.get('/api/related', (req, res) => {
  let search = req.query.search;
  console.log("related call beginning");
  client.get('search/tweets', {
    q: search,
    count: 100
  }, function (error, tweets, response) {
    if (!error) {
      //console.log(tweets);
      //console.log(response);
      topics = relatedTopics(tweets);
      //console.log(word_count.slice(0,5));
      console.log("topics were: " + topics);
      res.send(topics);
    } else {
      res.send(error);
      throw error;
    }
  });
});
app.get('/api/tweets', (req, res) => {
  let search = req.query.search;
  console.log("tweets call beginning");
  client.get('search/tweets', {
    q: search,
    count: 5
  }, function (error, tweets, response) {
    if (!error) {
      //console.log(tweets);
      //console.log(response);
      //console.log(word_count.slice(0,5));
      console.log("tweets were: " + tweets.statuses);
      res.send(tweets.statuses);
    } else {
      res.send(error);
      throw error;
    }
  });
});
app.get('/api/test', (req, res) => {
  res.send("houston we have landed");
});
app.get('/db/get', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT DISTINCT query_text FROM queries');
    const results = {
      'results': (result) ? result.rows : null
    };
    console.log("db get complete");
    console.log(results);
    client.release();
    res.send(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});
app.post('/db/post', async (req, res) => {
  try {
    const query = req.query.search
    const client = await pool.connect()
    const result = await client.query('INSERT INTO queries (query_text) VALUES (\'' + query + '\')');
    const results = {
      'results': (result) ? result.rows : null
    };
    console.log("db post complete");
    console.log(results);
    client.release();
    res.send(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname))
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log('Running...')
});




/*********************************************
 * DATA HANDLING
 *********************************************/

function sentimentAnalysis(tweets) {
  var sentiment_scores = {
    average: 0,
    scores: []
  };
  var scores_total = 0;
  var scores_count = 0;
  tweets.statuses.forEach(element => {
    scores_count++;
    var score = Number(sentiment.analyze(element.text).score);
    scores_total += score;
    sentiment_scores.scores.push(score);
  });
  console.log(scores_total);
  console.log(scores_count);
  sentiment_scores.average = scores_total / scores_count;
  console.log(sentiment_scores);
  return sentiment_scores;
}

function relatedTopics(tweets) {
  var dict = {};
  tweets.statuses.forEach(element => {
      text = element.text;
      text.split(" ").forEach(element => {
         if (element[0] == '#') {
            if (element in dict) {
                dict[element]++;
            }
            else {
                dict[element] = 1;
            }
         }
      });

  });
  //Filter out words that are known to show up

 Object.keys(dict).forEach(element => {
     if (stop_words.indexOf(element.toLowerCase()) > -1) {
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
 json_topics = {};
 items.forEach(element=> {
   json_topics[element[0]] = element[1];
 })
 return items.slice(0,5);
}
function wordCount(tweets, searchQuery) {
  var dict = {};
  tweets.statuses.forEach(element => {
    text = element.text;
    text.split(" ").forEach(element => {
      if (element in dict) {
        dict[element]++;
      } else {
        dict[element] = 1;
      }
    });

  });
  //Filter out words that are known to show up
  console.log('Query was ' + searchQuery.toLowerCase());
  Object.keys(dict).forEach(element => {
    searchQuery = searchQuery.toLowerCase();
    if (stop_words.indexOf(element.toLowerCase()) > -1) {
      //console.log("found " + element + " in stop words");
      delete dict[element];
    } else if (element.toLowerCase() === searchQuery) {
      delete dict[element];
    }
  });
  // Create items array
  var items = Object.keys(dict).map(function (key) {
    return [key, dict[key]];
  });

  // Sort the array based on the second element
  items.sort(function (first, second) {
    return second[1] - first[1];
  });
  console.log(items.slice(0, 5));

  // Convert back into dict for json
  json_words = {};
  items.forEach(element => {
    json_words[element[0]] = element[1];
  })
  return items.slice(0, 5);
}
