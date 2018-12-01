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


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { srcset } = require('../../@format/image');


// ---------------------------------------------
//   Logger
// ---------------------------------------------

const logger = require('../../@modules/logger');




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * 取得する
 * @param {array} userIdArr - User IDの入った配列 [8OM0dhDak, Wk_nHYW0q, oXiNOYRax]
 * @return {object} 取得されたデータ
 */
const find = async (userIdArr) => {
  // console.log(`
  //     userIdArr: \n${util.inspect(userIdArr, { colors: true, depth: null })}
  //   `);
  
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
    
    const condition = { userId: { $in: userIdArr} };
    const docArr = await Model.find(condition).exec();
    
    // console.log(`
    //   docArr: \n${util.inspect(docArr, { colors: true, depth: null })}
    // `);
    
    
    // --------------------------------------------------
    //   画像配列を<img>タグで出力するためにフォーマット
    // --------------------------------------------------
    
    for (let value of docArr.values()) {
      
      const copiedObj = JSON.parse(JSON.stringify(value));
      
      copiedObj.imageArr = srcset('/static/img/card/player/', copiedObj.imageVideoArr);
      delete copiedObj.imageVideoArr;
      
      returnObj[value._id] = copiedObj;
      
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




/**
 * 挿入 / 更新する
 * @param {string} cardGames_id - ID
 * @return {string} 暗号化されたテキスト
 */
// const upsert = async (users_id, cardGames_id) => {
  
  
//   // --------------------------------------------------
//   //   Return Value
//   // --------------------------------------------------
  
//   let returnObj = {};
  
  
//   // --------------------------------------------------
//   //   Database
//   // --------------------------------------------------
  
//   try {
    
    
//     const saveObj = {
//       users_id,
//       updatedDate: moment().utcOffset(0),
//       games_id: 'MKIXnjIzM',
//       theme: '',
//       comment: `楽しかった時間が終わってしまいました。
// いいゲームをプレイしたときの独特の余韻を味わえました。
// 今までゼルダの伝説でこんなに余韻が残ることはなかったのですが
// やり遂げた嬉しさに少しの寂しさが混じったような、ビターな味わいです。

// 今作はかなりの高評価を受けていて
// それは任天堂ファンボーイが騒いでるだけだと思っていたのですが
// 実際やってみるとその評価に違わない面白さでした。
// オープンワールド童貞だった任天堂なのに
// このクオリティのものをいきなり作れるのは正直すごいと思いましたね。
// 僕の場合、オープンワールドゲームはやり込みすぎて
// いつも最後は嫌になってクリアする感じなのですが
// BotWはラストも楽しめて良かったです（まさか最後にシロと一緒に戦えるなんて！）`,
//       imageVideoArr: [
//         {
//           _id: 'H_NXaMPKG',
//           type: 'image',
//           caption: 'ライオン',
//           fileFormat: 'JPEG',
//           srcSetArr: [
//             {
//               _id: 'xz_HamTMS',
//               w: '320w',
//               width: 320,
//               height: 180,
//             },
//             {
//               _id: 'VGaeXottk',
//               w: '480w',
//               width: 480,
//               height: 270,
//             },
//             {
//               _id: 'E3kjgGmJ7',
//               w: '640w',
//               width: 640,
//               height: 360,
//             },
//             {
//               _id: 'JHgN0IFXD',
//               w: '800w',
//               width: 800,
//               height: 450,
//             },
//             {
//               _id: 'XMZ2Ioh2x',
//               w: 'source',
//               width: 1920,
//               height: 1080,
//             },
//           ],
//         },
//       ],
//       playingHardwareObj: {
//         valueArr: ['PC', 'PS4', 'Xbox One', 'Switch', 'Wii', '3DS', 'Android', 'iOS'],
//         search: true,
//       },
//       itemArr: [],
//       idArr: [
//         {
//           _id: '9_-NXN6rQ',
//           quotation_id: '',
//           type: 'playstation',
//           label: '',
//           value: 'AZ-1979-Game',
//           showType: 1,
//           search: true,
//           // 1.表示する
//           // 2.自分をフォローしているユーザーに表示する
//           // 3.自分がフォローしているユーザーに表示する
//           // 4.相互フォローで表示する
//           // 5.表示しない
//         },
//         {
//           _id: '-9hC-izPG',
//           quotation_id: '',
//           type: 'xbox',// ゲーマータグ
//           label: '',
//           value: 'AZ-1979-Xbox-Game',
//           showType: 1,
//           search: true,
//         },
//         {
//           _id: 'QbkY_-AjW',
//           quotation_id: 'VY9aFMoVh',
//           type: 'other',
//           label: '',
//           value: '',
//           showType: 5,
//           search: true,
//         },
//         {
//           _id: 'qMsL_dgHW',
//           quotation_id: '',
//           type: 'steam',
//           label: '',
//           value: 'Azumi1979',
//           showType: 1,
//           search: true,
//         },
//         {
//           _id: 'quLSl_A90',
//           quotation_id: '',
//           type: 'other',
//           label: 'LoL ID',
//           value: 'lol-id',
//           showType: 1,
//           search: true,
//         },
//         {
//           _id: '19bLgUTWU',
//           quotation_id: '',
//           type: 'other',
//           label: 'LoL ID',
//           value: 'lol-id',
//           showType: 1,
//           search: true,
//         }
//       ],
//       activityTimeObj: {
//         quotation: true,
//         valueArr: [
//           {
//             _id: '0X3yH-BnG',
//             beginTime: '19:00',
//             endTime: '24:00',
//             weekArr: [0, 1, 2, 3, 4]
//           },
//           {
//             _id: '7Euewb_Ik',
//             beginTime: '9:00',
//             endTime: '24:00',
//             weekArr: [5, 6]
//           }
//         ],
//         search: true,
//       },
//       lookingForFriendsObj: {
//         quotation: true,
//         value: true,
//         icon: 'emoji_u1f61c',
//         comment: '社会人の方よろしく！',
//         search: true,
//       },
//       voiceChatObj: {
//         quotation: true,
//         value: true,
//         comment: '夜21時まで',
//         search: true,
//       },
//       linkArr: [
//         {
//           _id: 'K2NRYVCox',
//           quotation_id: '',
//           type: 'twitter',
//           label: '',
//           url: 'https://twitter.com/Azumi1979',
//           search: true,
//         },
//         {
//           _id: '0syPuDv6O',
//           quotation_id: '',
//           type: 'facebook',
//           label: '',
//           url: 'https://www.youtube.com/',
//           search: true,
//         },
//         {
//           _id: 'STJa3TLJX',
//           quotation_id: 'IqNtEQQsO',
//           type: 'quotation',
//           label: '',
//           url: '',
//           search: true,
//         },
//         {
//           _id: 'spRqODqbz',
//           type: 'other',
//           label: '開発サイト',
//           url: 'http://35.203.143.160:8080/',
//           search: true,
//         },
//       ]
//     };
    
    
//     // --------------------------------------------------
//     //   Upsert
//     // --------------------------------------------------
    
//     const conditionObj = { _id: cardGames_id || shortid.generate() };
//     const docArr = await Model.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: false, setDefaultsOnInsert: true }).exec();
    
    
//     // console.log(`
//     //   docArr: \n${util.inspect(docArr, { colors: true, depth: null })}
//     // `);
    
    
//     // --------------------------------------------------
//     //   Return
//     // --------------------------------------------------
    
//     return returnObj;
    
    
//   } catch (err) {
    
//     throw err;
    
//   }
  
  
// };





// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  find,
  upsert
};