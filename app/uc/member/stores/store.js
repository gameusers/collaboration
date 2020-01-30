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
  //   スレッド
  // ---------------------------------------------
  
  /**
   * メンバーを読み込む
   * @param {Array} pathArr - パス
   * @param {string} pathname - ページの固有ID　例）/uc/community1
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {number} page - スレッドのページ
   * @param {number} changeLimit - 1ページに表示する件数を変更する場合、値を入力する
   */
  @action.bound
  async handleReadMembers({
    
    pathArr,
    pathname,
    userCommunities_id,
    page,
    changeLimit,
    
  }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const page = lodashGet(this.dataObj, [...pathArr, 'membersObj', 'page'], 1);
      const count = lodashGet(this.dataObj, [...pathArr, 'membersObj', 'count'], 1);
      let limit = parseInt((storeData.getCookie({ key: 'memberLimit' }) || process.env.COMMUNITY_MEMBER_LIMIT), 10);
      const arr = lodashGet(this.dataObj, [...pathArr, 'membersObj', `page${page}Obj`, 'arr'], []);
      
      const membersObj = lodashGet(this.dataObj, [...pathArr, 'membersObj'], {});
      const clonedMembersObj = lodashCloneDeep(membersObj);
      
      const loadedDate = lodashGet(membersObj, [`page${page}Obj`, 'loadedDate'], '');
      
      let reload = false;
      
      
      
      
      // ---------------------------------------------
      //   1ページに表示する件数を変更した場合
      // ---------------------------------------------
      
      if (changeLimit) {
        
        
        // ---------------------------------------------
        //   Set Cookie - memberLimit
        // ---------------------------------------------
        
        limit = changeLimit;
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
      
      console.log(`
        ----------------------------------------\n
        /app/uc/member/stores/store.js
      `);
      
      console.log(chalk`
        page: {green ${page}}
        count: {green ${count}}
        limit: {green ${limit}}
        loadedDate: {green ${loadedDate}}
        reload: {green ${reload}}
      `);
      
      console.log(`
        ----- membersObj -----\n
        ${util.inspect(JSON.parse(JSON.stringify(membersObj)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      console.log(`
        ----- pathArr -----\n
        ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
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
        //  Page 更新
        // ---------------------------------------------
        
        clonedMembersObj.page = page;
        
        this.handleEdit({
          pathArr,
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
      
      const newCardPlayersObj = lodashGet(resultObj, ['data', 'cardPlayersObj'], {});
      const newMembersObj = lodashGet(resultObj, ['data', 'membersObj'], {});
      
      
      console.log(`
        ----- newCardPlayersObj -----\n
        ${util.inspect(JSON.parse(JSON.stringify(newCardPlayersObj)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      console.log(`
        ----- newMembersObj -----\n
        ${util.inspect(JSON.parse(JSON.stringify(newMembersObj)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // // ---------------------------------------------
      // //   forumThreadsObj
      // // ---------------------------------------------
      
      // const forumThreadsOldObj = lodashGet(forumObj, ['forumThreadsObj'], {});
      // const forumThreadsNewObj = lodashGet(resultObj, ['data', 'forumThreadsObj'], {});
      
      // // 再読込する場合は新しいデータに置き換える、再読込しない場合は古いデータと新しいデータをマージする
      // const forumThreadsMergedObj = reload ? forumThreadsNewObj : lodashMerge(forumThreadsOldObj, forumThreadsNewObj);
      
      // clonedObj.forumThreadsObj = forumThreadsMergedObj;
      
      // // console.log(`
      // //   ----- forumThreadsOldObj -----\n
      // //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsOldObj)), { colors: true, depth: null })}\n
      // //   --------------------\n
      // // `);
      
      // // console.log(`
      // //   ----- forumThreadsNewObj -----\n
      // //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsNewObj)), { colors: true, depth: null })}\n
      // //   --------------------\n
      // // `);
      
      // // console.log(`
      // //   ----- forumThreadsMergedObj -----\n
      // //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsMergedObj)), { colors: true, depth: null })}\n
      // //   --------------------\n
      // // `);
      
      
      
      
      
      // // ---------------------------------------------
      // //   Page
      // // ---------------------------------------------
      
      // clonedObj.forumThreadsObj.page = page;
      
      
      // // --------------------------------------------------
      // //   Community UpdatedDateObj
      // // --------------------------------------------------
      
      // const updatedDateObj = lodashGet(resultObj, ['data', 'updatedDateObj'], {});
      // clonedObj.updatedDateObj = updatedDateObj;
      
      
      
      
      // // ---------------------------------------------
      // //   Update
      // // ---------------------------------------------
      
      // this.handleEdit({
      //   pathArr: ['forumThreadLimit'],
      //   value: threadLimit,
      // });
      
      // this.handleEdit({
      //   pathArr: [communities_id],
      //   value: clonedObj
      // });
      
      
      
      
      // // ---------------------------------------------
      // //   Set Temporary Data - ForumThreadPage
      // // ---------------------------------------------
      
      // storeData.setTemporaryDataForumThreadPage({ pathname, value: page });
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        errorObj,
      });
      
      
    } finally {
      // console.log('finally');
      
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
        to: 'forumThreads',
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