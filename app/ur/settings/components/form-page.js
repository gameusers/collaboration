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
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

// import IconExpandLess from '@material-ui/icons/ExpandLess';
// import IconExpandMore from '@material-ui/icons/ExpandMore';
// import IconPlayerID from '@material-ui/icons/Mood';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationUsersPlayerID } from '../../../../app/@database/users/validations/player-id';
import { validationUsersPagesName } from '../../../../app/@database/users/validations/pages';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from '../../../../app/common/layout/components/panel';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeUrSettings')
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
    
    this.props.stores.layout.handleButtonEnable({ _id: 'urSettingsFormPage' });
    
    
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, storeUrSettings, intl } = this.props;
    
    const {
      
      dataObj,
      handleEdit,
      handleSubmitPages,
      
    } = storeUrSettings;
    
    
    
    
    // --------------------------------------------------
    //   Panel
    // --------------------------------------------------
    
    // const panelExpanded = lodashGet(stores, ['layout', 'panelExpandedObj', 'urSettingsFormPage'], true);
    // const handlePanelExpand = lodashGet(stores, ['layout', 'handlePanelExpand'], '');
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = lodashGet(stores, ['layout', 'buttonDisabledObj', 'urSettingsFormPage'], true);
    
    
    
    
    // --------------------------------------------------
    //   Player ID
    // --------------------------------------------------
    
    const userID = lodashGet(dataObj, ['userID'], '');
    const validationUsersPlayerIDObj = validationUsersPlayerID({ value: userID });
    
    
    
    
    // --------------------------------------------------
    //   Component - Pages Array
    // --------------------------------------------------
    
    const pagesArr = lodashGet(dataObj, ['pagesArr'], []);
    
    // console.log(`
    //   ----- storeUrSettings -----\n
    //   ${util.inspect(storeUrSettings, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- dataObj -----\n
    //   ${util.inspect(dataObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- form-page / pagesArr -----\n
    //   ${util.inspect(pagesArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
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
        <div key={index}>
          
          
          <FormControl
            css={css`
              margin: 8px 0 0 0 !important;
            `}
            // variant="outlined"
            disabled={buttonDisabled}
          >
            
            <InputLabel htmlFor="pageType">変更するページ</InputLabel>
            
            <Select
              css={css`
                width: 250px;
              `}
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
            </Select>
            
          </FormControl>
          
          
          
          
          <div
            css={css`
              margin: 8px 0 12px 0;
            `}
          >
            <TextField
              css={css`
                width: 400px;
                
                @media screen and (max-width: 480px) {
                  width: 100%;
                }
              `}
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
          </div>
          
          
          
          
          <FormControl disabled={buttonDisabled}>
            
            <InputLabel htmlFor="pageLanguage">タイトルの言語</InputLabel>
            
            <Select
              css={css`
                width: 250px;
              `}
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
            </Select>
            
          </FormControl>
          
          
        </div>
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
      <Panel _id="panelPage" heading="ユーザーページ設定">
        
        <p>
          ユーザーページの設定を行います。ユーザーページというのは、各ユーザーごとに用意される固有のページになります。URLやタイトルを変更することが可能です。
        </p>
        
        
        
        
        <form>
          
          
          {/* URL */}
          <div
            css={css`
              margin: 36px 0 0 0;
            `}
          >
            
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 6px 0;
              `}
            >
              URL変更
            </h3>
            
            <p
            >
              URLを入力してください。次の形のURLになります。https://gameusers.org/ur/***
            </p>
            
            <p
              css={css`
                margin: 0 0 8px 0;
              `}
            >
              利用できる文字は半角英数字とハイフン( - )アンダースコア( _ )です。3文字以上、32文字以内。
            </p>
            
            
            <div>
              <TextField
                css={css`
                  width: 400px;
                  
                  @media screen and (max-width: 480px) {
                    width: 100%;
                  }
                `}
                id="userID"
                label="URL"
                value={validationUsersPlayerIDObj.value}
                onChange={(eventObj) => handleEdit({
                  pathArr: ['userID'],
                  value: eventObj.target.value
                })}
                error={validationUsersPlayerIDObj.error}
                helperText={intl.formatMessage({ id: validationUsersPlayerIDObj.messageID }, { numberOfCharacters: validationUsersPlayerIDObj.numberOfCharacters })}
                disabled={buttonDisabled}
                margin="normal"
                inputProps={{
                  maxLength: 32,
                }}
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       <IconPlayerID />
                //     </InputAdornment>
                //   ),
                // }}
              />
            </div>
            
          </div>
          
          
          
          
          {/* Title */}
          <div
            css={css`
              margin: 48px 0 0 0;
            `}
          >
            
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 6px 0;
              `}
            >
              タイトル変更
            </h3>
            
            
            <p
              css={css`
                margin: 0 0 24px 0;
              `}
            >
              ユーザーページのタイトルを変更できます。
            </p>
            
            
            {componentsArr}
            
          
          </div>
          
          
          
          
          {/* Submit Button */}
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
              margin: 48px 0 0 0;
            `}
          >
            
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmitPages()}
              disabled={buttonDisabled}
            >
              送信する
            </Button>
            
          </div>
          
          
          
          
        </form>
        
      </Panel>
    );
    
  }
  
});