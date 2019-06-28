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
// const SchemaForumComments = require('../forum-comments/schema');
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
 * @param {number} page - ページ
 * @param {number} limit - 1ページに表示する件数
 * @return {Array} 取得データ
 */
const findForForumThreads = async ({ localeObj, loginUsers_id, userCommunities_id, page, limit = process.env.FORUM_THREADS_LIMIT }) => {
  
  
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