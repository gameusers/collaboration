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
      
      handleCardPlayerAddHardwareInactive,
      handleCardPlayerDeleteHardwareInactive,
      cardPlayerFormHardwareInactiveSuggestionObj,
      cardPlayerFormHardwareInactiveSuggestionSelectedObj,
      handleCardPlayerFormHardwareInactiveSuggestionOnKeyDown,
      cardPlayerEditFormHardwareInactiveTextFieldObj,
      handleCardPlayerEditHardwareInactiveTextField,
      cardPlayerEditFormHardwareInactiveTextFieldFocusObj,
      handleCardPlayerHardwareInactiveTextFieldOnFocus,
      handleCardPlayerHardwareInactiveTextFieldOnBlur,
      handleCardPlayerEditHardwareInactiveSearch
      
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
            onDelete={() => handleCardPlayerDeleteHardwareInactive({ _id, hardwareID: valueObj.hardwareID })}
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
    
    if (_id in cardPlayerEditFormHardwareInactiveTextFieldObj) {
      inputValue = cardPlayerEditFormHardwareInactiveTextFieldObj[_id];
    }
    
    
    // --------------------------------------------------
    //   Text Field Focus
    // --------------------------------------------------
    
    let onFocus = false;
    
    if (_id in cardPlayerEditFormHardwareInactiveTextFieldFocusObj) {
      onFocus = cardPlayerEditFormHardwareInactiveTextFieldFocusObj[_id];
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - Suggestion
    // --------------------------------------------------
    
    let suggestionArr = [];
    
    if (_id in cardPlayerFormHardwareInactiveSuggestionObj) {
      suggestionArr = cardPlayerFormHardwareInactiveSuggestionObj[_id];
    }
    
    
    let componentSuggestionMenuItemsArr = [];
    
    if (onFocus && inputValue && suggestionArr.length > 0) {
      
      // キーボードの↓↑でハードウェアを選択するための番号
      let suggestionSelected = 9999;
      
      if (_id in cardPlayerFormHardwareInactiveSuggestionSelectedObj) {
        suggestionSelected = cardPlayerFormHardwareInactiveSuggestionSelectedObj[_id];
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
            onMouseDown={() => handleCardPlayerAddHardwareInactive({
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
    //   ----- ageObj -----\n
    //   ${util.inspect(ageObj, { colors: true, depth: null })}\n
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
          昔、所有していたハードウェア
        </h3>
        
        
        <p>入力すると昔、所有していたハードウェアが表示されます。入力方法は上記の「所有ハードウェア」と同じです。</p>
        
        
        {componentHardware}
        
        
        <div
          onFocus={()=> handleCardPlayerHardwareInactiveTextFieldOnFocus({ _id })}
          onBlur={()=> handleCardPlayerHardwareInactiveTextFieldOnBlur({ _id })}
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
            id="hardwareInactive"
            label="ハードウェア名"
            value={inputValue}
            onChange={(eventObj) => handleCardPlayerEditHardwareInactiveTextField({
              _id,
              value: eventObj.target.value
            })}
            onKeyDown={(eventObj) => handleCardPlayerFormHardwareInactiveSuggestionOnKeyDown({
              eventObj,
              _id
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
                onChange={(eventObj) => handleCardPlayerEditHardwareInactiveSearch({
                  _id,
                  value: eventObj.target.checked
                })}
              />
            }
            label="昔、所有していたハードウェアで検索可能にする"
          />
        </div>
        
        
      </React.Fragment>
    );
    
  }
  
});