const express = require('express');
const app = express();
require('dotenv').config()

const Router = require('./routes/router')

const HOST = '0.0.0.0';
const PORT = process.env.PORT || 3000

app.use(express.json())
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.get("/", (req, res) => {
    res.send("Welcom to FCC Microservices")
})

app.use("/api", Router)

const start = () => {
    try {
        app.listen(PORT, HOST, console.log(`server is listening on port ${PORT}...`))
    } catch (error) {
        console.error(error)
    }
}

start()