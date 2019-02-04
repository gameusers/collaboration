// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelIDs = require('../model');


// ---------------------------------------------
//   Validation
// ---------------------------------------------

const validator = require('validator');




/**
 * _id
 * @param {boolean} required - Required
 * @param {string} _id - db ids _id
 * @param {Object} conditionObj - 検索条件
 */
const validationIDs_idServer = async ({ required, _id, conditionObj }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 7;
  const maxLength = 14;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const value = String(_id);
  const numberOfCharacters = value ? value.length : 0;
  
  let resultObj = {
    value,
    numberOfCharacters,
    errorCodeArr: []
  };
  
  
  // ---------------------------------------------
  //   Validation
  // ---------------------------------------------
  
  // Not Required で入力値が空の場合、処理停止
  if (!required && validator.isEmpty(value)) {
    return resultObj;
  }
  
  // 存在チェック
  if (validator.isEmpty(value)) {
    resultObj.errorCodeArr.push('fKnyEX5Px');
  }
  
  // 英数と -_ のみ
  if (value.match(/^[\w\-]+$/) === null) {
    resultObj.errorCodeArr.push('0Nm7pQeYW');
  }
  
  // 文字数チェック
  if (!validator.isLength(value, { min: minLength, max: maxLength })) {
    resultObj.errorCodeArr.push('Vg08kFRAe');
  }
  
  // データベースに存在しているか＆編集権限チェック
  const count = await ModelIDs.count(conditionObj);
  
  if (count === 0) {
    resultObj.errorCodeArr.push('uhe5ZzGvK');
  }
  
  
  // ---------------------------------------------
  //   console.log
  // ---------------------------------------------
  
  // console.log(chalk`
  //   _id: {green ${_id}}
  // `);
  
  // console.log(`
  //   ----- resultObj -----\n
  //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  return resultObj;
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = validationIDs_idServer;