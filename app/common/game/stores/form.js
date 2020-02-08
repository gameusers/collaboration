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
  //   Getter & Setter ゲームデータ / gamesArr
  // ---------------------------------------------
  
  /**
   * gamesArr を取得する
   * @param {Array} pathArr - パス
   */
  @action.bound
  handleGetGamesArr({ pathArr }) {
    return lodashGet(this.dataObj, [...pathArr, 'gamesArr'], []);
  };
  
  
  /**
   * gamesArr を置き換える
   * @param {Array} pathArr - パス
   * @param {Array} gamesArr - 置き換えるデータの入った配列
   */
  @action.bound
  handleSetGamesArr({ pathArr, gamesArr }) {
    
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/game/stores/form.js - handleSetGamesArr
    // `);
    
    // console.log(`
    //   ----- pathArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- gamesArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(gamesArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    lodashSet(this.dataObj, [...pathArr, 'gamesArr'], gamesArr);
  };
  
  
  
  
  // ---------------------------------------------
  //   ゲーム追加・削除する / gamesArr
  // ---------------------------------------------
  
  /**
   * ゲームを追加する
   * @param {Array} pathArr - パス
   * @param {Object} obj - 追加するゲームのデータ
   */
  @action.bound
  handleAdd({ pathArr, obj }) {
    
    const gamesArr = this.handleGetGamesArr({ pathArr });
    const _id = lodashGet(obj, ['_id'], '');
    
    
    // 配列内に存在しているかチェック
    const index = gamesArr.findIndex((valueObj) => {
      return valueObj._id === _id;
    });
    
    // console.log(chalk`
    //   index: {green ${index}}
    // `);
    
    
    // 配列内に存在していない場合はpushする
    if (_id && index === -1) {
      
      gamesArr.push(obj);
      lodashSet(this.dataObj, [...pathArr, 'gamesArr'], gamesArr);
      
    }
    
  };
  
  
  /**
   * ゲームを削除する
   * @param {Array} pathArr - パス
   * @param {string} _id - ID
   */
  @action.bound
  handleRemove({ pathArr, _id }) {
    
    const gamesArr = this.handleGetGamesArr({ pathArr });
    
    
    // 配列内に存在しているかチェック
    const index = gamesArr.findIndex((valueObj) => {
      return valueObj._id === _id;
    });
    
    
    // console.log(chalk`
    //   index: {green ${index}}
    // `);
    
    
    // 配列内に存在している場合は削除する
    if (_id && index !== -1) {
      
      gamesArr.splice(index, 1);
      lodashSet(this.dataObj, [...pathArr, 'gamesArr'], gamesArr);
      
      // console.log(`
      //   ----- gamesArr -----\n
      //   ${util.inspect(gamesArr, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
    }
    
  };
  
  
  
  
  // ---------------------------------------------
  //   キーボード操作
  // ---------------------------------------------
  
  /**
  * サジェストのキーボード操作
  * ↓ ↑ で現在の選択状態を変更する
  * Enter で現在選択されているゲームを登録する
  * @param {Object} eventObj - イベント
  * @param {Array} pathArr - パス
  */
  @action.bound
  handleSuggestionOnKeyDown({ eventObj, pathArr }) {
    
    
    // サジェストで現在選択されている番号
    const selectedIndex = lodashGet(this.dataObj, [...pathArr, 'selectedIndex'], null);
    
    // サジェストのデータ
    const suggestionArr = lodashGet(this.dataObj, [...pathArr, 'suggestionArr'], []);
    
    
    // console.log(chalk`
    //   keycode(eventObj): {green ${keycode(eventObj)}}
    //   selectedIndex: {green ${selectedIndex}}
    // `);
    
    // console.log(`
    //   ----- suggestionArr -----\n
    //   ${util.inspect(suggestionArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    // ---------------------------------------------
    //   キーボードの ↓ を押したとき
    //   サジェストで現在選択されている番号が、表示されているゲームの総数以上にならないようにする
    // ---------------------------------------------
    
    if (keycode(eventObj) === 'down') {
      
      if (selectedIndex === null) {
        lodashSet(this.dataObj, [...pathArr, 'selectedIndex'], 0);
      } else if (selectedIndex < suggestionArr.length - 1) {
        lodashSet(this.dataObj, [...pathArr, 'selectedIndex'], selectedIndex + 1);
      }
      
      
    // ---------------------------------------------
    //   キーボードの ↑ を押したとき
    //   サジェストで現在選択されている番号が、0未満にならないようにする
    // ---------------------------------------------
      
    } else if (keycode(eventObj) === 'up') {
      
      if (selectedIndex !== null && selectedIndex > 0) {
        lodashSet(this.dataObj, [...pathArr, 'selectedIndex'], selectedIndex - 1);
      }
      
      
    // ---------------------------------------------
    //   キーボードの Enter を押したとき
    //   サジェストで現在選択されているゲームを追加する
    // ---------------------------------------------
      
    } else if (keycode(eventObj) === 'enter' && selectedIndex !== null) {
      
      this.handleAdd({ pathArr, obj: suggestionArr[selectedIndex] });
      
    }
    
  };
  
  
  
  
  // ---------------------------------------------
  //   TextField
  // ---------------------------------------------
  
  /**
   * TextField を変更する
   * 文字が入力されるたびに Fetch でサジェストデータを取得しにいく
   * @param {Array} pathArr - パス
   * @param {string} value - 値
   */
  @action.bound
  async handleKeyword({ pathArr, value }) {
    
    
    // ---------------------------------------------
    //   TextField の値変更
    // ---------------------------------------------
    
    lodashSet(this.dataObj, [...pathArr, 'keyword'], value);
    
    
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
      
      const formDataObj = {
        
        keyword: value,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/db/games/read-suggestion`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
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
      lodashSet(this.dataObj, [...pathArr, 'selected'], null);
      
      // サジェストのデータを更新
      lodashSet(this.dataObj, [...pathArr, 'suggestionArr'], resultObj.data);
      
      
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

export default function initStoreGameForm({ propsObj }) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeGameForm === null) {
    storeGameForm = new Store();
  }
  
  
  
   // --------------------------------------------------
  //   Props
  // --------------------------------------------------
  
  if (propsObj) {
    
    
    // --------------------------------------------------
    //   pathArr
    // --------------------------------------------------
    
    const pathArr = lodashGet(propsObj, ['pathArr'], []);
    
    // console.log(`
    //   ----- pathArr -----\n
    //   ${util.inspect(pathArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   gamesArr
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['gamesArr'])) {
      storeGameForm.handleSetGamesArr({ pathArr, gamesArr: propsObj.gamesArr });
    }
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeGameForm;
  
  
}