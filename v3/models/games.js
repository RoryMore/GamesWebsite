var mongoose 	    = require("mongoose");

// setup GAME schema
var gameSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
	story: String,
	price: String,
	owner: String
});

var Game = mongoose.model("Game", gameSchema);

module.exports = Game;
