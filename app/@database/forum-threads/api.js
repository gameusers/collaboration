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
const shortid = require('shortid');
const moment = require('moment');
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../@modules/csrf');
const { returnErrorsArr } = require('../../@modules/log/log');
const { CustomError } = require('../../@modules/error/custom');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationInteger } = require('../../@validations/integer');

const { validationForumThreadsIDServer } = require('./validations/_id-server');
const { validationForumThreadsLimit } = require('./validations/limit');
// const { validationUsersEmailServer } = require('./validations/email-server');
// const { validationUsersPlayerIDServer } = require('./validations/player-id-server');
// const { validationUsersPagesType, validationUsersPagesName, validationUsersPagesLanguage } = require('./validations/pages');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelForumThreads = require('./model');
// const ModelEmailConfirmations = require('../../@database/email-confirmations/model');


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
//   Logout / endpointID: WM1-TR3MY
// --------------------------------------------------

router.post('/user-community/list', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
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
    
    const { userCommunities_id, page, limit } = req.body;
    
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    
    lodashSet(requestParametersObj, ['userCommunities_id'], userCommunities_id);
    lodashSet(requestParametersObj, ['page'], pageInt);
    lodashSet(requestParametersObj, ['limit'], limitInt);
    
    // console.log(chalk`
    //   userCommunities_id: {green ${userCommunities_id}}
    //   page: {green ${pageInt} / ${typeof pageInt}}
    //   limit: {green ${limitInt} / ${typeof limitInt}}
    // `);
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    await validationForumThreadsIDServer({ value: userCommunities_id });
    await validationInteger({ throwError: true, required: true, value: pageInt });
    await validationForumThreadsLimit({ throwError: true, required: true, value: limitInt });
    
    
    // --------------------------------------------------
    //   DB find / Forum Threads
    // --------------------------------------------------
    
    returnObj.forumThreadsObj = await ModelForumThreads.findForForumThreads({
      localeObj,
      loginUsers_id,
      userCommunities_id,
      page: pageInt,
      limit: limitInt,
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
      endpointID: 'WM1-TR3MY',
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