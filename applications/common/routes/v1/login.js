// --------------------------------------------------
//   Require
// --------------------------------------------------

const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'static/' });
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const fetch = require('isomorphic-unfetch');
const Tokens = require('csrf');
const tokens = new Tokens();
const shortid = require('shortid');
const chalk = require('chalk');



// ---------------------------------------------
//   Require: Model
// ---------------------------------------------

const ModelUsers = require('../../schemas/users');



// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();





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

router.post('/',upload.none(), function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    
    
    
    try {
      
    } catch (e) {
      
    } finally {
      
    }
    
    
    
    // ---------------------------------------------
    //   CSRF
    //   参考：https://garafu.blogspot.com/2017/04/nodejs-express-csrfprotection.html
    // ---------------------------------------------
    
    const secret = req.session._csrf;
    const token = req.cookies._csrf;
    
    console.log(chalk`
      secret: {red ${secret}}
      token: {green ${token}}
      tokens.verify(secret, token): {rgb(255,131,0) ${tokens.verify(secret, token)}}
    `);
    // console.log(`secret = ${secret}`);
    // console.log(`token = ${token}`);
    // console.log(`tokens.verify(secret, token) = ${tokens.verify(secret, token)}`);
    
    
    // 秘密文字 と トークン の組み合わせが正しいか検証
    if (tokens.verify(secret, token) === false) {
      console.log(`Invalid Token`);
      throw new Error("Invalid Token");
    }
    
    
    const newSecret = tokens.secretSync();
    const newToken = tokens.create(newSecret);
    
    console.log(chalk`
      newSecret: {green ${newSecret}}
      newToken: {green ${newToken}}
    `);
    
    req.session._csrf = newSecret;
    res.cookie('_csrf', newToken);
    
    // delete req.session._csrf;
    // res.clearCookie("_csrf");
    
    
    
    // ---------------------------------------------
    //   reCAPTCHA
    // ---------------------------------------------
    
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body['g-recaptcha-response']}&remoteip=${req.connection.remoteAddress}`;
    
    fetch(verificationUrl, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then((response) => {
        
        if (response.ok) {
          return response.json();
        }
        
        throw new Error('Network response was not ok.');
        
      })
      .then((jsonObj) => {
        
        console.log(`then`);
        console.dir(jsonObj);
        
        // this.handleFormReset();
        
      })
      .catch((error) => {
        
        console.log(`catch: ${error}`);
        
      });
    
    
    console.log(chalk`
      process.env.RECAPTCHA_SITE_KEY: {red ${process.env.RECAPTCHA_SITE_KEY}}
      process.env.RECAPTCHA_SECRET_KEY: {green ${process.env.RECAPTCHA_SECRET_KEY}}
      req.body['g-recaptcha-response']: {rgb(255,131,0) ${req.body['g-recaptcha-response']}}
      verificationUrl: {green ${verificationUrl}}
    `);
    
    // if (req.recaptcha.error) {
    //   console.log(`recaptcha error`);
    // } else {
    //   console.log(`recaptcha success`);
    // }
    
    
    // console.log(`\n\nrouter.post - /api/v1/login`.bgRed);
    // consola.start(`--- /api/v1/login ---`);
    // console.log(`\n\n--- server.post('/login' ---`);
    // consola.success('success Method');
    // console.log('err ='.yellow);
    // console.dir(err);
    
    // console.log(colors.green('err = %s'), err);
    
    console.log(chalk`
      err: {red ${err}}
      user: {green ${user}}
      info: {rgb(255,131,0) ${info}}
    `);
    
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
      console.error(`\nエラー発生`);
      return res.status(400).json(errorObj);
      // return next(err);
    }
    
    if (!user) {
      console.error(`\n認証失敗 / ユーザーがない`);
      
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





// --------------------------------------------------
//   アカウント作成
// --------------------------------------------------

router.post('/createAccount', upload.none(), (req, res) => {
  
  // console.log(`req.body.loginId = ${req.body.loginId}`);
  // res.json({ 'error': false, 'message': 'Success', 'loginId': req.body.loginId });
  // err = ValidationError: level: Cast to Number failed for value "test" at path "level"
  
  console.log(chalk`
    req.body.createAccountId: {red ${req.body.createAccountId}}
    req.body.createAccountPassword: {green ${req.body.createAccountPassword}}
  `);
  
  
  
  // --------------------------------------------------
  //   Data
  // --------------------------------------------------
  
  // catch: Error: E11000 duplicate key error collection: gameusers.users index: _id_ dup key: { : "BenvfQDSk" }
  const _id = shortid.generate();
  const playerId = shortid.generate();
  
  const ModelUsersInstance = new ModelUsers({
    _id,
    loginId: req.body.createAccountId,
    loginPassword: req.body.createAccountPassword,
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


    
module.exports = router;