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

const shortid = require('shortid');
const moment = require('moment');

const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const ModelGameCommunities = require('../../../../../app/@database/game-communities/model');
const ModelRecruitmentThreads = require('../../../../../app/@database/recruitment-threads/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { verifyCsrfToken } = require('../../../../../app/@modules/csrf');
const { returnErrorsArr } = require('../../../../../app/@modules/log/log');
const { CustomError } = require('../../../../../app/@modules/error/custom');
const { formatAndSave } = require('../../../../../app/@modules/image/save');
const { setAuthority } = require('../../../../../app/@modules/authority');


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationIP } = require('../../../../../app/@validations/ip');
const { validationBoolean } = require('../../../../../app/@validations/boolean');

const { validationGameCommunities_idServer } = require('../../../../../app/@database/game-communities/validations/_id-server');
const { validationHardwareIDsArrServer } = require('../../../../../app/@database/hardwares/validations/id-server');
const { validationIDs_idArrServer } = require('../../../../../app/@database/ids/validations/_id-server');

const { validationRecruitmentThreadsCategory } = require('../../../../../app/@database/recruitment-threads/validations/category');
const { validationRecruitmentThreadsTitle } = require('../../../../../app/@database/recruitment-threads/validations/title');
const { validationRecruitmentThreadsName } = require('../../../../../app/@database/recruitment-threads/validations/name');
const { validationRecruitmentThreadsComment } = require('../../../../../app/@database/recruitment-threads/validations/comment');
const { validationRecruitmentThreadsHardware, validationRecruitmentThreadsID, validationRecruitmentThreadsInformationTitle, validationRecruitmentThreadsInformation, validationRecruitmentThreadsOpenType } = require('../../../../../app/@database/recruitment-threads/validations/ids-informations');
const { validationRecruitmentThreadsDeadlineDate } = require('../../../../../app/@database/recruitment-threads/validations/deadline');
const { validationRecruitmentThreadsLimit } = require('../../../../../app/@database/recruitment-threads/validations/limit');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../../app/@locales/locale');




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
      name,
      comment,
      imagesAndVideosObj,
      anonymity,
      ids_idArr,
      hardware1,
      hardware2,
      hardware3,
      id1,
      id2,
      id3,
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
      openType,
      deadlineDate,
      twitter,
      webPush,
      threadLimit,
      commentLimit,
      replyLimit,
      
    } = bodyObj;
    
    
    lodashSet(requestParametersObj, ['gameCommunities_id'], gameCommunities_id);
    lodashSet(requestParametersObj, ['recruitmentThreads_id'], recruitmentThreads_id);
    lodashSet(requestParametersObj, ['hardwareIDsArr'], hardwareIDsArr);
    lodashSet(requestParametersObj, ['category'], category);
    lodashSet(requestParametersObj, ['title'], title);
    lodashSet(requestParametersObj, ['name'], name);
    lodashSet(requestParametersObj, ['comment'], comment);
    lodashSet(requestParametersObj, ['imagesAndVideosObj'], {});
    lodashSet(requestParametersObj, ['anonymity'], anonymity);
    lodashSet(requestParametersObj, ['ids_idArr'], ids_idArr);
    lodashSet(requestParametersObj, ['hardware1'], hardware1);
    lodashSet(requestParametersObj, ['hardware2'], hardware2);
    lodashSet(requestParametersObj, ['hardware3'], hardware3);
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
    lodashSet(requestParametersObj, ['openType'], openType);
    lodashSet(requestParametersObj, ['deadlineDate'], deadlineDate);
    lodashSet(requestParametersObj, ['twitter'], twitter);
    lodashSet(requestParametersObj, ['webPush'], webPush);
    lodashSet(requestParametersObj, ['threadLimit'], threadLimit);
    lodashSet(requestParametersObj, ['commentLimit'], commentLimit);
    lodashSet(requestParametersObj, ['replyLimit'], replyLimit);
    
    
    
    
    // ---------------------------------------------
    //   Verify CSRF
    // ---------------------------------------------
    
    verifyCsrfToken(req, res);
    
    
    
    
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
    
    await validationBoolean({ throwError: true, value: anonymity });
    
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
    
    await validationRecruitmentThreadsOpenType({ throwError: true, value: openType });
    
    await validationRecruitmentThreadsDeadlineDate({ throwError: true, value: deadlineDate });
    
    await validationBoolean({ throwError: true, value: twitter });
    await validationBoolean({ throwError: true, value: webPush });
    
    await validationRecruitmentThreadsLimit({ throwError: true, required: true, value: threadLimit });
    // await validationForumCommentsLimit({ throwError: true, required: true, value: commentLimit });
    // await validationForumRepliesLimit({ throwError: true, required: true, value: replyLimit });
    
    
    
    
    // --------------------------------------------------
    //   ID
    // --------------------------------------------------
    
    let saveIDs_idArr = [];
    let saveHardware1 = '';
    let saveHardware2 = '';
    let saveHardware3 = '';
    let saveID1 = '';
    let saveID2 = '';
    let saveID3 = '';
    
    if (loginUsers_id) {
      
      const validatedIDs_idArrObj = await validationIDs_idArrServer({ valueArr: ids_idArr, loginUsers_id });
      saveIDs_idArr = lodashGet(validatedIDs_idArrObj, ['valueArr'], []);
      
    } else {
      
      await validationRecruitmentThreadsHardware({ throwError: true, value: hardware1 });
      await validationRecruitmentThreadsHardware({ throwError: true, value: hardware2 });
      await validationRecruitmentThreadsHardware({ throwError: true, value: hardware3 });
      
      await validationRecruitmentThreadsID({ throwError: true, value: id1 });
      await validationRecruitmentThreadsID({ throwError: true, value: id2 });
      await validationRecruitmentThreadsID({ throwError: true, value: id3 });
      
      saveHardware1 = hardware1;
      saveHardware1 = hardware2;
      saveHardware1 = hardware3;
      
      saveID1 = id1;
      saveID2 = id2;
      saveID3 = id3;
      
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
      //   データが存在しない、編集権限がない場合はエラーが投げられる
      // --------------------------------------------------
      
      const tempOldObj = await ModelRecruitmentThreads.findForEdit({
        
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
    //   idsArr
    // --------------------------------------------------
    
    // console.log(`
    //   ----- validatedIDs_idArrObj -----\n
    //   ${util.inspect(validatedIDs_idArrObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // ;
    // const validatedIDs_idArr = validatedIDs_idArrObj.valueArr;
    
    
    
    // --------------------------------------------------
    //   idsArr
    // --------------------------------------------------
    
    const idsArr = [];
    
    if (saveHardware1 && saveID1) {
      
      idsArr.push({
        _id: shortid.generate(),
        hardwareID: saveHardware1,
        id: saveID1,
      });
      
    }
    
    if (saveHardware2 && saveID2) {
      
      idsArr.push({
        _id: shortid.generate(),
        hardwareID: saveHardware2,
        id: saveID2,
      });
      
    }
    
    if (saveHardware3 && saveID3) {
      
      idsArr.push({
        _id: shortid.generate(),
        hardwareID: saveHardware3,
        id: saveID3,
      });
      
    }
    
    
    // --------------------------------------------------
    //   informationsArr
    // --------------------------------------------------
    
    const informationsArr = [];
    
    if (informationTitle1 && information1) {
      
      informationsArr.push({
        _id: shortid.generate(),
        title: informationTitle1,
        information: information1,
      });
      
    }
    
    if (informationTitle2 && information2) {
      
      informationsArr.push({
        _id: shortid.generate(),
        title: informationTitle2,
        information: information2,
      });
      
    }
    
    if (informationTitle3 && information3) {
      
      informationsArr.push({
        _id: shortid.generate(),
        title: informationTitle3,
        information: information3,
      });
      
    }
    
    if (informationTitle4 && information4) {
      
      informationsArr.push({
        _id: shortid.generate(),
        title: informationTitle4,
        information: information4,
      });
      
    }
    
    if (informationTitle5 && information5) {
      
      informationsArr.push({
        _id: shortid.generate(),
        title: informationTitle5,
        information: information5,
      });
      
    }
    
    
    
    
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
      anonymity,
      ids_idArr: saveIDs_idArr,
      idsArr,
      informationsArr,
      deadlineDate,
      close: false,
      webPushSubscriptionObj: {
        endpoint: '',
        keys: {
          p256dh: '',
          auth: '',
        },
      },
      commentAndReplyUsers_idsArr: [],
      approvalUsers_idsArr: [],
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
      
    });
    
    
    
    
    // // --------------------------------------------------
    // //   Set Authority / 非ログインユーザーに時間制限のある編集権限を与える
    // // --------------------------------------------------
    
    // if (!loginUsers_id) {
    //   setAuthority({ req, _id: recruitmentThreadsConditionObj._id });
    // }
    
    
    
    
    // // --------------------------------------------------
    // //   DB find / Forum Threads List
    // // --------------------------------------------------
    
    // returnObj.recruitmentThreadsForListObj = await ModelForumThreads.findForThreadsList({
      
    //   localeObj,
    //   loginUsers_id,
    //   gameCommunities_id,
    //   page: 1,
    //   limit: threadListLimit,
      
    // });
    
    
    // // --------------------------------------------------
    // //   DB find / Forum Threads
    // // --------------------------------------------------
    
    // const forumObj = await ModelForumThreads.findForForum({
      
    //   req,
    //   localeObj,
    //   loginUsers_id,
    //   gameCommunities_id,
    //   threadPage: 1,
    //   threadLimit,
    //   commentPage: 1,
    //   commentLimit,
    //   replyPage: 1,
    //   replyLimit,
      
    // });
    
    // returnObj.recruitmentThreadsObj = forumObj.recruitmentThreadsObj;
    // returnObj.forumCommentsObj = forumObj.forumCommentsObj;
    // returnObj.forumRepliesObj = forumObj.forumRepliesObj;
    
    
    // // --------------------------------------------------
    // //   DB find / Game Communities / 最新の更新日時情報を取得する
    // // --------------------------------------------------
    
    // const gameCommunityArr = await ModelGameCommunities.find({
    //   conditionObj: {
    //     _id: gameCommunities_id
    //   }
    // });
    
    // returnObj.updatedDateObj = lodashGet(gameCommunityArr, [0, 'updatedDateObj'], {});
    
    
    
    
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
      
    //   hardware1: {green ${hardware1}}
    //   id1: {green ${id1}}
    //   hardware2: {green ${hardware2}}
    //   id2: {green ${id2}}
    //   hardware3: {green ${hardware3}}
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
      
    //   openType: {green ${openType}}
      
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