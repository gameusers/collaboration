// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';
import moment from 'moment';
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

export default function initStoreData({ initialPropsObj }) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeData === null) {
    storeData = new Store();
  }
  
  
  // --------------------------------------------------
  //   Initial Props
  // --------------------------------------------------
  
  if (initialPropsObj) {
    
    
    // --------------------------------------------------
    //   Header
    // --------------------------------------------------
    
    if (lodashHas(initialPropsObj, ['headerObj'])) {
      storeData.headerObj = initialPropsObj.headerObj;
      // storeData.replaceHeaderObj(initialPropsObj.headerObj);
    }
    
    
    // --------------------------------------------------
    //   Login Users
    // --------------------------------------------------
    
    if (lodashHas(initialPropsObj, ['loginUsersObj'])) {
      storeData.loginUsersObj = initialPropsObj.loginUsersObj;
    }
    
    
    // --------------------------------------------------
    //   Datetime Current
    // --------------------------------------------------
    
    if (lodashHas(initialPropsObj, ['datetimeCurrent'])) {
      storeData.setDatetimeCurrent({ ISO8601: initialPropsObj.datetimeCurrent });
    }
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeData;
  
  
}