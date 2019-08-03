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

const SchemaUserCommunities = require('./schema');


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
    
    return await SchemaUserCommunities.findOne(conditionObj).exec();
    
    
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
    
    return await SchemaUserCommunities.find(conditionObj).exec();
    
    
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
    
    return await SchemaUserCommunities.countDocuments(conditionObj).exec();
    
    
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
    
    return await SchemaUserCommunities.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    
    
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
    
    return await SchemaUserCommunities.insertMany(saveArr);
    
    
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
    
    return await SchemaUserCommunities.deleteMany(conditionObj);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 検索してデータを取得する / For User Community
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} userCommunityID - DB user-communities userCommunityID / コミュニティID
 * @return {Array} 取得データ
 */
const findForUserCommunity = async ({ localeObj, loginUsers_id, userCommunityID }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Condition
    // --------------------------------------------------
    
    const conditionObj = {
      userCommunityID,
    };
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    const resultArr = await SchemaUserCommunities.find(conditionObj).exec();
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const formattedArr = format({
      localeObj,
      loginUsers_id,
      arr: resultArr,
    });
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   userCommunityID: {green ${userCommunityID}}
    // `);
    
    // console.log(`
    //   ----- Threads -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return formattedArr;
    
    
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
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----- localeObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(localeObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(chalk`
  //   loginUsers_id: {green ${loginUsers_id}}
  // `);
  
  // console.log(`
  //   ----- arr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnArr = [];
  
  
  // --------------------------------------------------
  //   Loop
  // --------------------------------------------------
  
  for (let obj of arr.values()) {
    
    
    // --------------------------------------------------
    //   toJSON
    // --------------------------------------------------
    
    let valueObj = obj.toJSON();
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    // cloneObj.updatedDate = moment(valueObj.updatedDate).format('YYYY/MM/DD hh:mm');
    
    
    // --------------------------------------------------
    //   画像の処理
    // --------------------------------------------------
    // とりあえず画像の処理はしない
    // valueObj.imagesAndVideosObj.thumbnailArr = formatImagesAndVideosArr({ arr: valueObj.imagesAndVideosObj.thumbnailArr });
    // valueObj.imagesAndVideosObj.mainArr = formatImagesAndVideosArr({ arr: valueObj.imagesAndVideosObj.mainArr });
    
    
    // --------------------------------------------------
    //   Locale
    // --------------------------------------------------
    
    const filteredArr = valueObj.localesArr.filter((filterObj) => {
      return filterObj.language === localeObj.language;
    });
    
    
    if (lodashHas(filteredArr, [0])) {
      
      valueObj.name = lodashGet(filteredArr, [0, 'name'], '');;
      valueObj.description = lodashGet(filteredArr, [0, 'description'], '');
      
    } else {
      
      valueObj.name = lodashGet(valueObj, ['localesArr', 0, 'name'], '');
      valueObj.description = lodashGet(valueObj, ['localesArr', 0, 'description'], '');
      
    }
    
    
    // console.log(`
    //   ----- filteredArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(filteredArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   不要な項目を削除する
    // --------------------------------------------------
    
    delete valueObj.localesArr;
    delete valueObj.__v;
    
    // console.log(`\n---------- valueObj ----------\n`);
    // console.dir(valueObj);
    // console.log(`\n-----------------------------------\n`);
    
    
    // --------------------------------------------------
    //   push
    // --------------------------------------------------
    
    returnArr.push(valueObj);
    
    
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
  findForUserCommunity,
};