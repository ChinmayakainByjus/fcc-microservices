const mongoose = require('mongoose');

const ShortUrl = mongoose.model('ShortUrl', new mongoose.Schema({
    original_url: {
        type: String,
        required: true
    },
    short_url: Number
}))


module.exports = {
    ShortUrl,
}