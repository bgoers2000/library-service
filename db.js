require('dotenv').config();  //YOU NEED TO INCLUDE THIS IN ORDER TO USE process.env TO GET THE VARIABLE YOU MADE IN THE .ENV FILE
var mongoose = require('mongoose')

mongoose.connect(process.env.DB_CONNECT) 
