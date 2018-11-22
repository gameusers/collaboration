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

const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'static/' });


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../@modules/csrf');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const validation_id = require('../../@validations/_id');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelUsers = require('../users/model');
const ModelCardPlayers = require('./model');


// ---------------------------------------------
//   Logger
// ---------------------------------------------

const logger = require('../../@modules/logger');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();





// --------------------------------------------------
//   Initial Props
// --------------------------------------------------

router.post('/follow', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Status Code
  // --------------------------------------------------
  
  let statusCode = 400;
  
  
  try {
    
    
    // --------------------------------------------------
    //   CSRF
    // --------------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 401;
      throw new Error('Loginする必要があります。');
    }
    
    
    // --------------------------------------------------
    //   POST 取得 & Property
    // --------------------------------------------------
    
    const { users_id } = req.body;
    
    let returnObj = {};
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    const validation_idObj = validation_id(users_id);
    
    if (validation_idObj.error) {
      
      // Log
      logger.log('error', `/applications/@database/card-players/api.js\nrouter.post('/follow')\nValidation`);
      
      // Error
      throw new Error('Validation');
      
    }
    
    
    // --------------------------------------------------
    //   ログインしているユーザーの _id
    // --------------------------------------------------
    
    let usersLogin_id = '';
    
    if (req.user) {
      usersLogin_id = req.user._id;
    }
    
    
    // --------------------------------------------------
    //   Model / Users / Follow
    // --------------------------------------------------
    
    returnObj = await ModelUsers.updateForFollow(usersLogin_id, users_id);
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   users_id: {green ${users_id}}
    // `);
    
    // console.log(`
    //   req.user: \n${util.inspect(req.user, { colors: true, depth: null })}
    //   req.query: \n${util.inspect(req.query, { colors: true, depth: null })}
    // `);
    
    // console.log(`
    //   ----- validation_idObj -----\n
    //   ${util.inspect(validation_idObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // ---------------------------------------------
    //   Return Json Object / Success
    // ---------------------------------------------
    
    return res.status(200).json(returnObj);
    
    
  } catch (error) {
    
    
    // ---------------------------------------------
    //   Log
    // ---------------------------------------------
    
    logger.log('error', `/applications/@database/card-players/api.js\nrouter.post('/follow')\n${error}`);
    
    
    // --------------------------------------------------
    //   製品版の場合、エラーメッセージを定型文に変更
    // --------------------------------------------------
    
    let message = error.message;
    
    if (process.env.NODE_ENV === 'production') {
      message = 'Follow';
    }
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json({
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