// setup template to wipe and populate database 

var mongoose 	    = require("mongoose");
var Game 			= require("./models/games");
var User			= require("./models/users");
var Comment 		= require("./models/comments");

// search for dungeon siege imagesize:1024x768
var gameData = [
    {
        name: "Dungeon Siege 2",
        image: "https://games-call.com/wp-content/uploads/2013/08/786b5f3fa731378b968087b019f2b61e.jpg",
        description: "Text description",
        story: "Lorem20",
		price: "$25",
		owner: "hamish"
	},
    {
        name: "Dungeon Siege 2",
        image: "https://i.imgur.com/8lB8rG3.png?1",
        description: "Text description",
        story: "Lorem20",
		price: "$25",
		owner: "hamish"	},
    {
        name: "Dungeon Siege 2",
        image: "https://ilnaclub.info/wp-content/uploads/2017/12/top-Online-Games.jpg",
        description: "Text description",
        story: "Lorem20",
		price: "$25",
		owner: "hamish"	},
    {
        name: "Dungeon Siege 2",
        image: "https://static.techspot.com/images2/news/bigimage/2018/10/2018-10-12-image-2.jpg",
        description: "Text description",
        story: "Lorem20",
		price: "$25",
		owner: "hamish"	},
    {
        name: "Dungeon Siege 2",
        image: "https://cdn.windowsreport.com/wp-content/uploads/2017/01/economic-simulator.jpg",
        description: "Text description",
        story: "Lorem20",
		price: "$25",
		owner: "hamish"	},
    {
        name: "Dungeon Siege 2",
        image: "https://i.pinimg.com/originals/f2/78/39/f278397919e6f0a56db7fe8f2f1120e5.jpg",
        description: "Text description",
        story: "Lorem20",
		price: "$25",
		owner: "hamish"	},    
	{
        name: "Assasins Creed",
        image: "https://images.hdqwalls.com/download/witcher-3-wild-hunt-geralt-yen-and-ciri-4k-8g-1024x768.jpg",
        description: "Text description",
        story: "Lorem20",
		price: "$25",
		owner: "hamish"	},
];

var userData = [
         {
         userName: "Rory",
         userEmail: "Rory@gmail.com",
         userNickname: "Roar",
         memberSince: "Jan 2020",
         lastAccess: "Today",
         userAvatar: "local asst filename",
        },
        {
        userName: "Ham",
        userEmail: "Ham@gmail.com",
        userNickname: "Ham",
        memberSince: "mar 2018",
        lastAccess: "Jun 2 2020",
        userAvatar: "local asst filename",
       },
       {
        userName: "Mary",
        userEmail: "mary@gmail.com",
        userNickname: "Meg",
        memberSince: "Jan 2020",
        lastAccess: "Today",
        userAvatar: "local asst filename",
       }
];

var commentData = [
    {
        comment: String,
        date: String,
        game: 
		[
            {
                type: mongoose.Schema.Types.ObjectID,
                ref: "User"
            }
        ],
        user: 
		[
            {
                type: mongoose.Schema.Types.ObjectID,
                ref: "Game"
            }
        ]
	}
];

// variables to hold data
var numComments, numGames, numUsers = 0;

//var User 	= mongoose.model("User", userSchema);
//var Game 	= mongoose.model("Game", gameSchema);
//var Comment = mongoose.model("Comment", commentSchema);

numUsers = userData.length;
numComments = commentData.length;
numGames = gameData.length;

console.log("in SeedDB line 98");
console.log("lengths of arrays: games " + numGames + " users " + numUsers + "comments " + numComments)
function seedDB() {
    for (i = 0; i <= numUsers; i++) {
		console.log(userData[i]);
        User.create(userData[i]);
    }
//    for (i = 0; i <= numComments; i++) {
//		console.log(commentData[i]);
//        Comment.create(commentData[i]);
//    }
    for (i = 0; i <= numGames; i++) {
		console.log(gameData[i]);
        Game.create(gameData[i]);
    }
};


module.exports = seedDB;
