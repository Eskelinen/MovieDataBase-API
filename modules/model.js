//Otetaan Mongoose käyttöön.
var mongoose = require("mongoose");

//Luodaan uusi skeema.
const MovieSchema = new mongoose.Schema({

    title: String,
    year: Number,
    poster: String,
});

//Otetaan skeema käyttöön sovelluksessa.
module.exports = mongoose.model("Movie", MovieSchema, "movies");