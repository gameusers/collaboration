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
import keycode from 'keycode';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';
import lodashCloneDeep from 'lodash/cloneDeep';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../../../@modules/fetch';
import { CustomError } from '../../../../@modules/error/custom';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationCardPlayersName } = require('../../../../@database/card-players/validations/name');
const { validationCardPlayersStatus } = require('../../../../@database/card-players/validations/status');
const { validationCardPlayersActivityTimeObjValueArr } = require('../../../../@database/card-players/validations/activity-time');
const { validationCardPlayersLinkArr } = require('../../../../@database/card-players/validations/link');


// --------------------------------------------------
//   Stores
// --------------------------------------------------

import initStoreLayout from '../../../../common/layout/stores/layout';
import initStoreData from '../../../../@stores/data';




// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeCardPlayer = null;
let storeLayout = initStoreLayout({});
let storeData = initStoreData({});




// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   プレイヤーカードを表示する Dialog
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
   * PLAYER / GAME ボタンを押すとプレイヤーカードが表示される
   * @param {string} cardPlayers_id - DB card-players _id
   */
  @action.bound
  async handleCardPlayerDialogOpen({ cardPlayers_id }) {
    
    
    // console.log(chalk`
    //   cardPlayers_id: {green ${cardPlayers_id}}
    // `);
    
    
    try {
      
      
      if (cardPlayers_id) {
        
        
        // ---------------------------------------------
        //   すでにデータが存在する場合
        // ---------------------------------------------
        
        if (lodashHas(storeData, ['cardPlayersObj', cardPlayers_id, 'comment'])) {
          
          this.cardPlayerDialogObj.type = 'player';
          this.cardPlayerDialogObj._id = cardPlayers_id;
          this.cardPlayerDialog = true;
          
          
        // ---------------------------------------------
        //   データを取得する
        // ---------------------------------------------
          
        } else {
           
          
          // ---------------------------------------------
          //   Loading 表示
          // ---------------------------------------------
          
          storeLayout.handleLoadingShow({});
          
          
          // ---------------------------------------------
          //   Button Disable
          // ---------------------------------------------
          
          storeLayout.handleButtonDisable({ _id: `${cardPlayers_id}-card-player` });
          
          
          
          
          // ---------------------------------------------
          //   FormData
          // ---------------------------------------------
          
          const formDataObj = { cardPlayers_id };
          
          
          // ---------------------------------------------
          //   Fetch
          // ---------------------------------------------
          
          const resultObj = await fetchWrapper({
            urlApi: `${process.env.URL_API}/v2/db/card-players/find-player`,
            methodType: 'POST',
            formData: JSON.stringify(formDataObj)
          });
          
          
          
          
          // ---------------------------------------------
          //   Error
          // ---------------------------------------------
          
          if ('errorsArr' in resultObj) {
            throw new CustomError({ errorsArr: resultObj.errorsArr });
          }
          
          
          
          
          // ---------------------------------------------
          //   Data 更新 - usersObj
          // ---------------------------------------------
          
          // const usersObj = {};
          // usersObj[resultObj.data[cardPlayers_id].users_id] = resultObj.data[cardPlayers_id].usersObj;
          // storeData.updateUsersObj(usersObj);
          
          
          // ---------------------------------------------
          //  Data 更新 - cardPlayersObj
          // ---------------------------------------------
          
          storeData.updateCardPlayersObj(resultObj.data);
          
          
          // ---------------------------------------------
          //   カード表示
          // ---------------------------------------------
          
          this.cardPlayerDialogObj.type = 'player';
          this.cardPlayerDialogObj._id = cardPlayers_id;
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
      
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      if (cardPlayers_id) {
        
        storeLayout.handleButtonEnable({ _id: `${cardPlayers_id}-card-player` });
        
      }
      
      
      // ---------------------------------------------
      //   Loading 非表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingHide({});
      
      
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
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ _id: `${users_id}-follow` });
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v1/users/follow`,
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
        throw new CustomError({ errorsArr: resultObj.errorsArr });
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
      
      storeLayout.handleButtonEnable({ _id: `${users_id}-follow` });
      
      
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
  //   Form - Data
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
   * フォーム用のデータを変更する
   * @param {Array} pathArr - パス
   * @param {string} value - 値
   */
  @action.bound
  handleCardPlayerEditFormData({ pathArr, value }) {
    lodashSet(this.cardPlayerEditFormDataObj, pathArr, value);
  };
  
  
  
  
  // ---------------------------------------------
  //   Form - Undo Data
  // ---------------------------------------------
  
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
  //   Form - Open
  // ---------------------------------------------
  
  /**
   * 編集フォームを表示するかどうかを決める真偽値を入れるオブジェクト
   * @type {Object}
   */
  @observable formOpenObj = {};
  
  
  /**
   * 編集フォームを閉じる
   * @param {string} _id - ID
   */
  @action.bound
  handleFormClose({ _id }) {
    this.formOpenObj[_id] = false;
  };
  
  
  /**
   * 編集フォームを開く
   * @param {string} _id - ID
   */
  @action.bound
  async handleFormOpen({ _id }) {
    // console.log(chalk`
    //   _id: {green ${_id}}
    // `);
    
    try {
      
      
      // ---------------------------------------------
      //   編集フォームに表示するデータがすでに読み込まれている場合
      //   編集フォームをすぐに表示する
      // ---------------------------------------------
      
      if (_id in this.cardPlayerEditFormDataObj) {
        
        this.formOpenObj[_id] = true;
        // console.log(chalk`
        //   2 this.formOpenObj[_id]: {green ${this.formOpenObj[_id]}}
        // `);
      
      
      // ---------------------------------------------
      //   編集フォームに表示するデータがまだ読み込まれていない場合
      //   Fetch でデータを取得してから編集フォームを表示する
      // ---------------------------------------------
      
      } else {
        
        // console.log('fetchWrapper');
         
        
        // ---------------------------------------------
        //   FormData
        // ---------------------------------------------
        
        const formData = new FormData();
        
        formData.append('_id', _id);
        
        
        // ---------------------------------------------
        //   Button Disable
        // ---------------------------------------------
        
        storeLayout.handleButtonDisable({ _id: `${_id}-editButton` });
        
        
        // ---------------------------------------------
        //   Fetch
        // ---------------------------------------------
        
        const resultObj = await fetchWrapper({
          urlApi: `${process.env.URL_API}/v1/card-players/find-one-by-id-for-edit-form`,
          methodType: 'POST',
          formData: formData
        });
        
        
        // ---------------------------------------------
        //   Error
        // ---------------------------------------------
        
        if ('errorsArr' in resultObj) {
          throw new CustomError({ errorsArr: resultObj.errorsArr });
        }
        
        
        // ---------------------------------------------
        //   Data 更新
        // ---------------------------------------------
        
        this.cardPlayerEditFormSourceDataObj = Object.assign({}, this.cardPlayerEditFormSourceDataObj, resultObj.data);
        this.cardPlayerEditFormDataObj = Object.assign({}, this.cardPlayerEditFormDataObj, resultObj.data);
        
        
        // ---------------------------------------------
        //   編集フォーム表示
        // ---------------------------------------------
        
        this.formOpenObj[_id] = true;
        // console.log(chalk`
        //   1 this.formOpenObj[_id]: {green ${this.formOpenObj[_id]}}
        // `);
        
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
      
      storeLayout.handleButtonEnable({ _id: `${_id}-editButton` });
      
      
    }
    
  };
  
  
  
  
  // ---------------------------------------------
  //   Form
  // ---------------------------------------------
  
  // ---------------------------------------------
  //   画像とビデオ
  // ---------------------------------------------
  
  /**
   * サムネイル画像を変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   * @param {string} value - 値
   */
  @action.bound
  handleImagesAndVideosObjThumbnailArr({ _id, value }) {
    
    let temp_id = _id;
    temp_id = temp_id.replace('-thumbnail', '');
    
    lodashSet(this.cardPlayerEditFormDataObj, [temp_id, 'imagesAndVideosObj', 'thumbnailArr'], value);
    
  };
  
  
  /**
   * メイン画像を変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   * @param {string} value - 値
   */
  @action.bound
  handleImagesAndVideosObjMainArr({ _id, value }) {
    
    let temp_id = _id;
    temp_id = temp_id.replace('-main', '');
    
    lodashSet(this.cardPlayerEditFormDataObj, [temp_id, 'imagesAndVideosObj', 'mainArr'], value);
    
  };
  
  
  
  
  // ---------------------------------------------
  //   年齢
  // ---------------------------------------------
  
  /**
   * 年齢（誕生日）を変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   * @param {string} value - 値
   */
  @action.bound
  handleCardPlayerEditAge({ _id, value }) {
    
    this.cardPlayerEditFormDataObj[_id].ageObj.value = value;
    
    // 年齢（固定値）をクリア
    this.cardPlayerEditFormDataObj[_id].ageObj.alternativeText = '';
    
  };
  
  
  /**
   * 年齢（alternativeText）を変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   * @param {string} value - 値
   */
  @action.bound
  handleCardPlayerEditAgeAlternativeText({ _id, value }) {
    
    this.cardPlayerEditFormDataObj[_id].ageObj.alternativeText = value;
    
    // 誕生日をクリア
    this.cardPlayerEditFormDataObj[_id].ageObj.value = '';
    
  };
  
  
  
  
  // ---------------------------------------------
  //   性別
  // ---------------------------------------------
  
  /**
   * 性別を変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   * @param {string} value - 値
   */
  @action.bound
  handleCardPlayerEditSex({ _id, value }) {
    
    this.cardPlayerEditFormDataObj[_id].sexObj.value = value;
    
    // 性別（その他）をクリア
    this.cardPlayerEditFormDataObj[_id].sexObj.alternativeText = '';
    
  };
  
  
  /**
   * 性別（その他）を変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   * @param {string} value - 値
   */
  @action.bound
  handleCardPlayerEditSexAlternativeText({ _id, value }) {
    
    this.cardPlayerEditFormDataObj[_id].sexObj.alternativeText = value;
    
    // 性別をクリア
    this.cardPlayerEditFormDataObj[_id].sexObj.value = '';
    
  };
  
  
  
  
  // ---------------------------------------------
  //   ゲーム歴
  // ---------------------------------------------
  
  /**
   * ゲーム歴（ゲームを始めた日）を変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   * @param {string} value - 値
   */
  @action.bound
  handleCardPlayerEditGamingExperience({ _id, value }) {
    
    this.cardPlayerEditFormDataObj[_id].gamingExperienceObj.value = value;
    
    // ゲーム歴（固定値）をクリア
    this.cardPlayerEditFormDataObj[_id].gamingExperienceObj.alternativeText = '';
    
  };
  
  
  /**
   * ゲーム歴（固定値）を変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   * @param {string} value - 値
   */
  @action.bound
  handleCardPlayerEditGamingExperienceAlternativeText({ _id, value }) {
    
    this.cardPlayerEditFormDataObj[_id].gamingExperienceObj.alternativeText = value;
    
    // ゲーム歴をクリア
    this.cardPlayerEditFormDataObj[_id].gamingExperienceObj.value = '';
    
  };
  
  
  
  
  // ---------------------------------------------
  //   趣味
  // ---------------------------------------------
  
  /**
   * 趣味の <TextField /> の数を増やす
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerAddHobbyForm({ _id }) {
    this.cardPlayerEditFormDataObj[_id].hobbiesObj.valueArr.push('');
  };
  
  
  /**
   * 趣味の <TextField /> の数を減らす
   * @param {string}  _id - DB card-players _id / DB card-games _id
   * @param {string} index - 削除する配列のインデックス
   */
  @action.bound
  handleCardPlayerRemoveHobbyForm({ _id, index }) {
    this.cardPlayerEditFormDataObj[_id].hobbiesObj.valueArr.splice(index, 1);
  };
  
  
  
  
  // ---------------------------------------------
  //   特技
  // ---------------------------------------------
  
  /**
   * 特技の <TextField /> の数を増やす
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerAddSpecialSkillForm({ _id }) {
    this.cardPlayerEditFormDataObj[_id].specialSkillsObj.valueArr.push('');
  };
  
  
  /**
   * 特技の <TextField /> の数を減らす
   * @param {string}  _id - DB card-players _id / DB card-games _id
   * @param {string} index - 削除する配列のインデックス
   */
  @action.bound
  handleCardPlayerRemoveSpecialSkillForm({ _id, index }) {
    this.cardPlayerEditFormDataObj[_id].specialSkillsObj.valueArr.splice(index, 1);
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
  handleCardPlayerAddHardwareActive({ _id, hardwareID, name }) {
    
    // 存在しているかチェックする
    const index = this.cardPlayerEditFormDataObj[_id].hardwareActiveArr.findIndex((valueObj) => {
      return valueObj.hardwareID === hardwareID;
    });
    
    // 存在していない場合は配列に追加
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
  handleCardPlayerDeleteHardwareActive({ _id, hardwareID }) {
    
    // indexを取得する
    const index = this.cardPlayerEditFormDataObj[_id].hardwareActiveArr.findIndex((valueObj) => {
      return valueObj.hardwareID === hardwareID;
    });
    
    // 配列からindexを指定して削除
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
  handleCardPlayerFormHardwareActiveSuggestionOnKeyDown({ eventObj, _id }) {
    
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
      
      this.handleCardPlayerAddHardwareActive({
        _id,
        hardwareID: dataArr[selectedIndex].hardwareID,
        name: dataArr[selectedIndex].name
      });
      
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
   * @param {string} _id - ID
   * @param {string} value - 値
   */
  @action.bound
  async handleCardPlayerEditHardwareActiveTextField({ _id, value }) {
    
    
    // ---------------------------------------------
    //   TextField の値変更
    // ---------------------------------------------
    
    this.cardPlayerEditFormHardwareActiveTextFieldObj[_id] = value;
    
    
    // ---------------------------------------------
    //   TextField が空の場合、処理停止
    // ---------------------------------------------
    
    if (!value) {
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
      
      formData.append('keyword', value);
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v1/hardwares/find-by-search-keywords-arr-for-suggestion`,
        methodType: 'POST',
        formData: formData
      });
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      // ---------------------------------------------
      //  Data 更新
      // ---------------------------------------------
      
      delete this.cardPlayerFormHardwareActiveSuggestionSelectedObj[_id];
      this.cardPlayerFormHardwareActiveSuggestionObj[_id] = resultObj.data;
        
      
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
  handleCardPlayerHardwareActiveTextFieldOnFocus({ _id }) {
    this.cardPlayerEditFormHardwareActiveTextFieldFocusObj[_id] = true;
  };
  
  
  /**
   * 所有ハードウェアの TextField からフォーカスアウト
   * @param {string} _id - DB card-players _id
   */
  @action.bound
  handleCardPlayerHardwareActiveTextFieldOnBlur({ _id }) {
    this.cardPlayerEditFormHardwareActiveTextFieldFocusObj[_id] = false;
  };
  
  
  /**
   * 所有ハードウェアの検索チェックボックスを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id
   */
  @action.bound
  handleCardPlayerEditHardwareActiveSearch({ _id, value }) {
    this.cardPlayerEditFormDataObj[_id].hardwareActiveObj.search = value;
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
  handleCardPlayerAddHardwareInactive({ _id, hardwareID, name }) {
    
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
  handleCardPlayerDeleteHardwareInactive({ _id, hardwareID }) {
    
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
  handleCardPlayerFormHardwareInactiveSuggestionOnKeyDown({ eventObj, _id }) {
    
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
   * @param {string} _id - DB card-players _id
   * @param {string} value - 値
   */
  @action.bound
  async handleCardPlayerEditHardwareInactiveTextField({ _id, value }) {
    
    
    // ---------------------------------------------
    //   TextField の値変更
    // ---------------------------------------------
    
    this.cardPlayerEditFormHardwareInactiveTextFieldObj[_id] = value;
    
    
    // ---------------------------------------------
    //   TextField が空の場合、処理停止
    // ---------------------------------------------
    
    if (!value) {
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
      
      formData.append('keyword', value);
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v1/hardwares/find-by-search-keywords-arr-for-suggestion`,
        methodType: 'POST',
        formData: formData
      });
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      // ---------------------------------------------
      //  Data 更新
      // ---------------------------------------------
      
      delete this.cardPlayerFormHardwareInactiveSuggestionSelectedObj[_id];
      this.cardPlayerFormHardwareInactiveSuggestionObj[_id] = resultObj.data;
        
      
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
  handleCardPlayerHardwareInactiveTextFieldOnFocus({ _id }) {
    this.cardPlayerEditFormHardwareInactiveTextFieldFocusObj[_id] = true;
  };
  
  
  /**
   * 昔、所有していたハードウェアの TextField からフォーカスアウト
   * @param {string} _id - DB card-players _id
   */
  @action.bound
  handleCardPlayerHardwareInactiveTextFieldOnBlur({ _id }) {
    this.cardPlayerEditFormHardwareInactiveTextFieldFocusObj[_id] = false;
  };
  
  
  /**
   * 昔、所有していたハードウェアの検索チェックボックスを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id
   */
  @action.bound
  handleCardPlayerEditHardwareInactiveSearch({ _id, value }) {
    this.cardPlayerEditFormDataObj[_id].hardwareInactiveObj.search = value;
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
    const cloneArr = lodashCloneDeep(idArr);
    this.cardPlayerEditFormDataObj[_id].idArr = cloneArr;
  };
  
  
  
  
  // ---------------------------------------------
  //   活動時間
  // ---------------------------------------------
  
  /**
   * 活動時間の曜日を変更する
   * @param {string} _id - DB card-players _id / DB card-games _id
   * @param {number} index - 変更する配列のインデックス
   * @param {string} value - 値
   */
  @action.bound
  handleCardPlayerEditActivityTimeWeekArr({ _id, index, value }) {
    
    let weekArr = 'weekArr' in this.cardPlayerEditFormDataObj[_id].activityTimeObj.valueArr[index] ? this.cardPlayerEditFormDataObj[_id].activityTimeObj.valueArr[index].weekArr : [];
    
    // 配列に存在しない場合は追加、存在する場合は削除
    if (weekArr.indexOf(value) === -1) {
      weekArr.push(value);
    } else {
      const newArr = weekArr.filter(number => number !== value);
      weekArr = newArr;
    }
    
    // 数字の昇順に並び替え
    const sortedArr = weekArr.slice().sort((a, b) => {
      return a - b;
    });
    
    this.cardPlayerEditFormDataObj[_id].activityTimeObj.valueArr[index].weekArr = sortedArr;
    
  };
  
  
  /**
   * 活動時間のフォームを追加する
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditActivityTimeAddForm({ _id }) {
    if (this.cardPlayerEditFormDataObj[_id].activityTimeObj.valueArr.length < 7) {
      this.cardPlayerEditFormDataObj[_id].activityTimeObj.valueArr.push({});
    }
  };
  
  
  /**
   * 活動時間のフォームを削除する
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  handleCardPlayerEditActivityTimeRemoveForm({ _id }) {
    if (this.cardPlayerEditFormDataObj[_id].activityTimeObj.valueArr.length > 0) {
      this.cardPlayerEditFormDataObj[_id].activityTimeObj.valueArr.pop();
    }
  };
  
  
  
  
  // ---------------------------------------------
  //   Link
  // ---------------------------------------------
  
  /**
   * リンクの入力フォームを追加する
   * @param {string} _id - DB card-players _id / DB card-games _id
   * @param {number} index - 配列の変更するインデックス
   */
  @action.bound
  handleCardPlayerAddLinkForm({ _id, index }) {
    
    if (this.cardPlayerEditFormDataObj[_id].linkArr.length < 20) {
      this.cardPlayerEditFormDataObj[_id].linkArr.push({});
    }
    
  };
  
  
  /**
   * リンクの入力フォームを削除する
   * @param {string} _id - DB card-players _id / DB card-games _id
   * @param {number} index - 配列の変更するインデックス
   */
  @action.bound
  handleCardPlayerRemoveLinkForm({ _id, index }) {
    
    if (index === 999) {
      this.cardPlayerEditFormDataObj[_id].linkArr.pop();
    } else {
      this.cardPlayerEditFormDataObj[_id].linkArr.splice(index, 1);
    }
    
  };
  
  
  
  
  // ---------------------------------------------
  //   Submit
  // ---------------------------------------------
  
  /**
   * 保存ボタンを押すと呼び出される
   * フォームを送信する
   * @param {string} _id - DB card-players _id / DB card-games _id
   */
  @action.bound
  async handleEditFormSubmit({ _id }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Loading 表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingShow({});
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ _id: `${_id}-form` });
      
      
      // ---------------------------------------------
      //   Validation
      // ---------------------------------------------
      
      if (
        
        // ハンドルネーム
        validationCardPlayersName({ value: this.cardPlayerEditFormDataObj[_id].nameObj.value }).error ||
        
        // ステータス
        validationCardPlayersStatus({ value: this.cardPlayerEditFormDataObj[_id].statusObj.value }).error ||
        
        // 活動時間
        validationCardPlayersActivityTimeObjValueArr({ valueArr: this.cardPlayerEditFormDataObj[_id].activityTimeObj.valueArr }).error ||
        
        // リンク
        validationCardPlayersLinkArr({ valueArr: this.cardPlayerEditFormDataObj[_id].linkArr }).error
        
      ) {
        throw new Error();
      }
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formData = new FormData();
      
      formData.append('obj', JSON.stringify(this.cardPlayerEditFormDataObj[_id]));
      // console.log(`\n---------- this.cardPlayerEditFormDataObj[_id] ----------\n`);
      // console.dir(JSON.parse(JSON.stringify(this.cardPlayerEditFormDataObj[_id])));
      // console.log(`\n-----------------------------------\n`);
      // return;
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v1/card-players/update`,
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
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      // ---------------------------------------------
      //   Data 更新
      // ---------------------------------------------
      
      // フォーム情報更新
      this.cardPlayerEditFormSourceDataObj = Object.assign({}, this.cardPlayerEditFormSourceDataObj, resultObj.data.cardPlayersForEditFormObj);
      this.cardPlayerEditFormDataObj = Object.assign({}, this.cardPlayerEditFormDataObj, resultObj.data.cardPlayersForEditFormObj);
      
      // Store Data カード情報更新
      storeData.updateCardPlayersObj(resultObj.data.cardPlayersObj);
      
      
      // ---------------------------------------------
      //   編集フォームを閉じる
      // ---------------------------------------------
      
      this.handleFormClose({ _id });
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen('success', '保存しました');
      
      
    } catch (error) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen('error', `フォームの入力内容を見直してください`);
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonEnable({ _id: `${_id}-form`});
      
      
      // ---------------------------------------------
      //   Loading 非表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingHide({});
      
      
    }
    
    
  };
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreCardPlayer({ propsObj }) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeCardPlayer === null) {
    storeCardPlayer = new Store();
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeCardPlayer;
  
  
}