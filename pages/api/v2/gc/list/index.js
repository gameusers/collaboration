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

import ModelGameCommunities from 'app/@database/game-communities/model.js';
import ModelForumThreads from 'app/@database/forum-threads/model.js';
import ModelFeeds from 'app/@database/feeds/model.js';


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
//   endpointID: Q4XBgtXED
// --------------------------------------------------

export default async (req, res) => {


  // --------------------------------------------------
  //   Status Code
  // --------------------------------------------------

  let statusCode = 400;


  // --------------------------------------------------
  //   Property
  // --------------------------------------------------

  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  // const loginUsersRole = lodashGet(req, ['user', 'role'], '');


  // --------------------------------------------------
  //   Language & IP & User Agent
  // --------------------------------------------------

  const acceptLanguage = lodashGet(req, ['headers', 'accept-language'], '');
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = lodashGet(req, ['headers', 'user-agent'], '');


  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------

  const localeObj = locale({
    acceptLanguage
  });




  try {


    // --------------------------------------------------
    //   GET Data
    // --------------------------------------------------

    const page = parseInt(lodashGet(req, ['query', 'page'], 1), 10);
    const limit = parseInt(lodashGet(req, ['query', 'limit'], ''), 10);

    lodashSet(requestParametersObj, ['page'], page);
    lodashSet(requestParametersObj, ['limit'], limit);




    // --------------------------------------------------
    //   Common Initial Props
    // --------------------------------------------------

    const returnObj = await initialProps({ req, localeObj, getHeroImage: true });




    // --------------------------------------------------
    //   DB find / Game Community
    // --------------------------------------------------

    // const gameCommunityObj = await ModelGameCommunities.findForGameCommunity({

    //   localeObj,
    //   loginUsers_id,
    //   urlID,

    // });

    // // console.log(`
    // //   ----- gameCommunityObj -----\n
    // //   ${util.inspect(gameCommunityObj, { colors: true, depth: null })}\n
    // //   --------------------\n
    // // `);

    // // ---------------------------------------------
    // //   - コミュニティのデータがない場合はエラー
    // // ---------------------------------------------

    // if (!lodashHas(gameCommunityObj, ['gameCommunitiesObj', '_id'])) {

    //   statusCode = 404;
    //   throw new CustomError({ level: 'warn', errorsArr: [{ code: 'mb7-816Fu', messageID: 'Error' }] });

    // }


    // // ---------------------------------------------
    // //   - gameCommunities_id
    // // ---------------------------------------------

    // const gameCommunities_id = lodashGet(gameCommunityObj, ['gameCommunitiesObj', '_id'], '');


    // // ---------------------------------------------
    // //   - headerObj
    // // ---------------------------------------------

    // returnObj.headerObj = gameCommunityObj.headerObj;


    // // ---------------------------------------------
    // //   - gameCommunityObj
    // // ---------------------------------------------

    // returnObj.gameCommunityObj = gameCommunityObj.gameCommunitiesObj;




    // --------------------------------------------------
    //   DB find / Feed
    // --------------------------------------------------

    returnObj.feedObj = await ModelFeeds.findFeed({

      localeObj,
      arr: ['all'],

    });




    // --------------------------------------------------
    //   権限
    //   0: ブロックしているユーザー
    //   1: 非ログインユーザー
    //   2: ログインユーザー（以下ログイン済みユーザー）
    //   3: フォロワー
    //   100: サイト運営
    // --------------------------------------------------

    // const followsFollow = lodashGet(returnObj, ['headerObj', 'followsObj', 'follow'], false);
    // const followsBlocked = lodashGet(returnObj, ['headerObj', 'followsObj', 'followBlocked'], false);

    // returnObj.accessLevel = 1;


    // // ---------------------------------------------
    // //   - サイト運営
    // // ---------------------------------------------

    // if (loginUsersRole === 'administrator') {

    //   returnObj.accessLevel = 100;


    // // ---------------------------------------------
    // //   - フォロワー
    // // ---------------------------------------------

    // } else if (followsFollow) {

    //   returnObj.accessLevel = 3;


    // // ---------------------------------------------
    // //   - ブロックしているユーザー
    // // ---------------------------------------------

    // } else if (followsBlocked) {

    //   returnObj.accessLevel = 0;


    // // ---------------------------------------------
    // //   - ログインユーザー
    // // ---------------------------------------------

    // } else if (loginUsersRole === 'user') {

    //   returnObj.accessLevel = 2;

    // }




    // // --------------------------------------------------
    // //   DB find / Forum Threads For List
    // // --------------------------------------------------

    // let argumentsObj = {

    //   localeObj,
    //   loginUsers_id,
    //   gameCommunities_id,

    // };

    // if (await validationInteger({ throwError: false, required: true, value: threadListPage }).error === false) {
    //   argumentsObj.page = threadListPage;
    // }

    // if (await validationForumThreadsListLimit({ throwError: false, required: true, value: threadListLimit }).error === false) {
    //   argumentsObj.limit = threadListLimit;
    // }

    // returnObj.forumThreadsForListObj = await ModelForumThreads.findForThreadsList(argumentsObj);




    // // --------------------------------------------------
    // //   フォーラムデータ取得
    // // --------------------------------------------------

    // argumentsObj = {

    //   req,
    //   localeObj,
    //   loginUsers_id,
    //   gameCommunities_id,

    // };


    // // ---------------------------------------------
    // //   - forumID
    // // ---------------------------------------------

    // if (forumID) {
    //   argumentsObj.forumID = forumID;
    // }


    // // ---------------------------------------------
    // //   - page & limit
    // // ---------------------------------------------

    // if (await validationInteger({ throwError: false, required: true, value: threadPage }).error === false) {
    //   argumentsObj.threadPage = threadPage;
    // }

    // if (await validationForumThreadsLimit({ throwError: false, required: true, value: threadLimit }).error === false) {
    //   argumentsObj.threadLimit = threadLimit;
    // }

    // if (await validationForumCommentsLimit({ throwError: false, required: true, value: commentLimit }).error === false) {
    //   argumentsObj.commentLimit = commentLimit;
    // }

    // if (await validationForumRepliesLimit({ throwError: false, required: true, value: replyLimit }).error === false) {
    //   argumentsObj.replyLimit = replyLimit;
    // }




    // // --------------------------------------------------
    // //   DB find / Forum by forumID
    // // --------------------------------------------------

    // let forumObj = {};


    // if (forumID) {

    //   forumObj = await ModelForumThreads.findForumByforumID(argumentsObj);


    // // --------------------------------------------------
    // //   DB find / Forum
    // // --------------------------------------------------

    // } else {

    //   forumObj = await ModelForumThreads.findForForum(argumentsObj);

    // }


    // // --------------------------------------------------
    // //   returnObj
    // // --------------------------------------------------

    // returnObj.forumThreadsObj = forumObj.forumThreadsObj;
    // returnObj.forumCommentsObj = forumObj.forumCommentsObj;
    // returnObj.forumRepliesObj = forumObj.forumRepliesObj;




    // // ---------------------------------------------
    // //   スレッドのデータがない場合はエラー
    // // ---------------------------------------------

    // const threadsDataObj = lodashGet(forumObj, ['forumThreadsObj', 'dataObj'], {});

    // // console.log(`
    // //   ----- forumThreadsDataObj -----\n
    // //   ${util.inspect(forumThreadsDataObj, { colors: true, depth: null })}\n
    // //   --------------------\n
    // // `);

    // if ((threadPage !== 1 || forumID) && Object.keys(threadsDataObj).length === 0) {

    //   statusCode = 404;
    //   throw new CustomError({ level: 'warn', errorsArr: [{ code: 'CwFmCVEZJ', messageID: 'Error' }] });

    // }




    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------

    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/gc/[urlID]/index.js
    // `);

    // console.log(chalk`
    //   urlID: {green ${urlID}}
    //   gameCommunities_id: {green ${gameCommunities_id}}
    // `);

    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);




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
      endpointID: 'Q4XBgtXED',
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