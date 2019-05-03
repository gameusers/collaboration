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
import IconMailOutline from '@material-ui/icons/MailOutline';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationUsersEmail } from '../../../../app/@database/users/validations/email';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------


// ---------------------------------------------
//   Panel
// ---------------------------------------------

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

const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)`
  && {
    display: flex;
    flex-flow: column wrap;
  }
`;


// ---------------------------------------------
//   Description
// ---------------------------------------------

const Description = styled.p`
  margin: 0 0 16px 0;
`;


// ---------------------------------------------
//   Text Field
// ---------------------------------------------

const StyledTextFieldWide = styled(TextField)`
  && {
    width: 400px;
    margin: 32px 0 0 0;
    
    @media screen and (max-width: 480px) {
      width: 100%;
    }
  }
`;


// ---------------------------------------------
//   Registered Email
// ---------------------------------------------

const RegisteredEmailBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 16px 0 8px 0;
`;

const RegisteredEmail = styled.div`
  font-weight: bold;
  margin: 0 8px 0 0;
`;

const ConfirmationTrue = styled.span`
  color: black;
`;

const ConfirmationFalse = styled.span`
  color: red;
`;

const RegisteredEmailButtonBox = styled.div`
  margin: 0;
`;


// ---------------------------------------------
//   Submit Button
// ---------------------------------------------

const SubmitButtonBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 20px 0 0 0;
`;

const ButtonBox = styled.div`
  margin: 0 16px 0 0;
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
    
    this.props.stores.layout.handleButtonEnable({ _id: 'submitEmail' });
    
    
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
      handleSubmitEmail,
      
    } = stores.playerSettings;
    
    
    
    
    // --------------------------------------------------
    //   Panel
    // --------------------------------------------------
    
    const panelExpanded = lodashGet(stores, ['layout', 'panelExpandedObj', 'submitEmail'], true);
    const handlePanelExpand = lodashGet(stores, ['layout', 'handlePanelExpand'], '');
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = lodashGet(stores, ['layout', 'buttonDisabledObj', 'submitEmail'], true);
    
    
    
    
    // --------------------------------------------------
    //   E-Mail
    // --------------------------------------------------
    
    const email = lodashGet(dataObj, ['emailObj', 'value'], '');
    const emailConfirmation = lodashGet(dataObj, ['emailObj', 'confirmation'], false);
    const emailSecret = lodashGet(dataObj, ['emailObj', 'secret'], '');
    const validationUsersEmailObj = validationUsersEmail({ value: email });
    
    
    
    
    // --------------------------------------------------
    //   Component - Confirmation
    // --------------------------------------------------
    
    let componentConfirmation = '';
    
    if (emailSecret) {
      
      if (emailConfirmation) {
        componentConfirmation = <ConfirmationTrue>(確認済み)</ConfirmationTrue>;
      } else {
        componentConfirmation = <ConfirmationFalse>(未確認)</ConfirmationFalse>;
      }
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   email: {green ${email}}
    //   emailSecret: {green ${emailSecret}}
    //   emailConfirmation: {green ${emailConfirmation}}
    // `);
    
    // console.log(`
    //   ----- validationUsersEmailObj -----\n
    //   ${util.inspect(validationUsersEmailObj, { colors: true, depth: null })}\n
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
          
            <Heading>E-Mail登録</Heading>
            
            {/* Expansion Button */}
            <ExpandMoreBox>
              <StyledIconButton
                onClick={() => handlePanelExpand({ _id: 'submitEmail' })}
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
              E-Mailアドレスを登録しておくとパスワードを忘れたときにメールでパスワードを受け取ることができるようになります。
            </Description>
            
            <Description>
              E-Mailアドレスを入力して「送信する」ボタンを押すと、入力したメールアドレスに確認メールが届きます。24時間以内に表示されているURLにアクセスして登録を完了してください。24時間以内にアクセスできなかった場合は、「確認メールを再送信する」ボタンを押してください。もう一度、確認メールが送信されます。
            </Description>
            
            <Description>
              メールは mail@gameusers.org こちらのアドレスから届きます。ドメイン指定をされている方は @gameusers.org を受信できるように設定してください。
            </Description>
            
            <Description>
              メールアドレスの登録を解除する場合はフォームを空欄にして送信してください。
            </Description>
            
            
            
            
            {/* Registered Email */}
            <RegisteredEmailBox>
              <RegisteredEmail>登録済みのメールアドレス:</RegisteredEmail><div>{emailSecret} {componentConfirmation}</div>
            </RegisteredEmailBox>
            
            {/* E-Mail Confirmation Send Button */}
            {(emailSecret && !emailConfirmation) &&
              <RegisteredEmailButtonBox>
                <Button
                  variant="contained"
                  color="secondary"
                  // onClick={() => handlesubmitEmail()}
                  disabled={buttonDisabled}
                  size="small"
                >
                  確認メールを再送信する
                </Button>
              </RegisteredEmailButtonBox>
            }
            
            
            
            
            {/* E-Mail */}
            <div>
              <StyledTextFieldWide
                id="E-Mail"
                label="E-Mail"
                value={validationUsersEmailObj.value}
                onChange={(eventObj) => handleEdit({
                  pathArr: ['emailObj', 'value'],
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
            </div>
            
            
            
            
            {/* Submit Button */}
            <SubmitButtonBox>
              
              <ButtonBox>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmitEmail()}
                  disabled={buttonDisabled}
                >
                  送信する
                </Button>
              </ButtonBox>
              
            </SubmitButtonBox>
            
            
          </StyledExpansionPanelDetails>
          
        </StyledExpansionPanel>
        
        
      </React.Fragment>
    );
    
  }
  
});