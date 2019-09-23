// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import { action, observable } from 'mobx';
import moment from 'moment';
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

import { validationForumCommentsName } from '../../../@database/forum-comments/validations/name';
import { validationForumCommentsComment } from '../../../@database/forum-comments/validations/comment';


// --------------------------------------------------
//   Stores
// --------------------------------------------------

import initStoreLayout from '../../layout/stores/layout';
import initStoreImageAndVideoForm from '../../image-and-video/stores/form';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeForum = null;
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
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {number} page - スレッド一覧のページ
   * @param {number} changeLimit - スレッド一覧の1ページの表示件数を変更する場合に入力する
   */
  @action.bound
  async handleReadThreadsList({ pathArr, gameCommunities_id, userCommunities_id, page, changeLimit }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const communities_id = gameCommunities_id || userCommunities_id;
      
      const forumObj = lodashGet(this.dataObj, [communities_id], {});
      const clonedObj = lodashCloneDeep(forumObj);
      
      const loadedDate = lodashGet(forumObj, ['forumThreadsForListObj', `page${page}Obj`, 'loadedDate'], '');
      const arr = lodashGet(forumObj, ['forumThreadsForListObj', `page${page}Obj`, 'arr'], []);
      
      let limit = lodashGet(forumObj, ['forumThreadsForListObj', 'limit'], parseInt(process.env.FORUM_THREAD_LIST_LIMIT, 10));
      
      if (changeLimit) {
        limit = changeLimit;
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
        //   表示件数変更
        // ---------------------------------------------
        
        clonedObj.forumThreadsForListObj.limit = limit;
        
        
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
        
        clonedObj.forumThreadsForListObj.page = page;
        
        this.handleEdit({
          pathArr: [communities_id],
          value: clonedObj
        });
        
        return;
        
      }
      
      
      console.log('fetch');
      
      
      
      
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
        threadPage: page,
        threadLimit: limit,
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
      //   Update forumThreadsForListObj
      // ---------------------------------------------
      
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
      
      
    }
    
    
  };
  
  
  
  
  
  
  // ---------------------------------------------
  //   スレッド
  // ---------------------------------------------
  
  /**
   * スレッドを読み込む
   * @param {Array} pathArr - パス
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {number} page - スレッドのページ
   * @param {number} changeLimit - 1ページに表示する件数を変更する場合、値を入力する
   */
  @action.bound
  async handleReadThreads({
    
    pathArr,
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
      
      let limit = lodashGet(forumObj, ['forumThreadsObj', 'limit'], parseInt(process.env.FORUM_THREAD_LIMIT, 10));
      
      if (changeLimit) {
        limit = changeLimit;
      }
      
      const commentLimit = lodashGet(forumObj, ['forumCommentsObj', 'limit'], parseInt(process.env.FORUM_COMMENT_LIMIT, 10));
      const replyLimit = lodashGet(forumObj, ['forumRepliesObj', 'limit'], parseInt(process.env.FORUM_REPLY_LIMIT, 10));
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
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
      //   commentPage: {green ${commentPage}}
      //   commentLimit: {green ${commentLimit}}
      //   replyPage: {green ${replyPage}}
      //   replyLimit: {green ${replyLimit}}
        
      //   limit: {green ${limit}}
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
      
      if (changeLimit) {
        
        
        // ---------------------------------------------
        //   表示件数変更
        // ---------------------------------------------
        
        lodashSet(clonedObj, ['forumThreadsObj', 'limit'], parseInt(changeLimit, 10));
        
        
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
        
        clonedObj.forumThreadsObj.page = page;
        
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
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        gameCommunities_id,
        userCommunities_id,
        threadPage: page,
        threadLimit: limit,
        commentPage: 1,
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
          urlApi: `${process.env.URL_API}/v2/db/forum-threads/read-threads`,
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
        to: 'forumThreads',
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
      });
      
      // // console.log('scrollBy');
      // // scrollBy(0, 5);
      
      // // console.log('headerNavMainBeginForScrollTo = true');
      // lodashSet(storeLayout, ['headerNavMainBeginForScrollTo'], true);
      
      // // const funcStopForScrollTo = () => {
      // //   console.log('AAA');
      // //   lodashSet(storeLayout, ['headerNavMainStopForScrollTo'], false);
      // // };
      
      // // const funcScroll = () => {
        
      // //   scroller.scrollTo('forumThreads', {
      // //     duration: 0,
      // //     delay: 1000,
      // //     smooth: 'easeInOutQuart',
      // //     offset: -100,
      // //     // onSetInactive: {funcStopForScrollTo},
      // //   });
        
      // //   Events.scrollEvent.register('end', (to, element) => {
      // //     console.log('Events.scrollEvent.register / end');
      // //     lodashSet(storeLayout, ['headerNavMainStopForScrollTo'], false);
      // //     // console.log("end", to, element);
      // //   });
        
      // //   // lodashSet(storeLayout, ['headerNavMainStopForScrollTo'], false);
        
      // // };
      
      
      
      // // console.log('setTimeout');
      // // setTimeout(funcScroll, 100);
      
      
      
      // scroller.scrollTo('forumThreads', {
      //   duration: 0,
      //   delay: 0,
      //   smooth: 'easeInOutQuart',
      //   offset: -50,
      //   // onSetInactive: {funcStopForScrollTo},
      // });
      
      // Events.scrollEvent.register('end', (to, element) => {
      //   // console.log('Events.scrollEvent.register / end');
      //   lodashSet(storeLayout, ['headerNavMainEndForScrollTo'], true);
      //   // console.log("end", to, element);
      // });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * スレッド編集フォームを表示する
   * @param {Array} pathArr - パス
   * @param {string} forumThreads_id - DB forum-threads _id
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
      
      // const formData = new FormData();
      
      // formData.append('forumThreads_id', forumThreads_id);
      
      
      
      
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
      
      
    }
    
    
  };
  
  
  
  
  /**
   * スレッド作成・編集フォームを送信する
   */
  @action.bound
  async handleSubmitFormThread({ pathArr, gameCommunities_id, userCommunities_id, forumThreads_id }) {
    
    
    // ---------------------------------------------
    //   Property
    // ---------------------------------------------
    
    const communities_id = gameCommunities_id || userCommunities_id;
    
    const name = lodashGet(this.dataObj, [...pathArr, 'name'], '');
    const comment = lodashGet(this.dataObj, [...pathArr, 'comment'], '');
    
    const imagesAndVideosObj = lodashGet(storeImageAndVideoForm, ['dataObj',  ...pathArr, 'imagesAndVideosObj'], {});
    
    
    try {
      
      
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
      
      const formData = new FormData();
      
      formData.append('gameCommunities_id', gameCommunities_id);
      formData.append('userCommunities_id', userCommunities_id);
      formData.append('forumThreads_id', forumThreads_id);
      formData.append('name', name);
      formData.append('comment', comment);
      
      if (Object.keys(imagesAndVideosObj).length !== 0) {
        formData.append('imagesAndVideosObj', JSON.stringify(imagesAndVideosObj));
      }
      
      
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        
        
      } else if (userCommunities_id) {
        
        resultObj = await fetchWrapper({
          urlApi: `${process.env.URL_API}/v1/forum-threads/upsert-uc`,
          methodType: 'POST',
          formData: formData
        });
        
      } else {
        
        
        
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
      //   Update Thread List
      // ---------------------------------------------
      
      const threadListLimit = lodashGet(this.dataObj, [communities_id, 'forumThreadsForListObj', 'limit'], parseInt(process.env.FORUM_THREAD_LIST_LIMIT, 10));
      
      await this.handleReadThreadsList({
        gameCommunities_id,
        userCommunities_id,
        page: 1,
        limit: threadListLimit,
      });
      
      
      // ---------------------------------------------
      //   Navigation / 開いているタブをスレッド一覧に変更する
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: [communities_id, 'navigationObj', 'openedTabNo'],
        value: 0,
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
      
      let limit = lodashGet(forumObj, ['forumCommentsObj', 'limit'], parseInt(process.env.FORUM_COMMENT_LIMIT, 10));
      
      if (changeLimit) {
        limit = changeLimit;
      }
      
      const threadLimit = lodashGet(forumObj, ['forumThreadsObj', 'limit'], parseInt(process.env.FORUM_THREAD_LIMIT, 10));
      const replyLimit = lodashGet(forumObj, ['forumRepliesObj', 'limit'], parseInt(process.env.FORUM_REPLY_LIMIT, 10));
      
      
      
      
      // ---------------------------------------------
      //   再読込するかどうか
      // ---------------------------------------------
      
      let reload = false;
      
      
      // ---------------------------------------------
      //   1ページに表示する件数を変更した場合、再読込
      // ---------------------------------------------
      
      if (changeLimit) {
        
        
        // ---------------------------------------------
        //   表示件数変更
        // ---------------------------------------------
        
        lodashSet(clonedObj, ['forumObj', 'commentLimit'], parseInt(changeLimit, 10));
        
        
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
        commentLimit: limit,
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
      
      
      
      // // ---------------------------------------------
      // //   Scroll
      // // ---------------------------------------------
      
      // scroller.scrollTo('forumThreads', {
      //   duration: 800,
      //   delay: 0,
      //   smooth: 'easeInOutQuart',
      //   offset: -100,
      // });
      
      
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
      
      const formData = new FormData();
      
      formData.append('forumComments_id', forumComments_id);
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v1/forum-comments/get-edit-data`,
        methodType: 'POST',
        formData: formData
      });
      
      
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
      
      // scrollBy(0, 1);
      
      // scroller.scrollTo(`form-${forumComments_id}`, {
      //   duration: 500,
      //   delay: 20,
      //   smooth: 'easeInOutQuart',
      //   offset: -70,
      // });
      
      
    }
    
    
  };
  
  
  
    
  /**
   * コメント作成・編集フォームを送信する
   */
  @action.bound
  async handleSubmitFormComment({ eventObj, pathArr = [], gameCommunities_id, userCommunities_id, forumThreads_id, forumComments_id }) {
    
    
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
      
      const formData = new FormData();
      
      formData.append('gameCommunities_id', gameCommunities_id);
      formData.append('userCommunities_id', userCommunities_id);
      formData.append('forumThreads_id', forumThreads_id);
      formData.append('name', name);
      formData.append('comment', comment);
      
      if (forumComments_id) {
        formData.append('forumComments_id', forumComments_id);
      }
      
      if (anonymity) {
        formData.append('anonymity', anonymity);
      }
      
      if (Object.keys(imagesAndVideosObj).length !== 0) {
        formData.append('imagesAndVideosObj', JSON.stringify(imagesAndVideosObj));
      }
      
      
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        
        
      } else if (userCommunities_id) {
        
        resultObj = await fetchWrapper({
          urlApi: `${process.env.URL_API}/v1/forum-comments/upsert-uc`,
          methodType: 'POST',
          formData: formData
        });
        
      } else {
        
        
        
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
      
      
      
      // --------------------------------------------------
      //   Update Data - forumThreadsObj
      // --------------------------------------------------
      
      const forumThreadsObj = lodashGet(resultObj, ['data', 'forumThreadsObj'], {});
      lodashSet(this.dataObj, [userCommunities_id, 'forumThreadsObj'], forumThreadsObj);
      
      
      // --------------------------------------------------
      //   Update Data - forumCommentsAndRepliesObj
      // --------------------------------------------------
      
      const forumCommentsAndRepliesObj = lodashGet(resultObj, ['data', 'forumCommentsAndRepliesObj'], {});
      lodashSet(this.dataObj, [userCommunities_id, 'forumCommentsAndRepliesObj'], forumCommentsAndRepliesObj);
      
      
      // ---------------------------------------------
      //   Close Form & Reset Form
      // ---------------------------------------------
      
      if (forumThreads_id) {
        
        lodashSet(this.dataObj, [forumComments_id, 'formCommentObj', 'show'], false);
        // lodashSet(this.dataObj, [forumThreads_id, 'showForm'], false);
        
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
        messageID: forumComments_id ? 'NKsMLWvkt' : 'fhi9lUaap',
      });
      
      
      // --------------------------------------------------
      //   Update Data - UpdatedDateObj
      // --------------------------------------------------
      
      // lodashSet(this.dataObj, [userCommunities_id], {});
      // lodashSet(this.dataObj, [userCommunities_id, 'updatedDateObj', 'forum'], '');
      
      // this.handleEdit({
      //   pathArr: [userCommunities_id, 'updatedDateObj', 'forum'],
      //   value: lodashGet(resultObj, ['data', 'updatedDateObj'], {}),
      // });
      
      
      // ---------------------------------------------
      //   スレッド読み込み
      // ---------------------------------------------
      
      this.handleReadThreads({
        pathArr,
        gameCommunities_id,
        userCommunities_id,
        page: 1,
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
      
      let limit = lodashGet(forumObj, ['forumRepliesObj', 'limit'], parseInt(process.env.FORUM_REPLY_LIMIT, 10));
      
      if (changeLimit) {
        limit = changeLimit;
      }
      
      const threadLimit = lodashGet(forumObj, ['forumThreadsObj', 'limit'], parseInt(process.env.FORUM_THREAD_LIMIT, 10));
      const commentLimit = lodashGet(forumObj, ['forumCommentsObj', 'limit'], parseInt(process.env.FORUM_COMMENT_LIMIT, 10));
      
      
      
      
      // ---------------------------------------------
      //   再読込するかどうか
      // ---------------------------------------------
      
      let reload = false;
      
      
      // ---------------------------------------------
      //   1ページに表示する件数を変更した場合、再読込
      // ---------------------------------------------
      
      if (changeLimit) {
        
        
        // ---------------------------------------------
        //   表示件数変更
        // ---------------------------------------------
        
        lodashSet(clonedObj, ['forumRepliesObj', 'limit'], parseInt(changeLimit, 10));
        
        
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
      
      console.log(chalk`
        reload: {green ${reload}}
      `);
      
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
      //   forumThreads_idArr
      // ---------------------------------------------
      
      let forumThreads_idArr = [];
      
      // 表示件数を変更する場合は他のスレッドも一緒に更新するため、現在表示されているスレッドのIDを取得する
      if (changeLimit) {
        
        const forumThreadsObj = lodashGet(forumObj, ['forumThreadsObj'], {});
        const forumThreadsPage = lodashGet(forumThreadsObj, ['page'], 1);
        forumThreads_idArr = lodashGet(forumThreadsObj, [`page${forumThreadsPage}Obj`, 'arr'], []);
        
        // 現在表示しているスレッドのIDを取得して、そのIDだけを除去する
        const forumThreads_id = lodashGet(forumObj, ['forumCommentsObj', 'dataObj', forumComments_id, 'forumThreads_id'], '');
        
        // console.log(chalk`
        //   forumThreads_id: {green ${forumThreads_id}}
        // `);
        
        forumThreads_idArr = forumThreads_idArr.filter(_id => _id !== forumThreads_id);
        
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
        forumComments_id,
        forumThreads_idArr,
        threadPage: 1,
        threadLimit,
        commentPage: 1,
        commentLimit,
        replyPage: page,
        replyLimit: limit,
        
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
      
      const forumThreadsOldObj = lodashGet(forumObj, ['forumThreadsObj'], {});
      const forumThreadsNewObj = lodashGet(resultObj, ['data', 'forumThreadsObj'], {});
      
      const forumThreadsMergedObj = lodashMerge(forumThreadsOldObj, forumThreadsNewObj);
      // const forumThreadsMergedObj = reload ? forumThreadsNewObj : lodashMerge(forumThreadsOldObj, forumThreadsNewObj);
      
      lodashSet(clonedObj, ['forumThreadsObj'], forumThreadsMergedObj);
      
      
      // ---------------------------------------------
      //   forumCommentObj
      // ---------------------------------------------
      
      const forumCommentsOldObj = lodashGet(forumObj, ['forumCommentsObj'], {});
      const forumCommentsNewObj = lodashGet(resultObj, ['data', 'forumCommentsObj'], {});
      
      const forumCommentsMergedObj = lodashMerge(forumCommentsOldObj, forumCommentsNewObj);
      // const forumCommentsMergedObj = reload ? forumCommentsNewObj : lodashMerge(forumCommentsOldObj, forumCommentsNewObj);
      
      lodashSet(clonedObj, ['forumCommentsObj'], forumCommentsMergedObj);
      
      
      // ---------------------------------------------
      //   forumRepliesObj
      // ---------------------------------------------
      
      const forumRepliesOldObj = lodashGet(forumObj, ['forumRepliesObj'], {});
      const forumRepliesNewObj = lodashGet(resultObj, ['data', 'forumRepliesObj'], {});
      
      // 古いデータと新しいデータをマージする
      // const forumRepliesMergedObj = reload ? forumRepliesNewObj : Object.assign(forumRepliesOldObj, forumRepliesNewObj);
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
      
      
      console.log(`
        ----- clonedObj -----\n
        ${util.inspect(JSON.parse(JSON.stringify(clonedObj)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      
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
      
      
      
      // // ---------------------------------------------
      // //   Scroll
      // // ---------------------------------------------
      
      // scroller.scrollTo('forumThreads', {
      //   duration: 800,
      //   delay: 0,
      //   smooth: 'easeInOutQuart',
      //   offset: -100,
      // });
      
      
    }
    
    
  };
  
  
  
  
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreForum({}) {
  
  if (storeForum === null) {
    storeForum = new Store();
  }
  
  return storeForum;
  
}