require("dotenv").config();



var Spotify = require("node-spotify-api");

var axios = require("axios"); 
var moment = require("moment"); 

var keys = require("./keys.js"); 
var fs =require("fs");

var spotify = new Spotify(keys.spotify);
var userInput = "";


var userChoice = process.argv[2]; 


function input() {

    userInput = process.argv[3];
    for (let i =4; i < process.argv.length; i++) {
         userInput += "" + process.argv[i];
    }
}

switch (userChoice) { 

    case ("concert-this"):

        console.log("concert"); 
        break;
    case ("spotify-this-song"):

    if (process.argv[3] === undefined) {
        
        userInput = "Tribute";

    } else {

        input(); 


    }
        song();
        console.log("spotify"); 
        break; 
    case ("movie-this"):
        if (process.argv[3] === undefined) {
            userInput = "Mr. Nobody"
        } else {
            input();
        }
        // console.log("movie");
        movie();
        break;
    case ("do-what-it-says"): 

        console.log("whatever");
        break;
    default:

        console.log("please enter something"); 

}

function song() {
    spotify
        .search({ type: 'track', query: userInput, limit: 4
     })
        .then(function (response) {
            console.log("Song Name: " + response.tracks.items[0].name);
            console.log("Artist Name: " + response.tracks.items[0].album.artists[0].name);
            console.log("Album: " + response.tracks.items[0].album.name);
            console.log("Preview Link: " + response.tracks.items[0].album.external_urls.spotify);
            
            
            
        })
        .catch(function (err) {
            console.log(err);
        });
}
function movie() {
    var queryUrl = `http://www.omdbapi.com/?t=${userInput}&y=&plot=short&apikey=${keys.omdb.id}`;

    axios.get(queryUrl).then(
        function (response) {
            // console.log(response);
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    );
}

// the function for the concert liri would be similar to both the spotify and the movie db files where the switch statement would evaluate
// and then move on to the corresponding concert function.


function whatever() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        // console.log(dataArr);
        if (dataArr[0] === "spotify-this-song") {
            userInput = dataArr[1];
            song();
        }
        else if (dataArr[0] === "concert-this") {
            userInput = dataArr[1];
            concert();
        }
        else if (dataArr[0] === "movie-this") {
            userInput = dataArr[1];
            movie();
        }
    });
}







