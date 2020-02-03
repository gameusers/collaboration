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
const { validationUserCommunities_idServer } = require('../../../../../app/@database/user-communities/validations/_id-server');
const { validationUsers_idServer } = require('../../../../../app/@database/users/validations/_id-server');
const { validationManageMembersType } = require('../../../../../app/@database/follows/validations/manage-members-type');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

// const { locale } = require('../../../../../app/@locales/locale');




// --------------------------------------------------
//   endpointID: F_U9YxzJx
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
      
      userCommunities_id,
      managedUsers_id,
      type,
      
    } = bodyObj;
    
    
    // --------------------------------------------------
    //   Log Data
    // --------------------------------------------------
    
    lodashSet(requestParametersObj, ['loginUsers_id'], loginUsers_id);
    lodashSet(requestParametersObj, ['userCommunities_id'], userCommunities_id);
    lodashSet(requestParametersObj, ['managedUsers_id'], managedUsers_id);
    lodashSet(requestParametersObj, ['type'], type);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 403;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'Jp-64G5MT', messageID: 'xLLNIpo6a' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    await validationIP({ throwError: true, value: req.ip });
    await validationUserCommunities_idServer({ throwError: true, value: userCommunities_id });
    await validationUsers_idServer({ throwError: true, value: managedUsers_id });
    await validationManageMembersType({ throwError: true, required: true, value: type });
    
    
    
    
    // --------------------------------------------------
    //   データ取得 - user-communities
    // --------------------------------------------------
    
    let conditionObj = {
      _id: userCommunities_id
    };
    
    const resultUserCommunitiesObj = await ModelUserCommunities.findOne({ conditionObj });
    const authorUsers_id = lodashGet(resultUserCommunitiesObj, ['users_id'], '');
    
    
    // --------------------------------------------------
    //   管理権限がない場合はエラー
    // --------------------------------------------------
    
    if (loginUsers_id !== authorUsers_id) {
      statusCode = 403;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'prS38d43e', messageID: 'DSRlEoL29' }] });
    }
    
    
    // --------------------------------------------------
    //   オーナーが自分自身を操作しようとした場合はエラー
    // --------------------------------------------------
    
    if (managedUsers_id === authorUsers_id) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'HA6uOYVxo', messageID: 'qnWsuPcrJ' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   データ取得 - follows
    // --------------------------------------------------
    
    conditionObj = {
      userCommunities_id
    };
    
    const resultFollowsObj = await ModelFollows.findOne({ conditionObj });
    
    
    
    
    // --------------------------------------------------
    //   メンバーの追加、削除
    // --------------------------------------------------
    
    let followedArr = lodashGet(resultFollowsObj, ['followedArr'], []);
    let followedCount = lodashGet(resultFollowsObj, ['followedCount'], 1);
    let approvalArr = lodashGet(resultFollowsObj, ['approvalArr'], []);
    let approvalCount = lodashGet(resultFollowsObj, ['followedCount'], 0);
    let blockArr = lodashGet(resultFollowsObj, ['blockArr'], []);
    let blockCount = lodashGet(resultFollowsObj, ['blockCount'], 0);
    
    
    
    
    // --------------------------------------------------
    //   退会
    // --------------------------------------------------
    
    if (type === 'unfollow') {
      
      followedArr = followedArr.filter(value => value !== managedUsers_id);
      followedCount = followedArr.length;
      
      
    // --------------------------------------------------
    //   参加承認
    // --------------------------------------------------
      
    } else if (type === 'approval') {
      
      followedArr.push(managedUsers_id);
      followedCount = followedArr.length;
      approvalArr = approvalArr.filter(value => value !== managedUsers_id);
      approvalCount = approvalArr.length;
      
      
    // --------------------------------------------------
    //   参加拒否
    // --------------------------------------------------
      
    } else if (type === 'unapproval') {
      
      approvalArr = approvalArr.filter(value => value !== managedUsers_id);
      approvalCount = approvalArr.length;
    
    
    // --------------------------------------------------
    //   ブロック
    // --------------------------------------------------
      
    } else if (type === 'block') {
      
      followedArr = followedArr.filter(value => value !== managedUsers_id);
      followedCount = followedArr.length;
      approvalArr = approvalArr.filter(value => value !== managedUsers_id);
      approvalCount = approvalArr.length;
      blockArr.push(managedUsers_id);
      blockCount = blockArr.length;
    
    
    // --------------------------------------------------
    //   ブロック解除
    // --------------------------------------------------
      
    } else if (type === 'unblock') {
      
      blockArr = blockArr.filter(value => value !== managedUsers_id);
      blockCount = blockArr.length;
      
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
        blockCount,
        updatedDate: moment().toISOString(),
        
      }
      
    };
    
    
    
    
    // // --------------------------------------------------
    // //   Update
    // // --------------------------------------------------
    
    // await ModelFollows.upsert({
      
    //   conditionObj,
    //   saveObj,
      
    // });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    console.log(`
      ----------------------------------------\n
      /pages/api/v2/db/follows/upsert-manage-members.js
    `);
    
    console.log(chalk`
      loginUsers_id: {green ${loginUsers_id}}
      userCommunities_id: {green ${userCommunities_id}}
      managedUsers_id: {green ${managedUsers_id}}
      type: {green ${type}}
      authorUsers_id: {green ${authorUsers_id}}
    `);
    
    // console.log(`
    //   ----- resultUserCommunitiesObj -----\n
    //   ${util.inspect(resultUserCommunitiesObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    console.log(`
      ----- resultFollowsObj -----\n
      ${util.inspect(resultFollowsObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    console.log(`
      ----- saveObj -----\n
      ${util.inspect(saveObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    
    
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
      endpointID: 'F_U9YxzJx',
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