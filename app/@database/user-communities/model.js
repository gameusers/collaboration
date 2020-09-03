// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


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

const SchemaUserCommunities = require('./schema.js');
const SchemaImagesAndVideos = require('../images-and-videos/schema.js');
const SchemaFollows = require('../follows/schema.js');

const ModelGames = require('../games/model.js');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatImagesAndVideosArr, formatImagesAndVideosObj } = require('../images-and-videos/format.js');
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
    
    return await SchemaUserCommunities.findOne(conditionObj).exec();
    
    
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
    
    return await SchemaUserCommunities.find(conditionObj).exec();
    
    
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
    
    return await SchemaUserCommunities.countDocuments(conditionObj).exec();
    
    
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
    
    return await SchemaUserCommunities.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    
    
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
    
    return await SchemaUserCommunities.insertMany(saveArr);
    
    
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
    
    return await SchemaUserCommunities.deleteMany(conditionObj);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};






/**
 * ヘッダーの更新用  2020/9/3
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} userCommunities_id - DB user-communities ユーザーコミュニティID
 * @return {Object} 取得データ
 */
const findHeader = async ({
  
  localeObj,
  loginUsers_id,
  userCommunities_id,
  
}) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   DB users / ユーザー情報を取得する
    // --------------------------------------------------
    
    const docUserCommunityObj = await findForUserCommunity({
      
      localeObj,
      loginUsers_id,
      userCommunities_id,
      
    });
    
    const returnObj = lodashGet(docUserCommunityObj, ['headerObj'], {});
    
    
    // --------------------------------------------------
    //   対象のユーザーがユーザーページのトップ画像をアップロードしていない場合
    //   ランダム取得のゲーム画像を代わりに利用する
    // --------------------------------------------------
    // 
    if (!lodashHas(returnObj, ['imagesAndVideosObj'])) {
      
      
      // --------------------------------------------------
      //   DB games / ヘッダーヒーローイメージ用
      // --------------------------------------------------
      
      const docGamesHeaderObj = await ModelGames.findForHeroImage({
        
        localeObj,
        
      });
      
      const imagesAndVideosObj = lodashGet(docGamesHeaderObj, ['imagesAndVideosObj'], {});
      
      lodashSet(returnObj, ['imagesAndVideosObj'], imagesAndVideosObj);
      
      
    }
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   app/@database/user-communities/model.js - findHeader
    // `);
    
    // console.log(chalk`
    //   userID: {green ${userID}}
    //   language: {green ${language}}
    //   country: {green ${country}}
    // `);
    
    // console.log(`
    //   ----- docUserCommunityObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docUserCommunityObj)), { colors: true, depth: null })}\n
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
 * 検索してデータを取得する / For User Community
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} userCommunities_id - DB user-communities _id
 * @param {string} userCommunityID - DB user-communities userCommunityID / コミュニティID
 * @return {Array} 取得データ
 */
const findForUserCommunity = async ({
  
  localeObj,
  loginUsers_id,
  userCommunities_id,
  userCommunityID,
  
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
    //   Match Condition Array
    // --------------------------------------------------
    
    let matchConditionArr = [
      {
        $match : { _id: userCommunities_id }
      },
    ];
    
    if (userCommunityID) {
      
      matchConditionArr = [
        {
          $match : { userCommunityID }
        },
      ];
      
    }
    
    
    // --------------------------------------------------
    //   Aggregation
    // --------------------------------------------------
    
    const docArr = await SchemaUserCommunities.aggregate([
      
      
      // --------------------------------------------------
      //   Match Condition Array
      // --------------------------------------------------
      
      ...matchConditionArr,
      
      
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
      //   images-and-videos / トップ画像
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
      //   follows
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'follows',
            let: { let_id: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$userCommunities_id', '$$let_id']
                  },
                }
              },
              {
                $project: {
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
      //   $project
      // --------------------------------------------------
      
      {
        $project: {
          users_id: 1,
          createdDate: 1,
          updatedDateObj: 1,
          localesArr: 1,
          communityType: 1,
          anonymity: 1,
          imagesAndVideosObj: 1,
          gamesArr: 1,
          followsObj: 1,
          gameCommunities_idsArr: 1,
        }
      },
      
      
    ]).exec();
    
    
    

    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const returnObj = lodashGet(docArr, [0], {});
    const headerObj = {};
    
    
    // --------------------------------------------------
    //   画像の処理
    // --------------------------------------------------
    
    if (returnObj.imagesAndVideosObj) {
      headerObj.imagesAndVideosObj = formatImagesAndVideosObj({ obj: returnObj.imagesAndVideosObj });
    }
    
    
    // --------------------------------------------------
    //   関連するゲーム
    // --------------------------------------------------
    
    if (returnObj.gamesArr) {


      // --------------------------------------------------
      //   gamesArr - 元の配列の順番通りに並べなおす
      // --------------------------------------------------
      
      const sortedGamesArr = [];
      const gameCommunities_idsArr = lodashGet(returnObj, ['gameCommunities_idsArr'], []);
      const gamesArr = lodashGet(returnObj, ['gamesArr'], []);
      
      for (let gameCommunities_id of gameCommunities_idsArr) {
        
        const index = gamesArr.findIndex((valueObj) => {
          return valueObj.gameCommunities_id === gameCommunities_id;
        });
        
        if (index !== -1) {
          sortedGamesArr.push(gamesArr[index]);
        }
        
      }


      // --------------------------------------------------
      //   画像の処理
      // --------------------------------------------------

      headerObj.gamesArr = formatImagesAndVideosArr({ arr: sortedGamesArr });


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
    headerObj.communityType = returnObj.communityType;
    
    returnObj.headerObj = headerObj;
    
    
    // --------------------------------------------------
    //   不要な項目を削除する
    // --------------------------------------------------
    
    delete returnObj.localesArr;
    delete returnObj.gamesArr;
    delete returnObj.imagesAndVideosObj;
    delete returnObj.followsObj;
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/user-communities/model.js - findForUserCommunity
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
 * 設定用データを取得する
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} userCommunities_id - DB user-communities _id
 * @param {string} userCommunityID - DB user-communities userCommunityID / コミュニティID
 * @return {Array} 取得データ
 */
const findForUserCommunitySettings = async ({
  
  localeObj,
  loginUsers_id,
  userCommunities_id,
  userCommunityID,
  
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
    //   Match Condition Array
    // --------------------------------------------------
    
    let matchConditionArr = [
      {
        $match: {
          _id: userCommunities_id,
          users_id: loginUsers_id
        }
      },
    ];
    
    if (userCommunityID) {
      
      matchConditionArr = [
        {
          $match: {
            userCommunityID,
            users_id: loginUsers_id
          }
        },
      ];
      
    }
    
    
    // --------------------------------------------------
    //   Aggregation
    // --------------------------------------------------
    
    const docArr = await SchemaUserCommunities.aggregate([
      
      
      // --------------------------------------------------
      //   Match Condition Array
      // --------------------------------------------------
      
      ...matchConditionArr,
      
      
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
      //   images-and-videos / トップ画像
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
      
      
      // --------------------------------------------------
      //   follows
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'follows',
            let: { let_id: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$userCommunities_id', '$$let_id']
                  },
                }
              },
              {
                $project: {
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
      //   $project
      // --------------------------------------------------
      
      {
        $project: {
          users_id: 1,
          createdDate: 1,
          updatedDateObj: 1,
          userCommunityID: 1,
          localesArr: 1,
          communityType: 1,
          anonymity: 1,
          imagesAndVideosObj: 1,
          imagesAndVideosThumbnailObj: 1,
          gamesArr: 1,
          followsObj: 1,
          gameCommunities_idsArr: 1,
        }
      },
      
      
    ]).exec();
    
    


    // --------------------------------------------------
    //   returnObj
    // --------------------------------------------------
    
    const returnObj = lodashGet(docArr, [0], {});
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
    
    // if (returnObj.gamesArr) {
    //   headerObj.gamesArr = formatImagesAndVideosArr({ arr: returnObj.gamesArr });
    // }


    // --------------------------------------------------
    //   関連するゲーム
    // --------------------------------------------------
    
    if (returnObj.gamesArr) {


      // --------------------------------------------------
      //   gamesArr - 元の配列の順番通りに並べなおす
      // --------------------------------------------------
      
      const sortedGamesArr = [];
      const gameCommunities_idsArr = lodashGet(returnObj, ['gameCommunities_idsArr'], []);
      const gamesArr = lodashGet(returnObj, ['gamesArr'], []);
      
      for (let gameCommunities_id of gameCommunities_idsArr) {
        
        const index = gamesArr.findIndex((valueObj) => {
          return valueObj.gameCommunities_id === gameCommunities_id;
        });
        
        if (index !== -1) {
          sortedGamesArr.push(gamesArr[index]);
        }
        
      }


      // --------------------------------------------------
      //   画像の処理
      // --------------------------------------------------

      headerObj.gamesArr = formatImagesAndVideosArr({ arr: sortedGamesArr });


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
      returnObj.descriptionShort = lodashGet(filteredArr, [0, 'descriptionShort'], '');
      
    } else {
      
      returnObj.name = lodashGet(localesArr, [0, 'name'], '');
      returnObj.description = lodashGet(localesArr, [0, 'description'], '');
      returnObj.descriptionShort = lodashGet(localesArr, [0, 'descriptionShort'], '');
      
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
    headerObj.communityType = returnObj.communityType;
    
    returnObj.headerObj = headerObj;
    
    
    // --------------------------------------------------
    //   不要な項目を削除する
    // --------------------------------------------------
    
    delete returnObj.localesArr;
    delete returnObj.gamesArr;
    delete returnObj.followsObj;

    


    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/user-communities/model.js - findForUserCommunity
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
 * データを取得する / フォーラム＆募集の更新日時取得用
 * @param {string} userCommunities_id - DB user-communities _id / ID
 * @return {Object} 取得データ
 */
const findForUserCommunityByUserCommunities_id = async ({
  
  localeObj,
  userCommunities_id,
  
}) => {
  
  
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
          _id: userCommunities_id,
        }
      },
    ];
    
    
    // --------------------------------------------------
    //   Aggregation - user-communities
    // --------------------------------------------------
    
    const docArr = await SchemaUserCommunities.aggregate([
      
      
      // --------------------------------------------------
      //   Match Condition Array
      // --------------------------------------------------
      
      ...matchConditionArr,
      
      
      // --------------------------------------------------
      //   $project
      // --------------------------------------------------
      
      {
        $project: {
          createdDate: 0,
          updatedDate: 0,
          gameCommunities_idsArr: 0,
          userCommunityID: 0,
          imagesAndVideos_id: 0,
          imagesAndVideosThumbnail_id: 0,
          __v: 0,
        }
      },
      
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   returnObj
    // --------------------------------------------------
    
    const returnObj = lodashGet(docArr, [0], {});
    
    
    
    
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
    //   不要な項目を削除する
    // --------------------------------------------------
    
    delete returnObj.localesArr;
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/user-communities/model.js - findForUserCommunityByUserCommunities_id
    // `);
    
    // console.log(chalk`
    //   userCommunities_id: {green ${userCommunities_id}}
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
const transactionForUpsertSettings = async ({
  
  userCommunitiesConditionObj,
  userCommunitiesSaveObj,
  followsConditionObj,
  followsSaveObj,
  imagesAndVideosConditionObj = {},
  imagesAndVideosSaveObj = {},
  imagesAndVideosThumbnailConditionObj = {},
  imagesAndVideosThumbnailSaveObj = {},
  
}) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Transaction / Session
  // --------------------------------------------------
  
  const session = await SchemaUserCommunities.startSession();
  
  
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Transaction / Start
    // --------------------------------------------------
    
    await session.startTransaction();
    
    
    
    
    // --------------------------------------------------
    //   DB user-communities
    // --------------------------------------------------
    
    await SchemaUserCommunities.updateOne(userCommunitiesConditionObj, userCommunitiesSaveObj, { session, upsert: true });
    
    
    // --------------------------------------------------
    //   DB follows 
    // --------------------------------------------------
    
    await SchemaFollows.updateOne(followsConditionObj, followsSaveObj, { session, upsert: true });
    
    
    
    // --------------------------------------------------
    //   DB images-and-videos / トップ画像
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
    //   DB images-and-videos / サムネイル画像
    // --------------------------------------------------
    
    if (Object.keys(imagesAndVideosThumbnailConditionObj).length !== 0 && Object.keys(imagesAndVideosThumbnailSaveObj).length !== 0) {
      
      
      // --------------------------------------------------
      //   画像＆動画を削除する
      // --------------------------------------------------
      
      const arr = lodashGet(imagesAndVideosThumbnailSaveObj, ['arr'], []);
      
      if (arr.length === 0) {
        
        await SchemaImagesAndVideos.deleteOne(imagesAndVideosThumbnailConditionObj, { session });
        
        
      // --------------------------------------------------
      //   画像＆動画を保存
      // --------------------------------------------------
        
      } else {
        
        await SchemaImagesAndVideos.updateOne(imagesAndVideosThumbnailConditionObj, imagesAndVideosThumbnailSaveObj, { session, upsert: true });
        
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
    //   ----- userCommunitiesConditionObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(userCommunitiesConditionObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- userCommunitiesSaveObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(userCommunitiesSaveObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- followsConditionObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(followsConditionObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- followsSaveObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(followsSaveObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosConditionObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosConditionObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosSaveObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosSaveObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosThumbnailConditionObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosThumbnailConditionObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosThumbnailSaveObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosThumbnailSaveObj)), { colors: true, depth: null })}\n
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
  
  findHeader,
  findForUserCommunity,
  findForUserCommunitySettings,
  findForUserCommunityByUserCommunities_id,
  
  transactionForUpsertSettings,
  
};