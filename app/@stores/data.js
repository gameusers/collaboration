// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import { action, observable } from 'mobx';
import moment from 'moment';
import Cookies from 'js-cookie';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';


// --------------------------------------------------
//   Stores
// --------------------------------------------------

let storeData = null;






// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   Datetime
  // ---------------------------------------------
  
  /**
   * 現在の日時
   * @type {string}
   */
  @observable datetimeCurrent = '';
  
  
  /**
   * 現在の日時を設定する
   */
  @action.bound
  setDatetimeCurrent({ ISO8601 }) {
    
    
    // --------------------------------------------------
    //   すでにデータが存在する場合は処理停止
    // --------------------------------------------------
    
    if (this.datetimeCurrent) {
      return;
    }
    
    
    // --------------------------------------------------
    //   日時設定
    // --------------------------------------------------
    
    if (ISO8601) {
      
      this.datetimeCurrent = ISO8601;
      
    } else {
      
      this.datetimeCurrent = moment().utc().toISOString();
      
    }
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@stores/data.js - setDatetimeCurrent
    // `);
    
    // const isServer = !process.browser;
    
    // if (isServer) {
    //   console.log('Server');
    // } else {
    //   console.log('Client');
    // }
    
    // console.log(chalk`
    //   this.datetimeCurrent: {green ${this.datetimeCurrent}}
    // `);
    
    
  };
  
  
  /**
   * 現在の日時を定期的に更新する
   */
  @action.bound
  setIntervalDatetimeCurrent() {
    
    // console.log('setIntervalDatetimeCurrent');
    
    setInterval(() => {
      
      // const datetimeCurrent = moment().utcOffset(0);
      this.datetimeCurrent = moment().utc().toISOString();
      // this.datetimeCurrent = datetimeCurrent;
      
      // console.log(`setIntervalDatetimeCurrent - ${this.datetimeCurrent}`);
      
    }, 1000 * 60);
    
  };
  
  
  
  
  // ---------------------------------------------
  //   Locale
  // ---------------------------------------------
  
  /**
   * Locale情報を入れるオブジェクト
   * @type {Object}
   */
  @observable localeObj = {};
  
  
  /**
   * Localeオブジェクトを更新する
   * @param {Object} obj - 更新するオブジェクト
   */
  @action.bound
  replaceLocaleObj(obj) {
    this.localeObj = obj;
  };
  
  
  
  
  // ---------------------------------------------
  //   Cookie
  // ---------------------------------------------
  
  /**
   * Cookie
   * @type {string}
   */
  cookie = '';
  
  
  /**
   * Cookie からデータを取得する
   * this.cookie には reqHeadersCookie が入っている。サーバー側で取得したクッキーのデータ。
   * @param {String} key - 取得するキー
   */
  getCookie({ key }) {
    
    let returnValue = Cookies.get(key) || ((this.cookie + ';').match(key + '=([^¥S;]*)')||[])[1];
    
    if (!returnValue) {
      returnValue = '';
    }
    
    return returnValue;
    
  };
  
  
  
  
  // ---------------------------------------------
  //   Temporary Data Object / リロードした際に消えてもいいような情報を入れる　現在表示してるページNoなど
  // ---------------------------------------------
  
  /**
   * Temporary Data Object
   * @type {Object}
   */
  temporaryDataObj = {};
  
  
  /**
   * Get Temporary Data
   * @type {string} pathname
   * @type {string} key
   */
  getTemporaryData({ pathname, key }) {
    return lodashGet(this.temporaryDataObj, [pathname, key], '');
  };
  
  
  /**
   * Set Temporary Data
   * @type {string} pathname
   * @type {string} key
   * @type {string} value
   */
  setTemporaryData({ pathname, key, value }) {
    lodashSet(this.temporaryDataObj, [pathname, key], value);
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
   * ヘッダー情報オブジェクトを置き換える
   * @param {Object} obj - 置き換えるオブジェクト
   */
  @action.bound
  replaceHeaderObj(obj) {
    this.headerObj = obj;
  };
  
  
  
  
  // ---------------------------------------------
  //   Login
  // ---------------------------------------------
  
  /**
   * ログイン状態
   * @type {boolean}
   */
  @observable login = false;
  
  
  /**
   * Get Login
   */
  getLogin() {
    return this.login;
  };
  
  
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
  //   Access Level
  // ---------------------------------------------
  
  @observable accessLevel = 1;
  
  
  
  
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
  
  // @observable userCommunityObj = {};
  
  // @action.bound
  // insertUserCommunityObj(dataObj) {
  //   this.userCommunityObj = Object.assign({}, dataObj, this.userCommunityObj);
  //   // console.log(`User Community insertData`);
  //   // console.dir(this.dataObj);
  // };
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreData({ propsObj }) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeData === null) {
    storeData = new Store();
  }
  
  
  // --------------------------------------------------
  //   Props
  // --------------------------------------------------
  
  if (propsObj) {
    
    
    // --------------------------------------------------
    //   DateTime ISO8601
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['ISO8601'])) {
      // console.log(chalk`
      //   initStoreData
      //   propsObj.ISO8601: {green ${propsObj.ISO8601}}
      // `);
      
      // storeData.datetimeCurrent = propsObj.ISO8601;
      storeData.setDatetimeCurrent({ ISO8601: propsObj.ISO8601 });
    }
    
    
    // --------------------------------------------------
    //   cookie
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['cookie'])) {
      storeData.cookie = propsObj.cookie;
    }
    
    
    // --------------------------------------------------
    //   Header
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['headerObj'])) {
      storeData.headerObj = propsObj.headerObj;
    }
    
    
    // --------------------------------------------------
    //   Login
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['login'])) {
      storeData.login = propsObj.login;
    }
    
    
    // --------------------------------------------------
    //   Login Users
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['loginUsersObj'])) {
      storeData.loginUsersObj = propsObj.loginUsersObj;
    }
    
    
    // --------------------------------------------------
    //   Access Level
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['accessLevel'])) {
      storeData.accessLevel = propsObj.accessLevel;
    }
    
    
    // --------------------------------------------------
    //   Datetime Current
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['datetimeCurrent'])) {
      storeData.setDatetimeCurrent({ ISO8601: propsObj.datetimeCurrent });
    }
    
    
    // --------------------------------------------------
    //   cardPlayersObj
    // --------------------------------------------------
    
    if (lodashHas(propsObj, ['cardPlayersObj'])) {
      storeData.cardPlayersObj = propsObj.cardPlayersObj;
    }
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeData;
  
  
}