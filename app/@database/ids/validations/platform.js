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
 * platform
 * @param {string} platform - プラットフォーム
 */
const validationPlatform = async ({ platform }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 3;
  const maxLength = 20;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const beforeValue = platform;
  const beforeNumberOfCharacters = beforeValue ? beforeValue.length : 0;
  
  const afterValue = beforeValue ? beforeValue.slice(0, maxLength) : '';
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
    resultObj.errorMessageArr.push('プラットフォームを入力してください。');
  }
  
  
  if (afterNumberOfCharacters < minLength || afterNumberOfCharacters > maxLength) {
    resultObj.error = true;
    resultObj.errorMessageArr.push(`プラットフォームは${minLength}文字以上、${maxLength}文字以内です。`);
  }
  
  
  const arr = ['PlayStation', 'Xbox', 'Nintendo', 'Steam', 'PC', 'Android', 'iOS', 'Other'];
  
  if (arr.indexOf(afterValue) === -1) {
    resultObj.error = true;
    resultObj.errorMessageArr.push(`プラットフォームに適切な値が選ばれていません。`);
  }
  
  
  // console.log(chalk`
  //   platform: {green ${platform}}
  //   slicedValue: {green ${slicedValue}}
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