var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/cats");

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

// Once defined, this 'Cat' model now has all the methods associated
var Cat = mongoose.model("Cat", catSchema);

var george = new Cat ({
    name: "Tabby",
    age: 4,
    temperament: "sweet"
});

function createCat(){
    // hidden so it doesn't run every time
    george.save(function(err, cat){
        if (err) { 
            console.log("There was an error");
            console.log(err);
        } else {
            console.log("cat saved to db");
            console.log(cat);
    }
    });
}

// new and save in one step

Cat.create({
    name: "snowy",
    age: 5,
    temperament: "evil"
},
    function(err, cat){
        if (err) { 
            console.log("There was an error");
            console.log(err);
        } else {
            console.log("new cat saved to db");
            console.log(cat);
    }
    }
);


// retrieve cats from DB 

Cat.find({}, function(err, cats) {
    if(err) {
        console.log("There was an error");
        console.log(err);
    } else {
        console.log("All the cats");
        console.log(cats);
    }
});