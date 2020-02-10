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
// const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'public/' });
const shortid = require('shortid');
const moment = require('moment');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../@modules/csrf');
const { errorCodeIntoErrorObj } = require('../../@modules/error/error-obj');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationIDs_idServer } = require('./validations/_id-server');
const { validationIDsPlatform } = require('./validations/platform');
const { validationIDsLabel } = require('./validations/label');
const { validationIDsID } = require('./validations/id');
const { validationIDsPublicSetting } = require('./validations/public-setting');

const { validationGamesGameCommunities_idServer } = require('../games/validations/game-id-server');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelIDs = require('./model');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

// const { addLocaleData } = require('react-intl');
// const en = require('react-intl/locale-data/en');
// const ja = require('react-intl/locale-data/ja');
// addLocaleData([...en, ...ja]);

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
  fileID: '3bPnmJsoD',
  functionID: '',
  errorCodeArr: [],
  errorObj: {},
  loginUsers_id: ''
};











// --------------------------------------------------
//   削除 / endpointID: xE5KudSUz
// --------------------------------------------------

router.post('/delete', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  errorArgumentsObj.functionID = 'xE5KudSUz';
  
  
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
    errorArgumentsObj.loginUsers_id = loginUsers_id;
    
    
    
    
    // --------------------------------------------------
    //   POST 取得
    // --------------------------------------------------
    
    const { _id } = req.body;
    
    
    // --------------------------------------------------
    //   Validation - _id
    // --------------------------------------------------
    
    const validationObj = await validationIDs_idServer({
      value: _id,
      loginUsers_id
    });
    
    // console.log(`\n---------- validationObj ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(validationObj)));
    // console.log(`\n-----------------------------------\n`);
    
    if (validationObj.error) {
      errorArgumentsObj.errorCodeArr = validationObj.errorCodeArr;
      throw new Error();
    }
    
    
    
    
    // --------------------------------------------------
    //   データ削除
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Condition Object
    // ---------------------------------------------
    
    const conditionObj = {
      _id,
      users_id: loginUsers_id
    };
    
    
    // --------------------------------------------------
    //   Delete
    // --------------------------------------------------
    
    await ModelIDs.deleteMany({
      conditionObj,
    });
    
    
    
    
    // --------------------------------------------------
    //   データ取得 / IDs
    //   ログインしているユーザーの登録IDデータ
    // --------------------------------------------------
    
    const returnObj = await ModelIDs.findBy_Users_idForForm({
      language: localeObj.language,
      country: localeObj.country,
      loginUsers_id
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   _id: {green ${_id}}
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
    
    // console.log(`
    //   ----- errorArgumentsObj -----\n
    //   ${util.inspect(errorArgumentsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
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