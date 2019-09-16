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
//   Model
// ---------------------------------------------

const ModelUserCommunities = require('../../../../../app/@database/user-communities/model');
const ModelForumThreads = require('../../../../../app/@database/forum-threads/model');
const ModelForumComments = require('../../../../../app/@database/forum-comments/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../../../app/@modules/csrf');
const { returnErrorsArr } = require('../../../../../app/@modules/log/log');
const { CustomError } = require('../../../../../app/@modules/error/custom');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationInteger } = require('../../../../../app/@validations/integer');
const { validationIP } = require('../../../../../app/@validations/ip');

const { validationUserCommunities_idServer } = require('../../../../../app/@database/user-communities/validations/_id-server');

const { validationForumCommentsLimit } = require('../../../../../app/@database/forum-comments/validations/limit');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');




// --------------------------------------------------
//   Status Code & Error Arguments Object
// --------------------------------------------------

let statusCode = 400;




// --------------------------------------------------
//   endpointID: SR-1hVpJ_
// --------------------------------------------------

export default async (req, res) => {
  
  
  console.log('/pages/api/v2/db/forum-comments/read-comments.js');
  
  
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
    
    const bodyObj = JSON.parse(req.body);
    
    const {
      
      gameCommunities_id,
      userCommunities_id,
      forumThreads_id,
      forumThreads_idArr,
      page,
      limit
      
    } = bodyObj;
    
    
    lodashSet(requestParametersObj, ['gameCommunities_id'], gameCommunities_id);
    lodashSet(requestParametersObj, ['userCommunities_id'], userCommunities_id);
    lodashSet(requestParametersObj, ['forumThreads_id'], forumThreads_id);
    lodashSet(requestParametersObj, ['forumThreads_idArr'], forumThreads_idArr);
    lodashSet(requestParametersObj, ['page'], page);
    lodashSet(requestParametersObj, ['limit'], limit);
    
    
    console.log(chalk`
      gameCommunities_id: {green ${gameCommunities_id}}
      userCommunities_id: {green ${userCommunities_id}}
      forumThreads_id: {green ${forumThreads_id}}
      page: {green ${page} / ${typeof page}}
      limit: {green ${limit} / ${typeof limit}}
    `);
    
    
    
    
    // ---------------------------------------------
    //   parse
    // ---------------------------------------------
    
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    // const parsedForumThreads_idArr = JSON.parse(forumThreads_idArr);
    
    // console.log(`
    //   ----- parsedForumThreads_idArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(parsedForumThreads_idArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    if (gameCommunities_id) {
      
      
      
    } else {
      
      await validationUserCommunities_idServer({ value: userCommunities_id });
      // await validationForumThreads_idServerUC({ forumThreads_id, userCommunities_id });
      
    }
    
    await validationInteger({ throwError: true, required: true, value: pageInt });
    await validationForumCommentsLimit({ throwError: true, required: true, value: limitInt });
    
    
    
    
    // --------------------------------------------------
    //   DB find / Forum Threads
    // --------------------------------------------------
    
    // const forumThreadsArr = await ModelForumThreads.findThreadsByForumThreads_idArr({
    //   req,
    //   localeObj,
    //   loginUsers_id,
    //   forumThreads_idArr: parsedForumThreads_idArr,
    // });
    
    // returnObj.forumThreadsArr = forumThreadsArr;
    
    
    // // console.log(`
    // //   ----- forumThreadsArr -----\n
    // //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsArr)), { colors: true, depth: null })}\n
    // //   --------------------\n
    // // `);
    
    
    // // --------------------------------------------------
    // //   DB find / Forum Comments & Replies
    // // --------------------------------------------------
    
    // const forumCommentsAndRepliesObj = await ModelForumComments.findForForumCommentsAndReplies({
    //   localeObj,
    //   loginUsers_id,
    //   forumThreads_idArr: parsedForumThreads_idArr,
    //   commentPage: pageInt,
    //   commentLimit: limitInt,
    // });
    
    // returnObj.forumCommentsAndRepliesObj = forumCommentsAndRepliesObj;
    
    
    // console.log(`
    //   ----- forumCommentsAndRepliesObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumCommentsAndRepliesObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
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
    
    return res.status(200).json(returnObj);
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   Log
    // ---------------------------------------------
    
    const resultErrorObj = returnErrorsArr({
      errorObj,
      endpointID: 'jbHqASXst',
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