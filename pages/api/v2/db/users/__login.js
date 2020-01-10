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

const shortid = require('shortid');
const moment = require('moment');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelUsers = require('../../../../../app/@database/users/model');
const SchemaUsers = require('../../../../../app/@database/users/schema');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../../../app/@modules/csrf');
const { verifyRecaptcha } = require('../../../../../app/@modules/recaptcha');
const { returnErrorsArr } = require('../../../../../app/@modules/log/log');
const { CustomError } = require('../../../../../app/@modules/error/custom');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationIP } = require('../../../../../app/@validations/ip');
const { validationUsersLoginID } = require('../../../../../app/@database/users/validations/login-id');
// const { validationUsersLoginIDServer } = require('../../../../../app/@database/users/validations/login-id-server');
const { validationUsersLoginPassword } = require('../../../../../app/@database/users/validations/login-password');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');




// --------------------------------------------------
//   endpointID: Eyn7nlII5
// --------------------------------------------------

// --------------------------------------------------
//   ログイン Passport：Local（ID & Password） / endpointID: ZVCmdUTHQ
//   
//   参考：
//  　 http://www.passportjs.org/docs/username-password/
//   
//   参考 カスタムコールバック：
//     http://www.passportjs.org/docs/authenticate/
//     http://knimon-software.github.io/www.passportjs.org/guide/authenticate/
// --------------------------------------------------

export default async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Status Code
  // --------------------------------------------------
  
  let statusCode = 400;
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  // const localeObj = locale({
  //   acceptLanguage: req.headers['accept-language']
  // });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  // const returnObj = {};
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  
  passport.authenticate('local', async (err, user, info) => {
    
    
    try {
      
      
      // --------------------------------------------------
      //   POST Data
      // --------------------------------------------------
      
      const bodyObj = JSON.parse(req.body);
      
      const { 
        
        loginID,
        loginPassword,
        response,
        
      } = bodyObj;
      
      
      // --------------------------------------------------
      //   Log Data
      // --------------------------------------------------
      
      lodashSet(requestParametersObj, ['loginID'], loginID ? '******' : '');
      lodashSet(requestParametersObj, ['loginPassword'], loginPassword ? '******' : '');
      
      
      
      
      // ---------------------------------------------
      //   Verify CSRF
      // ---------------------------------------------
      
      verifyCsrfToken(req, res);
      
      
      // ---------------------------------------------
      //   Verify reCAPTCHA
      // ---------------------------------------------
      
      await verifyRecaptcha({ response, remoteip: req.connection.remoteAddress });
      
      
      // --------------------------------------------------
      //   Login Check
      // --------------------------------------------------
      
      if (req.isAuthenticated()) {
        statusCode = 401;
        throw new CustomError({ level: 'warn', errorsArr: [{ code: 'yyaAiB5f-', messageID: 'V9vI1Cl1S' }] });
      }
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      console.log(chalk`
        loginID: {green ${loginID}}
        loginPassword: {green ${loginPassword}}
        response: {green ${response}}
        req.isAuthenticated(): {green ${req.isAuthenticated()}}
      `);
      
      console.log(`
        ----- user -----\n
        ${util.inspect(user, { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      
      // --------------------------------------------------
      //   Validation
      // --------------------------------------------------
      
      await validationIP({ throwError: true, value: req.ip });
      await validationUsersLoginID({ throwError: true, required: true, value: loginID });
      await validationUsersLoginPassword({ throwError: true, required: true, value: loginPassword, loginID });
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if (err) {
        throw new CustomError({ level: 'warn', errorsArr: [{ code: 'BBoMlwE0o-', messageID: 'Error' }] });
      }
      
      if (!user) {
        statusCode = 401;
        throw new CustomError({ level: 'warn', errorsArr: [{ code: 'H0eMuApu6', messageID: 'RIj4SCt_s' }] });
      }
      
      
      // ---------------------------------------------
      //   req.logIn - この記述はカスタムコールバックに必要らしい
      // ---------------------------------------------
      
      req.logIn(user, function(err) {
        
        
        // ---------------------------------------------
        //   Error
        // ---------------------------------------------
        
        if (err) {
          throw new CustomError({ level: 'warn', errorsArr: [{ code: '5PzzF23_V', messageID: 'Error' }] });
        }
        
        
        // ---------------------------------------------
        //   Success
        // ---------------------------------------------
        
        return res.status(200).json({
          userID: req.user.userID
        });
        
        
      });
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Log
      // ---------------------------------------------
      
      const resultErrorObj = returnErrorsArr({
        errorObj,
        endpointID: 'Eyn7nlII5',
        users_id: loginUsers_id,
        ip: req.ip,
        requestParametersObj,
      });
      
      
      // --------------------------------------------------
      //   Return JSON Object / Error
      // --------------------------------------------------
      
      return res.status(statusCode).json(resultErrorObj);
      
      
    }
    
    
  })(req, res, next);
  
  
};




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
        return done(null, false, {});
      }
      
      
      // --------------------------------------------------
      //   bcrypt でハッシュ化したパスワードを検証する
      //   参照：https://github.com/kelektiv/node.bcrypt.js#to-check-a-password-1
      // --------------------------------------------------
      
      if (bcrypt.compareSync(password, user.loginPassword) === false) {
        return done(null, false, {});
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
    loginUsers_id: id
  });
  
  let loginUsersObj = usersObj[id];
  loginUsersObj._id = id;
  
  console.log(`\n---------- loginUsersObj ----------\n`);
  console.dir(JSON.parse(JSON.stringify(loginUsersObj)));
  console.log(`\n-----------------------------------\n`);
  
  
  done(null, loginUsersObj);
  
  
});