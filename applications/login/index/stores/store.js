// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';
import zxcvbn from 'zxcvbn';


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
   * ログインID　エラー（バリデーション用）
   * @type {string}
   */
  @observable loginIdError = false;
  
  
  /**
   * ログインID入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleLoginId(event) {
    
    if (event.target.value.match(/^[\w\-]{3,32}$/)) {
      
      this.loginId = event.target.value;
      this.loginIdError = false;
      
    } else if (event.target.value.length <= 32) {
      
      this.loginId = event.target.value;
      this.loginIdError = true;
      
    }
    
  };
  
  
  
  /**
   * ログインパスワード
   * @type {string}
   */
  @observable loginPassword = '';
  
  /**
   * ログインパスワード　エラー（バリデーション用）
   * @type {string}
   */
  @observable loginPasswordError = false;
  
  
  /**
   * ログインパスワード入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleLoginPassword(event) {
    
    if (event.target.value.match(/^[\w\-]{8,32}$/)) {
      
      this.loginPassword = event.target.value;
      this.loginPasswordError = false;
      
    } else if (event.target.value.length <= 32) {
      
      this.loginPassword = event.target.value;
      this.loginPasswordError = true;
      
    }
    
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
    
    if (!this.loginId || this.loginIdError) {
      storeLayout.handleSnackbarOpen('error', 'IDの入力内容に問題があります。');
      return;
    }
    
    if (!this.loginPassword || this.loginPasswordError) {
      storeLayout.handleSnackbarOpen('error', 'パスワードの入力内容に問題があります。');
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
   * アカウント作成 ID　エラー（バリデーション用）
   * @type {string}
   */
  @observable createAccountIdError = false;
  
  /**
   * アカウント作成 ID入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleCreateAccountId(event) {
    
    if (event.target.value.match(/^[\w\-]{3,32}$/)) {
      
      this.createAccountId = event.target.value;
      this.createAccountIdError = false;
      
    } else if (event.target.value.length <= 32) {
      
      this.createAccountId = event.target.value;
      this.createAccountIdError = true;
      
    }
    
  };
  
  
  
  /**
   * アカウント作成パスワード
   * @type {string}
   */
  @observable createAccountPassword = '';
  
  /**
   * アカウント作成パスワード強度
   * @type {number}
   */
  @observable createAccountPasswordScore = 0;
  
  /**
   * アカウント作成パスワード　エラー（バリデーション用）
   * @type {string}
   */
  @observable createAccountPasswordError = false;
  
  /**
   * アカウント作成パスワード入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleCreateAccountPassword(event) {
    
    const score = zxcvbn(event.target.value).score;
    
    // console.log(`zxcvbn = ${zxcvbn(event.target.value).score}`);
    
    if (event.target.value.match(/^[\w\-]{8,32}$/) && score >= 2) {
      
      this.createAccountPassword = event.target.value;
      this.createAccountPasswordScore = score;
      this.createAccountPasswordError = false;
      
    } else if (event.target.value.length <= 32) {
      
      this.createAccountPassword = event.target.value;
      this.createAccountPasswordScore = score;
      this.createAccountPasswordError = true;
      
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
   * アカウント作成パスワード確認　エラー（バリデーション用）
   * @type {string}
   */
  @observable createAccountPasswordConfirmationError = false;
  
  /**
   * アカウント作成パスワード確認入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleCreateAccountPasswordConfirmation(event) {
    
    if (event.target.value.match(/^[\w\-]{6,32}$/) && this.createAccountPassword === event.target.value) {
      
      this.createAccountPasswordConfirmation = event.target.value;
      this.createAccountPasswordConfirmationError = false;
      
    } else if (event.target.value.length <= 32) {
      
      this.createAccountPasswordConfirmation = event.target.value;
      this.createAccountPasswordConfirmationError = true;
      
    }
    
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
    
    if (!this.createAccountId || this.createAccountIdError) {
      storeLayout.handleSnackbarOpen('error', 'IDの入力内容に問題があります。');
      return;
    }
    
    if (!this.createAccountPassword || this.createAccountPasswordError) {
      storeLayout.handleSnackbarOpen('error', 'パスワードの入力内容に問題があります。');
      return;
    }
    
    if (!this.createAccountPasswordConfirmation || this.createAccountPasswordErrorConfirmationError) {
      storeLayout.handleSnackbarOpen('error', 'パスワード確認の入力内容に問題があります。');
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