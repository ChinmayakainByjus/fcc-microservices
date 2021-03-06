const express = require('express')
const Router = express.Router()

const controller = require('../controller/serverController')

Router.route('/').get(controller.returnUnix)
Router.route('/:date').get(controller.returnWithDate)
Router.route('/whoami').get(controller.getIpLangaugeAndSoftware)
Router.route('/shorturl/new').post(controller.getNewUrl)
Router.route('/shorturl/:suffix').get(controller.getUrl)

module.exports = Router