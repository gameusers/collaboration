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
const SchemaForumThreads = require('../forum-threads/schema.js');
const SchemaForumComments = require('../forum-comments/schema.js');
const SchemaImagesAndVideos = require('../images-and-videos/schema.js');
const SchemaGameCommunities = require('../game-communities/schema.js');
const SchemaUserCommunities = require('../user-communities/schema.js');

const ModelForumThreads = require('../forum-threads/model.js');
const ModelRecruitmentThreads = require('../recruitment-threads/model.js');
const ModelGameCommunities = require('../game-communities/model.js');
const ModelUserCommunities = require('../user-communities/model.js');

const ModelDevelopersPublishers = require('../developers-publishers/model.js');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatImagesAndVideosObj, formatImagesAndVideosArr } = require('../images-and-videos/format');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

// const { CustomError } = require('../../@modules/error/custom');
// const { verifyAuthority } = require('../../@modules/authority');






// --------------------------------------------------
//   Common
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






// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * フォローしているゲームコミュニティの一覧データを取得する / pages/api/v2/ur/[userID]/follow/list.js
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {number} page - ページ
 * @param {number} limit - リミット
 * @return {Object} 取得データ
 */
const findFollowListGc = async ({

  localeObj,
  loginUsers_id,
  page = 1,
  limit = process.env.NEXT_PUBLIC_FOLLOW_LIST_LIMIT,

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
      userCommunities_id: '',
      users_id: '',

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
          // preserveNullAndEmptyArrays: true,
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
      //   $project
      // --------------------------------------------------

      {
        $project: {
          gameCommunities_id: 1,
          followedCount: 1,
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

    for (let value1Obj of docArr.values()) {


      // console.log(`
      //   ----- value1Obj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(value1Obj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);


      // --------------------------------------------------
      //   Deep Copy
      // --------------------------------------------------

      const obj = {};


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const gameCommunities_id = lodashGet(value1Obj, ['gameCommunities_id'], '');
      const updatedDate = lodashGet(value1Obj, ['gameCommunitiesObj', 'updatedDate'], '');
      const imagesAndVideosThumbnailObj = lodashGet(value1Obj, ['gamesObj', 'imagesAndVideosThumbnailObj'], {});
      const followedCount = lodashGet(value1Obj, ['followedCount'], 0);

      obj.urlID = lodashGet(value1Obj, ['gamesObj', 'urlID'], '');
      obj.name = lodashGet(value1Obj, ['gamesObj', 'name'], '');
      obj.subtitle = lodashGet(value1Obj, ['gamesObj', 'subtitle'], '');

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

      const hardwareArr = lodashGet(value1Obj, ['gamesObj', 'hardwareArr'], []);
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
    //   app/@database/follows/model.js - findFollowListGc
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
 * 参加しているユーザーコミュニティ一覧のデータを取得する / 
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {number} page - ページ
 * @param {number} limit - リミット
 * @return {Object} 取得データ
 */
const findFollowListUc = async ({

  localeObj,
  loginUsers_id,
  page = 1,
  limit = process.env.NEXT_PUBLIC_COMMUNITY_LIST_LIMIT,

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




    // --------------------------------------------------
    //   $match（ドキュメントの検索用） & count（総数の検索用）の条件作成
    // --------------------------------------------------

    const conditionObj = {
      
      followedArr: { $in: [loginUsers_id] },
      gameCommunities_id: '',
      userCommunities_id: { $exists: true },
      users_id: '',
      // userCommunities_id: { $ne: null },
      // userCommunities_id: { $ne: ''},

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
      //   user-communities
      // --------------------------------------------------

      {
        $lookup:
          {
            from: 'user-communities',
            let: { letUserCommunities_id: '$userCommunities_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$letUserCommunities_id']
                  },
                }
              },


              // --------------------------------------------------
              //   games - 関連するゲーム
              // --------------------------------------------------

              {
                $lookup:
                  {
                    from: 'games',
                    let: { letGameCommunities_idsArr: '$gameCommunities_idsArr' },
                    pipeline: [

                      {
                        $match: {
                          $expr: {
                            $and: [
                              { $eq: ['$language', language] },
                              { $eq: ['$country', country] },
                              { $in: ['$gameCommunities_id', '$$letGameCommunities_idsArr'] },
                            ]
                          },
                        }
                      },


                      // --------------------------------------------------
                      //   games / images-and-videos / サムネイル用
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
                          gameCommunities_id: 1,
                          urlID: 1,
                          name: 1,
                          imagesAndVideosThumbnailObj: 1,
                        }
                      },
                    ],
                    as: 'gamesArr'
                  }
              },


              // --------------------------------------------------
              //   images-and-videos / サムネイル用
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
                  _id: 1,
                  createdDate: 1,
                  updatedDate: 1,
                  userCommunityID: 1,
                  users_id: 1,
                  localesArr: 1,
                  communityType: 1,
                  gameCommunities_idsArr: 1,
                  gamesArr: 1,
                  imagesAndVideosThumbnailObj: 1,

                }
              }
            ],
            as: 'userCommunitiesObj'
          }
      },

      {
        $unwind: {
          path: '$userCommunitiesObj',
          preserveNullAndEmptyArrays: true,
        }
      },


      // --------------------------------------------------
      //   $sort / $skip / $limit
      // --------------------------------------------------

      // { $sort: { 'userCommunitiesObj.updatedDate': -1 } },
      // { $skip: (intPage - 1) * intLimit },
      // { $limit: intLimit },


      // --------------------------------------------------
      //   $project
      // --------------------------------------------------

      {
        $project: {
          userCommunitiesObj: 1,
          followedCount: 1,
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
    //   Return Value
    // ---------------------------------------------

    const returnObj = {

      page,
      limit: intLimit,
      count: listCount,
      dataObj: {},

    };

    const ISO8601 = moment().utc().toISOString();




    // --------------------------------------------------
    //   Loop
    // --------------------------------------------------

    for (let value1Obj of docArr.values()) {


      // --------------------------------------------------
      //   object
      // --------------------------------------------------

      const obj = {};


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const userCommunities_id = lodashGet(value1Obj, ['userCommunitiesObj', '_id'], '');
      const users_id = lodashGet(value1Obj, ['userCommunitiesObj', 'users_id'], '');

      obj.userCommunityID = lodashGet(value1Obj, ['userCommunitiesObj', 'userCommunityID'], '');
      obj.communityType = lodashGet(value1Obj, ['userCommunitiesObj', 'communityType'], 'open');
      obj.approval = lodashGet(value1Obj, ['approval'], false);
      obj.followedCount = lodashGet(value1Obj, ['followedCount'], 0);
      obj.owner = loginUsers_id === users_id ? true : false;


      // --------------------------------------------------
      //   createdDate
      // --------------------------------------------------

      const createdDate = lodashGet(value1Obj, ['userCommunitiesObj', 'createdDate'], '');
      obj.createdDate = moment(createdDate).utc().format('YYYY/MM/DD');


      // --------------------------------------------------
      //   画像と動画の処理
      // --------------------------------------------------

      const imagesAndVideosThumbnailObj = lodashGet(value1Obj, ['userCommunitiesObj', 'imagesAndVideosThumbnailObj'], {});

      if (Object.keys(imagesAndVideosThumbnailObj).length !== 0) {

        const formattedThumbnailObj = formatImagesAndVideosObj({ localeObj, obj: imagesAndVideosThumbnailObj });
        obj.src = lodashGet(formattedThumbnailObj, ['arr', 0, 'src'], '/img/common/thumbnail/none-game.jpg');
        obj.srcSet = lodashGet(formattedThumbnailObj, ['arr', 0, 'srcSet'], '');

      }


      // --------------------------------------------------
      //   関連するゲーム
      // --------------------------------------------------

      const gamesArr = lodashGet(value1Obj, ['userCommunitiesObj', 'gamesArr'], []);

      if (gamesArr.length > 0) {


        // --------------------------------------------------
        //   gamesArr - 元の配列の順番通りに並べなおす
        // --------------------------------------------------

        const sortedGamesArr = [];
        const gameCommunities_idsArr = lodashGet(value1Obj, ['userCommunitiesObj', 'gameCommunities_idsArr'], []);

        for (let gameCommunities_id of gameCommunities_idsArr) {

          const index = gamesArr.findIndex((value2Obj) => {
            return value2Obj.gameCommunities_id === gameCommunities_id;
          });

          if (index !== -1) {
            sortedGamesArr.push(gamesArr[index]);
          }

        }


        // --------------------------------------------------
        //   画像の処理
        // --------------------------------------------------

        obj.gamesArr = formatImagesAndVideosArr({ arr: sortedGamesArr });


      }


      // console.log(`
      //   ----- gameCommunities_idsArr -----\n
      //   ${util.inspect(gameCommunities_idsArr, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);

      // console.log(`
      //   ----- gamesArr -----\n
      //   ${util.inspect(gamesArr, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);

      // console.log(`
      //   ----- sortedGamesArr -----\n
      //   ${util.inspect(sortedGamesArr, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);


      // --------------------------------------------------
      //   Locale / name & description
      // --------------------------------------------------

      const localesArr = lodashGet(value1Obj, ['userCommunitiesObj', 'localesArr'], []);

      const filteredArr = localesArr.filter((filterObj) => {
        return filterObj.language === localeObj.language;
      });


      if (lodashHas(filteredArr, [0])) {

        obj.name = lodashGet(filteredArr, [0, 'name'], '');;
        obj.descriptionShort = lodashGet(filteredArr, [0, 'descriptionShort'], '');

      } else {

        obj.name = lodashGet(localesArr, [0, 'name'], '');
        obj.descriptionShort = lodashGet(localesArr, [0, 'descriptionShort'], '');

      }


      // --------------------------------------------------
      //   Set Data
      // --------------------------------------------------

      lodashSet(returnObj, ['dataObj', userCommunities_id], obj);


      // --------------------------------------------------
      //   Pages Array
      // --------------------------------------------------

      const pagesArr = lodashGet(returnObj, [`page${page}Obj`, 'arr'], []);
      pagesArr.push(userCommunities_id);

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
    //   app/@database/follows/model.js - findFollowListUc
    // `);

    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   userCommunityID: {green ${userCommunityID}}
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
 * 
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {number} page - ページ
 * @param {number} limit - リミット
 * @return {Object} 取得データ
 */
const findFollowContents = async ({

  req,
  localeObj,
  loginUsers_id,
  users_id,
  period = process.env.NEXT_PUBLIC_FOLLOW_CONTENTS_PERIOD,
  page = 1,
  limit = process.env.NEXT_PUBLIC_FOLLOW_CONTENTS_LIMIT,

}) => {


  // --------------------------------------------------
  //   Database
  // --------------------------------------------------

  try {


    // --------------------------------------------------
    //   parseInt
    // --------------------------------------------------
    
    const intPeriod = parseInt(period, 10);
    const intPage = parseInt(page, 10);
    const intLimit = parseInt(limit, 10);




    // --------------------------------------------------
    //   フォローしているゲームの gameCommunities_id を取得する
    // --------------------------------------------------
    
    // const docFollowsArr = await find({

    //   conditionObj: {

    //     followedArr: { $in: [users_id] },
    //     gameCommunities_id: { $exists: true },
    //     userCommunities_id: '',
    //     users_id: '',

    //   }

    // });


    // let gameCommunities_idsArr = [];

    // for (let valueObj of docFollowsArr.values()) {
    //   gameCommunities_idsArr.push(valueObj.gameCommunities_id);
    // }




    // --------------------------------------------------
    //   _id を取得する
    // --------------------------------------------------
    
    const docFollowsArr = await find({

      conditionObj: {
        followedArr: { $in: [users_id] },
      }

    });


    let gameCommunities_idsArr = [];
    let userCommunities_idsArr = [];
    let users_idsArr = [];

    for (let valueObj of docFollowsArr.values()) {

      if (valueObj.gameCommunities_id) {

        gameCommunities_idsArr.push(valueObj.gameCommunities_id);

      } else if (valueObj.userCommunities_id) {

        userCommunities_idsArr.push(valueObj.userCommunities_id);
        
      } else if (valueObj.users_id) {

        users_idsArr.push(valueObj.users_id);
        
      }

    }




    // --------------------------------------------------
    //   ログインしているユーザーが同じクローズドコミュニティに入っていない場合は
    //   コンテンツを表示する権限がないため userCommunities_idsArr 配列から userCommunities_id を削除する
    // --------------------------------------------------

    if (userCommunities_idsArr.length > 0) {


      // --------------------------------------------------
      //   Aggregation
      // --------------------------------------------------

      const docUserCommunitiesArr = await SchemaUserCommunities.aggregate([


        // --------------------------------------------------
        //   Match Condition Array
        // --------------------------------------------------
  
        {
          $match: {
            _id: { $in: userCommunities_idsArr },
            communityType: 'closed',
          }
        },


        // --------------------------------------------------
        //   follows
        // --------------------------------------------------
  
        {
          $lookup:
            {
              from: 'follows',
              let: { letUserCommunities_id: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ['$userCommunities_id', '$$letUserCommunities_id'] },
                      ]
                    },
                  }
                },
  
                {
                  $project: {
                    _id: 0,
                    followedArr: 1,
                  }
                }
              ],
              as: 'followsObj'
            }
        },
  
        {
          $unwind: {
            path: '$followsObj',
          }
        },
  
  
        // --------------------------------------------------
        //   $project
        // --------------------------------------------------
  
        {
          $project: {
            _id: 1,
            followsObj: 1,
          }
        },


      ]).exec();




      // --------------------------------------------------
      //   ログインしていない、または同じクローズドコミュニティに参加していない場合、userCommunities_id を削除
      // --------------------------------------------------

      for (let valueObj of docUserCommunitiesArr.values()) {

        const followedArr = lodashGet(valueObj, ['followsObj', 'followedArr'], []);

        if (!loginUsers_id || !followedArr.includes(loginUsers_id)) {

          const index = userCommunities_idsArr.indexOf(valueObj._id);

          if (index !== 1) {
            userCommunities_idsArr.splice(index, 1);
          }
          
        }
        
      }


    }

    


    // console.log(`
    //   ----- gameCommunities_idsArr -----\n
    //   ${util.inspect(gameCommunities_idsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- userCommunities_idsArr -----\n
    //   ${util.inspect(userCommunities_idsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- users_idsArr -----\n
    //   ${util.inspect(users_idsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);




    // --------------------------------------------------
    //   returnObj
    // --------------------------------------------------

    const returnObj = {

      forumGcObj: {},
      forumUcObj: {},
      gameCommunitiesObj: {},
      userCommunitiesObj: {},

    };




    // --------------------------------------------------
    //   コンテンツ取得
    // --------------------------------------------------

    let forumGcObj = {};
    let forumUcObj = {};
    let recruitmentObj = {};


    // ---------------------------------------------
    //   ゲームコミュニティ
    // ---------------------------------------------

    if (gameCommunities_idsArr.length > 0) {


      // ---------------------------------------------
      //   - フォーラム
      // ---------------------------------------------

      forumGcObj = await ModelForumThreads.findForumForFollowContents({

        req,
        localeObj,
        loginUsers_id,
        gameCommunities_idsArr,
        period,
        threadPage: page,
        threadLimit: limit,
  
      });


      // ---------------------------------------------
      //   - 募集
      // ---------------------------------------------

      recruitmentObj = await ModelRecruitmentThreads.findRecruitments({

        req,
        localeObj,
        loginUsers_id,
        gameCommunities_idsArr,
        period,
        threadPage: page,
        threadLimit: limit,
  
      });


      // ---------------------------------------------
      //   - コミュニティ一覧取得用
      // ---------------------------------------------

      gameCommunities_idsArr = [];

      const forumDataGcObj = lodashGet(returnObj, ['forumGcObj', 'forumThreadsObj', 'dataObj'], {});

      for (let valueObj of Object.values(forumDataGcObj)) {
        gameCommunities_idsArr.push(valueObj.gameCommunities_id);
      }


    }


    // ---------------------------------------------
    //   ユーザーコミュニティ
    // ---------------------------------------------

    if (userCommunities_idsArr.length > 0) {


      // ---------------------------------------------
      //   - フォーラム
      // ---------------------------------------------

      forumUcObj = await ModelForumThreads.findForumForFollowContents({

        req,
        localeObj,
        loginUsers_id,
        userCommunities_idsArr,
        period,
        threadPage: page,
        threadLimit: limit,
  
      });


      // ---------------------------------------------
      //   - コミュニティ一覧取得用
      // ---------------------------------------------

      userCommunities_idsArr = [];

      const forumDataUcObj = lodashGet(returnObj, ['forumUcObj', 'forumThreadsObj', 'dataObj'], {});

      for (let valueObj of Object.values(forumDataUcObj)) {
        userCommunities_idsArr.push(valueObj.userCommunities_id);
      }

      // console.log(`
      //   ----- forumDataUcObj -----\n
      //   ${util.inspect(forumDataUcObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      

    }





    // --------------------------------------------------
    //   並び替え＆データの統合
    // --------------------------------------------------

    /**
     * 日付で並び替える
     * @param {Array} arr - 配列
     * @return {Object} 並び替えたデータ
     */
    // const sortArray = (arr) => {

    //   const sortedArr = arr.sort((a, b) => {

    //     const date1 = new Date(a.createdDate);
    //     const date2 = new Date(b.createdDate);

    //     return (date1 < date2) ? 1 : -1;

    //   });

    //   return sortedArr;

    // };


    // const forumDataGcObj = lodashGet(forumGcObj, ['forumThreadsObj', 'dataObj'], {});
    // const forumDataUcObj = lodashGet(forumUcObj, ['forumThreadsObj', 'dataObj'], {});
    
    // const forumObj = Object.assign(forumDataGcObj, forumDataUcObj);

    // console.log(`
    //   ----- forumDataGcObj -----\n
    //   ${util.inspect(forumDataGcObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- forumDataUcObj -----\n
    //   ${util.inspect(forumDataUcObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- forumObj -----\n
    //   ${util.inspect(forumObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);




    




    // --------------------------------------------------
    //   コミュニティ一覧取得
    // --------------------------------------------------

    // ---------------------------------------------
    //   ゲームコミュニティ
    // ---------------------------------------------

    if (gameCommunities_idsArr.length > 0) {


      // ---------------------------------------------
      //   - 配列の重複している値を削除
      // ---------------------------------------------

      gameCommunities_idsArr = Array.from(new Set(gameCommunities_idsArr));


      // ---------------------------------------------
      //   - データ取得
      // ---------------------------------------------

      returnObj.gameCommunitiesObj = await ModelGameCommunities.findGamesListCommon({

        localeObj,
        page: intPage,
        limit: intLimit,
        gameCommunities_idsArr,

      });


    }


    // ---------------------------------------------
    //   ユーザーコミュニティ
    // ---------------------------------------------

    if (userCommunities_idsArr.length > 0) {


      // ---------------------------------------------
      //   - 配列の重複している値を削除
      // ---------------------------------------------

      userCommunities_idsArr = Array.from(new Set(userCommunities_idsArr));


      // console.log(`
      //   ----- userCommunities_idsArr2 -----\n
      //   ${util.inspect(userCommunities_idsArr, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);


      // ---------------------------------------------
      //   - データ取得
      // ---------------------------------------------

      returnObj.userCommunitiesObj = await ModelUserCommunities.findUserCommunitiesListCommon({

        localeObj,
        page: intPage,
        limit: intLimit,
        userCommunities_idsArr,

      });


    }


    // console.log(`
    //   ----- forumDataGcObj -----\n
    //   ${util.inspect(forumDataGcObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- returnObj.forumGcObj -----\n
    //   ${util.inspect(returnObj.forumGcObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- returnObj.forumGcObj.forumThreadsObj -----\n
    //   ${util.inspect(returnObj.forumGcObj.forumThreadsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- returnObj.forumUcObj.forumThreadsObj -----\n
    //   ${util.inspect(returnObj.forumUcObj.forumThreadsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- forumUcObj.forumCommentsObj -----\n
    //   ${util.inspect(forumUcObj.forumCommentsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- recruitmentObj -----\n
    //   ${util.inspect(recruitmentObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    

    // console.log(`
    //   ----- returnObj.gameCommunitiesObj -----\n
    //   ${util.inspect(returnObj.gameCommunitiesObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- returnObj.userCommunitiesObj -----\n
    //   ${util.inspect(returnObj.userCommunitiesObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    



    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------

    // console.log(`
    //   ----------------------------------------\n
    //   app/@database/follows/model.js - findFollowContents
    // `);

    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id} / ${typeof loginUsers_id}}
    //   users_id: {green ${users_id} / ${typeof users_id}}
    //   period: {green ${period} / ${typeof period}}
    //   page: {green ${page} / ${typeof page}}
    //   limit: {green ${limit} / ${typeof limit}}
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
 * フォローしているゲームコミュニティのフォーラムを取得する / 
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {number} page - ページ
 * @param {number} limit - リミット
 * @return {Object} 取得データ
 */
const findFollowForumGc = async ({

  localeObj,
  loginUsers_id,
  page = 1,
  limit = process.env.NEXT_PUBLIC_FOLLOW_LIST_LIMIT,

}) => {


  // --------------------------------------------------
  //   Database
  // --------------------------------------------------

  try {


    // --------------------------------------------------
    //   Language & Country
    // --------------------------------------------------
    
    const docFollowsArr = await find({

      conditionObj: {

      }

    });




    // --------------------------------------------------
    //   Aggregation
    // --------------------------------------------------

    const resultArr = await SchemaForumThreads.aggregate([


      // --------------------------------------------------
      //   Match Condition Array
      // --------------------------------------------------

      ...matchConditionArr,


      // --------------------------------------------------
      //   $sort / $skip / $limit
      // --------------------------------------------------

      { $sort: { updatedDate: -1 } },
      { $skip: (threadPage - 1) * intThreadLimit },
      { $limit: intThreadLimit },


      // --------------------------------------------------
      //   images-and-videos
      // --------------------------------------------------

      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { letImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$letImagesAndVideos_id']
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
      //   $project
      // --------------------------------------------------

      {
        $project: {
          imagesAndVideos_id: 0,
          acceptLanguage: 0,
          __v: 0,
        }
      },


    ]).exec();




    // --------------------------------------------------
    //   Language & Country
    // --------------------------------------------------

    // const language = lodashGet(localeObj, ['language'], '');
    // const country = lodashGet(localeObj, ['country'], '');


    // // --------------------------------------------------
    // //   parseInt
    // // --------------------------------------------------

    // let intPage = parseInt(page, 10);
    // let intLimit = parseInt(limit, 10);




    // // ---------------------------------------------
    // //   $match（ドキュメントの検索用） & count（総数の検索用）の条件作成
    // // ---------------------------------------------

    // const conditionObj = {

    //   followedArr: { $in: [loginUsers_id] },
    //   gameCommunities_id: { $exists: true },
    //   userCommunities_id: '',
    //   users_id: '',

    // };




    // // --------------------------------------------------
    // //   Aggregation
    // // --------------------------------------------------

    // const docArr = await SchemaFollows.aggregate([


    //   // --------------------------------------------------
    //   //   Match Condition Array
    //   // --------------------------------------------------

    //   {
    //     $match: conditionObj
    //   },


    //   // --------------------------------------------------
    //   //   game-communities
    //   // --------------------------------------------------

    //   {
    //     $lookup:
    //       {
    //         from: 'game-communities',
    //         let: { letGameCommunities_id: '$gameCommunities_id' },
    //         pipeline: [
    //           {
    //             $match: {
    //               $expr: {
    //                 $eq: ['$_id', '$$letGameCommunities_id']
    //               },
    //             }
    //           },
    //           {
    //             $project: {
    //               _id: 0,
    //               updatedDate: 1,
    //             }
    //           }
    //         ],
    //         as: 'gameCommunitiesObj'
    //       }
    //   },

    //   {
    //     $unwind: {
    //       path: '$gameCommunitiesObj',
    //       // preserveNullAndEmptyArrays: true,
    //     }
    //   },


    //   // --------------------------------------------------
    //   //   $sort / $skip / $limit
    //   // --------------------------------------------------

    //   { $sort: { 'gameCommunitiesObj.updatedDate': -1 } },
    //   { $skip: (intPage - 1) * intLimit },
    //   { $limit: intLimit },


    //   // --------------------------------------------------
    //   //   games
    //   // --------------------------------------------------

    //   {
    //     $lookup:
    //       {
    //         from: 'games',
    //         let: { letGameCommunities_id: '$gameCommunities_id' },
    //         pipeline: [
    //           {
    //             $match: {
    //               $expr: {
    //                 $and: [
    //                   { $eq: ['$language', language] },
    //                   { $eq: ['$country', country] },
    //                   { $eq: ['$gameCommunities_id', '$$letGameCommunities_id'] }
    //                 ]
    //               },
    //             }
    //           },


    //           // --------------------------------------------------
    //           //   games / images-and-videos / サムネイル画像
    //           // --------------------------------------------------

    //           {
    //             $lookup:
    //               {
    //                 from: 'images-and-videos',
    //                 let: { letImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
    //                 pipeline: [
    //                   {
    //                     $match: {
    //                       $expr: {
    //                         $eq: ['$_id', '$$letImagesAndVideosThumbnail_id']
    //                       },
    //                     }
    //                   },
    //                   {
    //                     $project: {
    //                       createdDate: 0,
    //                       updatedDate: 0,
    //                       users_id: 0,
    //                       __v: 0,
    //                     }
    //                   }
    //                 ],
    //                 as: 'imagesAndVideosThumbnailObj'
    //               }
    //           },

    //           {
    //             $unwind: {
    //               path: '$imagesAndVideosThumbnailObj',
    //               preserveNullAndEmptyArrays: true,
    //             }
    //           },

    //           {
    //             $project: {
    //               _id: 0,
    //               urlID: 1,
    //               name: 1,
    //               subtitle: 1,
    //               hardwareArr: 1,
    //               imagesAndVideosThumbnailObj: 1,
    //             }
    //           }
    //         ],
    //         as: 'gamesObj'
    //       }
    //   },

    //   {
    //     $unwind: {
    //       path: '$gamesObj',
    //       preserveNullAndEmptyArrays: true,
    //     }
    //   },


    //   // --------------------------------------------------
    //   //   $project
    //   // --------------------------------------------------

    //   {
    //     $project: {
    //       gameCommunities_id: 1,
    //       followedCount: 1,
    //       gameCommunitiesObj: 1,
    //       gamesObj: 1,
    //     }
    //   },


    // ]).exec();




    // --------------------------------------------------
    //   Count
    // --------------------------------------------------

    // const listCount = await count({

    //   conditionObj

    // });


    // // ---------------------------------------------
    // //   - Return Value
    // // ---------------------------------------------

    // const returnObj = {

    //   page,
    //   limit: intLimit,
    //   count: listCount,
    //   dataObj: {},

    // };

    // const ISO8601 = moment().utc().toISOString();
    // const daysLimit = parseInt(process.env.NEXT_PUBLIC_COMMUNITY_LIST_UPDATED_DATE_DAYS_LOWER_LIMIT, 10);
    // const followersLimit = parseInt(process.env.NEXT_PUBLIC_COMMUNITY_LIST_FOLLOWERS_LOWER_LIMIT, 10);


    // // ---------------------------------------------
    // //   - Loop
    // // ---------------------------------------------

    // for (let value1Obj of docArr.values()) {


    //   // console.log(`
    //   //   ----- value1Obj -----\n
    //   //   ${util.inspect(JSON.parse(JSON.stringify(value1Obj)), { colors: true, depth: null })}\n
    //   //   --------------------\n
    //   // `);


    //   // --------------------------------------------------
    //   //   Deep Copy
    //   // --------------------------------------------------

    //   const obj = {};


    //   // --------------------------------------------------
    //   //   Data
    //   // --------------------------------------------------

    //   const gameCommunities_id = lodashGet(value1Obj, ['gameCommunities_id'], '');
    //   const updatedDate = lodashGet(value1Obj, ['gameCommunitiesObj', 'updatedDate'], '');
    //   const imagesAndVideosThumbnailObj = lodashGet(value1Obj, ['gamesObj', 'imagesAndVideosThumbnailObj'], {});
    //   const followedCount = lodashGet(value1Obj, ['followedCount'], 0);

    //   obj.urlID = lodashGet(value1Obj, ['gamesObj', 'urlID'], '');
    //   obj.name = lodashGet(value1Obj, ['gamesObj', 'name'], '');
    //   obj.subtitle = lodashGet(value1Obj, ['gamesObj', 'subtitle'], '');

    //   if (followedCount >= followersLimit) {
    //     obj.followedCount = followedCount;
    //   }


    //   // --------------------------------------------------
    //   //   Datetime
    //   // --------------------------------------------------

    //   let datetimeCurrent = ISO8601;
    //   const datetimeUpdated = moment(updatedDate);

    //   if (datetimeUpdated.isAfter(datetimeCurrent)) {
    //     datetimeCurrent = datetimeUpdated;
    //   }

    //   const days = moment().diff(datetimeUpdated, 'days');

    //   if (days <= daysLimit) {
    //     obj.datetimeFrom = datetimeUpdated.from(datetimeCurrent);
    //   }

    //   // console.log(chalk`
    //   //   days: {green ${days}}
    //   // `);




    //   // --------------------------------------------------
    //   //   Developers Publishers
    //   // --------------------------------------------------

    //   const hardwareArr = lodashGet(value1Obj, ['gamesObj', 'hardwareArr'], []);
    //   let developerPublisherIDsArr = [];


    //   // ---------------------------------------------
    //   //   - Loop
    //   // ---------------------------------------------

    //   for (let value2Obj of hardwareArr.values()) {

    //     const developerIDsArr = lodashGet(value2Obj, ['developerIDsArr'], []);
    //     const publisherIDsArr = lodashGet(value2Obj, ['publisherIDsArr'], []);

    //     developerPublisherIDsArr = developerPublisherIDsArr.concat(developerIDsArr, publisherIDsArr);

    //   }


    //   // ---------------------------------------------
    //   //   - 配列の重複している値を削除
    //   // ---------------------------------------------

    //   developerPublisherIDsArr = Array.from(new Set(developerPublisherIDsArr));

      
    //   // ---------------------------------------------
    //   //   - find
    //   // ---------------------------------------------

    //   const docDevelopersPublishersArr = await ModelDevelopersPublishers.find({

    //     conditionObj: {
    //       language,
    //       country,
    //       developerPublisherID: { $in: developerPublisherIDsArr },
    //     }

    //   });


    //   // ---------------------------------------------
    //   //   - 名前だけ配列に入れる
    //   // ---------------------------------------------

    //   const developersPublishersArr = [];

    //   for (let value of developerPublisherIDsArr.values()) {
        
    //     const resultObj = docDevelopersPublishersArr.find((value2Obj) => {
    //       return value2Obj.developerPublisherID === value;
    //     });

    //     if (resultObj) {
    //       developersPublishersArr.push(resultObj.name);
    //     }

    //   }

    //   obj.developersPublishers = developersPublishersArr.join(', ');


    //   // console.log(`
    //   //   ----- developerPublisherIDsArr -----\n
    //   //   ${util.inspect(JSON.parse(JSON.stringify(developerPublisherIDsArr)), { colors: true, depth: null })}\n
    //   //   --------------------\n
    //   // `);

    //   // console.log(`
    //   //   ----- docDevelopersPublishersArr -----\n
    //   //   ${util.inspect(JSON.parse(JSON.stringify(docDevelopersPublishersArr)), { colors: true, depth: null })}\n
    //   //   --------------------\n
    //   // `);

    //   // console.log(`
    //   //   ----- developersPublishersArr -----\n
    //   //   ${util.inspect(JSON.parse(JSON.stringify(developersPublishersArr)), { colors: true, depth: null })}\n
    //   //   --------------------\n
    //   // `);


    //   // --------------------------------------------------
    //   //   画像と動画の処理
    //   // --------------------------------------------------

    //   const formattedThumbnailObj = formatImagesAndVideosObj({ localeObj, obj: imagesAndVideosThumbnailObj });

    //   if (Object.keys(formattedThumbnailObj).length !== 0) {

    //     obj.src = lodashGet(formattedThumbnailObj, ['arr', 0, 'src'], '/img/common/thumbnail/none-game.jpg');
    //     obj.srcSet = lodashGet(formattedThumbnailObj, ['arr', 0, 'srcSet'], '');

    //   }


    //   // --------------------------------------------------
    //   //   Set Data
    //   // --------------------------------------------------

    //   lodashSet(returnObj, ['dataObj', gameCommunities_id], obj);


    //   // --------------------------------------------------
    //   //   Pages Array
    //   // --------------------------------------------------

    //   const pagesArr = lodashGet(returnObj, [`page${page}Obj`, 'arr'], []);
    //   pagesArr.push(gameCommunities_id);

    //   returnObj[`page${page}Obj`] = {

    //     loadedDate: ISO8601,
    //     arr: pagesArr,

    //   };


    // }




    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------

    // console.log(`
    //   ----------------------------------------\n
    //   app/@database/follows/model.js - findFollowListGc
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






// --------------------------------------------------
//   Transaction
// --------------------------------------------------

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
  
  findFollowListGc,
  findFollowListUc,
  findFollowContents,
  findFollowForumGc,
  transactionForUpsert,
  
};