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
 * 性別
 * @param {boolean} required - Required
 * @param {string} value - 値
 */
const validationCardPlayersSex = ({ required, value }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  // const minLength = 1;
  // const maxLength = 20;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = String(value);
  const numberOfCharacters = data ? data.length : 0;
  
  let resultObj = {
    value: data,
    numberOfCharacters,
    messageCode: 'SGHeQofcR',
    error: false,
    errorCodeArr: []
  };
  
  
  // ---------------------------------------------
  //   Validation
  // ---------------------------------------------
  
  // Not Required で入力値が空の場合、処理停止
  if (!required && validator.isEmpty(data)) {
    return resultObj;
  }
  
  // 適切な値が選択されているかチェック
  if (!validator.isIn(value, ['male', 'female'])) {
    resultObj.errorCodeArr.push('PH8jcw-VF');
  }
  
  
  // ---------------------------------------------
  //   Message Code & Error
  // ---------------------------------------------
  
  if (resultObj.errorCodeArr.length > 0) {
    resultObj.messageCode = resultObj.errorCodeArr[0];
    resultObj.error = true;
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

module.exports = validationCardPlayersSex;