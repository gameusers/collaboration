// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const fetch = require('isomorphic-unfetch');



// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * Fetch のラッパー
 * @param {Object} argumentsObj - 引数の入ったオブジェクト
 * @return {Object} 取得したデータまたはエラーオブジェクト
 */
const fetchWrapper = (argumentsObj) => {
  
  
  // ---------------------------------------------
  //   Property
  // ---------------------------------------------
  
  const urlApi = argumentsObj.urlApi;
  const methodType = argumentsObj.methodType;
  const formData = argumentsObj.formData;
  const reqHeadersCookie = argumentsObj.reqHeadersCookie;
  
  
  // ---------------------------------------------
  //   Fetch
  // ---------------------------------------------
  
  // ----------------------------------------
  //   Headers
  // ----------------------------------------
  
  const headersObj = {
    'Accept': 'application/json'
  };
  
  if (reqHeadersCookie) {
    headersObj['Cookie'] = reqHeadersCookie;
  }
  
  
  return fetch(urlApi, {
    method: methodType,
    credentials: 'same-origin',
    mode: 'same-origin',
    headers: headersObj,
    body: formData
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return {
        errorsArr: [
          {
            code: 0,
            message: error.message
          },
        ]
      };
    });
  
};



// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  fetchWrapper
};