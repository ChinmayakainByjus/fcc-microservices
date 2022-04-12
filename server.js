const express = require('express');
const app = express();

const Router = require('./routes/router')

const PORT = 3000

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcom to FCC Microservices")
})

app.use("/api", Router)

const start = () => {
    try {
        app.listen(PORT || 3000, console.log(`server is listening on port ${PORT}...`))
    } catch (error) {
        console.log(error)
    }
}

start()