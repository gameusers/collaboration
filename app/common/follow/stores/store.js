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
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../../@modules/fetch';
import { CustomError } from '../../../@modules/error/custom';


// --------------------------------------------------
//   Stores
// --------------------------------------------------

import initStoreData from '../../../@stores/data';
import initStoreLayout from '../../../common/layout/stores/layout';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeFollow = null;
let storeData = initStoreData({});
let storeLayout = initStoreLayout({});




// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
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
  //   Follow
  // ---------------------------------------------
  
  /**
   * フォロー / フォロー解除 - ゲームコミュニティ or ユーザーコミュニティ
   * @param {Array} pathArr - パス
   * @param {string} type - [followGc / unfollowGc] [followUc / unfollowUc / followApprovalUc / unfollowApprovalUc]
   * @param {string} gameCommunities_id - フォローするゲームコミュニティの _id
   * @param {string} userCommunities_id - フォローするユーザーコミュニティの _id
   */
  @action.bound
  async handleFollow({ pathArr, type, gameCommunities_id, userCommunities_id }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        gameCommunities_id,
        userCommunities_id,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/follows/upsert-follow`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj)
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
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/common/follow/stores/store.js - handleFollow
      // `);
      
      // console.log(chalk`
      //   type: {green ${type}}
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      // `);
      
      // console.log(`
      //   ----- storeData.headerObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(storeData.headerObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   メンバーかどうか、メンバー数を変更
      // ---------------------------------------------
      
      if (lodashHas(resultObj, ['data', 'follow'])) {
        lodashSet(storeData, ['headerObj', 'followsObj', 'follow'], resultObj.data.follow);
      }
      
      if (lodashHas(resultObj, ['data', 'followedCount'])) {
        lodashSet(storeData, ['headerObj', 'followsObj', 'followedCount'], resultObj.data.followedCount);
      }
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      let messageID = 'RTsMTGw-1';
      
      switch (type) {
        
        case 'followGc':
          messageID = 'RTsMTGw-1';
          break;
          
        case 'unfollowGc':
          messageID = '1z127R0YE';
          break;
          
        
        case 'followUc':
          messageID = 'SY6WWDyxQ';
          break;
          
        case 'unfollowUc':
          messageID = 'xWAfTONZ6';
          break;
          
        case 'followApprovalUc':
          messageID = 'PaC4bsJe2';
          break;
          
        case 'unfollowApprovalUc':
          messageID = 'HOo6u_sXD';
          break;
          
      }
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID,
      });
      
      
      
      
      // ---------------------------------------------
      //   リロードする
      // ---------------------------------------------
      
      const pageTransition = lodashGet(resultObj, ['data', 'pageTransition'], false);
      
      if (pageTransition) {
        window.location.reload();
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
      //   ダイアログを非表示にする
      //   /app/common/follow/components/gc-uc-button.js
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: [...pathArr, 'showDialogUnfollow'],
        value: false,
      });
      
      this.handleEdit({
        pathArr: [...pathArr, 'showDialogUnfollowApproval'],
        value: false,
      });
      
      
    }
    
  };
  
  
  
  
  /**
   * フォロー / フォロー解除 - ユーザー
   * @param {Array} pathArr - パス
   * @param {string} type - フォロー follow / 
   * @param {string} users_id - フォローする相手の DB users _id
   */
  @action.bound
  async handleFollowUr({ pathArr, type, users_id }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/common/follow/stores/store.js
      // `);
      
      // console.log(`
      //   ----- pathArr -----\n
      //   ${util.inspect(pathArr, { pathArr: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   type: {green ${type}}
      //   users_id: {green ${users_id} / ${typeof users_id}}
      // `);
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        users_id,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/follows/upsert-follow-ur`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj)
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
      //   フォロー状態、フォロー数を変更
      // ---------------------------------------------
      
      const follow = lodashGet(resultObj, ['data', 'follow'], null);
      const followApproval = lodashGet(resultObj, ['data', 'followApproval'], null);
      const followedCount = lodashGet(resultObj, ['data', 'followedCount'], null);
      
      
      // ----------------------------------------
      //   - Header
      // ----------------------------------------
      
      if (follow !== null) {
        lodashSet(storeData, ['headerObj', 'followsObj', 'follow'], follow);
      }
      
      if (followApproval !== null) {
        lodashSet(storeData, ['headerObj', 'followsObj', 'followApproval'], followApproval);
      }
      
      if (followedCount !== null) {
        lodashSet(storeData, ['headerObj', 'followsObj', 'followedCount'], followedCount);
      }
      
      
      // ----------------------------------------
      //   - Card Players
      // ----------------------------------------
      
      const cardPlayers_idsArr = lodashGet(resultObj, ['data', 'cardPlayers_idsArr'], []);
      
      for (let cardPlayers_id of cardPlayers_idsArr.values()) {
        
        // console.log(chalk`
        //   cardPlayers_id: {green ${cardPlayers_id}}
        // `);
        
        if (follow !== null) {
          lodashSet(storeData, ['cardPlayersObj', cardPlayers_id, 'followsObj', 'follow'], follow);
        }
        
        if (followApproval !== null) {
          lodashSet(storeData, ['cardPlayersObj', cardPlayers_id, 'followsObj', 'followApproval'], followApproval);
        }
        
        if (followedCount !== null) {
          lodashSet(storeData, ['cardPlayersObj', cardPlayers_id, 'followsObj', 'followedCount'], followedCount);
        }
        
      }
      
      // console.log(`
      //   ----- lodashGet(storeData, ['cardPlayersObj'], {}) -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(lodashGet(storeData, ['cardPlayersObj'], {}))), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      let messageID = 'RTsMTGw-1';
      
      switch (type) {
        
        case 'follow':
          messageID = 'RTsMTGw-1';
          break;
          
        case 'unfollow':
          messageID = '1z127R0YE';
          break;
          
        case 'followApproval':
          messageID = 'T7i5qYulJ';
          break;
          
        case 'unfollowApproval':
          messageID = 'a-BV7oEkP';
          break;
          
      }
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID,
      });
      
      
      
      
      // ---------------------------------------------
      //   リロードする
      // ---------------------------------------------
      
      const pageTransition = lodashGet(resultObj, ['data', 'pageTransition'], false);
      
      if (pageTransition) {
        window.location.reload();
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
      //   ダイアログを非表示にする
      //   /app/common/follow/components/gc-uc-button.js
      // ---------------------------------------------
      
      this.handleEdit({
        pathArr: [...pathArr, 'showDialogUnfollow'],
        value: false,
      });
      
      this.handleEdit({
        pathArr: [...pathArr, 'showDialogUnfollowApproval'],
        value: false,
      });
      
      
    }
    
  };
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreFollow({ propsObj }) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeFollow === null) {
    storeFollow = new Store();
  }
  
  
  // --------------------------------------------------
  //   Props
  // --------------------------------------------------
  
  if (propsObj) {
    
    
    // --------------------------------------------------
    //   Pathname
    // --------------------------------------------------
    
    // if (lodashHas(propsObj, ['pathname'])) {
    //   storeFollow.pathname = propsObj.pathname;
    // }
    
    
    // // --------------------------------------------------
    // //   HeaderNavMainArr
    // // --------------------------------------------------
    
    // if (lodashHas(propsObj, ['headerNavMainArr'])) {
    //   storeFollow.headerNavMainArr = propsObj.headerNavMainArr;
    // }
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeFollow;
  
}