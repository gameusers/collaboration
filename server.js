// --------------------------------------------------
//   Require
// --------------------------------------------------

require('dotenv').config();

const express = require('express');
// const multer  = require('multer');
// const upload = multer({ dest: 'static/' });
const bodyParser = require('body-parser');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const mobxReact = require('mobx-react');
const mongoose = require('mongoose');

const api = require('./applications/common/routes/api');



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
  
  
  
//   ------WebKitFormBoundaryP3P5Vh3OWtMe045z
// ↵Content-Disposition: form-data; name"
// :
// ""loginId"
// ↵
// ↵BM4TePAPnxH
// ↵------WebKitFormBoundaryP3P5Vh3OWtMe045z
// ↵Content-Disposition: form-data; name="loginPassword"
// ↵
// ↵BM4TePAPnxHc
// ↵------WebKitFormBoundaryP3P5Vh3OWtMe045z--
// ↵
  
  // server.post('/api', upload.none(), (req, res) => {
  //   console.log(`req.body.loginId = ${req.body.loginId}`);
  //   res.json({ 'error': false, 'message': 'Success', 'loginId': req.body });
  //   // const { param1 } = req.params;
  //   // app.render(req, res, '/uc/community/member', { param1 });
  // });
  
  

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
