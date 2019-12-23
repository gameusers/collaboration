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
import { animateScroll as scroll, scrollSpy, scroller, Events } from 'react-scroll';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';




// --------------------------------------------------
//   Property
// --------------------------------------------------

let storeLayout = null;




// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   Header - Hero Image
  // ---------------------------------------------
  
  /**
   * ヒーローイメージの高さ
   * @type {number}
   */
  @observable headerHeroImageHeight = 0;
  
  
  /**
   * ヒーローイメージのサイズを設定する
   */
  @action.bound
  handleHeaderHeroImageSize({ dimensionsObj }) {
    this.headerHeroImageHeight = dimensionsObj.height;
  };
  
  
  
  
  
  
  
  
  // ---------------------------------------------
  //   Header - Navigation / Main
  // ---------------------------------------------
  
  /**
   * 現在アクセスしているページのpath
   * @type {string}
   */
  @observable pathname = '';
  
  
  /**
  * 現在アクセスしているページのpathを置き換える
  * @param {string} pathname - 置き換えるpath
  */
  // @action.bound
  // replacePathname(pathname) {
  //   this.pathname = pathname;
  // };
  
  
  /**
   * Navigation Main の情報を入れる配列
   * @type {Array}
   */
  @observable headerNavMainArr = [];
  
  
  /**
  * Navigation Main の情報を置き換える
  * @param {Array} arr - 置き換える配列
  */
  // @action.bound
  // replaceHeaderNavMainArr(arr) {
  //   this.headerNavMainArr = arr;
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
  // @observable headerLoginMenuAnchorEl = null;
  
  
  /**
   * ログインメニューの表示・非表示を切り替える真偽値
   * @type {boolean}
   */
  // @observable headerLoginMenuOpen = false;
  
  
  // /**
  // * ログインメニューを開く
  // * @param {Object} eventObj - イベント
  // */
  // @action.bound
  // handleHeaderLoginMenuOpen() {
  //   this.headerLoginMenuOpen = true;
  // };
  
  
  // /**
  // * ログインメニューを閉じる
  // */
  // @action.bound
  // handleHeaderLoginMenuClose() {
  //   // this.headerLoginMenuAnchorEl = null;
  //   this.headerLoginMenuOpen = false;
  // };
  
  
  // ---------------------------------------------
  //   Header - ログインメニュー
  // ---------------------------------------------
  
  /**
   * メニューの位置を設定するために使用されるDOM要素
   * @type {string}
   */
  // @observable headerLoginMenuAnchorEl = null;
  
  
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
  handleHeaderLoginMenuOpen() {
    this.headerLoginMenuOpen = true;
  };
  // @action.bound
  // handleHeaderLoginMenuOpen({ eventObj }) {
  //   this.headerLoginMenuAnchorEl = eventObj.currentTarget;
  //   this.headerLoginMenuOpen = true;
  // };
  
  
  /**
   * ログインメニューを閉じる
   */
  @action.bound
  handleHeaderLoginMenuClose() {
    // this.headerLoginMenuAnchorEl = null;
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
  //   Drawer
  // ---------------------------------------------
  
  /**
   * クリックでドロワーが開くアイコンを表示するかどうか [true 表示する / false 表示しない]
   * @type {boolean}
   */
  @observable drawerIconShow = false;
  
  
  /**
   * ドロワーの開閉状態 [true 開く / false 閉じる]
   * @type {boolean}
   */
  @observable drawerOpen = false;
  
  
  /**
   * ドロワーを開く
   */
  @action.bound
  handleDrawerOpen() {
    // console.log('handleDrawerOpen');
    this.drawerOpen = true;
  };
  
  
  /**
   * ドロワーを閉じる
   */
  @action.bound
  handleDrawerClose() {
    // console.log('handleDrawerClose');
    this.drawerOpen = false;
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
   * メッセージID
   * @type {string}
   */
  @observable snackbarMessageID = 'qnWsuPcrJ';
  
  
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
   * Error Object
   * @type {Object}
   */
  @observable snackbarErrorObj = {};
  
  
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
   * @param {string} messageID - メッセージID
   * @param {string} vertical - 縦方向
   * @param {string} horizontal - 横方向
   * @param {string} autoHideDuration - 表示時間
   * @param {Object} errorObj - Error Object
   */
  @action.bound
  handleSnackbarOpen({ variant, messageID, vertical, horizontal, autoHideDuration, errorObj }) {
    
    const object = {
      variant,
      messageID,
      errorObj,
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
      this.snackbarMessageID = tempArr.messageID;
      this.snackbarErrorObj = tempArr.errorObj;
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
   * パネルの状態を取得する
   * @param {Array} pathArr - path
   */
  handleGetPanelExpanded({ pathArr }) {
    return lodashGet(this.panelExpandedObj, pathArr, true);
  };
  
  
  /**
   * パネルの開閉を切り替える
   * @param {string} _id - ID
   * @param {Array} pathArr - データを保存する場所を配列で指定する
   */
  @action.bound
  handlePanelExpand({ _id, pathArr }) {
    
    if (pathArr) {
      
      const expanded = lodashGet(this.panelExpandedObj, pathArr, true);
      lodashSet(this.panelExpandedObj, pathArr, !expanded);
      
    } else {// _idを削除後は消すこと
      
      if (_id in this.panelExpandedObj) {
        this.panelExpandedObj[_id] = !this.panelExpandedObj[_id];
      } else {
        this.panelExpandedObj[_id] = false;
      }
      
    }
    
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
   * ボタンの状態を取得する
   * @param {Array} pathArr - path
   */
  handleGetButtonDisabled({ pathArr }) {
    // console.log(`
    //   ----- pathArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- this.buttonDisabledObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(this.buttonDisabledObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    return lodashGet(this.buttonDisabledObj, pathArr, true);
  };
  
  
  /**
   * ボタンを利用可能にする
   * @param {string} _id - ID
   */
  handleButtonEnable({ _id, pathArr }) {
    this.buttonDisabledObj[_id] = false;// _idを削除後は消すこと
    
    if (pathArr) {
      lodashSet(this.buttonDisabledObj, pathArr, false);
    }
  };
  
  
  /**
   * ボタンを利用不可にする
   * @param {string} _id - ID
   */
  handleButtonDisable({ _id, pathArr }) {
    this.buttonDisabledObj[_id] = true;// _idを削除後は消すこと
    
    if (pathArr) {
      lodashSet(this.buttonDisabledObj, pathArr, true);
    }
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
  
  
  
  
  
  
  // ---------------------------------------------
  //   Scroll To
  // ---------------------------------------------
  
  // ---------------------------------------------
  //   Header - Navigation / Top & Main
  //   scrollToで移動した場合は、スクロールを上にした時と同じ動作にする
  // ---------------------------------------------
  
  /**
   * scrollToを開始 - 開始するとナビゲーションを
   * @type {boolean}
   */
  headerNavForceScrollUpBegin = false;
  
  
  /**
   * scrollToを終了
   * @type {boolean}
   */
  headerNavForceScrollUpEnd = false;
  
  
  /**
   * scrollToを開始 / サイドバー用
   * @type {boolean}
   */
  headerScrollToBeginForSidebar = false;
  
  
  /**
   * scrollToを終了 / サイドバー用
   * @type {boolean}
   */
  headerScrollToEndForSidebar = false;
  
  
  
  /**
   * 特定の場所へスクロールする
   * 移動先は <Element name="..."></Element> で囲む / name に入力した値を to に指定すると移動できる
   * headerNavForceScrollUpBegin & headerNavForceScrollUpEnd
   * これはページトップのナビゲーションの位置を操作するための変数
   */
  @action.bound
  handleScrollTo({ to, duration = 0, delay = 0, smooth = 'easeInOutQuart', offset = -50 }) {
    
    if (!to) {
      return;
    }
    
    this.headerNavForceScrollUpBegin = true;
    this.headerScrollToBeginForSidebar = true;
    
    scroller.scrollTo(to, {
      duration,
      delay,
      smooth,
      offset,
    });
    
    Events.scrollEvent.register('end', (to, element) => {
      // console.log('Events.scrollEvent.register(end)');
      this.headerNavForceScrollUpEnd = true;
      this.headerScrollToEndForSidebar = true;
    });
    
  };
  
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreLayout({ initialPropsObj }) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeLayout === null) {
    storeLayout = new Store();
  }
  
  
  // --------------------------------------------------
  //   Initial Props
  // --------------------------------------------------
  
  if (initialPropsObj) {
    
    
    // --------------------------------------------------
    //   Pathname
    // --------------------------------------------------
    
    if (lodashHas(initialPropsObj, ['pathname'])) {
      storeLayout.pathname = initialPropsObj.pathname;
    }
    
    
    // --------------------------------------------------
    //   HeaderNavMainArr
    // --------------------------------------------------
    
    if (lodashHas(initialPropsObj, ['headerNavMainArr'])) {
      storeLayout.headerNavMainArr = initialPropsObj.headerNavMainArr;
    }
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeLayout;
  
}