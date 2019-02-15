// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Validation
// ---------------------------------------------

const validator = require('validator');




/**
 * _id
 * @param {boolean} required - Required
 * @param {string} _id - _id
 */
const validation_id = ({ required, value }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 7;
  const maxLength = 14;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = String(value);
  const numberOfCharacters = data ? data.length : 0;
  
  let resultObj = {
    value: data,
    numberOfCharacters,
    errorCodeArr: []
  };
  
  
  // ---------------------------------------------
  //   Validation
  // ---------------------------------------------
  
  // Not Required で入力値が空の場合、処理停止
  if (!required && validator.isEmpty(data)) {
    return resultObj;
  }
  
  // 存在チェック
  if (validator.isEmpty(data)) {
    resultObj.errorCodeArr.push('pE9jBkXXP');
  }
  
  // 英数と -_ のみ
  if (data.match(/^[\w\-]+$/) === null) {
    resultObj.errorCodeArr.push('8oyLhJOlh');
  }
  
  // 文字数チェック
  if (!validator.isLength(data, { min: minLength, max: maxLength })) {
    resultObj.errorCodeArr.push('N48T3XvnC');
  }
  
  
  // ---------------------------------------------
  //   console.log
  // ---------------------------------------------
  
  // console.log(chalk`
  //   required: {green ${required}}
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

module.exports = validation_id;