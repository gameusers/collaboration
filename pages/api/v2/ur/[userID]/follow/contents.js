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

import ModelUsers from 'app/@database/users/model.js';
import ModelFollows from 'app/@database/follows/model.js';
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
import { validationFollowPeriod, validationFollowLimit } from 'app/@database/follows/validations/follow-limit.js';
import { validationForumCommentsLimit, validationForumRepliesLimit } from 'app/@database/forum-comments/validations/limit.js';
import { validationRecruitmentCommentsLimit } from 'app/@database/recruitment-comments/validations/limit.js';
import { validationRecruitmentRepliesLimit } from 'app/@database/recruitment-replies/validations/limit.js';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { locale } from 'app/@locales/locale.js';


// ---------------------------------------------
//   API
// ---------------------------------------------

import { initialProps } from 'app/@api/v2/common.js';






// --------------------------------------------------
//   endpointID: ir73GK2D_
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

    const userID = lodashGet(req, ['query', 'userID'], '');
    const period = lodashGet(req, ['query', 'period'], '');
    const page = lodashGet(req, ['query', 'page'], 1);
    const limit = lodashGet(req, ['query', 'limit'], '');
    const forumCommentLimit = lodashGet(req, ['query', 'forumCommentLimit'], '');
    const forumReplyLimit = lodashGet(req, ['query', 'forumReplyLimit'], '');
    const recruitmentCommentLimit = lodashGet(req, ['query', 'recruitmentCommentLimit'], '');
    const recruitmentReplyLimit = lodashGet(req, ['query', 'recruitmentReplyLimit'], '');
    
    lodashSet(requestParametersObj, ['userID'], userID);
    lodashSet(requestParametersObj, ['period'], period);
    lodashSet(requestParametersObj, ['page'], page);
    lodashSet(requestParametersObj, ['limit'], limit);
    lodashSet(requestParametersObj, ['forumCommentLimit'], forumCommentLimit);
    lodashSet(requestParametersObj, ['forumReplyLimit'], forumReplyLimit);
    lodashSet(requestParametersObj, ['recruitmentCommentLimit'], recruitmentCommentLimit);
    lodashSet(requestParametersObj, ['recruitmentReplyLimit'], recruitmentReplyLimit);
    
    


    // --------------------------------------------------
    //   データ取得 / Users
    //   アクセスしたページ所有者のユーザー情報
    //   users_id を取得するために利用
    // --------------------------------------------------

    const usersObj = await ModelUsers.findOneForUser({

      localeObj,
      loginUsers_id,
      userID,

    });


    // --------------------------------------------------
    //   ユーザー情報が存在しない場合はエラー
    // --------------------------------------------------

    const users_id = lodashGet(usersObj, ['_id'], '');

    if (!users_id) {

      statusCode = 404;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'rytBKA_Sq', messageID: 'Error' }] });

    }




    // --------------------------------------------------
    //   Common Initial Props
    // --------------------------------------------------

    const returnObj = await initialProps({ req, localeObj, type: 'other' });


    // --------------------------------------------------
    //   users_id & pagesObj
    // --------------------------------------------------

    returnObj.users_id = users_id;
    returnObj.pagesObj = lodashGet(usersObj, ['pagesObj'], []);

    


    // --------------------------------------------------
    //   headerObj
    //   ユーザーがトップ画像をアップロードしていない場合は、ランダム取得の画像を代わりに利用する
    // --------------------------------------------------

    const imagesAndVideosObj = lodashGet(returnObj, ['headerObj', 'imagesAndVideosObj'], {});
    const usersImagesAndVideosObj = lodashGet(usersObj, ['headerObj', 'imagesAndVideosObj'], {});

    if (Object.keys(usersImagesAndVideosObj).length === 0) {
      lodashSet(usersObj, ['headerObj', 'imagesAndVideosObj'], imagesAndVideosObj);
    }

    returnObj.headerObj = usersObj.headerObj;




    // --------------------------------------------------
    //   DB find / Feed
    // --------------------------------------------------

    returnObj.feedObj = await ModelFeeds.findFeed({

      localeObj,
      arr: ['all'],

    });




    // --------------------------------------------------
    //   DB find / follows
    // --------------------------------------------------

    const argumentsObj = {

      req,
      localeObj,
      loginUsers_id,
      users_id,

    };


    if (await validationFollowPeriod({ throwError: false, required: true, value: period }).error === false) {
      argumentsObj.period = period;
    }

    if (await validationInteger({ throwError: false, required: true, value: page }).error === false) {
      argumentsObj.page = page;
    }
    
    if (await validationFollowLimit({ throwError: false, required: true, value: limit }).error === false) {
      argumentsObj.limit = limit;
    }

    if (await validationForumCommentsLimit({ throwError: false, required: true, value: forumCommentLimit }).error === false) {
      argumentsObj.forumCommentLimit = forumCommentLimit;
    }

    if (await validationForumRepliesLimit({ throwError: false, required: true, value: forumReplyLimit }).error === false) {
      argumentsObj.forumReplyLimit = forumReplyLimit;
    }

    if (await validationRecruitmentCommentsLimit({ throwError: false, required: true, value: recruitmentCommentLimit }).error === false) {
      argumentsObj.recruitmentCommentLimit = recruitmentCommentLimit;
    }

    if (await validationRecruitmentRepliesLimit({ throwError: false, required: true, value: recruitmentReplyLimit }).error === false) {
      argumentsObj.recruitmentReplyLimit = recruitmentReplyLimit;
    }


    const followContentsObj = await ModelFollows.findFollowContents(argumentsObj);

    returnObj.pageObj = lodashGet(followContentsObj, ['pageObj'], {});
    returnObj.forumObj = lodashGet(followContentsObj, ['forumObj'], {});
    returnObj.recruitmentObj = lodashGet(followContentsObj, ['recruitmentObj'], {});
    returnObj.gameCommunityObj = lodashGet(followContentsObj, ['gameCommunityObj'], {});
    returnObj.userCommunityObj = lodashGet(followContentsObj, ['userCommunityObj'], {});


    // console.log(`
    //   ----- returnObj.pageObj -----\n
    //   ${util.inspect(returnObj.pageObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- returnObj.forumObj -----\n
    //   ${util.inspect(returnObj.forumObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- returnObj.recruitmentObj -----\n
    //   ${util.inspect(returnObj.recruitmentObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- returnObj.gameCommunityObj -----\n
    //   ${util.inspect(returnObj.gameCommunityObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- returnObj.userCommunityObj1 -----\n
    //   ${util.inspect(returnObj.userCommunityObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);




    // --------------------------------------------------
    //   2ページ目以降のデータがない場合はエラー
    // --------------------------------------------------

    if (page > 1) {

      const pageArr = lodashGet(returnObj, ['pageObj', 'arr'], []);

      if (pageArr.length === 0) {

        statusCode = 404;
        throw new CustomError({ level: 'warn', errorsArr: [{ code: '_VqxOHS3z', messageID: 'Error' }] });

      }

    }




    // --------------------------------------------------
    //   権限
    //   0: ブロックしているユーザー
    //   1: 非ログインユーザー
    //   2: ログインユーザー（以下ログイン済みユーザー）
    //   3: 自分のことをフォローしているユーザー
    //   4: 自分がフォローしているユーザー
    //   5: 相互フォロー状態のユーザー
    //   50: 自分自身（コミュニティの管理者）
    //   100: サイト管理者
    // --------------------------------------------------

    returnObj.accessLevel = 1;


    // ---------------------------------------------
    //   - 自分自身
    // ---------------------------------------------

    if (users_id === loginUsers_id) {
      returnObj.accessLevel = 50;
    }




    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------

    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/ur/[userID]/followers.js
    // `);

    // console.log(chalk`
    //   userID: {green ${userID}}
    //   page: {green ${page} / ${typeof page}}
    //   limit: {green ${limit} / ${typeof limit}}
    // `);

    // console.log(`
    //   ----- resultFollowersObj -----\n
    //   ${util.inspect(resultFollowersObj, { colors: true, depth: null })}\n
    //   --------------------\n
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
      endpointID: 'ir73GK2D_',
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
