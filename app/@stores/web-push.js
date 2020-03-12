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




// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   Web Push
  // ---------------------------------------------
  
  /**
   * Service Worker 登録の結果
   * @type {boolean}
   */
  webPushRegistrationObj = {};
  
  
  /**
   * アクセスした人が購読(subscription)しているかどうかの判定 [true 購読中 / false 購読していない]
   * @type {boolean}
   */
  // @observable webPushSubscription = false;
  
  
  
  
  /**
   * Service Worker を登録する
   */
  @action.bound
  async serviceWorkerRegister() {
    
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
   * 購読する
   * 参考：https://github.com/web-push-libs/web-push
   */
  @action.bound
  async webPushSubscribe() {
    
    
    try {
      
      
      // ---------------------------------------------
      //   購読済みかどうかをチェックする / 購読していない場合は null が返る
      // ---------------------------------------------
      
      const subscriptionObj = await this.webPushRegistrationObj.pushManager.getSubscription();
      console.log('[1] subscriptionObj: ', JSON.stringify(subscriptionObj));
      console.log(typeof subscriptionObj);
      
      // 購読済みの場合、処理停止
      if (subscriptionObj) {
        console.log('購読済み');
        return;
        // this.webPushSubscription = true;
      }
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {};
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        urlApi: `${process.env.URL_API}/v2/web-push/get-vapid-public-key`,
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
      
      const vapidPublicKey = lodashGet(resultObj, ['data', 'vapidPublicKey'], '');
      const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
      
      
      
      
      // ---------------------------------------------
      //   購読済みかどうかをチェックする
      // ---------------------------------------------
      
      if (!this.webPushSubscription) {
        
        
        // ---------------------------------------------
        //   購読する
        // ---------------------------------------------
        
        const subscriptionObj = await this.webPushRegistrationObj.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey
        });
        
        console.log('[2] subscriptionObj: ', JSON.stringify(subscriptionObj));
        console.log(typeof subscriptionObj);
        
        
        // ---------------------------------------------
        //   通知を許可するかどうか尋ねるダイアログを表示する
        // ---------------------------------------------
        
        Notification.requestPermission((permission) => {
          
          
          // ---------------------------------------------
          //   Granted
          // ---------------------------------------------
          
          if (permission === 'granted') {
            
            
            // ---------------------------------------------
            //   Snackbar: Success
            // ---------------------------------------------
            
            storeLayout.handleSnackbarOpen({
              variant: 'success',
              messageID: 'b1_xylh7Y',
            });
            
            
          }
          
          console.log(permission); // 'default', 'granted', 'denied'
          
        });
        
      }
      
      
      
      
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