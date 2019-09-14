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
import { animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
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
   * スレッド一覧の1ページに表示する件数を変更する
   * @param {string} _id -  / userCommunities_id
   * @param {number} page - スレッド一覧のページ
   */
  @action.bound
  async handleChangeThreadRowsPerPage({ gameCommunities_id, userCommunities_id, limit }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   スレッド一覧を読み込む
      // ---------------------------------------------
      
      this.handleReadThreadsList({
        gameCommunities_id,
        userCommunities_id,
        page: 1,
        limit,
      });
      
      
    } catch (errorObj) {
      
    } finally {
      
    }
    
    
  };
  
  
  
  
  /**
   * スレッド一覧を読み込む
   * @param {string} _id -  / userCommunities_id
   * @param {number} page - スレッド一覧のページ
   */
  @action.bound
  async handleReadThreadsList({ gameCommunities_id, userCommunities_id, page, limit }) {
    
    
    const communities_id = gameCommunities_id || userCommunities_id;
    
    
    try {
      
      // console.log(`
      //   ----- this.dataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(this.dataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const forumObj = lodashGet(this.dataObj, [communities_id], {});
      const clonedObj = lodashCloneDeep(forumObj);
      
      const loadedDate = lodashGet(clonedObj, ['forumThreadsForListObj', 'dataObj', `page${page}Obj`, 'loadedDate'], '');
      const arr = lodashGet(clonedObj, ['forumThreadsForListObj', 'dataObj', `page${page}Obj`, 'arr'], []);
      
      let threadListLimit = lodashGet(clonedObj, ['forumThreadsForListObj', 'limit'], parseInt(process.env.FORUM_THREAD_LIST_LIMIT, 10));
      
      if (limit) {
        threadListLimit = limit;
      }
      
      
      
      
      // ---------------------------------------------
      //   再読込するかどうか
      // ---------------------------------------------
      
      let reload = false;
      
      
      // ---------------------------------------------
      //   1ページに表示する件数を変更した場合、再読込
      // ---------------------------------------------
      
      if (limit) {
        
        reload = true;
        
        // 表示件数変更
        clonedObj.forumThreadsForListObj.limit = limit;
        
      
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
        // const datetimeReloadLimit = moment(loadedDate).add(20, 's').utcOffset(0);
        
        if (
          datetimeForumUpdated.isAfter(datetimeLoaded) ||
          datetimeNow.isAfter(datetimeReloadLimit)
        ) {
          reload = true;
        }
        
        
        // console.log(chalk`
        //   datetimeLoaded: {green ${datetimeLoaded.format('YYYY/MM/DD hh:mm')}}
        //   datetimeForumUpdated: {green ${datetimeForumUpdated.format('YYYY/MM/DD hh:mm')}}
        //   datetimeNow: {green ${datetimeNow.format('YYYY/MM/DD hh:mm')}}
        //   datetimeReloadLimit: {green ${datetimeReloadLimit.format('YYYY/MM/DD hh:mm')}}
          
        //   datetimeForumUpdated.isAfter(datetimeLoaded): {green ${datetimeForumUpdated.isAfter(datetimeLoaded)}}
        //   datetimeNow.isAfter(datetimeReloadLimit): {green ${datetimeNow.isAfter(datetimeReloadLimit)}}
        // `);
        
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
      //   _id  : {green ${_id}}
      //   page  : {green ${page}}
      //   forumUpdatedDate  : {green ${forumUpdatedDate}}
        
      //   reload  : {green ${reload}}
        
      //   lodashHas: {green ${lodashHas(this.dataObj, [_id, 'forumThreadsForListObj', 'dataObj', `page${page}Arr`])}}
      // `);
      
      // console.log(`
      //   ----- lodashGet(this.dataObj, [_id, 'forumThreadsForListObj']) -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(lodashGet(this.dataObj, [_id, 'forumThreadsForListObj']))), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ _id: `${communities_id}-forumNavigation` });
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      let formData = new FormData();
      
      formData.append('gameCommunities_id', gameCommunities_id);
      formData.append('userCommunities_id', userCommunities_id);
      formData.append('page', page);
      formData.append('limit', threadListLimit);
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        
        
      } else {
        
        resultObj = await fetchWrapper({
          // urlApi: encodeURI(`${process.env.URL_API}/v2/uc/community?userCommunityID=community1`),
          // urlApi: `${process.env.URL_API}/v2/db/forum-threads/read-threads-list`,
          urlApi: `${process.env.URL_API}/v1/forum-threads/read-threads-list`,
          methodType: 'POST',
          formData: formData,
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
      
      const newObj = lodashGet(resultObj, ['data', 'forumThreadsForListObj'], {});
      
      // 再読込する場合は新しいデータに置き換える、再読込しない場合は古いデータと新しいデータをマージする
      const mergedObj = reload ? newObj : lodashMerge(clonedObj.forumThreadsForListObj, newObj);
      
      clonedObj.forumThreadsForListObj = mergedObj;
      
      // console.log(`
      //   ----- mergedObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(mergedObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Page & Limit
      // ---------------------------------------------
      
      clonedObj.forumThreadsForListObj.page = page;
      
      if (limit) {
        clonedObj.forumThreadsForListObj.limit = parseInt(limit, 10);
      }
      
      
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
      
      storeLayout.handleButtonEnable({ _id: `${communities_id}-forumNavigation` });
      
      
    }
    
    
  };
  
  
  
  
  // ---------------------------------------------
  //   スレッド
  // ---------------------------------------------
  
  /**
   * スレッドを読み込む
   * @param {string} _id -  / userCommunities_id
   * @param {number} page - スレッド一覧のページ
   */
  @action.bound
  async handleReadThreads({
    
    pathArr,
    gameCommunities_id,
    userCommunities_id,
    threadPage,
    threadLimit,
    commentPage, 
    commentLimit,
    replyPage,
    replyLimit,
    
  }) {
    
    
    const communities_id = gameCommunities_id || userCommunities_id;
    
    
    try {
      
      // console.log(`
      //   ----- this.dataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(this.dataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const forumObj = lodashGet(this.dataObj, [communities_id], {});
      const clonedObj = lodashCloneDeep(forumObj);
      
      const loadedDate = lodashGet(clonedObj, ['forumThreadsObj', 'dataObj', `page${threadPage}Obj`, 'loadedDate'], '');
      const arr = lodashGet(clonedObj, ['forumThreadsObj', 'dataObj', `page${threadPage}Obj`, 'arr'], []);
      
      let limit = lodashGet(clonedObj, ['forumObj', 'threadLimit'], parseInt(process.env.FORUM_THREAD_LIMIT, 10));
      
      if (threadLimit) {
        limit = threadLimit;
      }
      
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      //   threadPage: {green ${threadPage}}
      //   threadLimit: {green ${threadLimit}}
      //   commentPage: {green ${commentPage}}
      //   commentLimit: {green ${commentLimit}}
      //   replyPage: {green ${replyPage}}
      //   replyLimit: {green ${replyLimit}}
        
      //   loadedDate: {green ${loadedDate}}
      // `);
      
      // console.log(`
      //   ----- arr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   再読込するかどうか
      // ---------------------------------------------
      
      let reload = false;
      
      
      // ---------------------------------------------
      //   1ページに表示する件数を変更した場合、再読込
      // ---------------------------------------------
      
      if (threadLimit) {
        
        // 表示件数変更
        lodashSet(clonedObj, ['forumObj', 'threadLimit'], parseInt(threadLimit, 10));
        
        reload = true;
        
      
      // ---------------------------------------------
      //   最後の読み込み以降にスレッドの更新があった場合
      //   または最後の読み込みからある程度時間（10分）が経っていた場合、再読込する
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
      
      
      // console.log(chalk`
      //   reload: {green ${reload}}
      // `);
      
      
      // ---------------------------------------------
      //   すでにデータを読み込んでいる場合は、ストアのデータを表示する
      // ---------------------------------------------
      
      if (!reload && arr.length > 0) {
        
        console.log('store');
        
        clonedObj.forumThreadsObj.page = threadPage;
        
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
      
      let formData = new FormData();
      
      formData.append('gameCommunities_id', gameCommunities_id);
      formData.append('userCommunities_id', userCommunities_id);
      formData.append('threadPage', threadPage);
      formData.append('threadLimit', limit);
      
      if (commentPage) {
        formData.append('commentPage', commentPage);
      }
      
      if (commentLimit) {
        formData.append('commentLimit', commentLimit);
      }
      
      if (replyPage) {
        formData.append('replyPage', replyPage);
      }
      
      if (replyLimit) {
        formData.append('replyLimit', replyLimit);
      }
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        
        
      } else {
        
        resultObj = await fetchWrapper({
          urlApi: `${process.env.URL_API}/v1/forum-threads/read-threads`,
          methodType: 'POST',
          formData: formData,
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
      
      const forumThreadsOldObj = lodashGet(clonedObj, ['forumThreadsObj'], {});
      const forumThreadsNewObj = lodashGet(resultObj, ['data', 'forumThreadsObj'], {});
      
      // 再読込する場合は新しいデータに置き換える、再読込しない場合は古いデータと新しいデータをマージする
      const forumThreadsMergedObj = reload ? forumThreadsNewObj : lodashMerge(forumThreadsOldObj, forumThreadsNewObj);
      
      clonedObj.forumThreadsObj = forumThreadsMergedObj;
      
      // console.log(`
      //   ----- forumThreadsMergedObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsMergedObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   forumCommentsAndRepliesObj
      // ---------------------------------------------
      
      const forumCommentsAndRepliesOldObj = lodashGet(clonedObj, ['forumCommentsAndRepliesObj'], {});
      const forumCommentsAndRepliesNewObj = lodashGet(resultObj, ['data', 'forumCommentsAndRepliesObj'], {});
      
      // 古いデータと新しいデータをマージする
      const forumCommentsAndRepliesMergedObj = Object.assign(forumCommentsAndRepliesOldObj, forumCommentsAndRepliesNewObj);
      
      clonedObj.forumCommentsAndRepliesObj = forumCommentsAndRepliesMergedObj;
      
      
      
      
      // ---------------------------------------------
      //   Page
      // ---------------------------------------------
      
      clonedObj.forumThreadsObj.page = threadPage;
      
      
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
      
      
      
      // scroll.scrollToTop();
      // scroller.scrollTo('forumThreads', {
      //   duration: 1500,
      //   delay: 100,
      //   smooth: true,
      //   containerId: 'layout',
      //   // offset: 50, // Scrolls to element + 50 pixels down the page
      // });
      
      // scroll.scrollTo(300);
      
      
      // ---------------------------------------------
      //   Scroll
      // ---------------------------------------------
      
      scroller.scrollTo('forumThreads', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -100,
      });
      
      
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
      
      const formData = new FormData();
      
      formData.append('forumThreads_id', forumThreads_id);
      
      
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v1/forum-threads/get-edit-data`,
        methodType: 'POST',
        formData: formData
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
   * @param {number} limit - コメントのリミット
   */
  @action.bound
  async handleReadComments({ pathArr, gameCommunities_id, userCommunities_id, forumThreads_id, page, limit }) {
    
    const communities_id = gameCommunities_id || userCommunities_id;
    
    
    try {
      
      // console.log(`
      //   ----- this.dataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(this.dataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const forumObj = lodashGet(this.dataObj, [communities_id], {});
      const clonedObj = lodashCloneDeep(forumObj);
      
      const loadedDate = lodashGet(clonedObj, ['forumCommentsAndRepliesObj ', forumThreads_id, 'dataObj', `page${page}Obj`, 'loadedDate'], '');
      const arr = lodashGet(clonedObj, ['forumCommentsAndRepliesObj', forumThreads_id, 'dataObj', `page${page}Obj`, 'arr'], []);
      
      let commentLimit = lodashGet(clonedObj, ['forumObj', 'commentLimit'], parseInt(process.env.FORUM_COMMENT_LIMIT, 10));
      
      if (limit) {
        commentLimit = limit;
      }
      
      
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      let reload = false;
      
      
      // ---------------------------------------------
      //   1ページに表示する件数を変更した場合、再読込
      // ---------------------------------------------
      
      if (limit) {
        
        
        // ---------------------------------------------
        //   表示件数変更
        // ---------------------------------------------
        
        lodashSet(clonedObj, ['forumObj', 'commentLimit'], parseInt(limit, 10));
        
        
        // ---------------------------------------------
        //   再読込
        // ---------------------------------------------
        
        reload = true;
        
      
      // ---------------------------------------------
      //   最後の読み込み以降にフォーラムの更新があった場合
      //   または最後の読み込みからある程度時間（10分）が経っていた場合、再読込する
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
      
      // console.log(chalk`
      //   reload: {green ${reload}}
      // `);
      
      
      
      
      // ---------------------------------------------
      //   すでにデータを読み込んでいる場合は、ストアのデータを表示する
      // ---------------------------------------------
      
      if (!reload && arr.length > 0) {
        
        console.log('store');
        
        lodashSet(clonedObj, ['forumCommentsAndRepliesObj', forumThreads_id, 'page'], page);
        
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
      
      const forumThreadsObj = lodashGet(this.dataObj, [communities_id, 'forumThreadsObj'], {});
      const forumThreadsPage = lodashGet(forumThreadsObj, ['page'], 1);
      const forumThreadsOldArr = lodashGet(forumThreadsObj, ['dataObj', `page${forumThreadsPage}Obj`, 'arr'], []);
      let forumThreads_idArr = [forumThreads_id];
      
      if (limit) {
        
        forumThreads_idArr = [];
        
        for (let valueObj of forumThreadsOldArr.values()) {
          forumThreads_idArr.push(valueObj._id);
        }
        
      }
      
      
      // console.log(`
      //   ----- forumThreadsOldArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsOldArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      let formData = new FormData();
      
      formData.append('gameCommunities_id', gameCommunities_id);
      formData.append('userCommunities_id', userCommunities_id);
      formData.append('forumThreads_id', forumThreads_id);
      formData.append('forumThreads_idArr', JSON.stringify(forumThreads_idArr));
      formData.append('page', page);
      formData.append('limit', commentLimit);
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        
        
      } else {
        
        resultObj = await fetchWrapper({
          urlApi: `${process.env.URL_API}/v1/forum-comments/read-comments`,
          methodType: 'POST',
          formData: formData,
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
      
      const forumThreadsNewArr = lodashGet(resultObj, ['data', 'forumThreadsArr'], []);
      
      let tempObj = {};
      const forumThreadsMergedArr = [];
      
      for (const [index, valueObj] of forumThreadsNewArr.entries()) {
        tempObj[valueObj._id] = index;
      }
      
      for (let valueObj of forumThreadsOldArr.values()) {
        
        const tempIndex = tempObj[valueObj._id];
        
        // console.log(chalk`
        //   tempIndex: {green ${tempIndex}}
        // `);
        
        if (tempIndex) {
          forumThreadsMergedArr.push(forumThreadsNewArr[tempIndex]);
        } else {
          forumThreadsMergedArr.push(valueObj);
        }
        
      }
      
      lodashSet(clonedObj, ['forumThreadsObj', 'dataObj', `page${forumThreadsPage}Obj`, 'arr'], forumThreadsMergedArr);
      
      
      // console.log(`
      //   ----- tempObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(tempObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- forumThreadsNewArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsNewArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- forumThreadsMergedArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsMergedArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   forumCommentsAndRepliesObj
      // ---------------------------------------------
      
      const forumCommentsAndRepliesOldObj = lodashGet(clonedObj, ['forumCommentsAndRepliesObj'], {});
      const forumCommentsAndRepliesNewObj = lodashGet(resultObj, ['data', 'forumCommentsAndRepliesObj'], {});
      
      
      // console.log(`
      //   ----- forumCommentsAndRepliesOldObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumCommentsAndRepliesOldObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- forumCommentsAndRepliesNewObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumCommentsAndRepliesNewObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // 古いデータと新しいデータをマージする
      const forumCommentsAndRepliesMergedObj = Object.assign(forumCommentsAndRepliesOldObj, forumCommentsAndRepliesNewObj);
      
      clonedObj.forumCommentsAndRepliesObj = forumCommentsAndRepliesMergedObj;
      
      
      // console.log(`
      //   ----- forumCommentsAndRepliesMergedObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumCommentsAndRepliesMergedObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   Page
      // ---------------------------------------------
      
      clonedObj.forumCommentsAndRepliesObj.page = page;
      
      
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
   * コメントの1ページに表示する件数を変更する
   * @param {string} _id -  / userCommunities_id
   * @param {number} page - スレッド一覧のページ
   */
//   @action.bound
//   async handleChangeCommentRowsPerPage({
    
//     pathArr,
//     gameCommunities_id,
//     userCommunities_id,
//     // threadPage,
//     // threadLimit,
//     // commentPage, 
//     commentLimit,
//     // replyPage,
//     // replyLimit,
    
//   }) {
    
    
//     try {
      
      
//       // ---------------------------------------------
//       //   表示件数を変更
//       // ---------------------------------------------
      
//       const communities_id = gameCommunities_id || userCommunities_id;
      
//       lodashSet(this.dataObj, [communities_id, 'forumObj', 'commentLimit'], parseInt(commentLimit, 10));
      
      
      
//       const threadLimit = lodashGet(this.dataObj, [communities_id, 'forumObj', 'threadLimit'], parseInt(process.env.FORUM_THREAD_LIMIT, 10));
//       const replyLimit = lodashGet(this.dataObj, [communities_id, 'forumObj', 'replyLimit'], parseInt(process.env.FORUM_REPLY_LIMIT, 10));
      
//       console.log(chalk`
//   threadLimit: {green ${threadLimit}}
//   replyLimit: {green ${replyLimit}}
// `);
      
      
//       // ---------------------------------------------
//       //   スレッド一覧を読み込む
//       // ---------------------------------------------
      
//       this.handleReadThreads({
//         pathArr,
//         gameCommunities_id,
//         userCommunities_id,
//         // threadPage: 1,
//         // threadLimit: 20,
//         threadPage: 1,
//         threadLimit,
//         commentPage: 1,
//         commentLimit,
//         replyPage: 1,
//         replyLimit,
//       });
      
      
//     } catch (errorObj) {
      
//     } finally {
      
//     }
    
    
//   };
  
  
  
  
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
      
      scrollBy(0, 1);
      
      scroller.scrollTo(`form-${forumComments_id}`, {
        duration: 500,
        delay: 20,
        smooth: 'easeInOutQuart',
        offset: -70,
      });
      
      
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
   * @param {string} forumThreads_id - DB forum-threads _id / スレッドのID
   * @param {number} page - コメントのページ
   * @param {number} limit - コメントのリミット
   */
  @action.bound
  async handleReadReplies({ pathArr, gameCommunities_id, userCommunities_id, forumComments_id, page, limit }) {
    
    const communities_id = gameCommunities_id || userCommunities_id;
    
    
    try {
      
      
      // console.log(`
      //   ----- this.dataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(this.dataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const forumObj = lodashGet(this.dataObj, [communities_id], {});
      const clonedObj = lodashCloneDeep(forumObj);
      
      const loadedDate = lodashGet(clonedObj, ['forumCommentsAndRepliesObj ', forumComments_id, 'dataObj', `page${page}Obj`, 'loadedDate'], '');
      const arr = lodashGet(clonedObj, ['forumCommentsAndRepliesObj', forumComments_id, 'dataObj', `page${page}Obj`, 'arr'], []);
      
      let replyLimit = lodashGet(clonedObj, ['forumObj', 'replyLimit'], parseInt(process.env.FORUM_REPLY_LIMIT, 10));
      
      if (limit) {
        replyLimit = limit;
      }
      
      
      
      
      // ---------------------------------------------
      //   再読込するかどうか
      // ---------------------------------------------
      
      let reload = false;
      
      
      // ---------------------------------------------
      //   1ページに表示する件数を変更した場合、再読込
      // ---------------------------------------------
      
      if (limit) {
        
        // 表示件数変更
        lodashSet(clonedObj, ['forumObj', 'replyLimit'], parseInt(limit, 10));
        
        reload = true;
        
      
      // ---------------------------------------------
      //   最後の読み込み以降にフォーラムの更新があった場合
      //   または最後の読み込みからある程度時間（10分）が経っていた場合、再読込する
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
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      console.log(chalk`
        gameCommunities_id: {green ${gameCommunities_id}}
        userCommunities_id: {green ${userCommunities_id}}
        forumComments_id: {green ${forumComments_id}}
        page: {green ${page}}
        replyLimit: {green ${replyLimit}}
        
        loadedDate: {green ${loadedDate}}
      `);
      
      // console.log(`
      //   ----- arr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      console.log(`
        ----- clonedObj -----\n
        ${util.inspect(JSON.parse(JSON.stringify(clonedObj)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      
      // const forumCommentsAndRepliesObj = lodashGet(this.dataObj, [communities_id, 'forumCommentsAndRepliesObj', forumComments_id], {});
      
      // console.log(`
      //   ----- forumCommentsAndRepliesObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumCommentsAndRepliesObj)), { colors: true, depth: null })}\n
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
        
        lodashSet(clonedObj, ['forumCommentsAndRepliesObj', forumComments_id, 'page'], page);
        
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
      
      // const forumThreadsObj = lodashGet(this.dataObj, [communities_id, 'forumThreadsObj'], {});
      // const forumThreadsPage = lodashGet(forumThreadsObj, ['page'], 1);
      // const forumThreadsOldArr = lodashGet(forumThreadsObj, ['dataObj', `page${forumThreadsPage}Obj`, 'arr'], []);
      // const forumThreads_idArr = [];
      
      // for (let valueObj of forumThreadsOldArr.values()) {
      //   forumThreads_idArr.push(valueObj._id);
      // }
      
      
      
      // forumObj = {
      //   threadLimit: 5,
      //   threadCount: 5,
      //   replyLimit: 1,
        
      //   threadPage: 1,
        
      //   dataObj: {
      //     page1Arr: [{
            
      //     }],
      //     page1Obj: {
            
      //     }
      //   }
      // };
      
      
      const forumThreadsObj = {
        
        page: 1,
        limit: 1,
        count: 5,
        
        page1Obj: {
          loadedDate: '',
          arr: ['_XDDSTWV_', '8xJS6lZCm', 'KQ_FuEYRu'],
        },
        
        page2Obj: {
          loadedDate: '',
          arr: ['HpzNGyKQE', 'qNiOLKdRt'],
        },
        
        dataObj: {},
        
      };
      
      
      const forumCommentsObj = {
        
        limit: 5,
        
        '_XDDSTWV_': {
          
          page: 1,
          count: 5,
          
          page1Obj: {
            loadedDate: '',
            arr: ['_XDDSTWV_', '8xJS6lZCm', 'KQ_FuEYRu'],
          },
          
          page2Obj: {
            loadedDate: '',
            arr: ['HpzNGyKQE', 'qNiOLKdRt'],
          },
          
          dataObj: {},
          
        }
        
      };
      
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      let formData = new FormData();
      
      formData.append('gameCommunities_id', gameCommunities_id);
      formData.append('userCommunities_id', userCommunities_id);
      formData.append('forumComments_id', forumComments_id);
      // formData.append('forumThreads_idArr', JSON.stringify(forumThreads_idArr));
      formData.append('page', page);
      formData.append('limit', replyLimit);
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        
        
      } else {
        
        resultObj = await fetchWrapper({
          urlApi: `${process.env.URL_API}/v1/forum-comments/read-replies`,
          methodType: 'POST',
          formData: formData,
        });
        
      }
      
      
      console.log(`\n---------- resultObj ----------\n`);
      console.dir(resultObj);
      console.log(`\n-----------------------------------\n`);
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // ---------------------------------------------
      //   forumCommentObj
      // ---------------------------------------------
      
      const newForumCommentObj = lodashGet(resultObj, ['data', 'forumCommentObj'], {});
      const forumThreads_id = lodashGet(newForumCommentObj, ['forumThreads_id'], '');
      const commentPage = lodashGet(clonedObj, ['forumCommentsAndRepliesObj', forumThreads_id, 'page'], 1);
      const commentDataArr = lodashGet(clonedObj, ['forumCommentsAndRepliesObj', forumThreads_id, 'dataObj', `page${commentPage}Obj`, 'arr'], []);
      
      const index = commentDataArr.findIndex((valueObj) => {
        return valueObj._id === forumComments_id;
      });
      
      lodashSet(clonedObj, ['forumCommentsAndRepliesObj', forumThreads_id, 'dataObj', `page${commentPage}Obj`, 'arr', index], newForumCommentObj);
      
      
      // const forumThreadsMergedArr = lodashMerge(forumThreadsOldArr, forumThreadsNewArr);
      // lodashSet(clonedObj, ['forumThreadsObj', 'dataObj', `page${forumThreadsPage}Obj`, 'arr'], forumThreadsMergedArr);
      
      // console.log(chalk`
      //   forumThreads_id: {green ${forumThreads_id}}
      //   commentPage: {green ${commentPage}}
      //   index: {green ${index}}
      // `);
      
      // console.log(`
      //   ----- newForumCommentObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(newForumCommentObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- commentDataArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(commentDataArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   forumCommentsAndRepliesObj
      // ---------------------------------------------
      
      const forumRepliesOldObj = lodashGet(clonedObj, ['forumCommentsAndRepliesObj', forumComments_id], {});
      const forumRepliesNewObj = lodashGet(resultObj, ['data', 'forumRepliesObj', forumComments_id], {});
      
      console.log(`
        ----- forumRepliesOldObj -----\n
        ${util.inspect(JSON.parse(JSON.stringify(forumRepliesOldObj)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      console.log(`
        ----- forumRepliesNewObj -----\n
        ${util.inspect(JSON.parse(JSON.stringify(forumRepliesNewObj)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      // 古いデータと新しいデータをマージする
      // const forumRepliesMergedObj = reload ? forumRepliesNewObj : Object.assign(forumRepliesOldObj, forumRepliesNewObj);
      const forumRepliesMergedObj = reload ? forumRepliesNewObj : lodashMerge(forumRepliesOldObj, forumRepliesNewObj);
      
      lodashSet(clonedObj, ['forumCommentsAndRepliesObj', forumComments_id], forumRepliesMergedObj);
      // clonedObj.forumCommentsAndRepliesObj = forumCommentsAndRepliesMergedObj;
      
      
      
      
      console.log(`
        ----- forumRepliesMergedObj -----\n
        ${util.inspect(JSON.parse(JSON.stringify(forumRepliesMergedObj)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      
      
      
      // ---------------------------------------------
      //   Page
      // ---------------------------------------------
      
      // clonedObj.forumCommentsAndRepliesObj.page = page;
      
      
      // --------------------------------------------------
      //   Community UpdatedDateObj
      // --------------------------------------------------
      
      const updatedDateObj = lodashGet(resultObj, ['data', 'updatedDateObj'], {});
      clonedObj.updatedDateObj = updatedDateObj;
      
      
      // ---------------------------------------------
      //   Update
      // ---------------------------------------------
      
      // this.dataObj[communities_id] = clonedObj;
      
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