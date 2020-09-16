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

import ModelGameCommunities from 'app/@database/game-communities/model.js';
import ModelFeeds from 'app/@database/feeds/model.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { returnErrorsArr } from 'app/@modules/log/log.js';
import { CustomError } from 'app/@modules/error/custom.js';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { locale } from 'app/@locales/locale.js';


// ---------------------------------------------
//   API
// ---------------------------------------------

import { initialProps } from 'app/@api/v2/common.js';






// --------------------------------------------------
//   endpointID: Q4XBgtXED
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
  // const loginUsersRole = lodashGet(req, ['user', 'role'], '');


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

    const page = parseInt(lodashGet(req, ['query', 'page'], 1), 10);
    const limit = parseInt(lodashGet(req, ['query', 'limit'], ''), 10);

    lodashSet(requestParametersObj, ['page'], page);
    lodashSet(requestParametersObj, ['limit'], limit);




    // --------------------------------------------------
    //   Common Initial Props
    // --------------------------------------------------

    const returnObj = await initialProps({ req, localeObj, getHeroImage: true });




    // --------------------------------------------------
    //   DB find / Game Community
    // --------------------------------------------------

    returnObj.gcListObj = await ModelGameCommunities.findGameList({

      localeObj,
      // page,
      // limit,

    });




    // --------------------------------------------------
    //   DB find / Feed
    // --------------------------------------------------

    returnObj.feedObj = await ModelFeeds.findFeed({

      localeObj,
      arr: ['all'],

    });





    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------

    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/gc/[urlID]/index.js
    // `);

    // console.log(chalk`
    //   urlID: {green ${urlID}}
    //   gameCommunities_id: {green ${gameCommunities_id}}
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
      endpointID: 'Q4XBgtXED',
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
