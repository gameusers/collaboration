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
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const Schema = require('./schema');
const SchemaEmailConfirmations = require('../email-confirmations/schema');
const SchemaFollows = require('../follows/schema');
const SchemaCardPlayers = require('../card-players/schema');
const SchemaImagesAndVideos = require('../images-and-videos/schema');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatImagesAndVideosArr, formatImagesAndVideosObj } = require('../images-and-videos/format');
const { formatFollowsObj } = require('../follows/format');




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
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Error
    // --------------------------------------------------
    
    if (!conditionObj || !Object.keys(conditionObj).length) {
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   FindOne
    // --------------------------------------------------
    
    return await Schema.findOne(conditionObj).exec();
    
    
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
    //   Error
    // --------------------------------------------------
    
    if (!conditionObj || !Object.keys(conditionObj).length) {
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    return await Schema.find(conditionObj).exec();
    
    
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
    //   Error
    // --------------------------------------------------
    
    if (!conditionObj || !Object.keys(conditionObj).length) {
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    return await Schema.countDocuments(conditionObj).exec();
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 挿入 / 更新する
 * @param {Object} conditionObj - 検索条件
 * @param {Object} saveObj - 保存するデータ
 * @return {Array} 
 */
const upsert = async ({ conditionObj, saveObj }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Error
    // --------------------------------------------------
    
    if (!conditionObj || !Object.keys(conditionObj).length) {
      throw new Error();
    }
    
    if (!saveObj || !Object.keys(saveObj).length) {
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   Upsert
    // --------------------------------------------------
    
    return await Schema.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 大量に挿入する
 * @param {Array} saveArr - 保存するデータ
 * @return {Array} 
 */
const insertMany = async ({ saveArr }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Error
    // --------------------------------------------------
    
    if (!saveArr || !saveArr.length) {
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   insertMany
    // --------------------------------------------------
    
    return await Schema.insertMany(saveArr);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 削除する
 * @param {Object} conditionObj - 検索条件
 * @param {boolean} reset - trueでデータをすべて削除する
 * @return {Array} 
 */
const deleteMany = async ({ conditionObj, reset = false }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Error
    // --------------------------------------------------
    
    if (!reset && (!conditionObj || !Object.keys(conditionObj).length)) {
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   Delete
    // --------------------------------------------------
    
    return await Schema.deleteMany(conditionObj);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};






/**
 * ユーザーページ用のデータを取得する
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} userID - DB users userID / ユーザーID
 * @return {Array}取得データ
 */
const findOneForUser = async ({
  
  localeObj,
  loginUsers_id,
  userID,
  
}) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const language = lodashGet(localeObj, ['language'], '');
    const country = lodashGet(localeObj, ['country'], '');
    
    
    // --------------------------------------------------
    //   Match Condition Array
    // --------------------------------------------------
    
    let matchConditionArr = [
      {
        $match : { userID }
      },
    ];
    
    // if (userCommunities_id) {
      
    //   matchConditionArr = [
    //     {
    //       $match : { _id: userCommunities_id, users_id: loginUsers_id }
    //     },
    //   ];
      
    // }
    
    
    // --------------------------------------------------
    //   Aggregation
    // --------------------------------------------------
    
    const resultArr = await Schema.aggregate([
      
      
      ...matchConditionArr,
      
      
      // プレイヤーカードを取得（名前＆ステータス）
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
                      { $eq: ['$language', language] },
                      { $eq: ['$users_id', '$$users_id'] },
                    ]
                  },
                }
              },
              
              
              { $project:
                {
                  name: '$nameObj.value',
                  status: '$statusObj.value',
                }
              }
            ],
            as: 'cardPlayersObj'
          }
      },
      
      {
        $unwind: {
          path: '$cardPlayersObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // 画像と動画を取得 - pagesObj トップ画像
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { usersPagesObjImagesAndVideos_id: '$pagesObj.imagesAndVideos_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$usersPagesObjImagesAndVideos_id'] },
                }
              },
              { $project:
                {
                  createdDate: 0,
                  updatedDate: 0,
                  users_id: 0,
                  __v: 0,
                }
              }
            ],
            as: 'pagesImagesAndVideosObj'
          }
      },
      
      {
        $unwind: {
          path: '$pagesImagesAndVideosObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // Follows
      {
        $lookup:
          {
            from: 'follows',
            let: { users_id: '$_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$users_id', '$$users_id'] },
                }
              },
            ],
            as: 'followsObj'
          }
      },
      
      {
        $unwind: {
          path: '$followsObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      { $project:
        {
          exp: 1,
          cardPlayersObj: 1,
          pagesObj: 1,
          pagesImagesAndVideosObj: 1,
          followsObj: 1,
        }
      },
      
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   
    // --------------------------------------------------
    
    const returnObj = lodashGet(resultArr, [0], {});
    const headerObj = {};
    
    
    // --------------------------------------------------
    //   画像の処理
    // --------------------------------------------------
    
    if (returnObj.pagesImagesAndVideosObj) {
      
      lodashSet(returnObj, ['pagesObj', 'imagesAndVideosObj'], returnObj.pagesImagesAndVideosObj);
      delete returnObj.pagesObj.imagesAndVideos_id;
      
      const pagesImagesAndVideosObj = formatImagesAndVideosObj({ obj: returnObj.pagesImagesAndVideosObj });
      lodashSet(headerObj, ['imagesAndVideosObj'], pagesImagesAndVideosObj);
      
    }
    
    
    // --------------------------------------------------
    //   follow フォーマット
    // --------------------------------------------------
    
    const followsObj = lodashGet(returnObj, ['followsObj'], {});
    const adminUsers_id = lodashGet(returnObj, ['_id'], '');
    
    headerObj.followsObj = formatFollowsObj({ followsObj, adminUsers_id, loginUsers_id });
    
    
    
    
    // --------------------------------------------------
    //   headerObj
    // --------------------------------------------------
    
    headerObj.users_id = returnObj._id;
    headerObj.type = 'ur';
    headerObj.exp = lodashGet(returnObj, ['exp'], 0);
    headerObj.name = lodashGet(returnObj, ['cardPlayersObj', 'name'], '');
    headerObj.status = lodashGet(returnObj, ['cardPlayersObj', 'status'], '');
    
    returnObj.headerObj = headerObj;
    
    
    
    
    // --------------------------------------------------
    //   delete
    // --------------------------------------------------
    
    delete returnObj.pagesImagesAndVideosObj;
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/users/model.js - findOneForUser
    // `);
    
    // console.log(chalk`
    //   userID: {green ${userID}}
    //   language: {green ${language}}
    //   country: {green ${country}}
    // `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   userCommunityID: {green ${userCommunityID}}
    // `);
    
    // console.log(`
    //   ----- resultArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
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
 * ◆見直しが必要　検索してデータを取得する / ログインしているユーザーのデータ用（サムネイル・ハンドルネーム・ステータス）
 * @param {Object} localeObj - ロケール
 * @param {Object} conditionObj - 検索条件
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @return {Object} 取得データ
 */
const findOneForLoginUsersObj = async ({ localeObj, conditionObj, loginUsers_id }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   データ取得
    // --------------------------------------------------
    
    let resultArr = await Schema.aggregate([
      
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
    
    const returnObj = format({ arr: resultArr, loginUsers_id });
    
    
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
    //   loginUsers_id: {green ${loginUsers_id}}
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
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @return {Object} 取得データ
 */
const format = async ({ arr, loginUsers_id }) => {
  
  
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
      exp: lodashGet(valueObj, ['exp'], 0),
      followCount: lodashGet(valueObj, ['followCount'], 0),
      followedCount: lodashGet(valueObj, ['followedCount'], 0),
      followed: false,
      accessDate: lodashGet(valueObj, ['accessDate'], ''),
      userID: lodashGet(valueObj, ['userID'], ''),
      role: lodashGet(valueObj, ['role'], 'User'),
    };
    
    
    // --------------------------------------------------
    //   Follow の処理
    // --------------------------------------------------
    
    if (loginUsers_id) {
      
      const followedArr = lodashGet(valueObj, ['followedArr'], []);
      
      if (
        loginUsers_id &&
        _id !== loginUsers_id &&
        followedArr.includes(loginUsers_id)
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
const findFormatted = async (conditionObj, loginUsers_id) => {
  
  
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
    
    const docArr = await Schema.find(conditionObj).select('_id accessDate name status playerId exp followArr followCount followedArr followedCount role').exec();
    
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
      
      if (loginUsers_id) {
        
        copiedObj.followed = false;
        
        if (
          loginUsers_id &&
          copiedObj._id !== loginUsers_id &&
          copiedObj.followedArr.includes(loginUsers_id)
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
    //   loginUsers_id: {green ${loginUsers_id}}
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
 * @param {string} loginUsers_id - フォローするユーザーの_id
 * @param {string} users_id - フォローされるユーザーの_id
 * @return {Object} 
 */
const updateForFollow = async (loginUsers_id, users_id) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Transaction / Session
  // --------------------------------------------------
  
  const session = await Schema.startSession();
  
  
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
    
    const conditionFindOne1Obj = { _id: loginUsers_id };
    const users1Obj = await Schema.findOne(conditionFindOne1Obj).exec();
    
    const conditionFindOne2Obj = { _id: users_id };
    const users2Obj = await Schema.findOne(conditionFindOne2Obj).exec();
    
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
      
      const condition1Obj = { _id: loginUsers_id };
      const save1Obj = { $pull: { followArr: users_id }, $inc: { followCount: -1 }  };
      const option1Obj = { session: session };
      await Schema.update(condition1Obj, save1Obj, option1Obj).exec();
      
      const condition2Obj = { _id: users_id };
      const save2Obj = { $pull: { followedArr: loginUsers_id }, $inc: { followedCount: -1 }  };
      const option2Obj = { session: session };
      await Schema.update(condition2Obj, save2Obj, option2Obj).exec();
      
      
    // --------------------------------------------------
    //   フォロー
    // --------------------------------------------------
    
    } else {
      
      
      // --------------------------------------------------
      //   Update
      // --------------------------------------------------
      
      const condition1Obj = { _id: loginUsers_id };
      const save1Obj = { $addToSet: { followArr: users_id }, $inc: { followCount: 1 } };
      const option1Obj = { session: session };
      await Schema.update(condition1Obj, save1Obj, option1Obj).exec();
      
      const condition2Obj = { _id: users_id };
      const save2Obj = { $addToSet: { followedArr: loginUsers_id }, $inc: { followedCount: 1 }  };
      const option2Obj = { session: session };
      await Schema.update(condition2Obj, save2Obj, option2Obj).exec();
      
      
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
    
    const conditionObj = { _id: { $in: [loginUsers_id, users_id]} };
    returnObj.usersObj = await findFormatted(conditionObj, loginUsers_id);
    
    
    
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
const transactionForCreateAccount = async ({ usersSaveArr, cardPlayersSaveArr, emailConfirmationsSaveArr }) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Transaction / Session
  // --------------------------------------------------
  
  const session = await Schema.startSession();
  
  
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
    
    await Schema.create(usersSaveArr, { session: session });
    await SchemaCardPlayers.create(cardPlayersSaveArr, { session: session });
    
    // E-Mailが入力されたときだけ、メール確認データベースに挿入する
    if (emailConfirmationsSaveArr.length > 0) {
      await SchemaEmailConfirmations.create(emailConfirmationsSaveArr, { session: session });
    }
    
    
    
    // await Schema.create(usersSaveArr, { session: session });
    // await SchemaCardPlayers.create(cardPlayersSaveArr, { session: session });
    // await SchemaEmailConfirmations.create(cardPlayersSaveArr, { session: session });
    
    
    // --------------------------------------------------
    //   Transaction / Commit
    // --------------------------------------------------
    
    await session.commitTransaction();
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
const transactionForEditAccount = async ({ usersConditionObj, usersSaveObj, emailConfirmationsConditionObj, emailConfirmationsSaveObj }) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Transaction / Session
  // --------------------------------------------------
  
  const session = await Schema.startSession();
  
  
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
    
    await Schema.updateOne(usersConditionObj, usersSaveObj, { session, upsert: true });
    await SchemaEmailConfirmations.updateOne(emailConfirmationsConditionObj, emailConfirmationsSaveObj, { session, upsert: true });
    
    // await Schema.create(usersSaveArr, { session });
    // throw new Error('Dy16VjjQL');
    // throw new Error();
    // await SchemaCardPlayers.create(cardPlayersSaveArr, { session: session });
    
    
    // --------------------------------------------------
    //   Transaction / Commit
    // --------------------------------------------------
    
    await session.commitTransaction();
    // console.log('--------コミット-----------');
    
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
    // console.log('--------ロールバック-----------');
    
    session.endSession();
    
    
    throw errorObj;
    
  }
  
};






/**
 * Transaction 挿入 / 更新する
 * users, follows, imagesAndVideos を同時に更新する
 * 
 * @param {Object} usersConditionObj - DB users 検索条件
 * @param {Object} usersSaveObj - DB users 保存データ
 * @param {Object} followsConditionObj - DB follows 検索条件
 * @param {Object} followsSaveObj - DB follows 保存データ
 * @param {Object} imagesAndVideosConditionObj - DB images-and-videos 検索条件
 * @param {Object} imagesAndVideosSaveObj - DB images-and-videos 保存データ
 * @return {Object} 
 */
const transactionForUpsert = async ({
  
  usersConditionObj,
  usersSaveObj,
  followsConditionObj,
  followsSaveObj,
  imagesAndVideosConditionObj = {},
  imagesAndVideosSaveObj = {},
  
}) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Transaction / Session
  // --------------------------------------------------
  
  const session = await Schema.startSession();
  
  
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Transaction / Start
    // --------------------------------------------------
    
    await session.startTransaction();
    
    
    
    
    // --------------------------------------------------
    //   Users
    // --------------------------------------------------
    
    await Schema.updateOne(usersConditionObj, usersSaveObj, { session, upsert: true });
    
    
    
    
    // --------------------------------------------------
    //   Follows
    // --------------------------------------------------
    
    if (Object.keys(followsConditionObj).length !== 0 && Object.keys(followsSaveObj).length !== 0) {
      await SchemaFollows.updateOne(followsConditionObj, followsSaveObj, { session, upsert: true });
    }
    
    
    
    
    // --------------------------------------------------
    //   Images And Videos - メイン画像
    // --------------------------------------------------
    
    if (Object.keys(imagesAndVideosConditionObj).length !== 0 && Object.keys(imagesAndVideosSaveObj).length !== 0) {
      
      
      // --------------------------------------------------
      //   画像＆動画を削除する
      // --------------------------------------------------
      
      const arr = lodashGet(imagesAndVideosSaveObj, ['arr'], []);
      
      if (arr.length === 0) {
        
        await SchemaImagesAndVideos.deleteOne(imagesAndVideosConditionObj, { session });
        
        
      // --------------------------------------------------
      //   画像＆動画を保存
      // --------------------------------------------------
        
      } else {
        
        await SchemaImagesAndVideos.updateOne(imagesAndVideosConditionObj, imagesAndVideosSaveObj, { session, upsert: true });
        
      }
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Transaction / Commit
    // --------------------------------------------------
    
    await session.commitTransaction();
    // console.log('--------コミット-----------');
    
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
    //   ----- imagesAndVideosConditionObj -----\n
    //   ${util.inspect(imagesAndVideosConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosSaveObj -----\n
    //   ${util.inspect(imagesAndVideosSaveObj, { colors: true, depth: null })}\n
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
  findOneForLoginUsersObj,
  findFormatted,
  updateForFollow,
  transactionForCreateAccount,
  transactionForEditAccount,
  transactionForUpsert,
  
};