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
  //   Data
  // ---------------------------------------------
  
  /**
   * フォームのデータを入れるオブジェクト
   * @type {Object}
   */
  @observable idFormDataObj = {};
  
  
  /**
   * フォームの選択されたデータを入れるオブジェクト
   * @type {Object}
   */
  @observable idFormDataSelectedObj = {};
  
  
  /**
   * フォームの未選択のデータを入れるオブジェクト
   * @type {Object}
   */
  @observable idFormDataUnselectedObj = {};
  
  
  
  
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
   */
  @action.bound
  handleIDFormDialogClose({ _id }) {
    // const usersLogin_id = storeData.usersLoginObj._id;
    this.idFormDialogObj[_id] = false;
  };
  
  
  /**
   * ダイアログを開く
   * @param {string} _id - ID
   * @param {string} usersLogin_id - ログインユーザーID
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
  //   選択
  // ---------------------------------------------
  
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