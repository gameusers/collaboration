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


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../@modules/fetch';
import { CustomError } from '../@modules/error/custom';


// --------------------------------------------------
//   Stores
// --------------------------------------------------

import initStoreLayout from '../common/layout/stores/layout';




// --------------------------------------------------
//   Property
// --------------------------------------------------

let storeWebPush = null;
let storeLayout = initStoreLayout({});




/**
 * 通知を送信する
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
  
  console.log(`
    ----------------------------------------\n
    /app/@modules/web-push.js - parse
  `);
  
  console.log(`
    ----- returnObj -----\n
    ${util.inspect(returnObj, { colors: true, depth: null })}\n
    --------------------\n
  `);
  
  
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
   * Subscription Object
   * @type {Object}
   */
  webPushSubscriptionObj = {};
  
  
  
  
  /**
   * Service Worker を登録する
   */
  @action.bound
  async handleServiceWorkerRegister() {
    
    if ('serviceWorker' in navigator) {
      
      
      // ---------------------------------------------
      //   Service Worker を登録する
      // ---------------------------------------------
      
      this.webPushRegistrationObj = await navigator.serviceWorker.register('/service-worker.js', { scope: '/' });
      // console.log('serviceWorkerRegister this.webPushRegistrationObj: ', this.webPushRegistrationObj);
      // console.log(typeof this.webPushRegistrationObj);
      
      
    }
    
  };
  
  
  
  
  /**
   * DB Users に登録する 
   */
  async handleUpdateUsersWebPushSubscriptionObj({ subscriptionObj }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        subscriptionObj,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/db/users/upsert-settings-web-push`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj)
      });
      
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/@stores/web-push.js - handleUpdateUsersWebPushSubscriptionObj
      // `);
      
      // console.log(chalk`
      //   email: {green ${email}}
      //   emailSource: {green ${emailSource}}
      //   emailConfirmation: {green ${emailConfirmation}}
      // `);
      
      
    } catch (errorObj) {
      
      throw errorObj;
      
    }
    
    
  };
  
  
  
  
  /**
   * 購読する
   * 参考：https://github.com/web-push-libs/web-push
   */
  @action.bound
  async handleWebPushSubscribe({ type }) {
    
    
    try {
      
      
      // ---------------------------------------------
      //   購読済みかどうかをチェックする / 購読していない場合は null が返る
      //   購読済みの場合、処理停止
      // ---------------------------------------------
      
      
      // ---------------------------------------------
      //   購読済みかどうかをチェックする / 購読していない場合は null が返る
      //   購読済みの場合、購読を解除する
      // ---------------------------------------------
      
      const oldSubscriptionObj = await this.webPushRegistrationObj.pushManager.getSubscription();
      // console.log('[1] subscriptionObj: ', JSON.parse(JSON.stringify(subscriptionObj)));
      // console.log(typeof subscriptionObj);
      
      if (oldSubscriptionObj) {
        
        const unsubscribe = await oldSubscriptionObj.unsubscribe();
        
        console.log(chalk`
          unsubscribe: {green ${unsubscribe}}
        `);
        
        
        // ---------------------------------------------
        //   subscriptionObj を登録する
        // ---------------------------------------------
        
        // const parsedSubscriptionObj = parse({ obj: subscriptionObj });
        // this.webPushSubscriptionObj = parse({ obj: subscriptionObj });
        
        
        // ---------------------------------------------
        //   DB Users に登録する
        // ---------------------------------------------
        
        // await this.handleUpdateUsersWebPushSubscriptionObj({ parsedSubscriptionObj });
        
        
        // // ---------------------------------------------
        // //   Snackbar: Success
        // // ---------------------------------------------
        
        // storeLayout.handleSnackbarOpen({
        //   variant: 'success',
        //   messageID: 'etyRC_hg3',
        // });
        
        // console.log('購読済み2');
        
        // // ---------------------------------------------
        // //   Return
        // // ---------------------------------------------
        
        // return;
        
        
      }
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      // const formDataObj = {};
      
      
      // // ---------------------------------------------
      // //   Fetch
      // // ---------------------------------------------
      
      // const resultObj = await fetchWrapper({
      //   urlApi: `${process.env.URL_API}/v2/web-push/get-vapid-public-key`,
      //   methodType: 'POST',
      //   formData: JSON.stringify(formDataObj)
      // });
      
      
      // // console.log(`
      // //   ----- resultObj -----\n
      // //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      // //   --------------------\n
      // // `);
      
      
      // // ---------------------------------------------
      // //   Error
      // // ---------------------------------------------
      
      // if ('errorsArr' in resultObj) {
      //   throw new CustomError({ errorsArr: resultObj.errorsArr });
      // }
      
      
      
      
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
      
      // const vapidPublicKey = lodashGet(resultObj, ['data', 'vapidPublicKey'], '');
      // const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
      
      
      const convertedVapidKey = urlBase64ToUint8Array(process.env.WEB_PUSH_VAPID_PUBLIC_KEY);
      
      console.log(chalk`
        process.env.WEB_PUSH_VAPID_PUBLIC_KEY: {green ${process.env.WEB_PUSH_VAPID_PUBLIC_KEY}}
        convertedVapidKey: {green ${convertedVapidKey}}
      `);
      
      
      // ---------------------------------------------
      //   購読済みかどうかをチェックする
      // ---------------------------------------------
      
      // ---------------------------------------------
      //   購読する
      // ---------------------------------------------
      
      const newSubscriptionObj = await this.webPushRegistrationObj.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
      });
      
      // console.log('[2] newSubscriptionObj: ', JSON.stringify(newSubscriptionObj));
      // console.log(typeof newSubscriptionObj);
      
      
      // ---------------------------------------------
      //   通知を許可するかどうか尋ねるダイアログを表示する
      // ---------------------------------------------
      
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        
        
        // ---------------------------------------------
        //   subscriptionObj を保存する
        // ---------------------------------------------
        
        this.webPushSubscriptionObj = parse({ obj: newSubscriptionObj });
        
        
        // ---------------------------------------------
        //   DB Users に登録する
        // ---------------------------------------------
        
        if (type === 'urSettings') {
          this.handleUpdateUsersWebPushSubscriptionObj({ subscriptionObj: this.webPushSubscriptionObj });
        }
        
        
        
      }
      
      // Notification.requestPermission((permission) => {
        
        
      //   // ---------------------------------------------
      //   //   Granted
      //   // ---------------------------------------------
        
      //   if (permission === 'granted') {
          
          
      //     // ---------------------------------------------
      //     //   subscriptionObj を登録する
      //     // ---------------------------------------------
          
      //     this.webPushSubscriptionObj = parse({ obj: newSubscriptionObj });
          
          
      //     // ---------------------------------------------
      //     //   DB Users に登録する
      //     // ---------------------------------------------
          
      //     this.handleUpdateUsersWebPushSubscriptionObj();
          
          
      //     // ---------------------------------------------
      //     //   Snackbar: Success
      //     // ---------------------------------------------
          
      //     storeLayout.handleSnackbarOpen({
      //       variant: 'success',
      //       messageID: 'b1_xylh7Y',
      //     });
          
          
      //   }
        
        console.log(permission); // 'default', 'granted', 'denied'
        
      // });
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/@stores/web-push.js - webPushSubscribe
      // `);
      
      // console.log(chalk`
      //   this.webPushSubscription: {green ${this.webPushSubscription}}
      //   vapidPublicKey: {green ${vapidPublicKey}}
      //   convertedVapidKey: {green ${convertedVapidKey}}
      // `);
      
      // console.log(`
      //   ----- this.webPushRegistrationObj -----\n
      //   ${util.inspect(this.webPushRegistrationObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
    } catch (errorObj) {
      
      
      console.log(`
        ----- errorObj -----\n
        ${util.inspect(errorObj, { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      storeLayout.handleSnackbarOpen({
        variant: 'error',
        messageID: 'KkWs0oIKw',
      });
      
      
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
    
    
    // // --------------------------------------------------
    // //   Header
    // // --------------------------------------------------
    
    // if (lodashHas(propsObj, ['headerObj'])) {
    //   storeWebPush.headerObj = propsObj.headerObj;
    // }
    
    
    // // --------------------------------------------------
    // //   Login
    // // --------------------------------------------------
    
    // if (lodashHas(propsObj, ['login'])) {
    //   storeWebPush.login = propsObj.login;
    // }
    
    
    // // --------------------------------------------------
    // //   Login Users
    // // --------------------------------------------------
    
    // if (lodashHas(propsObj, ['loginUsersObj'])) {
    //   storeWebPush.loginUsersObj = propsObj.loginUsersObj;
    // }
    
    
    // // --------------------------------------------------
    // //   Datetime Current
    // // --------------------------------------------------
    
    // if (lodashHas(propsObj, ['datetimeCurrent'])) {
    //   storeWebPush.setDatetimeCurrent({ ISO8601: propsObj.datetimeCurrent });
    // }
    
    
    // // --------------------------------------------------
    // //   cardPlayersObj
    // // --------------------------------------------------
    
    // if (lodashHas(propsObj, ['cardPlayersObj'])) {
    //   storeWebPush.cardPlayersObj = propsObj.cardPlayersObj;
    // }
    
    
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return storeWebPush;
  
  
}