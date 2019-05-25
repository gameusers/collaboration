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
// import { makeStyles } from '@material-ui/styles';
// import { styled } from '@material-ui/styles';
import { injectIntl } from 'react-intl';
import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { withStyles } from '@material-ui/styles';
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
import IconVisibility from '@material-ui/icons/Visibility';
import IconVisibilityOff from '@material-ui/icons/VisibilityOff';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationUsersLoginID } = require('../../../../app/@database/users/validations/login-id');
const { validationUsersLoginPassword } = require('../../../../app/@database/users/validations/login-password');




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const stylesObj = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  expansionPanelExpanded: {
    margin: '0 !important',
    // backgroundColor: 'pink',
  }
  // expansionPanel: {
  //   root: {
  //     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  //   },
  //   expanded: {
  //     margin: '0 !important',
  //   }
  // }
};

// const stylesObj = {
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//   },
//   expanded: {
//     margin: '0 !important',
//   }
//   // expansionPanel: {
//   //   root: {
//   //     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//   //   },
//   //   expanded: {
//   //     margin: '0 !important',
//   //   }
//   // }
// };

// const stylesExpansionPanel = makeStyles({
//   root: {
//     margin: 0
//   },
// });

// const StyledExpansionPanel = styled(ExpansionPanel)({
//   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//   border: 0,
//   borderRadius: 3,
//   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//   color: 'white',
//   height: 48,
//   padding: '0 30px',
// });

const StyledExpansionPanel = styled(ExpansionPanel)`
  && {
    margin: 0 !important;
    background-color: pink;
    // margin: 16px 0 0 0 !important;
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

@withStyles(stylesObj)
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
    
    const { classes, stores, intl } = this.props;
    
    const {
      
      dataObj,
      handleEdit,
      handleRecaptchaReset,
      handlePasswordShow,
      handlePasswordMouseDown,
      
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
    //   recaptchaRef: {green ${recaptchaRef}}
    // `);
    
    // console.log(classes);
    
    
    // const classes = stylesExpansionPanel();
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        
        {/*<StyledExpansionPanel defaultExpanded={true} expanded={panelExpanded}>*/}
        {/*<ExpansionPanel className={classes.root} defaultExpanded={true} expanded={panelExpanded}>*/}
        <ExpansionPanel
          classes={{
            expanded: classes.expansionPanelExpanded
          }}
          // className="components-form-login"
          defaultExpanded={true}
          expanded={panelExpanded}
        >
        {/*<ExpansionPanel className="components-form-login" defaultExpanded={true} expanded={panelExpanded}>*/}
          
          
          {/* Heading */}
          <StyledExpansionPanelSummary>
          
            <Heading>ログイン - ID & パスワード</Heading>
            
            {/* Expansion Button */}
            <ExpandMoreBox>
              <StyledIconButton
                onClick={() => handlePanelExpand({ _id: 'login' })}
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
              IDとパスワードでログインします。アカウントをお持ちでない場合は、アカウント作成フォームをご利用ください。
            </Description>
            
            
            
            
            {/* Form */}
            <form onSubmit={(eventObj) => handleRecaptchaReset({ eventObj, formType: 'login' })}>
              
              
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
              </LoginIDBox>
              
              
              
              
              {/* Submit Button */}
              <SubmitButtonBox>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  // onClick={() => handleRecaptchaReset({ formType: 'login' })}
                  disabled={buttonDisabled}
                >
                  ログイン
                </Button>
              </SubmitButtonBox>
              
              
            </form>
            
            
            
            
          </StyledExpansionPanelDetails>
          
        </ExpansionPanel>
        {/*</StyledExpansionPanel>*/}
        
        
      </React.Fragment>
    );
    
  }
  
});