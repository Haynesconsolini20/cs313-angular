var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: '4GPwHfBBPsaREYpU4F1Dz1zOH',
  consumer_secret: 'CxTqIUN1bm2OTj59uEiOZJMU8AweQrERyp4qLLsD3YPGjORZbB',
  access_token_key: '2523818257-rZrY988wal9Xih3pdjZ0GARFtC2skC7PA5iA7KY',
  access_token_secret: 'bkRdxcA4LFQTBPRv9wyFm8cflsw2KIH90VmJBiRkhLFgA'
});
client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
    console.log(tweets);
    word_count = wordCount(tweets);
    console.log(word_count.slice(0,10));
 });


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
        console.log(element + "(length "+ element.length + ": " + dict[element]);
        if (element.length < 2 || element in bad_words_table) {
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



    return items;
}
