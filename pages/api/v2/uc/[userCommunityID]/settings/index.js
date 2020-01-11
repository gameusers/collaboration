// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelUserCommunities = require('../../../../../../app/@database/user-communities/model');
const ModelForumThreads = require('../../../../../../app/@database/forum-threads/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../../../../app/@modules/csrf');
const { returnErrorsArr } = require('../../../../../../app/@modules/log/log');
const { CustomError } = require('../../../../../../app/@modules/error/custom');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationInteger } = require('../../../../../../app/@validations/integer');
const { validationForumThreadsListLimit, validationForumThreadsLimit } = require('../../../../../../app/@database/forum-threads/validations/limit');
const { validationForumCommentsLimit, validationForumRepliesLimit } = require('../../../../../../app/@database/forum-comments/validations/limit');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../../app/@locales/locale');


// ---------------------------------------------
//   API
// ---------------------------------------------

const { initialProps } = require('../../../../../../app/@api/v2/common');




// --------------------------------------------------
//   endpointID: hc7YMP_C8
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
      
      userCommunityID
      
    } = bodyObj;
    
    lodashSet(requestParametersObj, ['userCommunityID'], userCommunityID);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 401;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'xWkmN-gAs', messageID: 'xLLNIpo6a' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Common Initial Props
    // --------------------------------------------------
    
    const commonInitialPropsObj = await initialProps({ req, res, localeObj });
    
    returnObj.login = lodashGet(commonInitialPropsObj, ['login'], false);
    returnObj.headerObj = lodashGet(commonInitialPropsObj, ['headerObj'], {});
    
    
    // const saveArr = [1];
    
    // if (!saveArr || !saveArr.length) {
    //   console.log('error');
    // }
    
    // console.log(chalk`
    //   save
    //   !saveArr.length: {green ${!saveArr.length}}
    // `);
    
    
    // --------------------------------------------------
    //   DB find / User Community
    // --------------------------------------------------
    
    const conditionObj = {
      userCommunityID,
      // userCommunityID: 'aaa',
    };
    
    const userCommunityObj = await ModelUserCommunities.findOne({ conditionObj });
    // const userCommunityArr = await ModelUserCommunities.findForUserCommunity({
    //   localeObj,
    //   loginUsers_id,
    //   userCommunityID,
    // });
    // console.log(`
    //   ----- userCommunityObj -----\n
    //   ${util.inspect(userCommunityObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    const userCommunities_id = lodashGet(userCommunityObj, ['_id'], '');
    const userCommunitiesUsers_id = lodashGet(userCommunityObj, ['users_id'], '');
    
    
    // --------------------------------------------------
    //   コミュニティが存在しない場合はエラー
    // --------------------------------------------------
    
    if (!userCommunities_id) {
      statusCode = 404;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'fppwXm8iV', messageID: 'Error' }] });
    }
    
    returnObj.userCommunityObj = userCommunityObj;
    
    
    // --------------------------------------------------
    //   コミュニティのオーナーでない場合はエラー
    // --------------------------------------------------
    
    if (userCommunitiesUsers_id !== loginUsers_id) {
      statusCode = 401;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: '5rP5wjjRU', messageID: 'Error' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   /pages/api/v2/uc/[userCommunityID]/settings/index.js
    //   loginUsers_id: {green ${loginUsers_id}}
    //   userCommunitiesUsers_id: {green ${userCommunitiesUsers_id}}
    //   userCommunityID: {green ${userCommunityID}}
    //   userCommunities_id：{green ${userCommunities_id}}
    // `);
    
    // console.log(`
    //   ----- userCommunityArr -----\n
    //   ${util.inspect(userCommunityArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    // // --------------------------------------------------
    // //   DB find / Forum Threads For List
    // // --------------------------------------------------
    
    // let argumentsObj = {
    //   localeObj,
    //   loginUsers_id,
    //   userCommunities_id,
    // };
    
    // if (await validationInteger({ throwError: false, required: true, value: forumThreadListPage }).error === false) {
    //   argumentsObj.page = forumThreadListPage;
    // }
    
    // if (await validationForumThreadsListLimit({ throwError: false, required: true, value: forumThreadListLimit }).error === false) {
    //   argumentsObj.limit = forumThreadListLimit;
    // }
    
    // returnObj.forumThreadsForListObj = await ModelForumThreads.findForThreadsList(argumentsObj);
    
    
    // // --------------------------------------------------
    // //   DB find / Forum
    // // --------------------------------------------------
    
    // argumentsObj = {
    //   req,
    //   localeObj,
    //   loginUsers_id,
    //   userCommunities_id,
    // };
    
    // if (await validationInteger({ throwError: false, required: true, value: forumThreadPage }).error === false) {
    //   argumentsObj.threadPage = forumThreadPage;
    // }
    
    // if (await validationForumThreadsLimit({ throwError: false, required: true, value: forumThreadLimit }).error === false) {
    //   argumentsObj.threadLimit = forumThreadLimit;
    // }
    
    // if (await validationForumCommentsLimit({ throwError: false, required: true, value: forumCommentLimit }).error === false) {
    //   argumentsObj.commentLimit = forumCommentLimit;
    // }
    
    // if (await validationForumRepliesLimit({ throwError: false, required: true, value: forumReplyLimit }).error === false) {
    //   argumentsObj.replyLimit = forumReplyLimit;
    // }
    
    // const forumObj = await ModelForumThreads.findForForum(argumentsObj);
    
    // returnObj.forumThreadsObj = forumObj.forumThreadsObj;
    // returnObj.forumCommentsObj = forumObj.forumCommentsObj;
    // returnObj.forumRepliesObj = forumObj.forumRepliesObj;
    
    
    
    
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
      endpointID: 'hc7YMP_C8',
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