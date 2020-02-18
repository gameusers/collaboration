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
// const ModelUserCommunities = require('../../../../../app/@database/user-communities/model');


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
const { validationUsers_idServer } = require('../../../../../app/@database/users/validations/_id-server');




// --------------------------------------------------
//   endpointID: q4zqhmELq
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
      
    } = bodyObj;
    
    
    // --------------------------------------------------
    //   Log Data
    // --------------------------------------------------
    
    lodashSet(requestParametersObj, ['loginUsers_id'], loginUsers_id);
    lodashSet(requestParametersObj, ['users_id'], users_id);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 403;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'PqgFA9jl8', messageID: 'xLLNIpo6a' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    await validationIP({ throwError: true, value: req.ip });
    await validationUsers_idServer({ throwError: true, value: users_id });
    
    
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    const ISO8601 = moment().toISOString();
    
    
    
    
    // --------------------------------------------------
    //   データ取得
    // --------------------------------------------------
    
    const followsConditionObj = {
      users_id,
    };
    
    const resultObj = await ModelFollows.findOne({ conditionObj: followsConditionObj });
    
    
    const followsSelfConditionObj = {
      users_id: loginUsers_id
    };
    
    const resultSelfObj = await ModelFollows.findOne({ conditionObj: followsSelfConditionObj });
    
    
    // console.log(`
    //   ----- resultObj -----\n
    //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- resultSelfObj -----\n
    //   ${util.inspect(resultSelfObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   メンバーの追加、削除
    // --------------------------------------------------
    
    let followedArr = lodashGet(resultObj, ['followedArr'], []);
    let followedCount = lodashGet(resultObj, ['followedCount'], 1);
    let approvalArr = lodashGet(resultObj, ['approvalArr'], []);
    let approvalCount = lodashGet(resultObj, ['approvalCount'], 0);
    const blockArr = lodashGet(resultObj, ['blockArr'], []);
    
    const approval = lodashGet(resultObj, ['approval'], false);
    
    let followSelfArr = lodashGet(resultSelfObj, ['followArr'], []);
    let followSelfCount = lodashGet(resultSelfObj, ['followCount'], 1);
    
    
    
    
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
      // 
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
        
        // 相手
        followedArr = followedArr.filter(value => value !== loginUsers_id);
        returnObj.follow = false;
        
        // 自分
        followSelfArr = followSelfArr.filter(value => value !== users_id);
        
        
      // ---------------------------------------------
      //   フォロー
      //   まだメンバーでない場合は、配列に追加する
      // ---------------------------------------------
      
      } else {
        
        // 相手
        followedArr.push(loginUsers_id);
        returnObj.follow = true;
        
        // 自分
        followSelfArr.push(users_id);
        
      }
      
      
      // 相手
      followedCount = followedArr.length;
      returnObj.followedCount = followedCount;
      
      // 自分
      followSelfCount = followSelfArr.length;
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Save Object
    // --------------------------------------------------
    
    const followsSaveObj = {
      
      $set: {
        
        followedArr,
        followedCount,
        approvalArr,
        approvalCount,
        blockArr,
        updatedDate: ISO8601,
        
      }
      
    };
    
    const followsSelfSaveObj = {
      
      $set: {
        
        followArr: followSelfArr,
        followCount: followSelfCount,
        updatedDate: ISO8601,
        
      }
      
    };
    
    
    
    
    // --------------------------------------------------
    //   Update
    // --------------------------------------------------
    
    await ModelFollows.transactionForUpsert({
      
      followsConditionObj,
      followsSaveObj,
      followsSelfConditionObj,
      followsSelfSaveObj,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    console.log(`
      ----------------------------------------\n
      /pages/api/v2/db/follows/upsert-follow-ur.js
    `);
    
    console.log(chalk`
      loginUsers_id: {green ${loginUsers_id}}
      users_id: {green ${users_id}}
    `);
    
    // console.log(`
    //   ----- followsConditionObj -----\n
    //   ${util.inspect(followsConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- followsSaveObj -----\n
    //   ${util.inspect(followsSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- followsSelfConditionObj -----\n
    //   ${util.inspect(followsSelfConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- followsSelfSaveObj -----\n
    //   ${util.inspect(followsSelfSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- resultObj -----\n
    //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
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
      endpointID: 'q4zqhmELq',
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