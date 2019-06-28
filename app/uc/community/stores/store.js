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

import initStoreLayout from '../../../common/layout/stores/layout';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeUserCommunity = null;
let storeLayout = initStoreLayout({});
      



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
   * スレッド一覧を読み込む
   */
  // @action.bound
  // async handleReadThreadsList({ _id, userCommunities_id, page }) {
    
  //   // console.log('handleReadThreadsList');
    
  //   try {
      
      
  //     // ---------------------------------------------
  //     //   最後の読み込みから特定時間経っていたら再読込する
  //     // ---------------------------------------------
      
  //     const loadedDate = lodashGet(this.dataObj, [_id, 'forumThreadsObj', 'dataObj', `page${page}Obj`, 'loadedDate'], '0000-01-01T00:00:00Z');
  //     const datetimeNow = moment().utcOffset(0);
  //     const datetimeReloadLimit = moment(loadedDate).add(20, 's').utcOffset(0);
      
  //     // process.env.FORUM_THREADS_RELOAD_MINUTES, 'm'
      
  //     const reload = datetimeNow.isAfter(datetimeReloadLimit) ? true : false;
      
  //     // let reload = false;
      
  //     // if (datetimeNow.isAfter(datetimeReloadLimit)) {
  //     //   reload = true;
  //     // }
      
      
  //     // ---------------------------------------------
  //     //   すでにデータを読み込んでいる場合は、ストアのデータを表示する
  //     // ---------------------------------------------
      
  //     if (!reload && lodashHas(this.dataObj, [_id, 'forumThreadsObj', 'dataObj', `page${page}Obj`, 'arr'])) {
        
  //       console.log('store');
        
  //       this.handleEdit({
  //         pathArr: [_id, 'threadListPage'],
  //         value: page
  //       });
        
  //       return;
        
  //     }
      
      
  //     console.log('fetch');
      
  //     console.log(chalk`
  //       _id  : {green ${_id}}
  //       userCommunities_id  : {green ${userCommunities_id}}
  //       page  : {green ${page}}
        
  //       loadedDate  : {green ${loadedDate}}
  //       process.env.FORUM_THREADS_RELOAD_MINUTES  : {green ${process.env.FORUM_THREADS_RELOAD_MINUTES}}
  //       reload  : {green ${reload}}
        
  //       datetimeNow  : {green ${datetimeNow}}
  //       datetimeReloadLimit: {green ${datetimeReloadLimit}}
  //       datetimeNow.isAfter(datetimeReloadLimit): {green ${datetimeNow.isAfter(datetimeReloadLimit)}}
  //       lodashHas: {green ${lodashHas(this.dataObj, [_id, 'forumThreadsObj', 'dataObj', `page${page}Arr`])}}
  //     `);
      
  //     // console.log(`
  //     //   ----- lodashGet(this.dataObj, [_id, 'forumThreadsObj']) -----\n
  //     //   ${util.inspect(JSON.parse(JSON.stringify(lodashGet(this.dataObj, [_id, 'forumThreadsObj']))), { colors: true, depth: null })}\n
  //     //   --------------------\n
  //     // `);
      
      
  //     // ---------------------------------------------
  //     //   Button Disable
  //     // ---------------------------------------------
      
  //     storeLayout.handleButtonDisable({ _id: `${_id}-forumNavigation` });
      
      
  //     // ---------------------------------------------
  //     //   FormData
  //     // ---------------------------------------------
      
  //     let formData = new FormData();
      
  //     const limit = lodashGet(this.dataObj, [_id, 'threadListLimit'], process.env.FORUM_THREADS_LIMIT);
      
  //     formData.append('userCommunities_id', userCommunities_id);
  //     formData.append('page', page);
  //     formData.append('limit', limit);
      
      
  //     // ---------------------------------------------
  //     //   Fetch
  //     // ---------------------------------------------
      
  //     let resultObj = await fetchWrapper({
  //       urlApi: `${process.env.URL_API}/v1/forum-threads/user-community/list`,
  //       methodType: 'POST',
  //       formData: formData,
  //     });
      
  //     console.log(`\n---------- resultObj ----------\n`);
  //     console.dir(resultObj);
  //     console.log(`\n-----------------------------------\n`);
      
      
  //     // ---------------------------------------------
  //     //   Error
  //     // ---------------------------------------------
      
  //     if ('errorsArr' in resultObj) {
  //       throw new CustomError({ errorsArr: resultObj.errorsArr });
  //     }
      
      
      
      
  //     // ---------------------------------------------
  //     //   Merge & Renew
  //     // ---------------------------------------------
      
  //     const oldObj = lodashGet(this.dataObj, [_id, 'forumThreadsObj'], {});
  //     const newObj = lodashGet(resultObj, ['data', 'forumThreadsObj'], {});
      
  //     // console.log(`
  //     //   ----- oldObj -----\n
  //     //   ${util.inspect(JSON.parse(JSON.stringify(oldObj)), { colors: true, depth: null })}\n
  //     //   --------------------\n
  //     // `);
      
  //     // console.log(`
  //     //   ----- newObj -----\n
  //     //   ${util.inspect(JSON.parse(JSON.stringify(newObj)), { colors: true, depth: null })}\n
  //     //   --------------------\n
  //     // `);
      
  //     const mergedObj = lodashMerge(oldObj, newObj);
      
  //     this.handleEdit({
  //       pathArr: [_id, 'forumThreadsObj'],
  //       value: mergedObj
  //     });
      
      
  //     console.log(`
  //       ----- mergedObj -----\n
  //       ${util.inspect(JSON.parse(JSON.stringify(mergedObj)), { colors: true, depth: null })}\n
  //       --------------------\n
  //     `);
      
      
  //     this.handleEdit({
  //       pathArr: [_id, 'threadListPage'],
  //       value: page
  //     });
      
      
      
      
  //     // ---------------------------------------------
  //     //   Snackbar: Success
  //     // ---------------------------------------------
      
  //     // storeLayout.handleSnackbarOpen({
  //     //   variant: 'success',
  //     //   messageID: 'CquCU7BtA',
  //     // });
      
      
  //   } catch (errorObj) {
      
      
  //     // ---------------------------------------------
  //     //   Snackbar: Error
  //     // ---------------------------------------------
      
  //     // storeLayout.handleSnackbarOpen({
  //     //   variant: 'error',
  //     //   errorObj,
  //     // });
      
      
  //   } finally {
      
      
  //     // ---------------------------------------------
  //     //   Button Enable
  //     // ---------------------------------------------
      
  //     storeLayout.handleButtonEnable({ _id: `${_id}-forumNavigation` });
      
      
  //     // ---------------------------------------------
  //     //   Loading 非表示
  //     // ---------------------------------------------
      
  //     storeLayout.handleLoadingHide({});
      
      
  //   }
    
    
  // };
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreUserCommunity({}) {
  
  if (storeUserCommunity === null) {
    storeUserCommunity = new Store();
  }
  
  return storeUserCommunity;
  
}