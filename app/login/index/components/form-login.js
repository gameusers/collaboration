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

import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


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
//   Validations
// ---------------------------------------------

const { validationUsersLoginID } = require('../../../../app/@database/users/validations/login-id');
const { validationUsersLoginPassword } = require('../../../../app/@database/users/validations/login-password');


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from '../../../../app/common/layout/components/panel';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeLoginIndex')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    
    // --------------------------------------------------
    //   super
    // --------------------------------------------------
    
    super(props);
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    this.pathArr = ['formLogin'];
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ pathArr: this.pathArr });
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, storeLoginIndex, intl } = this.props;
    
    const {
      
      dataObj,
      handleEdit,
      handleRecaptchaReset,
      handlePasswordShow,
      handlePasswordMouseDown,
      handleLogin,
      
    } = storeLoginIndex;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   Login ID - Validation
    // --------------------------------------------------
    
    const loginID = lodashGet(dataObj, ['loginID'], '');
    const validationUsersLoginIDObj = validationUsersLoginID({ value: loginID });
    
    
    // --------------------------------------------------
    //   Login Password - Validation
    // --------------------------------------------------
    
    const loginPasswordShow = lodashGet(dataObj, ['loginPasswordShow'], false);
    const loginPassword = lodashGet(dataObj, ['loginPassword'], '');
    const validationUsersLoginPasswordObj = validationUsersLoginPassword({ value: loginPassword, loginID });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- form-login.js / stores -----\n
    //   ${util.inspect(stores, { colors: true, depth: null })}\n
    //   --------------------\n
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
    //   process.env.VERIFY_RECAPTCHA: {green ${process.env.VERIFY_RECAPTCHA} / ${typeof process.env.VERIFY_RECAPTCHA}}
    //   process.env.VERIFY_RECAPTCHA === '0': {green ${process.env.VERIFY_RECAPTCHA === '0'}}
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Panel
        heading="ログイン - ID & パスワード"
        pathArr={this.pathArr}
      >
        
        
        <p>
          IDとパスワードでログインします。アカウントをお持ちでない場合は、<Link href="/login/account"><a>こちらのページ</a></Link>でアカウントを作成してください。
        </p>
        
        
        
        
        {/* Form */}
        <form
          onSubmit={(eventObj) => process.env.VERIFY_RECAPTCHA === '1' ? handleRecaptchaReset({ eventObj, formType: 'login' }) : handleLogin({ eventObj })}
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
              onChange={(eventObj) => handleEdit({
                pathArr: ['loginID'],
                value: eventObj.target.value
              })}
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
              onChange={(eventObj) => handleEdit({
                pathArr: ['loginPassword'],
                value: eventObj.target.value
              })}
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
                      onClick={handlePasswordShow}
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
    
  }
  
});