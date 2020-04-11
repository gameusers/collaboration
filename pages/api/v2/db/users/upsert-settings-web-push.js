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
const { sendNotifications }  = require('../../../../../app/@modules/web-push');


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
    
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/db/users/upsert-settings-web-push.js
    // `);
    
    // console.log(`
    //   ----- subscriptionObj -----\n
    //   ${util.inspect(subscriptionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
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
    
    await validationUsersWebPushSubscriptionObjEndpointServer({ required: true, value: endpoint });
    await validationUsersWebPushSubscriptionObjKeysP256dhServer({ required: true, value: p256dh });
    await validationUsersWebPushSubscriptionObjKeysAuthServer({ required: true, value: auth });
    
    
    
    
    // --------------------------------------------------
    //   webPushSubscriptionObj
    // --------------------------------------------------
    
    const webPushSubscriptionObj = {
      endpoint,
      keys: {
        p256dh,
        auth,
      }
    };
    
    
    
    
    // --------------------------------------------------
    //   Upsert 
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   - Datetime
    // ---------------------------------------------
    
    const ISO8601 = moment().utc().toISOString();
    
    
    // ---------------------------------------------
    //   - users
    // ---------------------------------------------
    
    const conditionObj = {
      _id: loginUsers_id
    };
    
    const saveObj = {
      $set: {
        updatedDate: ISO8601,
        webPushSubscriptionObj,
      }
    };
    
    
    // ---------------------------------------------
    //   - update
    // ---------------------------------------------
    
    await ModelUsers.upsert({
      
      conditionObj,
      saveObj,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   確認用の通知送信
    // --------------------------------------------------
    
    const arr = [{
      
      subscriptionObj: webPushSubscriptionObj,
      title: 'Game Users',
      body: '通知を許可しました',
      icon: '/img/common/icons/icon-128x128.png',
      tag: 'web-push-subscription',
      url: '',
      TTL: 120,
      
    }];
    
    sendNotifications({ arr });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/db/users/upsert-settings-web-push.js
    // `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   email: {green ${email}}
    //   emailConfirmationID: {green ${emailConfirmationID}}
    // `);
    
    // console.log(`
    //   ----- conditionObj -----\n
    //   ${util.inspect(conditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- saveObj -----\n
    //   ${util.inspect(saveObj, { colors: true, depth: null })}\n
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