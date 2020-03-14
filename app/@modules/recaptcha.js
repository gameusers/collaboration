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

const FormData = require('form-data');
const lodashGet = require('lodash/get');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { fetchWrapper } = require('./fetch');




// --------------------------------------------------
//   function
// --------------------------------------------------

/**
 * reCAPTCHAの検証を行う
 * @param {string} response - reCAPTCHAのトークン
 * @param {string} remoteip - アクセスしたユーザーのIP
 */
const verifyRecaptcha = async ({ response, remoteip }) => {
  
  
  // --------------------------------------------------
  //   Response のサンプル
  //   
  //   {
  //     success: true,
  //     challenge_ts: '2019-04-05T06:53:57Z',
  //     hostname: 'dev-1.gameusers.org',
  //     score: 0.9,
  //     action: 'login'
  //   }
  //
  //   {
  //     success: false,
  //     'error-codes': [ 'invalid-input-response' ]
  //   }
  // --------------------------------------------------
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(chalk`
  //   process.env.VERIFY_RECAPTCHA: {green ${process.env.VERIFY_RECAPTCHA} / ${typeof process.env.VERIFY_RECAPTCHA}}
  //   process.env.RECAPTCHA_SECRET_KEY: {green ${process.env.RECAPTCHA_SECRET_KEY}}
  //   response: {green ${response}}
  //   remoteip: {green ${remoteip}}
  // `);
  
  
  // --------------------------------------------------
  //   製品版 / VERIFY_RECAPTCHA === '1' のときは検証する
  // --------------------------------------------------
  
  if (process.env.NODE_ENV === 'production' || process.env.VERIFY_RECAPTCHA === '1') {
    
    
    // ---------------------------------------------
    //   FormData
    // ---------------------------------------------
    
    const formData = new FormData();
    
    formData.append('secret', process.env.RECAPTCHA_SECRET_KEY);
    formData.append('response', response);
    formData.append('remoteip', remoteip);
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    const resultObj = await fetchWrapper({
      urlApi: 'https://www.google.com/recaptcha/api/siteverify',
      methodType: 'POST',
      formData: formData,
    });
    
    const score = lodashGet(resultObj, ['data', 'score'], false);
    const success = score >= 0.5 ? true : false;
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   score: {green ${score}}
    //   success: {green ${success}}
    // `);
    
    // console.log(`
    //   ----- resultObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    if (success === false) {
      throw new Error('reCAPTCHA: Low Score');
    }
    
    
    
    // return success;
    
    
  }
  
  
  // --------------------------------------------------
  //   開発時、VERIFY_RECAPTCHA === '0' のときは検証スルー
  // --------------------------------------------------
  
  // return true;
  
  
};



// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  verifyRecaptcha
};