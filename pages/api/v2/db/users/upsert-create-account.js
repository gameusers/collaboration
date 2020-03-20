// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const moment = require('moment');
const shortid = require('shortid');
const bcrypt = require('bcryptjs');
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelUsers = require('../../../../../app/@database/users/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../../../app/@modules/csrf');
const { verifyRecaptcha } = require('../../../../../app/@modules/recaptcha');
const { returnErrorsArr } = require('../../../../../app/@modules/log/log');
const { CustomError } = require('../../../../../app/@modules/error/custom');
const { encrypt }  = require('../../../../../app/@modules/crypto');
const { sendMailConfirmation } = require('../../../../../app/@modules/email');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationIP } = require('../../../../../app/@validations/ip');
const { validationUsersLoginIDServer } = require('../../../../../app/@database/users/validations/login-id-server');
const { validationUsersLoginPassword } = require('../../../../../app/@database/users/validations/login-password');
const { validationUsersEmailServer } = require('../../../../../app/@database/users/validations/email-server');




// --------------------------------------------------
//   endpointID: fmVLqHFfj
// --------------------------------------------------

export default async (req, res) => {
  
  
  // --------------------------------------------------
  //   Status Code
  // --------------------------------------------------
  
  let statusCode = 400;
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const returnObj = {};
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const bodyObj = JSON.parse(req.body);
    
    const { 
      
      loginID,
      loginPassword,
      email,
      response,
      
    } = bodyObj;
    
    
    // --------------------------------------------------
    //   Log Data
    // --------------------------------------------------
    
    lodashSet(requestParametersObj, ['loginUsers_id'], loginUsers_id);
    lodashSet(requestParametersObj, ['loginID'], loginID ? '******' : '');
    lodashSet(requestParametersObj, ['loginPassword'], loginPassword ? '******' : '');
    lodashSet(requestParametersObj, ['email'], email ? '******' : '');
    lodashSet(requestParametersObj, ['response'], response ? '******' : '');
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    // ---------------------------------------------
    //   Verify reCAPTCHA
    // ---------------------------------------------
    
    await verifyRecaptcha({ response, remoteip: req.connection.remoteAddress });
    
    
    
    
    // --------------------------------------------------
    //   Login Check / ログイン状態ではアカウントを作成させない
    // --------------------------------------------------
    
    if (req.isAuthenticated()) {
      statusCode = 403;
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'Pc90koKsJ', messageID: 'xLLNIpo6a' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Encrypt E-Mail
    // --------------------------------------------------
    
    const encryptedEmail = email ? encrypt(email) : '';
    
    
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    await validationIP({ throwError: true, value: req.ip });
    await validationUsersLoginIDServer({ value: loginID, loginUsers_id });
    await validationUsersLoginPassword({ throwError: true, required: true, value: loginPassword, loginID });
    await validationUsersEmailServer({ value: email, loginUsers_id, encryptedEmail });
    
    
    
    
    // --------------------------------------------------
    //   Hash Password
    // --------------------------------------------------
    
    const hashedPassword = bcrypt.hashSync(loginPassword, 10);
    
    
    
    
    // --------------------------------------------------
    //   Update
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   - 
    // ---------------------------------------------
    
    const ISO8601 = moment().utc().toISOString();
    const users_id = shortid.generate();
    const userID = shortid.generate();
    const emailConfirmationID = `${shortid.generate()}${shortid.generate()}${shortid.generate()}`;
    
    
    // ---------------------------------------------
    //   - users
    // ---------------------------------------------
    
    const usersConditionObj = {
      _id: users_id
    };
    
    const usersSaveObj = {
      
      // _id: users_id,
      createdDate: ISO8601,
      updatedDate: ISO8601,
      accessDate: ISO8601,
      userID,
      pagesObj: {
        imagesAndVideos_id: '',
        arr: [],
      },
      loginID,
      loginPassword: hashedPassword,
      emailObj: {
        value: encryptedEmail,
        confirmation: false,
      },
      countriesArr: ['JP'],
      termsOfServiceConfirmedDate: ISO8601,
      exp: 0,
      achievementsArr: [],
      role: 'user',
      
    };
    
    
    // ---------------------------------------------
    //   - card-players
    // ---------------------------------------------
    
    const cardPlayersConditionObj = {
      _id: shortid.generate()
    };
    
    const cardPlayersSaveObj = {
      
      // _id: shortid.generate(),
      createdDate: ISO8601,
      updatedDate: ISO8601,
      users_id,
      language: 'ja',
      nameObj: {
        value: 'Name',
        search: true,
      },
      statusObj: {
        value: 'Status',
        search: true,
      },
      imagesAndVideos_id: '',
      imagesAndVideosThumbnail_id: '',
      commentObj: {
        value: '',
        search: true,
      },
      ageObj: {
        value: '',
        alternativeText: '',
        search: true,
      },
      sexObj: {
        value: '',
        alternativeText: '',
        search: true,
      },
      addressObj: {
        value: '',
        alternativeText: '',
        search: true,
      },
      gamingExperienceObj: {
        value: '',
        alternativeText: '',
        search: true,
      },
      hobbiesObj: {
        valueArr: [],
        search: true,
      },
      specialSkillsObj: {
        valueArr: [],
        search: true,
      },
      smartphoneObj: {
        model: '',
        comment: '',
        search: true,
      },
      tabletObj: {
        model: '',
        comment: '',
        search: true,
      },
      pcObj: {
        model: '',
        comment: '',
        specsObj: {
          os: '',
          cpu: '',
          cpuCooler: '',
          motherboard: '',
          memory: '',
          storage: '',
          graphicsCard: '',
          opticalDrive: '',
          powerSupply: '',
          pcCase: '',
          monitor: '',
          mouse: '',
          keyboard: ''
        },
        search: true,
      },
      hardwareActiveObj: {
        valueArr: [],
        search: true,
      },
      hardwareInactiveObj: {
        valueArr: [],
        search: true,
      },
      ids_idArr: [],
      activityTimeObj: {
        valueArr: [],
        search: true,
      },
      lookingForFriendsObj: {
        value: true,
        icon: 'emoji_u263a',
        comment: '',
        search: true,
      },
      voiceChatObj: {
        value: true,
        comment: '',
        search: true,
      },
      linkArr: [],
      
    };
    
    
    // ---------------------------------------------
    //   - follows
    // ---------------------------------------------
    
    const followsConditionObj = {
      _id: shortid.generate()
    };
    
    const followsSaveObj = {
      
      // _id: shortid.generate(),
      updatedDate: ISO8601,
      gameCommunities_id: '',
      userCommunities_id: '',
      users_id,
      approval: false,
      followArr: [],
      followCount: 0,
      followedArr: [],
      followedCount: 0,
      approvalArr: [],
      approvalCount: 0,
      blockArr: [],
      blockCount: 0,
      
    };
    
    
    // ---------------------------------------------
    //   - email-confirmations
    // ---------------------------------------------
    
    let emailConfirmationsConditionObj = {};
    let emailConfirmationsSaveObj = {};
    
    if (email) {
      
      emailConfirmationsConditionObj = {
        _id: shortid.generate()
      };
      
      emailConfirmationsSaveObj = {
        
        // _id: shortid.generate(),
        createdDate: ISO8601,
        users_id,
        emailConfirmationID,
        type: 'email',
        email: encryptedEmail,
        count: 1,
        isSuccess: false,
        ip: req.ip,
        userAgent: lodashGet(req, ['headers', 'user-agent'], ''),
        
      };
      
    }
    
    
    // ---------------------------------------------
    //   Insert
    // ---------------------------------------------
    
    await ModelUsers.transactionForUpsert({
      
      usersConditionObj,
      usersSaveObj,
      cardPlayersConditionObj,
      cardPlayersSaveObj,
      followsConditionObj,
      followsSaveObj,
      emailConfirmationsConditionObj,
      emailConfirmationsSaveObj,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   確認メール送信
    // --------------------------------------------------
    
    sendMailConfirmation({
      to: email,
      emailConfirmationID,
    });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/db/users/upsert-create-account.js
    // `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   loginID: {green ${loginID}}
    //   loginPassword: {green ${loginPassword}}
    //   email: {green ${email}}
    //   response: {green ${response}}
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosObj -----\n
    //   ${util.inspect(imagesAndVideosObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // ---------------------------------------------
    //   Success
    // ---------------------------------------------
    
    return res.status(200).json(returnObj);
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   Log
    // ---------------------------------------------
    
    const resultErrorObj = returnErrorsArr({
      errorObj,
      endpointID: 'fmVLqHFfj',
      users_id: loginUsers_id,
      ip: req.ip,
      requestParametersObj,
    });
    
    
    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------
    
    return res.status(statusCode).json(resultErrorObj);
    
    
  }
  
  
};