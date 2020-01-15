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

const ModelGames = require('../../../../../app/@database/games/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../../../app/@modules/csrf');
const { returnErrorsArr } = require('../../../../../app/@modules/log/log');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationIP } = require('../../../../../app/@validations/ip');
const { validationGamesSuggestionKeyword } = require('../../../../../app/@database/games/validations/suggestion-keyword');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');




// --------------------------------------------------
//   endpointID: 73be0Rq9j
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
  
  let returnObj = {};
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
    //   console.log
    // ---------------------------------------------
    
    // console.log(chalk`
    //   /pages/api/v2/db/games/read-suggestion.js
    //   loginUsers_id: {green ${loginUsers_id}}
    //   keyword: {green ${keyword}}
    // `);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    await validationIP({ throwError: true, value: req.ip });
    await validationGamesSuggestionKeyword({ throwError: true, required: true, value: keyword });
    
    
    
    
    // --------------------------------------------------
    //   サジェスト用のデータを取得
    // --------------------------------------------------
    
    returnObj = await ModelGames.findBySearchKeywordsArrForSuggestion({
      
      localeObj,
      // language: localeObj.language,
      // country: localeObj.country,
      keyword,
      
    });
    
    
    
    
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
      endpointID: '73be0Rq9j',
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