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
   * @param {string} newType - 表示するタイプを変更する場合入力　フォロー、フォロワー、承認、ブロックのどれか
   * @param {number} page - スレッドのページ
   * @param {number} newLimit - 1ページに表示する件数を変更する場合、値を入力する
   * @param {boolean} forceReload - 強制的に再読み込みする場合は true
   */
  @action.bound
  async handleReadFollowers({
    
    pathArr,
    pathname,
    users_id,
    gameCommunities_id,
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
      
      let type = lodashGet(this.dataObj, [...pathArr, 'type'], 'follow');
      let limit = parseInt((storeData.getCookie({ key: 'followLimit' }) || process.env.FOLLOWERS_LIMIT), 10);
      
      const followMembersObj = lodashGet(this.dataObj, [...pathArr, 'followMembersObj'], {});
      const clonedFollowMembersObj = lodashCloneDeep(followMembersObj);
      
      const arr = lodashGet(followMembersObj, [`${type}Obj`, `page${page}Obj`, 'arr'], []);
      const loadedDate = lodashGet(followMembersObj, [`${type}Obj`, `page${page}Obj`, 'loadedDate'], '');
      // const arr = lodashGet(this.dataObj, [...pathArr, 'followMembersObj', `${type}Obj`, `page${page}Obj`, 'arr'], []);
      // const loadedDate = lodashGet(this.dataObj, [...pathArr, 'followMembersObj', `${type}Obj`, `page${page}Obj`, 'loadedDate'], '');
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
        //   Set Cookie - followLimit
        // ---------------------------------------------
        
        limit = newLimit;
        Cookies.set('followLimit', limit);
        
        
        // ---------------------------------------------
        //   再読込する
        // ---------------------------------------------
        
        reload = true;
        
        
      // ---------------------------------------------
      //   最後の読み込みから指定の時間（10分）が経っていた場合、再読込する
      // ---------------------------------------------
        
      } else if (loadedDate) {
        
        const datetimeNow = moment().utcOffset(0);
        const datetimeReloadLimit = moment(loadedDate).add(process.env.FOLLOWERS_RELOAD_MINUTES, 'm').utcOffset(0);
        
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
      //   /app/common/follow-members/stores/store.js - handleReadFollowers
      // `);
      
      
      // console.log(chalk`
      //   type: {green ${type}}
      //   users_id: {green ${users_id}}
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      //   page: {green ${page}}
      //   limit: {green ${limit}}
      //   newLimit: {green ${newLimit}}
      //   loadedDate: {green ${loadedDate}}
      //   reload: {green ${reload}}
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
        //   更新 - ページ
        // ---------------------------------------------
        
        lodashSet(this.dataObj, [...pathArr, 'followMembersObj', `${type}Obj`, 'page'], page);
        // clonedMembersObj.page = page;
        
        // this.handleEdit({
        //   pathArr: [...pathArr, 'membersObj'],
        //   value: clonedMembersObj
        // });
        
        
        // ---------------------------------------------
        //   Set Temporary Data - followPage
        // ---------------------------------------------
        
        storeData.setTemporaryData({ pathname, key: 'followPage', value: page });
        
        
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
        
        users_id,
        gameCommunities_id,
        userCommunities_id,
        type,
        page,
        limit,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/db/follows/read-followers`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
      });
      
      
      console.log(`
        ----- resultObj -----\n
        ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      
      
      
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
      //   followMembersObj
      //   再読込する場合は新しいデータに置き換える、再読込しない場合は古いデータと新しいデータをマージする
      // ---------------------------------------------
      
      // console.log(`
      //   ----- clonedFollowMembersObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(clonedFollowMembersObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // // console.log(chalk`
      // //   reload: {green ${reload}}
      // // `);
      
      const newFollowMembersObj = lodashGet(resultObj, ['data', 'followMembersObj'], {});
      const mergedFollowMembersObj = reload ? newFollowMembersObj : lodashMerge(clonedFollowMembersObj, newFollowMembersObj);
      
      // console.log(`
      //   ----- newFollowMembersObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(newFollowMembersObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- mergedFollowMembersObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(mergedFollowMembersObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      //lodashSet(storeFollowMembers, ['dataObj', ...pathArr, 'followMembersObj'], propsObj.followMembersObj);
      
      
      // ---------------------------------------------
      //   更新 - followMembersObj
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: [...pathArr, 'followMembersObj'],
        value: mergedFollowMembersObj
      });
      
      
      // ---------------------------------------------
      //   Set Temporary Data - followPage
      // ---------------------------------------------
      
      storeData.setTemporaryData({ pathname, key: 'followPage', value: page });
      
      
      // ---------------------------------------------
      //   更新 - type
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: [...pathArr, 'type'],
        value: type
      });
      
      
      // // --------------------------------------------------
      // //   followedCount / ヘッダーのメンバー数更新
      // // --------------------------------------------------
      
      // if (lodashHas(resultObj, ['data', 'followedCount'])) {
      //   lodashSet(storeData, ['headerObj', 'followedCount'], resultObj.data.followedCount);
      // }
      
      
      // // --------------------------------------------------
      // //   approvalCount
      // // --------------------------------------------------
      
      // if (lodashHas(resultObj, ['data', 'approvalCount'])) {
      //   lodashSet(this.dataObj, [...pathArr, 'approvalCount'], resultObj.data.approvalCount);
      // }
      
      
      // // --------------------------------------------------
      // //   blockCount
      // // --------------------------------------------------
      
      // if (lodashHas(resultObj, ['data', 'blockCount'])) {
      //   lodashSet(this.dataObj, [...pathArr, 'blockCount'], resultObj.data.blockCount);
      // }
      
      
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
        to: 'followers',
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
      });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * ダイアログを表示する
   * @param {Array} pathArr - パス
   * @param {string} managedUsers_id - DB users _id / ユーザーのID
   * @param {string} type - 処理のタイプ / 'unfollow', 'approval', 'unapproval', 'block', 'unblock'
   */
  @action.bound
  async handleShowDialog({
    
    pathArr,
    pathname,
    users_id,
    gameCommunities_id,
    userCommunities_id,
    targetUsers_id,
    type,
    pageType,
    
  }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   dialogObj
      // ---------------------------------------------
      
      const dialogObj = {
        
        // pathname,
        // users_id,
        // gameCommunities_id,
        // userCommunities_id,
        targetUsers_id,
        type,
        
      };
      
      this.handleEdit({
        pathArr: [...pathArr, 'dialogObj'],
        value: dialogObj,
      });
      
      
      // ---------------------------------------------
      //   Show Dialog
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: [...pathArr, 'showDialog'],
        value: true,
      });
      
      
      
      // handleManageFollowers({
      //   pathArr,
      //   pathname,
      //   users_id,
      //   gameCommunities_id,
      //   userCommunities_id,
      //   type: 'unfollow',
      // })
      
      // if (type === 'unfollow') {
        
      //   this.handleEdit({
      //     pathArr: [...pathArr, 'showDialogUnfollow'],
      //     value: true,
      //   });
        
      // } else if (type === 'approval') {
        
      //   this.handleEdit({
      //     pathArr: [...pathArr, 'showDialogApproval'],
      //     value: true,
      //   });
        
      // } else if (type === 'unapproval') {
        
      //   this.handleEdit({
      //     pathArr: [...pathArr, 'showDialogUnapproval'],
      //     value: true,
      //   });
        
      // } else if (type === 'block') {
        
      //   this.handleEdit({
      //     pathArr: [...pathArr, 'showDialogBlock'],
      //     value: true,
      //   });
        
      // } else if (type === 'unblock') {
        
      //   this.handleEdit({
      //     pathArr: [...pathArr, 'showDialogUnblock'],
      //     value: true,
      //   });
        
      // }
      
      
    } catch (errorObj) {
      
      
      
    }
    
    
  };
  
  
  
  
  /**
   * フォロワーやコミュニティメンバーの管理 - フォロー解除（コミュニティから退会させる）/ 申請拒否 / ブロック / ブロック解除
   * @param {Array} pathArr - パス
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {string} type - 処理のタイプ / unfollow / approval
   */
  @action.bound
  async handleManageFollowers({
    
    pathArr,
    pathname,
    users_id,
    gameCommunities_id,
    userCommunities_id,
    // type,
    
  }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const targetUsers_id = lodashGet(this.dataObj, [...pathArr, 'dialogObj', 'targetUsers_id'], '');
      const type = lodashGet(this.dataObj, [...pathArr, 'dialogObj', 'type'], '');
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/common/follow-members/stores/store.js - handleManageFollowers
      // `);
      
      // console.log(chalk`
      //   pathname: {green ${pathname} / ${typeof pathname}}
      //   users_id: {green ${users_id} / ${typeof users_id}}
      //   gameCommunities_id: {green ${gameCommunities_id} / ${typeof gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id} / ${typeof userCommunities_id}}
      //   targetUsers_id: {green ${targetUsers_id} / ${typeof targetUsers_id}}
      //   type: {green ${type} / ${typeof type}}
      // `);
      
      
      // console.log(`
      //   ----- manageFollowersObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(manageFollowersObj)), { colors: true, depth: null })}\n
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
        
        users_id,
        gameCommunities_id,
        userCommunities_id,
        targetUsers_id,
        type,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/db/follows/upsert-manage-followers`,
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
      
      // const page = lodashGet(this.dataObj, [...pathArr, 'membersObj', 'page'], 1);
      
      // this.handleReadFollowers({
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
      //   /app/uc/member/stores/store.js / handleManageFollowers
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
      
      this.handleEdit({
        pathArr: [...pathArr, 'showDialog'],
        value: false,
      });
      
      // if (type === 'unfollow') {
        
      //   this.handleEdit({
      //     pathArr: [...pathArr, 'showDialogUnfollow'],
      //     value: false,
      //   });
        
      // } else if (type === 'approval') {
        
      //   this.handleEdit({
      //     pathArr: [...pathArr, 'showDialogApproval'],
      //     value: false,
      //   });
        
      // } else if (type === 'unapproval') {
        
      //   this.handleEdit({
      //     pathArr: [...pathArr, 'showDialogUnapproval'],
      //     value: false,
      //   });
        
      // } else if (type === 'block') {
        
      //   this.handleEdit({
      //     pathArr: [...pathArr, 'showDialogBlock'],
      //     value: false,
      //   });
        
      // } else if (type === 'unblock') {
        
      //   this.handleEdit({
      //     pathArr: [...pathArr, 'showDialogUnblock'],
      //     value: false,
      //   });
        
      // }
      
      
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