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
   * @param {string} threadUpdatedDate - スレッドの最終更新日時
   */
  @action.bound
  async handleChangeThreadRowsPerPage({ gameCommunities_id, userCommunities_id, threadUpdatedDate, limit }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   スレッド一覧を読み込む
      // ---------------------------------------------
      
      this.handleReadThreadsList({
        gameCommunities_id,
        userCommunities_id,
        page: 1,
        threadUpdatedDate,
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
   * @param {string} threadUpdatedDate - スレッドの最終更新日時
   */
  @action.bound
  async handleReadThreadsList({ gameCommunities_id, userCommunities_id, page, limit, threadUpdatedDate }) {
    
    
    const _id = gameCommunities_id || userCommunities_id;
    
    
    try {
      
      // console.log(`
      //   ----- this.dataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(this.dataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const forumObj = lodashGet(this.dataObj, [_id], {});
      let clonedObj = lodashCloneDeep(forumObj);
      
      const loadedDate = lodashGet(clonedObj, ['forumThreadsObj', 'dataObj', `page${page}Obj`, 'loadedDate'], '');
      const arr = lodashGet(clonedObj, ['forumThreadsObj', 'dataObj', `page${page}Obj`, 'arr'], []);
      
      let threadListLimit = lodashGet(clonedObj, ['forumThreadsObj', 'limit'], process.env.FORUM_THREADS_LIMIT);
      
      if (limit) {
        threadListLimit = limit;
      }
      
      // console.log(`
      //   ----- cloneforumThreadsObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(cloneforumThreadsObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      // ---------------------------------------------
      //   最後の読み込み以降にスレッドの更新があった場合
      //   最後の読み込みから特定時間経っていた場合、再読込する
      // ---------------------------------------------
      
      let reload = false;
      
      // 1ページに表示する件数を変更した場合、再読込
      if (limit) {
        
        reload = true;
        
      } else if (loadedDate) {
        
        const threadUpdatedDate = lodashGet(clonedObj, ['updatedDateObj', 'thread'], '0000-01-01T00:00:00Z');
        
        const datetimeLoaded = moment(loadedDate).utcOffset(0);
        const datetimeThreadUpdated = moment(threadUpdatedDate).utcOffset(0);
        const datetimeNow = moment().utcOffset(0);
        const datetimeReloadLimit = moment(loadedDate).add(process.env.FORUM_THREADS_RELOAD_MINUTES, 'm').utcOffset(0);
        // const datetimeReloadLimit = moment(loadedDate).add(20, 's').utcOffset(0);
        
        if (
          datetimeThreadUpdated.isAfter(datetimeLoaded) ||
          datetimeNow.isAfter(datetimeReloadLimit)
        ) {
          reload = true;
        }
        
        
        // console.log(chalk`
        //   datetimeLoaded: {green ${datetimeLoaded.format('YYYY/MM/DD hh:mm')}}
        //   datetimeThreadUpdated: {green ${datetimeThreadUpdated.format('YYYY/MM/DD hh:mm')}}
        //   datetimeNow: {green ${datetimeNow.format('YYYY/MM/DD hh:mm')}}
        //   datetimeReloadLimit: {green ${datetimeReloadLimit.format('YYYY/MM/DD hh:mm')}}
          
        //   datetimeThreadUpdated.isAfter(datetimeLoaded): {green ${datetimeThreadUpdated.isAfter(datetimeLoaded)}}
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
          pathArr: [_id],
          value: clonedObj
        });
        
        return;
        
      }
      
      
      console.log('fetch');
      
      // console.log(chalk`
      //   _id  : {green ${_id}}
      //   page  : {green ${page}}
      //   threadUpdatedDate  : {green ${threadUpdatedDate}}
        
      //   reload  : {green ${reload}}
        
      //   lodashHas: {green ${lodashHas(this.dataObj, [_id, 'forumThreadsObj', 'dataObj', `page${page}Arr`])}}
      // `);
      
      // console.log(`
      //   ----- lodashGet(this.dataObj, [_id, 'forumThreadsObj']) -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(lodashGet(this.dataObj, [_id, 'forumThreadsObj']))), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ _id: `${_id}-forumNavigation` });
      
      
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
      
      const newObj = lodashGet(resultObj, ['data', 'forumThreadsObj'], {});
      
      // 再読込する場合は新しいデータに置き換える、再読込しない場合は古いデータと新しいデータをマージする
      const mergedObj = reload ? newObj : lodashMerge(clonedObj.forumThreadsObj, newObj);
      
      clonedObj.forumThreadsObj = mergedObj;
      
      // console.log(`
      //   ----- mergedObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(mergedObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Page & Limit
      // ---------------------------------------------
      
      clonedObj.forumThreadsObj.page = page;
      
      if (limit) {
        clonedObj.forumThreadsObj.limit = parseInt(limit, 10);
      }
      
      
      // --------------------------------------------------
      //   UpdatedDateObj
      // --------------------------------------------------
      
      const updatedDateObj = lodashGet(resultObj, ['data', 'updatedDateObj'], {});
      clonedObj.updatedDateObj = updatedDateObj;
      
      
      // ---------------------------------------------
      //   Update forumThreadsObj
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: [_id],
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
      
      storeLayout.handleButtonEnable({ _id: `${_id}-forumNavigation` });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * スレッド作成フォームを送信する
   */
  @action.bound
  async handleSubmitCreateThread({ gameCommunities_id, userCommunities_id }) {
    
    
    // ---------------------------------------------
    //   Common Property
    // ---------------------------------------------
    
    const _id = gameCommunities_id || userCommunities_id;
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const name = lodashGet(this.dataObj, [_id, 'createThreadObj', 'name'], '');
      const description = lodashGet(this.dataObj, [_id, 'createThreadObj', 'description'], '');
      const imagesAndVideosObj = storeImageAndVideoForm.handleGetImagesAndVideosObj({ _id });;
      
      
      
      
      // ---------------------------------------------
      //   _id が存在しない場合エラー
      // ---------------------------------------------
      
      if (!_id) {
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
      
      storeLayout.handleButtonDisable({ _id: `${_id}-forumNavigation` });
      
      
      
      
      // console.log(chalk`
      //   \n---------- handleSubmitCreateThread ----------\n
      //   _id: {green ${_id}}
      //   name: {green ${name}}
      //   description: {green ${description}}
      // `);
      
      // console.log(`
      //   ----- imagesAndVideosObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- validationForumThreadsNameObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(validationForumThreadsNameObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- validationForumThreadsDescriptionObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(validationForumThreadsDescriptionObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // return;
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formData = new FormData();
      
      formData.append('gameCommunities_id', gameCommunities_id);
      formData.append('userCommunities_id', userCommunities_id);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('imagesAndVideosObj', JSON.stringify(imagesAndVideosObj));
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        
        
      } else {
        
        resultObj = await fetchWrapper({
          urlApi: `${process.env.URL_API}/v1/forum-threads/create-uc`,
          methodType: 'POST',
          formData: formData
        });
        
      }
      
      
      console.log(`
        ----- resultObj -----\n
        ${util.inspect(resultObj, { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      // // ---------------------------------------------
      // //   Form Reset
      // // ---------------------------------------------
      
      // lodashSet(this.dataObj, 'loginID', '');
      // lodashSet(this.dataObj, 'loginPassword', '');
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: 'pInPmleQh',
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
      
      storeLayout.handleButtonEnable({ _id: `${_id}-forumNavigation` });
      
      
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