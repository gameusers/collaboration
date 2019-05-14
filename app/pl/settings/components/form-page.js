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
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import IconPlayerID from '@material-ui/icons/Mood';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationUsersPlayerID } from '../../../../app/@database/users/validations/player-id';
import { validationUsersPagesName } from '../../../../app/@database/users/validations/pages';




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

const Description = styled.p`
  margin: 0 0 16px 0;
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
//   Form Box
// ---------------------------------------------

const FormBox = styled.div`
  margin: 48px 0 0 0;
`;

const FormHeading = styled.h3`
  font-weight: bold;
  margin: 0 0 6px 0;
`;

const FormDescription = styled.p`
  margin: 0 0 16px 0;
`;

const FormDescriptionBottom = styled.p`
  margin: 0 0 24px 0;
`;


// ---------------------------------------------
//   Text Field
// ---------------------------------------------

const StyledTextFieldWide = styled(TextField)`
  && {
    width: 400px;
    
    @media screen and (max-width: 480px) {
      width: 100%;
    }
  }
`;


// ---------------------------------------------
//   Pages Array
// ---------------------------------------------

const PagesBox = styled.div`
  margin: 0;
`;

const StyledSelect = styled(Select)`
  && {
    width: 200px;
  }
`;

const PagesTextFieldBox = styled.div`
  margin: 8px 0 12px 0;
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
      handleSubmitPages,
      
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
    //   Component - Pages Array
    // --------------------------------------------------
    
    const pagesArr = lodashGet(dataObj, ['pagesArr'], []);
    
    
    const componentsArr = [];
    
    for (const [index, valueObj] of pagesArr.entries()) {
      
      
      // --------------------------------------------------
      //   Validation
      // --------------------------------------------------
      
      const name = lodashGet(valueObj, ['name'], '');
      const validationUsersPagesNameObj = validationUsersPagesName({ value: name });
      
      
      // --------------------------------------------------
      //   Component
      // --------------------------------------------------
      
      componentsArr.push(
        
        <PagesBox key={index}>
          
          <FormControl disabled={buttonDisabled}>
            <InputLabel htmlFor="pageType">タイトルを変更するページ</InputLabel>
            <StyledSelect
              value={valueObj.type}
              onChange={(eventObj) => handleEdit({
                pathArr: ['pagesArr', 0, 'type'],
                value: eventObj.target.value
              })}
              inputProps={{
                name: 'pageType',
                id: 'pageType',
              }}
            >
              <MenuItem value={'top'}>トップページ</MenuItem>
            </StyledSelect>
          </FormControl>
          
          
          <PagesTextFieldBox>
            <StyledTextFieldWide
              id="name"
              label="タイトル"
              value={validationUsersPagesNameObj.value}
              onChange={(eventObj) => handleEdit({
                pathArr: ['pagesArr', 0, 'name'],
                value: eventObj.target.value
              })}
              error={validationUsersPagesNameObj.error}
              helperText={intl.formatMessage({ id: validationUsersPagesNameObj.messageID }, { numberOfCharacters: validationUsersPagesNameObj.numberOfCharacters })}
              disabled={buttonDisabled}
              margin="normal"
              inputProps={{
                maxLength: 100,
              }}
            />
          </PagesTextFieldBox>
          
          
          <FormControl disabled={buttonDisabled}>
            <InputLabel htmlFor="pageLanguage">タイトルの言語</InputLabel>
            <StyledSelect
              value={valueObj.language}
              onChange={(eventObj) => handleEdit({
                pathArr: ['pagesArr', 0, 'language'],
                value: eventObj.target.value
              })}
              inputProps={{
                name: 'pageLanguage',
                id: 'pageLanguage',
              }}
            >
              <MenuItem value={'ja'}>日本語</MenuItem>
            </StyledSelect>
          </FormControl>
          
        </PagesBox>
        
      );
      
      // console.log(`
      //   ----- valueObj -----\n
      //   ${util.inspect(valueObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- validationUsersPagesNameObj -----\n
      //   ${util.inspect(validationUsersPagesNameObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   topPageName: {green ${topPageName}}
    // `);
    
    // console.log(`
    //   ----- topObj -----\n
    //   ${util.inspect(topObj, { colors: true, depth: null })}\n
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
            
            <p>
              プレイヤーページというのは各ユーザーごとに用意される固有のページで、こちらの設定ページもプレイヤーページの一部になります。
            </p>
            
            
            
            
            {/* Player ID */}
            <FormBox>
              
              <FormHeading>Player ID</FormHeading>
              
              <FormDescription>Player IDを入力してください。Player IDはプレイヤーページのURLになります。https://gameusers.org/pl/***</FormDescription>
              
              <FormDescription>利用できる文字は半角英数字とハイフン( - )アンダースコア( _ )です。3文字以上、32文字以内。</FormDescription>
              
              
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
                        <IconPlayerID />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              
            </FormBox>
            
            
            
            
            {/* Pages Array */}
            <FormBox>
              
              <FormHeading>タイトル変更</FormHeading>
              
              <FormDescriptionBottom>プレイヤーページのタイトルを変更できます。</FormDescriptionBottom>
              
              {componentsArr}
            
            </FormBox>
            
            
            
            
            {/* Submit Button */}
            <SubmitButtonBox>
              
              <ButtonBox>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmitPages()}
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