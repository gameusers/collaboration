// --------------------------------------------------
//   File ID: DvfCyR-SZ
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
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelUsers = require('../../@database/users/model');
const ModelGames = require('../../@database/games/model');
const ModelCardPlayers = require('../../@database/card-players/model');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationUsersPlayerID } = require('../../@database/users/validations/player-id');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { decrypt }  = require('../../@modules/crypto');
const { errorCodeIntoErrorObj } = require('../../@modules/error/error-obj');
const { returnErrorsArr } = require('../../@modules/log/log');
const { CustomError } = require('../../@modules/error/custom');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatEmailSecret } = require('../../@format/email');


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
  fileID: 'DvfCyR-SZ',
  functionID: '',
  messageCode: 'Error',
  errorCodeArr: ['Error'],
  errorObj: {},
  loginUsers_id: ''
};




// --------------------------------------------------
//   Initial Props / endpointID: GBsTCSr4y
// --------------------------------------------------

router.get('/common', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  errorArgumentsObj.functionID = 'GBsTCSr4y';
  
  let returnObj = {
    login: false
  };
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   ログインしているユーザー情報＆ログインチェック
    // --------------------------------------------------
    
    if (req.isAuthenticated() && req.user) {
      returnObj.loginUsersObj = req.user;
      returnObj.login = true;
    }
    
    
    // --------------------------------------------------
    //   データ取得 / Games
    //   ヘッダーヒーローイメージ用
    // --------------------------------------------------
    
    returnObj.headerObj = await ModelGames.findForHeroImage({
      language: localeObj.language,
      country: localeObj.country,
    });
    
    
    // ---------------------------------------------
    //   Success
    // ---------------------------------------------
    
    return res.status(200).json(returnObj);
    
    
  } catch (errorObj) {
    
    
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




// --------------------------------------------------
//   Initial Props / endpointID: P3ut9x3Fj
// --------------------------------------------------

router.get('/pl/player', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  errorArgumentsObj.functionID = 'P3ut9x3Fj';
  
  let returnObj = {
    usersObj: {},
    cardsArr: []
  };
  
  let cardPlayersKeysArr = [];
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   GET 取得 & Validation
    // --------------------------------------------------
    
    const playerID = req.query.playerID;
    const validationUsersPlayerIDObj = validationUsersPlayerID(playerID);
    
    if (validationUsersPlayerIDObj.error) {
      statusCode = 400;
      errorArgumentsObj.errorCodeArr = ['chDdoM5Hv'];
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   データ取得 / Games
    //   ヘッダーヒーローイメージ用
    // --------------------------------------------------
    
    returnObj.headerObj = await ModelGames.findForHeroImage({
      language: localeObj.language,
      country: localeObj.country,
    });
    
    // console.log(`
    //   ----- returnObj.headerObj -----\n
    //   ${util.inspect(returnObj.headerObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   ログインしているユーザー情報
    // --------------------------------------------------
    
    let loginUsers_id = '';
    
    if (req.isAuthenticated() && req.user) {
      returnObj.loginUsersObj = req.user;
      loginUsers_id = req.user._id;
    }
    
    
    // --------------------------------------------------
    //   データ取得 / Users
    //   アクセスしたページ所有者のユーザー情報
    //   users_id を取得するためだけに使用
    // --------------------------------------------------
    
    const usersObj = await ModelUsers.findOne({
      conditionObj: {
        playerID,
      }
    });
    
    
    // --------------------------------------------------
    //   ユーザー情報が存在しない場合はエラー
    // --------------------------------------------------
    
    const users_id = usersObj._id;
    
    if (!users_id) {
      statusCode = 404;
      errorArgumentsObj.errorCodeArr = ['IVX1dL1pJ'];
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   データ取得 / Card Players
    //   アクセスしたページ所有者のプレイヤーカード情報
    // --------------------------------------------------
    
    const cardPlayersObj = await ModelCardPlayers.findForCardPlayer({
      users_id,
      language: localeObj.language,
      country: localeObj.country,
      loginUsers_id
    });
    
    returnObj.cardPlayersObj = cardPlayersObj;
    
    
    // --------------------------------------------------
    //   カードを一覧で表示するための配列を作成する
    // --------------------------------------------------
    
    cardPlayersKeysArr = Object.keys(cardPlayersObj);
    
    if (cardPlayersKeysArr.length > 0) {
      returnObj.cardsArr.push({
        cardPlayers_id: cardPlayersKeysArr[0]
      });
    }
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   {green pl/player/api/player / initial-props}
    //   playerID: {green ${playerID}}
    //   users_id：{green ${users_id}}
    // `);
    
    // console.log(`
    //   ----- localeObj -----\n
    //   ${util.inspect(localeObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- usersObj -----\n
    //   ${util.inspect(usersObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- cardPlayersObj -----\n
    //   ${util.inspect(cardPlayersObj, { colors: true, depth: null })}\n
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
    
    
    // console.log(chalk`
    //   errorObj.message: {green ${errorObj.message}}
    // `);
    
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




// --------------------------------------------------
//   endpointID: IXNCfSRLy
// --------------------------------------------------

router.get('/pl/settings', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {
    login: false
  };
  
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  try {
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 401;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'eex48Zjee', messageID: 'xLLNIpo6a' }] });
    }
    
    lodashSet(returnObj, ['loginUsersObj'], req.user);
    lodashSet(returnObj, ['login'], true);
    
    
    // --------------------------------------------------
    //   データ取得 / Games
    //   ヘッダーヒーローイメージ用
    // --------------------------------------------------
    
    returnObj.headerObj = await ModelGames.findForHeroImage({
      language: localeObj.language,
      country: localeObj.country,
    });
    
    
    // --------------------------------------------------
    //   データ取得 / Users
    // --------------------------------------------------
    
    const usersObj = await ModelUsers.findOne({
      conditionObj: {
        _id: loginUsers_id,
      }
    });
    
    
    // --------------------------------------------------
    //   Decrypt E-Mail
    // --------------------------------------------------
    
    const decryptedEmail = usersObj.emailObj.value ? decrypt(usersObj.emailObj.value) : '';
    
    
    // --------------------------------------------------
    //   Set Users Object
    // --------------------------------------------------
    
    returnObj.usersObj = {
      loginID: usersObj.loginID,
      playerID: usersObj.playerID,
      emailObj: {
        secret: formatEmailSecret({ value: decryptedEmail }),
        confirmation: usersObj.emailObj.confirmation,
      }
    };
    
    // console.log(chalk`
    //   emailHidden: {green ${emailHidden}}
    // `);
    
    // console.log(`\n---------- usersObj ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(usersObj)));
    // console.log(`\n-----------------------------------\n`);
    
    
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
      endpointID: 'IXNCfSRLy',
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
//   endpointID: R9AFOxwEK
// --------------------------------------------------

router.get('/email/confirmation', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const returnObj = {};
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  try {
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    // if (!req.isAuthenticated()) {
    //   statusCode = 401;
    //   throw new CustomError({ level: 'warn', errorsArr: [{ code: 'eex48Zjee', messageID: 'xLLNIpo6a' }] });
    // }
    
    lodashSet(returnObj, ['loginUsersObj'], req.user);
    // lodashSet(returnObj, ['login'], true);
    
    
    // --------------------------------------------------
    //   データ取得 / Games
    //   ヘッダーヒーローイメージ用
    // --------------------------------------------------
    
    returnObj.headerObj = await ModelGames.findForHeroImage({
      language: localeObj.language,
      country: localeObj.country,
    });
    
    
    // --------------------------------------------------
    //   データ取得 / Users
    // --------------------------------------------------
    
    const usersObj = await ModelUsers.findOne({
      conditionObj: {
        _id: loginUsers_id,
      }
    });
    
    
    // --------------------------------------------------
    //   Set Users Object
    // --------------------------------------------------
    
    // returnObj.usersObj = {
    //   loginID: usersObj.loginID,
    //   playerID: usersObj.playerID,
    //   emailObj: {
    //     secret: formatEmailSecret({ value: decryptedEmail }),
    //     confirmation: usersObj.emailObj.confirmation,
    //   }
    // };
    
    // console.log(chalk`
    //   emailHidden: {green ${emailHidden}}
    // `);
    
    // console.log(`\n---------- usersObj ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(usersObj)));
    // console.log(`\n-----------------------------------\n`);
    
    
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
      endpointID: 'R9AFOxwEK',
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




module.exports = router;