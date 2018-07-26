// Library.js
var mongoose = require('mongoose');
var LibrarySchema = new mongoose.Schema({
  coverImage: String, //Base64 Encoded
  title: String,
  author: String,
  numberOfPages: Number,
  publishDate: Date,
  haveRead: Boolean
});


module.exports = mongoose.model('Library',LibrarySchema);
