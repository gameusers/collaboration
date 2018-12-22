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

let store = null;
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
  //   Card Player
  // ---------------------------------------------
  
  /**
   * プレイヤーカード用ダイアログを表示するかどうかを決めるオブジェクト
   * @type {Object}
   */
  @observable cardPlayerDialogObj = {};
  
  /**
   * プレイヤーカード用ダイアログを開く
   * @param {string} _id - ID
   */
  // @action.bound
  // handleCardPlayerDialogOpen(_id) {
  //   this.cardPlayerDialogOpenObj[_id] = true;
  // };
  
  /**
   * プレイヤーカード用ダイアログを閉じる
   * @param {string} _id - ID
   */
  @action.bound
  handleCardPlayerDialogClose(_id) {
    this.cardPlayerDialogObj[_id] = false;
  };
  
  
  
  
  /**
   * プレイヤーカードをダイアログで表示する
   * @param {string} cardPlayers_id - DB card-players _id
   * @param {string} cardGames_id - DB card-games _id
   */
  @action.bound
  async handleCardPlayerDialogOpen(cardPlayers_id, cardGames_id) {
    
    
    console.log(chalk`
      cardPlayers_id: {green ${cardPlayers_id}}
      cardGames_id: {green ${cardGames_id}}
    `);
    
    
    try {
      
      
      if (cardGames_id && cardGames_id in storeData.cardGamesObj) {
        this.cardPlayerDialogObj[cardGames_id] = true; 
      }
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      // const formData = new FormData();
      
      // formData.append('users_id', users_id);
      
      
      // // ---------------------------------------------
      // //   Button Disabled
      // // ---------------------------------------------
      
      // storeLayout.handleButtonDisabledObj(`${users_id}-follow`, true);
      
      
      // // ---------------------------------------------
      // //   Fetch
      // // ---------------------------------------------
      
      // const resultObj = await fetchWrapper({
      //   urlApi: `${storeData.urlApi}/v1/card-players/follow`,
      //   methodType: 'POST',
      //   formData: formData
      // });
      
      
      // // console.log(`
      // //   ----- resultObj -----\n
      // //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      // //   --------------------\n
      // // `);
      
      
      // // ---------------------------------------------
      // //   Error
      // // ---------------------------------------------
      
      // if ('errorsArr' in resultObj) {
      //   throw new Error(errorsArrIntoErrorMessage(resultObj.errorsArr));
      // }
      
      
      // // ---------------------------------------------
      // //   ダイアログを閉じる
      // // ---------------------------------------------
      
      // this.handleFollowDialogClose(users_id);
      
      
      // // ---------------------------------------------
      // //   Data Users 更新
      // // ---------------------------------------------
      
      // storeData.updateUsersObj(resultObj.data.usersObj);
      
      
      // // ---------------------------------------------
      // //   Snackbar: Success
      // // ---------------------------------------------
      
      // if (type === 'follow') {
      //   storeLayout.handleSnackbarOpen('success', 'フォローしました。');
      // } else {
      //   storeLayout.handleSnackbarOpen('success', 'フォローを解除しました。');
      // }
      
      
    } catch (error) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      // if (type === 'follow') {
      //   storeLayout.handleSnackbarOpen('error', `フォローできませんでした。${error.message}`);
      // } else {
      //   storeLayout.handleSnackbarOpen('error', `フォローの解除ができませんでした。。${error.message}`);
      // }
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      // storeLayout.handleButtonDisabledObj(`${users_id}-follow`, false);
      
      
    }
    
  };
  
  
  
  
  // ---------------------------------------------
  //   Follow
  // ---------------------------------------------
  
  /**
   * フォローボタンを押すと呼び出される
   * @param {string} type - フォローかフォロー解除か follow / unfollow
   * @param {string} users_id - フォローする相手のデータベース users の _id
   */
  @action.bound
  async handleFollowSubmit(type, users_id) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formData = new FormData();
      
      formData.append('users_id', users_id);
      
      
      // ---------------------------------------------
      //   Button Disabled
      // ---------------------------------------------
      
      storeLayout.handleButtonDisabledObj(`${users_id}-follow`, true);
      
      
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
      
      this.handleFollowDialogClose(users_id);
      
      
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
      
      storeLayout.handleButtonDisabledObj(`${users_id}-follow`, false);
      
      
    }
    
  };
  
  
  
  
  /**
   * フォロー用ダイアログを表示するかどうかを決めるオブジェクト
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
    
    if (store === null) {
      store = new Store();
    }
    
    return store;
    
  }
  
}