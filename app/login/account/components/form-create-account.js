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
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
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

import TermsOfService from '../../../../app/common/layout/components/terms-of-service';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const StyledExpansionPanel = styled(ExpansionPanel)`
  && {
    margin: 16px 0 0 0 !important;
  }
`;

const StyledExpansionPanelSummary = styled(ExpansionPanelSummary)`
  && {
    cursor: default !important;
    padding-right: 16px;
  }
`;

const Heading = styled.h2`
  font-weight: bold;
  font-size: 18px;
`;

const ExpandMoreBox = styled.div`
  margin: 0 0 0 auto;
  padding: 0 !important;
`;

const StyledIconButton = styled(IconButton)`
  && {
    margin: 0;
    padding: 4px;
  }
`;

const Description = styled.p`
  margin: 0 0 16px 0;
`;

const LoginIDBox = styled.div`
  
`;

const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)`
  && {
    display: flex;
    flex-flow: column wrap;
  }
`;

const StyledTextFieldWide = styled(TextField)`
  && {
    width: 400px;
    
    @media screen and (max-width: 480px) {
      width: 100%;
    }
  }
`;

const TermsOfServiceBox = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const SubmitButtonBox = styled.div`
  margin: 20px 0 0 0;
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
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
    
    this.props.stores.layout.handleButtonEnable({ _id: 'createAccount' });
    
    
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
      handlePasswordConfirmationShow,
      handlePasswordConfirmationMouseDown,
      
    } = stores.loginAccount;
    
    
    
    
    // --------------------------------------------------
    //   Panel
    // --------------------------------------------------
    
    const panelExpanded = lodashGet(stores, ['layout', 'panelExpandedObj', 'createAccount'], true);
    const handlePanelExpand = lodashGet(stores, ['layout', 'handlePanelExpand'], '');
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = lodashGet(stores, ['layout', 'buttonDisabledObj', 'createAccount'], true);
    
    
    
    
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
    
    const PasswordStrength = styled.div`
      font-size: 12px;
      margin: 4px 0 0 0;
      color: ${passwordColor};
    `;
    
    
    
    
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
      <React.Fragment>
        
        
        <StyledExpansionPanel defaultExpanded={true} expanded={panelExpanded}>
          
          
          {/* Heading */}
          <StyledExpansionPanelSummary>
          
            <Heading>アカウント作成</Heading>
            
            {/* Expansion Button */}
            <ExpandMoreBox>
              <StyledIconButton
                onClick={() => handlePanelExpand({ _id: 'createAccount' })}
                aria-expanded={panelExpanded}
                aria-label="Show more"
                disabled={buttonDisabled}
              >
                {panelExpanded ? (
                  <IconExpandLess />
                ) : (
                  <IconExpandMore />
                )}
              </StyledIconButton>
            </ExpandMoreBox>
            
          </StyledExpansionPanelSummary>
          
          
          
          
          {/* Contents */}
          <StyledExpansionPanelDetails>
            
            <Description>
              アカウントを作成する場合は、こちらのフォームにIDとパスワードを入力して送信してください。
            </Description>
            
            <Description>
              利用できる文字は半角英数字とハイフン( - )アンダースコア( _ )です。※ IDは6文字以上、32文字以内。パスワードは8文字以上、32文字以内。
            </Description>
            
            <Description>
              E-Mailの入力は任意ですが、登録しておくとパスワードを忘れたときにメールでパスワードを受け取ることができるようになります。
            </Description>
            
            <Description>
              ID、パスワード、E-Mailはアカウント作成後に変更することが可能です。
            </Description>
            
            
            
            
            {/* Login ID */}
            <LoginIDBox>
              <StyledTextFieldWide
                id="createAccountLoginID"
                label="ID"
                value={validationUsersLoginIDObj.value}
                onChange={(eventObj) => handleEdit({
                  pathArr: ['createAccountLoginID'],
                  value: eventObj.target.value
                })}
                error={validationUsersLoginIDObj.error}
                helperText={intl.formatMessage({ id: validationUsersLoginIDObj.messageCode }, { numberOfCharacters: validationUsersLoginIDObj.numberOfCharacters })}
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
            </LoginIDBox>
            
            
            
            
            {/* Login Password */}
            <LoginIDBox>
              <StyledTextFieldWide
                id="createAccountLoginPassword"
                label="パスワード"
                type={createAccountLoginPasswordShow ? 'text' : 'password'}
                value={validationUsersLoginPasswordObj.value}
                onChange={(eventObj) => handleEdit({
                  pathArr: ['createAccountLoginPassword'],
                  value: eventObj.target.value
                })}
                error={validationUsersLoginPasswordObj.error}
                helperText={intl.formatMessage({ id: validationUsersLoginPasswordObj.messageCode }, { numberOfCharacters: validationUsersLoginPasswordObj.numberOfCharacters })}
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
            </LoginIDBox>
            
            <PasswordStrength>
              パスワード強度：{passwordStrength}
            </PasswordStrength>
            
            
            
            
            {/* Login Password Confirmation */}
            <LoginIDBox>
              <StyledTextFieldWide
                id="createAccountLoginPasswordConfirmation"
                label="パスワード確認"
                type={createAccountLoginPasswordConfirmationShow ? 'text' : 'password'}
                value={validationUsersLoginPasswordConfirmationObj.value}
                onChange={(eventObj) => handleEdit({
                  pathArr: ['createAccountLoginPasswordConfirmation'],
                  value: eventObj.target.value
                })}
                error={validationUsersLoginPasswordConfirmationObj.error}
                helperText={intl.formatMessage({ id: validationUsersLoginPasswordConfirmationObj.messageCode }, { numberOfCharacters: validationUsersLoginPasswordConfirmationObj.numberOfCharacters })}
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
            </LoginIDBox>
            
            
            
            
            {/* E-Mail */}
            <LoginIDBox>
              <StyledTextFieldWide
                id="createAccountEmail"
                label="E-Mail（任意）"
                value={validationUsersEmailObj.value}
                onChange={(eventObj) => handleEdit({
                  pathArr: ['createAccountEmail'],
                  value: eventObj.target.value
                })}
                error={validationUsersEmailObj.error}
                helperText={intl.formatMessage({ id: validationUsersEmailObj.messageCode }, { numberOfCharacters: validationUsersEmailObj.numberOfCharacters })}
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
            </LoginIDBox>
            
            
            
            
            {/* 利用規約 */}
            <TermsOfServiceBox>
              
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
              
            </TermsOfServiceBox>
            
            
            
            
            {/* Submit Button */}
            <SubmitButtonBox>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRecaptchaReset({ formType: 'createAccount' })}
                disabled={buttonDisabled}
              >
                アカウント作成
              </Button>
            </SubmitButtonBox>
            
            
          </StyledExpansionPanelDetails>
          
        </StyledExpansionPanel>
        
        
        
        
        {/* 利用規約ダイアログ */}
        <TermsOfService />
        
        
        
        
      </React.Fragment>
    );
    
  }
  
});