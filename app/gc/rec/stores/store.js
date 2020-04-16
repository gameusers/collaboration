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

import { action, observable } from 'mobx';

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';
import lodashMerge from 'lodash/merge';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../../@modules/fetch';
import { CustomError } from '../../../@modules/error/custom';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationBoolean } from '../../../@validations/boolean';

import { validationRecruitmentThreadsCategory } from '../../../@database/recruitment-threads/validations/category';
import { validationRecruitmentThreadsTitle } from '../../../@database/recruitment-threads/validations/title';
import { validationRecruitmentThreadsName } from '../../../@database/recruitment-threads/validations/name';
import { validationRecruitmentThreadsComment } from '../../../@database/recruitment-threads/validations/comment';
import { validationRecruitmentThreadsPlatform, validationRecruitmentThreadsID, validationRecruitmentThreadsInformationTitle, validationRecruitmentThreadsInformation, validationRecruitmentThreadsPublicSetting } from '../../../@database/recruitment-threads/validations/ids-informations';
import { validationRecruitmentThreadsDeadlineDate } from '../../../@database/recruitment-threads/validations/deadline';


// --------------------------------------------------
//   Stores
// --------------------------------------------------

import initStoreData from '../../../@stores/data';
import initStoreWebPush from '../../../@stores/web-push';
import initStoreLayout from '../../../common/layout/stores/layout';
import initStoreHardware from '../../../common/hardware/stores/store';
import initStoreImageAndVideoForm from '../../../common/image-and-video/stores/form';

let storeGcRecruitment = null;
let storeData = initStoreData({});
let storeWebPush = initStoreWebPush({});
let storeLayout = initStoreLayout({});
let storeHardware = initStoreHardware({});
let storeImageAndVideoForm = initStoreImageAndVideoForm({});




// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   Data
  // ---------------------------------------------
  
  /**
   * データを入れるオブジェクト
   * @type {Object}
   */
  @observable dataObj = {};
  
  
  /**
   * データを変更する
   * @param {Array} pathArr - パス
   * @param {string} value - 値
   */
  @action.bound
  handleEdit({ pathArr, value }) {
    lodashSet(this.dataObj, pathArr, value);
  };
  
  
  
  
  
  
  // ---------------------------------------------
  //   function
  // ---------------------------------------------
  
  /**
   * 募集を投稿する
   * @param {Object} eventObj - イベント
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / 募集スレッドのID
   */
  @action.bound
  async handleSubmitRecruitment({
    
    eventObj,
    pathArr,
    gameCommunities_id,
    recruitmentThreads_id,
    
  }) {
    
    
    // ---------------------------------------------
    //   フォームの送信処理停止
    // ---------------------------------------------
    
    eventObj.preventDefault();
    
    
    
    
    try {
      
      
      // ---------------------------------------------
      //   Temp Data
      // ---------------------------------------------
      
      // lodashSet(storeHardware, ['dataObj', ...pathArr, 'hardwaresArr'], [ { hardwareID: 'I-iu-WmkO', name: 'ファミリーコンピュータ' },  { hardwareID: '2yKF4qXAw', name: 'メガドライブ' } ]);
      
      
      // const newObj = {
        
      //   gameCommunities_id,
      //   recruitmentThreads_id: '',
      //   category: 1,
      //   title: 'テストタイトル',
      //   name: 'テストネーム',
      //   comment: 'テストコメント',
      //   // anonymity: false,
      //   platform1: 'Other',
      //   platform2: 'Other',
      //   platform3: 'Other',
      //   id1: 'test-id-1',
      //   id2: '',
      //   id3: '',
      //   informationTitle1: '情報タイトル1',
      //   informationTitle2: '',
      //   informationTitle3: '',
      //   informationTitle4: '',
      //   informationTitle5: '',
      //   information1: '情報1',
      //   information2: '',
      //   information3: '',
      //   information4: '',
      //   information5: '',
      //   publicSetting: 1,
      //   // deadlineDate: '2020-12-31',
      //   // twitter: false,
      //   // webPush: false,
      //   webPushSubscriptionObj: {
      //     endpoint: 'https://fcm.googleapis.com/fcm/send/fStle9C5HJk:APA91bFMuBrN4DaT6QOVLhkXbaDJCTEM3q0hE8gM_FPqMqE7SgN6fkxylrFLfve3C8QA7O03Q-UWMXI2LQINSpCCveDrMV3FOpTfPfRhjabMbM43dsBVcKHJy4QcasADEW9KqA40Ea5y',
      //     keys: {
      //       p256dh: 'BCleeWTRP95hSeOXd3lTmcGInU2AFR4xEfy6W_kgzwd7IT_GMXzbhriEerFEFZDEXOQJNTGUFObhkol2P7qTMWw',
      //       auth: 'siDbUa9DCbg-n9AMsvWA1w'
      //     }
      //   },
        
      // };
      
      // const oldObj = lodashGet(this.dataObj, [...pathArr], {});
      // const mergedObj = lodashMerge(oldObj, newObj);
      
      // lodashSet(this.dataObj, [...pathArr], mergedObj);
      
      
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const hardwaresArr = lodashGet(storeHardware, ['dataObj', ...pathArr, 'hardwaresArr'], []);
      
      const hardwareIDsArr = [];
      
      for (let valueObj of hardwaresArr.values()) {
        hardwareIDsArr.push(valueObj.hardwareID);
      }
      
      const category = lodashGet(this.dataObj, [...pathArr, 'category'], '');
      const title = lodashGet(this.dataObj, [...pathArr, 'title'], '');
      const name = lodashGet(this.dataObj, [...pathArr, 'name'], '');
      const comment = lodashGet(this.dataObj, [...pathArr, 'comment'], '');
      const imagesAndVideosObj = lodashGet(storeImageAndVideoForm, ['dataObj', ...pathArr, 'imagesAndVideosObj'], {});
      
      // const ids_idsArr = lodashGet(this.dataObj, [...pathArr, 'ids_idsArr'], []);
      const idsArr = lodashGet(this.dataObj, [...pathArr, 'idsArr'], []);
      
      const platform1 = lodashGet(this.dataObj, [...pathArr, 'platform1'], 'Other');
      const platform2 = lodashGet(this.dataObj, [...pathArr, 'platform2'], 'Other');
      const platform3 = lodashGet(this.dataObj, [...pathArr, 'platform3'], 'Other');
      
      const id1 = lodashGet(this.dataObj, [...pathArr, 'id1'], '');
      const id2 = lodashGet(this.dataObj, [...pathArr, 'id2'], '');
      const id3 = lodashGet(this.dataObj, [...pathArr, 'id3'], '');
      
      const informationTitle1 = lodashGet(this.dataObj, [...pathArr, 'informationTitle1'], '');
      const informationTitle2 = lodashGet(this.dataObj, [...pathArr, 'informationTitle2'], '');
      const informationTitle3 = lodashGet(this.dataObj, [...pathArr, 'informationTitle3'], '');
      const informationTitle4 = lodashGet(this.dataObj, [...pathArr, 'informationTitle4'], '');
      const informationTitle5 = lodashGet(this.dataObj, [...pathArr, 'informationTitle5'], '');
      
      const information1 = lodashGet(this.dataObj, [...pathArr, 'information1'], '');
      const information2 = lodashGet(this.dataObj, [...pathArr, 'information2'], '');
      const information3 = lodashGet(this.dataObj, [...pathArr, 'information3'], '');
      const information4 = lodashGet(this.dataObj, [...pathArr, 'information4'], '');
      const information5 = lodashGet(this.dataObj, [...pathArr, 'information5'], '');
      
      const publicSetting = lodashGet(this.dataObj, [...pathArr, 'publicSetting'], 1);
      
      const deadlineDate = lodashGet(this.dataObj, [...pathArr, 'deadlineDate'], '');
      
      const webPush = lodashGet(this.dataObj, [...pathArr, 'webPush'], false);
      const webPushSubscriptionObj = lodashGet(this.dataObj, [...pathArr, 'webPushSubscriptionObj'], {});
      
      const twitter = lodashGet(this.dataObj, [...pathArr, 'twitter'], false);
      
      
      const threadLimit = parseInt((storeData.getCookie({ key: 'recruitmentThreadLimit' }) || process.env.RECRUITMENT_THREAD_LIMIT), 10);
      const commentLimit = parseInt((storeData.getCookie({ key: 'recruitmentCommentLimit' }) || process.env.RECRUITMENT_COMMENT_LIMIT), 10);
      const replyLimit = parseInt((storeData.getCookie({ key: 'recruitmentReplyLimit' }) || process.env.RECRUITMENT_REPLY_LIMIT), 10);
      
      
      
      
      // ---------------------------------------------
      //   Validations
      // ---------------------------------------------
      
      if (
        
        validationRecruitmentThreadsCategory({ value: category }).error ||
        
        validationRecruitmentThreadsTitle({ value: title }).error ||
        validationRecruitmentThreadsName({ value: name }).error ||
        validationRecruitmentThreadsComment({ value: comment }).error ||
        
        validationRecruitmentThreadsPlatform({ value: platform1 }).error ||
        validationRecruitmentThreadsPlatform({ value: platform2 }).error ||
        validationRecruitmentThreadsPlatform({ value: platform3 }).error ||
        
        validationRecruitmentThreadsID({ value: id1 }).error ||
        validationRecruitmentThreadsID({ value: id2 }).error ||
        validationRecruitmentThreadsID({ value: id3 }).error ||
        
        validationRecruitmentThreadsInformationTitle({ value: informationTitle1 }).error ||
        validationRecruitmentThreadsInformationTitle({ value: informationTitle2 }).error ||
        validationRecruitmentThreadsInformationTitle({ value: informationTitle3 }).error ||
        validationRecruitmentThreadsInformationTitle({ value: informationTitle4 }).error ||
        validationRecruitmentThreadsInformationTitle({ value: informationTitle5 }).error ||
        
        validationRecruitmentThreadsInformation({ value: information1 }).error ||
        validationRecruitmentThreadsInformation({ value: information2 }).error ||
        validationRecruitmentThreadsInformation({ value: information3 }).error ||
        validationRecruitmentThreadsInformation({ value: information4 }).error ||
        validationRecruitmentThreadsInformation({ value: information5 }).error ||
        
        validationRecruitmentThreadsPublicSetting({ value: publicSetting }).error ||
        
        validationRecruitmentThreadsDeadlineDate({ value: deadlineDate }).error ||
        
        validationBoolean({ value: webPush }).error ||
        validationBoolean({ value: twitter }).error
        
      ) {
        
        throw new CustomError({ errorsArr: [{ code: 'S0JRF6V5l', messageID: 'uwHIKBy7c' }] });
        
      }
      
      // return;
      
      
      // ---------------------------------------------
      //   Loading 表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingShow({});
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        gameCommunities_id,
        recruitmentThreads_id,
        hardwareIDsArr,
        category,
        title,
        name,
        comment,
        // ids_idsArr,
        idsArr,
        platform1,
        platform2,
        platform3,
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
        publicSetting,
        deadlineDate,
        webPush,
        twitter,
        threadLimit,
        commentLimit,
        replyLimit,
        
      };
      
      if (Object.keys(imagesAndVideosObj).length !== 0) {
        formDataObj.imagesAndVideosObj = imagesAndVideosObj;
      }
      
      if (webPush && Object.keys(webPushSubscriptionObj).length !== 0) {
        formDataObj.webPushSubscriptionObj = webPushSubscriptionObj;
      }
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.URL_API}/v2/db/recruitment-threads/upsert`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
        
      });
      
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // ---------------------------------------------
      //   Hide Form
      // ---------------------------------------------
      
      if (recruitmentThreads_id) {
        lodashSet(this.dataObj, [recruitmentThreads_id, 'showForm'], false);
      }
      
      
      
      
      // // ---------------------------------------------
      // //   メンバー読み込み
      // // ---------------------------------------------
      
      // const page = lodashGet(this.dataObj, [...pathArr, 'membersObj', 'page'], 1);
      
      // this.handleReadMembers({
      //   pathArr,
      //   pathname,
      //   userCommunities_id,
      //   page,
      //   forceReload: true,
      // });
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/stores/store.js / handleRecruitment
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- this.dataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(this.dataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- ids_idsArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(ids_idsArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- hardwaresArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(hardwaresArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- hardwareIDsArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(hardwareIDsArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
      //   category: {green ${category}}
      //   title: {green ${title}}
      //   name: {green ${name}}
      //   comment: {green ${comment}}
      // `);
      
      // console.log(`
      //   ----- imagesAndVideosObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
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
      // `);
      
      // console.log(chalk`
      //   twitter: {green ${twitter}}
      //   webPush: {green ${webPush}}
      // `);
      
      // return;
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        errorObj,
      });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonEnable({ pathArr });
      
      
      // ---------------------------------------------
      //   Loading 非表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingHide({});
      
      
    }
    
    
  };
  
  
  
  
  /**
   * スレッド編集フォームを表示する
   * @param {Array} pathArr - パス
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / スレッドのID
   */
  @action.bound
  async handleShowFormThread({ pathArr, recruitmentThreads_id }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   recruitmentThreads_id が存在しない場合エラー
      // ---------------------------------------------
      
      if (!recruitmentThreads_id) {
        throw new CustomError({ errorsArr: [{ code: '1sfB7JPUO', messageID: 'Error' }] });
      }
      
      
      
      
      // ---------------------------------------------
      //   Loading 表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingShow({});
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        recruitmentThreads_id,
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/db/recruitment-threads/get-edit-data`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj)
      });
      
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // ---------------------------------------------
      //   Hardware
      // ---------------------------------------------
      
      const hardwaresArr = lodashGet(resultObj, ['data', 'hardwaresArr'], []);
      lodashSet(storeHardware, ['dataObj', ...pathArr, 'hardwaresArr'], hardwaresArr);
      
      
      // ---------------------------------------------
      //   Images And Videos
      // ---------------------------------------------
      
      const imagesAndVideosObj = lodashGet(resultObj, ['data', 'imagesAndVideosObj'], {});
      
      if (Object.keys(imagesAndVideosObj).length !== 0) {
        storeImageAndVideoForm.handleSetImagesAndVideosObj({ pathArr, imagesAndVideosObj });
      }
      
      
      // ---------------------------------------------
      //   
      // ---------------------------------------------
      
      // const editObj = {
        
      //   category: lodashGet(resultObj, ['data', 'category'], 1),
      //   title: lodashGet(resultObj, ['data', 'localesArr', 0, 'title'], ''),
      //   name: lodashGet(resultObj, ['data', 'localesArr', 0, 'name'], ''),
      //   comment: lodashGet(resultObj, ['data', 'localesArr', 0, 'comment'], ''),
      //   ids_idsArr: lodashGet(resultObj, ['data', 'ids_idsArr'], []),
      //   idsArr: lodashGet(resultObj, ['data', 'idsArr'], []),
        
      //   platform1: lodashGet(resultObj, ['data', 'platform1'], ''),
      //   platform2: lodashGet(resultObj, ['data', 'platform2'], ''),
      //   platform3: lodashGet(resultObj, ['data', 'platform3'], ''),
      //   id1: lodashGet(resultObj, ['data', 'id1'], ''),
      //   id2: lodashGet(resultObj, ['data', 'id2'], ''),
      //   id3: lodashGet(resultObj, ['data', 'id3'], ''),
        
      //   publicSetting: lodashGet(resultObj, ['data', 'publicSetting'], 1),
      //   deadlineDate: lodashGet(resultObj, ['data', 'deadlineDate'], ''),
      //   webPush: lodashGet(resultObj, ['data', 'webPush'], false),
        
      // };
      
      // lodashSet(this.dataObj, [...pathArr], editObj);
      
      
      const editObj = lodashGet(resultObj, ['data'], {});
      
      editObj.title = lodashGet(resultObj, ['data', 'localesArr', 0, 'title'], ''),
      editObj.name = lodashGet(resultObj, ['data', 'localesArr', 0, 'name'], ''),
      editObj.comment = lodashGet(resultObj, ['data', 'localesArr', 0, 'comment'], ''),
      
      lodashSet(this.dataObj, [...pathArr], editObj);
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/stores/store.js - handleShowFormThread
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
      // `);
      
      // console.log(`
      //   ----- hardwaresArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(hardwaresArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- editObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(editObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Show Form
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [recruitmentThreads_id, 'showForm'], true);
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        errorObj,
      });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonEnable({ pathArr });
      
      
      // ---------------------------------------------
      //   Loading 非表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingHide({});
      
      
      // ---------------------------------------------
      //   Scroll
      // ---------------------------------------------
      
      storeLayout.handleScrollTo({
        to: recruitmentThreads_id,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
      });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * 通知設定 - 購読データを取得する
   * @param {Array} pathArr - パス
   * @param {boolean} checked - チェックの状態
   */
  @action.bound
  async handleGetWebPushSubscribeObj({ pathArr, checked }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Loading 表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingShow({});
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
      // ---------------------------------------------
      //   Subscribe
      // ---------------------------------------------
      
      let webPushSubscriptionObj = {};
      
      if (checked) {
        
        webPushSubscriptionObj = await storeWebPush.handleWebPushSubscribe();
        lodashSet(this.dataObj, [...pathArr, 'webPushSubscriptionObj'], webPushSubscriptionObj);
        
      }
      
      
      
      
      // ---------------------------------------------
      //   Check Box
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [...pathArr, 'webPush'], checked);
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/stores/store.js - handleGetWebPushSubscribeObj
      // `);
      
      // console.log(`
      //   ----- webPushSubscriptionObj -----\n
      //   ${util.inspect(webPushSubscriptionObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        messageID: 'KkWs0oIKw',
      });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonEnable({ pathArr });
      
      
      // ---------------------------------------------
      //   Loading 非表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingHide({});
      
      
    }
    
    
  };
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreGcRecruitment({ propsObj }) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeGcRecruitment === null) {
    storeGcRecruitment = new Store();
  }
  
  
  // --------------------------------------------------
  //   Props
  // --------------------------------------------------
  
  if (propsObj) {
    
    
    // --------------------------------------------------
    //   gameCommunities_id
    // --------------------------------------------------
    
    const gameCommunities_id = lodashGet(propsObj, ['gameCommunities_id'], '');
    
    
    // --------------------------------------------------
    //   recruitmentThreadsObj
    // --------------------------------------------------
    
    const recruitmentThreadsObj = lodashGet(propsObj, ['recruitmentThreadsObj'], null);
    
    if (recruitmentThreadsObj) {
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/stores/store.js
      // `);
      
      // console.log(`
      //   ----- recruitmentThreadsObj -----\n
      //   ${util.inspect(recruitmentThreadsObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      // `);
      
      lodashSet(storeGcRecruitment, ['dataObj', gameCommunities_id, 'recruitmentThreadsObj'], recruitmentThreadsObj);
    }
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeGcRecruitment;
  
  
}