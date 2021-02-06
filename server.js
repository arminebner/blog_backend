const express = require('express')
const https = require('https')
const fs = require('fs')
var path = require('path')
const cors = require('cors')
const methodOverride = require('method-override')
require('dotenv').config({ path: '/home/blog_backend/env/.env' })
const connectDB = require('./dbinit')
const errorHandler = require('./middleware/error')
const posts = require('./routes/api/posts')
const auth = require('./routes/api/auth')
const users = require('./routes/api/users')

const app = express()

//start database
connectDB()

//middleware
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.json())

//app.use(express.static('public'))
app.use(express.static('public'))

//error-handling
app.use(errorHandler)

//homeroute
app.get('/', (req, res) => res.send('hello'))

//auth-routes
app.use('/login', auth)

//post-routes
//app.options('/posts', cors(corsOptions))
app.use('/posts', posts)

//user-route
app.use('/users', users)

//start server
app.listen('5000', () => console.log('Server listening on port 5000'))

// curl -k https://localhost:8000/

// const options = {
// 	key: fs.readFileSync('/home/blog_backend/archive/fullchain.pem', 'utf-8'),
// 	cert: fs.readFileSync('/home/blog_backend/archive/privkey.pem', 'utf-8'),
// }

// https
// 	.createServer(options, app)
// 	.listen('5000', () => console.log('Server listening on port 5000'))
