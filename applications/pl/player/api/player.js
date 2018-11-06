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
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const shortid = require('shortid');
const bcrypt = require('bcrypt');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../@modules/csrf');
const { verifyRecaptcha } = require('../../../@modules/recaptcha');
const { encrypt }  = require('../../../@modules/crypto');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const {
  validationId,
  validationPassword,
  validationEmail
} = require('../../../@database/users/validations/login');


// ---------------------------------------------
//   Schema / Model
// ---------------------------------------------

const ModelUsers = require('../../../@database/users/model');
const ModelCardPlayers = require('../../../@database/card-players/model');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();





// --------------------------------------------------
//   Initial Props
// --------------------------------------------------

router.get('/initial-props', upload.none(), async (req, res, next) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    console.log(chalk`
      {green pl/player/api/player / initial-props}
      req.isAuthenticated(): {green ${req.isAuthenticated()}}
    `);
    
    console.log(`
      req.user: \n${util.inspect(req.user, { colors: true, depth: null })}
      req.query: \n${util.inspect(req.query, { colors: true, depth: null })}
    `);
    
    
    // --------------------------------------------------
    //   CSRF
    // --------------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Return オブジェクト
    // --------------------------------------------------
    
    const returnObj = {};
    returnObj.data = {};
    
    
    // --------------------------------------------------
    //   ログインチェック
    // --------------------------------------------------
    
    returnObj.login = false;
    
    if (req.isAuthenticated()) {
      returnObj.login = true;
    }
    
    
    // --------------------------------------------------
    //   Model / Users / Find
    // --------------------------------------------------
    
    const userId = await ModelUsers.findUserId(req.query.playerId);
    
    // console.log(chalk`
    //   userId: {green ${userId}}
    // `);
    
    
    // --------------------------------------------------
    //   Model / Card Players / Upsert
    // --------------------------------------------------
    
    // await ModelCardPlayers.upsert('a8b0gX6lMIz', 'zaoOWw89g');
    // await ModelCardPlayers.upsert('a8b0gX6lMIz');
    
    
    // --------------------------------------------------
    //   Model / Card Players / Find
    // --------------------------------------------------
    
    const cardPlayersObj = await ModelCardPlayers.find([userId]);
    
    // console.log(`
    //   cardPlayersObj: \n${util.inspect(cardPlayersObj, { colors: true, depth: null })}
    // `);
    
    
    // --------------------------------------------------
    //   Database / Users 取得
    // --------------------------------------------------
    
    returnObj.data.userObj = {
      'a8b0gX6lMIz': {
        name: 'あづみデッドバイデイライト',
        status: 'プロハンター',
        playerId: 'az1979',
        playerPage: '/pl/az1979',
        level: 999,
        accessDate: '2018-08-06T08:50:00Z',
        cardPlayerObj: {
          birthday: '2002-10-19T00:00:00Z',
          sex: 'male',
        },
        cardGameObj: {
          'reaBMD4W6': {
            birthday: '2002-10-19T00:00:00Z',
            sex: 'male',
          }
        }
      }
    };
    
    
    // --------------------------------------------------
    //   Database / Users 取得
    // --------------------------------------------------
    
    returnObj.data.cardPlayerObj = {
      'W6VI422uO': {
        userId: 'a8b0gX6lMIz',
        // createdDate: '2018-10-23T12:00:00Z',
        // updatedDate: '2018-10-23T12:00:00Z',
        comment: `Next.js を試してみたところ、とても優秀だったので採用することに決めました。サーバーサイドレンダリングの機能や、Code Splitting をデフォルトで行ってくれるのは非常に便利です。ただすべての機能を提供してくれるわけではないので、結局、自分で Express を利用したサーバー用コードを書かないといけない部分も多くあるのですが。

それと Next.js はデータベースへのアクセスをすべて API で行うことを推奨しているようです。そこそこの規模のサイトになると、そういった構成が増えてくるのかもしれないのですが、自分は小規模なサイトしか作ったことがないので、初めての経験でちょっと不安です。`,
        imageSrcSet: '/static/img/card/player/H_NXaMPKG/320w.jpg 320w, /static/img/card/player/H_NXaMPKG/480w.jpg 480w, /static/img/card/player/H_NXaMPKG/640w.jpg 640w, /static/img/card/player/H_NXaMPKG/800w.jpg 800w',
        imageSrc: '/static/img/card/player/H_NXaMPKG/800w.jpg',
        imageAlt: 'ライオン',
        // imageVideoArr: [
        //   {
        //     id: 'H_NXaMPKG',
        //     type: 'image',
        //     imageSetArr: [
        //       {
        //         w: '320w',
        //         src: '/static/img/card/player/H_NXaMPKG/320w.jpg',
        //         width: 320,
        //         height: 180,
        //         type: 'JPEG'
        //       },
        //       {
        //         w: '480w',
        //         src: '/static/img/card/player/H_NXaMPKG/480w.jpg',
        //         width: 480,
        //         height: 270,
        //         type: 'JPEG'
        //       },
        //       {
        //         w: '640w',
        //         src: '/static/img/card/player/H_NXaMPKG/640w.jpg',
        //         width: 640,
        //         height: 360,
        //         type: 'JPEG'
        //       },
        //       {
        //         w: '800w',
        //         src: '/static/img/card/player/H_NXaMPKG/800w.jpg',
        //         width: 800,
        //         height: 450,
        //         type: 'JPEG'
        //       },
        //       {
        //         w: 'source',
        //         src: '/static/img/card/player/H_NXaMPKG/1920w.jpg',
        //         width: 1920,
        //         height: 1080,
        //         type: 'JPEG'
        //       },
        //     ],
        //     caption: 'ライオン',
        //   },
        // ],
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
          // alternativeText: '',
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
        },
        tabletObj: {
          model: 'Google Nexus 9 Wi-Fiモデル 32GB',
          comment: `2015年に買ったタブレットなので最近はブラウザをチェックするだけでも重い…。`,
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
        },
        ownedHardwareObj: {
          valueArr: ['PC', 'PS4', 'Xbox One', 'Switch', 'Wii', '3DS', 'Android', 'iOS'],
          search: true,
        },
        // ownedHardwareObj: {
        //   valueArr: ['u752aJ8tM', 'H3FwPxRHP'],
        //   search: true,
        // },
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
        // idObj: {
        //   playstationObj: {
        //     value: 'AZ-1979',
        //     search: true,
        //     showType: 1
        //     // 1.表示する
        //     // 2.自分をフォローしているユーザーに表示する
        //     // 3.自分がフォローしているユーザーに表示する
        //     // 4.相互フォローで表示する
        //     // 5.表示しない
        //   },
        //   xboxObj: {//ゲーマータグ
        //     value: 'AZ-1979-Xbox',
        //     search: true,
        //     showType: 1
        //   },
        //   nintendoObj: {//フレンドコード
        //     value: 'AZ-1979',
        //     search: true,
        //     showType: 1
        //   },
        //   steamObj: {
        //     value: 'Azumi1979',
        //     search: true,
        //     showType: 1
        //   },
        //   otherArr: [
        //     {
        //       label: 'LoL ID',
        //       value: 'lol-id',
        //       search: true,
        //       showType: 1
        //     },
        //     {
        //       label: 'MHW ID',
        //       value: 'mhw-id',
        //       search: true,
        //       showType: 1
        //     },
        //   ]
        // },
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
      }
    };
    
    
    // ---------------------------------------------
    //   Return Json Object / Success
    // ---------------------------------------------
    
    return res.status(200).json(returnObj);
    
    
  } catch (error) {
    
    // console.log(chalk`
    //   error.message: {red ${error.message}}
    // `);
    
    
    // --------------------------------------------------
    //   製品版の場合、エラーメッセージを定型文に変更
    // --------------------------------------------------
    
    let message = error.message;
    
    if (process.env.NODE_ENV === 'production') {
      message = 'Initial Props';
    }
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(400).json({
      errorsArr: [
        {
          code: 0,
          message
        },
      ]
    });
    
  }
  
});



module.exports = router;