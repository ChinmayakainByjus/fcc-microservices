const requestIp = require('request-ip')

const returnUnix = (req, res) => {
    let inputDate = new Date()

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

const getIpLangaugeAndSoftware = (req, res) => {
    const clientIp = requestIp.getClientIp(req)
    const clientLang = req.acceptsLanguages()
    const clientSoftware = req.get('user-agent')
    return res.json({
        ipaddress: clientIp,
        language: clientLang[0],
        software: clientSoftware,
    })
}

const getUrl = (req, res) => {
    return res.json({
        original_url: "www.url.com"
    })
}

module.exports = {
    returnUnix,
    returnWithDate,
    getIpLangaugeAndSoftware,
    getUrl
}