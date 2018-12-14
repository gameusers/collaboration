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

const validationPlayerId = require('../../../@database/users/validations/player-id');


// ---------------------------------------------
//   Schema / Model
// ---------------------------------------------

const ModelUsers = require('../../../@database/users/model');
const ModelCardPlayers = require('../../../@database/card-players/model');
const ModelCardGames = require('../../../@database/card-games/model');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { addLocaleData } = require('react-intl');
const en = require('react-intl/locale-data/en');
const ja = require('react-intl/locale-data/ja');
addLocaleData([...en, ...ja]);

const { locale } = require('../../../@locales/locale');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();




// --------------------------------------------------
//   Status Code & Error Arguments Object
// --------------------------------------------------

let statusCode = 400;

let errorArgumentsObj = {
  fileId: '4tT2vx700',
  functionId: '',
  errorCodeArr: [500000],
  errorObj: {},
};




// --------------------------------------------------
//   Initial Props / Function ID: P3ut9x3Fj
// --------------------------------------------------

router.get('/initial-props', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  errorArgumentsObj.functionId = 'P3ut9x3Fj';
  
  let returnObj = {
    usersObj: {},
    cardsArr: []
  };
  
  let cardPlayersKeysArr = [];
  let cardGamesKeysArr = [];
  
  
  try {
    
    
    // --------------------------------------------------
    //   CSRF
    // --------------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Locale
    // --------------------------------------------------
    
    const localeObj = locale({
      acceptLanguage: req.headers['accept-language']
    });
    
    
    // --------------------------------------------------
    //   GET 取得
    // --------------------------------------------------
    
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
    
    const usersObj = await ModelUsers.findOneFormatted({
      localeObj,
      conditionObj: { playerId },
      usersLogin_id
    });
    
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
    
    const cardPlayersObj = await ModelCardPlayers.find({
      conditionObj: {
        users_id,
        language: { $in: localeObj.languageArr }
      }
    });
    
    returnObj.cardPlayersObj = cardPlayersObj;
    
    
    // --------------------------------------------------
    //   データ取得 / Card Games
    //   アクセスしたページ所有者のゲームカード情報
    // --------------------------------------------------
    
    const cardGamesObj = await ModelCardGames.find({
      countryArr: localeObj.countryArr,
      languageArr: localeObj.languageArr,
      conditionObj: { users_id }
    });
    
    returnObj.cardGamesObj = cardGamesObj;
    
    
    // --------------------------------------------------
    //   カードを一覧で表示するための配列を作成する
    // --------------------------------------------------
    
    cardPlayersKeysArr = Object.keys(cardPlayersObj);
    
    if (cardPlayersKeysArr.length > 0) {
      returnObj.cardsArr.push({
        cardPlayers_id: cardPlayersKeysArr[0]
      });
    }
    
    cardGamesKeysArr = Object.keys(cardGamesObj);
    
    if (cardGamesKeysArr.length > 0) {
      returnObj.cardsArr.push({
        cardGames_id: cardGamesKeysArr[0]
      });
    }
    
    
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
    
    // console.log(chalk`
    //   req.headers['accept-language']: {green ${req.headers['accept-language']}}
    // `);
    
    // console.log(`
    //   ----- localeObj -----\n
    //   ${util.inspect(localeObj, { colors: true, depth: null })}\n
    //   --------------------\n
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
    
    
  }
  
});



module.exports = router;