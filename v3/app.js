// settings for GOORM - essential
const http      = require('http');
const hostname  = '0.0.0.0';
const port      = 3000;

// must install: request, ejs, body-parser, express, mongoose

var express         = require("express");
var request         = require("request");
var bodyParser      = require("body-parser");
var mongoose 	    = require("mongoose");
var methodOveride 	= require("method-override");
var expressSanitiser=require("express-sanitizer");
var seedDB			= require("./seeds");

// set database flags
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// connect to my specific database and schema
mongoose.connect("mongodb://localhost/game_camp");

// Connect and include my database schemas which are stored outside this file.

var Game = require("./models/games");
var User	= require("./models/users");
var Comment = require("./models/comments");

// express has many methods, we'll call our variable to access express 'app'.
var app = express();

// Serve the files in the public folder as if they were in my local folder
app.use(express.static("public"));
app.use(methodOveride("_method"));

// Use bodyParser to extract JSON data
app.use(bodyParser.urlencoded({extended: true}));

// user body-sanitiser, must go AFTER body-parser
app.use(expressSanitiser());

//tell app to use files with suffix .ejs automatically
app.set("view engine", "ejs");

// My primary landing page
//    res.send("catch is active"); // this is the partial file, called "search" in the views directory
app.get("/", function (req, res) {
	res.render("XYZ");
});

// test route to show my actual design for the landing page
app.get("/display1", function (req, res) {
	res.render("XYZ");
});

// SHOW route
app.get("/games", function (req, res) { 
    Game.find({}, function(err, storedGames) {
        if(err) {
            console.log("There was an error " + err);
        } else {
            console.log("games retrieved from db");
//            console.log(storedGames);
            res.render("index.ejs", {games: storedGames});
        }
    });

});

// DELETE route
app.delete("/games/:id", function(req,res){
// destroy game then redirect
//	res.send("You have reached DELETE route");
    Game.findByIdAndRemove(req.params.id, function (err){
        if(err) {
        console.log("There was a deletion error " + err);
        res.redirect("/games");
      } else {
        console.log("Delete successful");
        res.redirect("/games");
        }
    });
});


// SHOW ROUTE for documentation
app.get("/docs", function(req,res){
	res.render("documentation.ejs");
});

// CREATE route
app.get("/games/new", function(req, res){
	// this needs to be a file called "new.ejs" in the views directory
	res.render("new");
});

// CREATE route
app.post("/games", function(req, res){
// get data from form and add to array, then redirect to game page
// this is a RESTful route - same name, one for display one for adding
//	res.send("you hit post route");
	var newGame = req.body.name;
	var newImage = req.body.image;
    var desc = req.sanitize(req.body.description);
    var story = req.sanitize(req.body.story);
	var newGame = {name: newGame, image: newImage, description: desc, story: story };
// put the new game, with data into the database
    Game.create(newGame, function (err, newlyCreatedGame){
        if(err) {
            console.log("There was an error " + err);
        } else {
            res.redirect("/games");
        }
    });
	// then redirect to game page, which will show the new item along with the old items
// 	res.redirect("/games");
});

// SHOW route
app.get("/games/:id", function(req, res){
    // this needs to be a file called "new.ejs" in the views directory
    // find game with ID = _ID and display this.
    Game.findById(req.params.id, function (err, foundGame){
        if(err) {
            console.log("There was an error " + err);
        } else {
            res.render("show", {game: foundGame});
        }
    });
});

//UPDATE route
app.put("/games/:id", function(req, res){

    Game.findByIdAndUpdate(req.params.id, req.body.game, function (err, updatedGame){
        if(err) {
            console.log("There was an error " + err);
            res.redirect("/games"); 
        } else {
			console.log("Update sucessful " );
			console.log(req.params.id + " " + req.body.game.name + " " + req.body.game.description)
            res.redirect("/games/" + req.params.id); 
        }
    });
});


// EDIT ROUTE
app.get("/games/:id/edit", function(req, res){
// this needs to be a file called "new.ejs" in the views directory
// find game with ID = _ID and display this.
//   res.render("edit", {game: foundGame});
//   res.render("edit");

    Game.findById(req.params.id, function (err, foundGame){
        if(err) {
            res.redirtect("/games"); 
        } else {
            res.render("edit", {game: foundGame});
        }
    });
});


// PATTERN MATCH all other pages
app.get("*", function (req, resp) {
    console.log("request to an unknown page (*)");
    resp.send("What are you doing??");
});

// tell app to listen
// we start this from the console with PORT=3000 node "filename.js" **** 
// remember to copy this code from my GIT file to the actual server and restart the server

console.log("Port = " + port + " IP address is " + hostname);

app.listen(port, hostname, function () 
{
    console.log("campv2 server started");
});
