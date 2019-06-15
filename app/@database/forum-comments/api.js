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
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../@modules/csrf');
const { verifyRecaptcha } = require('../../@modules/recaptcha');
const { encrypt }  = require('../../@modules/crypto');
const { errorCodeIntoErrorObj } = require('../../@modules/error/error-obj');
const { returnErrorsArr } = require('../../@modules/log/log');
const { CustomError } = require('../../@modules/error/custom');
const { sendMailConfirmation } = require('../../@modules/email');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatEmailSecret } = require('../../@format/email');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validation_id } = require('../../@validations/_id');

const { validationUsersLoginID } = require('./validations/login-id');
const { validationUsersLoginIDServer } = require('./validations/login-id-server');
const { validationUsersLoginPassword } = require('./validations/login-password');
const { validationUsersEmailServer } = require('./validations/email-server');
const { validationUsersPlayerIDServer } = require('./validations/player-id-server');
const { validationUsersPagesType, validationUsersPagesName, validationUsersPagesLanguage } = require('./validations/pages');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelUsers = require('./model');
const ModelEmailConfirmations = require('../../@database/email-confirmations/model');
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
let loginUsers_id = '';
let logLevel = 'error';

let errorArgumentsObj = {
  fileID: 'EOnyUrk82',
  functionID: '',
  messageCode: 'Error',
  errorCodeArr: ['Error'],
  errorObj: {},
  loginUsers_id: ''
};




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

router.post('/login', upload.none(), (req, res, next) => {
  
  passport.authenticate('local', async (err, user, info) => {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const requestParametersObj = {};
    
    
    try {
      
      
      // --------------------------------------------------
      //   POST Data
      // --------------------------------------------------
      
      const { loginID, loginPassword, response } = req.body;
      
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
      
      // console.log(chalk`
      //   loginID: {green ${loginID}}
      //   loginPassword: {green ${loginPassword}}
      //   response: {green ${response}}
      //   req.isAuthenticated(): {green ${req.isAuthenticated()}}
      // `);
      
      
      // --------------------------------------------------
      //   Validation
      // --------------------------------------------------
      
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
          playerID: req.user.playerID
        });
        
        
      });
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Log
      // ---------------------------------------------
      
      const resultErrorObj = returnErrorsArr({
        errorObj,
        endpointID: 'ZVCmdUTHQ',
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
  
  // console.log(`\n---------- loginUsersObj ----------\n`);
  // console.dir(JSON.parse(JSON.stringify(loginUsersObj)));
  // console.log(`\n-----------------------------------\n`);
  
  
  done(null, loginUsersObj);
  
  
});




// --------------------------------------------------
//   Create Account / endpointID: y9FpGQjEA
// --------------------------------------------------

router.post('/create-account', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const returnObj = {};
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const { loginID, loginPassword, email, response } = req.body;
    
    lodashSet(requestParametersObj, ['loginID'], loginID ? '******' : '');
    lodashSet(requestParametersObj, ['loginPassword'], loginPassword ? '******' : '');
    lodashSet(requestParametersObj, ['email'], email ? '******' : '');
    
    
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
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'L0w_PocQA', messageID: 'xLLNIpo6a' }] });
    }
    
    
    // --------------------------------------------------
    //   Hash Password
    // --------------------------------------------------
    
    const hashedPassword = bcrypt.hashSync(loginPassword, 10);
    
    
    // --------------------------------------------------
    //   Encrypt E-Mail
    // --------------------------------------------------
    
    const encryptedEmail = email ? encrypt(email) : '';
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    await validationUsersLoginIDServer({ value: loginID, loginUsers_id });
    await validationUsersLoginPassword({ throwError: true, required: true, value: loginPassword, loginID });
    await validationUsersEmailServer({ value: email, loginUsers_id, encryptedEmail });
    
    
    // --------------------------------------------------
    //   DB Insert
    // --------------------------------------------------
    
    const ISO8601 = moment().toISOString();
    const users_id = shortid.generate();
    const playerID = shortid.generate();
    const emailConfirmationID = `${shortid.generate()}${shortid.generate()}${shortid.generate()}`;
    
    
    const usersSaveArr = [{
      _id: users_id,
      createdDate: ISO8601,
      updatedDate: ISO8601,
      accessDate: ISO8601,
      playerID,
      loginID,
      loginPassword: hashedPassword,
      emailObj: {
        value: encryptedEmail,
        confirmation: false,
      },
      country: 'JP',
      termsOfServiceConfirmedDate: ISO8601,
      experience: 0,
      titleArr: [],
      followArr: [],
      followCount: 0,
      followedArr: [],
      followedCount: 0,
      role: 'User'
    }];
    
    
    const cardPlayersSaveArr = [{
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
    }];
    
    
    let emailConfirmationsSaveArr = [];
    
    if (email) {
      
      emailConfirmationsSaveArr = [{
        _id: shortid.generate(),
        isSuccess: false,
        createdDate: ISO8601,
        users_id,
        emailConfirmationID,
        email: encryptedEmail,
        count: 1,
      }];
      
    }
    
    
    await ModelUsers.transactionForCreateAccount({ usersSaveArr, cardPlayersSaveArr, emailConfirmationsSaveArr });
    
    
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
    //   Log
    // ---------------------------------------------
    
    const resultErrorObj = returnErrorsArr({
      errorObj,
      endpointID: 'y9FpGQjEA',
      users_id: loginUsers_id,
      ip: req.ip,
      requestParametersObj,
    });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
});




// --------------------------------------------------
//   Logout / endpointID: lpePrqvT4
// --------------------------------------------------

router.post('/logout', upload.none(), function(req, res, next) {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const returnObj = {};
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  try {
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // ---------------------------------------------
    //   ログアウト処理
    // ---------------------------------------------
    
    req.logout();
    
    
    // ---------------------------------------------
    //   Success
    // ---------------------------------------------
    
    return res.status(200).json(returnObj);
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   Log
    // ---------------------------------------------
    
    const resultErrorObj = returnErrorsArr({
      errorObj,
      endpointID: 'lpePrqvT4',
      users_id: loginUsers_id,
      ip: req.ip,
      requestParametersObj,
    });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
  
});




// --------------------------------------------------
//   ログイン情報編集 / endpointID: svr_ZaIOk
// --------------------------------------------------

router.post('/edit-account', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const returnObj = {};
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const { loginID, loginPassword } = req.body;
    
    lodashSet(requestParametersObj, ['loginID'], loginID ? '******' : '');
    lodashSet(requestParametersObj, ['loginPassword'], loginPassword ? '******' : '');
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 401;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'hGQuDAeuO', messageID: 'xLLNIpo6a' }] });
    }
    
    
    // --------------------------------------------------
    //   Hash Password
    // --------------------------------------------------
    
    const hashedPassword = bcrypt.hashSync(loginPassword, 10);
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    await validationUsersLoginIDServer({ value: loginID, loginUsers_id });
    await validationUsersLoginPassword({ throwError: true, required: true, value: loginPassword, loginID });
    
    
    // --------------------------------------------------
    //   Update
    // --------------------------------------------------
    
    const ISO8601 = moment().toISOString();
    
    const conditionObj = {
      _id: loginUsers_id
    };
    
    const saveObj = {
      $set: {
        updatedDate: ISO8601,
        loginID,
        loginPassword: hashedPassword,
      }
    };
    
    await ModelUsers.upsert({ conditionObj, saveObj });
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   loginID: {green ${loginID}}
    //   loginPassword: {green ${loginPassword}}
    //   hashedPassword: {green ${hashedPassword}}
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
    //   Log
    // ---------------------------------------------
    
    const resultErrorObj = returnErrorsArr({
      errorObj,
      endpointID: 'svr_ZaIOk',
      users_id: loginUsers_id,
      ip: req.ip,
      requestParametersObj,
    });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
  
});




// --------------------------------------------------
//   E-Mail登録 / endpointID: 14n6FEth2
// --------------------------------------------------

router.post('/email', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const returnObj = {};
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const { email, removeEmail } = req.body;
    
    lodashSet(requestParametersObj, ['email'], email ? '******' : '');
    lodashSet(requestParametersObj, ['removeEmail'], removeEmail);
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 401;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'Q88YJ5uJ7', messageID: 'xLLNIpo6a' }] });
    }
    
    
    // --------------------------------------------------
    //   Encrypt E-Mail
    // --------------------------------------------------
    
    const encryptedEmail = email ? encrypt(email) : '';
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    await validationUsersEmailServer({ value: email, loginUsers_id, encryptedEmail });
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const ISO8601 = moment().toISOString();
    
    
    
    
    // --------------------------------------------------
    //   E-Mailアドレスを空にする場合
    // --------------------------------------------------
    
    if (removeEmail) {
      
      
      // --------------------------------------------------
      //   Update - DB users
      // --------------------------------------------------
      
      const conditionObj = {
        _id: loginUsers_id
      };
      
      const saveObj = {
        $set: {
          updatedDate: ISO8601,
          emailObj: {
            value: '',
            confirmation: false,
          },
        }
      };
      
      await ModelUsers.upsert({ conditionObj, saveObj });
      
      
      // --------------------------------------------------
      //   E-Mail 伏せ字化
      // --------------------------------------------------
      
      returnObj.emailSecret = '';
      
      
    // --------------------------------------------------
    //   E-Mailアドレスを保存する場合
    // --------------------------------------------------
    
    } else if (email) {
      
      
      // --------------------------------------------------
      //   Find One / DB email-confirmations
      // --------------------------------------------------
      
      const emailConfirmationsDocObj = await ModelEmailConfirmations.findOne({ users_id: loginUsers_id });
      const emailConfirmations_id = lodashGet(emailConfirmationsDocObj, ['_id'], shortid.generate());
      const emailConfirmationsCount = lodashGet(emailConfirmationsDocObj, ['count'], 0);
      
      
      // --------------------------------------------------
      //   メールを送れるのは3回まで、それ以上はエラーにする
      // --------------------------------------------------
      
      if (emailConfirmationsCount >= 3) {
        throw new CustomError({ level: 'warn', errorsArr: [{ code: 'XzR7k_Fh3', messageID: 'EAvJztLfH' }] });
      }
      
      
      // --------------------------------------------------
      //   Upsert 
      //   E-Mailアドレスを変更して、メール確認用データベースにも保存する
      // --------------------------------------------------
      
      const usersConditionObj = {
        _id: loginUsers_id
      };
      
      const usersSaveObj = {
        $set: {
          updatedDate: ISO8601,
          emailObj: {
            value: encryptedEmail,
            confirmation: false,
          },
        }
      };
      
      
      const emailConfirmationsConditionObj = {
        _id: emailConfirmations_id
      };
      
      const emailConfirmationID = `${shortid.generate()}${shortid.generate()}${shortid.generate()}`;
      
      const emailConfirmationsSaveObj = {
        $set: {
          isSuccess: false,
          createdDate: ISO8601,
          users_id: loginUsers_id,
          emailConfirmationID,
          email: encryptedEmail,
          count: emailConfirmationsCount + 1,
        }
      };
      
      
      await ModelUsers.transactionForEditAccount({ usersConditionObj, usersSaveObj, emailConfirmationsConditionObj, emailConfirmationsSaveObj });
      
      
      // --------------------------------------------------
      //   E-Mail 伏せ字化
      // --------------------------------------------------
      
      returnObj.emailSecret = formatEmailSecret({ value: email });
      
      
      // --------------------------------------------------
      //   確認メール送信
      // --------------------------------------------------
      
      sendMailConfirmation({
        to: email,
        emailConfirmationID,
      });
      
      
    }
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   email: {green ${email}}
    //   encryptedEmail: {green ${encryptedEmail}}
    //   returnObj.emailSecret: {green ${returnObj.emailSecret}}
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
    //   Log
    // ---------------------------------------------
    
    const resultErrorObj = returnErrorsArr({
      errorObj,
      endpointID: '14n6FEth2',
      users_id: loginUsers_id,
      ip: req.ip,
      requestParametersObj,
    });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
  
});




// --------------------------------------------------
//   プレイヤーページ設定 / endpointID: OeLTc2B7G
// --------------------------------------------------

router.post('/pages', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const returnObj = {
    pageTransition: false
  };
  
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const { playerID, pagesArr } = req.body;
    
    lodashSet(requestParametersObj, ['playerID'], playerID);
    lodashSet(requestParametersObj, ['pagesArr'], pagesArr);
    
    const parsedPagesArr = JSON.parse(pagesArr);
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 401;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'GTWHMVVkX', messageID: 'xLLNIpo6a' }] });
    }
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    const newPagesArr = [];
    
    await validationUsersPlayerIDServer({ value: playerID, loginUsers_id });
    
    for (let valueObj of parsedPagesArr.values()) {
      
      await validationUsersPagesType({ throwError: true, value: valueObj.type });
      await validationUsersPagesName({ throwError: true, value: valueObj.name });
      await validationUsersPagesLanguage({ throwError: true, value: valueObj.language });
      
      newPagesArr.push({
        _id: shortid.generate(),
        type: valueObj.type,
        name: valueObj.name,
        language: valueObj.language,
      });
      
    }
    
    
    // --------------------------------------------------
    //   Find One - Page Transition
    // --------------------------------------------------
    
    let conditionObj = {
      _id: loginUsers_id
    };
    
    let docObj = await ModelUsers.findOne({ conditionObj });
    
    if (docObj.playerID !== playerID) {
      returnObj.pageTransition = true;
    }
    
    // console.log(`
    //   ----- docObj -----\n
    //   ${util.inspect(docObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Update
    // --------------------------------------------------
    
    const ISO8601 = moment().toISOString();
    
    conditionObj = {
      _id: loginUsers_id
    };
    
    const saveObj = {
      $set: {
        updatedDate: ISO8601,
        playerID,
        pagesArr: newPagesArr,
      }
    };
    
    await ModelUsers.upsert({ conditionObj, saveObj });
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   playerID: {green ${playerID}}
    // `);
    
    // console.log(`\n---------- parsedPagesArr ----------\n`);
    // console.dir(parsedPagesArr);
    // console.log(`\n-----------------------------------\n`);
    
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
    //   Log
    // ---------------------------------------------
    
    const resultErrorObj = returnErrorsArr({
      errorObj,
      endpointID: 'OeLTc2B7G',
      users_id: loginUsers_id,
      ip: req.ip,
      requestParametersObj,
    });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
  
});




// --------------------------------------------------
//   Follow / endpointID: uXe64jfMh
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
    
    const loginUsers_id = req.user._id;
    
    
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
    
    returnObj = await ModelUsers.updateForFollow(loginUsers_id, users_id);
    
    
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