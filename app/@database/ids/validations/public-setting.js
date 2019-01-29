// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');




/**
 * publicSetting
 * @param {string} publicSetting - 公開設定
 */
const validationPublicSetting = ({ publicSetting }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minNumber = 1;
  const maxNumber = 5;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const beforeValue = publicSetting;
  const beforeNumberOfCharacters = beforeValue ? beforeValue.length : 0;
  
  // const afterValue = beforeValue ? parseInt(beforeValue, 10) : 0;
  const afterValue = beforeValue ? beforeValue : 0;
  const afterNumberOfCharacters = afterValue ? String(afterValue).length : 0;
  
  let resultObj = {
    beforeValue,
    beforeNumberOfCharacters,
    afterValue,
    afterNumberOfCharacters,
    errorCodeArr: []
  };
  
  
  // ---------------------------------------------
  //   Validation
  // ---------------------------------------------
  
  // 存在チェック
  if (beforeValue === '') {
    resultObj.errorCodeArr.push('Fafdlkugx');
  }
  
  // 適切な値が選択されているかチェック
  const pattern = new RegExp(`^[${minNumber}-${maxNumber}]$`);
  
  if (beforeValue.match(pattern) === null) {
    resultObj.errorCodeArr.push('1wG57OGCe');
  }
  // if (afterValue < minNumber || afterValue > maxNumber) {
  //   resultObj.errorCodeArr.push('1wG57OGCe');
  // }
  
  
  // console.log(chalk`
  //   beforeValue.match(/^[1-5]$/): {green ${beforeValue.match(pattern)}}
  // `);
  
  // ---------------------------------------------
  //   console.log
  // ---------------------------------------------
  
  // console.log(chalk`
  //   publicSetting: {green ${publicSetting}}
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

module.exports = validationPublicSetting;