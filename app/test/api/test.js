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
const upload = multer({ dest: 'public/' });
const shortid = require('shortid');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../@modules/csrf');
const { verifyRecaptcha } = require('../../@modules/recaptcha');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

// const {
//   validationId,
//   validationPassword,
//   validationEmail
// } = require('../../@database/users/validations/login');


// ---------------------------------------------
//   Schema / Model
// ---------------------------------------------

const ModelUsers = require('../../@database/users/schema');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();





// --------------------------------------------------
//   Initial Props
// --------------------------------------------------

router.get('/initial-props', upload.none(), async (req, res, next) => {
  
  
  const session = await ModelUsers.startSession();
  
  
  try {
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    console.log(chalk`
      {green ur/player/api/player / initial-props}
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
    returnObj.data = {};
    
    
    // --------------------------------------------------
    //   ログインチェック
    // --------------------------------------------------
    
    returnObj.login = false;
    
    if (req.isAuthenticated()) {
      returnObj.login = true;
    }
    
    
    
    
    
    // --------------------------------------------------
    //   Transaction / Start
    // --------------------------------------------------
    
    await session.startTransaction();
    
    
    
    // --------------------------------------------------
    //   Model
    // --------------------------------------------------
    
    const _id1 = shortid.generate();
    const loginId1 = shortid.generate();
    const playerId1 = shortid.generate();
    
    // const ModelUsersInstance1 = new ModelUsers({
    //   _id: _id1,
    //   loginId: loginId1,
    //   loginPassword: 'password1',
    //   email: '',
    //   name: '',
    //   status: '',
    //   playerId: playerId1
    // });
    
    const obj1 = {
      _id: _id1,
      loginId: loginId1,
      loginPassword: 'password1',
      email: '',
      name: '',
      status: '',
      playerId: playerId1
    };
    
    
    const _id2 = shortid.generate();
    const loginId2 = shortid.generate();
    const playerId2 = shortid.generate();
    
    // const ModelUsersInstance2 = new ModelUsers({
    //   _id: _id2,
    //   loginId: loginId2,
    //   loginPassword: 'password2',
    //   email: '',
    //   name: '',
    //   status: '',
    //   playerId: playerId2
    // });
    
    const obj2 = {
      _id: _id2,
      loginId: loginId2,
      loginPassword: 'password2',
      email: '',
      name: '',
      status: '',
      playerId: playerId2
    };
    
    
    // --------------------------------------------------
    //   DB Insert
    // --------------------------------------------------
    
    // await ModelUsers.create([obj1], { session: session });
    // // throw new Error();
    // await ModelUsers.create([obj2], { session: session });
    
    
    // await ModelUsersInstance1.save();
    // await ModelUsersInstance1.create(obj1, { session: session });
    
    // throw new Error();
    
    // await ModelUsersInstance2.save();
    
    
    
    // --------------------------------------------------
    //   Transaction / Commit
    // --------------------------------------------------
    
    await session.commitTransaction(); // コミット
    console.log('--------コミット-----------');
    
    
    
    
    
    
    
    
    // --------------------------------------------------
    //   Database / Users 取得
    // --------------------------------------------------
    
    // returnObj.data.userObj = {
    //   'a8b0gX6lMIz': {
    //     name: 'あづみデッドバイデイライト',
    //     status: 'プロハンター',
    //     playerId: 'az1979',
    //     playerPage: '/ur/az1979',
    //     level: 999,
    //     accessDate: '2018-08-06T08:50:00Z',
    //     cardPlayerObj: {
    //       age: '2002-10-19T00:00:00Z',
    //       sex: 'male',
    //     },
    //     cardGameObj: {
    //       'reaBMD4W6': {
    //         age: '2002-10-19T00:00:00Z',
    //         sex: 'male',
    //       }
    //     }
    //   }
    // };
    
    
    
    
    // ---------------------------------------------
    //   Return Json Object / Success
    // ---------------------------------------------
    
    return res.status(200).json(returnObj);
    
    
  } catch (error) {
    
    // console.log(chalk`
    //   error.message: {red ${error.message}}
    // `);
    
    
    // --------------------------------------------------
    //   Transaction / Rollback
    // --------------------------------------------------
    
    await session.abortTransaction();
    console.log('--------ロールバック-----------');
    
    
    
    
    
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
    
  } finally {
    
    await session.endSession();
    
  }
  
});


module.exports = router;