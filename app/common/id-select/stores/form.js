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

const validation_id = require('../../../@validations/_id');
const validationIDsPlatform = require('../../../@database/ids/validations/platform');
const validationIDsLabel = require('../../../@database/ids/validations/label');
const validationIDsID = require('../../../@database/ids/validations/id');
const validationIDsPublicSetting = require('../../../@database/ids/validations/public-setting');




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
   * @param {string} _id
   */
  @action.bound
  handleIDFormDialogClose({ _id }) {
    this.idFormDialogObj[_id] = false;
  };
  
  
  /**
   * ダイアログを開く
   * @param {string} _id
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
        //   Button Disable
        // ---------------------------------------------
        
        storeLayout.handleButtonDisabledObj(`${_id}-idForm`, true);
         
        
        
        
        // ---------------------------------------------
        //   FormData
        // ---------------------------------------------
        
        const formData = new FormData();
        
        
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
        //   Data 更新
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
            idFormDataSelectedArr.push(valueObj._id);
          }
          
        }
        
        // 未選択ID
        for (let valueObj of idFormDataArr.values()) {
          
          const index = selectedArr.findIndex((value2Obj) => {
            return value2Obj._id === valueObj._id;
          });
          
          if (index === -1) {
            idFormDataUnselectedArr.push(valueObj._id);
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
  //   選択 / 編集 / 登録の各フォーム
  // ---------------------------------------------
  
  /**
   * 表示するフォームのコンテンツを決める変数を入れるオブジェクト
   * @type {Object}
   */
  @observable idFormContentsTypeObj = {};
  
  
  /**
   * フォームのコンテンツを切り替える
   * @param {string} _id
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
   * @param {string} _id
   * @param {number} index - 移動するIDの配列index
   */
  @action.bound
  handleIDFormMoveFromSelectedToUnselected({ _id, index }) {
    this.idFormDataUnselectedObj[_id].push(this.idFormDataSelectedObj[_id][index]);
    this.idFormDataSelectedObj[_id].splice(index, 1);
  };
  
  
  /**
   * 未選択IDから選択IDに移動する
   * @param {string} _id
   * @param {number} index - 移動するIDの配列index
   */
  @action.bound
  handleIDFormMoveFromUnselectedToSelected({ _id, index }) {
    this.idFormDataSelectedObj[_id].push(this.idFormDataUnselectedObj[_id][index]);
    this.idFormDataUnselectedObj[_id].splice(index, 1);
  };
  
  
  /**
   * 選択を確定するボタンを押したときに実行される
   * @param {string} _id
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
   * 編集時に編集するIDを選択する（各フォームの値を設定する）
   * 編集フォームの ID (Chip) をクリックしたときに発動
   * @param {Object} eventObj - イベント
   * @param {string} _id
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
    
    // console.log(chalk`
    //   searchObj.platform: {green ${searchObj.platform}}
    //   searchObj.id: {green ${searchObj.id}}
    //   searchObj.search: {green ${searchObj.search}}
    // `);
    
    this.handleIDFormGame({
      _id,
      games_id: searchObj.games_id,
      gameID: searchObj.gamesGameID,
      thumbnail: searchObj.gamesThumbnail,
      name: searchObj.gamesName
    });
    
    this.handleIDForm_id({ _id, value: searchObj._id });
    this.handleIDFormPlatform({ _id, value: searchObj.platform });
    this.handleIDFormLabel({ _id, value: searchObj.label });
    this.handleIDFormID({ _id, value: searchObj.id });
    this.handleIDFormPublicSetting({ _id, value: searchObj.publicSetting });
    this.handleIDFormSearch({ _id, value: searchObj.search });
    
  };
  
  
  
  
  /**
   * _idの値を入れるオブジェクト
   * @type {Object}
   */
  @observable idForm_idObj = {};
  
  
  /**
   * _idを変更する
   * @param {string} _id
   * @param {string} value
   */
  @action.bound
  handleIDForm_id({ _id, value }) {
    
    const validationObj = validation_id({ required: true, _id: value });
    
    this.idForm_idObj[_id] = {
      value,
      error: false,
      messageID: '',
      numberOfCharacters: validationObj.numberOfCharacters,
    };
    
    if (validationObj.errorCodeArr.length > 0) {
      this.idForm_idObj[_id].error = true;
      this.idForm_idObj[_id].messageID = validationObj.errorCodeArr[0];
    }
    
  };
  
  
  
  
  /**
   * プラットフォーム選択フォームの選択値を入れるオブジェクト
   * @type {Object}
   */
  @observable idFormPlatformObj = {};
  
  
  /**
   * プラットフォームを変更する
   * @param {string} _id
   * @param {string} value
   */
  @action.bound
  handleIDFormPlatform({ _id, value }) {
    
    const validationObj = validationIDsPlatform({ required: true, platform: value });
    
    this.idFormPlatformObj[_id] = {
      value,
      error: false,
      messageID: '',
      numberOfCharacters: validationObj.numberOfCharacters,
    };
    
    if (validationObj.errorCodeArr.length > 0) {
      this.idFormPlatformObj[_id].error = true;
      this.idFormPlatformObj[_id].messageID = validationObj.errorCodeArr[0];
    }
    
  };
  
  
  
  
  /**
   * ゲーム入力フォームの入力値を入れるオブジェクト
   * @type {Object}
   */
  @observable idFormGameObj = {};
  
  
  /**
   * ゲームを変更する
   * @param {string} _id
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
   * @param {string} _id
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
   * @param {string} _id
   * @param {string} value
   */
  @action.bound
  handleIDFormLabel({ _id, value }) {
    
    const validationObj = validationIDsLabel({ required: false, label: value });
    
    this.idFormLabelObj[_id] = {
      value,
      error: false,
      messageID: '',
      numberOfCharacters: validationObj.numberOfCharacters,
    };
    
    if (validationObj.errorCodeArr.length > 0) {
      this.idFormLabelObj[_id].error = true;
      this.idFormLabelObj[_id].messageID = validationObj.errorCodeArr[0];
    }
    
  };
  
  
  
  
  /**
   * ID入力フォームの入力値を入れるオブジェクト
   * @type {Object}
   */
  @observable idFormIDObj = {};
  
  
  /**
   * IDを変更する
   * @param {string} _id
   * @param {string} value
   */
  @action.bound
  handleIDFormID({ _id, value }) {
    
    const validationObj = validationIDsID({ required: true, id: value });
    
    this.idFormIDObj[_id] = {
      value,
      error: false,
      messageID: '',
      numberOfCharacters: validationObj.numberOfCharacters,
    };
    
    if (validationObj.errorCodeArr.length > 0) {
      this.idFormIDObj[_id].error = true;
      this.idFormIDObj[_id].messageID = validationObj.errorCodeArr[0];
    }
    
  };
  
  
  
  
  /**
   * 公開設定選択フォームの選択値を入れるオブジェクト
   * @type {Object}
   */
  @observable idFormPublicSettingObj = {};
  
  
  /**
   * 公開設定を変更する
   * @param {string} _id
   * @param {string} value
   */
  @action.bound
  handleIDFormPublicSetting({ _id, value }) {
    
    const validationObj = validationIDsPublicSetting({ required: true, publicSetting: value });
    
    this.idFormPublicSettingObj[_id] = {
      value,
      error: false,
      messageID: '',
      numberOfCharacters: validationObj.numberOfCharacters,
    };
    
    if (validationObj.errorCodeArr.length > 0) {
      this.idFormPublicSettingObj[_id].error = true;
      this.idFormPublicSettingObj[_id].messageID = validationObj.errorCodeArr[0];
    }
    
  };
  
  
  
  
  /**
   * 検索チェックボックスの値を入れるオブジェクト
   * @type {Object}
   */
  @observable idFormSearchObj = {};
  
  
  /**
   * 検索チェックボックスを変更する
   * @param {string} _id
   * @param {string} value
   */
  @action.bound
  handleIDFormSearch({ _id, value }) {
    this.idFormSearchObj[_id] = value;
  };
  
  
  
  
  /**
   * 削除ダイアログを表示するかどうかを決めるオブジェクト
   * IDを削除する際に利用。ダイアログで削除していいか尋ねる
   * @type {Object}
   */
  @observable idFormDeleteDialogOpenObj = {};
  
  
  /**
   * 削除ダイアログを開く
   * @param {string} _id
   */
  @action.bound
  handleIDFormDeleteDialogOpen({ _id }) {
    
    
    // ---------------------------------------------
    //   削除するIDが選ばれていない場合、エラーを通知
    // ---------------------------------------------
    
    if (_id in this.idForm_idObj === false) {
      storeLayout.handleSnackbarOpen('error', '削除するIDを選んでください');
      return;
    }
      
    
    this.idFormDeleteDialogOpenObj[_id] = true;
    
  };
  
  
  /**
   * 削除ダイアログを閉じる
   * @param {string} _id
   */
  @action.bound
  handleIDFormDeleteDialogClose({ _id }) {
    this.idFormDeleteDialogOpenObj[_id] = false;
  };
  
  
  
  
  /**
   * 編集フォームを送信する
   * @param {string} _id
   */
  @action.bound
  async handleIDFormEditSubmit({ _id, func, selectedArr }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisabledObj(`${_id}-idFormEditSubmit`, true);
      
      
      
      
      // ---------------------------------------------
      //   編集するIDが選ばれていない場合、エラー
      // ---------------------------------------------
      
      if (_id in this.idForm_idObj === false) {
        throw new Error('編集するIDを選んでください');
      }
      
      
      
      
      // ---------------------------------------------
      //   フォームのデータを取得
      // ---------------------------------------------
      
      const form_id = _id in this.idForm_idObj ? this.idForm_idObj[_id].value : '';
      const formPlatform = _id in this.idFormPlatformObj ? this.idFormPlatformObj[_id].value : '';
      const formLabel = _id in this.idFormLabelObj ? this.idFormLabelObj[_id].value : '';
      const formID = _id in this.idFormIDObj ? this.idFormIDObj[_id].value : '';
      const formPublicSetting = _id in this.idFormPublicSettingObj ? this.idFormPublicSettingObj[_id].value : '';
      const formSearch = _id in this.idFormSearchObj ? this.idFormSearchObj[_id] : true;
      
      const formGameID = _id in this.idFormGameObj ? this.idFormGameObj[_id][0].gameID : '';
      // console.log(chalk`
      //   formGameID: {green ${formGameID}}
      // `);
      // return;
      
      // ---------------------------------------------
      //   フォームのバリデーション作動
      // ---------------------------------------------
      
      this.handleIDFormPlatform({ _id, value: formPlatform });
      this.handleIDFormLabel({ _id, value: formLabel });
      this.handleIDFormID({ _id, value: formID });
      this.handleIDFormPublicSetting({ _id, value: formPublicSetting });
      this.handleIDFormSearch({ _id, value: formSearch });
      
      
      // ---------------------------------------------
      //   フォームに必要な情報が入力されていない場合、エラー
      // ---------------------------------------------
      
      if (!formPlatform || !formID || !formPublicSetting) {
        throw new Error('フォームに必要な情報が入力されていません');
      }
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formData = new FormData();
      
      formData.append('_id', form_id);
      formData.append('platform', formPlatform);
      formData.append('gameID', formGameID);
      formData.append('label',  formLabel);
      formData.append('id', formID);
      formData.append('publicSetting', formPublicSetting);
      formData.append('search', formSearch);
      
      
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
      //   Data 更新
      // ---------------------------------------------
      
      this.idFormDataObj[_id] = resultObj.data;
      
      
      // ---------------------------------------------
      //   渡された関数を実行する
      //   ID登録フォームをロードした元のフォームのIDを更新する
      // ---------------------------------------------
      
      const updatedArr = [];
      
      for (let valueObj of selectedArr.values()) {
        // console.log(index, valueObj);
        
        // console.log(`
        //   ----- valueObj -----\n
        //   ${util.inspect(valueObj, { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        
        const newObj = resultObj.data.find((valueObj2) => {
          return valueObj2._id === valueObj._id;
        });
        
        if (newObj) {
          updatedArr.push(newObj);
        }
        
        // console.log(`
        //   ----- newObj -----\n
        //   ${util.inspect(newObj, { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
      }
      
      func({ _id, idArr: updatedArr });
      
      // console.log(`
      //   ----- updatedArr -----\n
      //   ${util.inspect(updatedArr, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- selectedArr -----\n
      //   ${util.inspect(selectedArr, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen('success', 'IDを編集しました');
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
    } catch (errorObj) {
      
      // console.log(`
      //   ----- errorObj -----\n
      //   ${util.inspect(errorObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen('error', errorObj.message);
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisabledObj(`${_id}-idFormEditSubmit`, false);
      
      
    }
    
    
  };
  
  
  
  
  /**
   * 削除フォームを送信する
   * @param {string} _id
   */
  @action.bound
  async handleIDFormDeleteSubmit({ _id, func, selectedArr }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisabledObj(`${_id}-idFormEditSubmit`, true);
      
      
      
      
      // ---------------------------------------------
      //   編集するIDが選ばれていない場合、エラー
      // ---------------------------------------------
      
      if (_id in this.idForm_idObj === false) {
        throw new Error('削除するIDを選んでください');
      }
      
      
      
      
      // ---------------------------------------------
      //   フォームのデータを取得
      // ---------------------------------------------
      
      const form_id = _id in this.idForm_idObj ? this.idForm_idObj[_id].value : '';
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formData = new FormData();
      
      formData.append('_id', form_id);
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${storeData.urlApi}/v1/ids/delete`,
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
      //   Data 更新
      // ---------------------------------------------
      
      this.idFormDataObj[_id] = resultObj.data;
      
      
      // ---------------------------------------------
      //   渡された関数を実行する
      //   ID登録フォームをロードした元のフォームのIDを更新する
      // ---------------------------------------------
      
      const updatedArr = [];
      
      for (let valueObj of selectedArr.values()) {
        
        const newObj = resultObj.data.find((valueObj2) => {
          return valueObj2._id === valueObj._id;
        });
        
        if (newObj) {
          updatedArr.push(newObj);
        }
        
      }
      
      func({ _id, idArr: updatedArr });
      
      
      // ---------------------------------------------
      //   削除ダイアログを閉じる
      // ---------------------------------------------
      
      this.handleIDFormDeleteDialogClose({ _id });
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen('success', 'IDを削除しました');
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
    } catch (errorObj) {
      
      // console.log(`
      //   ----- errorObj -----\n
      //   ${util.inspect(errorObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen('error', errorObj.message);
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisabledObj(`${_id}-idFormEditSubmit`, false);
      
      
    }
    
    
  };
  
  
  
  
  /**
   * 登録フォームを送信する
   * @param {string} _id
   */
  @action.bound
  async handleIDFormRegisterSubmit({ _id }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisabledObj(`${_id}-idFormRegisterSubmit`, true);
      
      
      
      
      // ---------------------------------------------
      //   フォームのデータを取得
      // ---------------------------------------------
      
      const form_id = _id in this.idForm_idObj ? this.idForm_idObj[_id].value : '';
      const formPlatform = _id in this.idFormPlatformObj ? this.idFormPlatformObj[_id].value : '';
      const formLabel = _id in this.idFormLabelObj ? this.idFormLabelObj[_id].value : '';
      const formID = _id in this.idFormIDObj ? this.idFormIDObj[_id].value : '';
      const formPublicSetting = _id in this.idFormPublicSettingObj ? this.idFormPublicSettingObj[_id].value : '';
      const formSearch = _id in this.idFormSearchObj ? this.idFormSearchObj[_id] : true;
      
      const formGameID = _id in this.idFormGameObj ? this.idFormGameObj[_id][0].gameID : '';
      
      
      // ---------------------------------------------
      //   フォームのバリデーション作動
      // ---------------------------------------------
      
      this.handleIDFormPlatform({ _id, value: formPlatform });
      this.handleIDFormLabel({ _id, value: formLabel });
      this.handleIDFormID({ _id, value: formID });
      this.handleIDFormPublicSetting({ _id, value: formPublicSetting });
      this.handleIDFormSearch({ _id, value: formSearch });
      
      
       // ---------------------------------------------
      //   フォームに必要な情報が入力されていない場合、エラー
      // ---------------------------------------------
      
      if (!formPlatform || !formID || !formPublicSetting) {
        throw new Error('フォームに必要な情報が入力されていません');
      }
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formData = new FormData();
      
      formData.append('_id', form_id);
      formData.append('platform', formPlatform);
      formData.append('gameID', formGameID);
      formData.append('label',  formLabel);
      formData.append('id', formID);
      formData.append('publicSetting', formPublicSetting);
      formData.append('search', formSearch);
      
      
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
      //   Data 更新
      // ---------------------------------------------
      
      this.idFormDataObj[_id.replace('-register', '')] = resultObj.data;
      
      
      // ---------------------------------------------
      //   フォームを空にする
      // ---------------------------------------------
      
      this.handleIDFormPlatform({ _id, value: '' });
      this.handleIDFormLabel({ _id, value: '' });
      this.handleIDFormID({ _id, value: '' });
      this.handleIDFormPublicSetting({ _id, value: '' });
      this.handleIDFormSearch({ _id, value: true });
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen('success', 'IDを新規登録しました');
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
    } catch (errorObj) {
      
      // console.log(`
      //   ----- errorObj -----\n
      //   ${util.inspect(errorObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen('error', errorObj.message);
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisabledObj(`${_id}-idFormRegisterSubmit`, false);
      
      
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