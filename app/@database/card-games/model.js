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
// const ModelGames = require('../games/schema');
// const ModelCardPlayers = require('../card-players/schema');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatImagesAndVideosArr } = require('../../@format/image');




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
    loginUsers_id
    
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
                  userID: 1,
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
            let: { cardGamesGameCommunities_id: '$gameCommunities_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$gameCommunities_id', '$$cardGamesGameCommunities_id'] },
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                    ]
                  }
                }
              },
              { $project:
                {
                  _id: 1,
                  gameCommunities_id: 1,
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
          nameObj: { search: 0 },
          statusObj: { search: 0 },
          commentObj: { search: 0 },
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
    ]).exec();
    
    
    
    // --------------------------------------------------
    //   カードデータのフォーマット
    // --------------------------------------------------
    
    returnObj = format({
      arr: cardGamesArr,
      loginUsers_id
    });
    
    
    
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
 * _id で検索して取得する
 * @param {Object} argumentsObj - 引数
 * @return {Object} 取得データ
 */
const findOneBy_id = async (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    _id,
    language,
    country,
    loginUsers_id
    
  } = argumentsObj;
  
  console.log(chalk`
    _id: {green ${_id}}
    language: {green ${language}}
    country: {green ${country}}
    loginUsers_id: {green ${loginUsers_id}}
  `);
  
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
        $match : { _id }
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
                  userID: 1,
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
            let: { cardGamesGameCommunities_id: '$gameCommunities_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$gameCommunities_id', '$$cardGamesGameCommunities_id'] },
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                    ]
                  }
                }
              },
              { $project:
                {
                  _id: 1,
                  gameCommunities_id: 1,
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
    ]).exec();
    
    
    
    // --------------------------------------------------
    //   カードデータのフォーマット
    // --------------------------------------------------
    
    returnObj = format({
      arr: cardGamesArr,
      loginUsers_id
    });
    
    
    
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
 * DBから取得したカード情報をフォーマットする
 * @param {Object} argumentsObj - 引数
 * @return {Object} フォーマット後のデータ
 */
const format = (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    arr,
    loginUsers_id
    
  } = argumentsObj;
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Loop
  // --------------------------------------------------
  
  for (let valueObj of arr) {
      
      
    // --------------------------------------------------
    //   コピー
    // --------------------------------------------------
    
    const copiedObj = JSON.parse(JSON.stringify(valueObj));
    
    
    // --------------------------------------------------
    //   画像の処理
    // --------------------------------------------------
    
    copiedObj.imagesArr = formatImagesAndVideosArr({ arr: copiedObj.imageVideoArr });
    // copiedObj.imageArr = srcset(`/img/card/games/${valueObj._id}/`, copiedObj.imageVideoArr);
    
    
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
    
    if (loginUsers_id) {
      
      if (copiedObj.users_id !== loginUsers_id) {
        
        if (copiedObj.usersObj.followArr.includes(loginUsers_id)) {
          copiedObj.usersObj.follow = true;
        }
        
        if (copiedObj.usersObj.followedArr.includes(loginUsers_id)) {
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
        tempObj.publicSetting === 1 ||
        tempObj.publicSetting === 2 && copiedObj.usersObj.followed ||
        tempObj.publicSetting === 3 && copiedObj.usersObj.follow ||
        tempObj.publicSetting === 4 && copiedObj.usersObj.follow && copiedObj.usersObj.followed ||
        tempObj.publicSetting === 5 && copiedObj.users_id === loginUsers_id
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
  //   Return
  // --------------------------------------------------
  
  return returnObj;
  
  
};




/**
 * 取得する
 * @param {Object} conditionObj - 検索条件
 * @return {Array} 取得データ
 */
// const find = async ({ conditionObj }) => {
  
  
//   // --------------------------------------------------
//   //   Database
//   // --------------------------------------------------
  
//   try {
    
    
//     // --------------------------------------------------
//     //   Find
//     // --------------------------------------------------
    
//     return await Model.find(conditionObj).exec();
    
    
//   } catch (err) {
    
//     throw err;
    
//   }
  
// };




/**
 * カウントを取得する
 * @param {Object} conditionObj - 検索条件
 * @return {number} カウント数
 */
const count = async ({ conditionObj }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    return await Model.countDocuments(conditionObj).exec();
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 挿入 / 更新する
 * @param {Object} argumentsObj - 引数
 * @return {Array} 
 */
const upsert = async ({ conditionObj, saveObj }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Upsert
    // --------------------------------------------------
    
    return await Model.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 挿入する
 * @param {Object} argumentsObj - 引数
 * @return {Array} 
 */
const insertMany = async ({ saveArr }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   insertMany
    // --------------------------------------------------
    
    return await Model.insertMany(saveArr);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 削除する
 * @param {Object} conditionObj - 検索条件
 * @return {Array} 
 */
const deleteMany = async ({ conditionObj }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Delete
    // --------------------------------------------------
    
    return await Model.deleteMany(conditionObj);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  find,
  findOneBy_id,
  upsert,
  insertMany,
  deleteMany
};