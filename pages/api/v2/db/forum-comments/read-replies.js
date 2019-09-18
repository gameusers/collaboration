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


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationInteger } = require('../../../../../app/@validations/integer');

const { validationUserCommunities_idServer } = require('../../../../../app/@database/user-communities/validations/_id-server');

const { validationForumThreadsLimit } = require('../../../../../app/@database/forum-threads/validations/limit');
const { validationForumCommentsLimit, validationForumRepliesLimit } = require('../../../../../app/@database/forum-comments/validations/limit');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');




// --------------------------------------------------
//   endpointID: AQOnS_hsz
// --------------------------------------------------

export default async (req, res) => {
  
  
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
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const bodyObj = JSON.parse(req.body);
    
    const {
      
      gameCommunities_id,
      userCommunities_id,
      forumComments_id,
      forumThreads_idArr,
      threadPage,
      threadLimit,
      commentPage, 
      commentLimit,
      replyPage,
      replyLimit,
      
    } = bodyObj;
    
    
    lodashSet(requestParametersObj, ['gameCommunities_id'], gameCommunities_id);
    lodashSet(requestParametersObj, ['userCommunities_id'], userCommunities_id);
    lodashSet(requestParametersObj, ['forumComments_id'], forumComments_id);
    lodashSet(requestParametersObj, ['forumThreads_idArr'], forumThreads_idArr);
    lodashSet(requestParametersObj, ['threadPage'], threadPage);
    lodashSet(requestParametersObj, ['threadLimit'], threadLimit);
    lodashSet(requestParametersObj, ['commentPage'], commentPage);
    lodashSet(requestParametersObj, ['commentLimit'], commentLimit);
    lodashSet(requestParametersObj, ['replyPage'], replyPage);
    lodashSet(requestParametersObj, ['replyLimit'], replyLimit);
    
    
    // console.log(chalk`
    //   /pages/api/v2/db/forum-comments/read-replies.js
      
    //   loginUsers_id: {green ${loginUsers_id}}
      
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   forumComments_id: {green ${forumComments_id}}
    //   threadPage: {green ${threadPage} / ${typeof threadPage}}
    //   threadLimit: {green ${threadLimit} / ${typeof threadLimit}}
    //   commentPage: {green ${commentPage} / ${typeof commentPage}}
    //   commentLimit: {green ${commentLimit} / ${typeof commentLimit}}
    //   replyPage: {green ${replyPage} / ${typeof replyPage}}
    //   replyLimit: {green ${replyLimit} / ${typeof replyLimit}}
    // `);
    
    // console.log(`
    //   ----- forumThreads_idArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumThreads_idArr)), { colors: true, depth: null })}\n
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
      
    }
    
    await validationInteger({ throwError: true, required: true, value: threadPage });
    await validationForumThreadsLimit({ throwError: true, required: true, value: threadLimit });
    
    await validationInteger({ throwError: true, required: true, value: commentPage });
    await validationForumCommentsLimit({ throwError: true, required: true, value: commentLimit });
    
    await validationInteger({ throwError: true, required: true, value: replyPage });
    await validationForumRepliesLimit({ throwError: true, required: true, value: replyLimit });
    
    
    
    
    // --------------------------------------------------
    //   DB find / Forum Comments - Replies
    // --------------------------------------------------
    
    const forumRepliesObj = await ModelForumComments.findRepliesByForumComment_id({
      
      req,
      localeObj,
      loginUsers_id,
      userCommunities_id,
      forumComments_id,
      commentPage,
      commentLimit,
      replyPage,
      replyLimit,
      
    });
    
    returnObj.forumRepliesObj = forumRepliesObj;
    
    
    console.log(`
      ----- forumRepliesObj -----\n
      ${util.inspect(JSON.parse(JSON.stringify(forumRepliesObj)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    // // --------------------------------------------------
    // //   DB find / Forum Threads
    // // --------------------------------------------------
    
    // const forumObj = await ModelForumThreads.findByUserCommunities_id({
      
    //   req,
    //   localeObj,
    //   loginUsers_id,
    //   userCommunities_id,
    //   forumThreads_idArr,
    //   threadPage,
    //   threadLimit,
    //   commentPage,
    //   commentLimit,
    //   replyPage,
    //   replyLimit,
      
    // });
    
    // returnObj.forumThreadsObj = forumObj.forumThreadsObj;
    // returnObj.forumCommentsObj = forumObj.forumCommentsObj;
    // returnObj.forumRepliesObj = forumObj.forumRepliesObj;
    
    // // returnObj.forumThreadsObj.dataObj['_XDDSTWV_'].name = 'AAA';
    
    
    
    
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
      endpointID: 'AQOnS_hsz',
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