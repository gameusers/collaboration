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
//   Validations
// ---------------------------------------------

import { validationInteger } from 'app/@validations/integer.js';
import { validationForumThreadsListLimit, validationForumThreadsLimit } from 'app/@database/forum-threads/validations/limit.js';
import { validationForumCommentsLimit, validationForumRepliesLimit } from 'app/@database/forum-comments/validations/limit.js';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { locale } from 'app/@locales/locale.js';


// ---------------------------------------------
//   API
// ---------------------------------------------

import { initialProps } from 'app/@api/v2/common.js';




// --------------------------------------------------
//   endpointID: KPtPfJA6f
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
    
    // const urlID = lodashGet(req, ['query', 'urlID'], '');
    // const forumID = lodashGet(req, ['query', 'forumID'], '');
    // const threadListPage = parseInt(lodashGet(req, ['query', 'threadListPage'], 1), 10);
    // const threadListLimit = parseInt(lodashGet(req, ['query', 'threadListLimit'], ''), 10);
    // const threadPage = parseInt(lodashGet(req, ['query', 'threadPage'], 1), 10);
    // const threadLimit = parseInt(lodashGet(req, ['query', 'threadLimit'], ''), 10);
    // const commentLimit = parseInt(lodashGet(req, ['query', 'commentLimit'], ''), 10);
    // const replyLimit = parseInt(lodashGet(req, ['query', 'replyLimit'], ''), 10);
    
    // lodashSet(requestParametersObj, ['urlID'], urlID);
    // lodashSet(requestParametersObj, ['forumID'], forumID);
    // lodashSet(requestParametersObj, ['threadListPage'], threadListPage);
    // lodashSet(requestParametersObj, ['threadListLimit'], threadListLimit);
    // lodashSet(requestParametersObj, ['threadPage'], threadPage);
    // lodashSet(requestParametersObj, ['threadLimit'], threadLimit);
    // lodashSet(requestParametersObj, ['commentLimit'], commentLimit);
    // lodashSet(requestParametersObj, ['replyLimit'], replyLimit);
    
    


    // --------------------------------------------------
    //   Common Initial Props
    // --------------------------------------------------
    
    const returnObj = await initialProps({ req, localeObj, getHeroImage: true });
    


    
    // --------------------------------------------------
    //   DB find / Feed Forum Game Community
    // --------------------------------------------------
    
    returnObj.feedObj = await ModelFeeds.findFeed({
      
      req,
      localeObj,
      loginUsers_id,
      type: 'gc',
      // gameCommunities_id,
      
    });
    
    
    // // ---------------------------------------------
    // //   - コミュニティのデータがない場合はエラー
    // // ---------------------------------------------
    
    // if (Object.keys(gameCommunityObj).length === 0) {
      
    //   statusCode = 404;
    //   throw new CustomError({ level: 'warn', errorsArr: [{ code: 'mb7-816Fu', messageID: 'Error' }] });
      
    // }
    
    
    // // ---------------------------------------------
    // //   - gameCommunities_id
    // // ---------------------------------------------
    
    // const gameCommunities_id = lodashGet(gameCommunityObj, ['gameCommunitiesObj', '_id'], '');
    
    
    // // ---------------------------------------------
    // //   - headerObj
    // // ---------------------------------------------
    
    // returnObj.headerObj = gameCommunityObj.headerObj;
    
    
    // // ---------------------------------------------
    // //   - gameCommunityObj
    // // ---------------------------------------------
    
    // returnObj.gameCommunityObj = gameCommunityObj.gameCommunitiesObj;
    
    
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   pages/api/v2/index/index.js
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
      endpointID: 'KPtPfJA6f',
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