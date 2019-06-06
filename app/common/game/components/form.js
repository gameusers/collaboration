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

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import GameChip from './chip';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('storeGameForm')
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
    
    const { storeGameForm, _id, gamesArr, func, funcDelete } = this.props;
    
    const {
      
      dataObj,
      handleEdit,
      handleAdd,
      handleRemove,
      handleKeyword,
      handleSuggestionOnKeyDown,
      
    } = storeGameForm;
    
    
    
    
    // --------------------------------------------------
    //   Component - Selected Game
    // --------------------------------------------------
    
    let componentSelected = '';
    let componentSelectedArr = [];
    
    if (gamesArr.length > 0) {
      
      for (const [index, valueObj] of gamesArr.entries()) {
        
        // console.log(`
        //   ----- valueObj -----\n
        //   ${util.inspect(valueObj, { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        componentSelectedArr.push(
          <GameChip
            _id={valueObj.games_id}
            gameID={valueObj.gameID}
            imagesAndVideosObj={valueObj.imagesAndVideosObj}
            name={valueObj.name}
            funcDelete={() => handleRemove({
              _id,
              games_id: valueObj._id,
              gameID: valueObj.gameID,
              imagesAndVideosObj: valueObj.imagesAndVideosObj,
              name: valueObj.name,
              funcDelete
            })}
            key={index}
          />
        );
        
      }
      
      componentSelected =
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            margin: 12px 0 0 0;
            
            @media screen and (max-width: 480px) {
              flex-flow: column wrap;
            }
          `}
        >
          {componentSelectedArr}
        </div>
      ;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Keyword
    // --------------------------------------------------
    
    const keyword = lodashGet(dataObj, [_id, 'keyword'], '');
    
    
    // --------------------------------------------------
    //   Text Field Focus
    // --------------------------------------------------
    
    const onFocus = lodashGet(dataObj, [_id, 'focus'], false);
    
    
    
    
    // --------------------------------------------------
    //   Component - Suggestion
    // --------------------------------------------------
    
    // サジェストのデータ配列
    const suggestionArr = lodashGet(dataObj, [_id, 'suggestionArr'], []);
    
    // サジェストのメニューを作成
    let componentSuggestionMenuItemsArr = [];
    
    
    if (onFocus && keyword && suggestionArr.length > 0) {
      
      // キーボードの↓↑でハードウェアを選択するための番号、初期値は影響のない9999にしておく
      const selectedIndex = lodashGet(dataObj, [_id, 'selectedIndex'], 9999);
      
      for (const [index, valueObj] of suggestionArr.entries()) {
        
        // すでに選択されているハードウェアを太字で表示するためのindex
        const index2 = gamesArr.findIndex((value2Obj) => {
          return value2Obj.games_id === valueObj._id;
        });
        
        // console.log(chalk`
        //   selectedIndex: {green ${selectedIndex}}
        //   index: {green ${index}}
        //   index2: {green ${index2}}
        // `);
        
        // console.log(`
        //   ----- selectedGamesArr -----\n
        //   ${util.inspect(selectedGamesArr, { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        // console.log(`
        //   ----- valueObj -----\n
        //   ${util.inspect(valueObj, { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        componentSuggestionMenuItemsArr.push(
          <MenuItem
            key={index}
            component="div"
            selected={index === selectedIndex}
            onMouseDown={() => handleAdd({
              _id,
              games_id: valueObj._id,
              gameID: valueObj.gameID,
              imagesAndVideosObj: valueObj.imagesAndVideosObj,
              name: valueObj.name,
              func
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
    
    // console.log(`\n---------- gamesArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(gamesArr)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(chalk`
    //   hobbyTextFieldCount: {green ${hobbyTextFieldCount}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        
        {/* 選択されたゲーム */}
        {componentSelected}
        
        
        <div
          onFocus={() => handleEdit({
            pathArr: [_id, 'focus'],
            value: true
          })}
          onBlur={() => handleEdit({
            pathArr: [_id, 'focus'],
            value: false
          })}
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
            label="ゲーム"
            value={keyword}
            onChange={(eventObj) => handleKeyword({ _id, value: eventObj.target.value })}
            onKeyDown={(eventObj) => handleSuggestionOnKeyDown({ eventObj, _id, func })}
            helperText="ゲーム名の一部を入力して、検索結果から選んでください"
            margin="normal"
            autoComplete="off"
            inputProps={{
              maxLength: 50,
            }}
          />
          
          {componentSuggestion}
          
        </div>
        
        
      </React.Fragment>
    );
    
  }
  
});