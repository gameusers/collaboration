// --------------------------------------------------
//   File ID: 4tT2vx700
// --------------------------------------------------

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
const { errorCodeIntoErrorObj } = require('../../../@modules/error/error-obj');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const validationLocale = require('../../../@validations/locale');
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
//   Initial Props / Function ID: P3ut9x3Fj
// --------------------------------------------------

router.get('/initial-props', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {
    cardsArr: []
  };
  
  let cardPlayersKeysArr = [];
  let cardGamesKeysArr = [];
  let statusCode = 400;
  
  let errorArgumentsObj = {
    fileId: '4tT2vx700',
    functionId: 'P3ut9x3Fj',
    errorCodeArr: [500000],
    errorObj: {},
  };
  
  
  try {
    
    
    // --------------------------------------------------
    //   CSRF
    // --------------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   GET 取得
    // --------------------------------------------------
    
    let locale = req.query.locale;
    const validationLocaleObj = validationLocale(locale);
    
    // console.log(chalk`
    //   locale: {green ${locale}}
    // `);
    
    // console.log(`
    //   validationLocaleObj: \n${util.inspect(validationLocaleObj, { colors: true, depth: null })}
    // `);
    
    
    if (validationLocaleObj.error) {
      locale = 'ja';
      // statusCode = 400;
      // errorArgumentsObj.errorCodeArr = [502001];
      // throw new Error();
    }
    
    const country = 'Japan';
    
    
    
    const playerId = req.query.playerId;
    const validationPlayerIdObj = validationPlayerId(playerId);
    
    if (validationPlayerIdObj.error) {
      statusCode = 400;
      errorArgumentsObj.errorCodeArr = [502102];
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   ログインしているユーザー情報
    // --------------------------------------------------
    
    let usersLogin_id = '';
    
    if (req.user) {
      returnObj.usersLoginObj = req.user;
      usersLogin_id = req.user._id;
    }
    
    
    // --------------------------------------------------
    //   データ取得 / Users
    //   アクセスしたページ所有者のユーザー情報
    // --------------------------------------------------
    
    const usersObj = await ModelUsers.findOneFormatted({ playerId }, usersLogin_id);
    
    if (Object.keys(usersObj).length === 0) {
      statusCode = 404;
      errorArgumentsObj.errorCodeArr = [503001];
      throw new Error();
    }
    
    returnObj.usersObj = usersObj;
    
    const usersKeysArr = Object.keys(usersObj);
    const users_id = usersKeysArr[0];
    
    
    // --------------------------------------------------
    //   データ取得 / Card Players
    //   アクセスしたページ所有者のプレイヤーカード情報
    // --------------------------------------------------
    
    // const cardPlayersObj = await ModelCardPlayers.find({ users_id: { $in: users_id} });
    const cardPlayersObj = await ModelCardPlayers.find({ users_id });
    returnObj.cardPlayersObj = cardPlayersObj;
    
    // カードを一覧で表示するための配列を作成する
    cardPlayersKeysArr = Object.keys(cardPlayersObj);
    
    if (cardPlayersKeysArr.length > 0) {
      returnObj.cardsArr.push({
        type: 'player',
        _id: cardPlayersKeysArr[0]
      });
    }
    
    
    // --------------------------------------------------
    //   データ取得 / Card Games
    //   アクセスしたページ所有者のゲームカード情報
    // --------------------------------------------------
    
    const cardGamesObj = await ModelCardGames.find({
      country,
      conditionObj: { users_id }
    });
    
    returnObj.cardGamesObj = cardGamesObj;
    
    // カードを一覧で表示するための配列を作成する
    cardGamesKeysArr = Object.keys(cardGamesObj);
    
    if (cardGamesKeysArr.length > 0) {
      returnObj.cardsArr.push({
        type: 'game',
        _id: cardGamesKeysArr[0]
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
    //   ----- cardGamesObj -----\n
    //   ${util.inspect(cardGamesObj, { colors: true, depth: null })}\n
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
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   Error Object
    // ---------------------------------------------
    
    errorArgumentsObj.errorObj = errorObj;
    const resultErrorObj = errorCodeIntoErrorObj(errorArgumentsObj);
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
    // ---------------------------------------------
    //   Log
    // ---------------------------------------------
    
    // logger.log('error', `/applications/pl/player/api/player.js\nrouter.get('/initial-props')\n${error}`);
    
    
    // --------------------------------------------------
    //   製品版の場合、エラーメッセージを定型文に変更
    // --------------------------------------------------
    
    // let message = error.message;
    
    // if (process.env.NODE_ENV === 'production') {
    //   message = 'Initial Props';
    // }
    
    
    // // --------------------------------------------------
    // //   Return JSON Object / Error
    // // --------------------------------------------------
    
    // return res.status(statusCode).json({
    //   errorsArr: [
    //     {
    //       code: 0,
    //       message
    //     },
    //   ]
    // });
    
  }
  
});



module.exports = router;