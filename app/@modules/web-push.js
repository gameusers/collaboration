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
  
  if (!process.env.NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY || !process.env.WEB_PUSH_VAPID_PRIVATE_KEY) {
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
  
  const successArr = [];
  const failureArr = [];
  
  
  for (let valueObj of arr.values()) {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const _id = valueObj._id;
    
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
      
      
      console.log(`
        ----- resultObj -----\n
        ${util.inspect(resultObj, { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      
      // --------------------------------------------------
      //   Success
      // --------------------------------------------------
      
      successArr.push(_id);
      
      
    } catch (errorObj) {
      
      
      console.log(`
        ----- errorObj -----\n
        ${util.inspect(errorObj, { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      
      // --------------------------------------------------
      //   Failure
      // --------------------------------------------------
      
      failureArr.push(_id);
      
      
    }
    
    
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
      url: {green ${url}}
      TTL: {green ${TTL}}
    `);
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return {
    
    successArr: Array.from(new Set(successArr)),
    failureArr: Array.from(new Set(failureArr)),
    
  };
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  
  sendNotifications,
  
};