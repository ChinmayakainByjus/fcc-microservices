const express = require('express')
const Router = express.Router()

const constroller = require('../controller/serverController')

Router.route('/').get(constroller.returnUnix)
Router.route('/:date').get(constroller.returnWithDate)

module.exports = Router