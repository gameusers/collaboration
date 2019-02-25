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
 * フレンド（募集中 / 募集していません）
 * @param {boolean} value - 値
 */
const validationCardPlayersLookingForFriendsValue = ({ value }) => {
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = String(value);
  const numberOfCharacters = data ? data.length : 0;
  
  let resultObj = {
    value,
    numberOfCharacters,
    messageCode: 'C5lyqOFQz',
    error: false,
    errorCodeArr: []
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   Validation
    // ---------------------------------------------
    
    // Booleanチェック
    if (!validator.isBoolean(data)) {
      resultObj.errorCodeArr.push('D0CjfYSaH');
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    resultObj.errorCodeArr.push('7b8HDjDj5');
    
    
  } finally {
    
    
    // ---------------------------------------------
    //  Error
    // ---------------------------------------------
    
    if (resultObj.errorCodeArr.length > 0) {
      resultObj.error = true;
    }
    
    
    return resultObj;
    
    
  }
  
  
};




/**
 * フレンド（コメント）
 * @param {string} value - 値
 */
const validationCardPlayersLookingForFriendsComment = ({ value }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 1;
  const maxLength = 3000;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = String(value);
  const numberOfCharacters = data ? data.length : 0;
  
  let resultObj = {
    value: data,
    numberOfCharacters,
    messageCode: 'C5lyqOFQz',
    error: false,
    errorCodeArr: []
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   Validation
    // ---------------------------------------------
    
    // 空の場合、バリデーションスルー
    if (validator.isEmpty(data)) {
      return resultObj;
    }
    
    // 文字数チェック
    if (!validator.isLength(data, { min: minLength, max: maxLength })) {
      resultObj.errorCodeArr.push('fk3OeHjtQ');
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    resultObj.errorCodeArr.push('QJw8Qva2w');
    
    
  } finally {
    
    
    // ---------------------------------------------
    //  Error
    // ---------------------------------------------
    
    if (resultObj.errorCodeArr.length > 0) {
      resultObj.error = true;
    }
    
    
    return resultObj;
    
    
  }
  
  
};




/**
 * フレンド（アイコン）
 * @param {string} value - 値
 */
const validationCardPlayersLookingForFriendsIcon = ({ value }) => {
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const data = String(value);
  const numberOfCharacters = data ? data.length : 0;
  
  let resultObj = {
    value: data,
    numberOfCharacters,
    messageCode: 'C5lyqOFQz',
    error: false,
    errorCodeArr: []
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   Validation
    // ---------------------------------------------
    
    // 適切な値が選択されているかチェック
    if (!validator.isIn(data, ['emoji_u1f9b8', 'emoji_u1f9b9', 'emoji_u1f9d0', 'emoji_u1f9df', 'emoji_u1f47f', 'emoji_u1f60a', 'emoji_u1f60b', 'emoji_u1f60c', 'emoji_u1f60d', 'emoji_u1f60e', 'emoji_u1f60f', 'emoji_u1f61a', 'emoji_u1f61b', 'emoji_u1f61c', 'emoji_u1f61d', 'emoji_u1f61e', 'emoji_u1f61f', 'emoji_u1f62a', 'emoji_u1f62b', 'emoji_u1f62c', 'emoji_u1f62d', 'emoji_u1f62e', 'emoji_u1f62f', 'emoji_u1f92a', 'emoji_u1f92a_200d_2063_fe0f', 'emoji_u1f92b', 'emoji_u1f92c', 'emoji_u1f92d', 'emoji_u1f92e', 'emoji_u1f92f', 'emoji_u1f97a', 'emoji_u1f600', 'emoji_u1f601', 'emoji_u1f602', 'emoji_u1f603', 'emoji_u1f604', 'emoji_u1f605', 'emoji_u1f606', 'emoji_u1f607', 'emoji_u1f608', 'emoji_u1f609', 'emoji_u1f610', 'emoji_u1f611', 'emoji_u1f612', 'emoji_u1f613', 'emoji_u1f614', 'emoji_u1f615', 'emoji_u1f616', 'emoji_u1f617', 'emoji_u1f618', 'emoji_u1f619', 'emoji_u1f620', 'emoji_u1f621', 'emoji_u1f622', 'emoji_u1f623', 'emoji_u1f624', 'emoji_u1f625', 'emoji_u1f626', 'emoji_u1f627', 'emoji_u1f628', 'emoji_u1f629', 'emoji_u1f630', 'emoji_u1f631', 'emoji_u1f632', 'emoji_u1f633', 'emoji_u1f634', 'emoji_u1f635', 'emoji_u1f636', 'emoji_u1f637', 'emoji_u1f641', 'emoji_u1f642', 'emoji_u1f643', 'emoji_u1f644', 'emoji_u1f644_200d_2063_fe0f', 'emoji_u1f910', 'emoji_u1f911', 'emoji_u1f912', 'emoji_u1f913', 'emoji_u1f914', 'emoji_u1f915', 'emoji_u1f917', 'emoji_u1f920', 'emoji_u1f922', 'emoji_u1f923', 'emoji_u1f924', 'emoji_u1f924_200d_2063_fe0f', 'emoji_u1f925', 'emoji_u1f927', 'emoji_u1f928', 'emoji_u1f928_200d_1f922', 'emoji_u1f929', 'emoji_u1f970', 'emoji_u1f971', 'emoji_u1f973', 'emoji_u1f974', 'emoji_u1f975', 'emoji_u1f976', 'emoji_u263a', 'emoji_u2639'])) {
      resultObj.errorCodeArr.push('tX0IQ3VPy');
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    resultObj.errorCodeArr.push('wSX7-gHX5');
    
    
  } finally {
    
    
    // ---------------------------------------------
    //  Error
    // ---------------------------------------------
    
    if (resultObj.errorCodeArr.length > 0) {
      resultObj.error = true;
    }
    
    
    return resultObj;
    
    
  }
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  validationCardPlayersLookingForFriendsValue,
  validationCardPlayersLookingForFriendsComment,
  validationCardPlayersLookingForFriendsIcon
};