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
const lodashHas = require('lodash/has');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelUserCommunities = require('../../../../../app/@database/user-communities/model');
const ModelForumThreads = require('../../../../../app/@database/forum-threads/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { returnErrorsArr } = require('../../../../../app/@modules/log/log');
const { CustomError } = require('../../../../../app/@modules/error/custom');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationInteger } = require('../../../../../app/@validations/integer');
const { validationForumThreadsListLimit, validationForumThreadsLimit } = require('../../../../../app/@database/forum-threads/validations/limit');
const { validationForumCommentsLimit, validationForumRepliesLimit } = require('../../../../../app/@database/forum-comments/validations/limit');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');


// ---------------------------------------------
//   API
// ---------------------------------------------

const { initialProps } = require('../../../../../app/@api/v2/common');




// --------------------------------------------------
//   endpointID: R8-TcJ2vj
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
    //   GET Data
    // --------------------------------------------------
    
    const userCommunityID = req.query.userCommunityID;
    const forumThreadListPage = parseInt(req.query.forumThreadListPage, 10);
    const forumThreadListLimit = parseInt(req.query.forumThreadListLimit, 10);
    const forumThreadPage = parseInt(req.query.forumThreadPage, 10);
    const forumThreadLimit = parseInt(req.query.forumThreadLimit, 10);
    const forumCommentLimit = parseInt(req.query.forumCommentLimit, 10);
    const forumReplyLimit = parseInt(req.query.forumReplyLimit, 10);
    
    lodashSet(requestParametersObj, ['userCommunityID'], userCommunityID);
    lodashSet(requestParametersObj, ['forumThreadListPage'], forumThreadListPage);
    lodashSet(requestParametersObj, ['forumThreadListLimit'], forumThreadListLimit);
    lodashSet(requestParametersObj, ['forumThreadPage'], forumThreadPage);
    lodashSet(requestParametersObj, ['forumThreadLimit'], forumThreadLimit);
    lodashSet(requestParametersObj, ['forumCommentLimit'], forumCommentLimit);
    lodashSet(requestParametersObj, ['forumReplyLimit'], forumReplyLimit);
    
    
    
    
    // --------------------------------------------------
    //   Common Initial Props
    // --------------------------------------------------
    
    const commonInitialPropsObj = await initialProps({ req, res, localeObj });
    
    returnObj.login = lodashGet(commonInitialPropsObj, ['login'], false);
    returnObj.loginUsersObj = lodashGet(commonInitialPropsObj, ['loginUsersObj'], {});
    returnObj.headerObj = lodashGet(commonInitialPropsObj, ['headerObj'], {});
    
    
    
    
    // --------------------------------------------------
    //   DB find / User Community
    // --------------------------------------------------
    
    const userCommunityObj = await ModelUserCommunities.findForUserCommunity({
      localeObj,
      loginUsers_id,
      userCommunityID,
    });
    
    
    // ---------------------------------------------
    //   - コミュニティのデータがない場合はエラー
    // ---------------------------------------------
    
    if (Object.keys(userCommunityObj).length === 0) {
      statusCode = 404;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'retRq6eFo', messageID: 'Error' }] });
    }
    
    
    // ---------------------------------------------
    //   - userCommunities_id
    // ---------------------------------------------
    
    const userCommunities_id = lodashGet(userCommunityObj, ['_id'], '');
    
    
    // ---------------------------------------------
    //   - headerObj
    // ---------------------------------------------
    
    if (lodashHas(userCommunityObj, ['headerObj', 'imagesAndVideosObj'])) {
      returnObj.headerObj = userCommunityObj.headerObj;
    }
    
    delete userCommunityObj.headerObj;
    
    
    // ---------------------------------------------
    //   - userCommunityObj
    // ---------------------------------------------
    
    returnObj.userCommunityObj = userCommunityObj;
    
    
    // ---------------------------------------------
    //   - コンテンツを表示するかどうか
    // ---------------------------------------------
    
    const communityType = lodashGet(userCommunityObj, ['communityType'], 'open');
    const member = lodashGet(userCommunityObj, ['member'], false);
    
    returnObj.accessRightRead = false;
    
    if (communityType === 'open' || (communityType === 'closed' && member)) {
      returnObj.accessRightRead = true;
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/uc/[userCommunityID]/index.js
    // `);
    
    // console.log(chalk`
    //   communityType: {green ${communityType}}
    //   member: {green ${member}}
    //   returnObj.accessRightRead: {green ${returnObj.accessRightRead}}
    // `);
    
    // console.log(`
    //   ----------------------------------------
    // `);
    
    
    
    
    // --------------------------------------------------
    //   コンテンツを表示していい場合はフォーラムのデータを取得
    // --------------------------------------------------
    
    if (returnObj.accessRightRead) {
      
      
      // --------------------------------------------------
      //   DB find / Forum Threads For List
      // --------------------------------------------------
      
      let argumentsObj = {
        localeObj,
        loginUsers_id,
        userCommunities_id,
      };
      
      if (await validationInteger({ throwError: false, required: true, value: forumThreadListPage }).error === false) {
        argumentsObj.page = forumThreadListPage;
      }
      
      if (await validationForumThreadsListLimit({ throwError: false, required: true, value: forumThreadListLimit }).error === false) {
        argumentsObj.limit = forumThreadListLimit;
      }
      
      returnObj.forumThreadsForListObj = await ModelForumThreads.findForThreadsList(argumentsObj);
      
      
      // --------------------------------------------------
      //   DB find / Forum
      // --------------------------------------------------
      
      argumentsObj = {
        req,
        localeObj,
        loginUsers_id,
        userCommunities_id,
      };
      
      if (await validationInteger({ throwError: false, required: true, value: forumThreadPage }).error === false) {
        argumentsObj.threadPage = forumThreadPage;
      }
      
      if (await validationForumThreadsLimit({ throwError: false, required: true, value: forumThreadLimit }).error === false) {
        argumentsObj.threadLimit = forumThreadLimit;
      }
      
      if (await validationForumCommentsLimit({ throwError: false, required: true, value: forumCommentLimit }).error === false) {
        argumentsObj.commentLimit = forumCommentLimit;
      }
      
      if (await validationForumRepliesLimit({ throwError: false, required: true, value: forumReplyLimit }).error === false) {
        argumentsObj.replyLimit = forumReplyLimit;
      }
      
      const forumObj = await ModelForumThreads.findForForum(argumentsObj);
      
      returnObj.forumThreadsObj = forumObj.forumThreadsObj;
      returnObj.forumCommentsObj = forumObj.forumCommentsObj;
      returnObj.forumRepliesObj = forumObj.forumRepliesObj;
      
      
    }
    
    
    
    
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
      endpointID: 'R8-TcJ2vj',
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