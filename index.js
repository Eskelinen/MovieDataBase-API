//Otetaan käyttöön express.
var express = require("express");
var app = express();
require("dotenv").config();

//Otetaan Mongoose käyttöön.
var mongoose = require("mongoose");

//Asetetaan Mongoosen mallit.
const Movie = require("./modules/model");

//.env:issä määritelty linkki tietokantaan.
var uri = process.env.DB_URI;

//Määritellään portit.
const PORT = process.env.PORT || 5000;

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

//Luodaan yhteysolio.
const client = mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });

//Reitti koko tietokannan hakemiseen.
app.get("/api/leffat", function(req, res) {

    async function connect() {
        try {
            //Rajataan haku 10 olioon.
            const leffat = await Movie.find({}).limit(10);
            //Tieto lähetetään käyttäjälle JSON-muotoisena.
            res.status(200).json(leffat);
        } catch (error) {
            //Mahdollisen virheen tulostus.
            res.status(500).json("Yhteysvirhe")
            console.error(`Connection error: ${error.stack} on Worker process: ${process.pid}`)
        } finally {
            //Varmistusviesti konsoliin.
            console.log("Leffat haettu...");
        }
    }
    connect();
});

//Reitti elokuvan hakemiseen id:n avulla.
app.get("/api/hae/:id", function(req, res) {
    var _id = req.params.id;
    async function connect() {
        try {
            const leffat = await Movie.findById(_id);
            res.status(200).json(leffat);
        } catch (error) {
            res.status(500).json("Yhteysvirhe")
            console.error(`Connection error: ${error.stack} on Worker process: ${process.pid}`)
        } finally {
            console.log("Job done...");
        }
    }
    connect();
});

//Reitti elokuvan lisäämiseen tietokantaan. Käyttäjältä kysytään leffan nimi ja julkaisuvuosi.
app.post("/api/lisaa", function (req, res) {
    var _title = req.body.title;
    var _year = req.body.year;
    async function connect() {
        try {
            //Uudelle leffalle luodaan uusi olio.
            const uusileffa = new Movie({
                title: _title,
                year: _year
            })
            //Elokuva tallennetaan tietokantaan ja käyttäjä saa leffan tiedot ruudulleen.
            await uusileffa.save()
            res.status(200).json(uusileffa)
        } catch (error) {
            res.status(500).json("Yhteysvirhe")
            console.error(`Connection error: ${error.stack} on Worker process: ${process.pid}`)
        } finally {
            console.log("Leffa lisätty.")
        }
    }
    connect();
});

//Reitti leffan muokkaamiseen id:n mukaan.
app.put("/api/muokkaa/:id", function (req, res) {
    var _id = req.params.id;
    async function connect() {
        try {
            const leffa = await Movie.findById(_id);
            //Käyttäjä voi määritellä elokuvan nimen ja julkaisuvuoden.
            if (req.body.title) {
                leffa.title = req.body.title;
            }
            if (req.body.year) {
                leffa.year = req.body.year;
            }
            await leffa.save()
            res.status(200).json(leffa);
        } catch (error) {
            res.status(500).json("Yhteysvirhe")
            console.error(`Connection error: ${error.stack} on Worker process: ${process.pid}`)
        } finally {
            console.log("Leffa muokattu");
        }
    }
    connect();
});

//Reitti leffan poistamiseen.
app.delete("/api/poista/:id", function (req, res) {
    var _id = req.params.id;
    async function connect() {
        try {
            //Mongoosen findByIdAndDelete() hakee olion tietokannasta ja poistaa sen saman tien.
            await Movie.findByIdAndDelete(_id);
            res.status(200).json("Poistettiin " + _id);
        } catch (error) {
            res.status(500).json("Yhteysvirhe")
            console.error(`Connection error: ${error.stack} on Worker process: ${process.pid}`)
        } finally {
            console.log("Leffa poistettu");
        }
    }
    connect();
});

//Portin kuuntelut.
app.listen(PORT, function () {
    console.log("Kuunnellaan porttia " + PORT);
});