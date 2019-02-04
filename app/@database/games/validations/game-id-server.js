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

const ModelGames = require('../model');


// ---------------------------------------------
//   Validation
// ---------------------------------------------

const validator = require('validator');




/**
 * gameID
 * @param {boolean} required - Required
 * @param {string} gameID - db games gameID
 * @param {Object} conditionObj - 検索条件
 */
const validationGamesGameIDServer = async ({ required, gameID, conditionObj }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 7;
  const maxLength = 14;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const value = String(gameID);
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
    resultObj.errorCodeArr.push('5Ig82NHic');
  }
  
  // 英数と -_ のみ
  if (value.match(/^[\w\-]+$/) === null) {
    resultObj.errorCodeArr.push('uj4asy4EI');
  }
  
  // 文字数チェック
  if (!validator.isLength(value, { min: minLength, max: maxLength })) {
    resultObj.errorCodeArr.push('61osZ7Z99');
  }
  
  // データベースに存在しているかチェック
  const count = await ModelGames.count({ conditionObj });
  
  if (count === 0) {
    resultObj.errorCodeArr.push('Zg03IN2R8');
  }
  
  
  // ---------------------------------------------
  //   console.log
  // ---------------------------------------------
  
  // console.log(chalk`
  //   language: {green ${language}}
  //   country: {green ${country}}
  //   gameID: {green ${gameID}}
  // `);
  
  // console.log(`
  //   ----- docArr -----\n
  //   ${util.inspect(docArr, { colors: true, depth: null })}\n
  //   --------------------\n
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

module.exports = validationGamesGameIDServer;