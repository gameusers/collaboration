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

const SchemaForumComments = require('./schema');
const SchemaForumThreads = require('../forum-threads/schema');
const SchemaUserCommunities = require('../user-communities/schema');
const SchemaImagesAndVideos = require('../images-and-videos/schema');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { formatImagesAndVideosObj } = require('../../@modules/image/format');
const { CustomError } = require('../../@modules/error/custom');
const { verifyAuthority } = require('../../@modules/authority');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatImagesAndVideosArr } = require('../../@format/image');




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
    //   FindOne
    // --------------------------------------------------
    
    return await SchemaForumComments.findOne(conditionObj).exec();
    
    
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
    //   Find
    // --------------------------------------------------
    
    return await SchemaForumComments.find(conditionObj).exec();
    
    
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
    //   Find
    // --------------------------------------------------
    
    return await SchemaForumComments.countDocuments(conditionObj).exec();
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 挿入 / 更新する
 * @param {Object} argumentsObj - 引数
 * @return {Array} 
 */
const upsert = async ({ conditionObj, saveObj }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Upsert
    // --------------------------------------------------
    
    return await SchemaForumComments.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 挿入する
 * @param {Object} argumentsObj - 引数
 * @return {Array} 
 */
const insertMany = async ({ saveArr }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   insertMany
    // --------------------------------------------------
    
    return await SchemaForumComments.insertMany(saveArr);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 削除する
 * @param {Object} conditionObj - 検索条件
 * @return {Array} 
 */
const deleteMany = async ({ conditionObj }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Delete
    // --------------------------------------------------
    
    return await SchemaForumComments.deleteMany(conditionObj);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};






/**
 * コメントと返信を取得する
 * @param {Object} localeObj - ロケール
 * @param {Object} conditionObj - 検索条件
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @return {Array} 取得データ
 */
// const findForForumCommentsAndReplies = async ({
  
//   localeObj,
//   loginUsers_id,
//   forumThreads_idArr,
//   commentPage = 1,
//   // commentLimit = process.env.FORUM_COMMENT_LIMIT,
//   commentLimit = 5,
//   replyPage = 1,
//   replyLimit = process.env.FORUM_REPLY_LIMIT,
    
// }) => {
  
  
//   try {
    
    
//     // --------------------------------------------------
//     //   Forum Comments & Replies データ取得
//     // --------------------------------------------------
    
//     const resultArr = await SchemaForumComments.aggregate([
      
      
//       // コメントを取得（forumComments_id: '' この場合は親のコメントがないので、返信ではなくコメントということ）
//       {
//         $match: {
//           $and: [
//             { forumThreads_id: { $in: forumThreads_idArr } },
//             { forumComments_id: '' },
//           ]
//         },
//       },
      
      
//       // プレイヤーカードを取得（名前＆ステータス＆サムネイル用）
//       {
//         $lookup:
//           {
//             from: 'card-players',
//             let: { forumCommentsUsers_id: '$users_id' },
//             pipeline: [
//               { $match:
//                 { $expr:
//                   { $and:
//                     [
//                       { $eq: ['$language', localeObj.language] },
//                       { $eq: ['$users_id', '$$forumCommentsUsers_id'] },
//                     ]
//                   },
//                 }
//               },
              
              
//               // サムネイルを取得
//               {
//                 $lookup:
//                   {
//                     from: 'images-and-videos',
//                     let: { cardPlayersImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
//                     pipeline: [
//                       { $match:
//                         { $expr:
//                           { $eq: ['$_id', '$$cardPlayersImagesAndVideosThumbnail_id'] },
//                         }
//                       },
//                       { $project:
//                         {
//                           // _id: 0,
//                           createdDate: 0,
//                           updatedDate: 0,
//                           users_id: 0,
//                           __v: 0,
//                         }
//                       }
//                     ],
//                     as: 'imagesAndVideosThumbnailObj'
//                   }
//               },
              
//               {
//                 $unwind: {
//                   path: '$imagesAndVideosThumbnailObj',
//                   preserveNullAndEmptyArrays: true,
//                 }
//               },
              
              
//               { $project:
//                 {
//                   // _id: 0,
//                   // users_id: 1,
//                   name: '$nameObj.value',
//                   status: '$statusObj.value',
//                   imagesAndVideosThumbnailObj: 1,
//                 }
//               }
//             ],
//             as: 'cardPlayersObj'
//           }
//       },
      
//       {
//         $unwind: {
//           path: '$cardPlayersObj',
//           preserveNullAndEmptyArrays: true,
//         }
//       },
      
      
//       // ユーザーを取得（アクセス日時＆経験値＆プレイヤーID用）
//       {
//         $lookup:
//           {
//             from: 'users',
//             let: { forumCommentsUsers_id: '$users_id' },
//             pipeline: [
//               { $match:
//                 { $expr:
//                   { $eq: ['$_id', '$$forumCommentsUsers_id'] },
//                 }
//               },
//               { $project:
//                 {
//                   _id: 0,
//                   accessDate: 1,
//                   exp: 1,
//                   userID: 1,
//                 }
//               }
//             ],
//             as: 'usersObj'
//           }
//       },
      
//       {
//         $unwind: {
//           path: '$usersObj',
//           preserveNullAndEmptyArrays: true,
//         }
//       },
      
      
//       // 画像と動画を取得
//       {
//         $lookup:
//           {
//             from: 'images-and-videos',
//             let: { forumCommentsImagesAndVideos_id: '$imagesAndVideos_id' },
//             pipeline: [
//               { $match:
//                 { $expr:
//                   { $eq: ['$_id', '$$forumCommentsImagesAndVideos_id'] },
//                 }
//               },
//               { $project:
//                 {
//                   // _id: 0,
//                   createdDate: 0,
//                   updatedDate: 0,
//                   users_id: 0,
//                   __v: 0,
//                 }
//               }
//             ],
//             as: 'imagesAndVideosObj'
//           }
//       },
      
//       {
//         $unwind: {
//           path: '$imagesAndVideosObj',
//           preserveNullAndEmptyArrays: true,
//         }
//       },
      
      
//       // 返信を取得（内部の処理は上記コメントと同じ）
//       {
//         $lookup:
//           {
//             from: 'forum-comments',
//             let: { forumComments_id: '$_id' },
//             pipeline: [
              
//               { $match:
//                 { $expr:
//                   { $eq: ['$forumComments_id', '$$forumComments_id'] }
//                 }
//               },
              
              
//               // プレイヤーカードを取得（名前＆ステータス＆サムネイル用）
//               {
//                 $lookup:
//                   {
//                     from: 'card-players',
//                     let: { forumRepliesUsers_id: '$users_id' },
//                     pipeline: [
//                       { $match:
//                         { $expr:
//                           { $and:
//                             [
//                               { $eq: ['$language', localeObj.language] },
//                               { $eq: ['$users_id', '$$forumRepliesUsers_id'] },
//                             ]
//                           },
//                         }
//                       },
                      
                      
//                       // サムネイルを取得
//                       {
//                         $lookup:
//                           {
//                             from: 'images-and-videos',
//                             let: { cardPlayersImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
//                             pipeline: [
//                               { $match:
//                                 { $expr:
//                                   { $eq: ['$_id', '$$cardPlayersImagesAndVideosThumbnail_id'] },
//                                 }
//                               },
//                               { $project:
//                                 {
//                                   // _id: 0,
//                                   createdDate: 0,
//                                   updatedDate: 0,
//                                   users_id: 0,
//                                   __v: 0,
//                                 }
//                               }
//                             ],
//                             as: 'imagesAndVideosThumbnailObj'
//                           }
//                       },
                      
//                       {
//                         $unwind: {
//                           path: '$imagesAndVideosThumbnailObj',
//                           preserveNullAndEmptyArrays: true,
//                         }
//                       },
                      
                      
//                       { $project:
//                         {
//                           // _id: 0,
//                           // users_id: 1,
//                           name: '$nameObj.value',
//                           status: '$statusObj.value',
//                           imagesAndVideosThumbnailObj: 1,
//                         }
//                       }
//                     ],
//                     as: 'cardPlayersObj'
//                   }
//               },
              
//               {
//                 $unwind: {
//                   path: '$cardPlayersObj',
//                   preserveNullAndEmptyArrays: true,
//                 }
//               },
              
              
//               // ユーザーを取得（アクセス日時＆経験値＆プレイヤーID用）
//               {
//                 $lookup:
//                   {
//                     from: 'users',
//                     let: { forumRepliesUsers_id: '$users_id' },
//                     pipeline: [
//                       { $match:
//                         { $expr:
//                           { $eq: ['$_id', '$$forumRepliesUsers_id'] },
//                         }
//                       },
//                       { $project:
//                         {
//                           _id: 0,
//                           accessDate: 1,
//                           exp: 1,
//                           userID: 1,
//                         }
//                       }
//                     ],
//                     as: 'usersObj'
//                   }
//               },
              
//               {
//                 $unwind: {
//                   path: '$usersObj',
//                   preserveNullAndEmptyArrays: true,
//                 }
//               },
              
              
//               // 画像と動画を取得
//               {
//                 $lookup:
//                   {
//                     from: 'images-and-videos',
//                     let: { forumRepliesImagesAndVideos_id: '$imagesAndVideos_id' },
//                     pipeline: [
//                       { $match:
//                         { $expr:
//                           { $eq: ['$_id', '$$forumRepliesImagesAndVideos_id'] },
//                         }
//                       },
//                       { $project:
//                         {
//                           // _id: 0,
//                           createdDate: 0,
//                           updatedDate: 0,
//                           users_id: 0,
//                           __v: 0,
//                         }
//                       }
//                     ],
//                     as: 'imagesAndVideosObj'
//                   }
//               },
              
//               {
//                 $unwind: {
//                   path: '$imagesAndVideosObj',
//                   preserveNullAndEmptyArrays: true,
//                 }
//               },
              
              
//               { $project:
//                 {
//                   createdDate: 0,
//                   imagesAndVideos_id: 0,
//                   __v: 0,
//                 }
//               },
              
              
//               { '$sort': { 'updatedDate': -1 } },
//               { $skip: (replyPage - 1) * replyLimit },
//               { $limit: parseInt(replyLimit, 10) },
              
              
//             ],
//             as: 'forumRepliesArr'
//           }
//       },
      
      
//       { $project:
//         {
//           createdDate: 0,
//           imagesAndVideos_id: 0,
//           __v: 0,
//         }
//       },
      
      
//       { '$sort': { 'updatedDate': -1 } },
//       { $skip: (commentPage - 1) * commentLimit },
//       { $limit: parseInt(commentLimit, 10) },
      
      
//     ]).exec();
    
    
    
    
//     // --------------------------------------------------
//     //   Format
//     // --------------------------------------------------
    
//     const formattedObj = format({
//       localeObj,
//       loginUsers_id,
//       arr: resultArr,
//       commentPage,
//       replyPage,
//     });
    
    
//     // --------------------------------------------------
//     //   console.log
//     // --------------------------------------------------
    
//     // console.log(`
//     //   ----- localeObj -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(localeObj)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     console.log(`
//       ----- resultArr -----\n
//       ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
//       --------------------\n
//     `);
    
//     // console.log(`
//     //   ----- formattedObj -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(formattedObj)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- Comments And Replies -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
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
    
//     return formattedObj;
    
    
//   } catch (err) {
    
//     throw err;
    
//   }
  
  
// };




/**
 * コメントと返信を取得する
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {Array} forumThreads_idArr - DB forum-threads _id / _idが入っている配列
 * @param {number} commentPage - コメントのページ
 * @param {number} commentLimit - コメントのリミット
 * @param {number} replyPage - 返信のページ
 * @param {number} replyLimit - 返信のリミット
 * @return {Array} 取得データ
 */
const findForForumCommentsAndReplies = async ({
  
  localeObj,
  loginUsers_id,
  forumThreads_idArr,
  commentPage = 1,
  commentLimit = process.env.FORUM_COMMENT_LIMIT,
  // commentLimit = 1,
  replyPage = 1,
  replyLimit = process.env.FORUM_REPLY_LIMIT,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Forum Comments & Replies データ取得
    //   $in, sort, limit を使って最新のコメントを取得すると、古いコメントが limit で削られてしまうため
    //   あるスレッドでは古いコメントが表示されないという事態になってしまう
    //   そのため for のループで検索している　ただ良くない書き方だと思うので可能なら改善した方がいい
    // --------------------------------------------------
    
    let resultArr = [];
    
    
    for (let value of forumThreads_idArr.values()) {
      
      
      const docArr = await SchemaForumComments.aggregate([
        
        
        // --------------------------------------------------
        //   コメント
        // --------------------------------------------------
        
        // forumComments_id: '' この場合は親のコメントがないので、返信ではなくコメントということ
        {
          $match: {
            $and: [
              // { forumThreads_id: { $in: [value] } },
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
                
                
                { $project:
                  {
                    createdDate: 0,
                    imagesAndVideos_id: 0,
                    __v: 0,
                  }
                },
                
                
                // { '$sort': { 'updatedDate': -1 } },
                // { $skip: (replyPage - 1) * replyLimit },
                // { $limit: parseInt(replyLimit, 10) },
                
                
              ],
              as: 'forumRepliesArr'
            }
        },
        
        
        { $project:
          {
            createdDate: 0,
            imagesAndVideos_id: 0,
            __v: 0,
          }
        },
        
        
        { '$sort': { 'updatedDate': -1 } },
        { $skip: (commentPage - 1) * 1 },
        { $limit: parseInt(1, 10) },
        
        // { '$sort': { 'updatedDate': -1 } },
        // { $skip: (commentPage - 1) * commentLimit },
        // { $limit: parseInt(commentLimit, 10) },
        
        
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
    
    const formattedObj = format({
      localeObj,
      loginUsers_id,
      arr: resultArr,
      commentPage,
      replyPage,
    });
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- localeObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(localeObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    // console.log(`
    //   ----- formattedObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(formattedObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- Comments And Replies -----\n
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
    
    return formattedObj;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};




/**
* DBから取得した情報をフォーマットする
* @param {Object} localeObj - ロケール
* @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
* @param {Array} arr - 配列
* @return {Array} フォーマット後のデータ
*/
const format = ({ localeObj, loginUsers_id, arr, commentPage, replyPage }) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Loop
  // --------------------------------------------------
  
  const ISO8601 = moment().toISOString();
  
  for (let valueObj of arr.values()) {
    // console.log(`\n---------- valueObj ----------\n`);
    // console.dir(valueObj);
    // console.log(`\n-----------------------------------\n`);
    
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
    
    clonedObj.editable = false;
    
    if (loginUsers_id && valueObj.users_id === loginUsers_id) {
      clonedObj.editable = true;
    }
    
    
    // --------------------------------------------------
    //   Name & Description
    // --------------------------------------------------
    
    const filteredArr = valueObj.localesArr.filter((filterObj) => {
      return filterObj.language === localeObj.language;
    });
    
    
    if (lodashHas(filteredArr, [0])) {
      
      clonedObj.name = lodashGet(filteredArr, [0, 'name'], '');
      clonedObj.comment = lodashGet(filteredArr, [0, 'comment'], '');
      
    } else {
      
      clonedObj.name = lodashGet(valueObj, ['localesArr', 0, 'name'], '');
      clonedObj.comment = lodashGet(valueObj, ['localesArr', 0, 'comment'], '');
      
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
    //   Format - Reply
    // --------------------------------------------------
    
    let formattedReplyObj = {};
    
    if (lodashHas(valueObj, ['forumRepliesArr'])) {
      
      const forumRepliesArr = lodashGet(valueObj, ['forumRepliesArr'], []);
      
      formattedReplyObj = format({
        localeObj,
        loginUsers_id,
        arr: forumRepliesArr,
        commentPage,
        replyPage,
      });
      
    }
    
    
    // --------------------------------------------------
    //   不要な項目を削除する
    // --------------------------------------------------
    
    delete clonedObj.createdDate;
    delete clonedObj.users_id;
    delete clonedObj.localesArr;
    delete clonedObj.anonymity;
    delete clonedObj.forumRepliesArr;
    delete clonedObj.ip;
    delete clonedObj.userAgent;
    delete clonedObj.__v;
    
    // console.log(`\n---------- clonedObj ----------\n`);
    // console.dir(clonedObj);
    // console.log(`\n-----------------------------------\n`);
    
    
    
    
    // --------------------------------------------------
    //   オブジェクト生成
    // --------------------------------------------------
    
    // コメント
    let parent_id = valueObj.forumThreads_id;
    let page = commentPage;
    
    // 返信
    if (valueObj.forumComments_id) {
      parent_id = valueObj.forumComments_id;
      page = replyPage;
    }
    
    if (parent_id) {
      
      lodashSet(returnObj, [parent_id, 'page'], page);
      
      lodashSet(returnObj, [parent_id, 'dataObj', `page${page}Obj`, 'loadedDate'], ISO8601);
      
      const arr = lodashGet(returnObj, [parent_id, 'dataObj', `page${page}Obj`, 'arr'], []);
      arr.push(clonedObj);
      lodashSet(returnObj, [parent_id, 'dataObj', `page${page}Obj`, 'arr'], arr);
      
    }
    
    
    // --------------------------------------------------
    //   Merge - コメントと返信をひとつのオブジェクトにマージする
    // --------------------------------------------------
    
    returnObj = lodashMerge(returnObj, formattedReplyObj);
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return returnObj;
  
  
};




/**
 * コメント＆返信データを取得する　編集用
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} forumComments_id - DB forum-comments _id
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
    
    const resultArr = await SchemaForumComments.aggregate([
      
      
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
      
      
      { $project:
        {
          createdDate: 0,
          imagesAndVideos_id: 0,
          __v: 0,
        }
      },
      
      
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
    
    // const editable = verifyAuthority({
    //   req,
    //   users_id: lodashGet(resultArr, [0, 'users_id'], ''),
    //   loginUsers_id,
    //   ISO8601: lodashGet(resultArr, [0, 'createdDate'], ''),
    //   _id: lodashGet(resultArr, [0, '_id'], ''),
    // });
    
    // if (!editable) {
    //   throw new CustomError({ level: 'error', errorsArr: [{ code: 'IRZhSgQnt', messageID: 'DSRlEoL29' }] });
    // }
    
    
    
    
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
    
    
    const returnObj = {
      _id,
      name,
      comment,
      imagesAndVideosObj,
    };
    
    
    
    
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
 * コメント、スレッド、画像＆動画、ユーザーコミュニティを同時に更新する
 * 
 * @param {Object} forumCommentsConditionObj - DB forum-comments 検索条件
 * @param {Object} forumCommentsSaveObj - DB forum-comments 保存データ
 * @param {Object} forumThreadsConditionObj - DB forum-threads 検索条件
 * @param {Object} forumThreadsSaveObj - DB forum-threads 保存データ
 * @param {Object} imagesAndVideosConditionObj - DB images-and-videos 検索条件
 * @param {Object} imagesAndVideosSaveObj - DB images-and-videos 保存データ
 * @param {Object} userCommunitiesConditionObj - DB user-communities 検索条件
 * @param {Object} userCommunitiesSaveObj - DB user-communities 保存データ
 * @return {Object} 
 */
const transactionForUpsert = async ({
  
  forumCommentsConditionObj,
  forumCommentsSaveObj,
  forumThreadsConditionObj,
  forumThreadsSaveObj,
  imagesAndVideosConditionObj,
  imagesAndVideosSaveObj,
  userCommunitiesConditionObj,
  userCommunitiesSaveObj,
  
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
    //   DB updateOne
    // --------------------------------------------------
    
    await SchemaForumComments.updateOne(forumCommentsConditionObj, forumCommentsSaveObj, { session, upsert: true });
    await SchemaForumThreads.updateOne(forumThreadsConditionObj, forumThreadsSaveObj, { session, upsert: true });
    
    
    if (Object.keys(imagesAndVideosConditionObj).length !== 0 && Object.keys(imagesAndVideosSaveObj).length !== 0) {
      
      
      // --------------------------------------------------
      //   画像＆動画を削除する
      // --------------------------------------------------
      
      const arr = lodashGet(imagesAndVideosSaveObj, ['arr'], []);
      
      if (arr.length === 0) {
        
        await SchemaImagesAndVideos.deleteOne(imagesAndVideosConditionObj);
        
        
      // --------------------------------------------------
      //   画像＆動画を保存
      // --------------------------------------------------
        
      } else {
        
        await SchemaImagesAndVideos.updateOne(imagesAndVideosConditionObj, imagesAndVideosSaveObj, { session, upsert: true });
        
      }
      
    }
    
    
    // throw new Error();
    await SchemaUserCommunities.updateOne(userCommunitiesConditionObj, userCommunitiesSaveObj, { session });
    
    
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
    
    // await session.abortTransaction();
    // // console.log('--------ロールバック-----------');
    
    // session.endSession();
    
    
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
  findForForumCommentsAndReplies,
  findForEdit,
  transactionForUpsert,
};