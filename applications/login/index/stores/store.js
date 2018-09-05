// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';
// import zxcvbn from 'zxcvbn';

import {validationId, validationPassword, validationPasswordConfirmation } from '../../../../applications/common/validations/common';


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
  @observable loginId = '';
  
  /**
   * ログインID　文字数
   * @type {number}
   */
  @observable loginIdNumberOfCharacters = 0;
  
  /**
   * ログインID　エラー（バリデーション用）
   * @type {string}
   */
  @observable loginIdError = false;
  
  /**
   * ログインID　エラーメッセージ
   * @type {string}
   */
  @observable loginIdErrorMessage = '';
  
  
  /**
   * ログインID入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleLoginId(event) {
    
    const resultObj = validationId(event.target.value);
    
    this.loginId = resultObj.value;
    this.loginIdNumberOfCharacters = resultObj.numberOfCharacters;
    this.loginIdError = resultObj.error;
    this.loginIdErrorMessage = resultObj.errorMessageArr[0];
    
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
    
    const resultObj = validationPassword(event.target.value);
    
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
   * ログインフォームで送信ボタンを押すと呼び出される
   */
  @action.bound
  handleLoginSubmit() {
    
    
    // ---------------------------------------------
    //  Console 出力
    // ---------------------------------------------
    
    console.log(`\n\n`);
    console.log(`--- handleLoginSubmit ---`);
    console.log(`this.loginId = ${this.loginId}`);
    console.log(`this.loginPassword = ${this.loginPassword}`);
    console.log(`\n\n`);
    
    
    // ---------------------------------------------
    //  Error
    // ---------------------------------------------
    
    if (
      this.loginId === '' ||
      this.loginPassword === '' ||
      this.loginIdError ||
      this.loginPasswordError
    ) {
      
      storeLayout.handleSnackbarOpen('error', 'フォームの入力内容に問題があります。');
      return;
      
    }
    
  };
  
  
  
  
  // ---------------------------------------------
  //   Create Account
  // ---------------------------------------------
  
  /**
   * アカウント作成 ID
   * @type {string}
   */
  @observable createAccountId = '';
  
  /**
   * アカウント作成 ID　文字数
   * @type {number}
   */
  @observable createAccountIdNumberOfCharacters = 0;
  
  /**
   * アカウント作成 ID　エラー（バリデーション用）
   * @type {string}
   */
  @observable createAccountIdError = false;
  
  /**
   * アカウント作成 ID　エラーメッセージ
   * @type {string}
   */
  @observable createAccountIdErrorMessage = '';
  
  /**
   * アカウント作成 ID入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleCreateAccountId(event) {
    
    
    // ---------------------------------------------
    //   ID
    // ---------------------------------------------
    
    const resultIdObj = validationId(event.target.value);
    
    this.createAccountId = resultIdObj.value;
    this.createAccountIdNumberOfCharacters = resultIdObj.numberOfCharacters;
    this.createAccountIdError = resultIdObj.error;
    this.createAccountIdErrorMessage = resultIdObj.errorMessageArr[0];
    
    
    // ---------------------------------------------
    //   Password
    // ---------------------------------------------
    
    if (this.createAccountPassword !== '') {
      
      const resultPasswordObj = validationPassword(this.createAccountPassword, resultIdObj.value);
      
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
    
    const resultPasswordObj = validationPassword(event.target.value, this.createAccountId);
    
    this.createAccountPassword = resultPasswordObj.value;
    this.createAccountPasswordNumberOfCharacters = resultPasswordObj.numberOfCharacters;
    this.createAccountPasswordStrengthScore = resultPasswordObj.strengthScore;
    this.createAccountPasswordError = resultPasswordObj.error;
    this.createAccountPasswordErrorMessage = resultPasswordObj.errorMessageArr[0];
    
    
    // ---------------------------------------------
    //   Password Confirmation
    // ---------------------------------------------
    
    if (this.createAccountPasswordConfirmation !== '') {
      
      const resultConfirmationObj = validationPasswordConfirmation(this.createAccountPasswordConfirmation, resultPasswordObj.value);
      
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
    
    const resultObj = validationPasswordConfirmation(event.target.value, this.createAccountPassword);
    
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
   * アカウント作成フォーム　利用規約に同意するチェック情報
   * 同意する true / 同意しない false
   * @type {boolean}
   */
  @observable createAccountTermsOfService = false;
  
  /**
   * アカウント作成パスワード確認　エラーメッセージ
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
   * アカウント作成フォームで送信ボタンを押すと呼び出される
   */
  @action.bound
  handleCreateAccountSubmit() {
    
    
    // ---------------------------------------------
    //  Console 出力
    // ---------------------------------------------
    
    console.log(`\n\n`);
    console.log(`--- handleCreateAccountSubmit ---`);
    console.log(`this.createAccountId = ${this.createAccountId}`);
    console.log(`this.createAccountPassword = ${this.createAccountPassword}`);
    console.log(`\n\n`);
    
    
    
    // ---------------------------------------------
    //  Error
    // ---------------------------------------------
    
    if (
      this.createAccountId === '' ||
      this.createAccountPassword === '' ||
      this.createAccountPasswordConfirmation === '' ||
      this.createAccountIdError ||
      this.createAccountPasswordError || 
      this.createAccountPasswordConfirmationError
    ) {
      
      storeLayout.handleSnackbarOpen('error', 'フォームの入力内容に問題があります。');
      return;
      
    } else if (this.createAccountTermsOfServiceErrorMessage) {
      
      storeLayout.handleSnackbarOpen('error', this.createAccountTermsOfServiceErrorMessage);
      return;
      
    }
    
  };
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreLoginIndex(argumentsObj) {
  
  const isServer = argumentsObj.isServer;
  const storeInstanceObj = argumentsObj.storeInstanceObj;
  
  
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