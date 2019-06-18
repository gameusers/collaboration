// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import { action, observable } from 'mobx';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../../@modules/fetch';
import { CustomError } from '../../../@modules/error/custom';


// ---------------------------------------------
//   Validation
// ---------------------------------------------

// const { validationUsersLoginID } = require('../../../@database/users/validations/login-id');
// const { validationUsersLoginPassword, validationUsersLoginPasswordConfirmation } = require('../../../@database/users/validations/login-password');
// const { validationUsersEmail } = require('../../../@database/users/validations/email');




// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeForum = null;
let storeLayout = null;
let storeData = null;
      



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
  
  
  
  
  
  // /**
  // * プレイヤーページ設定フォームを送信する
  // */
  // @action.bound
  // async handleSubmitPages() {
    
    
  //   try {
      
      
  //     // ---------------------------------------------
  //     //   Button Disable
  //     // ---------------------------------------------
      
  //     storeLayout.handleButtonDisable({ _id: 'settingsFormPage' });
      
      
  //     // ---------------------------------------------
  //     //   Property
  //     // ---------------------------------------------
      
  //     const playerID = lodashGet(this.dataObj, ['playerID'], '');
  //     const pagesArr = lodashGet(this.dataObj, ['pagesArr'], []);
      
      
  //     // ---------------------------------------------
  //     //   FormData
  //     // ---------------------------------------------
      
  //     let formData = new FormData();
      
  //     formData.append('playerID', playerID);
  //     formData.append('pagesArr', JSON.stringify(pagesArr));
      
      
  //     // ---------------------------------------------
  //     //   Fetch
  //     // ---------------------------------------------
      
  //     let resultObj = await fetchWrapper({
  //       urlApi: `${process.env.URL_API}/v1/users/pages`,
  //       methodType: 'POST',
  //       formData: formData
  //     });
  //     // console.log(`\n---------- resultObj ----------\n`);
  //     // console.dir(resultObj);
  //     // console.log(`\n-----------------------------------\n`);
      
  //     // ---------------------------------------------
  //     //   Error
  //     // ---------------------------------------------
      
  //     if ('errorsArr' in resultObj) {
  //       throw new CustomError({ errorsArr: resultObj.errorsArr });
  //     }
      
      
  //     // ---------------------------------------------
  //     //   Snackbar: Success
  //     // ---------------------------------------------
      
  //     storeLayout.handleSnackbarOpen({
  //       variant: 'success',
  //       messageID: 'CquCU7BtA',
  //     });
      
      
  //     // ---------------------------------------------
  //     //   Page Transition
  //     // ---------------------------------------------
      
  //     const pageTransition = lodashGet(resultObj, ['data', 'pageTransition'], false);
      
  //     if (pageTransition) {
  //       window.location.href = `${process.env.URL_BASE}pl/${playerID}`;
  //     }
      
      
  //   } catch (errorObj) {
      
      
  //     // ---------------------------------------------
  //     //   Snackbar: Error
  //     // ---------------------------------------------
      
  //     storeLayout.handleSnackbarOpen({
  //       variant: 'error',
  //       errorObj,
  //     });
      
      
  //   } finally {
      
      
  //     // ---------------------------------------------
  //     //   Button Enable
  //     // ---------------------------------------------
      
  //     storeLayout.handleButtonEnable({ _id: 'settingsFormPage' });
      
      
  //     // ---------------------------------------------
  //     //   Loading 非表示
  //     // ---------------------------------------------
      
  //     storeLayout.handleLoadingHide({});
      
      
  //   }
    
    
  // };
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreForum({}) {
  
  if (storeForum === null) {
    storeForum = new Store();
  }
  
  return storeForum;
  
}