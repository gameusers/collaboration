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

@inject('stores', 'storeLoginAccount')
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
    
    this.pathArr = ['formCreateAccount'];
    
    
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
    
    const { stores, storeLoginAccount, intl } = this.props;
    
    const {
      
      dataObj,
      handleEdit,
      handleRecaptchaReset,
      handlePasswordShow,
      handlePasswordMouseDown,
      handlePasswordConfirmationShow,
      handlePasswordConfirmationMouseDown,
      
    } = storeLoginAccount;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   Create Account Login ID
    // --------------------------------------------------
    
    const createAccountLoginID = lodashGet(dataObj, ['createAccountLoginID'], '');
    const validationUsersLoginIDObj = validationUsersLoginID({ value: createAccountLoginID });
    
    
    // --------------------------------------------------
    //   Create Account Login Password
    // --------------------------------------------------
    
    const createAccountLoginPasswordShow = lodashGet(dataObj, ['createAccountLoginPasswordShow'], false);
    const createAccountLoginPassword = lodashGet(dataObj, ['createAccountLoginPassword'], '');
    const validationUsersLoginPasswordObj = validationUsersLoginPassword({ value: createAccountLoginPassword, loginID: createAccountLoginID });
    
    
    // --------------------------------------------------
    //   Create Account Login Password Confirmation
    // --------------------------------------------------
    
    const createAccountLoginPasswordConfirmationShow = lodashGet(dataObj, ['createAccountLoginPasswordConfirmationShow'], false);
    const createAccountLoginPasswordConfirmation = lodashGet(dataObj, ['createAccountLoginPasswordConfirmation'], '');
    const validationUsersLoginPasswordConfirmationObj = validationUsersLoginPasswordConfirmation({ value: createAccountLoginPasswordConfirmation, loginPassword: createAccountLoginPassword });
    
    
    // --------------------------------------------------
    //   Create Account E-Mail
    // --------------------------------------------------
    
    const createAccountEmail = lodashGet(dataObj, ['createAccountEmail'], '');
    const validationUsersEmailObj = validationUsersEmail({ value: createAccountEmail });
    
    
    // --------------------------------------------------
    //   利用規約
    // --------------------------------------------------
    
    const createAccountTermsOfService = lodashGet(dataObj, ['createAccountTermsOfService'], false);
    
    
    
    
    // --------------------------------------------------
    //   パスワードの強度
    // --------------------------------------------------
    
    const passwordColorArr = ['red', 'red', 'tomato', 'green', 'green'];
    const passwordStrengthArr = ['とても危険', '危険', '普通', '安全', 'とても安全'];
    
    let passwordColor = passwordColorArr[validationUsersLoginPasswordObj.strengthScore];
    let passwordStrength = passwordStrengthArr[validationUsersLoginPasswordObj.strengthScore];
    
    if (createAccountLoginPassword === '') {
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
        heading="アカウント作成"
        pathArr={this.pathArr}
      >
        
        
        <p
          css={css`
            margin: 0 0 16px 0;
          `}
        >
          アカウントを作成する場合は、こちらのフォームにIDとパスワードを入力して送信してください。
        </p>
        
        <p
          css={css`
            margin: 0 0 16px 0;
          `}
        >
          利用できる文字は半角英数字とハイフン( - )アンダースコア( _ )です。※ IDは6文字以上、32文字以内。パスワードは8文字以上、32文字以内。
        </p>
        
        <p
          css={css`
            margin: 0 0 16px 0;
          `}
        >
          メールアドレスを登録しておくとパスワードを忘れたときに、メールを利用してパスワードを登録しなおせるようになります。ID、パスワード、メールアドレスはアカウント作成後に変更することが可能です。
        </p>
        
        
        
        
        {/* Form */}
        <form onSubmit={(eventObj) => handleRecaptchaReset({ eventObj, formType: 'createAccount' })}>
          
          
          {/* Login ID */}
          <div>
            <TextField
              css={css`
                width: 400px;
                
                @media screen and (max-width: 480px) {
                  width: 100%;
                }
              `}
              id="createAccountLoginID"
              label="ID"
              value={validationUsersLoginIDObj.value}
              onChange={(eventObj) => handleEdit({
                pathArr: ['createAccountLoginID'],
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
              id="createAccountLoginPassword"
              label="パスワード"
              type={createAccountLoginPasswordShow ? 'text' : 'password'}
              value={validationUsersLoginPasswordObj.value}
              onChange={(eventObj) => handleEdit({
                pathArr: ['createAccountLoginPassword'],
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
                      {createAccountLoginPasswordShow ? <IconVisibilityOff /> : <IconVisibility />}
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
              id="createAccountLoginPasswordConfirmation"
              label="パスワード確認"
              type={createAccountLoginPasswordConfirmationShow ? 'text' : 'password'}
              value={validationUsersLoginPasswordConfirmationObj.value}
              onChange={(eventObj) => handleEdit({
                pathArr: ['createAccountLoginPasswordConfirmation'],
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
                      {createAccountLoginPasswordConfirmationShow ? <IconVisibilityOff /> : <IconVisibility />}
                    </IconButton>
                  </InputAdornment>
                )
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
              id="createAccountEmail"
              label="メールアドレス（任意）"
              value={validationUsersEmailObj.value}
              onChange={(eventObj) => handleEdit({
                pathArr: ['createAccountEmail'],
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
          
          
          
          
          {/* 利用規約 */}
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
            `}
          >
            
            <FormControlLabel
              control={
                <Checkbox
                  checked={createAccountTermsOfService}
                  onChange={(eventObj) => handleEdit({
                    pathArr: ['createAccountTermsOfService'],
                    value: eventObj.target.checked
                  })}
                />
              }
              label="利用規約に同意します"
            />
            
            <Button
              color="primary"
              onClick={stores.layout.handleTermsOfServiceDialogOpen}
            >
              利用規約を表示
            </Button>
            
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
              アカウント作成
            </Button>
          </div>
          
          
        </form>
        
        
        
        
        {/* 利用規約ダイアログ */}
        <TermsOfService />
        
        
        
        
      </Panel>
    );
    
  }
  
});