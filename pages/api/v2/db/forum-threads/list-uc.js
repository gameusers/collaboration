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

const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationInteger } = require('../../../../../app/@validations/integer');
const { validationUserCommunities_idServer } = require('../../../../../app/@database/user-communities/validations/_id-server');
const { validationForumThreadsLimit } = require('../../../../../app/@database/forum-threads/validations/limit');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelForumThreads = require('../../../../../app/@database/forum-threads/model');
const ModelUserCommunities = require('../../../../../app/@database/user-communities/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../../../app/@modules/csrf');
const { returnErrorsArr } = require('../../../../../app/@modules/log/log');
const { CustomError } = require('../../../../../app/@modules/error/custom');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

// const { addLocaleData } = require('react-intl');
// const en = require('react-intl/locale-data/en');
// const ja = require('react-intl/locale-data/ja');
// addLocaleData([...en, ...ja]);

const { locale } = require('../../../../../app/@locales/locale');




// --------------------------------------------------
//   Status Code & Error Arguments Object
// --------------------------------------------------

let statusCode = 400;




// --------------------------------------------------
//   スレッド一覧 読み込み / ユーザーコミュニティ用 / endpointID: WM1-TR3MY
// --------------------------------------------------

export default async (req, res) => {
  
  
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
    
    console.log(`\n---------- req.cookies ----------\n`);
    console.dir(req.cookies);
    console.log(`\n-----------------------------------\n`);
    
    console.log(`\n---------- req.query ----------\n`);
    console.dir(req.query);
    console.log(`\n-----------------------------------\n`);
    
    console.log(`\n---------- req.body ----------\n`);
    console.dir(req.body);
    console.log(`\n-----------------------------------\n`);
    
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
    
    // verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    await validationUserCommunities_idServer({ value: userCommunities_id });
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
    
    
    // --------------------------------------------------
    //   DB find / User Communities
    // --------------------------------------------------
    
    const userCommunityArr = await ModelUserCommunities.find({
      conditionObj: {
        _id: userCommunities_id
      }
    });
    
    returnObj.updatedDateObj = lodashGet(userCommunityArr, [0, 'updatedDateObj'], {});
    
    
    // ---------------------------------------------
    //   Success
    // ---------------------------------------------
    
    res.status(200).json(returnObj);
    
    
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
    
    res.status(statusCode).json(resultErrorObj);
    
    
  }
  
  
};