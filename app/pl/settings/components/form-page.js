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
import IconMailOutline from '@material-ui/icons/MailOutline';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationUsersPlayerID } from '../../../../app/@database/users/validations/player-id';




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
  color: green;
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
    
    this.props.stores.layout.handleButtonEnable({ _id: 'settingsFormPage' });
    
    
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
    
    const panelExpanded = lodashGet(stores, ['layout', 'panelExpandedObj', 'settingsFormPage'], true);
    const handlePanelExpand = lodashGet(stores, ['layout', 'handlePanelExpand'], '');
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = lodashGet(stores, ['layout', 'buttonDisabledObj', 'settingsFormPage'], true);
    
    
    
    
    // --------------------------------------------------
    //   Player ID
    // --------------------------------------------------
    
    const playerID = lodashGet(dataObj, ['playerID'], '');
    const validationUsersPlayerIDObj = validationUsersPlayerID({ value: playerID });
    
    
    
    // --------------------------------------------------
    //   Remove E-Mail Checkbox
    // --------------------------------------------------
    
    // const removeEmail = lodashGet(dataObj, ['removeEmail'], false);
    
    
    
    
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
          
            <Heading>プレイヤーページ設定</Heading>
            
            {/* Expansion Button */}
            <ExpandMoreBox>
              <StyledIconButton
                onClick={() => handlePanelExpand({ _id: 'settingsFormPage' })}
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
              プレイヤーページの設定を行います。プレイヤーページのURLや、タイトルを変更することができます。
            </Description>
            
            <Description>
              プレイヤーページというのは各ユーザーごとに用意される固有のページで、こちらの設定ページもプレイヤーページの一部になります。
            </Description>
            
            
            
            
            {/* Player ID */}
            <div>
              <StyledTextFieldWide
                id="playerID"
                label="Player ID"
                value={validationUsersPlayerIDObj.value}
                onChange={(eventObj) => handleEdit({
                  pathArr: ['playerID'],
                  value: eventObj.target.value
                })}
                error={validationUsersPlayerIDObj.error}
                helperText={intl.formatMessage({ id: validationUsersPlayerIDObj.messageID }, { numberOfCharacters: validationUsersPlayerIDObj.numberOfCharacters })}
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