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
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';




// --------------------------------------------------
//   Property
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
    
    let datetimeCurrent = ISO8601;
    
    if (!ISO8601) {
      datetimeCurrent = moment().toISOString();
    }
    
    this.datetimeCurrent = datetimeCurrent;
    
  };
  
  
  /**
   * 現在の日時を定期的に更新する
   */
  @action.bound
  setIntervalDatetimeCurrent() {
    
    // console.log('setIntervalDatetimeCurrent');
    
    setInterval(() => {
      
      // const datetimeCurrent = moment().utcOffset(0);
      this.datetimeCurrent = moment().toISOString();
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
  
  cookie = '';
  
  
  /**
   * Cookie からデータを取得する
   * this.cookie には reqHeadersCookie が入っている。サーバー側で取得したクッキーのデータ。
   * @param {String} key - 取得するキー
   */
  getCookie({ key }) {
    return Cookies.get(key) || ((this.cookie + ';').match(key + '=([^¥S;]*)')||[])[1];
  };
  
  
  
  
  // ---------------------------------------------
  //   Temporary Data Object / リロードした際に消えてもいいような情報を入れる　現在表示してるページNoなど
  // ---------------------------------------------
  
  temporaryDataObj = {};
  
  // temporaryDataObj = {
    
  //   '/uc/community1': {
  //     forumNavigationPage: 1,
  //     forumPage: 1,
  //   }
    
  // };
  
  
  /**
   * Get Forum Thread List Page
   * @type {string} temporaryDataID
   */
  getTemporaryDataForumThreadListPage({ temporaryDataID }) {
    return lodashGet(this.temporaryDataObj, [temporaryDataID, 'forumThreadListPage'], 1);
  };
  
  
  /**
   * Set Forum Thread List Page
   * @type {string} temporaryDataID
   * @type {string} value - 値
   */
  setTemporaryDataForumThreadListPage({ temporaryDataID, value }) {
    lodashSet(this.temporaryDataObj, [temporaryDataID, 'forumThreadListPage'], value);
  };
  
  
  /**
   * Get Forum Thread Page
   * @type {string} temporaryDataID
   */
  getTemporaryDataForumThreadPage({ temporaryDataID }) {
    return lodashGet(this.temporaryDataObj, [temporaryDataID, 'forumThreadPage'], 1);
  };
  
  
  /**
   * Set Forum Thread Page
   * @type {string} temporaryDataID
   * @type {string} value - 値
   */
  setTemporaryDataForumThreadPage({ temporaryDataID, value }) {
    lodashSet(this.temporaryDataObj, [temporaryDataID, 'forumThreadPage'], value);
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