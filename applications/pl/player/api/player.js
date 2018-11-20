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

const { verifyCsrfToken } = require('../../../@modules/csrf');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const validationPlayerId = require('../../../@database/users/validations/player-id');


// ---------------------------------------------
//   Schema / Model
// ---------------------------------------------

const ModelUsers = require('../../../@database/users/model');
const ModelCardPlayers = require('../../../@database/card-players/model');
const ModelCardGames = require('../../../@database/card-games/model');


// ---------------------------------------------
//   Logger
// ---------------------------------------------

const logger = require('../../../@modules/logger');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();





// --------------------------------------------------
//   Initial Props
// --------------------------------------------------

router.get('/initial-props', upload.none(), async (req, res, next) => {
  
  
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
    //   Player ID
    // --------------------------------------------------
    
    const playerId = req.query.playerId;
    const validationPlayerIdObj = validationPlayerId(playerId);
    
    if (validationPlayerIdObj.error) {
      logger.log('error', `/applications/pl/player/api/player.js\nrouter.get('/initial-props')\nValidation`);
      throw new Error('Validation');
    }
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const returnObj = {};
    returnObj.data = {};
    returnObj.data.usersLoginObj = {};
    returnObj.cardsArr = [];
    
    let cardPlayersKeysArr = [];
    
    
    // --------------------------------------------------
    //   ログインしているユーザー情報
    // --------------------------------------------------
    
    let userslogin_id = '';
    
    if (req.user) {
      returnObj.data.usersLoginObj = req.user;
      userslogin_id = req.user._id;
    }
    
    
    // --------------------------------------------------
    //   Model / Users
    //   アクセスしたページ所有者のユーザー情報取得
    // --------------------------------------------------
    
    const usersObj = await ModelUsers.findOne({ playerId }, userslogin_id);
    
    if (Object.keys(usersObj).length === 0) {
      
      // ステータスコード
      statusCode = 404;
      
      // エラー
      throw new Error('usersObj が空です。');
      
    }
    
    returnObj.data.usersObj = usersObj;
    
    const usersKeysArr = Object.keys(usersObj);
    const users_id = usersKeysArr[0];
    
    
    // --------------------------------------------------
    //   Model / Card Players
    //   アクセスしたページ所有者のプレイヤーカード情報取得
    // --------------------------------------------------
    
    const cardPlayersObj = await ModelCardPlayers.find({ users_id: { $in: users_id} });
    returnObj.data.cardPlayersObj = cardPlayersObj;
    
    // カードを一覧で表示するための配列を作成する
    cardPlayersKeysArr = Object.keys(cardPlayersObj);
    
    if (cardPlayersKeysArr.length > 0) {
      returnObj.cardsArr.push({
        type: 'player',
        _id: cardPlayersKeysArr[0]
      });
    }
    
    
    // --------------------------------------------------
    //   Model / Card Players / Upsert
    // --------------------------------------------------
    
    // await ModelCardPlayers.upsert(users_id, 'zaoOWw89g');
    
    
    // --------------------------------------------------
    //   Model / Card Games / upsert
    // --------------------------------------------------
    
    // await ModelCardGames.upsert(users_id, 'TzjNMDQyl');
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   {green pl/player/api/player / initial-props}
    //   playerId: {green ${playerId}}
    // `);
    
    // console.log(`
    //   req.user: \n${util.inspect(req.user, { colors: true, depth: null })}
    //   req.query: \n${util.inspect(req.query, { colors: true, depth: null })}
    // `);
    
    
    // console.log(`
    //   ----- usersObj -----\n
    //   ${util.inspect(usersObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- cardPlayersObj -----\n
    //   ${util.inspect(cardPlayersObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- objectKeysArr -----\n
    //   ${util.inspect(objectKeysArr, { colors: true, depth: null })}\n
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
    //   Logger
    // ---------------------------------------------
    
    logger.log('error', `/applications/pl/player/api/player.js\nrouter.get('/initial-props')\n${error}`);
    
    
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