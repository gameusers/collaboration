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

import initStoreLayout from '../../layout/stores/layout';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeForum = null;
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
  @action.bound
  async handleReadThreadsList({ _id, userCommunities_id, page, limit }) {
    
    // console.log('handleReadThreadsList');
    
    try {
      
      
      // ---------------------------------------------
      //   最後の読み込みから10分以上経っていたら再読込する
      // ---------------------------------------------
      
      const loadedDate = lodashGet(this.dataObj, [_id, 'forumThreadsObj', 'loadedDate'], '0000-00-00T00:00:00Z');
      const datetimeNow = moment().utcOffset(0);
      const datetimeReloadLimit = moment(loadedDate).add(process.env.FORUM_THREADS_RELOAD_MINUTES, 'm').utcOffset(0);
      
      let reload = false;
      
      if (datetimeNow.isAfter(datetimeReloadLimit)) {
        console.log('reload');
        reload = true;
      }
      
      
      // ---------------------------------------------
      //   すでにデータを読み込んでいる場合は、ストアのデータを表示する
      // ---------------------------------------------
      
      if (!reload && lodashHas(this.dataObj, [_id, 'forumThreadsObj', 'dataObj', `page${page}Arr`])) {
        
        console.log('store');
        
        this.handleEdit({
          pathArr: [_id, 'threadListPage'],
          value: page
        });
        
        return;
        
      } else {
        console.log('fetch');
      }
      
      console.log(chalk`
        process.env.FORUM_THREADS_RELOAD_MINUTES  : {green ${process.env.FORUM_THREADS_RELOAD_MINUTES}}
        datetimeNow  : {green ${datetimeNow}}
        datetimeReloadLimit: {green ${datetimeReloadLimit}}
        datetimeNow.isAfter(datetimeReloadLimit): {green ${datetimeNow.isAfter(datetimeReloadLimit)}}
        arrayName  : {green ${`page${page}Arr`}}
        lodashHas: {green ${lodashHas(this.dataObj, [_id, 'forumThreadsObj', 'dataObj', `page${page}Arr`])}}
      `);
      
      // const oneArr = lodashGet(this.dataObj, [_id, 'forumThreadsObj', 'dataObj', 'page1Arr'], []);
      
      // console.log(`
      //   ----- oneArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(oneArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // const twoArr = lodashGet(this.dataObj, [_id, 'forumThreadsObj', 'dataObj', 'page2Arr'], []);
      
      // console.log(`
      //   ----- twoArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(twoArr)), { colors: true, depth: null })}\n
      //   --------------------\n
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
      
      formData.append('userCommunities_id', userCommunities_id);
      formData.append('page', parseInt(page, 10));
      formData.append('limit', parseInt(limit, 10));
      
      
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
      //   Merge & Renew
      // ---------------------------------------------
      
      const oldForumThreadsObj = lodashGet(this.dataObj, [_id, 'forumThreadsObj'], {});
      const newForumThreadsObj = lodashGet(resultObj, ['data', 'forumThreadsObj'], {});
      
      // console.log(`
      //   ----- oldForumThreadsObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(oldForumThreadsObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- newForumThreadsObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(newForumThreadsObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      const mergedObj = lodashMerge(oldForumThreadsObj, newForumThreadsObj);
      
      this.handleEdit({
        pathArr: [_id, 'forumThreadsObj'],
        value: mergedObj
      });
      
      
      console.log(`
        ----- mergedObj -----\n
        ${util.inspect(JSON.parse(JSON.stringify(mergedObj)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      
      this.handleEdit({
        pathArr: [_id, 'threadListPage'],
        value: page
      });
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      // storeLayout.handleSnackbarOpen({
      //   variant: 'success',
      //   messageID: 'CquCU7BtA',
      // });
      
      
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