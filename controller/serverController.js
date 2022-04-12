const returnUnix = (req, res) => {
    let inputDate = new Date()
    inputDate.setMinutes(inputDate.getMinutes() - 3);

    return res.json({
        'unix': inputDate.getTime(),
        'utc': inputDate.toUTCString()
    })
}

const returnWithDate = (req, res) => {
    let newDate = "";

    let inputDate = new Date(req.params.date);

    if (inputDate.toString() === "Invalid Date") {
        inputDate = new Date(parseInt(req.params.date))
    }
    if (inputDate.toString() === "Invalid Date") {
        return res.json({
            error: "Invalid Date"
        })
    } else {
        newDate = {
            unix: inputDate.getTime(),
            utc: inputDate.toUTCString()
        }
    }
    return res.json(newDate)
}

module.exports = {
    returnUnix,
    returnWithDate
}