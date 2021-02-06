const express = require('express')
const api = express.Router()
const { createToken } = require('../../controllers/auth')

api.route('/').post(createToken)

module.exports = api
