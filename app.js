// --------------------------------------------------
//   Import
// --------------------------------------------------

const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// --------------------------------------------------
//   Schema
// --------------------------------------------------

const Message = require('./schema/game');


// --------------------------------------------------
//   App
// --------------------------------------------------

const app = express();


// --------------------------------------------------
//   Database
// --------------------------------------------------

mongoose.connect('mongodb://192.168.99.100:27017/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB connected!');
});


// --------------------------------------------------
//   Body Parser
// --------------------------------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


// --------------------------------------------------
//   View
// --------------------------------------------------

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// --------------------------------------------------
//   Page: Index
// --------------------------------------------------

// app.get('/', (req, res, next) => {
//   res.render('test', { title: 'トップページ' });
//   // res.send('Hello World');
// });

app.get('/', (req, res, next) => {

  Message.find({}, (err, dataArr) => {
    // console.log(`err = ${err}`);
    // console.log(`dataArr = ${dataArr}`);
    if (err) throw err;
    return res.render('index', { gameDataArr: dataArr });
  });

});


// --------------------------------------------------
//   Page: Update
// --------------------------------------------------

app.get('/update', (req, res, next) => {
  res.render('update');
});

app.post('/update', (req, res, next) => {

  const newMessage = new Message({
    name: req.body.name,
    score: req.body.score
  });

  newMessage.save((err) => {
    if (err) throw err;
    return res.redirect('/');
  });

});


// --------------------------------------------------
//   Server
// --------------------------------------------------

const server = http.createServer(app);

server.listen('3000');
