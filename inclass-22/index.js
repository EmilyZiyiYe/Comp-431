'use strict';
const express = require('express')
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.json())
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const logger = require('morgan')
app.use(logger('default'))
require('./src/articles')(app)
require('./src/auth')(app)
require('./src/profile')(app)
require('./src/following')(app)


const middleware = (req,res,callback) => {
    res.header('Access-Control-Allow-Origin',req.headers.origin)
    res.header('Access-Control-Allow-Credentials',true)
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers','Authorization, Content-Type')
    callback()
}
app.use(middleware)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})