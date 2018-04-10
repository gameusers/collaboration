// --------------------------------------------------
//   Require
// --------------------------------------------------

// var createError = require('http-errors');

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
// const fileUpload = require('express-fileupload');

// const passport = require('passport');
// const TwitterStrategy = require('passport-twitter').Strategy;
// const LocalStrategy = require('passport-local').Strategy;
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
// const flash = require('connect-flash');

// const logger = require('./lib/logger');
// const log = require('./lib/error_logger');

// const helmet = require('helmet');
// const csrf = require('csurf');

// var cookieParser = require('cookie-parser');
// var logger = require('morgan');



let normalFunc = function(x) {
    console.log(x);
};

var test = 1;
test;



// ---------------------------------------------
//   Require: Router
// ---------------------------------------------

const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');




// --------------------------------------------------
//   Database
// --------------------------------------------------

// mongoose.connect('mongodb://192.168.99.100:27017/test');
mongoose.connect('mongodb://127.0.0.1:27017/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB connected!');
});








// --------------------------------------------------
//   Set App
// --------------------------------------------------

const app = express();


// ---------------------------------------------
//   Middleware Settings
// ---------------------------------------------

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// ---------------------------------------------
//   View Engine
// ---------------------------------------------

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// ---------------------------------------------
//   Router
// ---------------------------------------------

app.use('*', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });


// --------------------------------------------------
//   Router: 404
// --------------------------------------------------

app.use((req, res, next) => {
  
  const err = new Error('Not Found');
  err.status = 404;

  return res.render('error', {
    status: err.status,
  });
  
});


// --------------------------------------------------
//   Error Handler
// --------------------------------------------------

// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.use((err, req, res, next) => {
  
  // log.error(err);

  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403);
  } else {
    res.status(err.status || 500);
  }

  return res.render('error', {
    message: err.message,
    status: err.status || 500,
  });
  
});


module.exports = app;
