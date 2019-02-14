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
 * 年齢
 * @param {boolean} required - Required
 * @param {string} value - 値
 */
const validationCardPlayersAge = ({ required, value, alternativeText, search }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 1;
  const maxLength = 20;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const dataValue = String(value);
  const valueNumberOfCharacters = dataValue ? dataValue.length : 0;
  
  const dataAlternativeText = String(alternativeText);
  const alternativeTextNumberOfCharacters = dataAlternativeText ? dataAlternativeText.length : 0;
  
  const dataSearch = String(search);
  const searchNumberOfCharacters = dataSearch ? dataSearch.length : 0;
  
  let resultObj = {
    value: dataValue,
    valueNumberOfCharacters,
    valueErrorCodeArr: [],
    
    alternativeText: dataAlternativeText,
    alternativeTextNumberOfCharacters,
    alternativeTextErrorCodeArr: [],
    
    search: dataSearch,
    searchNumberOfCharacters,
    searchErrorCodeArr: [],
    
    errorCodeArr: []
  };
  
  
  // ---------------------------------------------
  //   Validation - Required
  // ---------------------------------------------
  
  // Not Required で入力値が空の場合、処理停止
  if (!required && validator.isEmpty(dataValue) && validator.isEmpty(dataAlternativeText)) {
    return resultObj;
  }
  
  
  // ---------------------------------------------
  //   Validation - Value
  // ---------------------------------------------
  
  // 日付チェック
  if (!validator.isEmpty(dataValue) && !validator.isISO8601(dataValue)) {
    resultObj.valueErrorCodeArr.push('bT9TGtVck');
    resultObj.errorCodeArr.push('bT9TGtVck');
  }
  
  
  // ---------------------------------------------
  //   Validation - AlternativeText
  // ---------------------------------------------
  
  // 文字数チェック
  if (!validator.isEmpty(dataAlternativeText) && !validator.isLength(dataAlternativeText, { min: minLength, max: maxLength })) {
    resultObj.alternativeTextErrorCodeArr.push('v57dv3fYB');
    resultObj.errorCodeArr.push('v57dv3fYB');
  }
  
  
  // ---------------------------------------------
  //   Validation - Search
  // ---------------------------------------------
  
  // Booleanかどうかチェック
  if (!validator.isBoolean(dataSearch)) {
    resultObj.searchErrorCodeArr.push('vND6SH_5t');
    resultObj.errorCodeArr.push('vND6SH_5t');
  }
  
  
  // ---------------------------------------------
  //   console.log
  // ---------------------------------------------
  
  // console.log(chalk`
  //   value: {green ${value}}
  //   alternativeText: {green ${alternativeText}}
  //   search: {green ${search}}
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

module.exports = validationCardPlayersAge;