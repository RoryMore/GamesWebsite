var mongoose 	    		= require("mongoose");
// var passport 				= require("passport");
// var LocalStrategy 			= require("passport-local");
var passportLocalMongoose 	= require("passport-local-mongoose");


// setup COMMENTS schema
var userSchema = new mongoose.Schema({
    userName: String,
    userEmail: String,
	userNickname: String,
	userPass: String
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);

module.exports = User;
