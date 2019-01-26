// --------------------------------------------------
//   File ID: 3bPnmJsoD
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

// const validation_id = require('../../@validations/_id');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelIDs = require('./model');


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
  fileId: '3bPnmJsoD',
  functionId: '',
  errorCodeArr: [500000],
  errorObj: {},
};




// --------------------------------------------------
//   IDデータをユーザーIDから取得 / Function ID: XwchAk4yT
// --------------------------------------------------

router.post('/find-by-users-id-for-form', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  errorArgumentsObj.functionId = 'XwchAk4yT';
  
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
    
    
    // --------------------------------------------------
    //   Locale
    // --------------------------------------------------
    
    const localeObj = locale({
      acceptLanguage: req.headers['accept-language']
    });
    
    
    // --------------------------------------------------
    //   POST 取得 & Validation
    // --------------------------------------------------
    
    // const { users_id } = req.body;
    // const validationObj = validation_id(users_id);
    
    // if (validationObj.error) {
    //   statusCode = 400;
    //   errorArgumentsObj.errorCodeArr = ['xXQ6zimji'];
    //   throw new Error();
    // }
    
    
    // --------------------------------------------------
    //   ログインしているユーザー情報
    // --------------------------------------------------
    
    const usersLogin_id = req.user._id;
    
    
    // --------------------------------------------------
    //   データ取得 / IDs
    //   ログインしているユーザーの登録IDデータ
    // --------------------------------------------------
    
    const resultIDsObj = await ModelIDs.findBy_Users_idForForm({
      language: localeObj.language,
      country: localeObj.country,
      usersLogin_id
    });
    
    returnObj = resultIDsObj;
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   usersLogin_id: {green ${usersLogin_id}}
    // `);
    
    // console.log(`
    //   ----- localeObj -----\n
    //   ${util.inspect(localeObj, { colors: true, depth: null })}\n
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
    const resultErrorObj = errorCodeIntoErrorObj(errorArgumentsObj);
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
});





// --------------------------------------------------
//   更新 / Function ID: YTP9v6kk_
// --------------------------------------------------

router.post('/upsert', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  errorArgumentsObj.functionId = 'YTP9v6kk_';
  
  
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
    
    
    // --------------------------------------------------
    //   Locale
    // --------------------------------------------------
    
    const localeObj = locale({
      acceptLanguage: req.headers['accept-language']
    });
    
    
    // --------------------------------------------------
    //   ログインしているユーザーの _id
    // --------------------------------------------------
    
    const usersLogin_id = req.user._id;
    
    
    // --------------------------------------------------
    //   POST 取得 & Validation
    // --------------------------------------------------
    
    const { _id, platform, label, id, publicSetting, search } = req.body;
    
    
    // --------------------------------------------------
    //   サジェスト用のデータを取得
    // --------------------------------------------------
    
    // const returnObj = await ModelHardwares.findBySearchKeywordsArrForSuggestion({
    //   keyword,
    //   language: localeObj.language,
    //   country: localeObj.country,
    // });
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    console.log(chalk`
      _id: {green ${_id}}
      platform: {green ${platform}}
      label: {green ${label}}
      id: {green ${id}}
      publicSetting: {green ${publicSetting}}
      search: {green ${search}}
    `);
    
    // console.log(`
    //   ----- localeObj -----\n
    //   ${util.inspect(localeObj, { colors: true, depth: null })}\n
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
    
    // return res.status(200).json(returnObj);
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   Error Object
    // ---------------------------------------------
    
    errorArgumentsObj.errorObj = errorObj;
    const resultErrorObj = errorCodeIntoErrorObj(errorArgumentsObj);
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
});




module.exports = router;