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
   * フォロー / フォロー解除
   * @param {Array} pathArr - パス
   * @param {string} type - フォロー follow / 
   * @param {string} gameCommunities_id - フォローするゲームコミュニティの _id
   * @param {string} userCommunities_id - フォローするユーザーコミュニティの _id
   * @param {string} users_id - フォローする相手の _id
   */
  @action.bound
  async handleFollow({ pathArr, type, gameCommunities_id, userCommunities_id, users_id }) {
    
    
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
        users_id,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/db/follows/upsert-follow`,
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
      //   メンバーかどうか、メンバー数を変更
      // ---------------------------------------------
      
      if (lodashHas(resultObj, ['data', 'member'])) {
        lodashSet(storeData, ['headerObj', 'member'], resultObj.data.member);
      }
      
      if (lodashHas(resultObj, ['data', 'memberApproval'])) {
        lodashSet(storeData, ['headerObj', 'memberApproval'], resultObj.data.memberApproval);
      }
      
      if (lodashHas(resultObj, ['data', 'followedCount'])) {
        lodashSet(storeData, ['headerObj', 'followedCount'], resultObj.data.followedCount);
      }
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      let messageID = 'RTsMTGw-1';
      
      switch (type) {
        
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
   * フォロー用ダイアログを表示するかどうかを決めるオブジェクト
   * フォローを解除する際に利用。ダイアログで解除していいか尋ねる
   * @type {Object}
   */
  // @observable followDialogOpenObj = {};
  
  
  // /**
  // * フォロー用ダイアログを開く
  // * @param {string} users_id - ID
  // */
  // @action.bound
  // handleFollowDialogOpen(users_id) {
  //   this.followDialogOpenObj[users_id] = true;
  // };
  
  
  // /**
  // * フォロー用ダイアログを閉じる
  // * @param {string} users_id - ID
  // */
  // @action.bound
  // handleFollowDialogClose(users_id) {
  //   this.followDialogOpenObj[users_id] = false;
  // };
  
  
  
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