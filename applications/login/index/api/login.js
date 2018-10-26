// --------------------------------------------------
//   Require
// --------------------------------------------------

const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'static/' });
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const shortid = require('shortid');
const bcrypt = require('bcrypt');
const chalk = require('chalk');
const util = require('util');

const { verifyCsrfToken } = require('../../../@modules/csrf');
const { verifyRecaptcha } = require('../../../@modules/recaptcha');
const { encrypt }  = require('../../../@modules/crypto');

const {
  validationId,
  validationPassword,
  validationEmail
} = require('../../../@database/users/validations/login');



// ---------------------------------------------
//   Require: Model
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

router.get('/initialProps', upload.none(), function(req, res, next) {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    console.log(chalk`
      {green login api / initialProps}
      req.isAuthenticated(): {green ${req.isAuthenticated()}}
    `);
    
    console.log(`
      req.user: \n${util.inspect(req.user, { colors: true, depth: null })}
    `);
    
    
    // ---------------------------------------------
    //   CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   ログインチェック
    // --------------------------------------------------
    
    let login = false;
    
    if (req.isAuthenticated()) {
      console.log(chalk`
        {green login / initialProps / ログインしています}
      `);
      login = true;
    } else {
      console.log(chalk`
        {green login / initialProps / ログインしていません}
      `);
    }
    
    
    // ---------------------------------------------
    //   Success
    // ---------------------------------------------
    
    return res.status(200).json({
      login
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
      message = 'Login Initial Props';
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