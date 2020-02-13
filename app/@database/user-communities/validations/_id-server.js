// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const validator = require('validator');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const Model = require('../model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { CustomError } = require('../../../@modules/error/custom');




/**
 * _id
 * @param {string} value - 値
 * @return {Object} バリデーション結果
 */
const validationUserCommunities_idServer = async ({ value }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 7;
  const maxLength = 14;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = value ? String(value) : '';
  const numberOfCharacters = data ? data.length : 0;
  
  let resultObj = {
    value: data,
    numberOfCharacters,
  };
  
  
  // ---------------------------------------------
  //   文字数チェック
  // ---------------------------------------------
  
  if (!validator.isLength(data, { min: minLength, max: maxLength })) {
    throw new CustomError({ level: 'warn', errorsArr: [{ code: 'l8-myxsT5', messageID: 'Pp_CFyt_3' }] });
  }
  
  
  // ---------------------------------------------
  //   英数と -_ のみ
  // ---------------------------------------------
  
  if (data.match(/^[\w\-]+$/) === null) {
    throw new CustomError({ level: 'warn', errorsArr: [{ code: 'YWcSSkio6', messageID: 'JBkjlGQMh' }] });
  }
  
  
  // ---------------------------------------------
  //   データベースに存在していない場合、エラー
  // ---------------------------------------------
  
  const count = await Model.count({
    conditionObj: {
      _id: value,
    }
  });
  
  if (count === 0) {
    throw new CustomError({ level: 'warn', errorsArr: [{ code: 'FFauG_RbE', messageID: 'cvS0qSAlE' }] });
  }
  
  
  // ---------------------------------------------
  //   Return
  // ---------------------------------------------
  
  return resultObj;
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  validationUserCommunities_idServer
};