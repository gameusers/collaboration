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
   * プレイヤーカード用ダイアログ内のカードを指定するオブジェクト
   * @type {Object}
   */
  @observable cardPlayerDialogObj = {
    type: '',
    _id: ''
  };
  
  
  /**
   * プレイヤーカード用ダイアログを表示するかどうかを決める変数
   * @type {boolean}
   */
  @observable cardPlayerDialog = false;
  
  
  /**
   * プレイヤーカード用ダイアログを閉じる
   */
  @action.bound
  handleCardPlayerDialogClose() {
    this.cardPlayerDialog = false;
  };
  
  
  /**
   * プレイヤーカード用ダイアログを開く
   * @param {string} cardPlayers_id - DB card-players _id
   * @param {string} cardGames_id - DB card-games _id
   */
  @action.bound
  async handleCardPlayerDialogOpen(type, _id) {
    
    
    // console.log(chalk`
    //   type: {green ${type}}
    //   _id: {green ${_id}}
    // `);
    
    
    try {
      
      
      if (type === 'player') {
        
        if (_id in storeData.cardPlayersObj && storeData.cardPlayersObj[_id].comment) {
          
          this.cardPlayerDialogObj.type = type;
          this.cardPlayerDialogObj._id = _id;
          this.cardPlayerDialog = true;
          
        } else {
          
          // console.log('fetchWrapper');
           
          
          // ---------------------------------------------
          //   FormData
          // ---------------------------------------------
          
          const formData = new FormData();
          
          formData.append('_id', _id);
          
          
          // ---------------------------------------------
          //   Button Disabled
          // ---------------------------------------------
          
          storeLayout.handleButtonDisabledObj(`${_id}-card-player`, true);
          
          
          // ---------------------------------------------
          //   Fetch
          // ---------------------------------------------
          
          const resultObj = await fetchWrapper({
            urlApi: `${storeData.urlApi}/v1/card-players/find-one-by-id`,
            methodType: 'POST',
            formData: formData
          });
          
          
          // ---------------------------------------------
          //   Error
          // ---------------------------------------------
          
          if ('errorsArr' in resultObj) {
            throw new Error(errorsArrIntoErrorMessage(resultObj.errorsArr));
          }
          
          
          // ---------------------------------------------
          //   Data 更新 - usersObj
          // ---------------------------------------------
          
          const usersObj = {};
          usersObj[resultObj.data[_id].users_id] = resultObj.data[_id].usersObj;
          
          storeData.updateUsersObj(usersObj);
          
          
          // ---------------------------------------------
          //  Data 更新 - cardPlayersObj
          // ---------------------------------------------
          
          storeData.updateCardPlayersObj(resultObj.data);
          
          
          // ---------------------------------------------
          //   ダイアログ表示
          // ---------------------------------------------
          
          this.cardPlayerDialogObj.type = type;
          this.cardPlayerDialogObj._id = _id;
          this.cardPlayerDialog = true;
          
          
          // console.log(`
          //   ----- resultObj -----\n
          //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
          //   --------------------\n
          // `);
          
          // console.log(chalk`
          //   cardPlayersObj.users_id: {green ${cardPlayersObj.users_id}}
          // `);
          
          // console.log(`
          //   ----- cardPlayersObj -----\n
          //   ${util.inspect(cardPlayersObj, { colors: true, depth: null })}\n
          //   --------------------\n
          // `);
          
          // console.log(`
          //   ----- resultObj.data -----\n
          //   ${util.inspect(resultObj.data, { colors: true, depth: null })}\n
          //   --------------------\n
          // `);
           
           
        }
        
      } else if (type === 'game') {
        
        if (_id in storeData.cardGamesObj && storeData.cardGamesObj[_id].comment) {
          
          this.cardPlayerDialogObj.type = type;
          this.cardPlayerDialogObj._id = _id;
          this.cardPlayerDialog = true;
          
        } else {
          
          // console.log('fetchWrapper');
          
          // ---------------------------------------------
          //   FormData
          // ---------------------------------------------
          
          const formData = new FormData();
          
          formData.append('_id', _id);
          
          
          // ---------------------------------------------
          //   Button Disabled
          // ---------------------------------------------
          
          storeLayout.handleButtonDisabledObj(`${_id}-card-game`, true);
          
          
          // ---------------------------------------------
          //   Fetch
          // ---------------------------------------------
          
          const resultObj = await fetchWrapper({
            urlApi: `${storeData.urlApi}/v1/card-games/find-one-by-id`,
            methodType: 'POST',
            formData: formData
          });
          
          
          // ---------------------------------------------
          //   Error
          // ---------------------------------------------
          
          if ('errorsArr' in resultObj) {
            throw new Error(errorsArrIntoErrorMessage(resultObj.errorsArr));
          }
          
          
          // ---------------------------------------------
          //   Data 更新 - usersObj
          // ---------------------------------------------
          
          const usersObj = {};
          usersObj[resultObj.data[_id].users_id] = resultObj.data[_id].usersObj;
          
          storeData.updateUsersObj(usersObj);
          
          
          // ---------------------------------------------
          //  Data 更新 - cardGamesObj
          // ---------------------------------------------
          
          storeData.updateCardGamesObj(resultObj.data);
          
          
          // ---------------------------------------------
          //   ダイアログ表示
          // ---------------------------------------------
          
          this.cardPlayerDialogObj.type = type;
          this.cardPlayerDialogObj._id = _id;
          this.cardPlayerDialog = true;
          
          
          // console.log(`
          //   ----- resultObj -----\n
          //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
          //   --------------------\n
          // `);
          
          // console.log(chalk`
          //   cardPlayersObj.users_id: {green ${cardPlayersObj.users_id}}
          // `);
          
          // console.log(`
          //   ----- cardPlayersObj -----\n
          //   ${util.inspect(cardPlayersObj, { colors: true, depth: null })}\n
          //   --------------------\n
          // `);
          
          // console.log(`
          //   ----- resultObj.data -----\n
          //   ${util.inspect(resultObj.data, { colors: true, depth: null })}\n
          //   --------------------\n
          // `);
           
           
        }
        
        
      }
      
      
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
      
      if (type === 'player') {
        storeLayout.handleButtonDisabledObj(`${_id}-card-player`, false);
      } else if (type === 'game') {
        storeLayout.handleButtonDisabledObj(`${_id}-card-game`, false);
      }
      
      
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
        urlApi: `${storeData.urlApi}/v1/users/follow`,
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
  
  
  
  
  // ---------------------------------------------
  //   Card Player
  // ---------------------------------------------
  
  /**
   * 編集フォームのデータを入れるオブジェクト
   * @type {Object}
   */
  @observable cardPlayerEditFormObj = {};
  
  
  /**
   * 編集フォームを表示するかどうかを決める変数
   * @type {boolean}
   */
  @observable cardPlayerEditFormOpenObj = {};
  
  
  /**
   * 編集フォームを閉じる
   */
  @action.bound
  handleCardPlayerEditFormClose(cardPlayers_id) {
    this.cardPlayerEditFormOpenObj[cardPlayers_id] = false;
  };
  
  
  /**
   * 編集フォームを開く
   * @param {string} cardPlayers_id - DB card-players _id
   * @param {string} cardGames_id - DB card-games _id
   */
  @action.bound
  async handleCardPlayerEditFormOpen(cardPlayers_id) {
    
    
    // console.log(chalk`
    //   cardPlayers_id: {green ${cardPlayers_id}}
    // `);
    
    
    try {
      
      
      this.cardPlayerEditFormOpenObj[cardPlayers_id] = true;
      
      // if (_id in storeData.cardPlayersObj && storeData.cardPlayersObj[_id].comment) {
        
      //   this.cardPlayerDialogObj.type = type;
      //   this.cardPlayerDialogObj._id = _id;
      //   this.cardPlayerDialog = true;
        
      // } else {
        
      //   // console.log('fetchWrapper');
         
        
      //   // ---------------------------------------------
      //   //   FormData
      //   // ---------------------------------------------
        
      //   const formData = new FormData();
        
      //   formData.append('_id', _id);
        
        
      //   // ---------------------------------------------
      //   //   Button Disabled
      //   // ---------------------------------------------
        
      //   storeLayout.handleButtonDisabledObj(`${_id}-card-player`, true);
        
        
      //   // ---------------------------------------------
      //   //   Fetch
      //   // ---------------------------------------------
        
      //   const resultObj = await fetchWrapper({
      //     urlApi: `${storeData.urlApi}/v1/card-players/find-one-by-id`,
      //     methodType: 'POST',
      //     formData: formData
      //   });
        
        
      //   // ---------------------------------------------
      //   //   Error
      //   // ---------------------------------------------
        
      //   if ('errorsArr' in resultObj) {
      //     throw new Error(errorsArrIntoErrorMessage(resultObj.errorsArr));
      //   }
        
        
      //   // ---------------------------------------------
      //   //   Data 更新 - usersObj
      //   // ---------------------------------------------
        
      //   const usersObj = {};
      //   usersObj[resultObj.data[_id].users_id] = resultObj.data[_id].usersObj;
        
      //   storeData.updateUsersObj(usersObj);
        
        
      //   // ---------------------------------------------
      //   //  Data 更新 - cardPlayersObj
      //   // ---------------------------------------------
        
      //   storeData.updateCardPlayersObj(resultObj.data);
        
        
      //   // ---------------------------------------------
      //   //   ダイアログ表示
      //   // ---------------------------------------------
        
      //   this.cardPlayerDialogObj.type = type;
      //   this.cardPlayerDialogObj._id = _id;
      //   this.cardPlayerDialog = true;
        
        
      //   // console.log(`
      //   //   ----- resultObj -----\n
      //   //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   //   --------------------\n
      //   // `);
        
      //   // console.log(chalk`
      //   //   cardPlayersObj.users_id: {green ${cardPlayersObj.users_id}}
      //   // `);
        
      //   // console.log(`
      //   //   ----- cardPlayersObj -----\n
      //   //   ${util.inspect(cardPlayersObj, { colors: true, depth: null })}\n
      //   //   --------------------\n
      //   // `);
        
      //   // console.log(`
      //   //   ----- resultObj.data -----\n
      //   //   ${util.inspect(resultObj.data, { colors: true, depth: null })}\n
      //   //   --------------------\n
      //   // `);
         
         
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
      
      // if (type === 'player') {
      //   storeLayout.handleButtonDisabledObj(`${_id}-card-player`, false);
      // } else if (type === 'game') {
      //   storeLayout.handleButtonDisabledObj(`${_id}-card-game`, false);
      // }
      
      
    }
    
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