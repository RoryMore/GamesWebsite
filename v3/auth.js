// settings for GOORM - essential
const http      = require('http');
const hostname  = '0.0.0.0';
const port      = 3000;

// must install: request, ejs, body-parser, express, mongoose

var express         		= require("express");
var request         		= require("request");
var bodyParser      		= require("body-parser");
var mongoose 	    		= require("mongoose");
var methodOveride 			= require("method-override");
var expressSanitiser		= require("express-sanitizer");
var passport 				= require("passport");
var LocalStrategy 			= require("passport-local");
var passportLocalMongoose 	= require("passport-local-mongoose");



// var seedDB			= require("./seeds");

// set database flags
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// connect to my specific database and schema
mongoose.connect("mongodb://localhost/auth_db2");

var Game 	= require("./models/games");
var User	= require("./models/users");
var Comment = require("./models/comments");

// express has many methods, we'll call our variable to access express 'app'.
var app = express();


// Serve the files in the public folder as if they were in my local folder
app.use(express.static("public"));
app.use(methodOveride("_method"));

// Use bodyParser to extract JSON data
app.use(bodyParser.urlencoded({extended: true}));

// use these functions and libraries
app.use(require("express-session")({
	secret: "This is the secret string to generate encoding",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Use bodyParser to extract JSON data from a form
app.use(bodyParser.urlencoded({extended: true}));

// user body-sanitiser, must go AFTER body-parser
app.use(expressSanitiser());


//tell app to use files with suffix .ejs automatically
app.set("view engine", "ejs");

// ========================== ROUTES ====================

app.get("/", function (req, res) {
	res.render("auth-view");
});

// LOGIN ROUTES 

app.get("/login", function (req, res) {
	res.render("login");
});

// This is middleware
app.post("/login", passport.authenticate("local", {successRedirect: "/secret", failureRedirect: "/login"}),
		 function(req,res){
});

// LOGOUT functionality
// This is a simple link.
app.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/");
});


app.get("/secret", isLoggedIn, function (req, res) {
	res.render("secret");
});

app.get("/signup", function (req, res) {
	res.render("signup");
});
// Handle SIGNUP
app.post("/signup", function(req, res){

	var localUserName 		= req.sanitize(req.body.username);
	var localUserEmail 		= req.sanitize(req.body.email);
    var localUserNickname 	= req.sanitize(req.body.nickname);

// req.body.username;
// req.body.email;
// req.body.nickname;
// req.body.password;

	var newLocalUser = {userName: localUserName,
						userEmail: localUserEmail,
						userNickname:localUserNickname,
					   };
	
	console.log(newLocalUser);

// 	User.register(new User(newLocalUser), req.body.password, 
 	User.register(new User({username: req.body.username}), req.body.password, 
 				  function(err, user)
 				  {
 					if(err)
 					{
 						console.log("Error in registering user " + err);
 						return res.render("signup");
 					} 
 					// this is where we can switch local to TWITTER or FACEBOOK
 					passport.authenticate("local")(req, res, 
 					function()
 					{
 						res.redirect("/secret");
 					});
 				});
});

// IS logged in 

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};

// -end section

console.log("Port = " + port + " IP address is " + hostname);

app.listen(port, hostname, function () 
{
    console.log("authentication DB server started");
});
