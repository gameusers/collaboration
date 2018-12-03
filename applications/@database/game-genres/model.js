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


// ---------------------------------------------
//   Logger
// ---------------------------------------------

// const logger = require('../../@modules/logger');




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * 取得する
 * @param {Object} conditionObj - 検索条件
 * @return {Object} 取得されたデータ
 */
const find = async (conditionObj) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    const docArr = await Model.find(conditionObj).exec();
    
    // console.log(`
    //   docArr: \n${util.inspect(docArr, { colors: true, depth: null })}
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
 * 挿入 / 更新する
 * @param {Object} conditionObj - 検索条件
 * @param {Object} saveObj - 保存データ
 * @return {Object} 
 */
const upsert = async (conditionObj, saveObj) => {
  
  
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
    
    
    // console.log(`
    //   docArr: \n${util.inspect(docArr, { colors: true, depth: null })}
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
 * 挿入する
 * @param {Object} saveObj - 保存データ
 * @return {Array} 
 */
const insertMany = async (saveObj) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  // let returnObj = {};
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Upsert
    // --------------------------------------------------
    
    const docArr = await Model.insertMany(saveObj);
    
    
    console.log(`
      docArr: \n${util.inspect(docArr, { colors: true, depth: null })}
    `);
    
    
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
  insertMany
};