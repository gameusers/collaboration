// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';


// ---------------------------------------------
//   Model
// ---------------------------------------------

// import ModelGameCommunities from 'app/@database/game-communities/model.js';
// import ModelHardwares from 'app/@database/hardwares/model.js';
// import ModelFeeds from 'app/@database/feeds/model.js';
import ModelGameGenres from 'app/@database/game-genres/model.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { returnErrorsArr } from 'app/@modules/log/log.js';
// import { CustomError } from 'app/@modules/error/custom.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

// import { validationInteger } from 'app/@validations/integer.js';
// import { validationKeyword } from 'app/@validations/keyword.js';

// import { validationGameCommunitiesListLimit } from 'app/@database/game-communities/validations/limit.js';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { locale } from 'app/@locales/locale.js';


// ---------------------------------------------
//   API
// ---------------------------------------------

// import { initialProps } from 'app/@api/v2/common.js';






// --------------------------------------------------
//   endpointID: Y4zdMtBkP
// --------------------------------------------------

export default async (req, res) => {


  // --------------------------------------------------
  //   Status Code
  // --------------------------------------------------

  let statusCode = 400;


  // --------------------------------------------------
  //   Property
  // --------------------------------------------------

  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  const returnObj = {};


  // --------------------------------------------------
  //   Language & IP & User Agent
  // --------------------------------------------------

  const acceptLanguage = lodashGet(req, ['headers', 'accept-language'], '');
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = lodashGet(req, ['headers', 'user-agent'], '');


  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------

  const localeObj = locale({
    acceptLanguage
  });




  try {


    // --------------------------------------------------
    //   GET Data
    // --------------------------------------------------

    // const page = parseInt(lodashGet(req, ['query', 'page'], 1), 10);
    // const limit = parseInt(lodashGet(req, ['query', 'limit'], ''), 10);
    // const hardwares = lodashGet(req, ['query', 'hardwares'], '');
    // const keyword = lodashGet(req, ['query', 'keyword'], '');

    // lodashSet(requestParametersObj, ['page'], page);
    // lodashSet(requestParametersObj, ['limit'], limit);
    // lodashSet(requestParametersObj, ['hardwares'], hardwares);
    // lodashSet(requestParametersObj, ['keyword'], keyword);




    // --------------------------------------------------
    //   Language & Country
    // --------------------------------------------------

    const language = lodashGet(localeObj, ['language'], '');
    const country = lodashGet(localeObj, ['country'], '');




    // --------------------------------------------------
    //   DB find / Genres
    // --------------------------------------------------

    returnObj.gameGenresArr = await ModelGameGenres.find({

      conditionObj: {
        language,
        country,
      }

    });




    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------

    // console.log(`
    //   ----------------------------------------\n
    //   pages/api/v2/gc/list/get-register-data.js
    // `);

    // console.log(chalk`
    // page: {green ${page}}
    // limit: {green ${limit}}
    // hardwares: {green ${hardwares}}
    // keyword: {green ${keyword}}
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
      endpointID: 'Y4zdMtBkP',
      users_id: loginUsers_id,
      ip,
      userAgent,
      requestParametersObj,

    });


    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------

    return res.status(statusCode).json(resultErrorObj);


  }


};
