// --------------------------------------------------
//   File ID: SInn-saE6
// --------------------------------------------------

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

const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'static/' });
const shortid = require('shortid');
const moment = require('moment');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../@modules/csrf');
const { errorCodeIntoErrorObj } = require('../../../@modules/error/error-obj');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

// const validation_id = require('../../../@validations/_id');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelGames = require('../../../@database/games/model');
const ModelCardPlayers = require('../../../@database/card-players/model');
const ModelCardGames = require('../../../@database/card-games/model');
const ModelGameGenres = require('../../../@database/game-genres/model');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();





// --------------------------------------------------
//   Initial Props / Function ID: zenm51Io4
// --------------------------------------------------

router.post('/insert', upload.none(), async (req, res, next) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  let statusCode = 400;
  
  let errorArgumentsObj = {
    fileId: 'SInn-saE6',
    functionId: 'zenm51Io4',
    errorCodeArr: [500000],
    errorObj: {},
  };
  
  
  try {
    
    
    // --------------------------------------------------
    //   CSRF
    // --------------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Login Check
    // --------------------------------------------------
    
    // if (!req.isAuthenticated()) {
    //   statusCode = 401;
    //   errorArgumentsObj.errorCodeArr = [101001];
    //   throw new Error();
    // }
    
    
    // --------------------------------------------------
    //   POST 取得 & Property
    // --------------------------------------------------
    
    // const { users_id } = req.body;
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const date = moment().utcOffset(0);
    let conditionObj = {};
    let saveObj = {};
    let saveArr = [];
    
    
    
    
    
    // --------------------------------------------------
    //   DB / Games
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Condition Object
    // ---------------------------------------------
    
    conditionObj = { _id: 'w_zkqpr3R' || shortid.generate() };
    
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveObj = {
      createdDate: date,
      updatedDate: date,
      gameId: 'dead-by-daylight',
      thumbnail: false,
      imageVideoArr: [],
      genreArr: ['nO7XxHZYM'],
      subGenreArr: [],
      dataArr: [
        {
          _id: 'VjSSBUYlJ',
          createdDate: date,
          updatedDate: date,
          country: 'JP',
          name: 'Dead by Daylight',
          subtitle: '',
          similarityArr: [
            'DbD'
          ],
          forSort: 'デッドバイデイライト',
          twitterHashtag: 'DeadbyDaylight',
          genreTagArr: [],
          hardwareArr: [
            {
              _id: 'pIcOj6-43',
              hardware_id: '60TVB7_if',
              releaseData: '2016-06-14T00:00:00.000Z',
              players: 5,
              publisher_id: 'fa_jpSg5L',
              developer_id: '_sCyO1JV1',
            }
          ],
          linkArr: [
            {
              _id: 'aiK3_xZsM',
              type: 'twitter',
              label: '',
              url: 'https://twitter.com/',
            },
            {
              _id: 'YPIzVEYuA',
              type: 'facebook',
              label: '',
              url: 'https://ja-jp.facebook.com/',
            },
            {
              _id: 'j14biyEhD',
              type: 'youtube',
              label: '',
              url: 'https://www.youtube.com/',
            },
            {
              _id: 'RAI0yDihN',
              type: 'steam',
              label: '',
              url: 'https://steamcommunity.com/',
            },
            {
              _id: 'BtePeoi0i',
              type: 'other',
              label: '開発サイト',
              url: 'http://35.203.143.160:8080/',
            },
          ]
        },
      ],
    };
    
    
    // ---------------------------------------------
    //   Upsert
    // ---------------------------------------------
    
    returnObj = await ModelGames.upsert(conditionObj, saveObj);
    
    
    
    
    
    // --------------------------------------------------
    //   DB / Game Genres
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Save Arr
    // ---------------------------------------------
    
    saveArr = [
      {
        _id: 'nO7XxHZYM',
        createdDate: date,
        updatedDate: date,
        type: 1,
        dataArr: [
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'en',
            name: 'Action',
          },
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'ja',
            name: 'アクション',
          }
        ]
      },
      {
        _id: 'ksTu6wRs0l',
        createdDate: date,
        updatedDate: date,
        type: 1,
        dataArr: [
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'en',
            name: 'Shooter',
          },
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'ja',
            name: 'シューティング',
          }
        ]
      },
      {
        _id: 'ouLGbf_KSd',
        createdDate: date,
        updatedDate: date,
        type: 1,
        dataArr: [
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'en',
            name: 'Adventure',
          },
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'ja',
            name: 'アドベンチャー',
          }
        ]
      },
      {
        _id: '9iRS29w3we',
        createdDate: date,
        updatedDate: date,
        type: 1,
        dataArr: [
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'en',
            name: 'RPG',
          },
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'ja',
            name: 'RPG',
          }
        ]
      },
      {
        _id: '0Uaz_dOxXq',
        createdDate: date,
        updatedDate: date,
        type: 1,
        dataArr: [
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'en',
            name: 'Simulation',
          },
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'ja',
            name: 'シミュレーター',
          }
        ]
      },
      {
        _id: 'RpptnE2zlp',
        createdDate: date,
        updatedDate: date,
        type: 1,
        dataArr: [
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'en',
            name: 'Strategy',
          },
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'ja',
            name: 'シミュレーション（ストラテジー）',
          }
        ]
      },
      {
        _id: 'b_QI2RFSEQ6',
        createdDate: date,
        updatedDate: date,
        type: 1,
        dataArr: [
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'en',
            name: 'Sports',
          },
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'ja',
            name: 'スポーツ',
          }
        ]
      },
      {
        _id: 'mlfWkx-ZxJL',
        createdDate: date,
        updatedDate: date,
        type: 1,
        dataArr: [
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'en',
            name: 'Racing',
          },
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'ja',
            name: 'レース',
          }
        ]
      },
      {
        _id: 'deBQJJV-m8s',
        createdDate: date,
        updatedDate: date,
        type: 1,
        dataArr: [
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'en',
            name: 'Fighting',
          },
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'ja',
            name: '格闘ゲーム',
          }
        ]
      },
      {
        _id: 'uEUpcTb87D_',
        createdDate: date,
        updatedDate: date,
        type: 1,
        dataArr: [
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'en',
            name: 'Puzzle',
          },
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'ja',
            name: 'パズル',
          }
        ]
      },
      {
        _id: 'ejdGhTwE1Gb',
        createdDate: date,
        updatedDate: date,
        type: 1,
        dataArr: [
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'en',
            name: 'Board game / Card game',
          },
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'ja',
            name: 'ボードゲーム / カードゲーム',
          }
        ]
      },
      {
        _id: 'cU9z-CA3d29',
        createdDate: date,
        updatedDate: date,
        type: 1,
        dataArr: [
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'en',
            name: 'Music game',
          },
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'ja',
            name: '音ゲー',
          }
        ]
      },
      {
        _id: 'bfxzmy3eib9',
        createdDate: date,
        updatedDate: date,
        type: 1,
        dataArr: [
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'en',
            name: 'Other',
          },
          {
            _id: shortid.generate(),
            createdDate: date,
            updatedDate: date,
            language: 'ja',
            name: 'その他',
          }
        ]
      },
    ]
    
    
    // --------------------------------------------------
    //   insertMany
    // --------------------------------------------------
    
    returnObj = await ModelGameGenres.insertMany(saveArr);
    
    
    
    
    
    // --------------------------------------------------
    //   DB / Card Players
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Condition Object
    // ---------------------------------------------
    
    conditionObj = { _id: 'zaoOWw89g' || shortid.generate() };
    
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveObj = {
      createdDate: date,
      updatedDate: date,
      users_id: 'jun-deE4J',
      imageVideoArr: [
        {
          _id: 'H_NXaMPKG',
          type: 'image',
          caption: 'ライオン',
          fileFormat: 'JPEG',
          srcSetArr: [
            {
              _id: 'himsYqtCL',
              w: '320w',
              width: 320,
              height: 180,
            },
            {
              _id: 'Cfjt2j3Y_',
              w: '480w',
              width: 480,
              height: 270,
            },
            {
              _id: 'EjUz0NL8z',
              w: '640w',
              width: 640,
              height: 360,
            },
            {
              _id: 'g9u6JQkLh',
              w: '800w',
              width: 800,
              height: 450,
            },
            {
              _id: 'TsNkkGwok',
              w: 'source',
              width: 1920,
              height: 1080,
            },
          ],
        },
      ],
      dataArr: [
        {
          _id: 'VjSSBUYlJ',
          createdDate: date,
          updatedDate: date,
          language: 'ja',
          comment: `Next.js を試してみたところ、とても優秀だったので採用することに決めました。サーバーサイドレンダリングの機能や、Code Splitting をデフォルトで行ってくれるのは非常に便利です。ただすべての機能を提供してくれるわけではないので、結局、自分で Express を利用したサーバー用コードを書かないといけない部分も多くあるのですが。
  
  それと Next.js はデータベースへのアクセスをすべて API で行うことを推奨しているようです。そこそこの規模のサイトになると、そういった構成が増えてくるのかもしれないのですが、自分は小規模なサイトしか作ったことがないので、初めての経験でちょっと不安です。`,
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
            valueArr: ['英語を話せる！'],
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
              _id: 'au1gnYf6b',
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
              _id: 'OXNtQjxgF',
              type: 'xbox',// ゲーマータグ
              label: '',
              value: 'AZ-1979-Xbox',
              showType: 1,
              search: true,
            },
            {
              _id: 'VY9aFMoVh',
              type: 'nintendo',// フレンドコード
              label: '',
              value: 'AZ-1979',
              showType: 1,
              search: true,
            },
            {
              _id: 'BNJPgqtoR',
              type: 'steam',
              label: '',
              value: 'Azumi1979',
              showType: 1,
              search: true,
            },
            {
              _id: 'ndQgliRHK',
              type: 'other',
              label: 'LoL ID',
              value: 'lol-id',
              showType: 1,
              search: true,
            },
            {
              _id: 'pJxHh8ZaR',
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
                _id: 'fkqjMZzff',
                beginTime: '19:00',
                endTime: '24:00',
                weekArr: [0, 1, 2, 3, 4]
              },
              {
                _id: 'J-ReJUaTK',
                beginTime: '9:00',
                endTime: '24:00',
                weekArr: [5, 6]
              }
            ],
            search: true,
          },
          lookingForFriendsObj: {
            icon: 'emoji_u1f61c',
            comment: '社会人の方よろしく！',
            search: true,
          },
          voiceChatObj: {
            comment: '夜21時まで',
            search: true,
          },
          linkArr: [
            {
              _id: 'FbbgE5PTW',
              type: 'twitter',
              label: '',
              url: 'https://twitter.com/Azumi1979',
              search: true,
            },
            {
              _id: 'VMp_Vlk_V',
              type: 'facebook',
              label: '',
              url: 'https://www.youtube.com/',
              search: true,
            },
            {
              _id: 'IqNtEQQsO',
              type: 'instagram',
              label: '',
              url: 'https://www.youtube.com/',
              search: true,
            },
            {
              _id: 'yBC3AHqrP',
              type: 'youtube',
              label: '',
              url: 'https://gaming.youtube.com/channel/UCGmS-B707Sqa19BXRn02JIw/live',
              search: true,
            },
            {
              _id: 'YD8DHCvb_',
              type: 'twitch',
              label: '',
              url: 'https://gaming.youtube.com/channel/UCGmS-B707Sqa19BXRn02JIw/live',
              search: true,
            },
            {
              _id: '8u2ht4NLv',
              type: 'steam',
              label: '',
              url: 'https://steamcommunity.com/profiles/76561198031526480/',
              search: true,
            },
            {
              _id: 'lqNaKEL49',
              type: 'pixiv',
              label: '',
              url: 'https://www.youtube.com/',
              search: true,
            },
            {
              _id: 'zcPp3XyEw',
              type: 'other',
              label: '開発サイト',
              url: 'http://35.203.143.160:8080/',
              search: true,
            },
          ]
        }
      ],
    };
    
    
    // --------------------------------------------------
    //   Upsert
    // --------------------------------------------------
    
    returnObj = await ModelCardPlayers.upsert(conditionObj, saveObj);
    
    
    
    
    
    // --------------------------------------------------
    //   DB / Card Games
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Condition Object
    // ---------------------------------------------
    
    conditionObj = { _id: 'TzjNMDQyl' || shortid.generate() };
    
    
    // ---------------------------------------------
    //   Save Object
    // ---------------------------------------------
    
    saveObj = {
      createdDate: date,
      updatedDate: date,
      users_id: 'jun-deE4J',
      games_id: 'w_zkqpr3R',
      imageVideoArr: [
        {
          _id: 'H_NXaMPKG',
          type: 'image',
          caption: 'ライオン',
          fileFormat: 'JPEG',
          srcSetArr: [
            {
              _id: 'xz_HamTMS',
              w: '320w',
              width: 320,
              height: 180,
            },
            {
              _id: 'VGaeXottk',
              w: '480w',
              width: 480,
              height: 270,
            },
            {
              _id: 'E3kjgGmJ7',
              w: '640w',
              width: 640,
              height: 360,
            },
            {
              _id: 'JHgN0IFXD',
              w: '800w',
              width: 800,
              height: 450,
            },
            {
              _id: 'XMZ2Ioh2x',
              w: 'source',
              width: 1920,
              height: 1080,
            },
          ],
        },
      ],
      dataArr: [
        {
          _id: 'VjSSBUYlJ',
          createdDate: date,
          updatedDate: date,
          language: 'ja',
          theme: '',
          itemArr: [],
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
          quotationObj: {
            activityTime: true,
            lookingForFriends: true,
            voiceChat: true,
            link: true,
          },
          playingHardwareObj: {
            valueArr: ['PC', 'PS4', 'Xbox One', 'Switch', 'Wii', '3DS', 'Android', 'iOS'],
            search: true,
          },
          idArr: [
            {
              _id: '9_-NXN6rQ',
              quotation_id: '',
              type: 'playstation',
              label: '',
              value: 'AZ-1979-Game',
              showType: 1,
              search: true,
              // 1.表示する
              // 2.自分をフォローしているユーザーに表示する
              // 3.自分がフォローしているユーザーに表示する
              // 4.相互フォローで表示する
              // 5.表示しない
            },
            {
              _id: '-9hC-izPG',
              quotation_id: '',
              type: 'xbox',// ゲーマータグ
              label: '',
              value: 'AZ-1979-Xbox-Game',
              showType: 1,
              search: true,
            },
            {
              _id: 'QbkY_-AjW',
              quotation_id: 'VY9aFMoVh',
              type: 'other',
              label: '',
              value: '',
              showType: 5,
              search: true,
            },
            {
              _id: 'qMsL_dgHW',
              quotation_id: '',
              type: 'steam',
              label: '',
              value: 'Azumi1979',
              showType: 1,
              search: true,
            },
            {
              _id: 'quLSl_A90',
              quotation_id: '',
              type: 'other',
              label: 'LoL ID',
              value: 'lol-id',
              showType: 1,
              search: true,
            },
            {
              _id: '19bLgUTWU',
              quotation_id: '',
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
                _id: '0X3yH-BnG',
                beginTime: '19:00',
                endTime: '24:00',
                weekArr: [0, 1, 2, 3, 4]
              },
              {
                _id: '7Euewb_Ik',
                beginTime: '9:00',
                endTime: '24:00',
                weekArr: [5, 6]
              }
            ],
            search: true,
          },
          lookingForFriendsObj: {
            icon: 'emoji_u1f61c',
            comment: '社会人の方よろしく！',
            search: true,
          },
          voiceChatObj: {
            comment: '夜21時まで',
            search: true,
          },
          linkArr: [
            {
              _id: 'K2NRYVCox',
              type: 'twitter',
              label: '',
              url: 'https://twitter.com/Azumi1979',
              search: true,
            },
            {
              _id: '0syPuDv6O',
              type: 'facebook',
              label: '',
              url: 'https://www.youtube.com/',
              search: true,
            },
            {
              _id: 'STJa3TLJX',
              type: 'quotation',
              label: '',
              url: '',
              search: true,
            },
            {
              _id: 'spRqODqbz',
              type: 'other',
              label: '開発サイト',
              url: 'http://35.203.143.160:8080/',
              search: true,
            },
          ]
        }
      ],
    };
    
    
    // --------------------------------------------------
    //   Upsert
    // --------------------------------------------------
    
    returnObj = await ModelCardGames.upsert(conditionObj, saveObj);
    
    
    
    
    
    
    
    
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log('AAA');
    
    // console.log(chalk`
    //   users_id: {green ${users_id}}
    // `);
    
    // console.log(`
    //   req.user: \n${util.inspect(req.user, { colors: true, depth: null })}
    //   req.query: \n${util.inspect(req.query, { colors: true, depth: null })}
    // `);
    
    // console.log(`
    //   ----- validation_idObj -----\n
    //   ${util.inspect(validation_idObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // ---------------------------------------------
    //   Return Json Object / Success
    // ---------------------------------------------
    
    return res.status(200).json(returnObj);
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   Error Object
    // ---------------------------------------------
    
    errorArgumentsObj.errorObj = errorObj;
    const resultErrorObj = errorCodeIntoErrorObj(errorArgumentsObj);
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
});



module.exports = router;