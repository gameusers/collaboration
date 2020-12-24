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
 * Cookie からデータを取得する / 2020/12/23
 * @param {String} key - 取得するキー
 * @param {String} reqHeadersCookie - サーバー側で受信したクッキーのデータ
 * @param {Boolean} decode - デコードする場合はtrue
 */
const getCookie = ({ key, reqHeadersCookie = '', decode = false }) => {


  // --------------------------------------------------
  //   データを取得する
  // --------------------------------------------------

  // let returnValue = Cookies.get(key) || ((reqHeadersCookie + ';').match(key + '=([^¥S;]*)')||[])[1];
  let returnValue = Cookies.get(key);


  // --------------------------------------------------
  //   サーバー側
  // --------------------------------------------------

  if (!returnValue && reqHeadersCookie) {

    const tempArr = reqHeadersCookie.split('; ');

    for (let i = 0; i < tempArr.length; i++) {

      const dataArr = tempArr[i].split('=');

      if (key === dataArr[0]) {

        returnValue = decodeURIComponent(dataArr[1]);
        break;

      }

    }

  }


  // --------------------------------------------------
  //   デコード
  // --------------------------------------------------

  if (decode && returnValue) {
    returnValue = decodeURIComponent(returnValue);
  }


  // --------------------------------------------------
  //   undefined を '' にする
  // --------------------------------------------------

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
  //   decode: {green ${decode}}
  //   returnValue: {green ${returnValue} / ${typeof returnValue}}
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
