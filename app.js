const http = require('http');
const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.send('Hello World AAA');
});

const server = http.createServer(app);

server.listen('5000');



// app.use(function(req, res, next) {
//   return res.send('Hello World3');
// });


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

// var express = require('express');
// var app = express();
//
// app.get('/', function (req, res) {
//   res.send('Hello World!うおおおおおおおおおおおおおおおおおおおお m9(^Д^)');
// });
//
// app.listen(5000, function () {
//   console.log('Example app listening on port 5000!');
// });
//
// ｵﾜﾗﾗｲﾚｰお疲れや
