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

import { action } from 'mobx';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../../@modules/fetch';
import { CustomError } from '../../../@modules/error/custom';


// --------------------------------------------------
//   Stores
// --------------------------------------------------

import initStoreLayout from '../../../common/layout/stores/layout';




// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeLogoutIndex = null;
let storeLayout = initStoreLayout({});




// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  /**
   * ログアウトフォームで送信ボタンを押すと呼び出される
   */
  // @action.bound
  // async handleLogout({ pathArr }) {
    
    
  //   try {
      
      
  //     // ---------------------------------------------
  //     //   Loading 表示
  //     // ---------------------------------------------
      
  //     storeLayout.handleLoadingShow({});
      
      
  //     // ---------------------------------------------
  //     //   Button Disable
  //     // ---------------------------------------------
      
  //     storeLayout.handleButtonDisable({ pathArr });
      
      
      
      
  //     // ---------------------------------------------
  //     //   FormData
  //     // ---------------------------------------------
      
  //     const formDataObj = {};
      
      
  //     // ---------------------------------------------
  //     //   Fetch - Create Account
  //     // ---------------------------------------------
      
  //     const resultObj = await fetchWrapper({
  //       urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v1/login/logout`,
  //       // urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/logout/logout`,
  //       methodType: 'POST',
  //       formData: JSON.stringify(formDataObj)
  //     });
      
      
  //     // console.log(`
  //     //   ----- resultObj -----\n
  //     //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
  //     //   --------------------\n
  //     // `);
      
      
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
  //       messageID: 'CKQQ_bjmW',
  //     });
      
      
  //     // ---------------------------------------------
  //     //   Page Transition / トップページに移動
  //     // ---------------------------------------------
      
  //     window.location.href = process.env.NEXT_PUBLIC_URL_BASE;
  //     // window.location.href = `${process.env.NEXT_PUBLIC_URL_BASE}login`;
      
      
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
      
  //     storeLayout.handleButtonEnable({ pathArr });
      
      
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

export default function initStoreLogoutIndex({}) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeLogoutIndex === null) {
    storeLogoutIndex = new Store();
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeLogoutIndex;
  
  
}