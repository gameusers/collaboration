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
import { ReCaptcha } from 'react-recaptcha-v3';
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


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

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

const { validationUsersLoginID } = require('../../../../app/@database/users/validations/login-id');
const { validationUsersLoginPassword } = require('../../../../app/@database/users/validations/login-password');



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Heading = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

const Description = styled.p`
  
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
      handleLoginRecaptchaReset,
      handleLoginRecaptchaResponse,
      handleLoginPasswordShow,
      handleLoginPasswordMouseDown,
      
    } = stores.loginIndex;
    
    
    
    
    // --------------------------------------------------
    //   Panel
    // --------------------------------------------------
    
    const panelExpanded = lodashGet(stores, ['layout', 'panelExpandedObj', 'login'], true);
    const handlePanelExpand = lodashGet(stores, ['layout', 'handlePanelExpand'], '');
    
    
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
    //   パスワードの強度
    // --------------------------------------------------
    
    // const passwordColorArr = ['red', 'red', 'tomato', 'green', 'green'];
    // const passwordStrengthArr = ['とても危険', '危険', '普通', '安全', 'とても安全'];
    
    // let passwordColor = passwordColorArr[validationUsersLoginPasswordObj.strengthScore];
    // let passwordStrength = passwordStrengthArr[validationUsersLoginPasswordObj.strengthScore];
    
    // if (loginPassword === '') {
    //   passwordColor = '#848484';
    //   passwordStrength = ' -';
    // }
    
    // const PasswordStrength = styled.div`
    //   font-size: 14px;
    //   margin: 4px 0 10px 0;
    //   color: ${passwordColor};
    // `;
    
    
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
    
    // console.log(chalk`
    //   process.env.RECAPTCHA_SITE_KEY: {green ${process.env.RECAPTCHA_SITE_KEY}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        
        {/* reCAPTCHA */}
        <ReCaptcha
          ref={ref => this.recaptcha = ref}
          sitekey={process.env.RECAPTCHA_SITE_KEY}
          action='login'
          verifyCallback={handleLoginRecaptchaResponse}
        />
        
        
        <ExpansionPanel defaultExpanded={true} expanded={panelExpanded}>
          
          
          {/* Heading */}
          <ExpansionPanelSummary expandIcon={<IconExpandMore />} onClick={() => handlePanelExpand({ _id: 'login' })}>
            <Heading>ログイン - ID & パスワード</Heading>
          </ExpansionPanelSummary>
          
          
          {/* Contents */}
          <StyledExpansionPanelDetails>
            
            <Description>
              IDとパスワードでログインします。アカウントをお持ちでない場合は、アカウント作成フォームをご利用ください。
            </Description>
            
            
            {/* Login ID */}
            <LoginIDBox>
              <StyledTextFieldWide
                id="loginID"
                label="ID"
                value={validationUsersLoginIDObj.value}
                onChange={(eventObj) => handleEdit({
                  pathArr: ['loginID'],
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
                id="loginPassword"
                label="パスワード"
                type={loginPasswordShow ? 'text' : 'password'}
                value={validationUsersLoginPasswordObj.value}
                onChange={(eventObj) => handleEdit({
                  pathArr: ['loginPassword'],
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
                        onClick={handleLoginPasswordShow}
                        onMouseDown={handleLoginPasswordMouseDown}
                      >
                        {loginPasswordShow ? <IconVisibilityOff /> : <IconVisibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </LoginIDBox>
            
            
            {/* Submit Button */}
            <SubmitButtonBox>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleLoginRecaptchaReset(this.recaptcha)}
                disabled={buttonDisabled}
              >
                ログイン
              </Button>
            </SubmitButtonBox>
            
            
          </StyledExpansionPanelDetails>
          
        </ExpansionPanel>
        
        
      </React.Fragment>
    );
    
  }
  
});