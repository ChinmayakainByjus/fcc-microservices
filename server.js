const express = require('express');
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser')

const connectDb = require('./db/connectDb')
const Router = require('./routes/router')

const HOST = '0.0.0.0';
const PORT = process.env.PORT || 3000

const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Welcom to FCC Microservices")
})

app.use("/api", Router)

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(PORT, HOST, console.log(`server is listening on port ${PORT}...`))
    } catch (error) {
        console.error(error)
    }
}

start()