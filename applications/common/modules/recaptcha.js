// --------------------------------------------------
//   Require
// --------------------------------------------------

const chalk = require('chalk');



// --------------------------------------------------
//   function
// --------------------------------------------------

/**
 * reCAPTCHAの検証を行う
 * @param {Object} req - リクエスト
 * @param {Object} res - レスポンス
 */
const verifyRecaptcha = async (req, res) => {
  
  
  // --------------------------------------------------
  //   Response のサンプル
  //   
  //   {
  //     success: true,
  //     challenge_ts: '2018-09-22T10:53:45Z',
  //     hostname: '35.203.143.160'
  //   }
  //
  //   {
  //     success: false,
  //     'error-codes': [ 'invalid-input-response' ]
  //   }
  // --------------------------------------------------
  
  
  // --------------------------------------------------
  //   Console 出力
  // --------------------------------------------------
  
  // console.log(chalk`
  //   loginId: {green ${loginId}}
  //   loginPassword: {green ${loginPassword}}
  // `);
  
  
  // --------------------------------------------------
  //   製品版 / VERIFY_RECAPTCHA === '1' のときは検証する
  // --------------------------------------------------
  
  if (process.env.NODE_ENV === 'production' || process.env.VERIFY_RECAPTCHA === '1') {
  
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body['g-recaptcha-response']}&remoteip=${req.connection.remoteAddress}`;
    // const verificationUrl = `http://35.203.143.160:8080/api/v1/login/test2`;
      
    await fetch(verificationUrl, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then((response) => {
        
        if (response.ok) {
          // console.log(`verifyRecaptcha response.ok`);
          return response.json();
        }
        
        throw new Error('Network response was not ok.');
        
      })
      .then((jsonObj) => {
        
        if (jsonObj.success) {
          // console.log(`verifyRecaptcha success: true`);
          return true;
        }
        
        // console.log(`verifyRecaptcha ${jsonObj['error-codes'][0]}`);
        // throw new Error('success: false');
        throw new Error(jsonObj['error-codes'][0]);
        
      })
      .catch((error) => {
        
        // console.log(`verifyRecaptcha error: ${error.message}`);
        throw new Error(`reCAPTCHA: ${error.message}`);
        
      });
      
  }
  
  // console.log(`verifyRecaptcha 検証スルー`);
  
  // --------------------------------------------------
  //   開発時、VERIFY_RECAPTCHA === '0' のときは検証スルー
  // --------------------------------------------------
  
  return true;
  
};



// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  verifyRecaptcha
};