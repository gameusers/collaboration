// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelGames = require('../../@database/games/model');






// --------------------------------------------------
//   function
// --------------------------------------------------

/**
 * ページにアクセスしたときの共通の処理
 * @param {Object} req - リクエスト
 * @param {Object} res - レスポンス
 */
const initialProps = async ({ req, res, localeObj }) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const returnObj = {
    
    login: false,
    
  };
  
  
  // --------------------------------------------------
  //   ログインしているユーザー情報＆ログインチェック
  // --------------------------------------------------
  
  if (req.isAuthenticated() && req.user) {
    
    returnObj.loginUsersObj = req.user;
    returnObj.login = true;
    
  }
  
  
  // --------------------------------------------------
  //   データ取得 / Games
  //   ヘッダーヒーローイメージ用
  // --------------------------------------------------
  
  returnObj.headerObj = await ModelGames.findForHeroImage({
    
    localeObj,
    
  });
  
  
  return returnObj;
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  
  initialProps,
  
};