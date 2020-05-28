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


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { CustomError } from 'app/@modules/error/custom.js';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreLayout from 'app/common/layout/stores/layout.js';

let storeHardware = null;
const storeLayout = initStoreLayout({});
      





// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   Data
  // ---------------------------------------------
  
  /**
   * データを入れるオブジェクト
   * @type {Object}
   */
  @observable dataObj = {};
  
  
  /**
   * データを変更する
   * @param {Array} pathArr - パス
   * @param {string} value - 値
   */
  @action.bound
  handleEdit({ pathArr, value }) {
    lodashSet(this.dataObj, pathArr, value);
  };
  
  
  
  
  // ---------------------------------------------
  //   ハードウェア
  // ---------------------------------------------
  
  /**
   * ハードウェアを追加する
   * @param {Array} pathArr - パス
   * @param {string} hardwareID - DB hardwares hardwareID
   * @param {string} name - ハードウェア名
   * @param {number} limit - 登録できる件数
   */
  @action.bound
  handleAddHardwares({
    
    pathArr,
    hardwareID,
    name,
    limit,
    
  }) {
    
    
    // ---------------------------------------------
    //   存在しているかチェックする
    // ---------------------------------------------
    
    const hardwaresArr = lodashGet(this.dataObj, [...pathArr, 'hardwaresArr'], []);
    
    const index = hardwaresArr.findIndex((valueObj) => {
      return valueObj.hardwareID === hardwareID;
    });
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/hardware/stores/store.js - handleAddHardwares
    // `);
    
    // console.log(chalk`
    //   hardwareID: {green ${hardwareID}}
    //   name: {green ${name}}
    //   limit: {green ${limit}}
    //   hardwaresArr.length: {green ${hardwaresArr.length}}
    // `);
    
    
    // ---------------------------------------------
    //   Limitを超えている場合はエラー
    // ---------------------------------------------
    
    if (hardwaresArr.length + 1 > limit) {
      
      storeLayout.handleSnackbarOpen({
        variant: 'warning',
        messageID: 'Owq_rMCaL',
      });
      
      return;
      
    }
    
    
    // ---------------------------------------------
    //   存在していない場合は配列に追加
    // ---------------------------------------------
    
    if (index === -1) {
      
      hardwaresArr.push({
        hardwareID,
        name,
      });
      
      lodashSet(this.dataObj, [...pathArr, 'hardwaresArr'], hardwaresArr);
      
    }
    
    
  };
  
  
  
  
  /**
   * ハードウェアを削除する
   * @param {Array} pathArr - パス
   * @param {string} hardwareID - DB hardwares hardwareID
   */
  @action.bound
  handleDeleteHardwares({ pathArr, hardwareID }) {
    
    
    // ---------------------------------------------
    //   index を取得する
    // ---------------------------------------------
    
    const hardwaresArr = lodashGet(this.dataObj, [...pathArr, 'hardwaresArr'], []);
    
    const index = hardwaresArr.findIndex((valueObj) => {
      return valueObj.hardwareID === hardwareID;
    });
    
    
    // ---------------------------------------------
    //   配列から index を指定して削除
    // ---------------------------------------------
    
    hardwaresArr.splice(index, 1);
    
    
  };
  
  
  
  
  /**
  * 所有ハードウェアのサジェストのキーボード操作
  * ↓ ↑ で現在の選択状態を変更する
  * Enter で現在選択されているハードウェアを登録する
  * @param {Object} eventObj - イベント
  * @param {Array} pathArr - パス
  * @param {number} limit - 登録できる件数
  */
  @action.bound
  handleHardwaresSuggestionOnKeyDown({
    
    eventObj,
    pathArr,
    limit,
    
  }) {
    
    
    // ---------------------------------------------
    //   Propety
    // ---------------------------------------------
    
    const suggestionSelectedIndex = lodashGet(storeHardware, ['dataObj', ...pathArr, 'suggestionSelectedIndex'], 9999);
    const suggestionsArr = lodashGet(storeHardware, ['dataObj', ...pathArr, 'suggestionsArr'], []);
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/form/stores/store.js - handleHardwaresSuggestionOnKeyDown
    // `);
    
    // console.log(chalk`
    //   suggestionSelectedIndex: {green ${suggestionSelectedIndex}}
    // `);
    
    // console.log(`
    //   ----- suggestionsArr -----\n
    //   ${util.inspect(suggestionsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // ---------------------------------------------
    //   Key Down
    // ---------------------------------------------
    
    if (keycode(eventObj) === 'down') {
      
      if (suggestionSelectedIndex === 9999) {
        
        lodashSet(this.dataObj, [...pathArr, 'suggestionSelectedIndex'], 0);
        
      } else if (suggestionSelectedIndex < suggestionsArr.length - 1) {
        
        lodashSet(this.dataObj, [...pathArr, 'suggestionSelectedIndex'], suggestionSelectedIndex + 1);
        
      }
      
      
    // ---------------------------------------------
    //   Key Up
    // ---------------------------------------------
      
    } else if (keycode(eventObj) === 'up') {
      
      if (suggestionSelectedIndex !== 9999 && suggestionSelectedIndex > 0) {
        
        lodashSet(this.dataObj, [...pathArr, 'suggestionSelectedIndex'], suggestionSelectedIndex - 1);
        
      }
      
    } else if (keycode(eventObj) === 'enter' && suggestionSelectedIndex !== 9999) {
      
      
      // ---------------------------------------------
      //   フォームの送信処理停止
      // ---------------------------------------------
      
      eventObj.preventDefault();
      
      
      // ---------------------------------------------
      //   追加
      // ---------------------------------------------
      
      this.handleAddHardwares({
        
        pathArr,
        hardwareID: suggestionsArr[suggestionSelectedIndex].hardwareID,
        name: suggestionsArr[suggestionSelectedIndex].name,
        limit,
        
      });
      
      
    }
    
  };
  
  
  
  
  /**
   * ハードウェアの TextField を変更する
   * 文字が入力されるたびに Fetch でサジェストデータを取得しにいく
   * @param {string} _id - ID
   * @param {string} value - 値
   */
  @action.bound
  async handleHardwaresKeyword({ pathArr, value }) {
    
    
    // ---------------------------------------------
    //   TextField が空の場合、処理停止
    // ---------------------------------------------
    
    if (!value) {
      
      lodashSet(this.dataObj, [...pathArr, 'keyword'], '');
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
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/hardwares/read-suggestion`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
        
      });
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/common/form/stores/store.js - handleHardwaresKeyword
      // `);
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   データ更新
      // ---------------------------------------------
      
      lodashSet(this.dataObj, [...pathArr, 'keyword'], value);
      lodashSet(this.dataObj, [...pathArr, 'suggestionSelectedIndex'], 9999);
      lodashSet(this.dataObj, [...pathArr, 'suggestionsArr'], resultObj.data);
        
      
    } catch (error) {
      
    } finally {}
    
  };
  
  
  
  
  /**
   * フォームを空にする
   * @param {Array} pathArr - パス
   */
  @action.bound
  handleResetForm({ pathArr }) {
    
    lodashSet(this.dataObj, [...pathArr, 'hardwaresArr'], []);
    lodashSet(this.dataObj, [...pathArr, 'keyword'], '');
    lodashSet(this.dataObj, [...pathArr, 'suggestionSelectedIndex'], 0);
    lodashSet(this.dataObj, [...pathArr, 'suggestionsArr'], []);
    
  };
  
  
}






// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreHardware({ propsObj }) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeHardware === null) {
    storeHardware = new Store();
  }
  
  
  // --------------------------------------------------
  //   Props
  // --------------------------------------------------
  
  if (propsObj) {
    
    
    // --------------------------------------------------
    //   pathArr
    // --------------------------------------------------
    
    const pathArr = lodashGet(propsObj, ['pathArr'], []);
    
    
    
    
    // --------------------------------------------------
    //   hardwaresArr
    // --------------------------------------------------
    
    const hardwaresArr = lodashGet(propsObj, ['hardwaresArr'], null);
    
    if (hardwaresArr) {
      lodashSet(storeHardware, ['dataObj', ...pathArr, 'hardwaresArr'], hardwaresArr);
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/form/stores/store.js - initStoreHardware
    // `);
    
    // console.log(chalk`
    //   communities_id: {green ${communities_id}}
    // `);
    
    // console.log(`
    //   ----- propsObj -----\n
    //   ${util.inspect(propsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- hardwaresArr -----\n
    //   ${util.inspect(hardwaresArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeHardware;
  
  
}