var mongoose 	    = require("mongoose");

// setup COMMENTS schema
var commentSchema = new mongoose.Schema({
    comment: String,
	user: [
		{
		    type: mongoose.Schema.Types.ObjectID,
			ref: "User"
		}
	],
	game: [
		{
		    type: mongoose.Schema.Types.ObjectID,
			ref: "Game"
		}
	]
});

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
