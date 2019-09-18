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


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../../../app/@modules/csrf');
const { returnErrorsArr } = require('../../../../../app/@modules/log/log');
// const { CustomError } = require('../../../../../app/@modules/error/custom');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationInteger } = require('../../../../../app/@validations/integer');
// const { validationIP } = require('../../../../../app/@validations/ip');

const { validationUserCommunities_idServer } = require('../../../../../app/@database/user-communities/validations/_id-server');

const { validationForumThreadsLimit } = require('../../../../../app/@database/forum-threads/validations/limit');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');




// --------------------------------------------------
//   endpointID: SR-1hVpJ_
// --------------------------------------------------

export default async (req, res) => {
  
  
  // console.log('/pages/api/v2/db/forum-threads/read-threads.js');
  
  // --------------------------------------------------
  //   Status Code
  // --------------------------------------------------
  
  let statusCode = 400;
  
  
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
  
  
  // console.log(`
  //   ----- req.cookies -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(req.cookies)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(`
  //   ----- req.query -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(req.query)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(`
  //   ----- req.body -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(req.body)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(`\n---------- req ----------\n`);
  // console.dir(req);
  // console.log(`\n-----------------------------------\n`);
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const bodyObj = JSON.parse(req.body);
    
    const { 
      
      gameCommunities_id,
      userCommunities_id,
      threadPage,
      threadLimit,
      commentPage, 
      commentLimit,
      replyPage,
      replyLimit,
      
    } = bodyObj;
    
    
    lodashSet(requestParametersObj, ['gameCommunities_id'], gameCommunities_id);
    lodashSet(requestParametersObj, ['userCommunities_id'], userCommunities_id);
    lodashSet(requestParametersObj, ['threadPage'], threadPage);
    lodashSet(requestParametersObj, ['threadLimit'], threadLimit);
    lodashSet(requestParametersObj, ['commentPage'], commentPage);
    lodashSet(requestParametersObj, ['commentLimit'], commentLimit);
    lodashSet(requestParametersObj, ['replyPage'], replyPage);
    lodashSet(requestParametersObj, ['replyLimit'], replyLimit);
    
    
    
    
    // ---------------------------------------------
    //   parseInt
    // ---------------------------------------------
    
    const threadPageInt = parseInt(threadPage, 10);
    const threadLimitInt = parseInt(threadLimit, 10);
    const commentPageInt = parseInt(commentPage, 10);
    const commentLimitInt = parseInt(commentLimit, 10);
    const replyPageInt = parseInt(replyPage, 10);
    const replyLimitInt = parseInt(replyLimit, 10);
    
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
      
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   threadPage: {green ${threadPage} / ${typeof threadPage}}
    //   threadLimit: {green ${threadLimit} / ${typeof threadLimit}}
    //   commentPage: {green ${commentPage} / ${typeof commentPage}}
    //   commentLimit: {green ${commentLimit} / ${typeof commentLimit}}
    //   replyPage: {green ${replyPage} / ${typeof replyPage}}
    //   replyLimit: {green ${replyLimit} / ${typeof replyLimit}}
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
      
    }
    
    await validationInteger({ throwError: true, required: true, value: threadPageInt });
    await validationForumThreadsLimit({ throwError: true, required: true, value: threadLimitInt });
    
    
    
    
    // --------------------------------------------------
    //   DB find / Forum Threads
    // --------------------------------------------------
    
    const argumentsObj = {
      req,
      localeObj,
      loginUsers_id,
      userCommunities_id,
      threadPage: threadPageInt,
      threadLimit: threadLimitInt,
    };
    
    if (commentPage) {
      argumentsObj.commentPage = commentPageInt;
    }
    
    if (commentLimit) {
      argumentsObj.commentLimit = commentLimitInt;
    }
    
    if (replyPage) {
      argumentsObj.replyPage = replyPageInt;
    }
    
    if (replyLimit) {
      argumentsObj.replyLimit = replyLimitInt;
    }
    
    
    const forumObj = await ModelForumThreads.findByUserCommunities_id(argumentsObj);
    
    returnObj.forumThreadsObj = forumObj.forumThreadsObj;
    returnObj.forumCommentsObj = forumObj.forumCommentsObj;
    returnObj.forumRepliesObj = forumObj.forumRepliesObj;
    
    
    
    
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
      endpointID: 'SR-1hVpJ_',
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