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

import moment from 'moment';
import rimraf from 'rimraf';

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';


// ---------------------------------------------
//   Model
// ---------------------------------------------

import ModelGameCommunities from '../../../../../app/@database/game-communities/model.js';
import ModelRecruitmentThreads from '../../../../../app/@database/recruitment-threads/model.js';
import ModelRecruitmentReplies from '../../../../../app/@database/recruitment-replies/model.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { verifyCsrfToken } from '../../../../../app/@modules/csrf.js';
import { returnErrorsArr } from '../../../../../app/@modules/log/log.js';
import { CustomError } from '../../../../../app/@modules/error/custom.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationIP } from '../../../../../app/@validations/ip.js';

import { validationGameCommunities_idServer } from '../../../../../app/@database/game-communities/validations/_id-server.js';

import { validationRecruitmentThreadsLimit } from '../../../../../app/@database/recruitment-threads/validations/limit.js';
import { validationRecruitmentCommentsLimit } from '../../../../../app/@database/recruitment-comments/validations/limit.js';
import { validationRecruitmentRepliesLimit } from '../../../../../app/@database/recruitment-replies/validations/limit.js';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale.js');




// --------------------------------------------------
//   endpointID: 1mV1It1qK
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
  //   IP & User Agent
  // --------------------------------------------------
  
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = lodashGet(req, ['headers', 'user-agent'], '');
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const bodyObj = JSON.parse(req.body);
    
    const {
      
      recruitmentReplies_id,
      threadLimit,
      commentLimit,
      replyLimit,
      
    } = bodyObj;
    
    
    lodashSet(requestParametersObj, ['recruitmentReplies_id'], recruitmentReplies_id);
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
    
    const docObj = await ModelRecruitmentReplies.findOneForEdit({
      
      req,
      localeObj,
      loginUsers_id,
      recruitmentReplies_id,
      
    });
    
    const gameCommunities_id = lodashGet(docObj, ['gameCommunities_id'], '');
    const recruitmentThreads_id = lodashGet(docObj, ['recruitmentThreads_id'], '');
    const recruitmentComments_id = lodashGet(docObj, ['recruitmentComments_id'], '');
    const imagesAndVideos_id = lodashGet(docObj, ['imagesAndVideos_id'], '');
    const images = lodashGet(docObj, ['images'], 0);
    const videos = lodashGet(docObj, ['images'], 0);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/db/recruitment-replies/delete.js
    // `);
    
    // console.log(chalk`
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
    //   recruitmentComments_id: {green ${recruitmentComments_id}}
    //   recruitmentReplies_id: {green ${recruitmentReplies_id}}
    //   threadLimit: {green ${threadLimit}}
    //   commentLimit: {green ${commentLimit}}
    //   replyLimit: {green ${replyLimit}}
    // `);
    
    // console.log(chalk`
    //   imagesAndVideos_id: {green ${imagesAndVideos_id}}
    //   images: {green ${images}}
    //   videos: {green ${videos}}
    // `);
    
    // console.log(`
    //   ----- docObj -----\n
    //   ${util.inspect(docObj, { colors: true, depth: null })}\n
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
    //   - recruitment-replies / 返信
    // ---------------------------------------------
    
    const recruitmentRepliesConditionObj = {
      _id: recruitmentReplies_id,
    };
    
    
    // ---------------------------------------------
    //   - recruitment-comments / 更新日時の変更 & 返信総数 - 1
    // ---------------------------------------------
    
    const recruitmentCommentsConditionObj = {
      _id: recruitmentComments_id,
    };
    
    
    let recruitmentCommentsSaveObj = {
      updatedDate: ISO8601,
      $inc: { replies: -1 }
    };
    
    
    // ---------------------------------------------
    //   - recruitment-threads / 更新日時の変更 & 返信総数 - 1 & 画像数と動画数の変更
    // ---------------------------------------------
    
    const recruitmentThreadsConditionObj = {
      _id: recruitmentThreads_id,
    };
    
    
    let recruitmentThreadsSaveObj = {
      updatedDate: ISO8601,
      $inc: { replies: -1, images, videos }
    };
    
    
    // ---------------------------------------------
    //   - images-and-videos
    // ---------------------------------------------
    
    let imagesAndVideosConditionObj = {};
    
    if (imagesAndVideos_id) {
      imagesAndVideosConditionObj = {
        _id: imagesAndVideos_id,
      };
    }
    
    
    // ---------------------------------------------
    //   - game-communities / 更新日時の変更
    // ---------------------------------------------
    
    const gameCommunitiesConditionObj = {
      _id: gameCommunities_id,
    };
    
    
    const gameCommunitiesSaveObj = {
      updatedDate: ISO8601,
      'updatedDateObj.recruitment': ISO8601,
    };
    
    
    
    
    // --------------------------------------------------
    //   DB insert Transaction
    // --------------------------------------------------
    
    await ModelRecruitmentReplies.transactionForDelete({
      
      recruitmentRepliesConditionObj,
      imagesAndVideosConditionObj,
      recruitmentCommentsConditionObj,
      recruitmentCommentsSaveObj,
      recruitmentThreadsConditionObj,
      recruitmentThreadsSaveObj,
      gameCommunitiesConditionObj,
      gameCommunitiesSaveObj,
      
    });
    
    
    
    
    // ---------------------------------------------
    //   画像を削除する
    // ---------------------------------------------
    
    const dirPath = `public/img/recruitment/${imagesAndVideos_id}`;
    
    if (imagesAndVideos_id && images !== 0) {
      
      rimraf(dirPath, (err) => {
        if (err) {
          throw new CustomError({ level: 'error', errorsArr: [{ code: '_hHEiJ08h', messageID: 'Error' }] });
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
      endpointID: '1mV1It1qK',
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