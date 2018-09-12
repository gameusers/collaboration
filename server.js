// --------------------------------------------------
//   Require
// --------------------------------------------------

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const multer  = require('multer');
const upload = multer({ dest: 'static/' });

const flash = require("connect-flash");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const mobxReact = require('mobx-react');
const mongoose = require('mongoose');

const api = require('./applications/common/routes/api');


const ModelUsers = require('./applications/common/schemas/users');



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
  
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({
    extended: true
  }));
  
  server.use(flash());
  
  server.use(session({
    secret: '0U-X7lOMwp-kqFgakKj8w87nt8y6kA4i',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: null
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
  
  // server.use((req, res, next) => {
  //   req.db = db;
  //   next();
  // });
  
  // CORSを許可する
  // server.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //   next();
  // });
  
  
  server.post('/login',
    upload.none(),
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login/social',
      failureFlash: true
    })
  );
  
  passport.use(new LocalStrategy({
      usernameField: 'loginId',
      passwordField: 'loginPassword'
    },
    function(username, password, done) {
      
      console.log(`LocalStrategy`);
      console.log(`username = ${username}`);
      console.log(`password = ${password}`);
      
      ModelUsers.findOne({ loginId: username }, function(err, userObj) {
        console.log(`ModelUsers.findOne / user = ${userObj}`);
        
        if (err) {
          return done(err);
        }
        
        if (!userObj) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        
        if (userObj.loginPassword !== password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        
        return done(null, userObj);
        
      });
    }
  ));
  
  passport.serializeUser(function(user, done) {
    console.log(`passport.serializeUser`);
    console.dir(user);
    console.log(`user._id = ${user._id}`);
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
    console.log(`passport.deserializeUser / id = ${id}`);
    ModelUsers.findOne({_id: id}, function(err, user) {
      // console.dir(user);
      done(err, user);
    });
  });
  
  
  

  // --------------------------------------------------
  //   Routing
  // --------------------------------------------------
  
  // API
  server.use('/api', api(db));
  
  
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
    
    console.dir(req.session);
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
