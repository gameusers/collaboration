// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

// const chalk = require('chalk');
// const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------






// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * エラー情報の入った配列をエラーメッセージ（String）に変換する
 * @param {Array} errorsArr - エラー情報の入った配列
 * @return {string} フォーマット後の文字列
 */
const errorsArrIntoErrorMessage = (errorsArr) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnValue = '';
  
  
  // --------------------------------------------------
  //   Format
  // --------------------------------------------------
  
  if (errorsArr.length > 0) {
    
    const errorMessageArr = [];
    
    for (let value of errorsArr.values()) {
      errorMessageArr.push(`Error Code: ${value.code}`);
      // errorMessageArr.push(`Error Code: ${value.code} - ${value.message}`);
    }
    
    returnValue = errorMessageArr.join(' / ');
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return returnValue;
  
  
};



// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  errorsArrIntoErrorMessage
};