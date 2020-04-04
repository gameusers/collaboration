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

import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
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
@inject('storeHardware')
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
    
    const {
      
      classes,
      storeHardware,
      intl,
      pathArr = [],
      
    } = this.props;
    
    
    const {
      
      handleEdit,
      handleAddHardwares,
      handleDeleteHardwares,
      handleHardwaresSuggestionOnKeyDown,
      handleHardwaresKeyword,
      
    } = storeHardware;
    
    
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const hardwaresArr = lodashGet(storeHardware, ['dataObj', ...pathArr, 'hardwaresArr'], []);
    const keyword = lodashGet(storeHardware, ['dataObj', ...pathArr, 'keyword'], '');
    const onFocus = lodashGet(storeHardware, ['dataObj', ...pathArr, 'onFocus'], false);
    const suggestionsArr = lodashGet(storeHardware, ['dataObj', ...pathArr, 'suggestionsArr'], []);
    const suggestionSelectedIndex = lodashGet(storeHardware, ['dataObj', ...pathArr, 'suggestionSelectedIndex'], 9999);
    
    
    
    
    // --------------------------------------------------
    //   Component - Hardware
    // --------------------------------------------------
    
    let componentHardwares = '';
    let componentHardwaresArr = [];
    
    if (hardwaresArr.length > 0) {
      
      for (const [index, valueObj] of hardwaresArr.entries()) {
        
        componentHardwaresArr.push(
          <Chip
            css={css`
              && {
                margin: 0 6px 6px 0;
              }
            `}
            key={index}
            label={valueObj.name}
            color="primary"
            onDelete={() => handleDeleteHardwares({ pathArr, hardwareID: valueObj.hardwareID })}
            variant="outlined"
          />
        );
        
      }
      
      
      if (componentHardwaresArr.length > 0) {
        
        componentHardwares =
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
              margin: 24px 0 0 0;
            `}
          >
            {componentHardwaresArr}
          </div>
        ;
        
      }
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - Suggestion
    // --------------------------------------------------
    
    let componentSuggestionMenuItemsArr = [];
    
    if (onFocus && keyword && suggestionsArr.length > 0) {
      
      
      for (const [index, valueObj] of suggestionsArr.entries()) {
        
        
        // --------------------------------------------------
        //   すでに選択されているハードウェアを太字で表示するためのindex
        // --------------------------------------------------
        
        const index2 = hardwaresArr.findIndex((value2Obj) => {
          return value2Obj.hardwareID === valueObj.hardwareID;
        });
        
        
        // --------------------------------------------------
        //   array.push
        // --------------------------------------------------
        
        componentSuggestionMenuItemsArr.push(
          <MenuItem
            key={index}
            component="div"
            selected={index === suggestionSelectedIndex}
            onMouseDown={() => handleAddHardwares({
              pathArr,
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
    //   ----------------------------------------\n
    //   /app/common/form/components/hardwares.js
    // `);
    
    // console.log(`
    //   ----- pathArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- hardwaresArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(hardwaresArr)), { colors: true, depth: null })}\n
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
          ハードウェア
        </h3>
        
        
        <p
          css={css`
            margin: 0 0 14px 0;
          `}
        >
          募集に関係するハードウェアを選んでください（PC版、○○版などの情報です）
        </p>
        
        <p
          css={css`
            margin: 0 0 14px 0;
          `}
        >
          ハードウェア名（またはSFC、N64などの略称）の一部を入力すると、入力フォームの下に一覧でハードウェアの正式名称が表示されます。一覧上でハードウェアをクリック（タップ）すると入力は完了です。この欄では複数のハードウェアを入力することが可能です。
        </p>
        
        <p>
          ゲームのハードウェア名だけでなく、「Android」「iOS」「PC」などもハードウェアとして入力できます。
        </p>
        
        
        
        
        {componentHardwares}
        
        
        
        
        <div
          onFocus={()=> handleEdit({
            pathArr: [...pathArr, 'onFocus'],
            value: true,
          })}
          onBlur={()=> handleEdit({
            pathArr: [...pathArr, 'onFocus'],
            value: false,
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
            label="ハードウェア名"
            value={keyword}
            onChange={(eventObj) => handleHardwaresKeyword({
              pathArr,
              value: eventObj.target.value
            })}
            onKeyDown={(eventObj) => handleHardwaresSuggestionOnKeyDown({
              eventObj,
              pathArr,
            })}
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