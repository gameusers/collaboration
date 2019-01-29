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




/**
 * gameID
 * @param {string} gameID - db games gameID
 */
const validationGameID = async ({ language, country, gameID }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 7;
  const maxLength = 14;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const beforeValue = gameID;
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
  
  // 存在チェック
  if (beforeValue === '') {
    resultObj.errorCodeArr.push('5Ig82NHic');
  }
  
  // 英数と -_ のみ
  if (afterValue.match(/^[\w\-]+$/) === null) {
    resultObj.errorCodeArr.push('uj4asy4EI');
  }
  
  // 文字数チェック
  if (afterNumberOfCharacters < minLength || afterNumberOfCharacters > maxLength) {
    resultObj.errorCodeArr.push('61osZ7Z99');
  }
  
  // データベースに存在しているかチェック
  const docArr = await ModelGames.find({
    conditionObj: {
      language,
      country,
      gameID,
    }
  });
  
  if (docArr.length === 0) {
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

module.exports = validationGameID;