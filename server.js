const express = require('express');
const app = express();
require('dotenv').config()

const Router = require('./routes/router')

const HOST = '0.0.0.0';
const PORT = process.env.PORT || 3000

app.use(express.json())

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