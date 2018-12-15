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
const findTest = async (argumentsObj) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const {
    
    // localeObj,
    users_id,
    language,
    country,
    usersLogin_id
    
  } = argumentsObj;
  
  // const {
    
  //   language,
  //   counrty,
  //   languageArr,
  //   countryArr
    
  // } = localeObj;
  
  
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
          // __v: 0,
          // createdDate: 0,
          // language: 0,
          // _id: 0,
          updatedDate: 1,
          users_id: 1,
          name: 1,
          status: 1,
          thumbnail: 1,
          imageVideoArr: 1,
          comment: 1,
          birthdayObj: { value: 1, alternativeText: 1 },
          sexObj: { value: 1, alternativeText: 1 },
          addressObj: { value: 1, alternativeText: 1 },
          gamingExperienceObj: { value: 1, alternativeText: 1 },
          hobbiesArr: '$hobbiesObj.valueArr',
          specialSkillsArr: '$specialSkillsObj.valueArr',
          smartphoneObj: { model: 1, comment: 1 },
          tabletObj: { model: 1, comment: 1 },
          pcObj: { model: 1, comment: 1, specsObj: 1 },
          hardwareActiveArr: '$hardwareActiveObj.valueArr',
          hardwareInactiveArr: '$hardwareInactiveObj.valueArr',
          idArr: 1,
          activityTimeArr: '$activityTimeObj.valueArr',
          lookingForFriendsObj: { icon: 1, comment: 1 },
          voiceChat: '$voiceChatObj.comment',
          linkArr: 1,
          usersObj: 1,
          hardwaresArr: 1,
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
    
    // for (let valueObj of cardPlayersArr) {
      
      
    //   // --------------------------------------------------
    //   //   コピー
    //   // --------------------------------------------------
      
    //   const copiedObj = JSON.parse(JSON.stringify(valueObj));
      
      
    //   // --------------------------------------------------
    //   //   画像の処理
    //   // --------------------------------------------------
      
    //   copiedObj.imageArr = srcset(`/static/img/card/players/${valueObj._id}/`, copiedObj.imageVideoArr);
      
      
    //   // --------------------------------------------------
    //   //   hardwareActive
    //   // --------------------------------------------------
      
    //   copiedObj.hardwareActiveArr = [];
      
    //   for (let value of valueObj.hardwareActiveObj.valueArr) {
        
    //     // console.log(value);
        
    //     const obj = valueObj.hardwaresArr.find((value2) => {
    //       return value2.hardwareID === value;
    //     });
        
    //     // console.log(`
    //     //   ----- obj -----\n
    //     //   ${util.inspect(obj, { colors: true, depth: null })}\n
    //     //   --------------------\n
    //     // `);
        
    //     if (obj && 'name' in obj) {
    //       copiedObj.hardwareActiveArr.push({
    //         name: obj.name
    //       });
    //       // copiedObj.hardwareActiveArr.push(obj.name);
    //     }
        
    //   }
      
      
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
    //   console.log(`valueObj._id = ${valueObj._id}`);
      
    //   // --------------------------------------------------
    //   //   不要な項目を削除する
    //   // --------------------------------------------------
      
    //   delete copiedObj.imageVideoArr;
    //   delete copiedObj.usersObj.followedArr;
    //   // delete copiedObj.cardPlayersObj;
      
      
    //   returnObj[valueObj._id] = copiedObj;
      
    // }
    
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    console.log(`
      ----- cardPlayersArr -----\n
      ${util.inspect(cardPlayersArr, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
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
 * 取得する
 * @param {Object} argumentsObj - 引数
 * @return {Object} 取得データ
 */
const find = async (argumentsObj) => {
  
  
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
  findTest,
  find,
  upsert,
  insertMany,
  deleteMany
};