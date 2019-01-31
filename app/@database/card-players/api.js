// --------------------------------------------------
//   File ID: QOVB4jVBQ
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


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../@modules/csrf');
const { errorCodeIntoErrorObj } = require('../../@modules/error/error-obj');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const validation_id = require('../../@validations/_id');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelCardPlayers = require('./model');


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
  fileID: 'QOVB4jVBQ',
  functionID: '',
  errorCodeArr: [500000],
  errorObj: {},
};




// --------------------------------------------------
//   プレイヤーカードのデータを1件取得 / Function ID: A8rggT8XW
// --------------------------------------------------

router.post('/find-one-by-id', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  errorArgumentsObj.functionID = 'A8rggT8XW';
  
  let returnObj = {};
  
  
  try {
    
    
    // --------------------------------------------------
    //   CSRF
    // --------------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   POST 取得 & Validation
    // --------------------------------------------------
    
    const { _id } = req.body;
    const validationObj = validation_id(_id);
    
    if (validationObj.error) {
      statusCode = 400;
      errorArgumentsObj.errorCodeArr = ['xXQ6zimji'];
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   ログインしているユーザー情報
    // --------------------------------------------------
    
    let usersLogin_id = '';
    
    if (req.user) {
      usersLogin_id = req.user._id;
    }
    
    
    // --------------------------------------------------
    //   データ取得 / Card Players
    //   アクセスしたページ所有者のプレイヤーカード情報
    // --------------------------------------------------
    
    const cardPlayersObj = await ModelCardPlayers.findOneBy_id({
      _id,
      language: localeObj.language,
      country: localeObj.country,
      usersLogin_id
    });
    
    returnObj = cardPlayersObj;
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    // `);
    
    // console.log(`
    //   ----- validationObj -----\n
    //   ${util.inspect(validationObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- localeObj -----\n
    //   ${util.inspect(localeObj, { colors: true, depth: null })}\n
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
//   プレイヤーカードのデータを1件取得 / Function ID: 34KBpPcqT
// --------------------------------------------------

router.post('/find-one-by-id-for-edit-form', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  errorArgumentsObj.functionID = '34KBpPcqT';
  
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
    //   POST 取得 & Validation
    // --------------------------------------------------
    
    const { _id } = req.body;
    const validationObj = validation_id(_id);
    
    if (validationObj.error) {
      statusCode = 400;
      errorArgumentsObj.errorCodeArr = ['xXQ6zimji'];
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   データ取得 / Card Players
    //   アクセスしたページ所有者のプレイヤーカード情報
    // --------------------------------------------------
    
    const cardPlayersObj = await ModelCardPlayers.findOneBy_idForEditForm({
      _id,
      language: localeObj.language,
      country: localeObj.country,
      usersLogin_id
    });
    
    returnObj = cardPlayersObj;
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    // `);
    
    // console.log(`
    //   ----- validationObj -----\n
    //   ${util.inspect(validationObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- localeObj -----\n
    //   ${util.inspect(localeObj, { colors: true, depth: null })}\n
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