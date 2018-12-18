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

// const shortid = require('shortid');
// const moment = require('moment');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const Model = require('./schema');


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
    //   Aggregate
    // --------------------------------------------------
    
    let cardPlayersArr = await Model.aggregate([
      
      {
        $match : { users_id }
      },
      
      
      {
        $lookup:
          {
            from: 'users',
            let: { cardPlayersUsers_id: '$users_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$cardPlayersUsers_id'] },
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
            from: 'hardwares',
            let: {
              cardPlayersHardwareActiveArr: '$hardwareActiveObj.valueArr',
              cardPlayersHardwareInactiveArr: '$hardwareInactiveObj.valueArr'
            },
            pipeline: [
              { $match:
                { $expr:
                  { $or:
                    [
                      { $and:
                        [
                          { $eq: ['$language', language] },
                          { $eq: ['$country', country] },
                          { $in: ['$hardwareID', '$$cardPlayersHardwareActiveArr'] }
                        ]
                      },
                      { $and:
                        [
                          { $eq: ['$language', language] },
                          { $eq: ['$country', country] },
                          { $in: ['$hardwareID', '$$cardPlayersHardwareInactiveArr'] }
                        ]
                      }
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
      // {
      //   $unwind: '$hardwaresObj'
      // },
     
      
      
      {
        $project: {
          __v: 0,
          createdDate: 0,
          language: 0,
          birthdayObj: { search: 0 },
          sexObj: { search: 0 },
          addressObj: { search: 0 },
          gamingExperienceObj: { search: 0 },
          hobbiesObj: { search: 0 },
          specialSkillsObj: { search: 0 },
          smartphoneObj: { search: 0 },
          tabletObj: { search: 0 },
          pcObj: { search: 0 },
          hardwareActiveObj: { search: 0 },
          hardwareInactiveObj: { search: 0 },
          activityTimeObj: { search: 0 },
          'activityTimeObj.valueArr': { _id: 0 },
          lookingForFriendsObj: { search: 0 },
          voiceChatObj: { search: 0 },
          idArr: { _id: 0, search: 0 },
          linkArr: { _id: 0, search: 0 },
          
          
          
          // updatedDate: 1,
          // users_id: 1,
          // name: 1,
          // status: 1,
          // thumbnail: 1,
          // imageVideoArr: 1,
          // comment: 1,
          // birthdayObj: { value: 1, alternativeText: 1 },
          // sexObj: { value: 1, alternativeText: 1 },
          // addressObj: { value: 1, alternativeText: 1 },
          // gamingExperienceObj: { value: 1, alternativeText: 1 },
          // hobbiesArr: '$hobbiesObj.valueArr',
          // specialSkillsArr: '$specialSkillsObj.valueArr',
          // smartphoneObj: { model: 1, comment: 1 },
          // tabletObj: { model: 1, comment: 1 },
          // pcObj: { model: 1, comment: 1, specsObj: 1 },
          // hardwareActiveArr: '$hardwareActiveObj.valueArr',
          // hardwareInactiveArr: '$hardwareInactiveObj.valueArr',
          // idArr: 1,
          // activityTimeArr: '$activityTimeObj.valueArr',
          // lookingForFriendsObj: { icon: 1, comment: 1 },
          // voiceChat: '$voiceChatObj.comment',
          // linkArr: 1,
          // usersObj: 1,
          // hardwaresArr: 1,
        }
      },
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   Return Value
    // --------------------------------------------------
    
    // let returnObj = {};
    
    
    // --------------------------------------------------
    //   データの処理
    // --------------------------------------------------
    
    for (let valueObj of cardPlayersArr) {
      
      
      // --------------------------------------------------
      //   コピー
      // --------------------------------------------------
      
      const copiedObj = JSON.parse(JSON.stringify(valueObj));
      
      
      // --------------------------------------------------
      //   画像の処理
      // --------------------------------------------------
      
      copiedObj.imageArr = srcset(`/static/img/card/players/${valueObj._id}/`, copiedObj.imageVideoArr);
      
      
      // --------------------------------------------------
      //   hardwareActive
      // --------------------------------------------------
      
      copiedObj.hardwareActiveArr = [];
      
      for (let value of valueObj.hardwareActiveObj.valueArr) {
        
        const obj = valueObj.hardwaresArr.find((value2) => {
          return value2.hardwareID === value;
        });
        
        if (obj && 'name' in obj) {
          copiedObj.hardwareActiveArr.push({
            name: obj.name
          });
        }
        
      }
      
      
      // --------------------------------------------------
      //   hardwareInactive
      // --------------------------------------------------
      
      copiedObj.hardwareInactiveArr = [];
      
      for (let value of valueObj.hardwareInactiveObj.valueArr) {
        
        const obj = valueObj.hardwaresArr.find((value2) => {
          return value2.hardwareID === value;
        });
        
        if (obj && 'name' in obj) {
          copiedObj.hardwareInactiveArr.push({
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
      //   不要な項目を削除する
      // --------------------------------------------------
      
      delete copiedObj._id;
      delete copiedObj.imageVideoArr;
      delete copiedObj.usersObj.followArr;
      delete copiedObj.usersObj.followedArr;
      delete copiedObj.hardwareActiveObj;
      delete copiedObj.hardwareInactiveObj;
      delete copiedObj.hardwaresArr;
      
      
      returnObj[valueObj._id] = copiedObj;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(`
    //   ----- cardPlayersArr -----\n
    //   ${util.inspect(cardPlayersArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    console.log(`
      ----- returnObj -----\n
      ${util.inspect(returnObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    
    
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
 * @param {Object} argumentsObj - 引数
 * @return {Object} 取得データ
 */
const find2 = async (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
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
    
    const docArr = await Model.find(conditionObj).exec();
    
    // const docArr = await Model.find(conditionObj).select(
    //   '_id updatedDate users_id name status thumbnail imageVideoArr dataArr'
    // ).exec();
    
    
    // --------------------------------------------------
    //   画像配列を<img>タグで出力するためにフォーマット
    // --------------------------------------------------
    
    for (let valueObj of docArr.values()) {
      
      
      // --------------------------------------------------
      //   コピー
      // --------------------------------------------------
      
      const copiedObj = JSON.parse(JSON.stringify(valueObj));
      
      
      // --------------------------------------------------
      //   画像の処理
      // --------------------------------------------------
      
      copiedObj.imageArr = srcset(`/static/img/card/players/${valueObj._id}/`, copiedObj.imageVideoArr);
      
      
      // --------------------------------------------------
      //   不要な項目を削除する
      // --------------------------------------------------
      
      delete copiedObj.imageVideoArr;
      
      
      // --------------------------------------------------
      //   Return Value 設定
      // --------------------------------------------------
      
      returnObj[valueObj._id] = copiedObj;
      
    }
    
    
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
  // findTest,
  find,
  upsert,
  insertMany,
  deleteMany
};