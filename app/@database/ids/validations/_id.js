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

const ModelIDs = require('../model');




/**
 * _id
 * @param {string} usersLogin_id - db users _id
 * @param {string} _id - db ids _id
 */
const validation_id = async ({ usersLogin_id, _id }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 7;
  const maxLength = 14;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const beforeValue = _id;
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
    resultObj.errorCodeArr.push('fKnyEX5Px');
  }
  
  // 英数と -_ のみ
  if (afterValue.match(/^[\w\-]+$/) === null) {
    resultObj.errorCodeArr.push('0Nm7pQeYW');
  }
  
  // 文字数チェック
  if (afterNumberOfCharacters < minLength || afterNumberOfCharacters > maxLength) {
    resultObj.errorCodeArr.push('Vg08kFRAe');
  }
  
  // データベースに存在しているか＆編集権限チェック
  const docArr = await ModelIDs.find({
    conditionObj: {
      _id,
      users_id: usersLogin_id,
    }
  });
  
  if (docArr.length === 0) {
    resultObj.errorCodeArr.push('uhe5ZzGvK');
  }
  
  
  // console.log(chalk`
  //   afterValue: {green ${afterValue}}
  //   usersLogin_id: {green ${usersLogin_id}}
  //   _id: {green ${_id}}
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

module.exports = validation_id;