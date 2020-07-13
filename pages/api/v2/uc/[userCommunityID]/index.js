// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';


// ---------------------------------------------
//   Model
// ---------------------------------------------

import ModelUserCommunities from 'app/@database/user-communities/model.js';
import ModelForumThreads from 'app/@database/forum-threads/model.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { returnErrorsArr } from 'app/@modules/log/log.js';
import { CustomError } from 'app/@modules/error/custom.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationInteger } from 'app/@validations/integer.js';
import { validationForumThreadsListLimit, validationForumThreadsLimit } from 'app/@database/forum-threads/validations/limit.js';
import { validationForumCommentsLimit, validationForumRepliesLimit } from 'app/@database/forum-comments/validations/limit.js';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { locale } from 'app/@locales/locale.js';


// ---------------------------------------------
//   API
// ---------------------------------------------

import { initialProps } from 'app/@api/v2/common.js';






// --------------------------------------------------
//   endpointID: R8-TcJ2vj
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
  const loginUsersRole = lodashGet(req, ['user', 'role'], '');
  
  
  // --------------------------------------------------
  //   Language & IP & User Agent
  // --------------------------------------------------
  
  const language = lodashGet(req, ['headers', 'accept-language'], '');
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = lodashGet(req, ['headers', 'user-agent'], '');
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: language
  });
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   GET Data
    // --------------------------------------------------
    
    const userCommunityID = lodashGet(req, ['query', 'userCommunityID'], '');
    const threadListPage = parseInt(lodashGet(req, ['query', 'threadListPage'], 1), 10);
    const threadListLimit = parseInt(lodashGet(req, ['query', 'threadListLimit'], ''), 10);
    const threadPage = parseInt(lodashGet(req, ['query', 'threadPage'], 1), 10);
    const threadLimit = parseInt(lodashGet(req, ['query', 'threadLimit'], ''), 10);
    const commentLimit = parseInt(lodashGet(req, ['query', 'commentLimit'], ''), 10);
    const replyLimit = parseInt(lodashGet(req, ['query', 'replyLimit'], ''), 10);
    
    lodashSet(requestParametersObj, ['userCommunityID'], userCommunityID);
    lodashSet(requestParametersObj, ['threadListPage'], threadListPage);
    lodashSet(requestParametersObj, ['threadListLimit'], threadListLimit);
    lodashSet(requestParametersObj, ['threadPage'], threadPage);
    lodashSet(requestParametersObj, ['threadLimit'], threadLimit);
    lodashSet(requestParametersObj, ['commentLimit'], commentLimit);
    lodashSet(requestParametersObj, ['replyLimit'], replyLimit);
    
    
    
    
    // --------------------------------------------------
    //   Common Initial Props
    // --------------------------------------------------
    
    const commonInitialPropsObj = await initialProps({ req, res, localeObj });
    
    returnObj.login = lodashGet(commonInitialPropsObj, ['login'], false);
    returnObj.loginUsersObj = lodashGet(commonInitialPropsObj, ['loginUsersObj'], {});
    returnObj.headerObj = lodashGet(commonInitialPropsObj, ['headerObj'], {});
    
    
    
    // --------------------------------------------------
    //   ログインしているユーザー情報＆ログインチェック
    // --------------------------------------------------
    
    // returnObj.login = false;
    
    // if (req.isAuthenticated() && req.user) {
      
    //   returnObj.loginUsersObj = req.user;
    //   returnObj.login = true;
      
    // }
    
    
    
    
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
    const followsAdmin = lodashGet(returnObj, ['headerObj', 'followsObj', 'admin'], false);
    const followsFollow = lodashGet(returnObj, ['headerObj', 'followsObj', 'follow'], false);
    const followsBlocked = lodashGet(returnObj, ['headerObj', 'followsObj', 'followBlocked'], false);
    
    returnObj.accessRightRead = false;
    
    if (communityType === 'open' || (communityType === 'closed' && followsFollow)) {
      returnObj.accessRightRead = true;
    }
    
    
    
    
    // --------------------------------------------------
    //   権限
    //   0: ブロックしているユーザー
    //   1: 非ログインユーザー
    //   2: ログインユーザー（以下ログイン済みユーザー）
    //   3: コミュニティのメンバー
    //   50: コミュニティの管理者
    //   100: サイト運営
    // --------------------------------------------------
    
    returnObj.accessLevel = 1;
    
    
    // ---------------------------------------------
    //   - サイト運営
    // ---------------------------------------------
    
    if (loginUsersRole === 'administrator') {
      
      returnObj.accessLevel = 100;
      
      
    // ---------------------------------------------
    //   - コミュニティの管理者
    // ---------------------------------------------
    
    } else if (followsAdmin) {
      
      returnObj.accessLevel = 50;
      
      
    // ---------------------------------------------
    //   - コミュニティのメンバー
    // ---------------------------------------------
    
    } else if (followsFollow) {
      
      returnObj.accessLevel = 3;
      
      
    // ---------------------------------------------
    //   - ブロックしているユーザー
    // ---------------------------------------------
    
    } else if (followsBlocked) {
      
      returnObj.accessLevel = 0;
      
      
    // ---------------------------------------------
    //   - ログインユーザー
    // ---------------------------------------------
    
    } else if (loginUsersRole === 'user') {
      
      returnObj.accessLevel = 2;
      
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
      
      if (await validationInteger({ throwError: false, required: true, value: threadListPage }).error === false) {
        argumentsObj.page = threadListPage;
      }
      
      if (await validationForumThreadsListLimit({ throwError: false, required: true, value: threadListLimit }).error === false) {
        argumentsObj.limit = threadListLimit;
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
      
      if (await validationInteger({ throwError: false, required: true, value: threadPage }).error === false) {
        argumentsObj.threadPage = threadPage;
      }
      
      if (await validationForumThreadsLimit({ throwError: false, required: true, value: threadLimit }).error === false) {
        argumentsObj.threadLimit = threadLimit;
      }
      
      if (await validationForumCommentsLimit({ throwError: false, required: true, value: commentLimit }).error === false) {
        argumentsObj.commentLimit = commentLimit;
      }
      
      if (await validationForumRepliesLimit({ throwError: false, required: true, value: replyLimit }).error === false) {
        argumentsObj.replyLimit = replyLimit;
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
      ip,
      userAgent,
      requestParametersObj,
      
    });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
  
};