// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const webpush = require('web-push');


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');




// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

// import chalk from 'chalk';
// import util from 'util';


// // ---------------------------------------------
// //   Node Packages
// // ---------------------------------------------

// import webpush from 'web-push';


// // ---------------------------------------------
// //   Lodash
// // ---------------------------------------------

// import lodashGet from 'lodash/get';
// import lodashSet from 'lodash/set';






// --------------------------------------------------
//   function
// --------------------------------------------------

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




/**
* Service Worker を登録する
*/
const handleServiceWorkerRegister = async () => {
  
  
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
      
      // console.log('Service Worker / registration.unregister()');
      
    }
    
    
  }
  
  
};




/**
* 購読する
* 参考：https://github.com/web-push-libs/web-push
*/
const handleWebPushSubscribe = async () => {
  
  
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
      /app/@modules/web-push.js - webPushSubscribe
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
    //   /app/@modules/web-push.js - webPushSubscribe
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
const handleWebPushUnsubscribe = async () => {
  
  
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
    //   /app/@modules/web-push.js - webPushUnsubscribe
    // `);
    
    // console.log(chalk`
    //   unsubscribe: {green ${unsubscribe}}
    // `);
    
    
  } catch (errorObj) {
    
    throw errorObj;
    
  }
  
  
};




/**
 * 通知を送信する / 2020/5/21
 * @param {Array} arr - 送信に必要なデータが入った配列
 */
const sendNotifications = async ({ arr = [] }) => {
  
  
  // ---------------------------------------------
  //   必要なデータがない場合は処理停止
  // ---------------------------------------------
  
  if (!process.env.NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY || !process.env.WEB_PUSH_VAPID_PRIVATE_KEY || arr.length === 0) {
    return;
  }
  
  
  
  
  // --------------------------------------------------
  //   キーを設定
  // --------------------------------------------------
  
  webpush.setVapidDetails(
    process.env.NEXT_PUBLIC_URL_BASE,
    process.env.NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY,
    process.env.WEB_PUSH_VAPID_PRIVATE_KEY
  );
  
  
  
  
  // --------------------------------------------------
  //   Loop
  // --------------------------------------------------
  
  const successesArr = [];
  const failuresArr = [];
  
  
  for (let valueObj of arr.values()) {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const webPushes_id = valueObj.webPushes_id;
    
    const subscriptionObj = valueObj.subscriptionObj;
    
    let title = valueObj.title;
    
    if (title.length > 20) {
      title = title.substr(0, 19) + '…';
    }
    
    let body = valueObj.body;
    
    if (body.length > 30) {
      body = body.substr(0, 29) + '…';
    }
    
    const icon = valueObj.icon;
    const tag = valueObj.tag;
    const url = valueObj.url;
    const TTL = valueObj.TTL;
    
    
    
    
    // --------------------------------------------------
    //   必要な情報がない場合は処理停止
    // --------------------------------------------------
    
    if (!subscriptionObj || !title || !body || !TTL) {
      return;
    }
    
    
    
    
    // --------------------------------------------------
    //   Payload
    // --------------------------------------------------
    
    const payloadObj = {
      
      title,
      body,
      icon,
      tag,
      url,
      
    };
    
    const payload = JSON.stringify(payloadObj);
    
    
    // --------------------------------------------------
    //   オプション
    //   参考：https://github.com/web-push-libs/web-push#sendnotificationpushsubscription-payload-options
    // --------------------------------------------------
    
    const optionsObj = {
      
      TTL
      
    };
    
    
    
    
    // --------------------------------------------------
    //   送信
    // --------------------------------------------------
    
    try {
      
      
      // --------------------------------------------------
      //   Send
      // --------------------------------------------------
      
      const resultObj = await webpush.sendNotification(
        
        subscriptionObj,
        payload,
        optionsObj
        
      );
      
      
      // console.log(`
      //   /app/@modules/web-push.js - sendNotifications
        
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // --------------------------------------------------
      //   Success
      // --------------------------------------------------
      
      successesArr.push(webPushes_id);
      
      
    } catch (errorObj) {
      
      
      // console.log(`
      //   /app/@modules/web-push.js - sendNotifications
      
      //   ----- errorObj -----\n
      //   ${util.inspect(errorObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // --------------------------------------------------
      //   Error
      // --------------------------------------------------
      
      failuresArr.push(webPushes_id);
      
      
    }
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@modules/web-push.js - sendNotifications
    // `);
    
    // console.log(`
    //   ----- subscriptionObj -----\n
    //   ${util.inspect(subscriptionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   title: {green ${title}}
    //   body: {green ${body}}
    //   icon: {green ${icon}}
    //   tag: {green ${tag}}
    //   url: {green ${url}}
    //   TTL: {green ${TTL}}
    // `);
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return {
    
    successesArr: Array.from(new Set(successesArr)),
    failuresArr: Array.from(new Set(failuresArr)),
    
  };
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  
  // handleServiceWorkerRegister,
  // handleWebPushSubscribe,
  // handleWebPushUnsubscribe,
  
  sendNotifications,
  
};