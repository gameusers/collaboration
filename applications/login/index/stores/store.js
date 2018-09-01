// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';


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
  //   Login - ID & Password
  // ---------------------------------------------
  
  /**
   * ログインID
   * @type {string}
   */
  @observable loginId = '';
  
  /**
   * ログインID入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleLoginId(event) {
    this.loginId = event.target.value;
  };
  
  
  
  /**
   * ログインパスワード
   * @type {string}
   */
  @observable loginPassword = '';
  
  /**
   * ログインパスワード入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleLoginPassword(event) {
    this.loginPassword = event.target.value;
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
   * アカウント作成 ID入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleCreateAccountId(event) {
    this.createAccountId = event.target.value;
  };
  
  
  
  /**
   * アカウント作成パスワード
   * @type {string}
   */
  @observable createAccountPassword = '';
  
  /**
   * アカウント作成パスワード入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleCreateAccountPassword(event) {
    this.createAccountPassword = event.target.value;
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
   * アカウント作成パスワード確認入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleCreateAccountPasswordConfirmation(event) {
    this.createAccountPasswordConfirmation = event.target.value;
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
   * ログインフォームで送信ボタンを押すと呼び出される
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