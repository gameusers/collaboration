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
import moment from 'moment';
import Cookies from 'js-cookie';
// import { animateScroll as scroll, scrollSpy, scroller, Events } from 'react-scroll';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';
import lodashCloneDeep from 'lodash/cloneDeep';
import lodashMerge from 'lodash/merge';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../../@modules/fetch';
import { CustomError } from '../../../@modules/error/custom';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationForumThreadsName } from '../../../@database/forum-threads/validations/name';
import { validationForumThreadsComment } from '../../../@database/forum-threads/validations/name';

import { validationForumCommentsName } from '../../../@database/forum-comments/validations/name';
import { validationForumCommentsComment } from '../../../@database/forum-comments/validations/comment';


// --------------------------------------------------
//   Stores
// --------------------------------------------------

import initStoreData from '../../../@stores/data';
import initStoreLayout from '../../layout/stores/layout';
import initStoreImageAndVideoForm from '../../image-and-video/stores/form';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeForum = null;
let storeData = initStoreData({});
let storeLayout = initStoreLayout({});
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
  //   スレッド一覧
  // ---------------------------------------------
  
  /**
   * スレッド一覧を読み込む
   * @param {Array} pathArr - パス
   * @param {string} temporaryDataID - ページの固有ID　例）/uc/community1
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {number} page - スレッド一覧のページ
   * @param {number} changeLimit - スレッド一覧の1ページの表示件数を変更する場合に入力する
   */
  @action.bound
  async handleReadThreadsList({ pathArr, temporaryDataID, gameCommunities_id, userCommunities_id, page, changeLimit }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const communities_id = gameCommunities_id || userCommunities_id;
      
      const forumObj = lodashGet(this.dataObj, [communities_id], {});
      const clonedObj = lodashCloneDeep(forumObj);
      
      const loadedDate = lodashGet(forumObj, ['forumThreadsForListObj', `page${page}Obj`, 'loadedDate'], '');
      const arr = lodashGet(forumObj, ['forumThreadsForListObj', `page${page}Obj`, 'arr'], []);
      
      let limit = lodashGet(this.dataObj, ['forumThreadListLimit'], parseInt(process.env.FORUM_THREAD_LIST_LIMIT, 10));
      
      
      if (changeLimit) {
        
        
        limit = changeLimit;
        
        
        // ---------------------------------------------
        //   Set Cookie - forumThreadListLimit
        // ---------------------------------------------
        
        Cookies.set('forumThreadListLimit', changeLimit);
        
        
      }
      
      // console.log(chalk`
      //   handleReadThreadsList
      //   limit: {green ${limit}}
      // `);
      
      
      // ---------------------------------------------
      //   再読込するかどうか
      // ---------------------------------------------
      
      let reload = false;
      
      
      // ---------------------------------------------
      //   1ページに表示する件数を変更した場合、再読込
      // ---------------------------------------------
      
      if (changeLimit) {
        
        
        // ---------------------------------------------
        //   再読込
        // ---------------------------------------------
        
        reload = true;
        
      
      // ---------------------------------------------
      //   最後の読み込み以降にスレッドの更新があった場合
      //   または最後の読み込みからある程度時間経っていた場合、再読込する
      // ---------------------------------------------
        
      } else if (loadedDate) {
        
        const forumUpdatedDate = lodashGet(clonedObj, ['updatedDateObj', 'forum'], '0000-01-01T00:00:00Z');
        
        const datetimeLoaded = moment(loadedDate).utcOffset(0);
        const datetimeForumUpdated = moment(forumUpdatedDate).utcOffset(0);
        const datetimeNow = moment().utcOffset(0);
        const datetimeReloadLimit = moment(loadedDate).add(process.env.FORUM_RELOAD_MINUTES, 'm').utcOffset(0);
        
        if (
          datetimeForumUpdated.isAfter(datetimeLoaded) ||
          datetimeNow.isAfter(datetimeReloadLimit)
        ) {
          reload = true;
        }
        
      }
      
      
      
      
      // ---------------------------------------------
      //   すでにデータを読み込んでいる場合は、ストアのデータを表示する
      // ---------------------------------------------
      
      if (!reload && arr.length > 0) {
        
        console.log('store');
        
        
        // ---------------------------------------------
        //  Page 更新
        // ---------------------------------------------
        
        clonedObj.forumThreadsForListObj.page = page;
        
        this.handleEdit({
          pathArr: [communities_id],
          value: clonedObj
        });
        
        
        // ---------------------------------------------
        //   Set Temporary Data - ForumThreadListPage
        // ---------------------------------------------
        
        storeData.setTemporaryDataForumThreadListPage({ temporaryDataID, value: page });
        
        
        // ---------------------------------------------
        //   Return
        // ---------------------------------------------
        
        return;
        
        
      }
      
      
      console.log('fetch');
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(chalk`
      //   gameCommunities_id  : {green ${gameCommunities_id}}
      //   userCommunities_id  : {green ${userCommunities_id}}
      //   page  : {green ${page}}
      //   limit  : {green ${limit}}
      //   changeLimit  : {green ${changeLimit}}
        
      //   reload  : {green ${reload}}
      // `);
      
      // console.log(`
      //   ----- arr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        gameCommunities_id,
        userCommunities_id,
        page,
        limit,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        
        
      } else {
        
        resultObj = await fetchWrapper({
          urlApi: `${process.env.URL_API}/v2/db/forum-threads/read-threads-list`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
        });
        
      }
      
      
      // console.log(`\n---------- resultObj ----------\n`);
      // console.dir(resultObj);
      // console.log(`\n-----------------------------------\n`);
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // ---------------------------------------------
      //   Thread Data
      // ---------------------------------------------
      
      const forumThreadsForListOldObj = lodashGet(forumObj, ['forumThreadsForListObj'], {});
      const forumThreadsForListNewObj = lodashGet(resultObj, ['data', 'forumThreadsForListObj'], {});
      
      // 再読込する場合は新しいデータに置き換える、再読込しない場合は古いデータと新しいデータをマージする
      const forumThreadsForListMergedObj = reload ? forumThreadsForListNewObj : lodashMerge(forumThreadsForListOldObj, forumThreadsForListNewObj);
      
      clonedObj.forumThreadsForListObj = forumThreadsForListMergedObj;
      
      // console.log(`
      //   ----- mergedObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(mergedObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Page & Limit
      // ---------------------------------------------
      
      clonedObj.forumThreadsForListObj.page = page;
      
      
      // --------------------------------------------------
      //   UpdatedDateObj
      // --------------------------------------------------
      
      const updatedDateObj = lodashGet(resultObj, ['data', 'updatedDateObj'], {});
      clonedObj.updatedDateObj = updatedDateObj;
      
      
      // ---------------------------------------------
      //   Update forumThreadListLimit & forumThreadsForListObj
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: ['forumThreadListLimit'],
        value: limit,
      });
      
      this.handleEdit({
        pathArr: [communities_id],
        value: clonedObj
      });
      
      
      
      
      // ---------------------------------------------
      //   Set Temporary Data - ForumThreadListPage
      // ---------------------------------------------
      
      storeData.setTemporaryDataForumThreadListPage({ temporaryDataID, value: page });
      
      // console.log(chalk`
      //   temporaryDataID: {green ${temporaryDataID}}
      //   page: {green ${storeData.getTemporaryDataForumThreadListPage({ temporaryDataID })}}
      // `);
      
      
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
      
      
    }
    
    
  };
  
  
  
  
  
  
  // ---------------------------------------------
  //   スレッド
  // ---------------------------------------------
  
  /**
   * スレッドを読み込む
   * @param {Array} pathArr - パス
   * @param {string} temporaryDataID - ページの固有ID　例）/uc/community1
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {number} page - スレッドのページ
   * @param {number} changeLimit - 1ページに表示する件数を変更する場合、値を入力する
   */
  @action.bound
  async handleReadThreads({
    
    pathArr,
    temporaryDataID,
    gameCommunities_id,
    userCommunities_id,
    page,
    changeLimit,
    
  }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const communities_id = gameCommunities_id || userCommunities_id;
      
      const forumObj = lodashGet(this.dataObj, [communities_id], {});
      const clonedObj = lodashCloneDeep(forumObj);
      
      const loadedDate = lodashGet(forumObj, ['forumThreadsObj', `page${page}Obj`, 'loadedDate'], '');
      const arr = lodashGet(forumObj, ['forumThreadsObj', `page${page}Obj`, 'arr'], []);
      const reloadThreads = lodashGet(forumObj, ['reloadThreads'], false);
      
      let threadLimit = parseInt((storeData.getCookie({ key: 'forumThreadLimit' }) || process.env.FORUM_THREAD_LIMIT), 10);
      const commentLimit = parseInt((storeData.getCookie({ key: 'forumCommentLimit' }) || process.env.FORUM_COMMENT_LIMIT), 10);
      const replyLimit = parseInt((storeData.getCookie({ key: 'forumReplyLimit' }) || process.env.FORUM_REPLY_LIMIT), 10);
      
      
      
      
      // ---------------------------------------------
      //   Change Limit
      // ---------------------------------------------
      
      if (changeLimit) {
        
        
        threadLimit = changeLimit;
        
        
        // ---------------------------------------------
        //   Set Cookie - forumThreadLimit
        // ---------------------------------------------
        
        Cookies.set('forumThreadLimit', changeLimit);
        
        
      }
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/common/forum/stores/store.js - handleReadThreads
      // `);
      
      // console.log(`
      //   ----- forumObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      //   page: {green ${page}}
      //   threadLimit: {green ${threadLimit}}
      //   commentLimit: {green ${commentLimit}}
      //   replyLimit: {green ${replyLimit}}
      //   loadedDate: {green ${loadedDate}}
      // `);
      
      // console.log(`
      //   ----- arr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // return;
      
      
      
      
      // ---------------------------------------------
      //   再読込するかどうか
      // ---------------------------------------------
      
      let reload = false;
      
      
      // ---------------------------------------------
      //   1ページに表示する件数を変更した場合、再読込
      // ---------------------------------------------
      
      if (changeLimit || reloadThreads) {
        
        
        // ---------------------------------------------
        //   スレッド＆コメント　次回の読み込み時に強制リロード
        // ---------------------------------------------
        
        lodashSet(clonedObj, ['reloadThreads'], false);
        lodashSet(clonedObj, ['reloadComments'], false);
        
        
        // ---------------------------------------------
        //   再読込
        // ---------------------------------------------
        
        reload = true;
        
      
      // ---------------------------------------------
      //   最後の読み込み以降にフォーラムの更新があった場合
      //   または最後の読み込みからある程度時間（10分）が経っていた場合、再読込する
      // ---------------------------------------------
        
      } else if (loadedDate) {
        
        const forumUpdatedDate = lodashGet(forumObj, ['updatedDateObj', 'forum'], '0000-01-01T00:00:00Z');
        
        const datetimeLoaded = moment(loadedDate).utcOffset(0);
        const datetimeForumUpdated = moment(forumUpdatedDate).utcOffset(0);
        const datetimeNow = moment().utcOffset(0);
        const datetimeReloadLimit = moment(loadedDate).add(process.env.FORUM_RELOAD_MINUTES, 'm').utcOffset(0);
        
        if (
          datetimeForumUpdated.isAfter(datetimeLoaded) ||
          datetimeNow.isAfter(datetimeReloadLimit)
        ) {
          reload = true;
        }
        
      }
      
      
      // console.log(chalk`
      //   reload: {green ${reload}}
      // `);
      
      
      // ---------------------------------------------
      //   すでにデータを読み込んでいる場合は、ストアのデータを表示する
      // ---------------------------------------------
      
      if (!reload && arr.length > 0) {
        
        
        console.log('store');
        
        // ---------------------------------------------
        //  Page 更新
        // ---------------------------------------------
        
        clonedObj.forumThreadsObj.page = page;
        
        this.handleEdit({
          pathArr: [communities_id],
          value: clonedObj
        });
        
        
        // ---------------------------------------------
        //   Set Temporary Data - ForumThreadPage
        // ---------------------------------------------
        
        storeData.setTemporaryDataForumThreadPage({ temporaryDataID, value: page });
        
        
        // ---------------------------------------------
        //   Return
        // ---------------------------------------------
        
        return;
        
        
      }
      
      console.log('fetch');
      
      
      
      
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
        userCommunities_id,
        threadPage: page,
        threadLimit,
        commentPage: 1,
        commentLimit,
        replyPage: 1,
        replyLimit,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      // let resultObj = {};
      
      // if (gameCommunities_id) {
        
        
        
      // } else {
        
      //   resultObj = await fetchWrapper({
      //     urlApi: `${process.env.URL_API}/v2/db/forum-threads/read-threads`,
      //     methodType: 'POST',
      //     formData: JSON.stringify(formDataObj),
      //   });
        
      // }
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/db/forum-threads/read-threads`,
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
      //   forumThreadsObj
      // ---------------------------------------------
      
      const forumThreadsOldObj = lodashGet(forumObj, ['forumThreadsObj'], {});
      const forumThreadsNewObj = lodashGet(resultObj, ['data', 'forumThreadsObj'], {});
      
      // 再読込する場合は新しいデータに置き換える、再読込しない場合は古いデータと新しいデータをマージする
      const forumThreadsMergedObj = reload ? forumThreadsNewObj : lodashMerge(forumThreadsOldObj, forumThreadsNewObj);
      
      clonedObj.forumThreadsObj = forumThreadsMergedObj;
      
      // console.log(`
      //   ----- forumThreadsOldObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsOldObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- forumThreadsNewObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsNewObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- forumThreadsMergedObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsMergedObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   forumCommentsObj
      // ---------------------------------------------
      
      const forumCommentsOldObj = lodashGet(forumObj, ['forumCommentsObj'], {});
      const forumCommentsNewObj = lodashGet(resultObj, ['data', 'forumCommentsObj'], {});
      
      // 再読込する場合は新しいデータに置き換える、再読込しない場合は古いデータと新しいデータをマージする
      const forumCommentsMergedObj = reload ? forumCommentsNewObj : lodashMerge(forumCommentsOldObj, forumCommentsNewObj);
      
      clonedObj.forumCommentsObj = forumCommentsMergedObj;
      
      
      // ---------------------------------------------
      //   forumRepliesObj
      // ---------------------------------------------
      
      const forumRepliesOldObj = lodashGet(forumObj, ['forumRepliesObj'], {});
      const forumRepliesNewObj = lodashGet(resultObj, ['data', 'forumRepliesObj'], {});
      
      // 再読込する場合は新しいデータに置き換える、再読込しない場合は古いデータと新しいデータをマージする
      const forumRepliesMergedObj = reload ? forumRepliesNewObj : lodashMerge(forumRepliesOldObj, forumRepliesNewObj);
      
      clonedObj.forumRepliesObj = forumRepliesMergedObj;
      
      
      
      
      // ---------------------------------------------
      //   Page
      // ---------------------------------------------
      
      clonedObj.forumThreadsObj.page = page;
      
      
      // --------------------------------------------------
      //   Community UpdatedDateObj
      // --------------------------------------------------
      
      const updatedDateObj = lodashGet(resultObj, ['data', 'updatedDateObj'], {});
      clonedObj.updatedDateObj = updatedDateObj;
      
      
      
      
      // ---------------------------------------------
      //   Update
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: ['forumThreadLimit'],
        value: threadLimit,
      });
      
      this.handleEdit({
        pathArr: [communities_id],
        value: clonedObj
      });
      
      
      
      
      // ---------------------------------------------
      //   Set Temporary Data - ForumThreadPage
      // ---------------------------------------------
      
      storeData.setTemporaryDataForumThreadPage({ temporaryDataID, value: page });
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      // storeLayout.handleSnackbarOpen({
      //   variant: 'error',
      //   errorObj,
      // });
      
      
    } finally {
      // console.log('finally');
      
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
        to: 'forumThreads',
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
      });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * スレッド編集フォームを表示する
   * @param {Array} pathArr - パス
   * @param {string} forumThreads_id - DB forum-threads _id / スレッドのID
   */
  @action.bound
  async handleShowFormThread({ pathArr, forumThreads_id }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   forumThreads_id が存在しない場合エラー
      // ---------------------------------------------
      
      if (!forumThreads_id) {
        throw new CustomError({ errorsArr: [{ code: '5bsoal_-V', messageID: 'Error' }] });
      }
      
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
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
        forumThreads_id,
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/db/forum-threads/get-edit-data`,
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
      //   Set Form Data
      // ---------------------------------------------
      
      const name = lodashGet(resultObj, ['data', 'name'], '');
      const comment = lodashGet(resultObj, ['data', 'comment'], '');
      const imagesAndVideosObj = lodashGet(resultObj, ['data', 'imagesAndVideosObj'], '');
      
      lodashSet(this.dataObj, [forumThreads_id, 'formThreadObj', 'name'], name);
      lodashSet(this.dataObj, [forumThreads_id, 'formThreadObj', 'comment'], comment);
      lodashSet(storeImageAndVideoForm, ['dataObj', forumThreads_id, 'formThreadObj', 'imagesAndVideosObj'], imagesAndVideosObj);
      
      
      // console.log(`
      //   ----- storeImageAndVideoForm.dataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(storeImageAndVideoForm.dataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Show Form
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [forumThreads_id, 'showForm'], true);
      
      
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
        to: forumThreads_id,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
      });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * スレッド作成・編集フォームを送信する
   * @param {Object} eventObj - イベント
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {string} forumThreads_id - DB forum-threads _id / スレッドのID
   */
  @action.bound
  async handleSubmitFormThread({ eventObj, pathArr, gameCommunities_id, userCommunities_id, forumThreads_id }) {
    
    
    // ---------------------------------------------
    //   フォームの送信処理停止
    // ---------------------------------------------
    
    eventObj.preventDefault();
    
    
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const communities_id = gameCommunities_id || userCommunities_id;
      
      const name = lodashGet(this.dataObj, [...pathArr, 'name'], '');
      const comment = lodashGet(this.dataObj, [...pathArr, 'comment'], '');
      const imagesAndVideosObj = lodashGet(storeImageAndVideoForm, ['dataObj', ...pathArr, 'imagesAndVideosObj'], {});
      
      
      const forumObj = lodashGet(this.dataObj, [communities_id], {});
      const clonedObj = lodashCloneDeep(forumObj);
      
      const threadListLimit = lodashGet(this.dataObj, ['forumThreadListLimit'], parseInt(process.env.FORUM_THREAD_LIST_LIMIT, 10));
      const threadLimit = lodashGet(this.dataObj, ['forumThreadLimit'], parseInt(process.env.FORUM_THREAD_LIMIT, 10));
      const commentLimit = lodashGet(this.dataObj, ['forumCommentLimit'], parseInt(process.env.FORUM_COMMENT_LIMIT, 10));
      const replyLimit = lodashGet(this.dataObj, ['forumReplyLimit'], parseInt(process.env.FORUM_REPLY_LIMIT, 10));
      
      
      
      
      // ---------------------------------------------
      //   communities_id が存在しない場合エラー
      // ---------------------------------------------
      
      if (!communities_id) {
        throw new CustomError({ errorsArr: [{ code: '8319EqfHo', messageID: '1YJnibkmh' }] });
      }
      
      
      // ---------------------------------------------
      //   Validation
      // ---------------------------------------------
      
      const validationForumThreadsNameObj = validationForumThreadsName({ value: name });
      const validationForumThreadsCommentObj = validationForumThreadsComment({ value: comment });
      
      
      // ---------------------------------------------
      //   Validation Error
      // ---------------------------------------------
      
      if (
        validationForumThreadsNameObj.error ||
        validationForumThreadsCommentObj.error
      ) {
        throw new CustomError({ errorsArr: [{ code: '3NtQODEsb', messageID: 'uwHIKBy7c' }] });
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
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   \n---------- handleSubmitFormThread ----------\n
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      //   forumThreads_id: {green ${forumThreads_id}}
      //   name: {green ${name}}
      //   comment: {green ${comment}}
      // `);
      
      // console.log(`
      //   ----- imagesAndVideosObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // return;
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        gameCommunities_id,
        userCommunities_id,
        forumThreads_id,
        name,
        comment,
        threadListLimit,
        threadLimit,
        commentLimit,
        replyLimit,
        
      };
      
      if (Object.keys(imagesAndVideosObj).length !== 0) {
        formDataObj.imagesAndVideosObj = imagesAndVideosObj;
      }
      
      
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        
        
      } else {
        
        resultObj = await fetchWrapper({
          urlApi: `${process.env.URL_API}/v2/db/forum-threads/upsert-uc`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
        });
        
      }
      
      
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
      //   forumThreadsForListObj
      // ---------------------------------------------
      
      clonedObj.forumThreadsForListObj = lodashGet(resultObj, ['data', 'forumThreadsForListObj'], {});
      
      
      // ---------------------------------------------
      //   forumThreadsObj
      // ---------------------------------------------
      
      clonedObj.forumThreadsObj = lodashGet(resultObj, ['data', 'forumThreadsObj'], {});
      
      
      // ---------------------------------------------
      //   forumCommentsObj
      // ---------------------------------------------
      
      clonedObj.forumCommentsObj = lodashGet(resultObj, ['data', 'forumCommentsObj'], {});
      
      
      // ---------------------------------------------
      //   forumRepliesObj
      // ---------------------------------------------
      
      clonedObj.forumRepliesObj = lodashGet(resultObj, ['data', 'forumRepliesObj'], {});
      
      
      // --------------------------------------------------
      //   UpdatedDateObj
      // --------------------------------------------------
      
      clonedObj.updatedDateObj = lodashGet(resultObj, ['data', 'updatedDateObj'], {});
      
      
      // ---------------------------------------------
      //   Navigation / 開いているタブをスレッド一覧に変更する
      // ---------------------------------------------
      
      lodashSet(clonedObj, ['navigationObj', 'openedTabNo'], 0);
      
      
      // ---------------------------------------------
      //   Update
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: [communities_id],
        value: clonedObj
      });
      
      
      
      
      // ---------------------------------------------
      //   Close Form & Reset Form
      // ---------------------------------------------
      
      if (forumThreads_id) {
        
        lodashSet(this.dataObj, [forumThreads_id, 'showForm'], false);
        
      } else {
        
        lodashSet(this.dataObj, [...pathArr, 'name'], '');
        lodashSet(this.dataObj, [...pathArr, 'comment'], '');
        
        storeImageAndVideoForm.handleResetForm({ pathArr });
        
      }
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: forumThreads_id ? 'HINAkcSmJ' : 'pInPmleQh',
      });
      
      
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
        to: forumThreads_id,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
      });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * スレッドを削除する
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {string} forumThreads_id - DB forum-threads _id / スレッドのID
   * @param {string} forumComments_id - DB forum-comments _id / コメントのID
   */
  @action.bound
  async handleDeleteThread({
    
    pathArr = [],
    gameCommunities_id,
    userCommunities_id,
    forumThreads_id,
    
  }) {
    
    
    // ---------------------------------------------
    //   Property
    // ---------------------------------------------
    
    const communities_id = gameCommunities_id || userCommunities_id;
    
    const forumObj = lodashGet(this.dataObj, [communities_id], {});
    const clonedObj = lodashCloneDeep(forumObj);
    
    const threadListLimit = lodashGet(this.dataObj, ['forumThreadListLimit'], parseInt(process.env.FORUM_THREAD_LIST_LIMIT, 10));
    const threadLimit = lodashGet(this.dataObj, ['forumThreadLimit'], parseInt(process.env.FORUM_THREAD_LIMIT, 10));
    const commentLimit = lodashGet(this.dataObj, ['forumCommentLimit'], parseInt(process.env.FORUM_COMMENT_LIMIT, 10));
    const replyLimit = lodashGet(this.dataObj, ['forumReplyLimit'], parseInt(process.env.FORUM_REPLY_LIMIT, 10));
    
    
    
    
    try {
      
      
      // ---------------------------------------------
      //   communities_id または forumThreads_id が存在しない場合エラー
      // ---------------------------------------------
      
      if (!communities_id || !forumThreads_id) {
        throw new CustomError({ errorsArr: [{ code: 'cGHv25p8q', messageID: '1YJnibkmh' }] });
      }
      
      
      
      
      // ---------------------------------------------
      //   削除用ダイアログ非表示
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: [...pathArr, 'showDeleteDialog'],
        value: false,
      });
      
      
      
      
      // ---------------------------------------------
      //   Loading 表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingShow({});
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      //   forumThreads_id: {green ${forumThreads_id}}
      // `);
      
      // return;
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        gameCommunities_id,
        userCommunities_id,
        forumThreads_id,
        threadListLimit,
        threadLimit,
        commentLimit,
        replyLimit,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        
        
      } else if (userCommunities_id) {
        
        resultObj = await fetchWrapper({
          urlApi: `${process.env.URL_API}/v2/db/forum-threads/delete-uc`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
        });
        
      }
      
      
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
      //   forumThreadsForListObj
      // ---------------------------------------------
      
      clonedObj.forumThreadsForListObj = lodashGet(resultObj, ['data', 'forumThreadsForListObj'], {});
      
      
      // ---------------------------------------------
      //   forumThreadsObj
      // ---------------------------------------------
      
      clonedObj.forumThreadsObj = lodashGet(resultObj, ['data', 'forumThreadsObj'], {});
      
      
      // ---------------------------------------------
      //   forumCommentsObj
      // ---------------------------------------------
      
      clonedObj.forumCommentsObj = lodashGet(resultObj, ['data', 'forumCommentsObj'], {});
      
      
      // ---------------------------------------------
      //   forumRepliesObj
      // ---------------------------------------------
      
      clonedObj.forumRepliesObj = lodashGet(resultObj, ['data', 'forumRepliesObj'], {});
      
      
      // --------------------------------------------------
      //   UpdatedDateObj
      // --------------------------------------------------
      
      clonedObj.updatedDateObj = lodashGet(resultObj, ['data', 'updatedDateObj'], {});
      
      
      // ---------------------------------------------
      //   Update
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: [communities_id],
        value: clonedObj
      });
      
      
      
      
      // ---------------------------------------------
      //   Close Form & Reset Form
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [...pathArr, 'show'], false);
      
      lodashSet(this.dataObj, [...pathArr, 'name'], '');
      lodashSet(this.dataObj, [...pathArr, 'comment'], '');
      
      storeImageAndVideoForm.handleResetForm({ pathArr });
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: 'KBPPfi4f9',
      });
      
      
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
        to: forumThreads_id,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
      });
      
      
    }
    
    
  };
  
  
  
  
  
  // ---------------------------------------------
  //   コメント
  // ---------------------------------------------
  
  /**
   * コメントを読み込む
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {string} forumThreads_id - DB forum-threads _id / スレッドのID
   * @param {number} page - コメントのページ
   * @param {number} changeLimit - 1ページに表示する件数を変更する場合、値を入力する
   */
  @action.bound
  async handleReadComments({
    
    pathArr,
    gameCommunities_id,
    userCommunities_id,
    forumThreads_id,
    page,
    changeLimit,
    
  }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const communities_id = gameCommunities_id || userCommunities_id;
      
      const forumObj = lodashGet(this.dataObj, [communities_id], {});
      const clonedObj = lodashCloneDeep(forumObj);
      
      const loadedDate = lodashGet(forumObj, ['forumCommentsObj ', forumThreads_id, `page${page}Obj`, 'loadedDate'], '');
      const arr = lodashGet(forumObj, ['forumCommentsObj', forumThreads_id, `page${page}Obj`, 'arr'], []);
      
      const threadLimit = parseInt((storeData.getCookie({ key: 'forumThreadLimit' }) || process.env.FORUM_THREAD_LIMIT), 10);
      let commentLimit = parseInt((storeData.getCookie({ key: 'forumCommentLimit' }) || process.env.FORUM_COMMENT_LIMIT), 10);
      const replyLimit = parseInt((storeData.getCookie({ key: 'forumReplyLimit' }) || process.env.FORUM_REPLY_LIMIT), 10);
      
      // const threadLimit = lodashGet(this.dataObj, ['forumThreadLimit'], parseInt(process.env.FORUM_THREAD_LIMIT, 10));
      // let limit = lodashGet(this.dataObj, ['forumCommentLimit'], parseInt(process.env.FORUM_COMMENT_LIMIT, 10));
      // const replyLimit = lodashGet(this.dataObj, ['forumReplyLimit'], parseInt(process.env.FORUM_REPLY_LIMIT, 10));
      
      if (changeLimit) {
        
        
        commentLimit = changeLimit;
        
        
        // ---------------------------------------------
        //   Set Cookie - forumCommentLimit
        // ---------------------------------------------
        
        Cookies.set('forumCommentLimit', changeLimit);
        
        
      }
      
      const reloadComments = lodashGet(forumObj, ['reloadComments'], false);
      
      
      
      
      // ---------------------------------------------
      //   再読込するかどうか
      // ---------------------------------------------
      
      let reload = false;
      
      
      // ---------------------------------------------
      //   1ページに表示する件数を変更した場合、再読込
      // ---------------------------------------------
      
      if (changeLimit || reloadComments) {
        
        
        // ---------------------------------------------
        //   スレッド＆コメント　次回の読み込み時に強制リロード
        // ---------------------------------------------
        
        lodashSet(clonedObj, ['reloadThreads'], true);
        lodashSet(clonedObj, ['reloadComments'], false);
        
        
        // ---------------------------------------------
        //   再読込
        // ---------------------------------------------
        
        reload = true;
        
      
      // ---------------------------------------------
      //   最後の読み込み以降にフォーラムの更新があった場合
      //   または最後の読み込みからある程度時間（10分）が経っていた場合、再読込する
      // ---------------------------------------------
        
      } else if (loadedDate) {
        
        const forumUpdatedDate = lodashGet(forumObj, ['updatedDateObj', 'forum'], '0000-01-01T00:00:00Z');
        
        const datetimeLoaded = moment(loadedDate).utcOffset(0);
        const datetimeForumUpdated = moment(forumUpdatedDate).utcOffset(0);
        const datetimeNow = moment().utcOffset(0);
        const datetimeReloadLimit = moment(loadedDate).add(process.env.FORUM_RELOAD_MINUTES, 'm').utcOffset(0);
        
        // console.log(chalk`
        //   datetimeForumUpdated: {green ${datetimeForumUpdated}}
        //   datetimeNow: {green ${datetimeNow}}
        // `);
        
        if (
          datetimeForumUpdated.isAfter(datetimeLoaded) ||
          datetimeNow.isAfter(datetimeReloadLimit)
        ) {
          reload = true;
        }
        
      }
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      //   forumThreads_id: {green ${forumThreads_id}}
      //   page: {green ${page}}
      //   limit: {green ${limit}}
        
      //   loadedDate: {green ${loadedDate}}
      // `);
      
      // console.log(`
      //   ----- arr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // console.log(`
      //   ----- clonedObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(clonedObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // const forumCommentsAndRepliesObj = lodashGet(this.dataObj, [communities_id, 'forumCommentsAndRepliesObj', forumThreads_id], {});
      
      // console.log(`
      //   ----- forumCommentsAndRepliesObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumCommentsAndRepliesObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      console.log(chalk`
        reload: {green ${reload}}
      `);
      
      
      
      
      // ---------------------------------------------
      //   すでにデータを読み込んでいる場合は、ストアのデータを表示する
      // ---------------------------------------------
      
      if (!reload && arr.length > 0) {
        
        console.log('store');
        
        lodashSet(clonedObj, ['forumCommentsObj', forumThreads_id, 'page'], page);
        
        this.handleEdit({
          pathArr: [communities_id],
          value: clonedObj
        });
        
        return;
        
      }
      
      console.log('fetch');
      
      
      
      
      // ---------------------------------------------
      //   Loading 表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingShow({});
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
      // ---------------------------------------------
      //   forumThreads_idArr
      // ---------------------------------------------
      
      let forumThreads_idArr = [forumThreads_id];
      // const forumThreadsObj = lodashGet(forumObj, ['forumThreadsObj'], {});
      // const forumThreadsPage = lodashGet(forumThreadsObj, ['page'], 1);
      // forumThreads_idArr = lodashGet(forumThreadsObj, [`page${forumThreadsPage}Obj`, 'arr'], []);
      
      // 表示件数を変更する場合は他のスレッドも一緒に更新するため、現在表示されているスレッドのIDを取得する
      if (changeLimit) {
        
        const forumThreadsObj = lodashGet(forumObj, ['forumThreadsObj'], {});
        const forumThreadsPage = lodashGet(forumThreadsObj, ['page'], 1);
        forumThreads_idArr = lodashGet(forumThreadsObj, [`page${forumThreadsPage}Obj`, 'arr'], []);
        
        // 現在表示しているスレッドのIDを取得して、
        // forumThreads_idArr = forumThreads_idArr.filter(_id => _id !== forumThreads_id);
        
      }
      
      
      
      // console.log(`
      //   ----- forumThreads_idArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumThreads_idArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        gameCommunities_id,
        userCommunities_id,
        forumThreads_idArr,
        threadPage: 1,
        threadLimit,
        commentPage: page,
        commentLimit,
        replyPage: 1,
        replyLimit,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        
        
      } else {
        
        resultObj = await fetchWrapper({
          urlApi: `${process.env.URL_API}/v2/db/forum-comments/read-comments`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
        });
        
      }
      
      
      // console.log(`\n---------- resultObj ----------\n`);
      // console.dir(resultObj);
      // console.log(`\n-----------------------------------\n`);
      
      // return;
      
      
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // ---------------------------------------------
      //   forumThreadsObj
      // ---------------------------------------------
      
      const forumThreadsOldDataObj = lodashGet(forumObj, ['forumThreadsObj', 'dataObj'], {});
      const forumThreadsNewDataObj = lodashGet(resultObj, ['data', 'forumThreadsObj', 'dataObj'], {});
      
      const forumThreadsMergedDataObj = lodashMerge(forumThreadsOldDataObj, forumThreadsNewDataObj);
      
      lodashSet(clonedObj, ['forumThreadsObj', 'dataObj'], forumThreadsMergedDataObj);
      
      
      // console.log(`
      //   ----- forumThreadsOldDataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsOldDataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- forumThreadsNewDataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsNewDataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- forumThreadsMergedDataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsMergedDataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   forumCommentsObj
      // ---------------------------------------------
      
      const forumCommentsOldObj = lodashGet(forumObj, ['forumCommentsObj'], {});
      const forumCommentsNewObj = lodashGet(resultObj, ['data', 'forumCommentsObj'], {});
      
      // 再読込する場合は新しいデータに置き換える、再読込しない場合は古いデータと新しいデータをマージする
      const forumCommentsMergedObj = reload ? forumCommentsNewObj : lodashMerge(forumCommentsOldObj, forumCommentsNewObj);
      
      clonedObj.forumCommentsObj = forumCommentsMergedObj;
      
      
      // console.log(`
      //   ----- forumCommentsMergedObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumCommentsMergedObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   forumRepliesObj
      // ---------------------------------------------
      
      const forumRepliesOldObj = lodashGet(forumObj, ['forumRepliesObj'], {});
      const forumRepliesNewObj = lodashGet(resultObj, ['data', 'forumRepliesObj'], {});
      
      // 再読込する場合は新しいデータに置き換える、再読込しない場合は古いデータと新しいデータをマージする
      const forumRepliesMergedObj = reload ? forumRepliesNewObj : lodashMerge(forumRepliesOldObj, forumRepliesNewObj);
      
      clonedObj.forumRepliesObj = forumRepliesMergedObj;
      
      
      // console.log(`
      //   ----- forumRepliesMergedObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumRepliesMergedObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   Page
      // ---------------------------------------------
      
      clonedObj.forumCommentsObj.page = page;
      
      
      // --------------------------------------------------
      //   Community UpdatedDateObj
      // --------------------------------------------------
      
      const updatedDateObj = lodashGet(resultObj, ['data', 'updatedDateObj'], {});
      clonedObj.updatedDateObj = updatedDateObj;
      
      
      
      
      // ---------------------------------------------
      //   Update
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: ['forumCommentLimit'],
        value: commentLimit,
      });
      
      this.handleEdit({
        pathArr: [communities_id],
        value: clonedObj
      });
      
      
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
      //   Loading 非表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingHide({});
      
      
      
      // ---------------------------------------------
      //   Scroll
      // ---------------------------------------------
      
      storeLayout.handleScrollTo({
        to: `forumComments-${forumThreads_id}`,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
      });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * コメント編集フォームを表示する
   * @param {Array} pathArr - パス
   * @param {string} forumComments_id - DB forum-comments _id
   */
  @action.bound
  async handleShowFormComment({ pathArr, forumComments_id }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   forumComments_id が存在しない場合エラー
      // ---------------------------------------------
      
      if (!forumComments_id) {
        throw new CustomError({ errorsArr: [{ code: '3NtNGg1EG', messageID: 'Error' }] });
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
        forumComments_id,
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/db/forum-comments/get-edit-data`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj)
      });
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(chalk`
      //   forumComments_id: {green ${forumComments_id}}
      // `);
      
      // console.log(`
      //   ----- handleShowFormComment / pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
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
      //   Set Form Data
      // ---------------------------------------------
      
      const name = lodashGet(resultObj, ['data', 'name'], '');
      const comment = lodashGet(resultObj, ['data', 'comment'], '');
      const imagesAndVideosObj = lodashGet(resultObj, ['data', 'imagesAndVideosObj'], '');
      
      lodashSet(this.dataObj, [forumComments_id, 'formCommentObj', 'name'], name);
      lodashSet(this.dataObj, [forumComments_id, 'formCommentObj', 'comment'], comment);
      lodashSet(storeImageAndVideoForm, ['dataObj', forumComments_id, 'formCommentObj', 'imagesAndVideosObj'], imagesAndVideosObj);
      
      
      // console.log(`
      //   ----- storeImageAndVideoForm.dataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(storeImageAndVideoForm.dataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Show Form
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [forumComments_id, 'formCommentObj', 'show'], true);
      
      
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
      
      // storeLayout.handleScrollTo({
      //   to: forumComments_id,
      //   duration: 0,
      //   delay: 0,
      //   smooth: 'easeInOutQuart',
      //   offset: -50,
      // });
      
      
    }
    
    
  };
  
  
  
    
  /**
   * コメント作成・編集フォームを送信する
   * @param {Object} eventObj - イベント
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {string} forumThreads_id - DB forum-threads _id / スレッドのID
   * @param {string} forumComments_id - DB forum-comments _id / コメントのID
   */
  @action.bound
  async handleSubmitFormComment({
    
    eventObj,
    pathArr = [],
    gameCommunities_id,
    userCommunities_id,
    forumThreads_id,
    forumComments_id,
    
  }) {
    
    
    // ---------------------------------------------
    //   フォームの送信処理停止
    // ---------------------------------------------
    
    eventObj.preventDefault();
    
    
    
    
    // ---------------------------------------------
    //   Property
    // ---------------------------------------------
    
    const communities_id = gameCommunities_id || userCommunities_id;
    
    const name = lodashGet(this.dataObj, [...pathArr, 'name'], '');
    const anonymity = lodashGet(this.dataObj, [...pathArr, 'anonymity'], false);
    const comment = lodashGet(this.dataObj, [...pathArr, 'comment'], '');
    
    const imagesAndVideosObj = lodashGet(storeImageAndVideoForm, ['dataObj',  ...pathArr, 'imagesAndVideosObj'], {});
    
    
    const forumObj = lodashGet(this.dataObj, [communities_id], {});
    const clonedObj = lodashCloneDeep(forumObj);
    
    const threadListLimit = lodashGet(this.dataObj, ['forumThreadListLimit'], parseInt(process.env.FORUM_THREAD_LIST_LIMIT, 10));
    const threadLimit = lodashGet(this.dataObj, ['forumThreadLimit'], parseInt(process.env.FORUM_THREAD_LIMIT, 10));
    const commentLimit = lodashGet(this.dataObj, ['forumCommentLimit'], parseInt(process.env.FORUM_COMMENT_LIMIT, 10));
    const replyLimit = lodashGet(this.dataObj, ['forumReplyLimit'], parseInt(process.env.FORUM_REPLY_LIMIT, 10));
    
    
    
    
    try {
      
      
      // ---------------------------------------------
      //   communities_id または forumThreads_id が存在しない場合エラー
      // ---------------------------------------------
      
      if (!communities_id || !forumThreads_id) {
        throw new CustomError({ errorsArr: [{ code: 'ooDR_zAOu', messageID: '1YJnibkmh' }] });
      }
      
      
      // ---------------------------------------------
      //   Validation
      // ---------------------------------------------
      
      const validationForumCommentsNameObj = validationForumCommentsName({ value: name });
      const validationForumCommentsCommentObj = validationForumCommentsComment({ value: comment });
      
      
      // ---------------------------------------------
      //   Validation Error
      // ---------------------------------------------
      
      if (
        validationForumCommentsNameObj.error ||
        validationForumCommentsCommentObj.error
      ) {
        throw new CustomError({ errorsArr: [{ code: 'evE70gDt0', messageID: 'uwHIKBy7c' }] });
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
      //   console.log
      // ---------------------------------------------
      
      // console.log(chalk`
      //   \n---------- handleSubmitFormComment ----------\n
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      //   forumThreads_id: {green ${forumThreads_id}}
      //   forumComments_id: {green ${forumComments_id}}
      //   name: {green ${name}}
      //   anonymity: {green ${anonymity}}
      //   typeof anonymity: {green ${typeof anonymity}}
      //   comment: {green ${comment}}
      // `);
      
      // console.log(`
      //   ----- imagesAndVideosObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // return;
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        gameCommunities_id,
        userCommunities_id,
        forumThreads_id,
        name,
        comment,
        threadListLimit,
        threadLimit,
        commentLimit,
        replyLimit,
      };
      
      if (forumComments_id) {
        formDataObj.forumComments_id = forumComments_id;
      }
      
      formDataObj.anonymity = anonymity;
      // if (anonymity) {
      //   formDataObj.anonymity = anonymity;
      // }
      
      if (Object.keys(imagesAndVideosObj).length !== 0) {
        formDataObj.imagesAndVideosObj = imagesAndVideosObj;
      }
      
      
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        
        
      } else if (userCommunities_id) {
        
        resultObj = await fetchWrapper({
          urlApi: `${process.env.URL_API}/v2/db/forum-comments/upsert-comment-uc`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
        });
        
      }
      
      
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
      //   forumThreadsForListObj
      // ---------------------------------------------
      
      clonedObj.forumThreadsForListObj = lodashGet(resultObj, ['data', 'forumThreadsForListObj'], {});
      
      
      // ---------------------------------------------
      //   forumThreadsObj
      // ---------------------------------------------
      
      clonedObj.forumThreadsObj = lodashGet(resultObj, ['data', 'forumThreadsObj'], {});
      
      
      // ---------------------------------------------
      //   forumCommentsObj
      // ---------------------------------------------
      
      clonedObj.forumCommentsObj = lodashGet(resultObj, ['data', 'forumCommentsObj'], {});
      
      
      // ---------------------------------------------
      //   forumRepliesObj
      // ---------------------------------------------
      
      clonedObj.forumRepliesObj = lodashGet(resultObj, ['data', 'forumRepliesObj'], {});
      
      
      // --------------------------------------------------
      //   UpdatedDateObj
      // --------------------------------------------------
      
      clonedObj.updatedDateObj = lodashGet(resultObj, ['data', 'updatedDateObj'], {});
      
      
      // ---------------------------------------------
      //   Update
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: [communities_id],
        value: clonedObj
      });
      
      
      
      
      // ---------------------------------------------
      //   Close Form & Reset Form
      // ---------------------------------------------
      
      if (forumComments_id) {
        // console.log('Close');
        lodashSet(this.dataObj, [forumComments_id, 'formCommentObj', 'show'], false);
        
      } else {
        // console.log('Reset');
        lodashSet(this.dataObj, [...pathArr, 'name'], '');
        lodashSet(this.dataObj, [...pathArr, 'comment'], '');
        
        storeImageAndVideoForm.handleResetForm({ pathArr });
        
      }
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: forumComments_id ? 'NKsMLWvkt' : 'fhi9lUaap',
      });
      
      
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
        to: forumComments_id,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
      });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * コメントを削除する
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {string} forumThreads_id - DB forum-threads _id / スレッドのID
   * @param {string} forumComments_id - DB forum-comments _id / コメントのID
   */
  @action.bound
  async handleDeleteComment({
    
    pathArr = [],
    gameCommunities_id,
    userCommunities_id,
    forumThreads_id,
    forumComments_id,
    
  }) {
    
    
    // ---------------------------------------------
    //   Property
    // ---------------------------------------------
    
    const communities_id = gameCommunities_id || userCommunities_id;
    
    const forumObj = lodashGet(this.dataObj, [communities_id], {});
    const clonedObj = lodashCloneDeep(forumObj);
    
    const threadListLimit = lodashGet(this.dataObj, ['forumThreadListLimit'], parseInt(process.env.FORUM_THREAD_LIST_LIMIT, 10));
    const threadLimit = lodashGet(this.dataObj, ['forumThreadLimit'], parseInt(process.env.FORUM_THREAD_LIMIT, 10));
    const commentLimit = lodashGet(this.dataObj, ['forumCommentLimit'], parseInt(process.env.FORUM_COMMENT_LIMIT, 10));
    const replyLimit = lodashGet(this.dataObj, ['forumReplyLimit'], parseInt(process.env.FORUM_REPLY_LIMIT, 10));
    
    
    
    
    try {
      
      
      // ---------------------------------------------
      //   communities_id または forumThreads_id が存在しない場合エラー
      // ---------------------------------------------
      
      if (!communities_id || !forumThreads_id) {
        throw new CustomError({ errorsArr: [{ code: 'Pu6T4-2Q3', messageID: '1YJnibkmh' }] });
      }
      
      
      
      
      // ---------------------------------------------
      //   削除用ダイアログ非表示
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: [...pathArr, 'showDeleteDialog'],
        value: false,
      });
      
      
      
      
      // ---------------------------------------------
      //   Loading 表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingShow({});
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      //   forumThreads_id: {green ${forumThreads_id}}
      //   forumComments_id: {green ${forumComments_id}}
      //   forumReplies_id: {green ${forumReplies_id}}
      // `);
      
      // return;
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        gameCommunities_id,
        userCommunities_id,
        forumThreads_id,
        forumComments_id,
        threadListLimit,
        threadLimit,
        commentLimit,
        replyLimit,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        
        
      } else if (userCommunities_id) {
        
        resultObj = await fetchWrapper({
          urlApi: `${process.env.URL_API}/v2/db/forum-comments/delete-comment-uc`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
        });
        
      }
      
      
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
      //   forumThreadsForListObj
      // ---------------------------------------------
      
      clonedObj.forumThreadsForListObj = lodashGet(resultObj, ['data', 'forumThreadsForListObj'], {});
      
      
      // ---------------------------------------------
      //   forumThreadsObj
      // ---------------------------------------------
      
      clonedObj.forumThreadsObj = lodashGet(resultObj, ['data', 'forumThreadsObj'], {});
      
      
      // ---------------------------------------------
      //   forumCommentsObj
      // ---------------------------------------------
      
      clonedObj.forumCommentsObj = lodashGet(resultObj, ['data', 'forumCommentsObj'], {});
      
      
      // ---------------------------------------------
      //   forumRepliesObj
      // ---------------------------------------------
      
      clonedObj.forumRepliesObj = lodashGet(resultObj, ['data', 'forumRepliesObj'], {});
      
      
      // --------------------------------------------------
      //   UpdatedDateObj
      // --------------------------------------------------
      
      clonedObj.updatedDateObj = lodashGet(resultObj, ['data', 'updatedDateObj'], {});
      
      
      // ---------------------------------------------
      //   Update
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: [communities_id],
        value: clonedObj
      });
      
      
      
      
      // ---------------------------------------------
      //   Close Form & Reset Form
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [...pathArr, 'show'], false);
      
      lodashSet(this.dataObj, [...pathArr, 'name'], '');
      lodashSet(this.dataObj, [...pathArr, 'comment'], '');
      
      storeImageAndVideoForm.handleResetForm({ pathArr });
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: 'GERzvKtUN',
      });
      
      
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
        to: forumComments_id,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
      });
      
      
    }
    
    
  };
  
  
  
  
  
  // ---------------------------------------------
  //   返信
  // ---------------------------------------------
  
  /**
   * 返信を読み込む
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {string} forumComments_id - DB forum-comments _id / コメントのID
   * @param {number} page - コメントのページ
   * @param {number} changeLimit - 1ページに表示する件数を変更する場合、値を入力する
   */
  @action.bound
  async handleReadReplies({
    
    pathArr,
    gameCommunities_id,
    userCommunities_id,
    forumComments_id,
    page,
    changeLimit
    
  }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const communities_id = gameCommunities_id || userCommunities_id;
      
      const forumObj = lodashGet(this.dataObj, [communities_id], {});
      const clonedObj = lodashCloneDeep(forumObj);
      
      const loadedDate = lodashGet(forumObj, ['forumRepliesObj ', forumComments_id, `page${page}Obj`, 'loadedDate'], '');
      const arr = lodashGet(forumObj, ['forumRepliesObj', forumComments_id, `page${page}Obj`, 'arr'], []);
      
      // const threadLimit = parseInt((storeData.getCookie({ key: 'forumThreadLimit' }) || process.env.FORUM_THREAD_LIMIT), 10);
      const commentLimit = parseInt((storeData.getCookie({ key: 'forumCommentLimit' }) || process.env.FORUM_COMMENT_LIMIT), 10);
      let replyLimit = parseInt((storeData.getCookie({ key: 'forumReplyLimit' }) || process.env.FORUM_REPLY_LIMIT), 10);
      
      // const commentLimit = lodashGet(this.dataObj, ['forumCommentLimit'], parseInt(process.env.FORUM_COMMENT_LIMIT, 10));
      // let limit = lodashGet(this.dataObj, ['forumReplyLimit'], parseInt(process.env.FORUM_REPLY_LIMIT, 10));
      
      if (changeLimit) {
        
        
        replyLimit = changeLimit;
        
        
        // ---------------------------------------------
        //   Set Cookie - forumReplyLimit
        // ---------------------------------------------
        
        Cookies.set('forumReplyLimit', changeLimit);
        
        
      }
      
      
      
      
      // ---------------------------------------------
      //   再読込するかどうか
      // ---------------------------------------------
      
      let reload = false;
      
      
      // ---------------------------------------------
      //   1ページに表示する件数を変更した場合、再読込
      // ---------------------------------------------
      
      if (changeLimit) {
        
        
        // ---------------------------------------------
        //   スレッド＆コメント　次回の読み込み時に強制リロード
        // ---------------------------------------------
        
        lodashSet(clonedObj, ['reloadThreads'], true);
        lodashSet(clonedObj, ['reloadComments'], true);
        
        
        // ---------------------------------------------
        //   再読込
        // ---------------------------------------------
        
        reload = true;
        
      
      // ---------------------------------------------
      //   最後の読み込み以降にフォーラムの更新があった場合
      //   または最後の読み込みからある程度時間（10分）が経っていた場合、再読込する
      // ---------------------------------------------
        
      } else if (loadedDate) {
        
        const forumUpdatedDate = lodashGet(forumObj, ['updatedDateObj', 'forum'], '0000-01-01T00:00:00Z');
        
        const datetimeLoaded = moment(loadedDate).utcOffset(0);
        const datetimeForumUpdated = moment(forumUpdatedDate).utcOffset(0);
        const datetimeNow = moment().utcOffset(0);
        const datetimeReloadLimit = moment(loadedDate).add(process.env.FORUM_RELOAD_MINUTES, 'm').utcOffset(0);
        
        if (
          datetimeForumUpdated.isAfter(datetimeLoaded) ||
          datetimeNow.isAfter(datetimeReloadLimit)
        ) {
          reload = true;
        }
        
      }
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      //   forumComments_id: {green ${forumComments_id}}
      //   page: {green ${page}}
      //   limit: {green ${limit}}
        
      //   loadedDate: {green ${loadedDate}}
      // `);
      
      // console.log(`
      //   ----- arr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- clonedObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(clonedObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   reload: {green ${reload}}
      // `);
      
      // return;
      
      
      
      
      // ---------------------------------------------
      //   すでにデータを読み込んでいる場合は、ストアのデータを表示する
      // ---------------------------------------------
      
      if (!reload && arr.length > 0) {
        
        console.log('store');
        
        lodashSet(clonedObj, ['forumRepliesObj', forumComments_id, 'page'], page);
        
        this.handleEdit({
          pathArr: [communities_id],
          value: clonedObj
        });
        
        return;
        
      }
      
      console.log('fetch');
      
      
      
      
      // ---------------------------------------------
      //   Loading 表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingShow({});
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
      // ---------------------------------------------
      //   forumComments_idArr
      // ---------------------------------------------
      
      let forumComments_idArr = [forumComments_id];
      
      // 表示件数を変更する場合は他の返信も一緒に更新するため、現在表示されているコメントのIDを取得する
      if (changeLimit) {
        
        const forumThreadsObj = lodashGet(forumObj, ['forumThreadsObj'], {});
        const forumThreadsPage = lodashGet(forumThreadsObj, ['page'], 1);
        const forumThreads_idArr = lodashGet(forumThreadsObj, [`page${forumThreadsPage}Obj`, 'arr'], []);
        
        
        forumComments_idArr = [];
        
        for (let forumThreads_id of forumThreads_idArr.values()) {
          
          const forumCommentsPage = lodashGet(forumObj, ['forumCommentsObj', forumThreads_id, 'page'], 1);
          const tempForumComments_idArr = lodashGet(forumObj, ['forumCommentsObj', forumThreads_id, `page${forumCommentsPage}Obj`, 'arr'], []);
          
          forumComments_idArr = forumComments_idArr.concat(tempForumComments_idArr);
          
        }
        
      }
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        gameCommunities_id,
        userCommunities_id,
        forumComments_idArr,
        commentPage: 1,
        commentLimit,
        replyPage: page,
        replyLimit,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        
        
      } else {
        
        resultObj = await fetchWrapper({
          urlApi: `${process.env.URL_API}/v2/db/forum-comments/read-replies`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
        });
        
      }
      
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // return;
      
      
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // ---------------------------------------------
      //   forumRepliesObj
      // ---------------------------------------------
      
      const forumRepliesOldObj = lodashGet(forumObj, ['forumRepliesObj'], {});
      const forumRepliesNewObj = lodashGet(resultObj, ['data', 'forumRepliesObj'], {});
      
      const forumRepliesMergedObj = reload ? forumRepliesNewObj : lodashMerge(forumRepliesOldObj, forumRepliesNewObj);
      
      lodashSet(clonedObj, ['forumRepliesObj'], forumRepliesMergedObj);
      
      
      // console.log(`
      //   ----- forumRepliesOldObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumRepliesOldObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- forumRepliesNewObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumRepliesNewObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- forumRepliesMergedObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumRepliesMergedObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // console.log(`
      //   ----- clonedObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(clonedObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Page
      // ---------------------------------------------
      
      clonedObj.forumRepliesObj.page = page;
      
      
      // --------------------------------------------------
      //   Community UpdatedDateObj
      // --------------------------------------------------
      
      const updatedDateObj = lodashGet(resultObj, ['data', 'updatedDateObj'], {});
      clonedObj.updatedDateObj = updatedDateObj;
      
      
      
      
      // ---------------------------------------------
      //   Update
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: ['forumReplyLimit'],
        value: replyLimit,
      });
      
      this.handleEdit({
        pathArr: [communities_id],
        value: clonedObj
      });
      
      
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
      //   Loading 非表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingHide({});
      
      
      // ---------------------------------------------
      //   Scroll
      // ---------------------------------------------
      
      storeLayout.handleScrollTo({
        to: `forumReplies-${forumComments_id}`,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -100,
      });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * 返信編集フォームを表示する
   * @param {Array} pathArr - パス
   * @param {string} forumReplies_id - DB forum-comments _id
   */
  @action.bound
  async handleShowFormReply({ pathArr, forumReplies_id }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   forumComments_id が存在しない場合エラー
      // ---------------------------------------------
      
      if (!forumReplies_id) {
        throw new CustomError({ errorsArr: [{ code: '3cWrPpMq8', messageID: 'Error' }] });
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
        forumComments_id: forumReplies_id,
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/db/forum-comments/get-edit-data`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj)
      });
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(chalk`
      //   forumComments_id: {green ${forumComments_id}}
      // `);
      
      // console.log(`
      //   ----- handleShowFormComment / pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
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
      //   Set Form Data
      // ---------------------------------------------
      
      const name = lodashGet(resultObj, ['data', 'name'], '');
      const comment = lodashGet(resultObj, ['data', 'comment'], '');
      const imagesAndVideosObj = lodashGet(resultObj, ['data', 'imagesAndVideosObj'], '');
      
      lodashSet(this.dataObj, [forumReplies_id, 'formReplyObj', 'name'], name);
      lodashSet(this.dataObj, [forumReplies_id, 'formReplyObj', 'comment'], comment);
      lodashSet(storeImageAndVideoForm, ['dataObj', forumReplies_id, 'formReplyObj', 'imagesAndVideosObj'], imagesAndVideosObj);
      
      
      // console.log(`
      //   ----- storeImageAndVideoForm.dataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(storeImageAndVideoForm.dataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Show Form
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [forumReplies_id, 'formReplyObj', 'show'], true);
      
      
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
      
      // storeLayout.handleScrollTo({
      //   to: forumComments_id,
      //   duration: 0,
      //   delay: 0,
      //   smooth: 'easeInOutQuart',
      //   offset: -50,
      // });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * 返信作成・編集フォームを送信する
   * @param {Object} eventObj - イベント
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {string} forumThreads_id - DB forum-threads _id / スレッドのID
   * @param {string} forumComments_id - DB forum-comments _id / コメントのID
   * @param {string} forumReplies_id - DB forum-comments _id / 返信のID（コメントと返信は同じコレクションなので、コメントのIDと同じもの）
   */
  @action.bound
  async handleSubmitFormReply({
    
    eventObj,
    pathArr = [],
    gameCommunities_id,
    userCommunities_id,
    forumThreads_id,
    forumComments_id,
    forumReplies_id,
    replyToForumComments_id,
    
  }) {
    
    
    // ---------------------------------------------
    //   フォームの送信処理停止
    // ---------------------------------------------
    
    eventObj.preventDefault();
    
    
    
    
    // ---------------------------------------------
    //   Property
    // ---------------------------------------------
    
    const communities_id = gameCommunities_id || userCommunities_id;
    
    const name = lodashGet(this.dataObj, [...pathArr, 'name'], '');
    const anonymity = lodashGet(this.dataObj, [...pathArr, 'anonymity'], false);
    const comment = lodashGet(this.dataObj, [...pathArr, 'comment'], '');
    
    const imagesAndVideosObj = lodashGet(storeImageAndVideoForm, ['dataObj',  ...pathArr, 'imagesAndVideosObj'], {});
    
    
    const forumObj = lodashGet(this.dataObj, [communities_id], {});
    const clonedObj = lodashCloneDeep(forumObj);
    
    const threadListLimit = lodashGet(this.dataObj, ['forumThreadListLimit'], parseInt(process.env.FORUM_THREAD_LIST_LIMIT, 10));
    const threadLimit = lodashGet(this.dataObj, ['forumThreadLimit'], parseInt(process.env.FORUM_THREAD_LIMIT, 10));
    const commentLimit = lodashGet(this.dataObj, ['forumCommentLimit'], parseInt(process.env.FORUM_COMMENT_LIMIT, 10));
    const replyLimit = lodashGet(this.dataObj, ['forumReplyLimit'], parseInt(process.env.FORUM_REPLY_LIMIT, 10));
    
    
    
    
    try {
      
      
      // ---------------------------------------------
      //   communities_id または forumThreads_id が存在しない場合エラー
      // ---------------------------------------------
      
      if (!communities_id || !forumThreads_id) {
        throw new CustomError({ errorsArr: [{ code: 'ooDR_zAOu', messageID: '1YJnibkmh' }] });
      }
      
      
      // ---------------------------------------------
      //   Validation
      // ---------------------------------------------
      
      const validationForumCommentsNameObj = validationForumCommentsName({ value: name });
      const validationForumCommentsCommentObj = validationForumCommentsComment({ value: comment });
      
      
      // ---------------------------------------------
      //   Validation Error
      // ---------------------------------------------
      
      if (
        validationForumCommentsNameObj.error ||
        validationForumCommentsCommentObj.error
      ) {
        throw new CustomError({ errorsArr: [{ code: 'evE70gDt0', messageID: 'uwHIKBy7c' }] });
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
      //   console.log
      // ---------------------------------------------
      
      // console.log(chalk`
      //   \n---------- handleSubmitFormReply ----------\n
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      //   forumThreads_id: {green ${forumThreads_id}}
      //   forumComments_id: {green ${forumComments_id}}
      //   forumReplies_id: {green ${forumReplies_id}}
      //   replyToForumComments_id: {green ${replyToForumComments_id}}
      //   name: {green ${name}}
      //   anonymity: {green ${anonymity}}
      //   typeof anonymity: {green ${typeof anonymity}}
      //   comment: {green ${comment}}
      // `);
      
      // console.log(`
      //   ----- imagesAndVideosObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // return;
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        gameCommunities_id,
        userCommunities_id,
        forumThreads_id,
        forumComments_id,
        name,
        comment,
        threadListLimit,
        threadLimit,
        commentLimit,
        replyLimit,
      };
      
      if (forumReplies_id) {
        formDataObj.forumReplies_id = forumReplies_id;
      }
      
      if (replyToForumComments_id) {
        formDataObj.replyToForumComments_id = replyToForumComments_id;
      }
      
      formDataObj.anonymity = anonymity;
      // if (anonymity) {
      //   formDataObj.anonymity = anonymity;
      // }
      
      if (Object.keys(imagesAndVideosObj).length !== 0) {
        formDataObj.imagesAndVideosObj = imagesAndVideosObj;
      }
      
      
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        
        
      } else if (userCommunities_id) {
        
        resultObj = await fetchWrapper({
          urlApi: `${process.env.URL_API}/v2/db/forum-comments/upsert-reply-uc`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
        });
        
      }
      
      
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
      //   forumThreadsForListObj
      // ---------------------------------------------
      
      clonedObj.forumThreadsForListObj = lodashGet(resultObj, ['data', 'forumThreadsForListObj'], {});
      
      
      // ---------------------------------------------
      //   forumThreadsObj
      // ---------------------------------------------
      
      clonedObj.forumThreadsObj = lodashGet(resultObj, ['data', 'forumThreadsObj'], {});
      
      
      // ---------------------------------------------
      //   forumCommentsObj
      // ---------------------------------------------
      
      clonedObj.forumCommentsObj = lodashGet(resultObj, ['data', 'forumCommentsObj'], {});
      
      
      // ---------------------------------------------
      //   forumRepliesObj
      // ---------------------------------------------
      
      clonedObj.forumRepliesObj = lodashGet(resultObj, ['data', 'forumRepliesObj'], {});
      
      
      // --------------------------------------------------
      //   UpdatedDateObj
      // --------------------------------------------------
      
      clonedObj.updatedDateObj = lodashGet(resultObj, ['data', 'updatedDateObj'], {});
      
      
      // ---------------------------------------------
      //   Update
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: [communities_id],
        value: clonedObj
      });
      
      
      
      
      // ---------------------------------------------
      //   Close Form & Reset Form
      // ---------------------------------------------
      
      // lodashSet(this.dataObj, [forumComments_id, 'formReplyObj', 'show'], false);
      lodashSet(this.dataObj, [...pathArr, 'show'], false);
      
      lodashSet(this.dataObj, [...pathArr, 'name'], '');
      lodashSet(this.dataObj, [...pathArr, 'comment'], '');
      
      storeImageAndVideoForm.handleResetForm({ pathArr });
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: forumComments_id ? 'NKsMLWvkt' : 'fhi9lUaap',
      });
      
      
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
        to: forumComments_id,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
      });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * 返信を削除する
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {string} forumThreads_id - DB forum-threads _id / スレッドのID
   * @param {string} forumComments_id - DB forum-comments _id / コメントのID
   * @param {string} forumReplies_id - DB forum-comments _id / 返信のID（コメントと返信は同じコレクションなので、コメントのIDと同じもの）
   */
  @action.bound
  async handleDeleteReply({
    
    pathArr = [],
    gameCommunities_id,
    userCommunities_id,
    forumThreads_id,
    forumComments_id,
    forumReplies_id,
    
  }) {
    
    
    // ---------------------------------------------
    //   Property
    // ---------------------------------------------
    
    const communities_id = gameCommunities_id || userCommunities_id;
    
    const forumObj = lodashGet(this.dataObj, [communities_id], {});
    const clonedObj = lodashCloneDeep(forumObj);
    
    const threadListLimit = lodashGet(this.dataObj, ['forumThreadListLimit'], parseInt(process.env.FORUM_THREAD_LIST_LIMIT, 10));
    const threadLimit = lodashGet(this.dataObj, ['forumThreadLimit'], parseInt(process.env.FORUM_THREAD_LIMIT, 10));
    const commentLimit = lodashGet(this.dataObj, ['forumCommentLimit'], parseInt(process.env.FORUM_COMMENT_LIMIT, 10));
    const replyLimit = lodashGet(this.dataObj, ['forumReplyLimit'], parseInt(process.env.FORUM_REPLY_LIMIT, 10));
    
    
    
    
    try {
      
      
      // ---------------------------------------------
      //   communities_id または forumThreads_id が存在しない場合エラー
      // ---------------------------------------------
      
      if (!communities_id || !forumThreads_id) {
        throw new CustomError({ errorsArr: [{ code: 'cqD8ikZJ_', messageID: '1YJnibkmh' }] });
      }
      
      
      
      
      // ---------------------------------------------
      //   削除用ダイアログ非表示
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: [...pathArr, 'showDeleteDialog'],
        value: false,
      });
      
      
      
      
      // ---------------------------------------------
      //   Loading 表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingShow({});
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      //   forumThreads_id: {green ${forumThreads_id}}
      //   forumComments_id: {green ${forumComments_id}}
      //   forumReplies_id: {green ${forumReplies_id}}
      // `);
      
      // return;
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        gameCommunities_id,
        userCommunities_id,
        forumThreads_id,
        forumComments_id,
        forumReplies_id,
        threadListLimit,
        threadLimit,
        commentLimit,
        replyLimit,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        
        
      } else if (userCommunities_id) {
        
        resultObj = await fetchWrapper({
          urlApi: `${process.env.URL_API}/v2/db/forum-comments/delete-reply-uc`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
        });
        
      }
      
      
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
      //   forumThreadsForListObj
      // ---------------------------------------------
      
      clonedObj.forumThreadsForListObj = lodashGet(resultObj, ['data', 'forumThreadsForListObj'], {});
      
      
      // ---------------------------------------------
      //   forumThreadsObj
      // ---------------------------------------------
      
      clonedObj.forumThreadsObj = lodashGet(resultObj, ['data', 'forumThreadsObj'], {});
      
      
      // ---------------------------------------------
      //   forumCommentsObj
      // ---------------------------------------------
      
      clonedObj.forumCommentsObj = lodashGet(resultObj, ['data', 'forumCommentsObj'], {});
      
      
      // ---------------------------------------------
      //   forumRepliesObj
      // ---------------------------------------------
      
      clonedObj.forumRepliesObj = lodashGet(resultObj, ['data', 'forumRepliesObj'], {});
      
      
      // --------------------------------------------------
      //   UpdatedDateObj
      // --------------------------------------------------
      
      clonedObj.updatedDateObj = lodashGet(resultObj, ['data', 'updatedDateObj'], {});
      
      
      // ---------------------------------------------
      //   Update
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: [communities_id],
        value: clonedObj
      });
      
      
      
      
      // ---------------------------------------------
      //   Close Form & Reset Form
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [...pathArr, 'show'], false);
      
      lodashSet(this.dataObj, [...pathArr, 'name'], '');
      lodashSet(this.dataObj, [...pathArr, 'comment'], '');
      
      storeImageAndVideoForm.handleResetForm({ pathArr });
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: 'o4fiADvZR',
      });
      
      
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
        to: forumComments_id,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
      });
      
      
    }
    
    
  };
  
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreForum({ propsObj }) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeForum === null) {
    storeForum = new Store();
  }
  
  
  // --------------------------------------------------
  //   Props
  // --------------------------------------------------
  
  if (propsObj) {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    let communities_id = '';
    let updatedDateObj = {};
    
    
    
    
    // --------------------------------------------------
    //   gameCommunities_id
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['gameCommunities_id'])) {
      
      communities_id = lodashGet(propsObj, ['gameCommunities_id'], '');
      updatedDateObj = lodashGet(propsObj, ['gameCommunityObj', 'updatedDateObj'], null);
      
      
    // --------------------------------------------------
    //   userCommunities_id
    // --------------------------------------------------
      
    } else {
      
      communities_id = lodashGet(propsObj, ['userCommunities_id'], '');
      updatedDateObj = lodashGet(propsObj, ['userCommunityObj', 'updatedDateObj'], null);
      
    }
    
    
    // --------------------------------------------------
    //   UpdatedDateObj
    // --------------------------------------------------
    
    if (updatedDateObj) {
      lodashSet(storeForum, ['dataObj', communities_id, 'updatedDateObj'], updatedDateObj);
    }
    
    
    
    
    // --------------------------------------------------
    //   forumThreadsForListObj
    // --------------------------------------------------
    
    const forumThreadsForListObj = lodashGet(propsObj, ['forumThreadsForListObj'], null);
    
    if (forumThreadsForListObj) {
      lodashSet(storeForum, ['dataObj', communities_id, 'forumThreadsForListObj'], forumThreadsForListObj);
    }
    
    
    // --------------------------------------------------
    //   forumThreadsObj
    // --------------------------------------------------
    
    const forumThreadsObj = lodashGet(propsObj, ['forumThreadsObj'], null);
    
    if (forumThreadsObj) {
      lodashSet(storeForum, ['dataObj', communities_id, 'forumThreadsObj'], forumThreadsObj);
    }
    
    
    // --------------------------------------------------
    //   forumCommentsObj
    // --------------------------------------------------
    
    const forumCommentsObj = lodashGet(propsObj, ['forumCommentsObj'], null);
    
    if (forumCommentsObj) {
      lodashSet(storeForum, ['dataObj', communities_id, 'forumCommentsObj'], forumCommentsObj);
    }
    
    
    // --------------------------------------------------
    //   forumRepliesObj
    // --------------------------------------------------
    
    const forumRepliesObj = lodashGet(propsObj, ['forumRepliesObj'], null);
    
    if (forumRepliesObj) {
      lodashSet(storeForum, ['dataObj', communities_id, 'forumRepliesObj'], forumRepliesObj);
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/forum/stores/store.js - initStoreForum
    // `);
    
    // console.log(chalk`
    //   communities_id: {green ${communities_id}}
    // `);
    
    // console.log(`
    //   ----- propsObj -----\n
    //   ${util.inspect(propsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- updatedDateObj -----\n
    //   ${util.inspect(updatedDateObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeForum;
  
  
}