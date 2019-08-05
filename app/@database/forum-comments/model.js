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


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatImagesAndVideosArr, formatImagesAndVideosObj, formatLocalesArr } = require('../../@format/image');




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
 * 検索してデータを取得する / User 用（サムネイル・ハンドルネーム・ステータス）
 * @param {Object} localeObj - ロケール
 * @param {Object} conditionObj - 検索条件
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @return {Array} 取得データ
 */
const findForForumCommentsAndReplies = async ({
  
  localeObj,
  loginUsers_id,
  forumThreads_idArr,
  commentPage = 1,
  commentLimit = process.env.FORUM_COMMENT_LIMIT,
  replyPage = 1,
  replyLimit = process.env.FORUM_REPLY_LIMIT,
    
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Forum Comments & Replies データ取得
    // --------------------------------------------------
    
    const resultArr = await SchemaForumComments.aggregate([
      
      
      // コメントを取得（forumComments_id: '' この場合は親のコメントがないので、返信ではなくコメントということ）
      {
        $match: {
          $and: [
            { forumThreads_id: { $in: forumThreads_idArr } },
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
              { $project:
                {
                  // _id: 0,
                  // users_id: 1,
                  name: '$nameObj.value',
                  status: '$statusObj.value',
                  'imagesAndVideosObj.thumbnailArr': 1,
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
                  playerID: 1,
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
      
      
      // 返信を取得（内部の処理は上記コメントと同じ）
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
                      { $project:
                        {
                          // _id: 0,
                          // users_id: 1,
                          name: '$nameObj.value',
                          status: '$statusObj.value',
                          'imagesAndVideosObj.thumbnailArr': 1,
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
                          playerID: 1,
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
              
              
              { '$sort': { 'updatedDate': -1 } },
              { $skip: (replyPage - 1) * replyLimit },
              { $limit: parseInt(replyLimit, 10) },
              
              
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
      { $skip: (commentPage - 1) * commentLimit },
      { $limit: parseInt(commentLimit, 10) },
      
      
    ]).exec();
    
    
    // console.log(`
    //   ----- findForForumCommentsAndReplies / resultArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
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
  const ISO8601 = moment().toISOString();
  
  
  // --------------------------------------------------
  //   Loop
  // --------------------------------------------------
  
  for (let valueObj of arr.values()) {
    
    
    // --------------------------------------------------
    //   Deep Copy
    // --------------------------------------------------
    
    const clonedObj = lodashCloneDeep(valueObj);
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    // clonedObj.updatedDate = moment(valueObj.updatedDate).format('YYYY/MM/DD hh:mm');
    
    
    // --------------------------------------------------
    //   画像と動画の処理
    // --------------------------------------------------
    
    const formattedObj = formatImagesAndVideosObj({ localeObj, obj: valueObj.imagesAndVideosObj });
    
    // const formattedObj = formatLocalesArr({ localeObj, obj: valueObj.imagesAndVideosObj });
    
    if (formattedObj) {
      
      clonedObj.imagesAndVideosObj = formattedObj;
      
    } else {
      
      delete clonedObj.imagesAndVideosObj;
      
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
};