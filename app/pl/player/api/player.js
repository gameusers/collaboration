// --------------------------------------------------
//   File ID: 4tT2vx700
// --------------------------------------------------

// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
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

// const { verifyCsrfToken } = require('../../../@modules/csrf');
const { errorCodeIntoErrorObj } = require('../../../@modules/error/error-obj');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationUsersPlayerID } = require('../../../@database/users/validations/player-id');


// ---------------------------------------------
//   Schema / Model
// ---------------------------------------------

const ModelGames = require('../../../@database/games/model');
const ModelUsers = require('../../../@database/users/model');
const ModelCardPlayers = require('../../../@database/card-players/model');


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
  fileID: '4tT2vx700',
  functionID: '',
  errorCodeArr: [],
  errorObj: {},
  usersLogin_id: ''
};




// --------------------------------------------------
//   Initial Props / Function ID: P3ut9x3Fj
// --------------------------------------------------

router.get('/initial-props', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  errorArgumentsObj.functionID = 'P3ut9x3Fj';
  
  let returnObj = {
    usersObj: {},
    cardsArr: []
  };
  
  let cardPlayersKeysArr = [];
  // let cardGamesKeysArr = [];
  
  
  try {
    
    
    // --------------------------------------------------
    //   GET 取得 & Validation
    // --------------------------------------------------
    
    const playerID = req.query.playerID;
    const validationUsersPlayerIDObj = validationUsersPlayerID(playerID);
    
    if (validationUsersPlayerIDObj.error) {
      statusCode = 400;
      errorArgumentsObj.errorCodeArr = ['chDdoM5Hv'];
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   データ取得 / Games
    //   ヒーローイメージ用
    // --------------------------------------------------
    
    const gamesObj = await ModelGames.findForHeroImage({
      language: localeObj.language,
      country: localeObj.country,
    });
    
    console.log(`
      ----- gamesObj -----\n
      ${util.inspect(gamesObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    // --------------------------------------------------
    //   ログインしているユーザー情報
    // --------------------------------------------------
    
    let usersLogin_id = '';
    
    if (req.isAuthenticated() && req.user) {
      returnObj.usersLoginObj = req.user;
      usersLogin_id = req.user._id;
    }
    
    
    // --------------------------------------------------
    //   データ取得 / Users
    //   アクセスしたページ所有者のユーザー情報
    //   users_id を取得するためだけに使用
    // --------------------------------------------------
    
    const usersObj = await ModelUsers.findOne({
      conditionObj: {
        playerID,
      }
    });
    
    // console.log(`
    //   ----- usersObj -----\n
    //   ${util.inspect(usersObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   ユーザー情報が存在しない場合はエラー
    // --------------------------------------------------
    
    const users_id = usersObj._id;
    
    if (!users_id) {
      statusCode = 404;
      errorArgumentsObj.errorCodeArr = ['IVX1dL1pJ'];
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   データ取得 / Card Players
    //   アクセスしたページ所有者のプレイヤーカード情報
    // --------------------------------------------------
    
    const cardPlayersObj = await ModelCardPlayers.findForCardPlayer({
      users_id,
      language: localeObj.language,
      country: localeObj.country,
      usersLogin_id
    });
    
    returnObj.cardPlayersObj = cardPlayersObj;
    
    
    // --------------------------------------------------
    //   データ取得 / Card Games
    //   アクセスしたページ所有者のゲームカード情報
    // --------------------------------------------------
    
    // const cardGamesObj = await ModelCardGames.find({
    //   users_id,
    //   language: localeObj.language,
    //   country: localeObj.country,
    //   usersLogin_id
    // });
    
    // returnObj.cardGamesObj = cardGamesObj;
    
    
    // --------------------------------------------------
    //   カードを一覧で表示するための配列を作成する
    // --------------------------------------------------
    
    cardPlayersKeysArr = Object.keys(cardPlayersObj);
    
    if (cardPlayersKeysArr.length > 0) {
      returnObj.cardsArr.push({
        cardPlayers_id: cardPlayersKeysArr[0]
      });
    }
    
    // cardGamesKeysArr = Object.keys(cardGamesObj);
    
    // if (cardGamesKeysArr.length > 0) {
    //   returnObj.cardsArr.push({
    //     cardGames_id: cardGamesKeysArr[0]
    //   });
    // }
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   {green pl/player/api/player / initial-props}
    //   playerID: {green ${playerID}}
    //   users_id：{green ${users_id}}
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
    //   ----- returnObj -----\n
    //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // ---------------------------------------------
    //   Return Json Object / Success
    // ---------------------------------------------
    
    return res.status(200).json(returnObj);
    
    
  } catch (errorObj) {
    
    
    // console.log(chalk`
    //   errorObj.message: {green ${errorObj.message}}
    // `);
    
    // console.log(`
    //   ----- errorObj -----\n
    //   ${util.inspect(errorObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // ---------------------------------------------
    //   Error Object
    // ---------------------------------------------
    
    errorArgumentsObj.errorObj = errorObj;
    const resultErrorObj = errorCodeIntoErrorObj({ ...errorArgumentsObj });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
});



module.exports = router;