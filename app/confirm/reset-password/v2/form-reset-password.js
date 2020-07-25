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
import { Element } from 'react-scroll';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import InputAdornment from '@material-ui/core/InputAdornment';
import IconPerson from '@material-ui/icons/Person';
import IconLock from '@material-ui/icons/Lock';
import IconLockTwoToneOutlined from '@material-ui/icons/LockTwoTone';
import IconVisibility from '@material-ui/icons/Visibility';
import IconVisibilityOff from '@material-ui/icons/VisibilityOff';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateLayout } from 'app/@states/layout.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { CustomError } from 'app/@modules/error/custom.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationUsersLoginID } from 'app/@database/users/validations/login-id.js';
import { validationUsersLoginPassword, validationUsersLoginPasswordConfirmation } from 'app/@database/users/validations/login-password.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from 'app/common/layout/v2/components/panel.js';






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
    
    emailConfirmationID,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [loginID, setLoginID] = useState(lodashGet(props, ['loginID'], ''));
  const [loginPassword, setLoginPassword] = useState('');
  const [loginPasswordShow, setLoginPasswordShow] = useState(false);
  const [loginPasswordConfirmation, setLoginPasswordConfirmation] = useState('');
  const [loginPasswordConfirmationShow, setLoginPasswordConfirmationShow] = useState(false);
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
    handleScrollTo,
    
  } = stateLayout;
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  /**
   * フォームを送信する
   * @param {Object} eventObj - イベント
   */
  const handleSubmit = async ({
    
    eventObj,
    
  }) => {
    
    
    // ---------------------------------------------
    //   フォームの送信処理停止
    // ---------------------------------------------
    
    eventObj.preventDefault();
    
    
    
    
    try {
      
      
      // ---------------------------------------------
      //   Validations
      // ---------------------------------------------
      
      if (
        
        validationUsersLoginID({ required: true, value: loginID }).error ||
        validationUsersLoginPassword({ required: true, value: loginPassword, loginID }).error ||
        validationUsersLoginPasswordConfirmation({ required: true, value: loginPasswordConfirmation, loginPassword }).error
        
      ) {
        
        throw new CustomError({ errorsArr: [{ code: 'qopQI5Buk', messageID: 'uwHIKBy7c' }] });
        
      }
      
      
      
      
      // ---------------------------------------------
      //   Loading Open
      // ---------------------------------------------
      
      handleLoadingOpen({});
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      setButtonDisabled(true);
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        emailConfirmationID,
        loginID,
        loginPassword,
        response: recaptchaResponse,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/users/upsert-reset-password`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
        
      });
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      setButtonDisabled(false);
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      handleSnackbarOpen({
        
        variant: 'success',
        messageID: 'PFM5HPcyd',
        
      });
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formData = new FormData();
      
      formData.append('loginID', loginID);
      formData.append('loginPassword', loginPassword);
      formData.append('response', recaptchaResponse);
      
      
      // ---------------------------------------------
      //   Fetch - Login
      // ---------------------------------------------
      
      const resultLoginObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v1/login/login`,
        methodType: 'POST',
        formData: formData,
        
      });
      
      
      // console.log(`
      //   ----- resultLoginObj -----\n
      //   ${util.inspect(resultLoginObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      // ---------------------------------------------
      //   Page Transition
      // ---------------------------------------------
      
      const userID = lodashGet(resultLoginObj, ['data', 'userID'], '');
      window.location.href = `${process.env.NEXT_PUBLIC_URL_BASE}ur/${userID}`;
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/ur/v2/setting/form-account.js / handleSubmit
      // `);
      
      // console.log(`
      //   ----- formDataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(formDataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      setButtonDisabled(false);
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      handleSnackbarOpen({
        
        variant: 'error',
        errorObj,
        
      });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Scroll
      // ---------------------------------------------
      
      handleScrollTo({
        
        to: 'formResetPassword',
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
      
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
  const validationUsersLoginPasswordConfirmationObj = validationUsersLoginPasswordConfirmation({ value: loginPasswordConfirmation, loginPassword });
  
  
  
  
  // --------------------------------------------------
  //   パスワードの強度
  // --------------------------------------------------
  
  const passwordColorArr = ['red', 'red', 'tomato', 'green', 'green'];
  const passwordStrengthArr = ['とても危険', '危険', '普通', '安全', 'とても安全'];
  
  let passwordColor = passwordColorArr[validationUsersLoginPasswordObj.strengthScore];
  let passwordStrength = passwordStrengthArr[validationUsersLoginPasswordObj.strengthScore];
  
  if (loginPassword === '') {
    
    passwordColor = '#848484';
    passwordStrength = ' -';
    
  }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/forum/v2/components/forum.js
  // `);
  
  // console.log(chalk`
  //   urlID: {green ${urlID}}
  //   gameCommunities_id: {green ${gameCommunities_id}}
  //   userCommunityID: {green ${userCommunityID}}
  //   userCommunities_id: {green ${userCommunities_id}}
    
  //   page: {green ${page}}
  //   count: {green ${count}}
  //   limit: {green ${limit}}
  // `);
  
  // console.log(`
  //   ----- arr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Element
      css={css`
        margin: 14px 0 0 0;
      `}
      name="formResetPassword"
    >
      
      
      {/* reCAPTCHA */}
      <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
        <GoogleReCaptcha onVerify={(token) => setRecaptchaResponse(token)} />
      </GoogleReCaptchaProvider>
      
      
      
      
      <Panel
        heading="パスワード再設定"
        defaultExpanded={true}
      >
        
        
        <p
          css={css`
            margin: 0 0 12px 0;
          `}
        >
          パスワードを変更するアカウントのログインIDと、新しいパスワードを入力して送信してください。
        </p>
        
        <p>
          IDとパスワードに利用できる文字は、半角英数字とハイフン( - )アンダースコア( _ )です。※ IDは6文字以上、32文字以内。パスワードは8文字以上、32文字以内。
        </p>
        
        
        
        
        {/* フォーム */}
        <form
          name="formResetPassword"
          onSubmit={(eventObj) => handleSubmit({
            eventObj,
          })}
        >
          
          
          {/* Login ID */}
          <div
            css={css`
              border-top: 1px dashed #848484;
              margin: 36px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            
            <TextField
              css={css`
                && {
                  width: 100%;
                  max-width: 500px;
                }
              `}
              label="ログインID"
              value={validationUsersLoginIDObj.value}
              onChange={(eventObj) => setLoginID(eventObj.target.value)}
              error={validationUsersLoginIDObj.error}
              helperText={intl.formatMessage({ id: validationUsersLoginIDObj.messageID }, { numberOfCharacters: validationUsersLoginIDObj.numberOfCharacters })}
              margin="normal"
              inputProps={{
                maxLength: 32,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconPerson />
                  </InputAdornment>
                ),
              }}
            />
            
            
            
            
            <TextField
              css={css`
                && {
                  width: 100%;
                  max-width: 500px;
                }
              `}
              label="パスワード"
              type={loginPasswordShow ? 'text' : 'password'}
              value={validationUsersLoginPasswordObj.value}
              onChange={(eventObj) => setLoginPassword(eventObj.target.value)}
              error={validationUsersLoginPasswordObj.error}
              helperText={intl.formatMessage({ id: validationUsersLoginPasswordObj.messageID }, { numberOfCharacters: validationUsersLoginPasswordObj.numberOfCharacters })}
              margin="normal"
              inputProps={{
                maxLength: 32,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconLock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={() => setLoginPasswordShow(!loginPasswordShow)}
                      onMouseDown={(eventObj) => {eventObj.preventDefault()}}
                    >
                      {loginPasswordShow ? <IconVisibility /> : <IconVisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            
            
            <div
              css={css`
                font-size: 12px;
                margin: 4px 0 0 0;
                color: ${passwordColor};
              `}
            >
              パスワード強度：{passwordStrength}
            </div>
            
            
            
            
            <TextField
              css={css`
                && {
                  width: 100%;
                  max-width: 500px;
                }
              `}
              label="パスワード確認"
              type={loginPasswordConfirmationShow ? 'text' : 'password'}
              value={validationUsersLoginPasswordConfirmationObj.value}
              onChange={(eventObj) => setLoginPasswordConfirmation(eventObj.target.value)}
              error={validationUsersLoginPasswordConfirmationObj.error}
              helperText={intl.formatMessage({ id: validationUsersLoginPasswordConfirmationObj.messageID }, { numberOfCharacters: validationUsersLoginPasswordConfirmationObj.numberOfCharacters })}
              margin="normal"
              inputProps={{
                maxLength: 32,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconLockTwoToneOutlined />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={() => setLoginPasswordConfirmationShow(!loginPasswordConfirmationShow)}
                      onMouseDown={(eventObj) => {eventObj.preventDefault()}}
                    >
                      {loginPasswordConfirmationShow ? <IconVisibility /> : <IconVisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            
          </div>
          
          
          
          
          {/* Submit Button */}
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
              border-top: 1px dashed #848484;
              margin: 24px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={buttonDisabled}
            >
              送信する
            </Button>
            
          </div>
          
          
        </form>
        
        
      </Panel>
      
      
    </Element>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;