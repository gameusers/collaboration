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
const SchemaGames = require('../games/schema');
// const SchemaImagesAndVideos = require('../images-and-videos/schema');
// 
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
 * @param {string} urlID - DB game-communities urlID
 * @return {Object} 取得データ
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
    //   Match Condition Array
    // --------------------------------------------------
    
    let matchConditionArr = [
      {
        $match : {
          
          language,
          country,
          urlID,
          
        }
      },
    ];
    
    
    // --------------------------------------------------
    //   Aggregation - games
    // --------------------------------------------------
    
    const docGamesArr = await SchemaGames.aggregate([
      
      
      ...matchConditionArr,
      
      
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
            as: 'imagesAndVideosThumbnailObj'
          }
      },
      
      {
        $unwind: {
          path: '$imagesAndVideosThumbnailObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // --------------------------------------------------
      //   games / hardwares / ハードウェア
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'hardwares',
            let: { gamesHardwareID: '$hardwareArr.hardwareID' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $in: ['$hardwareID', '$$gamesHardwareID'] }
                    ]
                  },
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
      
      
      // --------------------------------------------------
      //   games / game-genres / ジャンル
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'game-genres',
            let: { gamesGenreArr: '$genreArr' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $in: ['$genreID', '$$gamesGenreArr'] }
                    ]
                  },
                }
              },
              { $project:
                {
                  _id: 0,
                  genreID: 1,
                  name: 1,
                }
              }
            ],
            as: 'gameGenresArr'
          }
      },
      
      
      // --------------------------------------------------
      //   games / developers-publishers / 開発＆パブリッシャー
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'developers-publishers',
            let: {
              gamesPublisherID: '$hardwareArr.publisherID',
              gamesDeveloperID: '$hardwareArr.developerID',
            },
            pipeline: [
              { $match:
                { $expr:
                  { $or:
                    [
                      { $and:
                        [
                          { $eq: ['$language', language] },
                          { $eq: ['$country', country] },
                          { $in: ['$developerPublisherID', '$$gamesPublisherID'] }
                        ]
                      },
                      { $and:
                        [
                          { $eq: ['$language', language] },
                          { $eq: ['$country', country] },
                          { $in: ['$developerPublisherID', '$$gamesDeveloperID'] }
                        ]
                      }
                    ]
                  },
                }
              },
              { $project:
                {
                  _id: 0,
                  developerPublisherID: 1,
                  name: 1,
                }
              }
            ],
            as: 'developersPublishersArr'
          }
      },
      
      
      // --------------------------------------------------
      //   follows
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'follows',
            let: { gamesGameCommunities_id: '$gameCommunities_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$gameCommunities_id', '$$gamesGameCommunities_id'] },
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
      
      
      // --------------------------------------------------
      //   game-communities
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'game-communities',
            let: { gamesGameCommunities_id: '$gameCommunities_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$gamesGameCommunities_id'] },
                }
              },
              { $project:
                {
                  _id: 1,
                  forumObj: 1,
                  updatedDateObj: 1,
                  anonymity: 1,
                }
              }
            ],
            as: 'gameCommunitiesObj'
          }
      },
      
      {
        $unwind: {
          path: '$gameCommunitiesObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      { $project:
        {
          gameCommunities_id: 1,
          urlID: 1,
          imagesAndVideosObj: 1,
          imagesAndVideosThumbnailObj: 1,
          name: 1,
          subtitle: 1,
          hardwareArr: 1,
          genreArr: 1,
          linkArr: 1,
          hardwaresArr: 1,
          gameGenresArr: 1,
          developersPublishersArr: 1,
          followsObj: 1,
          gameCommunitiesObj: 1,
        }
      },
      
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   docGamesObj
    // --------------------------------------------------
    
    const docGamesObj = lodashGet(docGamesArr, [0], {});
    
    
    
    
    // --------------------------------------------------
    //   follow フォーマット
    // --------------------------------------------------
    
    const followsObj = formatFollowsObj({
      
      followsObj: lodashGet(docGamesObj, ['followsObj'], {}),
      adminUsers_id: '',
      loginUsers_id,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   Locale / name & description
    // --------------------------------------------------
    
    const headerObj = {
      
      type: 'gc',
      gameCommunities_id: docGamesObj.gameCommunities_id,
      urlID: docGamesObj.urlID,
      name: docGamesObj.name,
      hardwareArr: docGamesObj.hardwareArr,
      genreArr: docGamesObj.genreArr,
      linkArr: docGamesObj.linkArr,
      hardwaresArr: docGamesObj.hardwaresArr,
      gameGenresArr: docGamesObj.gameGenresArr,
      developersPublishersArr: docGamesObj.developersPublishersArr,
      followedCount: lodashGet(docGamesObj, ['followsObj', 'followedCount'], 0),
      imagesAndVideosObj: formatImagesAndVideosObj({ localeObj, obj: docGamesObj.imagesAndVideosObj }),
      imagesAndVideosThumbnailObj: formatImagesAndVideosObj({ localeObj, obj: docGamesObj.imagesAndVideosThumbnailObj }),
      followsObj,
      
    };
    
    
    // --------------------------------------------------
    //   ヒーローイメージがランダムに表示されるように並び替える
    // --------------------------------------------------
    
    if (Object.keys(headerObj.imagesAndVideosObj).length !== 0) {
      
      const arr = lodashGet(headerObj, ['imagesAndVideosObj', 'arr'], []);
      
      // 並び替え
      for (let i = arr.length - 1; i > 0; i--){
        const r = Math.floor(Math.random() * (i + 1));
        const tmp = arr[i];
        arr[i] = arr[r];
        arr[r] = tmp;
      }
      
      lodashSet(headerObj, ['imagesAndVideosObj', 'arr'], arr);
      
    }
    
    
    
    
    // --------------------------------------------------
    //   returnObj
    // --------------------------------------------------
    
    const returnObj = {
      
      gameCommunitiesObj: docGamesObj.gameCommunitiesObj,
      followsObj,
      headerObj,
      
    };
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/game-communities/model.js - findForGameCommunity
    // `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   urlID: {green ${urlID}}
    // `);
    
    // console.log(`
    //   ----- docGamesArr -----\n
    //   ${util.inspect(docGamesArr, { colors: true, depth: null })}\n
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