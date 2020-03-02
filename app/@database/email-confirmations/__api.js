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

const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'public/' });
const shortid = require('shortid');
const moment = require('moment');
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../@modules/csrf');
const { decrypt }  = require('../../@modules/crypto');
const { returnErrorsArr } = require('../../@modules/log/log');
const { CustomError } = require('../../@modules/error/custom');
const { sendMailConfirmation } = require('../../@modules/email');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelEmailConfirmations = require('./model');
const ModelUsers = require('../../@database/users/model');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();




// --------------------------------------------------
//   Status Code & Error Arguments Object
// --------------------------------------------------

let statusCode = 400;




// --------------------------------------------------
//   E-Mail登録 / endpointID: Q_U6qCnFX
// --------------------------------------------------

router.post('/resend', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const returnObj = {};
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  try {
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 401;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: '4cuHaTuL7', messageID: 'xLLNIpo6a' }] });
    }
    
    
    // --------------------------------------------------
    //   Find One / DB email-confirmations
    // --------------------------------------------------
    
    const emailConfirmationsDocObj = await ModelEmailConfirmations.findOne({ users_id: loginUsers_id });
    const emailConfirmations_id = lodashGet(emailConfirmationsDocObj, ['_id'], shortid.generate());
    const emailConfirmationsIsSuccess = lodashGet(emailConfirmationsDocObj, ['isSuccess'], false);
    let emailConfirmationID = lodashGet(emailConfirmationsDocObj, ['emailConfirmationID'], '');
    let email = lodashGet(emailConfirmationsDocObj, ['email'], '');
    const emailConfirmationsCount = lodashGet(emailConfirmationsDocObj, ['count'], 0);
    
    
    // --------------------------------------------------
    //   すでに確認済みの場合、エラー
    // --------------------------------------------------
    
    if (emailConfirmationsIsSuccess) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'y5sO-tY_z', messageID: 'IDT_ufsFV' }] });
    }
    
    
    // --------------------------------------------------
    //   メールを送れるのは3回まで、それ以上はエラーにする
    // --------------------------------------------------
    
    if (emailConfirmationsCount >= 3) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'U7gal1E__', messageID: 'EAvJztLfH' }] });
    }
    
    
    // --------------------------------------------------
    //   DB Upsert
    // --------------------------------------------------
    
    let conditionObj = {
      _id: emailConfirmations_id
    };
    
    let saveObj = {};
    
    
    // --------------------------------------------------
    //   編集： 確認メールの送信回数を + 1 にする
    // --------------------------------------------------
    
    if (emailConfirmationID) {
      
      saveObj = {
        $set: {
          count: emailConfirmationsCount + 1,
        }
      };
      
      
    // --------------------------------------------------
    //   新規追加
    // --------------------------------------------------
      
    } else {
      
      const usersDocObj = await ModelUsers.findOne({ _id: loginUsers_id });
      email = lodashGet(usersDocObj, ['emailObj', 'value'], '');
      
      const ISO8601 = moment().toISOString();
      emailConfirmationID = `${shortid.generate()}${shortid.generate()}${shortid.generate()}`;
      
      saveObj = {
        $set: {
          isSuccess: false,
          createdDate: ISO8601,
          users_id: loginUsers_id,
          emailConfirmationID,
          email: email,
          count: emailConfirmationsCount + 1,
        }
      };
      
    }
    
    await ModelEmailConfirmations.upsert({ conditionObj, saveObj });
    
    
    // --------------------------------------------------
    //   Send Mail
    // --------------------------------------------------
    
    const decryptedEmail = decrypt(email);
    
    sendMailConfirmation({
      to: decryptedEmail,
      emailConfirmationID,
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   email: {green ${email}}
    //   decryptedEmail: {green ${decryptedEmail}}
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
    //   Log
    // ---------------------------------------------
    
    const resultErrorObj = returnErrorsArr({
      errorObj,
      endpointID: 'Q_U6qCnFX',
      users_id: loginUsers_id,
      ip: req.ip,
      requestParametersObj,
    });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
});




module.exports = router;