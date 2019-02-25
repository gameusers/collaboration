// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import { action, observable } from 'mobx';
import fetch from 'isomorphic-unfetch';


// ---------------------------------------------
//   Validation
// ---------------------------------------------

const validationLoginID = require('../../../@database/users/validations/login-id');
const { validationLoginPassword, validationLoginPasswordConfirmation } = require('../../../@database/users/validations/login-password');
const validationEmail = require('../../../@database/users/validations/email');





// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeLoginIndex = null;
let storeLayout = null;
let storeData = null;





// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   Constructor
  // ---------------------------------------------
  
  constructor() {
    
    this.idMinLength = 3;
    this.idMaxLength = 32;
    this.passwordMinLength = 8;
    this.passwordMaxLength = 32;
    
  }
  
  
  // ---------------------------------------------
  //   Login - ID & Password
  // ---------------------------------------------
  
  /**
   * ログインID
   * @type {string}
   */
  @observable loginID = '';
  
  /**
   * ログインID　文字数
   * @type {number}
   */
  @observable loginIDNumberOfCharacters = 0;
  
  /**
   * ログインID　エラー（バリデーション用）
   * @type {string}
   */
  @observable loginIDError = false;
  
  /**
   * ログインID　エラーメッセージ
   * @type {string}
   */
  @observable loginIDErrorMessage = '';
  
  
  /**
   * ログインID入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleLoginID(event) {
    
    const resultObj = validationLoginID(event.target.value);
    
    this.loginID = resultObj.value;
    this.loginIDNumberOfCharacters = resultObj.numberOfCharacters;
    this.loginIDError = resultObj.error;
    this.loginIDErrorMessage = resultObj.errorMessageArr[0];
    
  };
  
  
  
  /**
   * ログインパスワード
   * @type {string}
   */
  @observable loginPassword = '';
  
  /**
   * ログインパスワード　文字数
   * @type {number}
   */
  @observable loginPasswordNumberOfCharacters = 0;
  
  /**
   * ログインパスワード　エラー（バリデーション用）
   * @type {string}
   */
  @observable loginPasswordError = false;
  
   /**
   * ログインパスワード　エラーメッセージ
   * @type {string}
   */
  @observable loginPasswordErrorMessage = '';
  
  
  /**
   * ログインパスワード入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleLoginPassword(event) {
    
    const resultObj = validationLoginPassword(event.target.value);
    
    this.loginPassword = resultObj.value;
    this.loginPasswordNumberOfCharacters = resultObj.numberOfCharacters;
    this.loginPasswordError = resultObj.error;
    this.loginPasswordErrorMessage = resultObj.errorMessageArr[0];
    
  };
  
  
  /**
   * 隠されているログインパスワードを表示するか
   * 表示する true / 表示しない false
   * @type {boolean}
   */
  @observable loginPasswordShow = false;

  /**
   * ログインパスワード入力フォームの目のマークを押したときに呼び出される
   * 押すと隠されているログインパスワードを表示する
   */
  @action.bound
  handleLoginPasswordShow() {
    this.loginPasswordShow = !this.loginPasswordShow;
  };
  
  
  /**
   * ログインパスワード入力フォーム onMouseDown で呼び出される
   * Material UI のページに解説されているとおりに入れている
   * 参考：https://material-ui.com/demos/text-fields/#input-adornments
   * @param {Object} event - イベント
   */
  @action.bound
  handleLoginPasswordMouseDown(event) {
    event.preventDefault();
  };
  
  
  
  
  /**
   * ログイン用 reCAPTCHA のトークン
   * @type {string}
   */
  loginRecaptchaResponse = null;
  
  /**
   * ログイン用 reCAPTCHA のトークンをセットする
   * ReCAPTCHA コンポーネントの onChange で呼び出される
   * @param {string} recaptchaResponse - トークンが入っている
   */
  @action.bound
  handleLoginRecaptchaResponse(recaptchaResponse) {
    
    
    // ---------------------------------------------
    //   Console 出力
    // ---------------------------------------------
    
    console.log(`\n\n`);
    console.log(`--- handleLoginRecaptchaResponse ---`);
    console.log(`recaptchaResponse = ${recaptchaResponse}`);
    console.log(`\n\n`);
    
    
    // ---------------------------------------------
    //   Set ReCAPTCHA Response & Login
    // ---------------------------------------------
    
    if (recaptchaResponse) {
      
      this.loginRecaptchaResponse = recaptchaResponse;
      this.handleLoginSubmit();
      
    } else {
      
      this.loginRecaptchaResponse = '';
      
    }
    
  };
  
  
  
  /**
   * ログインフォームで送信ボタンを押すと呼び出される
   * @param {Object} recaptchaRef - ReCAPTCHA コンポーネントの ref
   */
  @action.bound
  handleLoginSubmit(recaptchaRef = null) {
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(`\n\n`);
    // console.log(`--- handleLoginSubmit ---`);
    // console.log(`this.loginID = ${this.loginID}`);
    // console.log(`this.loginPassword = ${this.loginPassword}`);
    // console.log(`this.loginRecaptchaResponse = ${this.loginRecaptchaResponse}`);
    // console.dir(recaptchaRef);
    // console.log(`\n\n`);
    
    
    // --------------------------------------------------
    //   Error
    // --------------------------------------------------
    
    if (!this.loginRecaptchaResponse && recaptchaRef) {
      
      console.log(`recaptchaRef.current.execute()`);
      // recaptchaRef.current.reset();
      recaptchaRef.current.execute();
      return;
      
    } else if (
      this.loginID === '' ||
      this.loginPassword === '' ||
      this.loginIDError ||
      this.loginPasswordError
    ) {
      
      storeLayout.handleSnackbarOpen('error', 'フォームの入力内容に問題があります。');
      return;
      
    }
    
    
    // --------------------------------------------------
    //   FormData
    // --------------------------------------------------
    
    const formDataObj = new FormData();
    
    formDataObj.append('loginID', this.loginID);
    formDataObj.append('loginPassword', this.loginPassword);
    formDataObj.append('g-recaptcha-response', this.loginRecaptchaResponse);
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Property
    // ---------------------------------------------
    
    let errorObj = {};
    const urlBase = storeData.urlBase;
    const urlApi = `${storeData.urlApi}/v1/login`;
    
    // console.log(chalk`
    //   storeData.urlBase: {green ${storeData.urlBase}}
    // `);
    
    // console.log(`
    //   storeData: \n${util.inspect(storeData, { colors: true, depth: null })}
    // `);
    
    // return;
    
    
    
    fetch(urlApi, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      headers: {
        'Accept': 'application/json'
      },
      body: formDataObj
    })
      .then((response) => {
        
        if (!response.ok) {
          return response.json().then((jsonObj) => {
            errorObj = jsonObj;
        　　throw new Error(errorObj.errorsArr[0].message);
        　});
        }
        
        return response.json();
        
      })
      .then((jsonObj) => {
        
        // console.log(`then`);
        // console.log(`
        //   jsonObj: \n${util.inspect(jsonObj, { colors: true, depth: null })}
        // `);
        
        // Form Reset
        this.handleFormReset();
        
        // Page Transition
        window.location.href = `${urlBase}pl/${jsonObj.playerID}`;
        
      })
      .catch((error) => {
        
        storeLayout.handleSnackbarOpen('error', error);
        return;
        
      });
    
  };
  
  
  
  
  // ---------------------------------------------
  //   Create Account
  // ---------------------------------------------
  
  /**
   * アカウント作成 ID
   * @type {string}
   */
  @observable createAccountID = '';
  
  /**
   * アカウント作成 ID　文字数
   * @type {number}
   */
  @observable createAccountIDNumberOfCharacters = 0;
  
  /**
   * アカウント作成 ID　エラー（バリデーション用）
   * @type {string}
   */
  @observable createAccountIDError = false;
  
  /**
   * アカウント作成 ID　エラーメッセージ
   * @type {string}
   */
  @observable createAccountIDErrorMessage = '';
  
  /**
   * アカウント作成 ID入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleCreateAccountID(event) {
    
    
    // ---------------------------------------------
    //   ID
    // ---------------------------------------------
    
    const resultIDObj = validationLoginID(event.target.value);
    
    this.createAccountID = resultIDObj.value;
    this.createAccountIDNumberOfCharacters = resultIDObj.numberOfCharacters;
    this.createAccountIDError = resultIDObj.error;
    this.createAccountIDErrorMessage = resultIDObj.errorMessageArr[0];
    
    
    // ---------------------------------------------
    //   Password
    // ---------------------------------------------
    
    if (this.createAccountPassword !== '') {
      
      const resultPasswordObj = validationLoginPassword(this.createAccountPassword, resultIDObj.value);
      
      this.createAccountPasswordError = resultPasswordObj.error;
      this.createAccountPasswordErrorMessage = resultPasswordObj.errorMessageArr[0];
      
    }
    
  };
  
  
  
  /**
   * アカウント作成パスワード
   * @type {string}
   */
  @observable createAccountPassword = '';
  
  /**
   * アカウント作成パスワード　文字数
   * @type {number}
   */
  @observable createAccountPasswordNumberOfCharacters = 0;
  
  /**
   * アカウント作成パスワード強度
   * @type {number}
   */
  @observable createAccountPasswordStrengthScore = 0;
  
  /**
   * アカウント作成パスワード　エラー（バリデーション用）
   * @type {string}
   */
  @observable createAccountPasswordError = false;
  
  /**
   * アカウント作成パスワード　エラーメッセージ
   * @type {string}
   */
  @observable createAccountPasswordErrorMessage = '';
  
  /**
   * アカウント作成パスワード入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleCreateAccountPassword(event) {
    
    
    // ---------------------------------------------
    //   Password
    // ---------------------------------------------
    
    const resultPasswordObj = validationLoginPassword(event.target.value, this.createAccountID);
    
    this.createAccountPassword = resultPasswordObj.value;
    this.createAccountPasswordNumberOfCharacters = resultPasswordObj.numberOfCharacters;
    this.createAccountPasswordStrengthScore = resultPasswordObj.strengthScore;
    this.createAccountPasswordError = resultPasswordObj.error;
    this.createAccountPasswordErrorMessage = resultPasswordObj.errorMessageArr[0];
    
    
    // ---------------------------------------------
    //   Password Confirmation
    // ---------------------------------------------
    
    if (this.createAccountPasswordConfirmation !== '') {
      
      const resultConfirmationObj = validationLoginPasswordConfirmation(this.createAccountPasswordConfirmation, resultPasswordObj.value);
      
      this.createAccountPasswordConfirmationError = resultConfirmationObj.error;
      this.createAccountPasswordConfirmationErrorMessage = resultConfirmationObj.errorMessageArr[0];
      
    }
    
  };
  
  
  /**
   * 隠されているアカウント作成パスワードを表示するか
   * 表示する true / 表示しない false
   * @type {boolean}
   */
  @observable createAccountPasswordShow = false;
  
  /**
   * アカウント作成パスワード入力フォームの目のマークを押したときに呼び出される
   * 押すと隠されているアカウント作成パスワードを表示する
   */
  @action.bound
  handleCreateAccountPasswordShow() {
    this.createAccountPasswordShow = !this.createAccountPasswordShow;
  };
  
  
  /**
   * アカウント作成パスワード入力フォーム onMouseDown で呼び出される
   * Material UI のページに解説されているとおりに入れている
   * 参考：https://material-ui.com/demos/text-fields/#input-adornments
   * @param {Object} event - イベント
   */
  @action.bound
  handleCreateAccountPasswordMouseDown(event) {
    event.preventDefault();
  };
  
  
  
  /**
   * アカウント作成パスワード確認
   * @type {string}
   */
  @observable createAccountPasswordConfirmation = '';
  
  /**
   * アカウント作成パスワード確認　文字数
   * @type {number}
   */
  @observable createAccountPasswordConfirmationNumberOfCharacters = 0;
  
  /**
   * アカウント作成パスワード確認　エラー（バリデーション用）
   * @type {string}
   */
  @observable createAccountPasswordConfirmationError = false;
  
  /**
   * アカウント作成パスワード確認　エラーメッセージ
   * @type {string}
   */
  @observable createAccountPasswordConfirmationErrorMessage = '';
  
  /**
   * アカウント作成パスワード確認入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleCreateAccountPasswordConfirmation(event) {
    
    const resultObj = validationLoginPasswordConfirmation(event.target.value, this.createAccountPassword);
    
    this.createAccountPasswordConfirmation = resultObj.value;
    this.createAccountPasswordConfirmationNumberOfCharacters = resultObj.numberOfCharacters;
    this.createAccountPasswordConfirmationError = resultObj.error;
    this.createAccountPasswordConfirmationErrorMessage = resultObj.errorMessageArr[0];
    
  };
  
  
  /**
   * 隠されているアカウント作成パスワード確認を表示するか
   * 表示する true / 表示しない false
   * @type {boolean}
   */
  @observable createAccountPasswordConfirmationShow = false;
  
  /**
   * アカウント作成パスワード確認入力フォームの目のマークを押したときに呼び出される
   * 押すと隠されているアカウント作成パスワードを表示する
   */
  @action.bound
  handleCreateAccountPasswordConfirmationShow() {
    this.createAccountPasswordConfirmationShow = !this.createAccountPasswordConfirmationShow;
  };
  
  
  /**
   * アカウント作成パスワード確認入力フォーム onMouseDown で呼び出される
   * Material UI のページに解説されているとおりに入れている
   * 参考：https://material-ui.com/demos/text-fields/#input-adornments
   * @param {Object} event - イベント
   */
  @action.bound
  handleCreateAccountPasswordConfirmationMouseDown(event) {
    event.preventDefault();
  };
  
  
  
  /**
   * アカウント作成 E-Mail
   * @type {string}
   */
  @observable createAccountEmail = '';
  
  /**
   * アカウント作成 E-Mail　文字数
   * @type {number}
   */
  @observable createAccountEmailNumberOfCharacters = 0;
  
  /**
   * アカウント作成 E-Mail　エラー（バリデーション用）
   * @type {string}
   */
  @observable createAccountEmailError = false;
  
  /**
   * アカウント作成 E-Mail　エラーメッセージ
   * @type {string}
   */
  @observable createAccountEmailErrorMessage = '';
  
  /**
   * アカウント作成 E-Mail入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleCreateAccountEmail(event) {
    
    
    // ---------------------------------------------
    //   ID
    // ---------------------------------------------
    
    const resultIDObj = validationEmail(event.target.value);
    
    this.createAccountEmail = resultIDObj.value;
    this.createAccountEmailNumberOfCharacters = resultIDObj.numberOfCharacters;
    this.createAccountEmailError = resultIDObj.error;
    this.createAccountEmailErrorMessage = resultIDObj.errorMessageArr[0];
    
  };
  
  
  
  /**
   * アカウント作成フォーム　利用規約に同意するチェック情報
   * 同意する true / 同意しない false
   * @type {boolean}
   */
  @observable createAccountTermsOfService = false;
  
  /**
   * アカウント作成フォーム　利用規約　エラーメッセージ
   * @type {string}
   */
  @observable createAccountTermsOfServiceErrorMessage = '利用規約に同意してください。';
  
  /**
   * アカウント作成フォーム　利用規約のチェックボックスを押したときに呼び出される
   */
  @action.bound
  handleCreateAccountTermsOfService() {
    
    const checked = !this.createAccountTermsOfService;
    this.createAccountTermsOfService = checked;
    
    if (checked) {
      this.createAccountTermsOfServiceErrorMessage = '';
    } else {
      this.createAccountTermsOfServiceErrorMessage = '利用規約に同意してください。';
    }
    
  };
  
  
  
  
  
  
  /**
   * アカウント作成用 reCAPTCHA のトークン
   * @type {string}
   */
  createAccountRecaptchaResponse = null;
  
  /**
   * アカウント作成用 reCAPTCHA のトークンをセットする
   * ReCAPTCHA コンポーネントの onChange で呼び出される
   * @param {string} recaptchaResponse - トークンが入っている
   */
  @action.bound
  handleCreateAccountRecaptchaResponse(recaptchaResponse) {
    
    
    // ---------------------------------------------
    //   Console 出力
    // ---------------------------------------------
    
    console.log(`\n\n`);
    console.log(`--- handleCreateAccountRecaptchaResponse ---`);
    console.log(`recaptchaResponse = ${recaptchaResponse}`);
    console.log(`\n\n`);
    
    
    // ---------------------------------------------
    //   Set ReCAPTCHA Response & Create Account
    // ---------------------------------------------
    
    if (recaptchaResponse) {
      
      this.createAccountRecaptchaResponse = recaptchaResponse;
      this.handleCreateAccountSubmit();
      
    } else {
      
      this.createAccountRecaptchaResponse = '';
      
    }
    
  };
  
  
  
  /**
   * アカウント作成フォームで送信ボタンを押すと呼び出される
   * @param {Object} recaptchaRef - ReCAPTCHA コンポーネントの ref
   */
  @action.bound
  handleCreateAccountSubmit(recaptchaRef = null) {
    
    
    // ---------------------------------------------
    //   Console 出力
    // ---------------------------------------------
    
    console.log(`\n\n`);
    console.log(`--- handleCreateAccountSubmit ---`);
    console.log(`this.createAccountID = ${this.createAccountID}`);
    console.log(`this.createAccountPassword = ${this.createAccountPassword}`);
    console.log(`this.createAccountEmail = ${this.createAccountEmail}`);
    console.log(`\n\n`);
    
    
    
    // ---------------------------------------------
    //   Error
    // ---------------------------------------------
    
    if (!this.createAccountRecaptchaResponse && recaptchaRef) {
      
      console.log(`recaptchaRef.current.execute()`);
      recaptchaRef.current.execute();
      return;
      
    } else if (
      this.createAccountID === '' ||
      this.createAccountPassword === '' ||
      this.createAccountPasswordConfirmation === '' ||
      this.createAccountIDError ||
      this.createAccountPasswordError || 
      this.createAccountPasswordConfirmationError ||
      this.createAccountEmailError
    ) {
      
      storeLayout.handleSnackbarOpen('error', 'フォームの入力内容に問題があります。');
      return;
      
    } else if (this.createAccountTermsOfServiceErrorMessage) {
      
      storeLayout.handleSnackbarOpen('error', this.createAccountTermsOfServiceErrorMessage);
      return;
      
    }
    
    
    
    // ---------------------------------------------
    //   FormData
    // ---------------------------------------------
    
    const formDataObj = new FormData();
    
    formDataObj.append('createAccountID', this.createAccountID);
    formDataObj.append('createAccountPassword', this.createAccountPassword);
    formDataObj.append('createAccountEmail', this.createAccountEmail);
    formDataObj.append('g-recaptcha-response', this.loginRecaptchaResponse);
    
    
    
    // ---------------------------------------------
    //   Fetch
    // ---------------------------------------------
    
    let errorObj = {};
    const urlApi = `${storeData.urlApi}/v1/login/create-account`;
    
    
    fetch(urlApi, {
      method: 'POST',
      mode: 'same-origin',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json'
      },
      body: formDataObj
    })
      .then((response) => {
        // if (!response.ok) {
        //   return response.json().then((jsonObj) => {
        // 　　throw new Error(jsonObj.errorsArr[0].message);
        // 　});
        // }
        
        if (!response.ok) {
          return response.json().then((jsonObj) => {
            errorObj = jsonObj;
        　　throw new Error();
        　});
        }
        
        return response.json();
        
      })
      .then((jsonObj) => {
        
        console.log(`then`);
        console.dir(jsonObj);
        
        
        // Form Reset
        this.handleFormReset();
        
        // Page Transition
        window.location.href = `http://dev-1.gameusers.org:8080/pl/${jsonObj.playerID}`;
        
      })
      .catch((error) => {
        
        console.log(`handleCreateAccountSubmit Error Catch: ${error}`);
        
        storeLayout.handleSnackbarOpen('error', errorObj.errorsArr[0].message);
        return;
        
      });
    
    
  };
  
  
  
  /**
   * フォームをリセットする
   */
  handleFormReset() {
    
    
    // ---------------------------------------------
    //   Login
    // ---------------------------------------------
    
    this.loginID = '';
    this.loginIDNumberOfCharacters = 0;
    this.loginIDError = false;
    this.loginIDErrorMessage = '';
    this.loginPassword = '';
    this.loginPasswordNumberOfCharacters = 0;
    this.loginPasswordError = false;
    this.loginPasswordErrorMessage = '';
    
    
    // ---------------------------------------------
    //   Create Account
    // ---------------------------------------------
    
    this.createAccountID = '';
    this.createAccountIDNumberOfCharacters = 0;
    this.createAccountIDError = false;
    this.createAccountIDErrorMessage = '';
    this.createAccountPassword = '';
    this.createAccountPasswordNumberOfCharacters = 0;
    this.createAccountPasswordError = false;
    this.createAccountPasswordErrorMessage = '';
    this.createAccountPasswordConfirmation = '';
    this.createAccountPasswordConfirmationNumberOfCharacters = 0;
    this.createAccountPasswordConfirmationError = false;
    this.createAccountPasswordConfirmationErrorMessage = '';
    this.createAccountEmail = '';
    this.createAccountEmailNumberOfCharacters = 0;
    this.createAccountEmailError = false;
    this.createAccountEmailErrorMessage = '';
    this.createAccountTermsOfService = false;
    
  }
  
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreLoginIndex(argumentsObj, storeInstanceObj) {
  
  const isServer = argumentsObj.isServer;
  // const storeInstanceObj = argumentsObj.storeInstanceObj;
  
  
  // console.log(`
  //   argumentsObj: \n${util.inspect(argumentsObj, { colors: true, depth: null })}
  // `);
  
  
  if ('layout' in storeInstanceObj) {
    storeLayout = storeInstanceObj.layout;
  }
  
  if ('data' in storeInstanceObj) {
    storeData = storeInstanceObj.data;
  }
  
  
  if (isServer) {
    
    return new Store();
    
  } else {
    
    if (storeLoginIndex === null) {
      storeLoginIndex = new Store();
    }
    
    return storeLoginIndex;
    
  }
  
}