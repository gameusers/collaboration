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
// const ModelEmailConfirmations = require('../../../../../app/@database/email-confirmations/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../../../app/@modules/csrf');
const { returnErrorsArr } = require('../../../../../app/@modules/log/log');
const { CustomError } = require('../../../../../app/@modules/error/custom');
const { sendNotification }  = require('../../../../../app/@modules/web-push');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationIP } = require('../../../../../app/@validations/ip');
const { validationUsersWebPushSubscriptionObjEndpointServer, validationUsersWebPushSubscriptionObjKeysP256dhServer, validationUsersWebPushSubscriptionObjKeysAuthServer } = require('../../../../../app/@database/users/validations/web-push-server');




// --------------------------------------------------
//   endpointID: uVdh-Q9Y9
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
      
      subscriptionObj,
      
    } = bodyObj;
    
    
    // --------------------------------------------------
    //   Log Data
    // --------------------------------------------------
    
    lodashSet(requestParametersObj, ['loginUsers_id'], loginUsers_id);
    lodashSet(requestParametersObj, ['subscriptionObj'], subscriptionObj ? '******' : {});
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 403;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'R_M1YZU-c', messageID: 'xLLNIpo6a' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const endpoint = lodashGet(subscriptionObj, ['endpoint'], '');
    const p256dh = lodashGet(subscriptionObj, ['keys', 'p256dh'], '');
    const auth = lodashGet(subscriptionObj, ['keys', 'auth'], '');
    
    
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    await validationIP({ throwError: true, value: req.ip });
    await validationUsersWebPushSubscriptionObjEndpointServer({ value: endpoint });
    await validationUsersWebPushSubscriptionObjKeysP256dhServer({ value: p256dh });
    await validationUsersWebPushSubscriptionObjKeysAuthServer({ value: auth });
    
    
    
    
    // --------------------------------------------------
    //   Find One / DB email-confirmations
    // --------------------------------------------------
    
    const webPushSubscriptionObj = {
      endpoint,
      keys: {
        p256dh,
        auth,
      }
    };
    
    
    // --------------------------------------------------
    //   Find One / DB email-confirmations
    // --------------------------------------------------
    
    // const docEmailConfirmationsObj = await ModelEmailConfirmations.findOne({
      
    //   conditionObj: {
    //     users_id: loginUsers_id
    //   }
      
    // });
    
    // const emailConfirmations_id = lodashGet(docEmailConfirmationsObj, ['_id'], shortid.generate());
    // const emailConfirmationsCount = lodashGet(docEmailConfirmationsObj, ['count'], 0);
    
    
    
    
    // // --------------------------------------------------
    // //   メールを送れるのは1日に3回まで、それ以上はエラーにする
    // // --------------------------------------------------
    
    // if (emailConfirmationsCount >= 3) {
    //   throw new CustomError({ level: 'warn', errorsArr: [{ code: 'XzR7k_Fh3', messageID: 'EAvJztLfH' }] });
    // }
    
    
    
    
    // --------------------------------------------------
    //   Upsert 
    //   E-Mailアドレスを変更して、メール確認用データベースにも保存する
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   - Datetime
    // ---------------------------------------------
    
    const ISO8601 = moment().utc().toISOString();
    
    
    // ---------------------------------------------
    //   - users
    // ---------------------------------------------
    
    const usersConditionObj = {
      _id: loginUsers_id
    };
    
    const usersSaveObj = {
      $set: {
        updatedDate: ISO8601,
        webPushSubscriptionObj,
      }
    };
    
    
    // // ---------------------------------------------
    // //   - email-confirmations
    // // ---------------------------------------------
    
    // const emailConfirmationsConditionObj = {
    //   _id: emailConfirmations_id
    // };
    
    // const emailConfirmationID = `${shortid.generate()}${shortid.generate()}${shortid.generate()}`;
    
    // const emailConfirmationsSaveObj = {
    //   $set: {
    //     createdDate: ISO8601,
    //     users_id: loginUsers_id,
    //     emailConfirmationID,
    //     type: 'email',
    //     email: encryptedEmail,
    //     count: emailConfirmationsCount + 1,
    //     isSuccess: false,
    //     ip: req.ip,
    //     userAgent: lodashGet(req, ['headers', 'user-agent'], ''),
    //   }
    // };
    
    
    // // ---------------------------------------------
    // //   - transaction
    // // ---------------------------------------------
    
    // await ModelUsers.transactionForEditAccount({
      
    //   usersConditionObj,
    //   usersSaveObj,
    //   emailConfirmationsConditionObj,
    //   emailConfirmationsSaveObj,
      
    // });
    
    
    // --------------------------------------------------
    //   確認用の通知送信
    // --------------------------------------------------
    
    sendNotification({
      
      subscriptionObj: webPushSubscriptionObj,
      title: 'タイトル',
      body: '本文',
      icon: '',
      tag: '',
      TTL: 120,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    console.log(`
      ----------------------------------------\n
      /pages/api/v2/db/users/upsert-settings-web-push.js
    `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   email: {green ${email}}
    //   emailConfirmationID: {green ${emailConfirmationID}}
    // `);
    
    console.log(`
      ----- usersConditionObj -----\n
      ${util.inspect(usersConditionObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    console.log(`
      ----- usersSaveObj -----\n
      ${util.inspect(usersSaveObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
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
      endpointID: 'uVdh-Q9Y9',
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