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
 * @param {Object} conditionObj - 検索条件
 * @return {Object} 取得データ
 */
const findTest = async (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  // const {
    
  //   country,
  //   conditionObj
    
  // } = argumentsObj;
  
  
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
    
    let docArr = await Model.aggregate([
      
      {
        $lookup:
          {
            from: 'games',
            localField: 'games_id',
            foreignField: '_id',
            as: 'gamesObj'
          }
      },
      {
        $unwind: '$gamesObj'
      },
      {
        $unwind: '$gamesObj.dataArr'
      },
      {
        $match: { 'gamesObj.dataArr.language': 'ja' }
      },
      
      // {
      //   $lookup:
      //     {
      //       from: 'users',
      //       localField: 'users_id',
      //       foreignField: '_id',
      //       as: 'usersObj'
      //     }
      // },
      {
        $lookup:
          {
            from: 'users',
            let: { cardGamesUsers_id: '$users_id' },
            pipeline: [{
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$_id', '$$cardGamesUsers_id'] },
                    { $eq: ['$country', 'JP'] }
                  ]
                }
              }
            }],
            as: 'usersObj'
          }
      },
      {
        $unwind: '$usersObj'
      },
      
      
      
      
      {
        $project: {
          _id: 1,
          updatedDate: 1,
          users_id: 1,
          games_id: 1,
          imageVideoArr: 1,
          
          dataArr: {
            $filter: {
              input: '$dataArr',
              as: 'item',
              cond: { $eq: [ '$$item.language', 'ja' ] }
            }
          },
          
          // gamesDataObj: {
          //   $filter: {
          //     input: '$gamesObj.dataArr',
          //     as: 'item',
          //     cond: { $eq: [ '$$item.language', 'ja' ] }
          //   }
          // },
          
          gameName: '$gamesObj.dataArr.name',
          gameId: '$gamesObj.gameId',
          gameThumbnail: '$gamesObj.thumbnail',
          
          usersObj: 1
          
        }
      },
      
      
      // {
      //   $unwind: '$dataArr'
      // },
      // {
      //   $match: { $or: [ {'dataArr.language': 'ja', 'dataArr.country': 'JP' }, {'dataArr.language': 'en', 'dataArr.country': 'US' } ] }
      // },
      // {
      //   $match: { 'dataArr.language': 'ja', 'dataArr.country': 'JP' }
      // },
      
      // {
      //   $match: { 'gamesObj.dataArr.language': 'ja', 'gamesObj.dataArr.country': 'JP' }
      // },
      
      // { _id: { $in: _idArr} };
      
      // {
      //   $project: {
      //     _id: 0,
      //     games_id: 0,
      //   }
      // },
      
      
      // {
      //   $match: { 'gamesObj.dataArr':
      //     {
      //       $elemMatch: { language: 'ja', country: 'JP' }
      //     }
      //   }
      // },
      
      
      
      // {
      //   $project: {
      //     // _id: 1,
      //     // updatedDate: 1,
      //     // users_id: 1,
      //     // games_id: 1,
      //     // imageVideoArr: 1,
          
      //     dataArr: {
      //       $filter: {
      //         input: '$dataArr',
      //         as: 'item',
      //         cond: { $eq: [ '$$item.language', 'ja' ] }
      //       }
      //     },
          
      //     gamesDataObj: {
      //       $filter: {
      //         input: '$gamesObj.dataArr',
      //         as: 'item',
      //         cond: { $eq: [ '$$item.language', 'ja' ] }
      //       }
      //     },
          
      //     // gameId: '$gamesObj.gameId',
      //     // gameThumbnail: '$gamesObj.thumbnail'
          
      //   }
      // },
      
      
      
      // {
      //   $unwind: '$gamesDataObj'
      // },
      // {
      //   $project: {
      //     _id: 1,
      //     updatedDate: 1,
      //     users_id: 1,
      //     imageVideoArr: 1,
      //     gameName: '$gamesDataObj[0].name',
      //     gameId: '$gamesObj.gameId',
      //     gameThumbnail: '$gamesObj.thumbnail'
      //   }
      // },
      // {
      //   $unwind: '$gamesDataArr'
      // },
      
      // {
      //   $project: {
      //     _id: 1,
      //     updatedDate: 1,
      //     users_id: 1,
      //     games_id: 1,
      //     imageVideoArr: 1,
          
      //     dataArr: {
      //       $filter: {
      //         input: '$dataArr',
      //         as: 'item',
      //         cond: { $eq: [ '$$item.language', 'ja' ] }
      //       }
      //     },
          
          
      //     // dataArr: 1,
          
      //     // 'dataArr.language': { $elemMatch: { $in: ['ja'] } }
          
      //     // 'new_users_id': '$users_id',
          
      //     // 'dbGames.dataArr.language': 1,
          
      //     // 'new_users_id': {
      //     //   $cond: {
      //     //     if: { $ne: [ 'jun-deE4J', '$users_id' ] },
      //     //     // if: { users_id: { $eq: 'jun-deE4J' } },
      //     //     // if: { users_id: 'jun-deE4J' },
      //     //     // if: { $match: { 'dbGames.dataArr':
      //     //     //   {
      //     //     //     $elemMatch: { language: 'ja', country: 'JP' }
      //     //     //   }
      //     //     // } },
      //     //     // if: { $elemMatch: { 'dbGames.dataArr': 'ja' } },
      //     //     then: '$$REMOVE',
      //     //     else: '$users_id'
      //     //   }
      //     // },
          
      //     // 'new_users_id': {
      //     //   $cond: {
      //     //     // if: { $ne: [ 'jun-deE4J', '$users_id' ] },
      //     //     // if: { users_id: { $eq: 'jun-deE4J' } },
      //     //     // if: { users_id: 'jun-deE4J' },
      //     //     if: { '$dbGames.dataArr': { $elemMatch: { language: 'en' } } },
      //     //     // if: { $elemMatch: { 'dbGames.dataArr': 'ja' } },
      //     //     then: '$$REMOVE',
      //     //     else: '$users_id'
      //     //   }
      //     // },
          
      //     // 'gameId': '$dbGames.gameId'
      //   }
      // },
      
      // {
      //   $project: {
      //     'gameName': '$dbGames.dataArr'
      //   }
      // },
      
      // {
      //   $match: { 'dbGames.dataArr':
      //     {
      //       $elemMatch: { language: 'ja' }
      //     }
      //   }
      // },
      
      
      // {
      //   $match: { 'dbGames.dataArr':
      //     {
      //       $elemMatch: {
      //         $and: [
      //           { $eq: ['language', 'ja'] }
                
      //         ]
      //       }
      //     }
      //   }
      // },
      
      // {
      //   $match: { 'dbGames._id': { $ne: 'w_zkqpr3R2' } }
      // },
      // {
      //   $project: { _id: 1, createdDate: 1 }
      // },
    ]).exec();
    
    // const conditionObj = { _id: 'TzjNMDQyl' };
    // let docArr = await Model.find(conditionObj).exec();
    
    
    
    console.log(`
      docArr: \n${util.inspect(docArr, { colors: true, depth: null })}
    `);
    
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
 * 取得する
 * @param {Object} conditionObj - 検索条件
 * @return {Object} 取得データ
 */
const find = async (argumentsObj) => {
  
  
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
  findTest,
  find,
  upsert
};