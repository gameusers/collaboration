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
      
      // console.log(chalk`
      //   resultObj.data.member: {green ${resultObj.data.member}}
      //   resultObj.data.membersCount: {green ${resultObj.data.membersCount}}
      // `);
      
      if (lodashHas(resultObj, ['data', 'member'])) {
        lodashSet(storeData, ['headerObj', 'member'], resultObj.data.member);
      }
      
      if (lodashHas(resultObj, ['data', 'membersCount'])) {
        lodashSet(storeData, ['headerObj', 'membersCount'], resultObj.data.membersCount);
      }
      
      // console.log(`
      //   ----- storeData.headerObj -----\n
      //   ${util.inspect(storeData.headerObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
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
      
      // const pageTransition = lodashGet(resultObj, ['data', 'pageTransition'], false);
      
      // if (pageTransition) {
      //   // window.location.href = `${process.env.URL_BASE}uc/${userCommunityID}/settings`;
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
      
      
    }
    
  };
  
  
  
  
  /**
   * フォロー用ダイアログを表示するかどうかを決めるオブジェクト
   * フォローを解除する際に利用。ダイアログで解除していいか尋ねる
   * @type {Object}
   */
  @observable followDialogOpenObj = {};
  
  
  /**
   * フォロー用ダイアログを開く
   * @param {string} users_id - ID
   */
  @action.bound
  handleFollowDialogOpen(users_id) {
    this.followDialogOpenObj[users_id] = true;
  };
  
  
  /**
   * フォロー用ダイアログを閉じる
   * @param {string} users_id - ID
   */
  @action.bound
  handleFollowDialogClose(users_id) {
    this.followDialogOpenObj[users_id] = false;
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