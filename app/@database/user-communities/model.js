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

const SchemaForumThreads = require('./schema');
const SchemaForumComments = require('../forum-comments/schema');


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
    
    return await SchemaForumThreads.findOne(conditionObj).exec();
    
    
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
    
    return await SchemaForumThreads.find(conditionObj).exec();
    
    
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
    
    return await SchemaForumThreads.countDocuments(conditionObj).exec();
    
    
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
    
    return await SchemaForumThreads.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    
    
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
    
    return await SchemaForumThreads.insertMany(saveArr);
    
    
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
    
    return await SchemaForumThreads.deleteMany(conditionObj);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 検索してデータを取得する / User 用（サムネイル・ハンドルネーム・ステータス）
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @return {Array} 取得データ
 */
const findForForumThreads = async ({ localeObj, loginUsers_id, userCommunities_id, page, limit = process.env.FORUM_THREADS_LIMIT }) => {
  
  // console.log('findForForum');
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Condition
    // --------------------------------------------------
    
    const conditionObj = {
      userCommunities_id,
    };
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    const intLimit = parseInt(limit, 10);
    
    const resultArr = await SchemaForumThreads.find(conditionObj).sort({ updatedDate: -1 }).skip((page - 1) * limit).limit(intLimit).exec();
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const formattedArr = format({
      localeObj,
      loginUsers_id,
      arr: resultArr,
    });
    
    
    // --------------------------------------------------
    //   Count
    // --------------------------------------------------
    
    const count = await SchemaForumThreads.countDocuments(conditionObj).exec();
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    const ISO8601 = moment().toISOString();
    
    return {
      count,
      limit: intLimit,
      dataObj: {
        1: {
          datetime: ISO8601,
          dataArr: formattedArr,
        },
      },
    };
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    // `);
    
    // console.log(`
    //   ----- Threads -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- Threads -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(returnArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    // return returnObj;
    
    
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
const format = ({ localeObj, loginUsers_id, arr }) => {
  
  // console.log(`
  //     ----- localeObj -----\n
  //     ${util.inspect(JSON.parse(JSON.stringify(localeObj)), { colors: true, depth: null })}\n
  //     --------------------\n
  //   `);
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnArr = [];
  
  
  // --------------------------------------------------
  //   Loop
  // --------------------------------------------------
  
  for (let valueObj of arr.values()) {
    
    
    // --------------------------------------------------
    //   ディープコピー
    // --------------------------------------------------
    
    let cloneObj = lodashCloneDeep(valueObj.toJSON());
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    cloneObj.updatedDate = moment(valueObj.updatedDate).format('YYYY/MM/DD hh:mm');
    
    
    // --------------------------------------------------
    //   画像の処理
    // --------------------------------------------------
    
    cloneObj.imagesAndVideosObj.mainArr = formatImagesAndVideosArr({ arr: cloneObj.imagesAndVideosObj.mainArr });
    
    
    // --------------------------------------------------
    //   スレッドを作成した本人以外の場合、users_idを削除する
    // --------------------------------------------------
    
    if (cloneObj.users_id !== loginUsers_id) {
      cloneObj.users_id = '';
    }
    
    
    // --------------------------------------------------
    //   Locale
    // --------------------------------------------------
    
    const filteredArr = valueObj.localesArr.filter((filterObj) => {
      return filterObj.language === localeObj.language;
    });
    
    
    if (lodashHas(filteredArr, [0])) {
      
      cloneObj.name = lodashGet(filteredArr, [0, 'name'], '');;
      cloneObj.description = lodashGet(filteredArr, [0, 'description'], '');
      
    } else {
      
      cloneObj.name = lodashGet(valueObj, ['localesArr', 0, 'name'], '');
      cloneObj.description = lodashGet(valueObj, ['localesArr', 0, 'description'], '');
      
    }
    
    
    
    // console.log(`
    //   ----- filteredArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(filteredArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // --------------------------------------------------
    //   不要な項目を削除する
    // --------------------------------------------------
    // console.log(chalk`
    //   cloneObj.images: {green ${cloneObj.images}}
    // `);
    delete cloneObj.createdDate;
    delete cloneObj.localesArr;
    delete cloneObj.__v;
    
    // console.log(`\n---------- cloneObj ----------\n`);
    // console.dir(cloneObj);
    // console.log(`\n-----------------------------------\n`);
    
    
    // --------------------------------------------------
    //   push
    // --------------------------------------------------
    
    returnArr.push(cloneObj);
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return returnArr;
  
  
};





/**
 * 検索してデータを取得する / User 用（サムネイル・ハンドルネーム・ステータス）
 * @param {Object} localeObj - ロケール
 * @param {Object} conditionObj - 検索条件
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @return {Array} 取得データ
 */
// const findForForum = async ({ localeObj, conditionObj, loginUsers_id }) => {
  
//   // console.log('findForForum');
  
//   // --------------------------------------------------
//   //   Database
//   // --------------------------------------------------
  
//   try {
    
    
//     // --------------------------------------------------
//     //   Forum Threads & Comments データ取得
//     // --------------------------------------------------
    
//     let resultThreadsCommentsArr = await SchemaForumThreads.aggregate([
      
//       {
//         $match : conditionObj
//       },
      
      
//       {
//         $lookup:
//           {
//             from: 'forum-comments',
//             let: { forumThreads_id: '$_id' },
//             pipeline: [
//               { $match:
//                 { $expr:
//                   { $and:
//                     [
//                       { $eq: ['$forumThreads_id', '$$forumThreads_id'] }
//                     ]
//                   },
//                 }
//               },
//               { '$sort': { 'updatedDate': -1 } },
//               { $skip: 0 },
//               { $limit: 10 },
//               { $project:
//                 {
//                   // _id: 1,
//                   createdDate: 0,
//                   __v: 0,
//                   // nameObj: 1,
//                   // statusObj: 1,
//                   // imagesAndVideosObj: 1,
//                 }
//               }
//             ],
//             as: 'forumCommentsArr'
//           }
//       },
      
      
//       { $project:
//         {
//           createdDate: 0,
//           __v: 0,
//         }
//       },
      
      
//       { '$sort': { 'updatedDate': -1 } },
//       { $skip: 0 },
//       { $limit: 10 },
      
//     ]).exec();
    
    
    
    
//     // --------------------------------------------------
//     //   forumComments_id を取得して配列に追加する
//     // --------------------------------------------------
    
//     const forumComments_idArr = [];
    
//     for (let value1Obj of resultThreadsCommentsArr.values()) {
      
//       // console.log(index);
      
//       // console.log(`\n---------- value1Obj.forumCommentsArr ----------\n`);
//       // console.dir(value1Obj.forumCommentsArr);
//       // console.log(`\n-----------------------------------\n`);
      
      
//       for (let value2Obj of value1Obj.forumCommentsArr.values()) {
        
//         // console.log(`\n---------- value2Obj ----------\n`);
//         // console.dir(value2Obj);
//         // console.log(`\n-----------------------------------\n`);
        
//         if (value2Obj._id) {
//           forumComments_idArr.push(value2Obj._id);
//         }
        
//       }
      
//     }
    
//     // console.log(`\n---------- forumComments_idArr ----------\n`);
//     // console.dir(forumComments_idArr);
//     // console.log(`\n-----------------------------------\n`);
    
    
//     // --------------------------------------------------
//     //   コメントに対する返信　データ取得
//     // --------------------------------------------------
    
//     let resultRepliesArr = await SchemaForumComments.aggregate([
      
//       {
//         $match : { forumComments_id: { $in: forumComments_idArr } }
//       },
      
      
//       { $project:
//         {
//           __v: 0,
//         }
//       },
      
      
//       { '$sort': { 'updatedDate': -1 } },
//       { $skip: 0 },
//       { $limit: 1 },
      
//     ]).exec();
    
    
//     // --------------------------------------------------
//     //   コメントに対する返信　データを整える
//     // --------------------------------------------------
//     // loginUsers_id = 'jun-deE4J';
//     const repliesObj = {};
    
//     for (const [index, valueObj] of resultRepliesArr.entries()) {
      
      
//       // 匿名の場合はユーザー情報を削除する
//       if (valueObj.anonymity && loginUsers_id !== valueObj.users_id) {
//         lodashSet(resultRepliesArr, [index, 'users_id'], '');
//       }
      
//       // 匿名の項目を削除
//       delete valueObj.anonymity;
      
      
//       // 配列を作成する
//       if (!lodashHas(repliesObj, [valueObj.forumComments_id])) {
//         repliesObj[valueObj.forumComments_id] = [];
//       }
      
//       // 配列に追加
//       repliesObj[valueObj.forumComments_id].push(valueObj);
      
      
//       // console.log(chalk`
//       //   index: {green ${index}}
//       //   valueObj.anonymity: {green ${valueObj.anonymity}}
//       // `);
      
//     }
    
//     // console.log(`\n---------- repliesObj ----------\n`);
//     // console.dir(repliesObj);
//     // console.log(`\n-----------------------------------\n`);
    
    
    
    
//     // --------------------------------------------------
//     //   フォーラムデータ生成
//     // --------------------------------------------------
    
//     for (const [index1, value1Obj] of resultThreadsCommentsArr.entries()) {
      
//       // console.log(chalk`
//       //   index1: {green ${index1}}
//       // `);
      
//       // console.log(`\n---------- value1Obj.forumCommentsArr ----------\n`);
//       // console.dir(value1Obj.forumCommentsArr);
//       // console.log(`\n-----------------------------------\n`);
      
      
      
      
//       for (const [index2, value2Obj] of value1Obj.forumCommentsArr.entries()) {
        
//         // console.log(chalk`
//         //   index2: {green ${index2}}
//         // `);
        
//         // console.log(`\n---------- value2Obj ----------\n`);
//         // console.dir(value2Obj);
//         // console.log(`\n-----------------------------------\n`);
        
//         lodashSet(resultThreadsCommentsArr, [index1, 'forumCommentsArr', index2, 'forumRepliesArr'], repliesObj[value2Obj._id]);
        
//       }
      
//     }
    
    
    
    
//     // --------------------------------------------------
//     //   console.log
//     // --------------------------------------------------
    
//     // console.log(`
//     //   ----- localeObj -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(localeObj)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- conditionObj -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(conditionObj)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- resultThreadsCommentsArr -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(resultThreadsCommentsArr)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- resultRepliesArr -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(resultRepliesArr)), { colors: true, depth: null })}\n
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
//     // const returnObj = {};
//     return resultThreadsCommentsArr;
    
    
//   } catch (err) {
    
//     throw err;
    
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
  findForForumThreads,
};