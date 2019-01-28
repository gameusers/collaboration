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
 * id
 * @param {string} id - ラベル
 */
const validationID = async ({ id }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 1;
  const maxLength = 32;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const beforeValue = id;
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
    resultObj.errorMessageArr.push('IDを入力してください。');
  }
  
  
  if (afterNumberOfCharacters < minLength || afterNumberOfCharacters > maxLength) {
    resultObj.error = true;
    resultObj.errorMessageArr.push(`IDは${minLength}文字以上、${maxLength}文字以内です。`);
  }
  
  
  // console.log(chalk`
  //   id: {green ${id}}
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

module.exports = validationID;