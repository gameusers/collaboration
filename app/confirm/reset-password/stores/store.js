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
import lodashHas from 'lodash/has';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../../@modules/fetch';
import { CustomError } from '../../../@modules/error/custom';


// ---------------------------------------------
//   Validation
// ---------------------------------------------

import { validationUsersLoginID } from '../../../@database/users/validations/login-id';
import { validationUsersLoginPassword, validationUsersLoginPasswordConfirmation } from '../../../../app/@database/users/validations/login-password';


// --------------------------------------------------
//   Stores
// --------------------------------------------------

import initStoreLayout from '../../../common/layout/stores/layout';




// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeConfirmResetPassword = null;
let storeLayout = initStoreLayout({});




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
  //   Password
  // ---------------------------------------------
  
  /**
   * パスワード入力フォームの目のマークを押したときに呼び出される
   * 押すと隠されているログインパスワードを表示する
   */
  @action.bound
  handlePasswordShow() {
    this.dataObj['resetPasswordLoginPasswordShow'] = !this.dataObj['resetPasswordLoginPasswordShow'];
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
    this.dataObj['resetPasswordLoginPasswordConfirmationShow'] = !this.dataObj['resetPasswordLoginPasswordConfirmationShow'];
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
   * フォームの送信ボタンを押すと呼び出される。reCAPTCHA をリセットしてトークンを取得する。
   * @param {string} type - フォームのタイプ
   */
  @action.bound
  handleRecaptchaReset({ eventObj, formType }) {
    
    
    // ---------------------------------------------
    //   フォームの送信処理停止
    // ---------------------------------------------
    
    eventObj.preventDefault();
    
    
    
    
    // ---------------------------------------------
    //   Loading 表示
    // ---------------------------------------------
    
    storeLayout.handleLoadingShow({ left: true });
    
    
    // ---------------------------------------------
    //   Button Disable
    // ---------------------------------------------
    
    storeLayout.handleButtonDisable({ pathArr: ['formResetPassword'] });
    
    
    
    
    // ---------------------------------------------
    //   Button Submitted
    // ---------------------------------------------
    
    lodashSet(this.dataObj, ['formType'], formType);
    
    
    // ---------------------------------------------
    //   reCAPTCHA Reset
    // ---------------------------------------------
    
    const recaptchaRef = lodashGet(this.dataObj, ['recaptchaRef'], '');
    
    if (recaptchaRef) {
      recaptchaRef.execute();
    }
    
    
  }
  
  
  
  
  /**
   * reCAPTCHA のトークンが取得できたら、フォームを送信する
   * @param {string} recaptchaResponse - トークン
   * @param {Object} ref - <ReCaptcha /> このタグの ref
   */
  @action.bound
  handleRecaptchaResponse({ response, ref }) {
    
    
    // ---------------------------------------------
    //   Set ReCAPTCHA
    // ---------------------------------------------
    
    lodashSet(this.dataObj, ['recaptchaResponse'], response);
    lodashSet(this.dataObj, ['recaptchaRef'], ref);
    
    
    // ---------------------------------------------
    //   Send Form
    // ---------------------------------------------
    
    const formType = lodashGet(this.dataObj, ['formType'], '');
    
    if (formType === 'resetPassword' && response) {
      this.handleResetPassword();
    }
    
    
  };
  
  
  
  
  /**
   * パスワードリセットフォームを送信する
   */
  @action.bound
  async handleResetPassword() {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Form Type Reset
      // ---------------------------------------------
      
      lodashSet(this.dataObj, ['formType'], '');
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const emailConfirmationID = lodashGet(this.dataObj, ['emailConfirmationID'], '');
      const resetPasswordLoginID = lodashGet(this.dataObj, ['resetPasswordLoginID'], '');
      const resetPasswordLoginPassword = lodashGet(this.dataObj, ['resetPasswordLoginPassword'], '');
      const resetPasswordLoginPasswordConfirmation = lodashGet(this.dataObj, ['resetPasswordLoginPasswordConfirmation'], '');
      const recaptchaResponse = lodashGet(this.dataObj, ['recaptchaResponse'], '');
      
      
      
      
      // ---------------------------------------------
      //   Validation
      // ---------------------------------------------
      
      const validationUsersLoginIDObj = validationUsersLoginID({ required: true, value: resetPasswordLoginID });
      const validationUsersLoginPasswordObj = validationUsersLoginPassword({ required: true, value: resetPasswordLoginPassword, loginID: resetPasswordLoginID });
      const validationUsersLoginPasswordConfirmationObj = validationUsersLoginPasswordConfirmation({ required: true, value: resetPasswordLoginPasswordConfirmation, loginPassword: resetPasswordLoginPassword });
      
      
      // ---------------------------------------------
      //   Validation Error
      // ---------------------------------------------
      
      if (
        
        validationUsersLoginIDObj.error ||
        validationUsersLoginPasswordObj.error ||
        validationUsersLoginPasswordConfirmationObj.error
        
      ) {
        
        throw new CustomError({ errorsArr: [{ code: 'qopQI5Buk', messageID: 'uwHIKBy7c' }] });
        
      }
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/login/reset-password/stores/store.js - handleResetPassword
      // `);
      
      // console.log(chalk`
      //   emailConfirmationID: {green ${emailConfirmationID}}
      //   resetPasswordLoginID: {green ${resetPasswordLoginID}}
      //   resetPasswordLoginPassword: {green ${resetPasswordLoginPassword}}
      //   resetPasswordLoginPasswordConfirmation: {green ${resetPasswordLoginPasswordConfirmation}}
      //   recaptchaResponse: {green ${recaptchaResponse}}
      // `);
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        emailConfirmationID,
        loginID: resetPasswordLoginID,
        loginPassword: resetPasswordLoginPassword,
        response: recaptchaResponse,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = await fetchWrapper({
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/users/upsert-reset-password`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj)
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
      
      lodashSet(this.dataObj, 'resetPasswordLoginID', '');
      lodashSet(this.dataObj, 'resetPasswordLoginPassword', '');
      lodashSet(this.dataObj, 'resetPasswordLoginPasswordConfirmation', '');
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: 'PFM5HPcyd',
      });
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formData = new FormData();
      
      formData.append('loginID', resetPasswordLoginID);
      formData.append('loginPassword', resetPasswordLoginPassword);
      formData.append('response', recaptchaResponse);
      
      
      // ---------------------------------------------
      //   Fetch - Login
      // ---------------------------------------------
      
      resultObj = await fetchWrapper({
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v1/login/login`,
        methodType: 'POST',
        formData: formData,
      });
      
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      // ---------------------------------------------
      //   Page Transition
      // ---------------------------------------------
      
      const userID = lodashGet(resultObj, ['data', 'userID'], '');
      window.location.href = `${process.env.NEXT_PUBLIC_URL_BASE}ur/${userID}`;
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        errorObj,
      });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonEnable({ pathArr: ['formResetPassword'] });
      
      
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

export default function initStoreConfirmResetPassword({ propsObj }) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeConfirmResetPassword === null) {
    storeConfirmResetPassword = new Store();
  }
  
  
  // --------------------------------------------------
  //   Props
  // --------------------------------------------------
  
  if (propsObj) {
    
    
    // --------------------------------------------------
    //   pathArr
    // --------------------------------------------------
    
    // const pathArr = lodashGet(propsObj, ['pathArr'], []);
    
    
    // --------------------------------------------------
    //   emailConfirmationID
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['emailConfirmationID'])) {
      lodashSet(storeConfirmResetPassword, ['dataObj', 'emailConfirmationID'], propsObj.emailConfirmationID);
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   userCommunities_id: {green ${userCommunities_id}}
    // `);
    
    // console.log(`
    //   ----- propsObj -----\n
    //   ${util.inspect(propsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeConfirmResetPassword;
  
  
}