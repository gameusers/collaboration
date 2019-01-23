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
  //   ゲーム
  // ---------------------------------------------
  
  /**
   * 選択されたゲームを入れるオブジェクト
   * @type {Object}
   */
  @observable gameSelectSuggestionSelectedObj = {};
  
  
  /**
   * ゲームを選択する
   * @param {string} _id - ID
   * @param {string} gameID - DB games gameID
   * @param {string} name - ゲーム名
   */
  @action.bound
  handleGameSelectSuggestionAdd({ _id, gameID, name }) {
    
    const arr = _id in this.gameSelectSuggestionSelectedObj ? this.gameSelectSuggestionSelectedObj[_id] : [];
    
    // 配列内にすでに存在しているかチェックする
    const index = arr.findIndex((valueObj) => {
      return valueObj.gameID === gameID;
    });
    
    // 存在していない場合は配列に追加する
    if (index === -1) {
      arr.push({
        gameID,
        name
      });
      
      this.gameSelectSuggestionSelectedObj[_id] = arr;
    }
    
  };
  
  
  /**
   * 所有ハードウェアを削除する
   * @param {string} _id - DB card-players _id
   * @param {string} hardwareID - DB hardwares hardwareID
   */
  // @action.bound
  // handleCardPlayerDeleteHardwareActive(_id, hardwareID) {
    
  //   const index = this.cardPlayerEditFormDataObj[_id].hardwareActiveArr.findIndex((valueObj) => {
  //     return valueObj.hardwareID === hardwareID;
  //   });
    
  //   this.cardPlayerEditFormDataObj[_id].hardwareActiveArr.splice(index, 1);
    
  // };
  
  
  /**
   * サジェストデータを入れるオブジェクト
   * @type {Object}
   */
  // @observable gameSelectSuggestionObj = {};
  
  
  /**
   * 所有ハードウェアのサジェストの選択状態を保存するオブジェクト
   * @type {Object}
   */
  // @observable cardPlayerFormHardwareActiveSuggestionSelectedObj = {};
  
  
  /**
  * 所有ハードウェアのサジェストのキーボード操作
  * ↓ ↑ で現在の選択状態を変更する
  * Enter で現在選択されているハードウェアを登録する
  * @param {Object} eventObj - イベント
  * @param {string} _id - DB card-players _id
  */
  // @action.bound
  // handleCardPlayerFormHardwareActiveSuggestionOnKeyDown(eventObj, _id) {
    
    
  //   // console.log(chalk`
  //   //   keycode(eventObj): {green ${keycode(eventObj)}}
  //   // `);
    
  //   const selectedIndex = _id in this.cardPlayerFormHardwareActiveSuggestionSelectedObj ? this.cardPlayerFormHardwareActiveSuggestionSelectedObj[_id] : null;
    
  //   const dataArr = _id in this.cardPlayerFormHardwareActiveSuggestionObj ? this.cardPlayerFormHardwareActiveSuggestionObj[_id] : [];
    
    
    
  //   if (keycode(eventObj) === 'down') {
      
  //     if (selectedIndex === null) {
  //       this.cardPlayerFormHardwareActiveSuggestionSelectedObj[_id] = 0;
  //     } else if (selectedIndex < dataArr.length - 1) {
  //       this.cardPlayerFormHardwareActiveSuggestionSelectedObj[_id] += 1;
  //     }
      
  //   } else if (keycode(eventObj) === 'up') {
      
  //     if (selectedIndex !== null && selectedIndex > 0) {
  //       this.cardPlayerFormHardwareActiveSuggestionSelectedObj[_id] -= 1;
  //     }
      
  //   } else if (keycode(eventObj) === 'enter' && selectedIndex !== null) {
      
      
  //     // console.log(chalk`
  //     //   selectedIndex: {green ${selectedIndex}}
  //     //   dataArr[selectedIndex].hardwareID: {green ${dataArr[selectedIndex].hardwareID}}
  //     //   dataArr[selectedIndex].name: {green ${dataArr[selectedIndex].name}}
  //     // `);
      
      
  //     this.handleCardPlayerAddHardwareActive(_id, dataArr[selectedIndex].hardwareID, dataArr[selectedIndex].name);
      
  //   }
    
  // };
  
  
  /**
   * TextField の入力文字を入れるオブジェクト
   * @type {Object}
   */
  @observable gameSelectSuggestionTextFieldObj = {};
  
  
  /**
   * TextField を変更する
   * 文字が入力されるたびに Fetch でサジェストデータを取得しにいく
   * @param {Object} eventObj - イベント
   * @param {string} ID
   */
  @action.bound
  async handleGameSelectSuggestionTextField({ eventObj, _id }) {
    
    
    // ---------------------------------------------
    //   TextField の値変更
    // ---------------------------------------------
    
    this.gameSelectSuggestionTextFieldObj[_id] = eventObj.target.value;
    // return;
    
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
        urlApi: `${storeData.urlApi}/v1/games/find-by-search-keywords-arr-for-suggestion`,
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
      
      // delete this.cardPlayerFormHardwareActiveSuggestionSelectedObj[_id];
      // this.cardPlayerFormHardwareActiveSuggestionObj[_id] = resultObj.data;
      
      
      console.log(`
        ----- resultObj.data -----\n
        ${util.inspect(resultObj.data, { colors: true, depth: null })}\n
        --------------------\n
      `);
        
      
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
   * @param {number} idArr - IDの配列
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
   * プラットフォーム選択フォームの選択値を入れるオブジェクト
   * @type {Object}
   */
  @observable idFormDataPlatformObj = {};
  
  
  /**
   * プラットフォームを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - ID
   */
  @action.bound
  handleIDFormDataPlatform({ eventObj, _id }) {
    this.idFormDataPlatformObj[_id] = eventObj.target.value;
  };
  
  
  /**
   * ラベル入力フォームの入力値を入れるオブジェクト
   * @type {Object}
   */
  @observable idFormDataLabelObj = {};
  
  
  /**
   * ラベルを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - ID
   */
  @action.bound
  handleIDFormDataLabel({ eventObj, _id }) {
    this.idFormDataLabelObj[_id] = eventObj.target.value;
  };
  
  
  /**
   * ID入力フォームの入力値を入れるオブジェクト
   * @type {Object}
   */
  @observable idFormDataIDObj = {};
  
  
  /**
   * IDを変更する
   * @param {Object} eventObj - イベント
   * @param {string} _id - ID
   */
  @action.bound
  handleIDFormDataID({ eventObj, _id }) {
    this.idFormDataIDObj[_id] = eventObj.target.value;
  };
  
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreGameSelectSuggestion(argumentsObj, storeInstanceObj) {
  
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