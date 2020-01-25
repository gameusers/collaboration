// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

// const shortid = require('shortid');
const moment = require('moment');
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelFollows = require('../../../../../app/@database/follows/model');
const ModelUserCommunities = require('../../../../../app/@database/user-communities/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../../../app/@modules/csrf');
const { returnErrorsArr } = require('../../../../../app/@modules/log/log');
const { CustomError } = require('../../../../../app/@modules/error/custom');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationIP } = require('../../../../../app/@validations/ip');
// const { validationBoolean } = require('../../../../../app/@validations/boolean');
const { validationGameCommunities_idServer } = require('../../../../../app/@database/game-communities/validations/_id-server');
const { validationUserCommunities_idServer } = require('../../../../../app/@database/user-communities/validations/_id-server');
const { validationUsers_idServer } = require('../../../../../app/@database/users/validations/_id-server');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

// const { locale } = require('../../../../../app/@locales/locale');




// --------------------------------------------------
//   endpointID: s1HXpHkXW
// --------------------------------------------------

export default async (req, res) => {
  
  
  // --------------------------------------------------
  //   Status Code
  // --------------------------------------------------
  
  let statusCode = 400;
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  // const localeObj = locale({
  //   acceptLanguage: req.headers['accept-language']
  // });
  
  
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
      
      gameCommunities_id,
      userCommunities_id,
      users_id,
      
    } = bodyObj;
    
    
    // --------------------------------------------------
    //   Log Data
    // --------------------------------------------------
    
    lodashSet(requestParametersObj, ['loginUsers_id'], loginUsers_id);
    lodashSet(requestParametersObj, ['gameCommunities_id'], gameCommunities_id);
    lodashSet(requestParametersObj, ['userCommunities_id'], userCommunities_id);
    lodashSet(requestParametersObj, ['users_id'], users_id);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 401;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'FE6LK-sP4', messageID: 'xLLNIpo6a' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   必要なデータチェック
    // --------------------------------------------------
    
    if (!gameCommunities_id && !userCommunities_id && !users_id) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'lK_FPWyJk', messageID: '1YJnibkmh' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    await validationIP({ throwError: true, value: req.ip });
    
    
    // ---------------------------------------------
    //   - ゲームコミュニティ
    // ---------------------------------------------
    
    if (gameCommunities_id) {
      await validationGameCommunities_idServer({ throwError: true, value: gameCommunities_id });
    }
    
    
    // ---------------------------------------------
    //   - ユーザーコミュニティ
    // ---------------------------------------------
    
    let communityType = 'open' ;
    
    if (userCommunities_id) {
      
      await validationUserCommunities_idServer({ throwError: true, value: userCommunities_id });
      
      
      // --------------------------------------------------
      //   自分のコミュニティを抜けようとした場合はエラー
      // --------------------------------------------------
      
      const resultUserCommunitiesObj = await ModelUserCommunities.findOne({ conditionObj: {
        _id: userCommunities_id
      }});
      
      if (resultUserCommunitiesObj.users_id === loginUsers_id) {
        throw new CustomError({ level: 'warn', errorsArr: [{ code: 'y8knFdqtD', messageID: 'qnWsuPcrJ' }] });
      }
      
      
      // --------------------------------------------------
      //   コミュニティの公開タイプがクローズドの場合、ページを再読み込みする
      // --------------------------------------------------
      
      communityType = lodashGet(resultUserCommunitiesObj, ['communityType'], 'open');
      
      // if (communityType === 'closed') {
      //   returnObj.pageTransition = true;
      // }
      
      console.log(chalk`
        resultUserCommunitiesObj.users_id: {green ${resultUserCommunitiesObj.users_id}}
        loginUsers_id: {green ${loginUsers_id}}
        communityType: {green ${communityType}}
      `);
      
      // console.log(`
      //   ----- resultUserCommunitiesObj -----\n
      //   ${util.inspect(resultUserCommunitiesObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
    }
    
    
    // ---------------------------------------------
    //   - ユーザー
    // ---------------------------------------------
    
    if (users_id) {
      await validationUsers_idServer({ throwError: true, value: users_id });
    }
    
    
    
    
    // --------------------------------------------------
    //   データ取得
    // --------------------------------------------------
    
    const conditionObj = {};
    
    if (gameCommunities_id) {
      
      conditionObj.gameCommunities_id = gameCommunities_id;
      
    } else if (userCommunities_id) {
      
      conditionObj.userCommunities_id = userCommunities_id;
      
    } else {
      
      conditionObj.users_id = users_id;
      
    }
    
    const resultObj = await ModelFollows.findOne({ conditionObj });
    
    // console.log(`
    //   ----- resultObj -----\n
    //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   メンバーの追加、削除
    // --------------------------------------------------
    
    let membersArr = lodashGet(resultObj, ['membersArr'], []);
    let membersApprovalArr = lodashGet(resultObj, ['membersApprovalArr'], []);
    let membersBlockedArr = lodashGet(resultObj, ['membersBlockedArr'], []);
    let membersCount = lodashGet(resultObj, ['membersCount'], 1);
    const approval = lodashGet(resultObj, ['approval'], false);
    
    // returnObj.pageTransition = false;
    
    
    // ---------------------------------------------
    //   - ブロックされている場合はエラー
    // ---------------------------------------------
    
    if (membersBlockedArr.includes(loginUsers_id)) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'hPXXX2YIK', messageID: 'qnWsuPcrJ' }] });
    }
    
    
    // ---------------------------------------------
    //   - 承認制
    // ---------------------------------------------
    
    if (approval) {
      
      // 承認申請がすでに行われている場合は、配列から削除する
      if (membersApprovalArr.includes(loginUsers_id)) {
        
        membersApprovalArr = membersApprovalArr.filter(value => value !== loginUsers_id);
        returnObj.memberApproval = false;
        
      // 承認申請がまだ行われていない場合は、配列に追加する
      } else {
        
        membersApprovalArr.push(loginUsers_id);
        returnObj.memberApproval = true;
        
      }
      
      
    // ---------------------------------------------
    //   - 誰でも参加できる
    // ---------------------------------------------
      
    } else {
      
      // すでにメンバーである場合は、配列から削除する
      if (membersArr.includes(loginUsers_id)) {
        
        membersArr = membersArr.filter(value => value !== loginUsers_id);
        returnObj.member = false;
        
      // まだメンバーでない場合は、配列に追加する
      } else {
        
        membersArr.push(loginUsers_id);
        returnObj.member = true;
        
      }
      
      membersCount = membersArr.length;
      returnObj.membersCount = membersCount;
      
      
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
        
        membersArr,
        membersApprovalArr,
        membersBlockedArr,
        membersCount,
        updatedDate: moment().toISOString(),
        
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
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   /pages/api/v2/db/follows/upsert-follow.js
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
      ip: req.ip,
      requestParametersObj,
    });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
  
};