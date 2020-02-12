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

const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelHardwares = require('../../../../../app/@database/hardwares/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../../../app/@modules/csrf');
const { returnErrorsArr } = require('../../../../../app/@modules/log/log');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationIP } = require('../../../../../app/@validations/ip');
const { validationHardwaresSuggestionKeyword } = require('../../../../../app/@database/hardwares/validations/suggestion-keyword');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');




// --------------------------------------------------
//   endpointID: FpeUiNF-A
// --------------------------------------------------

export default async (req, res) => {
  
  
  // --------------------------------------------------
  //   Status Code
  // --------------------------------------------------
  
  let statusCode = 400;
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnArr = [];
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const bodyObj = JSON.parse(req.body);
    
    const { 
      
      keyword,
      
    } = bodyObj;
    
    
    lodashSet(requestParametersObj, ['keyword'], keyword);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    await validationIP({ throwError: true, value: req.ip });
    await validationHardwaresSuggestionKeyword({ throwError: true, required: true, value: keyword });
    
    
    
    
    // --------------------------------------------------
    //   サジェスト用のデータを取得
    // --------------------------------------------------
    
    returnArr = await ModelHardwares.findForSuggestion({
      
      localeObj,
      keyword,
      
    });
    
    
    
    
    // ---------------------------------------------
    //   console.log
    // ---------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/db/hardwares/read-suggestion.js
    // `);
    
    // console.log(`
    //   ----- returnArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(returnArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // ---------------------------------------------
    //   Success
    // ---------------------------------------------
    
    return res.status(200).json(returnArr);
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   Log
    // ---------------------------------------------
    
    const resultErrorObj = returnErrorsArr({
      errorObj,
      endpointID: 'FpeUiNF-A',
      users_id: loginUsers_id,
      ip: req.ip,
      requestParametersObj,
    });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
  
};