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
import TextField from '@material-ui/core/TextField';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import InputAdornment from '@material-ui/core/InputAdornment';
import IconPerson from '@material-ui/icons/Person';
import IconMailOutline from '@material-ui/icons/MailOutline';


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
import { validationUsersEmail } from 'app/@database/users/validations/email.js';


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
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [loginID, setLoginID] = useState(lodashGet(props, ['loginID'], ''));
  const [email, setEmail] = useState(lodashGet(props, ['email'], ''));
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
        validationUsersEmail({ required: true, value: email }).error
        
      ) {
        
        throw new CustomError({ errorsArr: [{ code: 'cOnTqvz3z', messageID: 'uwHIKBy7c' }] });
        
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
        
        loginID,
        email,
        response: recaptchaResponse,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/email-confirmations/upsert-reset-password`,
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
      //   Reset Form
      // ---------------------------------------------
      
      setLoginID('');
      setEmail('');
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      handleSnackbarOpen({
        
        variant: 'success',
        messageID: 'WTynPDVob',
        
      });
      
      
      
      
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
  const validationUsersEmailObj = validationUsersEmail({ value: email });
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/login/reset-password/v2/form-reset-password.js
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
          パスワードを忘れた場合、こちらのフォームを利用してパスワードの再設定を行うことができます。
        </p>
        
        <p
          css={css`
            margin: 0 0 12px 0;
          `}
        >
          ログインIDとアカウントに登録済みのメールアドレスを入力して「パスワードを再設定する」ボタンを押してください。パスワードを再設定する方法が記載されたメールが届きます。30分以内にメールを受信してパスワードの再設定を行ってください。
        </p>
        
        
        <p
          css={css`
            color: red;
          `}
        >
          ※ お持ちのアカウントにメールアドレスを登録していない方は、こちらのページからパスワードの再設定を行うことはできません。Game Users 運営にご連絡ください。
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
              label="メールアドレス"
              value={validationUsersEmailObj.value}
              onChange={(eventObj) => setEmail(eventObj.target.value)}
              error={validationUsersEmailObj.error}
              helperText={intl.formatMessage({ id: validationUsersEmailObj.messageID }, { numberOfCharacters: validationUsersEmailObj.numberOfCharacters })}
              margin="normal"
              inputProps={{
                maxLength: 100,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconMailOutline />
                  </InputAdornment>
                ),
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