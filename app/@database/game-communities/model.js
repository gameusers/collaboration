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
const lodashHas = require('lodash/has');
const lodashCloneDeep = require('lodash/cloneDeep');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const SchemaGameCommunities = require('./schema.js');
const SchemaGames = require('../games/schema.js');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatImagesAndVideosObj } = require('../images-and-videos/format.js');
const { formatFollowsObj } = require('../follows/format.js');






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
    
    return await SchemaGameCommunities.findOne(conditionObj).exec();
    
    
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
    
    return await SchemaGameCommunities.find(conditionObj).exec();
    
    
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
    
    return await SchemaGameCommunities.countDocuments(conditionObj).exec();
    
    
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
    
    return await SchemaGameCommunities.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    
    
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
    
    return await SchemaGameCommunities.insertMany(saveArr);
    
    
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
    
    return await SchemaGameCommunities.deleteMany(conditionObj);
    
    
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
        $match: {
          
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
                  createdDate: 0,
                  updatedDate: 0,
                  __v: 0,
                  // _id: 1,
                  // forumObj: 1,
                  // updatedDateObj: 1,
                  // anonymity: 1,
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
      // followedCount: lodashGet(docGamesObj, ['followsObj', 'followedCount'], 0),
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
    //   不要な項目を削除する
    // --------------------------------------------------
    
    // delete docGamesObj.followsObj;
    
    
    
    
    // --------------------------------------------------
    //   returnObj
    // --------------------------------------------------
    
    const returnObj = {
      
      gameCommunitiesObj: docGamesObj.gameCommunitiesObj,
      // followsObj,
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
    //   ----- docGamesObj -----\n
    //   ${util.inspect(docGamesObj, { colors: true, depth: null })}\n
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
 * データを取得する / フォーラム＆募集の更新日時取得用
 * @param {string} gameCommunities_id - DB game-communities _id / ID
 * @return {Object} 取得データ
 */
const findForGameCommunityByGameCommunities_id = async ({ gameCommunities_id }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Match Condition Array
    // --------------------------------------------------
    
    const matchConditionArr = [
      {
        $match: {
          
          _id: gameCommunities_id,
          
        }
      },
    ];
    
    
    // --------------------------------------------------
    //   Aggregation - game-communities
    // --------------------------------------------------
    
    const docGameCommunitiesArr = await SchemaGameCommunities.aggregate([
      
      
      // --------------------------------------------------
      //   Match Condition Array
      // --------------------------------------------------
      
      ...matchConditionArr,
      
      
      // --------------------------------------------------
      //   $project
      // --------------------------------------------------
      
      { $project:
        {
          createdDate: 0,
          updatedDate: 0,
          __v: 0,
        }
      },
      
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   returnObj
    // --------------------------------------------------
    
    const returnObj = lodashGet(docGameCommunitiesArr, [0], {});
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/game-communities/model.js - findForGameCommunityByGameCommunities_id
    // `);
    
    // console.log(chalk`
    //   gameCommunities_id: {green ${gameCommunities_id}}
    // `);
    
    // console.log(`
    //   ----- docGameCommunitiesArr -----\n
    //   ${util.inspect(docGameCommunitiesArr, { colors: true, depth: null })}\n
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
  findForGameCommunityByGameCommunities_id,
  
};