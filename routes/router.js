const express = require('express')
const Router = express.Router()

const controller = require('../controller/serverController')

Router.route('/').get(controller.returnUnix)
Router.route('/whoami').get(controller.getIpLangaugeAndSoftware)
Router.route('/api/shorturl').post(controller.getUrl)
Router.route('/:date').get(controller.returnWithDate)

module.exports = Router