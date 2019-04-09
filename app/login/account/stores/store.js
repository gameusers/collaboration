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


// ---------------------------------------------
//   Format
// ---------------------------------------------

import { errorsArrIntoErrorMessage } from '../../../@format/error';


// ---------------------------------------------
//   Validation
// ---------------------------------------------

const { validationUsersLoginID } = require('../../../@database/users/validations/login-id');
const { validationUsersLoginPassword } = require('../../../@database/users/validations/login-password');
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
  handleRecaptchaReset({ formType }) {
    
    
    // ---------------------------------------------
    //   Loading 表示
    // ---------------------------------------------
    
    storeLayout.handleLoadingShow({ left: true });
    
    
    // ---------------------------------------------
    //   Button Disable
    // ---------------------------------------------
    
    storeLayout.handleButtonDisable({ _id: formType });
    
    
    // ---------------------------------------------
    //   Button Submitted
    // ---------------------------------------------
    
    lodashSet(this.dataObj, ['formType'], formType);
    
    
    // ---------------------------------------------
    //   reCAPTCHA Reset
    // ---------------------------------------------
    
    const recaptchaRef = lodashGet(this.dataObj, ['recaptchaRef'], '');
    recaptchaRef.execute();
    
    
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
  async handleCreateAccount() {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Form Type Reset
      // ---------------------------------------------
      
      lodashSet(this.dataObj, ['formType'], '');
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const createAccountLoginID = lodashGet(this.dataObj, ['createAccountLoginID'], '');
      const createAccountLoginPassword = lodashGet(this.dataObj, ['createAccountLoginPassword'], '');
      const createAccountEmail = lodashGet(this.dataObj, ['createAccountEmail'], '');
      const createAccountTermsOfService = lodashGet(this.dataObj, ['createAccountTermsOfService'], false);
      const recaptchaResponse = lodashGet(this.dataObj, ['recaptchaResponse'], '');
      
      
      // ---------------------------------------------
      //   利用規約のチェック
      // ---------------------------------------------
      
      if (createAccountTermsOfService === false) {
        throw new Error('利用規約に同意してください');
      }
      
      
      // ---------------------------------------------
      //   Validation
      // ---------------------------------------------
      
      const validationUsersLoginIDObj = validationUsersLoginID({ required: true, value: createAccountLoginID });
      const validationUsersLoginPasswordObj = validationUsersLoginPassword({ required: true, value: createAccountLoginPassword, loginID: createAccountLoginID });
      const validationUsersEmailObj = validationUsersEmail({ value: createAccountEmail });
      
      
      // ---------------------------------------------
      //   Validation Error
      // ---------------------------------------------
      
      if (validationUsersLoginIDObj.error || validationUsersLoginPasswordObj.error || validationUsersEmailObj.error) {
        throw new Error('フォームの入力内容に問題があります');
      }
      
      
      
      console.log(chalk`
        \n---------- handleCreateAccount ----------\n
        createAccountLoginID: {green ${createAccountLoginID}}
        createAccountLoginPassword: {green ${createAccountLoginPassword}}
        createAccountEmail: {green ${createAccountEmail}}
        recaptchaResponse: {green ${recaptchaResponse}}
      `);
      
      console.log(`\n---------- validationUsersLoginIDObj ----------\n`);
      console.dir(JSON.parse(JSON.stringify(validationUsersLoginIDObj)));
      console.log(`\n-----------------------------------\n`);
      
      console.log(`\n---------- validationUsersLoginPasswordObj ----------\n`);
      console.dir(JSON.parse(JSON.stringify(validationUsersLoginPasswordObj)));
      console.log(`\n-----------------------------------\n`);
      
      console.log(`\n---------- validationUsersEmailObj ----------\n`);
      console.dir(JSON.parse(JSON.stringify(validationUsersEmailObj)));
      console.log(`\n-----------------------------------\n`);
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formData = new FormData();
      
      formData.append('loginID', createAccountLoginID);
      formData.append('loginPassword', createAccountLoginPassword);
      formData.append('email', createAccountEmail);
      formData.append('response', recaptchaResponse);
      
      
      // // ---------------------------------------------
      // //   Fetch
      // // ---------------------------------------------
      
      // const resultObj = await fetchWrapper({
      //   urlApi: `${process.env.URL_API}/v1/login`,
      //   methodType: 'POST',
      //   formData: formData
      // });
      
      
      // // console.log(`
      // //   ----- resultObj -----\n
      // //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      // //   --------------------\n
      // // `);
      
      
      // // ---------------------------------------------
      // //   Error
      // // ---------------------------------------------
      
      // if ('errorsArr' in resultObj) {
      //   throw new Error(errorsArrIntoErrorMessage(resultObj.errorsArr));
      // }
      
      
      // // ---------------------------------------------
      // //   Form Reset
      // // ---------------------------------------------
      
      // lodashSet(this.dataObj, 'loginID', '');
      // lodashSet(this.dataObj, 'loginPassword', '');
      
      
      // // ---------------------------------------------
      // //   Snackbar: Success
      // // ---------------------------------------------
      
      // storeLayout.handleSnackbarOpen('success', 'ログインしました');
      
      
      // // ---------------------------------------------
      // //   Page Transition
      // // ---------------------------------------------
      
      // const playerID = lodashGet(resultObj, ['data', 'playerID'], '');
      // window.location.href = `${process.env.URL_BASE}pl/${playerID}`;
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen('error', errorObj.message);
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      storeLayout.handleButtonEnable({ _id: 'createAccount' });
      
      
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

export default function initStoreLoginAccount(argumentsObj, storeInstanceObj) {
  
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