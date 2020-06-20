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






// --------------------------------------------------
//   function
// --------------------------------------------------

/**
 * Cookie からデータを取得する / 2020/6/6
 * @param {String} key - 取得するキー
 * @param {String} reqHeadersCookie - サーバー側で受信したクッキーのデータ
 */
const getCookie = ({ key, reqHeadersCookie = '' }) => {
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/@modules/cookie.js - getCookie
  // `);
  
  // console.log(chalk`
  //   key: {green ${key}}
  //   reqHeadersCookie: {green ${reqHeadersCookie}}
  // `);
  
  // --------------------------------------------------
  //   データを取得する
  // --------------------------------------------------
  
  let returnValue = Cookies.get(key) || ((reqHeadersCookie + ';').match(key + '=([^¥S;]*)')||[])[1];
  
  // if (!returnValue) {
    
    // const splited1Arr = reqHeadersCookie.split(';');
    
    // console.log(`
    //   ----- splited1Arr -----\n
    //   ${util.inspect(splited1Arr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // for (let value of splited1Arr){
        
    //   const splited2Arr = value.split('=');
    //   const cookieKey = splited2Arr[0].trim();
      
    //   // console.log(`
    //   //   ----- splited2Arr -----\n
    //   //   ${util.inspect(splited2Arr, { colors: true, depth: null })}\n
    //   //   --------------------\n
    //   // `);
      
    //   console.log(chalk`
    //     cookieKey: {green ${cookieKey}}
    //     key: {green ${key}}
    //   `);
      
      
    //   if (cookieKey === key) {
        
    //     console.log(`
    //       ----- 正解 -----\n
    //       ${util.inspect(splited2Arr, { colors: true, depth: null })}\n
    //       --------------------\n
    //     `);
        
    //   }
      
    // }
    
  // }
  
  
  
  
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
  //   returnValue: {green ${returnValue}}
  // `);
  
  // console.log(chalk`
  //   Cookies.get(key): {green ${Cookies.get(key)}}
  //   ((reqHeadersCookie + ';').match(key + '=([^¥S;]*)')||[])[1]: {green ${((reqHeadersCookie + ';').match(key + '=([^¥S;]*)')||[])[1]}}
  //   returnValue: {green ${returnValue}}
  // `);
  
  // console.log(chalk`
  //   key: {green ${key}}
  //   reqHeadersCookie: {green ${reqHeadersCookie}}
  //   Cookies.get(key): {green ${Cookies.get(key)}}
  //   ((reqHeadersCookie + ';').match(key + '=([^¥S;]*)')||[])[1]: {green ${((reqHeadersCookie + ';').match(key + '=([^¥S;]*)')||[])[1]}}
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