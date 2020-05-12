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
import IconMailOutline from '@material-ui/icons/MailOutline';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationUsersLoginID } from '../../../../app/@database/users/validations/login-id';
import { validationUsersEmail } from '../../../../app/@database/users/validations/email';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from '../../../../app/common/layout/components/panel';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeLoginResetPassword')
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
    
    const { stores, storeLoginResetPassword, intl } = this.props;
    
    const {
      
      dataObj,
      handleEdit,
      handleRecaptchaReset,
      handleResetPassword,
      
    } = storeLoginResetPassword;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   Login ID
    // --------------------------------------------------
    
    const resetPasswordLoginID = lodashGet(dataObj, ['resetPasswordLoginID'], '');
    const validationUsersLoginIDObj = validationUsersLoginID({ value: resetPasswordLoginID });
    
    
    // --------------------------------------------------
    //   E-Mail
    // --------------------------------------------------
    
    const resetPasswordEmail = lodashGet(dataObj, ['resetPasswordEmail'], '');
    const validationUsersEmailObj = validationUsersEmail({ value: resetPasswordEmail });
    
    
    
    
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
          パスワードを忘れた場合、こちらのフォームを利用してパスワードの再設定を行うことができます。
        </p>
        
        <p
          css={css`
            margin: 0 0 16px 0;
          `}
        >
          ログインID、またはアカウントに登録済みのメールアドレスを入力して「パスワードを再設定する」ボタンを押してください。パスワードを再設定する方法が記載されたメールが届きます。30分以内にメールを受信してパスワードの再設定を行ってください。
        </p>
        
        
        <p
          css={css`
            margin: 0 0 16px 0;
          `}
        >
          お持ちのアカウントにメールアドレスを登録していない方は、こちらのページからパスワードの再設定を行うことはできません。Game Users 運営にご連絡ください。
        </p>
        
        
        
        
        {/* Form */}
        <form
          onSubmit={(eventObj) => process.env.NEXT_PUBLIC_VERIFY_RECAPTCHA === '1' ? handleRecaptchaReset({ eventObj, formType: 'resetPassword' }) : handleResetPassword({ eventObj })}
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
          
          
          
          
          {/* メールアドレス */}
          <div>
            <TextField
              css={css`
                width: 400px;
                
                @media screen and (max-width: 480px) {
                  width: 100%;
                }
              `}
              id="resetPasswordEmail"
              label="メールアドレス"
              value={validationUsersEmailObj.value}
              onChange={(eventObj) => handleEdit({
                pathArr: ['resetPasswordEmail'],
                value: eventObj.target.value
              })}
              error={validationUsersEmailObj.error}
              helperText={intl.formatMessage({ id: validationUsersEmailObj.messageID }, { numberOfCharacters: validationUsersEmailObj.numberOfCharacters })}
              disabled={buttonDisabled}
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