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
import Avatar from '@material-ui/core/Avatar';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

// import { formatImagesAndVideosObj } from '../../../@database/images-and-videos/format';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import GameChip from './chip';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeGameForm')
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
    
    const { stores, storeGameForm, pathArr, additionalGameLimit } = this.props;
    
    const {
      
      dataObj,
      // gamesArr,
      handleEdit,
      handleGetGamesArr,
      handleAdd,
      handleKeyword,
      handleSuggestionOnKeyDown,
      
    } = storeGameForm;
    
    
    
    
    // --------------------------------------------------
    //   Component - Selected Game
    // --------------------------------------------------
    
    let componentSelected = '';
    let componentSelectedArr = [];
    
    const gamesArr = handleGetGamesArr({ pathArr });
    
    // const gamesArr = lodashGet(dataObj, [...pathArr, 'gamesArr'], []);
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/game/components/form.js
    // `);
    
    // console.log(`
    //   ----- pathArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- gamesArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(gamesArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    
    if (gamesArr.length > 0) {
      
      for (const [index, valueObj] of gamesArr.entries()) {
        
        // console.log(`
        //   ----- valueObj -----\n
        //   ${util.inspect(valueObj, { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        // console.log(`
        //   ----- valueObj.imagesAndVideosObj -----\n
        //   ${util.inspect(valueObj.imagesAndVideosObj, { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        // console.log(chalk`
        //   valueObj._id: {green ${valueObj._id}}
        //   valueObj.name: {green ${valueObj.name}}
        // `);
        
        componentSelectedArr.push(
          <GameChip
            key={index}
            pathArr={pathArr}
            _id={valueObj._id}
            gameCommunities_id={valueObj.gameCommunities_id}
            name={valueObj.name}
            imagesAndVideosThumbnailObj={valueObj.imagesAndVideosThumbnailObj}
          />
        );
        
      }
      
      componentSelected =
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            margin: 12px 0;
            
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
    
    const keyword = lodashGet(dataObj, [...pathArr, 'keyword'], '');
    
    
    // --------------------------------------------------
    //   Text Field Focus
    // --------------------------------------------------
    
    const onFocus = lodashGet(dataObj, [...pathArr, 'focus'], false);
    
    
    
    
    // --------------------------------------------------
    //   Component - Suggestion
    // --------------------------------------------------
    
    // サジェストのデータ配列
    const suggestionArr = lodashGet(dataObj, [...pathArr, 'suggestionArr'], []);
    
    // console.log(`
    //   ----- suggestionArr -----\n
    //   ${util.inspect(suggestionArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // サジェストのメニューを作成
    let componentSuggestionMenuItemsArr = [];
    
    
    if (onFocus && keyword && suggestionArr.length > 0) {
      
      // キーボードの↓↑でハードウェアを選択するための番号、初期値は影響のない9999にしておく
      const selectedIndex = lodashGet(dataObj, [...pathArr, 'selectedIndex'], 9999);
      
      
      for (const [index, valueObj] of suggestionArr.entries()) {
        
        
        // --------------------------------------------------
        //   すでに選択されているハードウェアを太字で表示するためのindex
        // --------------------------------------------------
        
        const index2 = gamesArr.findIndex((value2Obj) => {
          return value2Obj._id === valueObj._id;
        });
        
        // const index2 = -1;
        
        
        // --------------------------------------------------
        //   Thumbnail
        // --------------------------------------------------
        
        const thumbnailSrc = lodashGet(valueObj, ['imagesAndVideosThumbnailObj', 'arr', 0, 'src'], '/img/common/thumbnail/none.svg');
        const thumbnailSrcSet = lodashGet(valueObj, ['imagesAndVideosThumbnailObj', 'arr', 0, 'srcSet'], '');
        
        
        // console.log(chalk`
        //   thumbnailSrc: {green ${thumbnailSrc}}
        //   thumbnailSrcSet: {green ${thumbnailSrcSet}}
        // `);
        
        // console.log(chalk`
        //   selectedIndex: {green ${selectedIndex}}
        //   index: {green ${index}}
        //   index2: {green ${index2}}
        // `);
        
        // console.log(`
        //   ----- valueObj -----\n
        //   ${util.inspect(valueObj, { colors: true, depth: null })}\n
        //   --------------------\n
        // `);

        
        componentSuggestionMenuItemsArr.push(
          <MenuItem
            css={css`
              && {
                font-size: 12px;
                white-space: normal;
              }
            `}
            key={index}
            component="div"
            disabled={index2 !== -1}
            selected={index === selectedIndex}
            onMouseDown={() => handleAdd({
              pathArr,
              obj: valueObj,
              additionalGameLimit,
            })}
          >
            <Avatar
              css={css`
                && {
                  width: 24px;
                  height: 24px;
                }
              `}
              alt="valueObj.name"
              src={thumbnailSrc}
              srcSet={thumbnailSrcSet}
            />
            <span
              css={css`
                margin: 0 0 0 8px;
              `}
            >
              {valueObj.name}
            </span>
          </MenuItem>
        );
        
      }
      
    }
    
    
    let componentSuggestion = '';
    
    if (componentSuggestionMenuItemsArr.length > 0) {
      
      componentSuggestion = 
        <Paper
          css={css`
            && {
              margin: 12px 0 0 0;
            }
          `}
          square
        >
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
        
        
        {/* TextField */}
        <div
          onFocus={() => handleEdit({
            pathArr: [...pathArr, 'focus'],
            value: true
          })}
          onBlur={() => handleEdit({
            pathArr: [...pathArr, 'focus'],
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
            id="gameFormName"
            label="ゲーム名"
            value={keyword}
            onChange={(eventObj) => handleKeyword({ pathArr, value: eventObj.target.value })}
            onKeyDown={(eventObj) => handleSuggestionOnKeyDown({ eventObj, pathArr, additionalGameLimit })}
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