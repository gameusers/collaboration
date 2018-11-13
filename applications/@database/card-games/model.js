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
 * 挿入/更新する
 * @param {string} cardGames_id - ID
 * @return {string} 暗号化されたテキスト
 */
const upsert = async (userId, cardGames_id) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    const saveObj = {
      userId,
      updatedDate: moment().utcOffset(0),
      theme: '',
      comment: `楽しかった時間が終わってしまいました。
いいゲームをプレイしたときの独特の余韻を味わえました。
今までゼルダの伝説でこんなに余韻が残ることはなかったのですが
やり遂げた嬉しさに少しの寂しさが混じったような、ビターな味わいです。

今作はかなりの高評価を受けていて
それは任天堂ファンボーイが騒いでるだけだと思っていたのですが
実際やってみるとその評価に違わない面白さでした。
オープンワールド童貞だった任天堂なのに
このクオリティのものをいきなり作れるのは正直すごいと思いましたね。
僕の場合、オープンワールドゲームはやり込みすぎて
いつも最後は嫌になってクリアする感じなのですが
BotWはラストも楽しめて良かったです（まさか最後にシロと一緒に戦えるなんて！）`,
      imageVideoArr: [
        {
          _id: 'H_NXaMPKG',
          type: 'image',
          caption: 'ライオン',
          fileFormat: 'JPEG',
          srcSetArr: [
            {
              w: '320w',
              width: 320,
              height: 180,
            },
            {
              w: '480w',
              width: 480,
              height: 270,
            },
            {
              w: '640w',
              width: 640,
              height: 360,
            },
            {
              w: '800w',
              width: 800,
              height: 450,
            },
            {
              w: 'source',
              width: 1920,
              height: 1080,
            },
          ],
        },
      ],
      playingHardwareObj: {
        valueArr: ['PC', 'PS4', 'Xbox One', 'Switch', 'Wii', '3DS', 'Android', 'iOS'],
        search: true,
      },
      itemArr: [],
      idArr: [
        {
          type: 'playstation',
          label: '',
          value: 'AZ-1979',
          showType: 1,
          search: true,
          // 1.表示する
          // 2.自分をフォローしているユーザーに表示する
          // 3.自分がフォローしているユーザーに表示する
          // 4.相互フォローで表示する
          // 5.表示しない
        },
        {
          type: 'xbox',// ゲーマータグ
          label: '',
          value: 'AZ-1979-Xbox',
          showType: 1,
          search: true,
        },
        {
          type: 'nintendo',// フレンドコード
          label: '',
          value: 'AZ-1979',
          showType: 1,
          search: true,
        },
        {
          type: 'steam',
          label: '',
          value: 'Azumi1979',
          showType: 1,
          search: true,
        },
        {
          type: 'other',
          label: 'LoL ID',
          value: 'lol-id',
          showType: 1,
          search: true,
        },
        {
          type: 'other',
          label: 'LoL ID',
          value: 'lol-id',
          showType: 1,
          search: true,
        }
      ],
      activityTimeObj: {
        valueArr: [
          {
            beginTime: '19:00',
            endTime: '24:00',
            weekArr: [0, 1, 2, 3, 4]
          },
          {
            beginTime: '9:00',
            endTime: '24:00',
            weekArr: [5, 6]
          }
        ],
        search: true,
      },
      lookingForFriendsObj: {
        value: true,
        icon: 'emoji_u1f61c',
        comment: '社会人の方よろしく！',
        search: true,
      },
      voiceChatObj: {
        value: true,
        comment: '夜21時まで',
        search: true,
      },
    };
    
    
    // --------------------------------------------------
    //   Upsert
    // --------------------------------------------------
    
    const conditionObj = { _id: cardGames_id || shortid.generate() };
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
  find,
  upsert
};