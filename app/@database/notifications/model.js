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
// const SchemaUsers = require('../users/schema');

const ModelRecruitmentThreads = require('../recruitment-threads/model.js');
const ModelRecruitmentComments = require('../recruitment-comments/model.js');
// const ModelRecruitmentThreads = require('../recruitment-threads/model.js');





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
//   find
// --------------------------------------------------

/**
 * 募集（コメント＆返信を含む全てのデータ）を取得する
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
 * @param {Array} threads_idsArr - DB recruitment-threads _id / スレッドID（threads_idsArr という名前に変更しているのは、下の方に recruitmentThreads_idsArr が存在しているから）
 * @param {number} threadPage - スレッドのページ
 * @param {number} threadLimit - スレッドのリミット
 * @param {number} commentPage - コメントのページ
 * @param {number} commentLimit - コメントのリミット
 * @param {number} replyPage - 返信のページ
 * @param {number} replyLimit - 返信のリミット
 * @return {Array} 取得データ
 */
const sendNotifications = async ({}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Language & Country
    // --------------------------------------------------
    
    // const language = lodashGet(localeObj, ['language'], '');
    // const country = lodashGet(localeObj, ['country'], '');
    
    
    // --------------------------------------------------
    //   Parse
    // --------------------------------------------------
    
    // const intThreadLimit = parseInt(threadLimit, 10);
    // const intCommentLimit = parseInt(commentLimit, 10);
    // const intReplyLimit = parseInt(replyLimit, 10);
    
    
    
    
    // --------------------------------------------------
    //   Parse
    // --------------------------------------------------
    
    const notificationsObj = await findOne({
      
      conditionObj: {
        done: false,
      }
      
    });
    
    
    const targetsArr = lodashGet(notificationsObj, ['targetsArr'], []);
    
    for (let valueObj of targetsArr.values()) {
      
      if (valueObj.targetType === 'recruitment-threads') {
        
        await ModelRecruitmentThreads.findForNotification({
          
          _id: valueObj.target_id
          
        });
        
      }
      
    }
    
    
    console.log(`
      ----- notificationsObj -----\n
      ${util.inspect(notificationsObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    // console.log(`
    //   ----- notificationsObj -----\n
    //   ${util.inspect(notificationsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    // --------------------------------------------------
    //   Match Condition Array
    // --------------------------------------------------
    
    // let matchConditionArr = [];
    
    // matchConditionArr = [
    //   {
    //     $match: { gameCommunities_id }
    //   },
    // ];
    
    
    // // ---------------------------------------------
    // //   - コメント更新時
    // // ---------------------------------------------
    
    // if (recruitmentThreads_idsArr.length > 0) {
      
    //   matchConditionArr = [
    //     {
    //       $match: {
    //         $and:
    //           [
    //             { gameCommunities_id },
    //             { _id: { $in: recruitmentThreads_idsArr } }
    //           ]
    //       }
    //     },
    //   ];
      
    // }
    
    
    
    
    // // --------------------------------------------------
    // //   Aggregate
    // // --------------------------------------------------
    
    // const docArr = await aggregate({
      
    //   req,
    //   localeObj,
    //   loginUsers_id,
    //   matchConditionArr,
    //   threadPage,
    //   threadLimit,
      
    // });
    
    
    
    
    // // --------------------------------------------------
    // //   Format
    // // --------------------------------------------------
    
    // const formattedThreadsObj = formatRecruitmentThreadsArr({
      
    //   req,
    //   localeObj,
    //   loginUsers_id,
    //   arr: docArr,
    //   threadPage,
    //   // threadCount,
      
    // });
    
    // const recruitmentThreadsObj = lodashGet(formattedThreadsObj, ['recruitmentThreadsObj'], {});
    // // const recruitmentThreads_idsArr = lodashGet(formattedThreadsObj, ['recruitmentThreads_idsArr'], []);
    
    
    
    
    // // --------------------------------------------------
    // //   DB find / Comments & Replies
    // // --------------------------------------------------
    
    // const formattedCommentsAndRepliesObj = await ModelRecruitmentComments.findCommentsAndReplies({
      
    //   req,
    //   localeObj,
    //   loginUsers_id,
    //   recruitmentThreads_idsArr: lodashGet(formattedThreadsObj, ['recruitmentThreads_idsArr'], []),
    //   recruitmentThreadsObj,
    //   commentPage,
    //   commentLimit: intCommentLimit,
    //   replyPage,
    //   replyLimit: intReplyLimit,
      
    // });
    
    // const recruitmentCommentsObj = lodashGet(formattedCommentsAndRepliesObj, ['recruitmentCommentsObj'], {});
    // const recruitmentRepliesObj = lodashGet(formattedCommentsAndRepliesObj, ['recruitmentRepliesObj'], {});
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/recruitment-threads/model.js - findRecruitments
    // `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   threadPage: {green ${threadPage}}
    //   threadLimit: {green ${threadLimit}}
    //   commentPage: {green ${commentPage}}
    //   commentLimit: {green ${commentLimit}}
    //   replyPage: {green ${replyPage}}
    //   replyLimit: {green ${replyLimit}}
    // `);
    
    // console.log(`
    //   ----- docArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- recruitmentThreadsObj -----\n
    //   ${util.inspect(recruitmentThreadsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- recruitmentCommentsObj -----\n
    //   ${util.inspect(recruitmentCommentsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- recruitmentRepliesObj -----\n
    //   ${util.inspect(recruitmentRepliesObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    // return {
      
    //   recruitmentThreadsObj,
    //   recruitmentCommentsObj,
    //   recruitmentRepliesObj,
      
    // };
    
    
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
  
  sendNotifications,
  
};