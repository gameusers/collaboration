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

const shortid = require('shortid');
const moment = require('moment');
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelUsers = require('../../../../../app/@database/users/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../../../app/@modules/csrf');
const { returnErrorsArr } = require('../../../../../app/@modules/log/log');
const { CustomError } = require('../../../../../app/@modules/error/custom');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationIP } = require('../../../../../app/@validations/ip');
const { validationUsersUserIDServer } = require('../../../../../app/@database/users/validations/user-id-server');
const { validationUsersPagesType, validationUsersPagesName, validationUsersPagesLanguage } = require('../../../../../app/@database/users/validations/pages');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

// const { locale } = require('../../../../../app/@locales/locale');




// --------------------------------------------------
//   endpointID: 0qiGkIA99
// --------------------------------------------------

export default async (req, res) => {
  
  
  // --------------------------------------------------
  //   Status Code
  // --------------------------------------------------
  
  let statusCode = 400;
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  // const localeObj = locale({
  //   acceptLanguage: req.headers['accept-language']
  // });
  
  
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
    
    const bodyObj = JSON.parse(req.body);
    
    const { 
      
      userID,
      pagesArr,
      
    } = bodyObj;
    
    
    // --------------------------------------------------
    //   Log Data
    // --------------------------------------------------
    
    lodashSet(requestParametersObj, ['loginUsers_id'], loginUsers_id);
    lodashSet(requestParametersObj, ['userID'], userID);
    lodashSet(requestParametersObj, ['pagesArr'], pagesArr);
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    console.log(chalk`
      /pages/api/v2/db/users/upsert-pages.js
      loginUsers_id: {green ${loginUsers_id}}
      userID: {green ${userID}}
    `);
    
    console.log(`
      ----- pagesArr -----\n
      ${util.inspect(JSON.parse(JSON.stringify(pagesArr)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 401;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'V5Ww_uLNM', messageID: 'xLLNIpo6a' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    await validationIP({ throwError: true, value: req.ip });
    await validationUsersUserIDServer({ throwError: true, value: userID, loginUsers_id });
    
    
    // --------------------------------------------------
    //   Validation / Pages
    // --------------------------------------------------
    
    const newPagesArr = [];
    
    for (let valueObj of pagesArr.values()) {
      
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
    
    if (docObj.userID !== userID) {
      returnObj.pageTransition = true;
    }
    
    console.log(`
      ----- docObj -----\n
      ${util.inspect(docObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
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
        userID,
        pagesArr: newPagesArr,
      }
    };
    
    await ModelUsers.upsert({ conditionObj, saveObj });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   userCommunities_id: {green ${userCommunities_id}}
    //   forumThreads_id: {green ${forumThreads_id}}
    //   name: {green ${name} / ${typeof name}}
    //   comment: {green ${comment} / ${typeof comment}}
    //   IP: {green ${req.ip}}
    //   User Agent: {green ${req.headers['user-agent']}}
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
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
      endpointID: '0qiGkIA99',
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