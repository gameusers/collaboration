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
import { validationForumThreadsDescription } from '../../../@database/forum-threads/validations/description';


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
        // forumUpdatedDate,
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
        const datetimeReloadLimit = moment(loadedDate).add(process.env.FORUM_THREAD_RELOAD_MINUTES, 'm').utcOffset(0);
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
          // urlApi: `${process.env.URL_API}/v2/db/forum-threads/list-uc`,
          urlApi: `${process.env.URL_API}/v1/forum-threads/list-uc`,
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
  
  
  
  
  /**
   * スレッドを読み込む
   * @param {string} _id -  / userCommunities_id
   * @param {number} page - スレッド一覧のページ
   */
  @action.bound
  async handleReadThreads({ pathArr, gameCommunities_id, userCommunities_id, page, limit }) {
    
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
      
      const loadedDate = lodashGet(clonedObj, ['forumThreadsObj', 'dataObj', `page${page}Obj`, 'loadedDate'], '');
      const arr = lodashGet(clonedObj, ['forumThreadsObj', 'dataObj', `page${page}Obj`, 'arr'], []);
      
      let threadLimit = lodashGet(clonedObj, ['forumThreadsObj', 'limit'], parseInt(process.env.FORUM_THREAD_LIMIT, 10));
      
      if (limit) {
        threadLimit = limit;
      }
      
      
      console.log(`
        ----- pathArr -----\n
        ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      console.log(chalk`
        gameCommunities_id: {green ${gameCommunities_id}}
        userCommunities_id: {green ${userCommunities_id}}
        page: {green ${page}}
        limit: {green ${limit}}
        
        loadedDate  : {green ${loadedDate}}
      `);
      
      console.log(`
        ----- arr -----\n
        ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      
      
      
      // ---------------------------------------------
      //   再読込するかどうか
      // ---------------------------------------------
      
      let reload = false;
      
      
      // ---------------------------------------------
      //   1ページに表示する件数を変更した場合、再読込
      // ---------------------------------------------
      
      if (limit) {
        
        // 表示件数変更
        clonedObj.forumThreadsObj.limit = parseInt(limit, 10);
        
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
        const datetimeReloadLimit = moment(loadedDate).add(process.env.FORUM_THREAD_RELOAD_MINUTES, 'm').utcOffset(0);
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
      
      storeLayout.handleButtonDisable({ pathArr: [...pathArr, 'buttonDisabled'] });
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      let formData = new FormData();
      
      formData.append('gameCommunities_id', gameCommunities_id);
      formData.append('userCommunities_id', userCommunities_id);
      formData.append('page', page);
      formData.append('limit', threadLimit);
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      // if (gameCommunities_id) {
        
        
        
      // } else {
        
      //   resultObj = await fetchWrapper({
      //     // urlApi: encodeURI(`${process.env.URL_API}/v2/uc/community?userCommunityID=community1`),
      //     // urlApi: `${process.env.URL_API}/v2/db/forum-threads/list-uc`,
      //     urlApi: `${process.env.URL_API}/v1/forum-threads/list-uc`,
      //     methodType: 'POST',
      //     formData: formData,
      //   });
        
      // }
      
      
      
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
      
      // const newObj = lodashGet(resultObj, ['data', 'forumThreadsObj'], {});
      
      // // 再読込する場合は新しいデータに置き換える、再読込しない場合は古いデータと新しいデータをマージする
      // const mergedObj = reload ? newObj : lodashMerge(clonedObj.forumThreadsObj, newObj);
      
      // clonedObj.forumThreadsObj = mergedObj;
      
      // // console.log(`
      // //   ----- mergedObj -----\n
      // //   ${util.inspect(JSON.parse(JSON.stringify(mergedObj)), { colors: true, depth: null })}\n
      // //   --------------------\n
      // // `);
      
      
      // ---------------------------------------------
      //   Page & Limit
      // ---------------------------------------------
      
      clonedObj.forumThreadsObj.page = page;
      
      
      // // --------------------------------------------------
      // //   UpdatedDateObj
      // // --------------------------------------------------
      
      // const updatedDateObj = lodashGet(resultObj, ['data', 'updatedDateObj'], {});
      // clonedObj.updatedDateObj = updatedDateObj;
      
      
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
      
      storeLayout.handleButtonEnable({ pathArr: [...pathArr, 'buttonDisabled'] });
      
      
      // ---------------------------------------------
      //   Loading 非表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingHide({});
      
      
    }
    
    
  };
  
  
  
  
  /**
   * スレッド編集フォームを表示する
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
      
      storeLayout.handleButtonDisable({ pathArr: [...pathArr, 'buttonDisabled'] });
      
      
      
      
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
      const description = lodashGet(resultObj, ['data', 'description'], '');
      const imagesAndVideosObj = lodashGet(resultObj, ['data', 'imagesAndVideosObj'], '');
      
      lodashSet(this.dataObj, [forumThreads_id, 'formThreadObj', 'name'], name);
      lodashSet(this.dataObj, [forumThreads_id, 'formThreadObj', 'description'], description);
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
      
      storeLayout.handleButtonEnable({ pathArr: [...pathArr, 'buttonDisabled'] });
      
      
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
    const description = lodashGet(this.dataObj, [...pathArr, 'description'], '');
    
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
      const validationForumThreadsDescriptionObj = validationForumThreadsDescription({ value: description });
      
      
      // ---------------------------------------------
      //   Validation Error
      // ---------------------------------------------
      
      if (
        validationForumThreadsNameObj.error ||
        validationForumThreadsDescriptionObj.error
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
      
      storeLayout.handleButtonDisable({ pathArr: [...pathArr, 'buttonDisabled'] });
      
      
      
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
      //   description: {green ${description}}
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
      formData.append('description', description);
      
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
        lodashSet(this.dataObj, [...pathArr, 'description'], '');
        
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
      
      storeLayout.handleButtonEnable({ pathArr: [...pathArr, 'buttonDisabled'] });
      
      
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

export default function initStoreForum({}) {
  
  if (storeForum === null) {
    storeForum = new Store();
  }
  
  return storeForum;
  
}