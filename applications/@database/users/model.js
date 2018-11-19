// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const shortid = require('shortid');
const moment = require('moment');
const bcrypt = require('bcrypt');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const Model = require('./schema');


// ---------------------------------------------
//   Validation
// ---------------------------------------------

const validationLoginId = require('./validations/login-id');
const { validationLoginPassword } = require('./validations/login-password');
const validationEmail = require('./validations/email');


// ---------------------------------------------
//   暗号化
// ---------------------------------------------

const { encrypt }  = require('../../@modules/crypto');


// ---------------------------------------------
//   Logger
// ---------------------------------------------

const logger = require('../../@modules/logger');





// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * 検索してデータを取得する / 1件だけ
 * @param {Object} conditionObj - 検索条件
 * @return {Object} 取得データ
 */
const findOne = async (conditionObj) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   FindOne
    // --------------------------------------------------
    
    const docObj = await Model.findOne(conditionObj).exec();
    
    const copiedObj = JSON.parse(JSON.stringify(docObj));
    delete copiedObj._id;
    returnObj[docObj._id] = copiedObj;
    
    // for (let value of docArr.values()) {
    //   const copiedObj = JSON.parse(JSON.stringify(value));
    //   delete copiedObj._id;
    //   returnObj[value._id] = copiedObj;
    // }
    
    // console.log(`
    //   returnObj: \n${util.inspect(returnObj, { colors: true, depth: null })}
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return returnObj;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};



/**
 * Player ID で検索し _id を取得する / 1件だけ
 * @param {string} playerId - Player ID
 * @return {string} _id
 */
const findOne_IdByPlayerId = async (playerId) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnValue = '';
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   FindOne
    // --------------------------------------------------
    
    const condition = { playerId: playerId };
    const docObj = await Model.findOne(condition).select('_id').exec();
    
    if ('_id' in docObj) {
      returnValue = docObj._id;
    }
    
    // console.log(`
    //   playerId: \n${util.inspect(playerId, { colors: true, depth: null })}
    // `);
    
    // console.log(`
    //   docObj: \n${util.inspect(docObj, { colors: true, depth: null })}
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return returnValue;
    
    
  } catch (err) {
    throw err;
  }
  
};



/**
 * _id で検索しドキュメントを取得する
 * @param {array} _idArr - _idの入った配列 [8OM0dhDak, Wk_nHYW0q, oXiNOYRax]
 * @return {object} 取得されたデータ
 */
const findBy_Id = async (_idArr) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    const condition = { _id: { $in: _idArr} };
    const docArr = await Model.find(condition).select('_id role name status playerId level accessDate').exec();
    
    for (let value of docArr.values()) {
      const copiedObj = JSON.parse(JSON.stringify(value));
      delete copiedObj._id;
      returnObj[value._id] = copiedObj;
    }
    
    
    // console.log(`
    //   _idArr: \n${util.inspect(_idArr, { colors: true, depth: null })}
    // `);
    
    // console.log(`
    //   docArr: \n${util.inspect(docArr, { colors: true, depth: null })}
    // `);
    
    // console.log(`
    //   returnObj: \n${util.inspect(returnObj, { colors: true, depth: null })}
    // `);
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return returnObj;
    
    
  } catch (err) {
    throw err;
  }
  
};



/**
 * 取得する
 * @param {array} playerIdArr - Player IDの入った配列 [8OM0dhDak, Wk_nHYW0q, oXiNOYRax]
 * @return {object} 取得されたデータ
 */
// const find = async (playerIdArr) => {
  
  
//   // --------------------------------------------------
//   //   Return Object
//   // --------------------------------------------------
  
//   let returnObj = {};
  
  
//   // --------------------------------------------------
//   //   Find
//   // --------------------------------------------------
  
//   await Model.find({ playerId: { $in: playerIdArr} }, (err, docObj) => {
    
//     if (err) {
//       logger.log('error', `/applications/@database/users/model.js / find / Error: ${err}`);
//     } else {
//       returnObj = docObj;
//     }
    
//   });
  
  
//   // --------------------------------------------------
//   //   Return
//   // --------------------------------------------------
  
//   return returnObj;
  
  
// };



/**
 * 挿入する
 * @param {Object} reqBody
 * @return {Object} playerIdの入ったオブジェクト
 */
const insert = async (reqBody) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Set Variables
    // --------------------------------------------------
    
    const { createAccountId, createAccountPassword, createAccountEmail } = reqBody;
    
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    const validationLoginIdObj = validationLoginId(createAccountId);
    const validationLoginPasswordObj = validationLoginPassword(createAccountPassword, createAccountId);
    const validationEmailObj = validationEmail(createAccountEmail);
    
    if (
      validationLoginIdObj.error ||
      validationLoginPasswordObj.error ||
      validationEmailObj.error
    ) {
      throw new Error('Validation');
    }
    
    
    
    // --------------------------------------------------
    //   パスワードハッシュ化
    // --------------------------------------------------
    
    // ストレッチング回数
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(createAccountPassword, saltRounds);
    
    
    
    // --------------------------------------------------
    //   E-Mail 暗号化
    // --------------------------------------------------
    
    let encryptedEmail = '';
    
    if (createAccountEmail) {
      encryptedEmail = encrypt(createAccountEmail);
    }
    
    
    
    // --------------------------------------------------
    //   Save Object
    // --------------------------------------------------
    
    const _id = shortid.generate();
    const playerId = shortid.generate();
    
    const saveObj = {
      _id,
      loginId: createAccountId,
      loginPassword: passwordHash,
      email: encryptedEmail,
      name: '',
      status: '',
      playerId,
      // level: 'AAA'
    };
    
    
    
    // --------------------------------------------------
    //   Insert
    // --------------------------------------------------
    
    const docArr = await Model.create(saveObj);
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   createAccountId: {red ${createAccountId}}
    //   createAccountPassword: {green ${createAccountPassword}}
    //   createAccountEmail: {green ${createAccountEmail}}
    //   passwordHash: {green ${passwordHash}}
    //   encryptedEmail: {green ${encryptedEmail}}
    // `);
    
    // console.log(`
    //   reqBody: \n${util.inspect(reqBody, { colors: true, depth: null })}
    // `);
    
    // console.log(`
    //   validationLoginIdObj: \n${util.inspect(validationLoginIdObj, { colors: true, depth: null })}
    // `);
    
    // console.log(`
    //   validationLoginPasswordObj: \n${util.inspect(validationLoginPasswordObj, { colors: true, depth: null })}
    // `);
    
    // console.log(`
    //   validationEmailObj: \n${util.inspect(validationEmailObj, { colors: true, depth: null })}
    // `);
    
    // console.log(`
    //   saveObj: \n${util.inspect(saveObj, { colors: true, depth: null })}
    // `);
    
    // console.log(`
    //   docArr: \n${util.inspect(docArr, { colors: true, depth: null })}
    // `);
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    if (playerId in docArr) {
      returnObj.playerId = docArr.playerId;
    }
    
    return returnObj;
    
    
  } catch (err) {
    
    logger.log('error', `/applications/@database/users/model.js / insert / Error: ${err}`);
    throw err;
    
  }
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  findOne,
  findOne_IdByPlayerId,
  findBy_Id,
  // find,
  insert
};