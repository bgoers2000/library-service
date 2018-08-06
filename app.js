var express = require('express')
var app = express()
var cors = require('cors')
var db = require('./db');
var LibraryController = require('./controllers/librarycontroller')


app.use(cors())

app.use('/Library',LibraryController)


module.exports = app;
