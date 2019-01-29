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
  //   ゲームを選択・削除する
  // ---------------------------------------------
  
  /**
   * 選択されたゲームを入れるオブジェクト
   * @type {Object}
   */
  @observable gameSelectSuggestionSelectedObj = {};
  
  
  /**
   * ゲームを選択する
   * @param {string} _id - ID
   * @param {string} games_id - DB games games_id
   * @param {string} gameID - DB games gameID
   * @param {boolean} thumbnail - サムネイルが表示できるか
   * @param {string} name - ゲーム名
   */
  @action.bound
  handleGameSelectSuggestionAdd({ _id, games_id, gameID, thumbnail, name, func }) {
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   games_id: {green ${games_id}}
    //   gameID: {green ${gameID}}
    //   thumbnail: {green ${thumbnail}}
    //   name: {green ${name}}
    // `);
    
    // const arr = _id in this.gameSelectSuggestionSelectedObj ? this.gameSelectSuggestionSelectedObj[_id] : [];
    
    // // 配列内にすでに存在しているかチェックする
    // const index = arr.findIndex((valueObj) => {
    //   return valueObj.games_id === games_id;
    // });
    
    // // 存在していない場合は配列に追加する
    // if (index === -1) {
    //   arr.push({
    //     games_id,
    //     gameID,
    //     thumbnail,
    //     name
    //   });
      
    //   this.gameSelectSuggestionSelectedObj[_id] = arr;
    // }
    
    
    // 受け渡された関数を実行する
    func({ _id, games_id, gameID, thumbnail, name });
    
  };
  
  
  /**
   * ゲームを削除する
   * @param {string} _id - ID
   * @param {string} games_id - DB games games_id
   */
  @action.bound
  handleGameSelectSuggestionDelete({ _id, games_id, gameID, thumbnail, name, funcDelete }) {
    
    // console.log('handleGameSelectSuggestionDelete');
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   games_id: {green ${games_id}}
    // `);
    
    // const index = this.gameSelectSuggestionSelectedObj[_id].findIndex((valueObj) => {
    //   return valueObj.games_id === games_id;
    // });
    
    // this.gameSelectSuggestionSelectedObj[_id].splice(index, 1);
    
    // 受け渡された関数を実行する
    funcDelete({ _id, games_id, gameID, thumbnail, name });
    
  };
  
  
  
  
  // ---------------------------------------------
  //   サジェストのデータ
  // ---------------------------------------------
  
  /**
   * サジェストデータを入れるオブジェクト
   * @type {Object}
   */
  @observable gameSelectSuggestionDataObj = {};
  
  
  
  
  // ---------------------------------------------
  //   キーボード操作
  // ---------------------------------------------
  
  /**
   * サジェストのキーボードでの選択状態を保存するオブジェクト
   * @type {Object}
   */
  @observable gameSelectSuggestionKeyboardSelectedObj = {};
  
  
  /**
  * サジェストのキーボード操作
  * ↓ ↑ で現在の選択状態を変更する
  * Enter で現在選択されているゲームを登録する
  * @param {Object} eventObj - イベント
  * @param {string} _id - ID
  */
  @action.bound
  handleGameSelectSuggestionOnKeyDown({ eventObj, _id }) {
    
    // サジェストで現在選択されている番号
    const selectedIndex = _id in this.gameSelectSuggestionKeyboardSelectedObj ? this.gameSelectSuggestionKeyboardSelectedObj[_id] : null;
    
    // サジェストのデータ
    const dataArr = _id in this.gameSelectSuggestionDataObj ? this.gameSelectSuggestionDataObj[_id] : [];
    
    
    if (keycode(eventObj) === 'down') {
      
      if (selectedIndex === null) {
        this.gameSelectSuggestionKeyboardSelectedObj[_id] = 0;
      } else if (selectedIndex < dataArr.length - 1) {
        this.gameSelectSuggestionKeyboardSelectedObj[_id] += 1;
      }
      
    } else if (keycode(eventObj) === 'up') {
      
      if (selectedIndex !== null && selectedIndex > 0) {
        this.gameSelectSuggestionKeyboardSelectedObj[_id] -= 1;
      }
      
    } else if (keycode(eventObj) === 'enter' && selectedIndex !== null) {
      
      const { _id: games_id, gameID, thumbnail, name } = dataArr[selectedIndex];
      
      // console.log(chalk`
      //   games_id: {green ${games_id}}
      //   gameID: {green ${gameID}}
      //   thumbnail: {green ${thumbnail}}
      //   name: {green ${name}}
      // `);
      
      this.handleGameSelectSuggestionAdd({ _id, games_id, gameID, thumbnail, name });
      
    }
    
  };
  
  
  
  
  // ---------------------------------------------
  //   TextField
  // ---------------------------------------------
  
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
      
      // サジェストのキーボードでの選択状態をクリア
      delete this.gameSelectSuggestionKeyboardSelectedObj[_id];
      
      // サジェストのデータを更新
      this.gameSelectSuggestionDataObj[_id] = resultObj.data;
      
      
      // console.log(`
      //   ----- resultObj.data -----\n
      //   ${util.inspect(resultObj.data, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
        
      
    } catch (error) {
      
    } finally {}
    
  };
  
  
  
  
  // ---------------------------------------------
  //   TextField へのフォーカス
  // ---------------------------------------------
  
  /**
   * TextField へのフォーカス状態を記録するオブジェクト
   * @type {Object}
   */
  @observable gameSelectSuggestionTextFieldFocusObj = {};
  
  
  /**
   * TextField にフォーカス
   * @param {string} _id - ID
   */
  @action.bound
  handleGameSelectSuggestionTextFieldOnFocus(_id) {
    this.gameSelectSuggestionTextFieldFocusObj[_id] = true;
  };
  
  
  /**
   * TextField からフォーカスアウト
   * @param {string} _id - ID
   */
  @action.bound
  handleGameSelectSuggestionTextFieldOnBlur(_id) {
    this.gameSelectSuggestionTextFieldFocusObj[_id] = false;
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