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
const SchemaForumComments = require('../forum-comments/schema');
const SchemaImagesAndVideos = require('../images-and-videos/schema');
const SchemaGameCommunities = require('../game-communities/schema');
const SchemaUserCommunities = require('../user-communities/schema');
const SchemaUsers = require('../users/schema');

const ModelForumComments = require('../forum-comments/model');
const ModelGameCommunities = require('../game-communities/model');
const ModelUserCommunities = require('../user-communities/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { CustomError } = require('../../@modules/error/custom');
const { verifyAuthority } = require('../../@modules/authority');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatRecruitmentThreadsArr } = require('./format');




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






// --------------------------------------------------
//   募集
// --------------------------------------------------

/**
 * 募集を取得する
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
 * @param {number} threadPage - スレッドのページ
 * @param {number} threadLimit - スレッドのリミット
 * @param {number} commentPage - コメントのページ
 * @param {number} commentLimit - コメントのリミット
 * @param {number} replyPage - 返信のページ
 * @param {number} replyLimit - 返信のリミット
 * @return {Array} 取得データ
 */
const findForRecruitment = async ({
  
  req,
  localeObj,
  loginUsers_id,
  gameCommunities_id,
  threadPage = 1,
  threadLimit = process.env.RECRUITMENT_THREAD_LIMIT,
  commentPage = 1,
  commentLimit = process.env.RECRUITMENT_COMMENT_LIMIT,
  replyPage = 1,
  replyLimit = process.env.RECRUITMENT_REPLY_LIMIT,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Parse
    // --------------------------------------------------
    
    const intThreadLimit = parseInt(threadLimit, 10);
    const intCommentLimit = parseInt(commentLimit, 10);
    const intReplyLimit = parseInt(replyLimit, 10);
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const language = lodashGet(localeObj, ['language'], '');
    const country = lodashGet(localeObj, ['country'], '');
    
    
    
    
    // --------------------------------------------------
    //   Match Condition Array
    // --------------------------------------------------
    
    let matchConditionArr = [];
    
    matchConditionArr = [
      {
        $match : { gameCommunities_id }
      },
    ];
    
    
    // --------------------------------------------------
    //   threadCount
    // --------------------------------------------------
    
    const gameCommunityArr = await ModelGameCommunities.find({
      
      conditionObj: {
        _id: gameCommunities_id
      }
      
    });
    
    const threadCount = lodashGet(gameCommunityArr, [0, 'recruitmentObj', 'threadCount'], 0);
    
    
    
    
    // --------------------------------------------------
    //   Aggregation
    // --------------------------------------------------
    
    const docArr = await Schema.aggregate([
      
      
      // --------------------------------------------------
      //   Match Condition Array
      // --------------------------------------------------
      
      ...matchConditionArr,
      
      
      // --------------------------------------------------
      //   card-players / プレイヤーカードを取得（名前＆ステータス＆サムネイル用）
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'card-players',
            let: { recruitmentThreadsUsers_id: '$users_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$language', language] },
                      { $eq: ['$users_id', '$$recruitmentThreadsUsers_id'] },
                    ]
                  },
                }
              },
              
              
              // --------------------------------------------------
              //   card-players / images-and-videos / サムネイルを取得
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
              
              
              { $project:
                {
                  name: '$nameObj.value',
                  status: '$statusObj.value',
                  imagesAndVideosThumbnailObj: 1,
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
      
      
      // --------------------------------------------------
      //   users / ユーザーを取得（アクセス日時＆経験値＆プレイヤーID用）
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'users',
            let: { recruitmentThreadsUsers_id: '$users_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$recruitmentThreadsUsers_id'] },
                }
              },
              { $project:
                {
                  _id: 0,
                  accessDate: 1,
                  exp: 1,
                  userID: 1,
                  webPushSubscriptionObj: 1,
                }
              }
            ],
            as: 'usersObj'
          }
      },
      
      {
        $unwind: {
          path: '$usersObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // --------------------------------------------------
      //   images-and-videos
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { recruitmentThreadsImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$recruitmentThreadsImagesAndVideos_id'] },
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
      //   hardwares
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'hardwares',
            let: { recruitmentThreadsHardwareIDsArr: '$hardwareIDsArr' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $in: ['$hardwareID', '$$recruitmentThreadsHardwareIDsArr'] }
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
      //   ids
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'ids',
            let: {
              recruitmentThreadsIDs_idArr: '$ids_idsArr',
              recruitmentThreadsUsers_id: '$users_id',
            },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$users_id', '$$recruitmentThreadsUsers_id'] },
                      { $in: ['$_id', '$$recruitmentThreadsIDs_idArr'] }
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
      
      
      { $project:
        {
          imagesAndVideos_id: 0,
          __v: 0,
        }
      },
      
      
      { '$sort': { 'updatedDate': -1 } },
      { $skip: (threadPage - 1) * intThreadLimit },
      { $limit: intThreadLimit },
      
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const formattedThreadsObj = formatRecruitmentThreadsArr({
      
      req,
      localeObj,
      loginUsers_id,
      arr: docArr,
      threadPage,
      threadCount,
      
    });
    
    const recruitmentThreadsObj = lodashGet(formattedThreadsObj, ['recruitmentThreadsObj'], {});
    const recruitmentThreads_idsForCommentArr = lodashGet(formattedThreadsObj, ['recruitmentThreads_idsForCommentArr'], []);
    
    
    
    
    // // --------------------------------------------------
    // //   DB find / Forum Comments & Replies
    // // --------------------------------------------------
    
    // const forumCommentsAndRepliesObj = await ModelForumComments.findCommentsAndRepliesByForumThreads_idsArr({
    //   req,
    //   localeObj,
    //   loginUsers_id,
    //   forumThreads_idsArr: forumThreads_idsForCommentArr,
    //   forumThreadsObj,
    //   commentPage,
    //   commentLimit: intCommentLimit,
    //   replyPage,
    //   replyLimit: intReplyLimit,
    // });
    
    // const forumCommentsObj = lodashGet(forumCommentsAndRepliesObj, ['forumCommentsObj'], {});
    // const forumRepliesObj = lodashGet(forumCommentsAndRepliesObj, ['forumRepliesObj'], {});
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/recruitment-threads/model.js - findForRecruitment
    // `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   threadPage: {green ${threadPage}}
    //   threadLimit: {green ${threadLimit}}
    //   commentLimit: {green ${commentLimit}}
    //   replyLimit: {green ${replyLimit}}
    // `);
    
    // console.log(`
    //   ----- docArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- formattedThreadsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(formattedThreadsObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumCommentsAndRepliesObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumCommentsAndRepliesObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumThreadsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumCommentsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumCommentsObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumRepliesObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumRepliesObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return {
      
      recruitmentThreadsObj,
      
    };
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};




/**
 * コメント＆返信データを取得する　削除用
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} forumThreads_id - DB forum-threads _id / スレッドのID
 * @return {Array} 取得データ
 */
// const findForDeleteThread = async ({
  
//   req,
//   localeObj,
//   loginUsers_id,
//   forumThreads_id,
  
// }) => {
  
  
//   try {
    
    
//     // --------------------------------------------------
//     //   Thread
//     // --------------------------------------------------
    
//     const forumThreadsArr = await Schema.aggregate([
      
      
//       {
//         $match: { _id: forumThreads_id },
//       },
      
      
//       { $project:
//         {
//           createdDate: 1,
//           users_id: 1,
//           imagesAndVideos_id: 1,
//         }
//       },
      
      
//     ]).exec();
    
    
    
    
//     // --------------------------------------------------
//     //   Comments & Replies
//     // --------------------------------------------------
    
//     const forumCommentsArr = await SchemaForumComments.aggregate([
      
      
//       {
//         $match: { forumThreads_id },
//       },
      
      
//       { $project:
//         {
//           createdDate: 1,
//           users_id: 1,
//           imagesAndVideos_id: 1,
//         }
//       },
      
      
//     ]).exec();
    
    
    
    
//     // --------------------------------------------------
//     //   配列が空の場合は処理停止
//     // --------------------------------------------------
    
//     if (forumThreadsArr.length === 0) {
//       throw new CustomError({ level: 'error', errorsArr: [{ code: 'Wwc1vpiQ-', messageID: 'cvS0qSAlE' }] });
//     }
    
    
    
    
//     // --------------------------------------------------
//     //   編集権限がない場合は処理停止
//     // --------------------------------------------------
    
//     const editable = verifyAuthority({
//       req,
//       users_id: lodashGet(forumThreadsArr, [0, 'users_id'], ''),
//       loginUsers_id,
//       ISO8601: lodashGet(forumThreadsArr, [0, 'createdDate'], ''),
//       _id: lodashGet(forumThreadsArr, [0, '_id'], ''),
//     });
    
//     if (!editable) {
//       throw new CustomError({ level: 'error', errorsArr: [{ code: 'M2XmqnE4r', messageID: 'DSRlEoL29' }] });
//     }
    
    
    
    
//     // --------------------------------------------------
//     //   Format
//     // --------------------------------------------------
    
//     const imagesAndVideos_id = lodashGet(forumThreadsArr, [0, 'imagesAndVideos_id'], '');
    
//     let imagesAndVideos_idsArr = [];
    
//     if (imagesAndVideos_id) {
//       imagesAndVideos_idsArr = [imagesAndVideos_id];
//     }
    
    
//     for (let valueObj of forumCommentsArr.values()) {
      
//       if (valueObj.imagesAndVideos_id) {
//         imagesAndVideos_idsArr.push(valueObj.imagesAndVideos_id);
//       }
      
//     }
    
//     const returnObj = {
//       imagesAndVideos_idsArr,
//     };
    
    
    
//     // --------------------------------------------------
//     //   console.log
//     // --------------------------------------------------
    
//     // console.log(chalk`
//     //   forumThreads_id: {green ${forumThreads_id}}
//     // `);
    
//     // console.log(`
//     //   ----- imagesAndVideos_idsArr -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideos_idsArr)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
    
//     // console.log(`
//     //   ----- forumThreadsArr -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsArr)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- forumCommentsArr -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(forumCommentsArr)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- returnObj -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(returnObj)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
    
    
    
//     // --------------------------------------------------
//     //   Return
//     // --------------------------------------------------
    
//     return returnObj;
    
    
//   } catch (err) {
    
//     throw err;
    
//   }
  
  
// };




/**
 * 編集用データを取得する（権限もチェック）
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} recruitmentThreads_id - DB recruitment-threads _id / スレッドID
 * @return {Array} 取得データ
 */
const findOneForEdit = async ({
  
  req,
  localeObj,
  loginUsers_id,
  recruitmentThreads_id,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const language = lodashGet(localeObj, ['language'], '');
    const country = lodashGet(localeObj, ['country'], '');
    
    
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    const docRecruitmentThreadsArr = await Schema.aggregate([
      
      
      // --------------------------------------------------
      //   Match
      // --------------------------------------------------
      
      {
        $match : { _id: recruitmentThreads_id }
      },
      
      
      // --------------------------------------------------
      //   images-and-videos
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { recruitmentThreadsImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$recruitmentThreadsImagesAndVideos_id'] },
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
      //   hardwares
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'hardwares',
            let: { recruitmentThreadsHardwareIDsArr: '$hardwareIDsArr' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $in: ['$hardwareID', '$$recruitmentThreadsHardwareIDsArr'] }
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
      //   ids
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'ids',
            let: {
              recruitmentThreadsIDs_idArr: '$ids_idsArr',
              recruitmentThreadsUsers_id: '$users_id',
            },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$users_id', '$$recruitmentThreadsUsers_id'] },
                      { $in: ['$_id', '$$recruitmentThreadsIDs_idArr'] }
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
      
      
      { $project:
        {
          createdDate: 0,
          imagesAndVideos_id: 0,
          hardwareIDsArr: 0,
          ids_idsArr: 0,
          publicCommentsUsers_idsArr: 0,
          publicApprovalUsers_idsArrr: 0,
          close: 0,
          webPushSubscriptionObj: 0,
          comments: 0,
          replies: 0,
          images: 0,
          videos: 0,
          ip: 0,
          userAgent: 0,
          __v: 0,
        }
      },
      
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   配列が空の場合は処理停止
    // --------------------------------------------------
    
    if (docRecruitmentThreadsArr.length === 0) {
      throw new CustomError({ level: 'error', errorsArr: [{ code: 'acvBaS9ri', messageID: 'cvS0qSAlE' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   編集権限がない場合は処理停止
    // --------------------------------------------------
    
    const editable = verifyAuthority({
      
      req,
      users_id: lodashGet(docRecruitmentThreadsArr, [0, 'users_id'], ''),
      loginUsers_id,
      ISO8601: lodashGet(docRecruitmentThreadsArr, [0, 'createdDate'], ''),
      _id: lodashGet(docRecruitmentThreadsArr, [0, '_id'], '')
      
    });
    
    if (!editable) {
      throw new CustomError({ level: 'error', errorsArr: [{ code: 'ccO1brrau', messageID: 'DSRlEoL29' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const formattedObj = docRecruitmentThreadsArr[0];
    
    
    // --------------------------------------------------
    //   非ログイン時のID
    // --------------------------------------------------
    
    const publicIDsArr = lodashGet(formattedObj, ['publicIDsArr'], []);
    
    for (const [index, valueObj] of publicIDsArr.entries()) {
      
      if (index === 0) {
        
        lodashSet(formattedObj, ['platform1'], valueObj.platform);
        lodashSet(formattedObj, ['id1'], valueObj.id);
        
      } else if (index === 1) {
        
        lodashSet(formattedObj, ['platform2'], valueObj.platform);
        lodashSet(formattedObj, ['id2'], valueObj.id);
        
      } else if (index === 2) {
        
        lodashSet(formattedObj, ['platform3'], valueObj.platform);
        lodashSet(formattedObj, ['id3'], valueObj.id);
        
      }
      
    }
    
    
    // --------------------------------------------------
    //   情報
    // --------------------------------------------------
    
    const publicInformationsArr = lodashGet(formattedObj, ['publicInformationsArr'], []);
    
    for (const [index, valueObj] of publicInformationsArr.entries()) {
      
      if (index === 0) {
        
        lodashSet(formattedObj, ['informationTitle1'], valueObj.title);
        lodashSet(formattedObj, ['information1'], valueObj.information);
        
      } else if (index === 1) {
        
        lodashSet(formattedObj, ['informationTitle2'], valueObj.title);
        lodashSet(formattedObj, ['information2'], valueObj.information);
        
      } else if (index === 2) {
        
        lodashSet(formattedObj, ['informationTitle3'], valueObj.title);
        lodashSet(formattedObj, ['information3'], valueObj.information);
        
      } else if (index === 3) {
        
        lodashSet(formattedObj, ['informationTitle4'], valueObj.title);
        lodashSet(formattedObj, ['information4'], valueObj.information);
        
      } else if (index === 4) {
        
        lodashSet(formattedObj, ['informationTitle5'], valueObj.title);
        lodashSet(formattedObj, ['information5'], valueObj.information);
        
      }
      
    }
    
    
    
    
    // --------------------------------------------------
    //   returnObj
    // --------------------------------------------------
    
    const returnObj = formattedObj;
    
    
    
    
    // --------------------------------------------------
    //   不要なデータを削除
    // --------------------------------------------------
    
    delete returnObj.publicIDsArr;
    delete returnObj.publicInformationsArr;
    
    // delete returnObj.hardwareIDsArr;
    // delete returnObj.ids_idsArr;
    // delete returnObj.publicCommentsUsers_idsArr;
    // delete returnObj.publicApprovalUsers_idsArrr;
    // delete returnObj.close;
    // delete returnObj.webPushSubscriptionObj;
    // delete returnObj.comments;
    // delete returnObj.replies;
    // delete returnObj.images;
    // delete returnObj.videos;
    // delete returnObj.ip;
    // delete returnObj.userAgent;
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/recruitment-threads/model.js - findOneForEdit
    // `);
    
    // console.log(chalk`
    //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
    //   editable: {green ${editable} / ${typeof editable}}
    // `);
    
    // console.log(`
    //   ----- docRecruitmentThreadsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docRecruitmentThreadsArr)), { colors: true, depth: null })}\n
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
* Transaction 挿入 / 更新する
* スレッド、画像＆動画、ユーザーコミュニティを同時に更新する
* 
* @param {Object} recruitmentThreadsConditionObj - DB recruitment-threads 検索条件
* @param {Object} recruitmentThreadsSaveObj - DB recruitment-threads 保存データ
* @param {Object} imagesAndVideosConditionObj - DB images-and-videos 検索条件
* @param {Object} imagesAndVideosSaveObj - DB images-and-videos 保存データ
* @param {Object} gameCommunitiesConditionObj - DB game-communities 検索条件
* @param {Object} gameCommunitiesSaveObj - DB game-communities 保存データ
* @param {Object} usersConditionObj - DB users 検索条件
* @param {Object} usersSaveObj - DB users 保存データ
* @return {Object} 
*/
const transactionForUpsert = async ({
  
  recruitmentThreadsConditionObj,
  recruitmentThreadsSaveObj,
  imagesAndVideosConditionObj = {},
  imagesAndVideosSaveObj = {},
  gameCommunitiesConditionObj = {},
  gameCommunitiesSaveObj = {},
  usersConditionObj = {},
  usersSaveObj = {},
  
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
    
    
    
    
    // ---------------------------------------------
    //   - recruitment-threads
    // ---------------------------------------------
    
    await Schema.updateOne(recruitmentThreadsConditionObj, recruitmentThreadsSaveObj, { session, upsert: true });
    
    
    // ---------------------------------------------
    //   - images-and-videos
    // ---------------------------------------------
    
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
    
    
    // ---------------------------------------------
    //   - game-communities
    // ---------------------------------------------
    
    if (Object.keys(gameCommunitiesConditionObj).length !== 0 && Object.keys(gameCommunitiesSaveObj).length !== 0) {
      
      await SchemaGameCommunities.updateOne(gameCommunitiesConditionObj, gameCommunitiesSaveObj, { session });
      
    }
    
    
    // ---------------------------------------------
    //   - users
    // ---------------------------------------------
    
    if (Object.keys(usersConditionObj).length !== 0 && Object.keys(usersSaveObj).length !== 0) {
      
      await SchemaUsers.updateOne(usersConditionObj, usersSaveObj, { session });
      
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
    //   ----------------------------------------\n
    //   /app/@database/recruitment-threads/model.js - transactionForUpsert
    // `);
    
    // console.log(`
    //   ----- recruitmentThreadsConditionObj -----\n
    //   ${util.inspect(recruitmentThreadsConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- recruitmentThreadsSaveObj -----\n
    //   ${util.inspect(recruitmentThreadsSaveObj, { colors: true, depth: null })}\n
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
    //   ----- gameCommunitiesConditionObj -----\n
    //   ${util.inspect(gameCommunitiesConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- gameCommunitiesSaveObj -----\n
    //   ${util.inspect(gameCommunitiesSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
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




// /**
// * Transaction スレッドを削除する
// * スレッド、コメント、返信、画像＆動画を削除して、ユーザーコミュニティを更新する
// * @param {Object} forumRepliesConditionObj - DB forum-comments 検索条件
// * @param {Object} forumCommentsConditionObj - DB forum-comments 検索条件
// * @param {Object} forumThreadsConditionObj - DB forum-threads 検索条件
// * @param {Object} imagesAndVideosConditionObj - DB images-and-videos 検索条件
// * @param {Object} gameCommunitiesConditionObj - DB game-communities 検索条件
// * @param {Object} gameCommunitiesSaveObj - DB game-communities 保存データ
// * @param {Object} userCommunitiesConditionObj - DB user-communities 検索条件
// * @param {Object} userCommunitiesSaveObj - DB user-communities 保存データ
// * @return {Object} 
// */
// const transactionForDeleteThread = async ({
  
//   forumRepliesConditionObj,
//   forumCommentsConditionObj,
//   forumThreadsConditionObj,
//   imagesAndVideosConditionObj = {},
//   gameCommunitiesConditionObj = {},
//   gameCommunitiesSaveObj = {},
//   userCommunitiesConditionObj = {},
//   userCommunitiesSaveObj = {},
  
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
//     //   - forum-comments / Comments & Replies / deleteMany
//     // --------------------------------------------------
    
//     await SchemaForumComments.deleteMany(forumRepliesConditionObj, { session });
//     await SchemaForumComments.deleteMany(forumCommentsConditionObj, { session });
    
    
//     // --------------------------------------------------
//     //   - forum-threads / deleteOne
//     // --------------------------------------------------
    
//     await Schema.deleteOne(forumThreadsConditionObj, { session });
    
    
//     // ---------------------------------------------
//     //   - images-and-videos
//     // ---------------------------------------------
    
//     if (Object.keys(imagesAndVideosConditionObj).length !== 0) {
//       await SchemaImagesAndVideos.deleteMany(imagesAndVideosConditionObj, { session });
//     }
    
    
//     // ---------------------------------------------
//     //   - game-communities
//     // ---------------------------------------------
    
//     if (Object.keys(gameCommunitiesConditionObj).length !== 0 && Object.keys(gameCommunitiesSaveObj).length !== 0) {
//       await SchemaGameCommunities.updateOne(gameCommunitiesConditionObj, gameCommunitiesSaveObj, { session });
//     }
    
    
//     // ---------------------------------------------
//     //   - user-communities
//     // ---------------------------------------------
    
//     if (Object.keys(userCommunitiesConditionObj).length !== 0 && Object.keys(userCommunitiesSaveObj).length !== 0) {
//       await SchemaUserCommunities.updateOne(userCommunitiesConditionObj, userCommunitiesSaveObj, { session });
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
//     //   ----- forumRepliesConditionObj -----\n
//     //   ${util.inspect(forumRepliesConditionObj, { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- forumCommentsConditionObj -----\n
//     //   ${util.inspect(forumCommentsConditionObj, { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- forumThreadsConditionObj -----\n
//     //   ${util.inspect(forumThreadsConditionObj, { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- imagesAndVideosConditionObj -----\n
//     //   ${util.inspect(imagesAndVideosConditionObj, { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- userCommunitiesConditionObj -----\n
//     //   ${util.inspect(userCommunitiesConditionObj, { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- userCommunitiesSaveObj -----\n
//     //   ${util.inspect(userCommunitiesSaveObj, { colors: true, depth: null })}\n
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
    
//     // console.log(`
//     //   ----- errorObj -----\n
//     //   ${util.inspect(errorObj, { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
    
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
  
  findForRecruitment,
  findOneForEdit,
  // findForDeleteThread,
  transactionForUpsert,
  // transactionForDeleteThread,
  
};