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


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationUsersLoginID } from '../../../../app/@database/users/validations/login-id';
import { validationUsersLoginPassword, validationUsersLoginPasswordConfirmation } from '../../../../app/@database/users/validations/login-password';


// ---------------------------------------------
//   Components
// ---------------------------------------------

// import TermsOfService from '../../../../app/common/layout/components/terms-of-service';




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
    
    this.props.stores.layout.handleButtonEnable({ _id: 'editAccount' });
    
    
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
      handlePasswordShow,
      handlePasswordMouseDown,
      handlePasswordConfirmationShow,
      handlePasswordConfirmationMouseDown,
      handleEditAccount,
      
    } = stores.playerSettings;
    
    
    
    
    // --------------------------------------------------
    //   Panel
    // --------------------------------------------------
    
    const panelExpanded = lodashGet(stores, ['layout', 'panelExpandedObj', 'editAccount'], true);
    const handlePanelExpand = lodashGet(stores, ['layout', 'handlePanelExpand'], '');
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = lodashGet(stores, ['layout', 'buttonDisabledObj', 'editAccount'], true);
    
    
    
    
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
    const validationUsersLoginPasswordObj = validationUsersLoginPassword({ value: loginPassword, loginID: loginID });
    
    
    // --------------------------------------------------
    //   Login Password Confirmation
    // --------------------------------------------------
    
    const loginPasswordConfirmationShow = lodashGet(dataObj, ['loginPasswordConfirmationShow'], false);
    const loginPasswordConfirmation = lodashGet(dataObj, ['loginPasswordConfirmation'], '');
    const validationUsersLoginPasswordConfirmationObj = validationUsersLoginPasswordConfirmation({ value: loginPasswordConfirmation, loginPassword: loginPassword });
    
    
    
    
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
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        
        <StyledExpansionPanel defaultExpanded={true} expanded={panelExpanded}>
          
          
          {/* Heading */}
          <StyledExpansionPanelSummary>
          
            <Heading>ログイン情報編集</Heading>
            
            {/* Expansion Button */}
            <ExpandMoreBox>
              <StyledIconButton
                onClick={() => handlePanelExpand({ _id: 'editAccount' })}
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
              IDとパスワードに利用できる文字は半角英数字とハイフン( - )アンダースコア( _ )です。※ IDは6文字以上、32文字以内。パスワードは8文字以上、32文字以内。
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
                        onClick={handlePasswordShow}
                        onMouseDown={handlePasswordMouseDown}
                      >
                        {loginPasswordShow ? <IconVisibilityOff /> : <IconVisibility />}
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
                id="loginPasswordConfirmation"
                label="パスワード確認"
                type={loginPasswordConfirmationShow ? 'text' : 'password'}
                value={validationUsersLoginPasswordConfirmationObj.value}
                onChange={(eventObj) => handleEdit({
                  pathArr: ['loginPasswordConfirmation'],
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
                        {loginPasswordConfirmationShow ? <IconVisibilityOff /> : <IconVisibility />}
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
                color="secondary"
                onClick={() => handleEditAccount()}
                disabled={buttonDisabled}
              >
                編集する
              </Button>
            </SubmitButtonBox>
            
            
          </StyledExpansionPanelDetails>
          
        </StyledExpansionPanel>
        
        
      </React.Fragment>
    );
    
  }
  
});