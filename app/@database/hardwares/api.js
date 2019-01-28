// --------------------------------------------------
//   File ID: pGNzfBJoC
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

const ModelHardwares = require('./model');


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
  fileID: 'pGNzfBJoC',
  functionID: '',
  errorCodeArr: [],
  errorObj: {},
};




// --------------------------------------------------
//   サジェスト用のデータを取得 / Function ID: vIWWdmQAT
// --------------------------------------------------

router.post('/find-by-search-keywords-arr-for-suggestion', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  errorArgumentsObj.functionID = 'vIWWdmQAT';
  
  
  try {
    
    
    // --------------------------------------------------
    //   CSRF
    // --------------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Locale
    // --------------------------------------------------
    
    const localeObj = locale({
      acceptLanguage: req.headers['accept-language']
    });
    
    
    // --------------------------------------------------
    //   POST 取得 & Validation
    // --------------------------------------------------
    
    const { keyword } = req.body;
    
    
    // --------------------------------------------------
    //   サジェスト用のデータを取得
    // --------------------------------------------------
    
    const returnObj = await ModelHardwares.findBySearchKeywordsArrForSuggestion({
      keyword,
      language: localeObj.language,
      country: localeObj.country,
    });
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   _id: {green ${_id}}
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




module.exports = router;