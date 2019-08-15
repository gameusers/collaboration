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

const moment = require('moment');
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');




// --------------------------------------------------
//   function
// --------------------------------------------------

/**
 * 権限をセット / _idを配列に追加してセッションに格納する
 * @param {Object} req - リクエスト
 * @param {string} _id - _id
 */
const setAuthority = ({ req, _id }) => {
  
  // console.log(chalk`
  //   _id: {green ${_id}}
  // `);
  
  if (req && _id) {
    
    let authorityArr = lodashGet(req, ['session', 'authorityArr'], []);
    
    if (!Array.isArray(authorityArr)) {
      authorityArr = [];
    }
    
    if (!authorityArr.includes(_id)) {
      authorityArr.push(_id);
      req.session.authorityArr = authorityArr;
    }
    
    // console.log(`
    //   ----- setAuthority / authorityArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(authorityArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- req.session.authorityArr -----\n
    //   ${util.inspect(req.session.authorityArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
  }
  
};




/**
 * 権限を確認 / セッションに格納されている配列に _id が含まれているかチェックする
 * @param {Object} req - リクエスト
 * @param {string} _id - _id
 * @return {boolean} 検証結果を真偽値で返す
 */
const verifyAuthority = ({ req, users_id, loginUsers_id, ISO8601, _id }) => {
  
  
  // console.log(chalk`
  //   users_id: {green ${users_id}}
  //   loginUsers_id: {green ${loginUsers_id}}
  //   ISO8601: {green ${ISO8601}}
  //   _id: {green ${_id}}
  // `);

  
  // --------------------------------------------------
  //   作者がログインしているユーザーの場合
  // --------------------------------------------------
  
  if ((users_id && loginUsers_id) && (users_id === loginUsers_id)) {
    // console.log('true / 作者がログインしているユーザーの場合');
    return true;
  }
  
  
  // --------------------------------------------------
  //   1時間以内にアクセスしていない
  // --------------------------------------------------
  
  if (ISO8601) {
    
    const dateTimeLimit = moment(ISO8601).utc().add(1, 'hour');
    const dateTimeNow = moment().utc();
    
    if (dateTimeLimit.isAfter(dateTimeNow)) {
      // console.log('false / 1時間以内にアクセスしていない');
      return false;
    }
    
  }
  
  
  // --------------------------------------------------
  //   セッションで確認する
  // --------------------------------------------------
  
  if (req && _id) {
    
    let authorityArr = lodashGet(req, ['session', 'authorityArr'], []);
    
    if (!Array.isArray(authorityArr)) {
      authorityArr = [];
    }
    
    // console.log(`
    //   ----- verifyAuthority2 / authorityArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(authorityArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    if (authorityArr.includes(_id)) {
      // console.log('true / セッションにIDが含まれている');
      return true;
    }
    
    
  }
  
  
  // --------------------------------------------------
  //   それ以外
  // --------------------------------------------------
  
  // console.log('false / それ以外');
  
  return false;
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  setAuthority,
  verifyAuthority
};