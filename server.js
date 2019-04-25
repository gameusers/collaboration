// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   .env
// ---------------------------------------------

require('dotenv').config();


// ---------------------------------------------
//   Console
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const express = require('express');
const helmet = require('helmet');
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

const mobxReact = require('mobx-react');
const mongoose = require('mongoose');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { createCsrfToken } = require('./app/@modules/csrf');


// ---------------------------------------------
//   API
// ---------------------------------------------

const routerApi = require('./app/@api/v1/');




// --------------------------------------------------
//   Server Side Rendering with useStaticRendering
//   https://github.com/mobxjs/mobx-react#server-side-rendering-with-usestaticrendering
// --------------------------------------------------

mobxReact.useStaticRendering(true);




// --------------------------------------------------
//   Server
// --------------------------------------------------

app.prepare().then(() => {
  
  const server = express();
  
  
  // --------------------------------------------------
  //   Middleware Settings
  // --------------------------------------------------
  
  server.use(helmet());
  
  // server.use(bodyParser.json({
  //   limit: '50mb'
  // }));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({
    // limit: '50mb',
    extended: true
  }));
  
  // app.use(bodyParser.json({limit: '50mb'}));
  // app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  
  // server.use(express.json({
  //   limit: '50mb'
  // }));
  
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
  // --------------------------------------------------
  
  mongoose.connect('mongodb://localhost:27017/gameusers', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('MongoDB connected!');
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
  
  const csrfToken = (req, res, next) => {
    createCsrfToken(req, res);
    next();
  };
  
  
  
  
  // ---------------------------------------------
  //   Login
  // ---------------------------------------------
  
  server.get('/login', csrfToken, (req, res, next) => {
    app.render(req, res, '/login', {});
  });
  
  server.get('/login/account', csrfToken, (req, res, next) => {
    app.render(req, res, '/login/account', {});
  });
  
  
  
  
  // ---------------------------------------------
  //   Logout
  // ---------------------------------------------
  
  server.get('/logout', csrfToken, (req, res, next) => {
    app.render(req, res, '/logout', {});
  });
  
  
  
  
  // ---------------------------------------------
  //   Player
  // ---------------------------------------------
  
  server.get('/pl/:param1/settings', (req, res) => {
    const { param1 } = req.params;
    app.render(req, res, '/pl/settings', { param1 });
  });
  
  
  server.get('/pl/:param1*', (req, res) => {
    
    const { param1 } = req.params;
    
    if (!param1) {
      app.render(req, res, '/pl/index', req.query);
    }
    
    app.render(req, res, '/pl/player', { param1 });
    
  });
  
  
  
  
  
  
  
  
  
  // ---------------------------------------------
  //   Game Community
  // ---------------------------------------------
  
  server.get('/gc/:param1', (req, res) => {
    
    // console.log(`req.url = ${req.url}`);
    // console.log(`parse(req.url).pathname = ${parse(req.url).pathname}`);
    
    const { param1 } = req.params;
    
    if (!param1) {
      app.render(req, res, '/gc/index', req.query);
    }
    
    app.render(req, res, '/gc/community', { param1 });
  });
  
  server.get('/gc/:param1/:param2', (req, res) => {
    const { param1, param2 } = req.params;
    app.render(req, res, '/gc/community', { param1, param2 });
  });
  
  server.get('/gc/:param1/:param2/:param3', (req, res) => {
    const { param1, param2, param3 } = req.params;
    app.render(req, res, '/gc/community', { param1, param2, param3 });
  });
  
  
  
  
  // ---------------------------------------------
  //   User Community
  // ---------------------------------------------
  
  server.get('/uc/:param1*', (req, res) => {
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    console.log(`
      req.session: \n${util.inspect(req.session, { colors: true, depth: null })}
    `);
    
    console.log(`
      req.user: \n${util.inspect(req.user, { colors: true, depth: null })}
    `);
    
    console.log(chalk`
      req.isAuthenticated(): {green ${req.isAuthenticated()}}
    `);
    
    
    const { param1 } = req.params;
    
    if (!param1) {
      app.render(req, res, '/uc/index', req.query);
    }
    
    const queryObj = {
      param1
    };
    
    app.render(req, res, '/uc/community', queryObj);
    
  });
  
  server.get('/uc/:param1/member', (req, res) => {
    const { param1 } = req.params;
    app.render(req, res, '/uc/community/member', { param1 });
  });
  
  
  
  // server.get('/uc/:param1/:param2', (req, res) => {
  //   const { param1, param2 } = req.params;
  //   return app.render(req, res, '/uc/community', { param1, param2 });
  // });
  
  // server.get('/uc/:param1/:param2/:param3', (req, res) => {
  //   const { param1, param2, param3 } = req.params;
  //   return app.render(req, res, '/uc/community', { param1, param2, param3 });
  // });
  
  
  
  // server.get('/a', (req, res) => {
  //   return app.render(req, res, '/b', req.query);
  // });

  // server.get('/b', (req, res) => {
  //   return app.render(req, res, '/a', req.query);
  // });

  // server.get('/test/:id', (req, res) => {
  //   return app.render(req, res, '/test', { id: req.params.id });
  // });
  
  
  
  
  // ---------------------------------------------
  //   Error
  // ---------------------------------------------
  
  server.get('*', (req, res) => {
    return handle(req, res);
  });
  
  
  server.use((err, req, res, next) => {
    // logger.error(`${err}`);
    console.log(`Error: ${err}`);
    
    res.status(err.status || 500);
    res.send('Error');
  });
  
  
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
  
});
