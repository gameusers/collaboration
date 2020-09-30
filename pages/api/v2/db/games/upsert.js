// --------------------------------------------------
//   Import
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

import ModelRecruitmentThreads from 'app/@database/recruitment-threads/model.js';
import ModelUsers from 'app/@database/users/model.js';
import ModelGameCommunities from 'app/@database/game-communities/model.js';
import ModelWebPushes from 'app/@database/web-pushes/model.js';


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
import { validationLanguage, validationCountry } from 'app/@validations/language.js';

import { validationGamesName } from 'app/@database/games/validations/name.js';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { locale } from 'app/@locales/locale.js';






// --------------------------------------------------
//   endpointID: 8mHi5ZjYn
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

      gameCommunities_id,
      language,
      country,
      name,
      subtitle,
      sortKeyword,
      urlID,
      twitterHashtagsArr,
      searchKeywordsArr,
      genreArr = [],
      hardwareArr = [],
      linkArr,
      imagesAndVideosObj,
      imagesAndVideosThumbnailObj,

    } = bodyObj;

    lodashSet(requestParametersObj, ['gameCommunities_id'], gameCommunities_id);
    lodashSet(requestParametersObj, ['language'], language);
    lodashSet(requestParametersObj, ['country'], country);
    lodashSet(requestParametersObj, ['name'], name);
    lodashSet(requestParametersObj, ['subtitle'], subtitle);
    lodashSet(requestParametersObj, ['sortKeyword'], sortKeyword);
    lodashSet(requestParametersObj, ['urlID'], urlID);
    lodashSet(requestParametersObj, ['twitterHashtagsArr'], twitterHashtagsArr);
    lodashSet(requestParametersObj, ['searchKeywordsArr'], searchKeywordsArr);
    lodashSet(requestParametersObj, ['genreArr'], genreArr);
    lodashSet(requestParametersObj, ['hardwareArr'], hardwareArr);
    lodashSet(requestParametersObj, ['linkArr'], linkArr);
    lodashSet(requestParametersObj, ['imagesAndVideosObj'], {});
    lodashSet(requestParametersObj, ['imagesAndVideosThumbnailObj'], {});




    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------

    verifyCsrfToken(req, res);




    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------

    await validationIP({ throwError: true, value: ip });
    await validationLanguage({ throwError: true, value: language });
    await validationCountry({ throwError: true, value: country });

    await validationGamesName({ throwError: true, value: name });




    // --------------------------------------------------
    //   Role - サイト運営
    // --------------------------------------------------

    const role = lodashGet(req, ['user', 'role'], 'user');
    const administrator = role === 'administrator' ? true : false;




    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------

    const ISO8601 = moment().utc().toISOString();




    // --------------------------------------------------
    //   画像と動画の処理 - メイン画像
    // --------------------------------------------------

    let imagesAndVideosConditionObj = {};
    let imagesAndVideosSaveObj = {};
    let imagesAndVideos_id = '';

    if (administrator && imagesAndVideosObj) {


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
      //   画像＆動画がすべて削除されている場合は、imagesAndVideos_idを空にする
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
    //   画像と動画の処理 - サムネイル画像
    // --------------------------------------------------

    let imagesAndVideosThumbnailConditionObj = {};
    let imagesAndVideosThumbnailSaveObj = {};
    let imagesAndVideosThumbnail_id = '';

    if (administrator && imagesAndVideosThumbnailObj) {


      // --------------------------------------------------
      //   画像を保存する
      // --------------------------------------------------

      const formatAndSaveObj = await formatAndSave({

        newObj: imagesAndVideosThumbnailObj,
        oldObj: oldImagesAndVideosThumbnailObj,
        loginUsers_id,
        ISO8601,

      });


      // --------------------------------------------------
      //   imagesAndVideosSaveObj
      // --------------------------------------------------

      imagesAndVideosThumbnailSaveObj = lodashGet(formatAndSaveObj, ['imagesAndVideosObj'], {});


      // --------------------------------------------------
      //   画像＆動画がすべて削除されている場合は、imagesAndVideosThumbnail_id を空にする
      // --------------------------------------------------

      const arr = lodashGet(imagesAndVideosThumbnailSaveObj, ['arr'], []);

      if (arr.length === 0) {
        imagesAndVideosThumbnail_id = '';
      } else {
        imagesAndVideosThumbnail_id = lodashGet(imagesAndVideosThumbnailSaveObj, ['_id'], '');
      }


      // --------------------------------------------------
      //   imagesAndVideosThumbnailConditionObj
      // --------------------------------------------------

      imagesAndVideosThumbnailConditionObj = {
        _id: lodashGet(imagesAndVideosThumbnailSaveObj, ['_id'], ''),
      };


    }




    // --------------------------------------------------
    //   Insert
    // --------------------------------------------------

    // ---------------------------------------------
    //   - games
    // ---------------------------------------------

    // let gamesConditionObj = {};
    // let gamesSaveObj = {};


    // ---------------------------------------------
    //   - web-pushes
    // ---------------------------------------------

    let gamesConditionObj = {
      _id: shortid.generate(),
    };

    let gamesSaveObj = {

      createdDate: ISO8601,
      updatedDate: ISO8601,
      gameCommunities_id: '',
      urlID,
      language,
      country,
      imagesAndVideos_id,
      imagesAndVideosThumbnail_id,
      name,
      subtitle,
      searchKeywordsArr,
      sortKeyword,
      twitterHashtagsArr,
      genreArr,
      genreSubArr: [],
      genreTagArr: [],
      hardwareArr,
      linkArr,

    };




    //   // ---------------------------------------------
    //   //   - 更新
    //   // ---------------------------------------------

    //   if (currentWebPushes_id || currentUsersWebPushes_id) {

    //     webPushes_id = currentWebPushes_id || currentUsersWebPushes_id;


    //     // ---------------------------------------------
    //     //   既存のドキュメントを取得
    //     // ---------------------------------------------

    //     const docWebPushesObj = await ModelWebPushes.findOne({

    //       conditionObj: {
    //         _id: webPushes_id,
    //       }

    //     });


    //     // ---------------------------------------------
    //     //   subscription に変更があった場合のみ更新
    //     // ---------------------------------------------

    //     if (

    //       docWebPushesObj.subscriptionObj.endpoint !== endpoint ||
    //       docWebPushesObj.subscriptionObj.keys.p256dh !== p256dh ||
    //       docWebPushesObj.subscriptionObj.keys.auth !== auth

    //     ) {

    //       webPushesConditionObj._id = webPushes_id;

    //       webPushesSaveObj = {

    //         $set: {
    //           updatedDate: ISO8601,
    //           sendDate: '',
    //           subscriptionObj: {
    //             endpoint,
    //             keys: {
    //               p256dh,
    //               auth,
    //             }
    //           },
    //           sendTotalCount: 0,
    //           sendTodayCount: 0,
    //           errorCount: 0,
    //         }

    //       };


    //     // ---------------------------------------------
    //     //   subscription に変更がない場合は、DB web-pushes のドキュメントは更新しない
    //     // ---------------------------------------------

    //     } else {

    //       webPushesConditionObj = {};
    //       webPushesSaveObj = {};

    //     }


    //     // console.log(chalk`
    //     //   currentWebPushes_id: {green ${currentWebPushes_id}}
    //     //   currentUsersWebPushes_id: {green ${currentUsersWebPushes_id}}
    //     // `);

    //     // console.log(`
    //     //   ----------------------------------------\n
    //     //   web-pushes 更新

    //     //   ----- docWebPushesObj -----\n
    //     //   ${util.inspect(docWebPushesObj, { colors: true, depth: null })}\n
    //     //   --------------------\n
    //     // `);


    //   // ---------------------------------------------
    //   //   - 挿入
    //   // ---------------------------------------------

    //   } else {


    //     // ---------------------------------------------
    //     //   既存のデータを取得
    //     // ---------------------------------------------

    //     const docWebPushesObj = await ModelWebPushes.findOne({

    //       conditionObj: {
    //         'subscriptionObj.endpoint': endpoint,
    //         'subscriptionObj.keys.p256dh': p256dh,
    //         'subscriptionObj.keys.auth': auth,
    //       }

    //     });


    //     // ---------------------------------------------
    //     //   同じ subscription がすでに存在する場合、既存のものを利用し DB web-pushes に挿入はしない
    //     // ---------------------------------------------

    //     if (docWebPushesObj) {

    //       webPushes_id = docWebPushesObj._id;

    //       webPushesConditionObj = {};
    //       webPushesSaveObj = {};


    //     // ---------------------------------------------
    //     //   同じ subscription が存在しない場合、挿入
    //     // ---------------------------------------------

    //     } else {

    //       webPushes_id = webPushesConditionObj._id;

    //     }



    //     // ---------------------------------------------
    //     //   ログインしている場合、DB users に webPushes_id を保存
    //     // ---------------------------------------------

    //     if (loginUsers_id) {

    //       usersConditionObj = {
    //         _id: loginUsers_id,
    //       };

    //       usersSaveObj = {
    //         $set: {
    //           updatedDate: ISO8601,
    //           webPushes_id,
    //         }
    //       };

    //     }


    //     // console.log(chalk`
    //     //   endpoint: {green ${endpoint}}
    //     //   p256dh: {green ${p256dh}}
    //     //   auth: {green ${auth}}
    //     // `);

    //     // console.log(`
    //     //   ----------------------------------------\n
    //     //   web-pushes 挿入

    //     //   ----- docWebPushesObj -----\n
    //     //   ${util.inspect(docWebPushesObj, { colors: true, depth: null })}\n
    //     //   --------------------\n
    //     // `);


    //   }


    // } else {

    //   webPushAvailable = false;
    //   webPushesConditionObj = {};
    //   webPushesSaveObj = {};

    // }




    // // ---------------------------------------------
    // //   - recruitment-threads
    // // ---------------------------------------------

    // const recruitmentThreadsConditionObj = {
    //   _id: shortid.generate(),
    // };


    // const recruitmentThreadsSaveObj = {

    //   createdDate: ISO8601,
    //   updatedDate: ISO8601,
    //   gameCommunities_id,
    //   users_id: loginUsers_id,
    //   hardwareIDsArr,
    //   category,
    //   localesArr: [
    //     {
    //       _id: shortid.generate(),
    //       language: localeObj.language,
    //       title,
    //       name,
    //       comment,
    //     }
    //   ],
    //   imagesAndVideos_id,
    //   ids_idsArr,
    //   publicIDsArr,
    //   publicInformationsArr,
    //   publicSetting,
    //   deadlineDate,
    //   webPushAvailable,
    //   webPushes_id,
    //   publicCommentsUsers_idsArr: [],
    //   publicApprovalUsers_idsArrr: [],
    //   comments: 0,
    //   replies: 0,
    //   images,
    //   videos,
    //   acceptLanguage,
    //   ip,
    //   userAgent,

    // };


    // // ---------------------------------------------
    // //   - game-communities / 更新日時の変更＆スレッド総数 + 1
    // // ---------------------------------------------

    // const gameCommunitiesConditionObj = {
    //   _id: gameCommunities_id,
    // };


    // const gameCommunitiesSaveObj = {

    //   updatedDate: ISO8601,
    //   'updatedDateObj.recruitment': ISO8601,
    //   $inc: { 'recruitmentObj.threadCount': 1 }

    // };




    // // --------------------------------------------------
    // //   Update - 編集の場合、更新しない方がいいフィールドを削除する
    // // --------------------------------------------------

    // if (recruitmentThreads_id) {


    //   // ---------------------------------------------
    //   //   - recruitment-threads
    //   // ---------------------------------------------

    //   recruitmentThreadsConditionObj._id = recruitmentThreads_id;

    //   delete recruitmentThreadsSaveObj.createdDate;
    //   delete recruitmentThreadsSaveObj.gameCommunities_id;
    //   delete recruitmentThreadsSaveObj.users_id;
    //   delete recruitmentThreadsSaveObj.comments;
    //   delete recruitmentThreadsSaveObj.replies;
    //   delete recruitmentThreadsSaveObj.images;
    //   delete recruitmentThreadsSaveObj.videos;

    //   recruitmentThreadsSaveObj.$inc = { images, videos };


    //   // ---------------------------------------------
    //   //   - game-communities / $inc を削除して threadCount（ゲームコミュニティに記録するスレッド総数）を増やさない
    //   // ---------------------------------------------

    //   delete gameCommunitiesSaveObj.$inc;


    // }




    // // --------------------------------------------------
    // //   DB upsert Transaction
    // // --------------------------------------------------

    // await ModelRecruitmentThreads.transactionForUpsert({

    //   recruitmentThreadsConditionObj,
    //   recruitmentThreadsSaveObj,
    //   imagesAndVideosConditionObj,
    //   imagesAndVideosSaveObj,
    //   gameCommunitiesConditionObj,
    //   gameCommunitiesSaveObj,
    //   webPushesConditionObj,
    //   webPushesSaveObj,
    //   usersConditionObj,
    //   usersSaveObj,

    // });




    // --------------------------------------------------
    //   DB find / Recruitments
    // --------------------------------------------------

    // const recruitmentObj = await ModelRecruitmentThreads.findRecruitments({

    //   req,
    //   localeObj,
    //   loginUsers_id,
    //   gameCommunities_id,
    //   threadPage: 1,
    //   threadLimit,
    //   commentPage: 1,
    //   commentLimit,
    //   replyPage: 1,
    //   replyLimit,

    // });

    // returnObj.recruitmentThreadsObj = recruitmentObj.recruitmentThreadsObj;
    // returnObj.recruitmentCommentsObj = recruitmentObj.recruitmentCommentsObj;
    // returnObj.recruitmentRepliesObj = recruitmentObj.recruitmentRepliesObj;


    // // --------------------------------------------------
    // //   DB find / Game Community
    // // --------------------------------------------------

    // returnObj.gameCommunityObj = await ModelGameCommunities.findForGameCommunityByGameCommunities_id({

    //   gameCommunities_id,

    // });




    // --------------------------------------------------
    //   experience
    // --------------------------------------------------

    // if (!recruitmentThreads_id) {

    //   const experienceObj = await experienceCalculate({

    //     req,
    //     localeObj,
    //     loginUsers_id,
    //     arr: [{
    //       type: 'recruitment-count-post',
    //       calculation: 'addition',
    //     }],

    //   });

    //   if (Object.keys(experienceObj).length !== 0) {
    //     returnObj.experienceObj = experienceObj;
    //   }

    // }




    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------

    console.log(`
      ----------------------------------------\n
      pages/api/v2/db/games/upsert.js
    `);

    console.log(chalk`
      gameCommunities_id: {green ${gameCommunities_id}}
      language: {green ${language}}
      country: {green ${country}}
      name: {green ${name}}
      subtitle: {green ${subtitle}}
      sortKeyword: {green ${sortKeyword}}
      urlID: {green ${urlID}}
    `);

    console.log(`
      ----- twitterHashtagsArr -----\n
      ${util.inspect(twitterHashtagsArr, { colors: true, depth: null })}\n
      --------------------\n
    `);

    console.log(`
      ----- searchKeywordsArr -----\n
      ${util.inspect(searchKeywordsArr, { colors: true, depth: null })}\n
      --------------------\n
    `);

    console.log(`
      ----- genreArr -----\n
      ${util.inspect(genreArr, { colors: true, depth: null })}\n
      --------------------\n
    `);

    console.log(`
      ----- hardwareArr -----\n
      ${util.inspect(hardwareArr, { colors: true, depth: null })}\n
      --------------------\n
    `);

    console.log(`
      ----- imagesAndVideosObj -----\n
      ${util.inspect(imagesAndVideosObj, { colors: true, depth: null })}\n
      --------------------\n
    `);

    console.log(`
      ----- imagesAndVideosThumbnailObj -----\n
      ${util.inspect(imagesAndVideosThumbnailObj, { colors: true, depth: null })}\n
      --------------------\n
    `);

    console.log(`
      ----- gamesConditionObj -----\n
      ${util.inspect(gamesConditionObj, { colors: true, depth: null })}\n
      --------------------\n
    `);

    console.log(`
      ----- gamesSaveObj -----\n
      ${util.inspect(gamesSaveObj, { colors: true, depth: null })}\n
      --------------------\n
    `);

    return;




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
      endpointID: '8mHi5ZjYn',
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
