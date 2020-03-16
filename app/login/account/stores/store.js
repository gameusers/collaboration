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
const { validationUsersLoginPassword, validationUsersLoginPasswordConfirmation } = require('../../../@database/users/validations/login-password');
const { validationUsersEmail } = require('../../../@database/users/validations/email');


// --------------------------------------------------
//   Stores
// --------------------------------------------------

import initStoreLayout from '../../../common/layout/stores/layout';




// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeLoginAccount = null;
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
  //   Create Account
  // ---------------------------------------------
  
  /**
   * パスワード入力フォームの目のマークを押したときに呼び出される
   * 押すと隠されているログインパスワードを表示する
   */
  @action.bound
  handlePasswordShow() {
    this.dataObj['createAccountLoginPasswordShow'] = !this.dataObj['createAccountLoginPasswordShow'];
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
    this.dataObj['createAccountLoginPasswordConfirmationShow'] = !this.dataObj['createAccountLoginPasswordConfirmationShow'];
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
    
    storeLayout.handleButtonDisable({ pathArr: ['formCreateAccount'] });
    
    
    
    
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
    
    if (formType === 'createAccount' && response) {
      this.handleCreateAccount();
    }
    
    
  };
  
  
  
  
  /**
   * アカウント作成フォームを送信する
   */
  @action.bound
  async handleCreateAccount({ eventObj }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   フォームの送信処理停止
      // ---------------------------------------------
      
      if (eventObj) {
        eventObj.preventDefault();
      }
      
      
      
      
      // ---------------------------------------------
      //   Form Type Reset
      // ---------------------------------------------
      
      lodashSet(this.dataObj, ['formType'], '');
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const createAccountLoginID = lodashGet(this.dataObj, ['createAccountLoginID'], '');
      const createAccountLoginPassword = lodashGet(this.dataObj, ['createAccountLoginPassword'], '');
      const createAccountLoginPasswordConfirmation = lodashGet(this.dataObj, ['createAccountLoginPasswordConfirmation'], '');
      const createAccountEmail = lodashGet(this.dataObj, ['createAccountEmail'], '');
      const createAccountTermsOfService = lodashGet(this.dataObj, ['createAccountTermsOfService'], false);
      const recaptchaResponse = lodashGet(this.dataObj, ['recaptchaResponse'], '');
      
      
      
      
      // ---------------------------------------------
      //   利用規約のチェック
      // ---------------------------------------------
      
      if (createAccountTermsOfService === false) {
        throw new CustomError({ errorsArr: [{ code: 'qES1fpB_e', messageID: 'Gn_vVgSFY' }] });
      }
      
      
      
      
      // ---------------------------------------------
      //   Validation
      // ---------------------------------------------
      
      const validationUsersLoginIDObj = validationUsersLoginID({ required: true, value: createAccountLoginID });
      const validationUsersLoginPasswordObj = validationUsersLoginPassword({ required: true, value: createAccountLoginPassword, loginID: createAccountLoginID });
      const validationUsersLoginPasswordConfirmationObj = validationUsersLoginPasswordConfirmation({ required: true, value: createAccountLoginPasswordConfirmation, loginPassword: createAccountLoginPassword });
      const validationUsersEmailObj = validationUsersEmail({ value: createAccountEmail });
      
      
      // ---------------------------------------------
      //   Validation Error
      // ---------------------------------------------
      
      if (
        
        validationUsersLoginIDObj.error ||
        validationUsersLoginPasswordObj.error ||
        validationUsersLoginPasswordConfirmationObj.error ||
        validationUsersEmailObj.error
        
      ) {
        
        throw new CustomError({ errorsArr: [{ code: 'UN26lgIXU', messageID: 'uwHIKBy7c' }] });
        
      }
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/login/account/stores/store.js - handleCreateAccount
      // `);
      
      // console.log(chalk`
      //   createAccountLoginID: {green ${createAccountLoginID}}
      //   createAccountLoginPassword: {green ${createAccountLoginPassword}}
      //   createAccountEmail: {green ${createAccountEmail}}
      //   recaptchaResponse: {green ${recaptchaResponse}}
      // `);
      
      
      
      
      // ---------------------------------------------
      //   FormData - Create Account
      // ---------------------------------------------
      
      const formDataObj = {
        
        loginID: createAccountLoginID,
        loginPassword: createAccountLoginPassword,
        email: createAccountEmail,
        response: recaptchaResponse,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch - Create Account
      // ---------------------------------------------
      
      let resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/db/users/upsert-create-account`,
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
      
      lodashSet(this.dataObj, 'createAccountLoginID', '');
      lodashSet(this.dataObj, 'createAccountLoginPassword', '');
      lodashSet(this.dataObj, 'createAccountLoginPasswordConfirmation', '');
      lodashSet(this.dataObj, 'createAccountEmail', '');
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'success',
        messageID: 'Jje25z6lV',
      });
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formData = new FormData();
      
      formData.append('loginID', createAccountLoginID);
      formData.append('loginPassword', createAccountLoginPassword);
      formData.append('response', recaptchaResponse);
      
      
      // ---------------------------------------------
      //   Fetch - Login
      // ---------------------------------------------
      
      resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v1/login/login`,
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
      window.location.href = `${process.env.URL_BASE}ur/${userID}`;
      
      
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
      
      storeLayout.handleButtonEnable({ pathArr: ['formCreateAccount'] });
      
      
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

export default function initStoreLoginAccount({}) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeLoginAccount === null) {
    storeLoginAccount = new Store();
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeLoginAccount;
  
  
}