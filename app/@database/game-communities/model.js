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
const lodashHas = require('lodash/has');
const lodashCloneDeep = require('lodash/cloneDeep');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const Schema = require('./schema');
// const SchemaImagesAndVideos = require('../images-and-videos/schema');
// const SchemaFollows = require('../follows/schema');
const ModelGames = require('../games/model');


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
 * 検索してデータを取得する / For Game Community
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} gameCommunities_id - DB game-communities _id
 * @param {string} urlID - DB game-communities urlID
 * @return {Array}取得データ
 */
const findForGameCommunity = async ({ localeObj, loginUsers_id, urlID }) => {
  
  
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
    //   gameCommunities_id
    // --------------------------------------------------
    
    const docGamesObj = await ModelGames.findOne({
      
      conditionObj: {
        language,
        country,
        urlID,
      }
      
    });
    
    const gameCommunities_id = lodashGet(docGamesObj, ['gameCommunities_id'], '');
    
    console.log(`
      ----- docGamesObj -----\n
      ${util.inspect(docGamesObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    
    // --------------------------------------------------
    //   Match Condition Array
    // --------------------------------------------------
    
    let matchConditionArr = [
      {
        $match : { _id: gameCommunities_id }
      },
    ];
    
    // if (urlID) {
      
    //   matchConditionArr = [
    //     {
    //       $match : { urlID }
    //     },
    //   ];
      
    // }
    
    
    // --------------------------------------------------
    //   Aggregation
    // --------------------------------------------------
    
    const resultArr = await Schema.aggregate([
      
      
      ...matchConditionArr,
      
      
      // --------------------------------------------------
      //   games - 関連するゲーム
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'games',
            let: { gamesGameCommunities_id: '$_id' },
            pipeline: [
              
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $eq: ['$gameCommunities_id', '$$gamesGameCommunities_id'] },
                    ]
                  },
                }
              },
              
              
              // --------------------------------------------------
              //   games / images-and-videos / トップ画像
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { gamesImagesAndVideos_id: '$imagesAndVideos_id' },
                    pipeline: [
                      { $match:
                        { $expr:
                          { $eq: ['$_id', '$$gamesImagesAndVideos_id'] },
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
              
              
              // --------------------------------------------------
              //   games / images-and-videos / サムネイル用
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { gamesImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
                    pipeline: [
                      { $match:
                        { $expr:
                          { $eq: ['$_id', '$$gamesImagesAndVideosThumbnail_id'] },
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
                  path: '$imagesAndVideosThumbnailObj',
                  preserveNullAndEmptyArrays: true,
                }
              },
              
              
              // { $project:
              //   {
              //     gameCommunities_id: 1,
              //     urlID: 1,
              //     name: 1,
              //     imagesAndVideosObj: 1,
              //   }
              // },
            ],
            as: 'gamesArr'
          }
      },
      
      
      
      
      
      // --------------------------------------------------
      //   follows
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'follows',
            let: { gc_id: '$_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$gameCommunities_id', '$$gc_id'] },
                }
              },
              { $project:
                {
                  _id: 0,
                  approval: 1,
                  followedArr: 1,
                  approvalArr: 1,
                  blockArr: 1,
                  followedCount: 1,
                }
              }
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
      
      
      // { $project:
      //   {
      //     users_id: 1,
      //     createdDate: 1,
      //     localesArr: 1,
      //     communityType: 1,
      //     anonymity: 1,
      //     imagesAndVideosObj: 1,
      //     gamesArr: 1,
      //     followsObj: 1,
      //   }
      // },
      
      
    ]).exec();
    
    
    // console.log(`
    //   ----- resultArr -----\n
    //   ${util.inspect(resultArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const returnObj = lodashGet(resultArr, [0], {});
    const headerObj = {};
    
    
    
    
    // --------------------------------------------------
    //   画像の処理
    // --------------------------------------------------
    
    if (returnObj.imagesAndVideosObj) {
      headerObj.imagesAndVideosObj = formatImagesAndVideosObj({ obj: returnObj.imagesAndVideosObj });
    }
    
    
    // --------------------------------------------------
    //   画像の処理 - 関連するゲーム
    // --------------------------------------------------
    
    if (returnObj.gamesArr) {
      headerObj.gamesArr = formatImagesAndVideosArr({ arr: returnObj.gamesArr });
    }
    
    
    
    
    // --------------------------------------------------
    //   Locale / name & description
    // --------------------------------------------------
    
    const localesArr = lodashGet(returnObj, ['localesArr'], []);
    
    const filteredArr = localesArr.filter((filterObj) => {
      return filterObj.language === localeObj.language;
    });
    
    
    if (lodashHas(filteredArr, [0])) {
      
      returnObj.name = lodashGet(filteredArr, [0, 'name'], '');;
      returnObj.description = lodashGet(filteredArr, [0, 'description'], '');
      
    } else {
      
      returnObj.name = lodashGet(localesArr, [0, 'name'], '');
      returnObj.description = lodashGet(localesArr, [0, 'description'], '');
      
    }
    
    
    
    
    // --------------------------------------------------
    //   follow フォーマット
    // --------------------------------------------------
    
    const followsObj = lodashGet(returnObj, ['followsObj'], {});
    const adminUsers_id = lodashGet(returnObj, ['users_id'], '');
    
    headerObj.followsObj = formatFollowsObj({ followsObj, adminUsers_id, loginUsers_id });
    
    
    // --------------------------------------------------
    //   headerObj
    // --------------------------------------------------
    
    headerObj.userCommunities_id = returnObj._id;
    headerObj.type = 'uc';
    headerObj.createdDate = returnObj.createdDate;
    headerObj.name = returnObj.name;
    headerObj.approval = lodashGet(returnObj, ['followsObj', 'approval'], false);
    headerObj.followedCount = lodashGet(returnObj, ['followsObj', 'followedCount'], 0);
    
    returnObj.headerObj = headerObj;
    
    
    
    
    // --------------------------------------------------
    //   不要な項目を削除する
    // --------------------------------------------------
    
    delete returnObj.createdDate;
    delete returnObj.localesArr;
    delete returnObj.gamesArr;
    delete returnObj.imagesAndVideosObj;
    delete returnObj.followsObj;
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    console.log(`
      ----------------------------------------\n
      /app/@database/game-communities/model.js - findForGameCommunity
    `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   userCommunityID: {green ${userCommunityID}}
    // `);
    
    console.log(`
      ----- resultArr -----\n
      ${util.inspect(resultArr, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
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
 * Transaction 挿入 / 更新する
 * ユーザーコミュニティ、フォロー、画像＆動画を同時に更新する
 * 
 * @param {Object} userCommunitiesConditionObj - DB user-communities 検索条件
 * @param {Object} userCommunitiesSaveObj - DB user-communities 保存データ
 * @param {Object} followsConditionObj - DB follows 検索条件
 * @param {Object} followsSaveObj - DB follows 保存データ
 * @param {Object} imagesAndVideosConditionObj - DB images-and-videos 検索条件 / トップ画像
 * @param {Object} imagesAndVideosSaveObj - DB images-and-videos 保存データ / トップ画像
 * @param {Object} imagesAndVideosThumbnailConditionObj - DB images-and-videos 検索条件 / サムネイル画像
 * @param {Object} imagesAndVideosThumbnailSaveObj - DB images-and-videos 保存データ / サムネイル画像
 * @return {Object} 
 */
// const transactionForUpsertSettings = async ({
  
//   userCommunitiesConditionObj,
//   userCommunitiesSaveObj,
//   followsConditionObj,
//   followsSaveObj,
//   imagesAndVideosConditionObj = {},
//   imagesAndVideosSaveObj = {},
//   imagesAndVideosThumbnailConditionObj = {},
//   imagesAndVideosThumbnailSaveObj = {},
  
// }) => {
  
  
//   // --------------------------------------------------
//   //   Property
//   // --------------------------------------------------
  
//   let returnObj = {};
  
  
//   // --------------------------------------------------
//   //   Transaction / Session
//   // --------------------------------------------------
  
//   const session = await Schema.startSession();
  
  
  
  
//   // --------------------------------------------------
//   //   Database
//   // --------------------------------------------------
  
//   try {
    
    
//     // --------------------------------------------------
//     //   Transaction / Start
//     // --------------------------------------------------
    
//     await session.startTransaction();
    
    
    
    
//     // --------------------------------------------------
//     //   DB user-communities
//     // --------------------------------------------------
    
//     await Schema.updateOne(userCommunitiesConditionObj, userCommunitiesSaveObj, { session, upsert: true });
    
    
//     // --------------------------------------------------
//     //   DB follows 
//     // --------------------------------------------------
    
//     await SchemaFollows.updateOne(followsConditionObj, followsSaveObj, { session, upsert: true });
    
    
    
//     // --------------------------------------------------
//     //   DB images-and-videos / トップ画像
//     // --------------------------------------------------
    
//     if (Object.keys(imagesAndVideosConditionObj).length !== 0 && Object.keys(imagesAndVideosSaveObj).length !== 0) {
      
      
//       // --------------------------------------------------
//       //   画像＆動画を削除する
//       // --------------------------------------------------
      
//       const arr = lodashGet(imagesAndVideosSaveObj, ['arr'], []);
      
//       if (arr.length === 0) {
        
//         await SchemaImagesAndVideos.deleteOne(imagesAndVideosConditionObj, { session });
        
        
//       // --------------------------------------------------
//       //   画像＆動画を保存
//       // --------------------------------------------------
        
//       } else {
        
//         await SchemaImagesAndVideos.updateOne(imagesAndVideosConditionObj, imagesAndVideosSaveObj, { session, upsert: true });
        
//       }
      
//     }
    
    
//     // --------------------------------------------------
//     //   DB images-and-videos / サムネイル画像
//     // --------------------------------------------------
    
//     if (Object.keys(imagesAndVideosThumbnailConditionObj).length !== 0 && Object.keys(imagesAndVideosThumbnailSaveObj).length !== 0) {
      
      
//       // --------------------------------------------------
//       //   画像＆動画を削除する
//       // --------------------------------------------------
      
//       const arr = lodashGet(imagesAndVideosThumbnailSaveObj, ['arr'], []);
      
//       if (arr.length === 0) {
        
//         await SchemaImagesAndVideos.deleteOne(imagesAndVideosThumbnailConditionObj, { session });
        
        
//       // --------------------------------------------------
//       //   画像＆動画を保存
//       // --------------------------------------------------
        
//       } else {
        
//         await SchemaImagesAndVideos.updateOne(imagesAndVideosThumbnailConditionObj, imagesAndVideosThumbnailSaveObj, { session, upsert: true });
        
//       }
      
//     }
    
    
    
    
//     // --------------------------------------------------
//     //   Transaction / Commit
//     // --------------------------------------------------
    
//     await session.commitTransaction();
    
//     // console.log('--------コミット-----------');
    
//     session.endSession();
    
    
    
    
//     // --------------------------------------------------
//     //   console.log
//     // --------------------------------------------------
    
//     // console.log(`
//     //   ----- userCommunitiesConditionObj -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(userCommunitiesConditionObj)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- userCommunitiesSaveObj -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(userCommunitiesSaveObj)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- followsConditionObj -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(followsConditionObj)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- followsSaveObj -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(followsSaveObj)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- imagesAndVideosConditionObj -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosConditionObj)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- imagesAndVideosSaveObj -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosSaveObj)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- imagesAndVideosThumbnailConditionObj -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosThumbnailConditionObj)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- imagesAndVideosThumbnailSaveObj -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosThumbnailSaveObj)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- returnObj -----\n
//     //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
    
    
    
//     // --------------------------------------------------
//     //   Return
//     // --------------------------------------------------
    
//     return returnObj;
    
    
//   } catch (errorObj) {
    
    
//     // --------------------------------------------------
//     //   Transaction / Rollback
//     // --------------------------------------------------
    
//     await session.abortTransaction();
    
//     // console.log('--------ロールバック-----------');
    
//     session.endSession();
    
    
//     throw errorObj;
    
//   }
  
// };




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
  
  findForGameCommunity,
  // findForUserCommunitySettings,
  
  // transactionForUpsertSettings,
  
};