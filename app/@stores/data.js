// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

// import { addLocaleData } from 'react-intl';
// import en from 'react-intl/locale-data/en';
// import ja from 'react-intl/locale-data/ja';
// addLocaleData([...en, ...ja]);

// import { locale } from '../@locales/locale';




// --------------------------------------------------
//   Property
// --------------------------------------------------

let storeData = null;




// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   Constructor
  // ---------------------------------------------
  
  // constructor({ reqAcceptLanguage, headerObj, loginUsersObj }) {
  //   console.log('data.js / constructor');
  //   // this.pathname = argumentsObj.pathname;
    
    
  //   const localeObj = locale({
  //     acceptLanguage: reqAcceptLanguage
  //   });
    
  //   this.replaceLocaleObj(localeObj);
    
  // }
  
  
  
  
  // ---------------------------------------------
  //   Locale
  // ---------------------------------------------
  
  /**
   * Locale情報を入れるオブジェクト
   * @type {Object}
   */
  @observable localeObj = {};
  
  
  /**
   * intl.formatMessage 用
   * @type {Object}
   */
  // @observable intl = {};
  
  
  /**
   * Localeオブジェクトを更新する
   * @param {Object} obj - 更新するオブジェクト
   */
  @action.bound
  replaceLocaleObj(obj) {
    this.localeObj = obj;
    
    // console.log('replaceLocaleObj');
    // 以下削除予定
    // const intlProvider = new IntlProvider({
    //   locale: this.localeObj.languageArr[0],
    //   messages: this.localeObj.dataObj
    // }, {});
    
    // const { intl } = intlProvider.getChildContext();
    // this.intl = intl;
    
  };
  
  
  
  
  // ---------------------------------------------
  //   Header
  // ---------------------------------------------
  
  /**
   * ヘッダー情報を入れるオブジェクト
   * @type {Object}
   */
  @observable headerObj = {};
  
  
  /**
   *ヘッダー情報オブジェクトを置き換える
   * @param {Object} obj - 置き換えるオブジェクト
   */
  @action.bound
  replaceHeaderObj(obj) {
    this.headerObj = obj;
  };
  
  
  
  
  // ---------------------------------------------
  //   Login Users
  // ---------------------------------------------
  
  /**
   * ログインユーザー情報を入れるオブジェクト
   * @type {Object}
   */
  @observable loginUsersObj = {};
  
  
  /**
   * ログインユーザー情報オブジェクトを置き換える
   * @param {Object} obj - 置き換えるオブジェクト
   */
  @action.bound
  replaceLoginUsersObj(obj) {
    this.loginUsersObj = obj;
  };
  
  
  
  
  // ---------------------------------------------
  //   Users Data
  // ---------------------------------------------
  
  /**
   * ユーザー情報を入れるオブジェクト
   * @type {Object}
   */
  @observable usersObj = {};
  
  
  /**
   * ユーザー情報オブジェクトを更新する
   * @param {Object} obj - 更新するオブジェクト
   */
  @action.bound
  updateUsersObj(obj) {
    this.usersObj = Object.assign({}, this.usersObj, obj);
  };
  
  
  /**
   * ユーザー情報オブジェクトを置き換える
   * @param {Object} obj - 置き換えるオブジェクト
   */
  @action.bound
  replaceUsersObj(obj) {
    this.usersObj = obj;
  };
  
  
  
  
  // ---------------------------------------------
  //   Card / Players
  // ---------------------------------------------
  
  /**
   * プレイヤーカードの情報を入れるオブジェクト
   * @type {Object}
   */
  @observable cardPlayersObj = {};
  
  /**
   * プレイヤーカードのオブジェクトを更新する
   * @param {Object} obj - 更新するオブジェクト
   */
  @action.bound
  updateCardPlayersObj(obj) {
    this.cardPlayersObj = Object.assign({}, this.cardPlayersObj, obj);
  };
  
  /**
   * プレイヤーカードのオブジェクトを置き換える
   * @param {Object} obj - 置き換えるオブジェクト
   */
  @action.bound
  replaceCardPlayersObj(obj) {
    this.cardPlayersObj = obj;
  };
  
  
  
  
  // ---------------------------------------------
  //   Card / Games
  // ---------------------------------------------
  
  /**
   * ゲームカードの情報を入れるオブジェクト
   * @type {Object}
   */
  @observable cardGamesObj = {};
  
  /**
   * ゲームカードのオブジェクトを更新する
   * @param {Object} obj - 更新するオブジェクト
   */
  @action.bound
  updateCardGamesObj(obj) {
    this.cardGamesObj = Object.assign({}, this.cardGamesObj, obj);
  };
  
  /**
   * ゲームカードのオブジェクトを置き換える
   * @param {Object} obj - 置き換えるオブジェクト
   */
  @action.bound
  replaceCardGamesObj(obj) {
    this.cardGamesObj = obj;
  };
  
  
  
  
  // ---------------------------------------------
  //   User Community
  // ---------------------------------------------
  
  @observable userCommunityObj = {};
  
  @action.bound
  insertUserCommunityObj(dataObj) {
    this.userCommunityObj = Object.assign({}, dataObj, this.userCommunityObj);
    // console.log(`User Community insertData`);
    // console.dir(this.dataObj);
  };
  
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreData() {
  
  if (storeData === null) {
    storeData = new Store();
  }
  
  return storeData;
  
  // --------------------------------------------------
  //   new Store()
  // --------------------------------------------------
  
  // if (storeData === null) {
  //   storeData = new Store();
  // }
  
  
  
  
  // --------------------------------------------------
  //   Update Data - Locale
  // --------------------------------------------------
  
//   const localeObj = locale({
//     acceptLanguage: reqAcceptLanguage
//   });
  
//   storeData.replaceLocaleObj(localeObj);
  
  
//   // --------------------------------------------------
//   //   Update Data - Header
//   // --------------------------------------------------
  
//   storeData.replaceHeaderObj(headerObj);
// //   console.log(`\n---------- headerObj ----------\n`);
// // console.dir(headerObj);
// // console.log(`\n-----------------------------------\n`);
  
//   // --------------------------------------------------
//   //   Update Data - Login User
//   // --------------------------------------------------
  
//   storeData.replaceLoginUsersObj(loginUsersObj);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  // return storeData;
  
  
}