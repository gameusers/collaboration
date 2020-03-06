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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconID from '@material-ui/icons/Person';
import IconPassword from '@material-ui/icons/Lock';
import IconPasswordOutlined from '@material-ui/icons/LockTwoTone';
import IconVisibility from '@material-ui/icons/Visibility';
import IconVisibilityOff from '@material-ui/icons/VisibilityOff';
import IconMailOutline from '@material-ui/icons/MailOutline';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationUsersLoginID } from '../../../../app/@database/users/validations/login-id';
import { validationUsersLoginPassword, validationUsersLoginPasswordConfirmation } from '../../../../app/@database/users/validations/login-password';
import { validationUsersEmail } from '../../../../app/@database/users/validations/email';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from '../../../../app/common/layout/components/panel';
import TermsOfService from '../../../../app/common/layout/components/terms-of-service';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeConfirmResetPassword')
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
    
    this.pathArr = ['formResetPassword'];
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount(){
    
    
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
    
    const { stores, storeConfirmResetPassword, intl } = this.props;
    
    const {
      
      dataObj,
      handleEdit,
      handleRecaptchaReset,
      handlePasswordShow,
      handlePasswordMouseDown,
      handlePasswordConfirmationShow,
      handlePasswordConfirmationMouseDown,
      
    } = storeConfirmResetPassword;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   emailConfirmationID
    // --------------------------------------------------
    
    // const emailConfirmationID = lodashGet(dataObj, ['emailConfirmationID'], '');
    
    
    // --------------------------------------------------
    //   Login ID
    // --------------------------------------------------
    
    const resetPasswordLoginID = lodashGet(dataObj, ['resetPasswordLoginID'], '');
    const validationUsersLoginIDObj = validationUsersLoginID({ value: resetPasswordLoginID });
    
    
    // --------------------------------------------------
    //   Login Password
    // --------------------------------------------------
    
    const resetPasswordLoginPasswordShow = lodashGet(dataObj, ['resetPasswordLoginPasswordShow'], false);
    const resetPasswordLoginPassword = lodashGet(dataObj, ['resetPasswordLoginPassword'], '');
    const validationUsersLoginPasswordObj = validationUsersLoginPassword({ value: resetPasswordLoginPassword, loginID: resetPasswordLoginID });
    
    
    // --------------------------------------------------
    //   Login Password Confirmation
    // --------------------------------------------------
    
    const resetPasswordLoginPasswordConfirmationShow = lodashGet(dataObj, ['resetPasswordLoginPasswordConfirmationShow'], false);
    const resetPasswordLoginPasswordConfirmation = lodashGet(dataObj, ['resetPasswordLoginPasswordConfirmation'], '');
    const validationUsersLoginPasswordConfirmationObj = validationUsersLoginPasswordConfirmation({ value: resetPasswordLoginPasswordConfirmation, loginPassword: resetPasswordLoginPassword });
    
    
    
    
    // --------------------------------------------------
    //   パスワードの強度
    // --------------------------------------------------
    
    const passwordColorArr = ['red', 'red', 'tomato', 'green', 'green'];
    const passwordStrengthArr = ['とても危険', '危険', '普通', '安全', 'とても安全'];
    
    let passwordColor = passwordColorArr[validationUsersLoginPasswordObj.strengthScore];
    let passwordStrength = passwordStrengthArr[validationUsersLoginPasswordObj.strengthScore];
    
    if (resetPasswordLoginPassword === '') {
      passwordColor = '#848484';
      passwordStrength = ' -';
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
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
    
    // console.log(`
    //   ----- validationUsersLoginPasswordConfirmationObj -----\n
    //   ${util.inspect(validationUsersLoginPasswordConfirmationObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   process.env.RECAPTCHA_SITE_KEY: {green ${process.env.RECAPTCHA_SITE_KEY}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Panel
        heading="パスワード再設定"
        pathArr={this.pathArr}
      >
        
        
        <p
          css={css`
            margin: 0 0 16px 0;
          `}
        >
          パスワードを変更するアカウントのログインIDと新しいパスワードを入力して送信してください。
        </p>
        
        <p
          css={css`
            margin: 0 0 16px 0;
          `}
        >
          利用できる文字は半角英数字とハイフン( - )アンダースコア( _ )です。※ IDは6文字以上、32文字以内。パスワードは8文字以上、32文字以内。
        </p>
        
        
        
        
        {/* Form */}
        <form onSubmit={(eventObj) => handleRecaptchaReset({ eventObj, formType: 'resetPassword' })}>
          
          
          {/* Login ID */}
          <div>
            <TextField
              css={css`
                width: 400px;
                
                @media screen and (max-width: 480px) {
                  width: 100%;
                }
              `}
              id="resetPasswordLoginID"
              label="ID"
              value={validationUsersLoginIDObj.value}
              onChange={(eventObj) => handleEdit({
                pathArr: ['resetPasswordLoginID'],
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
              id="resetPasswordLoginPassword"
              label="パスワード"
              type={resetPasswordLoginPasswordShow ? 'text' : 'password'}
              value={validationUsersLoginPasswordObj.value}
              onChange={(eventObj) => handleEdit({
                pathArr: ['resetPasswordLoginPassword'],
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
                      {resetPasswordLoginPasswordShow ? <IconVisibilityOff /> : <IconVisibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>
          
          
          <div
            css={css`
              font-size: 12px;
              margin: 4px 0 0 0;
              color: ${passwordColor};
            `}
          >
            パスワード強度：{passwordStrength}
          </div>
          
          
          
          
          {/* Login Password Confirmation */}
          <div>
            <TextField
              css={css`
                width: 400px;
                
                @media screen and (max-width: 480px) {
                  width: 100%;
                }
              `}
              id="resetPasswordLoginPasswordConfirmation"
              label="パスワード確認"
              type={resetPasswordLoginPasswordConfirmationShow ? 'text' : 'password'}
              value={validationUsersLoginPasswordConfirmationObj.value}
              onChange={(eventObj) => handleEdit({
                pathArr: ['resetPasswordLoginPasswordConfirmation'],
                value: eventObj.target.value
              })}
              error={validationUsersLoginPasswordConfirmationObj.error}
              helperText={intl.formatMessage({ id: validationUsersLoginPasswordConfirmationObj.messageID }, { numberOfCharacters: validationUsersLoginPasswordConfirmationObj.numberOfCharacters })}
              disabled={buttonDisabled}
              margin="normal"
              inputProps={{
                maxLength: 32,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconPasswordOutlined />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={handlePasswordConfirmationShow}
                      onMouseDown={handlePasswordConfirmationMouseDown}
                    >
                      {resetPasswordLoginPasswordConfirmationShow ? <IconVisibilityOff /> : <IconVisibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>
          
          
          
          
          {/* Submit Button */}
          <div
            css={css`
              margin: 24px 0 0 0;
            `}
          >
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={buttonDisabled}
            >
              パスワードを再設定する
            </Button>
          </div>
          
          
        </form>
        
        
        
        
      </Panel>
    );
    
  }
  
});