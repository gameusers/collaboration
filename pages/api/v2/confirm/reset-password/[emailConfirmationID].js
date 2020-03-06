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
//   endpointID: pcxJ8fHJu
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
    await validationEmailConfirmationsEmailConfirmationIDServer({ value: emailConfirmationID });
    
    
    
    
    // --------------------------------------------------
    //   Common Initial Props
    // --------------------------------------------------
    
    const commonInitialPropsObj = await initialProps({ req, res, localeObj });
    
    returnObj.login = lodashGet(commonInitialPropsObj, ['login'], false);
    returnObj.loginUsersObj = lodashGet(commonInitialPropsObj, ['loginUsersObj'], {});
    returnObj.headerObj = lodashGet(commonInitialPropsObj, ['headerObj'], {});
    
    
    
    
    // --------------------------------------------------
    //   30分前の時間を取得し、その時間内にアクセスしたかチェック
    // --------------------------------------------------
    
    const dateTimeLimit = moment().utc().add(-30, 'minutes').toISOString();
    
    
    // --------------------------------------------------
    //   DB findOne / Email Confirmations
    // --------------------------------------------------
    
    const docEmailConfirmationsObj = await ModelEmailConfirmations.findOne({
      
      conditionObj: {
        emailConfirmationID,
        createdDate: { $gte: dateTimeLimit },
        type: 'password',
        isSuccess: false,
      }
      
    });
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、エラー
    // --------------------------------------------------
    
    if (!docEmailConfirmationsObj) {
      throw new CustomError({ level: 'warn', errorsArr: [{ code: 'k2tZAvdLe', messageID: 'Error' }] });
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    console.log(`
      ----------------------------------------\n
      /pages/api/v2/confirm/reset-password/[emailConfirmationID].js
    `);
    
    console.log(chalk`
      emailConfirmationID: {green ${emailConfirmationID}}
      dateTimeLimit: {green ${dateTimeLimit}}
    `);
    
    console.log(`
      ----- docEmailConfirmationsObj -----\n
      ${util.inspect(docEmailConfirmationsObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
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
      endpointID: 'pcxJ8fHJu',
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