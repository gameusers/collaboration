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
const lodashMerge = require('lodash/merge');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const Schema = require('./schema');
const SchemaForumThreads = require('../forum-threads/schema');
const SchemaGameCommunities = require('../game-communities/schema');
const SchemaUserCommunities = require('../user-communities/schema');
const SchemaImagesAndVideos = require('../images-and-videos/schema');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { CustomError } = require('../../@modules/error/custom');
const { verifyAuthority } = require('../../@modules/authority');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatImagesAndVideosObj, formatImagesAndVideosArr } = require('../images-and-videos/format');




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
 * コメントと返信を取得する - forumThreads_idsArr で検索
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {Array} forumThreads_idArr - DB forum-threads _id / _idが入っている配列
 * @param {Object} forumThreadsObj - スレッド情報の入ったオブジェクト / カウントの取得に使う
 * @param {number} commentPage - コメントのページ
 * @param {number} commentLimit - コメントのリミット
 * @param {number} replyPage - 返信のページ
 * @param {number} replyLimit - 返信のリミット
 * @return {Array} 取得データ
 */
const findCommentsAndRepliesByForumThreads_idsArr = async ({
  
  req,
  localeObj,
  loginUsers_id,
  forumThreads_idsArr,
  forumThreadsObj,
  commentPage = 1,
  commentLimit = process.env.FORUM_COMMENT_LIMIT,
  replyPage = 1,
  replyLimit = process.env.FORUM_REPLY_LIMIT,
  
}) => {
  
  // console.log(chalk`
  //   ----- findForForumCommentsAndReplies -----
  //   commentPage: {green ${commentPage}}
  //   commentLimit: {green ${commentLimit}}
  //   replyPage: {green ${replyPage}}
  //   replyLimit: {green ${replyLimit}}
  // `);
  
  try {
    
    
    // --------------------------------------------------
    //   Forum Comments & Replies データ取得
    //   $in, sort, limit を使って最新のコメントを取得すると、古いコメントが limit で削られてしまうため
    //   あるスレッドでは古いコメントが表示されないという事態になってしまう
    //   そのため for のループで検索している　ただ良くない書き方だと思うので可能なら改善した方がいい
    // --------------------------------------------------
    
    let resultArr = [];
    
    const intCommentLimit = parseInt(commentLimit, 10);
    const intReplyLimit = parseInt(replyLimit, 10);
    
    
    for (let value of forumThreads_idsArr.values()) {
      
      
      const docArr = await Schema.aggregate([
        
        
        // --------------------------------------------------
        //   コメント
        // --------------------------------------------------
        
        // forumComments_id: '' この場合は親のコメントがないので、返信ではなくコメントということ
        {
          $match: {
            $and: [
              { forumThreads_id: value },
              { forumComments_id: '' },
            ]
          },
        },
        
        
        // プレイヤーカードを取得（名前＆ステータス＆サムネイル用）
        {
          $lookup:
            {
              from: 'card-players',
              let: { forumCommentsUsers_id: '$users_id' },
              pipeline: [
                { $match:
                  { $expr:
                    { $and:
                      [
                        { $eq: ['$language', localeObj.language] },
                        { $eq: ['$users_id', '$$forumCommentsUsers_id'] },
                      ]
                    },
                  }
                },
                
                
                // サムネイルを取得
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
                
                
                { $project:
                  {
                    // _id: 0,
                    // users_id: 1,
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
        
        
        // ユーザーを取得（アクセス日時＆経験値＆プレイヤーID用）
        {
          $lookup:
            {
              from: 'users',
              let: { forumCommentsUsers_id: '$users_id' },
              pipeline: [
                { $match:
                  { $expr:
                    { $eq: ['$_id', '$$forumCommentsUsers_id'] },
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
          $unwind: {
            path: '$usersObj',
            preserveNullAndEmptyArrays: true,
          }
        },
        
        
        // 画像と動画を取得
        {
          $lookup:
            {
              from: 'images-and-videos',
              let: { forumCommentsImagesAndVideos_id: '$imagesAndVideos_id' },
              pipeline: [
                { $match:
                  { $expr:
                    { $eq: ['$_id', '$$forumCommentsImagesAndVideos_id'] },
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
        
        
        
        
        // --------------------------------------------------
        //   返信（内部の処理は上記コメントと同じ）
        // --------------------------------------------------
        
        {
          $lookup:
            {
              from: 'forum-comments',
              let: { forumComments_id: '$_id' },
              pipeline: [
                
                { $match:
                  { $expr:
                    { $eq: ['$forumComments_id', '$$forumComments_id'] }
                  }
                },
                
                
                // プレイヤーカードを取得（名前＆ステータス＆サムネイル用）
                {
                  $lookup:
                    {
                      from: 'card-players',
                      let: { forumRepliesUsers_id: '$users_id' },
                      pipeline: [
                        { $match:
                          { $expr:
                            { $and:
                              [
                                { $eq: ['$language', localeObj.language] },
                                { $eq: ['$users_id', '$$forumRepliesUsers_id'] },
                              ]
                            },
                          }
                        },
                        
                        
                        // サムネイルを取得
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
                        
                        
                        { $project:
                          {
                            // _id: 0,
                            // users_id: 1,
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
                
                
                // ユーザーを取得（アクセス日時＆経験値＆プレイヤーID用）
                {
                  $lookup:
                    {
                      from: 'users',
                      let: { forumRepliesUsers_id: '$users_id' },
                      pipeline: [
                        { $match:
                          { $expr:
                            { $eq: ['$_id', '$$forumRepliesUsers_id'] },
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
                  $unwind: {
                    path: '$usersObj',
                    preserveNullAndEmptyArrays: true,
                  }
                },
                
                
                // 画像と動画を取得
                {
                  $lookup:
                    {
                      from: 'images-and-videos',
                      let: { forumRepliesImagesAndVideos_id: '$imagesAndVideos_id' },
                      pipeline: [
                        { $match:
                          { $expr:
                            { $eq: ['$_id', '$$forumRepliesImagesAndVideos_id'] },
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
                
                
                
                // replyTo 用のデータ取得
                {
                  $lookup:
                    {
                      from: 'forum-comments',
                      let: { forumRepliesReplyToForumComments_id: '$replyToForumComments_id' },
                      pipeline: [
                        
                        
                        { $match:
                          { $expr:
                            { $eq: ['$_id', '$$forumRepliesReplyToForumComments_id'] },
                          }
                        },
                        
                        
                        // プレイヤーカードを取得（名前＆ステータス＆サムネイル用）
                        {
                          $lookup:
                            {
                              from: 'card-players',
                              let: { forumRepliesReplyToUsers_id: '$users_id' },
                              pipeline: [
                                { $match:
                                  { $expr:
                                    { $and:
                                      [
                                        { $eq: ['$language', localeObj.language] },
                                        { $eq: ['$users_id', '$$forumRepliesReplyToUsers_id'] },
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
                    // createdDate: 0,
                    imagesAndVideos_id: 0,
                    __v: 0,
                  }
                },
                
                
                { '$sort': { 'createdDate': 1 } },
                { $skip: (replyPage - 1) * intReplyLimit },
                { $limit: parseInt(intReplyLimit, 10) },
                
                
              ],
              as: 'forumRepliesArr'
            }
        },
        
        
        { $project:
          {
            // createdDate: 0,
            imagesAndVideos_id: 0,
            __v: 0,
          }
        },
        
        
        // { '$sort': { 'updatedDate': -1 } },
        // { $skip: (commentPage - 1) * 1 },
        // { $limit: parseInt(1, 10) },
        
        { '$sort': { 'updatedDate': -1 } },
        { $skip: (commentPage - 1) * intCommentLimit },
        { $limit: parseInt(intCommentLimit, 10) },
        
        
      ]).exec();
      
      
      
      // console.log(chalk`
      //   value: {green ${value}}
      // `);
      
      // console.log(chalk`
      //   commentPage2: {green ${commentPage}}
      //   commentLimit2: {green ${commentLimit}}
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
    
    const formattedObj = formatVer2({
      
      req,
      localeObj,
      loginUsers_id,
      arr: resultArr,
      forumThreadsObj,
      commentPage,
      replyPage,
      
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
 * 返信を取得する - forumComments_id で検索
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} forumComments_id - DB forum-comments _id / コメントのID
 * @param {number} commentPage - コメントのページ
 * @param {number} commentLimit - コメントのリミット
 * @param {number} replyPage - 返信のページ
 * @param {number} replyLimit - 返信のリミット
 * @return {Array} 取得データ
 */
const findRepliesByForumComments_idArr = async ({
  
  req,
  localeObj,
  loginUsers_id,
  gameCommunities_id,
  userCommunities_id,
  forumComments_idArr = [],
  commentPage = 1,
  commentLimit = process.env.FORUM_COMMENT_LIMIT,
  replyPage = 1,
  replyLimit = process.env.FORUM_REPLY_LIMIT,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   parse
    // --------------------------------------------------
    
    const intCommentLimit = forumComments_idArr.length;
    const intReplyLimit = parseInt(replyLimit, 10);
    
    // const intCommentLimit = parseInt(commentLimit, 10);
    // const intReplyLimit = parseInt(replyLimit, 10);
    
    
    
    
    // --------------------------------------------------
    //   Match Condition Array
    // --------------------------------------------------
    
    let matchConditionArr = [];
    
    
    // --------------------------------------------------
    //   Game Community
    // --------------------------------------------------
    
    if (gameCommunities_id) {
      
      matchConditionArr = [
        {
          $match: {
            $and: [
              { _id: { $in: forumComments_idArr } },
              { gameCommunities_id },
            ]
          },
        },
      ];
      
      
    // --------------------------------------------------
    //   User Community
    // --------------------------------------------------
    
    } else if (userCommunities_id) {
    
      matchConditionArr = [
        {
          $match: {
            $and: [
              { _id: { $in: forumComments_idArr } },
              { userCommunities_id },
            ]
          },
        },
      ];
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Aggregation
    // --------------------------------------------------
    
    const docArr = await Schema.aggregate([
      
      
      // --------------------------------------------------
      //   matchConditionArr
      // --------------------------------------------------
      
      ...matchConditionArr,
      
      
      
      // {
      //   $match: {
      //     $and: [
      //       { _id: { $in: forumComments_idArr } },
      //       { userCommunities_id },
      //     ]
      //   },
      // },
      
      
      // --------------------------------------------------
      //   card-players - プレイヤーカードを取得（名前＆ステータス＆サムネイル用）
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'card-players',
            let: { forumCommentsUsers_id: '$users_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$language', localeObj.language] },
                      { $eq: ['$users_id', '$$forumCommentsUsers_id'] },
                    ]
                  },
                }
              },
              
              
              // サムネイルを取得
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
      //   users - ユーザーを取得（アクセス日時＆経験値＆プレイヤーID用）
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'users',
            let: { forumCommentsUsers_id: '$users_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$forumCommentsUsers_id'] },
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
        $unwind: {
          path: '$usersObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // --------------------------------------------------
      //   images-and-videos - 画像と動画を取得
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { forumCommentsImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$forumCommentsImagesAndVideos_id'] },
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
      //   返信（内部の処理は上記コメントと同じ）
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'forum-comments',
            let: { forumComments_id: '$_id' },
            pipeline: [
              
              { $match:
                { $expr:
                  { $eq: ['$forumComments_id', '$$forumComments_id'] }
                }
              },
              
              
              // プレイヤーカードを取得（名前＆ステータス＆サムネイル用）
              {
                $lookup:
                  {
                    from: 'card-players',
                    let: { forumRepliesUsers_id: '$users_id' },
                    pipeline: [
                      { $match:
                        { $expr:
                          { $and:
                            [
                              { $eq: ['$language', localeObj.language] },
                              { $eq: ['$users_id', '$$forumRepliesUsers_id'] },
                            ]
                          },
                        }
                      },
                      
                      
                      // サムネイルを取得
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
              
              
              // ユーザーを取得（アクセス日時＆経験値＆プレイヤーID用）
              {
                $lookup:
                  {
                    from: 'users',
                    let: { forumRepliesUsers_id: '$users_id' },
                    pipeline: [
                      { $match:
                        { $expr:
                          { $eq: ['$_id', '$$forumRepliesUsers_id'] },
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
                $unwind: {
                  path: '$usersObj',
                  preserveNullAndEmptyArrays: true,
                }
              },
              
              
              // 画像と動画を取得
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { forumRepliesImagesAndVideos_id: '$imagesAndVideos_id' },
                    pipeline: [
                      { $match:
                        { $expr:
                          { $eq: ['$_id', '$$forumRepliesImagesAndVideos_id'] },
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
              
              
              
              
              // replyTo 用のデータ取得
              {
                $lookup:
                  {
                    from: 'forum-comments',
                    let: { forumRepliesReplyToForumComments_id: '$replyToForumComments_id' },
                    pipeline: [
                      
                      
                      { $match:
                        { $expr:
                          { $eq: ['$_id', '$$forumRepliesReplyToForumComments_id'] },
                        }
                      },
                      
                      
                      // プレイヤーカードを取得（名前＆ステータス＆サムネイル用）
                      {
                        $lookup:
                          {
                            from: 'card-players',
                            let: { forumRepliesReplyToUsers_id: '$users_id' },
                            pipeline: [
                              { $match:
                                { $expr:
                                  { $and:
                                    [
                                      { $eq: ['$language', localeObj.language] },
                                      { $eq: ['$users_id', '$$forumRepliesReplyToUsers_id'] },
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
                  // createdDate: 0,
                  imagesAndVideos_id: 0,
                  __v: 0,
                }
              },
              
              
              { '$sort': { 'createdDate': 1 } },
              { $skip: (replyPage - 1) * intReplyLimit },
              { $limit: intReplyLimit },
              
              
            ],
            as: 'forumRepliesArr'
          }
      },
      
      
      { $project:
        {
          // createdDate: 0,
          imagesAndVideos_id: 0,
          __v: 0,
        }
      },
      
      
      { '$sort': { 'updatedDate': -1 } },
      { $skip: (commentPage - 1) * intCommentLimit },
      { $limit: intCommentLimit },
      
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const formattedObj = formatVer2({
      
      req,
      localeObj,
      loginUsers_id,
      arr: docArr,
      forumThreadsObj: {},
      commentPage,
      replyPage,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/forum-comments/model.js - findRepliesByForumComments_idArr
    // `);
    
    // console.log(chalk`
    //   userCommunities_id: {green ${userCommunities_id}}
    //   commentPage: {green ${commentPage}}
    //   commentLimit: {green ${commentLimit}}
    //   replyPage: {green ${replyPage}}
    //   replyLimit: {green ${replyLimit}}
    // `);
    
    // console.log(`
    //   ----- forumComments_idArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumComments_idArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- docArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docArr)), { colors: true, depth: null })}\n
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
    
    return lodashGet(formattedObj, ['forumRepliesObj'], {});
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};




/**
* DBから取得した情報をフォーマットする
* @param {Object} req - リクエスト
* @param {Object} localeObj - ロケール
* @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
* @param {Array} arr - コメントと返信情報の入った配列
* @param {Object} forumThreadsObj - スレッド情報の入ったオブジェクト / カウントの取得に使う
* @param {number} commentPage - コメントのページ
* @param {number} replyPage - 返信のページ
* @return {Array} フォーマット後のデータ
*/
const formatVer2 = ({ req, localeObj, loginUsers_id, arr, forumThreadsObj, commentPage, replyPage }) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  const forumCommentsObj = {
    dataObj: {},
  };
  
  const forumRepliesObj = {
    dataObj: {},
  };
  
  
  // --------------------------------------------------
  //   コメントと返信に分離
  // --------------------------------------------------
  
  let commentsArr = [];
  let repliesArr = [];
  
  
  for (let valueObj of arr.values()) {
   
    if (lodashHas(valueObj, ['forumRepliesArr'])) {
      
      const tempArr = lodashGet(valueObj, ['forumRepliesArr'], []);
      repliesArr = repliesArr.concat(tempArr);
      
    }
    
    delete valueObj.forumRepliesArr;
    
    commentsArr.push(valueObj);
    
  }
  
  
  // console.log(`
  //   ----- commentsArr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(commentsArr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(`
  //   ----- repliesArr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(repliesArr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(`
  //   ----- arr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  // --------------------------------------------------
  //   function
  // --------------------------------------------------
  
  const loopFormat = ({ arr, ISO8601 }) => {
   
    const returnObj = {};
    
    
    for (let valueObj of arr.values()) {
      
      
      // console.log(`
      //   ----- valueObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(valueObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // --------------------------------------------------
      //   Deep Copy
      // --------------------------------------------------
      
      const clonedObj = lodashCloneDeep(valueObj);
      
      
      // --------------------------------------------------
      //   画像と動画の処理
      // --------------------------------------------------
      
      const formattedObj = formatImagesAndVideosObj({ localeObj, obj: valueObj.imagesAndVideosObj });
      
      if (formattedObj) {
        
        clonedObj.imagesAndVideosObj = formattedObj;
        
      } else {
        
        delete clonedObj.imagesAndVideosObj;
        
      }
      
      
      // --------------------------------------------------
      //   画像と動画の処理 - ユーザーサムネイル
      // --------------------------------------------------
      
      if (lodashHas(valueObj, ['cardPlayersObj', 'imagesAndVideosThumbnailObj'])) {
        
        const imagesAndVideosThumbnailObj = lodashGet(valueObj, ['cardPlayersObj', 'imagesAndVideosThumbnailObj'], {});
        
        // console.log(`
        //   ----- imagesAndVideosThumbnailObj -----\n
        //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosThumbnailObj)), { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        const formattedThumbnailObj = formatImagesAndVideosObj({ localeObj, obj: imagesAndVideosThumbnailObj });
        
        if (formattedThumbnailObj) {
          
          lodashSet(clonedObj, ['cardPlayersObj', 'imagesAndVideosThumbnailObj'], formattedThumbnailObj);
          
        } else {
          
          delete clonedObj.cardPlayersObj.imagesAndVideosThumbnailObj;
          
        }
        
      }
      
      
      
      
      // --------------------------------------------------
      //   編集権限
      // --------------------------------------------------
      
      clonedObj.editable = verifyAuthority({
        req,
        users_id: valueObj.users_id,
        loginUsers_id,
        ISO8601: valueObj.createdDate,
        _id: valueObj._id
      });
      
      
      
      
      // --------------------------------------------------
      //   Name & Description
      // --------------------------------------------------
      
      let filteredArr = valueObj.localesArr.filter((filterObj) => {
        return filterObj.language === localeObj.language;
      });
      
      
      if (lodashHas(filteredArr, [0])) {
        
        clonedObj.name = lodashGet(filteredArr, [0, 'name'], '');
        clonedObj.comment = lodashGet(filteredArr, [0, 'comment'], '');
        
      } else {
        
        clonedObj.name = lodashGet(valueObj, ['localesArr', 0, 'name'], '');
        clonedObj.comment = lodashGet(valueObj, ['localesArr', 0, 'comment'], '');
        
      }
      
      
      
      
      // --------------------------------------------------
      //   Reply to: Name
      // --------------------------------------------------
      
      if (valueObj.replyToObj) {
        
        // console.log(`\n---------- valueObj ----------\n`);
        // console.dir(valueObj);
        // console.log(`\n-----------------------------------\n`);
        
        clonedObj.replyToName = lodashGet(valueObj, ['replyToObj', 'cardPlayersObj', 'name'], '');
        
        if (!clonedObj.replyToName) {
          
          const localesArr = lodashGet(valueObj, ['replyToObj', 'localesArr'], []);
          
          filteredArr = localesArr.filter((filterObj) => {
            return filterObj.language === localeObj.language;
          });
          
          
          if (lodashHas(filteredArr, [0])) {
            
            clonedObj.replyToName = lodashGet(filteredArr, [0, 'name'], '');
            
          } else {
            
            clonedObj.replyToName = lodashGet(localesArr, [0, 'name'], '');
            
          }
          
        }
        
        // console.log(chalk`
        //   valueObj.replyToForumComments_id: {green ${valueObj.replyToForumComments_id}}
        //   clonedObj.replyToName: {green ${clonedObj.replyToName}}
        // `);
        
      }
      
      
      
      
      
      // console.log(`
      //   ----- filteredArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(filteredArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      // --------------------------------------------------
      //   匿名の場合の処理 - Card Players 
      // --------------------------------------------------
      
      if (valueObj.anonymity) {
        
        delete clonedObj.cardPlayersObj;
        delete clonedObj.usersObj;
        
      } else if (lodashHas(valueObj, ['cardPlayersObj', 'imagesAndVideosObj', 'thumbnailArr'])) {
        
        
        // --------------------------------------------------
        //   サムネイル画像の処理 - Card Players
        // --------------------------------------------------
        
        const thumbnailArr = lodashGet(valueObj, ['cardPlayersObj', 'imagesAndVideosObj', 'thumbnailArr'], []);
        lodashSet(clonedObj, ['cardPlayersObj', 'imagesAndVideosObj', 'thumbnailArr'], formatImagesAndVideosArr({ arr: thumbnailArr }));
        
        
      }
      
      
      
      
      // --------------------------------------------------
      //   不要な項目を削除する
      // --------------------------------------------------
      
      delete clonedObj._id;
      delete clonedObj.createdDate;
      delete clonedObj.users_id;
      delete clonedObj.localesArr;
      delete clonedObj.anonymity;
      delete clonedObj.forumRepliesArr;
      delete clonedObj.replyToObj;
      delete clonedObj.ip;
      delete clonedObj.userAgent;
      delete clonedObj.__v;
      
      // console.log(`\n---------- clonedObj ----------\n`);
      // console.dir(clonedObj);
      // console.log(`\n-----------------------------------\n`);
      
      
      
      
      // --------------------------------------------------
      //   オブジェクトに追加 - dataObj用
      // --------------------------------------------------
      
      returnObj[valueObj._id] = clonedObj;
      
      
      
      
      // --------------------------------------------------
      //   forumCommentsObj & forumRepliesPageArr 作成
      // --------------------------------------------------
      
      const forumThreads_id = valueObj.forumThreads_id;
      const forumComments_id = valueObj.forumComments_id;
      
      
      if (forumComments_id) {
        
        const replyCount = lodashGet(formattedCommentsObj, [forumComments_id, 'replies'], 0);
        
        const forumRepliesPageArr = lodashGet(forumRepliesObj, [forumComments_id, `page${replyPage}Obj`, 'arr'], []);
        forumRepliesPageArr.push(valueObj._id);
        
        forumRepliesObj[forumComments_id] = {
          page: replyPage,
          count : replyCount,
        };
        
        forumRepliesObj[forumComments_id][`page${replyPage}Obj`] = {
          loadedDate: ISO8601,
          arr: forumRepliesPageArr,
        };
        
      } else {
        
        const commentCount = lodashGet(forumThreadsObj, ['dataObj', forumThreads_id, 'comments'], 0);
        
        
        const forumCommentsPageArr = lodashGet(forumCommentsObj, [forumThreads_id, `page${commentPage}Obj`, 'arr'], []);
        forumCommentsPageArr.push(valueObj._id);
        
        forumCommentsObj[forumThreads_id] = {
          page: commentPage,
          count : commentCount,
        };
        
        forumCommentsObj[forumThreads_id][`page${commentPage}Obj`] = {
          loadedDate: ISO8601,
          arr: forumCommentsPageArr,
        };
        
      }
      
      
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return returnObj;
    
  
  };
  
  
  
  
  // --------------------------------------------------
  //   完成
  // --------------------------------------------------
  
  const ISO8601 = moment().utc().toISOString();
  
  const formattedCommentsObj = loopFormat({ arr: commentsArr, ISO8601 });
  const formattedRepliesObj = loopFormat({ arr: repliesArr, ISO8601 });
  
  forumCommentsObj.dataObj = formattedCommentsObj;
  forumRepliesObj.dataObj = formattedRepliesObj;
  
  
  
  
  // console.log(`
  //   ----- formattedCommentsObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(formattedCommentsObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(`
  //   ----- formattedRepliesObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(formattedRepliesObj)), { colors: true, depth: null })}\n
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
    forumCommentsObj,
    forumRepliesObj,
  };
  
  
};




/**
 * コメントと返信を取得する - forumThreads_idsArr で検索
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {Array} forumThreads_idArr - DB forum-threads _id / _idが入っている配列
 * @param {Object} forumThreadsObj - スレッド情報の入ったオブジェクト / カウントの取得に使う
 * @param {number} commentPage - コメントのページ
 * @param {number} commentLimit - コメントのリミット
 * @param {number} replyPage - 返信のページ
 * @param {number} replyLimit - 返信のリミット
 * @return {Array} 取得データ
 */
const getPage = async ({
  
  req,
  localeObj,
  loginUsers_id,
  forumThreads_id,
  forumComments_id,
  forumReplies_id,
  commentLimit,
  replyLimit,
  
}) => {
  
  // console.log(chalk`
  //   ----- findForForumCommentsAndReplies -----
  //   commentPage: {green ${commentPage}}
  //   commentLimit: {green ${commentLimit}}
  //   replyPage: {green ${replyPage}}
  //   replyLimit: {green ${replyLimit}}
  // `);
  
  try {
    
    
    // ------------------------------------------------------------
    //   コメントのページ番号を取得する
    // ------------------------------------------------------------
    
    // --------------------------------------------------
    //   _idをすべて取得する
    // --------------------------------------------------
    
    const comment_idsArr = await Schema.aggregate([
      
      
      // --------------------------------------------------
      //   コメント
      // --------------------------------------------------
      
      // forumComments_id: '' この場合は親のコメントがないので、返信ではなくコメントということ
      {
        $match: {
          $and: [
            { forumThreads_id },
            { forumComments_id: '' },
          ]
        },
      },
      
      
      { '$sort': { 'updatedDate': -1 } },
      
      
      { $project:
        {
          _id: 1,
        }
      },
      
      
    ]).exec();
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const commentIndex = comment_idsArr.findIndex((valueObj) => {
      return valueObj._id === forumComments_id;
    });
    
    let commentPage = Math.ceil(commentIndex / commentLimit) + 1;
    
    if (commentPage === 0) {
      commentPage = 1;
    }
    
    
    
    // ------------------------------------------------------------
    //   返信のページ番号を取得する
    // ------------------------------------------------------------
    
    let replyPage = 1;
    
    if (forumReplies_id) {
      
      
      // --------------------------------------------------
      //   _idをすべて取得する
      // --------------------------------------------------
      
      const reply_idsArr = await Schema.aggregate([
        
        
        // --------------------------------------------------
        //   コメント
        // --------------------------------------------------
        
        {
          $match: {
            $and: [
              { forumThreads_id },
              { forumComments_id },
            ]
          },
        },
        
        
        { '$sort': { 'createdDate': 1 } },
        
        
        { $project:
          {
            _id: 1,
          }
        },
        
        
      ]).exec();
      
      
      // --------------------------------------------------
      //   Format
      // --------------------------------------------------
      
      const replyIndex = reply_idsArr.findIndex((valueObj) => {
        return valueObj._id === forumReplies_id;
      });
      
      replyPage = Math.ceil(replyIndex / replyLimit) + 1;
      
      if (replyPage === 0) {
        replyPage = 1;
      }
      
      // console.log(chalk`
      //   replyIndex: {green ${replyIndex}}
      //   replyPage: {green ${replyPage}}
      // `);
      
      // console.log(`
      //   ----- reply_idsArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(reply_idsArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
    }
    
    
    
    
    
    
    
    
    // console.log(chalk`
    //   Math.ceil(10 / 1): {green ${Math.ceil(10 / 1)}}
    //   Math.ceil(10 / 2): {green ${Math.ceil(10 / 2)}}
    //   Math.ceil(10 / 3): {green ${Math.ceil(10 / 3)}}
    //   Math.ceil(10 / 4): {green ${Math.ceil(10 / 4)}}
    //   Math.ceil(10 / 5): {green ${Math.ceil(10 / 5)}}
    //   Math.ceil(10 / 6): {green ${Math.ceil(10 / 6)}}
    //   Math.ceil(10 / 7): {green ${Math.ceil(10 / 7)}}
    //   Math.ceil(10 / 8): {green ${Math.ceil(10 / 8)}}
    //   Math.ceil(10 / 9): {green ${Math.ceil(10 / 9)}}
    //   Math.ceil(10 / 10): {green ${Math.ceil(10 / 10)}}
    //   Math.ceil(10 / 11): {green ${Math.ceil(10 / 11)}}
    // `);
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   forumThreads_id: {green ${forumThreads_id}}
    //   forumComments_id: {green ${forumComments_id}}
    //   forumReplies_id: {green ${forumReplies_id}}
    //   commentLimit: {green ${commentLimit}}
    //   replyLimit: {green ${replyLimit}}
    // `);
    
    // console.log(chalk`
    //   commentIndex: {green ${commentIndex}}
    //   commentPage: {green ${commentPage}}
    // `);
    
    // console.log(`
    //   ----- comment_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(comment_idsArr)), { colors: true, depth: null })}\n
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
    
    return {
      commentPage,
      replyPage,
    };
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};








/**
 * コメント＆返信データを取得する　編集用
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} forumComments_id - DB forum-comments _id / コメントのID
 * @return {Array} 取得データ
 */
const findForEdit = async ({
  
  req,
  localeObj,
  loginUsers_id,
  forumComments_id,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Aggregate
    // --------------------------------------------------
    
    const resultArr = await Schema.aggregate([
      
      
      // スレッドを取得
      {
        $match : { _id: forumComments_id }
      },
      
      
      // 画像と動画を取得
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { forumCommentsImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$forumCommentsImagesAndVideos_id'] },
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
      
      
      // { $project:
      //   {
      //     // createdDate: 0,
      //     imagesAndVideos_id: 0,
      //     __v: 0,
      //   }
      // },
      
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   配列が空の場合は処理停止
    // --------------------------------------------------
    
    if (resultArr.length === 0) {
      throw new CustomError({ level: 'error', errorsArr: [{ code: 'hSZgl_T02', messageID: 'cvS0qSAlE' }] });
    }
    
    
    // --------------------------------------------------
    //   編集権限がない場合は処理停止
    // --------------------------------------------------
    
    const editable = verifyAuthority({
      
      req,
      users_id: lodashGet(resultArr, [0, 'users_id'], ''),
      loginUsers_id,
      ISO8601: lodashGet(resultArr, [0, 'createdDate'], ''),
      _id: lodashGet(resultArr, [0, '_id'], ''),
      
    });
    
    // console.log(chalk`
    //   editable: {green ${editable}}
    // `);
    
    if (!editable) {
      throw new CustomError({ level: 'error', errorsArr: [{ code: 'IRZhSgQnt', messageID: 'DSRlEoL29' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const _id = lodashGet(resultArr, [0, '_id'], '');
    const imagesAndVideosObj = lodashGet(resultArr, [0, 'imagesAndVideosObj'], {});
    let name = '';
    let comment = '';
    
    
    // --------------------------------------------------
    //   Name & Comment
    // --------------------------------------------------
    
    const filteredArr = resultArr.filter((filterObj) => {
      return filterObj.language === localeObj.language;
    });
    
    
    if (lodashHas(filteredArr, [0])) {
      
      name = lodashGet(filteredArr, [0, 'name'], '');
      comment = lodashGet(filteredArr, [0, 'comment'], '');
      
    } else {
      
      name = lodashGet(resultArr, [0, 'localesArr', 0, 'name'], '');
      comment = lodashGet(resultArr, [0, 'localesArr', 0, 'comment'], '');
      
    }
    
    
    
    
    // --------------------------------------------------
    //   returnObj
    // --------------------------------------------------
    
    const returnObj = {
      
      _id,
      name,
      comment,
      imagesAndVideosObj,
      
    };
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/forum-comments/model.js - findForEdit
    // `);
    
    // console.log(chalk`
    //   forumComments_id: {green ${forumComments_id}}
    // `);
    
    // console.log(`
    //   ----- resultArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
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
 * コメント＆返信データを取得する　削除用
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} forumComments_id - DB forum-comments _id / コメントのID
 * @return {Array} 取得データ
 */
const findForDeleteComment = async ({
  
  req,
  localeObj,
  loginUsers_id,
  forumComments_id,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Aggregate
    // --------------------------------------------------
    
    const resultArr = await Schema.aggregate([
      
      
      // コメントを取得
      {
        $match:
          { $or:
            [
              { _id: forumComments_id },
              { forumComments_id },
            ]
          },
      },
      
      
      // 画像と動画を取得
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { forumCommentsImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$forumCommentsImagesAndVideos_id'] },
                }
              },
              { $project:
                {
                  images: 1,
                  videos: 1,
                }
              },
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
      
      
      { $project:
        {
          createdDate: 1,
          users_id: 1,
          replies: 1,
          imagesAndVideos_id: 1,
          imagesAndVideosObj: 1,
        }
      },
      
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   配列が空の場合は処理停止
    // --------------------------------------------------
    
    if (resultArr.length === 0) {
      throw new CustomError({ level: 'error', errorsArr: [{ code: 'jiSBn7Gb-', messageID: 'cvS0qSAlE' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   編集権限がない場合は処理停止
    // --------------------------------------------------
    
    const editable = verifyAuthority({
      req,
      users_id: lodashGet(resultArr, [0, 'users_id'], ''),
      loginUsers_id,
      ISO8601: lodashGet(resultArr, [0, 'createdDate'], ''),
      _id: lodashGet(resultArr, [0, '_id'], ''),
    });
    
    if (!editable) {
      throw new CustomError({ level: 'error', errorsArr: [{ code: 'IRZhSgQnt', messageID: 'DSRlEoL29' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    let replies = 0;
    let imagesAndVideos_idsArr = [];
    let images = 0;
    let videos = 0;
    
    for (let valueObj of resultArr.values()) {
      
      if (valueObj.imagesAndVideos_id) {
        imagesAndVideos_idsArr.push(valueObj.imagesAndVideos_id);
      }
      
      const reply = lodashGet(valueObj, ['replies'], 0);
      const image = lodashGet(valueObj, ['imagesAndVideosObj', 'images'], 0);
      const video = lodashGet(valueObj, ['imagesAndVideosObj', 'videos'], 0);
      
      replies -= reply;
      images -= image;
      videos -= video;
      
    }
    
    const returnObj = {
      replies,
      imagesAndVideos_idsArr,
      images,
      videos,
    };
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   forumComments_id: {green ${forumComments_id}}
    //   images: {green ${images}}
    //   videos: {green ${videos}}
    // `);
    
    // console.log(`
    //   ----- imagesAndVideos_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideos_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- resultArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
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
 * 返信データを取得する　削除用
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
 * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
 * @param {string} forumThreads_id - DB forum-threads _id / スレッドのID
 * @param {string} forumComments_id - DB forum-comments _id / コメントのID
 * @param {string} forumReplies_id - DB forum-comments _id / 返信のID
 * @return {Array} 取得データ
 */
const findForDeleteReply = async ({
  
  req,
  localeObj,
  loginUsers_id,
  gameCommunities_id,
  userCommunities_id,
  forumThreads_id,
  forumComments_id,
  forumReplies_id,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Match Condition Array
    // --------------------------------------------------
    
    let matchConditionArr = [];
    
    
    // --------------------------------------------------
    //   Game Community
    // --------------------------------------------------
    
    if (gameCommunities_id) {
      
      matchConditionArr = [
        {
          $match: {
            _id: forumReplies_id,
            gameCommunities_id,
            forumThreads_id,
            forumComments_id,
          },
        },
      ];
      
      
    // --------------------------------------------------
    //   User Community
    // --------------------------------------------------
    
    } else if (userCommunities_id) {
    
      matchConditionArr = [
        {
          $match: {
            _id: forumReplies_id,
            userCommunities_id,
            forumThreads_id,
            forumComments_id,
          },
        },
      ];
      
    }
    
    
    
    // --------------------------------------------------
    //   Aggregate
    // --------------------------------------------------
    
    const resultArr = await Schema.aggregate([
      
      
      // --------------------------------------------------
      //   matchConditionArr
      // --------------------------------------------------
      
      ...matchConditionArr,
      
      
      // --------------------------------------------------
      //   images-and-videos - 画像と動画を取得
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { forumCommentsImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$forumCommentsImagesAndVideos_id'] },
                }
              },
              { $project:
                {
                  images: 1,
                  videos: 1,
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
      
      
      { $project:
        {
          createdDate: 1,
          users_id: 1,
          imagesAndVideos_id: 1,
          imagesAndVideosObj: 1,
        }
      },
      
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   配列が空の場合は処理停止
    // --------------------------------------------------
    
    if (resultArr.length === 0) {
      throw new CustomError({ level: 'error', errorsArr: [{ code: 'VsOOpVMYg', messageID: 'cvS0qSAlE' }] });
    }
    
    
    // console.log(`
    //   ----- resultArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // --------------------------------------------------
    //   編集権限がない場合は処理停止
    // --------------------------------------------------
    
    const editable = verifyAuthority({
      req,
      users_id: lodashGet(resultArr, [0, 'users_id'], ''),
      loginUsers_id,
      ISO8601: lodashGet(resultArr, [0, 'createdDate'], ''),
      _id: lodashGet(resultArr, [0, '_id'], ''),
    });
    
    if (!editable) {
      throw new CustomError({ level: 'error', errorsArr: [{ code: 'HdsQle2ZZ', messageID: 'DSRlEoL29' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const imagesAndVideos_id = lodashGet(resultArr, [0, 'imagesAndVideos_id'], '');
    const images = - lodashGet(resultArr, [0, 'imagesAndVideosObj', 'images'], 0);
    const videos = - lodashGet(resultArr, [0, 'imagesAndVideosObj', 'videos'], 0);
    
    const returnObj = {
      imagesAndVideos_id,
      images,
      videos,
    };
    
    // const _id = lodashGet(resultArr, [0, '_id'], '');
    // const imagesAndVideosObj = lodashGet(resultArr, [0, 'imagesAndVideosObj'], {});
    
    // const returnObj = {
    //   _id,
    //   imagesAndVideosObj,
    // };
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   forumComments_id: {green ${forumComments_id}}
    // `);
    
    // console.log(`
    //   ----- resultArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
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
 * コメント、スレッド、画像＆動画、コミュニティを同時に更新する
 * 
 * @param {Object} forumThreadsConditionObj - DB forum-threads 検索条件
 * @param {Object} forumThreadsSaveObj - DB forum-threads 保存データ
 * @param {Object} forumCommentsConditionObj - DB forum-comments 検索条件
 * @param {Object} forumCommentsSaveObj - DB forum-comments 保存データ
 * @param {Object} forumRepliesConditionObj - DB forum-comments 検索条件
 * @param {Object} forumRepliesSaveObj - DB forum-comments 保存データ
 * @param {Object} imagesAndVideosConditionObj - DB images-and-videos 検索条件
 * @param {Object} imagesAndVideosSaveObj - DB images-and-videos 保存データ
 * @param {Object} gameCommunitiesConditionObj - DB game-communities 検索条件
 * @param {Object} gameCommunitiesSaveObj - DB game-communities 保存データ
 * @param {Object} userCommunitiesConditionObj - DB user-communities 検索条件
 * @param {Object} userCommunitiesSaveObj - DB user-communities 保存データ
 * @return {Object} 
 */
const transactionForUpsert = async ({
  
  forumThreadsConditionObj = {},
  forumThreadsSaveObj = {},
  forumCommentsConditionObj = {},
  forumCommentsSaveObj = {},
  forumRepliesConditionObj = {},
  forumRepliesSaveObj = {},
  imagesAndVideosConditionObj = {},
  imagesAndVideosSaveObj = {},
  gameCommunitiesConditionObj = {},
  gameCommunitiesSaveObj = {},
  userCommunitiesConditionObj = {},
  userCommunitiesSaveObj = {},
  
}) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Transaction / Session
  // --------------------------------------------------
  
  const session = await SchemaForumThreads.startSession();
  
  
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Transaction / Start
    // --------------------------------------------------
    
    await session.startTransaction();
    
    
    
    
    // ---------------------------------------------
    //   - forum-threads / Thread
    // ---------------------------------------------
    
    if (Object.keys(forumThreadsConditionObj).length !== 0 && Object.keys(forumThreadsSaveObj).length !== 0) {
      await SchemaForumThreads.updateOne(forumThreadsConditionObj, forumThreadsSaveObj, { session, upsert: true });
    }
    
    
    // ---------------------------------------------
    //   - forum-comments / Comment
    // ---------------------------------------------
    
    if (Object.keys(forumCommentsConditionObj).length !== 0 && Object.keys(forumCommentsSaveObj).length !== 0) {
      await Schema.updateOne(forumCommentsConditionObj, forumCommentsSaveObj, { session, upsert: true });
    }
    
    
    // ---------------------------------------------
    //   - forum-comments / Reply
    // ---------------------------------------------
    
    if (Object.keys(forumRepliesConditionObj).length !== 0 && Object.keys(forumRepliesSaveObj).length !== 0) {
      await Schema.updateOne(forumRepliesConditionObj, forumRepliesSaveObj, { session, upsert: true });
    }
    
    
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
    //   - user-communities
    // ---------------------------------------------
    
    if (Object.keys(userCommunitiesConditionObj).length !== 0 && Object.keys(userCommunitiesSaveObj).length !== 0) {
      await SchemaUserCommunities.updateOne(userCommunitiesConditionObj, userCommunitiesSaveObj, { session });
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
    //   ----- forumRepliesConditionObj -----\n
    //   ${util.inspect(forumRepliesConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumRepliesSaveObj -----\n
    //   ${util.inspect(forumRepliesSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumCommentsConditionObj -----\n
    //   ${util.inspect(forumCommentsConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumCommentsSaveObj -----\n
    //   ${util.inspect(forumCommentsSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumThreadsConditionObj -----\n
    //   ${util.inspect(forumThreadsConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumThreadsSaveObj -----\n
    //   ${util.inspect(forumThreadsSaveObj, { colors: true, depth: null })}\n
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
    //   ----- userCommunitiesConditionObj -----\n
    //   ${util.inspect(userCommunitiesConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- userCommunitiesSaveObj -----\n
    //   ${util.inspect(userCommunitiesSaveObj, { colors: true, depth: null })}\n
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




/**
 * Transaction コメントを削除する
 * コメントと返信を削除して、スレッド、画像＆動画、コミュニティを同時に更新する
 * @param {Object} forumThreadsConditionObj - DB forum-threads 検索条件
 * @param {Object} forumThreadsSaveObj - DB forum-threads 保存データ
 * @param {Object} forumCommentsConditionObj - DB forum-comments 検索条件
 * @param {Object} forumRepliesConditionObj - DB forum-comments 検索条件
 * @param {Object} imagesAndVideosConditionObj - DB images-and-videos 検索条件
 * @param {Object} gameCommunitiesConditionObj - DB game-communities 検索条件
 * @param {Object} gameCommunitiesSaveObj - DB game-communities 保存データ
 * @param {Object} userCommunitiesConditionObj - DB user-communities 検索条件
 * @param {Object} userCommunitiesSaveObj - DB user-communities 保存データ
 * @return {Object}
 */
const transactionForDeleteComment = async ({
  
  forumThreadsConditionObj,
  forumThreadsSaveObj,
  forumCommentsConditionObj,
  forumRepliesConditionObj,
  imagesAndVideosConditionObj,
  gameCommunitiesConditionObj = {},
  gameCommunitiesSaveObj = {},
  userCommunitiesConditionObj = {},
  userCommunitiesSaveObj = {},
  
}) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Transaction / Session
  // --------------------------------------------------
  
  const session = await SchemaForumThreads.startSession();
  
  
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Transaction / Start
    // --------------------------------------------------
    
    await session.startTransaction();
    
    
    
    
    // --------------------------------------------------
    //   DB
    // --------------------------------------------------
    
    await Schema.deleteMany(forumRepliesConditionObj, { session });
    await Schema.deleteOne(forumCommentsConditionObj, { session });
    await SchemaForumThreads.updateOne(forumThreadsConditionObj, forumThreadsSaveObj, { session });
    
    
    // ---------------------------------------------
    //   - images-and-videos
    // ---------------------------------------------
    
    if (Object.keys(imagesAndVideosConditionObj).length !== 0) {
      await SchemaImagesAndVideos.deleteMany(imagesAndVideosConditionObj, { session });
    }
    
    
    // ---------------------------------------------
    //   - game-communities
    // ---------------------------------------------
    
    if (Object.keys(gameCommunitiesConditionObj).length !== 0 && Object.keys(gameCommunitiesSaveObj).length !== 0) {
      await SchemaGameCommunities.updateOne(gameCommunitiesConditionObj, gameCommunitiesSaveObj, { session });
    }
    
    
    // ---------------------------------------------
    //   - user-communities
    // ---------------------------------------------
    
    if (Object.keys(userCommunitiesConditionObj).length !== 0 && Object.keys(userCommunitiesSaveObj).length !== 0) {
      await SchemaUserCommunities.updateOne(userCommunitiesConditionObj, userCommunitiesSaveObj, { session });
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
    //   ----- forumCommentsConditionObj -----\n
    //   ${util.inspect(forumCommentsConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosConditionObj -----\n
    //   ${util.inspect(imagesAndVideosConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumThreadsConditionObj -----\n
    //   ${util.inspect(forumThreadsConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumThreadsSaveObj -----\n
    //   ${util.inspect(forumThreadsSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- userCommunitiesConditionObj -----\n
    //   ${util.inspect(userCommunitiesConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- userCommunitiesSaveObj -----\n
    //   ${util.inspect(userCommunitiesSaveObj, { colors: true, depth: null })}\n
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




/**
 * Transaction 返信を削除する
 * 返信を削除して、コメント、スレッド、画像＆動画、ユーザーコミュニティを同時に更新する
 * 
 * @param {Object} forumRepliesConditionObj - DB forum-comments 検索条件
 * @param {Object} imagesAndVideosConditionObj - DB images-and-videos 検索条件
 * @param {Object} forumCommentsConditionObj - DB forum-comments 検索条件
 * @param {Object} forumCommentsSaveObj - DB forum-comments 保存データ
 * @param {Object} forumThreadsConditionObj - DB forum-threads 検索条件
 * @param {Object} forumThreadsSaveObj - DB forum-threads 保存データ
 * @param {Object} gameCommunitiesConditionObj - DB game-communities 検索条件
 * @param {Object} gameCommunitiesSaveObj - DB game-communities 保存データ
 * @param {Object} userCommunitiesConditionObj - DB user-communities 検索条件
 * @param {Object} userCommunitiesSaveObj - DB user-communities 保存データ
 * @return {Object} 
 */
const transactionForDeleteReply = async ({
  
  forumRepliesConditionObj,
  imagesAndVideosConditionObj,
  forumCommentsConditionObj,
  forumCommentsSaveObj,
  forumThreadsConditionObj,
  forumThreadsSaveObj,
  gameCommunitiesConditionObj = {},
  gameCommunitiesSaveObj = {},
  userCommunitiesConditionObj = {},
  userCommunitiesSaveObj = {},
  
}) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Transaction / Session
  // --------------------------------------------------
  
  const session = await SchemaForumThreads.startSession();
  
  
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Transaction / Start
    // --------------------------------------------------
    
    await session.startTransaction();
    
    
    
    
    // --------------------------------------------------
    //   - forum-comments (reply) / Delete
    // --------------------------------------------------
    
    await Schema.deleteOne(forumRepliesConditionObj, { session });
    
    
    // ---------------------------------------------
    //   - forum-comments & forum-threads / Update
    // ---------------------------------------------
    
    await Schema.updateOne(forumCommentsConditionObj, forumCommentsSaveObj, { session });
    await SchemaForumThreads.updateOne(forumThreadsConditionObj, forumThreadsSaveObj, { session });
    
    
    // ---------------------------------------------
    //   - images-and-videos / Delete
    // ---------------------------------------------
    
    if (Object.keys(imagesAndVideosConditionObj).length !== 0) {
      await SchemaImagesAndVideos.deleteOne(imagesAndVideosConditionObj, { session });
    }
    
    
    // ---------------------------------------------
    //   - game-communities / Update
    // ---------------------------------------------
    
    if (Object.keys(gameCommunitiesConditionObj).length !== 0 && Object.keys(gameCommunitiesSaveObj).length !== 0) {
      await SchemaGameCommunities.updateOne(gameCommunitiesConditionObj, gameCommunitiesSaveObj, { session });
    }
    
    
    // ---------------------------------------------
    //   - user-communities / Update
    // ---------------------------------------------
    
    if (Object.keys(userCommunitiesConditionObj).length !== 0 && Object.keys(userCommunitiesSaveObj).length !== 0) {
      await SchemaUserCommunities.updateOne(userCommunitiesConditionObj, userCommunitiesSaveObj, { session });
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
    //   /app/@database/forum-comments/model.js - transactionForDeleteReply
    // `);
    
    // console.log(`
    //   ----- forumRepliesConditionObj -----\n
    //   ${util.inspect(forumRepliesConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosConditionObj -----\n
    //   ${util.inspect(imagesAndVideosConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumCommentsConditionObj -----\n
    //   ${util.inspect(forumCommentsConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumCommentsSaveObj -----\n
    //   ${util.inspect(forumCommentsSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumThreadsConditionObj -----\n
    //   ${util.inspect(forumThreadsConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumThreadsSaveObj -----\n
    //   ${util.inspect(forumThreadsSaveObj, { colors: true, depth: null })}\n
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
    //   ----- userCommunitiesConditionObj -----\n
    //   ${util.inspect(userCommunitiesConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- userCommunitiesSaveObj -----\n
    //   ${util.inspect(userCommunitiesSaveObj, { colors: true, depth: null })}\n
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
  
  findCommentsAndRepliesByForumThreads_idsArr,
  findRepliesByForumComments_idArr,
  getPage,
  findForEdit,
  findForDeleteComment,
  findForDeleteReply,
  transactionForUpsert,
  transactionForDeleteComment,
  transactionForDeleteReply,
  
};