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
// import moment from 'moment';
// import Cookies from 'js-cookie';

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

// import { fetchWrapper } from 'app/@modules/fetch.js';
// import { CustomError } from 'app/@modules/error/custom.js';


// --------------------------------------------------
//   Stores
// --------------------------------------------------

import initStoreLayout from 'app/common/layout/stores/layout.js';




// --------------------------------------------------
//   Property
// --------------------------------------------------

let storeWebPush = null;
const storeLayout = initStoreLayout({});




/**
 * parse
 * @param {Object} obj - pushManager.getSubscription / pushManager.subscribe の返り値
 */
const parse = ({ obj }) => {
  
  
  // ---------------------------------------------
  //   parse
  // ---------------------------------------------
  
  const parsedObj = JSON.parse(JSON.stringify(obj));
  
  const returnObj = {
    endpoint: lodashGet(parsedObj, ['endpoint'], ''),
    keys: {
      p256dh: lodashGet(parsedObj, ['keys', 'p256dh'], ''),
      auth: lodashGet(parsedObj, ['keys', 'auth'], ''),
    }
  };
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/@modules/web-push.js - parse
  // `);
  
  // console.log(`
  //   ----- returnObj -----\n
  //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return returnObj;
  
  
};




// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   Web Push
  // ---------------------------------------------
  
  /**
   * Service Worker 登録の結果
   * @type {Object}
   */
  webPushRegistrationObj = {};
  
  
  
  
  /**
   * Service Worker を登録する
   */
  @action.bound
  async handleServiceWorkerRegister() {
    
    
    if ('serviceWorker' in navigator) {
      
      
      // ---------------------------------------------
      //   Service Worker を登録する - production
      // ---------------------------------------------
      
      if (process.env.NODE_ENV === 'production') {
        
        this.webPushRegistrationObj = await navigator.serviceWorker.register('/service-worker.js', { scope: '/' });
        
        
      // ---------------------------------------------
      //   登録されている Service Worker を全て削除する
      //   unregister で削除するとデータベースに登録済みの endpoint & p256dh & auth も無効になるため、削除していはいけない。2020/5/21
      //   dev 環境で unregister を行わないと、Chrome で「使用できるソケットを待機しています」と出て固まってしまう。2020/5/30
      // ---------------------------------------------
        
      } else {
        
        this.webPushRegistrationObj = await navigator.serviceWorker.getRegistrations();
        
        for (let registration of this.webPushRegistrationObj) {
          registration.unregister();
        }
        
        console.log('Service Worker / registration.unregister()');
        
      }
      
      
    }
    
    
    
  };
  
  
  
  
  /**
   * 購読する
   * 参考：https://github.com/web-push-libs/web-push
   */
  @action.bound
  async handleWebPushSubscribe() {
    
    
    try {
      
      
      // ---------------------------------------------
      //   本番環境でない場合、必要なデータがない場合は処理停止
      // ---------------------------------------------
      
      if (process.env.NODE_ENV !== 'production' || !process.env.NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY) {
        return;
      }
      
      
      
      
      // ---------------------------------------------
      //   購読済みかどうかをチェックする / 購読していない場合は null が返る
      //   購読済みの場合、購読を解除する
      // ---------------------------------------------
      
      const oldSubscriptionObj = await this.webPushRegistrationObj.pushManager.getSubscription();
      
      
      console.log(`
        ----------------------------------------\n
        /app/@stores/web-push.js - webPushSubscribe
      `);
      
      console.log(`
        ----- oldSubscriptionObj -----\n
        ${util.inspect(JSON.parse(JSON.stringify(oldSubscriptionObj)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      
      if (oldSubscriptionObj) {
        
        
        // ---------------------------------------------
        //   subscriptionObj を返す
        // ---------------------------------------------
        
        return parse({ obj: oldSubscriptionObj });
        
        
        // ---------------------------------------------
        //   解除してから登録しなおす場合
        // ---------------------------------------------
        
        // true 解除成功 / false 解除失敗
        // const unsubscribe = await oldSubscriptionObj.unsubscribe();
        
        // console.log(chalk`
        //   unsubscribe: {green ${unsubscribe}}
        // `);
        
      }
      
      
      
      
      // ---------------------------------------------
      //   applicationServerKey を作成する
      // ---------------------------------------------
      
      const urlBase64ToUint8Array = (base64String) => {
        
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
          .replace(/-/g, '+')
          .replace(/_/g, '/');
      
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
      
        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        
        return outputArray;
        
      };
      
      const convertedVapidKey = urlBase64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY);
      
      
      
      
      // ---------------------------------------------
      //   購読する
      // ---------------------------------------------
      
      const newSubscriptionObj = await this.webPushRegistrationObj.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
      });
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/@stores/web-push.js - webPushSubscribe
      // `);
      
      // console.log(chalk`
      //   process.env.NODE_ENV: {green ${process.env.NODE_ENV}}
      //   process.env.NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY: {green ${process.env.NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY}}
      //   convertedVapidKey: {green ${convertedVapidKey}}
      // `);
      
      console.log(`
        ----- newSubscriptionObj -----\n
        ${util.inspect(JSON.parse(JSON.stringify(newSubscriptionObj)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      // console.log(`
      //   ----- this.webPushRegistrationObj -----\n
      //   ${util.inspect(this.webPushRegistrationObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   通知を許可するかどうか尋ねるダイアログを表示する
      // ---------------------------------------------
      
      // 'default', 'granted', 'denied' が返り値
      const permission = await Notification.requestPermission();
      
      // 許可した場合
      if (permission === 'granted') {
        
        
        // ---------------------------------------------
        //   subscriptionObj を返す
        // ---------------------------------------------
        
        return parse({ obj: newSubscriptionObj });
        
        
      }
      
      
    } catch (errorObj) {
      
      throw errorObj;
      
    }
    
    
  };
  
  
  
  
  /**
   * 購読を解除する
   */
  @action.bound
  async handleWebPushUnsubscribe() {
    
    
    try {
      
      
      // ---------------------------------------------
      //   本番環境でない場合、必要なデータがない場合は処理停止
      // ---------------------------------------------
      
      if (process.env.NODE_ENV !== 'production' || !process.env.NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY) {
        return;
      }
      
      
      
      
      // ---------------------------------------------
      //   購読済みかどうかをチェックする / 購読していない場合は null が返る
      //   購読済みの場合、購読を解除する
      // ---------------------------------------------
      
      const oldSubscriptionObj = await this.webPushRegistrationObj.pushManager.getSubscription();
      
      if (oldSubscriptionObj) {
        
        // true 解除成功 / false 解除失敗
        const unsubscribe = await oldSubscriptionObj.unsubscribe();
        
        // console.log(chalk`
        //   unsubscribe: {green ${unsubscribe}}
        // `);
        
        
        // ---------------------------------------------
        //   購読解除成功
        // ---------------------------------------------
        
        return true;
        
      }
      
      
      // ---------------------------------------------
      //   購読解除失敗
      // ---------------------------------------------
      
      return false;
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/@stores/web-push.js - webPushUnsubscribe
      // `);
      
      // console.log(chalk`
      //   unsubscribe: {green ${unsubscribe}}
      // `);
      
      
    } catch (errorObj) {
      
      throw errorObj;
      
    }
    
    
  };
  
  
}




// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreWebPush({ propsObj }) {
  
  
  // --------------------------------------------------
  //   Store
  // --------------------------------------------------
  
  if (storeWebPush === null) {
    storeWebPush = new Store();
  }
  
  
  // --------------------------------------------------
  //   Props
  // --------------------------------------------------
  
  if (propsObj) {
    
    
    // --------------------------------------------------
    //   cookie
    // --------------------------------------------------
    
    // if (lodashHas(propsObj, ['cookie'])) {
    //   storeWebPush.cookie = propsObj.cookie;
    // }
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeWebPush;
  
  
}