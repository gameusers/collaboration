// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const Model = require('./schema');
const ModelIDs = require('../ids/model');


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
const findForCardPlayer = async (argumentsObj) => {
  
  
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
    //   Card Players のデータを取得
    // --------------------------------------------------
    
    let resultCardPlayersArr = await Model.aggregate([
      
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
                  playerID: 1,
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
      
      
      {
        $project: {
          __v: 0,
          createdDate: 0,
          language: 0,
          nameObj: { search: 0 },
          statusObj: { search: 0 },
          commentObj: { search: 0 },
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
        }
      },
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   ID データをまとめて取得
    // --------------------------------------------------
    
    let ids_idArr = [];
    
    for (let valueObj of resultCardPlayersArr.values()) {
      ids_idArr = ids_idArr.concat(valueObj.idArr);
    }
    
    const resultIDsObj = await ModelIDs.findForCardPlayer({
      language,
      country,
      usersLogin_id,
      arr: ids_idArr,
    });
    
    
    
    
    // --------------------------------------------------
    //   フォーマット
    // --------------------------------------------------
    
    returnObj = format({
      usersLogin_id,
      cardPlayersArr: resultCardPlayersArr,
      idsObj: resultIDsObj
    });
    
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(`
    //   ----- resultCardPlayersArr -----\n
    //   ${util.inspect(resultCardPlayersArr, { colors: true, depth: null })}\n
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
    
    let resultCardPlayersArr = await Model.aggregate([
      
      {
        $match : { _id }
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
                  playerID: 1,
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
        }
      },
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   ID データをまとめて取得
    // --------------------------------------------------
    
    let ids_idArr = [];
    
    for (let valueObj of resultCardPlayersArr.values()) {
      ids_idArr = ids_idArr.concat(valueObj.idArr);
    }
    
    const resultIDsObj = await ModelIDs.findForCardPlayer({
      language,
      country,
      usersLogin_id,
      arr: ids_idArr,
    });
    
    // console.log(`
    //   ----- resultCardPlayersArr -----\n
    //   ${util.inspect(resultCardPlayersArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   カードデータのフォーマット
    // --------------------------------------------------
    
    returnObj = format({
      usersLogin_id,
      cardPlayersArr: resultCardPlayersArr,
      idsObj: resultIDsObj
    });
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(`
    //   ----- resultCardPlayersArr -----\n
    //   ${util.inspect(resultCardPlayersArr, { colors: true, depth: null })}\n
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
const findOneBy_idForEditForm = async (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    _id,
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
    
    let resultCardPlayersArr = await Model.aggregate([
      
      {
        $match:
          {
            _id,
            users_id: usersLogin_id
          }
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
      //   $project: {
      //     __v: 0,
      //     createdDate: 0,
      //     language: 0,
      //     birthdayObj: { search: 0 },
      //     sexObj: { search: 0 },
      //     addressObj: { search: 0 },
      //     gamingExperienceObj: { search: 0 },
      //     hobbiesObj: { search: 0 },
      //     specialSkillsObj: { search: 0 },
      //     smartphoneObj: { search: 0 },
      //     tabletObj: { search: 0 },
      //     pcObj: { search: 0 },
      //     hardwareActiveObj: { search: 0 },
      //     hardwareInactiveObj: { search: 0 },
      //     activityTimeObj: { search: 0 },
      //     'activityTimeObj.valueArr': { _id: 0 },
      //     lookingForFriendsObj: { search: 0 },
      //     voiceChatObj: { search: 0 },
      //     idArr: { _id: 0, search: 0 },
      //     linkArr: { _id: 0, search: 0 },
      //   }
      // },
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   ID データをまとめて取得
    // --------------------------------------------------
    
    let ids_idArr = [];
    
    for (let valueObj of resultCardPlayersArr.values()) {
      ids_idArr = ids_idArr.concat(valueObj.idArr);
    }
    
    const resultIDsObj = await ModelIDs.findForCardPlayer({
      language,
      country,
      usersLogin_id,
      arr: ids_idArr,
    });
    
    
    
    
    // --------------------------------------------------
    //   カードデータのフォーマット
    // --------------------------------------------------
    
    returnObj = formatForEditForm({
      cardPlayersArr: resultCardPlayersArr,
      idsObj: resultIDsObj
    });
    
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(`
    //   ----- resultCardPlayersArr -----\n
    //   ${util.inspect(resultCardPlayersArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- resultIDsObj -----\n
    //   ${util.inspect(resultIDsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj['zaoOWw89g'].idArr -----\n
    //   ${util.inspect(returnObj['zaoOWw89g'].idArr, { colors: true, depth: null })}\n
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
    
    usersLogin_id,
    cardPlayersArr,
    idsObj
    
  } = argumentsObj;
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Loop
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
    
    for (let value of valueObj.idArr) {
      
      if (value in idsObj) {
        copiedObj.idArr.push(idsObj[value]);
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
  //   Return
  // --------------------------------------------------
  
  return returnObj;
  
  
};




/**
 * DBから取得したカード情報をフォーマットする　編集フォーム用
 * @param {Object} argumentsObj - 引数
 * @return {Object} フォーマット後のデータ
 */
const formatForEditForm = (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    cardPlayersArr,
    idsObj
    
  } = argumentsObj;
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Loop
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
          hardwareID: value,
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
          hardwareID: value,
          name: obj.name
        });
      }
      
    }
    
    
    // --------------------------------------------------
    //   ID
    // --------------------------------------------------
    
    copiedObj.idArr = [];
    
    for (let value of valueObj.idArr) {
      
      if (value in idsObj) {
        copiedObj.idArr.push(idsObj[value]);
      }
      
    }
    
    
    // --------------------------------------------------
    //   不要な項目を削除する
    // --------------------------------------------------
    
    delete copiedObj._id;
    delete copiedObj.imageVideoArr;
    delete copiedObj.hardwaresArr;
    
    
    returnObj[valueObj._id] = copiedObj;
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return returnObj;
  
  
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
  findForCardPlayer,
  findOneBy_id,
  findOneBy_idForEditForm,
  upsert,
  insertMany,
  deleteMany
};