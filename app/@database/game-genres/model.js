// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

// const shortid = require('shortid');
// const moment = require('moment');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const Model = require('./schema');




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * 取得する
 * @param {Object} argumentsObj - 引数
 * @return {Object} 取得データ
 */
const find = async (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    conditionObj
    
  } = argumentsObj;
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    const docArr = await Model.find(conditionObj).exec();
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return docArr;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 挿入 / 更新する
 * @param {Object} argumentsObj - 引数
 * @return {Object} 
 */
const upsert = async (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    conditionObj,
    saveObj
    
  } = argumentsObj;
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Upsert
    // --------------------------------------------------
    
    const docArr = await Model.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: false, setDefaultsOnInsert: true }).exec();
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return returnObj;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 挿入する
 * @param {Object} argumentsObj - 引数
 * @return {Array} 
 */
const insertMany = async (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    saveArr
    
  } = argumentsObj;
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   insertMany
    // --------------------------------------------------
    
    const docArr = await Model.insertMany(saveArr);
    
    
    // console.log(`
    //   docArr: \n${util.inspect(docArr, { colors: true, depth: null })}
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return docArr;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 削除する
 * @param {Object} argumentsObj - 引数
 * @return {Array} 
 */
const deleteMany = async (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    conditionObj
    
  } = argumentsObj;
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Remove
    // --------------------------------------------------
    
    const docArr = await Model.deleteMany(conditionObj);
    
    
    // console.log(`
    //   docArr: \n${util.inspect(docArr, { colors: true, depth: null })}
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return docArr;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  find,
  upsert,
  insertMany,
  deleteMany
};