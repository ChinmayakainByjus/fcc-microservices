const express = require('express')
const Router = express.Router()

const constroller = require('../controller/serverController')

Router.route('/timestamp').get(constroller.returnUnix)
Router.route('/timestamp/:date').get(constroller.returnWithDate)

module.exports = Router