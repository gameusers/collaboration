// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';
import zxcvbn from 'zxcvbn';

import { validationId } from '../../../../app/common/validations/common';


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
   * ログインID　エラー（バリデーション用）
   * @type {string}
   */
  @observable loginIdError = false;
  
  /**
   * ログインID　エラーメッセージ
   * @type {string}
   */
  @observable loginIdErrorMessage = 'IDを入力してください。';
  
  
  /**
   * ログインID入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleLoginId(event) {
    
    // const value = event.target.value;
    // const length = event.target.value.length;
    
    
    const resultObj = validationId(event.target.value);
    
    this.loginId = resultObj.value;
    this.loginIdError = resultObj.error;
    this.loginIdErrorMessage = resultObj.errorMessage;
    
    // if (resultObj.error) {
    //   this.loginIdError = true;
    //   this.loginIdErrorMessage = resultObj.errorMessage;
    // }
    
    
    
    // if (length <= this.idMaxLength) {
      
    //   this.loginId = value;
      
    //   if (length === 0) {
        
    //     this.loginIdError = true;
    //     this.loginIdErrorMessage = 'IDを入力してください。';
        
    //   } else if (length < this.idMinLength) {
        
    //     this.loginIdError = true;
    //     this.loginIdErrorMessage = `IDは${this.idMinLength}文字以上、${this.idMaxLength}文字以内です。`;
        
    //   } else if (value.match(/^[\w\-]+$/) === null) {
        
    //     this.loginIdError = true;
    //     this.loginIdErrorMessage = 'IDに入力できるのは半角英数字とハイフン( - )アンダースコア( _ )です。';
        
    //   } else {
        
    //     this.loginIdError = false;
    //     this.loginIdErrorMessage = '';
        
    //   }
      
    // }
    
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
   * ログインパスワード　エラーメッセージ
   * @type {string}
   */
  @observable loginPasswordErrorMessage = 'パスワードを入力してください。';
  
  
  /**
   * ログインパスワード入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleLoginPassword(event) {
    
    // const minLength = 8;
    // const maxLength = 32;
    
    const value = event.target.value;
    const length = event.target.value.length;
    
    
    if (length <= this.passwordMaxLength) {
      
      this.loginPassword = value;
      
      if (length === 0) {
        
        this.loginPasswordError = true;
        this.loginPasswordErrorMessage = 'パスワードを入力してください。';
        
      } else if (length < this.passwordMinLength) {
        
        this.loginPasswordError = true;
        this.loginPasswordErrorMessage = `パスワードは${this.passwordMinLength}文字以上、${this.passwordMaxLength}文字以内です。`;
        
      } else if (value.match(/^[\w\-]+$/) === null) {
        
        this.loginPasswordError = true;
        this.loginPasswordErrorMessage = 'パスワードに入力できるのは半角英数字とハイフン( - )アンダースコア( _ )です。';
        
      } else {
        
        this.loginPasswordError = false;
        this.loginPasswordErrorMessage = '';
        
      }
      
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
    
    if (this.loginIdErrorMessage) {
      
      storeLayout.handleSnackbarOpen('error', this.loginIdErrorMessage);
      return;
      
    } else if (this.loginPasswordErrorMessage) {
      
      storeLayout.handleSnackbarOpen('error', this.loginPasswordErrorMessage);
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
   * アカウント作成 ID　エラーメッセージ
   * @type {string}
   */
  @observable createAccountIdErrorMessage = 'IDを入力してください。';
  
  /**
   * アカウント作成 ID入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleCreateAccountId(event) {
    
    const value = event.target.value;
    const length = event.target.value.length;
    
    
    if (length <= this.idMaxLength) {
      
      this.createAccountId = value;
      
      if (length === 0) {
        
        this.createAccountIdError = true;
        this.createAccountIdErrorMessage = 'IDを入力してください。';
        
      } else if (length < this.idMinLength) {
        
        this.createAccountIdError = true;
        this.createAccountIdErrorMessage = `IDは${this.idMinLength}文字以上、${this.idMaxLength}文字以内です。`;
        
      } else if (value.match(/^[\w\-]+$/) === null) {
        
        this.createAccountIdError = true;
        this.createAccountIdErrorMessage = 'IDに入力できるのは半角英数字とハイフン( - )アンダースコア( _ )です。';
        
      } else {
        
        this.createAccountIdError = false;
        this.createAccountIdErrorMessage = '';
        
      }
      
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
   * アカウント作成パスワード　エラーメッセージ
   * @type {string}
   */
  @observable createAccountPasswordErrorMessage = 'パスワードを入力してください。';
  
  /**
   * アカウント作成パスワード入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleCreateAccountPassword(event) {
    
    // console.log(`zxcvbn = ${zxcvbn(event.target.value).score}`);
    // const minLength = 8;
    // const maxLength = 32;
    
    const value = event.target.value;
    const length = event.target.value.length;
    const score = zxcvbn(event.target.value).score;
    
    
    if (length <= this.passwordMaxLength) {
      
      this.createAccountPassword = value;
      this.createAccountPasswordScore = score;
      
      if (length === 0) {
        
        this.createAccountPasswordError = true;
        this.createAccountPasswordErrorMessage = 'パスワードを入力してください。';
        
      } else if (length < this.passwordMinLength) {
        
        this.createAccountPasswordError = true;
        this.createAccountPasswordErrorMessage = `パスワードは${this.passwordMinLength}文字以上、${this.passwordMaxLength}文字以内です。`;
        
      } else if (value.match(/^[\w\-]+$/) === null) {
        
        this.createAccountPasswordError = true;
        this.createAccountPasswordErrorMessage = 'パスワードに入力できるのは半角英数字とハイフン( - )アンダースコア( _ )です。';
        
      } else if (value === this.createAccountId) {
        
        this.createAccountPasswordError = true;
        this.createAccountPasswordErrorMessage = 'IDとパスワードを同じ文字列にすることはできません。';
        
      } else if (score < 2) {
        
        this.createAccountPasswordError = true;
        this.createAccountPasswordErrorMessage = 'パスワードの強度が足りません。';
        
      } else {
        
        this.createAccountPasswordError = false;
        this.createAccountPasswordErrorMessage = '';
        
      }
      
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
   * アカウント作成パスワード確認　エラーメッセージ
   * @type {string}
   */
  @observable createAccountPasswordConfirmationErrorMessage = 'パスワード確認を入力してください。';
  
  /**
   * アカウント作成パスワード確認入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   */
  @action.bound
  handleCreateAccountPasswordConfirmation(event) {
    
    // const minLength = 8;
    // const maxLength = 32;
    
    const value = event.target.value;
    const length = event.target.value.length;
    
    
    if (length <= this.passwordMaxLength) {
      
      this.createAccountPasswordConfirmation = value;
      
      if (length === 0) {
        
        this.createAccountPasswordConfirmationError = true;
        this.createAccountPasswordConfirmationErrorMessage = 'パスワード確認を入力してください。';
        
      } else if (value !== this.createAccountPassword) {
        
        this.createAccountPasswordConfirmationError = true;
        this.createAccountPasswordConfirmationErrorMessage = 'パスワードとパスワード確認の文字列が違っています。';
        
      } else {
        
        this.createAccountPasswordConfirmationError = false;
        this.createAccountPasswordConfirmationErrorMessage = '';
        
      }
      
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
    
    // this.createAccountTermsOfService = !this.createAccountTermsOfService;
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
    
    if (this.createAccountIdErrorMessage) {
      
      storeLayout.handleSnackbarOpen('error', this.createAccountIdErrorMessage);
      return;
      
    } else if (this.createAccountPasswordErrorMessage) {
      
      storeLayout.handleSnackbarOpen('error', this.createAccountPasswordErrorMessage);
      return;
      
    } else if (this.createAccountPasswordConfirmationErrorMessage) {
      
      storeLayout.handleSnackbarOpen('error', this.createAccountPasswordConfirmationErrorMessage);
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