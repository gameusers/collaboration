// --------------------------------------------------
//   Require
// --------------------------------------------------

const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'static/' });

const chalk = require('chalk');
const util = require('util');

const { verifyCsrfToken } = require('../../../@modules/csrf');



// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();




// --------------------------------------------------
//   Initial Props
// --------------------------------------------------

router.get('/initialProps', upload.none(), function(req, res, next) {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    console.log(chalk`
      {green logout api / initialProps}
      req.isAuthenticated(): {green ${req.isAuthenticated()}}
    `);
    
    console.log(`
      req.user: \n${util.inspect(req.user, { colors: true, depth: null })}
    `);
    
    
    // ---------------------------------------------
    //   CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   ログインチェック
    // --------------------------------------------------
    
    let login = false;
    
    if (req.isAuthenticated()) {
      console.log(chalk`
        {green logout / initialProps / ログインしています}
      `);
      login = true;
    } else {
      console.log(chalk`
        {green logout / initialProps / ログインしていません}
      `);
    }
    
    
    // ---------------------------------------------
    //   Success
    // ---------------------------------------------
    
    return res.status(200).json({
      login
    });
    
    
  } catch (error) {
    
    console.log(chalk`
      error.message: {red ${error.message}}
    `);
    
    
    // --------------------------------------------------
    //   Set Error Message
    // --------------------------------------------------
    
    let message = error.message;
    
    if (process.env.NODE_ENV === 'production') {
      message = 'Logout Initial Props';
    }
    
    
    // --------------------------------------------------
    //   Return Error JSON
    // --------------------------------------------------
    
    return res.status(400).json({
      errorsArr: [
        {
          code: 0,
          message
        },
      ]
    });
    
  }
  
});



// --------------------------------------------------
//   ログアウト
// --------------------------------------------------

router.post('/', upload.none(), function(req, res, next) {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    console.log(chalk`
      {green logout}
    `);
    
    if (req.isAuthenticated()) {
      console.log(chalk`
        {green logout / initialProps / ログインしています}
      `);
    } else {
      console.log(chalk`
        {green logout / initialProps / ログインしていません}
      `);
    }
    
    
    // ---------------------------------------------
    //   CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // ---------------------------------------------
    //   ログアウト処理
    // ---------------------------------------------
    
    req.logout();
    
    
    // ---------------------------------------------
    //   Success
    // ---------------------------------------------
    
    return res.status(200).json({
      success: true
    });
    
    
  } catch (error) {
    
    console.log(chalk`
      error.message: {red ${error.message}}
    `);
    
    
    // --------------------------------------------------
    //   Set Error Message
    // --------------------------------------------------
    
    let message = error.message;
    
    if (process.env.NODE_ENV === 'production') {
      message = 'Logout';
    }
    
    
    // --------------------------------------------------
    //   Return Error JSON
    // --------------------------------------------------
    
    return res.status(400).json({
      errorsArr: [
        {
          code: 0,
          message
        },
      ]
    });
    
  }
  
});


module.exports = router;