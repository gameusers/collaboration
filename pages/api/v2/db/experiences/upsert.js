// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import moment from 'moment';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';


// ---------------------------------------------
//   Model
// ---------------------------------------------

import ModelExperiences from 'app/@database/experiences/model.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { verifyCsrfToken } from 'app/@modules/csrf.js';
import { returnErrorsArr } from 'app/@modules/log/log.js';
import { CustomError } from 'app/@modules/error/custom.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationIP } from 'app/@validations/ip.js';

import { validationTitles_idsArrServer } from 'app/@database/titles/validations/_id-server.js';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { locale } from 'app/@locales/locale.js';






// --------------------------------------------------
//   endpointID: wIYxo_V95
// --------------------------------------------------

export default async (req, res) => {
  
  
  // --------------------------------------------------
  //   Status Code
  // --------------------------------------------------
  
  let statusCode = 400;
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const returnObj = {};
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  // --------------------------------------------------
  //   Language & IP & User Agent
  // --------------------------------------------------
  
  const acceptLanguage = lodashGet(req, ['headers', 'accept-language'], '');
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = lodashGet(req, ['headers', 'user-agent'], '');
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage
  });
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const bodyObj = JSON.parse(req.body);
    
    const {
      
      titles_idsArr,
      
    } = bodyObj;
    
    
    lodashSet(requestParametersObj, ['titles_idsArr'], titles_idsArr);
    
    // titles_idsArr.push('aaa3lkalob');
    // titles_idsArr.push('Rb-hOZVrb');
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      
      statusCode = 403;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'EvO6u04m8', messageID: 'xLLNIpo6a' }] });
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    await validationIP({ throwError: true, value: ip });
    
    const validationObj = await validationTitles_idsArrServer({ throwError: true, arr: titles_idsArr });
    
    
    
    
    // --------------------------------------------------
    //   DB findeOne
    // --------------------------------------------------
    
    const docExperiencesObj = await ModelExperiences.findOne({
      
      conditionObj: {
        users_id: loginUsers_id
      }
      
    });
    
    const titlesArr = lodashGet(docExperiencesObj, ['titlesArr'], []);
    const valueArr = lodashGet(validationObj, ['valueArr'], []);
    const saveTitles_idsArr = [];
    
    for (let titles_id of valueArr.values()) {
      
      const index = titlesArr.findIndex((valueObj) => {
        return valueObj.titles_id === titles_id;
      });
      
      if (index !== -1) {
        saveTitles_idsArr.push(titles_id);
      }
      
      // console.log(value);
    }
    
    
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    const ISO8601 = moment().utc().toISOString();
    
    
    
    
    // --------------------------------------------------
    //   Condition Object
    // --------------------------------------------------
    
    const conditionObj = {
      
      users_id: loginUsers_id,
      
    };
    
    
    // --------------------------------------------------
    //   Save Object
    // --------------------------------------------------
    
    const saveObj = {
      
      $set: {
        updatedDate: ISO8601,
        titles_idsArr: saveTitles_idsArr,
      }
      
    };
    
    
    // --------------------------------------------------
    //   DB upsert
    // --------------------------------------------------
    
    await ModelExperiences.upsert({
      
      conditionObj,
      saveObj,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/db/card-players/upsert.js
    // `);
    
    // console.log(`
    //   ----- titles_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(titles_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- validationObj -----\n
    //   ${util.inspect(validationObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- docExperiencesObj -----\n
    //   ${util.inspect(docExperiencesObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- saveTitles_idsArr -----\n
    //   ${util.inspect(saveTitles_idsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(returnObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // ---------------------------------------------
    //   Success
    // ---------------------------------------------
    
    return res.status(200).json(saveTitles_idsArr);
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   Log
    // ---------------------------------------------
    
    const resultErrorObj = returnErrorsArr({
      
      errorObj,
      endpointID: 'wIYxo_V95',
      users_id: loginUsers_id,
      ip,
      userAgent,
      requestParametersObj,
      
    });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
  
};