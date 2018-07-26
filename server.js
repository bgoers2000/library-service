var http = require('http');
var app = require('./app.js');
var hostname = '127.0.0.1';
var port = process.env.PORT || 3002;

var server = app.listen(port, function(){
  console.log('Express server listening on port ' + port);
});
