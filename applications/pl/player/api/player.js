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

const ModelUsers = require('../../../@database/users/schema');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();





// --------------------------------------------------
//   テスト
// --------------------------------------------------

// router.get('/test', upload.none(), (req, res) => {
  
//   // console.log(chalk`
//   //   test: {red ${req.body.createAccountId}}
//   //   req.body.createAccountPassword: {green ${req.body.createAccountPassword}}
//   // `);
  
//   console.log(`\n\nAPI test\n\n`);
  
//   res.json({
//     success: true,
//     challenge_ts: '2018-09-22T10:53:45Z',
//     hostname: '35.203.143.160'
//   });
  
  
// });



// --------------------------------------------------
//   Initial Props
// --------------------------------------------------

router.get('/initial-props', upload.none(), function(req, res, next) {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    console.log(chalk`
      {green pl/player/api/player / initial-props}
      req.isAuthenticated(): {green ${req.isAuthenticated()}}
    `);
    
    // console.log(`
    //   req.user: \n${util.inspect(req.user, { colors: true, depth: null })}
    // `);
    
    
    // --------------------------------------------------
    //   CSRF
    // --------------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Return オブジェクト
    // --------------------------------------------------
    
    const returnObj = {};
    // returnObj.initialProps = {};
    returnObj.data = {};
    
    
    // --------------------------------------------------
    //   ログインチェック
    // --------------------------------------------------
    
    returnObj.login = false;
    
    if (req.isAuthenticated()) {
      returnObj.login = true;
    }
    
    
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
            keyboard: 'Microsoft Keyboard With Fingerprint Reader',
            search: true,
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
        idObj: {
          playstationObj: {
            value: 'AZ-1979',
            search: true,
            showType: 1// 1.表示する 2.フォロワーに表示する 3.相互フォローで表示する 4.表示しない 5.表示しない（表示確認ダイアログ）
          },
          xboxObj: {//ゲーマータグ
            value: 'AZ-1979-Xbox',
            search: true,
            showType: 1
          },
          nintendoObj: {//フレンドコード
            value: 'AZ-1979',
            search: true,
            showType: 1
          },
          steamObj: {
            value: 'Azumi1979',
            search: true,
            showType: 1
          },
          otherArr: [
            {
              label: 'LoL ID',
              value: 'lol-id',
              search: true,
              showType: 1
            },
            {
              label: 'MHW ID',
              value: 'mhw-id',
              search: true,
              showType: 1
            },
          ]
        },
        activityTimeObj: {
          valueArr: [
            {
              startTime: '19:00',
              endTime: '24:00',
              weekArr: [0, 1, 2, 3, 4]
            },
            {
              startTime: '9:00',
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
        linkObj: {
          twitter: {
            url: 'https://twitter.com/Azumi1979',
            search: true,
          },
          facebook: {
            url: '',
            search: true,
          },
          youtube: {
            url: 'https://gaming.youtube.com/channel/UCGmS-B707Sqa19BXRn02JIw/live',
            search: true,
          },
          steam: {
            url: 'https://steamcommunity.com/profiles/76561198031526480/',
            search: true,
          },
          linkArr: [
            {
              label: '開発サイト',
              url: 'http://35.203.143.160:8080/',
              search: true,
            },
          ]
        },
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




// --------------------------------------------------
//   ログイン Passport：Local（ID & Password）
//   
//   参考：
//  　 http://www.passportjs.org/docs/username-password/
//   
//   参考 カスタムコールバック：
//     http://www.passportjs.org/docs/authenticate/
//     http://knimon-software.github.io/www.passportjs.org/guide/authenticate/
// --------------------------------------------------

router.post('/', upload.none(), function(req, res, next) {
  passport.authenticate('local', async function(err, user, info) {
    
    
    try {
      
      
      // --------------------------------------------------
      //   Set Variables
      // --------------------------------------------------
      
      const { loginId, loginPassword } = req.body;
      
      
      // --------------------------------------------------
      //   ログインチェック
      // --------------------------------------------------
      
      if (req.isAuthenticated()) {
        console.log(chalk`
          {green ログインしています}
        `);
        
        throw new Error('Already');
        
      } else {
        console.log(chalk`
          {green ログインしていません}
        `);
      }
      
      
      // --------------------------------------------------
      //   Console 出力
      // --------------------------------------------------
      
      console.log(chalk`
        loginId: {green ${loginId}}
        loginPassword: {green ${loginPassword}}
        req.isAuthenticated(): {green ${req.isAuthenticated()}}
      `);
      
      // console.log(`
      //   validationIdObj: \n${util.inspect(validationIdObj, { colors: true, depth: null })}
      // `);
      
      // console.log(`
      //   validationPasswordObj: \n${util.inspect(validationPasswordObj, { colors: true, depth: null })}
      // `);
      
      console.log(`
        req.session: \n${util.inspect(req.session, { colors: true, depth: null })}
      `);
      
      console.log(`
        req.user: \n${util.inspect(req.user, { colors: true, depth: null })}
      `);
      
      
      
      // ---------------------------------------------
      //   CSRF
      // ---------------------------------------------
      
      verifyCsrfToken(req, res);
      
      
      // --------------------------------------------------
      //   Validation
      // --------------------------------------------------
      
      const validationIdObj = validationId(loginId);
      const validationPasswordObj = validationPassword(loginPassword);
      
      if (validationIdObj.error || validationPasswordObj.error) {
        throw new Error('Validation');
      }
      
      
      // ---------------------------------------------
      //   reCAPTCHA
      // ---------------------------------------------
      
      await verifyRecaptcha(req, res);
      // console.log(`verifyRecaptchaの後`);
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if (err) {
        throw new Error('Passport 1');
      }
      
      if (!user) {
        
        
        // --------------------------------------------------
        //   Set Error Message
        // --------------------------------------------------
        
        let message = info.message;
        
        if (process.env.NODE_ENV === 'production') {
          message = 'ID、またはパスワードが間違っています。';
        }
        
        
        // --------------------------------------------------
        //   Return Error JSON
        // --------------------------------------------------
        
        return res.status(401).json({
          errorsArr: [
            {
              code: 0,
              message
            },
          ]
        });
        
      }
      
      
      // ---------------------------------------------
      //   req.logIn - この記述はカスタムコールバックに必要らしい
      // ---------------------------------------------
      
      req.logIn(user, function(err) {
        
        // console.log(`\nreq.logIn`);
        // console.log(`\nerr =`);
        // console.dir(err);
        // console.log(`err.name = ${err.name}`);
        // console.log(`err.status = ${err.status}`);
        
        
        // ---------------------------------------------
        //   Error
        // ---------------------------------------------
        
        if (err) {
          throw new Error('Passport 2');
        }
        
        
        // ---------------------------------------------
        //   Success
        // ---------------------------------------------
        
        return res.status(200).json({
          playerId: req.user.playerId
        });
        
      });
      
      
    } catch (error) {
      
      console.log(chalk`
        error.message: {red ${error.message}}
      `);
      
      
      // --------------------------------------------------
      //   Set Error Message
      // --------------------------------------------------
      
      let message = error.message;
      
      if (process.env.NODE_ENV === 'production') {
        message = 'Login';
      }
      
      
      // --------------------------------------------------
      //   Return Error JSON
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
    
  })(req, res, next);
});


// --------------------------------------------------
//   Passport Local：ID & Password 認証
// --------------------------------------------------

passport.use(new LocalStrategy({
    usernameField: 'loginId',
    passwordField: 'loginPassword'
  },
  (username, password, done) => {
    
    ModelUsers.findOne({ loginId: username }, (err, user) => {
      
      
      // --------------------------------------------------
      //   Error
      // --------------------------------------------------
      
      if (err) {
        return done(err);
      }
      
      
      // --------------------------------------------------
      //   Error：ユーザーが存在しない
      // --------------------------------------------------
      
      if (!user) {
        return done(null, false, { message: 'Incorrect loginId.' });
      }
      
      
      // --------------------------------------------------
      //   bcrypt でハッシュ化したパスワードを検証する
      //   参照：https://github.com/kelektiv/node.bcrypt.js#to-check-a-password-1
      // --------------------------------------------------
      
      if (bcrypt.compareSync(password, user.loginPassword) === false) {
        return done(null, false, { message: 'Incorrect loginPassword.' });
      }
      
      
      return done(null, user);
      
    });
  }
));


// --------------------------------------------------
//   シリアライズ
//   認証時、DB/users コレクションの _id をセッションに保存する
//   _id は req.session.passport.user に入っている
// --------------------------------------------------

passport.serializeUser((user, done) => {
  done(null, user._id);
});


// --------------------------------------------------
//   デシリアライズ
//   セッション変数を受け取って中身を検証する
//   DB/users コレクションを _id で検索し、ユーザーデータを取得して返す
//   返ってきたユーザーデータは各 router の req.user から参照できる
// --------------------------------------------------

passport.deserializeUser((id, done) => {
  ModelUsers.findOne({_id: id}, (err, user) => {
    
    
    // --------------------------------------------------
    //   ここで req.user に送る情報を選択する
    // --------------------------------------------------
    
    const userObj = {
      _id: user._id,
      name: user.name,
      status: user.status,
      playerId: user.playerId,
      level: user.level,
      role: user.role,
      accessDate: user.accessDate
    };
    
    done(err, userObj);
  });
});





// --------------------------------------------------
//   アカウント作成
// --------------------------------------------------

router.post('/createAccount', upload.none(), async (req, res) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Set Variables
    // --------------------------------------------------
    
    const { createAccountId, createAccountPassword, createAccountEmail } = req.body;
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    const validationIdObj = validationId(createAccountId);
    const validationPasswordObj = validationPassword(createAccountPassword, createAccountId);
    const validationEmailObj = validationEmail(createAccountEmail);
    
    if (validationIdObj.error || validationPasswordObj.error || validationEmailObj.error) {
      throw new Error('Validation');
    }
    
    
    // --------------------------------------------------
    //   パスワードハッシュ化
    // --------------------------------------------------
    
    // ストレッチング回数
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(createAccountPassword, saltRounds);
    
    
    // --------------------------------------------------
    //   E-Mail 暗号化
    // --------------------------------------------------
    
    let encryptedEmail = '';
    
    if (createAccountEmail) {
      encryptedEmail = encrypt(createAccountEmail);
    }
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    console.log(chalk`
      createAccountId: {red ${createAccountId}}
      createAccountPassword: {green ${createAccountPassword}}
      createAccountEmail: {green ${createAccountEmail}}
      passwordHash: {green ${passwordHash}}
      encryptedEmail: {green ${encryptedEmail}}
    `);
    
    console.log(`
      validationIdObj: \n${util.inspect(validationIdObj, { colors: true, depth: null })}
    `);
    
    console.log(`
      validationPasswordObj: \n${util.inspect(validationPasswordObj, { colors: true, depth: null })}
    `);
    
    console.log(`
      validationEmailObj: \n${util.inspect(validationEmailObj, { colors: true, depth: null })}
    `);
    
    
    // --------------------------------------------------
    //   Model
    // --------------------------------------------------
    
    const _id = shortid.generate();
    const playerId = shortid.generate();
    
    const ModelUsersInstance = new ModelUsers({
      _id,
      loginId: createAccountId,
      loginPassword: passwordHash,
      email: encryptedEmail,
      name: '',
      status: '',
      playerId,
      // level: 'AAA'
    });
    
    
    // --------------------------------------------------
    //   DB Insert
    // --------------------------------------------------
    
    await ModelUsersInstance.save();
    
    
    // --------------------------------------------------
    //   Return Success JSON
    // --------------------------------------------------
    
    return res.status(201).json({
      playerId
    });
    
    
  } catch (error) {
    
    console.log(chalk`
      error.message: {red ${error.message}}
    `);
    
    
    // --------------------------------------------------
    //   Set Error Message
    // --------------------------------------------------
    
    let message = error.message;
    
    if (process.env.NODE_ENV === 'production') {
      message = 'Create Account';
    }
    
    
    // --------------------------------------------------
    //   Return Error JSON
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