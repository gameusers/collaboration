// const http = require('http');
// const express = require('express');
//
// const app = express();
//
// app.use(function(req, res, next) {
//   return res.send('Hello World');
// });
//
// // app.use((req, res, next) => {
// //   res.send('Hello World');
// // });
//
// const server = http.createServer(app);
//
// server.listen('3000');



// var http = require('http');
// var express = require('express');
//
// var app = express();
//
// app.use(function(req, res, next) {
//   return res.send('Hello World');
// });
//
// var server = http.createServer(app);
//
// server.listen('3000');

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
