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
  //   Dialog
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
   * @param {string} type - 開くカードのタイプ player / game
   * @param {string} _id - DB card-players _id / DB card-games _id
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
  
  
  
  
  // ---------------------------------------------
  //   Edit Form - Data
  // ---------------------------------------------
  
  /**
   * 編集フォームのデータ（編集前の原本）を入れるオブジェクト
   * @type {Object}
   */
  @observable cardPlayerEditFormSourceDataObj = {};
  
  
  /**
   * 編集フォームのデータを入れるオブジェクト
   * @type {Object}
   */
  @observable cardPlayerEditFormDataObj = {};
  
  
  /**
   * ダイアログを表示するかどうかを決めるオブジェクト
   * データを元に戻す際に利用。ダイアログで元に戻していいか尋ねる
   * @type {Object}
   */
  @observable cardPlayerEditFormUndoDataDialogOpenObj = {};
  
  
  /**
   * ダイアログを開く
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditFormUndoDataDialogOpen(_id) {
    this.cardPlayerEditFormUndoDataDialogOpenObj[_id] = true;
  };
  
  
  /**
   * ダイアログを閉じる
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditFormUndoDataDialogClose(_id) {
    this.cardPlayerEditFormUndoDataDialogOpenObj[_id] = false;
  };
  
  
  /**
   * 編集フォームに表示されているデータを編集前のデータに戻す
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditFormUndoData(_id) {
    
    // ディープコピー
    this.cardPlayerEditFormDataObj[_id] = JSON.parse(JSON.stringify(this.cardPlayerEditFormSourceDataObj[_id]));
    
    // 趣味の <TextField /> の数をリセットする
    delete this.cardPlayerEditFormHobbyTextFieldCountObj[_id];
    
    // ダイアログを閉じる
    this.cardPlayerEditFormUndoDataDialogOpenObj[_id] = false;
  };
  
  
  
  // ---------------------------------------------
  //   Edit Form - Open
  // ---------------------------------------------
  
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
   */
  @action.bound
  async handleCardPlayerEditFormOpen(cardPlayers_id) {
    
    
    // console.log(chalk`
    //   cardPlayers_id: {green ${cardPlayers_id}}
    // `);
    
    
    try {
      
      
      // ---------------------------------------------
      //   編集フォームに表示するデータがすでに読み込まれている場合
      //   編集フォームをすぐに表示する
      // ---------------------------------------------
      
      if (cardPlayers_id in this.cardPlayerEditFormDataObj) {
        
        this.cardPlayerEditFormOpenObj[cardPlayers_id] = true;
        
      
      // ---------------------------------------------
      //   編集フォームに表示するデータがまだ読み込まれていない場合
      //   Fetch でデータを取得してから編集フォームを表示する
      // ---------------------------------------------
      
      } else {
        
        console.log('fetchWrapper');
         
        
        // ---------------------------------------------
        //   FormData
        // ---------------------------------------------
        
        const formData = new FormData();
        
        formData.append('_id', cardPlayers_id);
        
        
        // ---------------------------------------------
        //   Button Disabled
        // ---------------------------------------------
        
        storeLayout.handleButtonDisabledObj(`${cardPlayers_id}-editButton`, true);
        
        
        // ---------------------------------------------
        //   Fetch
        // ---------------------------------------------
        
        const resultObj = await fetchWrapper({
          urlApi: `${storeData.urlApi}/v1/card-players/find-one-by-id-for-edit-form`,
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
        //  Data 更新
        // ---------------------------------------------
        
        this.cardPlayerEditFormSourceDataObj = Object.assign({}, this.cardPlayerEditFormSourceDataObj, resultObj.data);
        
        this.cardPlayerEditFormDataObj = Object.assign({}, this.cardPlayerEditFormDataObj, resultObj.data);
        
        
        // ---------------------------------------------
        //   編集フォーム表示
        // ---------------------------------------------
        
        this.cardPlayerEditFormOpenObj[cardPlayers_id] = true;
        
        
        // console.log(`
        //   ----- resultObj -----\n
        //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        // console.log(`
        //   ----- this.cardPlayerEditFormDataObj -----\n
        //   ${util.inspect(this.cardPlayerEditFormDataObj, { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        // console.log(`
        //   ----- resultObj.data -----\n
        //   ${util.inspect(resultObj.data, { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
         
         
      }
      
      
    } catch (error) {
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisabledObj(`${cardPlayers_id}-editButton`, false);
      
      
    }
    
  };
  
  
  
  
  // ---------------------------------------------
  //   Edit Form
  // ---------------------------------------------
  
  /**
   * 名前を変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditName(event, _id) {
    this.cardPlayerEditFormDataObj[_id].name = event.target.value;
  };
  
  
  /**
   * ステータスを変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditStatus(event, _id) {
    this.cardPlayerEditFormDataObj[_id].status = event.target.value;
  };
  
  
  /**
   * コメントを変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditComment(event, _id) {
    this.cardPlayerEditFormDataObj[_id].comment = event.target.value;
  };
  
  
  
  
  /**
   * 誕生日を変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditBirthday(event, _id) {
    this.cardPlayerEditFormDataObj[_id].birthdayObj.value = event.target.value;
  };
  
  
  /**
   * 年齢（alternativeText）を変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditBirthdayAlternativeText(event, _id) {
    this.cardPlayerEditFormDataObj[_id].birthdayObj.alternativeText = event.target.value;
  };
  
  
  /**
   * 年齢の検索チェックボックスを変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditBirthdaySearch(event, _id) {
    this.cardPlayerEditFormDataObj[_id].birthdayObj.search = event.target.checked;
  };
  
  
  
  
  /**
   * 性別を変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditSex(event, _id) {
    this.cardPlayerEditFormDataObj[_id].sexObj.value = event.target.value;
  };
  
  
  /**
   * 性別（alternativeText）を変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditSexAlternativeText(event, _id) {
    this.cardPlayerEditFormDataObj[_id].sexObj.alternativeText = event.target.value;
  };
  
  
  /**
   * 性別の検索チェックボックスを変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditSexSearch(event, _id) {
    this.cardPlayerEditFormDataObj[_id].sexObj.search = event.target.checked;
  };
  
  
  
  
  /**
   * 住所（alternativeText）を変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditAddressAlternativeText(event, _id) {
    this.cardPlayerEditFormDataObj[_id].addressObj.alternativeText = event.target.value;
  };
  
  
  /**
   * 住所の検索チェックボックスを変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditAddressSearch(event, _id) {
    this.cardPlayerEditFormDataObj[_id].addressObj.search = event.target.checked;
  };
  
  
  
  
  /**
   * ゲーム歴（ゲームを始めた日）を変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditGamingExperience(event, _id) {
    this.cardPlayerEditFormDataObj[_id].gamingExperienceObj.value = event.target.value;
  };
  
  
  /**
   * ゲーム歴（alternativeText）を変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditGamingExperienceAlternativeText(event, _id) {
    this.cardPlayerEditFormDataObj[_id].gamingExperienceObj.alternativeText = event.target.value;
  };
  
  
  /**
   * ゲーム歴の検索チェックボックスを変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditGamingExperienceSearch(event, _id) {
    this.cardPlayerEditFormDataObj[_id].gamingExperienceObj.search = event.target.checked;
  };
  
  
  
  
  /**
   * 趣味の <TextField /> の数をカウントするオブジェクト
   * @type {Object}
   */
  @observable cardPlayerEditFormHobbyTextFieldCountObj = {};
  
  
  /**
   * 趣味の <TextField /> の数を増やす
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditFormHobbyTextFieldCountIncrement(_id) {
    
    if (_id in this.cardPlayerEditFormHobbyTextFieldCountObj) {
      this.cardPlayerEditFormHobbyTextFieldCountObj[_id] += 1;
    } else {
      this.cardPlayerEditFormHobbyTextFieldCountObj[_id] = this.cardPlayerEditFormDataObj[_id].hobbiesObj.valueArr.length + 1;
    }
    
  };
  
  
  /**
   * 趣味の <TextField /> の数を減らす
   * @param {string}  _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditFormHobbyTextFieldCountDecrement(_id, deleteKey) {
    
    if (_id in this.cardPlayerEditFormHobbyTextFieldCountObj) {
      this.cardPlayerEditFormHobbyTextFieldCountObj[_id] -= 1;
      this.cardPlayerEditFormDataObj[_id].hobbiesObj.valueArr.splice(deleteKey, 1);
    } else {
      this.cardPlayerEditFormHobbyTextFieldCountObj[_id] = this.cardPlayerEditFormDataObj[_id].hobbiesObj.valueArr.length - 1;
      this.cardPlayerEditFormDataObj[_id].hobbiesObj.valueArr.splice(deleteKey, 1);
    }
    
  };
  
  
  /**
   * 趣味の検索チェックボックスを変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditHobbySearch(event, _id) {
    this.cardPlayerEditFormDataObj[_id].hobbiesObj.search = event.target.checked;
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