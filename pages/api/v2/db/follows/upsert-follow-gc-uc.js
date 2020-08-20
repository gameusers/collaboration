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


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';


// ---------------------------------------------
//   Model
// ---------------------------------------------

import ModelFollows from 'app/@database/follows/model.js';
import ModelGameCommunities from 'app/@database/game-communities/model.js';
import ModelUserCommunities from 'app/@database/user-communities/model.js';
import ModelGames from 'app/@database/games/model.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { verifyCsrfToken } from 'app/@modules/csrf.js';
import { returnErrorsArr } from 'app/@modules/log/log.js';
import { CustomError } from 'app/@modules/error/custom.js';
import { experienceCalculate } from 'app/@modules/experience.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationIP } from 'app/@validations/ip.js';

import { validationGameCommunities_idServer } from 'app/@database/game-communities/validations/_id-server.js';
import { validationUserCommunities_idServer } from 'app/@database/user-communities/validations/_id-server.js';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { locale } from 'app/@locales/locale.js';






// --------------------------------------------------
//   endpointID: s1HXpHkXW
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
      userCommunities_id,
      
    } = bodyObj;
    
    lodashSet(requestParametersObj, ['gameCommunities_id'], gameCommunities_id);
    lodashSet(requestParametersObj, ['userCommunities_id'], userCommunities_id);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      
      statusCode = 403;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'FE6LK-sP4', messageID: 'xLLNIpo6a' }] });
      
    }
    
    
    // --------------------------------------------------
    //   必要なデータチェック
    // --------------------------------------------------
    
    if (!gameCommunities_id && !userCommunities_id) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'lK_FPWyJk', messageID: '1YJnibkmh' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Validation & データ取得
    // --------------------------------------------------
    
    await validationIP({ throwError: true, value: ip });
    
    
    // ---------------------------------------------
    //   - Property
    // ---------------------------------------------
    
    let communityType = 'open' ;
    const conditionObj = {};
    
    
    // ---------------------------------------------
    //   - ゲームコミュニティ
    // ---------------------------------------------
    
    if (gameCommunities_id) {
      
      
      // ---------------------------------------------
      //   Validation - communities_id
      // ---------------------------------------------
      
      await validationGameCommunities_idServer({ value: gameCommunities_id });
      
      
      // ---------------------------------------------
      //   データ取得用検索条件
      // ---------------------------------------------
      
      conditionObj.gameCommunities_id = gameCommunities_id;
    
    
    // ---------------------------------------------
    //   - ユーザーコミュニティ
    // ---------------------------------------------
    
    } else if (userCommunities_id) {
      
      
      // ---------------------------------------------
      //   Validation - communities_id
      // ---------------------------------------------
      
      await validationUserCommunities_idServer({ throwError: true, value: userCommunities_id });
      
      
      // ---------------------------------------------
      //   データ取得用検索条件
      // ---------------------------------------------
      
      conditionObj.userCommunities_id = userCommunities_id;
      
      
      // ---------------------------------------------
      //   自分のコミュニティを抜けようとした場合はエラー
      // ---------------------------------------------
      
      const resultUserCommunitiesObj = await ModelUserCommunities.findOne({
        
        conditionObj: {
          _id: userCommunities_id
        }
        
      });
      
      if (resultUserCommunitiesObj.users_id === loginUsers_id) {
        throw new CustomError({ level: 'warn', errorsArr: [{ code: 'y8knFdqtD', messageID: 'qnWsuPcrJ' }] });
      }
      
      
      // ---------------------------------------------
      //   コミュニティの公開タイプがクローズドの場合、ページを再読み込みする
      // ---------------------------------------------
      
      communityType = lodashGet(resultUserCommunitiesObj, ['communityType'], 'open');
      
      // if (communityType === 'closed') {
      //   returnObj.pageTransition = true;
      // }
      
      // console.log(chalk`
      //   resultUserCommunitiesObj.users_id: {green ${resultUserCommunitiesObj.users_id}}
      //   loginUsers_id: {green ${loginUsers_id}}
      //   communityType: {green ${communityType}}
      // `);
      
      // console.log(`
      //   ----- resultUserCommunitiesObj -----\n
      //   ${util.inspect(resultUserCommunitiesObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
    }
    
    
    // --------------------------------------------------
    //   データ取得
    // --------------------------------------------------
    
    const docFollowsObj = await ModelFollows.findOne({ conditionObj });
    
    
    // console.log(`
    //   ----- docFollowsObj -----\n
    //   ${util.inspect(docFollowsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   メンバーの追加、削除
    // --------------------------------------------------
    
    let followedArr = lodashGet(docFollowsObj, ['followedArr'], []);
    let followedCount = lodashGet(docFollowsObj, ['followedCount'], 1);
    let approvalArr = lodashGet(docFollowsObj, ['approvalArr'], []);
    let approvalCount = lodashGet(docFollowsObj, ['approvalCount'], 0);
    let blockArr = lodashGet(docFollowsObj, ['blockArr'], []);
    
    const approval = lodashGet(docFollowsObj, ['approval'], false);
    
    
    // ---------------------------------------------
    //   - ブロックされている場合はエラー
    // ---------------------------------------------
    
    if (blockArr.includes(loginUsers_id)) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'hPXXX2YIK', messageID: 'qnWsuPcrJ' }] });
    }
    
    
    // ---------------------------------------------
    //   - 承認制
    // ---------------------------------------------
    
    if (approval) {
      
      
      // ---------------------------------------------
      //   フォロー申請取り消し
      //   承認申請がすでに行われている場合は、配列から削除する
      // ---------------------------------------------
      
      if (approvalArr.includes(loginUsers_id)) {
        
        approvalArr = approvalArr.filter(value => value !== loginUsers_id);
        returnObj.followApproval = false;
        
        
      // ---------------------------------------------
      //   フォロー申請
      //   承認申請がまだ行われていない場合は、配列に追加する
      // ---------------------------------------------
      
      } else {
        
        approvalArr.push(loginUsers_id);
        returnObj.followApproval = true;
        
      }
      
      approvalCount = approvalArr.length;
      
      
    // ---------------------------------------------
    //   - 誰でも参加できる
    // ---------------------------------------------
      
    } else {
      
      
      // ---------------------------------------------
      //   フォロー解除
      //   すでにメンバーである場合は、配列から削除する
      // ---------------------------------------------
      
      if (followedArr.includes(loginUsers_id)) {
        
        followedArr = followedArr.filter(value => value !== loginUsers_id);
        returnObj.follow = false;
        
      
      // ---------------------------------------------
      //   フォロー
      //   まだメンバーでない場合は、配列に追加する
      // ---------------------------------------------
      
      } else {
        
        followedArr.push(loginUsers_id);
        returnObj.follow = true;
        
      }
      
      followedCount = followedArr.length;
      returnObj.followedCount = followedCount;
      
      
      // --------------------------------------------------
      //   コミュニティの公開タイプがクローズドの場合、ページを再読み込みする
      // --------------------------------------------------
      
      if (communityType === 'closed') {
        returnObj.pageTransition = true;
      }
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Save Object
    // --------------------------------------------------
    
    const saveObj = {
      
      $set: {
        
        followedArr,
        followedCount,
        approvalArr,
        approvalCount,
        blockArr,
        updatedDate: moment().utc().toISOString(),
        
      }
      
    };
    
    
    
    
    // --------------------------------------------------
    //   Update
    // --------------------------------------------------
    
    await ModelFollows.upsert({
      
      conditionObj,
      saveObj,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   Header
    // --------------------------------------------------
    
    if (gameCommunities_id) {
      
      const gameCommunityObj = await ModelGameCommunities.findForGameCommunity({
        
        localeObj,
        loginUsers_id,
        gameCommunities_id,
        
      });
      
      returnObj.headerObj = gameCommunityObj.headerObj;
      
    }
    
    
    
    
    
    
    // --------------------------------------------------
    //   データ取得 / Games
    //   ヘッダーヒーローイメージ用
    // --------------------------------------------------
    
    // returnObj.headerObj = await ModelGames.findForHeroImage({
      
    //   localeObj,
      
    // });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/db/follows/upsert-follow.js
    // `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   users_id: {green ${users_id}}
    // `);
    
    // console.log(`
    //   ----- resultObj -----\n
    //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- conditionObj -----\n
    //   ${util.inspect(conditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- saveObj -----\n
    //   ${util.inspect(saveObj, { colors: true, depth: null })}\n
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
      endpointID: 's1HXpHkXW',
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