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
// import { IntlProvider } from 'react-intl';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../../@modules/fetch';
import CustomError from '../../../@modules/error/custom';
import { returnErrorMessage } from '../../../@modules/error/message';


// ---------------------------------------------
//   Format
// ---------------------------------------------

// import { errorsArrIntoErrorMessage } from '../../../@format/error';


// ---------------------------------------------
//   Validation
// ---------------------------------------------

const { validationUsersLoginID } = require('../../../@database/users/validations/login-id');
const { validationUsersLoginPassword, validationUsersLoginPasswordConfirmation } = require('../../../@database/users/validations/login-password');
const { validationUsersEmail } = require('../../../@database/users/validations/email');


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeLoginAccount = null;
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
  //   Edit Account
  // ---------------------------------------------
  
  /**
   * パスワード入力フォームの目のマークを押したときに呼び出される
   * 押すと隠されているログインパスワードを表示する
   */
  @action.bound
  handlePasswordShow() {
    this.dataObj['loginPasswordShow'] = !this.dataObj['loginPasswordShow'];
  };
  
  
  /**
   * パスワード入力フォーム onMouseDown で呼び出される
   * Material UI のページに解説されているとおりに入れている
   * 参考：https://material-ui.com/demos/text-fields/#input-adornments
   * @param {Object} eventObj - イベント
   */
  @action.bound
  handlePasswordMouseDown(eventObj) {
    eventObj.preventDefault();
  };
  
  
  /**
   * パスワード確認入力フォームの目のマークを押したときに呼び出される
   * 押すと隠されているログインパスワードを表示する
   */
  @action.bound
  handlePasswordConfirmationShow() {
    this.dataObj['loginPasswordConfirmationShow'] = !this.dataObj['loginPasswordConfirmationShow'];
  };
  
  
  /**
   * パスワード確認入力フォーム onMouseDown で呼び出される
   * Material UI のページに解説されているとおりに入れている
   * 参考：https://material-ui.com/demos/text-fields/#input-adornments
   * @param {Object} eventObj - イベント
   */
  @action.bound
  handlePasswordConfirmationMouseDown(eventObj) {
    eventObj.preventDefault();
  };
  
  
  
  
  /**
   * ログイン情報編集フォームを送信する
   */
  @action.bound
  async handleEditAccount() {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      storeLayout.handleButtonDisable({ _id: 'editAccount' });
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const loginID = lodashGet(this.dataObj, ['loginID'], '');
      const loginPassword = lodashGet(this.dataObj, ['loginPassword'], '');
      const loginPasswordConfirmation = lodashGet(this.dataObj, ['loginPasswordConfirmation'], '');
      
      
      // ---------------------------------------------
      //   Validation
      // ---------------------------------------------
      
      const validationUsersLoginIDObj = validationUsersLoginID({ required: true, value: loginID });
      const validationUsersLoginPasswordObj = validationUsersLoginPassword({ required: true, value: loginPassword, loginID: loginID });
      const validationUsersLoginPasswordConfirmationObj = validationUsersLoginPasswordConfirmation({ required: true, value: loginPasswordConfirmation, loginPassword: loginPassword });
      // throw new Error('テストエラー');
      
      // ---------------------------------------------
      //   Validation Error
      // ---------------------------------------------
      
      if (
        validationUsersLoginIDObj.error ||
        validationUsersLoginPasswordObj.error ||
        validationUsersLoginPasswordConfirmationObj.error
      ) {
        throw new CustomError({ errorsArr: [{ code: 'G22F0axr0', messageCode: 'uwHIKBy7c' }] });
      }
      
      
      
      // console.log(chalk`
      //   loginID: {green ${loginID}}
      //   loginPassword: {green ${loginPassword}}
      // `);
      
      // console.log(`\n---------- validationUsersLoginIDObj ----------\n`);
      // console.dir(JSON.parse(JSON.stringify(validationUsersLoginIDObj)));
      // console.log(`\n-----------------------------------\n`);
      
      // console.log(`\n---------- validationUsersLoginPasswordObj ----------\n`);
      // console.dir(JSON.parse(JSON.stringify(validationUsersLoginPasswordObj)));
      // console.log(`\n-----------------------------------\n`);
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      let formData = new FormData();
      
      formData.append('loginID', loginID);
      formData.append('loginPassword', loginPassword);
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v1/users/edit-account`,
        methodType: 'POST',
        formData: formData
      });
      
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      // ---------------------------------------------
      //   Form Reset
      // ---------------------------------------------
      
      lodashSet(this.dataObj, 'loginPassword', '');
      lodashSet(this.dataObj, 'loginPasswordConfirmation', '');
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        message: storeData.intl.formatMessage({ id: 'nhn2yers2' }),
      });
      
      
    } catch (errorObj) {
      
      
      // console.log(`\n---------- errorObj.errorsArr ----------\n`);
      // console.dir(errorObj.errorsArr);
      // console.log(`\n-----------------------------------\n`);
      
      // console.log(chalk`
      //   errorObj.messageCode: {green ${errorObj.messageCode}}
      //   errorObj.errorCode: {green ${errorObj.errorCode}}
      // `);
      
      // console.log(errorObj.message); //bazMessage
      // console.log(errorObj.stack); //stacktrace
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        message: returnErrorMessage({ intl: storeData.intl, localeObj: storeData.localeObj, errorObj }),
      });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonEnable({ _id: 'editAccount' });
      
      
      // ---------------------------------------------
      //   Loading 非表示
      // ---------------------------------------------
      
      storeLayout.handleLoadingHide({});
      
      
    }
    
    
  };
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStorePlayerSettings(argumentsObj, storeInstanceObj) {
  
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
    
    if (storeLoginAccount === null) {
      storeLoginAccount = new Store();
    }
    
    return storeLoginAccount;
    
  }
  
}