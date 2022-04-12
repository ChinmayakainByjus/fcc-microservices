const express = require('express')
const Router = express.Router()

const constroller = require('../controller/serverController')

Router.route('/').get(constroller.getAllDetails)

module.exports = Router