// settings for GOORM - essential
const http      = require('http');
const hostname  = '0.0.0.0';
const port      = 3000;

// must install: request, ejs, body-parser, express

var express     = require("express");
var request     = require("request");
var bodyParser  = require("body-parser");
var games = [
	{name: "DungeonSeige2", image: "https://static.gamespot.com/uploads/scale_super/gamespot/images/2005/062/reviews/644739-914954_20050304_002.jpg"},
	{name: "DarkSouls2", image:"https://b-i.forbesimg.com/erikkain/files/2013/07/gaming-dark-souls-2-screenshot-1.jpg"},
	{name: "Oblivion", image:"https://www.lifewire.com/thmb/iL7Z7JihnedHngJc0uqBypYgLTM=/1024x640/filters:fill(auto,1)/elder-scrolls-58b7ce885f9b5880801edb6e.jpg"},
	{name: "FF7", image: "https://cnet3.cbsistatic.com/img/aawoT9179b1wTMZLCsuTwLVd1dE=/940x0/2020/02/24/9e89773b-ed7f-459a-b696-9b0589b739e4/cloud-strife-final-fantasy-7-remake-poster-uhdpaper-com-8k-7-61-wp-thumbnail.jpg"},
	{name: "Man of many", image:"https://manofmany.com/wp-content/uploads/2020/04/Sony-Play-at-Home-Uncharted.jpg"},
	{name: "Diablo", image:"https://psmedia.playstation.com/is/image/psmedia/diablo-3-reaper-of-souls-evil-edition-screen-02-ps4-eu-31oct14?$LeadProduct_Image$"},
]

// express has many methods, we'll call our variable to access express 'app'.
var app = express();

// Serve the files in the public folder as if they were in my local folder
app.use(express.static("public"));

// Use bodyParser to extract JSON data
app.use(bodyParser.urlencoded({extended: true}));

//tell app to use files with suffix .ejs automatically
app.set("view engine", "ejs");

// The landing page
app.get("/", function (req, res) {
//    res.send("camp V1 is active"); // this is the partial file, called "search" in the views directory
	res.render("XYZ");

});

// test route to show my actual design for the landing page
app.get("/display1", function (req, res) {
//    res.send("camp V1 is active"); // this is the partial file, called "search" in the views directory
	res.render("XYZ");

});

app.get("/games", function(req,res){
	res.render("games.ejs", {games: games});
});

app.get("/docs", function(req,res){
	res.render("documentation.ejs");
});



app.get("/games/new", function(req, res){
	// this needs to be a file called "new.ejs" in the views directory
	res.render("new");
});



app.post("/games", function(req, res){
// get data from form and add to array, then redirect to game page
// this is a RESTful route - same name, one for display one for adding
//	res.send("you hit post route");
	var newGame = req.body.name;
	var newImage = req.body.image;
	var newGame = {name: newGame, image: newImage};
	games.push(newGame);
	// redirect to game page
	res.redirect("/games");

});

app.get("*", function (req, resp) {
    console.log("request to an unknown page (*)");
    resp.send("What are you doing??");
});

// tell app to listen
// we start this from the console with PORT=3000 node "filename.js" **** 
// remember to copy this code from my GIT file to the actual server and restart the server

console.log("Port = " + port + " IP address is " + hostname);
app.listen(port, hostname, function () {
    console.log("campv1  server started");
});