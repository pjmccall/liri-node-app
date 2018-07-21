var Twitter = require('twitter');

var request = require("request");

var Spotify = require('node-spotify-api');

require("dotenv").config();

var keys = require("./keys");

var client = new Twitter(keys.twitter);

var spotify = new Spotify(keys.spotify);



var fs = require("fs");

var command = process.argv[2];

var title = process.argv[3];





function addTweets() {
        if (command === "my-tweets") {

    var params = {screen_name: 'PJMAC45757705'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {

        for (var i = 0; i < 20; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
        }
    }
    });

    }

}


function addMovies() {
    if (command === "movie-this") {

        if (!title) {

        var queryUrl = "http://www.omdbapi.com/?t=" + "Mr. Nobody" + "&y=&plot=short&apikey=trilogy";

        }
        else {
            var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";  
        }

    // This line is just to help us debug against the actual URL.

    request(queryUrl, function(error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("Movie Title: " + JSON.parse(body).Title + "\n", 
        "Release Year: " + JSON.parse(body).Year + "\n",
        "IMDB Rating: " + JSON.parse(body).imdbRating + "\n",
        "Metascore Rating: " + JSON.parse(body).Metascore + "\n",
        "Language of Movie: " + JSON.parse(body).Language + "\n",
        "Plot: " + JSON.parse(body).Plot + "\n",
        "Actors: " + JSON.parse(body).Actors + "\n");
    }
    });

    }

}



function addMusic() {
    if (command === "spotify-this-song") {

            if (!title) {
                var song = "The Sign, Ace of Base";        
                }

            else {
                var song = title;
            }
        
            spotify.search({ type: 'track', query: song }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }

            var spotData = [
                "Artist: " + data.tracks.items[0].artists[0].name,
                "Song Title: " + data.tracks.items[0].name,
                "Track on Spotify: " + data.tracks.items[0].href,
                "Album: " + data.tracks.items[0].album.name].join("\n\n");
        
        console.log(spotData);
        console.log("-----------------");

        });

    }

}

function addRandom() {
    if (command === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function(error, data) {

            if (error) {
              return console.log(error);
            }

            var dataArr = data.split(",");
          
            var song = (dataArr[1]);

            spotify.search({ type: 'track', query: song }, function(err, data) {
                if (err) {
                return console.log('Error occurred: ' + err);
                }
    
                var spotData = [
                    "Artist: " + data.tracks.items[0].artists[0].name,
                    "Song Title: " + data.tracks.items[0].name,
                    "Track on Spotify: " + data.tracks.items[0].href,
                    "Album: " + data.tracks.items[0].album.name].join("\n\n");
            
            console.log(spotData);
            console.log("-----------------");
    
            });

        
          });

    } 


}
    

addTweets();
addMovies();
addMusic();
addRandom();