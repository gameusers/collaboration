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
//   Logger
// ---------------------------------------------

const logger = require('../../@modules/logger');




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * Player IDからUser IDを取得する / 1件だけ
 * @param {string} playerId - Player ID
 * @return {string} userId
 */
const findUserId = async (playerId) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  let userId = '';
  
  
  // --------------------------------------------------
  //   Find
  // --------------------------------------------------
  
  await Model.findOne({ playerId: playerId }, '_id', (err, docObj) => {
    
    if (err) {
      logger.log('error', `/applications/@database/users/model.js / findUserId / Error: ${err}`);
    } else if ('_id' in docObj) {
      userId = docObj._id;
    }
    
    // console.log(`
    //   docObj: \n${util.inspect(docObj, { colors: true, depth: null })}
    // `);
    
  });
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return userId;
  
  
};


/**
 * 取得する
 * @param {array} playerIdArr - Player IDの入った配列 [8OM0dhDak, Wk_nHYW0q, oXiNOYRax]
 * @return {object} 取得されたデータ
 */
const find = async (playerIdArr) => {
  
  
  // --------------------------------------------------
  //   Return Object
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Find
  // --------------------------------------------------
  
  await Model.find({ playerId: { $in: playerIdArr} }, (err, docObj) => {
    
    if (err) {
      logger.log('error', `/applications/@database/users/model.js / find / Error: ${err}`);
    } else {
      returnObj = docObj;
    }
    
  });
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return returnObj;
  
  
};



/**
 * 挿入/更新する
 * @param {string} cardPlayerId - ID
 * @return {string} 暗号化されたテキスト
 */
const upsert = async (userId, cardPlayerId) => {
  
  
  // --------------------------------------------------
  //   Model
  // --------------------------------------------------
  
  const _id = cardPlayerId ? cardPlayerId : shortid.generate();
  
  
  const updateObj = {
    // _id,
    userId,
    updatedDate: moment().utcOffset(0),
    comment: `Next.js を試してみたところ、とても優秀だったので採用することに決めました。サーバーサイドレンダリングの機能や、Code Splitting をデフォルトで行ってくれるのは非常に便利です。ただすべての機能を提供してくれるわけではないので、結局、自分で Express を利用したサーバー用コードを書かないといけない部分も多くあるのですが。

それと Next.js はデータベースへのアクセスをすべて API で行うことを推奨しているようです。そこそこの規模のサイトになると、そういった構成が増えてくるのかもしれないのですが、自分は小規模なサイトしか作ったことがないので、初めての経験でちょっと不安です。`,
    imageVideoArr: [
      {
        id: 'H_NXaMPKG',
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
    birthdayObj: {
      value: '2002-10-19T00:00:00Z',
      alternativeText: '',
      search: true,
    },
    sexObj: {
      value: 'male',
      alternativeText: '',
      search: true,
    },
    addressObj: {
      value: '大阪',
      alternativeText: '',
      search: true,
    },
    gamingExperienceObj: {
      value: '2008-09-19T00:00:00Z',
      alternativeText: '',
      search: true,
    },
    hobbiesObj: {
      valueArr: ['映画鑑賞', '料理', '海外旅行', 'ヴァイオリン演奏'],
      search: true,
    },
    specialSkillsObj: {
      valueArr: ['英語が話せる！'],
      search: true,
    },
    smartphoneObj: {
      model: 'g06',
      comment: `月額無料でスマホを利用したい！ということで買った端末です。電話としては機能してるけど、これでゲームをやるのは難しそうです。`,
      search: true,
    },
    tabletObj: {
      model: 'Google Nexus 9 Wi-Fiモデル 32GB',
      comment: `2015年に買ったタブレットなので最近はブラウザをチェックするだけでも重い…。2`,
      search: true,
    },
    pcObj: {
      model: '自作PC',
      comment: `BTOで買ったPCが壊れそうになったので、ケースや光学ドライブなどを流用しながらパーツを新しくしました。HDからSSDに移行したときはその速さに驚きましたね！容量があまりないので大量にゲームをインストールできないのですが、高速なのでなんとかSSDでやりくりしていきたいです。

グラボを積んでいないのですが、Ryzen 3 2200Gの機能で昔のゲームや2Dゲームなら普通に動きます。比較的最近のゲームですが、ダーケストダンジョンもいけました。`,
      specsObj: {
        os: 'Windows 10 Home',
        cpu: 'AMD CPU Ryzen 3 2200G',
        cpuCooler: 'CPU 付属品',
        motherboard: 'MSI B350 PC MATE',
        memory: 'Crucial DDR4 8GB x 2',
        storage: 'WD SSD 240GB / WD Green / WDS240G2G0A',
        graphicsCard: '-',
        opticalDrive: 'NEC AD7240S/BK',
        powerSupply: 'Antec EARTHWATTS EA650 650W',
        pcCase: 'COOLER MASTER CM690',
        monitor: 'MITSUBISHI TFT RDT233WX / ASUS VZ239HR',
        mouse: 'Logitech MX300',
        keyboard: 'Microsoft Keyboard With Fingerprint Reader'
      },
      search: true,
    },
    ownedHardwareObj: {
      valueArr: ['PC', 'PS4', 'Xbox One', 'Switch', 'Wii', '3DS', 'Android', 'iOS'],
      search: true,
    },
    idArr: [
      {
        type: 'playstation',
        label: '',
        id: 'AZ-1979',
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
        id: 'AZ-1979-Xbox',
        showType: 1,
        search: true,
      },
      {
        type: 'nintendo',// フレンドコード
        label: '',
        id: 'AZ-1979',
        showType: 1,
        search: true,
      },
      {
        type: 'steam',
        label: '',
        id: 'Azumi1979',
        showType: 1,
        search: true,
      },
      {
        type: 'other',
        label: 'LoL ID',
        id: 'lol-id',
        showType: 1,
        search: true,
      },
      {
        type: 'other',
        label: 'LoL ID',
        id: 'lol-id',
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
    linkArr: [
      {
        type: 'twitter',
        label: '',
        url: 'https://twitter.com/Azumi1979',
        search: true,
      },
      {
        type: 'facebook',
        label: '',
        url: 'https://www.youtube.com/',
        search: true,
      },
      {
        type: 'instagram',
        label: '',
        url: 'https://www.youtube.com/',
        search: true,
      },
      {
        type: 'youtube',
        label: '',
        url: 'https://gaming.youtube.com/channel/UCGmS-B707Sqa19BXRn02JIw/live',
        search: true,
      },
      {
        type: 'twitch',
        label: '',
        url: 'https://gaming.youtube.com/channel/UCGmS-B707Sqa19BXRn02JIw/live',
        search: true,
      },
      {
        type: 'steam',
        label: '',
        url: 'https://steamcommunity.com/profiles/76561198031526480/',
        search: true,
      },
      {
        type: 'pixiv',
        label: '',
        url: 'https://www.youtube.com/',
        search: true,
      },
      {
        type: 'other',
        label: '開発サイト',
        url: 'http://35.203.143.160:8080/',
        search: true,
      },
    ]
  };
  
  
  
  // --------------------------------------------------
  //   Insert or Update
  // --------------------------------------------------
  
  Model.findOneAndUpdate({ _id: cardPlayerId || shortid.generate() }, updateObj, { upsert: true, new: false, setDefaultsOnInsert: true }, (err, doc) => {
    
    if (err) {
      
      console.log(chalk`
        err: {green ${err}}
      `);
      
      console.log("Something wrong when updating data!");
    }
    
    // console.log(doc);
    
  });
  
  
  // --------------------------------------------------
  //   DB Insert
  // --------------------------------------------------
  
  // await ModelInstance.save();
    
  
  return true;
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  findUserId,
  find,
  upsert
};