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
import Link from 'next/link';
import Router from 'next/router';
import { useIntl } from 'react-intl';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
// import lodashCloneDeep from 'lodash/cloneDeep';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconID from '@material-ui/icons/Person';
import IconPassword from '@material-ui/icons/Lock';
import IconVisibility from '@material-ui/icons/Visibility';
import IconVisibilityOff from '@material-ui/icons/VisibilityOff';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { CustomError } from 'app/@modules/error/custom.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationUsersLoginID } from 'app/@database/users/validations/login-id.js';
import { validationUsersLoginPassword } from 'app/@database/users/validations/login-password.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from 'app/common/layout/v2/components/panel.js';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateLayout } from 'app/@states/layout.js';






// --------------------------------------------------
//   Function Components
// --------------------------------------------------

/**
 * Export Component
 */
const Component = (props) => {
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [loginID, setLoginID] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginPasswordShow, setLoginPasswordShow] = useState(false);
  const [recaptchaResponse, setRecaptchaResponse] = useState('');
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateLayout = ContainerStateLayout.useContainer();
  
  const {
    
    handleSnackbarOpen,
    handleLoadingOpen,
    handleLoadingClose,
    // handleScrollTo,
    
  } = stateLayout;
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  /**
   * ログインパスワード入力フォーム onMouseDown で呼び出される
   * Material UI のページに解説されているとおりに入れている
   * 参考：https://material-ui.com/demos/text-fields/#input-adornments
   * @param {Object} eventObj - イベント
   */
  const handlePasswordMouseDown = (eventObj) => {
    eventObj.preventDefault();
  };
  
  
  
  
  /**
   * ログインフォームを送信する
   * @param {Object} eventObj - イベント
   */
  const handleSubmit = async ({
    
    eventObj,
    
  }) => {
    
    
    try {
      
      
      // ---------------------------------------------
      //   フォームの送信処理停止
      // ---------------------------------------------
      
      eventObj.preventDefault();
      
      
      
      
      // ---------------------------------------------
      //   Loading Open
      // ---------------------------------------------
      
      handleLoadingOpen({});
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      setButtonDisabled(true);
      
      
      
      
      // ---------------------------------------------
      //   Validation
      // ---------------------------------------------
      
      const validationUsersLoginIDObj = validationUsersLoginID({ required: true, value: loginID });
      const validationUsersLoginPasswordObj = validationUsersLoginPassword({ required: true, value: loginPassword, loginID });
      
      if (validationUsersLoginIDObj.error || validationUsersLoginPasswordObj.error) {
        throw new CustomError({ errorsArr: [{ code: '0oSjjQhm3', messageID: 'uwHIKBy7c' }] });
      }
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formData = new FormData();
      
      formData.append('loginID', loginID);
      formData.append('loginPassword', loginPassword);
      formData.append('response', recaptchaResponse);
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v1/login/login`,
        methodType: 'POST',
        formData,
        
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
      //   Form Reset
      // ---------------------------------------------
      
      setLoginID('');
      setLoginPassword('');
      setLoginPasswordShow(false);
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      handleSnackbarOpen({
        variant: 'success',
        messageID: '5Gf730Gmz',
      });
      
      
      
      
      // ---------------------------------------------
      //   Router.push = History API pushState()
      // ---------------------------------------------
      
      const userID = lodashGet(resultObj, ['data', 'userID'], '');
      const url = `/ur/[userID]/index?userID=${userID}`;
      const as = `/ur/${userID}`;
      
      Router.push(url, as);
      
      
      
      // ---------------------------------------------
      //   Page Transition
      // ---------------------------------------------
      
      // const userID = lodashGet(resultObj, ['data', 'userID'], '');
      // window.location.href = `${process.env.NEXT_PUBLIC_URL_BASE}ur/${userID}`;
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      handleSnackbarOpen({
        variant: 'error',
        errorObj,
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
  //   Validations
  // --------------------------------------------------
  
  const validationUsersLoginIDObj = validationUsersLoginID({ value: loginID });
  const validationUsersLoginPasswordObj = validationUsersLoginPassword({ value: loginPassword, loginID });
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/login/index/components/form-login.js
  // `);
  
  // console.log(`
  //   ----- validationUsersLoginIDObj -----\n
  //   ${util.inspect(validationUsersLoginIDObj, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(`
  //   ----- validationUsersLoginPasswordObj -----\n
  //   ${util.inspect(validationUsersLoginPasswordObj, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(chalk`
  //   recaptchaRef: {green ${recaptchaRef}}
  // `);
  
  
  // console.log(chalk`
  //   process.env.NEXT_PUBLIC_VERIFY_RECAPTCHA: {green ${process.env.NEXT_PUBLIC_VERIFY_RECAPTCHA} / ${typeof process.env.NEXT_PUBLIC_VERIFY_RECAPTCHA}}
  //   process.env.NEXT_PUBLIC_VERIFY_RECAPTCHA === '0': {green ${process.env.NEXT_PUBLIC_VERIFY_RECAPTCHA === '0'}}
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Panel
      heading="ログイン - ID & パスワード"
      defaultExpanded={true}
    >
      
      
      {/* reCAPTCHA */}
      <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
        <GoogleReCaptcha onVerify={(token) => setRecaptchaResponse(token)} />
      </GoogleReCaptchaProvider>
      
      
      
      
      <p>
        IDとパスワードでログインします。アカウントをお持ちでない場合は、<Link href="/login/account"><a>こちらのページ</a></Link>でアカウントを作成してください。
      </p>
      
      
      
      
      {/* Form */}
      <form
        onSubmit={(eventObj) => handleSubmit({
          eventObj
        })}
      >
        
        
        {/* Login ID */}
        <div>
          <TextField
            css={css`
              width: 400px;
              
              @media screen and (max-width: 480px) {
                width: 100%;
              }
            `}
            id="loginID"
            label="ID"
            value={validationUsersLoginIDObj.value}
            onChange={(eventObj) => setLoginID(eventObj.target.value)}
            error={validationUsersLoginIDObj.error}
            helperText={intl.formatMessage({ id: validationUsersLoginIDObj.messageID }, { numberOfCharacters: validationUsersLoginIDObj.numberOfCharacters })}
            disabled={buttonDisabled}
            margin="normal"
            inputProps={{
              maxLength: 32,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconID />
                </InputAdornment>
              ),
            }}
          />
        </div>
        
        
        
        
        {/* Login Password */}
        <div>
          <TextField
            css={css`
              width: 400px;
              
              @media screen and (max-width: 480px) {
                width: 100%;
              }
            `}
            id="loginPassword"
            label="パスワード"
            type={loginPasswordShow ? 'text' : 'password'}
            value={validationUsersLoginPasswordObj.value}
            onChange={(eventObj) => setLoginPassword(eventObj.target.value)}
            error={validationUsersLoginPasswordObj.error}
            helperText={intl.formatMessage({ id: validationUsersLoginPasswordObj.messageID }, { numberOfCharacters: validationUsersLoginPasswordObj.numberOfCharacters })}
            disabled={buttonDisabled}
            margin="normal"
            inputProps={{
              maxLength: 32,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconPassword />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={() => setLoginPasswordShow(!loginPasswordShow)}
                    onMouseDown={handlePasswordMouseDown}
                  >
                    {loginPasswordShow ? <IconVisibilityOff /> : <IconVisibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>
        
        
        <p
          css={css`
            font-size: 12px;
            margin: 6px 0 30px 0;
          `}
        >
          <Link href="/login/reset-password"><a>パスワードを忘れた方はこちら</a></Link>
        </p>
        
        
        
        
        {/* Submit Button */}
        <div
          css={css`
            margin: 24px 0 0 0;
          `}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={buttonDisabled}
          >
            ログイン
          </Button>
        </div>
        
        
      </form>
      
      
    </Panel>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;