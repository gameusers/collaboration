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
const lodashCloneDeep = require('lodash/cloneDeep');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const Schema = require('./schema');
const SchemaUsers = require('../users/schema');
const ModelIDs = require('../ids/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { formatImagesAndVideosObj } = require('../images-and-videos/format');


// ---------------------------------------------
//   Format
// ---------------------------------------------

// const { formatImagesAndVideosArr } = require('../../@format/image');




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
 * 取得する
 * @param {Object} localeObj - ロケール
 * @param {string} users_id - DB users _id
 * @param {string} cardPlayers_id - DB card-players _id
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @return {Object} 取得データ
 */
const findForCardPlayer = async ({ localeObj, users_id, cardPlayers_id, loginUsers_id }) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Match Condition Array
    // --------------------------------------------------
    
    let matchConditionArr = [
      {
        $match : { users_id }
      },
    ];
    
    if (cardPlayers_id) {
      
      matchConditionArr = [
        {
          $match : { _id: cardPlayers_id }
        },
      ];
      
    }
    
    
    // console.log(`
    //   ----- matchConditionArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(matchConditionArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Card Players のデータを取得
    // --------------------------------------------------
    
    let resultArr = await Schema.aggregate([
      
      
      ...matchConditionArr,
      
      
      // 画像と動画を取得
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { cardPlayersImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$cardPlayersImagesAndVideos_id'] },
                }
              },
              { $project:
                {
                  // _id: 0,
                  createdDate: 0,
                  updatedDate: 0,
                  users_id: 0,
                  __v: 0,
                }
              }
            ],
            as: 'imagesAndVideosObj'
          }
      },
      
      {
        $unwind: {
          path: '$imagesAndVideosObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // 画像と動画を取得 - サムネイル用
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { cardPlayersImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$cardPlayersImagesAndVideosThumbnail_id'] },
                }
              },
              { $project:
                {
                  // _id: 0,
                  createdDate: 0,
                  updatedDate: 0,
                  users_id: 0,
                  __v: 0,
                }
              }
            ],
            as: 'imagesAndVideosThumbnailObj'
          }
      },
      
      {
        $unwind: {
          path: '$imagesAndVideosThumbnailObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // ユーザー情報
      {
        $lookup:
          {
            from: 'users',
            let: { cardPlayersUsers_id: '$users_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$cardPlayersUsers_id'] },
                }
              },
              { $project:
                {
                  _id: 0,
                  accessDate: 1,
                  exp: 1,
                  userID: 1,
                }
              }
            ],
            as: 'usersObj'
          }
      },
      
      {
        $unwind: '$usersObj'
      },
      
      
      // ハードウェア
      {
        $lookup:
          {
            from: 'hardwares',
            let: {
              cardPlayersHardwareActiveArr: '$hardwareActiveObj.valueArr',
              cardPlayersHardwareInactiveArr: '$hardwareInactiveObj.valueArr'
            },
            pipeline: [
              { $match:
                { $expr:
                  { $or:
                    [
                      { $and:
                        [
                          { $eq: ['$language', localeObj.language] },
                          { $eq: ['$country', localeObj.country] },
                          { $in: ['$hardwareID', '$$cardPlayersHardwareActiveArr'] }
                        ]
                      },
                      { $and:
                        [
                          { $eq: ['$language', localeObj.language] },
                          { $eq: ['$country', localeObj.country] },
                          { $in: ['$hardwareID', '$$cardPlayersHardwareInactiveArr'] }
                        ]
                      }
                    ]
                  }
                }
              },
              { $project:
                {
                  _id: 0,
                  hardwareID: 1,
                  name: 1,
                }
              }
            ],
            as: 'hardwaresArr'
          }
      },
      
      
      // Follows
      {
        $lookup:
          {
            from: 'follows',
            let: { cardPlayersUsers_id: '$users_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$users_id', '$$cardPlayersUsers_id'] },
                }
              },
              { $project:
                {
                  _id: 0,
                  followArr: 1,
                  followedArr: 1,
                  followedCount: 1,
                }
              }
            ],
            as: 'followsObj'
          }
      },
      
      {
        $unwind: '$followsObj'
      },
      
      
      {
        $project: {
          __v: 0,
          createdDate: 0,
          language: 0,
          nameObj: { search: 0 },
          statusObj: { search: 0 },
          commentObj: { search: 0 },
          ageObj: { search: 0 },
          sexObj: { search: 0 },
          addressObj: { search: 0 },
          gamingExperienceObj: { search: 0 },
          hobbiesObj: { search: 0 },
          specialSkillsObj: { search: 0 },
          smartphoneObj: { search: 0 },
          tabletObj: { search: 0 },
          pcObj: { search: 0 },
          hardwareActiveObj: { search: 0 },
          hardwareInactiveObj: { search: 0 },
          activityTimeObj: { search: 0 },
          'activityTimeObj.valueArr': { _id: 0 },
          lookingForFriendsObj: { search: 0 },
          voiceChatObj: { search: 0 },
          idArr: { _id: 0, search: 0 },
          linkArr: { _id: 0, search: 0 },
        }
      },
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   DB - ID データをまとめて取得
    // --------------------------------------------------
    
    let ids_idArr = [];
    
    for (let valueObj of resultArr.values()) {
      ids_idArr = ids_idArr.concat(valueObj.ids_idArr);
    }
    
    const resultIDsObj = await ModelIDs.findForCardPlayer({
      
      localeObj,
      loginUsers_id,
      ids_idArr,
      
    });
    
    
    // --------------------------------------------------
    //   フォーマット
    // --------------------------------------------------
    
    returnObj = format({
      localeObj,
      loginUsers_id,
      cardPlayersArr: resultArr,
      idsObj: resultIDsObj
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- resultArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- ids_idArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(ids_idArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- resultIDsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultIDsObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`\n---------- resultArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(resultArr)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(`\n---------- returnObj ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(returnObj)));
    // console.log(`\n-----------------------------------\n`);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return returnObj;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * _id で検索して取得する
 * @param {Object} argumentsObj - 引数
 * @return {Object} 取得データ
 */
const findOneBy_id = async ({
  
  _id,
  localeObj,
  loginUsers_id,
  
}) => {
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(chalk`
  //   _id: {green ${_id}}
  //   loginUsers_id: {green ${loginUsers_id}}
  // `);
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Aggregate
    // --------------------------------------------------
    
    let resultCardPlayersArr = await Schema.aggregate([
      
      {
        $match : { _id }
      },
      
      
      {
        $lookup:
          {
            from: 'users',
            let: { cardPlayersUsers_id: '$users_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$cardPlayersUsers_id'] },
                }
              },
              { $project:
                {
                  _id: 0,
                  accessDate: 1,
                  exp: 1,
                  userID: 1,
                  // followArr: 1,
                  // followedArr: 1,
                  // followedCount: 1,
                }
              }
            ],
            as: 'usersObj'
          }
      },
      {
        $unwind: '$usersObj'
      },
      
      
      {
        $lookup:
          {
            from: 'hardwares',
            let: {
              cardPlayersHardwareActiveArr: '$hardwareActiveObj.valueArr',
              cardPlayersHardwareInactiveArr: '$hardwareInactiveObj.valueArr'
            },
            pipeline: [
              { $match:
                { $expr:
                  { $or:
                    [
                      { $and:
                        [
                          { $eq: ['$language', localeObj.language] },
                          { $eq: ['$country', localeObj.country] },
                          { $in: ['$hardwareID', '$$cardPlayersHardwareActiveArr'] }
                        ]
                      },
                      { $and:
                        [
                          { $eq: ['$language', localeObj.language] },
                          { $eq: ['$country', localeObj.country] },
                          { $in: ['$hardwareID', '$$cardPlayersHardwareInactiveArr'] }
                        ]
                      }
                    ]
                  }
                }
              },
              { $project:
                {
                  _id: 0,
                  hardwareID: 1,
                  name: 1,
                }
              }
            ],
            as: 'hardwaresArr'
          }
      },
      
      
      // Follows
      {
        $lookup:
          {
            from: 'follows',
            let: { cardPlayersUsers_id: '$users_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$users_id', '$$cardPlayersUsers_id'] },
                }
              },
              { $project:
                {
                  _id: 0,
                  followArr: 1,
                  followedArr: 1,
                  followedCount: 1,
                }
              }
            ],
            as: 'followsObj'
          }
      },
      
      {
        $unwind: '$followsObj'
      },
      
      
      {
        $project: {
          __v: 0,
          createdDate: 0,
          language: 0,
          ageObj: { search: 0 },
          sexObj: { search: 0 },
          addressObj: { search: 0 },
          gamingExperienceObj: { search: 0 },
          hobbiesObj: { search: 0 },
          specialSkillsObj: { search: 0 },
          smartphoneObj: { search: 0 },
          tabletObj: { search: 0 },
          pcObj: { search: 0 },
          hardwareActiveObj: { search: 0 },
          hardwareInactiveObj: { search: 0 },
          activityTimeObj: { search: 0 },
          'activityTimeObj.valueArr': { _id: 0 },
          lookingForFriendsObj: { search: 0 },
          voiceChatObj: { search: 0 },
          idArr: { _id: 0, search: 0 },
          linkArr: { _id: 0, search: 0 },
        }
      },
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   ID データをまとめて取得
    // --------------------------------------------------
    
    let ids_idArr = [];
    
    for (let valueObj of resultCardPlayersArr.values()) {
      ids_idArr = ids_idArr.concat(valueObj.ids_idArr);
    }
    
    const resultIDsObj = await ModelIDs.findForCardPlayer({
      
      localeObj,
      loginUsers_id,
      ids_idArr,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   カードデータのフォーマット
    // --------------------------------------------------
    
    returnObj = format({
      loginUsers_id,
      cardPlayersArr: resultCardPlayersArr,
      idsObj: resultIDsObj,
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- ids_idArr -----\n
    //   ${util.inspect(ids_idArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- resultCardPlayersArr -----\n
    //   ${util.inspect(resultCardPlayersArr, { colors: true, depth: null })}\n
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
 * _id で検索して取得する
 * @param {Object} argumentsObj - 引数
 * @return {Object} 取得データ
 */
const findOneBy_idForEditForm = async ({
  
  _id,
  localeObj,
  loginUsers_id,
  
}) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Aggregate
    // --------------------------------------------------
    
    let resultCardPlayersArr = await Schema.aggregate([
      
      {
        $match:
          {
            _id,
            users_id: loginUsers_id
          }
      },
      
      
      // 画像と動画を取得
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { cardPlayersImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$cardPlayersImagesAndVideos_id'] },
                }
              },
              { $project:
                {
                  // _id: 0,
                  createdDate: 0,
                  updatedDate: 0,
                  users_id: 0,
                  __v: 0,
                }
              }
            ],
            as: 'imagesAndVideosObj'
          }
      },
      
      {
        $unwind: {
          path: '$imagesAndVideosObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // 画像と動画を取得 - サムネイル用
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { cardPlayersImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$cardPlayersImagesAndVideosThumbnail_id'] },
                }
              },
              { $project:
                {
                  // _id: 0,
                  createdDate: 0,
                  updatedDate: 0,
                  users_id: 0,
                  __v: 0,
                }
              }
            ],
            as: 'imagesAndVideosThumbnailObj'
          }
      },
      
      {
        $unwind: {
          path: '$imagesAndVideosThumbnailObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // ハードウェア
      {
        $lookup:
          {
            from: 'hardwares',
            let: {
              cardPlayersHardwareActiveArr: '$hardwareActiveObj.valueArr',
              cardPlayersHardwareInactiveArr: '$hardwareInactiveObj.valueArr'
            },
            pipeline: [
              { $match:
                { $expr:
                  { $or:
                    [
                      { $and:
                        [
                          { $eq: ['$language', localeObj.language] },
                          { $eq: ['$country', localeObj.country] },
                          { $in: ['$hardwareID', '$$cardPlayersHardwareActiveArr'] }
                        ]
                      },
                      { $and:
                        [
                          { $eq: ['$language', localeObj.language] },
                          { $eq: ['$country', localeObj.country] },
                          { $in: ['$hardwareID', '$$cardPlayersHardwareInactiveArr'] }
                        ]
                      }
                    ]
                  }
                }
              },
              { $project:
                {
                  _id: 0,
                  hardwareID: 1,
                  name: 1,
                }
              }
            ],
            as: 'hardwaresArr'
          }
      },
      
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   ID データをまとめて取得
    // --------------------------------------------------
    
    let ids_idArr = [];
    
    for (let valueObj of resultCardPlayersArr.values()) {
      ids_idArr = ids_idArr.concat(valueObj.ids_idArr);
    }
    
    const resultIDsObj = await ModelIDs.findForCardPlayer({
      
      localeObj,
      loginUsers_id,
      ids_idArr,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   カードデータのフォーマット
    // --------------------------------------------------
    
    returnObj = formatForEditForm({
      cardPlayersArr: resultCardPlayersArr,
      idsObj: resultIDsObj
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/card-players/model.js - findOneBy_idForEditForm
    // `);
    
    // console.log(`
    //   ----- resultCardPlayersArr -----\n
    //   ${util.inspect(resultCardPlayersArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- resultIDsObj -----\n
    //   ${util.inspect(resultIDsObj, { colors: true, depth: null })}\n
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
 * 取得する / メンバー用
 * @param {Object} localeObj - ロケール
 * @param {string} users_id - DB users _id
 * @param {string} cardPlayers_id - DB card-players _id
 * @param {Array} users_idsArr - DB users _id / 配列
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @return {Object} 取得データ
 */
const findForMember = async ({
  
  localeObj,
  loginUsers_id,
  users_idsArr,
  page = 1,
  limit = process.env.COMMUNITY_MEMBER_LIMIT,
  
}) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   parseInt
    // --------------------------------------------------
    
    const intPage = parseInt(page, 10);
    const intLimit = parseInt(limit, 10);
    
    // console.log(chalk`
    //   intPage: {green ${intPage}}
    //   intLimit: {green ${intLimit}}
    // `);
    
    
    // --------------------------------------------------
    //   Match Condition Array
    // --------------------------------------------------
    
    let matchConditionArr = [
      {
        $match : { _id: { $in: users_idsArr } },
      },
    ];
    
    
    // --------------------------------------------------
    //   Card Players のデータを取得
    // --------------------------------------------------
    
    const resultArr = await SchemaUsers.aggregate([
      
      
      ...matchConditionArr,
      
      
      // プレイヤーカードを取得
      {
        $lookup:
          {
            from: 'card-players',
            let: { users_id: '$_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$users_id', '$$users_id'] },
                }
              },
              
              
              // 画像と動画を取得
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { cardPlayersImagesAndVideos_id: '$imagesAndVideos_id' },
                    pipeline: [
                      { $match:
                        { $expr:
                          { $eq: ['$_id', '$$cardPlayersImagesAndVideos_id'] },
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
                    as: 'imagesAndVideosObj'
                  }
              },
              
              {
                $unwind: {
                  path: '$imagesAndVideosObj',
                  preserveNullAndEmptyArrays: true,
                }
              },
              
              
              // 画像と動画を取得 - サムネイル用
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { cardPlayersImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
                    pipeline: [
                      { $match:
                        { $expr:
                          { $eq: ['$_id', '$$cardPlayersImagesAndVideosThumbnail_id'] },
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
                    as: 'imagesAndVideosThumbnailObj'
                  }
              },
              
              {
                $unwind: {
                  path: '$imagesAndVideosThumbnailObj',
                  preserveNullAndEmptyArrays: true,
                }
              },
              
              
              // ユーザー情報
              {
                $lookup:
                  {
                    from: 'users',
                    let: { cardPlayersUsers_id: '$users_id' },
                    pipeline: [
                      { $match:
                        { $expr:
                          { $eq: ['$_id', '$$cardPlayersUsers_id'] },
                        }
                      },
                      { $project:
                        {
                          _id: 0,
                          accessDate: 1,
                          exp: 1,
                          userID: 1,
                          // followArr: 1,
                          // followedArr: 1,
                          // followedCount: 1,
                        }
                      }
                    ],
                    as: 'usersObj'
                  }
              },
              
              {
                $unwind: '$usersObj'
              },
              
              
              // ハードウェア
              {
                $lookup:
                  {
                    from: 'hardwares',
                    let: {
                      cardPlayersHardwareActiveArr: '$hardwareActiveObj.valueArr',
                      cardPlayersHardwareInactiveArr: '$hardwareInactiveObj.valueArr'
                    },
                    pipeline: [
                      { $match:
                        { $expr:
                          { $or:
                            [
                              { $and:
                                [
                                  { $eq: ['$language', localeObj.language] },
                                  { $eq: ['$country', localeObj.country] },
                                  { $in: ['$hardwareID', '$$cardPlayersHardwareActiveArr'] }
                                ]
                              },
                              { $and:
                                [
                                  { $eq: ['$language', localeObj.language] },
                                  { $eq: ['$country', localeObj.country] },
                                  { $in: ['$hardwareID', '$$cardPlayersHardwareInactiveArr'] }
                                ]
                              }
                            ]
                          }
                        }
                      },
                      { $project:
                        {
                          _id: 0,
                          hardwareID: 1,
                          name: 1,
                        }
                      }
                    ],
                    as: 'hardwaresArr'
                  }
              },
              
              
              // Follows
              {
                $lookup:
                  {
                    from: 'follows',
                    let: { cardPlayersUsers_id: '$users_id' },
                    pipeline: [
                      { $match:
                        { $expr:
                          { $eq: ['$users_id', '$$cardPlayersUsers_id'] },
                        }
                      },
                      { $project:
                        {
                          _id: 0,
                          followArr: 1,
                          followedArr: 1,
                          followedCount: 1,
                        }
                      }
                    ],
                    as: 'followsObj'
                  }
              },
              
              {
                $unwind: '$followsObj'
              },
              
              
              {
                $project: {
                  __v: 0,
                  createdDate: 0,
                  language: 0,
                  nameObj: { search: 0 },
                  statusObj: { search: 0 },
                  commentObj: { search: 0 },
                  ageObj: { search: 0 },
                  sexObj: { search: 0 },
                  addressObj: { search: 0 },
                  gamingExperienceObj: { search: 0 },
                  hobbiesObj: { search: 0 },
                  specialSkillsObj: { search: 0 },
                  smartphoneObj: { search: 0 },
                  tabletObj: { search: 0 },
                  pcObj: { search: 0 },
                  hardwareActiveObj: { search: 0 },
                  hardwareInactiveObj: { search: 0 },
                  activityTimeObj: { search: 0 },
                  'activityTimeObj.valueArr': { _id: 0 },
                  lookingForFriendsObj: { search: 0 },
                  voiceChatObj: { search: 0 },
                  idArr: { _id: 0, search: 0 },
                  linkArr: { _id: 0, search: 0 },
                }
              },
              
              
            ],
            as: 'cardPlayerObj'
          }
      },
      
      {
        $unwind: {
          path: '$cardPlayerObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      { $project:
        {
          // _id: 0,
          accessDate: 1,
          exp: 1,
          userID: 1,
          followArr: 1,
          followedArr: 1,
          followedCount: 1,
          cardPlayerObj: 1,
        }
      },
      
      
      { '$sort': { 'accessDate': -1 } },
      { $skip: (intPage - 1) * intLimit },
      { $limit: intLimit },
      
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   フォーマットできるように整える
    // --------------------------------------------------
    
    const cardPlayersArr = [];
    const cardPlayersForOrderArr = [];
    
    for (let valueObj of resultArr.values()) {
      
      const usersObj = {
        
        exp: valueObj.exp,
        followArr: valueObj.followArr,
        followedArr: valueObj.followedArr,
        followedCount: valueObj.followedCount,
        accessDate: valueObj.accessDate,
        userID: valueObj.userID,
        
      };
      
      const tempObj = lodashGet(valueObj, ['cardPlayerObj'], {});
      const temp_id = lodashGet(valueObj, ['cardPlayerObj', '_id'], '');
      
      tempObj.usersObj = usersObj;
      
      cardPlayersArr.push(tempObj);
      cardPlayersForOrderArr.push(temp_id);
      
    }
    
    
    // --------------------------------------------------
    //   DB - ID データをまとめて取得
    // --------------------------------------------------
    
    let ids_idArr = [];
    
    for (let valueObj of cardPlayersArr.values()) {
      ids_idArr = ids_idArr.concat(valueObj.ids_idArr);
    }
    
    const resultIDsObj = await ModelIDs.findForCardPlayer({
      
      localeObj,
      loginUsers_id,
      ids_idArr,
      
    });
    
    
    // --------------------------------------------------
    //   フォーマット
    // --------------------------------------------------
    
    returnObj.cardPlayersObj = format({
      
      localeObj,
      loginUsers_id,
      cardPlayersArr,
      idsObj: resultIDsObj
      
    });
    
    returnObj.cardPlayersForOrderArr = cardPlayersForOrderArr;
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/card-players/model.js
    // `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   page: {green ${page}}
    //   limit: {green ${limit}}
    // `);
    
    // console.log(`
    //   ----- users_idsArr -----\n
    //   ${util.inspect(users_idsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- cardPlayersArr -----\n
    //   ${util.inspect(cardPlayersArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- resultArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- ids_idArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(ids_idArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- resultIDsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultIDsObj)), { colors: true, depth: null })}\n
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
 * DBから取得したカード情報をフォーマットする
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {Array} cardPlayersArr - カード情報の入った配列
 * @param {Object} idsObj - ID情報の入ったオブジェクト
 * @return {Object} フォーマット後のデータ
 */
const format = ({ localeObj, loginUsers_id, cardPlayersArr, idsObj }) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Loop
  // --------------------------------------------------
  
  for (let valueObj of cardPlayersArr) {
    
    
    // --------------------------------------------------
    //   Deep Copy
    // --------------------------------------------------
    
    const clonedObj = lodashCloneDeep(valueObj);
    
    
    // --------------------------------------------------
    //   画像をフォーマットする
    // --------------------------------------------------
    
    const formattedObj = formatImagesAndVideosObj({ localeObj, obj: valueObj.imagesAndVideosObj });
    
    if (formattedObj) {
      
      clonedObj.imagesAndVideosObj = formattedObj;
      
    } else {
      
      delete clonedObj.imagesAndVideosObj;
      
    }
    
    
    // --------------------------------------------------
    //   画像をフォーマットする - サムネイル
    // --------------------------------------------------
    
    const formattedThumbnailObj = formatImagesAndVideosObj({ localeObj, obj: valueObj.imagesAndVideosThumbnailObj });
    
    if (formattedThumbnailObj) {
      
      clonedObj.imagesAndVideosThumbnailObj = formattedThumbnailObj;
      
    } else {
      
      delete clonedObj.imagesAndVideosThumbnailObj;
      
    }
    
    
    // --------------------------------------------------
    //   hardwareActive
    // --------------------------------------------------
    
    clonedObj.hardwareActiveArr = [];
    
    for (let value of valueObj.hardwareActiveObj.valueArr) {
      
      const obj = valueObj.hardwaresArr.find((value2) => {
        return value2.hardwareID === value;
      });
      
      if (obj && 'name' in obj) {
        clonedObj.hardwareActiveArr.push({
          name: obj.name
        });
      }
      
    }
    
    
    // --------------------------------------------------
    //   hardwareInactive
    // --------------------------------------------------
    
    clonedObj.hardwareInactiveArr = [];
    
    for (let value of valueObj.hardwareInactiveObj.valueArr) {
      
      const obj = valueObj.hardwaresArr.find((value2) => {
        return value2.hardwareID === value;
      });
      
      if (obj && 'name' in obj) {
        clonedObj.hardwareInactiveArr.push({
          name: obj.name
        });
      }
      
    }
    
    
    // --------------------------------------------------
    //   Follow の処理
    // --------------------------------------------------
    
    clonedObj.followsObj.follow = false;
    clonedObj.followsObj.followed = false;
    
    if (loginUsers_id) {
      
      if (clonedObj.users_id !== loginUsers_id) {
        
        if (clonedObj.followsObj.followArr.includes(loginUsers_id)) {
          clonedObj.followsObj.follow = true;
        }
        
        if (clonedObj.followsObj.followedArr.includes(loginUsers_id)) {
          clonedObj.followsObj.followed = true;
        }
        
      }
      
    }
    
    
    // --------------------------------------------------
    //   ID
    // --------------------------------------------------
    
    clonedObj.ids_idArr = [];
    
    for (let value of valueObj.ids_idArr) {
      
      if (value in idsObj) {
        clonedObj.ids_idArr.push(idsObj[value]);
      }
      
    }
    
    
    // --------------------------------------------------
    //   不要な項目を削除する
    // --------------------------------------------------
    
    delete clonedObj._id;
    delete clonedObj.followsObj.followArr;
    delete clonedObj.followsObj.followedArr;
    delete clonedObj.hardwareActiveObj;
    delete clonedObj.hardwareInactiveObj;
    delete clonedObj.hardwaresArr;
    delete clonedObj.imagesAndVideos_id;
    delete clonedObj.imagesAndVideosThumbnail_id;
    
    
    returnObj[valueObj._id] = clonedObj;
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return returnObj;
  
  
};




/**
 * DBから取得したカード情報をフォーマットする　編集フォーム用
 * @param {Array} cardPlayersArr - カード情報の入った配列
 * @param {Object} idsObj - ID情報の入ったオブジェクト
 * @return {Object} フォーマット後のデータ
 */
const formatForEditForm = ({ cardPlayersArr, idsObj }) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Loop
  // --------------------------------------------------
  
  for (let valueObj of cardPlayersArr) {
    
    
    // --------------------------------------------------
    //   ディープコピー
    // --------------------------------------------------
    
    const clonedObj = lodashCloneDeep(valueObj);
    
    
    // --------------------------------------------------
    //   hardwareActive
    // --------------------------------------------------
    
    clonedObj.hardwareActiveArr = [];
    
    for (let value of valueObj.hardwareActiveObj.valueArr) {
      
      const obj = valueObj.hardwaresArr.find((value2) => {
        return value2.hardwareID === value;
      });
      
      if (obj && 'name' in obj) {
        clonedObj.hardwareActiveArr.push({
          hardwareID: value,
          name: obj.name
        });
      }
      
    }
    
    
    // --------------------------------------------------
    //   hardwareInactive
    // --------------------------------------------------
    
    clonedObj.hardwareInactiveArr = [];
    
    for (let value of valueObj.hardwareInactiveObj.valueArr) {
      
      const obj = valueObj.hardwaresArr.find((value2) => {
        return value2.hardwareID === value;
      });
      
      if (obj && 'name' in obj) {
        clonedObj.hardwareInactiveArr.push({
          hardwareID: value,
          name: obj.name
        });
      }
      
    }
    
    
    // --------------------------------------------------
    //   ID
    // --------------------------------------------------
    
    clonedObj.ids_idArr = [];
    
    for (let value of valueObj.ids_idArr) {
      
      if (value in idsObj) {
        clonedObj.ids_idArr.push(idsObj[value]);
      }
      
    }
    
    
    // --------------------------------------------------
    //   不要な項目を削除する
    // --------------------------------------------------
    
    delete clonedObj.hardwaresArr;
    
    
    returnObj[valueObj._id] = clonedObj;
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return returnObj;
  
  
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
  
  findForCardPlayer,
  findOneBy_id,
  findOneBy_idForEditForm,
  findForMember,
  
};