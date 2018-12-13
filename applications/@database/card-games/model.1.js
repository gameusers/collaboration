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

const shortid = require('shortid');
const moment = require('moment');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const Model = require('./schema');
const ModelGames = require('../games/schema');
const ModelCardPlayers = require('../card-players/schema');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { srcset } = require('../../@format/image');


// ---------------------------------------------
//   Logger
// ---------------------------------------------

// const logger = require('../../@modules/logger');




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * 取得する
 * @param {Object} argumentsObj - 引数
 * @return {Object} 取得データ
 */
const find = async (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    countryArr,
    languageArr,
    
  } = argumentsObj;
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    let cardGamesArr = await Model.aggregate([
      
      {
        $lookup:
          {
            from: 'users',
            let: { cardGamesUsers_id: '$users_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$_id', '$$cardGamesUsers_id'] },
                      { $in: ['$country', countryArr] }
                    ]
                  }
                }
              },
              { $project:
                {
                  _id: 0,
                  accessDate: 1,
                  level: 1,
                  followedArr: 1,
                  followedCount: 1,
                }
              }
            ],
            as: 'usersObj'
          }
      },
      {
        $unwind: '$usersObj'
      },
      
      
      {
        $lookup:
          {
            from: 'games',
            let: { cardGamesGameID: '$gameID' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$gameID', '$$cardGamesGameID'] },
                      { $in: ['$language', languageArr] }
                    ]
                  }
                }
              },
              { $project:
                {
                  _id: 0,
                  gameID: 1,
                  urlID: 1,
                  name: 1,
                  thumbnail: 1
                }
              }
            ],
            as: 'gamesObj'
          }
      },
      {
        $unwind: '$gamesObj'
      },
      
      
      // {
      //   $lookup:
      //     {
      //       from: 'card-players',
      //       let: { cardGamesUsers_id: '$users_id' },
      //       pipeline: [
      //         { $match:
      //           { $expr:
      //             { $eq: ['$users_id', '$$cardGamesUsers_id'] },
      //           }
      //         },
      //         { $project:
      //           {
      //             _id: 0,
      //             activityTimeObj: 1,
      //             lookingForFriendsObj: 1,
      //             voiceChatObj: 1,
      //             linkArr: 1
      //           }
      //         }
      //       ],
      //       as: 'cardPlayersObj'
      //     }
      // },
      // {
      //   $unwind: '$cardPlayersObj'
      // },
      
      
      {
        $lookup:
          {
            from: 'card-players',
            let: { cardGamesQuotationObjCardPlayers_id: '$quotationObj.cardPlayers_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$cardGamesQuotationObjCardPlayers_id'] },
                }
              },
              { $project:
                {
                  _id: 0,
                  activityTimeObj: 1,
                  lookingForFriendsObj: 1,
                  voiceChatObj: 1,
                  linkArr: 1
                }
              }
            ],
            as: 'cardPlayersObj'
          }
      },
      {
        $unwind: '$cardPlayersObj'
      },
      
      
      // {
      //   $lookup:
      //     {
      //       from: 'card-players',
      //       localField: 'quotationObj.cardPlayers_id',
      //       foreignField: '_id',
      //       as: 'cardPlayersObj'
      //     }
      // },
      // {
      //   $unwind: '$cardPlayersObj'
      // },
      // {
      //   $match: { 'gamesObj.language': 'ja' }
      // },
      
      
      {
        $project: {
          _id: 1,
          updatedDate: 1,
          users_id: 1,
          theme: 1,
          name: 1,
          status: 1,
          thumbnail: 1,
          imageVideoArr: 1,
          itemArr: 1,
          comment: 1,
          playingHardwareObj: 1,
          idArr: 1,
          activityTimeObj: 1,
          lookingForFriendsObj: 1,
          voiceChatObj: 1,
          linkArr: 1,
          quotationObj: 1,
          usersObj: 1,
          gamesObj: 1,
          cardPlayersObj: 1,
        }
      },
    ]).exec();
    
    
    
    
    
    
    // const cardPlayers_id = cardGamesArr.quotationObj.cardPlayers_id;
    
    // let cardPlayersArr = await ModelCardPlayers.find({
    //   conditionObj: {
    //     _id: cardPlayers_id
    //   }
    // }).exec();
    
    
    // console.log(`
    //   cardGamesArr: \n${util.inspect(cardGamesArr, { colors: true, depth: null })}
    // `);
    
    console.log(`
      ----- cardGamesArr -----\n
      ${util.inspect(cardGamesArr, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    // console.log(`
    //   ----- cardPlayersArr -----\n
    //   ${util.inspect(cardPlayersArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return returnObj;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};



/**
 * 取得する
 * @param {Object} conditionObj - 検索条件
 * @return {Object} 取得データ
 */
const find2 = async (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    country,
    conditionObj
    
  } = argumentsObj;
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    let docCardGamesArr = await Model.find(conditionObj).exec();
    
    
    // --------------------------------------------------
    //   games_id を取得する
    // --------------------------------------------------
    
    const games_idArr = [];
    
    for (let value of docCardGamesArr.values()) {
      games_idArr.push(value.games_id);
    }
    
    const docGamesArr = await ModelGames.find({ _id: { $in: games_idArr} }).exec();
    
    
    // --------------------------------------------------
    //   ゲーム名を取得する
    // --------------------------------------------------
    
    for (let value of docCardGamesArr.values()) {
      
      
      // --------------------------------------------------
      //   オブジェクトをディープコピー
      // --------------------------------------------------
      
      const copiedObj = JSON.parse(JSON.stringify(value));
      
      
      // --------------------------------------------------
      //   ゲームID ＆ ゲーム名を設定する
      // --------------------------------------------------
      
      const gamesObj = docGamesArr.find((value2) => {
        return value2._id === value.games_id;
      });
      
      const dataObj = gamesObj.dataArr.find((value3) => {
        return value3.country === country;
      });
      
      copiedObj.gameId = gamesObj.gameId;
      copiedObj.gameName = dataObj.name;
      
      
      // console.log(`
      //   gamesObj: \n${util.inspect(gamesObj, { colors: true, depth: null })}
      // `);
      
      
      // --------------------------------------------------
      //   画像配列を<img>タグで出力するためにフォーマット
      // --------------------------------------------------
      
      copiedObj.imageArr = srcset('/static/img/card/games/', copiedObj.imageVideoArr);
      delete copiedObj.imageVideoArr;
      
      
      // --------------------------------------------------
      //   return オブジェクト
      // --------------------------------------------------
      
      returnObj[value._id] = copiedObj;
      
      
    }
    
    
    // console.log(`
    //   docCardGamesArr: \n${util.inspect(docCardGamesArr, { colors: true, depth: null })}
    // `);
    
    // console.log(`
    //   games_idArr: \n${util.inspect(games_idArr, { colors: true, depth: null })}
    // `);
    
    // console.log(`
    //   docGamesArr: \n${util.inspect(docGamesArr, { colors: true, depth: null })}
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return returnObj;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};



/**
 * 挿入 / 更新する
 * @param {Object} conditionObj - 検索条件
 * @param {Object} saveObj - 保存データ
 * @return {Object} 
 */
const upsert = async (conditionObj, saveObj) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Upsert
    // --------------------------------------------------
    
    const docArr = await Model.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: false, setDefaultsOnInsert: true }).exec();
    
    
    // console.log(`
    //   docArr: \n${util.inspect(docArr, { colors: true, depth: null })}
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return returnObj;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};





// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  // findTest,
  find,
  upsert
};