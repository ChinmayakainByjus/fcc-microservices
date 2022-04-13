const mongoose = require('mongoose');

const ShortUrl = mongoose.model('ShortUrl', new mongoose.Schema({
    short_url: String,
    original_url: String,
    suffix: String
}))

module.exports = {
    ShortUrl
}