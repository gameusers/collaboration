// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

// const chalk = require('chalk');
// const util = require('util');


// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import Cookies from 'js-cookie';
// const Cookies = require('js-cookie');

// const lodashGet = require('lodash/get');
// const lodashSet = require('lodash/set');




// --------------------------------------------------
//   function
// --------------------------------------------------

/**
 * Cookie からデータを取得する / 2020/6/6
 * @param {String} key - 取得するキー
 * @param {String} reqHeadersCookie - サーバー側で受信したクッキーのデータ
 */
const getCookie = ({ key, reqHeadersCookie = '' }) => {
  
  
  // --------------------------------------------------
  //   データを取得する
  // --------------------------------------------------
  
  let returnValue = Cookies.get(key) || ((reqHeadersCookie + ';').match(key + '=([^¥S;]*)')||[])[1];
  
  if (!returnValue) {
    returnValue = '';
  }
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/@modules/cookie.js - getCookie
  // `);
  
  // console.log(chalk`
  //   key: {green ${key}}
  //   reqHeadersCookie: {green ${reqHeadersCookie}}
  //   Cookies.get(key): {green ${Cookies.get(key)}}
  //   returnValue: {green ${returnValue}}
  // `);
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return returnValue;
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  
  getCookie,
  
};