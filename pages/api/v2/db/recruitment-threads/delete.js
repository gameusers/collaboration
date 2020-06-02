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

import moment from 'moment';
import rimraf from 'rimraf';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';


// ---------------------------------------------
//   Model
// ---------------------------------------------

import ModelGameCommunities from 'app/@database/game-communities/model.js';
import ModelRecruitmentThreads from 'app/@database/recruitment-threads/model.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { verifyCsrfToken } from 'app/@modules/csrf.js';
import { returnErrorsArr } from 'app/@modules/log/log.js';
import { CustomError } from 'app/@modules/error/custom.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationIP } from 'app/@validations/ip.js';

import { validationRecruitmentThreadsLimit } from 'app/@database/recruitment-threads/validations/limit.js';
import { validationRecruitmentCommentsLimit } from 'app/@database/recruitment-comments/validations/limit.js';
import { validationRecruitmentRepliesLimit } from 'app/@database/recruitment-replies/validations/limit.js';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { locale } from 'app/@locales/locale.js';






// --------------------------------------------------
//   endpointID: LC_YIutPm
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
  
  
  // --------------------------------------------------
  //   Language & IP & User Agent
  // --------------------------------------------------
  
  const language = lodashGet(req, ['headers', 'accept-language'], '');
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = lodashGet(req, ['headers', 'user-agent'], '');
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const bodyObj = JSON.parse(req.body);
    
    const {
      
      recruitmentThreads_id,
      threadLimit,
      commentLimit,
      replyLimit,
      
    } = bodyObj;
    
    
    lodashSet(requestParametersObj, ['recruitmentThreads_id'], recruitmentThreads_id);
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
    
    await validationIP({ throwError: true, value: ip });
    
    await validationRecruitmentThreadsLimit({ throwError: true, required: true, value: threadLimit });
    await validationRecruitmentCommentsLimit({ throwError: true, required: true, value: commentLimit });
    await validationRecruitmentRepliesLimit({ throwError: true, required: true, value: replyLimit });
    
    
    
    
    // --------------------------------------------------
    //   データ取得
    //   データが存在しない、編集権限がない場合はエラーが投げられる
    // --------------------------------------------------
    
    const docObj = await ModelRecruitmentThreads.findForDelete({
      
      req,
      localeObj,
      loginUsers_id,
      recruitmentThreads_id,
      
    });
    
    const gameCommunities_id = lodashGet(docObj, ['gameCommunities_id'], '');
    // const comments = lodashGet(docObj, ['comments'], 0);
    // const replies = lodashGet(docObj, ['replies'], 0);
    const imagesAndVideos_idsArr = lodashGet(docObj, ['imagesAndVideos_idsArr'], []);
    // const images = lodashGet(docObj, ['images'], 0);
    // const videos = lodashGet(docObj, ['videos'], 0);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/db/recruitment-threads/delete.js
    // `);
    
    // console.log(chalk`
    //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
    //   threadLimit: {green ${threadLimit}}
    //   commentLimit: {green ${commentLimit}}
    //   replyLimit: {green ${replyLimit}}
    // `);
    
    // console.log(`
    //   ----- docObj -----\n
    //   ${util.inspect(docObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   comments: {green ${comments}}
    //   replies: {green ${replies}}
    //   images: {green ${images}}
    //   videos: {green ${videos}}
    // `);
    
    // console.log(`
    //   ----- imagesAndVideos_idsArr -----\n
    //   ${util.inspect(imagesAndVideos_idsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    const ISO8601 = moment().utc().toISOString();
    
    
    
    
    // --------------------------------------------------
    //   Delete
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   - recruitment-threads / スレッド削除
    // ---------------------------------------------
    
    const recruitmentThreadsConditionObj = {
      _id: recruitmentThreads_id,
    };
    
    
    // ---------------------------------------------
    //   - recruitment-comments / コメント削除
    // ---------------------------------------------
    
    const recruitmentCommentsConditionObj = {
      recruitmentThreads_id,
    };
    
    
    // ---------------------------------------------
    //   - recruitment-replies / 返信削除
    // ---------------------------------------------
    
    const recruitmentRepliesConditionObj = {
      recruitmentThreads_id,
    };
    
    
    // ---------------------------------------------
    //   - images-and-videos / 削除
    // ---------------------------------------------
    
    let imagesAndVideosConditionObj = {};
    
    if (imagesAndVideos_idsArr.length > 0) {
      imagesAndVideosConditionObj = {
        _id: { $in: imagesAndVideos_idsArr }
      };
    }
    
    
    // ---------------------------------------------
    //   - game-communities / 更新日時＆スレッド数の変更
    // ---------------------------------------------
    
    const gameCommunitiesConditionObj = {
      _id: gameCommunities_id,
    };
    
    
    const gameCommunitiesSaveObj = {
      updatedDate: ISO8601,
      'updatedDateObj.recruitment': ISO8601,
      $inc: { 'recruitmentObj.threadCount': -1 }
    };
    
    
    
    
    // --------------------------------------------------
    //   DB insert Transaction
    // --------------------------------------------------
    
    await ModelRecruitmentThreads.transactionForDelete({
      
      recruitmentThreadsConditionObj,
      recruitmentCommentsConditionObj,
      recruitmentRepliesConditionObj,
      imagesAndVideosConditionObj,
      gameCommunitiesConditionObj,
      gameCommunitiesSaveObj,
      
    });
    
    
    
    
    // ---------------------------------------------
    //   画像を削除する
    // ---------------------------------------------
    
    for (let value of imagesAndVideos_idsArr.values()) {
      
      const dirPath = `public/img/recruitment/${value}`;
      // console.log(dirPath);
      
      rimraf(dirPath, (err) => {
        if (err) {
          throw new CustomError({ level: 'error', errorsArr: [{ code: '7eE0VckQr', messageID: 'Error' }] });
        }
      });
      
    }
    
    
    
    
    // --------------------------------------------------
    //   DB find / Recruitments
    // --------------------------------------------------
    
    const recruitmentObj = await ModelRecruitmentThreads.findRecruitments({
      
      req,
      localeObj,
      loginUsers_id,
      gameCommunities_id,
      threadPage: 1,
      threadLimit,
      commentPage: 1,
      commentLimit,
      replyPage: 1,
      replyLimit,
      
    });
    
    returnObj.recruitmentThreadsObj = recruitmentObj.recruitmentThreadsObj;
    returnObj.recruitmentCommentsObj = recruitmentObj.recruitmentCommentsObj;
    returnObj.recruitmentRepliesObj = recruitmentObj.recruitmentRepliesObj;
    
    
    
    
    // --------------------------------------------------
    //   updatedDateObj
    // --------------------------------------------------
    
    const gameCommunityArr = await ModelGameCommunities.find({
      
      conditionObj: {
        _id: gameCommunities_id
      }
      
    });
    
    const updatedDateObj = lodashGet(gameCommunityArr, [0, 'updatedDateObj'], {});
    
    returnObj.updatedDateObj = updatedDateObj;
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   userCommunities_id: {green ${userCommunities_id}}
    //   forumThreads_id: {green ${forumThreads_id}}
    //   forumComments_id: {green ${forumComments_id}}
    //   anonymity: {green ${anonymity} / ${typeof anonymity}}
    //   IP: {green ${ip}}
    //   User Agent: {green ${req.headers['user-agent']}}
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
      endpointID: 'LC_YIutPm',
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