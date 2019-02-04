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
 * publicSetting
 * @param {boolean} required - Required
 * @param {string} publicSetting - 公開設定
 */
const validationIDsPublicSetting = ({ required, publicSetting }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minNumber = 1;
  const maxNumber = 5;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const value = String(publicSetting);
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
    resultObj.errorCodeArr.push('Fafdlkugx');
  }
  
  // 数字が範囲内に収まっているかチェック
  if (!validator.isInt(value, { min: minNumber, max: maxNumber })) {
    resultObj.errorCodeArr.push('1wG57OGCe');
  }
  
  // 適切な値が選択されているかチェック
  // const pattern = new RegExp(`^[${minNumber}-${maxNumber}]$`);
  
  // if (String(value).match(pattern) === null) {
  //   resultObj.errorCodeArr.push('1wG57OGCe');
  // }
  
  
  // ---------------------------------------------
  //   console.log
  // ---------------------------------------------
  
  // console.log(chalk`
  //   publicSetting: {green ${publicSetting}}
  //   String(value): {green ${String(value)}}
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

module.exports = validationIDsPublicSetting;