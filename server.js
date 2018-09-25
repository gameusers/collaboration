// --------------------------------------------------
//   Require
// --------------------------------------------------

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const flash = require("connect-flash");
const passport = require('passport');
const session = require('express-session');
// const Tokens = require('csrf');
// const tokens = new Tokens();
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const mobxReact = require('mobx-react');
const mongoose = require('mongoose');

// const Recaptcha = require('express-recaptcha').Recaptcha;

const { createCsrfToken } = require('./applications/common/modules/csrf');

const routerApi = require('./applications/common/routes/v1/');




// --------------------------------------------------
//   Server Side Rendering with useStaticRendering
//   https://github.com/mobxjs/mobx-react#server-side-rendering-with-usestaticrendering
// --------------------------------------------------

mobxReact.useStaticRendering(true);


// const recaptcha = new Recaptcha('6LfH2nAUAAAAANJ0OZstm88GPuTYHKSH5dxYVsud', '6LfH2nAUAAAAACfsSs_s2WvccDhE1gR6qDjhMuha');



// --------------------------------------------------
//   Server
// --------------------------------------------------

app.prepare().then(() => {
  
  const server = express();
  
  
  // --------------------------------------------------
  //   Middleware Settings
  // --------------------------------------------------
  
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({
    extended: true
  }));
  
  server.use(cookieParser());
  
  server.use(flash());
  
  server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 12 * 1000
    }
  }));
  
  server.use(passport.initialize());
  server.use(passport.session());
  
  
  
  // --------------------------------------------------
  //   Database API
  //   参考: http://thecodebarbarian.com/building-a-nextjs-app-with-mongodb.html
  // --------------------------------------------------
  
  mongoose.connect('mongodb://localhost:27017/gameusers', { useNewUrlParser: true });
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('MongoDB connected!');
  });
  
  
  // const envCopy = {};
  // for (let e in process.env) envCopy[e] = process.env[e];
  // console.dir(envCopy);
  
  
  // console.log(`process.env.VERIFY_CSRF = ${typeof process.env.VERIFY_CSRF}`);
  // console.log(`process.env.VERIFY_CSRF2 = ${typeof process.env.VERIFY_CSRF2}`);
  // console.log(`process.env.VERIFY_CSRF3 = ${process.env.VERIFY_CSRF3} / ${typeof process.env.VERIFY_CSRF3}`);
  
  // const number = 1;
  
  // if (number === '1') {
  //   console.log(`on`);
  // } else {
  //   console.log(`off`);
  // }
  
  
  const crypto = require('crypto');
  const cipers = crypto.getCiphers();
  console.log(`cipers = ${cipers}`);
  
  const hashes = crypto.getHashes();
  console.log(`hashes = ${hashes}`);
  
  
  

  // --------------------------------------------------
  //   Routing
  // --------------------------------------------------
  
  // API
  server.use('/api/v1/', routerApi);
  
  
  
  // ---------------------------------------------
  //   Login
  // ---------------------------------------------
  
  server.get('/login', (req, res) => {
    createCsrfToken(req, res);
    app.render(req, res, '/login', {});
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
    
    console.log(`req.session =`);
    console.dir(req.session);
    console.log(`req.user =`);
    console.dir(req.user);
    // console.log(`req.session.passport.user = ${req.session.passport.user}`);
    
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
  
  
  
  server.get('/a', (req, res) => {
    return app.render(req, res, '/b', req.query);
  });

  server.get('/b', (req, res) => {
    return app.render(req, res, '/a', req.query);
  });

  server.get('/test/:id', (req, res) => {
    return app.render(req, res, '/test', { id: req.params.id });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
  
});
