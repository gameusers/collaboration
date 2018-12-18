// --------------------------------------------------
//   Require
// --------------------------------------------------

const Tokens = require('csrf');
const tokens = new Tokens();
const chalk = require('chalk');



// --------------------------------------------------
//   function
// --------------------------------------------------

/**
 * CSRF対策でトークンを発行する
 * @param {Object} req - リクエスト
 * @param {Object} res - レスポンス
 */
const createCsrfToken = (req, res) => {
  
  
  // --------------------------------------------------
  //   トークン発行
  // --------------------------------------------------
  
  const secret = tokens.secretSync();
  const token = tokens.create(secret);
  
  // console.log(chalk`
  //   createCsrfToken
  //   secret: {green ${secret}}
  //   token: {green ${token}}
  // `);
  
  req.session._csrf = secret;
  res.cookie('_csrf', token);
  
};



/**
 * CSRF対策でトークンを検証する。また同時にトークンを再発行する。
 * @param {Object} req - リクエスト
 * @param {Object} res - レスポンス
 * @return {boolean} 真偽値を返す
 * 
 * 参考：https://garafu.blogspot.com/2017/04/nodejs-express-csrfprotection.html
 */
const verifyCsrfToken = (req, res) => {
  
  
  // console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV} / ${typeof process.env.NODE_ENV}`);
  // console.log(`process.env.VERIFY_CSRF = ${process.env.VERIFY_CSRF} / ${typeof process.env.VERIFY_CSRF}`);
  
  
  // --------------------------------------------------
  //   製品版 / VERIFY_CSRF === '1' のときは検証する
  // --------------------------------------------------
  
  if (process.env.NODE_ENV === 'production' || process.env.VERIFY_CSRF === '1') {
    
    
    // --------------------------------------------------
    //   トークンの検証
    // --------------------------------------------------
    
    const secret = req.session._csrf;
    const token = req.cookies._csrf;
    
    // console.log(chalk`
    //   verifyCsrfToken
    //   secret: {green ${secret}}
    //   token: {green ${token}}
    //   tokens.verify(secret, token): {rgb(255,131,0) ${tokens.verify(secret, token)}}
    // `);
    
    
    
    // 秘密文字 と トークン の組み合わせが正しいか検証
    if (tokens.verify(secret, token) === false) {
      // console.log(`Invalid Token`);
      throw new Error('CSRF: Invalid Token');
    }
    
    
    
    // --------------------------------------------------
    //   トークン再発行
    // --------------------------------------------------
    
    createCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return true;
    
  }
  
  
  // console.log(`verifyCsrfToken 検証スルー`);
  
  // --------------------------------------------------
  //   開発時、VERIFY_CSRF === '0' のときは検証スルー
  // --------------------------------------------------
  
  return true;
  
};



// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  verifyCsrfToken,
  createCsrfToken
};