// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import { action, observable } from 'mobx';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../../../@modules/fetch';


// ---------------------------------------------
//   Format
// ---------------------------------------------

import { errorsArrIntoErrorMessage } from '../../../../@format/error';





// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeLoginIndex = null;
let storeLayout = null;
let storeData = null;





// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   Constructor
  // ---------------------------------------------
  
  constructor() {}
  
  
  
  
  
  
  
  // ---------------------------------------------
  //   Expanded
  // ---------------------------------------------
  
  /**
   * カードの開閉用オブジェクト
   * @type {Object}
   */
  // @observable cardExpandedObj = {};
  
  
  /**
   * カードを開閉する。アイコンをクリックしたときに呼び出される
   * @param {string} id - ID
   */
  // @action.bound
  // handleCardExpanded(id) {
    
  //   // console.log(`handleCardExpanded id = ${id}`);
    
  //   if (id in this.cardExpandedObj) {
  //     this.cardExpandedObj[id] = !this.cardExpandedObj[id];
  //   } else {
  //     this.cardExpandedObj[id] = false;
  //   }
    
  // };
  
  
  
  // ---------------------------------------------
  //   Follow
  // ---------------------------------------------
  
  /**
   * フォローボタンの利用禁止判定
   * @type {boolean}
   */
  // @observable followButtonDisabled = true;
  
  /**
   * フォローボタンの利用禁止判定を更新する
   * @param {boolean} value - 利用不可 true / 利用可能 false
   */
  // setFollowButtonDisabled(value) {
  //   this.followButtonDisabled = value;
  // };
  
  
  
  /**
   * フォローボタンを押すと呼び出される
   * @param {string} type - フォローかフォロー解除か follow / unfollow
   * @param {Object} cardPlayers_id - データベース card-players の _id
   * @param {Object} users_id - フォローする相手のデータベース users の _id
   */
  @action.bound
  async handleFollowSubmit(type, cardPlayers_id, users_id) {
    
    
    try {
      
      // console.log(`${cardPlayers_id}-follow` in storeLayout.buttonDisabledObj);
      // console.log(storeLayout.buttonDisabledObj[`${cardPlayers_id}-follow`]);
      // ---------------------------------------------
      //   DOM の読み込みが終わってない場合、処理停止
      // ---------------------------------------------
      
      // if (
      //   cardPlayers_id in storeLayout.buttonDisabledObj === false ||
      //   storeLayout.buttonDisabledObj[`${cardPlayers_id}-follow`] === true
      // ) {
      // // if (storeLayout.buttonDisabledObj[`${cardPlayers_id}-follow`]) {
      //   console.log('disabled');
      //   return;
      // }
      // return;
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formData = new FormData();
      
      formData.append('users_id', users_id);
      
      
      // ---------------------------------------------
      //   Button Disabled
      // ---------------------------------------------
      
      storeLayout.handleButtonDisabledObj(`${cardPlayers_id}-follow`, true);
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${storeData.urlApi}/v1/card-players/follow`,
        methodType: 'POST',
        formData: formData
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
        throw new Error(errorsArrIntoErrorMessage(resultObj.errorsArr));
      }
      
      
      // ---------------------------------------------
      //   ダイアログを閉じる
      // ---------------------------------------------
      
      this.handleFollowDialogClose(cardPlayers_id);
      
      
      // ---------------------------------------------
      //   Data Users 更新
      // ---------------------------------------------
      
      storeData.updateUsersObj(resultObj.data.usersObj);
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      if (type === 'follow') {
        storeLayout.handleSnackbarOpen('success', 'フォローしました。');
      } else {
        storeLayout.handleSnackbarOpen('success', 'フォローを解除しました。');
      }
      
      
    } catch (error) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      if (type === 'follow') {
        storeLayout.handleSnackbarOpen('error', `フォローできませんでした。${error.message}`);
      } else {
        storeLayout.handleSnackbarOpen('error', `フォローの解除ができませんでした。。${error.message}`);
      }
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisabledObj(`${cardPlayers_id}-follow`, false);
      
      
    }
    
  };
  
  
  
  /**
   * ダイアログを表示するかどうかを決めるオブジェクト
   * @type {Object}
   */
  @observable followDialogOpenObj = {};
  
  /**
   * ダイアログを開く
   * @param {string} cardPlayers_id - ID
   */
  @action.bound
  handleFollowDialogOpen(cardPlayers_id) {
    this.followDialogOpenObj[cardPlayers_id] = true;
  };
  
  /**
   * ダイアログを閉じる
   * @param {string} cardPlayers_id - ID
   */
  @action.bound
  handleFollowDialogClose(cardPlayers_id) {
    this.followDialogOpenObj[cardPlayers_id] = false;
  };
  
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreCardPlayer(argumentsObj, storeInstanceObj) {
  
  const isServer = argumentsObj.isServer;
  
  
  if ('layout' in storeInstanceObj) {
    storeLayout = storeInstanceObj.layout;
  }
  
  if ('data' in storeInstanceObj) {
    storeData = storeInstanceObj.data;
  }
  
  
  if (isServer) {
    
    return new Store();
    
  } else {
    
    if (storeLoginIndex === null) {
      storeLoginIndex = new Store();
    }
    
    return storeLoginIndex;
    
  }
  
}