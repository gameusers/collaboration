// --------------------------------------------------
//   Require
// --------------------------------------------------

const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'static/' });
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const shortid = require('shortid');


// ---------------------------------------------
//   Require: Model
// ---------------------------------------------

const ModelUsers = require('../schemas/users');


// --------------------------------------------------
//   Router
// --------------------------------------------------

module.exports = db => {
  
  const router = express.Router();
  
  
  router.post('/', upload.none(), (req, res) => {
    
    // console.log(`req.body.loginId = ${req.body.loginId}`);
    // res.json({ 'error': false, 'message': 'Success', 'loginId': req.body.loginId });
    // err = ValidationError: level: Cast to Number failed for value "test" at path "level"
    
    
    // --------------------------------------------------
    //   Data
    // --------------------------------------------------
    
    const _id = shortid.generate();
    const playerId = shortid.generate();
    
    const ModelUsersInstance = new ModelUsers({
      _id,
      loginId: req.body.loginId,
      loginPassword: req.body.loginPassword,
      email: '',
      name: '',
      status: '',
      playerId,
      // level: 'AAA'
    });
    
    
    // --------------------------------------------------
    //   DB Insert
    // --------------------------------------------------
    
    ModelUsersInstance.save((err) => {
      console.log(`err = ${err}`);
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if (err) {
        
        // res.header('Content-Type', 'application/json; charset=utf-8');
        // console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);
        
        let message = err.message;
        
        if (process.env.NODE_ENV === 'production') {
          message = 'Error';
        }
        
        res.status(400).json({
          errorsArr: [
            {
              code: 0,
              message
            },
          ]
        });
        
        return;
        
      }
      
      
      // ---------------------------------------------
      //   Success
      // ---------------------------------------------
      
      res.status(201).json({
        loginId: req.body.loginId,
        playerId
      });
      
    });
    
  });
  
  
  
  // --------------------------------------------------
  //   ログイン Passport：Local（ID & Password）
  //   
  //   参考：
  //  　 http://www.passportjs.org/docs/username-password/
  //   
  //   参考 カスタムコールバック：
  //     http://www.passportjs.org/docs/authenticate/
  //     http://knimon-software.github.io/www.passportjs.org/guide/authenticate/
  // --------------------------------------------------
  
  router.post('/v1/login',upload.none(), function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      
      console.log(`\n\n--- server.post('/login' ---`);
      console.log(`\nerr =`);
      console.dir(err);
      console.log(`\nuser =`);
      console.dir(user);
      console.log(`\ninfo =`);
      console.dir(info);
      // console.log(`\nreq.flash() =`);
      // console.dir(req.flash());
      // console.log(`req.flash('message') = ${req.flash('message')}`);
      // console.dir(req.logIn);
      
      
      // ---------------------------------------------
      //   Error Object
      // ---------------------------------------------
      
      const errorObj = {
        errorsArr: [
          {
            code: 0,
            message: 'Error'
          },
        ]
      };
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if (err) {
        console.log(`\nエラー発生`);
        return res.status(400).json(errorObj);
        // return next(err);
      }
      
      if (!user) {
        console.log(`\n認証失敗 / ユーザーがない`);
        
        if (info.message) {
          errorObj.errorsArr[0].message = info.message;
        }
        
        return res.status(401).json(errorObj);
      }
      
      
      // ---------------------------------------------
      //   req.logIn - この記述はカスタムコールバックに必要らしい
      // ---------------------------------------------
      
      req.logIn(user, function(err) {
        
        console.log(`\nreq.logIn`);
        console.log(`\nerr =`);
        console.dir(err);
        // console.log(`err.name = ${err.name}`);
        // console.log(`err.status = ${err.status}`);
        
        
        // ---------------------------------------------
        //   Error
        // ---------------------------------------------
        
        if (err) {
          console.log(`\nエラー`);
          return res.status(400).json(errorObj);
          // return next(err);
        }
        
        
        // ---------------------------------------------
        //   Success
        // ---------------------------------------------
        
        return res.status(200).json({
          playerId: req.user.playerId
        });
        
      });
      
      
      console.log(`--- server.post('/login' End ---\n\n`);
      
    })(req, res, next);
  });
  
  
  // --------------------------------------------------
  //   Passport Local：ID & Password 認証
  // --------------------------------------------------
  
  passport.use(new LocalStrategy({
      usernameField: 'loginId',
      passwordField: 'loginPassword'
    },
    (username, password, done) => {
      
      console.log(`LocalStrategy`);
      // console.log(`username = ${username}`);
      // console.log(`password = ${password}`);
      
      ModelUsers.findOne({ loginId: username }, (err, user) => {
        // console.log(`ModelUsers.findOne / user = ${user}`);
        console.log(`err = ${err}`);
        console.log(`user = ${user}`);
        
        if (err) {
          return done(err);
        }
        
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        
        if (user.loginPassword !== password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        
        return done(null, user);
        
      });
    }
  ));
  
  
  // --------------------------------------------------
  //   シリアライズ
  //   認証時、DB/users コレクションの _id をセッションに保存する
  //   _id は req.session.passport.user に入っている
  // --------------------------------------------------
  
  passport.serializeUser((user, done) => {
    // console.log(`passport.serializeUser`);
    // console.dir(user);
    // console.log(`user._id = ${user._id}`);
    done(null, user._id);
  });
  
  
  // --------------------------------------------------
  //   デシリアライズ
  //   セッション変数を受け取って中身を検証する
  //   DB/users コレクションを _id で検索し、ユーザーデータを取得して返す
  //   返ってきたユーザーデータは各 router の req.user から参照できる
  // --------------------------------------------------
  
  passport.deserializeUser((id, done) => {
    // console.log(`passport.deserializeUser / id = ${id}`);
    ModelUsers.findOne({_id: id}, (err, user) => {
      // console.dir(user);
      done(err, user);
    });
  });
  
  
  
  return router;
  
};


    
    
    // ModelUsers.find({}, (err, obj) => {
      
    //   // console.log(`obj = ${obj}`);
    //   // console.log(`err = ${err}`);
      
    //   // console.log(`req = ${req}`);
      
    //   // res.type('application/json');
    //   // console.log(`AAA`);
      
    //   // if (typeof window !== 'undefined') {
    //   //   console.log(`api / width = ${window.innerWidth}`);
    //   // }
      
    //   // req.body.loginId
      
      
    //   if (err) {
    //     res.json({ 'error': true, 'message': 'Error executing MySQL query' });
    //   }
      
    //   res.json({ 'error': false, 'message': 'Success', 'loginId': req.body.loginId });
      
    //   // res.json({ 'error': false, 'message': 'Success', 'obj': 'AAA', req: req });
      
    // });
    


// const router = express.Router();

// router.get('/api', (req, res, next) => {

//   const db = req.db;

//   ModelUsers.find({}, (err, obj) => {
      
//     // console.log(`obj = ${obj}`);
//     // console.log(`err = ${err}`);
    
//     // res.type('application/json');
    
//     if (err) {
//       res.json({ 'error': true, 'message': 'Error executing MySQL query' });
//     }
    
//     console.log(`req.body.loginId = ${req.body.loginId}`);
//     res.json({ 'error': false, 'message': 'Success', 'loginId': req.body.loginId });
    
//     // res.json({ 'error': false, 'message': 'Success', 'obj': 'AAA' });
      
//   });
  
// });

// module.exports = router;



