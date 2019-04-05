// --------------------------------------------------
//   File ID: H8RcPtx7P
// --------------------------------------------------

// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'static/' });
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const fetch = require('isomorphic-unfetch');
const FormData = require('form-data');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../@modules/csrf');
const { verifyRecaptcha } = require('../../../@modules/recaptcha');
const { errorCodeIntoErrorObj } = require('../../../@modules/error/error-obj');


// ---------------------------------------------
//   Validation
// ---------------------------------------------

const validationLoginID = require('../../../@database/users/validations/login-id');
const { validationLoginPassword } = require('../../../@database/users/validations/login-password');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelUsers = require('../../../@database/users/model');
const SchemaUsers = require('../../../@database/users/schema');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { addLocaleData } = require('react-intl');
const en = require('react-intl/locale-data/en');
const ja = require('react-intl/locale-data/ja');
addLocaleData([...en, ...ja]);

const { locale } = require('../../../@locales/locale');


// ---------------------------------------------
//   Logger
// ---------------------------------------------

const logger = require('../../../@modules/logger');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();




// --------------------------------------------------
//   Status Code & Error Arguments Object
// --------------------------------------------------

let statusCode = 400;

let errorArgumentsObj = {
  fileID: 'H8RcPtx7P',
  functionID: '',
  errorCodeArr: [],
  errorObj: {},
  usersLogin_id: ''
};




router.post('/test', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Set Variables
  // --------------------------------------------------
  
  const { response } = req.body;
  
  
  // ---------------------------------------------
  //   CSRF & reCAPTCHA
  // ---------------------------------------------
  
  verifyCsrfToken(req, res);
  await verifyRecaptcha({ response, remoteip: req.connection.remoteAddress });
  
  
});



// --------------------------------------------------
//   Initial Props / Function ID: aNvBIBitq
// --------------------------------------------------

router.get('/initial-props', upload.none(), (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  errorArgumentsObj.functionID = 'aNvBIBitq';
  
  
  try {
    
    
    // --------------------------------------------------
    //   ログインチェック
    // --------------------------------------------------
    
    const login = req.isAuthenticated() ? true : false;
    
    
    // ---------------------------------------------
    //   Success
    // ---------------------------------------------
    
    return res.status(200).json({
      login
    });
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   Error Object
    // ---------------------------------------------
    
    errorArgumentsObj.errorObj = errorObj;
    const resultErrorObj = errorCodeIntoErrorObj({ localeObj, ...errorArgumentsObj });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
  
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

router.post('/', upload.none(), (req, res, next) => {
  
  passport.authenticate('local', async (err, user, info) => {
    
    
    try {
      
      
      // --------------------------------------------------
      //   Set Variables
      // --------------------------------------------------
      
      const { loginID, loginPassword } = req.body;
      
      
      // --------------------------------------------------
      //   ログインチェック
      // --------------------------------------------------
      
      if (req.isAuthenticated()) {
        logger.log('error', `/app/login/index/api/login.js\nrouter.post('/')\nLogin Already`);
        throw new Error('Login Already');
      }
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(chalk`
      //   loginID: {green ${loginID}}
      //   loginPassword: {green ${loginPassword}}
      //   req.isAuthenticated(): {green ${req.isAuthenticated()}}
      // `);
      
      // console.log(`
      //   req.session: \n${util.inspect(req.session, { colors: true, depth: null })}
      // `);
      
      // console.log(`
      //   req.user: \n${util.inspect(req.user, { colors: true, depth: null })}
      // `);
      
      // console.log(`
      //   err: \n${util.inspect(err, { colors: true, depth: null })}
      // `);
      
      // console.log(`
      //   user: \n${util.inspect(user, { colors: true, depth: null })}
      // `);
      
      // console.log(`
      //   info: \n${util.inspect(info, { colors: true, depth: null })}
      // `);
      
      
      
      // ---------------------------------------------
      //   CSRF & reCAPTCHA
      // ---------------------------------------------
      
      verifyCsrfToken(req, res);
      await verifyRecaptcha(req, res);
      
      
      // --------------------------------------------------
      //   Validation
      // --------------------------------------------------
      
      const validationLoginIDObj = validationLoginID(loginID);
      const validationLoginPasswordObj = validationLoginPassword(loginPassword);
      
      if (validationLoginIDObj.error || validationLoginPasswordObj.error) {
        logger.log('error', `/app/login/index/api/login.js / router.post('/') / Validation`);
        throw new Error('Validation');
      }
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if (err) {
        logger.log('error', `/app/login/index/api/login.js / router.post('/') / Error: ${err}`);
        throw new Error('Passport 1');
      }
      
      
      if (!user) {
        
        
        // --------------------------------------------------
        //   Set Error Message
        // --------------------------------------------------
        
        let message = info.message;
        
        if (process.env.NODE_ENV === 'production') {
          message = 'ID、またはパスワードが間違っています。';
        }
        
        
        // --------------------------------------------------
        //   Return Error JSON
        // --------------------------------------------------
        
        return res.status(401).json({
          errorsArr: [
            {
              code: 'H0eMuApu6',
              message
            },
          ]
        });
        
      }
      
      
      // ---------------------------------------------
      //   req.logIn - この記述はカスタムコールバックに必要らしい
      // ---------------------------------------------
      
      req.logIn(user, function(err) {
        
        
        // ---------------------------------------------
        //   Error
        // ---------------------------------------------
        
        if (err) {
          throw new Error('Passport 2');
        }
        
        
        // ---------------------------------------------
        //   Success
        // ---------------------------------------------
        
        return res.status(200).json({
          playerID: req.user.playerID
        });
        
        
      });
      
      
    } catch (error) {
      
      // console.log(chalk`
      //   error.message: {red ${error.message}}
      // `);
      
      
      // --------------------------------------------------
      //   Set Error Message
      // --------------------------------------------------
      
      let message = error.message;
      
      if (process.env.NODE_ENV === 'production') {
        message = 'Login';
      }
      
      
      // --------------------------------------------------
      //   Return Error JSON
      // --------------------------------------------------
      
      return res.status(400).json({
        errorsArr: [
          {
            code: 0,
            message
          },
        ]
      });
      
      
    }
    
  })(req, res, next);
  
});


// --------------------------------------------------
//   Passport Local：ID & Password 認証
// --------------------------------------------------

passport.use(new LocalStrategy({
    usernameField: 'loginID',
    passwordField: 'loginPassword'
  },
  (username, password, done) => {
    
    console.log(chalk`
      username: {green ${username}}
      password: {green ${password}}
    `);
    
    
    SchemaUsers.findOne({ loginID: username }, (err, user) => {
      
      
      // --------------------------------------------------
      //   Error
      // --------------------------------------------------
      
      if (err) {
        return done(err);
      }
      
      
      // --------------------------------------------------
      //   Error：ユーザーが存在しない
      // --------------------------------------------------
      
      if (!user) {
        return done(null, false, { message: 'Incorrect Login ID.' });
      }
      
      
      // --------------------------------------------------
      //   bcrypt でハッシュ化したパスワードを検証する
      //   参照：https://github.com/kelektiv/node.bcrypt.js#to-check-a-password-1
      // --------------------------------------------------
      
      if (bcrypt.compareSync(password, user.loginPassword) === false) {
        return done(null, false, { message: 'Incorrect Login Password.' });
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
  done(null, user._id);
});


// --------------------------------------------------
//   デシリアライズ
//   セッション変数を受け取って中身を検証する
//   データベースからログインユーザーデータを取得して返す
//   返ってきたユーザーデータは各 router の req.user から参照できる
// --------------------------------------------------

passport.deserializeUser(async (id, done) => {
  
  
  // --------------------------------------------------
  //   データ取得 / Users
  //   ログインユーザー情報
  // --------------------------------------------------
  
  const usersObj = await ModelUsers.findOneForUser({
    localeObj: {},
    conditionObj: { _id: id },
    usersLogin_id: id
  });
  
  let usersLoginObj = usersObj[id];
  usersLoginObj._id = id;
  
  // console.log(`\n---------- usersLoginObj ----------\n`);
  // console.dir(JSON.parse(JSON.stringify(usersLoginObj)));
  // console.log(`\n-----------------------------------\n`);
  
  
  done(null, usersLoginObj);
  
  
  // SchemaUsers.findOne({ _id: id }, (err, user) => {
    
  //   // console.log(`
  //   //   deserializeUser user ${new Date()}: \n${util.inspect(user, { colors: true, depth: null })}
  //   // `);
    
    
  //   // --------------------------------------------------
  //   //   ここで req.user に送る情報を選択する
  //   // --------------------------------------------------
    
  //   const usersObj = {
  //     _id: user._id,
  //     // name: user.name,
  //     // status: user.status,
  //     accessDate: user.accessDate,
  //     level: user.level,
  //     playerID: user.playerID,
  //     role: user.role,
  //   };
    
  //   done(err, usersObj);
    
    
  // });
  
});




// --------------------------------------------------
//   アカウント作成 / 作成後ログインする
// --------------------------------------------------

router.post('/create-account', upload.none(), async (req, res) => {
  
  
  // --------------------------------------------------
  //   Logger
  // --------------------------------------------------
  
  const loggerPath = "/app/login/index/api/login.js\nrouter.post('/create-account')\n";
  
  
  try {
    
    
    // --------------------------------------------------
    //   ログインチェック
    // --------------------------------------------------
    
    if (req.isAuthenticated()) {
      logger.log('error', `${loggerPath}Login Already`);
      throw new Error('Login Already');
    }
    
    
    // ---------------------------------------------
    //   CSRF & reCAPTCHA
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    await verifyRecaptcha(req, res);
    
    
    // --------------------------------------------------
    //   Model / Users / insert
    // --------------------------------------------------
    
    await ModelUsers.insert(req.body);
    
    
    
    
    
    // ---------------------------------------------
    //   Fetch - Login
    // ---------------------------------------------
    
    let resultLoginObj = {};
    const urlApi = `${process.env.URL_API}/v1/login`;
    
    
    // ----------------------------------------
    //   Headers
    // ----------------------------------------
    
    const headersObj = {
      'Accept': 'application/json',
      'Cookie': req.headers.cookie
    };
    
    
    // ----------------------------------------
    //   FormData
    // ----------------------------------------
    
    const formDataObj = new FormData();
    
    formDataObj.append('loginID', req.body.createAccountID);
    formDataObj.append('loginPassword', req.body.createAccountPassword);
    // formDataObj.append('g-recaptcha-response', this.loginRecaptchaResponse);
    // これをどうするか
    

    
    await fetch(urlApi, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      headers: headersObj,
      body: formDataObj
    })
      .then((response) => {
        
        if (!response.ok) {
          throw new Error('作成したアカウントでログインできませんでした。');
        }
        
        return response.json();
        
      })
      .then((jsonObj) => {
        
        resultLoginObj = jsonObj;
        
      });
      // .catch((error) => {
        
      //   throw new Error();
        
      // });
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   urlApi: {green ${urlApi}}
    // `);
    
    // console.log(`
    //   err: \n${util.inspect(err, { colors: true, depth: null })}
    // `);
    
    // console.log(`
    //   user: \n${util.inspect(user, { colors: true, depth: null })}
    // `);
    
    // console.log(`
    //   info: \n${util.inspect(info, { colors: true, depth: null })}
    // `);
    
    console.log(`
      resultLoginObj: \n${util.inspect(resultLoginObj, { colors: true, depth: null })}
    `);
    
    
    
    // --------------------------------------------------
    //   Return Success JSON
    // --------------------------------------------------
    
    return res.status(201).json(resultLoginObj);
    
    
  } catch (error) {
    
    
    logger.log('error', `${loggerPath}${error}`);
    
    
    // --------------------------------------------------
    //   Set Error Message
    // --------------------------------------------------
    
    let message = error.message;
    
    if (process.env.NODE_ENV === 'production') {
      message = 'Create Account';
    }
    
    
    // --------------------------------------------------
    //   Return Error JSON
    // --------------------------------------------------
    
    return res.status(400).json({
      errorsArr: [
        {
          code: 0,
          message
        },
      ]
    });
    
  }
  
});





module.exports = router;