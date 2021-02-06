const express = require('express')
const api = express.Router()
const { createUser, getUsers } = require('../../controllers/users')
const authenticateToken = require('../../middleware/authenticator')

api.route('/').post(createUser).get(getUsers)

module.exports = api
