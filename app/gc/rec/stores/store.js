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
  //   Read
  // ---------------------------------------------
  
  /**
   * スレッドを読み込む
   * @param {Array} pathArr - パス
   * @param {string} temporaryDataID - ページの固有ID　例）/gc/Dead-by-Daylight/rec
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {number} page - スレッドのページ
   * @param {number} changeLimit - 1ページに表示する件数を変更する場合、値を入力する
   */
  @action.bound
  async handleReadRecruitmentThreads({
    
    pathArr,
    temporaryDataID,
    gameCommunities_id,
    page,
    changeLimit,
    
  }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      // const communities_id = gameCommunities_id || userCommunities_id;
      
      // const forumObj = lodashGet(this.dataObj, [gameCommunities_id], {});
      // const clonedObj = lodashCloneDeep(forumObj);
      
      // const loadedDate = lodashGet(forumObj, ['forumThreadsObj', `page${page}Obj`, 'loadedDate'], '');
      // const arr = lodashGet(forumObj, ['forumThreadsObj', `page${page}Obj`, 'arr'], []);
      // const reloadThreads = lodashGet(forumObj, ['reloadThreads'], false);
      
      // let threadLimit = parseInt((storeData.getCookie({ key: 'forumThreadLimit' }) || process.env.FORUM_THREAD_LIMIT), 10);
      // const commentLimit = parseInt((storeData.getCookie({ key: 'forumCommentLimit' }) || process.env.FORUM_COMMENT_LIMIT), 10);
      // const replyLimit = parseInt((storeData.getCookie({ key: 'forumReplyLimit' }) || process.env.FORUM_REPLY_LIMIT), 10);
      
      
      
      
      // // ---------------------------------------------
      // //   Change Limit
      // // ---------------------------------------------
      
      // if (changeLimit) {
        
        
      //   threadLimit = changeLimit;
        
        
      //   // ---------------------------------------------
      //   //   Set Cookie - forumThreadLimit
      //   // ---------------------------------------------
        
      //   Cookies.set('forumThreadLimit', changeLimit);
        
        
      // }
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/stores/store.js - handleReadThreads
      // `);
      
      // // console.log(`
      // //   ----- forumObj -----\n
      // //   ${util.inspect(JSON.parse(JSON.stringify(forumObj)), { colors: true, depth: null })}\n
      // //   --------------------\n
      // // `);
      
      // // console.log(`
      // //   ----- pathArr -----\n
      // //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      // //   --------------------\n
      // // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   page: {green ${page}}
      //   threadLimit: {green ${threadLimit}}
      //   commentLimit: {green ${commentLimit}}
      //   replyLimit: {green ${replyLimit}}
      //   loadedDate: {green ${loadedDate}}
      // `);
      
      // // console.log(`
      // //   ----- arr -----\n
      // //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
      // //   --------------------\n
      // // `);
      
      // // return;
      
      
      
      
      // // ---------------------------------------------
      // //   再読込するかどうか
      // // ---------------------------------------------
      
      // let reload = false;
      
      
      // // ---------------------------------------------
      // //   1ページに表示する件数を変更した場合、再読込
      // // ---------------------------------------------
      
      // if (changeLimit || reloadThreads) {
        
        
      //   // ---------------------------------------------
      //   //   スレッド＆コメント　次回の読み込み時に強制リロード
      //   // ---------------------------------------------
        
      //   lodashSet(clonedObj, ['reloadThreads'], false);
      //   lodashSet(clonedObj, ['reloadComments'], false);
        
        
      //   // ---------------------------------------------
      //   //   再読込
      //   // ---------------------------------------------
        
      //   reload = true;
        
      
      // // ---------------------------------------------
      // //   最後の読み込み以降にフォーラムの更新があった場合
      // //   または最後の読み込みからある程度時間（10分）が経っていた場合、再読込する
      // // ---------------------------------------------
        
      // } else if (loadedDate) {
        
      //   const forumUpdatedDate = lodashGet(forumObj, ['updatedDateObj', 'forum'], '0000-01-01T00:00:00Z');
        
      //   const datetimeLoaded = moment(loadedDate).utcOffset(0);
      //   const datetimeForumUpdated = moment(forumUpdatedDate).utcOffset(0);
      //   const datetimeNow = moment().utcOffset(0);
      //   const datetimeReloadLimit = moment(loadedDate).add(process.env.FORUM_RELOAD_MINUTES, 'm').utcOffset(0);
        
      //   if (
      //     datetimeForumUpdated.isAfter(datetimeLoaded) ||
      //     datetimeNow.isAfter(datetimeReloadLimit)
      //   ) {
      //     reload = true;
      //   }
        
      // }
      
      
      // // console.log(chalk`
      // //   reload: {green ${reload}}
      // // `);
      
      
      // // ---------------------------------------------
      // //   すでにデータを読み込んでいる場合は、ストアのデータを表示する
      // // ---------------------------------------------
      
      // if (!reload && arr.length > 0) {
        
        
      //   console.log('store');
        
      //   // ---------------------------------------------
      //   //   Page 更新
      //   // ---------------------------------------------
        
      //   clonedObj.forumThreadsObj.page = page;
        
      //   this.handleEdit({
      //     pathArr: [communities_id],
      //     value: clonedObj
      //   });
        
        
      //   // ---------------------------------------------
      //   //   Set Temporary Data - ForumThreadPage
      //   // ---------------------------------------------
        
      //   storeData.setTemporaryData({ pathname: temporaryDataID, key: 'forumThreadPage', value: page });
        
        
      //   // ---------------------------------------------
      //   //   Return
      //   // ---------------------------------------------
        
      //   return;
        
        
      // }
      
      // console.log('fetch');
      
      
      
      
      // // ---------------------------------------------
      // //   Button Disable
      // // ---------------------------------------------
      
      // storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
      // // ---------------------------------------------
      // //   FormData
      // // ---------------------------------------------
      
      // const formDataObj = {
        
      //   gameCommunities_id,
      //   userCommunities_id,
      //   threadPage: page,
      //   threadLimit,
      //   commentPage: 1,
      //   commentLimit,
      //   replyPage: 1,
      //   replyLimit,
        
      // };
      
      
      // // ---------------------------------------------
      // //   Fetch
      // // ---------------------------------------------
      
      // const resultObj = await fetchWrapper({
      //   urlApi: `${process.env.URL_API}/v2/db/forum-threads/read-threads`,
      //   methodType: 'POST',
      //   formData: JSON.stringify(formDataObj),
      // });
      
      // // console.log(`
      // //   ----- resultObj -----\n
      // //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      // //   --------------------\n
      // // `);
      
      
      
      
      // // ---------------------------------------------
      // //   Error
      // // ---------------------------------------------
      
      // if ('errorsArr' in resultObj) {
      //   throw new CustomError({ errorsArr: resultObj.errorsArr });
      // }
      
      
      
      
      // // ---------------------------------------------
      // //   forumThreadsObj
      // // ---------------------------------------------
      
      // const forumThreadsOldObj = lodashGet(forumObj, ['forumThreadsObj'], {});
      // const forumThreadsNewObj = lodashGet(resultObj, ['data', 'forumThreadsObj'], {});
      
      // // 再読込する場合は新しいデータに置き換える、再読込しない場合は古いデータと新しいデータをマージする
      // const forumThreadsMergedObj = reload ? forumThreadsNewObj : lodashMerge(forumThreadsOldObj, forumThreadsNewObj);
      
      // clonedObj.forumThreadsObj = forumThreadsMergedObj;
      
      // // console.log(`
      // //   ----- forumThreadsOldObj -----\n
      // //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsOldObj)), { colors: true, depth: null })}\n
      // //   --------------------\n
      // // `);
      
      // // console.log(`
      // //   ----- forumThreadsNewObj -----\n
      // //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsNewObj)), { colors: true, depth: null })}\n
      // //   --------------------\n
      // // `);
      
      // // console.log(`
      // //   ----- forumThreadsMergedObj -----\n
      // //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsMergedObj)), { colors: true, depth: null })}\n
      // //   --------------------\n
      // // `);
      
      
      
      
      // // ---------------------------------------------
      // //   forumCommentsObj
      // // ---------------------------------------------
      
      // const forumCommentsOldObj = lodashGet(forumObj, ['forumCommentsObj'], {});
      // const forumCommentsNewObj = lodashGet(resultObj, ['data', 'forumCommentsObj'], {});
      
      // // 再読込する場合は新しいデータに置き換える、再読込しない場合は古いデータと新しいデータをマージする
      // const forumCommentsMergedObj = reload ? forumCommentsNewObj : lodashMerge(forumCommentsOldObj, forumCommentsNewObj);
      
      // clonedObj.forumCommentsObj = forumCommentsMergedObj;
      
      
      // // ---------------------------------------------
      // //   forumRepliesObj
      // // ---------------------------------------------
      
      // const forumRepliesOldObj = lodashGet(forumObj, ['forumRepliesObj'], {});
      // const forumRepliesNewObj = lodashGet(resultObj, ['data', 'forumRepliesObj'], {});
      
      // // 再読込する場合は新しいデータに置き換える、再読込しない場合は古いデータと新しいデータをマージする
      // const forumRepliesMergedObj = reload ? forumRepliesNewObj : lodashMerge(forumRepliesOldObj, forumRepliesNewObj);
      
      // clonedObj.forumRepliesObj = forumRepliesMergedObj;
      
      
      
      
      // // ---------------------------------------------
      // //   Page
      // // ---------------------------------------------
      
      // clonedObj.forumThreadsObj.page = page;
      
      
      // // --------------------------------------------------
      // //   Community UpdatedDateObj
      // // --------------------------------------------------
      
      // const updatedDateObj = lodashGet(resultObj, ['data', 'updatedDateObj'], {});
      // clonedObj.updatedDateObj = updatedDateObj;
      
      
      
      
      // // ---------------------------------------------
      // //   Update
      // // ---------------------------------------------
      
      // this.handleEdit({
      //   pathArr: ['forumThreadLimit'],
      //   value: threadLimit,
      // });
      
      // this.handleEdit({
      //   pathArr: [communities_id],
      //   value: clonedObj
      // });
      
      
      
      
      // // ---------------------------------------------
      // //   Set Temporary Data - ForumThreadPage
      // // ---------------------------------------------
      
      // storeData.setTemporaryData({ pathname: temporaryDataID, key: 'forumThreadPage', value: page });
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      // storeLayout.handleSnackbarOpen({
      //   variant: 'error',
      //   errorObj,
      // });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonEnable({ pathArr });
      
      
      // ---------------------------------------------
      //   Scroll
      // ---------------------------------------------
      
      storeLayout.handleScrollTo({
        
        to: 'recruitmentThreads',
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
      
      
    }
    
    
  };
  
  
  
  
  
  // ---------------------------------------------
  //   Form
  // ---------------------------------------------
  
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
        formData: JSON.stringify(formDataObj),
        
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
      //   Show Form Thread
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [...pathArr, 'showFormThread'], true);
      
      
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
   * スレッド編集フォームを閉じる
   * @param {Array} pathArr - パス
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / スレッドのID
   */
  @action.bound
  async handleHideFormThread({ pathArr, recruitmentThreads_id }) {
    
    
    // ---------------------------------------------
    //   Hide Form Thread
    // ---------------------------------------------
    
    lodashSet(this.dataObj, [...pathArr, 'showFormThread'], false);
    
    
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
    
    
  };
  
  
  
  
  
  
  /**
   * コメント投稿フォームを閉じる
   * @param {Array} pathArr - パス
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / スレッドのID
   */
  @action.bound
  async handleHideFormComment({ pathArr, recruitmentThreads_id }) {
    
    
    // ---------------------------------------------
    //   Hide Form Comment
    // ---------------------------------------------
    
    lodashSet(this.dataObj, [...pathArr, 'showFormComment'], false);
    
    
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
    
    
  };
  
  
  
  
  
  
  // ---------------------------------------------
  //   Submit
  // ---------------------------------------------
  
  /**
   * 募集を投稿する
   * @param {Object} eventObj - イベント
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / 募集スレッドのID
   */
  @action.bound
  async handleSubmitRecruitmentThread({
    
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
      //   Hide Form Thread
      // ---------------------------------------------
      
      if (recruitmentThreads_id) {
        lodashSet(this.dataObj, [...pathArr, 'showFormThread'], false);
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
   * コメントを投稿する
   * @param {Object} eventObj - イベント
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / 募集スレッドのID
   * @param {string} recruitmentComments_id - DB recruitment-comments _id / 募集コメントのID
   */
  @action.bound
  async handleSubmitRecruitmentComment({
    
    eventObj,
    pathArr,
    gameCommunities_id,
    recruitmentThreads_id,
    recruitmentComments_id,
    
  }) {
    
    
    // ---------------------------------------------
    //   フォームの送信処理停止
    // ---------------------------------------------
    
    eventObj.preventDefault();
    
    
    
    
    try {
      
      
      // ---------------------------------------------
      //   Temp Data
      // ---------------------------------------------
      
      const newObj = {
        
        gameCommunities_id,
        // recruitmentThreads_id: '',
        // recruitmentComments_id: '',
        category: 1,
        // name: 'テストネーム',
        // comment: 'テストコメント',
        platform1: 'Other',
        platform2: 'Other',
        platform3: 'Other',
        id1: 'test-id-1',
        id2: '',
        id3: '',
        informationTitle1: '情報タイトル1',
        informationTitle2: '',
        informationTitle3: '',
        informationTitle4: '',
        informationTitle5: '',
        information1: '情報1',
        information2: '',
        information3: '',
        information4: '',
        information5: '',
        publicSetting: 1,
        webPush: true,
        webPushSubscriptionObj: {
          endpoint: 'https://fcm.googleapis.com/fcm/send/fStle9C5HJk:APA91bFMuBrN4DaT6QOVLhkXbaDJCTEM3q0hE8gM_FPqMqE7SgN6fkxylrFLfve3C8QA7O03Q-UWMXI2LQINSpCCveDrMV3FOpTfPfRhjabMbM43dsBVcKHJy4QcasADEW9KqA40Ea5y',
          keys: {
            p256dh: 'BCleeWTRP95hSeOXd3lTmcGInU2AFR4xEfy6W_kgzwd7IT_GMXzbhriEerFEFZDEXOQJNTGUFObhkol2P7qTMWw',
            auth: 'siDbUa9DCbg-n9AMsvWA1w'
          }
        },
        
      };
      
      const oldObj = lodashGet(this.dataObj, [...pathArr], {});
      const mergedObj = lodashMerge(oldObj, newObj);
      
      lodashSet(this.dataObj, [...pathArr], mergedObj);
      
      
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const name = lodashGet(this.dataObj, [...pathArr, 'name'], '');
      const comment = lodashGet(this.dataObj, [...pathArr, 'comment'], '');
      const imagesAndVideosObj = lodashGet(storeImageAndVideoForm, ['dataObj', ...pathArr, 'imagesAndVideosObj'], {});
      
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
      
      const webPush = lodashGet(this.dataObj, [...pathArr, 'webPush'], false);
      const webPushSubscriptionObj = lodashGet(this.dataObj, [...pathArr, 'webPushSubscriptionObj'], {});
      
      
      const threadLimit = parseInt((storeData.getCookie({ key: 'recruitmentThreadLimit' }) || process.env.RECRUITMENT_THREAD_LIMIT), 10);
      const commentLimit = parseInt((storeData.getCookie({ key: 'recruitmentCommentLimit' }) || process.env.RECRUITMENT_COMMENT_LIMIT), 10);
      const replyLimit = parseInt((storeData.getCookie({ key: 'recruitmentReplyLimit' }) || process.env.RECRUITMENT_REPLY_LIMIT), 10);
      
      
      
      
      // ---------------------------------------------
      //   Validations
      // ---------------------------------------------
      
      if (
        
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
        
        validationBoolean({ value: webPush }).error
        
      ) {
        
        throw new CustomError({ errorsArr: [{ code: '-2btbTXrm', messageID: 'uwHIKBy7c' }] });
        
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
        
        gameCommunities_id,
        recruitmentThreads_id,
        recruitmentComments_id,
        name,
        comment,
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
        webPush,
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
        
        urlApi: `${process.env.URL_API}/v2/db/recruitment-comments/upsert`,
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
      
      
      
      
      // // ---------------------------------------------
      // //   Hide Form Thread
      // // ---------------------------------------------
      
      // if (recruitmentThreads_id) {
      //   lodashSet(this.dataObj, [...pathArr, 'showFormComment'], false);
      // }
      
      
      
      
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
      
      console.log(`
        ----------------------------------------\n
        /app/gc/rec/stores/store.js / handleSubmitRecruitmentComment
      `);
      
      console.log(`
        ----- pathArr -----\n
        ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      console.log(`
        ----- formDataObj -----\n
        ${util.inspect(JSON.parse(JSON.stringify(formDataObj)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
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
      
      console.log(chalk`
        gameCommunities_id: {green ${gameCommunities_id}}
        recruitmentThreads_id: {green ${recruitmentThreads_id}}
        recruitmentComments_id: {green ${recruitmentComments_id}}
        name: {green ${name}}
        comment: {green ${comment}}
      `);
      
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
  
  
  
  
  
  
  // ---------------------------------------------
  //   通知
  // ---------------------------------------------
  
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
    
    
    // --------------------------------------------------
    //   recruitmentCommentsObj
    // --------------------------------------------------
    
    const recruitmentCommentsObj = lodashGet(propsObj, ['recruitmentCommentsObj'], null);
    
    if (recruitmentCommentsObj) {
      lodashSet(storeGcRecruitment, ['dataObj', gameCommunities_id, 'recruitmentCommentsObj'], recruitmentCommentsObj);
    }
    
    
    // --------------------------------------------------
    //   recruitmentRepliesObj
    // --------------------------------------------------
    
    const recruitmentRepliesObj = lodashGet(propsObj, ['recruitmentRepliesObj'], null);
    
    if (recruitmentCommentsObj) {
      lodashSet(storeGcRecruitment, ['dataObj', gameCommunities_id, 'recruitmentRepliesObj'], recruitmentRepliesObj);
    }
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeGcRecruitment;
  
  
}