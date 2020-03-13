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
const moment = require('moment');
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');




// --------------------------------------------------
//   function
// --------------------------------------------------

/**
 * 通知を送信する
 * @param {Object} webPushSubscriptionObj - リクエスト
 * @param {string} _id - _id
 */
const sendNotification = ({
  
  subscriptionObj,
  title,
  body,
  icon,
  tag,
  TTL,
  
}) => {
  
  
  // ---------------------------------------------
  //   必要なデータがない場合は処理停止
  // ---------------------------------------------
  
  if (!process.env.WEB_PUSH_VAPID_PUBLIC_KEY || !process.env.WEB_PUSH_VAPID_PRIVATE_KEY) {
    return;
  }
  
  
  // --------------------------------------------------
  //   オプション
  //   参考：https://github.com/web-push-libs/web-push#sendnotificationpushsubscription-payload-options
  // --------------------------------------------------
  
  const options = {
    TTL
  };
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  console.log(`
    ----------------------------------------\n
    /app/@modules/web-push.js - sendNotification
  `);
  
  console.log(`
    ----- subscriptionObj -----\n
    ${util.inspect(subscriptionObj, { colors: true, depth: null })}\n
    --------------------\n
  `);
  
  console.log(chalk`
    process.env.EMAIL_CONTACT_ADDRESS: {green ${process.env.EMAIL_CONTACT_ADDRESS}}
    title: {green ${title}}
    body: {green ${body}}
    icon: {green ${icon}}
    tag: {green ${tag}}
    TTL: {green ${TTL}}
  `);
  
  
  
  // const vapidKeys = webpush.generateVAPIDKeys();
  
  
  // console.log(`
  //   ----- vapidKeys -----\n
  //   ${util.inspect(vapidKeys, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  // --------------------------------------------------
  //   キーを設定
  // --------------------------------------------------
  
  webpush.setVapidDetails(
    process.env.URL_BASE,
    process.env.WEB_PUSH_VAPID_PUBLIC_KEY,
    process.env.WEB_PUSH_VAPID_PRIVATE_KEY
  );
  
  
  // --------------------------------------------------
  //   送信
  // --------------------------------------------------
  
  webpush.sendNotification(
    subscriptionObj,
    title,
    options
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  sendNotification,
};