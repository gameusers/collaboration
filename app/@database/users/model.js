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

const lodashGet = require('lodash/get');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const SchemaUsers = require('./schema');
const SchemaEmailConfirmations = require('../email-confirmations/schema');
const SchemaCardPlayers = require('../card-players/schema');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatImagesAndVideosArr } = require('../../@format/image');




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * 検索してデータを取得する / 1件だけ
 * @param {Object} conditionObj - 検索条件
 * @return {Object} 取得データ
 */
const findOne = async ({ conditionObj }) => {
  
  
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
    
    const docObj = await SchemaUsers.findOne(conditionObj).exec();
    
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
 * 取得する
 * @param {Object} conditionObj - 検索条件
 * @return {Array} 取得データ
 */
const find = async ({ conditionObj }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    return await SchemaUsers.find(conditionObj).exec();
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * カウントを取得する
 * @param {Object} conditionObj - 検索条件
 * @return {number} カウント数
 */
const count = async ({ conditionObj }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    return await SchemaUsers.countDocuments(conditionObj).exec();
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 挿入 / 更新する
 * @param {Object} argumentsObj - 引数
 * @return {Array} 
 */
const upsert = async ({ conditionObj, saveObj }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Upsert
    // --------------------------------------------------
    
    return await SchemaUsers.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 挿入する
 * @param {Object} argumentsObj - 引数
 * @return {Array} 
 */
const insertMany = async ({ saveArr }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   insertMany
    // --------------------------------------------------
    
    return await SchemaUsers.insertMany(saveArr);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 削除する
 * @param {Object} conditionObj - 検索条件
 * @return {Array} 
 */
const deleteMany = async ({ conditionObj }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Delete
    // --------------------------------------------------
    
    return await SchemaUsers.deleteMany(conditionObj);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};









/**
 * 検索してデータを取得する / User 用（サムネイル・ハンドルネーム・ステータス）
 * @param {Object} localeObj - ロケール
 * @param {Object} conditionObj - 検索条件
 * @param {string} usersLogin_id - DB users _id / ログイン中のユーザーID
 * @return {Object} 取得データ
 */
const findOneForUser = async ({ localeObj, conditionObj, usersLogin_id }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   データ取得
    // --------------------------------------------------
    
    let resultArr = await SchemaUsers.aggregate([
      
      {
        $match : conditionObj
      },
      
      
      {
        $lookup:
          {
            from: 'card-players',
            let: { users_id: '$_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$users_id', '$$users_id'] }
                    ]
                  },
                }
              },
              { $project:
                {
                  _id: 0,
                  nameObj: 1,
                  statusObj: 1,
                  imagesAndVideosObj: 1,
                }
              }
            ],
            as: 'cardPlayersArr'
          }
      },
      
      
      {
        $project: {
          __v: 0,
          createdDate: 0,
          updatedDate: 0,
          loginID: 0,
          loginPassword: 0,
          emailObj: 0,
          country: 0,
        }
      },
      
    ]).exec();
    
    
    // --------------------------------------------------
    //   フォーマット
    // --------------------------------------------------
    
    const returnObj = format({ arr: resultArr, usersLogin_id });
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- localeObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(localeObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- conditionObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(conditionObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   usersLogin_id: {green ${usersLogin_id}}
    // `);
    
    // console.log(`
    //   ----- resultArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(returnObj)), { colors: true, depth: null })}\n
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
 * フォーマットする / 現状、多言語に対応していない。localeObjを使用していない。
 * @param {Array} arr - 配列
 * @param {string} usersLogin_id - DB users _id / ログイン中のユーザーID
 * @return {Object} 取得データ
 */
const format = async ({ arr, usersLogin_id }) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Loop
  // --------------------------------------------------
  
  for (let valueObj of arr.values()) {
    
    
    // --------------------------------------------------
    //   _id
    // --------------------------------------------------
    
    const _id = lodashGet(valueObj, ['_id'], '');
    
    
    // --------------------------------------------------
    //   Return Object
    // --------------------------------------------------
    
    returnObj[_id] = {
      // _id,
      name: lodashGet(valueObj, ['cardPlayersArr', 0, 'nameObj', 'value'], ''),
      status: lodashGet(valueObj, ['cardPlayersArr', 0, 'statusObj', 'value'], ''),
      experience: lodashGet(valueObj, ['experience'], 0),
      followCount: lodashGet(valueObj, ['followCount'], 0),
      followedCount: lodashGet(valueObj, ['followedCount'], 0),
      followed: false,
      accessDate: lodashGet(valueObj, ['accessDate'], ''),
      playerID: lodashGet(valueObj, ['playerID'], ''),
      role: lodashGet(valueObj, ['role'], 'User'),
    };
    
    
    // --------------------------------------------------
    //   Follow の処理
    // --------------------------------------------------
    
    if (usersLogin_id) {
      
      const followedArr = lodashGet(valueObj, ['followedArr'], []);
      
      if (
        usersLogin_id &&
        _id !== usersLogin_id &&
        followedArr.includes(usersLogin_id)
      ) {
        returnObj[_id].followed = true;
      }
      
    }
    
    
    // --------------------------------------------------
    //   画像の処理
    // --------------------------------------------------
    
    const thumbnailArr = lodashGet(valueObj, ['cardPlayersArr', 0, 'imagesAndVideosObj', 'thumbnailArr'], []);
    const formattedArr = formatImagesAndVideosArr({ arr: thumbnailArr });
    
    if (formattedArr.length > 0) {
      returnObj[_id].thumbnailObj = formattedArr[0];
    }
    
    
    // console.log(valueObj);
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return returnObj;
  
  
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
    
    const docArr = await SchemaUsers.find(conditionObj).select('_id accessDate name status playerId experience followArr followCount followedArr followedCount role').exec();
    
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
 * @return {Object} 
 */
const updateForFollow = async (usersLogin_id, users_id) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Transaction / Session
  // --------------------------------------------------
  
  const session = await SchemaUsers.startSession();
  
  
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
    const users1Obj = await SchemaUsers.findOne(conditionFindOne1Obj).exec();
    
    const conditionFindOne2Obj = { _id: users_id };
    const users2Obj = await SchemaUsers.findOne(conditionFindOne2Obj).exec();
    
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
      await SchemaUsers.update(condition1Obj, save1Obj, option1Obj).exec();
      
      const condition2Obj = { _id: users_id };
      const save2Obj = { $pull: { followedArr: usersLogin_id }, $inc: { followedCount: -1 }  };
      const option2Obj = { session: session };
      await SchemaUsers.update(condition2Obj, save2Obj, option2Obj).exec();
      
      
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
      await SchemaUsers.update(condition1Obj, save1Obj, option1Obj).exec();
      
      const condition2Obj = { _id: users_id };
      const save2Obj = { $addToSet: { followedArr: usersLogin_id }, $inc: { followedCount: 1 }  };
      const option2Obj = { session: session };
      await SchemaUsers.update(condition2Obj, save2Obj, option2Obj).exec();
      
      
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
 * アカウントを作成する
 * @param {Array} usersSaveArr - 保存用配列 Users
 * @param {Array} cardPlayersSaveArr - 保存用配列 Card Players
 * @return {Object} 
 */
const insertForCreateAccount = async ({ usersSaveArr, cardPlayersSaveArr }) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Transaction / Session
  // --------------------------------------------------
  
  const session = await SchemaUsers.startSession();
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Transaction / Start
    // --------------------------------------------------
    
    await session.startTransaction();
    
    
    // --------------------------------------------------
    //   DB Insert
    // --------------------------------------------------
    
    await SchemaUsers.create(usersSaveArr, { session: session });
    // throw new Error('Dy16VjjQL');
    // throw new Error();
    await SchemaCardPlayers.create(cardPlayersSaveArr, { session: session });
    
    
    // --------------------------------------------------
    //   Transaction / Commit
    // --------------------------------------------------
    
    await session.commitTransaction(); // コミット
    // console.log('--------コミット-----------');
    
    session.endSession();
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   loginID: {green ${loginID}}
    //   loginPassword: {green ${loginPassword}}
    //   email: {green ${email}}
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
    
    
  } catch (errorObj) {
    
    // console.log(`
    //   ----- errorObj -----\n
    //   ${util.inspect(errorObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Transaction / Rollback
    // --------------------------------------------------
    
    await session.abortTransaction();
    // console.log('--------ロールバック-----------');
    
    session.endSession();
    
    
    throw errorObj;
    
  }
  
};





/**
 * 挿入 / 更新する  アカウント情報編集用
 * @param {Object} usersConditionObj - DB users 検索条件
 * @param {Object} usersSaveObj - DB users 保存データ
 * @param {Object} emailConfirmationsConditionObj - DB email-confirmations 検索条件
 * @param {Object} emailConfirmationsSaveObj - DB email-confirmations 保存データ
 * @return {Object} 
 */
const upsertForCreateEditAccount = async ({ usersConditionObj, usersSaveObj, emailConfirmationsConditionObj, emailConfirmationsSaveObj }) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Transaction / Session
  // --------------------------------------------------
  
  const session = await SchemaUsers.startSession();
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Transaction / Start
    // --------------------------------------------------
    
    await session.startTransaction();
    
    
    // --------------------------------------------------
    //   DB Insert
    // --------------------------------------------------
    
    await SchemaUsers.update(usersConditionObj, usersSaveObj, { session, upsert: true });
    await SchemaEmailConfirmations.update(emailConfirmationsConditionObj, emailConfirmationsSaveObj, { session, upsert: true });
    
    // await SchemaUsers.create(usersSaveArr, { session });
    // throw new Error('Dy16VjjQL');
    // throw new Error();
    // await SchemaCardPlayers.create(cardPlayersSaveArr, { session: session });
    
    
    // --------------------------------------------------
    //   Transaction / Commit
    // --------------------------------------------------
    
    await session.commitTransaction();
    console.log('--------コミット-----------');
    
    session.endSession();
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- usersConditionObj -----\n
    //   ${util.inspect(usersConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- usersSaveObj -----\n
    //   ${util.inspect(usersSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- emailConfirmationsConditionObj -----\n
    //   ${util.inspect(emailConfirmationsConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- emailConfirmationsSaveObj -----\n
    //   ${util.inspect(emailConfirmationsSaveObj, { colors: true, depth: null })}\n
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
    
    
  } catch (errorObj) {
    
    // console.log(`
    //   ----- errorObj -----\n
    //   ${util.inspect(errorObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Transaction / Rollback
    // --------------------------------------------------
    
    await session.abortTransaction();
    console.log('--------ロールバック-----------');
    
    session.endSession();
    
    
    throw errorObj;
    
  }
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  findOne,
  find,
  count,
  upsert,
  insertMany,
  deleteMany,
  findOneForUser,
  findFormatted,
  updateForFollow,
  insertForCreateAccount,
  upsertForCreateEditAccount
};