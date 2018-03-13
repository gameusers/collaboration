const http = require('http');
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const Message = require('./schema/Message');


const app = express();

mongoose.connect('mongodb://192.168.99.100:27017/chatapp', (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('successfully connected to MongoDB.');
  }
});


app.use(bodyparser());



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render('test', { title: 'トップページ' });
  // res.send('Hello World');
});


app.get('/update', (req, res, next) => {
  res.render('update');
});

app.post('/update', (req, res, next) => {

  const newMessage = new Message({
    usersname: req.body.username,
    message: req.body.message
  });

  newMessage.save((err) => {
    if (err) throw err;
    return res.redirect('/');
  });

});



const server = http.createServer(app);

server.listen('3000');
