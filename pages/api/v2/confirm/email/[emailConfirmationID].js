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
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');
const lodashHas = require('lodash/has');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelEmailConfirmations = require('../../../../../app/@database/email-confirmations/model');
const ModelUsers = require('../../../../../app/@database/users/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { returnErrorsArr } = require('../../../../../app/@modules/log/log');
const { CustomError } = require('../../../../../app/@modules/error/custom');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationIP } = require('../../../../../app/@validations/ip');
const { validationEmailConfirmationsEmailConfirmationIDServer } = require('../../../../../app/@database/email-confirmations/validations/email-confirmation-id-server');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');


// ---------------------------------------------
//   API
// ---------------------------------------------

const { initialProps } = require('../../../../../app/@api/v2/common');




// --------------------------------------------------
//   endpointID: YDW8_PLF3
// --------------------------------------------------

export default async (req, res) => {
  
  
  // --------------------------------------------------
  //   Status Code / 400ではなく404にしている 
  // --------------------------------------------------
  
  let statusCode = 404;
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const returnObj = {
    cardsArr: [],
  };
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   GET Data
    // --------------------------------------------------
    
    const emailConfirmationID = req.query.emailConfirmationID;
    
    lodashSet(requestParametersObj, ['emailConfirmationID'], emailConfirmationID);
    
    
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    await validationIP({ throwError: true, value: req.ip });
    await validationEmailConfirmationsEmailConfirmationIDServer({ value: emailConfirmationID, loginUsers_id });
    
    
    
    
    // --------------------------------------------------
    //   Common Initial Props
    // --------------------------------------------------
    
    const commonInitialPropsObj = await initialProps({ req, res, localeObj });
    
    returnObj.login = lodashGet(commonInitialPropsObj, ['login'], false);
    returnObj.loginUsersObj = lodashGet(commonInitialPropsObj, ['loginUsersObj'], {});
    returnObj.headerObj = lodashGet(commonInitialPropsObj, ['headerObj'], {});
    
    
    
    
    // --------------------------------------------------
    //   DB findOne / Email Confirmations
    // --------------------------------------------------
    
    const docEmailConfirmationsObj = await ModelEmailConfirmations.findOne({
      
      conditionObj: {
        emailConfirmationID,
        isSuccess: false,
      }
      
    });
    
    const createdDate = lodashGet(docEmailConfirmationsObj, ['createdDate'], '');
    const email = lodashGet(docEmailConfirmationsObj, ['email'], '');
    const users_id = lodashGet(docEmailConfirmationsObj, ['users_id'], '');
    
    
    // --------------------------------------------------
    //   DB findOne / Users
    // --------------------------------------------------
    
    const docUsersCount = await ModelUsers.count({
      
      conditionObj: {
        _id: loginUsers_id,
        'emailObj.value': email,
      }
      
    });
    
    
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、エラー
    // --------------------------------------------------
    
    if (!createdDate || !email || !users_id || docUsersCount === 0) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: '8JJ4_hJyz', messageID: 'Error' }] });
    }
    
    
    // --------------------------------------------------
    //   24時間以内にアクセスしたかチェック
    // --------------------------------------------------
    
    const dateTimeLimit = moment(createdDate).utc().add(1, 'day');
    const dateTimeNow = moment().utc();
    
    if (dateTimeLimit.isBefore(dateTimeNow)) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'qmu7nkZxS', messageID: 'Error' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   Update
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   - Datetime
    // ---------------------------------------------
    
    const ISO8601 = moment().toISOString();
    
    
    // ---------------------------------------------
    //   - users
    // ---------------------------------------------
    
    const usersConditionObj = {
      _id: users_id,
      'emailObj.value': email,
    };
    
    const usersSaveObj = {
      $set: {
        updatedDate: ISO8601,
        emailObj: {
          value: email,
          confirmation: true,
        },
        
      }
    };
    
    
    // ---------------------------------------------
    //   - email-confirmations
    // ---------------------------------------------
    
    const emailConfirmationsConditionObj = {
      emailConfirmationID,
    };
    
    const emailConfirmationsSaveObj = {
      $set: {
        isSuccess: true,
      }
    };
    
    
    // ---------------------------------------------
    //   - transaction
    // ---------------------------------------------
    
    await ModelEmailConfirmations.transactionForEmailConfirmation({
      
      usersConditionObj,
      usersSaveObj,
      emailConfirmationsConditionObj,
      emailConfirmationsSaveObj,
      
    });
      
      
    
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/confirm/email/[emailConfirmationID].js
    // `);
    
    // console.log(chalk`
    //   emailConfirmationID: {green ${emailConfirmationID}}
    //   docUsersCount: {green ${docUsersCount}}
    // `);
    
    // console.log(`
    //   ----- docEmailConfirmationsObj -----\n
    //   ${util.inspect(docEmailConfirmationsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- usersConditionObj -----\n
    //   ${util.inspect(usersConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- usersSaveObj -----\n
    //   ${util.inspect(usersSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- emailConfirmationsConditionObj -----\n
    //   ${util.inspect(emailConfirmationsConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- emailConfirmationsSaveObj -----\n
    //   ${util.inspect(emailConfirmationsSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
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
      endpointID: 'YDW8_PLF3',
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