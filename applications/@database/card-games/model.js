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
    
    users_id,
    language,
    country,
    usersLogin_id
    
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
        $match : { users_id }
      },
      
      
      {
        $lookup:
          {
            from: 'users',
            let: { cardGamesUsers_id: '$users_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$cardGamesUsers_id'] },
                }
              },
              { $project:
                {
                  _id: 0,
                  accessDate: 1,
                  level: 1,
                  followArr: 1,
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
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
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
      
      
      {
        $lookup:
          {
            from: 'hardwares',
            let: { hardwarePlayingArr: '$hardwarePlayingObj.valueArr' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $in: ['$hardwareID', '$$hardwarePlayingArr'] }
                    ]
                  }
                }
              },
              { $project:
                {
                  _id: 0,
                  hardwareID: 1,
                  name: 1,
                }
              }
            ],
            as: 'hardwaresArr'
          }
      },
      
      
      {
        $project: {
          __v: 0,
          createdDate: 0,
          language: 0,
          hardwarePlayingObj: { search: 0 },
          activityTimeObj: { search: 0 },
          'activityTimeObj.valueArr': { _id: 0 },
          lookingForFriendsObj: { search: 0 },
          voiceChatObj: { search: 0 },
          idArr: { _id: 0, search: 0 },
          linkArr: { _id: 0, search: 0 },
          
          'cardPlayersObj.activityTimeObj': { search: 0 },
          'cardPlayersObj.activityTimeObj.valueArr': { _id: 0 },
          'cardPlayersObj.lookingForFriendsObj': { search: 0 },
          'cardPlayersObj.voiceChatObj': { search: 0 },
          'cardPlayersObj.linkArr': { _id: 0, search: 0 },
        }
      },
      // {
      //   $project: {
      //     _id: 1,
      //     updatedDate: 1,
      //     users_id: 1,
      //     theme: 1,
      //     name: 1,
      //     status: 1,
      //     thumbnail: 1,
      //     imageVideoArr: 1,
      //     itemArr: 1,
      //     comment: 1,
      //     hardwarePlayingObj: 1,
      //     idArr: 1,
      //     activityTimeObj: 1,
      //     lookingForFriendsObj: 1,
      //     voiceChatObj: 1,
      //     linkArr: 1,
      //     quotationObj: 1,
      //     usersObj: 1,
      //     gamesObj: 1,
      //     cardPlayersObj: 1,
      //   }
      // },
    ]).exec();
    
    
    
    
    
    // --------------------------------------------------
    //   データの処理
    // --------------------------------------------------
    
    for (let valueObj of cardGamesArr) {
      
      
      // --------------------------------------------------
      //   コピー
      // --------------------------------------------------
      
      const copiedObj = JSON.parse(JSON.stringify(valueObj));
      
      
      // --------------------------------------------------
      //   画像の処理
      // --------------------------------------------------
      
      copiedObj.imageArr = srcset(`/static/img/card/games/${valueObj._id}/`, copiedObj.imageVideoArr);
      
      
      // --------------------------------------------------
      //   hardwarePlaying
      // --------------------------------------------------
      
      copiedObj.hardwarePlayingArr = [];
      
      for (let value of valueObj.hardwarePlayingObj.valueArr) {
        
        const obj = valueObj.hardwaresArr.find((value2) => {
          return value2.hardwareID === value;
        });
        
        if (obj && 'name' in obj) {
          copiedObj.hardwarePlayingArr.push({
            name: obj.name
          });
        }
        
      }
      
      
      // --------------------------------------------------
      //   Follow の処理
      // --------------------------------------------------
      
      copiedObj.usersObj.follow = false;
      copiedObj.usersObj.followed = false;
      
      if (usersLogin_id) {
        
        if (copiedObj.users_id !== usersLogin_id) {
          
          if (copiedObj.usersObj.followArr.includes(usersLogin_id)) {
            copiedObj.usersObj.follow = true;
          }
          
          if (copiedObj.usersObj.followedArr.includes(usersLogin_id)) {
            copiedObj.usersObj.followed = true;
          }
          
        }
        
      }
      
      
      // --------------------------------------------------
      //   ID
      // --------------------------------------------------
      
      copiedObj.idArr = [];
      
      for (let tempObj of valueObj.idArr) {
        
        if (
          tempObj.showType === 1 ||
          tempObj.showType === 2 && copiedObj.usersObj.followed ||
          tempObj.showType === 3 && copiedObj.usersObj.follow ||
          tempObj.showType === 4 && copiedObj.usersObj.follow && copiedObj.usersObj.followed ||
          tempObj.showType === 5 && copiedObj.users_id === usersLogin_id
        ) {
          copiedObj.idArr.push({
            type: tempObj.type,
            label: tempObj.label,
            value: tempObj.value
          });
        }
        
      }
      
      
      // --------------------------------------------------
      //   プレイヤーカードからの引用
      // --------------------------------------------------
      
      if (valueObj.quotationObj.activityTime) {
        copiedObj.activityTimeObj = valueObj.cardPlayersObj.activityTimeObj;
      }
      
      if (valueObj.quotationObj.lookingForFriends) {
        copiedObj.lookingForFriendsObj = valueObj.cardPlayersObj.lookingForFriendsObj;
      }
      
      if (valueObj.quotationObj.voiceChat) {
        copiedObj.voiceChatObj = valueObj.cardPlayersObj.voiceChatObj;
      }
      
      if (valueObj.quotationObj.link) {
        copiedObj.linkArr = valueObj.cardPlayersObj.linkArr;
      }
      
      
      // --------------------------------------------------
      //   不要な項目を削除する
      // --------------------------------------------------
      
      delete copiedObj._id;
      delete copiedObj.imageVideoArr;
      delete copiedObj.usersObj.followArr;
      delete copiedObj.usersObj.followedArr;
      delete copiedObj.hardwarePlayingObj;
      delete copiedObj.hardwaresArr;
      delete copiedObj.quotationObj;
      delete copiedObj.cardPlayersObj;
      
      
      returnObj[valueObj._id] = copiedObj;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   データの処理
    // --------------------------------------------------
    
    // for (let valueObj of cardGamesArr) {
      
      
    //   // --------------------------------------------------
    //   //   コピー
    //   // --------------------------------------------------
      
    //   const copiedObj = JSON.parse(JSON.stringify(valueObj));
      
      
    //   // --------------------------------------------------
    //   //   画像の処理
    //   // --------------------------------------------------
      
    //   copiedObj.imageArr = srcset(`/static/img/card/games/${valueObj._id}/`, copiedObj.imageVideoArr);
      
      
    //   // --------------------------------------------------
    //   //   Follow の処理
    //   // --------------------------------------------------
      
    //   if (usersLogin_id) {
        
    //     copiedObj.usersObj.followed = false;
        
    //     if (
    //       copiedObj.users_id !== usersLogin_id &&
    //       copiedObj.usersObj.followedArr.includes(usersLogin_id)
    //     ) {
    //       copiedObj.usersObj.followed = true;
    //     }
        
    //   }
      
      
    //   // --------------------------------------------------
    //   //   プレイヤーカードからの引用
    //   // --------------------------------------------------
      
    //   if (valueObj.quotationObj.activityTime) {
    //     copiedObj.activityTimeObj = valueObj.cardPlayersObj.activityTimeObj;
    //   }
      
    //   if (valueObj.quotationObj.lookingForFriends) {
    //     copiedObj.lookingForFriendsObj = valueObj.cardPlayersObj.lookingForFriendsObj;
    //   }
      
    //   if (valueObj.quotationObj.voiceChat) {
    //     copiedObj.voiceChatObj = valueObj.cardPlayersObj.voiceChatObj;
    //   }
      
    //   if (valueObj.quotationObj.link) {
    //     copiedObj.linkArr = valueObj.cardPlayersObj.linkArr;
    //   }
      
      
    //   // --------------------------------------------------
    //   //   不要な項目を削除する
    //   // --------------------------------------------------
      
    //   delete copiedObj.imageVideoArr;
    //   delete copiedObj.usersObj.followedArr;
    //   delete copiedObj.quotationObj;
    //   delete copiedObj.cardPlayersObj;
      
      
    //   returnObj[valueObj._id] = copiedObj;
      
    // }
    
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(`
    //   ----- cardGamesArr -----\n
    //   ${util.inspect(cardGamesArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
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
 * 挿入 / 更新する
 * @param {Object} argumentsObj - 引数
 * @return {Object} 
 */
const upsert = async (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    conditionObj,
    saveObj
    
  } = argumentsObj;
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Upsert
    // --------------------------------------------------
    
    const docArr = await Model.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: false, setDefaultsOnInsert: true }).exec();
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return docArr;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 挿入する
 * @param {Object} argumentsObj - 引数
 * @return {Array} 
 */
const insertMany = async (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    saveArr
    
  } = argumentsObj;
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   insertMany
    // --------------------------------------------------
    
    const docArr = await Model.insertMany(saveArr);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return docArr;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 削除する
 * @param {Object} argumentsObj - 引数
 * @return {Array} 
 */
const deleteMany = async (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    conditionObj
    
  } = argumentsObj;
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Remove
    // --------------------------------------------------
    
    const docArr = await Model.deleteMany(conditionObj);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return docArr;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  find,
  upsert,
  insertMany,
  deleteMany
};