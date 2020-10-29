// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const mongoose = require('mongoose');

const cron = require('node-cron');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelNotifications = require('./app/@database/notifications/model.js');
const ModelWebPushes = require('./app/@database/web-pushes/model.js');


// ---------------------------------------------
//   API
// ---------------------------------------------

const routerApi = require('./app/@api/v1/');






// --------------------------------------------------
//   Server
// --------------------------------------------------

app.prepare().then(() => {


  // --------------------------------------------------
  //   express
  // --------------------------------------------------

  const server = express();

  // console.log('process.env.NODE_ENV = ' + process.env.NODE_ENV);
  // console.log('process.env.URL_API = ' + process.env.NEXT_PUBLIC_URL_API);
  // console.log('process.env.URL_MONGODB_DOCKER = ' + process.env.URL_MONGODB_DOCKER);
  // console.log('process.env.URL_MONGODB = ' + process.env.URL_MONGODB);


  // --------------------------------------------------
  //   Middleware Settings
  // --------------------------------------------------

  // server.use(bodyParser.json({
  //   limit: '50mb'
  // }));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({
    // limit: '50mb',
    extended: true
  }));


  server.use(cookieParser());

  server.use(flash());

  server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 12 * 60 * 60 // 12 hours
      // ttl: 14 * 24 * 60 * 60 // 14 days
    }),
    cookie: {
      // secure: true,
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 1000 // 12 hours
    }
  }));

  server.use(passport.initialize());
  server.use(passport.session());




  // --------------------------------------------------
  //   Database API
  //   参考: http://thecodebarbarian.com/building-a-nextjs-app-with-mongodb.html
  //   ユーザー認証を行う場合はこの形式で connect する | mongodb://username:password@host:port/database?options...
  //   参考：https://mongoosejs.com/docs/connections.html
  // --------------------------------------------------

  let urlMongoDB = `mongodb://${process.env.URL_MONGODB}/gameusers`;

  if (process.env.URL_MONGODB_DOCKER) {
    urlMongoDB = `mongodb://${process.env.URL_MONGODB_DOCKER}/gameusers?replicaSet=rs0`;
  }

  // const urlMongoDB = `mongodb://root:password@mongo1:27017`;

  // mongoose.connect('mongodb://localhost:27017/gameusers', {
  mongoose.connect(urlMongoDB, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('MongoDB connected!');
  });





  // --------------------------------------------------
  //   Cron - https://github.com/node-cron/node-cron
  // --------------------------------------------------

  // ---------------------------------------------
  //   - Notifications / 1分ごとに通知をチェックする
  // ---------------------------------------------

  cron.schedule('* * * * *', () => {
  // cron.schedule('*/20 * * * * *', () => {

    ModelNotifications.send({});
  });


  // ---------------------------------------------
  //   - Web Push Reset sendTodayCount
  //   送信カウントを0にする。一日に送信できる回数は決まっている。
  // ---------------------------------------------

  cron.schedule('0 0 0 * * *', () => {
  // cron.schedule('0 30 18 * * *', () => {
  // cron.schedule('*/20 * * * * *', () => {
    ModelWebPushes.resetSendTodayCount({});
  });




  // --------------------------------------------------
  //   Routing
  // --------------------------------------------------

  // API
  server.use('/api/v1/', routerApi);




  // ---------------------------------------------
  //   故意に Error 出力
  // ---------------------------------------------

  // server.get('/error', (req, res, next) => {
  //   throw new Error('故意のエラー');
  // });




  // ---------------------------------------------
  //   共通処理
  // ---------------------------------------------

  // const csrfToken = (req, res, next) => {
  //   createCsrfToken(req, res);
  //   next();
  // };




  // ---------------------------------------------
  //   Login
  // ---------------------------------------------

  // server.get('/login', csrfToken, (req, res, next) => {
  //   app.render(req, res, '/login', {});
  // });

  // server.get('/login/account', csrfToken, (req, res, next) => {
  //   app.render(req, res, '/login/account', {});
  // });




  // ---------------------------------------------
  //   Logout
  // ---------------------------------------------

  // server.get('/logout', csrfToken, (req, res, next) => {
  //   app.render(req, res, '/logout', {});
  // });




  // ---------------------------------------------
  //   GET
  // ---------------------------------------------

  server.get('*', (req, res) => {
    return handle(req, res);
  });


  // ---------------------------------------------
  //   POST
  //   これを追加しないとAPIのPOSTが機能しない
  //   https://github.com/zeit/next.js/issues/7960
  // ---------------------------------------------

  server.post('*', (req, res) => {
    return handle(req, res);
  });




  // ---------------------------------------------
  //   Error
  // ---------------------------------------------

  server.use((err, req, res, next) => {
    // logger.error(`${err}`);
    // console.log(`Error: ${err}`);

    res.status(err.status || 500);
    res.send('Error');
  });


  // ---------------------------------------------
  //   listen
  // ---------------------------------------------

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });


});
