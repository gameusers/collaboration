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

const Cookies = require('js-cookie');
const lodashGet = require('lodash/get');




// --------------------------------------------------
//   function
// --------------------------------------------------

/**
 * Cookieからデータを取得する
 * @param {string} cookie - document.cookie
 * @param {string} key - 取得したいkey
 */
const getCookie = ({ cookie, key }) => {
  
  const value = Cookies.get(key) || ((cookie + ';').match(key + '=([^¥S;]*)')||[])[1];
  
  return value;
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  getCookie,
};