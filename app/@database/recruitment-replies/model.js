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

const SchemaRecruitmentReplies = require('./schema.js');

const SchemaRecruitmentThreads = require('../recruitment-threads/schema.js');
const SchemaRecruitmentComments = require('../recruitment-comments/schema.js');
const SchemaImagesAndVideos = require('../images-and-videos/schema.js');
const SchemaGameCommunities = require('../game-communities/schema.js');

const ModelRecruitmentComments = require('../../@database/recruitment-comments/model.js');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { CustomError } = require('../../@modules/error/custom.js');
const { verifyAuthority } = require('../../@modules/authority.js');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatRecruitmentRepliesArr } = require('./format.js');






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
    
    return await SchemaRecruitmentReplies.findOne(conditionObj).exec();
    
    
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
    
    return await SchemaRecruitmentReplies.find(conditionObj).exec();
    
    
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
    
    return await SchemaRecruitmentReplies.countDocuments(conditionObj).exec();
    
    
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
    
    return await SchemaRecruitmentReplies.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    
    
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
    
    return await SchemaRecruitmentReplies.insertMany(saveArr);
    
    
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
    
    return await SchemaRecruitmentReplies.deleteMany(conditionObj);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};






// --------------------------------------------------
//   find
// --------------------------------------------------

/**
 * 返信を取得する
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
 * @param {Array} recruitmentComments_idsArr - DB recruitment-comments _id / 募集のコメントIDが入った配列
 * @param {number} commentPage - コメントのページ
 * @param {number} commentLimit - コメントのリミット
 * @param {number} replyPage - 返信のページ
 * @param {number} replyLimit - 返信のリミット
 * @return {Array} 取得データ
 */
const findReplies = async ({
  
  req,
  localeObj,
  loginUsers_id,
  gameCommunities_id,
  recruitmentComments_idsArr,
  commentPage = 1,
  commentLimit = process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_LIMIT,
  replyPage = 1,
  replyLimit = process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_LIMIT,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Replies データ取得
    //   $in, sort, limit を使って最新のコメントを取得すると、古い返信が limit で削られてしまうため
    //   あるスレッドでは古いコメントが表示されないという事態になってしまう
    //   そのため for のループで検索している　ただ良くない書き方だと思うので可能なら改善した方がいい
    // --------------------------------------------------
    
    let resultArr = [];
    
    
    
    
    // --------------------------------------------------
    //   Parse
    // --------------------------------------------------
    
    const intCommentLimit = parseInt(commentLimit, 10);
    const intReplyLimit = parseInt(replyLimit, 10);
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const language = lodashGet(localeObj, ['language'], '');
    const country = lodashGet(localeObj, ['country'], '');
    
    
    
    
    // --------------------------------------------------
    //   Loop
    // --------------------------------------------------
    
    for (let recruitmentComments_id of recruitmentComments_idsArr.values()) {
      
      
      // --------------------------------------------------
      //   Aggregation
      // --------------------------------------------------
      
      const docArr = await SchemaRecruitmentReplies.aggregate([
        
        
        // --------------------------------------------------
        //   Match
        // --------------------------------------------------
        
        {
          $match: {
            recruitmentComments_id,
          },
        },
        
        
        // --------------------------------------------------
        //   recruitment-comments / replies 取得用
        // --------------------------------------------------
        
        {
          $lookup:
            {
              from: 'recruitment-comments',
              let: { letRecruitmentComments_id: '$recruitmentComments_id' },
              pipeline: [
                { $match:
                  { $expr:
                    { $eq: ['$_id', '$$letRecruitmentComments_id'] },
                  }
                },
                { $project:
                  {
                    _id: 0,
                    replies: 1,
                  }
                }
              ],
              as: 'recruitmentCommentsObj'
            }
        },
        
        {
          $unwind: {
            path: '$recruitmentCommentsObj',
            preserveNullAndEmptyArrays: true,
          }
        },
        
        
        // --------------------------------------------------
        //   card-players / プレイヤーカードを取得（名前＆ステータス＆サムネイル用）
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
                //   card-players / images-and-videos / サムネイルを取得
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
        //   users / ユーザーを取得（アクセス日時＆経験値＆プレイヤーID用）
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
    //   Format - Reply
    // --------------------------------------------------
    
    const recruitmentRepliesObj = formatRecruitmentRepliesArr({
      
      req,
      localeObj,
      loginUsers_id,
      arr: resultArr,
      replyPage,
      ISO8601: moment().utc().toISOString(),
      
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/recruitment-replies/model.js - findRecruitments
    // `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   commentPage: {green ${commentPage}}
    //   commentLimit: {green ${commentLimit}}
    //   replyPage: {green ${replyPage}}
    //   replyLimit: {green ${replyLimit}}
    // `);
    
    // console.log(`
    //   ----- recruitmentComments_idsArr -----\n
    //   ${util.inspect(recruitmentComments_idsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- resultArr -----\n
    //   ${util.inspect(resultArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- recruitmentRepliesObj -----\n
    //   ${util.inspect(recruitmentRepliesObj, { colors: true, depth: null })}\n
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
    
    return recruitmentRepliesObj;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};




/**
 * 返信を取得する / 投稿＆編集後のデータ
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
 * @param {string} recruitmentThreads_id - DB recruitment-threads _id / スレッドID
 * @param {string} recruitmentComments_id - DB recruitment-comments _id / コメントID
 * @param {string} recruitmentReplies_id - DB recruitment-replies _id / 返信ID
 * @param {number} commentPage - コメントのページ
 * @param {number} commentLimit - コメントのリミット
 * @param {number} replyPage - 返信のページ
 * @param {number} replyLimit - 返信のリミット
 * @return {Object} 取得データ
 */
const findRepliesForUpsert = async ({
  
  req,
  localeObj,
  loginUsers_id,
  gameCommunities_id,
  recruitmentThreads_id,
  recruitmentComments_id,
  recruitmentReplies_id,
  commentPage = 1,
  commentLimit = process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_LIMIT,
  replyPage = 1,
  replyLimit = process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_LIMIT,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    let replyPage = 1;
    
    
    
    
    // --------------------------------------------------
    //   編集
    //   返信は投稿順（昇順）で表示されるため、一番新しいページを単純に表示すれば編集した返信が表示されるわけではない
    //   そのため、編集した返信を表示する場合、返信の表示順を計算しなければならない
    //   返信の総数から順番を取得し
    //   limit で割って表示ページを取得する
    // --------------------------------------------------
    
    if (recruitmentReplies_id) {
      
      
      // --------------------------------------------------
      //   Aggregation
      // --------------------------------------------------
      
      const docRecruitmentRepliesArr = await SchemaRecruitmentReplies.aggregate([
        
        
        // --------------------------------------------------
        //   Match
        // --------------------------------------------------
        
        {
          $match: {
            gameCommunities_id,
            recruitmentThreads_id,
            recruitmentComments_id,
          },
        },
        
        
        { '$sort': { 'createdDate': 1 } },
        
        
        { $project:
          {
            _id: 1,
          }
        },
        
        
      ]).exec();
      
      
      
      
      const index = docRecruitmentRepliesArr.findIndex((valueObj) => {
        return valueObj._id === recruitmentReplies_id;
      });
      
      
      // const replies = docRecruitmentRepliesArr.length;
      replyPage = Math.ceil((index + 1) / replyLimit);
      
      
      
      
      // console.log(`
      //   ----------------------------------------\n
      //   Update
      // `);
      
      // console.log(`
      //   ----- docRecruitmentRepliesArr -----\n
      //   ${util.inspect(docRecruitmentRepliesArr, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // console.log(chalk`
      //   index: {green ${index}}
      //   replies: {green ${replies}}
      // `);
      
      
    // --------------------------------------------------
    //   新規投稿
    //   返信は投稿順（昇順）で表示されるため、新規投稿した返信は順番的に最後に表示される
    //   そのため、新規投稿した返信を表示する場合は、返信の最後のページを表示しなければならない
    //   コメントの情報から返信の総数を取得し
    //   limit で割って最後のページを取得する
    // --------------------------------------------------
      
    } else {
      
      
      const docRecruitmentCommentsObj = await ModelRecruitmentComments.findOne({
        
        conditionObj: {
          _id: recruitmentComments_id,
          gameCommunities_id,
          recruitmentThreads_id,
        }
        
      });
      
      
      const replies = lodashGet(docRecruitmentCommentsObj, ['replies'], 1);
      replyPage = Math.ceil(replies / replyLimit);
      
      
      
      
      // console.log(`
      //   ----------------------------------------\n
      //   Insert
      // `);
      
      // console.log(`
      //   ----- docRecruitmentCommentsObj -----\n
      //   ${util.inspect(docRecruitmentCommentsObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   findReplies
    // --------------------------------------------------
    
    const recruitmentRepliesObj = await findReplies({
      
      req,
      localeObj,
      loginUsers_id,
      gameCommunities_id,
      recruitmentComments_idsArr: [recruitmentComments_id],
      commentPage: 1,
      commentLimit,
      replyPage,
      replyLimit,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/recruitment-replies/model.js - findRepliesForUpsert
    // `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
    //   recruitmentComments_id: {green ${recruitmentComments_id}}
    //   recruitmentReplies_id: {green ${recruitmentReplies_id}}
    //   commentPage: {green ${commentPage}}
    //   commentLimit: {green ${commentLimit}}
    //   replyPage: {green ${replyPage}}
    //   replyLimit: {green ${replyLimit}}
    // `);
    
    // console.log(`
    //   ----- recruitmentRepliesObj -----\n
    //   ${util.inspect(recruitmentRepliesObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return recruitmentRepliesObj;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};




/**
 * 編集用データを取得する（権限もチェック）
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} recruitmentReplies_id - DB recruitment-replies _id / 返信ID
 * @return {Array} 取得データ
 */
const findOneForEdit = async ({
  
  req,
  localeObj,
  loginUsers_id,
  recruitmentReplies_id,
  
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
    
    const docRecruitmentRepliesArr = await SchemaRecruitmentReplies.aggregate([
      
      
      // --------------------------------------------------
      //   Match
      // --------------------------------------------------
      
      {
        $match : { _id: recruitmentReplies_id }
      },
      
      
      // --------------------------------------------------
      //   images-and-videos
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
      
      
      { $project:
        {
          createdDate: 0,
          imagesAndVideos_id: 0,
          ip: 0,
          userAgent: 0,
          __v: 0,
        }
      },
      
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   配列が空の場合は処理停止
    // --------------------------------------------------
    
    if (docRecruitmentRepliesArr.length === 0) {
      throw new CustomError({ level: 'error', errorsArr: [{ code: '_gR81wvbv', messageID: 'cvS0qSAlE' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   編集権限がない場合は処理停止
    // --------------------------------------------------
    
    const editable = verifyAuthority({
      
      req,
      users_id: lodashGet(docRecruitmentRepliesArr, [0, 'users_id'], ''),
      loginUsers_id,
      ISO8601: lodashGet(docRecruitmentRepliesArr, [0, 'createdDate'], ''),
      _id: lodashGet(docRecruitmentRepliesArr, [0, '_id'], '')
      
    });
    
    if (!editable) {
      throw new CustomError({ level: 'error', errorsArr: [{ code: '_IC6Tou9F', messageID: 'DSRlEoL29' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const returnObj = docRecruitmentRepliesArr[0];
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/recruitment-comments/model.js - findOneForEdit
    // `);
    
    // console.log(chalk`
    //   recruitmentComments_id: {green ${recruitmentComments_id}}
    //   editable: {green ${editable} / ${typeof editable}}
    // `);
    
    // console.log(`
    //   ----- docRecruitmentRepliesArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docRecruitmentRepliesArr)), { colors: true, depth: null })}\n
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






// --------------------------------------------------
//   transaction
// --------------------------------------------------

/**
 * Transaction 挿入 / 更新する
 * スレッド、画像＆動画、ユーザーコミュニティを同時に更新する
 * 
 * @param {Object} recruitmentThreadsConditionObj - DB recruitment-threads 検索条件
 * @param {Object} recruitmentThreadsSaveObj - DB recruitment-threads 保存データ
 * @param {Object} recruitmentCommentsConditionObj - DB recruitment-comments 検索条件
 * @param {Object} recruitmentCommentsSaveObj - DB recruitment-comments 保存データ
 * @param {Object} recruitmentRepliesConditionObj - DB recruitment-replies 検索条件
 * @param {Object} recruitmentRepliesSaveObj - DB recruitment-replies 保存データ
 * @param {Object} imagesAndVideosConditionObj - DB images-and-videos 検索条件
 * @param {Object} imagesAndVideosSaveObj - DB images-and-videos 保存データ
 * @param {Object} gameCommunitiesConditionObj - DB game-communities 検索条件
 * @param {Object} gameCommunitiesSaveObj - DB game-communities 保存データ
 * @return {Object} 
 */
const transactionForUpsert = async ({
  
  recruitmentThreadsConditionObj,
  recruitmentThreadsSaveObj,
  recruitmentCommentsConditionObj,
  recruitmentCommentsSaveObj,
  recruitmentRepliesConditionObj,
  recruitmentRepliesSaveObj,
  imagesAndVideosConditionObj = {},
  imagesAndVideosSaveObj = {},
  gameCommunitiesConditionObj = {},
  gameCommunitiesSaveObj = {},
  
}) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Transaction / Session
  // --------------------------------------------------
  
  const session = await SchemaRecruitmentReplies.startSession();
  
  
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Transaction / Start
    // --------------------------------------------------
    
    await session.startTransaction();
    
    
    
    // ---------------------------------------------
    //   - recruitment-replies
    // ---------------------------------------------
    
    await SchemaRecruitmentReplies.updateOne(recruitmentRepliesConditionObj, recruitmentRepliesSaveObj, { session, upsert: true });
    
    
    // ---------------------------------------------
    //   - recruitment-comments
    // ---------------------------------------------
    
    await SchemaRecruitmentComments.updateOne(recruitmentCommentsConditionObj, recruitmentCommentsSaveObj, { session, upsert: true });
    
    
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
    //   /app/@database/recruitment-replies/model.js - transactionForUpsert
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
    //   ----- recruitmentRepliesConditionObj -----\n
    //   ${util.inspect(recruitmentRepliesConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- recruitmentRepliesSaveObj -----\n
    //   ${util.inspect(recruitmentRepliesSaveObj, { colors: true, depth: null })}\n
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
 * @param {Object} recruitmentThreadsConditionObj - DB recruitment-threads 検索条件
 * @param {Object} recruitmentThreadsSaveObj - DB recruitment-threads 保存データ
 * @param {Object} recruitmentCommentsConditionObj - DB recruitment-comments 検索条件
 * @param {Object} recruitmentCommentsSaveObj - DB recruitment-comments 保存データ
 * @param {Object} recruitmentRepliesConditionObj - DB recruitment-replies 検索条件
 * @param {Object} imagesAndVideosConditionObj - DB images-and-videos 検索条件
 * @param {Object} gameCommunitiesConditionObj - DB game-communities 検索条件
 * @param {Object} gameCommunitiesSaveObj - DB game-communities 保存データ
 * @return {Object} 
 */
const transactionForDelete = async ({
  
  recruitmentThreadsConditionObj,
  recruitmentThreadsSaveObj,
  recruitmentCommentsConditionObj,
  recruitmentCommentsSaveObj,
  recruitmentRepliesConditionObj,
  imagesAndVideosConditionObj = {},
  gameCommunitiesConditionObj = {},
  gameCommunitiesSaveObj = {},
  
}) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Transaction / Session
  // --------------------------------------------------
  
  const session = await SchemaRecruitmentReplies.startSession();
  
  
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Transaction / Start
    // --------------------------------------------------
    
    await session.startTransaction();
    
    
    
    
    // ---------------------------------------------
    //   - recruitment-threads / updateOne
    // ---------------------------------------------
    
    await SchemaRecruitmentThreads.updateOne(recruitmentThreadsConditionObj, recruitmentThreadsSaveObj, { session });
    
    
    // ---------------------------------------------
    //   - recruitment-comments / updateOne
    // ---------------------------------------------
    
    await SchemaRecruitmentComments.updateOne(recruitmentCommentsConditionObj, recruitmentCommentsSaveObj, { session });
    
    
    // --------------------------------------------------
    //   - recruitment-replies / deleteOne
    // --------------------------------------------------
    
    await SchemaRecruitmentReplies.deleteOne(recruitmentRepliesConditionObj, { session });
    
    
    // ---------------------------------------------
    //   - images-and-videos / deleteOne
    // ---------------------------------------------
    
    if (Object.keys(imagesAndVideosConditionObj).length !== 0) {
      await SchemaImagesAndVideos.deleteOne(imagesAndVideosConditionObj, { session });
    }
    
    
    // ---------------------------------------------
    //   - game-communities / updateOne
    // ---------------------------------------------
    
    if (Object.keys(gameCommunitiesConditionObj).length !== 0 && Object.keys(gameCommunitiesSaveObj).length !== 0) {
      await SchemaGameCommunities.updateOne(gameCommunitiesConditionObj, gameCommunitiesSaveObj, { session });
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
    //   /app/@database/recruitment-replies/model.js - transactionForDelete
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
    //   ----- recruitmentRepliesConditionObj -----\n
    //   ${util.inspect(recruitmentRepliesConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosConditionObj -----\n
    //   ${util.inspect(imagesAndVideosConditionObj, { colors: true, depth: null })}\n
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
  
  findReplies,
  findRepliesForUpsert,
  findOneForEdit,
  
  transactionForUpsert,
  transactionForDelete,
  
};