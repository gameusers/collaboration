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

// const acceptLanguageParser = require('accept-language-parser');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const en_US = require('../../applications/@locales/en-us');
const ja_JP = require('../../applications/@locales/ja-jp');





// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * 取得する
 * @param {Object} argumentsObj - 引数
 * @return {Object} フォーマットされたデータ
 */
const locale = (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const { acceptLanguage } = argumentsObj;
  
  
  // --------------------------------------------------
  //   Return Object
  // --------------------------------------------------
  
  let returnObj = {};
  let language = 'ja';
  let country = 'JP';
  let dataObj = ja_JP;
  
  
  language = 'en';
  country = 'US';
  
  
  // --------------------------------------------------
  //   Language & Country
  // --------------------------------------------------
  
  // const resultArr = acceptLanguageParser.parse(acceptLanguage);
  
  // if (resultArr.length > 0) {
    
  //   returnObj.language = resultArr[0].code;
  //   returnObj.country = resultArr[0].region;
    
  //   if (returnObj.language === 'ja') {
  //     returnObj.country = 'JP';
  //   }
    
  // } else {
    
  //   returnObj.language = 'ja';
  //   returnObj.country = 'JP';
    
  // }
  
  
  // --------------------------------------------------
  //   Locale Data
  // --------------------------------------------------
  
  if (language === 'en') {
    
    dataObj = en_US;
    
  } else if (language === 'ja') {
    
    dataObj = ja_JP;
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  returnObj.language = language;
  returnObj.country = country;
  returnObj.dataObj = dataObj;
  
  return returnObj;
  
  
};



// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  locale
};