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

const { validationUsersLoginID } = require('../../../@database/users/validations/login-id');
const { validationUsersEmail } = require('../../../@database/users/validations/email');


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
      
      const resetPasswordLoginID = lodashGet(this.dataObj, ['resetPasswordLoginID'], '');
      const resetPasswordEmail = lodashGet(this.dataObj, ['resetPasswordEmail'], '');
      const recaptchaResponse = lodashGet(this.dataObj, ['recaptchaResponse'], '');
      
      
      
      
      // ---------------------------------------------
      //   Validation
      // ---------------------------------------------
      
      const validationUsersLoginIDObj = validationUsersLoginID({ value: resetPasswordLoginID });
      const validationUsersEmailObj = validationUsersEmail({ value: resetPasswordEmail });
      
      
      // ---------------------------------------------
      //   Validation Error
      // ---------------------------------------------
      
      if (
        
        validationUsersLoginIDObj.error ||
        validationUsersEmailObj.error
        
      ) {
        
        throw new CustomError({ errorsArr: [{ code: 'hoxenGFSj', messageID: 'uwHIKBy7c' }] });
        
      }
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      console.log(`
        ----------------------------------------\n
        /app/login/reset-password/stores/store.js - handleResetPassword
      `);
      
      console.log(chalk`
        resetPasswordLoginID: {green ${resetPasswordLoginID}}
        resetPasswordEmail: {green ${resetPasswordEmail}}
        recaptchaResponse: {green ${recaptchaResponse}}
      `);
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        loginID: resetPasswordLoginID,
        email: resetPasswordEmail,
        response: recaptchaResponse,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/db/email-confirmations/reset-password`,
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
      
      // lodashSet(this.dataObj, 'resetPasswordLoginID', '');
      // lodashSet(this.dataObj, 'resetPasswordEmail', '');
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: 'WTynPDVob',
      });
      
      
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

export default function initStoreConfirmResetPassword({}) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeConfirmResetPassword === null) {
    storeConfirmResetPassword = new Store();
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeConfirmResetPassword;
  
  
}