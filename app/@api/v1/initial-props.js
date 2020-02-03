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
const upload = multer({ dest: 'public/' });
const moment = require('moment');
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelUsers = require('../../@database/users/model');
const ModelGames = require('../../@database/games/model');
// const ModelCardPlayers = require('../../@database/card-players/model');
const ModelEmailConfirmations = require('../../@database/email-confirmations/model');
const ModelUserCommunities = require('../../@database/user-communities/model');
const ModelForumThreads = require('../../@database/forum-threads/model');
// const ModelForumComments = require('../../@database/forum-comments/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { decrypt }  = require('../../@modules/crypto');
const { returnErrorsArr } = require('../../@modules/log/log');
const { CustomError } = require('../../@modules/error/custom');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatEmailSecret } = require('../../@format/email');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

// const { addLocaleData } = require('react-intl');
// const en = require('react-intl/locale-data/en');
// const ja = require('react-intl/locale-data/ja');
// addLocaleData([...en, ...ja]);

const { locale } = require('../../@locales/locale');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();




// --------------------------------------------------
//   Status Code & Error Arguments Object
// --------------------------------------------------

let statusCode = 400;




// --------------------------------------------------
//   endpointID: GBsTCSr4y
// --------------------------------------------------

router.get('/common', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const returnObj = {
    login: false
  };
  
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  try {
    
    
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
    
    // returnObj.headerObj = {};
    
    returnObj.headerObj = await ModelGames.findForHeroImage({
      localeObj,
    });
    
    
    // ---------------------------------------------
    //   Success
    // ---------------------------------------------
    
    return res.status(200).json(returnObj);
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   Log
    // ---------------------------------------------
    
    const resultErrorObj = returnErrorsArr({
      errorObj,
      endpointID: 'GBsTCSr4y',
      users_id: loginUsers_id,
      ip: req.ip,
      requestParametersObj,
    });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
  
});




// --------------------------------------------------
//   endpointID: P3ut9x3Fj
// --------------------------------------------------

// router.get('/ur/user', upload.none(), async (req, res, next) => {
  
  
//   // --------------------------------------------------
//   //   Locale
//   // --------------------------------------------------
  
//   const localeObj = locale({
//     acceptLanguage: req.headers['accept-language']
//   });
  
  
//   // --------------------------------------------------
//   //   Property
//   // --------------------------------------------------
  
//   const returnObj = {
//     usersObj: {},
//     cardsArr: [],
//   };
  
//   const requestParametersObj = {};
//   const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
//   try {
    
    
//     // --------------------------------------------------
//     //   GET Data
//     // --------------------------------------------------
    
//     const userID = req.query.userID;
    
//     lodashSet(requestParametersObj, ['userID'], userID);
    
    
    
    
//     // --------------------------------------------------
//     //   データ取得 / Users
//     //   アクセスしたページ所有者のユーザー情報
//     //   users_id を取得するために利用
//     // --------------------------------------------------
    
//     const usersObj = await ModelUsers.findOne({
//       conditionObj: {
//         userID,
//       }
//     });
    
    
//     // --------------------------------------------------
//     //   ユーザー情報が存在しない場合はエラー
//     // --------------------------------------------------
    
//     const users_id = lodashGet(usersObj, ['_id'], '');
    
//     if (!users_id) {
//       statusCode = 404;
//       throw new CustomError({ level: 'warn', errorsArr: [{ code: 'IVX1dL1pJ', messageID: 'Error' }] });
//     }
    
    
//     // --------------------------------------------------
//     //   pagesArr
//     // --------------------------------------------------
    
//     returnObj.pagesArr = lodashGet(usersObj, ['pagesArr'], []);
    
    
//     // --------------------------------------------------
//     //   データ取得 / Card Players
//     //   アクセスしたページ所有者のプレイヤーカード情報
//     // --------------------------------------------------
    
//     const cardPlayersObj = await ModelCardPlayers.findForCardPlayer({
//       localeObj,
//       users_id,
//       loginUsers_id
//     });
    
//     returnObj.cardPlayersObj = cardPlayersObj;
    
    
//     // --------------------------------------------------
//     //   カードを一覧で表示するための配列を作成する
//     // --------------------------------------------------
    
//     const cardPlayersKeysArr = Object.keys(cardPlayersObj);
    
//     if (cardPlayersKeysArr.length > 0) {
//       returnObj.cardsArr.push({
//         cardPlayers_id: cardPlayersKeysArr[0]
//       });
//     }
    
    
//     // --------------------------------------------------
//     //   console.log
//     // --------------------------------------------------
    
//     // console.log(chalk`
//     //   {green ur/player/api/player / initial-props}
//     //   userID: {green ${userID}}
//     //   users_id：{green ${users_id}}
//     // `);
    
//     // console.log(`
//     //   ----- localeObj -----\n
//     //   ${util.inspect(localeObj, { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- usersObj -----\n
//     //   ${util.inspect(usersObj, { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- cardPlayersObj -----\n
//     //   ${util.inspect(cardPlayersObj, { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- returnObj -----\n
//     //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
    
//     // ---------------------------------------------
//     //   Return Json Object / Success
//     // ---------------------------------------------
    
//     return res.status(200).json(returnObj);
    
    
//   } catch (errorObj) {
    
    
//     // ---------------------------------------------
//     //   Log
//     // ---------------------------------------------
    
//     const resultErrorObj = returnErrorsArr({
//       errorObj,
//       endpointID: 'P3ut9x3Fj',
//       users_id: loginUsers_id,
//       ip: req.ip,
//       requestParametersObj,
//     });
    
    
//     // --------------------------------------------------
//     //   Return JSON Object / Error
//     // --------------------------------------------------
    
//     return res.status(statusCode).json(resultErrorObj);
    
    
//   }
  
// });




// --------------------------------------------------
//   endpointID: IXNCfSRLy
// --------------------------------------------------

router.get('/ur/settings', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {
    login: false
  };
  
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  try {
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    if (!req.isAuthenticated()) {
      statusCode = 401;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'eex48Zjee', messageID: 'xLLNIpo6a' }] });
    }
    
    lodashSet(returnObj, ['loginUsersObj'], req.user);
    lodashSet(returnObj, ['login'], true);
    
    
    // --------------------------------------------------
    //   データ取得 / Games
    //   ヘッダーヒーローイメージ用
    // --------------------------------------------------
    
    returnObj.headerObj = await ModelGames.findForHeroImage({
      language: localeObj.language,
      country: localeObj.country,
    });
    
    
    // --------------------------------------------------
    //   データ取得 / Users
    // --------------------------------------------------
    
    const usersObj = await ModelUsers.findOne({
      conditionObj: {
        _id: loginUsers_id,
      }
    });
    
    
    // --------------------------------------------------
    //   Decrypt E-Mail
    // --------------------------------------------------
    
    const decryptedEmail = usersObj.emailObj.value ? decrypt(usersObj.emailObj.value) : '';
    
    
    // --------------------------------------------------
    //   Set Users Object
    // --------------------------------------------------
    
    returnObj.usersObj = {
      loginID: usersObj.loginID,
      userID: usersObj.userID,
      emailObj: {
        secret: formatEmailSecret({ value: decryptedEmail }),
        confirmation: usersObj.emailObj.confirmation,
      },
      pagesArr: usersObj.pagesArr,
    };
    
    // console.log(chalk`
    //   emailHidden: {green ${emailHidden}}
    // `);
    
    // console.log(`\n---------- usersObj ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(usersObj)));
    // console.log(`\n-----------------------------------\n`);
    
    
    // ---------------------------------------------
    //   Success
    // ---------------------------------------------
    
    return res.status(200).json(returnObj);
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   Log
    // ---------------------------------------------
    
    const resultErrorObj = returnErrorsArr({
      errorObj,
      endpointID: 'IXNCfSRLy',
      users_id: loginUsers_id,
      ip: req.ip,
      requestParametersObj,
    });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
  
});




// --------------------------------------------------
//   endpointID: R9AFOxwEK
// --------------------------------------------------

router.get('/email/confirmation', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const returnObj = {};
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  try {
    
    
    // --------------------------------------------------
    //   GET Data
    // --------------------------------------------------
    
    const emailConfirmationID = req.query.emailConfirmationID;
    
    lodashSet(requestParametersObj, ['emailConfirmationID'], emailConfirmationID);
    // console.log(chalk`
    //   emailConfirmationID: {green ${emailConfirmationID}}
    // `);
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    // verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login User Object
    // --------------------------------------------------
    
    lodashSet(returnObj, ['loginUsersObj'], req.user);
    
    
    // --------------------------------------------------
    //   データ取得 / Games
    //   ヘッダーヒーローイメージ用
    // --------------------------------------------------
    
    returnObj.headerObj = await ModelGames.findForHeroImage({
      language: localeObj.language,
      country: localeObj.country,
    });
    
    
    // --------------------------------------------------
    //   データ取得 / Email Confirmations
    // --------------------------------------------------
    
    const emailConfirmationsObj = await ModelEmailConfirmations.findOne({
      conditionObj: {
        emailConfirmationID,
      }
    });
    
    const isSuccess = lodashGet(emailConfirmationsObj, ['isSuccess'], '');
    const createdDate = lodashGet(emailConfirmationsObj, ['createdDate'], '');
    const email = lodashGet(emailConfirmationsObj, ['email'], '');
    const users_id = lodashGet(emailConfirmationsObj, ['users_id'], '');
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、エラー
    // --------------------------------------------------
    
    if (!createdDate || !email || !users_id) {
      statusCode = 404;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: '8JJ4_hJyz', messageID: 'Error' }] });
    }
    
    
    // --------------------------------------------------
    //   24時間以内にアクセスしたかチェック
    // --------------------------------------------------
    
    const dateTimeLimit = moment(createdDate).utc().add(1, 'day');
    const dateTimeNow = moment().utc();
    
    if (dateTimeLimit.isBefore(dateTimeNow)) {
      statusCode = 404;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'qmu7nkZxS', messageID: 'Error' }] });
    }
    
    
    // --------------------------------------------------
    //   DB Update
    // --------------------------------------------------
    
    if (!isSuccess) {
      
      
      const ISO8601 = moment().toISOString();
    
      const emailConfirmationsConditionObj = {
        emailConfirmationID,
      };
      
      const emailConfirmationsSaveObj = {
        $set: {
          isSuccess: true,
        }
      };
      
      const usersConditionObj = {
        _id: users_id,
        'emailObj.value': email,
      };
      
      const usersSaveObj = {
        $set: {
          updatedDate: ISO8601,
          accessDate: ISO8601,
          emailObj: {
            value: email,
            confirmation: true,
          },
          
        }
      };
      
      
      await ModelEmailConfirmations.transactionForEmailConfirmation({
        emailConfirmationsConditionObj,
        emailConfirmationsSaveObj,
        usersConditionObj,
        usersSaveObj,
      });
      
      
    }
    
    // const ISO8601 = moment().toISOString();
    
    // const emailConfirmationsConditionObj = {
    //   emailConfirmationID,
    // };
    
    // const usersConditionObj = {
    //   _id: users_id,
    //   'emailObj.value': email,
    // };
    
    // const usersSaveObj = {
    //   $set: {
    //     updatedDate: ISO8601,
    //     accessDate: ISO8601,
    //     emailObj: {
    //       value: email,
    //       confirmation: true,
    //     },
        
    //   }
    // };
    
    // await ModelEmailConfirmations.transactionForEmailConfirmation({
    //   emailConfirmationsConditionObj,
    //   usersConditionObj,
    //   usersSaveObj,
    // });
    
    
    // console.log(chalk`
    //   isSuccess: {green ${isSuccess}}
    //   createdDate: {green ${createdDate}}
    //   email: {green ${email}}
    //   users_id: {green ${users_id}}
    //   dateTimeLimit: {green ${dateTimeLimit}}
    //   dateTimeNow: {green ${dateTimeNow}}
    //   dateTimeLimit.isBefore(dateTimeNow): {green ${dateTimeLimit.isBefore(dateTimeNow)}}
    // `);
    
    // console.log(`\n---------- emailConfirmationsObj ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(emailConfirmationsObj)));
    // console.log(`\n-----------------------------------\n`);
    
    
    // ---------------------------------------------
    //   Success
    // ---------------------------------------------
    
    return res.status(200).json(returnObj);
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   Log
    // ---------------------------------------------
    
    const resultErrorObj = returnErrorsArr({
      errorObj,
      endpointID: 'R9AFOxwEK',
      users_id: loginUsers_id,
      ip: req.ip,
      requestParametersObj,
    });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
  
});




// --------------------------------------------------
//   endpointID: hc7YMP_C8
// --------------------------------------------------

router.get('/uc/community', upload.none(), async (req, res, next) => {
  
  // console.log('/uc/community');
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const returnObj = {};
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  try {
    
    
    // --------------------------------------------------
    //   GET Data
    // --------------------------------------------------
    
    const userCommunityID = req.query.userCommunityID;
    
    lodashSet(requestParametersObj, ['userCommunityID'], userCommunityID);
    
    
    // --------------------------------------------------
    //   DB find / User Community
    // --------------------------------------------------
    
    const userCommunityArr = await ModelUserCommunities.findForUserCommunity({
      localeObj,
      loginUsers_id,
      userCommunityID,
    });
    
    // console.log(`
    //   ----- userCommunityArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(userCommunityArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    if (userCommunityArr.length === 0) {
      statusCode = 404;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'retRq6eFo', messageID: 'Error' }] });
    }
    
    const userCommunities_id = lodashGet(userCommunityArr, [0, '_id'], '');
    returnObj.userCommunityObj = userCommunityArr[0];
    
    
    // --------------------------------------------------
    //   DB find / Forum Threads For List
    // --------------------------------------------------
    
    returnObj.forumThreadsForListObj = await ModelForumThreads.findForThreadsList({
      localeObj,
      loginUsers_id,
      userCommunities_id,
    });
    
    // console.log(`
    //   ----- forumThreads_idArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumThreads_idArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    // --------------------------------------------------
    //   DB find / Forum
    // --------------------------------------------------
    
    const forumObj = await ModelForumThreads.findForForum({
      req,
      localeObj,
      loginUsers_id,
      userCommunities_id,
    });
    
    returnObj.forumThreadsObj = forumObj.forumThreadsObj;
    returnObj.forumCommentsObj = forumObj.forumCommentsObj;
    returnObj.forumRepliesObj = forumObj.forumRepliesObj;
    
    
    // --------------------------------------------------
    //   DB find / Forum
    // --------------------------------------------------
    
    // const forumObj = await ModelForumThreads.findForThreads({
    //   req,
    //   localeObj,
    //   loginUsers_id,
    //   userCommunities_id,
    // });
    
    // returnObj.forumObj = forumObj.forumObj;
    // returnObj.forumThreadsObj = forumObj.forumThreadsObj;
    // returnObj.forumCommentsAndRepliesObj = forumObj.forumCommentsAndRepliesObj;
    
    
    // ---------------------------------------------
    //   Success
    // ---------------------------------------------
    
    return res.status(200).json(returnObj);
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   Log
    // ---------------------------------------------
    
    const resultErrorObj = returnErrorsArr({
      errorObj,
      endpointID: 'hc7YMP_C8',
      users_id: loginUsers_id,
      ip: req.ip,
      requestParametersObj,
    });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
  
});




module.exports = router;