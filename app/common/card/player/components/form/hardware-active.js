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

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';




// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const stylesObj = {
  
  label: {
    fontSize: 14
  },
  
};




// --------------------------------------------------
//   Class
// --------------------------------------------------

@withStyles(stylesObj)
@inject('storeCardPlayer')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    super(props);
  }
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { classes, storeCardPlayer, intl, _id, arr, search } = this.props;
    
    const {
      
      handleCardPlayerAddHardwareActive,
      handleCardPlayerDeleteHardwareActive,
      cardPlayerFormHardwareActiveSuggestionObj,
      cardPlayerFormHardwareActiveSuggestionSelectedObj,
      handleCardPlayerFormHardwareActiveSuggestionOnKeyDown,
      cardPlayerEditFormHardwareActiveTextFieldObj,
      handleCardPlayerEditHardwareActiveTextField,
      cardPlayerEditFormHardwareActiveTextFieldFocusObj,
      handleCardPlayerHardwareActiveTextFieldOnFocus,
      handleCardPlayerHardwareActiveTextFieldOnBlur,
      handleCardPlayerEditHardwareActiveSearch
      
    } = storeCardPlayer;
    
    
    
    
    // --------------------------------------------------
    //   Component - Hardware
    // --------------------------------------------------
    
    let componentHardware = '';
    let componentHardwareArr = [];
    
    if (arr.length > 0) {
      
      for (const [index, valueObj] of arr.entries()) {
        
        componentHardwareArr.push(
          <Chip
            css={css`
              && {
                margin: 0 6px 6px 0;
              }
            `}
            key={index}
            label={valueObj.name}
            color="primary"
            onDelete={() => handleCardPlayerDeleteHardwareActive({ _id, hardwareID: valueObj.hardwareID })}
            variant="outlined"
          />
        );
        
      }
      
      
      if (componentHardwareArr.length > 0) {
        
        componentHardware =
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
              margin: 24px 0 0 0;
            `}
          >
            {componentHardwareArr}
          </div>
        ;
        
      }
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Text Field Input Value
    // --------------------------------------------------
    
    let inputValue = '';
    
    if (_id in cardPlayerEditFormHardwareActiveTextFieldObj) {
      inputValue = cardPlayerEditFormHardwareActiveTextFieldObj[_id];
    }
    
    
    // --------------------------------------------------
    //   Text Field Focus
    // --------------------------------------------------
    
    let onFocus = false;
    
    if (_id in cardPlayerEditFormHardwareActiveTextFieldFocusObj) {
      onFocus = cardPlayerEditFormHardwareActiveTextFieldFocusObj[_id];
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - Suggestion
    // --------------------------------------------------
    
    let suggestionArr = [];
    
    if (_id in cardPlayerFormHardwareActiveSuggestionObj) {
      suggestionArr = cardPlayerFormHardwareActiveSuggestionObj[_id];
    }
    
    
    let componentSuggestionMenuItemsArr = [];
    
    if (onFocus && inputValue && suggestionArr.length > 0) {
      
      // キーボードの↓↑でハードウェアを選択するための番号
      let suggestionSelected = 9999;
      
      if (_id in cardPlayerFormHardwareActiveSuggestionSelectedObj) {
        suggestionSelected = cardPlayerFormHardwareActiveSuggestionSelectedObj[_id];
      }
      
      
      for (const [index, valueObj] of suggestionArr.entries()) {
        
        // すでに選択されているハードウェアを太字で表示するためのindex
        const index2 = arr.findIndex((value2Obj) => {
          return value2Obj.hardwareID === valueObj.hardwareID;
        });
        
        
        componentSuggestionMenuItemsArr.push(
          <MenuItem
            key={index}
            component="div"
            selected={index === suggestionSelected}
            onMouseDown={() => handleCardPlayerAddHardwareActive({
              _id,
              hardwareID: valueObj.hardwareID,
              name: valueObj.name
            })}
            style={{
              fontWeight: index2 !== -1 ? 'bold' : 'normal',
            }}
          >
            {valueObj.name}
          </MenuItem>
        );
        
      }
      
    }
    
    
    let componentSuggestion = '';
    
    if (componentSuggestionMenuItemsArr.length > 0) {
      
      componentSuggestion = 
        <Paper square>
          <MenuList>
            {componentSuggestionMenuItemsArr}
          </MenuList>
        </Paper>
      ;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- arr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   value: {green ${value}}
    //   alternativeText: {green ${alternativeText}}
    //   search: {green ${search}}
    //   age: {green ${age}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        
        <h3
          css={css`
            font-weight: bold;
            margin: 0 0 2px 0;
          `}
        >
          所有ハードウェア
        </h3>
        
        
        <p>入力すると所有ハードウェアが表示されます。ハードウェア名（またはSFC、N64などの略称）の一部を入力すると、入力フォームの下に一覧でハードウェアの正式名称が表示されます。一覧上でハードウェアをクリック（タップ）すると入力は完了です。この欄では複数のハードウェアを入力することが可能です。<br /><br />
        
          ゲームのハードウェア名だけでなく、「Android」「iOS」「PC」などもハードウェアとして入力できます。
        </p>
        
        
        {componentHardware}
        
        
        <div
          onFocus={()=> handleCardPlayerHardwareActiveTextFieldOnFocus({ _id })}
          onBlur={()=> handleCardPlayerHardwareActiveTextFieldOnBlur({ _id })}
        >
          
          <TextField
            css={css`
              && {
                width: 400px;
                
                @media screen and (max-width: 480px) {
                  width: 100%;
                }
              }
            `}
            id="hardwareActive"
            label="ハードウェア名"
            value={inputValue}
            onChange={(eventObj) => handleCardPlayerEditHardwareActiveTextField({
              _id,
              value: eventObj.target.value
            })}
            onKeyDown={(eventObj) => handleCardPlayerFormHardwareActiveSuggestionOnKeyDown({
              eventObj,
              _id,
            })}
            margin="normal"
            autoComplete="off"
            inputProps={{
              maxLength: 50,
            }}
          />
          
          {componentSuggestion}
          
        </div>
        
        
        <div>
          <FormControlLabel
            classes={{
              label: classes.label
            }}
            control={
              <Checkbox
                checked={search}
                onChange={(eventObj) => handleCardPlayerEditHardwareActiveSearch({ _id, value: eventObj.target.checked })}
              />
            }
            label="所有ハードウェアで検索可能にする"
          />
        </div>
        
        
      </React.Fragment>
    );
    
  }
  
});