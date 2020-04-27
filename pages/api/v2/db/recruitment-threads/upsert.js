// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import shortid from 'shortid';
import moment from 'moment';

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';


// ---------------------------------------------
//   Model
// ---------------------------------------------

import ModelRecruitmentThreads from '../../../../../app/@database/recruitment-threads/model';
import ModelUsers from '../../../../../app/@database/users/model';
import ModelGameCommunities from '../../../../../app/@database/game-communities/model';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { verifyCsrfToken } from '../../../../../app/@modules/csrf';
import { returnErrorsArr } from '../../../../../app/@modules/log/log';
import { CustomError } from '../../../../../app/@modules/error/custom';
import { formatAndSave } from '../../../../../app/@modules/image/save';
import { setAuthority } from '../../../../../app/@modules/authority';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationIP } from '../../../../../app/@validations/ip';
import { validationBoolean } from '../../../../../app/@validations/boolean';

import { validationGameCommunities_idServer } from '../../../../../app/@database/game-communities/validations/_id-server';
import { validationHardwareIDsArrServer } from '../../../../../app/@database/hardwares/validations/id-server';
import { validationIDsArrServer } from '../../../../../app/@database/ids/validations/_id-server';
import { validationUsersWebPushSubscriptionObjEndpointServer, validationUsersWebPushSubscriptionObjKeysP256dhServer, validationUsersWebPushSubscriptionObjKeysAuthServer } from '../../../../../app/@database/users/validations/web-push-server';

import { validationRecruitmentThreadsCategory } from '../../../../../app/@database/recruitment-threads/validations/category';
import { validationRecruitmentThreadsTitle } from '../../../../../app/@database/recruitment-threads/validations/title';
import { validationRecruitmentThreadsName } from '../../../../../app/@database/recruitment-threads/validations/name';
import { validationRecruitmentThreadsComment } from '../../../../../app/@database/recruitment-threads/validations/comment';
import { validationRecruitmentThreadsPlatform, validationRecruitmentThreadsID, validationRecruitmentThreadsInformationTitle, validationRecruitmentThreadsInformation, validationRecruitmentThreadsPublicSetting } from '../../../../../app/@database/recruitment-threads/validations/ids-informations';
import { validationRecruitmentThreadsDeadlineDate } from '../../../../../app/@database/recruitment-threads/validations/deadline';
import { validationRecruitmentThreadsLimit } from '../../../../../app/@database/recruitment-threads/validations/limit';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { locale } from '../../../../../app/@locales/locale';




// --------------------------------------------------
//   endpointID: muKeCPjlC
// --------------------------------------------------

export default async (req, res) => {
  
  
  // --------------------------------------------------
  //   Status Code
  // --------------------------------------------------
  
  let statusCode = 400;
  
  
  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------
  
  const localeObj = locale({
    acceptLanguage: req.headers['accept-language']
  });
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const returnObj = {};
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');
  
  
  // --------------------------------------------------
  //   IP & User Agent
  // --------------------------------------------------
  
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = lodashGet(req, ['headers', 'user-agent'], '');
  
  
  
  
  try {
    
    
    // --------------------------------------------------
    //   POST Data
    // --------------------------------------------------
    
    const bodyObj = JSON.parse(req.body);
    
    const { 
      
      gameCommunities_id,
      recruitmentThreads_id,
      hardwareIDsArr,
      category,
      title,
      comment,
      imagesAndVideosObj,
      // anonymity,
      // ids_idsArr,
      // platform1,
      // platform2,
      // platform3,
      // id1,
      // id2,
      // id3,
      informationTitle1,
      informationTitle2,
      informationTitle3,
      informationTitle4,
      informationTitle5,
      information1,
      information2,
      information3,
      information4,
      information5,
      // publicSetting,
      // deadlineDate,
      // webPushSubscriptionObj,
      twitter,
      webPush,
      threadLimit,
      commentLimit,
      replyLimit,
      
    } = bodyObj;
    
    
    let { 
      
      name,
      idsArr,
      platform1,
      platform2,
      platform3,
      id1,
      id2,
      id3,
      publicSetting,
      deadlineDate,
      webPushSubscriptionObj,
      
    } = bodyObj;
    
    
    lodashSet(requestParametersObj, ['gameCommunities_id'], gameCommunities_id);
    lodashSet(requestParametersObj, ['recruitmentThreads_id'], recruitmentThreads_id);
    lodashSet(requestParametersObj, ['hardwareIDsArr'], hardwareIDsArr);
    lodashSet(requestParametersObj, ['category'], category);
    lodashSet(requestParametersObj, ['title'], title);
    lodashSet(requestParametersObj, ['name'], name);
    lodashSet(requestParametersObj, ['comment'], comment);
    lodashSet(requestParametersObj, ['imagesAndVideosObj'], {});
    lodashSet(requestParametersObj, ['idsArr'], idsArr);
    lodashSet(requestParametersObj, ['platform1'], platform1);
    lodashSet(requestParametersObj, ['platform2'], platform2);
    lodashSet(requestParametersObj, ['platform3'], platform3);
    lodashSet(requestParametersObj, ['id1'], id1);
    lodashSet(requestParametersObj, ['id2'], id2);
    lodashSet(requestParametersObj, ['id3'], id3);
    lodashSet(requestParametersObj, ['informationTitle1'], informationTitle1);
    lodashSet(requestParametersObj, ['informationTitle2'], informationTitle2);
    lodashSet(requestParametersObj, ['informationTitle3'], informationTitle3);
    lodashSet(requestParametersObj, ['informationTitle4'], informationTitle4);
    lodashSet(requestParametersObj, ['informationTitle5'], informationTitle5);
    lodashSet(requestParametersObj, ['information1'], information1);
    lodashSet(requestParametersObj, ['information2'], information2);
    lodashSet(requestParametersObj, ['information3'], information3);
    lodashSet(requestParametersObj, ['information4'], information4);
    lodashSet(requestParametersObj, ['information5'], information5);
    lodashSet(requestParametersObj, ['publicSetting'], publicSetting);
    lodashSet(requestParametersObj, ['deadlineDate'], deadlineDate);
    lodashSet(requestParametersObj, ['webPush'], webPush);
    lodashSet(requestParametersObj, ['webPushSubscriptionObj'], {});
    lodashSet(requestParametersObj, ['twitter'], twitter);
    lodashSet(requestParametersObj, ['threadLimit'], threadLimit);
    lodashSet(requestParametersObj, ['commentLimit'], commentLimit);
    lodashSet(requestParametersObj, ['replyLimit'], replyLimit);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    
    
    // --------------------------------------------------
    //   webPushSubscriptionObj
    // --------------------------------------------------
    
    const endpoint = lodashGet(webPushSubscriptionObj, ['endpoint'], '');
    const p256dh = lodashGet(webPushSubscriptionObj, ['keys', 'p256dh'], '');
    const auth = lodashGet(webPushSubscriptionObj, ['keys', 'auth'], '');
    
    
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    await validationIP({ throwError: true, value: ip });
    
    await validationGameCommunities_idServer({ value: gameCommunities_id });
    await validationHardwareIDsArrServer({ throwError: true, arr: hardwareIDsArr });
    await validationRecruitmentThreadsCategory({ throwError: true, value: category });
    await validationRecruitmentThreadsTitle({ throwError: true, value: title });
    await validationRecruitmentThreadsName({ throwError: true, value: name });
    await validationRecruitmentThreadsComment({ throwError: true, value: comment });
    
    await validationRecruitmentThreadsInformationTitle({ throwError: true, value: informationTitle1 });
    await validationRecruitmentThreadsInformationTitle({ throwError: true, value: informationTitle2 });
    await validationRecruitmentThreadsInformationTitle({ throwError: true, value: informationTitle3 });
    await validationRecruitmentThreadsInformationTitle({ throwError: true, value: informationTitle4 });
    await validationRecruitmentThreadsInformationTitle({ throwError: true, value: informationTitle5 });
    
    await validationRecruitmentThreadsInformation({ throwError: true, value: information1 });
    await validationRecruitmentThreadsInformation({ throwError: true, value: information2 });
    await validationRecruitmentThreadsInformation({ throwError: true, value: information3 });
    await validationRecruitmentThreadsInformation({ throwError: true, value: information4 });
    await validationRecruitmentThreadsInformation({ throwError: true, value: information5 });
    
    await validationRecruitmentThreadsPublicSetting({ throwError: true, value: publicSetting });
    await validationRecruitmentThreadsDeadlineDate({ throwError: true, value: deadlineDate });
    
    await validationUsersWebPushSubscriptionObjEndpointServer({ value: endpoint });
    await validationUsersWebPushSubscriptionObjKeysP256dhServer({ value: p256dh });
    await validationUsersWebPushSubscriptionObjKeysAuthServer({ value: auth });
    
    await validationBoolean({ throwError: true, value: webPush });
    await validationBoolean({ throwError: true, value: twitter });
    
    await validationRecruitmentThreadsLimit({ throwError: true, required: true, value: threadLimit });
    // await validationForumCommentsLimit({ throwError: true, required: true, value: commentLimit });
    // await validationForumRepliesLimit({ throwError: true, required: true, value: replyLimit });
    
    // console.log(`
    //   ----- ids_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(ids_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   ID
    // --------------------------------------------------
    
    let validatedIDsArrObj = {};
    
    if (loginUsers_id) {
      
      validatedIDsArrObj = await validationIDsArrServer({ valueArr: idsArr, loginUsers_id });
      
    } else {
      
      await validationRecruitmentThreadsPlatform({ throwError: true, value: platform1 });
      await validationRecruitmentThreadsPlatform({ throwError: true, value: platform2 });
      await validationRecruitmentThreadsPlatform({ throwError: true, value: platform3 });
      
      await validationRecruitmentThreadsID({ throwError: true, value: id1 });
      await validationRecruitmentThreadsID({ throwError: true, value: id2 });
      await validationRecruitmentThreadsID({ throwError: true, value: id3 });
      
    }
    
    
    
    
    // --------------------------------------------------
    //   スレッドが存在するかチェック
    // --------------------------------------------------
    
    let oldImagesAndVideosObj = {};
    
    
    // --------------------------------------------------
    //   編集の場合
    // --------------------------------------------------
    
    if (recruitmentThreads_id) {
      
      
      // --------------------------------------------------
      //   データが存在しない　【編集権限】がない場合はエラーが投げられる
      // --------------------------------------------------
      
      const tempOldObj = await ModelRecruitmentThreads.findOneForEdit({
        
        req,
        localeObj,
        loginUsers_id,
        recruitmentThreads_id,
        
      });
      
      // console.log(`
      //   ----- tempOldObj -----\n
      //   ${util.inspect(tempOldObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      oldImagesAndVideosObj = lodashGet(tempOldObj, ['imagesAndVideosObj'], {});
      
      
    // --------------------------------------------------
    //   新規の場合
    // --------------------------------------------------
      
    } else {
      
      
      // --------------------------------------------------
      //   同じ名前のスレッドが存在するかチェック
      //   count が 0 の場合は、同じ名前のスレッドは存在しない
      // --------------------------------------------------
      
      const count = await ModelRecruitmentThreads.count({
        
        conditionObj: {
          gameCommunities_id,
          'localesArr.name': name,
        }
        
      });
      
      // console.log(chalk`
      //   count: {green ${count}}
      // `);
      
      if (count > 0) {
        throw new CustomError({ level: 'warn', errorsArr: [{ code: 'PlYmFNcUT', messageID: '8ObqNYJ85' }] });
      }
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    const ISO8601 = moment().utc().toISOString();
    
    
    
    
    // --------------------------------------------------
    //   deadlineDate / 締切日
    // --------------------------------------------------
    
    if (deadlineDate) {
      deadlineDate = moment(deadlineDate).utc().toISOString();
      // deadlineDate = moment(deadlineDate).utc().add(1, 'day').toISOString();
    }
    
    
    
    
    // --------------------------------------------------
    //   値の強制：ログインしている場合
    // --------------------------------------------------
    
    let ids_idsArr = [];
    
    if (loginUsers_id) {
      
      name = '';
      
      // Validationで有効なIDだけが抽出される
      ids_idsArr = lodashGet(validatedIDsArrObj, ['valueArr'], []);
      
      platform1 = '';
      platform2 = '';
      platform3 = '';
      id1 = '';
      id2 = '';
      id3 = '';
      
      
    // --------------------------------------------------
    //   値の強制：ログインしていない場合
    // --------------------------------------------------
      
    } else {
      
      ids_idsArr = [];
      publicSetting = 1;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   ID / publicIDsArr
    // --------------------------------------------------
    
    const publicIDsArr = [];
    
    if (platform1 && id1) {
      
      publicIDsArr.push({
        _id: shortid.generate(),
        platform: platform1,
        id: id1,
      });
      
    }
    
    if (platform2 && id2) {
      
      publicIDsArr.push({
        _id: shortid.generate(),
        platform: platform2,
        id: id2,
      });
      
    }
    
    if (platform3 && id3) {
      
      publicIDsArr.push({
        _id: shortid.generate(),
        platform: platform3,
        id: id3,
      });
      
    }
    
    
    // --------------------------------------------------
    //   情報 / publicInformationsArr
    // --------------------------------------------------
    
    const publicInformationsArr = [];
    
    if (informationTitle1 && information1) {
      
      publicInformationsArr.push({
        _id: shortid.generate(),
        title: informationTitle1,
        information: information1,
      });
      
    }
    
    if (informationTitle2 && information2) {
      
      publicInformationsArr.push({
        _id: shortid.generate(),
        title: informationTitle2,
        information: information2,
      });
      
    }
    
    if (informationTitle3 && information3) {
      
      publicInformationsArr.push({
        _id: shortid.generate(),
        title: informationTitle3,
        information: information3,
      });
      
    }
    
    if (informationTitle4 && information4) {
      
      publicInformationsArr.push({
        _id: shortid.generate(),
        title: informationTitle4,
        information: information4,
      });
      
    }
    
    if (informationTitle5 && information5) {
      
      publicInformationsArr.push({
        _id: shortid.generate(),
        title: informationTitle5,
        information: information5,
      });
      
    }
    
    
    
    
    // --------------------------------------------------
    //   webPushSubscriptionObj
    // --------------------------------------------------
    
    webPushSubscriptionObj = {
      endpoint,
      keys: {
        p256dh,
        auth,
      }
    };
    
    
    
    
    // --------------------------------------------------
    //   画像と動画の処理
    // --------------------------------------------------
    
    let imagesAndVideosConditionObj = {};
    let imagesAndVideosSaveObj = {};
    let imagesAndVideos_id = '';
    let images = 0;
    let videos = 0;
    
    if (imagesAndVideosObj) {
      
      
      // --------------------------------------------------
      //   画像を保存する
      // --------------------------------------------------
      
      const formatAndSaveObj = await formatAndSave({
        
        newObj: imagesAndVideosObj,
        oldObj: oldImagesAndVideosObj,
        loginUsers_id,
        ISO8601,
        
      });
      
      
      // --------------------------------------------------
      //   imagesAndVideosSaveObj
      // --------------------------------------------------
      
      imagesAndVideosSaveObj = lodashGet(formatAndSaveObj, ['imagesAndVideosObj'], {});
      
      
      // --------------------------------------------------
      //   画像数＆動画数
      // --------------------------------------------------
      
      images = lodashGet(formatAndSaveObj, ['images'], 0);
      videos = lodashGet(formatAndSaveObj, ['videos'], 0);
      
      
      // --------------------------------------------------
      //   画像＆動画がすべて削除されている場合は、imagesAndVideos_idを空にする
      // --------------------------------------------------
      
      const arr = lodashGet(imagesAndVideosSaveObj, ['arr'], []);
      
      if (arr.length === 0) {
        imagesAndVideos_id = '';
      } else {
        imagesAndVideos_id = lodashGet(imagesAndVideosSaveObj, ['_id'], '');
      }
      
      
      // --------------------------------------------------
      //   imagesAndVideosConditionObj
      // --------------------------------------------------
      
      imagesAndVideosConditionObj = {
        _id: lodashGet(imagesAndVideosSaveObj, ['_id'], ''),
      };
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Insert
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   - recruitment-threads
    // ---------------------------------------------
    
    const recruitmentThreadsConditionObj = {
      _id: shortid.generate(),
    };
    
    
    const recruitmentThreadsSaveObj = {
      
      createdDate: ISO8601,
      updatedDate: ISO8601,
      gameCommunities_id,
      users_id: loginUsers_id,
      hardwareIDsArr,
      category,
      localesArr: [
        {
          _id: shortid.generate(),
          language: localeObj.language,
          title,
          name,
          comment,
        }
      ],
      imagesAndVideos_id,
      ids_idsArr,
      publicIDsArr,
      publicInformationsArr,
      publicSetting,
      deadlineDate,
      close: false,
      webPush,
      webPushSubscriptionObj,
      publicCommentsUsers_idsArr: [],
      publicApprovalUsers_idsArrr: [],
      comments: 0,
      replies: 0,
      images,
      videos,
      ip,
      userAgent,
      
    };
    
    
    // ---------------------------------------------
    //   - game-communities / 更新日時の変更＆スレッド数 + 1
    // ---------------------------------------------
    
    const gameCommunitiesConditionObj = {
      _id: gameCommunities_id,
    };
    
    
    const gameCommunitiesSaveObj = {
      
      updatedDate: ISO8601,
      'updatedDateObj.recruitment': ISO8601,
      $inc: { 'recruitmentObj.threadCount': 1 }
      
    };
    
    
    // ---------------------------------------------
    //   - users
    // ---------------------------------------------
    
    let usersConditionObj = {};
    let usersSaveObj = {};
    
    
    if (webPush && loginUsers_id) {
      
      const docUsersObj = await ModelUsers.findOne({
        
        conditionObj: {
          _id: loginUsers_id
        }
        
      });
      
      const usersEndpoint = lodashGet(docUsersObj, ['webPushSubscriptionObj', 'endpoint'], '');
      
      
      // ---------------------------------------------
      //   webPushSubscriptionObj を更新する
      // ---------------------------------------------
      
      if (!usersEndpoint) {
        
        usersConditionObj = {
          _id: loginUsers_id,
        };
        
        usersSaveObj = {
          $set: {
            updatedDate: ISO8601,
            webPushSubscriptionObj,
          }
        };
        
      }
      
      
      // ---------------------------------------------
      //   ログインしている場合
      //   recruitmentThreads の webPushSubscriptionObj は空にする
      // ---------------------------------------------
      
      recruitmentThreadsSaveObj.webPushSubscriptionObj = {
        endpoint: '',
        keys: {
          p256dh: '',
          auth: ''
        }
      };
      
      
      // console.log(`
      //   ----------------------------------------\n
      //   /pages/api/v2/db/recruitment-threads/upsert.js
      // `);
      
      // console.log(chalk`
      //   usersEndpoint: {green ${usersEndpoint}}
      // `);
      
      // console.log(`
      //   ----- docUsersObj -----\n
      //   ${util.inspect(docUsersObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
    }
    
    
    
    // --------------------------------------------------
    //   Update
    // --------------------------------------------------
    
    if (recruitmentThreads_id) {
      
      
      // ---------------------------------------------
      //   - forum-threads
      // ---------------------------------------------
      
      recruitmentThreadsConditionObj._id = recruitmentThreads_id;
      
      delete recruitmentThreadsSaveObj.createdDate;
      delete recruitmentThreadsSaveObj.gameCommunities_id;
      delete recruitmentThreadsSaveObj.users_id;
      delete recruitmentThreadsSaveObj.comments;
      delete recruitmentThreadsSaveObj.replies;
      delete recruitmentThreadsSaveObj.images;
      delete recruitmentThreadsSaveObj.videos;
      
      recruitmentThreadsSaveObj.$inc = { images, videos };
      
      
      // ---------------------------------------------
      //   - game-communities / 更新日時の変更
      // ---------------------------------------------
      
      delete gameCommunitiesSaveObj.$inc;
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   DB upsert Transaction
    // --------------------------------------------------
    
    await ModelRecruitmentThreads.transactionForUpsert({
      
      recruitmentThreadsConditionObj,
      recruitmentThreadsSaveObj,
      imagesAndVideosConditionObj,
      imagesAndVideosSaveObj,
      gameCommunitiesConditionObj,
      gameCommunitiesSaveObj,
      usersConditionObj,
      usersSaveObj,
      
    });
    
    
    
    
    // --------------------------------------------------
    //   Set Authority / 非ログインユーザーに時間制限のある編集権限を与える
    // --------------------------------------------------
    
    if (!loginUsers_id) {
      setAuthority({ req, _id: recruitmentThreadsConditionObj._id });
    }
    
    
    
    
    // --------------------------------------------------
    //   DB find / Recruitments
    // --------------------------------------------------
    
    const recruitmentObj = await ModelRecruitmentThreads.findRecruitments({
      
      req,
      localeObj,
      loginUsers_id,
      gameCommunities_id,
      threadPage: 1,
      threadLimit,
      commentPage: 1,
      commentLimit,
      replyPage: 1,
      replyLimit,
      
    });
    
    returnObj.recruitmentThreadsObj = recruitmentObj.recruitmentThreadsObj;
    returnObj.recruitmentCommentsObj = recruitmentObj.recruitmentCommentsObj;
    returnObj.recruitmentRepliesObj = recruitmentObj.recruitmentRepliesObj;
    
    
    // --------------------------------------------------
    //   updatedDateObj
    // --------------------------------------------------
    
    const gameCommunityArr = await ModelGameCommunities.find({
      
      conditionObj: {
        _id: gameCommunities_id
      }
      
    });
    
    const updatedDateObj = lodashGet(gameCommunityArr, [0, 'updatedDateObj'], {});
    
    returnObj.updatedDateObj = updatedDateObj;
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/api/v2/db/recruitment-threads/upsert.js
    // `);
    
    // console.log(`
    //   ----- hardwareIDsArr -----\n
    //   ${util.inspect(hardwareIDsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosObj -----\n
    //   ${util.inspect(imagesAndVideosObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
    //   category: {green ${category}}
    //   title: {green ${title}}
    //   name: {green ${name}}
    //   comment: {green ${comment}}
      
    //   platform1: {green ${platform1}}
    //   id1: {green ${id1}}
    //   platform2: {green ${platform2}}
    //   id2: {green ${id2}}
    //   platform3: {green ${platform3}}
    //   id3: {green ${id3}}
      
    //   informationTitle1: {green ${informationTitle1}}
    //   information1: {green ${information1}}
    //   informationTitle2: {green ${informationTitle2}}
    //   information2: {green ${information2}}
    //   informationTitle3: {green ${informationTitle3}}
    //   information3: {green ${information3}}
    //   informationTitle4: {green ${informationTitle4}}
    //   information4: {green ${information4}}
    //   informationTitle5: {green ${informationTitle5}}
    //   information5: {green ${information5}}
      
    //   publicSetting: {green ${publicSetting}}
      
    //   deadlineDate: {green ${deadlineDate}}
      
    //   twitter: {green ${twitter}}
    //   webPush: {green ${webPush}}
    // `);
    
    // return;
    
    
    
    
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
      endpointID: 'muKeCPjlC',
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




export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
};