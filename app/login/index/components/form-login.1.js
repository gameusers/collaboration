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
//   Components
// ---------------------------------------------

import Panel from '../../../../app/common/layout/components/panel';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationUsersLoginID } = require('../../../../app/@database/users/validations/login-id');
const { validationUsersLoginPassword } = require('../../../../app/@database/users/validations/login-password');




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('loginIndex')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    super(props);
  }
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount(){
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ _id: 'login' });
    
    
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, intl } = this.props;
    
    const {
      
      dataObj,
      handleEdit,
      handleRecaptchaReset,
      handlePasswordShow,
      handlePasswordMouseDown,
      
    } = stores.loginIndex;
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = lodashGet(stores, ['layout', 'buttonDisabledObj', 'login'], true);
    
    
    
    
    // --------------------------------------------------
    //   Login ID
    // --------------------------------------------------
    
    const loginID = lodashGet(dataObj, ['loginID'], '');
    const validationUsersLoginIDObj = validationUsersLoginID({ value: loginID });
    
    
    // --------------------------------------------------
    //   Login Password
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
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Panel _id="panelLogin" heading="ログイン - ID & パスワード">
        
        
        <p>
          IDとパスワードでログインします。アカウントをお持ちでない場合は、アカウント作成フォームをご利用ください。
        </p>
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={buttonDisabled}
          onClick={stores.loginIndex.handleTest}
        >
          test
        </Button>
        
        
        {/* Form */}
        <form onSubmit={(eventObj) => handleRecaptchaReset({ eventObj, formType: 'login' })}>
          
          
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
          
          
          
          
          {/* Submit Button */}
          <div
            css={css`
              margin: 20px 0 0 0;
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