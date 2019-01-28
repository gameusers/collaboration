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

// const ModelIDs = require('../model');




/**
 * publicSetting
 * @param {string} publicSetting - 公開設定
 */
const validationPublicSetting = async ({ publicSetting }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const beforeValue = publicSetting;
  const beforeNumberOfCharacters = beforeValue ? beforeValue.length : 0;
  
  const afterValue = beforeValue ? parseInt(beforeValue, 10) : 0;
  const afterNumberOfCharacters = afterValue ? afterValue.length : 0;
  
  let resultObj = {
    beforeValue,
    beforeNumberOfCharacters,
    afterValue,
    afterNumberOfCharacters,
    error: false,
    errorMessageArr: []
  };
  
  
  // ---------------------------------------------
  //   Validation
  // ---------------------------------------------
  
  if (beforeValue === '') {
    resultObj.error = true;
    resultObj.errorMessageArr.push('公開設定を入力してください。');
  }
  
  
  if (afterValue < 1 || afterValue > 5) {
    resultObj.error = true;
    resultObj.errorMessageArr.push(`公開設定に適切な値が選ばれていません。`);
  }
  
  
  // console.log(chalk`
  //   publicSetting: {green ${publicSetting}}
  //   slicedValue: {green ${slicedValue}}
  //   int: {green ${int}}
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