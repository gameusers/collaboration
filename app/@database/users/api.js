// --------------------------------------------------
//   File ID: EOnyUrk82
// --------------------------------------------------

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
const multer  = require('multer');
const upload = multer({ dest: 'static/' });
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const shortid = require('shortid');
const moment = require('moment');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../@modules/csrf');
const { verifyRecaptcha } = require('../../@modules/recaptcha');
const { encrypt }  = require('../../@modules/crypto');
const { errorCodeIntoErrorObj } = require('../../@modules/error/error-obj');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validation_id } = require('../../@validations/_id');

const { validationUsersLoginID } = require('./validations/login-id');
const { validationUsersLoginIDServer } = require('./validations/login-id-server');
const { validationUsersLoginPassword } = require('./validations/login-password');
const { validationUsersEmailServer } = require('./validations/email-server');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelUsers = require('./model');
const SchemaUsers = require('../../@database/users/schema');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { addLocaleData } = require('react-intl');
const en = require('react-intl/locale-data/en');
const ja = require('react-intl/locale-data/ja');
addLocaleData([...en, ...ja]);

const { locale } = require('../../@locales/locale');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();




// --------------------------------------------------
//   Status Code & Error Arguments Object
// --------------------------------------------------

let statusCode = 400;

let errorArgumentsObj = {
  fileID: 'EOnyUrk82',
  functionID: '',
  messageCode: '',
  errorCodeArr: [],
  errorObj: {},
  usersLogin_id: ''
};




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

router.post('/login', upload.none(), (req, res, next) => {
  
  passport.authenticate('local', async (err, user, info) => {
    
    
    // --------------------------------------------------
    //   Locale
    // --------------------------------------------------
    
    const localeObj = locale({
      acceptLanguage: req.headers['accept-language']
    });
    
    
    
    try {
      
      
      // --------------------------------------------------
      //   POST 取得
      // --------------------------------------------------
      
      const { loginID, loginPassword, response } = req.body;
      
      
      // --------------------------------------------------
      //   ログインチェック
      // --------------------------------------------------
      
      if (req.isAuthenticated()) {
        throw new Error('Login Already');
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
      
      
      
      // ---------------------------------------------
      //   CSRF & reCAPTCHA
      // ---------------------------------------------
      
      verifyCsrfToken(req, res);
      await verifyRecaptcha({ response, remoteip: req.connection.remoteAddress });
      
      
      // --------------------------------------------------
      //   Validation
      // --------------------------------------------------
      
      const validationUsersLoginIDObj = validationUsersLoginID({ required: true, value: loginID });
      const validationUsersLoginPasswordObj = validationUsersLoginPassword({ required: true, value: loginPassword, loginID });
      
      // console.log(`\n---------- validationUsersLoginIDObj ----------\n`);
      // console.dir(JSON.parse(JSON.stringify(validationUsersLoginIDObj)));
      // console.log(`\n-----------------------------------\n`);
      
      // console.log(`\n---------- validationUsersLoginPasswordObj ----------\n`);
      // console.dir(JSON.parse(JSON.stringify(validationUsersLoginPasswordObj)));
      // console.log(`\n-----------------------------------\n`);
      
      if (validationUsersLoginIDObj.error || validationUsersLoginPasswordObj.error) {
        throw new Error('Validation');
      }
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if (err) {
        throw new Error('Passport 1');
      }
      
      
      if (!user) {
        
        
        // --------------------------------------------------
        //   Set Error Message
        // --------------------------------------------------
        
        let message = info.message;
        
        if (process.env.NODE_ENV === 'production') {
          message = 'ID、またはパスワードが間違っています';
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
      
      
    } catch (errorObj) {
      
      
      console.log(`\n---------- errorObj ----------\n`);
      console.dir(errorObj);
      console.log(`\n-----------------------------------\n`);
      
      
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
    
    // console.log(chalk`
    //   username: {green ${username}}
    //   password: {green ${password}}
    // `);
    
    
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
        return done(null, false, { message: 'ID、またはパスワードが間違っています' });
      }
      
      
      // --------------------------------------------------
      //   bcrypt でハッシュ化したパスワードを検証する
      //   参照：https://github.com/kelektiv/node.bcrypt.js#to-check-a-password-1
      // --------------------------------------------------
      
      if (bcrypt.compareSync(password, user.loginPassword) === false) {
        return done(null, false, { message: 'ID、またはパスワードが間違っています' });
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
  
  
});




// --------------------------------------------------
//   アカウント作成 / 作成後ログインする
// --------------------------------------------------

// --------------------------------------------------
//   Follow / Function ID: y9FpGQjEA
// --------------------------------------------------

router.post('/create-account', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  errorArgumentsObj.functionID = 'y9FpGQjEA';
  
  let returnObj = {};
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   ログインチェック
    // --------------------------------------------------
    
    if (req.isAuthenticated()) {
      throw new Error('Login Already');
    }
    
    
    // --------------------------------------------------
    //   POST 取得
    // --------------------------------------------------
    
    const { loginID, loginPassword, email, response } = req.body;
    
    
    // // ---------------------------------------------
    // //   CSRF & reCAPTCHA
    // // ---------------------------------------------
    
    // verifyCsrfToken(req, res);
    // await verifyRecaptcha({ response, remoteip: req.connection.remoteAddress });
    
    
    
    
    // --------------------------------------------------
    //   パスワードハッシュ化
    // --------------------------------------------------
    
    const hashedPassword = bcrypt.hashSync(loginPassword, 10);
    
    
    // --------------------------------------------------
    //   E-Mail 暗号化
    // --------------------------------------------------
    
    let encryptedEmail = email ? encrypt(email) : '';
    
    
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    const val = async (func, argumentsObj, name) => {
      
      const validationObj = await func(argumentsObj);
      
      
      const title = name ? `${name} / ` : '';
      console.log(`\n---------- ${title}validationObj ----------\n`);
      console.dir(validationObj);
      console.log(`\n-----------------------------------\n`);
      
      
      if (validationObj.error) {
        errorArgumentsObj.messageCode = validationObj.messageCode;
        errorArgumentsObj.errorCodeArr = validationObj.errorCodeArr;
        throw new Error();
      }
      
      return validationObj;
      
    };
    
    
    // --------------------------------------------------
    //   Login ID
    // --------------------------------------------------
    
    // await val(validationUsersLoginIDServer, { value: loginID, usersLogin_id: 'jun-deE4J' }, 'Login ID');
    // await val(validationUsersEmailServer, { value: email, usersLogin_id: 'jun-deE4J', encryptedEmail }, 'E-Mail');
    
    await val(validationUsersLoginIDServer, { value: loginID }, 'Login ID');
    val(validationUsersLoginPassword, { required: true, value: loginPassword, loginID }, 'Login Password');
    await val(validationUsersEmailServer, { value: email, encryptedEmail }, 'E-Mail');
    
    
    // --------------------------------------------------
    //   Insert For Create Account
    // --------------------------------------------------
    
    const ISO8601 = moment().toISOString();
    const users_id = shortid.generate();
    const playerID = shortid.generate();
    
    const usersSaveArr = [
      {
        _id: users_id,
        createdDate: ISO8601,
        updatedDate: ISO8601,
        accessDate: ISO8601,
        level: 1,
        playerID,
        loginID,
        loginPassword: hashedPassword,
        email: encryptedEmail,
        country: 'JP',
        followArr: [],
        followCount: 0,
        followedArr: [],
        followedCount: 0,
        role: 'User'
      },
    ];
    
    const cardPlayersSaveArr = [
      {
        _id: shortid.generate(),
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id,
        language: 'ja',
        nameObj: {
          value: 'Name',
          search: true,
        },
        statusObj: {
          value: 'Status',
          search: true,
        },
        imagesAndVideosObj: {
          thumbnailArr: [],
          mainArr: [],
        },
        commentObj: {
          value: '',
          search: true,
        },
        ageObj: {
          value: '',
          alternativeText: '',
          search: true,
        },
        sexObj: {
          value: 'empty',
          alternativeText: '',
          search: true,
        },
        addressObj: {
          value: '',
          alternativeText: '',
          search: true,
        },
        gamingExperienceObj: {
          value: '',
          alternativeText: '',
          search: true,
        },
        hobbiesObj: {
          valueArr: [],
          search: true,
        },
        specialSkillsObj: {
          valueArr: [],
          search: true,
        },
        smartphoneObj: {
          model: '',
          comment: '',
          search: true,
        },
        tabletObj: {
          model: '',
          comment: '',
          search: true,
        },
        pcObj: {
          model: '',
          comment: '',
          specsObj: {
            os: '',
            cpu: '',
            cpuCooler: '',
            motherboard: '',
            memory: '',
            storage: '',
            graphicsCard: '',
            opticalDrive: '',
            powerSupply: '',
            pcCase: '',
            monitor: '',
            mouse: '',
            keyboard: ''
          },
          search: true,
        },
        hardwareActiveObj: {
          valueArr: [],
          search: true,
        },
        hardwareInactiveObj: {
          valueArr: [],
          search: true,
        },
        idArr: [],
        activityTimeObj: {
          valueArr: [],
          search: true,
        },
        lookingForFriendsObj: {
          value: true,
          icon: 'emoji_u263a',
          comment: '',
          search: true,
        },
        voiceChatObj: {
          value: true,
          comment: '',
          search: true,
        },
        linkArr: []
      },
    ];
    
    returnObj = await ModelUsers.insertForCreateAccount({ usersSaveArr, cardPlayersSaveArr });
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   loginID: {green ${loginID}}
    //   loginPassword: {green ${loginPassword}}
    //   email: {green ${email}}
    //   hashedPassword: {green ${hashedPassword}}
    //   encryptedEmail: {green ${encryptedEmail}}
    // `);
    
    console.log(`
      ----- returnObj -----\n
      ${util.inspect(returnObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    // ---------------------------------------------
    //   Return Json Object / Success
    // ---------------------------------------------
    
    return res.status(200).json(returnObj);
    
    
  } catch (errorObj) {
    // console.log(`
    //   ----- errorObj -----\n
    //   ${util.inspect(errorObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // ---------------------------------------------
    //   Error Object
    // ---------------------------------------------
    
    errorArgumentsObj.errorObj = errorObj;
    const resultErrorObj = errorCodeIntoErrorObj({ ...errorArgumentsObj });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
});

// router.post('/create-account', upload.none(), async (req, res) => {
  
  
//   // --------------------------------------------------
//   //   Logger
//   // --------------------------------------------------
  
//   const loggerPath = "/app/login/index/api/login.js\nrouter.post('/create-account')\n";
  
  
//   try {
    
    
//     // --------------------------------------------------
//     //   ログインチェック
//     // --------------------------------------------------
    
//     if (req.isAuthenticated()) {
//       // logger.log('error', `${loggerPath}Login Already`);
//       throw new Error('Login Already');
//     }
    
    
//     // ---------------------------------------------
//     //   CSRF & reCAPTCHA
//     // ---------------------------------------------
    
//     verifyCsrfToken(req, res);
//     await verifyRecaptcha(req, res);
    
    
//     // --------------------------------------------------
//     //   Model / Users / insert
//     // --------------------------------------------------
    
//     await ModelUsers.insert(req.body);
    
    
    
    
    
//     // ---------------------------------------------
//     //   Fetch - Login
//     // ---------------------------------------------
    
//     let resultLoginObj = {};
//     const urlApi = `${process.env.URL_API}/v1/login`;
    
    
//     // ----------------------------------------
//     //   Headers
//     // ----------------------------------------
    
//     const headersObj = {
//       'Accept': 'application/json',
//       'Cookie': req.headers.cookie
//     };
    
    
//     // ----------------------------------------
//     //   FormData
//     // ----------------------------------------
    
//     const formDataObj = new FormData();
    
//     formDataObj.append('loginID', req.body.createAccountID);
//     formDataObj.append('loginPassword', req.body.createAccountPassword);
//     // formDataObj.append('g-recaptcha-response', this.loginRecaptchaResponse);
//     // これをどうするか
    

    
//     await fetch(urlApi, {
//       method: 'POST',
//       credentials: 'same-origin',
//       mode: 'same-origin',
//       headers: headersObj,
//       body: formDataObj
//     })
//       .then((response) => {
        
//         if (!response.ok) {
//           throw new Error('作成したアカウントでログインできませんでした。');
//         }
        
//         return response.json();
        
//       })
//       .then((jsonObj) => {
        
//         resultLoginObj = jsonObj;
        
//       });
//       // .catch((error) => {
        
//       //   throw new Error();
        
//       // });
    
    
//     // --------------------------------------------------
//     //   Console 出力
//     // --------------------------------------------------
    
//     // console.log(chalk`
//     //   urlApi: {green ${urlApi}}
//     // `);
    
//     // console.log(`
//     //   err: \n${util.inspect(err, { colors: true, depth: null })}
//     // `);
    
//     // console.log(`
//     //   user: \n${util.inspect(user, { colors: true, depth: null })}
//     // `);
    
//     // console.log(`
//     //   info: \n${util.inspect(info, { colors: true, depth: null })}
//     // `);
    
//     console.log(`
//       resultLoginObj: \n${util.inspect(resultLoginObj, { colors: true, depth: null })}
//     `);
    
    
    
//     // --------------------------------------------------
//     //   Return Success JSON
//     // --------------------------------------------------
    
//     return res.status(201).json(resultLoginObj);
    
    
//   } catch (error) {
    
    
//     // logger.log('error', `${loggerPath}${error}`);
    
    
//     // --------------------------------------------------
//     //   Set Error Message
//     // --------------------------------------------------
    
//     let message = error.message;
    
//     if (process.env.NODE_ENV === 'production') {
//       message = 'Create Account';
//     }
    
    
//     // --------------------------------------------------
//     //   Return Error JSON
//     // --------------------------------------------------
    
//     return res.status(400).json({
//       errorsArr: [
//         {
//           code: 0,
//           message
//         },
//       ]
//     });
    
//   }
  
// });




// --------------------------------------------------
//   Logout / Function ID: lpePrqvT4
// --------------------------------------------------

router.post('/logout', upload.none(), function(req, res, next) {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  errorArgumentsObj.functionID = 'lpePrqvT4';
  
  
  
  
  try {
    
    
    // ---------------------------------------------
    //   CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // ---------------------------------------------
    //   ログアウト処理
    // ---------------------------------------------
    
    req.logout();
    
    
    // ---------------------------------------------
    //   Success
    // ---------------------------------------------
    
    return res.status(200).json({
      success: true
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
//   Follow / Function ID: uXe64jfMh
// --------------------------------------------------

router.post('/follow', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  errorArgumentsObj.functionID = 'uXe64jfMh';
  
  let returnObj = {};
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   CSRF
    // --------------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 401;
      errorArgumentsObj.errorCodeArr = ['xLLNIpo6a'];
      throw new Error();
    }
    
    const usersLogin_id = req.user._id;
    
    
    // --------------------------------------------------
    //   POST 取得 & Property
    // --------------------------------------------------
    
    const { users_id } = req.body;
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    const validationObj = validation_id({ required: true, value: users_id });
    
    if (validationObj.errorCodeArr.length > 0) {
      errorArgumentsObj.errorCodeArr = validationObj.errorCodeArr;
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   Model / Users / Follow
    // --------------------------------------------------
    
    returnObj = await ModelUsers.updateForFollow(usersLogin_id, users_id);
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   users_id: {green ${users_id}}
    // `);
    
    // console.log(`
    //   req.user: \n${util.inspect(req.user, { colors: true, depth: null })}
    //   req.query: \n${util.inspect(req.query, { colors: true, depth: null })}
    // `);
    
    // console.log(`
    //   ----- validation_idObj -----\n
    //   ${util.inspect(validation_idObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // ---------------------------------------------
    //   Return Json Object / Success
    // ---------------------------------------------
    
    return res.status(200).json(returnObj);
    
    
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




module.exports = router;