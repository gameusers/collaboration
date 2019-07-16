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
const SchemaUserCommunities = require('../user-communities/schema');

const ModelForumComments = require('../forum-comments/model');
const ModelUserCommunities = require('../user-communities/model');


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
 * スレッド一覧を取得する
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
 * @param {number} page - ページ
 * @param {number} limit - 1ページに表示する件数
 * @return {Array} 取得データ
 */
const findForList = async ({ localeObj, loginUsers_id, userCommunities_id, page, limit = process.env.FORUM_THREADS_LIST_LIMIT }) => {
  
  
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
    
    const formattedArr = [];
    
    for (let valueObj of resultArr.values()) {
      
      
      // --------------------------------------------------
      //   ディープコピー
      // --------------------------------------------------
      
      let cloneObj = lodashCloneDeep(valueObj.toJSON());
      
      
      // --------------------------------------------------
      //   Datetime
      // --------------------------------------------------
      
      cloneObj.updatedDate = moment(valueObj.updatedDate).format('YYYY/MM/DD hh:mm');
      
      
      // --------------------------------------------------
      //   編集権限
      // --------------------------------------------------
      
      cloneObj.editable = false;
      
      if (loginUsers_id && valueObj.users_id === loginUsers_id) {
        cloneObj.editable = true;
      }
      
      
      // --------------------------------------------------
      //   Locale
      // --------------------------------------------------
      
      const filteredArr = valueObj.localesArr.filter((filterObj) => {
        return filterObj.language === localeObj.language;
      });
      
      
      if (lodashHas(filteredArr, [0])) {
        
        cloneObj.name = lodashGet(filteredArr, [0, 'name'], '');;
        
      } else {
        
        cloneObj.name = lodashGet(valueObj, ['localesArr', 0, 'name'], '');
        
      }
      
      
      // --------------------------------------------------
      //   不要な項目を削除する
      // --------------------------------------------------
      
      delete cloneObj.createdDate;
      delete cloneObj.users_id;
      delete cloneObj.localesArr;
      delete cloneObj.imagesAndVideosObj;
      delete cloneObj.ip;
      delete cloneObj.userAgent;
      delete cloneObj.__v;
      
      // console.log(`\n---------- cloneObj ----------\n`);
      // console.dir(cloneObj);
      // console.log(`\n-----------------------------------\n`);
      
      
      // --------------------------------------------------
      //   push
      // --------------------------------------------------
      
      formattedArr.push(cloneObj);
      
      
    }
    
    
    // --------------------------------------------------
    //   Count
    // --------------------------------------------------
    
    const userCommunityArr = await ModelUserCommunities.find({
      conditionObj: {
        _id: userCommunities_id
      }
    });
    
    
    // --------------------------------------------------
    //   Return Object
    // --------------------------------------------------
    
    const ISO8601 = moment().toISOString();
    
    const returnObj = {
      count: lodashGet(userCommunityArr, [0, 'forumObj', 'threadCount'], 0),
      page,
      limit: intLimit,
    };
    
    lodashSet(returnObj, ['dataObj', `page${page}Obj`, 'loadedDate'], ISO8601);
    lodashSet(returnObj, ['dataObj', `page${page}Obj`, 'arr'], formattedArr);
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   page: {green ${page}}
    //   limit: {green ${limit}}
    // `);
    
    // console.log(`
    //   ----- /app/@database/forum-threads/model.js / resultArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- Threads -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(returnObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- userCommunityArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(userCommunityArr)), { colors: true, depth: null })}\n
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
 * スレッドを取得する
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} forumThreads_idArr - DB forum-threads _id / スレッドのIDが入った配列
 * @return {Array} 取得データ
 */
const findForForum = async ({ localeObj, loginUsers_id, userCommunities_id, page, limit = process.env.FORUM_THREADS_LIMIT }) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Condition
    // --------------------------------------------------
    
    const conditionObj = {
      userCommunities_id,
    };
    
    // const conditionObj = {
    //   _id: { $in: forumThreads_idArr },
    // };
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    const intLimit = parseInt(limit, 10);
    
    const resultArr = await SchemaForumThreads.find(conditionObj).sort({ updatedDate: -1 }).skip((page - 1) * limit).limit(intLimit).exec();
    // const resultArr = await SchemaForumThreads.find(conditionObj).exec();
    
    
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
    
    const userCommunityArr = await ModelUserCommunities.find({
      conditionObj: {
        _id: userCommunities_id
      }
    });
    
    
    // --------------------------------------------------
    //   Return Object
    // --------------------------------------------------
    
    const ISO8601 = moment().toISOString();
    
    // const returnObj = {};
    
    const returnObj = {
      count: lodashGet(userCommunityArr, [0, 'forumObj', 'threadCount'], 0),
      page,
      limit: intLimit,
    };
    
    lodashSet(returnObj, ['dataObj', `page${page}Obj`, 'loadedDate'], ISO8601);
    lodashSet(returnObj, ['dataObj', `page${page}Obj`, 'arr'], formattedArr);
    
    
    // --------------------------------------------------
    //   DB find / Forum Comments & Replies
    // --------------------------------------------------
    
    const forumCommentsAndRepliesArr = await ModelForumComments.findForForumCommentsAndReplies({
      localeObj,
      loginUsers_id,
      forumThreads_idArr: ['qNiOLKdRt'],
      commentsPage: 1,
      repliesPage: 1,
    });
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   page: {green ${page}}
    //   limit: {green ${limit}}
    // `);
    
    // console.log(`
    //   ----- /app/@database/forum-threads/model.js / resultArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- formattedArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(formattedArr)), { colors: true, depth: null })}\n
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
* DBから取得した情報をフォーマットする
* @param {Object} localeObj - ロケール
* @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
* @param {Array} arr - 配列
* @return {Array} フォーマット後のデータ
*/
const format = ({ localeObj, loginUsers_id, arr }) => {
  
  
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
    //   編集権限
    // --------------------------------------------------
    
    cloneObj.editable = false;
    
    if (loginUsers_id && valueObj.users_id === loginUsers_id) {
      cloneObj.editable = true;
    }
    
    // --------------------------------------------------
    //   スレッドを作成した本人以外の場合、users_idを削除する
    // --------------------------------------------------
    
    // if (cloneObj.users_id !== loginUsers_id) {
    //   cloneObj.users_id = '';
    // }
    
    
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
    
    delete cloneObj.createdDate;
    delete cloneObj.users_id;
    delete cloneObj.localesArr;
    delete cloneObj.ip;
    delete cloneObj.userAgent;
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
 * 挿入 / 更新する  スレッド用
 * @param {Object} forumThreadsConditionObj - DB forum-threads 検索条件
 * @param {Object} forumThreadsSaveObj - DB forum-threads 保存データ
 * @param {Object} userCommunitiesConditionObj - DB user-communities 検索条件
 * @param {Object} userCommunitiesSaveObj - DB user-communities 保存データ
 * @return {Object} 
 */
const transactionForThread = async ({ forumThreadsConditionObj, forumThreadsSaveObj, userCommunitiesConditionObj, userCommunitiesSaveObj }) => {
  
  
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
    
    await SchemaForumThreads.updateOne(forumThreadsConditionObj, forumThreadsSaveObj, { session, upsert: true });
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
  findForList,
  findForForum,
  transactionForThread,
};