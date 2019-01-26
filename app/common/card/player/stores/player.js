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
import keycode from 'keycode';


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
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditName(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].nameObj.value = eventObj.target.value;
  };
  
  
  /**
   * ステータスを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditStatus(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].statusObj.value = eventObj.target.value;
  };
  
  
  /**
   * コメントを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditComment(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].commentObj.value = eventObj.target.value;
  };
  
  
  
  
  /**
   * 年齢（誕生日）を変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditBirthday(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].birthdayObj.value = eventObj.target.value;
  };
  
  
  /**
   * 年齢（alternativeText）を変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditBirthdayAlternativeText(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].birthdayObj.alternativeText = eventObj.target.value;
  };
  
  
  /**
   * 年齢の検索チェックボックスを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditBirthdaySearch(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].birthdayObj.search = eventObj.target.checked;
  };
  
  
  
  
  /**
   * 性別を変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditSex(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].sexObj.value = eventObj.target.value;
  };
  
  
  /**
   * 性別（alternativeText）を変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditSexAlternativeText(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].sexObj.alternativeText = eventObj.target.value;
  };
  
  
  /**
   * 性別の検索チェックボックスを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditSexSearch(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].sexObj.search = eventObj.target.checked;
  };
  
  
  
  
  /**
   * 住所（alternativeText）を変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditAddressAlternativeText(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].addressObj.alternativeText = eventObj.target.value;
  };
  
  
  /**
   * 住所の検索チェックボックスを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditAddressSearch(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].addressObj.search = eventObj.target.checked;
  };
  
  
  
  
  /**
   * ゲーム歴（ゲームを始めた日）を変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditGamingExperience(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].gamingExperienceObj.value = eventObj.target.value;
  };
  
  
  /**
   * ゲーム歴（alternativeText）を変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditGamingExperienceAlternativeText(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].gamingExperienceObj.alternativeText = eventObj.target.value;
  };
  
  
  /**
   * ゲーム歴の検索チェックボックスを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditGamingExperienceSearch(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].gamingExperienceObj.search = eventObj.target.checked;
  };
  
  
  
  
  /**
   * 趣味の <TextField /> の数を増やす
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditFormHobbyTextFieldCountIncrement(_id) {
    this.cardPlayerEditFormDataObj[_id].hobbiesObj.valueArr.push('');
  };
  
  
  /**
   * 趣味の <TextField /> の数を減らす
   * @param {string}  _id - DB card-players _id / DB card-games _id
   * @param {string} index - 削除する配列のインデックス
   */
  @action.bound
  handleCardPlayerEditFormHobbyTextFieldCountDecrement(_id, index) {
    this.cardPlayerEditFormDataObj[_id].hobbiesObj.valueArr.splice(index, 1);
  };
  
  
  /**
   * 趣味を変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   * @param {string} index - 変更する配列のインデックス
   */
  @action.bound
  handleCardPlayerEditHobby(eventObj, _id, index) {
    this.cardPlayerEditFormDataObj[_id].hobbiesObj.valueArr[index] = eventObj.target.value;
  };
  
  
  /**
   * 趣味の検索チェックボックスを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditHobbySearch(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].hobbiesObj.search = eventObj.target.checked;
  };
  
  
  
  
  /**
   * 特技の <TextField /> の数を増やす
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditFormSpecialSkillTextFieldCountIncrement(_id) {
    this.cardPlayerEditFormDataObj[_id].specialSkillsObj.valueArr.push('');
  };
  
  
  /**
   * 特技の <TextField /> の数を減らす
   * @param {string}  _id - DB card-players _id / DB card-games _id
   * @param {string} index - 削除する配列のインデックス
   */
  @action.bound
  handleCardPlayerEditFormSpecialSkillTextFieldCountDecrement(_id, index) {
    this.cardPlayerEditFormDataObj[_id].specialSkillsObj.valueArr.splice(index, 1);
  };
  
  
  /**
   * 特技を変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   * @param {string} index - 変更する配列のインデックス
   */
  @action.bound
  handleCardPlayerEditSpecialSkill(eventObj, _id, index) {
    this.cardPlayerEditFormDataObj[_id].specialSkillsObj.valueArr[index] = eventObj.target.value;
  };
  
  
  /**
   * 特技の検索チェックボックスを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditSpecialSkillSearch(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].specialSkillsObj.search = eventObj.target.checked;
  };
  
  
  
  
  // ---------------------------------------------
  //   スマートフォン
  // ---------------------------------------------
  
  /**
   * スマートフォンのモデルを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditSmartphoneModel(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].smartphoneObj.model = eventObj.target.value;
  };
  
  
  /**
   * スマートフォンのコメントを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditSmartphoneComment(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].smartphoneObj.comment = eventObj.target.value;
  };
  
  
  /**
   * スマートフォンの検索チェックボックスを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditSmartphoneSearch(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].smartphoneObj.search = eventObj.target.checked;
  };
  
  
  
  
  // ---------------------------------------------
  //   タブレット
  // ---------------------------------------------
  
  /**
   * タブレットのモデルを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditTabletModel(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].tabletObj.model = eventObj.target.value;
  };
  
  
  /**
   * タブレットのコメントを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditTabletComment(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].tabletObj.comment = eventObj.target.value;
  };
  
  
  /**
   * タブレットの検索チェックボックスを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditTabletSearch(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].tabletObj.search = eventObj.target.checked;
  };
  
  
  
  
  // ---------------------------------------------
  //   PC
  // ---------------------------------------------
  
  /**
   * PCのモデルを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditPCModel(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].pcObj.model = eventObj.target.value;
  };
  
  
  /**
   * PCのコメントを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditPCComment(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].pcObj.comment = eventObj.target.value;
  };
  
  
  /**
   * PCスペックのOSを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditPCSpecOS(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].pcObj.specsObj.os = eventObj.target.value;
  };
  
  
  /**
   * PCスペックのCPUを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditPCSpecCPU(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].pcObj.specsObj.cpu = eventObj.target.value;
  };
  
  
  /**
   * PCスペックのCPUクーラーを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditPCSpecCPUCooler(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].pcObj.specsObj.cpuCooler = eventObj.target.value;
  };
  
  
  /**
   * PCスペックのマザーボードを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditPCSpecMotherboard(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].pcObj.specsObj.motherboard = eventObj.target.value;
  };
  
  
  /**
   * PCスペックのメモリーを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditPCSpecMemory(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].pcObj.specsObj.memory = eventObj.target.value;
  };
  
  
  /**
   * PCスペックのストレージを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditPCSpecStorage(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].pcObj.specsObj.storage = eventObj.target.value;
  };
  
  
  /**
   * PCスペックのグラフィックカードを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditPCSpecGraphicsCard(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].pcObj.specsObj.graphicsCard = eventObj.target.value;
  };
  
  
  /**
   * PCスペックの光学ドライブを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditPCSpecOpticalDrive(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].pcObj.specsObj.opticalDrive = eventObj.target.value;
  };
  
  
  /**
   * PCスペックの電源を変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditPCSpecPowerSupply(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].pcObj.specsObj.powerSupply = eventObj.target.value;
  };
  
  
  /**
   * PCスペックのケースを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditPCSpecPCCase(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].pcObj.specsObj.pcCase = eventObj.target.value;
  };
  
  
  /**
   * PCスペックのモニターを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditPCSpecMonitor(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].pcObj.specsObj.monitor = eventObj.target.value;
  };
  
  
  /**
   * PCスペックのマウスを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditPCSpecMouse(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].pcObj.specsObj.mouse = eventObj.target.value;
  };
  
  
  /**
   * PCスペックのキーボードを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditPCSpecKeyboard(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].pcObj.specsObj.keyboard = eventObj.target.value;
  };
  
  
  /**
   * PCの検索チェックボックスを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditPCSearch(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].pcObj.search = eventObj.target.checked;
  };
  
  
  
  
  // ---------------------------------------------
  //   所有ハードウェア
  // ---------------------------------------------
  
  /**
   * 所有ハードウェアを追加する
   * @param {string} _id - DB card-players _id
   * @param {string} hardwareID - DB hardwares hardwareID
   * @param {string} name - ハードウェア名
   */
  @action.bound
  handleCardPlayerAddHardwareActive(_id, hardwareID, name) {
    
    const index = this.cardPlayerEditFormDataObj[_id].hardwareActiveArr.findIndex((valueObj) => {
      return valueObj.hardwareID === hardwareID;
    });
    
    if (index === -1) {
      this.cardPlayerEditFormDataObj[_id].hardwareActiveArr.push({
        hardwareID,
        name
      });
    }
    
  };
  
  
  /**
   * 所有ハードウェアを削除する
   * @param {string} _id - DB card-players _id
   * @param {string} hardwareID - DB hardwares hardwareID
   */
  @action.bound
  handleCardPlayerDeleteHardwareActive(_id, hardwareID) {
    
    const index = this.cardPlayerEditFormDataObj[_id].hardwareActiveArr.findIndex((valueObj) => {
      return valueObj.hardwareID === hardwareID;
    });
    
    this.cardPlayerEditFormDataObj[_id].hardwareActiveArr.splice(index, 1);
    
  };
  
  
  /**
   * 所有ハードウェアのサジェストデータを入れるオブジェクト
   * @type {Object}
   */
  @observable cardPlayerFormHardwareActiveSuggestionObj = {};
  
  
  /**
   * 所有ハードウェアのサジェストの選択状態を保存するオブジェクト
   * @type {Object}
   */
  @observable cardPlayerFormHardwareActiveSuggestionSelectedObj = {};
  
  
  /**
  * 所有ハードウェアのサジェストのキーボード操作
  * ↓ ↑ で現在の選択状態を変更する
  * Enter で現在選択されているハードウェアを登録する
  * @param {Object} eventObj - イベント
  * @param {string} _id - DB card-players _id
  */
  @action.bound
  handleCardPlayerFormHardwareActiveSuggestionOnKeyDown(eventObj, _id) {
    
    
    // console.log(chalk`
    //   keycode(eventObj): {green ${keycode(eventObj)}}
    // `);
    
    const selectedIndex = _id in this.cardPlayerFormHardwareActiveSuggestionSelectedObj ? this.cardPlayerFormHardwareActiveSuggestionSelectedObj[_id] : null;
    
    const dataArr = _id in this.cardPlayerFormHardwareActiveSuggestionObj ? this.cardPlayerFormHardwareActiveSuggestionObj[_id] : [];
    
    
    
    if (keycode(eventObj) === 'down') {
      
      if (selectedIndex === null) {
        this.cardPlayerFormHardwareActiveSuggestionSelectedObj[_id] = 0;
      } else if (selectedIndex < dataArr.length - 1) {
        this.cardPlayerFormHardwareActiveSuggestionSelectedObj[_id] += 1;
      }
      
    } else if (keycode(eventObj) === 'up') {
      
      if (selectedIndex !== null && selectedIndex > 0) {
        this.cardPlayerFormHardwareActiveSuggestionSelectedObj[_id] -= 1;
      }
      
    } else if (keycode(eventObj) === 'enter' && selectedIndex !== null) {
      
      
      // console.log(chalk`
      //   selectedIndex: {green ${selectedIndex}}
      //   dataArr[selectedIndex].hardwareID: {green ${dataArr[selectedIndex].hardwareID}}
      //   dataArr[selectedIndex].name: {green ${dataArr[selectedIndex].name}}
      // `);
      
      
      this.handleCardPlayerAddHardwareActive(_id, dataArr[selectedIndex].hardwareID, dataArr[selectedIndex].name);
      
    }
    
  };
  
  
  /**
   * 所有ハードウェアの TextField の入力文字を入れるオブジェクト
   * @type {Object}
   */
  @observable cardPlayerEditFormHardwareActiveTextFieldObj = {};
  
  
  /**
   * 所有ハードウェアの TextField を変更する
   * 文字が入力されるたびに Fetch でサジェストデータを取得しにいく
   * @param {Object} eventObj - イベント
   * @param {string} cardPlayers_id - DB card-games _id
   */
  @action.bound
  async handleCardPlayerEditHardwareActiveTextField(eventObj, cardPlayers_id) {
    
    
    // ---------------------------------------------
    //   TextField の値変更
    // ---------------------------------------------
    
    this.cardPlayerEditFormHardwareActiveTextFieldObj[cardPlayers_id] = eventObj.target.value;
    
    
    // ---------------------------------------------
    //   TextField が空の場合、処理停止
    // ---------------------------------------------
    
    if (!eventObj.target.value) {
      return;
    }
    
    
    // ---------------------------------------------
    //   Fetch でサジェストデータを取得
    // ---------------------------------------------
    
    try {
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formData = new FormData();
      
      formData.append('keyword', eventObj.target.value);
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${storeData.urlApi}/v1/hardwares/find-by-search-keywords-arr-for-suggestion`,
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
      
      delete this.cardPlayerFormHardwareActiveSuggestionSelectedObj[cardPlayers_id];
      this.cardPlayerFormHardwareActiveSuggestionObj[cardPlayers_id] = resultObj.data;
      
      
      // console.log(`
      //   ----- resultObj.data -----\n
      //   ${util.inspect(resultObj.data, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
        
      
    } catch (error) {
      
    } finally {}
    
  };
  
  
  /**
   * 所有ハードウェアの TextField へのフォーカス状態を記録するオブジェクト
   * @type {Object}
   */
  @observable cardPlayerEditFormHardwareActiveTextFieldFocusObj = {};
  
  
  /**
   * 所有ハードウェアの TextField にフォーカス
   * @param {string} _id - DB card-players _id
   */
  @action.bound
  handleCardPlayerHardwareActiveTextFieldOnFocus(_id) {
    this.cardPlayerEditFormHardwareActiveTextFieldFocusObj[_id] = true;
  };
  
  
  /**
   * 所有ハードウェアの TextField からフォーカスアウト
   * @param {string} _id - DB card-players _id
   */
  @action.bound
  handleCardPlayerHardwareActiveTextFieldOnBlur(_id) {
    this.cardPlayerEditFormHardwareActiveTextFieldFocusObj[_id] = false;
  };
  
  
  /**
   * 所有ハードウェアの検索チェックボックスを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id
   */
  @action.bound
  handleCardPlayerEditHardwareActiveSearch(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].hardwareActiveObj.search = eventObj.target.checked;
  };
  
  
  
  
  // ---------------------------------------------
  //   昔、所有していたハードウェア
  // ---------------------------------------------
  
  /**
   * 昔、所有していたハードウェアを追加する
   * @param {string} _id - DB card-players _id
   * @param {string} hardwareID - DB hardwares hardwareID
   * @param {string} name - ハードウェア名
   */
  @action.bound
  handleCardPlayerAddHardwareInactive(_id, hardwareID, name) {
    
    const index = this.cardPlayerEditFormDataObj[_id].hardwareInactiveArr.findIndex((valueObj) => {
      return valueObj.hardwareID === hardwareID;
    });
    
    if (index === -1) {
      this.cardPlayerEditFormDataObj[_id].hardwareInactiveArr.push({
        hardwareID,
        name
      });
    }
    
  };
  
  
  /**
   * 昔、所有していたハードウェアを削除する
   * @param {string} _id - DB card-players _id
   * @param {string} hardwareID - DB hardwares hardwareID
   */
  @action.bound
  handleCardPlayerDeleteHardwareInactive(_id, hardwareID) {
    
    const index = this.cardPlayerEditFormDataObj[_id].hardwareInactiveArr.findIndex((valueObj) => {
      return valueObj.hardwareID === hardwareID;
    });
    
    this.cardPlayerEditFormDataObj[_id].hardwareInactiveArr.splice(index, 1);
    
  };
  
  
  /**
   * 昔、所有していたハードウェアのサジェストデータを入れるオブジェクト
   * @type {Object}
   */
  @observable cardPlayerFormHardwareInactiveSuggestionObj = {};
  
  
  /**
   * 昔、所有していたハードウェアのサジェストの選択状態を保存するオブジェクト
   * @type {Object}
   */
  @observable cardPlayerFormHardwareInactiveSuggestionSelectedObj = {};
  
  
  /**
  * 昔、所有していたハードウェアのサジェストのキーボード操作
  * ↓ ↑ で現在の選択状態を変更する
  * Enter で現在選択されているハードウェアを登録する
  * @param {string} _id - DB card-players _id
  */
  @action.bound
  handleCardPlayerFormHardwareInactiveSuggestionOnKeyDown(eventObj, _id) {
    
    
    // console.log(chalk`
    //   keycode(eventObj): {green ${keycode(eventObj)}}
    // `);
    
    const selectedIndex = _id in this.cardPlayerFormHardwareInactiveSuggestionSelectedObj ? this.cardPlayerFormHardwareInactiveSuggestionSelectedObj[_id] : null;
    
    const dataArr = _id in this.cardPlayerFormHardwareInactiveSuggestionObj ? this.cardPlayerFormHardwareInactiveSuggestionObj[_id] : [];
    
    
    
    if (keycode(eventObj) === 'down') {
      
      if (selectedIndex === null) {
        this.cardPlayerFormHardwareInactiveSuggestionSelectedObj[_id] = 0;
      } else if (selectedIndex < dataArr.length - 1) {
        this.cardPlayerFormHardwareInactiveSuggestionSelectedObj[_id] += 1;
      }
      
    } else if (keycode(eventObj) === 'up') {
      
      if (selectedIndex !== null && selectedIndex > 0) {
        this.cardPlayerFormHardwareInactiveSuggestionSelectedObj[_id] -= 1;
      }
      
    } else if (keycode(eventObj) === 'enter' && selectedIndex !== null) {
      
      
      // console.log(chalk`
      //   selectedIndex: {green ${selectedIndex}}
      //   dataArr[selectedIndex].hardwareID: {green ${dataArr[selectedIndex].hardwareID}}
      //   dataArr[selectedIndex].name: {green ${dataArr[selectedIndex].name}}
      // `);
      
      
      this.handleCardPlayerAddHardwareInactive(_id, dataArr[selectedIndex].hardwareID, dataArr[selectedIndex].name);
      
    }
    
  };
  
  
  /**
   * 昔、所有していたハードウェアの TextField の入力文字を入れるオブジェクト
   * @type {Object}
   */
  @observable cardPlayerEditFormHardwareInactiveTextFieldObj = {};
  
  
  /**
   * 昔、所有していたハードウェアの TextField を変更する
   * 文字が入力されるたびに Fetch でサジェストデータを取得しにいく
   * @param {Object} eventObj - イベント
   * @param {string} cardPlayers_id - DB card-players _id
   */
  @action.bound
  async handleCardPlayerEditHardwareInactiveTextField(eventObj, cardPlayers_id) {
    
    
    // ---------------------------------------------
    //   TextField の値変更
    // ---------------------------------------------
    
    this.cardPlayerEditFormHardwareInactiveTextFieldObj[cardPlayers_id] = eventObj.target.value;
    
    
    // ---------------------------------------------
    //   TextField が空の場合、処理停止
    // ---------------------------------------------
    
    if (!eventObj.target.value) {
      return;
    }
    
    
    // ---------------------------------------------
    //   Fetch でサジェストデータを取得
    // ---------------------------------------------
    
    try {
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formData = new FormData();
      
      formData.append('keyword', eventObj.target.value);
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${storeData.urlApi}/v1/hardwares/find-by-search-keywords-arr-for-suggestion`,
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
      
      delete this.cardPlayerFormHardwareInactiveSuggestionSelectedObj[cardPlayers_id];
      this.cardPlayerFormHardwareInactiveSuggestionObj[cardPlayers_id] = resultObj.data;
      
      
      // console.log(`
      //   ----- resultObj.data -----\n
      //   ${util.inspect(resultObj.data, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
        
      
    } catch (error) {
      
    } finally {}
    
  };
  
  
  /**
   * 昔、所有していたハードウェアの TextField へのフォーカス状態を記録するオブジェクト
   * @type {Object}
   */
  @observable cardPlayerEditFormHardwareInactiveTextFieldFocusObj = {};
  
  
  /**
   * 昔、所有していたハードウェアの TextField にフォーカス
   * @param {string} _id - DB card-players _id
   */
  @action.bound
  handleCardPlayerHardwareInactiveTextFieldOnFocus(_id) {
    this.cardPlayerEditFormHardwareInactiveTextFieldFocusObj[_id] = true;
  };
  
  
  /**
   * 昔、所有していたハードウェアの TextField からフォーカスアウト
   * @param {string} _id - DB card-players _id
   */
  @action.bound
  handleCardPlayerHardwareInactiveTextFieldOnBlur(_id) {
    this.cardPlayerEditFormHardwareInactiveTextFieldFocusObj[_id] = false;
  };
  
  
  /**
   * 昔、所有していたハードウェアの検索チェックボックスを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id
   */
  @action.bound
  handleCardPlayerEditHardwareInactiveSearch(eventObj, _id) {
    this.cardPlayerEditFormDataObj[_id].hardwareInactiveObj.search = eventObj.target.checked;
  };
  
  
  
  
  // ---------------------------------------------
  //   ID
  // ---------------------------------------------
  
  /**
   * IDを変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   * @param {Array} idArr - IDデータの入った配列
   */
  @action.bound
  handleCardPlayerEditID({ _id, idArr }) {
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    // `);
    
    // console.log(`
    //   ----- idArr -----\n
    //   ${util.inspect(idArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    const copiedArr = JSON.parse(JSON.stringify(idArr));
    this.cardPlayerEditFormDataObj[_id].idArr = copiedArr;
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