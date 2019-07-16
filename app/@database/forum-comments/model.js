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

const lodashGet = require('lodash/get');


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
const findForForumCommentsAndReplies = async ({ localeObj, loginUsers_id, forumThreads_idArr, commentsPage, commentsLimit = process.env.FORUM_COMMENTS_LIMIT, repliesPage, repliesLimit = process.env.FORUM_REPLIES_LIMIT }) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Forum Comments & Replies データ取得
    // --------------------------------------------------
    
    const resultArr = await SchemaForumComments.aggregate([
      
      {
        $match: { forumThreads_id: { $in: forumThreads_idArr } }
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
              { $skip: (repliesPage - 1) * repliesLimit },
              { $limit: parseInt(repliesLimit, 10) },
              { $project:
                {
                  createdDate: 0,
                  __v: 0,
                }
              }
            ],
            as: 'forumRepliesArr'
          }
      },
      
      
      { $project:
        {
          createdDate: 0,
          __v: 0,
        }
      },
      
      
      { '$sort': { 'updatedDate': -1 } },
      { $skip: (commentsPage - 1) * commentsLimit },
      { $limit: parseInt(commentsLimit, 10) },
      
    ]).exec();
    
    
    console.log(`
      ----- findForForumCommentsAndReplies / resultArr -----\n
      ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    
    // // --------------------------------------------------
    // //   forumComments_id を取得して配列に追加する
    // // --------------------------------------------------
    
    // const forumComments_idArr = [];
    
    // for (let value1Obj of resultThreadsCommentsArr.values()) {
      
    //   // console.log(index);
      
    //   // console.log(`\n---------- value1Obj.forumCommentsArr ----------\n`);
    //   // console.dir(value1Obj.forumCommentsArr);
    //   // console.log(`\n-----------------------------------\n`);
      
      
    //   for (let value2Obj of value1Obj.forumCommentsArr.values()) {
        
    //     // console.log(`\n---------- value2Obj ----------\n`);
    //     // console.dir(value2Obj);
    //     // console.log(`\n-----------------------------------\n`);
        
    //     if (value2Obj._id) {
    //       forumComments_idArr.push(value2Obj._id);
    //     }
        
    //   }
      
    // }
    
    // // console.log(`\n---------- forumComments_idArr ----------\n`);
    // // console.dir(forumComments_idArr);
    // // console.log(`\n-----------------------------------\n`);
    
    
    // // --------------------------------------------------
    // //   コメントに対する返信　データ取得
    // // --------------------------------------------------
    
    // let resultRepliesArr = await SchemaForumComments.aggregate([
      
    //   {
    //     $match : { forumComments_id: { $in: forumComments_idArr } }
    //   },
      
      
    //   { $project:
    //     {
    //       __v: 0,
    //     }
    //   },
      
      
    //   { '$sort': { 'updatedDate': -1 } },
    //   { $skip: 0 },
    //   { $limit: 1 },
      
    // ]).exec();
    
    
    // // --------------------------------------------------
    // //   コメントに対する返信　データを整える
    // // --------------------------------------------------
    // // loginUsers_id = 'jun-deE4J';
    // const repliesObj = {};
    
    // for (const [index, valueObj] of resultRepliesArr.entries()) {
      
      
    //   // 匿名の場合はユーザー情報を削除する
    //   if (valueObj.anonymity && loginUsers_id !== valueObj.users_id) {
    //     lodashSet(resultRepliesArr, [index, 'users_id'], '');
    //   }
      
    //   // 匿名の項目を削除
    //   delete valueObj.anonymity;
      
      
    //   // 配列を作成する
    //   if (!lodashHas(repliesObj, [valueObj.forumComments_id])) {
    //     repliesObj[valueObj.forumComments_id] = [];
    //   }
      
    //   // 配列に追加
    //   repliesObj[valueObj.forumComments_id].push(valueObj);
      
      
    //   // console.log(chalk`
    //   //   index: {green ${index}}
    //   //   valueObj.anonymity: {green ${valueObj.anonymity}}
    //   // `);
      
    // }
    
    // // console.log(`\n---------- repliesObj ----------\n`);
    // // console.dir(repliesObj);
    // // console.log(`\n-----------------------------------\n`);
    
    
    
    
    // // --------------------------------------------------
    // //   フォーラムデータ生成
    // // --------------------------------------------------
    
    // for (const [index1, value1Obj] of resultThreadsCommentsArr.entries()) {
      
    //   // console.log(chalk`
    //   //   index1: {green ${index1}}
    //   // `);
      
    //   // console.log(`\n---------- value1Obj.forumCommentsArr ----------\n`);
    //   // console.dir(value1Obj.forumCommentsArr);
    //   // console.log(`\n-----------------------------------\n`);
      
      
      
      
    //   for (const [index2, value2Obj] of value1Obj.forumCommentsArr.entries()) {
        
    //     // console.log(chalk`
    //     //   index2: {green ${index2}}
    //     // `);
        
    //     // console.log(`\n---------- value2Obj ----------\n`);
    //     // console.dir(value2Obj);
    //     // console.log(`\n-----------------------------------\n`);
        
    //     lodashSet(resultThreadsCommentsArr, [index1, 'forumCommentsArr', index2, 'forumRepliesArr'], repliesObj[value2Obj._id]);
        
    //   }
      
    // }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- localeObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(localeObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- conditionObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(conditionObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- resultThreadsCommentsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultThreadsCommentsArr)), { colors: true, depth: null })}\n
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
    const returnObj = {};
    return returnObj;
    
    
  } catch (err) {
    
    throw err;
    
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
};