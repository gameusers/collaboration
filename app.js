const http = require('http');
const path = require('path');
const express = require('express');
// const mongoose = require('mongoose');
// const ejs = require('ejs');

const app = express();


// mongoose.connect('mongodb://192.168.99.100:27017/people', (err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('successfully connected to MongoDB.');
//   }
// });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render('test', { title: 'タイトル' });
  // res.send('Hello World');
});

app.get('/hoge', (req, res, next) => {
  res.send('Hoge');
});

// app.use((req, res, next) => {
//   res.send('Hello World AAA');
// });

const server = http.createServer(app);

server.listen('3000');


//
// dctype html
// html(lang='ja');
//   head
//     meta(charset='utf-8');
//   body
//   h1 #{title}



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
