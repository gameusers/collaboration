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
const lodashCloneDeep = require('lodash/cloneDeep');


// ---------------------------------------------
//   Schema & Model
// ---------------------------------------------

const Schema = require('./schema');
const SchemaUsers = require('../users/schema');
const SchemaImagesAndVideos = require('../images-and-videos/schema');

const ModelIDs = require('../ids/model');
const ModelFollows = require('../follows/model');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatCardPlayersArr, formatCardPlayersArrFromSchemaCardPlayers } = require('./format');
const { formatImagesAndVideosObj } = require('../images-and-videos/format');
const { formatFollowsObj } = require('../follows/format');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { CustomError } = require('../../@modules/error/custom');




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
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} users_id - DB users _id
 * @param {string} cardPlayers_id - DB card-players _id
 * @return {Object} 取得データ
 */
const findForCardPlayers = async ({ localeObj, loginUsers_id, users_id, cardPlayers_id }) => {
  
  
  // --------------------------------------------------
  //   Match Condition Array
  // --------------------------------------------------
  
  let matchConditionArr = [
    {
      $match : { _id: users_id }
    },
  ];
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return aggregateAndFormat({ localeObj, loginUsers_id, matchConditionArr });
  
  
};




/**
 * aggregate でデータを取得し、フォーマットして返す
 * schema: users をベースにして検索
 * 
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {Array} matchConditionArr - 検索条件
 * @param {number} page - ページ
 * @param {number} limit - 1ページに表示する件数
 * @return {Object} 取得データ
 */
const aggregateAndFormat = async ({
  
  localeObj,
  loginUsers_id,
  matchConditionArr,
  page,
  limit,
  
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
    
    let intPage = 1;
    let intLimit = 1;
    
    if (page) {
      intPage = parseInt(page, 10);
    }
    
    if (limit) {
      intLimit = parseInt(limit, 10);
    }
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const language = lodashGet(localeObj, ['language'], '');
    const country = lodashGet(localeObj, ['country'], '');
    
    
    
    
    // --------------------------------------------------
    //   Card Players のデータを取得
    //   ShemaUsers をベースにしているのは accessDate でソートするため
    // --------------------------------------------------
    
    const docUsersArr = await SchemaUsers.aggregate([
      
      
      // --------------------------------------------------
      //   Match Condition
      // --------------------------------------------------
      
      ...matchConditionArr,
      
      
      // --------------------------------------------------
      //   card-players
      // --------------------------------------------------
      
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
              
              
              // --------------------------------------------------
              //   card-players / images-and-videos / メイン画像
              // --------------------------------------------------
              
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
              
              
              // --------------------------------------------------
              //   card-players / images-and-videos / サムネイル用
              // --------------------------------------------------
              
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
              
              
              // --------------------------------------------------
              //   card-players / hardwares
              // --------------------------------------------------
              
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
                                  { $eq: ['$language', language] },
                                  { $eq: ['$country', country] },
                                  { $in: ['$hardwareID', '$$cardPlayersHardwareActiveArr'] }
                                ]
                              },
                              { $and:
                                [
                                  { $eq: ['$language', language] },
                                  { $eq: ['$country', country] },
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
              
              
              // --------------------------------------------------
              //   card-players / follows
              // --------------------------------------------------
              
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
                    ],
                    as: 'followsObj'
                  }
              },
              
              {
                $unwind: '$followsObj'
              },
              
              
              // --------------------------------------------------
              //   card-players / ids
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'ids',
                    let: { cardPlayersIds_idArr: '$ids_idsArr' },
                    pipeline: [
                      { $match:
                        { $expr:
                          { $in: ['$_id', '$$cardPlayersIds_idArr'] }
                        }
                      },
                      
                      
                      // --------------------------------------------------
                      //   card-players / ids / games
                      // --------------------------------------------------
                      
                      {
                        $lookup:
                          {
                            from: 'games',
                            let: { idsGameCommunities_id: '$gameCommunities_id' },
                            pipeline: [
                              { $match:
                                { $expr:
                                  { $and:
                                    [
                                      { $eq: ['$language', language] },
                                      { $eq: ['$country', country] },
                                      { $eq: ['$gameCommunities_id', '$$idsGameCommunities_id'] }
                                    ]
                                  },
                                }
                              },
                              
                              
                              // --------------------------------------------------
                              //   card-players / ids / games / images-and-videos / サムネイル用
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
                              
                              
                              { $project:
                                {
                                  _id: 1,
                                  gameCommunities_id: 1,
                                  name: 1,
                                  imagesAndVideosThumbnailObj: 1,
                                }
                              }
                            ],
                            as: 'gamesObj'
                          }
                      },
                      
                      {
                        $unwind:
                          {
                            path: '$gamesObj',
                            preserveNullAndEmptyArrays: true
                          }
                      },
                      
                      
                      { $project:
                        {
                          createdDate: 0,
                          updatedDate: 0,
                          users_id: 0,
                          search: 0,
                          __v: 0,
                        }
                      }
                    ],
                    as: 'idsArr'
                  }
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
          accessDate: 1,
          exp: 1,
          userID: 1,
          cardPlayerObj: 1,
        }
      },
      
      
      { '$sort': { 'accessDate': -1 } },
      { $skip: (intPage - 1) * intLimit },
      { $limit: intLimit },
      
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const formattedObj = formatCardPlayersArr({
      
      localeObj,
      loginUsers_id,
      arr: docUsersArr,
      
    });
    
    returnObj.cardPlayersObj = lodashGet(formattedObj, ['obj'], {});
    returnObj.cardPlayersArr = lodashGet(formattedObj, ['arr'], []);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/card-players/model.js - aggregateAndFormat
    // `);
    
    // console.log(`
    //   ----- matchConditionArr -----\n
    //   ${util.inspect(matchConditionArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- docUsersArr -----\n
    //   ${util.inspect(docUsersArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- formattedObj -----\n
    //   ${util.inspect(formattedObj, { colors: true, depth: null })}\n
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
 * 取得する [2020/04/08]
 * プレイヤーカードをダイアログで表示する場合に使用
 * schema: card-players をベースにして検索
 * 
 * @param {Object} localeObj - ロケール
 * @param {string} users_id - DB users _id
 * @param {string} cardPlayers_id - DB card-players _id
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @return {Object} 取得データ
 */
const findFromSchemaCardPlayers = async ({ 
  
  localeObj,
  users_id,
  cardPlayers_id,
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
    //   Property
    // --------------------------------------------------
    
    const language = lodashGet(localeObj, ['language'], '');
    const country = lodashGet(localeObj, ['country'], '');
    
    
    
    
    // --------------------------------------------------
    //   Match Condition Array
    // --------------------------------------------------
    
    let matchConditionArr = [
      {
        $match: { users_id }
      },
    ];
    
    if (cardPlayers_id) {
      
      matchConditionArr = [
        {
          $match: { _id: cardPlayers_id }
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
    
    const docArr = await Schema.aggregate([
      
      
      // --------------------------------------------------
      //   Match Condition
      // --------------------------------------------------
      
      ...matchConditionArr,
      
      
      // --------------------------------------------------
      //   images-and-videos / メイン画像
      // --------------------------------------------------
      
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
      
      
      // --------------------------------------------------
      //   images-and-videos / サムネイル用
      // --------------------------------------------------
      
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
      
      
      // --------------------------------------------------
      //   users
      // --------------------------------------------------
      
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
      
      
      // --------------------------------------------------
      //   hardwares
      // --------------------------------------------------
      
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
                          { $eq: ['$language', language] },
                          { $eq: ['$country', country] },
                          { $in: ['$hardwareID', '$$cardPlayersHardwareActiveArr'] }
                        ]
                      },
                      { $and:
                        [
                          { $eq: ['$language', language] },
                          { $eq: ['$country', country] },
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
      
      
      // --------------------------------------------------
      //   follows
      // --------------------------------------------------
      
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
            ],
            as: 'followsObj'
          }
      },
      
      {
        $unwind: '$followsObj'
      },
      
      
      // --------------------------------------------------
      //   ids
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'ids',
            let: { cardPlayersIds_idArr: '$ids_idsArr' },
            pipeline: [
              { $match:
                { $expr:
                  { $in: ['$_id', '$$cardPlayersIds_idArr'] }
                }
              },
              
              
              // --------------------------------------------------
              //   ids / games
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'games',
                    let: { idsGameCommunities_id: '$gameCommunities_id' },
                    pipeline: [
                      { $match:
                        { $expr:
                          { $and:
                            [
                              { $eq: ['$language', language] },
                              { $eq: ['$country', country] },
                              { $eq: ['$gameCommunities_id', '$$idsGameCommunities_id'] }
                            ]
                          },
                        }
                      },
                      
                      
                      // --------------------------------------------------
                      //   ids / games / images-and-videos / サムネイル用
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
                      
                      
                      { $project:
                        {
                          _id: 1,
                          gameCommunities_id: 1,
                          name: 1,
                          imagesAndVideosThumbnailObj: 1,
                        }
                      }
                    ],
                    as: 'gamesObj'
                  }
              },
              
              {
                $unwind:
                  {
                    path: '$gamesObj',
                    preserveNullAndEmptyArrays: true
                  }
              },
              
              
              { $project:
                {
                  createdDate: 0,
                  updatedDate: 0,
                  users_id: 0,
                  search: 0,
                  __v: 0,
                }
              }
            ],
            as: 'idsArr'
          }
      },
      
      
      // --------------------------------------------------
      //   $project
      // --------------------------------------------------
      
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
    //   Format
    // --------------------------------------------------
    
    returnObj = formatCardPlayersArrFromSchemaCardPlayers({
      
      localeObj,
      loginUsers_id,
      arr: docArr,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/card-players/model.js - findFromSchemaCardPlayers
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
    
    // console.log(`
    //   ----- resultIDsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultIDsObj)), { colors: true, depth: null })}\n
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
 * 編集用データを取得する（権限もチェック）[2020/04/16]
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} cardPlayers_id - DB card-players _id / カードのID
 * @return {Array} 取得データ
 */
const findOneForEdit = async ({
  
  localeObj,
  loginUsers_id,
  cardPlayers_id,
  
}) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const language = lodashGet(localeObj, ['language'], '');
  const country = lodashGet(localeObj, ['country'], '');
  
  
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Aggregate
    // --------------------------------------------------
    
    const docCardPlayersArr = await Schema.aggregate([
      
      
      // --------------------------------------------------
      //   Match
      // --------------------------------------------------
      
      {
        $match:
          {
            _id: cardPlayers_id,
            users_id: loginUsers_id,
          }
      },
      
      
      // --------------------------------------------------
      //   images-and-videos - トップ画像
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { letImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$letImagesAndVideos_id'] },
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
      //   images-and-videos - サムネイル画像
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { letImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$letImagesAndVideosThumbnail_id'] },
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
      //   hardwares
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'hardwares',
            let: {
              letHardwareActiveArr: '$hardwareActiveObj.valueArr',
              letHardwareInactiveArr: '$hardwareInactiveObj.valueArr'
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
                          { $in: ['$hardwareID', '$$letHardwareActiveArr'] }
                        ]
                      },
                      { $and:
                        [
                          { $eq: ['$language', language] },
                          { $eq: ['$country', country] },
                          { $in: ['$hardwareID', '$$letHardwareInactiveArr'] }
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
      
      
      // --------------------------------------------------
      //   ids
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'ids',
            let: {
              letIDs_idsArr: '$ids_idsArr',
              letUsers_id: '$users_id',
            },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$users_id', '$$letUsers_id'] },
                      { $in: ['$_id', '$$letIDs_idsArr'] }
                    ]
                  },
                }
              },
              
              
              // --------------------------------------------------
              //   ids / games
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'games',
                    let: { letIDsGameCommunities_id: '$gameCommunities_id' },
                    pipeline: [
                      { $match:
                        { $expr:
                          { $and:
                            [
                              { $eq: ['$language', language] },
                              { $eq: ['$country', country] },
                              { $eq: ['$gameCommunities_id', '$$letIDsGameCommunities_id'] }
                            ]
                          },
                        }
                      },
                      
                      
                      // --------------------------------------------------
                      //   ids / games / images-and-videos / サムネイル用
                      // --------------------------------------------------
                      
                      {
                        $lookup:
                          {
                            from: 'images-and-videos',
                            let: { letIDsGamesImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
                            pipeline: [
                              { $match:
                                { $expr:
                                  { $eq: ['$_id', '$$letIDsGamesImagesAndVideosThumbnail_id'] },
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
                      
                      
                      { $project:
                        {
                          _id: 1,
                          gameCommunities_id: 1,
                          name: 1,
                          imagesAndVideosThumbnailObj: 1,
                        }
                      }
                    ],
                    as: 'gamesObj'
                  }
              },
              
              {
                $unwind:
                  {
                    path: '$gamesObj',
                    preserveNullAndEmptyArrays: true
                  }
              },
              
              
              { $project:
                {
                  createdDate: 0,
                  updatedDate: 0,
                  users_id: 0,
                  search: 0,
                  __v: 0,
                }
              }
            ],
            as: 'idsArr'
          }
      },
      
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   配列が空の場合は処理停止
    // --------------------------------------------------
    
    if (docCardPlayersArr.length === 0) {
      throw new CustomError({ level: 'error', errorsArr: [{ code: 'bGSSbWbBE', messageID: 'cvS0qSAlE' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const formattedObj = docCardPlayersArr[0];
    
    const hardwaresArr = lodashGet(formattedObj, ['hardwaresArr'], []);
    
    
    // --------------------------------------------------
    //   hardwareActive
    // --------------------------------------------------
    
    const hardwareActiveValueArr = lodashGet(formattedObj, ['hardwareActiveObj', 'valueArr'], []);
    
    const hardwareActiveArr = [];
    
    for (let value of hardwareActiveValueArr) {
      
      const obj = hardwaresArr.find((valueObj) => {
        return valueObj.hardwareID === value;
      });
      
      if (obj && 'name' in obj) {
        
        hardwareActiveArr.push({
          hardwareID: value,
          name: obj.name
        });
        
      }
      
    }
    
    formattedObj.hardwareActiveArr = hardwareActiveArr;
    
    
    // --------------------------------------------------
    //   hardwareInactive
    // --------------------------------------------------
    
    const hardwareInactiveValueArr = lodashGet(formattedObj, ['hardwareInactiveObj', 'valueArr'], []);
    
    const hardwareInactiveArr = [];
    
    for (let value of hardwareInactiveValueArr) {
      
      const obj = hardwaresArr.find((valueObj) => {
        return valueObj.hardwareID === value;
      });
      
      if (obj && 'name' in obj) {
        
        hardwareInactiveArr.push({
          hardwareID: value,
          name: obj.name
        });
        
      }
      
    }
    
    formattedObj.hardwareInactiveArr = hardwareInactiveArr;
    
    
    
    
    // --------------------------------------------------
    //   returnObj
    // --------------------------------------------------
    
    const returnObj = {};
    
    returnObj[cardPlayers_id] = formattedObj;
    
    
    
    // --------------------------------------------------
    //   ID データをまとめて取得
    // --------------------------------------------------
    
    // let ids_idsArr = [];
    
    // for (let valueObj of resultCardPlayersArr.values()) {
    //   ids_idsArr = ids_idsArr.concat(valueObj.ids_idsArr);
    // }
    
    // const resultIDsObj = await ModelIDs.findForCardPlayer({
      
    //   localeObj,
    //   loginUsers_id,
    //   ids_idsArr,
      
    // });
    
    
    
    
    // --------------------------------------------------
    //   カードデータのフォーマット
    // --------------------------------------------------
    
    // returnObj = formatForEditForm({
    //   cardPlayersArr: resultCardPlayersArr,
    //   idsObj: resultIDsObj
    // });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/card-players/model.js - findOneForEdit
    // `);
    
    // console.log(`
    //   ----- docCardPlayersArr -----\n
    //   ${util.inspect(docCardPlayersArr, { colors: true, depth: null })}\n
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
    
    // return {};
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
    
    let ids_idsArr = [];
    
    for (let valueObj of resultCardPlayersArr.values()) {
      ids_idsArr = ids_idsArr.concat(valueObj.ids_idsArr);
    }
    
    const resultIDsObj = await ModelIDs.findForCardPlayer({
      
      localeObj,
      loginUsers_id,
      ids_idsArr,
      
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
  limit = process.env.NEXT_PUBLIC_COMMUNITY_MEMBER_LIMIT,
  
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
    
    let ids_idsArr = [];
    
    for (let valueObj of cardPlayersArr.values()) {
      ids_idsArr = ids_idsArr.concat(valueObj.ids_idsArr);
    }
    
    const resultIDsObj = await ModelIDs.findForCardPlayer({
      
      localeObj,
      loginUsers_id,
      ids_idsArr,
      
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
    //   ----- ids_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(ids_idsArr)), { colors: true, depth: null })}\n
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
 * 取得する / フォロワー用
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} adminUsers_id - DB users _id / 管理者のユーザーID
 * @param {string} users_id - DB users _id
 * @param {string} gameCommunities_id - DB game-communities _id
 * @param {string} userCommunities_id - DB user-communities _id
 * @param {string} controlType - 表示するフォロワーのタイプ [follow / followed / approval / block]
 * @param {number} page - ページ
 * @param {number} limit - リミット
 * @return {Object} 取得データ
 */
const findForFollowers = async ({
  
  localeObj,
  loginUsers_id,
  adminUsers_id,
  users_id,
  gameCommunities_id,
  userCommunities_id,
  controlType,
  page,
  limit,
  
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
    
    let intPage = 1;
    let intLimit = parseInt(process.env.NEXT_PUBLIC_FOLLOWERS_LIMIT, 10);
    
    if (page) {
      intPage = parseInt(page, 10);
    }
    
    if (limit) {
      intLimit = parseInt(limit, 10);
    }
    
    
    
    
    // --------------------------------------------------
    //   follows のデータを取得
    //   card-players のデータを取得するために必要
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   - 検索条件
    // ---------------------------------------------
    
    let conditionObj = {
      users_id
    };
    
    if (gameCommunities_id) {
      
      conditionObj = {
        gameCommunities_id
      };
      
    } else if (userCommunities_id) {
      
      conditionObj = {
        userCommunities_id
      };
      
    }
    
    
    // ---------------------------------------------
    //   - DB find / Follows
    // ---------------------------------------------
    
    const followsObj = await ModelFollows.findOne({ conditionObj });
    
    const followCount = lodashGet(followsObj, ['followCount'], 0);
    const followedCount = lodashGet(followsObj, ['followedCount'], 0);
    let approvalCount = 0;
    let blockCount = 0;
    
    if (adminUsers_id === loginUsers_id) {
      
      approvalCount = lodashGet(followsObj, ['approvalCount'], 0);
      blockCount = lodashGet(followsObj, ['blockCount'], 0);
      
    }
    
    
    // ---------------------------------------------
    //   - 検索用に users_id の配列を作成する
    // ---------------------------------------------
    
    let users_idsArr = [];
    
    if (controlType === 'follow') {
      
      users_idsArr = lodashGet(followsObj, ['followArr'], []);
      
    } else if (controlType === 'followed') {
      
      users_idsArr = lodashGet(followsObj, ['followedArr'], []);
      
    } else if (controlType === 'approval') {
      
      users_idsArr = lodashGet(followsObj, ['approvalArr'], []);
      
    } else if (controlType === 'block') {
      
      users_idsArr = lodashGet(followsObj, ['blockArr'], []);
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Match Condition Array
    // --------------------------------------------------
    
    let matchConditionArr = [
      {
        $match : { _id: { $in: users_idsArr } },
      },
    ];
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    const formattedObj = await aggregateAndFormat({
      
      localeObj,
      loginUsers_id,
      matchConditionArr,
      page: intPage,
      limit: intLimit,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   cardPlayersObj & cardPlayersArr
    // --------------------------------------------------
    
    returnObj.cardPlayersObj = lodashGet(formattedObj, ['cardPlayersObj'], {});
    const cardPlayersArr = lodashGet(formattedObj, ['cardPlayersArr'], []);
    
    
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    const ISO8601 = moment().utc().toISOString();
    
    
    
    
    // --------------------------------------------------
    //   Return Object
    // --------------------------------------------------
    
    lodashSet(returnObj, ['followMembersObj', 'followObj', 'count'], followCount);
    lodashSet(returnObj, ['followMembersObj', 'followedObj', 'count'], followedCount);
    
    
    // ---------------------------------------------
    //   - 権限がある場合
    // ---------------------------------------------
    
    if (adminUsers_id === loginUsers_id) {
      
      lodashSet(returnObj, ['followMembersObj', 'approvalObj', 'count'], approvalCount);
      lodashSet(returnObj, ['followMembersObj', 'blockObj', 'count'], blockCount);
      
    }
    
    
    // ---------------------------------------------
    //   - データ更新
    // ---------------------------------------------
    
    if (controlType === 'follow') {
      
      lodashSet(returnObj, ['followMembersObj', 'followObj', 'page'], intPage);
      lodashSet(returnObj, ['followMembersObj', 'followObj', `page${intPage}Obj`, 'loadedDate'], ISO8601);
      lodashSet(returnObj, ['followMembersObj', 'followObj', `page${intPage}Obj`, 'arr'], cardPlayersArr);
      
    } else if (controlType === 'followed') {
      
      lodashSet(returnObj, ['followMembersObj', 'followedObj', 'page'], intPage);
      lodashSet(returnObj, ['followMembersObj', 'followedObj', `page${intPage}Obj`, 'loadedDate'], ISO8601);
      lodashSet(returnObj, ['followMembersObj', 'followedObj', `page${intPage}Obj`, 'arr'], cardPlayersArr);
      
    } else if (controlType === 'approval') {
      
      lodashSet(returnObj, ['followMembersObj', 'approvalObj', 'page'], intPage);
      lodashSet(returnObj, ['followMembersObj', 'approvalObj', `page${intPage}Obj`, 'loadedDate'], ISO8601);
      lodashSet(returnObj, ['followMembersObj', 'approvalObj', `page${intPage}Obj`, 'arr'], cardPlayersArr);
      
    } else if (controlType === 'block') {
      
      lodashSet(returnObj, ['followMembersObj', 'blockObj', 'page'], intPage);
      lodashSet(returnObj, ['followMembersObj', 'blockObj', `page${intPage}Obj`, 'loadedDate'], ISO8601);
      lodashSet(returnObj, ['followMembersObj', 'blockObj', `page${intPage}Obj`, 'arr'], cardPlayersArr);
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/card-players/model.js - findForFollowers
    // `);
    
    // console.log(`
    //   ----- followsObj -----\n
    //   ${util.inspect(followsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- users_idsArr -----\n
    //   ${util.inspect(users_idsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   page: {green ${page}}
    //   limit: {green ${limit}}
    //   intPage: {green ${intPage} / ${typeof intPage}}
    //   intLimit: {green ${intLimit} / ${typeof intLimit}}
    //   process.env.NEXT_PUBLIC_FOLLOWERS_LIMIT: {green ${process.env.NEXT_PUBLIC_FOLLOWERS_LIMIT} / ${typeof process.env.NEXT_PUBLIC_FOLLOWERS_LIMIT}}
    // `);
    
    // console.log(`
    //   ----- docUsersArr -----\n
    //   ${util.inspect(docUsersArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- resultArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- ids_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(ids_idsArr)), { colors: true, depth: null })}\n
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
    
    const followsObj = lodashGet(valueObj, ['followsObj'], {});
    const adminUsers_id = valueObj.users_id;
    
    clonedObj.followsObj = formatFollowsObj({ followsObj, adminUsers_id, loginUsers_id });
    
    
    // clonedObj.followsObj.follow = false;
    // clonedObj.followsObj.followed = false;
    
    // if (loginUsers_id) {
      
    //   if (clonedObj.users_id !== loginUsers_id) {
        
    //     if (clonedObj.followsObj.followArr.includes(loginUsers_id)) {
    //       clonedObj.followsObj.follow = true;
    //     }
        
    //     if (clonedObj.followsObj.followedArr.includes(loginUsers_id)) {
    //       clonedObj.followsObj.followed = true;
    //     }
        
    //   }
      
    // }
    
    
    // --------------------------------------------------
    //   ID
    // --------------------------------------------------
    
    clonedObj.ids_idsArr = [];
    
    for (let value of valueObj.ids_idsArr) {
      
      if (value in idsObj) {
        clonedObj.ids_idsArr.push(idsObj[value]);
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
    
    clonedObj.ids_idsArr = [];
    
    for (let value of valueObj.ids_idsArr) {
      
      if (value in idsObj) {
        clonedObj.ids_idsArr.push(idsObj[value]);
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




/**
 * Transaction 挿入 / 更新する
 * プレイヤーカードと画像＆動画を同時に更新する
 * 
 * @param {Object} cardPlayersConditionObj - DB card-players 検索条件
 * @param {Object} cardPlayersSaveObj - DB card-players 保存データ
 * @param {Object} imagesAndVideosConditionObj - DB images-and-videos 検索条件
 * @param {Object} imagesAndVideosSaveObj - DB images-and-videos 保存データ
 * @param {Object} imagesAndVideosThumbnailConditionObj - DB images-and-videos 検索条件
 * @param {Object} imagesAndVideosThumbnailSaveObj - DB images-and-videos 保存データ
 * @return {Object} 
 */
const transactionForUpsert = async ({
  
  cardPlayersConditionObj,
  cardPlayersSaveObj,
  imagesAndVideosConditionObj = {},
  imagesAndVideosSaveObj = {},
  imagesAndVideosThumbnailConditionObj,
  imagesAndVideosThumbnailSaveObj,
  
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
    //   Card Player
    // --------------------------------------------------
    
    await Schema.updateOne(cardPlayersConditionObj, cardPlayersSaveObj, { session, upsert: true });
    
    
    
    
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
    //   Images And Videos - サムネイル画像
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
    //   ----- cardPlayersConditionObj -----\n
    //   ${util.inspect(cardPlayersConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- cardPlayersSaveObj -----\n
    //   ${util.inspect(cardPlayersSaveObj, { colors: true, depth: null })}\n
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
    //   ----- imagesAndVideosThumbnailConditionObj -----\n
    //   ${util.inspect(imagesAndVideosThumbnailConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosThumbnailSaveObj -----\n
    //   ${util.inspect(imagesAndVideosThumbnailSaveObj, { colors: true, depth: null })}\n
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
  
  findForCardPlayers,
  findFromSchemaCardPlayers,
  findOneForEdit,
  // findOneBy_id,
  findOneBy_idForEditForm,
  findForMember,
  findForFollowers,
  transactionForUpsert,
  
};