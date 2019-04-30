// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

import chalk from 'chalk';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import { action, observable } from 'mobx';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeLayout = null;


// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   Current Contents Id
  // ---------------------------------------------
  
  @observable currentContentsId = '';
  
  
  
  // ---------------------------------------------
  //   アクセスしたページ
  // ---------------------------------------------
  
  // historyStateArr = [];
  
  // historyStateArr = [
  //   {
  //     path: 'uc/az1979',
  //     param1: 'uc',
  //     param2: 'az1979',
  //     param3: 'test',
  //     param4: '',
  //     param5: '',
  //     file: 'uc/community.js',
  //     id: 'p0V_RsaT1l8',
  //     dateTime: '2017-07-24T20:45:20'
  //   }
  // ]
  
  // insertHistoryState(obj) {
    
  //   // console.dir(obj);
    
  //   this.historyStateArr.unshift(obj);
    
  //   // 履歴を保存する数を指定する
  //   this.historyStateArr.splice(30, 1);
    
  //   console.log(`insertHistoryState`);
  //   console.dir(this.historyStateArr);
    
  // };
  
  
  
  
  
  
  
  
  // ---------------------------------------------
  //   ヘッダー - ナビゲーション / メイン
  // ---------------------------------------------
  
  // headerNavMainObj = {
    
  //   // index: [
  //   //   {
  //   //     name: 'フィード',
  //   //     pathname: '/'
  //   //   },
  //   //   {
  //   //     name: 'ゲーム',
  //   //     pathname: '/gc'
  //   //   },
  //   //   {
  //   //     name: 'ユーザー',
  //   //     pathname: '/uc'
  //   //   },
  //   //   {
  //   //     name: 'テスト1',
  //   //     pathname: '/test'
  //   //   },
  //   //   {
  //   //     name: 'テスト2',
  //   //     pathname: '/test'
  //   //   },
  //   //   {
  //   //     name: 'テスト3',
  //   //     pathname: '/test'
  //   //   },
  //   //   {
  //   //     name: 'テスト4',
  //   //     pathname: '/test'
  //   //   },
  //   //   {
  //   //     name: 'テスト5',
  //   //     pathname: '/test'
  //   //   },
  //   //   {
  //   //     name: 'テスト6',
  //   //     pathname: '/test'
  //   //   }
  //   // ],
    
  //   index: [
  //     {
  //       name: 'フィード',
  //       pathname: '/'
  //     },
  //     {
  //       name: 'ゲーム',
  //       pathname: '/gc'
  //     },
  //     {
  //       name: 'ユーザー',
  //       pathname: '/uc'
  //     }
  //   ],
    
  //   uc: [
  //     {
  //       name: 'トップ',
  //       pathname: '/uc/community'
  //     },
  //     {
  //       name: 'メンバー',
  //       pathname: '/uc/community/member'
  //     },
  //     {
  //       name: 'データ',
  //       pathname: '/uc/community/data'
  //     }
  //   ],
    
  //   gc: [
  //     {
  //       name: 'BBS',
  //       pathname: '/gc/community'
  //     },
  //     {
  //       name: '募集',
  //       pathname: '/uc/community/rec'
  //     },
  //     {
  //       name: '設定',
  //       pathname: '/uc/community/config'
  //     }
  //   ],
    
  //   login: [
  //     {
  //       name: 'ID & パスワード',
  //       pathname: '/login'
  //     },
  //     {
  //       name: 'ソーシャル',
  //       pathname: '/login/social'
  //     }
  //   ],
    
  //   logout: [
  //     {
  //       name: 'ログアウト',
  //       pathname: '/logout'
  //     }
  //   ],
    
  // };
  
  
  
  
  // ---------------------------------------------
  //   Header - 通知ダイアログ
  // ---------------------------------------------
  
  /**
   * 通知ダイアログの表示・非表示を切り替える真偽値
   * @type {boolean}
   */
  @observable headerNotificationDialogOpen = false;
  
  
  /**
   * 通知ダイアログを開く
   */
  @action.bound
  handleHeaderNotificationDialogOpen() {
    this.headerNotificationDialogOpen = true;
  };
  
  
  /**
   * 通知ダイアログを閉じる
   */
  @action.bound
  handleHeaderNotificationDialogClose() {
    this.headerNotificationDialogOpen = false;
  };
  
  
  
  
  // ---------------------------------------------
  //   Header - ログインメニュー
  // ---------------------------------------------
  
  /**
   * メニューの位置を設定するために使用されるDOM要素
   * @type {string}
   */
  @observable headerLoginMenuAnchorEl = null;
  
  
  /**
   * ログインメニューの表示・非表示を切り替える真偽値
   * @type {boolean}
   */
  @observable headerLoginMenuOpen = false;
  
  
  /**
   * ログインメニューを開く
   * @param {Object} eventObj - イベント
   */
  @action.bound
  handleHeaderLoginMenuOpen(eventObj) {
    this.headerLoginMenuAnchorEl = eventObj.currentTarget;
    this.headerLoginMenuOpen = true;
  };
  
  
  /**
   * ログインメニューを閉じる
   */
  @action.bound
  handleHeaderLoginMenuClose() {
    this.headerLoginMenuAnchorEl = null;
    this.headerLoginMenuOpen = false;
  };
  
  
  
  
  // ---------------------------------------------
  //   Header - データ
  // ---------------------------------------------
  
  /**
   * データの開閉状態
   * @type {boolean}
   */
  @observable headerDataOpen = true;
  
  
  /**
   * データを開く
   */
  @action.bound
  handleHeaderDataOpen() {
    this.headerDataOpen = true;
  };
  
  
  /**
   * データを閉じる
   */
  @action.bound
  handleHeaderDataClose() {
    this.headerDataOpen = false;
  };
  
  
  
  
  // ---------------------------------------------
  //   Header - ヒーローイメージ
  // ---------------------------------------------
  
  // @observable headerGameNo = 1;
  // @observable headerHeroImageArr = [1];
  // // @observable headerHeroImageArr = null;
  // @observable headerThumbnail = false;
  // @observable headerDataTitle = 'Dead by Daylight';
  // @observable headerDataHardware = 'PC, PS4, Xbox One';
  // @observable headerDataGenre = 'アクション';
  // @observable headerDataPlayersMax = '1-5人';
  // @observable headerDataReleaseDate = '2016/6/14';
  // @observable headerDataDeveloper = 'Behaviour Interactive';
  // @observable headerDataLinkArr = [
  //   {
  //     type: 'Official',
  //     name: null,
  //     url: 'http://www.deadbydaylight.com/'
  //   },
  //   {
  //     type: 'Twitter',
  //     name: null,
  //     url: 'https://twitter.com/deadByBHVR'
  //   },
  //   {
  //     type: 'Facebook',
  //     name: null,
  //     url: 'https://www.facebook.com/DeadByDaylight/'
  //   },
  //   {
  //     type: 'YouTube',
  //     name: null,
  //     url: 'https://www.youtube.com/channel/UCaSgsFdGbwjfdawl3rOXiwQ'
  //   },
  //   {
  //     type: 'Steam',
  //     name: null,
  //     url: 'https://store.steampowered.com/app/381210/'
  //   }
  // ];
  
  
  
  
  // ----------------------------------------
  //   Header - Navigation Sub
  // ----------------------------------------
  
  @observable headerNavSubDialogOpenObj = {};
  
  @action.bound
  handleHeaderNavSubDialogOpen(id) {
    this.headerNavSubDialogOpenObj[id] = true;
  };
  
  @action.bound
  handleHeaderNavSubDialogClose(id) {
    this.headerNavSubDialogOpenObj[id] = false;
  };
  
  
  
  
  // ---------------------------------------------
  //   Snackbar （通知用のバー）
  //   https://material-ui.com/demos/snackbars/#transitions
  // ---------------------------------------------
  
  /**
   * 開閉を切り替える真偽値
   * @type {boolean}
   */
  @observable snackbarOpen = false;
  
  
  /**
   * 色 - success / error / warning / info
   * @type {string}
   */
  @observable snackbarVariant = '';
  
  
  /**
   * メッセージ
   * @type {string}
   */
  @observable snackbarMessage = '';
  
  
  /**
   * 表示位置 - 縦方向
   * @type {string}
   */
  @observable snackbarVertical = 'bottom';
  
  
  /**
   * 表示位置 - 横方向
   * @type {string}
   */
  @observable snackbarHorizontal = 'left';
  
  
  /**
   * 表示時間
   * @type {number}
   */
  @observable snackbarAutoHideDuration= 5000;
  
  
  /**
   * キー
   * @type {string}
   */
  @observable snackbarKey = 'snackbarKey';
  
  
  /**
   * Queue Array
   * @type {Array}
   */
  snackbarQueueArr = [];
  
  
  /**
   * Snackbarを開く
   * @param {string} variant - 色
   * @param {string} message - メッセージ
   * @param {string} vertical - 縦方向
   * @param {string} horizontal - 横方向
   * @param {string} autoHideDuration - 表示時間
   */
  @action.bound
  handleSnackbarOpen({ variant, message, vertical, horizontal, autoHideDuration }) {
    
    const object = {
      variant,
      message,
      key: `snackbar-${new Date().getTime()}`,
    };
    
    if (vertical) {
      object.vertical = vertical;
    }
    
    if (horizontal) {
      object.horizontal = horizontal;
    }
    
    if (autoHideDuration) {
      object.autoHideDuration = autoHideDuration;
    }
    
    this.snackbarQueueArr.push(object);
    
    if (this.snackbarOpen) {
      this.snackbarOpen = false;
    } else {
      this.processQueue();
    }
    
  };
  
  
  /**
   * Queue
   */
  processQueue = () => {
    
    if (this.snackbarQueueArr.length > 0) {
      const tempArr = this.snackbarQueueArr.shift();
      this.snackbarVariant = tempArr.variant;
      this.snackbarMessage = tempArr.message;
      this.snackbarKey = tempArr.key;
      
      this.snackbarOpen = true;
    }
    
  };
  
  
  /**
   * Snackbarを閉じる
   * @param {Object} event - イベントオブジェクト
   * @param {string} reason
   */
  @action.bound
  handleSnackbarClose(event, reason) {
    
    if (reason === 'clickaway') {
      return;
    }
    
    this.snackbarOpen = false;
    
  };
  
  
  /**
   * Snackbarを閉じる / Exited
   */
  @action.bound
  handleSnackbarExited() {
    this.processQueue();
  };
  
  
  
  
  // ---------------------------------------------
  //   Panel
  // ---------------------------------------------
  
  /**
   * パネルの開閉を切り替える真偽値
   * @type {boolean}
   */
  @observable panelExpandedObj = {};
  
  
  /**
   * パネルの開閉を切り替える
   * @param {string} _id - ID
   */
  @action.bound
  handlePanelExpand({ _id }) {
    
    if (_id in this.panelExpandedObj) {
      this.panelExpandedObj[_id] = !this.panelExpandedObj[_id];
    } else {
      this.panelExpandedObj[_id] = false;
    }
    
  };
  
  
  
  
  @action.bound
  handlePanelExpanded(id) {
    // console.log(`handlePanelExpanded`);
    // console.dir(this.panelExpandedObj);
    
    // console.log(`id = ${id}`);
    // console.log(`this.historyStateArr[0].id = ${this.historyStateArr[0].id}`);
    
    if (id in this.panelExpandedObj) {
      this.panelExpandedObj[id] = !this.panelExpandedObj[id];
    } else {
      this.panelExpandedObj[id] = false;
    }
    
  };
  
  returnPanelExpanded(id) {
    // console.dir(this.panelExpandedObj);
    return this.panelExpandedObj[id];
  }
  
  insertPanelExpanded(dataObj) {
    this.panelExpandedObj = Object.assign({}, dataObj, this.panelExpandedObj);
  };
  
  
  
  
  // ---------------------------------------------
  //   Loading
  // ---------------------------------------------
  
  /**
   * ローディングを表示するかどうかの真偽値
   * @type {boolean}
   */
  @observable loading = true;
  
  
  /**
   * ローディングを表示する場所
   * @type {boolean}
   */
  @observable loadingLeft = false;
  
  
  /**
   * ローディングを表示する
   */
  handleLoadingShow({ left = false }) {
    this.loading = true;
    
    if (left) {
      this.loadingLeft = true;
    }
  };
  
  
  /**
   * ローディングを非表示にする
   */
  handleLoadingHide({}) {
    this.loading = false;
  };
  
  
  
  
  // ---------------------------------------------
  //   Button Enable / Disable
  // ---------------------------------------------
  
  /**
   * ボタンの利用可能・利用不可判定を入れるオブジェクト
   * true 利用不可 / false 利用可能
   * @type {Object}
   */
  @observable buttonDisabledObj = {};
  
  
  /**
   * ボタンを利用可能にする
   * @param {string} _id - ID
   */
  handleButtonEnable({ _id }) {
    this.buttonDisabledObj[_id] = false;
  };
  
  
  /**
   * ボタンを利用不可にする
   * @param {string} _id - ID
   */
  handleButtonDisable({ _id }) {
    this.buttonDisabledObj[_id] = true;
  };
  
  
  
  
  
  /**
   * ボタンの利用禁止判定
   * @type {boolean}
   */
  // @observable buttonDisabledObj = {};
  
  
  /**
   * ボタンの利用禁止判定を更新する
   * @param {string} _id - ID
   * @param {boolean} value - 利用禁止 true / 利用可能 false
   */
  handleButtonDisabledObj(_id, value) {
    this.buttonDisabledObj[_id] = value;
  };
  // handleButtonDisabledObj(_id) {
  //   if (_id in this.buttonDisabledObj) {
  //     this.buttonDisabledObj[_id] = !this.buttonDisabledObj[_id];
  //   } else {
  //     this.buttonDisabledObj[_id] = false;
  //   }
  // };
  
  
  
  
  
  
  // ---------------------------------------------
  //   Terms of Service（利用規約）
  // ---------------------------------------------
  
  /**
   * 利用規約のダイアログを表示するかどうか
   * 表示する true / 表示しない false
   * @type {boolean}
   */
  @observable termsOfServiceDialogOpen = false;
  
  
  /**
   * 利用規約のダイアログを表示する
   */
  @action.bound
  handleTermsOfServiceDialogOpen() {
    this.termsOfServiceDialogOpen = true;
  };
  
  /**
   * 利用規約のダイアログを非表示にする
   */
  @action.bound
  handleTermsOfServiceDialogClose() {
    this.termsOfServiceDialogOpen = false;
  };
  
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreLayout(argumentsObj) {
  
  const isServer = argumentsObj.isServer;
  
  
  if (isServer) {
    
    return new Store();
    
  } else {
    
    if (storeLayout === null) {
      storeLayout = new Store();
    }
    
    return storeLayout;
    
  }
  
}