// --------------------------------------------------
//   File ID: v_tFMEa7f
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


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelGames = require('../../../@database/games/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { errorCodeIntoErrorObj } = require('../../../@modules/error/error-obj');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { addLocaleData } = require('react-intl');
const en = require('react-intl/locale-data/en');
const ja = require('react-intl/locale-data/ja');
addLocaleData([...en, ...ja]);

const { locale } = require('../../../@locales/locale');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();




// --------------------------------------------------
//   Status Code & Error Arguments Object
// --------------------------------------------------

let statusCode = 400;

let errorArgumentsObj = {
  fileID: 'v_tFMEa7f',
  functionID: '',
  errorCodeArr: [],
  errorObj: {},
  loginUsers_id: ''
};




// --------------------------------------------------
//   Initial Props / endpointID: iAYmdOksz
// --------------------------------------------------

router.get('/initial-props', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  errorArgumentsObj.functionID = 'iAYmdOksz';
  
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




module.exports = router;