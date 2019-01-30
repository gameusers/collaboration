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

import { fetchWrapper } from '../../../@modules/fetch';


// ---------------------------------------------
//   Format
// ---------------------------------------------

import { errorsArrIntoErrorMessage } from '../../../@format/error';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const validationID = require('../../../@database/ids/validations/id');




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
   * ダイアログを表示するかどうかを決める変数を入れるオブジェクト
   * @type {Object}
   */
  @observable idFormDialogObj = {};
  
  
  /**
   * ダイアログを閉じる
   * @param {string} _id - ID
   */
  @action.bound
  handleIDFormDialogClose({ _id }) {
    this.idFormDialogObj[_id] = false;
  };
  
  
  /**
   * ダイアログを開く
   * @param {string} _id - ID
   * @param {Array} selectedArr - 選択されているIDが入っている配列
   */
  @action.bound
  async handleIDFormDialogOpen({ _id, selectedArr }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   編集フォームに表示するデータがすでに読み込まれている場合
      //   編集フォームをすぐに表示する
      // ---------------------------------------------
      
      if (_id in this.idFormDataObj) {
        
        this.idFormDialogObj[_id] = true;
        
        
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
        
        
        // ---------------------------------------------
        //   Button Disabled
        // ---------------------------------------------
        
        storeLayout.handleButtonDisabledObj(`${_id}-idForm`, true);
        
        
        // ---------------------------------------------
        //   Fetch
        // ---------------------------------------------
        
        const resultObj = await fetchWrapper({
          urlApi: `${storeData.urlApi}/v1/ids/find-by-users-id-for-form`,
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
        
        const idFormDataArr = resultObj.data;
        const idFormDataSelectedArr = [];
        const idFormDataUnselectedArr = [];
        
        // 選択ID
        for (let valueObj of selectedArr.values()) {
          
          const index = idFormDataArr.findIndex((value2Obj) => {
            return value2Obj._id === valueObj._id;
          });
          
          if (index !== -1) {
            idFormDataSelectedArr.push(valueObj);
          }
          
        }
        
        // 未選択ID
        for (let valueObj of idFormDataArr.values()) {
          
          const index = selectedArr.findIndex((value2Obj) => {
            return value2Obj._id === valueObj._id;
          });
          
          if (index === -1) {
            idFormDataUnselectedArr.push(valueObj);
          }
          
        }
        
        this.idFormDataSelectedObj[_id] = idFormDataSelectedArr;
        this.idFormDataUnselectedObj[_id] = idFormDataUnselectedArr;
        this.idFormDataObj[_id] = resultObj.data;
        
        
        // ---------------------------------------------
        //   編集フォーム表示
        // ---------------------------------------------
        
        this.idFormDialogObj[_id] = true;
        
        
        // console.log(`
        //   ----- resultObj -----\n
        //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
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
      
      storeLayout.handleButtonDisabledObj(`${_id}-idForm`, false);
      
      
    }
    
    
  };
  
  
  
  
  // ---------------------------------------------
  //   フォームのコンテンツを切り替える
  // ---------------------------------------------
  
  /**
   * 表示するフォームのコンテンツを決める変数を入れるオブジェクト
   * @type {Object}
   */
  @observable idFormContentsTypeObj = {};
  
  
  /**
   * フォームのコンテンツを切り替える
   * @param {string} _id - ID
   * @param {string} type - 表示するコンテンツ select / edit
   */
  @action.bound
  handleIDFormContentsType({ _id, type }) {
    this.idFormContentsTypeObj[_id] = type;
  };
  
  
  
  
  // ---------------------------------------------
  //   選択
  // ---------------------------------------------
  
  /**
   * フォームのデータを入れるオブジェクト
   * @type {Object}
   */
  @observable idFormDataObj = {};
  
  
  /**
   * フォームの選択データを入れるオブジェクト
   * @type {Object}
   */
  @observable idFormDataSelectedObj = {};
  
  
  /**
   * フォームの未選択データを入れるオブジェクト
   * @type {Object}
   */
  @observable idFormDataUnselectedObj = {};
  
  
  /**
   * 選択IDから未選択IDに移動する
   * @param {string} _id - ID
   * @param {number} index - 移動するIDの配列index
   */
  @action.bound
  handleIDFormMoveFromSelectedToUnselected({ _id, index }) {
    this.idFormDataUnselectedObj[_id].push(this.idFormDataSelectedObj[_id][index]);
    this.idFormDataSelectedObj[_id].splice(index, 1);
  };
  
  
  /**
   * 未選択IDから選択IDに移動する
   * @param {string} _id - ID
   * @param {number} index - 移動するIDの配列index
   */
  @action.bound
  handleIDFormMoveFromUnselectedToSelected({ _id, index }) {
    this.idFormDataSelectedObj[_id].push(this.idFormDataUnselectedObj[_id][index]);
    this.idFormDataUnselectedObj[_id].splice(index, 1);
  };
  
  
  /**
   * 選択を確定するボタンを押したときに実行される
   * @param {string} _id - ID
   * @param {Array} idArr - 選択されたIDの配列
   * @param {function} func - ボタンを押したときに実行する関数
   */
  @action.bound
  handleIDFormSelectButton({ _id, idArr, func }) {
    
    // 渡された関数を実行する
    func({ _id, idArr });
    
    // ダイアログを閉じる
    this.idFormDialogObj[_id] = false;
    
  };
  
  
  
  
  // ---------------------------------------------
  //   編集・登録
  // ---------------------------------------------
  
  /**
   * フォームの値を設定する（編集用）
   * 編集フォームの Chip をクリックしたときに発動
   * @param {Object} eventObj - イベント
   * @param {string} _id - ID
   */
  @action.bound
  handleIDFormSetEditForm({ _id, ids_id }) {
    
    const searchObj = this.idFormDataObj[_id].find((valueObj) => {
      return valueObj._id === ids_id;
    });
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   ids_id: {green ${ids_id}}
    // `);
    
    // console.log(`
    //   ----- this.idFormDataObj[_id] -----\n
    //   ${util.inspect(this.idFormDataObj[_id], { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- searchObj -----\n
    //   ${util.inspect(searchObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    this.handleIDFormGame({
      _id,
      games_id: searchObj.games_id,
      gameID: searchObj.gamesGameID,
      thumbnail: searchObj.gamesThumbnail,
      name: searchObj.gamesName
    });
    
    this.idForm_idObj[_id] = searchObj._id;
    this.idFormPlatformObj[_id] = searchObj.platform;
    this.idFormLabelObj[_id] = searchObj.label;
    this.idFormIDObj[_id] = searchObj.id;
    this.idFormPublicSettingObj[_id] = searchObj.publicSetting;
    this.idFormSearchObj[_id] = searchObj.search;
    
  };
  
  
  
  /**
   * _idの値を入れるオブジェクト
   * @type {Object}
   */
  @observable idForm_idObj = {};
  
  
  /**
   * プラットフォーム選択フォームの選択値を入れるオブジェクト
   * @type {Object}
   */
  @observable idFormPlatformObj = {};
  
  
  /**
   * プラットフォームを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - ID
   */
  @action.bound
  handleIDFormPlatform({ eventObj, _id }) {
    this.idFormPlatformObj[_id] = eventObj.target.value;
  };
  
  
  /**
   * ゲーム入力フォームの入力値を入れるオブジェクト
   * @type {Object}
   */
  @observable idFormGameObj = {};
  
  
  /**
   * ゲームを変更する
   * @param {string} _id - ID
   * @param {string} games_id - DB games games_id
   * @param {string} gameID - DB games gameID
   * @param {boolean} thumbnail - サムネイルが表示できるか
   * @param {string} name - ゲーム名
   */
  @action.bound
  handleIDFormGame({ _id, games_id, gameID, thumbnail, name }) {
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   games_id: {green ${games_id}}
    //   gameID: {green ${gameID}}
    //   thumbnail: {green ${thumbnail}}
    //   name: {green ${name}}
    // `);
    
    this.idFormGameObj[_id] = [{ games_id, gameID, thumbnail, name }];
  };
  
  
  /**
   * ゲームを削除する
   * @param {string} _id - ID
   */
  @action.bound
  handleIDFormGameDelete({ _id }) {
    this.idFormGameObj[_id] = [];
  };
  
  
  
  /**
   * ラベル入力フォームの入力値を入れるオブジェクト
   * @type {Object}
   */
  @observable idFormLabelObj = {};
  
  
  /**
   * ラベルを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - ID
   */
  @action.bound
  handleIDFormLabel({ eventObj, _id }) {
    this.idFormLabelObj[_id] = eventObj.target.value;
  };
  
  
  /**
   * ID入力フォームの入力値を入れるオブジェクト
   * @type {Object}
   */
  @observable idFormIDObj = {};
  
  
  /**
   * IDを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - ID
   */
  @action.bound
  handleIDFormID({ eventObj, _id }) {
    
    const validationObj = validationID({ id: eventObj.target.value });
    
    this.idFormIDObj[_id] = {
      value: eventObj.target.value,
      error: false,
      messageID: '',
      numberOfCharacters: validationObj.afterNumberOfCharacters,
    };
    
    if (validationObj.errorCodeArr.length > 0) {
      this.idFormIDObj[_id].error = true;
      this.idFormIDObj[_id].messageID = validationObj.errorCodeArr[0];
    }
    
    
    // console.log(`
    //   ----- validationObj -----\n
    //   ${util.inspect(validationObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // this.idFormIDObj[_id] = eventObj.target.value;
  };
  
  
  /**
   * 公開設定選択フォームの選択値を入れるオブジェクト
   * @type {Object}
   */
  @observable idFormPublicSettingObj = {};
  
  
  /**
   * 公開設定を変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - ID
   */
  @action.bound
  handleIDFormPublicSetting({ eventObj, _id }) {
    this.idFormPublicSettingObj[_id] = eventObj.target.value;
  };
  
  
  /**
   * 検索チェックボックスの値を入れるオブジェクト
   * @type {Object}
   */
  @observable idFormSearchObj = {};
  
  
  /**
   * 検索チェックボックスを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - DB card-players _id
   */
  @action.bound
  handleIDFormSearch({ eventObj, _id }) {
    this.idFormSearchObj[_id] = eventObj.target.checked;
  };
  
  
  
  
  
  /**
   * フォームを送信する
   * @param {string} _id - ID
   */
  @action.bound
  async handleIDFormSubmit({ _id }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formData = new FormData();
      
      const gameID = _id in this.idFormGameObj ? this.idFormGameObj[_id][0].gameID : '';
      
      // console.log(chalk`
      //   this.idForm_idObj[_id]: {green ${this.idForm_idObj[_id]}}
      //   gameID: {green ${gameID}}
      // `);
      
      // console.log(`
      //   ----- this.idFormGameObj[_id] -----\n
      //   ${util.inspect(this.idFormGameObj[_id], { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      formData.append('_id', this.idForm_idObj[_id]);
      formData.append('platform', this.idFormPlatformObj[_id]);
      formData.append('gameID', gameID);
      formData.append('label',  this.idFormLabelObj[_id]);
      formData.append('id', this.idFormIDObj[_id]);
      formData.append('publicSetting', this.idFormPublicSettingObj[_id]);
      formData.append('search', this.idFormSearchObj[_id]);
      
      
      // ---------------------------------------------
      //   Button Disabled
      // ---------------------------------------------
      
      storeLayout.handleButtonDisabledObj(`${_id}-idFormEditSubmit`, true);
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${storeData.urlApi}/v1/ids/upsert`,
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
      
      this.idFormDataObj[_id] = resultObj.data;
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen('success', '編集しました。');
      
      // if (type === 'follow') {
        
      // } else {
      //   storeLayout.handleSnackbarOpen('success', 'フォローを解除しました。');
      // }
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- this.idFormGameObj[_id] -----\n
      //   ${util.inspect(this.idFormGameObj[_id], { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- resultObj.data -----\n
      //   ${util.inspect(resultObj.data, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
        
      
      
    } catch (errorObj) {
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisabledObj(`${_id}-idFormEditSubmit`, false);
      
      
    }
    
    
  };
  
  
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreIDSelectForm(argumentsObj, storeInstanceObj) {
  
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