// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
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
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Typography from '@material-ui/core/Typography';
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

const { validationUsersLoginID } = require('../../../../app/@database/users/validations/login-id2');
const { validationUsersLoginPassword } = require('../../../../app/@database/users/validations/login-password2');



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
  // font-weight: bold;
  // font-size: 18px;
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

const LoginSubmitButtonBox = styled.div`
  margin: 20px 0 0 0;
`;

const StyledButton = styled(Button)`
  && {
    margin: 10px 0 0 0;
  }
`;

const ReCAPTCHAContainer = styled.div`
  margin: 30px 0 0 0;
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default injectIntl(class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  
  componentDidMount(){
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ _id: 'login' });
    
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, intl } = this.props;
    
    const {
      
      dataObj,
      handleEdit,
      handleLoginSubmit,
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
    //   reCAPTCHA
    // --------------------------------------------------
    
    let loginRecaptchaRef = '';
    // let createAccountRecaptchaRef = '';
    
    if (process.env.VERIFY_RECAPTCHA === '1') {
      loginRecaptchaRef = React.createRef();
      // createAccountRecaptchaRef = React.createRef();
    }
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    console.log(`
      ----- validationUsersLoginIDObj -----\n
      ${util.inspect(validationUsersLoginIDObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    console.log(`
      ----- validationUsersLoginPasswordObj -----\n
      ${util.inspect(validationUsersLoginPasswordObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    // console.log(chalk`
    //   value: {green ${value}}
    //   alternativeText: {green ${alternativeText}}
    //   search: {green ${search}}
    //   age: {green ${age}}
    // `);
    //
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        
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
            <LoginSubmitButtonBox>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleLoginSubmit(loginRecaptchaRef)}
                disabled={buttonDisabled}
              >
                ログイン
              </Button>
            </LoginSubmitButtonBox>
            
            
          </StyledExpansionPanelDetails>
          
        </ExpansionPanel>
        
        
      </React.Fragment>
    );
    
  }
  
});