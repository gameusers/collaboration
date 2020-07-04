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

import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
// import lodashSet from 'lodash/set';
// import lodashHas from 'lodash/has';
// import lodashCloneDeep from 'lodash/cloneDeep';
// import lodashMerge from 'lodash/merge';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { makeStyles } from '@material-ui/core/styles';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateUser } from 'app/@states/user.js';
import { ContainerStateLayout } from 'app/@states/layout.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

// import { fetchWrapper } from 'app/@modules/fetch.js';
// import { CustomError } from 'app/@modules/error/custom.js';






// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const useStyles = makeStyles({
  
  label: {
    fontSize: 14
  },
  
});






// --------------------------------------------------
//   Function Components
// --------------------------------------------------

/**
 * Export Component
 */
const Component = (props) => {
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    webPushAvailable,
    setWebPushAvailable,
    // webPushSubscriptionObj,
    setWebPushSubscriptionObj,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const classes = useStyles();
  
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateUser = ContainerStateUser.useContainer();
  const stateLayout = ContainerStateLayout.useContainer();
  
  const { serviceWorkerRegistrationObj } = stateUser;
  
  const {
    
    handleSnackbarOpen,
    // handleDialogOpen,
    handleLoadingOpen,
    handleLoadingClose,
    // handleScrollTo,
    
  } = stateLayout;
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  /**
   * プッシュ通知を許可する（チェックボックス）
   * @param {boolean} checked - チェックの状態
   */
  const handleCheck = async (checked) => {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Loading Open
      // ---------------------------------------------
      
      handleLoadingOpen({});
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      setButtonDisabled(true);
      
      
      
      
      // ---------------------------------------------
      //   Subscribe
      // ---------------------------------------------
      
      let oldSubscriptionObj = {};
      let newSubscriptionObj = {};
      let webPushSubscriptionObj = {};
      
      
      if (checked && process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY) {
        
        
        // ---------------------------------------------
        //   購読済みかどうかをチェックする / 購読していない場合は null が返る
        //   すでに購読済みの場合
        // ---------------------------------------------
        
        oldSubscriptionObj = await serviceWorkerRegistrationObj.pushManager.getSubscription();
        
        
        if (oldSubscriptionObj) {
          
          
          // ---------------------------------------------
          //   webPushSubscriptionObj
          // ---------------------------------------------
          
          const parsedObj = JSON.parse(JSON.stringify(oldSubscriptionObj));
          
          webPushSubscriptionObj = {
            
            endpoint: lodashGet(parsedObj, ['endpoint'], ''),
            keys: {
              p256dh: lodashGet(parsedObj, ['keys', 'p256dh'], ''),
              auth: lodashGet(parsedObj, ['keys', 'auth'], ''),
            }
            
          };
          
          
          // ---------------------------------------------
          //   解除してから登録しなおす場合
          // ---------------------------------------------
          
          // true 解除成功 / false 解除失敗
          // const unsubscribe = await oldSubscriptionObj.unsubscribe();
          
          // console.log(chalk`
          //   unsubscribe: {green ${unsubscribe}}
          // `);
          
          
        // ---------------------------------------------
        //   新しく購読する場合
        // ---------------------------------------------
          
        } else {
          
          
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
          
          newSubscriptionObj = await serviceWorkerRegistrationObj.pushManager.subscribe({
            
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey,
            
          });
          
          
          
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
            
            const parsedObj = JSON.parse(JSON.stringify(newSubscriptionObj));
            
            webPushSubscriptionObj = {
              
              endpoint: lodashGet(parsedObj, ['endpoint'], ''),
              keys: {
                p256dh: lodashGet(parsedObj, ['keys', 'p256dh'], ''),
                auth: lodashGet(parsedObj, ['keys', 'auth'], ''),
              }
              
            };
            
            
          }
            
            
        }
          
        
      }
      
      
      
      
      // ---------------------------------------------
      //   更新
      // ---------------------------------------------
      
      setWebPushAvailable(!webPushAvailable);
      setWebPushSubscriptionObj(webPushSubscriptionObj);
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      console.log(`
        ----------------------------------------\n
        /app/common/web-push/v2/components/checkbox.js - handleCheck
      `);
      
      console.log(chalk`
        process.env.NODE_ENV: {green ${process.env.NODE_ENV}}
        process.env.NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY: {green ${process.env.NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY}}
      `);
      
      console.log(`
        ----- oldSubscriptionObj -----\n
        ${util.inspect(JSON.parse(JSON.stringify(oldSubscriptionObj)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      console.log(`
        ----- newSubscriptionObj -----\n
        ${util.inspect(JSON.parse(JSON.stringify(newSubscriptionObj)), { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      console.log(`
        ----- webPushSubscriptionObj -----\n
        ${util.inspect(webPushSubscriptionObj, { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      handleSnackbarOpen({
        
        variant: 'error',
        messageID: 'KkWs0oIKw',
        
      });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      setButtonDisabled(false);
      
      
      // ---------------------------------------------
      //   Loading Close
      // ---------------------------------------------
      
      handleLoadingClose();
      
      
    }
    
    
  };
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/hardware/v2/components/form.js
  // `);
  
  // console.log(`
  //   ----- hardwaresArr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(hardwaresArr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(chalk`
  //   value: {green ${value}}
  //   alternativeText: {green ${alternativeText}}
  //   search: {green ${search}}
  //   age: {green ${age}}
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <FormControlLabel
      classes={{
        label: classes.label
      }}
      control={
        <Checkbox
          checked={webPushAvailable}
          disabled={buttonDisabled}
          onChange={(eventObj) => handleCheck(eventObj.target.checked)}
        />
      }
      label="プッシュ通知を許可する"
    />
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;