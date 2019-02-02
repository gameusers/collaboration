// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');




/**
 * id
 * @param {boolean} required - Required
 * @param {string} id - ID
 */
const validationIDsID = ({ required, id }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 1;
  const maxLength = 128;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const value = id;
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
    resultObj.errorCodeArr.push('FsjP5Xb5h');
  }
  
  // 文字数チェック
  if (numberOfCharacters < minLength || numberOfCharacters > maxLength) {
    resultObj.errorCodeArr.push('RheyjmgKo');
  }
  
  
  // ---------------------------------------------
  //   console.log
  // ---------------------------------------------
  
  // console.log(chalk`
  //   id: {green ${id}}
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

module.exports = validationIDsID;