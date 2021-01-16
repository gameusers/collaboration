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

import shortid from 'shortid';
import moment from 'moment';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';


// ---------------------------------------------
//   Model
// ---------------------------------------------

import ModelUserCommunities from 'app/@database/user-communities/model.js';
import ModelForumComments from 'app/@database/forum-comments/model.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { verifyCsrfToken } from 'app/@modules/csrf.js';
import { returnErrorsArr } from 'app/@modules/log/log.js';
import { CustomError } from 'app/@modules/error/custom.js';
import { formatAndSave } from 'app/@modules/image/save.js';
import { setAuthority } from 'app/@modules/authority.js';
import { experienceCalculate } from 'app/@modules/experience.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationIP } from 'app/@validations/ip.js';
import { validationBoolean } from 'app/@validations/boolean.js';
import { validationHandleName } from 'app/@validations/name.js';

import { validationUserCommunities_idAndAuthorityServer } from 'app/@database/user-communities/validations/_id-server.js';
import { validationForumThreads_idServerUC } from 'app/@database/forum-threads/validations/_id-server.js';
import { validationForumCommentsComment } from 'app/@database/forum-comments/validations/comment.js';
import { validationForumThreadsListLimit, validationForumThreadsLimit } from 'app/@database/forum-threads/validations/limit.js';
import { validationForumCommentsLimit, validationForumRepliesLimit } from 'app/@database/forum-comments/validations/limit.js';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { locale } from 'app/@locales/locale.js';






// --------------------------------------------------
//   endpointID: TelTK88TV
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
    //   POST Data
    // --------------------------------------------------

    const bodyObj = JSON.parse(req.body);

    const {

      userCommunities_id,
      forumThreads_id,
      forumComments_id,
      forumReplies_id,
      replyToForumComments_id,
      name,
      comment,
      anonymity,
      imagesAndVideosObj,
      threadListLimit,
      threadLimit,
      commentLimit,
      replyLimit,

    } = bodyObj;


    lodashSet(requestParametersObj, ['userCommunities_id'], userCommunities_id);
    lodashSet(requestParametersObj, ['forumThreads_id'], forumThreads_id);
    lodashSet(requestParametersObj, ['forumComments_id'], forumComments_id);
    lodashSet(requestParametersObj, ['forumReplies_id'], forumReplies_id);
    lodashSet(requestParametersObj, ['replyToForumComments_id'], replyToForumComments_id);
    lodashSet(requestParametersObj, ['name'], name);
    lodashSet(requestParametersObj, ['comment'], comment);
    lodashSet(requestParametersObj, ['anonymity'], anonymity);
    lodashSet(requestParametersObj, ['imagesAndVideosObj'], {});
    lodashSet(requestParametersObj, ['threadListLimit'], threadListLimit);
    lodashSet(requestParametersObj, ['threadLimit'], threadLimit);
    lodashSet(requestParametersObj, ['commentLimit'], commentLimit);
    lodashSet(requestParametersObj, ['replyLimit'], replyLimit);




    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------

    verifyCsrfToken(req, res);




    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------

    await validationIP({ throwError: true, required: true, value: ip });

    await validationUserCommunities_idAndAuthorityServer({ value: userCommunities_id, loginUsers_id });
    await validationForumThreads_idServerUC({ forumThreads_id, userCommunities_id });

    await validationHandleName({ throwError: true, value: name });
    await validationForumCommentsComment({ throwError: true, value: comment });
    await validationBoolean({ throwError: true, value: anonymity });

    await validationForumThreadsListLimit({ throwError: true, required: true, value: threadListLimit });
    await validationForumThreadsLimit({ throwError: true, required: true, value: threadLimit });
    await validationForumCommentsLimit({ throwError: true, required: true, value: commentLimit });
    await validationForumRepliesLimit({ throwError: true, required: true, value: replyLimit });




    // --------------------------------------------------
    //   編集 - 編集するコメントが存在していない場合はエラー
    // --------------------------------------------------

    let oldImagesAndVideosObj = {};

    if (forumReplies_id) {


      // --------------------------------------------------
      //   データが存在しない、編集権限がない場合はエラーが投げられる
      // --------------------------------------------------

      const forumCommentsObj = await ModelForumComments.findForEdit({

        req,
        localeObj,
        loginUsers_id,
        forumComments_id: forumReplies_id,

      });

      oldImagesAndVideosObj = lodashGet(forumCommentsObj, ['imagesAndVideosObj'], {});


      // console.log(`
      //   ----- forumCommentsObj -----\n
      //   ${util.inspect(forumCommentsObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);


    // --------------------------------------------------
    //   新規投稿 - 同じIPで、同じコメントが10分以内に投稿されている場合はエラー
    // --------------------------------------------------

    } else {

      const dateTimeLimit = moment().utc().add(-10, 'minutes');

      const count = await ModelForumComments.count({

        conditionObj: {

          userCommunities_id,
          forumThreads_id,
          'localesArr.comment': comment,
          'createdDate': { '$gt': dateTimeLimit },
          ip,

        }

      });

      // console.log(chalk`
      //   dateTimeLimit: {green ${dateTimeLimit}}
      //   count: {green ${count}}
      // `);

      if (count > 0) {
        throw new CustomError({ level: 'warn', errorsArr: [{ code: 'GGx6QGEIK', messageID: 'ffNAq3wYT' }] });
      }

    }




    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------

    const ISO8601 = moment().utc().toISOString();




    // --------------------------------------------------
    //   DB findOne / User Communities / 匿名
    // --------------------------------------------------

    const resultUserCommunityObj = await ModelUserCommunities.findOne({

      conditionObj: {
        _id: userCommunities_id
      }

    });

    const settingAnonymity = lodashGet(resultUserCommunityObj, ['anonymity'], false);

    // 匿名での投稿ができないのに匿名にしようとした場合、エラー
    if (!settingAnonymity && anonymity) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: '_TiwS7HD1-X', messageID: 'qnWsuPcrJ' }] });
    }


    // console.log(chalk`
    //   settingAnonymity: {green ${settingAnonymity}}
    //   anonymity: {green ${anonymity}}
    // `);

    // console.log(`
    //   ----- resultUserCommunityObj -----\n
    //   ${util.inspect(resultUserCommunityObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);




    // --------------------------------------------------
    //   画像と動画の処理
    // --------------------------------------------------

    let imagesAndVideosConditionObj = {};
    let imagesAndVideosSaveObj = {};
    let imagesAndVideos_id = '';
    let images = 0;
    let videos = 0;

    if (imagesAndVideosObj) {


      // --------------------------------------------------
      //   画像を保存する
      // --------------------------------------------------

      const formatAndSaveObj = await formatAndSave({

        newObj: imagesAndVideosObj,
        oldObj: oldImagesAndVideosObj,
        loginUsers_id,
        ISO8601,

      });


      // --------------------------------------------------
      //   imagesAndVideosSaveObj
      // --------------------------------------------------

      imagesAndVideosSaveObj = lodashGet(formatAndSaveObj, ['imagesAndVideosObj'], {});


      // --------------------------------------------------
      //   画像数＆動画数
      // --------------------------------------------------

      images = lodashGet(formatAndSaveObj, ['images'], 0);
      videos = lodashGet(formatAndSaveObj, ['videos'], 0);


      // --------------------------------------------------
      //   画像＆動画がすべて削除されている場合は imagesAndVideos_id を空にする
      // --------------------------------------------------

      const arr = lodashGet(imagesAndVideosSaveObj, ['arr'], []);

      if (arr.length === 0) {
        imagesAndVideos_id = '';
      } else {
        imagesAndVideos_id = lodashGet(imagesAndVideosSaveObj, ['_id'], '');
      }


      // --------------------------------------------------
      //   imagesAndVideosConditionObj
      // --------------------------------------------------

      imagesAndVideosConditionObj = {
        _id: lodashGet(imagesAndVideosSaveObj, ['_id'], ''),
      };


    }




    // --------------------------------------------------
    //   Insert
    // --------------------------------------------------

    // ---------------------------------------------
    //   - forum-threads / 更新日時の変更 & 返信総数 + 1 & 画像数と動画数の変更
    // ---------------------------------------------

    const forumThreadsConditionObj = {
      _id: forumThreads_id,
    };


    const forumThreadsSaveObj = {
      updatedDate: ISO8601,
      $inc: { replies: 1, images, videos }
    };


    // ---------------------------------------------
    //   - forum-comments / 更新日時の変更 & 返信総数 + 1
    // ---------------------------------------------

    const forumCommentsConditionObj = {
      _id: forumComments_id,
    };


    const forumCommentsSaveObj = {
      updatedDate: ISO8601,
      $inc: { replies: 1 }
    };


    // ---------------------------------------------
    //   - forum-comments / 返信
    // ---------------------------------------------

    const forumRepliesConditionObj = {
      _id: shortid.generate(),
    };


    const forumRepliesSaveObj = {

      createdDate: ISO8601,
      updatedDate: ISO8601,
      gameCommunities_id: '',
      userCommunities_id,
      forumThreads_id,
      forumComments_id,
      replyToForumComments_id,
      users_id: loginUsers_id,
      localesArr: [
        {
          _id: shortid.generate(),
          language: localeObj.language,
          name,
          comment,
        }
      ],
      imagesAndVideos_id,
      anonymity: anonymity ? true : false,
      goods: 0,
      replies: 0,
      acceptLanguage,
      ip,
      userAgent,

    };


    // ---------------------------------------------
    //   - user-communities / 更新日時の変更
    // ---------------------------------------------

    const userCommunitiesConditionObj = {
      _id: userCommunities_id,
    };


    const userCommunitiesSaveObj = {
      updatedDate: ISO8601,
      'updatedDateObj.forum': ISO8601,
    };




    // --------------------------------------------------
    //   Update
    // --------------------------------------------------

    if (forumReplies_id) {


      // ---------------------------------------------
      //   - forum-comments / 返信
      // ---------------------------------------------

      forumRepliesConditionObj._id = forumReplies_id;

      delete forumRepliesSaveObj.createdDate;
      delete forumRepliesSaveObj.gameCommunities_id;
      delete forumRepliesSaveObj.userCommunities_id;
      delete forumRepliesSaveObj.forumThreads_id;
      delete forumRepliesSaveObj.forumComments_id;
      delete forumRepliesSaveObj.replyToForumComments_id;
      delete forumRepliesSaveObj.users_id;
      delete forumRepliesSaveObj.goods;
      delete forumRepliesSaveObj.replies;


      // ---------------------------------------------
      //   - forum-threads / replies（スレッドに記録する返信総数）を増やさない
      // ---------------------------------------------

      delete forumThreadsSaveObj.$inc.replies;


      // ---------------------------------------------
      //   - forum-comments / replies（コメントに記録する返信総数）を増やさない
      // ---------------------------------------------

      delete forumCommentsSaveObj.$inc.replies;


    }




    // --------------------------------------------------
    //   DB insert Transaction
    // --------------------------------------------------

    await ModelForumComments.transactionForUpsert({

      forumThreadsConditionObj,
      forumThreadsSaveObj,
      forumCommentsConditionObj,
      forumCommentsSaveObj,
      forumRepliesConditionObj,
      forumRepliesSaveObj,
      imagesAndVideosConditionObj,
      imagesAndVideosSaveObj,
      userCommunitiesConditionObj,
      userCommunitiesSaveObj,

    });




    // --------------------------------------------------
    //   Set Authority
    // --------------------------------------------------

    if (!loginUsers_id) {
      setAuthority({ req, _id: forumRepliesConditionObj._id });
    }




    // --------------------------------------------------
    //   DB find / Forum Threads List
    // --------------------------------------------------

    // returnObj.forumThreadsForListObj = await ModelForumThreads.findForThreadsList({

    //   localeObj,
    //   loginUsers_id,
    //   userCommunities_id,
    //   page: 1,
    //   limit: threadListLimit,

    // });




    // -------------------------------------------------------
    //   新規投稿または編集後の返信を表示するために、データを取得する
    // -------------------------------------------------------

    returnObj.forumRepliesObj = await ModelForumComments.findRepliesForUpsert({

      req,
      localeObj,
      loginUsers_id,
      userCommunities_id,
      forumThreads_id,
      forumComments_id,
      forumReplies_id,
      commentLimit,
      replyLimit,

    });




    // --------------------------------------------------
    //   DB find / User Community
    // --------------------------------------------------

    returnObj.userCommunityObj = await ModelUserCommunities.findForUserCommunityByUserCommunities_id({

      localeObj,
      userCommunities_id,

    });




    // --------------------------------------------------
    //   experience
    // --------------------------------------------------

    if (!forumReplies_id) {

      const experienceObj = await experienceCalculate({

        req,
        localeObj,
        loginUsers_id,
        arr: [{
          type: 'forum-count-post',
          calculation: 'addition',
        }],

      });

      if (Object.keys(experienceObj).length !== 0) {
        returnObj.experienceObj = experienceObj;
      }

    }




    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------

    // console.log(chalk`
    //   userCommunities_id: {green ${userCommunities_id}}
    //   forumThreads_id: {green ${forumThreads_id}}
    //   forumComments_id: {green ${forumComments_id}}
    //   name: {green ${name} / ${typeof name}}
    //   comment: {green ${comment} / ${typeof comment}}
    //   anonymity: {green ${anonymity} / ${typeof anonymity}}
    //   IP: {green ${req.ip}}
    //   User Agent: {green ${req.headers['user-agent']}}
    // `);

    // console.log(`
    //   ----- imagesAndVideosObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
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
      endpointID: 'TelTK88TV',
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




// --------------------------------------------------
//   config
// --------------------------------------------------

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
};
