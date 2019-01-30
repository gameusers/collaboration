// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');




/**
 * id
 * @param {string} id - ID
 */
const validationID = ({ required, id }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 1;
  const maxLength = 12;
  
  
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
    errorCodeArr: []
  };
  
  
  // ---------------------------------------------
  //   Validation
  // ---------------------------------------------
  
  // Not Required で入力値が空の場合、処理停止
  if (!required && beforeValue === '') {
    return resultObj;
  }
  
  // 存在チェック
  if (beforeValue === '') {
    resultObj.errorCodeArr.push('FsjP5Xb5h');
  }
  
  // 文字数チェック
  if (afterNumberOfCharacters < minLength || afterNumberOfCharacters > maxLength) {
    resultObj.errorCodeArr.push('RheyjmgKo');
  }
  
  
  //const ModelGames = require('../model');
  
  // データベースに存在しているかチェック
  // const docArr = ModelGames.find({
  //   conditionObj: {}
  // });
  
  // if (docArr.length === 0) {
  //   resultObj.errorCodeArr.push('Zg03IN2R8');
  // }
  
  
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

module.exports = validationID;