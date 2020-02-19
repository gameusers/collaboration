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

// const shortid = require('shortid');
const lodashGet = require('lodash/get');
// const lodashSet = require('lodash/set');
// const lodashHas = require('lodash/has');
// const lodashCloneDeep = require('lodash/cloneDeep');




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * フォーマットする
 * 
 * @param {Object} followsObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @return {Array} フォーマットされたオブジェクト
 */
const formatFollowsObj = ({ followsObj, authorUsers_id, loginUsers_id }) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const approval = lodashGet(followsObj, ['approval'], false);
  const followCount = lodashGet(followsObj, ['followCount'], 0);
  const followedCount = lodashGet(followsObj, ['followedCount'], 0);
  
  let author = false;
  let follow = false;
  let followApproval = false;
  let followBlocked = false;
  
  
  // --------------------------------------------------
  //   Login
  // --------------------------------------------------
  
  if (loginUsers_id) {
    
    const followedArr = lodashGet(followsObj, ['followedArr'], []);
    const approvalArr = lodashGet(followsObj, ['approvalArr'], []);
    const blockArr = lodashGet(followsObj, ['blockArr'], []);
    
    
    if (authorUsers_id === loginUsers_id) {
      author = true;
    }
    
    if (followedArr.includes(loginUsers_id)) {
      follow = true;
    }
    
    if (approvalArr.includes(loginUsers_id)) {
      followApproval = true;
    }
    
    if (blockArr.includes(loginUsers_id)) {
      followBlocked = true;
    }
    
  }
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  return {
    
    approval,
    followCount,
    followedCount,
    author,
    follow,
    followApproval,
    followBlocked,
    
  };
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  
  formatFollowsObj,
  
};