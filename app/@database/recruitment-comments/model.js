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
const SchemaRecruitmentThreads = require('../recruitment-threads/schema');
// const SchemaForumComments = require('../forum-comments/schema');
const SchemaImagesAndVideos = require('../images-and-videos/schema');
const SchemaGameCommunities = require('../game-communities/schema');
const SchemaUsers = require('../users/schema');

// const ModelForumComments = require('../forum-comments/model');
// const ModelGameCommunities = require('../game-communities/model');
// const ModelUserCommunities = require('../user-communities/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

// const { CustomError } = require('../../@modules/error/custom');
// const { verifyAuthority } = require('../../@modules/authority');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatRecruitmentCommentsAndRepliesArr } = require('./format');




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
 * コメントと返信を取得する - recruitmentThreads_idsArr で検索
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {Array} recruitmentThreads_idsArr - DB recruitment-threads _id / _idが入っている配列
 * @param {Object} recruitmentThreadsObj - スレッド情報の入ったオブジェクト / カウントの取得に使う
 * @param {number} commentPage - コメントのページ
 * @param {number} commentLimit - コメントのリミット
 * @param {number} replyPage - 返信のページ
 * @param {number} replyLimit - 返信のリミット
 * @return {Array} 取得データ
 */
const findCommentsAndReplies = async ({
  
  req,
  localeObj,
  loginUsers_id,
  recruitmentThreads_idsArr,
  recruitmentThreadsObj,
  commentPage = 1,
  commentLimit = process.env.RECRUITMENT_COMMENT_LIMIT,
  replyPage = 1,
  replyLimit = process.env.RECRUITMENT_REPLY_LIMIT,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Forum Comments & Replies データ取得
    //   $in, sort, limit を使って最新のコメントを取得すると、古いコメントが limit で削られてしまうため
    //   あるスレッドでは古いコメントが表示されないという事態になってしまう
    //   そのため for のループで検索している　ただ良くない書き方だと思うので可能なら改善した方がいい
    // --------------------------------------------------
    
    let resultArr = [];
    
    
    
    
    // --------------------------------------------------
    //   Language & Country
    // --------------------------------------------------
    
    const language = lodashGet(localeObj, ['language'], '');
    const country = lodashGet(localeObj, ['country'], '');
    
    
    // --------------------------------------------------
    //   parseInt
    // --------------------------------------------------
    
    const intCommentLimit = parseInt(commentLimit, 10);
    const intReplyLimit = parseInt(replyLimit, 10);
    
    
    
    
    // --------------------------------------------------
    //   Loop
    // --------------------------------------------------
    
    for (let recruitmentThreads_id of recruitmentThreads_idsArr.values()) {
      
      
      const docArr = await Schema.aggregate([
        
        
        // --------------------------------------------------
        //   コメント
        // --------------------------------------------------
        
        // --------------------------------------------------
        //   Match
        // --------------------------------------------------
        
        {
          $match: {
            recruitmentThreads_id,
          },
        },
        
        
        // --------------------------------------------------
        //   card-players - 名前＆ステータス＆サムネイル用
        // --------------------------------------------------
        
        {
          $lookup:
            {
              from: 'card-players',
              let: { letUsers_id: '$users_id' },
              pipeline: [
                { $match:
                  { $expr:
                    { $and:
                      [
                        { $eq: ['$language', language] },
                        { $eq: ['$users_id', '$$letUsers_id'] },
                      ]
                    },
                  }
                },
                
                
                // --------------------------------------------------
                //   card-players / images-and-videos - サムネイル画像
                // --------------------------------------------------
                
                {
                  $lookup:
                    {
                      from: 'images-and-videos',
                      let: { letCardPlayersImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
                      pipeline: [
                        { $match:
                          { $expr:
                            { $eq: ['$_id', '$$letCardPlayersImagesAndVideosThumbnail_id'] },
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
        //   users - アクセス日時＆経験値＆プレイヤーID用
        // --------------------------------------------------
        
        {
          $lookup:
            {
              from: 'users',
              let: { letUsers_id: '$users_id' },
              pipeline: [
                { $match:
                  { $expr:
                    { $eq: ['$_id', '$$letUsers_id'] },
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
        //   images-and-videos - 画像
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
        //   ids
        // --------------------------------------------------
        
        {
          $lookup:
            {
              from: 'ids',
              let: {
                letUsers_id: '$users_id',
                letIDs_idArr: '$ids_idsArr',
              },
              pipeline: [
                { $match:
                  { $expr:
                    { $and:
                      [
                        { $eq: ['$users_id', '$$letUsers_id'] },
                        { $in: ['$_id', '$$letIDs_idArr'] }
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
                      let: { letGameCommunities_id: '$gameCommunities_id' },
                      pipeline: [
                        { $match:
                          { $expr:
                            { $and:
                              [
                                { $eq: ['$language', language] },
                                { $eq: ['$country', country] },
                                { $eq: ['$gameCommunities_id', '$$letGameCommunities_id'] }
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
        
        
        
        
        // --------------------------------------------------
        //   返信
        // --------------------------------------------------
        
        {
          $lookup:
            {
              from: 'recruitment-replies',
              let: { let_id: '$_id' },
              pipeline: [
                
                { $match:
                  { $expr:
                    { $eq: ['$recruitmentComments_id', '$$let_id'] }
                  }
                },
                
                
                // --------------------------------------------------
                //   recruitment-replies / card-players - 名前＆ステータス＆サムネイル用
                // --------------------------------------------------
                
                {
                  $lookup:
                    {
                      from: 'card-players',
                      let: { letUsers_id: '$users_id' },
                      pipeline: [
                        { $match:
                          { $expr:
                            { $and:
                              [
                                { $eq: ['$language', language] },
                                { $eq: ['$users_id', '$$letUsers_id'] },
                              ]
                            },
                          }
                        },
                        
                        
                        // --------------------------------------------------
                        //   recruitment-replies / card-players / images-and-videos - サムネイル画像
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
                //   recruitment-replies / users - アクセス日時＆経験値＆プレイヤーID用
                // --------------------------------------------------
                
                {
                  $lookup:
                    {
                      from: 'users',
                      let: { letUsers_id: '$users_id' },
                      pipeline: [
                        { $match:
                          { $expr:
                            { $eq: ['$_id', '$$letUsers_id'] },
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
                //   recruitment-replies / images-and-videos - メイン画像
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
                //   recruitment-replies / recruitment-replies - replyTo 用のデータ取得
                // --------------------------------------------------
                
                {
                  $lookup:
                    {
                      from: 'recruitment-replies',
                      let: { letReplyToRecruitmentReplies_id: '$replyToRecruitmentReplies_id' },
                      pipeline: [
                        
                        
                        { $match:
                          { $expr:
                            { $eq: ['$_id', '$$letReplyToRecruitmentReplies_id'] },
                          }
                        },
                        
                        
                        // --------------------------------------------------
                        //   recruitment-replies / recruitment-replies / card-players - 名前＆ステータス＆サムネイル用
                        // --------------------------------------------------
                        
                        {
                          $lookup:
                            {
                              from: 'card-players',
                              let: { letUsers_id: '$users_id' },
                              pipeline: [
                                { $match:
                                  { $expr:
                                    { $and:
                                      [
                                        { $eq: ['$language', language] },
                                        { $eq: ['$users_id', '$$letUsers_id'] },
                                      ]
                                    },
                                  }
                                },
                                
                                
                                { $project:
                                  {
                                    name: '$nameObj.value',
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
                        
                        
                        { $project:
                          {
                            _id: 0,
                            localesArr: 1,
                            cardPlayersObj: 1,
                          }
                        }
                        
                        
                      ],
                      as: 'replyToObj'
                    }
                },
                
                {
                  $unwind: {
                    path: '$replyToObj',
                    preserveNullAndEmptyArrays: true,
                  }
                },
                
                
                { $project:
                  {
                    imagesAndVideos_id: 0,
                    __v: 0,
                  }
                },
                
                
                { '$sort': { 'createdDate': 1 } },
                { $skip: (replyPage - 1) * intReplyLimit },
                { $limit: intReplyLimit },
                
                
              ],
              as: 'recruitmentRepliesArr'
            }
        },
        
        
        { $project:
          {
            imagesAndVideos_id: 0,
            __v: 0,
          }
        },
        
        
        { '$sort': { 'updatedDate': -1 } },
        { $skip: (commentPage - 1) * intCommentLimit },
        { $limit: intCommentLimit },
        
        
      ]).exec();
      
      
      
      // console.log(chalk`
      //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
      // `);
      
      // console.log(`
      //   ----- docArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(docArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // --------------------------------------------------
      //   配列を結合する
      // --------------------------------------------------
      
      if (docArr.length > 0) {
        resultArr = resultArr.concat(docArr);
      }
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const formattedObj = formatRecruitmentCommentsAndRepliesArr({
      
      req,
      localeObj,
      loginUsers_id,
      arr: resultArr,
      recruitmentThreadsObj,
      commentPage,
      replyPage,
      
    });
    
    
    
    
    
  
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/recruitment-comments/model.js - findCommentsAndReplies
    // `);
    
    // console.log(chalk`
    //   commentPage: {green ${commentPage}}
    //   commentLimit: {green ${commentLimit}}
    //   replyPage: {green ${replyPage}}
    //   replyLimit: {green ${replyLimit}}
    // `);
    
    // console.log(`
    //   ----- recruitmentThreads_idsArr -----\n
    //   ${util.inspect(recruitmentThreads_idsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- resultArr -----\n
    //   ${util.inspect(resultArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- formattedObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(formattedObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return formattedObj;
    
    
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
* @param {Object} recruitmentCommentsConditionObj - DB recruitment-comments 検索条件
* @param {Object} recruitmentCommentsSaveObj - DB recruitment-comments 保存データ
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
  recruitmentCommentsConditionObj,
  recruitmentCommentsSaveObj,
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
    //   - recruitment-comments
    // ---------------------------------------------
    
    await Schema.updateOne(recruitmentCommentsConditionObj, recruitmentCommentsSaveObj, { session, upsert: true });
    
    
    // ---------------------------------------------
    //   - recruitment-threads
    // ---------------------------------------------
    
    await SchemaRecruitmentThreads.updateOne(recruitmentThreadsConditionObj, recruitmentThreadsSaveObj, { session, upsert: true });
    
    
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
    //   /app/@database/recruitment-comments/model.js - transactionForUpsert
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
    //   ----- recruitmentCommentsConditionObj -----\n
    //   ${util.inspect(recruitmentCommentsConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- recruitmentCommentsSaveObj -----\n
    //   ${util.inspect(recruitmentCommentsSaveObj, { colors: true, depth: null })}\n
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
  
  findCommentsAndReplies,
  
  transactionForUpsert,
  
};