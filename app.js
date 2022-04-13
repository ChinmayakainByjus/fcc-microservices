require("dotenv").config();
const express = require("express");
const cors = require("cors");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var shortid = require('shortid');
const app = express();


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cors({ optionSuccessStatus: 200 }));


app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
    res.send("Hello fellow Earthling!");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
    res.json({ greeting: "hello API" });
});

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

var ShortURL = mongoose.model('ShortURL', new mongoose.Schema({
    short_url: String,
    original_url: String,
    suffix: String
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.post("/api/shorturl/new/", (req, res) => {
    let client_requested_url = req.body.url

    let suffix = shortid.generate();
    let newShortURL = suffix

    let newURL = new ShortURL({
        short_url: __dirname + "/api/shorturl/" + suffix,
        original_url: client_requested_url,
        suffix: suffix
    })

    newURL.save((err, doc) => {
        if (err) return console.error(err);
        res.json({
            "saved": true,
            "short_url": newURL.short_url,
            "orignal_url": newURL.original_url,
            "suffix": newURL.suffix
        });
    });
});

app.get("/api/shorturl/:suffix", (req, res) => {
    let userGeneratedSuffix = req.params.suffix;
    ShortURL.find({ suffix: userGeneratedSuffix }).then(foundUrls => {
        let urlForRedirect = foundUrls[0];
        res.redirect(urlForRedirect.original_url);
    });
});
