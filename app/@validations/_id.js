// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');




/**
 * _id
 * @param {boolean} required - Required
 * @param {string} _id - _id
 */
const validation_id = ({ required, _id }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 7;
  const maxLength = 14;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const value = _id;
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
  if (!required && value === '') {
    return resultObj;
  }
  
  // 存在チェック
  if (value === '') {
    resultObj.errorCodeArr.push('pE9jBkXXP');
  }
  
  // 英数と -_ のみ
  if (value.match(/^[\w\-]+$/) === null) {
    resultObj.errorCodeArr.push('8oyLhJOlh');
  }
  
  // 文字数チェック
  if (numberOfCharacters < minLength || numberOfCharacters > maxLength) {
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