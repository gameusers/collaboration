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


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');
const lodashHas = require('lodash/has');
const lodashCloneDeep = require('lodash/cloneDeep');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const SchemaFollows = require('./schema');

const ModelDevelopersPublishers = require('../developers-publishers/model.js');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatImagesAndVideosObj } = require('../images-and-videos/format');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

// const { CustomError } = require('../../@modules/error/custom');
// const { verifyAuthority } = require('../../@modules/authority');






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
    
    return await SchemaFollows.findOne(conditionObj).exec();
    
    
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
    
    return await SchemaFollows.find(conditionObj).exec();
    
    
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
    
    return await SchemaFollows.countDocuments(conditionObj).exec();
    
    
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
    
    return await SchemaFollows.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    
    
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
    
    return await SchemaFollows.insertMany(saveArr);
    
    
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
    
    return await SchemaFollows.deleteMany(conditionObj);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};







/**
 * フォローしているゲームコミュニティの一覧データを取得する / pages/api/v2/ur/[userID]/follow/list.js
 * @param {Object} localeObj - ロケール
 * @param {number} page - ページ
 * @param {number} limit - リミット
 * @param {Array} hardwareIDsArr - DB hardwares hardwareID の入った配列
 * @param {string} keyword - 検索キーワード
 * @return {Object} 取得データ
 */
const findFollowGamesList = async ({

  localeObj,
  loginUsers_id,
  page = 1,
  limit = process.env.NEXT_PUBLIC_FOLLOWERS_LIMIT,

}) => {


  // --------------------------------------------------
  //   Database
  // --------------------------------------------------

  try {


    // --------------------------------------------------
    //   Language & Country
    // --------------------------------------------------

    const language = lodashGet(localeObj, ['language'], '');
    const country = lodashGet(localeObj, ['country'], '');


    // --------------------------------------------------
    //   parseInt
    // --------------------------------------------------

    let intPage = parseInt(page, 10);
    let intLimit = parseInt(limit, 10);




    // ---------------------------------------------
    //   $match（ドキュメントの検索用） & count（総数の検索用）の条件作成
    // ---------------------------------------------

    const conditionObj = {

      followedArr: { $in: [loginUsers_id] },
      gameCommunities_id: { $exists: true },
      gameCommunities_id: { $ne: null },
      gameCommunities_id: { $ne: ''},

    };




    // --------------------------------------------------
    //   Aggregation
    // --------------------------------------------------

    const docArr = await SchemaFollows.aggregate([


      // --------------------------------------------------
      //   Match Condition Array
      // --------------------------------------------------

      {
        $match: conditionObj
      },


      // --------------------------------------------------
      //   game-communities
      // --------------------------------------------------

      {
        $lookup:
          {
            from: 'game-communities',
            let: { letGameCommunities_id: '$gameCommunities_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$letGameCommunities_id']
                  },
                }
              },
              {
                $project: {
                  _id: 0,
                  updatedDate: 1,
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


      // --------------------------------------------------
      //   $sort / $skip / $limit
      // --------------------------------------------------

      { $sort: { 'gameCommunitiesObj.updatedDate': -1 } },
      { $skip: (intPage - 1) * intLimit },
      { $limit: intLimit },


      // --------------------------------------------------
      //   games
      // --------------------------------------------------

      {
        $lookup:
          {
            from: 'games',
            let: { letGameCommunities_id: '$gameCommunities_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $eq: ['$gameCommunities_id', '$$letGameCommunities_id'] }
                    ]
                  },
                }
              },


              // --------------------------------------------------
              //   games / images-and-videos / サムネイル画像
              // --------------------------------------------------

              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { letImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $eq: ['$_id', '$$letImagesAndVideosThumbnail_id']
                          },
                        }
                      },
                      {
                        $project: {
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

              {
                $project: {
                  _id: 0,
                  urlID: 1,
                  name: 1,
                  subtitle: 1,
                  hardwareArr: 1,
                  imagesAndVideosThumbnailObj: 1,
                }
              }
            ],
            as: 'gamesObj'
          }
      },

      {
        $unwind: {
          path: '$gamesObj',
          preserveNullAndEmptyArrays: true,
        }
      },


      // --------------------------------------------------
      //   images-and-videos / サムネイル用
      // --------------------------------------------------

      // {
      //   $lookup:
      //     {
      //       from: 'images-and-videos',
      //       let: { letImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
      //       pipeline: [
      //         {
      //           $match: {
      //             $expr: {
      //               $eq: ['$_id', '$$letImagesAndVideosThumbnail_id']
      //             },
      //           }
      //         },
      //         {
      //           $project: {
      //             createdDate: 0,
      //             updatedDate: 0,
      //             users_id: 0,
      //             __v: 0,
      //           }
      //         }
      //       ],
      //       as: 'imagesAndVideosThumbnailObj'
      //     }
      // },

      // {
      //   $unwind: {
      //     path: '$imagesAndVideosThumbnailObj',
      //     preserveNullAndEmptyArrays: true,
      //   }
      // },


      // --------------------------------------------------
      //   follows
      // --------------------------------------------------

      // {
      //   $lookup:
      //     {
      //       from: 'follows',
      //       let: { letGameCommunities_id: '$gameCommunities_id' },
      //       pipeline: [
      //         {
      //           $match: {
      //             $expr: {
      //               $eq: ['$gameCommunities_id', '$$letGameCommunities_id']
      //             },
      //           }
      //         },
      //         {
      //           $project: {
      //             _id: 0,
      //             followedCount: 1,
      //           }
      //         }
      //       ],
      //       as: 'followsObj'
      //     }
      // },

      // {
      //   $unwind: {
      //     path: '$followsObj',
      //     preserveNullAndEmptyArrays: true,
      //   }
      // },


      // --------------------------------------------------
      //   $project
      // --------------------------------------------------

      {
        $project: {
          gameCommunities_id: 1,
          followedCount: 1,
          // urlID: 1,
          // imagesAndVideosThumbnailObj: 1,
          // name: 1,
          // subtitle: 1,
          // hardwareArr: 1,
          // followsObj: 1,
          gameCommunitiesObj: 1,
          gamesObj: 1,
        }
      },


    ]).exec();




    // --------------------------------------------------
    //   Count
    // --------------------------------------------------

    const listCount = await count({

      conditionObj

    });


    // ---------------------------------------------
    //   - Return Value
    // ---------------------------------------------

    const returnObj = {

      page,
      limit: intLimit,
      count: listCount,
      dataObj: {},

    };

    const ISO8601 = moment().utc().toISOString();
    const daysLimit = parseInt(process.env.NEXT_PUBLIC_COMMUNITY_LIST_UPDATED_DATE_DAYS_LOWER_LIMIT, 10);
    const followersLimit = parseInt(process.env.NEXT_PUBLIC_COMMUNITY_LIST_FOLLOWERS_LOWER_LIMIT, 10);


    // ---------------------------------------------
    //   - Loop
    // ---------------------------------------------

    for (let valueObj of docArr.values()) {


      // console.log(`
      //   ----- valueObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(valueObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);


      // --------------------------------------------------
      //   Deep Copy
      // --------------------------------------------------

      const obj = {};


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const _id = lodashGet(valueObj, ['_id'], '');
      const gameCommunities_id = lodashGet(valueObj, ['gameCommunities_id'], '');
      const updatedDate = lodashGet(valueObj, ['gameCommunitiesObj', 'updatedDate'], '');
      const imagesAndVideosThumbnailObj = lodashGet(valueObj, ['gamesObj', 'imagesAndVideosThumbnailObj'], {});
      const followedCount = lodashGet(valueObj, ['followedCount'], 0);

      obj._id = _id;
      obj.urlID = lodashGet(valueObj, ['gamesObj', 'urlID'], '');
      obj.name = lodashGet(valueObj, ['gamesObj', 'name'], '');
      obj.subtitle = lodashGet(valueObj, ['gamesObj', 'subtitle'], '');

      if (followedCount >= followersLimit) {
        obj.followedCount = followedCount;
      }


      // --------------------------------------------------
      //   Datetime
      // --------------------------------------------------

      let datetimeCurrent = ISO8601;
      const datetimeUpdated = moment(updatedDate);

      if (datetimeUpdated.isAfter(datetimeCurrent)) {
        datetimeCurrent = datetimeUpdated;
      }

      const days = moment().diff(datetimeUpdated, 'days');

      if (days <= daysLimit) {
        obj.datetimeFrom = datetimeUpdated.from(datetimeCurrent);
      }

      // console.log(chalk`
      //   days: {green ${days}}
      // `);




      // --------------------------------------------------
      //   Developers Publishers
      // --------------------------------------------------

      const hardwareArr = lodashGet(valueObj, ['gamesObj', 'hardwareArr'], []);
      let developerPublisherIDsArr = [];


      // ---------------------------------------------
      //   - Loop
      // ---------------------------------------------

      for (let value2Obj of hardwareArr.values()) {

        const developerIDsArr = lodashGet(value2Obj, ['developerIDsArr'], []);
        const publisherIDsArr = lodashGet(value2Obj, ['publisherIDsArr'], []);

        developerPublisherIDsArr = developerPublisherIDsArr.concat(developerIDsArr, publisherIDsArr);

      }


      // ---------------------------------------------
      //   - 配列の重複している値を削除
      // ---------------------------------------------

      developerPublisherIDsArr = Array.from(new Set(developerPublisherIDsArr));

      
      // ---------------------------------------------
      //   - find
      // ---------------------------------------------

      const docDevelopersPublishersArr = await ModelDevelopersPublishers.find({

        conditionObj: {
          language,
          country,
          developerPublisherID: { $in: developerPublisherIDsArr },
        }

      });


      // ---------------------------------------------
      //   - 名前だけ配列に入れる
      // ---------------------------------------------

      const developersPublishersArr = [];

      for (let value of developerPublisherIDsArr.values()) {
        
        const resultObj = docDevelopersPublishersArr.find((value2Obj) => {
          return value2Obj.developerPublisherID === value;
        });

        if (resultObj) {
          developersPublishersArr.push(resultObj.name);
        }

      }

      obj.developersPublishers = developersPublishersArr.join(', ');


      // console.log(`
      //   ----- developerPublisherIDsArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(developerPublisherIDsArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);

      // console.log(`
      //   ----- docDevelopersPublishersArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(docDevelopersPublishersArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);

      // console.log(`
      //   ----- developersPublishersArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(developersPublishersArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);


      // --------------------------------------------------
      //   画像と動画の処理
      // --------------------------------------------------

      const formattedThumbnailObj = formatImagesAndVideosObj({ localeObj, obj: imagesAndVideosThumbnailObj });

      if (Object.keys(formattedThumbnailObj).length !== 0) {

        obj.src = lodashGet(formattedThumbnailObj, ['arr', 0, 'src'], '/img/common/thumbnail/none-game.jpg');
        obj.srcSet = lodashGet(formattedThumbnailObj, ['arr', 0, 'srcSet'], '');

      }


      // --------------------------------------------------
      //   Set Data
      // --------------------------------------------------

      lodashSet(returnObj, ['dataObj', gameCommunities_id], obj);


      // --------------------------------------------------
      //   Pages Array
      // --------------------------------------------------

      const pagesArr = lodashGet(returnObj, [`page${page}Obj`, 'arr'], []);
      pagesArr.push(gameCommunities_id);

      returnObj[`page${page}Obj`] = {

        loadedDate: ISO8601,
        arr: pagesArr,

      };


    }




    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------

    // console.log(`
    //   ----------------------------------------\n
    //   app/@database/follows/model.js - findFollowGamesList
    // `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id} / ${typeof loginUsers_id}}
    //   page: {green ${page} / ${typeof page}}
    //   limit: {green ${limit} / ${typeof limit}}
    // `);

    // console.log(`
    //   ----- hardwareIDsArr -----\n
    //   ${util.inspect(hardwareIDsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- conditionObj -----\n
    //   ${util.inspect(conditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
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
 * Transaction 挿入 / 更新する
 * フォローを同時に更新する
 * 
 * @param {Object} followsCondition1Obj - DB follows 検索条件
 * @param {Object} followsSave1Obj - DB follows 保存データ
 * @param {Object} followsCondition2Obj - DB follows 検索条件
 * @param {Object} followsSave2Obj - DB follows 保存データ
 * @return {Object} 
 */
const transactionForUpsert = async ({
  
  followsCondition1Obj,
  followsSave1Obj,
  followsCondition2Obj,
  followsSave2Obj,
  
}) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Transaction / Session
  // --------------------------------------------------
  
  const session = await SchemaFollows.startSession();
  
  
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Transaction / Start
    // --------------------------------------------------
    
    await session.startTransaction();
    
    
    
    
    // --------------------------------------------------
    //   Follows
    // --------------------------------------------------
    
    await SchemaFollows.updateOne(followsCondition1Obj, followsSave1Obj, { session, upsert: true });
    await SchemaFollows.updateOne(followsCondition2Obj, followsSave2Obj, { session, upsert: true });
    
    
    
    
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
    //   ----------------------------------------\n
    //   /app/@database/follows/model.js - transactionForUpsert
    // `);
    
    // console.log(`
    //   ----- followsCondition1Obj -----\n
    //   ${util.inspect(followsCondition1Obj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- followsSave1Obj -----\n
    //   ${util.inspect(followsSave1Obj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- followsCondition2Obj -----\n
    //   ${util.inspect(followsCondition2Obj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- followsSave2Obj -----\n
    //   ${util.inspect(followsSave2Obj, { colors: true, depth: null })}\n
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
  
  findFollowGamesList,
  transactionForUpsert,
  
};