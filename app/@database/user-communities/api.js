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
const upload = multer({ dest: 'static/' });
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const shortid = require('shortid');
const moment = require('moment');
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../@modules/csrf');
const { verifyRecaptcha } = require('../../@modules/recaptcha');
const { encrypt }  = require('../../@modules/crypto');
const { errorCodeIntoErrorObj } = require('../../@modules/error/error-obj');
const { returnErrorsArr } = require('../../@modules/log/log');
const { CustomError } = require('../../@modules/error/custom');
const { sendMailConfirmation } = require('../../@modules/email');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatEmailSecret } = require('../../@format/email');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validation_id } = require('../../@validations/_id');

const { validationUsersLoginID } = require('./validations/login-id');
const { validationUsersLoginIDServer } = require('./validations/login-id-server');
const { validationUsersLoginPassword } = require('./validations/login-password');
const { validationUsersEmailServer } = require('./validations/email-server');
const { validationUsersPlayerIDServer } = require('./validations/player-id-server');
const { validationUsersPagesType, validationUsersPagesName, validationUsersPagesLanguage } = require('./validations/pages');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelUsers = require('./model');
const ModelEmailConfirmations = require('../../@database/email-confirmations/model');
const SchemaUsers = require('../../@database/users/schema');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { addLocaleData } = require('react-intl');
const en = require('react-intl/locale-data/en');
const ja = require('react-intl/locale-data/ja');
addLocaleData([...en, ...ja]);

const { locale } = require('../../@locales/locale');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();




// --------------------------------------------------
//   Status Code & Error Arguments Object
// --------------------------------------------------

let statusCode = 400;




// --------------------------------------------------
//   Logout / endpointID: 1UwvSqoD9
// --------------------------------------------------

router.post('/test', upload.none(), function(req, res, next) {
  
  
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
    
    
    // ---------------------------------------------
    //   ログアウト処理
    // ---------------------------------------------
    
    
    
    
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
      endpointID: '1UwvSqoD9',
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