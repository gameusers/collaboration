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
//   Validation
// ---------------------------------------------

// const { validationUsersLoginID } = require('../../../@database/users/validations/login-id');
// const { validationUsersLoginPassword, validationUsersLoginPasswordConfirmation } = require('../../../@database/users/validations/login-password');
// const { validationUsersEmail } = require('../../../@database/users/validations/email');


// --------------------------------------------------
//   Stores
// --------------------------------------------------

import initStoreLayout from '../../layout/stores/layout';
// import initStoreUserCommunity from '../../../uc/community/stores/store';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeForum = null;
let storeLayout = initStoreLayout({});
// let storeUserCommunity = initStoreUserCommunity({});
      



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
  async handleChangeThreadRowsPerPage({ _id, threadUpdatedDate, limit }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   スレッド一覧を読み込む
      // ---------------------------------------------
      
      this.handleReadThreadsList({
        _id,
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
  async handleReadThreadsList({ _id, page, threadUpdatedDate, limit }) {
    
    
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
      
      formData.append('userCommunities_id', _id);
      formData.append('page', page);
      formData.append('limit', threadListLimit);
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v1/forum-threads/user-community/list`,
        methodType: 'POST',
        formData: formData,
      });
      
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
   * スレッド作成 - メイン画像を変更する
   * @param {string} _id - ID
   * @param {string} value - 値
   */
  @action.bound
  handleImagesAndVideosObjMainArr({ _id, value }) {
    
    // console.log('handleImagesAndVideosObjMainArr');
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    // `);
    
    // console.log(`\n---------- value ----------\n`);
    // console.dir(value);
    // console.log(`\n-----------------------------------\n`);
    
    let clonedValue = lodashCloneDeep(value);
    
    
    lodashSet(this.dataObj, [_id, 'createThreadObj', 'imagesAndVideosObj', 'mainArr'], clonedValue);
    
    // if (value && value.length > 0) {
    //   lodashSet(this.dataObj, [_id, 'createThreadObj', 'imagesAndVideosObj', 'mainArr'], []);
    // } else {
    //   lodashSet(this.dataObj, [_id, 'createThreadObj', 'imagesAndVideosObj', 'mainArr'], value);
    // }
    
    
    
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