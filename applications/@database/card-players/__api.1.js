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
const { errorCodeIntoErrorObj } = require('../../@modules/error/errors-obj');


// ---------------------------------------------
//   Format
// ---------------------------------------------

// const { errorCodeIntoErrorObj } = require('../../@format/error');


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
  let errorCodeArr = [1];
  
  
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
      errorCodeArr = [100];
      throw new Error();
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
      errorCodeArr = [101];
      throw new Error();
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
    
    // logger.log('error', `/applications/@database/card-players/api.js\nrouter.post('/follow')\n${error}`);
    
    const errorsObj = errorCodeIntoErrorObj(
      error,
      errorCodeArr,
      `/applications/@database/card-players/api.js\nrouter.post('/follow')`
    );
    
    
    // --------------------------------------------------
    //   Error Message
    // --------------------------------------------------
    
    // let message = '';
    
    // if (errorCode === 100) {
      
    //   message = 'ログインする必要があります。';
      
    // } else if (errorCode === 101) {
      
    //   message = 'Validation';
      
    // } else if (process.env.NODE_ENV !== 'production') {
      
    //   message = error.message;
      
    // }
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(errorsObj);
    
    // return res.status(statusCode).json({
    //   errorsArr: [
    //     {
    //       code: errorCode,
    //       message
    //     },
    //   ]
    // });
    
  }
  
});



module.exports = router;