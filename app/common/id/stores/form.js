// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

import chalk from 'chalk';
// import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import { action, observable } from 'mobx';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';
// import keycode from 'keycode';


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

// const { validation_id } = require('../../../@validations/_id');
// const validationIDsPlatform = require('../../../@database/ids/validations/platform');
// const validationIDsLabel = require('../../../@database/ids/validations/label');
// const validationIDsID = require('../../../@database/ids/validations/id');
// const validationIDsPublicSetting = require('../../../@database/ids/validations/public-setting');




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
  //   Dialog
  // ---------------------------------------------
  
  /**
   * ダイアログを開く
   * @param {string} _id
   * @param {Array} idArr - 選択されているIDが入っている配列
   */
  @action.bound
  async handleDialogOpen({ _id, idArr }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   編集フォームに表示するデータがすでに読み込まれている場合
      //   編集フォームをすぐに表示する
      // ---------------------------------------------
      
      if (lodashHas(this.dataObj, [_id, 'dataArr'])) {
        
        lodashSet(this.dataObj, [_id, 'dialog'], true);
        
        
      // ---------------------------------------------
      //   編集フォームに表示するデータがまだ読み込まれていない場合
      //   Fetch でデータを取得してから編集フォームを表示する
      // ---------------------------------------------
      
      } else {
        
        
        // ---------------------------------------------
        //   Button Disable
        // ---------------------------------------------
        
        storeLayout.handleButtonDisable({ _id: `${_id}-idForm` });
         
        
        // ---------------------------------------------
        //   FormData
        // ---------------------------------------------
        
        const formData = new FormData();
        
        
        // ---------------------------------------------
        //   Fetch
        // ---------------------------------------------
        
        const resultObj = await fetchWrapper({
          urlApi: `${process.env.URL_API}/v1/ids/find-by-users-id-for-form`,
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
        
        const dataArr = resultObj.data;
        const selectedArr = [];
        const unselectedArr = [];
        
        // 選択ID
        for (let valueObj of idArr.values()) {
          
          // 存在するIDかチェックする（すでに削除されている可能性があるため）
          const index = dataArr.findIndex((value2Obj) => {
            return value2Obj._id === valueObj._id;
          });
          
          if (index !== -1) {
            selectedArr.push(valueObj._id);
          }
          
        }
        
        // 未選択ID
        for (let valueObj of dataArr.values()) {
          
          // 選択IDに含まれていない場合、配列に追加
          const index = idArr.findIndex((value2Obj) => {
            return value2Obj._id === valueObj._id;
          });
          
          if (index === -1) {
            unselectedArr.push(valueObj._id);
          }
          
        }
        
        lodashSet(this.dataObj, [_id, 'selectedArr'], selectedArr);
        lodashSet(this.dataObj, [_id, 'unselectedArr'], unselectedArr);
        lodashSet(this.dataObj, [_id, 'dataArr'], resultObj.data);
        
        // 要削除
        this.idFormDataObj[_id] = resultObj.data;
        
        
        // ---------------------------------------------
        //   編集フォーム表示
        // ---------------------------------------------
        
        lodashSet(this.dataObj, [_id, 'dialog'], true);
         
         
      }
      
      
    } catch (error) {
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonEnable({ _id: `${_id}-idForm` });
      
      
    }
    
    
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
   * 選択IDから未選択IDに移動する
   * @param {string} _id
   * @param {number} index - 移動するIDの配列index
   */
  @action.bound
  handleMoveSelected({ _id, index }) {
    
    const selectedArr = lodashGet(this.dataObj, [_id, 'selectedArr'], []);
    const unselectedArr = lodashGet(this.dataObj, [_id, 'unselectedArr'], []);
    
    unselectedArr.push(selectedArr[index]);
    selectedArr.splice(index, 1);
    
    lodashSet(this.dataObj, [_id, 'unselectedArr'], unselectedArr);
    lodashSet(this.dataObj, [_id, 'selectedArr'], selectedArr);
    
  };
  
  
  /**
   * 未選択IDから選択IDに移動する
   * @param {string} _id
   * @param {number} index - 移動するIDの配列index
   */
  @action.bound
  handleMoveUnselected({ _id, index }) {
    
    const selectedArr = lodashGet(this.dataObj, [_id, 'selectedArr'], []);
    const unselectedArr = lodashGet(this.dataObj, [_id, 'unselectedArr'], []);
    
    selectedArr.push(unselectedArr[index]);
    unselectedArr.splice(index, 1);
    
    lodashSet(this.dataObj, [_id, 'selectedArr'], selectedArr);
    lodashSet(this.dataObj, [_id, 'unselectedArr'], unselectedArr);
    
  };
  
  
  /**
   * 選択を確定するボタンを押したときに実行される
   * @param {string} _id
   * @param {Array} idArr - 選択されたIDの配列
   * @param {function} func - ボタンを押したときに実行する関数
   */
  @action.bound
  handleSelectButton({ _id, idArr, func }) {
    
    // 渡された関数を実行する
    func({ _id, idArr });
    
    // ダイアログを閉じる
    lodashSet(this.dataObj, [_id, 'dialog'], false);
    
  };
  
  
  
  
  // ---------------------------------------------
  //   編集・登録
  // ---------------------------------------------
  
  /**
   * 編集時に編集するIDを選択する（各フォームの値を設定する）
   * 編集フォームの ID (Chip) をクリックしたときに発動
   * @param {string} _id - ID
   * @param {string} ids_id - DB IDs _id
   */
  @action.bound
  handleSetEditForm({ _id, ids_id }) {
    
    const dataArr = lodashGet(this.dataObj, [_id, 'dataArr'], []);
    
    // データを取得する
    const resultObj = dataArr.find((valueObj) => {
      return valueObj._id === ids_id;
    });
    
    // ゲームを追加する
    this.handleGame({
      _id,
      games_id: resultObj.games_id,
      gameID: resultObj.gamesGameID,
      imagesAndVideosObj: resultObj.gamesImagesAndVideosObj,
      name: resultObj.gamesName
    });
    
    // データを追加する
    lodashSet(this.dataObj, [_id, '_id'], resultObj._id);
    lodashSet(this.dataObj, [_id, 'platform'], resultObj.platform);
    lodashSet(this.dataObj, [_id, 'label'], resultObj.label);
    lodashSet(this.dataObj, [_id, 'id'], resultObj.id);
    lodashSet(this.dataObj, [_id, 'publicSetting'], resultObj.publicSetting);
    lodashSet(this.dataObj, [_id, 'search'], resultObj.search);
    
    // console.log(`\n---------- resultObj ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(resultObj)));
    // console.log(`\n-----------------------------------\n`);
    
  };
  
  
  
  
  /**
   * ゲームを変更する
   * @param {string} _id
   * @param {string} games_id - DB games games_id
   * @param {string} gameID - DB games gameID
   * @param {Object} imagesAndVideosObj - 画像情報の入ったオブジェクト
   * @param {string} name - ゲーム名
   */
  @action.bound
  handleGame({ _id, games_id, gameID, imagesAndVideosObj, name }) {
    lodashSet(this.dataObj, [_id, 'gamesArr'], [{ games_id, gameID, imagesAndVideosObj, name }]);
  };
  
  
  /**
   * ゲームを削除する
   * @param {string} _id
   */
  @action.bound
  handleGameDelete({ _id }) {
    lodashSet(this.dataObj, [_id, 'gamesArr'], []);
  };
  
  
  
  
  /**
   * 削除ダイアログを開く
   * @param {string} _id
   */
  @action.bound
  handleDeleteDialogOpen({ _id }) {
    
    
    // ---------------------------------------------
    //   削除するIDが選ばれていない場合、エラーを通知
    // ---------------------------------------------
    
    const form_id = lodashGet(this.dataObj, [_id, '_id'], '');
    
    if (!form_id) {
      storeLayout.handleSnackbarOpen('error', '削除するIDを選んでください');
      return;
    }
      
    
    lodashSet(this.dataObj, [_id, 'deleteDialogOpen'], true);
    
  };
  
  
  /**
   * 削除ダイアログを閉じる
   * @param {string} _id
   */
  @action.bound
  handleDeleteDialogClose({ _id }) {
    lodashSet(this.dataObj, [_id, 'deleteDialogOpen'], false);
  };
  
  
  
  
  /**
   * 編集フォームを送信する
   * @param {string} _id
   */
  @action.bound
  async handleEditSubmit({ _id, func, idArr }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ _id: `${_id}-idFormEditSubmit` });
      
      
      // ---------------------------------------------
      //   編集するIDが選ばれていない場合、エラー
      // ---------------------------------------------
      
      const form_id = lodashGet(this.dataObj, [_id, '_id'], '');
      
      if (!form_id) {
        throw new Error('編集するIDを選んでください');
      }
      
      
      // ---------------------------------------------
      //   フォームのデータを取得
      // ---------------------------------------------
      
      // const form_id = lodashGet(this.dataObj, [_id, '_id'], '');
      const formPlatform = lodashGet(this.dataObj, [_id, 'platform'], '');
      const formGameID = lodashGet(this.dataObj, [_id, 'gamesArr', 0, 'gameID'], '');
      const formLabel = lodashGet(this.dataObj, [_id, 'label'], '');
      const formID = lodashGet(this.dataObj, [_id, 'id'], '');
      const formPublicSetting = lodashGet(this.dataObj, [_id, 'publicSetting'], '');
      const formSearch = lodashGet(this.dataObj, [_id, 'search'], true);
      
      
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
        urlApi: `${process.env.URL_API}/v1/ids/upsert`,
        methodType: 'POST',
        formData: formData
      });
      
      
      // console.log(`\n---------- resultObj ----------\n`);
      // console.dir(JSON.parse(JSON.stringify(resultObj)));
      // console.log(`\n-----------------------------------\n`);
      
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new Error(errorsArrIntoErrorMessage(resultObj.errorsArr));
      }
      
      
      // ---------------------------------------------
      //   Data 更新
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [_id, 'dataArr'], resultObj.data);
      
      
      // ---------------------------------------------
      //   渡された関数を実行する
      //   ID登録フォームをロードした元のフォームのIDを更新する
      // ---------------------------------------------
      
      const updatedArr = [];
      
      for (let valueObj of idArr.values()) {
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
      
      // console.log(`\n---------- errorObj ----------\n`);
      // console.dir(JSON.parse(JSON.stringify(errorObj)));
      // console.log(`\n-----------------------------------\n`);
      
      // console.log(chalk`
      //   errorObj.message: {green ${errorObj.message}}
      // `);
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen('error', errorObj.message);
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonEnable({ _id: `${_id}-idFormEditSubmit` });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * 削除フォームを送信する
   * @param {string} _id
   */
  @action.bound
  async handleDeleteSubmit({ _id, func, idArr }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ _id: `${_id}-idFormDeleteSubmit` });
      
      
      
      
      // ---------------------------------------------
      //   編集するIDが選ばれていない場合、エラー
      // ---------------------------------------------
      
      const form_id = lodashGet(this.dataObj, [_id, '_id'], '');
      
      if (!form_id) {
        throw new Error('削除するIDを選んでください');
      }
      
      
      
      
      // ---------------------------------------------
      //   フォームのデータを取得
      // ---------------------------------------------
      
      // const form_id = lodashGet(this.dataObj, [_id, '_id'], '');
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formData = new FormData();
      
      formData.append('_id', form_id);
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v1/ids/delete`,
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
      
      lodashSet(this.dataObj, [_id, 'dataArr'], resultObj.data);
      
      
      // ---------------------------------------------
      //   渡された関数を実行する
      //   ID登録フォームをロードした元のフォームのIDを更新する
      // ---------------------------------------------
      
      const updatedArr = [];
      
      for (let valueObj of idArr.values()) {
        
        const newObj = resultObj.data.find((valueObj2) => {
          return valueObj2._id === valueObj._id;
        });
        
        if (newObj) {
          updatedArr.push(newObj);
        }
        
      }
      
      func({ _id, idArr: updatedArr });
      
      
      // ---------------------------------------------
      //   フォームを空にする
      // ---------------------------------------------
      
      this.handleClearForm({ _id });
      
      
      // ---------------------------------------------
      //   削除ダイアログを閉じる
      // ---------------------------------------------
      
      this.handleDeleteDialogClose({ _id });
      
      
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
      
      storeLayout.handleButtonEnable({ _id: `${_id}-idFormDeleteSubmit` });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * 登録フォームを送信する
   * @param {string} _id
   */
  @action.bound
  async handleRegisterSubmit({ _id }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ _id: `${_id}-idFormRegisterSubmit` });
      
      
      
      
      // ---------------------------------------------
      //   フォームのデータを取得
      // ---------------------------------------------
      
      // const form_id = lodashGet(this.dataObj, [_id, '_id'], '');
      const formPlatform = lodashGet(this.dataObj, [_id, 'platform'], '');
      const formGameID = lodashGet(this.dataObj, [_id, 'gamesArr', 0, 'gameID'], '');
      const formLabel = lodashGet(this.dataObj, [_id, 'label'], '');
      const formID = lodashGet(this.dataObj, [_id, 'id'], '');
      const formPublicSetting = lodashGet(this.dataObj, [_id, 'publicSetting'], '');
      const formSearch = lodashGet(this.dataObj, [_id, 'search'], true);
      
      
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
      
      // formData.append('_id', form_id);
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
        urlApi: `${process.env.URL_API}/v1/ids/upsert`,
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
      
      const temp_id = _id.replace('-register', '');
      
      lodashSet(this.dataObj, [temp_id, 'dataArr'], resultObj.data);
      
      
      // ---------------------------------------------
      //   未選択IDに追加 / _idのみでいい
      // ---------------------------------------------
      
      const dataArr = lodashGet(this.dataObj, [temp_id, 'dataArr'], []);
      const unselectedArr = lodashGet(this.dataObj, [temp_id, 'unselectedArr'], []);
      unselectedArr.push(dataArr[dataArr.length - 1]._id);
      
      lodashSet(this.dataObj, [temp_id, 'unselectedArr'], unselectedArr);
      
      
      // console.log(`\n---------- resultObj.data ----------\n`);
      // console.dir(JSON.parse(JSON.stringify(resultObj.data)));
      // console.log(`\n-----------------------------------\n`);
      
      // console.log(`\n---------- unselectedArr ----------\n`);
      // console.dir(JSON.parse(JSON.stringify(unselectedArr)));
      // console.log(`\n-----------------------------------\n`);
      
      
      // ---------------------------------------------
      //   フォームを空にする
      // ---------------------------------------------
      
      this.handleClearForm({ _id });
      
      
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
      
      storeLayout.handleButtonEnable({ _id: `${_id}-idFormRegisterSubmit` });
      
      
    }
    
    
  };
  
  
  
  
  /**
   * フォームを空にする
   * @param {string} _id
   */
  @action.bound
  handleClearForm({ _id }) {
    
    lodashSet(this.dataObj, [_id, '_id'], '');
    lodashSet(this.dataObj, [_id, 'platform'], '');
    lodashSet(this.dataObj, [_id, 'label'], '');
    lodashSet(this.dataObj, [_id, 'id'], '');
    lodashSet(this.dataObj, [_id, 'publicSetting'], '');
    lodashSet(this.dataObj, [_id, 'search'], true);
    
  };
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreIDForm(argumentsObj, storeInstanceObj) {
  
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