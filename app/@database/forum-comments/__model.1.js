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
 * 検索してデータを取得する / User 用（サムネイル・ハンドルネーム・ステータス）
 * @param {Object} localeObj - ロケール
 * @param {Object} conditionObj - 検索条件
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @return {Array} 取得データ
 */
const findForForumCommentsAndReplies = async ({ localeObj, loginUsers_id, forumThreads_idArr, commentPage, commentLimit = process.env.FORUM_COMMENT_LIMIT, replyPage, replyLimit = process.env.FORUM_REPLY_LIMIT }) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Forum Comments & Replies データ取得
    // --------------------------------------------------
    
    const resultArr = await SchemaForumComments.aggregate([
      
      // {
      //   $match: { forumThreads_id: { $in: forumThreads_idArr } }
      // },
      
      {
        $match: {
          $and: [
            { forumThreads_id: { $in: forumThreads_idArr } },
            { forumComments_id: '' },
            // { _id: { '$ne': '' }, },
          ]
        },
      },
      
      
      {
        $lookup:
          {
            from: 'forum-comments',
            let: { forumComments_id: '$_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$forumComments_id', '$$forumComments_id'] }
                    ]
                  },
                }
              },
              { '$sort': { 'updatedDate': -1 } },
              { $skip: (replyPage - 1) * replyLimit },
              { $limit: parseInt(replyLimit, 10) },
              { $project:
                {
                  createdDate: 0,
                  __v: 0,
                }
              },
              
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
              
            ],
            as: 'forumRepliesArr'
          }
      },
      
      
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
      
      
      { $project:
        {
          createdDate: 0,
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
      page: commentPage,
      replyPage,
    });
    
    
    // --------------------------------------------------
    //   Return Object
    // --------------------------------------------------
    
    // const ISO8601 = moment().toISOString();
    
    // const intCommentsLimit = parseInt(commentLimit, 10);
    
    // const returnObj = {
    //   count: lodashGet(userCommunityArr, [0, 'forumObj', 'threadCount'], 0),
    //   page,
    //   limit: intCommentsLimit,
    // };
    
    // lodashSet(returnObj, ['dataObj', `page${page}Obj`, 'loadedDate'], ISO8601);
    // lodashSet(returnObj, ['dataObj', `page${page}Obj`, 'arr'], formattedArr);
    
    
    const page1Obj = {
      
      'qNiOLKdRt': {// スレッド
        'm2N3ijR3A': ['R2hdDidB6'], //コメント [返信]
        '8_AsHN1fm': [],
      }
      
    };
    
    const forumControlObj = {
      threadCount: 5,
      threadPage: 1,
      threadLimit: 5,
      commentLimit: 10,
      replyLimit: 10,
      
      '8xJS6lZCm': {// スレッド
        page: 1,//コメントのページ数
        count: 0,// コメントのカウント数
      },
      'KQ_FuEYRu': {// スレッド
        page: 1,//コメントのページ数
        count: 0,// コメントのカウント数
      },
      'HpzNGyKQE': {// スレッド
        page: 1,//コメントのページ数
        count: 0,// コメントのカウント数
      },
      '_XDDSTWV_': {// スレッド
        page: 1,//コメントのページ数
        count: 0,// コメントのカウント数
      },
      'qNiOLKdRt': {// スレッド
        page: 1,//コメントのページ数
        count: 2,// コメントのカウント数
      },
    };
    
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- localeObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(localeObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- formattedArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(formattedArr)), { colors: true, depth: null })}\n
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
const format = ({ localeObj, loginUsers_id, arr, limit, replyLimit }) => {
  
  
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
    
    const cloneObj = lodashCloneDeep(valueObj);
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    cloneObj.updatedDate = moment(valueObj.updatedDate).format('YYYY/MM/DD hh:mm');
    
    
    // --------------------------------------------------
    //   画像と動画の処理
    // --------------------------------------------------
    
    cloneObj.imagesAndVideosObj.mainArr = formatImagesAndVideosArr({ arr: valueObj.imagesAndVideosObj.mainArr });
    
    
    // --------------------------------------------------
    //   編集権限
    // --------------------------------------------------
    
    cloneObj.editable = false;
    
    if (loginUsers_id && valueObj.users_id === loginUsers_id) {
      cloneObj.editable = true;
    }
    
    
    // --------------------------------------------------
    //   Name & Description
    // --------------------------------------------------
    
    const filteredArr = valueObj.localesArr.filter((filterObj) => {
      return filterObj.language === localeObj.language;
    });
    
    
    if (lodashHas(filteredArr, [0])) {
      
      cloneObj.name = lodashGet(filteredArr, [0, 'name'], '');;
      cloneObj.comment = lodashGet(filteredArr, [0, 'comment'], '');
      
    } else {
      
      cloneObj.name = lodashGet(valueObj, ['localesArr', 0, 'name'], '');
      cloneObj.comment = lodashGet(valueObj, ['localesArr', 0, 'comment'], '');
      
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
      
      delete cloneObj.cardPlayersObj;
      
    } else if (lodashHas(valueObj, ['cardPlayersObj', 'imagesAndVideosObj', 'thumbnailArr'])) {
      
      // --------------------------------------------------
      //   サムネイル画像の処理 - Card Players
      // --------------------------------------------------
      
      const thumbnailArr = lodashGet(valueObj, ['cardPlayersObj', 'imagesAndVideosObj', 'thumbnailArr'], []);
      lodashSet(cloneObj, ['cardPlayersObj', 'imagesAndVideosObj', 'thumbnailArr'], formatImagesAndVideosArr({ arr: thumbnailArr }));
      
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
      });
      
      // lodashSet(cloneObj, ['forumRepliesObj'], formatted2Arr);
      
    }
    
    
    // --------------------------------------------------
    //   不要な項目を削除する
    // --------------------------------------------------
    
    delete cloneObj.createdDate;
    delete cloneObj.users_id;
    delete cloneObj.localesArr;
    delete cloneObj.anonymity;
    delete cloneObj.forumRepliesArr;
    delete cloneObj.ip;
    delete cloneObj.userAgent;
    delete cloneObj.__v;
    
    // console.log(`\n---------- cloneObj ----------\n`);
    // console.dir(cloneObj);
    // console.log(`\n-----------------------------------\n`);
    
    
    
    
    // --------------------------------------------------
    //   push
    // --------------------------------------------------
    
    const parent_id = valueObj.forumThreads_id || valueObj.forumComments_id;
    
    if (parent_id) {
      
      const page = 1;
      
      lodashSet(returnObj, [parent_id, 'count', ], 10);
      lodashSet(returnObj, [parent_id, 'page', ], 1);
      lodashSet(returnObj, [parent_id, 'limit', ], 10);
      
      lodashSet(returnObj, [parent_id, 'dataObj', `page${page}Obj`, 'loadedDate'], ISO8601);
      
      const arr = lodashGet(returnObj, [parent_id, 'dataObj', `page${page}Obj`, 'arr'], []);
      arr.push(cloneObj);
      lodashSet(returnObj, [parent_id, 'dataObj', `page${page}Obj`, 'arr'], arr);
      
    }
    
    // if (valueObj.forumThreads_id) {
      
    //   if (!lodashHas(returnObj, [valueObj.forumThreads_id])) {
    //     lodashSet(returnObj, [valueObj.forumThreads_id], []);
    //   }
      
    //   returnObj[valueObj.forumThreads_id].push(cloneObj);
      
    // } else {
      
    //   if (!lodashHas(returnObj, [valueObj.forumComments_id])) {
    //     lodashSet(returnObj, [valueObj.forumComments_id], []);
    //   }
      
    //   returnObj[valueObj.forumComments_id].push(cloneObj);
      
    // }
    
    
    
    // --------------------------------------------------
    //   Merge - コメントと返信をひとつのオブジェクトにマージする
    // --------------------------------------------------
    
    returnObj = lodashMerge(returnObj, formattedReplyObj);
    
    
    // const clonedReplyObj = lodashCloneDeep(valueObj);
    
    
    // if (!lodashHas(returnObj, ['commentObj', valueObj.forumThreads_id])) {
    //   lodashSet(returnObj, ['commentObj', valueObj.forumThreads_id], []);
    // }
    
    // returnObj.commentObj[valueObj.forumThreads_id].push(cloneObj);
    
    
  }
  
  
  //lodashMerge(clonedObj.forumThreadsForListObj, newObj);
  
  
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