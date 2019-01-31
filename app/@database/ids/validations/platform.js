// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');




/**
 * platform
 * @param {boolean} required - Required
 * @param {string} platform - プラットフォーム
 */
const validationPlatform = ({ required, platform }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 2;
  const maxLength = 20;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const value = platform;
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
    resultObj.errorCodeArr.push('dJzAwAva3');
  }
  
  // 文字数チェック
  if (numberOfCharacters < minLength || numberOfCharacters > maxLength) {
    resultObj.errorCodeArr.push('k6cF97QOd');
  }
  
  // 適切な値が選択されているかチェック
  const arr = ['PlayStation', 'Xbox', 'Nintendo', 'Steam', 'PC', 'Android', 'iOS', 'Other'];
  
  if (arr.indexOf(value) === -1) {
    resultObj.errorCodeArr.push('kopWIEmo4');
  }
  
  
  // ---------------------------------------------
  //   console.log
  // ---------------------------------------------
  
  // console.log(chalk`
  //   platform: {green ${platform}}
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

module.exports = validationPlatform;