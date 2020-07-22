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
  //   フォロワー / メンバー
  // ---------------------------------------------
  
  /**
   * フォロワー / メンバーを読み込む
   * @param {Array} pathArr - パス
   * @param {string} pathname - ページの固有ID　例）/uc/community1
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {string} newControlType - 表示するタイプを変更する場合入力　フォロー、フォロワー、承認、ブロックのどれか
   * @param {number} page - スレッドのページ
   * @param {number} newLimit - 1ページに表示する件数を変更する場合、値を入力する
   * @param {boolean} forceReload - 強制的に再読み込みする場合は true
   */
  // @action.bound
  // async handleReadFollowMembers({
    
  //   pathArr,
  //   pathname,
  //   users_id,
  //   gameCommunities_id,
  //   userCommunities_id,
  //   newControlType,
  //   pageType,
  //   page = 1,
  //   newLimit,
  //   forceReload = false,
    
  // }) {
    
    
  //   try {
      
      
  //     // ---------------------------------------------
  //     //   Property
  //     // ---------------------------------------------
      
  //     let controlType = lodashGet(this.dataObj, [...pathArr, 'controlType'], 'followed');
      
  //     if (pageType === 'ur') {
  //       controlType = lodashGet(this.dataObj, [...pathArr, 'controlType'], 'follow');
  //     }
      
  //     let limit = parseInt((storeData.getCookie({ key: 'followLimit' }) || process.env.NEXT_PUBLIC_FOLLOWERS_LIMIT), 10);
      
  //     const followMembersObj = lodashGet(this.dataObj, [...pathArr, 'followMembersObj'], {});
  //     const clonedFollowMembersObj = lodashCloneDeep(followMembersObj);
      
  //     const arr = lodashGet(followMembersObj, [`${controlType}Obj`, `page${page}Obj`, 'arr'], []);
  //     const loadedDate = lodashGet(followMembersObj, [`${controlType}Obj`, `page${page}Obj`, 'loadedDate'], '');
      
  //     let reload = false;
      
      
      
      
  //     // ---------------------------------------------
  //     //   controlType を変更する場合
  //     // ---------------------------------------------
      
  //     if (newControlType) {
        
        
  //       // ---------------------------------------------
  //       //   Set controlType
  //       // ---------------------------------------------
        
  //       controlType = newControlType;
        
        
  //       // ---------------------------------------------
  //       //   再読込する
  //       // ---------------------------------------------
        
  //       reload = true;
      
      
  //     // ---------------------------------------------
  //     //   1ページに表示する件数を変更した場合
  //     // ---------------------------------------------
      
  //     } else if (newLimit) {
        
        
  //       // ---------------------------------------------
  //       //   Set Cookie - followLimit
  //       // ---------------------------------------------
        
  //       limit = newLimit;
  //       Cookies.set('followLimit', limit);
        
        
  //       // ---------------------------------------------
  //       //   再読込する
  //       // ---------------------------------------------
        
  //       reload = true;
        
        
  //     // ---------------------------------------------
  //     //   最後の読み込みから指定の時間（10分）が経っていた場合、再読込する
  //     // ---------------------------------------------
        
  //     } else if (loadedDate) {
        
  //       const datetimeNow = moment().utcOffset(0);
  //       const datetimeReloadLimit = moment(loadedDate).add(process.env.NEXT_PUBLIC_FOLLOWERS_RELOAD_MINUTES, 'm').utcOffset(0);
        
  //       if (datetimeNow.isAfter(datetimeReloadLimit)) {
  //         reload = true;
  //       }
        
  //     }
      
      
      
      
  //     // --------------------------------------------------
  //     //   強制再読み込み
  //     // --------------------------------------------------
      
  //     if (forceReload) {
  //       reload = true;
  //     }
      
      
      
      
  //     // --------------------------------------------------
  //     //   console.log
  //     // --------------------------------------------------
      
  //     // console.log(`
  //     //   ----------------------------------------\n
  //     //   /app/common/follow-members/stores/store.js - handleReadFollowMembers
  //     // `);
      
      
  //     // console.log(chalk`
  //     //   controlType: {green ${controlType}}
  //     //   users_id: {green ${users_id}}
  //     //   gameCommunities_id: {green ${gameCommunities_id}}
  //     //   userCommunities_id: {green ${userCommunities_id}}
  //     //   page: {green ${page}}
  //     //   limit: {green ${limit}}
  //     //   newLimit: {green ${newLimit}}
  //     //   loadedDate: {green ${loadedDate}}
  //     //   reload: {green ${reload}}
  //     // `);
      
  //     // console.log(`
  //     //   ----- pathArr -----\n
  //     //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
  //     //   --------------------\n
  //     // `);
      
  //     // console.log(`
  //     //   ----- arr -----\n
  //     //   ${util.inspect(arr, { colors: true, depth: null })}\n
  //     //   --------------------\n
  //     // `);
      
      
      
      
  //     // ---------------------------------------------
  //     //   すでにデータを読み込んでいる場合は、ストアのデータを表示する
  //     // ---------------------------------------------
      
  //     if (!reload && arr.length > 0) {
        
        
  //       console.log('store');
        
        
  //       // ---------------------------------------------
  //       //   更新 - ページ
  //       // ---------------------------------------------
        
  //       lodashSet(this.dataObj, [...pathArr, 'followMembersObj', `${controlType}Obj`, 'page'], page);
        
        
  //       // ---------------------------------------------
  //       //   Set Temporary Data - followPage
  //       // ---------------------------------------------
        
  //       storeData.setTemporaryData({ pathname, key: 'followPage', value: page });
        
        
  //       // ---------------------------------------------
  //       //   更新 - controlType
  //       // ---------------------------------------------
        
  //       this.handleEdit({
  //         pathArr: [...pathArr, 'controlType'],
  //         value: controlType
  //       });
        
        
  //       // ---------------------------------------------
  //       //   Return
  //       // ---------------------------------------------
        
  //       return;
        
        
  //     }
      
  //     console.log('fetch');
      
      
      
      
  //     // ---------------------------------------------
  //     //   Loading 表示
  //     // ---------------------------------------------
      
  //     storeLayout.handleLoadingShow({});
      
      
  //     // ---------------------------------------------
  //     //   Button Disable
  //     // ---------------------------------------------
      
  //     storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
  //     // ---------------------------------------------
  //     //   FormData
  //     // ---------------------------------------------
      
  //     const formDataObj = {
        
  //       users_id,
  //       gameCommunities_id,
  //       userCommunities_id,
  //       controlType,
  //       page,
  //       limit,
        
  //     };
      
      
  //     // ---------------------------------------------
  //     //   Fetch
  //     // ---------------------------------------------
      
  //     const resultObj = await fetchWrapper({
  //       urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/follows/read-followers`,
  //       methodType: 'POST',
  //       formData: JSON.stringify(formDataObj),
  //     });
      
      
  //     // console.log(`
  //     //   ----- resultObj -----\n
  //     //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
  //     //   --------------------\n
  //     // `);
      
      
      
      
  //     // ---------------------------------------------
  //     //   Error
  //     // ---------------------------------------------
      
  //     if ('errorsArr' in resultObj) {
  //       throw new CustomError({ errorsArr: resultObj.errorsArr });
  //     }
      
      
      
      
  //     // console.log(`
  //     //   ----- storeData.cardPlayersObj 1 -----\n
  //     //   ${util.inspect(JSON.parse(JSON.stringify(storeData.cardPlayersObj)), { colors: true, depth: null })}\n
  //     //   --------------------\n
  //     // `);
      
  //     // ---------------------------------------------
  //     //   updateCardPlayersObj
  //     // ---------------------------------------------
      
  //     const newCardPlayersObj = lodashGet(resultObj, ['data', 'cardPlayersObj'], {});
  //     storeData.updateCardPlayersObj(newCardPlayersObj);
      
      
  //     // console.log(`
  //     //   ----- storeData.cardPlayersObj 2 -----\n
  //     //   ${util.inspect(JSON.parse(JSON.stringify(storeData.cardPlayersObj)), { colors: true, depth: null })}\n
  //     //   --------------------\n
  //     // `);
      
      
      
  //     // ---------------------------------------------
  //     //   followMembersObj
  //     //   再読込する場合は新しいデータに置き換える、再読込しない場合は古いデータと新しいデータをマージする
  //     // ---------------------------------------------
      
  //     // console.log(`
  //     //   ----- clonedFollowMembersObj -----\n
  //     //   ${util.inspect(JSON.parse(JSON.stringify(clonedFollowMembersObj)), { colors: true, depth: null })}\n
  //     //   --------------------\n
  //     // `);
      
  //     // // console.log(chalk`
  //     // //   reload: {green ${reload}}
  //     // // `);
      
  //     const newFollowMembersObj = lodashGet(resultObj, ['data', 'followMembersObj'], {});
  //     const mergedFollowMembersObj = reload ? newFollowMembersObj : lodashMerge(clonedFollowMembersObj, newFollowMembersObj);
      
  //     // console.log(`
  //     //   ----- newFollowMembersObj -----\n
  //     //   ${util.inspect(JSON.parse(JSON.stringify(newFollowMembersObj)), { colors: true, depth: null })}\n
  //     //   --------------------\n
  //     // `);
      
  //     // console.log(`
  //     //   ----- mergedFollowMembersObj -----\n
  //     //   ${util.inspect(JSON.parse(JSON.stringify(mergedFollowMembersObj)), { colors: true, depth: null })}\n
  //     //   --------------------\n
  //     // `);
      
  //     //lodashSet(storeFollowMembers, ['dataObj', ...pathArr, 'followMembersObj'], propsObj.followMembersObj);
      
      
  //     // ---------------------------------------------
  //     //   更新 - followMembersObj
  //     // ---------------------------------------------
      
  //     this.handleEdit({
  //       pathArr: [...pathArr, 'followMembersObj'],
  //       value: mergedFollowMembersObj
  //     });
      
      
  //     // ---------------------------------------------
  //     //   Set Temporary Data - followPage
  //     // ---------------------------------------------
      
  //     storeData.setTemporaryData({ pathname, key: 'followPage', value: page });
      
      
  //     // ---------------------------------------------
  //     //   更新 - controlType
  //     // ---------------------------------------------
      
  //     this.handleEdit({
  //       pathArr: [...pathArr, 'controlType'],
  //       value: controlType
  //     });
      
      
      
      
  //     // --------------------------------------------------
  //     //   followedCount / ヘッダーのフォロワー（メンバー）数更新
  //     // --------------------------------------------------
      
  //     const followCount = lodashGet(resultObj, ['data', 'followMembersObj', 'followObj', 'count'], 0);
  //     lodashSet(storeData, ['headerObj', 'followsObj', 'followCount'], followCount);
      
  //     const followedCount = lodashGet(resultObj, ['data', 'followMembersObj', 'followedObj', 'count'], 0);
  //     lodashSet(storeData, ['headerObj', 'followsObj', 'followedCount'], followedCount);
      
  //     // console.log(`
  //     //   ----- storeData.headerObj -----\n
  //     //   ${util.inspect(JSON.parse(JSON.stringify(storeData.headerObj)), { colors: true, depth: null })}\n
  //     //   --------------------\n
  //     // `);
      
  //     // if (followedCount) {
  //     //   lodashSet(storeData, ['headerObj', 'followedCount'], followedCount);
  //     // }
      
      
  //     // // --------------------------------------------------
  //     // //   approvalCount
  //     // // --------------------------------------------------
      
  //     // if (lodashHas(resultObj, ['data', 'approvalCount'])) {
  //     //   lodashSet(this.dataObj, [...pathArr, 'approvalCount'], resultObj.data.approvalCount);
  //     // }
      
      
  //     // // --------------------------------------------------
  //     // //   blockCount
  //     // // --------------------------------------------------
      
  //     // if (lodashHas(resultObj, ['data', 'blockCount'])) {
  //     //   lodashSet(this.dataObj, [...pathArr, 'blockCount'], resultObj.data.blockCount);
  //     // }
      
      
  //   } catch (errorObj) {
      
      
  //     // ---------------------------------------------
  //     //   Snackbar: Error
  //     // ---------------------------------------------
      
  //     storeLayout.handleSnackbarOpen({
  //       variant: 'error',
  //       errorObj,
  //     });
      
      
  //   } finally {
      
      
  //     // ---------------------------------------------
  //     //   Button Enable
  //     // ---------------------------------------------
      
  //     storeLayout.handleButtonEnable({ pathArr });
      
      
  //     // ---------------------------------------------
  //     //   Loading 非表示
  //     // ---------------------------------------------
      
  //     storeLayout.handleLoadingHide({});
      
      
  //     // ---------------------------------------------
  //     //   Scroll
  //     // ---------------------------------------------
      
  //     storeLayout.handleScrollTo({
  //       to: 'followMembers',
  //       duration: 0,
  //       delay: 0,
  //       smooth: 'easeInOutQuart',
  //       offset: -50,
  //     });
      
      
  //   }
    
    
  // };
  
  
  
  
  /**
   * ダイアログを表示する
   * @param {Array} pathArr - パス
   * @param {string} managedUsers_id - DB users _id / ユーザーのID
   * @param {string} type - 処理のタイプ / 'unfollow', 'approval', 'unapproval', 'block', 'unblock'
   */
  // @action.bound
  // async handleShowDialog({
    
  //   pathArr,
  //   // pathname,
  //   // users_id,
  //   // gameCommunities_id,
  //   // userCommunities_id,
  //   targetUsers_id,
  //   type,
  //   pageType,
    
  // }) {
    
    
  //   try {
      
      
  //     // ---------------------------------------------
  //     //   dialogObj
  //     // ---------------------------------------------
      
  //     const dialogObj = {
        
  //       targetUsers_id,
  //       type,
        
  //     };
      
  //     this.handleEdit({
  //       pathArr: [...pathArr, 'dialogObj'],
  //       value: dialogObj,
  //     });
      
      
  //     // ---------------------------------------------
  //     //   Show Dialog
  //     // ---------------------------------------------
      
  //     this.handleEdit({
  //       pathArr: [...pathArr, 'showDialog'],
  //       value: true,
  //     });
      
      
  //   } catch (errorObj) {
      
      
      
  //   }
    
    
  // };
  
  
  
  
  /**
   * フォロワーやコミュニティメンバーの管理 - フォロー解除（コミュニティから退会）/ 承認 / 拒否 / ブロック / ブロック解除
   * @param {Array} pathArr - パス
   * @param {string} pathname - ページの固有ID　例）/uc/community1
   * @param {string} users_id - DB users _id / ユーザーのID
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {string} pageType - ページタイプ [ur / gc / uc]
   */
  // @action.bound
  // async handleManageFollowers({
    
  //   pathArr,
  //   pathname,
  //   users_id,
  //   gameCommunities_id,
  //   userCommunities_id,
  //   pageType,
    
  // }) {
    
    
  //   try {
      
      
  //     // ---------------------------------------------
  //     //   Property
  //     // ---------------------------------------------
      
  //     const targetUsers_id = lodashGet(this.dataObj, [...pathArr, 'dialogObj', 'targetUsers_id'], '');
  //     const type = lodashGet(this.dataObj, [...pathArr, 'dialogObj', 'type'], '');
      
      
      
      
  //     // ---------------------------------------------
  //     //   Loading 表示
  //     // ---------------------------------------------
      
  //     storeLayout.handleLoadingShow({});
      
      
  //     // ---------------------------------------------
  //     //   Button Disable
  //     // ---------------------------------------------
      
  //     storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
  //     // ---------------------------------------------
  //     //   User
  //     // ---------------------------------------------
      
  //     let resultObj = {};
      
      
  //     if (pageType === 'uc') {
        
        
  //       // ---------------------------------------------
  //       //   FormData
  //       // ---------------------------------------------
        
  //       const formDataObj = {
          
  //         userCommunities_id,
  //         targetUsers_id,
  //         type,
          
  //       };
        
        
  //       // ---------------------------------------------
  //       //   Fetch
  //       // ---------------------------------------------
        
  //       resultObj = await fetchWrapper({
  //         urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/follows/upsert-manage-followers-uc`,
  //         methodType: 'POST',
  //         formData: JSON.stringify(formDataObj),
  //       });
        
      
  //     } else if (pageType === 'ur') {
        
        
  //       // ---------------------------------------------
  //       //   FormData
  //       // ---------------------------------------------
        
  //       const formDataObj = {
          
  //         targetUsers_id,
  //         type,
          
  //       };
        
        
  //       // ---------------------------------------------
  //       //   Fetch
  //       // ---------------------------------------------
        
  //       resultObj = await fetchWrapper({
  //         urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/follows/upsert-manage-followers-ur`,
  //         methodType: 'POST',
  //         formData: JSON.stringify(formDataObj),
  //       });
        
        
  //     }
      
      
  //     // console.log(`
  //     //   ----- resultObj -----\n
  //     //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
  //     //   --------------------\n
  //     // `);
      
      
  //     // ---------------------------------------------
  //     //   Error
  //     // ---------------------------------------------
      
  //     if ('errorsArr' in resultObj) {
  //       throw new CustomError({ errorsArr: resultObj.errorsArr });
  //     }
      
      
      
      
  //     // ---------------------------------------------
  //     //   メンバー読み込み
  //     // ---------------------------------------------
      
  //     const page = lodashGet(this.dataObj, [...pathArr, 'followMembersObj', `${type}Obj`, 'page'], 1);
      
  //     this.handleReadFollowMembers({
        
  //       pathArr,
  //       pathname,
  //       users_id,
  //       gameCommunities_id,
  //       userCommunities_id,
  //       page,
  //       forceReload: true,
        
  //     });
      
      
      
      
  //     // --------------------------------------------------
  //     //   console.log
  //     // --------------------------------------------------
      
  //     // console.log(`
  //     //   ----------------------------------------\n
  //     //   /app/common/follow-members/stores/store.js - handleManageFollowers
  //     // `);
      
  //     // console.log(chalk`
  //     //   pathname: {green ${pathname} / ${typeof pathname}}
  //     //   users_id: {green ${users_id} / ${typeof users_id}}
  //     //   gameCommunities_id: {green ${gameCommunities_id} / ${typeof gameCommunities_id}}
  //     //   userCommunities_id: {green ${userCommunities_id} / ${typeof userCommunities_id}}
  //     //   pageType: {green ${pageType} / ${typeof pageType}}
  //     //   targetUsers_id: {green ${targetUsers_id} / ${typeof targetUsers_id}}
  //     //   type: {green ${type} / ${typeof type}}
  //     // `);
      
      
  //     // console.log(`
  //     //   ----- pathArr -----\n
  //     //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
  //     //   --------------------\n
  //     // `);
      
      
  //   } catch (errorObj) {
      
      
  //     // ---------------------------------------------
  //     //   Snackbar: Error
  //     // ---------------------------------------------
      
  //     storeLayout.handleSnackbarOpen({
  //       variant: 'error',
  //       errorObj,
  //     });
      
      
  //   } finally {
      
      
  //     // ---------------------------------------------
  //     //   Button Enable
  //     // ---------------------------------------------
      
  //     storeLayout.handleButtonEnable({ pathArr });
      
      
  //     // ---------------------------------------------
  //     //   Loading 非表示
  //     // ---------------------------------------------
      
  //     storeLayout.handleLoadingHide({});
      
      
      
      
  //     // ---------------------------------------------
  //     //   Dialog Close
  //     // ---------------------------------------------
      
  //     this.handleEdit({
  //       pathArr: [...pathArr, 'showDialog'],
  //       value: false,
  //     });
      
      
  //   }
    
    
  // };
  
  
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