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
 * @param {String} select - 必要な情報を選択
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
    
    if (docObj === null) {
      return returnObj;
    }
    
    
    // console.log(`
    //   docObj: \n${util.inspect(docObj, { colors: true, depth: null })}
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return docObj;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};


/**
 * 検索してデータを取得する / 1件だけ
 * @param {Object} conditionObj - 検索条件
 * @param {String} select - 必要な情報を選択
 * @return {Object} 取得データ
 */
const findOneFormatted = async (conditionObj, usersLogin_id) => {
  
  
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
    
    const docObj = await Model.findOne(conditionObj).select('_id accessDate name status playerId level followArr followCount followedArr followedCount role').exec();
    
    if (docObj === null) {
      return returnObj;
    }
    
    
    // --------------------------------------------------
    //   コピー
    // --------------------------------------------------
    
    const copiedObj = JSON.parse(JSON.stringify(docObj));
    
    
    // --------------------------------------------------
    //   Follow の処理
    // --------------------------------------------------
    
    if (usersLogin_id) {
      
      copiedObj.followed = false;
      
      if (
        usersLogin_id &&
        copiedObj._id !== usersLogin_id &&
        copiedObj.followedArr.includes(usersLogin_id)
      ) {
        copiedObj.followed = true;
      }
      
    }
    
    
    // --------------------------------------------------
    //   _id をキーにして削除する
    // --------------------------------------------------
    
    delete copiedObj._id;
    delete copiedObj.followArr;
    delete copiedObj.followedArr;
    returnObj[docObj._id] = copiedObj;
    
    
    
    
    // console.log(`
    //   docObj: \n${util.inspect(docObj, { colors: true, depth: null })}
    // `);
    
    // console.log(chalk`
    //   usersLogin_id: {green ${usersLogin_id}}
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
 * 検索してデータを取得する / 1件だけ
 * @param {Object} conditionObj - 検索条件
 * @param {String} select - 必要な情報を選択
 * @return {Object} 取得データ
 */
const findFormatted = async (conditionObj, usersLogin_id) => {
  
  
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
    
    const docArr = await Model.find(conditionObj).select('_id accessDate name status playerId level followArr followCount followedArr followedCount role').exec();
    
    if (docArr === null) {
      return returnObj;
    }
    
    
    // --------------------------------------------------
    //   Loop
    // --------------------------------------------------
    
    for (let value of docArr.values()) {
      
      
      // --------------------------------------------------
      //   コピー
      // --------------------------------------------------
      
      const copiedObj = JSON.parse(JSON.stringify(value));
      
      
      // --------------------------------------------------
      //   Follow の処理
      // --------------------------------------------------
      
      if (usersLogin_id) {
        
        copiedObj.followed = false;
        
        if (
          usersLogin_id &&
          copiedObj._id !== usersLogin_id &&
          copiedObj.followedArr.includes(usersLogin_id)
        ) {
          copiedObj.followed = true;
        }
        
      }
      
      
      // --------------------------------------------------
      //   _id をキーにして削除する
      // --------------------------------------------------
      
      delete copiedObj._id;
      delete copiedObj.followArr;
      delete copiedObj.followedArr;
      returnObj[value._id] = copiedObj;
      
    }
    
    
    
    
    
    // console.log(chalk`
    //   usersLogin_id: {green ${usersLogin_id}}
    // `);
    
    // console.log(`
    //   ----- docArr -----\n
    //   ${util.inspect(docArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
    //   --------------------\n
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
 * フォローする
 * @param {string} usersLogin_id - フォローするユーザーの_id
 * @param {string} users_id - フォローされるユーザーの_id
 * @return {string} 
 */
const updateForFollow = async (usersLogin_id, users_id) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Transaction / Session
  // --------------------------------------------------
  
  const session = await Model.startSession();
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Transaction / Start
    // --------------------------------------------------
    
    await session.startTransaction();
    
    
    // --------------------------------------------------
    //   Find One
    // --------------------------------------------------
    
    const conditionFindOne1Obj = { _id: usersLogin_id };
    const users1Obj = await Model.findOne(conditionFindOne1Obj).exec();
    
    const conditionFindOne2Obj = { _id: users_id };
    const users2Obj = await Model.findOne(conditionFindOne2Obj).exec();
    
    if (users1Obj === null || users2Obj === null) {
      throw new Error('必要なユーザーが存在しません。');
    }
    
    
    // --------------------------------------------------
    //   フォロー解除
    // --------------------------------------------------
    
    if (users1Obj.followArr.includes(users_id)) {
      
      
      // --------------------------------------------------
      //   Update
      // --------------------------------------------------
      
      const condition1Obj = { _id: usersLogin_id };
      const save1Obj = { $pull: { followArr: users_id }, $inc: { followCount: -1 }  };
      const option1Obj = { session: session };
      await Model.update(condition1Obj, save1Obj, option1Obj).exec();
      
      const condition2Obj = { _id: users_id };
      const save2Obj = { $pull: { followedArr: usersLogin_id }, $inc: { followedCount: -1 }  };
      const option2Obj = { session: session };
      await Model.update(condition2Obj, save2Obj, option2Obj).exec();
      
      
    // --------------------------------------------------
    //   フォロー
    // --------------------------------------------------
    
    } else {
      
      
      // --------------------------------------------------
      //   Update
      // --------------------------------------------------
      
      const condition1Obj = { _id: usersLogin_id };
      const save1Obj = { $addToSet: { followArr: users_id }, $inc: { followCount: 1 } };
      const option1Obj = { session: session };
      await Model.update(condition1Obj, save1Obj, option1Obj).exec();
      
      const condition2Obj = { _id: users_id };
      const save2Obj = { $addToSet: { followedArr: usersLogin_id }, $inc: { followedCount: 1 }  };
      const option2Obj = { session: session };
      await Model.update(condition2Obj, save2Obj, option2Obj).exec();
      
      
    }
    
    
    // --------------------------------------------------
    //   Transaction / Commit
    // --------------------------------------------------
    
    await session.commitTransaction(); // コミット
    // console.log('--------コミット-----------');
    
    session.endSession();
    
    
    
    // --------------------------------------------------
    //   Model / Users / データ取得
    // --------------------------------------------------
    
    const conditionObj = { _id: { $in: [usersLogin_id, users_id]} };
    returnObj.usersObj = await findFormatted(conditionObj, usersLogin_id);
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   usersObj.followArr.includes(users_id): {green ${usersObj.followArr.includes(users_id)}}
    // `);
    
    // console.log(`
    //   ----- usersObj -----\n
    //   ${util.inspect(usersObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return returnObj;
    
    
  } catch (err) {
    
    
    // --------------------------------------------------
    //   Transaction / Rollback
    // --------------------------------------------------
    
    await session.abortTransaction();
    // console.log('--------ロールバック-----------');
    
    session.endSession();
    
    
    throw err;
    
  }
  
};



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
  findOneFormatted,
  findFormatted,
  updateForFollow,
  insert
};