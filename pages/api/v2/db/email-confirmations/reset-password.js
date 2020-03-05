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
const shortid = require('shortid');
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
const { encrypt, decrypt }  = require('../../../../../app/@modules/crypto');
const { sendMailResetPassword } = require('../../../../../app/@modules/email');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationIP } = require('../../../../../app/@validations/ip');
const { validationUsersLoginID } = require('../../../../../app/@database/users/validations/login-id');
const { validationUsersEmail } = require('../../../../../app/@database/users/validations/email');




// --------------------------------------------------
//   endpointID: jH--xmn-y
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
      email,
      response,
      
    } = bodyObj;
    
    
    // --------------------------------------------------
    //   Log Data
    // --------------------------------------------------
    
    lodashSet(requestParametersObj, ['loginUsers_id'], loginUsers_id);
    lodashSet(requestParametersObj, ['loginID'], loginID ? '******' : '');
    lodashSet(requestParametersObj, ['email'], email ? '******' : '');
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
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'M-Clzy2kt', messageID: 'xLLNIpo6a' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    let docUsersObj = {};
    
    await validationIP({ throwError: true, value: req.ip });
    
    
    if (loginID) {
      
      
      // --------------------------------------------------
      //   loginID
      // --------------------------------------------------
      
      await validationUsersLoginID({ throwError: true, required: true, value: loginID });
      
      
      // --------------------------------------------------
      //   docUsersObj
      // --------------------------------------------------
      
      docUsersObj = await ModelUsers.findOne({
        
        conditionObj: {
          loginID
        }
        
      });
      
      
    } else {
      
      
      // --------------------------------------------------
      //   email
      // --------------------------------------------------
      
      await validationUsersEmail({ throwError: true, required: true, value: email });
      
      
      // --------------------------------------------------
      //   Encrypt E-Mail
      // --------------------------------------------------
      
      // const encryptedEmail = encrypt(email);
      
      
      // --------------------------------------------------
      //   docUsersObj
      // --------------------------------------------------
      
      docUsersObj = await ModelUsers.findOne({
        
        conditionObj: {
          'emailObj.value': encrypt(email),
          'emailObj.confirmation': true,
        }
        
      });
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   必要な情報が存在しない場合はエラー
    // --------------------------------------------------
    
    const users_id = lodashGet(docUsersObj, ['_id'], '');
    const encryptedEmail = lodashGet(docUsersObj, ['emailObj', 'value'], '');
    
    if (!users_id || !encryptedEmail) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: '9ceO4dnQ0', messageID: 'rhU9utPzZ' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Find One / DB email-confirmations
    // --------------------------------------------------
    
    const docEmailConfirmationsObj = await ModelEmailConfirmations.findOne({
      
      conditionObj: {
        users_id,
        type: 'password',
      }
      
    });
    
    const emailConfirmations_id = lodashGet(docEmailConfirmationsObj, ['_id'], shortid.generate());
    const emailConfirmationsCount = lodashGet(docEmailConfirmationsObj, ['count'], 0);
    
    
    
    
    // --------------------------------------------------
    //   メールを送れるのは1日に3回まで、それ以上はエラーにする
    // --------------------------------------------------
    
    if (emailConfirmationsCount >= 3) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: '_5i0q63mE', messageID: 'EAvJztLfH' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Upsert 
    //   E-Mailアドレスを変更して、メール確認用データベースにも保存する
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   - Datetime
    // ---------------------------------------------
    
    const ISO8601 = moment().toISOString();
    
    
    // ---------------------------------------------
    //   - email-confirmations
    // ---------------------------------------------
    
    const conditionObj = {
      _id: emailConfirmations_id
    };
    
    const emailConfirmationID = `${shortid.generate()}${shortid.generate()}${shortid.generate()}`;
    
    const saveObj = {
      $set: {
        createdDate: ISO8601,
        users_id,
        emailConfirmationID,
        type: 'password',
        email: encryptedEmail,
        count: emailConfirmationsCount + 1,
        isSuccess: false,
        ip: req.ip,
        userAgent: lodashGet(req, ['headers', 'user-agent'], ''),
      }
    };
    
    
    // ---------------------------------------------
    //   - upsert
    // ---------------------------------------------
    
    await ModelEmailConfirmations.upsert({
      
      conditionObj,
      saveObj,
      
    });
    
    
    
    // --------------------------------------------------
    //   Decrypt E-Mail
    // --------------------------------------------------
    
    const decryptedEmail = decrypt(encryptedEmail);
    
    
    
    
    // --------------------------------------------------
    //   確認メール送信
    // --------------------------------------------------
    
    sendMailResetPassword({
      to: decryptedEmail,
      emailConfirmationID,
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    console.log(`
      ----------------------------------------\n
      /pages/api/v2/db/email-confirmations/reset-password.js
    `);
    
    console.log(chalk`
      loginID: {green ${loginID}}
      email: {green ${email}}
      response: {green ${response}}
      
      users_id: {green ${users_id}}
      encryptedEmail: {green ${encryptedEmail}}
      decryptedEmail: {green ${decryptedEmail}}
      
      emailConfirmations_id: {green ${emailConfirmations_id}}
      emailConfirmationsCount: {green ${emailConfirmationsCount}}
    `);
    
    // console.log(`
    //   ----- docUsersObj -----\n
    //   ${util.inspect(docUsersObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    console.log(`
      ----- conditionObj -----\n
      ${util.inspect(conditionObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    console.log(`
      ----- saveObj -----\n
      ${util.inspect(saveObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    
    
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
      endpointID: 'jH--xmn-y',
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