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
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');




// --------------------------------------------------
//   function
// --------------------------------------------------

/**
 * 通知を送信する
 * @param {Array} arr - 送信に必要なデータが入った配列
 */
const sendNotifications = async ({ arr }) => {
  
  
  // ---------------------------------------------
  //   必要なデータがない場合は処理停止
  // ---------------------------------------------
  
  if (!process.env.WEB_PUSH_VAPID_PUBLIC_KEY || !process.env.WEB_PUSH_VAPID_PRIVATE_KEY) {
    return;
  }
  
  
  // --------------------------------------------------
  //   キーを設定
  // --------------------------------------------------
  
  webpush.setVapidDetails(
    process.env.URL_BASE,
    process.env.WEB_PUSH_VAPID_PUBLIC_KEY,
    process.env.WEB_PUSH_VAPID_PRIVATE_KEY
  );
  
  
  
  
  // --------------------------------------------------
  //   Loop
  // --------------------------------------------------
  
  for (let valueObj of arr.values()) {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const subscriptionObj = valueObj.subscriptionObj;
    const title = valueObj.title;
    const body = valueObj.body;
    const icon = valueObj.icon;
    const tag = valueObj.tag;
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
    
    const resultObj = await webpush.sendNotification(
      subscriptionObj,
      payload,
      optionsObj
    );
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    console.log(`
      ----------------------------------------\n
      /app/@modules/web-push.js - sendNotifications
    `);
    
    console.log(`
      ----- subscriptionObj -----\n
      ${util.inspect(subscriptionObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    console.log(chalk`
      title: {green ${title}}
      body: {green ${body}}
      icon: {green ${icon}}
      tag: {green ${tag}}
      TTL: {green ${TTL}}
    `);
    
    console.log(`
      ----- resultObj -----\n
      ${util.inspect(resultObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
  }
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  sendNotifications,
};