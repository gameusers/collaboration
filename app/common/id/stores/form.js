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
// import keycode from 'keycode';


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
   * フォームの選択されたデータを入れる配列
   * @type {Array}
   */
  @observable idFormDataSelectedArr = [];
  
  /**
   * フォームの未選択のデータを入れる配列
   * @type {Array}
   */
  @observable idFormDataUnselectedArr = [];
  
  
  
  
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
  handleIDFormDialogClose(_id) {
    this.idFormDialogObj[_id] = false;
  };
  
  
  /**
   * ダイアログを開く
   * @param {string} _id - ID
   * @param {string} usersLogin_id - ログインユーザーID
   */
  @action.bound
  async handleIDFormDialogOpen({_id, usersLogin_id}) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   編集フォームに表示するデータがすでに読み込まれている場合
      //   編集フォームをすぐに表示する
      // ---------------------------------------------
      
      if (this.idFormDataSelectedArr.length > 0 || this.idFormDataUnselectedArr.length > 0) {
        
        this.idFormDialogObj[_id] = true;
        
        
      // ---------------------------------------------
      //   編集フォームに表示するデータがまだ読み込まれていない場合
      //   Fetch でデータを取得してから編集フォームを表示する
      // ---------------------------------------------
      
      } else {
        
        console.log('fetchWrapper');
         
        
        // ---------------------------------------------
        //   FormData
        // ---------------------------------------------
        
        const formData = new FormData();
        
        // formData.append('_id', usersLogin_id);
        
        
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
        
        this.idFormDataUnselectedArr = resultObj.data;
        
        
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