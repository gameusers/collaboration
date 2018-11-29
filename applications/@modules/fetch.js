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
  
  let resultObj = {
    statusCode: 400
  };
  
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
      
      // console.log(`
      //   ----- response -----\n
      //   ${util.inspect(response, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      resultObj.statusCode = response.status;
      return response.json();
      
    })
    .then((jsonObj) => {
      
      // console.log(`
      //   ----- jsonObj -----\n
      //   ${util.inspect(jsonObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      if ('errorsArr' in jsonObj) {
        resultObj.errorsArr = jsonObj.errorsArr;
      } else {
        resultObj.data = jsonObj;
      }
      
      return resultObj;
      
    })
    .catch((error) => {
      
      resultObj.errorsArr = [
        {
          code: 0,
          message: error.message
        },
      ];
      
      return resultObj;
      
    });
  
};



// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  fetchWrapper
};