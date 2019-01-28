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
    error: false,
    errorMessageArr: []
  };
  
  
  // ---------------------------------------------
  //   Validation
  // ---------------------------------------------
  
  if (beforeValue === '') {
    resultObj.error = true;
    resultObj.errorMessageArr.push('_idを入力してください。');
  }
  
  
  if (afterValue.match(/^[\w\-]+$/) === null) {
    resultObj.error = true;
    resultObj.errorMessageArr.push('_idに入力できるのは半角英数字とハイフン( - )アンダースコア( _ )です。');
  }
  
  
  if (afterNumberOfCharacters < minLength || afterNumberOfCharacters > maxLength) {
    resultObj.error = true;
    resultObj.errorMessageArr.push(`_idは${minLength}文字以上、${maxLength}文字以内です。`);
  }
  
  
  const docArr = await ModelIDs.find({
    conditionObj: {
      _id,
      users_id: usersLogin_id,
    }
  });
  
  if (docArr.length === 0) {
    resultObj.error = true;
    resultObj.errorMessageArr.push(`入力した_idはデータベースに存在しない、または編集権限がありません。`);
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