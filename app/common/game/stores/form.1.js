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


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../../@modules/fetch';
import { CustomError } from '../../../@modules/error/custom';




// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeGameForm = null;




// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
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
  //   ゲームを選択・削除する
  // ---------------------------------------------
  
  /**
   * ゲームを選択する
   * @param {string} _id - ID
   * @param {string} games_id - DB games games_id
   * @param {string} gameID - DB games gameID
   * @param {Object} imagesAndVideosObj - 画像情報の入ったオブジェクト
   * @param {string} name - ゲーム名
   */
  @action.bound
  handleAdd({ _id, games_id, gameID, imagesAndVideosObj, name, func }) {
    
    // 受け渡された関数を実行する
    func({ _id, games_id, gameID, imagesAndVideosObj, name });
    
  };
  
  
  /**
   * ゲームを削除する
   * @param {string} _id - ID
   * @param {string} games_id - DB games games_id
   */
  @action.bound
  handleRemove({ _id, games_id, gameID, imagesAndVideosObj, name, funcDelete }) {
    
    // 受け渡された関数を実行する
    funcDelete({ _id, games_id, gameID, imagesAndVideosObj, name });
    
  };
  
  
  
  
  // ---------------------------------------------
  //   キーボード操作
  // ---------------------------------------------
  
  /**
  * サジェストのキーボード操作
  * ↓ ↑ で現在の選択状態を変更する
  * Enter で現在選択されているゲームを登録する
  * @param {Object} eventObj - イベント
  * @param {string} _id - ID
  * @param {function} func - 実行する関数
  */
  @action.bound
  handleSuggestionOnKeyDown({ eventObj, _id, func }) {
    
    
    // サジェストで現在選択されている番号
    const selectedIndex = lodashGet(this.dataObj, [_id, 'selectedIndex'], null);
    
    // サジェストのデータ
    const suggestionArr = lodashGet(this.dataObj, [_id, 'suggestionArr'], []);
    
    
    // console.log(chalk`
    //   keycode(eventObj): {green ${keycode(eventObj)}}
    //   selectedIndex: {green ${selectedIndex}}
    // `);
    
    // ---------------------------------------------
    //   キーボードの ↓ を押したとき
    //   サジェストで現在選択されている番号が、表示されているゲームの総数以上にならないようにする
    // ---------------------------------------------
    
    if (keycode(eventObj) === 'down') {
      
      if (selectedIndex === null) {
        lodashSet(this.dataObj, [_id, 'selectedIndex'], 0);
      } else if (selectedIndex < suggestionArr.length - 1) {
        lodashSet(this.dataObj, [_id, 'selectedIndex'], selectedIndex + 1);
      }
      
      
    // ---------------------------------------------
    //   キーボードの ↑ を押したとき
    //   サジェストで現在選択されている番号が、0未満にならないようにする
    // ---------------------------------------------
      
    } else if (keycode(eventObj) === 'up') {
      
      if (selectedIndex !== null && selectedIndex > 0) {
        lodashSet(this.dataObj, [_id, 'selectedIndex'], selectedIndex - 1);
      }
      
      
    // ---------------------------------------------
    //   キーボードの Enter を押したとき
    //   サジェストで現在選択されているゲームを追加する
    // ---------------------------------------------
      
    } else if (keycode(eventObj) === 'enter' && selectedIndex !== null) {
      
      const { _id: games_id, gameID, imagesAndVideosObj, name } = suggestionArr[selectedIndex];
      this.handleAdd({ _id, games_id, gameID, imagesAndVideosObj, name, func });
      
    }
    
  };
  
  
  
  
  // ---------------------------------------------
  //   TextField
  // ---------------------------------------------
  
  /**
   * TextField を変更する
   * 文字が入力されるたびに Fetch でサジェストデータを取得しにいく
   * @param {string} _id - ID
   * @param {string} value - 値
   */
  @action.bound
  async handleKeyword({ _id, value }) {
    
    
    // ---------------------------------------------
    //   TextField の値変更
    // ---------------------------------------------
    
    lodashSet(this.dataObj, [_id, 'keyword'], value);
    
    
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
        urlApi: `${process.env.URL_API}/v1/games/find-by-search-keywords-arr-for-suggestion`,
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
      
      // サジェストのキーボードでの選択状態をクリア
      delete this.dataObj[_id].selected;
      
      // サジェストのデータを更新
      lodashSet(this.dataObj, [_id, 'suggestionArr'], resultObj.data);
      
      
      // console.log(`\n---------- resultObj.data ----------\n`);
      // console.dir(JSON.parse(JSON.stringify(resultObj.data)));
      // console.log(`\n-----------------------------------\n`);
        
      
    } catch (error) {
      
    } finally {}
    
  };
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreGameForm({}) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeGameForm === null) {
    storeGameForm = new Store();
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeGameForm;
  
  
}