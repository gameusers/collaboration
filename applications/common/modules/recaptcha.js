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
  //   {
  //     success: true,
  //     challenge_ts: '2018-09-22T10:53:45Z',
  //     hostname: '35.203.143.160'
  //   }
  //   {
  //     success: false,
  //     'error-codes': [ 'invalid-input-response' ]
  //   }
  // --------------------------------------------------
  
  // const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body['g-recaptcha-response']}&remoteip=${req.connection.remoteAddress}`;
  const verificationUrl = `http://35.203.143.160:8080/api/v1/login/test`;
    
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
        console.log(`verifyRecaptcha response.ok`);
        return response.json();
      }
      
      throw new Error('Network response was not ok.');
      
    })
    .catch((error) => {
      
      console.log(`verifyRecaptcha error: ${error}`);
      
    });
  
};



// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  verifyRecaptcha
};