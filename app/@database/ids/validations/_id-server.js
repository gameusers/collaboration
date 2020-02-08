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
 * @param {string} loginUsers_id - DB users _id ログインしているユーザーの_id
 * @return {Object} バリデーション結果
 */
const validationIDs_idServer = async ({ value, loginUsers_id }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 7;
  const maxLength = 14;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = String(value);
  const numberOfCharacters = data ? data.length : 0;
  
  let resultObj = {
    value: data,
    numberOfCharacters,
  };
  
  
  // ---------------------------------------------
  //   文字数チェック
  // ---------------------------------------------
  
  if (!validator.isLength(data, { min: minLength, max: maxLength })) {
    throw new CustomError({ level: 'warn', errorsArr: [{ code: 's6_dxRYRq', messageID: 'Pp_CFyt_3' }] });
  }
  
  
  // ---------------------------------------------
  //   英数と -_ のみ
  // ---------------------------------------------
  
  if (data.match(/^[\w\-]+$/) === null) {
    throw new CustomError({ level: 'warn', errorsArr: [{ code: 'cTVQ385BV', messageID: 'JBkjlGQMh' }] });
  }
  
  
  // ---------------------------------------------
  //   データベースに存在しているか＆編集権限チェック
  // ---------------------------------------------
  
  const count = await Model.count({
    conditionObj: {
      _id: value,
      users_id: loginUsers_id,
    }
  });
  
  if (count !== 1) {
    throw new CustomError({ level: 'warn', errorsArr: [{ code: 'QgZ0D1z-H', messageID: 'cvS0qSAlE' }] });
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
  validationIDs_idServer
};