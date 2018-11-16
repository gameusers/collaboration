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
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const shortid = require('shortid');
const bcrypt = require('bcrypt');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../@modules/csrf');
const { verifyRecaptcha } = require('../../../@modules/recaptcha');
const { encrypt }  = require('../../../@modules/crypto');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const {
  validationId,
  validationPassword,
  validationEmail
} = require('../../../@database/users/validations/login');


// ---------------------------------------------
//   Schema / Model
// ---------------------------------------------

const ModelUsers = require('../../../@database/users/model');
const ModelCardPlayers = require('../../../@database/card-players/model');
const ModelCardGames = require('../../../@database/card-games/model');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();





// --------------------------------------------------
//   Initial Props
// --------------------------------------------------

router.get('/initial-props', upload.none(), async (req, res, next) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   CSRF
    // --------------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    
    // --------------------------------------------------
    //   Return オブジェクト
    // --------------------------------------------------
    
    const returnObj = {};
    returnObj.data = {};
    
    
    
    // --------------------------------------------------
    //   ログインチェック
    // --------------------------------------------------
    
    returnObj.login = false;
    
    if (req.isAuthenticated()) {
      returnObj.login = true;
    }
    
    
    
    // --------------------------------------------------
    //   Model / Users / findOne_IdByPlayerId
    // --------------------------------------------------
    
    const users_id = await ModelUsers.findOne_IdByPlayerId(req.query.playerId);
    
    if (!users_id) {
      throw new Error('users_id が空です。');
    }
    
    
    
    // --------------------------------------------------
    //   Model / Users / findBy_Id
    // --------------------------------------------------
    
    const usersObj = await ModelUsers.findBy_Id([users_id]);
    
    if (!usersObj) {
      throw new Error('usersObj が空です。');
    }
    
    returnObj.data.usersObj = usersObj;
    
    
    
    // --------------------------------------------------
    //   Model / Card Players / Upsert
    // --------------------------------------------------
    
    await ModelCardPlayers.upsert(users_id, 'zaoOWw89g');
    
    
    
    // --------------------------------------------------
    //   Model / Card Players / Find
    // --------------------------------------------------
    
    const cardPlayersObj = await ModelCardPlayers.find([users_id]);
    returnObj.data.cardPlayersObj = cardPlayersObj;
    
    
    
    // --------------------------------------------------
    //   Model / Card Games / upsert
    // --------------------------------------------------
    
    await ModelCardGames.upsert(users_id, 'TzjNMDQyl');
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   {green pl/player/api/player / initial-props}
    //   req.isAuthenticated(): {green ${req.isAuthenticated()}}
    //   users_id: {green ${users_id}}
    // `);
    
    // console.log(`
    //   req.user: \n${util.inspect(req.user, { colors: true, depth: null })}
    //   req.query: \n${util.inspect(req.query, { colors: true, depth: null })}
    //   usersObj: \n${util.inspect(usersObj, { colors: true, depth: null })}
    //   cardPlayersObj: \n${util.inspect(cardPlayersObj, { colors: true, depth: null })}
    // `);
    
    
    
    
    
    // ---------------------------------------------
    //   Return Json Object / Success
    // ---------------------------------------------
    
    return res.status(200).json(returnObj);
    
    
  } catch (error) {
    
    // console.log(chalk`
    //   error.message: {red ${error.message}}
    // `);
    
    
    // --------------------------------------------------
    //   製品版の場合、エラーメッセージを定型文に変更
    // --------------------------------------------------
    
    let message = error.message;
    
    if (process.env.NODE_ENV === 'production') {
      message = 'Initial Props';
    }
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
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