'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
require('dotenv').config()

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/
// mongoose.connect(process.env.DB_URI);

app.use(cors());
app.use(express.json())

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
    res.json({ greeting: 'hello API' });
});


app.listen(port, function () {
    console.log('Node.js listening ...');
});

/* Database Connection */
let uri = process.env.MONGO_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let urlSchema = new mongoose.Schema({
    original: { type: String, required: true },
    short: Number
})

let Url = mongoose.model('Url', urlSchema)

let bodyParser = require('body-parser')
let responseObject = {}
app.post('/api/shorturl', bodyParser.urlencoded({ extended: false }), (request, response) => {
    let inputUrl = request.body['url']

    let urlRegex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)

    if (!inputUrl.match(urlRegex)) {
        response.json({ error: 'Invalid URL' })
        return
    }

    responseObject['original_url'] = inputUrl

    let inputShort = 1

    Url.findOne({})
        .sort({ short: 'desc' })
        .exec((error, result) => {
            if (!error && result != undefined) {
                inputShort = result.short + 1
            }
            if (!error) {
                Url.findOneAndUpdate(
                    { original: inputUrl },
                    { original: inputUrl, short: inputShort },
                    { new: true, upsert: true },
                    (error, savedUrl) => {
                        if (!error) {
                            responseObject['short_url'] = savedUrl.short
                            response.json(responseObject)
                        }
                    }
                )
            }
        })

})

app.get('/api/shorturl/:input', (request, response) => {
    let input = request.params.input

    Url.findOne({ short: input }, (error, result) => {
        if (!error && result != undefined) {
            response.redirect(result.original)
        } else {
            response.json('URL not Found')
        }
    })
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    exercise: [{
        description: String,
        duration: Number,
        date: String,
    }]
});
const User = mongoose.model('User', userSchema);


//URI handling
app.post('/api/users', function (req, res) {
    if (req.body.username != undefined) {
        let username = req.body.username;
        let user = new User({ username });
        user.save(function (err, data) {
            if (err) res.json({ error: "Mongo error" })
            else {
                const { username, _id } = data;
                res.json({ username, _id });
            }
        });
    } else {
        res.json({ error: "invalid data" })
    }
});

app.get('/api/users', function (req, res) {
    User.find({}, { username: 1 }).exec(function (err, data) {
        if (err) res.json({ error: "Mongo error" })
        else {
            res.json(data);
        }
    });
});



