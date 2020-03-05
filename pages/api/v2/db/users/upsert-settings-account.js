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

const moment = require('moment');
const bcrypt = require('bcryptjs');
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
const { validationUsersLoginIDServer } = require('../../../../../app/@database/users/validations/login-id-server');
const { validationUsersLoginPassword } = require('../../../../../app/@database/users/validations/login-password');




// --------------------------------------------------
//   endpointID: Du-wepXKb
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
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const bodyObj = JSON.parse(req.body);
    
    const { 
      
      loginID,
      loginPassword,
      
    } = bodyObj;
    
    
    // --------------------------------------------------
    //   Log Data
    // --------------------------------------------------
    
    lodashSet(requestParametersObj, ['loginUsers_id'], loginUsers_id);
    lodashSet(requestParametersObj, ['loginID'], loginID ? '******' : '');
    lodashSet(requestParametersObj, ['loginPassword'], loginPassword ? '******' : '');
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 403;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: '9Y3ZUsWD6', messageID: 'xLLNIpo6a' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    await validationIP({ throwError: true, value: req.ip });
    await validationUsersLoginIDServer({ value: loginID, loginUsers_id });
    await validationUsersLoginPassword({ throwError: true, required: true, value: loginPassword, loginID });
    
    
    
    
    // --------------------------------------------------
    //   Hash Password
    // --------------------------------------------------
    
    const hashedPassword = bcrypt.hashSync(loginPassword, 10);
    
    
    
    
    // --------------------------------------------------
    //   Update
    // --------------------------------------------------
    
    const ISO8601 = moment().toISOString();
    
    const conditionObj = {
      _id: loginUsers_id
    };
    
    const saveObj = {
      $set: {
        updatedDate: ISO8601,
        loginID,
        loginPassword: hashedPassword,
      }
    };
    
    await ModelUsers.upsert({ conditionObj, saveObj });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/db/users/upsert-settings-account.js
    // `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   loginID: {green ${loginID}}
    //   loginPassword: {green ${loginPassword}}
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosObj -----\n
    //   ${util.inspect(imagesAndVideosObj, { colors: true, depth: null })}\n
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
      endpointID: 'Du-wepXKb',
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