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

let storeUcMember = null;
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
    page,
    newLimit,
    
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
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/uc/member/stores/store.js
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
        //   更新
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
      //   更新
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: [...pathArr, 'membersObj'],
        value: mergedMembersObj
      });
      
      
      // ---------------------------------------------
      //   Set Temporary Data - memberPage
      // ---------------------------------------------
      
      storeData.setTemporaryData({ pathname, key: 'memberPage', value: page });
      
      
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
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreUcMember({ propsObj }) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeUcMember === null) {
    storeUcMember = new Store();
  }
  // console.log('initStoreUcMember');
  
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
    
    if (lodashHas(propsObj, ['membersObj'])) {
      lodashSet(storeUcMember, ['dataObj', ...pathArr, 'membersObj'], propsObj.membersObj);
    }
    
    
    // --------------------------------------------------
    //   approvalCount
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['approvalCount'])) {
      lodashSet(storeUcMember, ['dataObj', ...pathArr, 'approvalCount'], propsObj.approvalCount);
    }
    
    
    // --------------------------------------------------
    //   membersObj
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['blockCount'])) {
      lodashSet(storeUcMember, ['dataObj', ...pathArr, 'blockCount'], propsObj.blockCount);
    }
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   userCommunities_id: {green ${userCommunities_id}}
    // `);
    
    // console.log(`
    //   ----- storeUcMember.dataObj -----\n
    //   ${util.inspect(storeUcMember.dataObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeUcMember;
  
  
}