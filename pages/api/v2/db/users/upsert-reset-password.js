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
const ModelEmailConfirmations = require('../../../../../app/@database/email-confirmations/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../../../app/@modules/csrf');
const { verifyRecaptcha } = require('../../../../../app/@modules/recaptcha');
const { returnErrorsArr } = require('../../../../../app/@modules/log/log');
const { CustomError } = require('../../../../../app/@modules/error/custom');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationIP } = require('../../../../../app/@validations/ip');
const { validationEmailConfirmationsEmailConfirmationIDServer } = require('../../../../../app/@database/email-confirmations/validations/email-confirmation-id-server');
const { validationUsersLoginID } = require('../../../../../app/@database/users/validations/login-id');
const { validationUsersLoginPassword } = require('../../../../../app/@database/users/validations/login-password');




// --------------------------------------------------
//   endpointID: eqWZBA5qi
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
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const bodyObj = JSON.parse(req.body);
    
    const { 
      
      emailConfirmationID,
      loginID,
      loginPassword,
      response,
      
    } = bodyObj;
    
    
    // --------------------------------------------------
    //   Log Data
    // --------------------------------------------------
    
    lodashSet(requestParametersObj, ['emailConfirmationID'], emailConfirmationID);
    lodashSet(requestParametersObj, ['loginID'], loginID ? '******' : '');
    lodashSet(requestParametersObj, ['loginPassword'], loginPassword ? '******' : '');
    lodashSet(requestParametersObj, ['response'], response ? '******' : '');
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // ---------------------------------------------
    //   Verify reCAPTCHA
    // ---------------------------------------------
    
    await verifyRecaptcha({ response, remoteip: req.connection.remoteAddress });
    
    
    // --------------------------------------------------
    //   Login Check / ログイン状態ではエラー
    // --------------------------------------------------
    
    if (req.isAuthenticated()) {
      statusCode = 403;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'AN2EYJq5E', messageID: 'V9vI1Cl1S' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    await validationIP({ throwError: true, value: req.ip });
    await validationEmailConfirmationsEmailConfirmationIDServer({ value: emailConfirmationID });
    await validationUsersLoginID({ throwError: true, required: true, value: loginID });
    await validationUsersLoginPassword({ throwError: true, required: true, value: loginPassword, loginID });
    
    
    
    
    // --------------------------------------------------
    //   DB email-confirmations
    // --------------------------------------------------
    
    // --------------------------------------------------
    //   30分前の時間を取得し、その時間内にアクセスしたかチェック
    // --------------------------------------------------
    
    const dateTimeLimit = moment().utc().add(-30, 'minutes').toISOString();
    
    
    // --------------------------------------------------
    //   DB findOne / Email Confirmations
    // --------------------------------------------------
    
    const docEmailConfirmationsObj = await ModelEmailConfirmations.findOne({
      
      conditionObj: {
        emailConfirmationID,
        createdDate: { $gte: dateTimeLimit },
        type: 'password',
        isSuccess: false,
      }
      
    });
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、エラー
    // --------------------------------------------------
    
    if (!docEmailConfirmationsObj) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'ZbJ3goJcP', messageID: 'Error' }] });
    }
    
    const emailConfirmations_id = lodashGet(docEmailConfirmationsObj, ['_id'], '');
    
    
    
    
    // --------------------------------------------------
    //   DB users
    // --------------------------------------------------
    
    const users_id = lodashGet(docEmailConfirmationsObj, ['users_id'], '');
    
    
    // --------------------------------------------------
    //   DB findOne / Email Confirmations
    // --------------------------------------------------
    
    const docUsersObj = await ModelUsers.findOne({
      
      conditionObj: {
        _id: users_id,
        loginID,
      }
      
    });
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、エラー
    // --------------------------------------------------
    
    if (!docUsersObj) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'CALkwrSr6', messageID: 'Error' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Hash Password
    // --------------------------------------------------
    
    const hashedPassword = bcrypt.hashSync(loginPassword, 10);
    
    
    
    
    // --------------------------------------------------
    //   Update
    // --------------------------------------------------
    
    const ISO8601 = moment().utc().toISOString();
    
    
    // --------------------------------------------------
    //   - users
    // --------------------------------------------------
    
    const usersConditionObj = {
      _id: users_id
    };
    
    const usersSaveObj = {
      $set: {
        updatedDate: ISO8601,
        loginPassword: hashedPassword,
      }
    };
    
    
    // --------------------------------------------------
    //   - email-confirmations
    // --------------------------------------------------
    
    const emailConfirmationsConditionObj = {
      _id: emailConfirmations_id
    };
    
    const emailConfirmationsSaveObj = {
      $set: {
        isSuccess: true,
      }
    };
    
    
    // --------------------------------------------------
    //   - upsert
    // --------------------------------------------------
    
    await ModelUsers.transactionForUpsert({ 
    
      usersConditionObj,
      usersSaveObj,
      emailConfirmationsConditionObj,
      emailConfirmationsSaveObj,
        
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/db/users/upsert-reset-password.js
    // `);
    
    // console.log(chalk`
    //   emailConfirmationID: {green ${emailConfirmationID}}
    //   loginID: {green ${loginID}}
    //   loginPassword: {green ${loginPassword}}
    //   response: {green ${response}}
      
    //   emailConfirmations_id: {green ${emailConfirmations_id}}
    //   users_id: {green ${users_id}}
    // `);
    
    // console.log(`
    //   ----- docEmailConfirmationsObj -----\n
    //   ${util.inspect(docEmailConfirmationsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- docUsersObj -----\n
    //   ${util.inspect(docUsersObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- usersConditionObj -----\n
    //   ${util.inspect(usersConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- usersSaveObj -----\n
    //   ${util.inspect(usersSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- emailConfirmationsConditionObj -----\n
    //   ${util.inspect(emailConfirmationsConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- emailConfirmationsSaveObj -----\n
    //   ${util.inspect(emailConfirmationsSaveObj, { colors: true, depth: null })}\n
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
      endpointID: 'eqWZBA5qi',
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