const requestIp = require('request-ip')
const shortid = require('shortid')
const { ShortUrl } = require('../models/dbModel')

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

const getNewUrl = (req, res) => {
    const clientUrl = req.body['url']
    responseObject['original_url'] = clientUrl

    let inputShort = 1;

    Url.findOne({}).sort({ sort: 'desc' }).exec((error, result) => {
        if (!error && result != undefined) {

        }
    })

    res.json(responseObject)
    // const suffix = shortid.generate();
    // const generatedShortUrl = suffix;

    // const newUrl = new ShortUrl({
    //     short_url: __dirname + '/api/shorturl/' + suffix,
    //     original_url: clientUrl,
    //     suffix: suffix
    // })

    // newUrl.save((error, doc) => {
    //     if (error) console.log(error)
    //     res.json({
    //         "saved": true,
    //         "short_url": newUrl.short_url,
    //         "original_url": newUrl.original_url,
    //         "suffix": newUrl.suffix
    //     })
    // })
}

const getUrl = (req, res) => {
    const userGeneratedSuffix = req.params.suffix;

    ShortUrl.find({
        suffix: userGeneratedSuffix
    }).then(foundUrls => {
        const urlForRedirect = foundUrls[0];
        res.redirect(urlForRedirect.original_url)
    })
}

module.exports = {
    returnUnix,
    returnWithDate,
    getIpLangaugeAndSoftware,
    getUrl,
    getNewUrl
}