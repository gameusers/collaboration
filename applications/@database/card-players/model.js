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
    
    
    // --------------------------------------------------
    //   画像配列を<img>タグで出力するためにフォーマット
    // --------------------------------------------------
    
    for (let value of docArr.values()) {
      
      const copiedObj = JSON.parse(JSON.stringify(value));
      
      copiedObj.imageArr = srcset(`/static/img/card/players/${value._id}/`, copiedObj.imageVideoArr);
      delete copiedObj.imageVideoArr;
      
      returnObj[value.users_id] = copiedObj;
      
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
 * @param {string} cardPlayers_id - ID
 * @return {string} 
 */
// const upsert = async (users_id, cardPlayers_id) => {
  
  
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
//       comment: `Next.js を試してみたところ、とても優秀だったので採用することに決めました。サーバーサイドレンダリングの機能や、Code Splitting をデフォルトで行ってくれるのは非常に便利です。ただすべての機能を提供してくれるわけではないので、結局、自分で Express を利用したサーバー用コードを書かないといけない部分も多くあるのですが。
  
//   それと Next.js はデータベースへのアクセスをすべて API で行うことを推奨しているようです。そこそこの規模のサイトになると、そういった構成が増えてくるのかもしれないのですが、自分は小規模なサイトしか作ったことがないので、初めての経験でちょっと不安です。`,
//       imageVideoArr: [
//         {
//           _id: 'H_NXaMPKG',
//           type: 'image',
//           caption: 'ライオン',
//           fileFormat: 'JPEG',
//           srcSetArr: [
//             {
//               _id: 'himsYqtCL',
//               w: '320w',
//               width: 320,
//               height: 180,
//             },
//             {
//               _id: 'Cfjt2j3Y_',
//               w: '480w',
//               width: 480,
//               height: 270,
//             },
//             {
//               _id: 'EjUz0NL8z',
//               w: '640w',
//               width: 640,
//               height: 360,
//             },
//             {
//               _id: 'g9u6JQkLh',
//               w: '800w',
//               width: 800,
//               height: 450,
//             },
//             {
//               _id: 'TsNkkGwok',
//               w: 'source',
//               width: 1920,
//               height: 1080,
//             },
//           ],
//         },
//       ],
//       birthdayObj: {
//         value: '2002-10-19T00:00:00Z',
//         alternativeText: '',
//         search: true,
//       },
//       sexObj: {
//         value: 'male',
//         alternativeText: '',
//         search: true,
//       },
//       addressObj: {
//         value: '大阪',
//         alternativeText: '',
//         search: true,
//       },
//       gamingExperienceObj: {
//         value: '2008-09-19T00:00:00Z',
//         alternativeText: '',
//         search: true,
//       },
//       hobbiesObj: {
//         valueArr: ['映画鑑賞', '料理', '海外旅行', 'ヴァイオリン演奏'],
//         search: true,
//       },
//       specialSkillsObj: {
//         valueArr: ['英語���話せる！'],
//         search: true,
//       },
//       smartphoneObj: {
//         model: 'g06',
//         comment: `月額無料でスマホを利用したい！ということで買った端末です。電話としては機能してるけど、これでゲームをやるのは難しそうです。`,
//         search: true,
//       },
//       tabletObj: {
//         model: 'Google Nexus 9 Wi-Fiモデル 32GB',
//         comment: `2015年に買ったタブレットなので最近はブラウザをチェックするだけでも重い…。2`,
//         search: true,
//       },
//       pcObj: {
//         model: '自作PC',
//         comment: `BTOで買ったPCが壊れそうになったので、ケースや光学ドライブなどを流用しながらパーツを新しくしました。HDからSSDに移行したときはその速さに驚きましたね！容量があまりないので大量にゲームをインストールできないのですが、高速なのでなんとかSSDでやりくりしていきたいです。
  
//   グラボを積んでいないのですが、Ryzen 3 2200Gの機能で昔のゲームや2Dゲームなら普通に動きます。比較的最近のゲームですが、ダーケストダンジョンもいけました。`,
//         specsObj: {
//           os: 'Windows 10 Home',
//           cpu: 'AMD CPU Ryzen 3 2200G',
//           cpuCooler: 'CPU 付属品',
//           motherboard: 'MSI B350 PC MATE',
//           memory: 'Crucial DDR4 8GB x 2',
//           storage: 'WD SSD 240GB / WD Green / WDS240G2G0A',
//           graphicsCard: '-',
//           opticalDrive: 'NEC AD7240S/BK',
//           powerSupply: 'Antec EARTHWATTS EA650 650W',
//           pcCase: 'COOLER MASTER CM690',
//           monitor: 'MITSUBISHI TFT RDT233WX / ASUS VZ239HR',
//           mouse: 'Logitech MX300',
//           keyboard: 'Microsoft Keyboard With Fingerprint Reader'
//         },
//         search: true,
//       },
//       ownedHardwareObj: {
//         valueArr: ['PC', 'PS4', 'Xbox One', 'Switch', 'Wii', '3DS', 'Android', 'iOS'],
//         search: true,
//       },
//       idArr: [
//         {
//           _id: 'au1gnYf6b',
//           type: 'playstation',
//           label: '',
//           value: 'AZ-1979',
//           showType: 1,
//           search: true,
//           // 1.表示する
//           // 2.自分をフォローしているユーザーに表示する
//           // 3.自分がフォローしているユーザーに表示する
//           // 4.相互フォローで表示する
//           // 5.表示しない
//         },
//         {
//           _id: 'OXNtQjxgF',
//           type: 'xbox',// ゲーマータグ
//           label: '',
//           value: 'AZ-1979-Xbox',
//           showType: 1,
//           search: true,
//         },
//         {
//           _id: 'VY9aFMoVh',
//           type: 'nintendo',// フレンドコード
//           label: '',
//           value: 'AZ-1979',
//           showType: 1,
//           search: true,
//         },
//         {
//           _id: 'BNJPgqtoR',
//           type: 'steam',
//           label: '',
//           value: 'Azumi1979',
//           showType: 1,
//           search: true,
//         },
//         {
//           _id: 'ndQgliRHK',
//           type: 'other',
//           label: 'LoL ID',
//           value: 'lol-id',
//           showType: 1,
//           search: true,
//         },
//         {
//           _id: 'pJxHh8ZaR',
//           type: 'other',
//           label: 'LoL ID',
//           value: 'lol-id',
//           showType: 1,
//           search: true,
//         }
//       ],
//       activityTimeObj: {
//         valueArr: [
//           {
//             _id: 'fkqjMZzff',
//             beginTime: '19:00',
//             endTime: '24:00',
//             weekArr: [0, 1, 2, 3, 4]
//           },
//           {
//             _id: 'J-ReJUaTK',
//             beginTime: '9:00',
//             endTime: '24:00',
//             weekArr: [5, 6]
//           }
//         ],
//         search: true,
//       },
//       lookingForFriendsObj: {
//         value: true,
//         icon: 'emoji_u1f61c',
//         comment: '社会人の方よろしく！',
//         search: true,
//       },
//       voiceChatObj: {
//         value: true,
//         comment: '夜21時まで',
//         search: true,
//       },
//       linkArr: [
//         {
//           _id: 'FbbgE5PTW',
//           type: 'twitter',
//           label: '',
//           url: 'https://twitter.com/Azumi1979',
//           search: true,
//         },
//         {
//           _id: 'VMp_Vlk_V',
//           type: 'facebook',
//           label: '',
//           url: 'https://www.youtube.com/',
//           search: true,
//         },
//         {
//           _id: 'IqNtEQQsO',
//           type: 'instagram',
//           label: '',
//           url: 'https://www.youtube.com/',
//           search: true,
//         },
//         {
//           _id: 'yBC3AHqrP',
//           type: 'youtube',
//           label: '',
//           url: 'https://gaming.youtube.com/channel/UCGmS-B707Sqa19BXRn02JIw/live',
//           search: true,
//         },
//         {
//           _id: 'YD8DHCvb_',
//           type: 'twitch',
//           label: '',
//           url: 'https://gaming.youtube.com/channel/UCGmS-B707Sqa19BXRn02JIw/live',
//           search: true,
//         },
//         {
//           _id: '8u2ht4NLv',
//           type: 'steam',
//           label: '',
//           url: 'https://steamcommunity.com/profiles/76561198031526480/',
//           search: true,
//         },
//         {
//           _id: 'lqNaKEL49',
//           type: 'pixiv',
//           label: '',
//           url: 'https://www.youtube.com/',
//           search: true,
//         },
//         {
//           _id: 'zcPp3XyEw',
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
    
//     const conditionObj = { _id: cardPlayers_id || shortid.generate() };
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