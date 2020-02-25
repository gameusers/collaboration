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
const { validationManageFollowersType } = require('../../../../../app/@database/follows/validations/manage-followers-type');




// --------------------------------------------------
//   endpointID: F_U9YxzJx
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
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const bodyObj = JSON.parse(req.body);
    
    const { 
      
      users_id,
      gameCommunities_id,
      userCommunities_id,
      targetUsers_id,
      type,
      
    } = bodyObj;
    
    
    // --------------------------------------------------
    //   Log Data
    // --------------------------------------------------
    
    lodashSet(requestParametersObj, ['loginUsers_id'], loginUsers_id);
    lodashSet(requestParametersObj, ['users_id'], users_id);
    lodashSet(requestParametersObj, ['gameCommunities_id'], gameCommunities_id);
    lodashSet(requestParametersObj, ['userCommunities_id'], userCommunities_id);
    lodashSet(requestParametersObj, ['targetUsers_id'], targetUsers_id);
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
    //   Validations
    // --------------------------------------------------
    
    await validationIP({ throwError: true, value: req.ip });
    await validationUsers_idServer({ throwError: true, value: targetUsers_id });
    await validationManageFollowersType({ throwError: true, required: true, value: type });
    
    
    
    
    // --------------------------------------------------
    //   conditionObj
    // --------------------------------------------------
    
    let conditionObj = {};
    
    
    // --------------------------------------------------
    //   Game Community
    // --------------------------------------------------
    
    if (gameCommunities_id) {
      
      
      
    // --------------------------------------------------
    //   User Community
    // --------------------------------------------------
      
    } else if (userCommunities_id) {
      
      await validationUserCommunities_idServer({ value: userCommunities_id });
      
      
      // --------------------------------------------------
      //   データ取得 - user-communities
      // --------------------------------------------------
      
      const docUserCommunitiesObj = await ModelUserCommunities.findOne({
        conditionObj: {
          _id: userCommunities_id
        }
      });
      const adminUsers_id = lodashGet(docUserCommunitiesObj, ['users_id'], '');
      
      
      // --------------------------------------------------
      //   管理権限がない場合はエラー
      // --------------------------------------------------
      
      if (adminUsers_id !== loginUsers_id) {
        statusCode = 403;
        throw new CustomError({ level: 'warn', errorsArr: [{ code: 'prS38d43e', messageID: 'DSRlEoL29' }] });
      }
      
      
      // --------------------------------------------------
      //   管理者が管理者自身を操作しようとした場合はエラー
      // --------------------------------------------------
      
      if (targetUsers_id === adminUsers_id) {
        throw new CustomError({ level: 'warn', errorsArr: [{ code: 'HA6uOYVxo', messageID: 'qnWsuPcrJ' }] });
      }
      
      
      // --------------------------------------------------
      //   conditionObj
      // --------------------------------------------------
      
      conditionObj = {
        userCommunities_id
      };
      
      
    // --------------------------------------------------
    //   User
    // --------------------------------------------------
      
    } else {
      
      await validationUsers_idServer({ value: users_id });
      
      
      // --------------------------------------------------
      //   管理権限がない場合はエラー
      // --------------------------------------------------
      
      if (users_id !== loginUsers_id) {
        statusCode = 401;
        throw new CustomError({ level: 'warn', errorsArr: [{ code: 'AvTRjcmIi', messageID: 'DSRlEoL29' }] });
      }
      
      
      // --------------------------------------------------
      //   管理者が管理者自身を操作しようとした場合はエラー
      // --------------------------------------------------
      
      if (targetUsers_id === loginUsers_id) {
        throw new CustomError({ level: 'warn', errorsArr: [{ code: 'kX4M0aRXx', messageID: 'qnWsuPcrJ' }] });
      }
      
      
      // --------------------------------------------------
      //   conditionObj
      // --------------------------------------------------
      
      conditionObj = {
        users_id
      };
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   データ取得 - follows
    // --------------------------------------------------
    
    const docFollowsObj = await ModelFollows.findOne({ conditionObj });
    
    
    
    
    // --------------------------------------------------
    //   メンバーの追加、削除
    // --------------------------------------------------
    
    let followedArr = lodashGet(docFollowsObj, ['followedArr'], []);
    let followedCount = lodashGet(docFollowsObj, ['followedCount'], 1);
    let approvalArr = lodashGet(docFollowsObj, ['approvalArr'], []);
    let approvalCount = lodashGet(docFollowsObj, ['approvalCount'], 0);
    let blockArr = lodashGet(docFollowsObj, ['blockArr'], []);
    let blockCount = lodashGet(docFollowsObj, ['blockCount'], 0);
    
    
    
    
    // --------------------------------------------------
    //   退会
    // --------------------------------------------------
    
    if (type === 'unfollow') {
      
      followedArr = followedArr.filter(value => value !== targetUsers_id);
      followedCount = followedArr.length;
      
      
    // --------------------------------------------------
    //   参加承認
    // --------------------------------------------------
      
    } else if (type === 'approval') {
      
      followedArr.push(targetUsers_id);
      followedCount = followedArr.length;
      approvalArr = approvalArr.filter(value => value !== targetUsers_id);
      approvalCount = approvalArr.length;
      
      
    // --------------------------------------------------
    //   参加拒否
    // --------------------------------------------------
      
    } else if (type === 'unapproval') {
      
      approvalArr = approvalArr.filter(value => value !== targetUsers_id);
      approvalCount = approvalArr.length;
    
    
    // --------------------------------------------------
    //   ブロック
    // --------------------------------------------------
      
    } else if (type === 'block') {
      
      followedArr = followedArr.filter(value => value !== targetUsers_id);
      followedCount = followedArr.length;
      approvalArr = approvalArr.filter(value => value !== targetUsers_id);
      approvalCount = approvalArr.length;
      blockArr.push(targetUsers_id);
      blockCount = blockArr.length;
    
    
    // --------------------------------------------------
    //   ブロック解除
    // --------------------------------------------------
      
    } else if (type === 'unblock') {
      
      blockArr = blockArr.filter(value => value !== targetUsers_id);
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
      /pages/api/v2/db/follows/upsert-manage-followers.js
    `);
    
    console.log(chalk`
      users_id: {green ${users_id} / ${typeof users_id}}
      gameCommunities_id: {green ${gameCommunities_id} / ${typeof gameCommunities_id}}
      userCommunities_id: {green ${userCommunities_id} / ${typeof userCommunities_id}}
      targetUsers_id: {green ${targetUsers_id} / ${typeof targetUsers_id}}
      type: {green ${type} / ${typeof type}}
    `);
    
    console.log(`
      ----- docFollowsObj -----\n
      ${util.inspect(docFollowsObj, { colors: true, depth: null })}\n
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