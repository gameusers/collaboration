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

// import { validationUsersLoginID } from '../../../@database/users/validations/login-id';
// import { validationUsersLoginPassword, validationUsersLoginPasswordConfirmation } from '../../../@database/users/validations/login-password';
// import { validationUsersEmail } from '../../../@database/users/validations/email';


// --------------------------------------------------
//   Stores
// --------------------------------------------------

import initStoreData from '../../../@stores/data';
import initStoreLayout from '../../../common/layout/stores/layout';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeFollowMembers = null;
let storeData = initStoreData({});
let storeLayout = initStoreLayout({});
      



// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   Constructor
  // ---------------------------------------------
  
  constructor() {}
  
  
  
  
  // ---------------------------------------------
  //   Data
  // ---------------------------------------------
  
  /**
   * フォームのデータを入れるオブジェクト
   * @type {Object}
   */
  @observable dataObj = {};
  
  
  /**
   * フォーム用のデータを変更する
   * @param {Array} pathArr - パス
   * @param {string} value - 値
   */
  @action.bound
  handleEdit({ pathArr, value }) {
    lodashSet(this.dataObj, pathArr, value);
  };
  
  
  
  
  
  // ---------------------------------------------
  //   メンバー
  // ---------------------------------------------
  
  /**
   * メンバーを読み込む
   * @param {Array} pathArr - パス
   * @param {string} pathname - ページの固有ID　例）/uc/community1
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {number} page - スレッドのページ
   * @param {number} newLimit - 1ページに表示する件数を変更する場合、値を入力する
   */
  @action.bound
  async handleReadMembers({
    
    pathArr,
    pathname,
    userCommunities_id,
    newType,
    page = 1,
    newLimit,
    forceReload = false,
    
  }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      // const page = lodashGet(this.dataObj, [...pathArr, 'membersObj', 'page'], 1);
      // const count = lodashGet(this.dataObj, [...pathArr, 'membersObj', 'count'], 1);
      
      let type = lodashGet(this.dataObj, [...pathArr, 'type'], 'member');
      
      let limit = parseInt((storeData.getCookie({ key: 'memberLimit' }) || process.env.COMMUNITY_MEMBER_LIMIT), 10);
      const arr = lodashGet(this.dataObj, [...pathArr, 'membersObj', `page${page}Obj`, 'arr'], []);
      
      const membersObj = lodashGet(this.dataObj, [...pathArr, 'membersObj'], {});
      const clonedMembersObj = lodashCloneDeep(membersObj);
      
      const loadedDate = lodashGet(membersObj, [`page${page}Obj`, 'loadedDate'], '');
      
      let reload = false;
      
      
      
      
      // ---------------------------------------------
      //   type を変更する場合
      // ---------------------------------------------
      
      if (newType) {
        
        
        // ---------------------------------------------
        //   Set type
        // ---------------------------------------------
        
        type = newType;
        
        
        // ---------------------------------------------
        //   再読込する
        // ---------------------------------------------
        
        reload = true;
      
      
      // ---------------------------------------------
      //   1ページに表示する件数を変更した場合
      // ---------------------------------------------
      
      } else if (newLimit) {
        
        
        // ---------------------------------------------
        //   Set Cookie - memberLimit
        // ---------------------------------------------
        
        limit = newLimit;
        Cookies.set('memberLimit', limit);
        
        
        // ---------------------------------------------
        //   再読込する
        // ---------------------------------------------
        
        reload = true;
        
        
      // ---------------------------------------------
      //   最後の読み込みから指定の時間（10分）が経っていた場合、再読込する
      // ---------------------------------------------
        
      } else if (loadedDate) {
        
        const datetimeNow = moment().utcOffset(0);
        const datetimeReloadLimit = moment(loadedDate).add(process.env.COMMUNITY_MEMBER_RELOAD_MINUTES, 'm').utcOffset(0);
        
        if (datetimeNow.isAfter(datetimeReloadLimit)) {
          reload = true;
        }
        
      }
      
      
      
      
      // --------------------------------------------------
      //   強制再読み込み
      // --------------------------------------------------
      
      if (forceReload) {
        reload = true;
      }
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/uc/member/stores/store.js / handleReadMembers
      // `);
      
      // console.log(chalk`
      //   page: {green ${page}}
      //   newLimit: {green ${newLimit}}
      //   limit: {green ${limit}}
      //   loadedDate: {green ${loadedDate}}
      //   reload: {green ${reload}}
      // `);
      
      // console.log(`
      //   ----- membersObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(membersObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- arr -----\n
      //   ${util.inspect(arr, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   すでにデータを読み込んでいる場合は、ストアのデータを表示する
      // ---------------------------------------------
      
      if (!reload && arr.length > 0) {
        
        
        console.log('store');
        
        
        // ---------------------------------------------
        //   更新 - メンバー
        // ---------------------------------------------
        
        clonedMembersObj.page = page;
        
        this.handleEdit({
          pathArr: [...pathArr, 'membersObj'],
          value: clonedMembersObj
        });
        
        
        // ---------------------------------------------
        //   Set Temporary Data - memberPage
        // ---------------------------------------------
        
        storeData.setTemporaryData({ pathname, key: 'memberPage', value: page });
        
        
        // ---------------------------------------------
        //   更新 - type
        // ---------------------------------------------
        
        this.handleEdit({
          pathArr: [...pathArr, 'type'],
          value: type
        });
        
        
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
        
        userCommunities_id,
        type,
        page,
        limit,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/db/user-communities/read-members`,
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
      
      
      
      
      // console.log(`
      //   ----- storeData.cardPlayersObj 1 -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(storeData.cardPlayersObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // ---------------------------------------------
      //   updateCardPlayersObj
      // ---------------------------------------------
      
      const newCardPlayersObj = lodashGet(resultObj, ['data', 'cardPlayersObj'], {});
      storeData.updateCardPlayersObj(newCardPlayersObj);
      
      
      // console.log(`
      //   ----- storeData.cardPlayersObj 2 -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(storeData.cardPlayersObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      // ---------------------------------------------
      //   membersObj
      //   再読込する場合は新しいデータに置き換える、再読込しない場合は古いデータと新しいデータをマージする
      // ---------------------------------------------
      
      // console.log(`
      //   ----- clonedMembersObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(clonedMembersObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   reload: {green ${reload}}
      // `);
      
      const newMembersObj = lodashGet(resultObj, ['data', 'membersObj'], {});
      const mergedMembersObj = reload ? newMembersObj : lodashMerge(clonedMembersObj, newMembersObj);
      
      // console.log(`
      //   ----- newMembersObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(newMembersObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- mergedMembersObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(mergedMembersObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      // ---------------------------------------------
      //   更新 - メンバー
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: [...pathArr, 'membersObj'],
        value: mergedMembersObj
      });
      
      
      // ---------------------------------------------
      //   Set Temporary Data - memberPage
      // ---------------------------------------------
      
      storeData.setTemporaryData({ pathname, key: 'memberPage', value: page });
      
      
      // ---------------------------------------------
      //   更新 - type
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: [...pathArr, 'type'],
        value: type
      });
      
      
      // --------------------------------------------------
      //   followedCount / ヘッダーのメンバー数更新
      // --------------------------------------------------
      
      if (lodashHas(resultObj, ['data', 'followedCount'])) {
        lodashSet(storeData, ['headerObj', 'followedCount'], resultObj.data.followedCount);
      }
      
      
      // --------------------------------------------------
      //   approvalCount
      // --------------------------------------------------
      
      if (lodashHas(resultObj, ['data', 'approvalCount'])) {
        lodashSet(this.dataObj, [...pathArr, 'approvalCount'], resultObj.data.approvalCount);
      }
      
      
      // --------------------------------------------------
      //   blockCount
      // --------------------------------------------------
      
      if (lodashHas(resultObj, ['data', 'blockCount'])) {
        lodashSet(this.dataObj, [...pathArr, 'blockCount'], resultObj.data.blockCount);
      }
      
      
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
        to: 'ucMember',
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
      });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * ダイアログを開く
   * @param {Array} pathArr - パス
   * @param {string} managedUsers_id - DB users _id / ユーザーのID
   * @param {string} type - 処理のタイプ / 'unfollow', 'approval', 'unapproval', 'block', 'unblock'
   */
  @action.bound
  async handleOpenDialog({
    
    pathArr,
    managedUsers_id,
    type,
    
  }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   managedUsers_id
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: [...pathArr, 'managedUsers_id'],
        value: managedUsers_id,
      });
      
      
      // ---------------------------------------------
      //   Dialog Open
      // ---------------------------------------------
      
      if (type === 'unfollow') {
        
        this.handleEdit({
          pathArr: [...pathArr, 'showDialogUnfollow'],
          value: true,
        });
        
      } else if (type === 'approval') {
        
        this.handleEdit({
          pathArr: [...pathArr, 'showDialogApproval'],
          value: true,
        });
        
      } else if (type === 'unapproval') {
        
        this.handleEdit({
          pathArr: [...pathArr, 'showDialogUnapproval'],
          value: true,
        });
        
      } else if (type === 'block') {
        
        this.handleEdit({
          pathArr: [...pathArr, 'showDialogBlock'],
          value: true,
        });
        
      } else if (type === 'unblock') {
        
        this.handleEdit({
          pathArr: [...pathArr, 'showDialogUnblock'],
          value: true,
        });
        
      }
      
      
    } catch (errorObj) {
      
      
      
    }
    
    
  };
  
  
  
  
  /**
   * メンバーの処理（管理者用）　退会させる / 
   * @param {Array} pathArr - パス
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {string} type - 処理のタイプ / unfollow / approval
   */
  @action.bound
  async handleMembers({
    
    pathArr,
    pathname,
    userCommunities_id,
    type,
    
  }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const managedUsers_id = lodashGet(this.dataObj, [...pathArr, 'managedUsers_id'], '');
      
      
      
      
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
        
        userCommunities_id,
        managedUsers_id,
        type,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/db/follows/upsert-manage-members`,
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
      //   メンバー読み込み
      // ---------------------------------------------
      
      const page = lodashGet(this.dataObj, [...pathArr, 'membersObj', 'page'], 1);
      
      this.handleReadMembers({
        pathArr,
        pathname,
        userCommunities_id,
        page,
        forceReload: true,
      });
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/uc/member/stores/store.js / handleMembers
      // `);
      
      // console.log(chalk`
      //   userCommunities_id: {green ${userCommunities_id}}
      //   managedUsers_id: {green ${managedUsers_id}}
      //   type: {green ${type}}
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
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
      //   Dialog Close
      // ---------------------------------------------
      
      if (type === 'unfollow') {
        
        this.handleEdit({
          pathArr: [...pathArr, 'showDialogUnfollow'],
          value: false,
        });
        
      } else if (type === 'approval') {
        
        this.handleEdit({
          pathArr: [...pathArr, 'showDialogApproval'],
          value: false,
        });
        
      } else if (type === 'unapproval') {
        
        this.handleEdit({
          pathArr: [...pathArr, 'showDialogUnapproval'],
          value: false,
        });
        
      } else if (type === 'block') {
        
        this.handleEdit({
          pathArr: [...pathArr, 'showDialogBlock'],
          value: false,
        });
        
      } else if (type === 'unblock') {
        
        this.handleEdit({
          pathArr: [...pathArr, 'showDialogUnblock'],
          value: false,
        });
        
      }
      
      
    }
    
    
  };
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreFollowMembers({ propsObj }) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeFollowMembers === null) {
    storeFollowMembers = new Store();
  }
  
  
  // --------------------------------------------------
  //   Props
  // --------------------------------------------------
  
  if (propsObj) {
    
    
    // --------------------------------------------------
    //   pathArr
    // --------------------------------------------------
    
    const pathArr = lodashGet(propsObj, ['pathArr'], []);
    
    // console.log(`
    //   ----- pathArr -----\n
    //   ${util.inspect(pathArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   membersObj
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['followMembersObj'])) {
      lodashSet(storeFollowMembers, ['dataObj', ...pathArr, 'followMembersObj'], propsObj.followMembersObj);
    }
    
    
    // --------------------------------------------------
    //   approvalCount
    // --------------------------------------------------
    
    // if (lodashHas(propsObj, ['approvalCount'])) {
    //   lodashSet(storeFollowMembers, ['dataObj', ...pathArr, 'approvalCount'], propsObj.approvalCount);
    // }
    
    
    // // --------------------------------------------------
    // //   blockCount
    // // --------------------------------------------------
    
    // if (lodashHas(propsObj, ['blockCount'])) {
    //   lodashSet(storeFollowMembers, ['dataObj', ...pathArr, 'blockCount'], propsObj.blockCount);
    // }
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   userCommunities_id: {green ${userCommunities_id}}
    // `);
    
    // console.log(`
    //   ----- storeFollowMembers.dataObj -----\n
    //   ${util.inspect(storeFollowMembers.dataObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeFollowMembers;
  
  
}